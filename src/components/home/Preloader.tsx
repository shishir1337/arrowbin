"use client";

import { useEffect, useRef } from "react";
import { MARK_BIT, MARK_PATH } from "@/components/brand/mark";
import { markReady } from "./ready";

/**
 * First-visit intro: an ultraviolet screen where the mark fills from the bottom as
 * a counter runs 000→100, then the whole panel wipes up with a curved edge.
 * Plays once per session; CSS hides it for no-JS, reduced motion and repeat views
 * (see `.preloader` in globals.css), with a CSS failsafe if JS stalls.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const fill = useRef<SVGRectElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || document.documentElement.classList.contains("no-preload")) {
      markReady();
      return;
    }
    el.style.animation = "none"; // JS is alive: cancel the failsafe
    // Counter + mark fill on a plain rAF loop (power2.inOut over 1.5s), then a
    // CSS transition wipes the panel up. No animation library needed here, so
    // the first screen doesn't wait for GSAP.
    const D = 1500;
    const ease = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
    let raf = 0;
    let exitTimer = 0;
    let shown = "";
    const t0 = performance.now();
    const done = () => {
      el.style.display = "none";
      document.documentElement.classList.add("no-preload");
      try {
        sessionStorage.setItem("ab-preloaded", "1");
      } catch {}
    };
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / D);
      const v = ease(p) * 100;
      const txt = String(Math.round(v)).padStart(3, "0");
      if (txt !== shown && count.current) {
        shown = txt;
        count.current.textContent = txt;
      }
      fill.current?.setAttribute("y", String(100 - v));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      el.classList.add("pl-exit");
      markReady();
      exitTimer = window.setTimeout(done, 1150);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(exitTimer);
    };
  }, []);

  const b = MARK_BIT;
  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="pl-edge" />
      <div className="relative flex flex-col items-center gap-8">
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="pl-mark h-28 w-28 sm:h-36 sm:w-36"
        >
          <defs>
            <clipPath id="pl-clip">
              <path d={MARK_PATH} clipRule="evenodd" fillRule="evenodd" />
              <rect x={b.x} y={b.y} width={b.size} height={b.size} rx={b.r} />
            </clipPath>
          </defs>
          <path d={MARK_PATH} fillRule="evenodd" fill="rgba(255,255,255,.16)" />
          <rect
            x={b.x}
            y={b.y}
            width={b.size}
            height={b.size}
            rx={b.r}
            fill="rgba(255,255,255,.16)"
          />
          <g clipPath="url(#pl-clip)">
            <rect
              ref={fill}
              x="0"
              y="100"
              width="100"
              height="100"
              fill="#fff"
            />
            <rect
              x={b.x}
              y={b.y}
              width={b.size}
              height={b.size}
              fill="#FF4DA6"
              opacity="0.95"
            />
          </g>
        </svg>
        <span
          ref={count}
          className="font-display text-[clamp(4rem,14vw,9rem)] font-black leading-none text-white tabular-nums"
          style={{ fontVariationSettings: '"wdth" 150' }}
        >
          000
        </span>
      </div>
      <span className="label absolute bottom-8 left-[var(--gutter)] text-white/70">
        Arrowbin — loading the good stuff
      </span>
      <span className="label absolute bottom-8 right-[var(--gutter)] text-sun">
        ©{new Date().getFullYear()}
      </span>
    </div>
  );
}
