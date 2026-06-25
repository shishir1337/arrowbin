import Script from "next/script";

/**
 * Loads Google Analytics 4 (gtag.js). Rendered only when NEXT_PUBLIC_GA_ID is set,
 * so it is fully inert in dev and for anyone who hasn't configured a GA property.
 *
 * Scripts load `lazyOnload` — i.e. only after the window `load` event, when the main
 * thread is idle. gtag.js is ~150 KiB and dominates script-evaluation / unused-JS on
 * mobile; deferring it moves that cost entirely out of the FCP/LCP/TBT window. The
 * inline init still defines `gtag()` synchronously into `dataLayer`, so any early
 * `gtag(...)` calls (e.g. the contact form's `generate_lead`) queue and flush once
 * the library arrives — no events are lost. page_view fires on every session.
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
    </>
  );
}
