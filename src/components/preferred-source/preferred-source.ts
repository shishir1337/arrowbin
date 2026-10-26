import { siteUrl } from "@/lib/site";

/**
 * Google Preferred Sources (developers.google.com/search/docs/appearance/preferred-sources):
 * a reader who adds arrowbin.com sees our posts more often in their Top Stories, with
 * a "preferred" badge in AI Overviews and AI Mode.
 */

export const PREFERRED_SOURCE_SCRIPT =
  "https://news.google.com/swg/js/v1/publisher.js";

/**
 * Google's deeplink to its source preferences page for arrowbin.com. Used when the
 * script cannot run: Brave Shields and tracker blockers block publisher.js.
 */
export const PREFERRED_SOURCE_LINK = `https://www.google.com/preferences/source?q=${new URL(siteUrl).hostname}`;

/**
 * Google's own English light badge from the "Download button assets" pack in the
 * guide above, untouched; shown with the deeplink when the script cannot run.
 */
export const PREFERRED_SOURCE_BADGE = {
  src: "/google-preferred-source-badge/badge-light-en.png",
  /** Native size of the supplied @2x asset; keep the ratio when scaling. */
  width: 676,
  height: 213,
  alt: "Add Arrowbin as a preferred source on Google",
} as const;

/** Fired on window when publisher.js fails to load or loads without running. */
export const PREFERRED_SOURCE_FAILED = "arrowbin:preferred-source-failed";

type PreferredSourceApi = { init: () => void };

declare global {
  interface Window {
    /**
     * Google's queue: an array of callbacks until publisher.js runs, then an object
     * whose `push` calls each callback with the API straight away.
     */
    PREFERRED_SOURCE?:
      | ((api: PreferredSourceApi) => void)[]
      | { push: (...callbacks: ((api: PreferredSourceApi) => void)[]) => void };
    /** Set when publisher.js failed (see PreferredSourceScript). */
    preferredSourceFailed?: boolean;
  }
}
