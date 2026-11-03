"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { pauseOffscreen } from "@/lib/offscreen";

/**
 * The <svg> of a ServiceArt piece. Its CSS loops (`.sa-*` in globals.css) are
 * paused while the piece is off screen (lib/offscreen.ts), and resume where
 * they stopped when it scrolls back. Chrome animates shapes inside an SVG on
 * the main thread, so off-screen pieces (the home services panels, the about
 * page's disciplines, the service index) were costing a full frame 60 times a
 * second from the moment the page loaded. Without JavaScript, everything simply
 * runs.
 */
export function ArtSvg({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const el = ref.current;
    return el ? pauseOffscreen(el) : undefined;
  }, []);
  return (
    <svg
      ref={ref}
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      {children}
    </svg>
  );
}
