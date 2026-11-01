"use client";

import { type RefObject, useEffect, useRef } from "react";
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
 * Idle-time effect that also lazy-loads GSAP: `setup` runs once the browser is
 * idle *and* gsap/ScrollTrigger have loaded. Cleans up correctly even if the
 * component unmounts while GSAP is still loading.
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
          if (!dead) cleanup = fn.current(k);
        }, 600);
      });
    // The anchor is often a hidden <span>, which never intersects: watch its
    // section (or the footer) instead.
    const el = near?.current;
    const target = el
      ? (el.closest("section, footer") ?? el.parentElement)
      : null;
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
    return () => {
      dead = true;
      io?.disconnect();
      cancel?.();
      cleanup?.();
    };
  });
}
