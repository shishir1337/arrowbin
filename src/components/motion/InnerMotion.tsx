"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { finePointer, reducedMotion } from "@/lib/gsap";
import { scrubWithScroll, whenReached } from "@/lib/motion";
import { whenIdle } from "@/lib/useIdleEffect";

/**
 * One light motion layer for inner pages. Drop it once in a page; it scans
 * <main> for conventions instead of each section wiring its own effects:
 *
 * - `main section h2.display` below the fold: words rise in on scroll.
 * - `[data-count]`: numbers inside the text count up when seen.
 * - `[data-inview]`: gets `.is-in` when it enters the viewport (CSS does the
 *   rest: ticks pop, mockups play, rails fill, cards deal in).
 * - `[data-rail]`: `--p` (0→1) scrubbed with scroll through its section.
 * - `[data-tilt]`: tilts toward the pointer (fine pointers only).
 * - `[data-kinetic]` h1: letters widen near the pointer; each `.svh-line`
 *   keeps its total width, so nothing ever overflows.
 *
 * Everything is skipped for reduced motion; content is complete without JS.
 * No animation library: CSS transitions, IntersectionObserver and one scroll
 * listener, so pages that only use this layer never download GSAP.
 */
export function InnerMotion() {
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: rerun per route.
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || reducedMotion()) return;
    const offs: (() => void)[] = [];
    let dead = false;
    // Starting states in CSS are scoped to .im, so without this layer (no JS,
    // reduced motion) everything simply shows in its final state.
    document.documentElement.classList.add("im");
    offs.push(() => document.documentElement.classList.remove("im"));

    // ── in-view classes (no GSAP needed) ────────────────────────────────
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const t = e.target;
          t.classList.add("is-in");
          io.unobserve(t);
          // Once the entrance has played, drop its transitions and stagger
          // delays so hover effects on the same elements respond instantly.
          window.setTimeout(() => t.classList.add("iv-done"), 1600);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    for (const el of main.querySelectorAll("[data-inview]")) io.observe(el);
    offs.push(() => io.disconnect());

    // ── count-up ────────────────────────────────────────────────────────
    const countIo = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          countIo.unobserve(e.target);
          const el = e.target as HTMLElement;
          const final = el.textContent ?? "";
          const nums = final.match(/\d+(\.\d+)?/g);
          if (!nums) continue;
          const t0 = performance.now();
          const D = 1400;
          const step = (now: number) => {
            const p = Math.min(1, (now - t0) / D);
            const k = 1 - (1 - p) ** 3;
            let n = 0;
            el.textContent = final.replace(/\d+(\.\d+)?/g, (m) => {
              const target = Number(nums[n++]);
              const dec = m.includes(".") ? m.split(".")[1].length : 0;
              return (target * k).toFixed(dec);
            });
            if (p < 1 && !dead) requestAnimationFrame(step);
            else el.textContent = final;
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.6 },
    );
    for (const el of main.querySelectorAll("[data-count]")) countIo.observe(el);
    offs.push(() => countIo.disconnect());

    // ── pointer tilt ────────────────────────────────────────────────────
    if (finePointer()) {
      for (const el of main.querySelectorAll<HTMLElement>("[data-tilt]")) {
        const amt = Number(el.dataset.tilt || 6);
        let raf = 0;
        // Measured once on enter: measuring on every move would read the
        // already-tilted (and hover-lifted) box and make the tilt jitter.
        let r: DOMRect | null = null;
        let sy = 0;
        // Add the tilt's transform transition to the element's own
        // transitions instead of replacing them, so hover lifts (translate,
        // scale, rotate, shadow) on the same element stay smooth. Read on the
        // first hover, not during hydration: getComputedStyle there forced a
        // full style recalculation into the hydration task.
        let prepared = false;
        const prepare = () => {
          if (prepared) return;
          prepared = true;
          const cs = getComputedStyle(el);
          const props = cs.transitionProperty.split(",").map((s) => s.trim());
          if (!props.includes("transform") && !props.includes("all")) {
            const own =
              cs.transitionProperty === "none" || cs.transitionDuration === "0s"
                ? ""
                : `${cs.transition}, `;
            el.style.transition = `${own}transform 0.6s var(--ease-out-expo)`;
          }
        };
        const enter = () => {
          prepare();
          r = el.getBoundingClientRect();
          sy = window.scrollY;
        };
        const move = (e: PointerEvent) => {
          if (!r || window.scrollY !== sy) enter();
          if (!r) return;
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            el.style.transform = `perspective(1000px) rotateX(${(-y * amt).toFixed(2)}deg) rotateY(${(x * amt).toFixed(2)}deg)`;
          });
        };
        const leave = () => {
          cancelAnimationFrame(raf);
          r = null;
          el.style.transform = "";
        };
        el.addEventListener("pointerenter", enter);
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        offs.push(() => {
          el.removeEventListener("pointerenter", enter);
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      }
    }

    // ── kinetic hero title ──────────────────────────────────────────────
    const kin = main.querySelector<HTMLElement>("[data-kinetic]");
    if (kin && finePointer()) {
      const glyphs: HTMLElement[] = [];
      const lines = Array.from(kin.querySelectorAll<HTMLElement>(".svh-line"));
      for (const line of lines) {
        // Letters become separate boxes; never let a word break between them.
        line.style.whiteSpace = "nowrap";
        const walker = document.createTreeWalker(line, NodeFilter.SHOW_TEXT);
        const texts: Text[] = [];
        while (walker.nextNode()) texts.push(walker.currentNode as Text);
        for (const t of texts) {
          const frag = document.createDocumentFragment();
          for (const ch of t.data) {
            if (ch === " ") {
              frag.append(" ");
              continue;
            }
            const s = document.createElement("span");
            s.className = "inline-block";
            s.textContent = ch;
            s.dataset.line = String(lines.indexOf(line));
            glyphs.push(s);
            frag.append(s);
          }
          t.replaceWith(frag);
        }
      }
      const lineOf = glyphs.map((g) => Number(g.dataset.line));
      const state = glyphs.map(() => 100);
      // The title's own width axis value, read on the first pointer move (a
      // getComputedStyle during hydration forced a full style recalculation).
      let base = 0;
      let centers: { x: number; y: number }[] = [];
      let px = -9999;
      let py = -9999;
      let raf = 0;
      let running = false;
      let frame = 0;
      const measure = () => {
        centers = glyphs.map((g) => {
          const r = g.getBoundingClientRect();
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        });
      };
      const tick = () => {
        if (++frame % 8 === 0) measure();
        const target = glyphs.map((_, i) => {
          if (px < -999) return 100;
          const c = centers[i];
          const f = Math.max(
            0,
            1 - Math.hypot(c.x - px, (c.y - py) * 1.6) / 380,
          );
          return 100 + f * f * 45;
        });
        for (let l = 0; l < lines.length; l++) {
          let sum = 0;
          let n = 0;
          target.forEach((t, i) => {
            if (lineOf[i] === l) {
              sum += t;
              n++;
            }
          });
          const shift = n ? 100 - sum / n : 0;
          target.forEach((_, i) => {
            if (lineOf[i] === l)
              target[i] = Math.min(145, Math.max(70, target[i] + shift));
          });
        }
        let moving = false;
        glyphs.forEach((g, i) => {
          const w = state[i] + (target[i] - state[i]) * 0.14;
          if (Math.abs(target[i] - w) > 0.05) moving = true;
          if (Math.abs(w - state[i]) > 0.01) {
            state[i] = w;
            g.style.fontVariationSettings = `"wdth" ${((w / 100) * base).toFixed(1)}`;
          }
        });
        if (moving && !dead) raf = requestAnimationFrame(tick);
        else running = false;
      };
      const start = () => {
        if (running) return;
        running = true;
        base ||= Number(
          getComputedStyle(kin).fontVariationSettings.match(/[\d.]+/)?.[0] ??
            100,
        );
        measure();
        raf = requestAnimationFrame(tick);
      };
      const onMove = (e: PointerEvent) => {
        px = e.clientX;
        py = e.clientY;
        start();
      };
      const onLeave = () => {
        px = -9999;
        start();
      };
      const sec = kin.closest("section") ?? kin;
      sec.addEventListener("pointermove", onMove, { passive: true });
      sec.addEventListener("pointerleave", onLeave);
      offs.push(() => {
        cancelAnimationFrame(raf);
        sec.removeEventListener("pointermove", onMove);
        sec.removeEventListener("pointerleave", onLeave);
      });
    }

    // ── heading word rise and scroll rails ──────────────────────────────
    // CSS transitions plus one scroll listener, no GSAP: inner pages load no
    // animation library at all. Same motion as the GSAP version this replaced
    // (gsap.from yPercent 110, 1 s expo.out, 0.06 s stagger, once at "top 88%";
    // rails scrubbed from "top 70%" to "bottom 60%" with scrub 0.4).
    //
    // Two idle tasks, as before: splitting a heading and then measuring the
    // page forced a fresh layout for every heading. Step 1 does every read and
    // then only DOM writes; step 2 runs after the browser has laid the split
    // words out.
    const splitHeadings = () => {
      if (dead) return;
      // Heading word reveal (below the fold only, so nothing flashes). All
      // positions are read before any heading is split.
      const sections = Array.from(main.querySelectorAll("section"));
      const below = Array.from(
        main.querySelectorAll<HTMLElement>("section h2.display"),
      ).filter((h) => {
        const sec = h.closest("section");
        if (!sec || sections.indexOf(sec) === 0) return false;
        return h.getBoundingClientRect().top >= window.innerHeight;
      });
      const split: HTMLElement[] = [];
      for (const h of below) {
        if (h.dataset.split) continue;
        h.dataset.split = "1";
        h.normalize();
        let word = 0;
        const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
        const texts: Text[] = [];
        while (walker.nextNode()) texts.push(walker.currentNode as Text);
        for (const t of texts) {
          const frag = document.createDocumentFragment();
          for (const part of t.data.split(/(\s+)/)) {
            if (!part) continue;
            if (/^\s+$/.test(part)) {
              frag.append(part);
              continue;
            }
            const outer = document.createElement("span");
            outer.className =
              "inline-block overflow-y-clip pb-[0.06em] align-top";
            // .wr-word (globals.css) waits below the clip line until the
            // heading gets .wr-in.
            const inner = document.createElement("span");
            inner.className = "wr-word inline-block";
            inner.style.transitionDelay = `${(word++ * 0.06).toFixed(2)}s`;
            inner.textContent = part;
            outer.append(inner);
            frag.append(outer);
          }
          t.replaceWith(frag);
        }
        split.push(h);
      }
      offs.push(whenIdle(() => watchScroll(split), 600));
    };
    const watchScroll = (split: HTMLElement[]) => {
      if (dead) return;
      for (const h of split) {
        offs.push(whenReached(h, 0.88, () => h.classList.add("wr-in")));
      }
      for (const r of main.querySelectorAll<HTMLElement>("[data-rail]")) {
        // ScrollTrigger's "top 70%" to "bottom 60%", with scrub: 0.4.
        offs.push(
          scrubWithScroll(
            r.closest("section") ?? r,
            (b, vh) => (vh * 0.7 - b.top) / (b.height + vh * 0.1),
            0.12,
            (p) => r.style.setProperty("--p", p.toFixed(3)),
          ),
        );
      }
    };
    offs.push(whenIdle(splitHeadings, 1500));

    return () => {
      dead = true;
      for (const off of offs) off();
    };
  }, [pathname]);

  return null;
}
