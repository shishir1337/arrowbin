"use client";

import Script from "next/script";
import { AfterInteraction } from "@/components/analytics/AfterInteraction";
import {
  PREFERRED_SOURCE_FAILED,
  PREFERRED_SOURCE_SCRIPT,
} from "./preferred-source";

function fail() {
  window.preferredSourceFailed = true;
  window.dispatchEvent(new Event(PREFERRED_SOURCE_FAILED));
}

/**
 * Google's preferred sources library (~40 KB gzipped, then ~180 KB more from
 * gstatic.com and a news.google.com frame), loaded once for every
 * PreferredSourceButton on the page. It waits for the load event and the
 * visitor's first interaction (see AfterInteraction): both buttons sit far below
 * the fold (the end of each post and the footer), so they are always drawn before
 * anyone scrolls to them, and the frame's cookie issues never touch the page load.
 * Its hosts are allowlisted in the CSP (next.config.ts).
 *
 * When the script is blocked (Brave Shields, tracker blockers), or a blocker swaps
 * it for an empty stub so it loads but never replaces Google's queue array, the
 * buttons fall back to Google's badge and deeplink.
 */
export function PreferredSourceScript() {
  return (
    <AfterInteraction>
      <Script
        src={PREFERRED_SOURCE_SCRIPT}
        strategy="afterInteractive"
        onLoad={() => {
          if (
            !window.PREFERRED_SOURCE ||
            Array.isArray(window.PREFERRED_SOURCE)
          )
            fail();
        }}
        onError={fail}
      />
    </AfterInteraction>
  );
}
