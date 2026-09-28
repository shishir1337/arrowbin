"use client";

import { useRef } from "react";
import { reducedMotion } from "@/lib/gsap";
import { useGsapIdle } from "@/lib/useIdleEffect";

/** Scroll reveal for the service index rows (GSAP loaded in idle time). */
export function ServiceIndexMotion() {
  const anchor = useRef<HTMLSpanElement>(null);

  useGsapIdle(({ gsap }) => {
    const el = anchor.current?.closest("section");
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      for (const row of gsap.utils.toArray<HTMLElement>(".svi-row", el)) {
        // The row moves as one unit, so its parts can never overlap mid-reveal.
        gsap.from(row, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          scrollTrigger: { trigger: row, start: "top 92%", once: true },
        });
      }
    }, el);
    return () => ctx.revert();
  });

  return <span ref={anchor} hidden />;
}
