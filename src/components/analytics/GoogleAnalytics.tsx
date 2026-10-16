import Script from "next/script";
import { AfterIdle } from "./AfterIdle";
import { AnalyticsEvents } from "./AnalyticsEvents";
import { CONSENT_KEY, CONSENT_REGIONS } from "./consent";

/**
 * Loads Google Analytics 4 (gtag.js). The root layout renders it only when it has a
 * GA id (production builds), so it is fully inert in dev.
 *
 * Scripts load only after the window `load` event, when the main thread is idle or
 * 4 s later at the latest (see AfterIdle). gtag.js is ~150 KiB and dominates
 * script-evaluation / unused-JS on mobile; deferring it moves that cost out of the
 * FCP/LCP window. Once the inline init runs, `gtag()` pushes into `dataLayer`, which
 * the library drains when it arrives. page_view fires on every session.
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
      <AfterIdle>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',region:${JSON.stringify(CONSENT_REGIONS)}});try{var c=localStorage.getItem('${CONSENT_KEY}');if(c==='granted'||c==='denied')gtag('consent','update',{analytics_storage:c});}catch(e){}gtag('js',new Date());gtag('config','${gaId}');`}
        </Script>
      </AfterIdle>
      <AnalyticsEvents />
    </>
  );
}
