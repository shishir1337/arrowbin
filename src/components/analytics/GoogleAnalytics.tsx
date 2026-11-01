import Script from "next/script";
import { AfterIdle } from "./AfterIdle";
import { AfterInteraction } from "./AfterInteraction";
import { AnalyticsEvents } from "./AnalyticsEvents";
import { CONSENT_KEY, CONSENT_REGIONS } from "./consent";

/**
 * With no interaction, gtag.js still loads this long after the load event, so
 * a visitor who reads without touching anything is counted. Well past the end
 * of a lab page load (Lighthouse stops a few seconds after the load event).
 */
const LIBRARY_FALLBACK_MS = 10_000;

/**
 * Loads Google Analytics 4 (gtag.js). The root layout renders it only when it has a
 * GA id (production builds), so it is fully inert in dev.
 *
 * The inline init runs after the window `load` event, when the main thread is idle
 * or 4 s later at the latest (see AfterIdle). The gtag.js library (~180 KiB, the
 * biggest script-evaluation and unused-JS cost on mobile) waits for the first
 * interaction, or 10 s without one (see AfterInteraction), so it is out of the
 * page load entirely. Once the init runs, `gtag()` pushes into `dataLayer`, which
 * the library drains when it arrives. page_view fires on every session that
 * interacts or stays 10 s.
 *
 * AnalyticsEvents adds web vitals and lead-action click events. Events sent through
 * `track()` (including the forms' `generate_lead`) before the init has run wait in
 * a small queue instead of being dropped (see track.ts).
 *
 * Consent mode: in the EEA, the UK and Switzerland (Google applies the region
 * from the IP) analytics storage starts denied, so GA sends cookieless pings
 * until the visitor accepts. A choice saved by the cookie banner is applied
 * before the config call (see consent.ts).
 */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      {/* The gtag.js library (~180 KB) waits for the visitor's first
          interaction, or LIBRARY_FALLBACK_MS after load without one (see
          AfterInteraction). The init below still runs at idle, so `gtag()`
          exists early: the consent defaults, the page view and any event sent
          before the library arrives wait in `dataLayer`, and the library sends
          them in order when it loads. */}
      <AfterInteraction fallbackMs={LIBRARY_FALLBACK_MS}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
      </AfterInteraction>
      <AfterIdle>
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',region:${JSON.stringify(CONSENT_REGIONS)}});try{var c=localStorage.getItem('${CONSENT_KEY}');if(c==='granted'||c==='denied')gtag('consent','update',{analytics_storage:c});}catch(e){}gtag('js',new Date());gtag('config','${gaId}');`}
        </Script>
      </AfterIdle>
      <AnalyticsEvents />
    </>
  );
}
