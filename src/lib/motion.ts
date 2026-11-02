/**
 * Motion helpers that need no animation library.
 */

/** expo.out, the site's default ease (globals.css --ease-out-expo, GSAP's default). */
export const EXPO_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * "Run this once the element has scrolled into place": calls each callback
 * once, the first time its element's top is above `line` (a share of the
 * viewport height from the top, like ScrollTrigger's "top 90%"), or right away
 * if it already is. Elements the visitor skipped past (a fast scroll, an
 * anchor jump) count as reached too, as with ScrollTrigger's `once`.
 *
 * One passive scroll listener and one read per frame for everything watched,
 * and none at all once nothing is left. Client only.
 */
type Watch = { el: Element; line: number; cb: () => void };

const watched = new Set<Watch>();
let raf = 0;
let listening = false;

function check() {
  raf = 0;
  const vh = window.innerHeight;
  // Reads first, then the callbacks (which may write).
  const reached: Watch[] = [];
  for (const w of watched) {
    if (w.el.getBoundingClientRect().top < vh * w.line) reached.push(w);
  }
  for (const w of reached) {
    watched.delete(w);
    w.cb();
  }
  if (!watched.size) stop();
}

function schedule() {
  if (!raf) raf = requestAnimationFrame(check);
}

function stop() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
}

/** Calls `cb` once `el` has reached `line`. Returns a cancel function. */
export function whenReached(
  el: Element,
  line: number,
  cb: () => void,
): () => void {
  const w = { el, line, cb };
  watched.add(w);
  if (!listening) {
    listening = true;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
  }
  schedule();
  return () => {
    watched.delete(w);
    if (!watched.size) stop();
  };
}

/**
 * A rise-and-fade entrance that plays once `node` reaches `line` (see
 * whenReached): the node waits at its starting pose (`y` px lower, transparent)
 * until then, like a GSAP `from` tween with a `once` ScrollTrigger. A Web
 * Animation sits on top of the node's own styles, so its CSS transitions and
 * hover states are untouched, and it ends at whatever opacity and transform
 * the node has. Returns a cleanup function.
 */
export function riseInWhenReached(
  node: HTMLElement,
  {
    y,
    ms,
    delayMs = 0,
    line,
  }: { y: number; ms: number; delayMs?: number; line: number },
): () => void {
  const anim = node.animate(
    [{ offset: 0, opacity: 0, transform: `translateY(${y}px)` }],
    { duration: ms, delay: delayMs, easing: EXPO_OUT, fill: "backwards" },
  );
  anim.pause();
  const cancel = whenReached(node, line, () => anim.play());
  return () => {
    cancel();
    anim.cancel();
  };
}

/**
 * Scroll-linked progress, like a ScrollTrigger with `scrub`: `progress` maps
 * the element's box (and the viewport height) to 0..1, and `apply` gets a
 * value that trails it by `lag` seconds of smoothing (about scrub × 0.3:
 * 0.12 for scrub 0.4, 0.18 for scrub 0.6). The first value applies at once,
 * so a page opened mid-way starts in the right pose. Returns a cleanup
 * function.
 */
export function scrubWithScroll(
  el: Element,
  progress: (box: DOMRect, vh: number) => number,
  lag: number,
  apply: (p: number) => void,
): () => void {
  let p = -1;
  let raf = 0;
  let last = 0;
  const tick = (now: number) => {
    raf = 0;
    const to = Math.min(
      1,
      Math.max(0, progress(el.getBoundingClientRect(), window.innerHeight)),
    );
    const dt = last ? Math.min(0.1, (now - last) / 1000) : 1 / 60;
    last = now;
    let next = to;
    if (p >= 0) {
      next = p + (to - p) * (1 - Math.exp(-dt / lag));
      if (Math.abs(to - next) < 0.001) next = to;
    }
    if (next !== p) {
      p = next;
      apply(p);
    }
    if (p !== to) schedule();
    else last = 0;
  };
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  schedule();
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  };
}
