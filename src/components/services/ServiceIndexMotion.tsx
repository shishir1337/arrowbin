"use client";

import { useEffect, useRef } from "react";
import { reducedMotion } from "@/lib/gsap";
import { riseInWhenReached } from "@/lib/motion";
import { NEAR_MARGIN, whenIdle } from "@/lib/useIdleEffect";

/**
 * Scroll reveal for the service index rows: each row rises in once at 92% of
 * the screen. Same motion as the GSAP version this replaced (gsap.from y 36,
 * opacity 0, 0.9 s expo.out), done with the Web Animations API, so /services
 * loads no animation library. Sets up as the visitor nears the index.
 */
export function ServiceIndexMotion() {
  const anchor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = anchor.current?.closest("section");
    if (!el || reducedMotion()) return;
    const offs: (() => void)[] = [];
    const setup = () => {
      for (const row of el.querySelectorAll<HTMLElement>(".svi-row")) {
        // The row moves as one unit, so its parts can never overlap
        // mid-reveal.
        offs.push(riseInWhenReached(row, { y: 36, ms: 900, line: 0.92 }));
      }
    };
    const near = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        near.disconnect();
        offs.push(whenIdle(setup, 600));
      },
      { rootMargin: NEAR_MARGIN },
    );
    near.observe(el);
    offs.push(() => near.disconnect());
    return () => {
      for (const off of offs) off();
    };
  }, []);

  return <span ref={anchor} hidden />;
}
