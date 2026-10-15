import Script from "next/script";
import { AnalyticsEvents } from "./AnalyticsEvents";

/**
 * Loads Google Analytics 4 (gtag.js). The root layout renders it only when it has a
 * GA id (production builds), so it is fully inert in dev.
 *
 * Scripts load `lazyOnload`, i.e. only after the window `load` event, when the main
 * thread is idle. gtag.js is ~150 KiB and dominates script-evaluation / unused-JS on
 * mobile; deferring it moves that cost entirely out of the FCP/LCP/TBT window. Once
 * the inline init runs, `gtag()` pushes into `dataLayer`, which the library drains
 * when it arrives. page_view fires on every session.
 *
 * AnalyticsEvents adds web vitals and lead-action click events. Events sent through
 * `track()` (including the forms' `generate_lead`) before the init has run wait in
 * a small queue instead of being dropped (see track.ts).
 */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="lazyOnload"
      />
      <Script id="ga-init" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
      </Script>
      <AnalyticsEvents />
    </>
  );
}
