import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy. Inline scripts (the pre-paint theme script, JSON-LD, and
 * GA bootstrap) require 'unsafe-inline'; the GA/GTM hosts are allowlisted so analytics
 * works when NEXT_PUBLIC_GA_ID is set. Cloudflare Web Analytics was turned off on
 * 1 Nov 2026 (Cloudflare > Web Analytics > arrowbin.com > Disable), so its hosts were
 * removed; if it is ever switched back on, add https://static.cloudflareinsights.com
 * to script-src and https://cloudflareinsights.com to connect-src, or Cloudflare's
 * beacon will be blocked. Microsoft Clarity's hosts are allowlisted per its CSP guide
 * (learn.microsoft.com/clarity/setup-and-installation/clarity-csp). 'unsafe-eval' is
 * added in development only (React's dev tooling needs it; production never does).
 * Everything else is same-origin.
 */
const GA_HOSTS = [
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://*.google.com",
  "https://*.google.com.bd",
  "https://*.g.doubleclick.net",
].join(" ");

const CLARITY_HOSTS = "https://*.clarity.ms https://c.bing.com";

// Google's "Add to preferred sources" button
// (developers.google.com/search/docs/appearance/preferred-sources): its script and
// a hidden frame come from news.google.com; the "G" logo it draws comes from
// www.gstatic.com, which img-src's https: covers.
const PREFERRED_SOURCE_HOST = "https://news.google.com";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ""}https://www.googletagmanager.com ${CLARITY_HOSTS} ${PREFERRED_SOURCE_HOST}`,
  "style-src 'self' 'unsafe-inline'",
  // Any HTTPS image: RankYak articles (src/lib/articles.ts) bring header and
  // body images from RankYak's own image hosts, which aren't known ahead.
  // Images can't run code, so this widens nothing that matters; scripts,
  // frames and connections stay on their allowlists. (The GA4 hosts per
  // Google's CSP guide, developers.google.com/tag-platform/security/guides/csp,
  // now fall under it too.)
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `frame-src 'self' ${PREFERRED_SOURCE_HOST}`,
  `connect-src 'self' ${GA_HOSTS} ${CLARITY_HOSTS}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Not `experimental.inlineCss`. It removes the stylesheets from PageSpeed's
  // "Network dependency tree" (an unscored insight), but Next.js also copies the
  // CSS twice into the RSC payload: the homepage HTML went from 307 KB to
  // 775 KB raw (38 KB to 63 KB brotli). Measured 1 Nov 2026 with
  // docs/seo/20-perf-2026-11-01/tools/lhfull.py --psi: mobile fell from 100 to
  // 99 on most pages and from 99 to 93 on the homepage (later FCP, more TBT).
  poweredByHeader: false,
  turbopack: {
    resolveAlias: {
      // Next's browser polyfills, minus the ones every browser Next supports
      // already has (PageSpeed's "Legacy JavaScript"). See the file.
      "../build/polyfills/polyfill-module": "./src/lib/next-polyfills.ts",
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Old URLs from the 2023 WordPress site and the 2024 marketplace that still
  // get visits or links, sent to their closest current page (permanent 308).
  // Pages with no equivalent return 410 from src/proxy.ts instead.
  // Source: docs/seo/01-audit/redirect-map.csv.
  async redirects() {
    return [
      ["/home", "/"],
      ["/contact-us", "/contact"],
      ["/help", "/contact"],
      ["/refund", "/terms"],
      ["/feed", "/blog/rss.xml"],
      ["/blog/feed", "/blog/rss.xml"],
      ["/sitemaps.xml", "/sitemap.xml"],
      ["/authors", "/about"],
      ["/authors/:slug", "/about"],
      ["/products/tags/blog", "/blog"],
      ["/portfolio", "/work"],
      ["/about-us", "/about"],
      ["/services/web-development", "/services/custom-software-development"],
    ].map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
