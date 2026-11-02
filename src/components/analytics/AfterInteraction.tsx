"use client";

import { type ReactNode, useEffect, useState } from "react";
import { onFirstInteraction } from "@/lib/firstInteraction";
import { whenIdle } from "@/lib/useIdleEffect";

/**
 * Renders its children (third-party scripts) after the visitor's first
 * interaction: a touch, wheel, key press, click or pointer move (see
 * lib/firstInteraction.ts). The script then starts in the next idle moment,
 * so its download and start-up never compete with the frame that answers that
 * first input.
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
