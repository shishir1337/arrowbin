import Script from "next/script";

/**
 * Loads Microsoft Clarity (heatmaps and session recordings). Like GA, the root
 * layout renders it only in production builds with a project id, and it loads
 * `lazyOnload`, after the window load event, so it stays out of the LCP window.
 *
 * Clarity masks everything typed into inputs, textareas and drop-downs in every
 * masking mode, so form entries never reach it. Lead events sent through
 * `track()` are mirrored to Clarity, so recordings can be filtered by them.
 */
export function MicrosoftClarity({ clarityId }: { clarityId: string }) {
  return (
    <Script id="clarity-init" strategy="lazyOnload">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
    </Script>
  );
}
