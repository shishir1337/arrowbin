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
 * While a smooth scroll is moving, Lenis runs on its own animation frames until
 * GSAP is on the page (the home page loads it for its sections, any page for
 * the magnetic buttons once the visitor starts using it). From then on GSAP's
 * ticker drives Lenis, so ScrollTrigger scrubs stay in lock-step with the
 * eased scroll position. Between scrolls there is no frame loop at all.
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

      // Lenis needs frames only while it eases a scroll. An endless frame loop
      // makes Chrome build a main-thread frame 60 times a second on an idle
      // page, and every one restyles each running CSS animation (marquees,
      // the CTA ring), which the compositor would otherwise run for free. So
      // frames start when a smooth scroll starts (wheel, keys and anchor links
      // all go through lenis.scrollTo) and stop on the frame it settles.
      let running = false;
      let resumed = false;
      // One eased frame; returns whether the scroll is still moving.
      const frame = (time: number) => {
        if (resumed) {
          // Lenis steps from its previous frame's time. After a pause that gap
          // would be one huge step (a jump), so count it as a single frame.
          lenis.time = time - 1000 / 60;
          resumed = false;
        }
        lenis.raf(time);
        return lenis.isScrolling === "smooth";
      };
      let raf = 0;
      const loop = (time: number) => {
        if (frame(time)) raf = requestAnimationFrame(loop);
        else running = false;
      };
      let begin = () => {
        raf = requestAnimationFrame(loop);
      };
      let end = () => cancelAnimationFrame(raf);
      const scrollTo = lenis.scrollTo.bind(lenis);
      lenis.scrollTo = (...args: Parameters<typeof scrollTo>) => {
        scrollTo(...args);
        if (running || lenis.isScrolling !== "smooth") return;
        running = true;
        resumed = true;
        begin();
      };

      const cancel = whenGsapLoaded(({ gsap, ScrollTrigger }) => {
        end();
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.lagSmoothing(0);
        // performance.now() is the clock of rAF timestamps too, so a scroll
        // in progress carries on without a step.
        const tick = () => {
          if (frame(performance.now())) return;
          gsap.ticker.remove(tick);
          running = false;
        };
        begin = () => gsap.ticker.add(tick);
        end = () => gsap.ticker.remove(tick);
        if (running) begin();
      });
      off = () => {
        cancel();
        end();
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
