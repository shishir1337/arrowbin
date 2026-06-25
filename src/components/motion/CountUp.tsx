"use client";

import { useGsapReveal } from "@/components/motion/useGsapReveal";

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
  const format = (n: number) =>
    `${prefix}${Math.round(n).toLocaleString()}${suffix}`;

  const ref = useGsapReveal<HTMLSpanElement>(
    (gsap, el) => {
      // CSS hid the element (data-countup) to avoid flashing the final value first.
      el.style.visibility = "visible";
      el.textContent = format(0);
      const obj = { n: 0 };
      return gsap.to(obj, {
        n: value,
        duration: 1.6,
        ease: "power1.out",
        onUpdate: () => {
          el.textContent = format(obj.n);
        },
      });
    },
    (el) => {
      el.style.visibility = "visible";
      el.textContent = format(value);
    },
    // ≈ old ScrollTrigger start "top 90%".
    "0px 0px -10% 0px",
  );

  return (
    <span ref={ref} data-countup className={className}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
