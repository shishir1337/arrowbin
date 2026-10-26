"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  PREFERRED_SOURCE_BADGE,
  PREFERRED_SOURCE_FAILED,
  PREFERRED_SOURCE_LINK,
} from "./preferred-source";

/** Fallback badge height, in px; the width follows the badge's ratio. */
const BADGE_HEIGHT = 50;

/**
 * Google's standard "Add to preferred sources" button (the recommended option in
 * developers.google.com/search/docs/appearance/preferred-sources). PreferredSourceScript
 * loads publisher.js, which turns every `[google-add-preferred-source-btn]` element
 * into the button; the reader adds Arrowbin and comes back to the page.
 *
 * The script scans for buttons only when it loads or when `init()` runs, so each
 * button also queues an `init()` through Google's `PREFERRED_SOURCE` queue: that
 * covers buttons that appear after a client-side navigation (`init()` skips the
 * ones already drawn). The element renders after mount only, because the script
 * fills it with its own markup, which would not match the server HTML at hydration.
 * The wrapper reserves the button's 40 px height so nothing shifts when it appears.
 *
 * If the script is blocked, Google's badge links to its source preferences page.
 */
export function PreferredSourceButton({
  className = "",
}: {
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.preferredSourceFailed) {
      setFailed(true);
      return;
    }
    const onFail = () => setFailed(true);
    window.addEventListener(PREFERRED_SOURCE_FAILED, onFail);
    return () => window.removeEventListener(PREFERRED_SOURCE_FAILED, onFail);
  }, []);

  useEffect(() => {
    if (!mounted || failed) return;
    window.PREFERRED_SOURCE ??= [];
    window.PREFERRED_SOURCE.push((api) => api.init());
  }, [mounted, failed]);

  const badgeWidth = Math.round(
    (BADGE_HEIGHT * PREFERRED_SOURCE_BADGE.width) /
      PREFERRED_SOURCE_BADGE.height,
  );

  return (
    <div className={`min-h-10 ${className}`}>
      {failed ? (
        <a
          href={PREFERRED_SOURCE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Image
            src={PREFERRED_SOURCE_BADGE.src}
            alt={`${PREFERRED_SOURCE_BADGE.alt} (opens in a new tab)`}
            width={badgeWidth}
            height={BADGE_HEIGHT}
            className="block"
          />
        </a>
      ) : mounted ? (
        <div google-add-preferred-source-btn="" data-lang="en" />
      ) : null}
    </div>
  );
}
