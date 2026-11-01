"use client";

import { type ReactNode, useSyncExternalStore } from "react";
import { siteUrl } from "@/lib/site";

const SITE_HOST = new URL(siteUrl).hostname;

const subscribe = () => () => {};
const onSiteHost = () => window.location.hostname === SITE_HOST;
const onServer = () => false;

/**
 * Renders its children (the analytics scripts) only on the live domain.
 *
 * The layout renders GA and Clarity in every production build, and a local
 * `next start` is a production build too. Before this guard, local test runs
 * (Lighthouse, PageSpeed checks) sent their visits to the live GA property:
 * 710 of 946 sessions from 5 Oct to 1 Nov 2026 had the hostname `localhost`
 * or `127.0.0.1`. Nothing renders on the server or before hydration, so the
 * check can't cause a hydration mismatch.
 */
export function OnSiteHost({ children }: { children: ReactNode }) {
  const onSite = useSyncExternalStore(subscribe, onSiteHost, onServer);
  return onSite ? children : null;
}
