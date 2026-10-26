"use client";

import Script from "next/script";
import { AfterIdle } from "@/components/analytics/AfterIdle";
import {
  PREFERRED_SOURCE_FAILED,
  PREFERRED_SOURCE_SCRIPT,
} from "./preferred-source";

function fail() {
  window.preferredSourceFailed = true;
  window.dispatchEvent(new Event(PREFERRED_SOURCE_FAILED));
}

/**
 * Google's preferred sources library (~40 KB gzipped), loaded once for every
 * PreferredSourceButton on the page. Like the analytics scripts, it waits for the
 * load event and an idle moment (see AfterIdle), so it stays out of the LCP window.
 * Its hosts are allowlisted in the CSP (next.config.ts).
 *
 * When the script is blocked (Brave Shields, tracker blockers), or a blocker swaps
 * it for an empty stub so it loads but never replaces Google's queue array, the
 * buttons fall back to Google's badge and deeplink.
 */
export function PreferredSourceScript() {
  return (
    <AfterIdle>
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
    </AfterIdle>
  );
}
