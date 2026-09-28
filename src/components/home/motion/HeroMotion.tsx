"use client";

import { useEffect, useRef } from "react";
import { finePointer, loadGsap, reducedMotion } from "@/lib/gsap";
import { onReady } from "../ready";

/**
 * Hero motion (the hero itself is server-rendered): intro reveal and the
 * kinetic, width-conserving headline. Renders only a hidden anchor.
 */
export function HeroMotion() {
  const anchor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = anchor.current?.closest("section");
    if (!el) return;
    const chars = Array.from(el.querySelectorAll<HTMLElement>(".hero-char"));
    const fades = el.querySelectorAll<HTMLElement>("[data-hero-fade]");
    for (const n of [...chars, ...fades]) n.style.animation = "none";

    // The intro is pure CSS (see `.hero-in` in globals.css): letters rise in a
    // stagger driven by each element's --i, so the first screen needs no
    // animation library. Intro copy stays opaque (it is the mobile LCP element).
    chars.forEach((c, i) => {
      c.style.setProperty("--i", String(i));
    });
    fades.forEach((f, i) => {
      f.style.setProperty("--i", String(i));
    });
    if (reducedMotion()) {
      el.classList.add("hero-in");
      return;
    }

    const fine = finePointer();

    // ── Kinetic width field ──────────────────────────────────────────────
    // Runs only while something is changing: pointer movement near the text
    // (desktop) or a short wave burst (touch: on intro and on tap). Once every
    // letter has settled the loop parks itself, so an idle hero costs nothing.
    const glyphs = chars.filter((c) => !c.classList.contains("hero-pill"));
    const lineOf = glyphs.map((g) => (g.closest("[data-line='2']") ? 1 : 0));
    const state = glyphs.map(() => 100);
    const targets = glyphs.map(() => 100);
    let centers: { x: number; y: number }[] = [];
    let px = -9999;
    let py = -9999;
    let raf = 0;
    let running = false;
    let visible = true;
    let frame = 0;
    let waveUntil = 0;
    const measure = () => {
      centers = glyphs.map((c) => {
        const r = c.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
    };
    const tick = (now: number) => {
      frame++;
      // Touch devices animate the wave at 30fps: half the re-layout work,
      // still fluid for a slow wave.
      if (!fine && frame % 2 === 1) {
        if (visible) raf = requestAnimationFrame(tick);
        else running = false;
        return;
      }
      if (fine && frame % 8 === 0) measure();
      const waving = now < waveUntil;
      const env = waving ? Math.min(1, (waveUntil - now) / 700) : 0;
      let moving = false;
      for (let i = 0; i < glyphs.length; i++) {
        let target = 100;
        if (fine && px > -999 && centers[i]) {
          const dx = centers[i].x - px;
          const dy = centers[i].y - py;
          const fall = Math.max(0, 1 - Math.hypot(dx, dy * 1.6) / 420);
          target = 100 + fall * fall * 55;
        } else if (waving) {
          target = 100 + Math.sin(now / 330 - i * 0.55) * 14 * env;
        }
        targets[i] = target;
      }
      // Conserve each line's width: letters near the pointer widen while the
      // rest of that line narrows, so the headline never grows past its box.
      for (const line of [0, 1]) {
        let sum = 0;
        let n = 0;
        for (let i = 0; i < glyphs.length; i++)
          if (lineOf[i] === line) {
            sum += targets[i];
            n++;
          }
        const shift = n ? 100 - sum / n : 0;
        for (let i = 0; i < glyphs.length; i++)
          if (lineOf[i] === line)
            targets[i] = Math.min(150, Math.max(58, targets[i] + shift));
      }
      for (let i = 0; i < glyphs.length; i++) {
        const target = targets[i];
        const w = state[i] + (target - state[i]) * 0.14;
        if (Math.abs(target - w) > 0.05) moving = true;
        if (Math.abs(w - state[i]) > 0.01) {
          state[i] = w;
          glyphs[i].style.fontVariationSettings = `"wdth" ${w.toFixed(1)}`;
        }
      }
      if ((moving || waving) && visible) raf = requestAnimationFrame(tick);
      else running = false;
    };
    const start = () => {
      if (running || !visible) return;
      running = true;
      if (fine) measure();
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      start();
    };
    const onLeave = () => {
      px = -9999;
      start();
    };
    const wave = (ms: number) => {
      waveUntil = performance.now() + ms;
      start();
    };
    const onTouch = () => wave(1800);
    const firstTouch = () => wave(2600);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) {
        cancelAnimationFrame(raf);
        running = false;
      }
    });
    io.observe(el);
    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    } else {
      el.addEventListener("touchstart", onTouch, { passive: true });
    }

    const off = onReady(() => {
      el.classList.add("hero-in");
      // Touch screens: the wave plays on the visitor's first touch (which on a
      // phone is the start of their first scroll), so its per-frame text
      // re-layout never competes with page start-up.
      if (!fine) {
        window.addEventListener("touchstart", firstTouch, {
          passive: true,
          once: true,
        });
      }
    });

    // Scroll: headline drifts, blob zooms out as the tapes arrive. GSAP is
    // fetched in idle time for this, well after the intro has started.
    let st: undefined | { revert: () => void };
    let dead = false;
    const idle = (
      window as Window & {
        requestIdleCallback?: (
          cb: () => void,
          o?: { timeout: number },
        ) => number;
      }
    ).requestIdleCallback;
    const later = (cb: () => void) =>
      idle ? idle(cb, { timeout: 1500 }) : window.setTimeout(cb, 200);
    later(() =>
      loadGsap().then(({ gsap }) => {
        if (dead) return;
        st = gsap.context(() => {
          gsap.to(".hero-title", {
            yPercent: -18,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
          gsap.to(".hero-canvas", {
            scale: 1.15,
            opacity: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }, el);
      }),
    );

    return () => {
      off();
      dead = true;
      st?.revert();
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchstart", firstTouch);
    };
  }, []);

  return <span ref={anchor} hidden />;
}
