"use client";

import { useEffect, useRef } from "react";
import { reducedMotion } from "@/lib/gsap";
import { riseInWhenReached } from "@/lib/motion";
import { NEAR_MARGIN, whenIdle } from "@/lib/useIdleEffect";

/**
 * Drop inside any server-rendered <section>: every descendant marked with
 * `data-rv` rises in once as it scrolls into view. Content is fully visible
 * without JS and for reduced motion.
 *
 * Same motion as the GSAP version this replaced (gsap.from y 40, opacity 0,
 * 1 s expo.out, `data-rv` × 0.08 s delay, once at "top 90%"), done with the
 * Web Animations API (see riseInWhenReached), so pages that use it load no
 * animation library.
 *
 * Sets up as the visitor nears the section (no page using it has a pinned
 * section). `eager`: set up at idle right after load instead, for a section
 * that starts on the first screen. The /blog lead card is one: its starting
 * state must be in place before its cover image paints, or that image counts
 * as the page's largest paint on phones (LCP 1.2 s to 3.5 s in Lighthouse), as
 * it never did on the live site.
 */
export function SectionReveal({ eager = false }: { eager?: boolean }) {
  const anchor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = anchor.current?.closest("section");
    if (!el || reducedMotion()) return;
    const offs: (() => void)[] = [];
    const setup = () => {
      for (const node of el.querySelectorAll<HTMLElement>("[data-rv]")) {
        // `data-rv={i}` staggers by 0.08 s steps; a bare `data-rv` ("true")
        // starts without delay.
        const step = Number(node.dataset.rv);
        offs.push(
          riseInWhenReached(node, {
            y: 40,
            ms: 1000,
            delayMs: Number.isFinite(step) ? step * 80 : 0,
            line: 0.9,
          }),
        );
      }
    };
    if (eager) {
      offs.push(whenIdle(setup, 1200));
    } else {
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
    }
    return () => {
      for (const off of offs) off();
    };
  }, [eager]);

  return <span ref={anchor} hidden />;
}
