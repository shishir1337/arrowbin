"use client";

import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { requestedGsap, whenGsapLoaded } from "@/lib/gsap";
import { useIdleEffect } from "@/lib/useIdleEffect";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Lenis smooth scrolling (mouse/trackpad devices). Touch devices and
 * reduced-motion users keep native scrolling. Lenis is fetched in idle time, so
 * it is not on the critical path.
 *
 * Lenis runs on its own animation frame loop until GSAP is on the page (the
 * home page loads it for its sections, any page for the magnetic buttons once
 * the visitor starts using it). From then on GSAP's ticker drives Lenis, so
 * ScrollTrigger scrubs stay in lock-step with the eased scroll position.
 * Loading GSAP here just for that would put it on every page, including the
 * many that never animate with it.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useIdleEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Touch devices already scroll natively (Lenis doesn't smooth touch), so
    // skip it there: it would only add a second scroll pipeline to every frame.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    let dead = false;
    let off: undefined | (() => void);
    import("lenis").then(({ default: LenisCtor }) => {
      if (dead) return;
      const lenis = new LenisCtor({
        lerp: 0.1,
        wheelMultiplier: 1,
        anchors: { offset: -80 },
      });
      window.__lenis = lenis;
      // performance.now() in both loops, so the hand-over keeps one time base.
      let raf = 0;
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      let stop = () => cancelAnimationFrame(raf);
      const cancel = whenGsapLoaded(({ gsap, ScrollTrigger }) => {
        stop();
        lenis.on("scroll", ScrollTrigger.update);
        const tick = () => lenis.raf(performance.now());
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        stop = () => gsap.ticker.remove(tick);
      });
      off = () => {
        cancel();
        stop();
        lenis.destroy();
        window.__lenis = undefined;
      };
    });
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
    // Only where GSAP is already on the page: without it there is nothing to
    // re-measure, and triggers created later measure the new page themselves.
    const id = window.setTimeout(
      () =>
        requestedGsap()?.then(
          ({ ScrollTrigger }) => ScrollTrigger.refresh(),
          () => {},
        ),
      120,
    );
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
