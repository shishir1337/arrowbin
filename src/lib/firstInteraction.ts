/**
 * The visitor's first interaction with the page: a touch, wheel, key press,
 * click or pointer move. Lighthouse and PageSpeed Insights never send any of
 * them, so work gated on this stays out of lab page loads.
 *
 * Used by AfterInteraction (third-party scripts) and Magnetic (GSAP for the
 * button pull). Client only: the listeners are added when this module first
 * loads in the browser.
 *
 * Not `scroll`: the page fires it by itself during load (scroll restoration and
 * ScrollTrigger's measuring, seen twice on the home page with no input). A
 * person scrolling starts with `touchstart`, `wheel`, a key or a pointer move.
 */
const EVENTS = [
  "pointerdown",
  "pointermove",
  "keydown",
  "touchstart",
  "wheel",
] as const;

let interacted = false;
const waiting = new Set<() => void>();

function fire() {
  if (interacted) return;
  interacted = true;
  for (const type of EVENTS) window.removeEventListener(type, fire, true);
  for (const cb of waiting) cb();
  waiting.clear();
}

if (typeof window !== "undefined") {
  for (const type of EVENTS) {
    window.addEventListener(type, fire, { capture: true, passive: true });
  }
}

/** True once the visitor has interacted with the page. */
export function hasInteracted(): boolean {
  return interacted;
}

/** Calls `cb` once, on the visitor's first interaction. Returns a cancel function. */
export function onFirstInteraction(cb: () => void): () => void {
  if (interacted) {
    const id = window.setTimeout(cb, 0);
    return () => window.clearTimeout(id);
  }
  waiting.add(cb);
  return () => waiting.delete(cb);
}
