"use client";

import { useEffect, useRef } from "react";
import { reducedMotion } from "@/lib/gsap";
import { scrubWithScroll } from "@/lib/motion";
import { NEAR_MARGIN } from "@/lib/useIdleEffect";

const LETTERS = "ARROWBIN".split("");
const HOVER = [
  "hover:text-ultra",
  "hover:text-plasma",
  "hover:text-sun",
  "hover:text-flare",
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Giant footer wordmark. Letters start condensed and stretch to full width, one
 * after another, as the footer scrolls into view; each lights up on hover.
 *
 * Scroll-driven without an animation library (it is on every page, and most
 * pages load no GSAP). The timing is the GSAP version's: both effects run
 * linearly across the wordmark's entry, from its top meeting the bottom of the
 * screen to its bottom meeting it, and trail the scroll by about 0.6 s
 * (scrub: 0.6). Widths go from 50 to 104, 0.06 s apart on a 1 s tween;
 * letters rise from 60% below, 0.04 s apart.
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const letters = Array.from(el.querySelectorAll<HTMLElement>(".fw-l"));
    const n = letters.length;
    // Timeline lengths: a 1 s tween plus each letter's stagger offset.
    const wideLen = 1 + 0.06 * (n - 1);
    const riseLen = 1 + 0.04 * (n - 1);
    const draw = (p: number) => {
      letters.forEach((l, i) => {
        const w = clamp01(p * wideLen - 0.06 * i);
        const y = clamp01(p * riseLen - 0.04 * i);
        l.style.fontVariationSettings = `"wdth" ${(50 + 54 * w).toFixed(1)}`;
        l.style.transform =
          y < 1 ? `translateY(${(60 * (1 - y)).toFixed(2)}%)` : "";
      });
    };

    let stop = () => {};
    // Start following the scroll when the footer comes within two screen
    // heights of the viewport; letters take their starting pose then, while
    // still out of sight.
    const near = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        near.disconnect();
        // From its top meeting the bottom of the screen to its bottom meeting
        // it, with scrub: 0.6.
        stop = scrubWithScroll(
          el,
          (b, vh) => (vh - b.top) / b.height,
          0.18,
          draw,
        );
      },
      { rootMargin: NEAR_MARGIN },
    );
    near.observe(el);
    return () => {
      near.disconnect();
      stop();
      // Back to the server-rendered pose.
      for (const l of letters) {
        l.style.fontVariationSettings = '"wdth" 104';
        l.style.transform = "";
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="overflow-hidden px-[var(--gutter)]"
    >
      <div className="flex select-none justify-between font-display text-[15vw] font-black leading-[0.74] tracking-[-0.04em] text-ink">
        {LETTERS.map((l, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: static letters.
            key={i}
            className={`fw-l inline-block transition-colors duration-500 ${HOVER[i % HOVER.length]}`}
            style={{ fontVariationSettings: '"wdth" 104' }}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
