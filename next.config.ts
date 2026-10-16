import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy. Inline scripts (the pre-paint theme script, JSON-LD, and
 * GA bootstrap) require 'unsafe-inline'; the GA/GTM hosts are allowlisted so analytics
 * works when NEXT_PUBLIC_GA_ID is set. Cloudflare Web Analytics is allowlisted too:
 * Cloudflare injects its beacon into every page at the edge, and it reports back to
 * cloudflareinsights.com. Microsoft Clarity's hosts are allowlisted per its CSP guide
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

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ""}https://www.googletagmanager.com https://static.cloudflareinsights.com ${CLARITY_HOSTS}`,
  "style-src 'self' 'unsafe-inline'",
  // GA4 endpoints per Google's CSP guide (developers.google.com/tag-platform/security/guides/csp):
  // besides google-analytics.com, gtag also sends hits to www.google.com/g/collect
  // (and a country domain such as google.com.bd), which the old list blocked.
  `img-src 'self' data: blob: ${GA_HOSTS} ${CLARITY_HOSTS}`,
  "font-src 'self' data:",
  `connect-src 'self' ${GA_HOSTS} https://cloudflareinsights.com ${CLARITY_HOSTS}`,
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
  // Note: `experimental.inlineCss` was removed. With the site's full stylesheet it
  // embedded the CSS three times per page (a <style> tag plus twice in the RSC
  // payload), ~300 KB raw on the homepage. A normal cached CSS file is far lighter.
  poweredByHeader: false,
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
