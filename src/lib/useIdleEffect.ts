"use client";

import { type RefObject, useEffect, useRef } from "react";
import { onFirstInteraction } from "./firstInteraction";
import { type GsapKit, loadGsap } from "./gsap";

/**
 * Like useEffect, but the effect body runs in browser idle time (with a timeout
 * cap). Below-the-fold sections set up their scroll animations this way, so each
 * one becomes its own short task instead of one long hydration-time block that
 * delays interactivity on phones.
 *
 * Runs once per mount (like `useEffect(fn, [])`); the latest `effect` is used.
 */
export function useIdleEffect(effect: () => undefined | (() => void)) {
  const fn = useRef(effect);
  fn.current = effect;
  useEffect(() => {
    let cleanup: undefined | (() => void);
    let done = false;
    const cancel = whenIdle(() => {
      if (!done) cleanup = fn.current();
    }, 1200);
    return () => {
      done = true;
      cancel();
      cleanup?.();
    };
  }, []);
}

/**
 * Runs `cb` in browser idle time (capped by `timeout` ms), or on a short timer
 * where requestIdleCallback is missing. Returns a cancel function.
 */
export function whenIdle(cb: () => void, timeout: number): () => void {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  if (w.requestIdleCallback && w.cancelIdleCallback) {
    const id = w.requestIdleCallback(cb, { timeout });
    return () => w.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(cb, 1);
  return () => window.clearTimeout(id);
}

/**
 * How far ahead of the viewport a `near` section sets up its motion: two
 * screen heights above and below. Far enough that even a fast fling or a
 * smooth-scroll wheel burst cannot reach the section before its starting state
 * is in place.
 */
export const NEAR_MARGIN = "200% 0px 200% 0px";

/**
 * Calls `cb` once the visitor starts using the page (a touch, wheel, key or
 * pointer move: lib/firstInteraction), or once the page actually scrolls
 * away from the top (the browser's find bar, assistive tech and scripts send
 * none of those inputs), or right away when the page opened already scrolled
 * (a restored position or a #hash), where sections further down can be on
 * screen. Returns a cancel function.
 *
 * For the home page's scroll motion: the hero fills the first screen, and
 * until the page scrolls every section sits in the pose its scroll animations
 * start from, so setting them up can wait. That keeps GSAP and its layout
 * measuring (and ScrollTrigger's endless frame loop) out of the page load.
 */
export function whenEngaged(cb: () => void): () => void {
  if (window.scrollY > 0 || window.location.hash) {
    cb();
    return () => {};
  }
  let done = false;
  let stopInput = () => {};
  const stopScroll = () => window.removeEventListener("scroll", onScroll);
  const fire = () => {
    if (done) return;
    done = true;
    stopScroll();
    stopInput();
    cb();
  };
  // The page fires `scroll` at the top by itself during load (scroll
  // restoration), so only a real move counts.
  const onScroll = () => {
    if (window.scrollY > 0) fire();
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  stopInput = onFirstInteraction(fire);
  return () => {
    done = true;
    stopScroll();
    stopInput();
  };
}

/**
 * Keeps what the visitor is looking at in place while the home sections set up
 * their scroll motion. A pinned section adds its scroll length as space below
 * itself when it sets up, so a setup that runs while the visitor is already
 * further down (they opened a #link, pressed End, used the find bar) pushed
 * the content they were reading about 3,000 px away. Before the first setup,
 * the top-level section in the middle of the screen is noted; after each setup
 * and each ScrollTrigger re-measure, the page scrolls by however far that
 * section moved. The hold ends at the visitor's next input or after 3 s.
 */
let held: { el: Element; top: number } | null = null;
let heldUntil = 0;
let refreshHooked = false;
const RELEASE = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

// A pinned section ends up inside GSAP's .pin-spacer, which keeps the
// section's place in the page while the section itself is fixed to the screen.
const topOf = (el: Element) =>
  (el.parentElement?.classList.contains("pin-spacer")
    ? el.parentElement
    : el
  ).getBoundingClientRect().top;

function release() {
  held = null;
  for (const type of RELEASE) window.removeEventListener(type, release, true);
}

function holdView(ScrollTrigger: GsapKit["ScrollTrigger"]) {
  if (!refreshHooked) {
    refreshHooked = true;
    ScrollTrigger.addEventListener("refresh", restoreView);
  }
  if (held || window.scrollY <= 0) return;
  const el = document
    .elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
    ?.closest("main > *, body > footer");
  if (!el) return;
  held = { el, top: topOf(el) };
  heldUntil = performance.now() + 3000;
  for (const type of RELEASE) {
    window.addEventListener(type, release, { capture: true, passive: true });
  }
}

function restoreView() {
  if (!held) return;
  if (performance.now() > heldUntil) return release();
  const moved = topOf(held.el) - held.top;
  if (Math.abs(moved) < 1) return;
  // A plain scroll, not Lenis: Lenis may not have measured the taller page
  // yet and would cap the jump. It follows native scrolls by itself.
  window.scrollTo(0, window.scrollY + moved);
}

/**
 * Idle-time effect that also lazy-loads GSAP: `setup` runs once the browser is
 * idle, the visitor has started using the page (see whenEngaged) *and*
 * gsap/ScrollTrigger have loaded. Cleans up correctly even if the component
 * unmounts while GSAP is still loading.
 *
 * `near`: an element inside the section the motion belongs to. The setup then
 * also waits until that section is within two screen heights of the viewport
 * (see NEAR_MARGIN). Sections further down the page set up as the visitor
 * scrolls toward them instead of all during the page load, where their
 * ScrollTrigger measurements added up to long main-thread tasks on phones.
 * Use it only for sections below every pinned section, so triggers are still
 * created top to bottom and pin spacing is measured in order.
 */
export function useGsapIdle(
  setup: (kit: GsapKit) => undefined | (() => void),
  near?: RefObject<Element | null>,
) {
  const fn = useRef(setup);
  fn.current = setup;
  useIdleEffect(() => {
    let cleanup: undefined | (() => void);
    let dead = false;
    let cancel: undefined | (() => void);
    let io: IntersectionObserver | undefined;
    const go = () =>
      loadGsap().then((k) => {
        if (dead) return;
        // Every section waiting on GSAP resumes in the same microtask flush
        // when it arrives; giving each setup its own idle task keeps that from
        // becoming one long task during load.
        cancel = whenIdle(() => {
          if (dead) return;
          holdView(k.ScrollTrigger);
          cleanup = fn.current(k);
          restoreView();
        }, 600);
      });
    // The anchor is often a hidden <span>, which never intersects: watch its
    // section (or the footer) instead.
    const el = near?.current;
    const target = el
      ? (el.closest("section, footer") ?? el.parentElement)
      : null;
    const offEngaged = whenEngaged(() => {
      if (dead) return;
      if (target) {
        io = new IntersectionObserver(
          (entries) => {
            if (!entries.some((e) => e.isIntersecting)) return;
            io?.disconnect();
            go();
          },
          { rootMargin: NEAR_MARGIN },
        );
        io.observe(target);
      } else go();
    });
    return () => {
      dead = true;
      offEngaged();
      io?.disconnect();
      cancel?.();
      cleanup?.();
    };
  });
}
