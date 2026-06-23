"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";

/** Counts a number up from 0 when scrolled into view. Reduced-motion shows final value. */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const format = (n: number) =>
        `${prefix}${Math.round(n).toLocaleString()}${suffix}`;
      // CSS hid the element (data-countup) to avoid flashing the final value first.
      el.style.visibility = "visible";
      if (prefersReducedMotion()) {
        el.textContent = format(value);
        return;
      }

      el.textContent = format(0);
      const obj = { n: 0 };
      gsap.to(obj, {
        n: value,
        duration: 1.6,
        ease: "power1.out",
        onUpdate: () => {
          el.textContent = format(obj.n);
        },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} data-countup className={className}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
