"use client";

import dynamic from "next/dynamic";

/**
 * Defers the CursorGlow chunk out of the initial hydration bundle. The glow is
 * purely decorative (mouse-only, never under reduced-motion), so it loads as an
 * idle client chunk after the page is interactive — keeping it off the critical
 * path on every route. `ssr: false` is only permitted inside a Client Component,
 * hence this thin wrapper rather than a dynamic() call in the server layout.
 */
const CursorGlow = dynamic(
  () => import("./CursorGlow").then((m) => m.CursorGlow),
  { ssr: false },
);

export function CursorGlowMount() {
  return <CursorGlow />;
}
