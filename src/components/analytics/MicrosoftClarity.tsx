import Script from "next/script";
import { AfterIdle } from "./AfterIdle";
import { CONSENT_KEY } from "./consent";

/**
 * Loads Microsoft Clarity (heatmaps and session recordings). Like GA, the root
 * layout renders it only in production builds with a project id, and it loads
 * after the window load event (see AfterIdle), so it stays out of the LCP window.
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
    <AfterIdle>
      <Script id="clarity-init" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");try{var s=localStorage.getItem('${CONSENT_KEY}');if(s==='granted'||s==='denied')clarity('consentv2',{ad_Storage:'denied',analytics_Storage:s});}catch(e){}`}
      </Script>
    </AfterIdle>
  );
}
