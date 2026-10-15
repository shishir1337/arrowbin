"use client";

import { type ComponentType, createElement, lazy } from "react";

/**
 * Below-the-fold client islands, code-split out of the page's first scripts.
 *
 * Each export renders exactly the same component as before (same props, same
 * server HTML). The only difference is when its JavaScript loads: the page no
 * longer lists it among the async <script> tags in <head>; the browser fetches
 * it during hydration, when React reaches the island. There is deliberately no
 * <Suspense> boundary (React would stream any boundary over 500 bytes as a
 * hidden block after </main>) and no next/dynamic (its SSR path emits a
 * <link rel="preload"> per chunk in <head>, which starts the download before
 * first paint again). Without a boundary, hydration simply waits for the chunk
 * and then commits everything in one go, in the same order as before.
 *
 * Only worth it where the page paints before hydration starts (/contact,
 * /about): a chunk fetched at hydration hangs one level deeper in Lighthouse's
 * dependency graph, so on a page whose first paint comes after hydration (home,
 * /work, blog posts today) it cost simulated LCP instead of saving it, and those
 * pages keep static imports. The service pages' per-slug demos use next/dynamic
 * instead (services/signature/demos.tsx).
 */

type Load<P> = () => Promise<ComponentType<P>>;

const loaders = new Map<string, () => Promise<unknown>>();

function island<P extends object>(key: string, load: Load<P>) {
  let mod: Promise<{ default: ComponentType<P> }> | undefined;
  const start = () => {
    mod ??= load().then((C) => ({ default: C }));
    return mod;
  };
  loaders.set(key, start);
  const Lazy = lazy(start);
  function Island(props: P) {
    return createElement(Lazy as ComponentType<P>, props);
  }
  Island.displayName = `Island(${key})`;
  return Island;
}

/**
 * Starts every listed island's download at once, so hydration waits for one
 * round trip instead of one per island (React would otherwise discover them
 * one after another). Client only; renders nothing.
 */
export function IslandPreload({ keys }: { keys: readonly string[] }) {
  if (typeof window !== "undefined") {
    for (const k of keys) loaders.get(k)?.();
  }
  return null;
}

export const AboutValues = island("aboutValues", () =>
  import("../about/AboutValues").then((m) => m.AboutValues),
);
export const ContactBrief = island("contactBrief", () =>
  import("../contact/ContactBrief").then((m) => m.ContactBrief),
);
