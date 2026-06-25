"use client";

import { useEffect, useRef } from "react";
import {
  type GsapInstance,
  loadGsap,
  prefersReducedMotion,
} from "@/components/motion/gsap";

type Killable = { kill: () => void };

/**
 * Runs a one-shot GSAP reveal when the element first enters the viewport.
 *
 * Two performance properties:
 *  - **IntersectionObserver** (not GSAP ScrollTrigger) decides when to fire — async,
 *    off the main thread, so it never forces a synchronous reflow on load.
 *  - **GSAP is lazy-loaded.** It's kept out of the initial bundle and fetched via
 *    `loadGsap()`. To avoid a reveal stalling on a ~70 KiB fetch mid-scroll, GSAP is
 *    also warmed during browser idle so it's usually cached before the first reveal.
 *
 * `build` receives the loaded gsap instance + element and returns the animation
 * (killed on unmount). `settle` is the reduced-motion path: place the element in its
 * final state with no animation and no GSAP. `rootMargin` mirrors the old ScrollTrigger
 * `start` values.
 */
export function useGsapReveal<T extends HTMLElement>(
  build: (gsap: GsapInstance, el: T) => Killable | undefined,
  settle: (el: T) => void,
  rootMargin = "0px 0px -10% 0px",
) {
  const ref = useRef<T>(null);
  // Keep the latest callbacks without re-subscribing the observer.
  const cbs = useRef({ build, settle });
  cbs.current = { build, settle };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      cbs.current.settle(el);
      return;
    }

    let anim: Killable | undefined;
    let cancelled = false;
    const run = () => {
      loadGsap().then((gsap) => {
        if (cancelled || !ref.current) return;
        anim = cbs.current.build(gsap, el);
      });
    };

    // Warm GSAP during idle so reveals animate instantly when scrolled to.
    const warm =
      typeof requestIdleCallback !== "undefined"
        ? requestIdleCallback(() => loadGsap())
        : undefined;

    if (typeof IntersectionObserver === "undefined") {
      run();
      return () => {
        cancelled = true;
        anim?.kill();
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { rootMargin, threshold: 0 },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      if (warm !== undefined && typeof cancelIdleCallback !== "undefined") {
        cancelIdleCallback(warm);
      }
      anim?.kill();
    };
  }, [rootMargin]);

  return ref;
}
