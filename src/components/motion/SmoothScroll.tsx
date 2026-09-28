"use client";

import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { loadGsap } from "@/lib/gsap";
import { useIdleEffect } from "@/lib/useIdleEffect";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Lenis smooth scrolling (mouse/trackpad devices) driven by GSAP's ticker so
 * ScrollTrigger scrubs stay in lock-step with the eased scroll position. Touch
 * devices and reduced-motion users keep native scrolling. Lenis and GSAP are
 * both fetched in idle time, so neither is on the critical path.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  // Web fonts change text metrics (the display face especially), so re-measure
  // every trigger once they have loaded.
  useIdleEffect(() => {
    let dead = false;
    loadGsap().then(({ ScrollTrigger }) =>
      document.fonts?.ready.then(() => {
        if (!dead) ScrollTrigger.refresh();
      }),
    );
    return () => {
      dead = true;
    };
  });

  useIdleEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Touch devices already scroll natively (Lenis doesn't smooth touch), so
    // skip it there: it would only add a second scroll pipeline to every frame.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    let dead = false;
    let off: undefined | (() => void);
    Promise.all([import("lenis"), loadGsap()]).then(
      ([{ default: LenisCtor }, { gsap, ScrollTrigger }]) => {
        if (dead) return;
        const lenis = new LenisCtor({
          lerp: 0.1,
          wheelMultiplier: 1,
          anchors: { offset: -80 },
        });
        window.__lenis = lenis;
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        off = () => {
          gsap.ticker.remove(tick);
          lenis.destroy();
          window.__lenis = undefined;
        };
      },
    );
    return () => {
      dead = true;
      off?.();
    };
  });

  // New route: jump to top and let triggers re-measure the fresh layout. Skipped
  // on first load, where ScrollTrigger measures on its own.
  const first = useRef(true);
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    // A link like /blog/post#faq should land on #faq, not the top.
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const target = hash ? document.getElementById(hash) : null;
    if (target) {
      const lenis = window.__lenis;
      if (lenis) {
        // Lenis still holds the previous page's height: re-measure first.
        lenis.resize();
        lenis.scrollTo(target, { immediate: true, force: true, offset: -80 });
      } else target.scrollIntoView();
    } else {
      window.__lenis?.scrollTo(0, { immediate: true });
    }
    const id = window.setTimeout(
      () => loadGsap().then(({ ScrollTrigger }) => ScrollTrigger.refresh()),
      120,
    );
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
