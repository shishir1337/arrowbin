"use client";

import { useEffect, useRef } from "react";
import { pauseOffscreen } from "@/lib/offscreen";

/**
 * A decorative <span> with a looping CSS animation (in `className`) that
 * pauses while it is off screen (lib/offscreen.ts, `[data-loop][data-off]` in
 * globals.css). For loops Chrome keeps on the main thread: the CTA's pulsing
 * ring, below the fold, was costing about 100 ms of main-thread work per
 * second on a fast desktop while nobody could see it.
 */
export function OffscreenLoop({ className }: { className: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    return el ? pauseOffscreen(el) : undefined;
  }, []);
  return (
    <span ref={ref} data-loop="" aria-hidden="true" className={className} />
  );
}
