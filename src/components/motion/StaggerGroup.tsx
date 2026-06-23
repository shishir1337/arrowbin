"use client";

import type { ElementType, ReactNode } from "react";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";

/**
 * Animates its direct `[data-reveal]` children in with a stagger on scroll, using a
 * single ScrollTrigger for the whole group. Mark each child with `data-reveal` so it
 * starts hidden (JS-gated) and is revealed here. Honors prefers-reduced-motion.
 */
export function StaggerGroup({
  as: Tag = "div",
  className = "",
  children,
  stagger = 0.12,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = el.querySelectorAll("[data-reveal]");
      if (!items.length) return;

      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        items,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
