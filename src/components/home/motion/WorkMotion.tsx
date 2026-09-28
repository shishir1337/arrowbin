"use client";

import { useRef } from "react";
import { reducedMotion } from "@/lib/gsap";
import { useGsapIdle } from "@/lib/useIdleEffect";

/** Motion controller for a server-rendered section: renders a hidden anchor
 * and drives the section's animations from it. */
export function WorkMotion() {
  const anchor = useRef<HTMLSpanElement>(null);

  useGsapIdle(({ gsap }) => {
    const el = anchor.current?.closest("section");
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".work-card");
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const st = {
          trigger: next,
          start: "top bottom",
          end: "top 12%",
          scrub: true,
        };
        gsap.to(card.querySelector(".work-inner"), {
          scale: 0.9,
          rotate: i % 2 ? 2.5 : -2.5,
          ease: "none",
          scrollTrigger: st,
        });
        gsap.to(card.querySelector(".work-shade"), {
          opacity: 0.28,
          ease: "none",
          scrollTrigger: st,
        });
      });
    }, el);
    return () => ctx.revert();
  });

  return <span ref={anchor} hidden />;
}
