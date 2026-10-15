/**
 * Sends a GA4 event through gtag. GA loads `lazyOnload` (after the window load
 * event, see GoogleAnalytics.tsx), so `window.gtag` does not exist for the first
 * moments of a visit. Events fired before then (FCP and TTFB, or a quick quote
 * submit on a slow connection) wait in a small queue and flush once gtag exists.
 *
 * Inert until `enableTracking()` runs, which only happens when GA is configured
 * (AnalyticsEvents is rendered by GoogleAnalytics), so dev and test builds never
 * queue anything.
 */

type Params = Record<string, string | number | boolean>;

const POLL_MS = 500;
const MAX_POLLS = 120; // stop waiting after a minute

let enabled = false;
let timer: number | undefined;
const queue: [string, Params][] = [];

function flush(): boolean {
  const gtag = window.gtag;
  if (!gtag) return false;
  for (const [name, params] of queue.splice(0)) gtag("event", name, params);
  return true;
}

function waitForGtag() {
  if (timer !== undefined) return;
  let polls = 0;
  timer = window.setInterval(() => {
    if (flush() || ++polls >= MAX_POLLS) {
      window.clearInterval(timer);
      timer = undefined;
      queue.length = 0;
    }
  }, POLL_MS);
}

export function enableTracking() {
  enabled = true;
}

export function track(name: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    flush();
    window.gtag("event", name, params);
    return;
  }
  if (!enabled) return;
  queue.push([name, params]);
  waitForGtag();
}
