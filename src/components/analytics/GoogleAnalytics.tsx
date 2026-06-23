import Script from "next/script";

/**
 * Loads Google Analytics 4 (gtag.js). Rendered only when NEXT_PUBLIC_GA_ID is set,
 * so it is fully inert in dev and for anyone who hasn't configured a GA property.
 * Scripts load `afterInteractive` to keep them off the critical path (no LCP cost).
 */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
      </Script>
    </>
  );
}
