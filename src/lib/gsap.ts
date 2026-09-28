"use client";

/**
 * On-demand GSAP for the Hyperchrome homepage. Nothing here imports GSAP
 * statically: `loadGsap()` fetches gsap + ScrollTrigger the first time it is
 * called (from idle-time effects), so ~45 KB of animation code stays off the
 * critical path and the first screen paints and becomes interactive without it.
 */

export type Gsap = typeof import("gsap").gsap;
export type ScrollTriggerStatic =
  typeof import("gsap/ScrollTrigger").ScrollTrigger;
export type GsapKit = { gsap: Gsap; ScrollTrigger: ScrollTriggerStatic };

let kit: Promise<GsapKit> | null = null;

export function loadGsap(): Promise<GsapKit> {
  if (!kit) {
    kit = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([g, s]) => {
        g.gsap.registerPlugin(s.ScrollTrigger);
        g.gsap.defaults({ ease: "expo.out", duration: 1 });
        // Don't re-measure every trigger when a phone's address bar shows or
        // hides. (No `limitCallbacks`: reveals must still fire for sections
        // scrolled past quickly, or their content could stay hidden.)
        s.ScrollTrigger.config({ ignoreMobileResize: true });
        return { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger };
      },
    );
  }
  return kit;
}

export const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const finePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;
