"use client";

/**
 * On-demand GSAP. Nothing here imports GSAP statically: `loadGsap()` fetches
 * gsap + ScrollTrigger the first time a component asks for it (the home page's
 * scroll motion and the magnetic buttons, both once the visitor starts using
 * the page), so pages that never call it never download it, and the first
 * screen paints and becomes interactive without it. Importing ScrollTrigger
 * also starts its endless empty frame loop (a Firefox repaint workaround), one
 * more reason to wait. Motion elsewhere uses CSS and the Web Animations API
 * (see lib/motion.ts).
 */

export type Gsap = typeof import("gsap").gsap;
export type ScrollTriggerStatic =
  typeof import("gsap/ScrollTrigger").ScrollTrigger;
export type GsapKit = { gsap: Gsap; ScrollTrigger: ScrollTriggerStatic };

let kit: Promise<GsapKit> | null = null;
const waiting = new Set<(k: GsapKit) => void>();

/**
 * Resolves once the whole page has its real layout. On phones, FirstFrame
 * skips the layout of below-the-fold sections for the first frame and then
 * lays them out a few frames later, ending with the `cv-off` class; positions
 * measured before that would be off. (The 3 s cap is only a safety net.)
 */
function laidOut(): Promise<void> {
  const root = document.documentElement;
  if (root.classList.contains("cv-off")) return Promise.resolve();
  return new Promise((resolve) => {
    const done = () => {
      mo.disconnect();
      clearTimeout(cap);
      resolve();
    };
    const mo = new MutationObserver(() => {
      if (root.classList.contains("cv-off")) done();
    });
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    const cap = setTimeout(done, 3000);
  });
}

export function loadGsap(): Promise<GsapKit> {
  if (!kit) {
    kit = Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      laidOut(),
    ]).then(([g, s]) => {
      g.gsap.registerPlugin(s.ScrollTrigger);
      g.gsap.defaults({ ease: "expo.out", duration: 1 });
      // Don't re-measure every trigger when a phone's address bar shows or
      // hides. (No `limitCallbacks`: reveals must still fire for sections
      // scrolled past quickly, or their content could stay hidden.)
      s.ScrollTrigger.config({ ignoreMobileResize: true });
      // Web fonts change text metrics (the display face especially), so
      // re-measure every trigger once they have loaded.
      document.fonts?.ready.then(() => s.ScrollTrigger.refresh());
      return { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger };
    });
    // A failed download is reported to whoever called loadGsap(), not here.
    kit.then(
      (k) => {
        for (const cb of waiting) cb(k);
        waiting.clear();
      },
      () => {},
    );
  }
  return kit;
}

/** GSAP if something has already asked for it (it may still be loading), else null. */
export function requestedGsap(): Promise<GsapKit> | null {
  return kit;
}

/**
 * Calls `cb` once GSAP is on the page, without loading it: right away (next
 * microtask) if something already did, otherwise when something first calls
 * `loadGsap()`. Returns a cancel function.
 */
export function whenGsapLoaded(cb: (k: GsapKit) => void): () => void {
  let live = true;
  const run = (k: GsapKit) => {
    if (live) cb(k);
  };
  if (kit) kit.then(run, () => {});
  else waiting.add(run);
  return () => {
    live = false;
    waiting.delete(run);
  };
}

export const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const finePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;
