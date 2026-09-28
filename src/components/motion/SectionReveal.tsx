"use client";

import { useRef } from "react";
import { reducedMotion } from "@/lib/gsap";
import { useGsapIdle } from "@/lib/useIdleEffect";

/**
 * Drop inside any server-rendered <section>: every descendant marked with
 * `data-rv` rises in once as it scrolls into view (GSAP loaded in idle time).
 * Content is fully visible without JS and for reduced motion.
 */
export function SectionReveal() {
  const anchor = useRef<HTMLSpanElement>(null);

  useGsapIdle(({ gsap }) => {
    const el = anchor.current?.closest("section");
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-rv]", el).forEach((node) => {
        gsap.from(node, {
          y: 40,
          opacity: 0,
          duration: 1,
          delay: Number(node.dataset.rv || 0) * 0.08,
          scrollTrigger: { trigger: node, start: "top 90%", once: true },
        });
      });
    }, el);
    return () => ctx.revert();
  });

  return <span ref={anchor} hidden />;
}
