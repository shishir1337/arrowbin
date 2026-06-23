"use client";

import type { ElementType, ReactNode } from "react";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";

type RevealProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /** Animation direction. */
  from?: "up" | "down" | "left" | "right" | "fade";
  /** Stagger delay applied per its position (seconds). */
  delay?: number;
};

const offsets: Record<
  NonNullable<RevealProps["from"]>,
  { x?: number; y?: number }
> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  fade: {},
};

/**
 * Scroll-triggered reveal. Marked with `data-reveal` so it starts hidden only when
 * JS is active; animates in on enter. Honors prefers-reduced-motion via matchMedia.
 */
export function Reveal({
  as: Tag = "div",
  className = "",
  children,
  from = "up",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1, x: 0, y: 0 });
        return;
      }

      gsap.fromTo(
        el,
        { opacity: 0, ...offsets[from] },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          delay,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-reveal className={className}>
      {children}
    </Tag>
  );
}
