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
    const run = () => {
      if (!done) cleanup = fn.current();
    };
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const id = w.requestIdleCallback
      ? w.requestIdleCallback(run, { timeout: 1200 })
      : window.setTimeout(run, 1);
    return () => {
      done = true;
      if (w.cancelIdleCallback) w.cancelIdleCallback(id);
      else window.clearTimeout(id);
      cleanup?.();
    };
  }, []);
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
    loadGsap().then((k) => {
      if (!dead) cleanup = fn.current(k);
    });
    return () => {
      dead = true;
      cleanup?.();
    };
  });
}
