/**
 * Lazy GSAP loader. GSAP (~70 KiB) is intentionally NOT imported statically anywhere —
 * it's code-split and fetched on demand via `loadGsap()` (on idle / first scroll
 * reveal), keeping it out of the initial bundle and off the critical path. The Hero's
 * entrance is pure CSS, so nothing above the fold depends on GSAP.
 */

/** The runtime type of the `gsap` instance, pulled in as a type-only import (erased). */
export type GsapInstance = typeof import("gsap").gsap;

let gsapPromise: Promise<GsapInstance> | null = null;

/** Dynamically import GSAP once and cache the promise. Subsequent calls reuse it. */
export function loadGsap(): Promise<GsapInstance> {
  if (!gsapPromise) {
    gsapPromise = import("gsap").then((m) => m.gsap);
  }
  return gsapPromise;
}

/** True when the user has asked for reduced motion. Safe during SSR. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
