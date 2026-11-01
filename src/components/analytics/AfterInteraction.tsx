"use client";

import { type ReactNode, useEffect, useState } from "react";
import { whenIdle } from "@/lib/useIdleEffect";

/**
 * Inputs that mean a person is using the page. Lighthouse and PageSpeed
 * Insights never send any of them, so scripts gated on these stay out of lab
 * page loads (where Clarity's cookies cost the Best Practices score and the
 * scripts' work counts against Total Blocking Time).
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

// Listen from the moment this module loads (with the first page scripts), so
// a visitor who scrolls before hydration finishes still counts.
if (typeof window !== "undefined") {
  for (const type of EVENTS) {
    window.addEventListener(type, fire, {
      capture: true,
      passive: true,
    });
  }
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

/**
 * Renders its children (third-party scripts) after the visitor's first
 * interaction: a touch, wheel, key press, click or pointer move. The script
 * then starts in the next idle moment, so its download and start-up never
 * compete with the frame that answers that first input.
 *
 * `fallbackMs`: also render this long after the load event when nobody has
 * interacted by then (GA, so a visit with no input is still counted).
 *
 * Why not AfterIdle: Microsoft Clarity sets third-party cookies (c.clarity.ms,
 * c.bing.com) and Google's preferred-source frame logs cookie issues, which
 * fail two Lighthouse Best Practices audits, and all three scripts add main-thread
 * work during the load that every visitor waits through.
 */
export function AfterInteraction({
  children,
  fallbackMs,
}: {
  children: ReactNode;
  fallbackMs?: number;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelIdle: undefined | (() => void);
    let timer = 0;
    let off = () => {};
    const go = () => {
      if (cancelIdle) return;
      off();
      window.clearTimeout(timer);
      cancelIdle = whenIdle(() => setReady(true), 2000);
    };
    // Never before the load event, like AfterIdle: an early tap or scroll
    // must not pull these scripts into the page load.
    const loaded = () => {
      off = onFirstInteraction(go);
      if (fallbackMs !== undefined) timer = window.setTimeout(go, fallbackMs);
    };
    if (document.readyState === "complete") loaded();
    else window.addEventListener("load", loaded, { once: true });
    return () => {
      off();
      cancelIdle?.();
      window.clearTimeout(timer);
      window.removeEventListener("load", loaded);
    };
  }, [fallbackMs]);

  return ready ? children : null;
}
