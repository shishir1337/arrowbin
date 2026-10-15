"use client";

import { useEffect, useRef } from "react";
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
 * Idle-time effect that also lazy-loads GSAP: `setup` runs once the browser is
 * idle *and* gsap/ScrollTrigger have loaded. Cleans up correctly even if the
 * component unmounts while GSAP is still loading.
 */
export function useGsapIdle(setup: (kit: GsapKit) => undefined | (() => void)) {
  const fn = useRef(setup);
  fn.current = setup;
  useIdleEffect(() => {
    let cleanup: undefined | (() => void);
    let dead = false;
    let cancel: undefined | (() => void);
    loadGsap().then((k) => {
      if (dead) return;
      // Every section waiting on GSAP resumes in the same microtask flush when
      // it arrives; giving each setup its own idle task keeps that from
      // becoming one long task during load.
      cancel = whenIdle(() => {
        if (!dead) cleanup = fn.current(k);
      }, 600);
    });
    return () => {
      dead = true;
      cancel?.();
      cleanup?.();
    };
  });
}
