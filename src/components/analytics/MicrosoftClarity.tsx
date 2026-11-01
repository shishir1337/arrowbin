import Script from "next/script";
import { AfterIdle } from "./AfterIdle";
import { AfterInteraction } from "./AfterInteraction";
import { CONSENT_KEY } from "./consent";

/**
 * Loads Microsoft Clarity (heatmaps and session recordings). Like GA, the root
 * layout renders it only in production builds with a project id.
 *
 * Two steps:
 * - At idle after the load event (see AfterIdle), the `clarity()` queue from
 *   Clarity's own snippet is created and the saved consent choice is queued, so
 *   lead events sent through `track()` are kept from then on.
 * - Clarity's tag (which sets its cookies and loads clarity.js) is added on the
 *   visitor's first interaction (see AfterInteraction). Clarity sets
 *   third-party cookies on clarity.ms and bing.com, which Lighthouse's Best
 *   Practices audit fails, and a visit with no input has nothing to record.
 *   Clarity captures the page as it is when it starts, so recordings and
 *   heatmaps still cover the whole visit from the first scroll or tap.
 *
 * Clarity masks everything typed into inputs, textareas and drop-downs in every
 * masking mode, so form entries never reach it. Lead events sent through
 * `track()` are mirrored to Clarity, so recordings can be filtered by them.
 *
 * Consent: Clarity itself runs without cookies for EEA, UK and Swiss visitors
 * until it gets a signal. A choice saved by the cookie banner is passed on
 * every page load (see consent.ts).
 */
export function MicrosoftClarity({ clarityId }: { clarityId: string }) {
  return (
    <>
      <AfterIdle>
        <Script id="clarity-init" strategy="afterInteractive">
          {`window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments)};try{var s=localStorage.getItem('${CONSENT_KEY}');if(s==='granted'||s==='denied')clarity('consentv2',{ad_Storage:'denied',analytics_Storage:s});}catch(e){}`}
        </Script>
      </AfterIdle>
      {/* Clarity's own snippet: it creates the queue too if the step above
          hasn't run yet, because the tag calls `clarity()` as soon as it loads. */}
      <AfterInteraction>
        <Script id="clarity-tag" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      </AfterInteraction>
    </>
  );
}
