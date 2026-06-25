"use client";

import type { ElementType, ReactNode } from "react";
import { useGsapReveal } from "@/components/motion/useGsapReveal";

/**
 * Animates its direct `[data-reveal]` children in with a stagger on scroll, using a
 * single IntersectionObserver for the whole group. Mark each child with `data-reveal`
 * so it starts hidden (JS-gated) and is revealed here. Honors prefers-reduced-motion.
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
  const ref = useGsapReveal<HTMLElement>(
    (gsap, el) => {
      const items = el.querySelectorAll("[data-reveal]");
      if (!items.length) return;
      return gsap.fromTo(
        items,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger },
      );
    },
    (el) => {
      for (const item of el.querySelectorAll<HTMLElement>("[data-reveal]")) {
        item.style.opacity = "1";
        item.style.transform = "none";
      }
    },
    // ≈ old ScrollTrigger start "top 85%".
    "0px 0px -15% 0px",
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
