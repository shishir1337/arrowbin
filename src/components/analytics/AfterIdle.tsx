"use client";

import { type ReactNode, useEffect, useState } from "react";

/** Load the scripts this long after the load event at the latest. */
const MAX_WAIT_MS = 4000;

/**
 * Renders its children (the analytics scripts) once the page has loaded and the
 * browser is idle, or MAX_WAIT_MS after the load event at the latest, so they
 * stay out of the LCP window.
 *
 * Not next/script's `lazyOnload`: it waits for an idle callback with no
 * deadline, and on the home page that callback never ran, so GA and Clarity
 * never loaded there (seen on the live site, 17 Oct 2026). Scripts inside use
 * `afterInteractive`, which loads them as soon as they render.
 */
export function AfterIdle({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idle = 0;
    let timer = 0;
    const go = () => setReady(true);
    const schedule = () => {
      // Safari only gained requestIdleCallback recently.
      if (typeof requestIdleCallback === "function") {
        idle = requestIdleCallback(go, { timeout: MAX_WAIT_MS });
      } else {
        timer = window.setTimeout(go, 1);
      }
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idle) cancelIdleCallback(idle);
      window.clearTimeout(timer);
    };
  }, []);

  return ready ? children : null;
}
