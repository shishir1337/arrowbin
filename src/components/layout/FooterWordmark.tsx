"use client";

import { useRef } from "react";
import { reducedMotion } from "@/lib/gsap";
import { useGsapIdle } from "@/lib/useIdleEffect";

const LETTERS = "ARROWBIN".split("");
const HOVER = [
  "hover:text-ultra",
  "hover:text-plasma",
  "hover:text-sun",
  "hover:text-flare",
];

/**
 * Giant footer wordmark. Letters start condensed and stretch to full width, one
 * after another, as the footer scrolls into view; each lights up on hover.
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);

  useGsapIdle(({ gsap }) => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>(".fw-l", el);
      const state = letters.map(() => ({ w: 50 }));
      gsap.to(state, {
        w: 104,
        stagger: 0.06,
        ease: "none",
        onUpdate: () => {
          letters.forEach((l, i) => {
            l.style.fontVariationSettings = `"wdth" ${state[i].w.toFixed(1)}`;
          });
        },
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });
      gsap.from(letters, {
        yPercent: 60,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });
    }, el);
    return () => ctx.revert();
  });

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
