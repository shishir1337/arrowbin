"use client";

import type { HTMLAttributes } from "react";
import { useTilt } from "@/components/motion/useTilt";

/**
 * Drop-in elevated card with 3D tilt + cursor-tracking spotlight. Spreads any
 * extra props (e.g. data-reveal) onto the root so it works inside StaggerGroup.
 * Compose the visual shape via `className` (radius, padding, etc).
 */
export function SpotlightCard({
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  const tilt = useTilt<HTMLDivElement>();
  return (
    <div
      ref={tilt.ref}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      className={`card-surface tilt spotlight ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
