"use client";

import type { ElementType, ReactNode } from "react";
import { useGsapReveal } from "@/components/motion/useGsapReveal";

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
 * JS is active; animates in on enter via IntersectionObserver. Honors reduced-motion.
 */
export function Reveal({
  as: Tag = "div",
  className = "",
  children,
  from = "up",
  delay = 0,
}: RevealProps) {
  const ref = useGsapReveal<HTMLElement>(
    (gsap, el) =>
      gsap.fromTo(
        el,
        { opacity: 0, ...offsets[from] },
        { opacity: 1, x: 0, y: 0, duration: 0.7, delay, ease: "power2.out" },
      ),
    (el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    },
    // ≈ old ScrollTrigger start "top 88%" (fire when 12% into view from the bottom).
    "0px 0px -12% 0px",
  );

  return (
    <Tag ref={ref} data-reveal className={className}>
      {children}
    </Tag>
  );
}
