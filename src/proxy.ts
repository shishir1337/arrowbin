import { type NextRequest, NextResponse } from "next/server";

/**
 * Cleans up URLs left over from the old WordPress site and the 2024 marketplace
 * that once lived on this domain (docs/seo/01-audit/redirect-map.csv), plus the
 * Japanese keyword-spam links that still point here (Search Console, 15 Oct
 * 2026: about 4,700 spam URLs, most of the domain's crawl):
 * - Pages with no current equivalent answer 410 Gone: an explicit "removed on
 *   purpose" signal (Google treats 404 and 410 alike, but other crawlers and
 *   people reading the logs see the intent). That covers the spam shop paths
 *   (*.php, *.html, *.htm, *.do, /goodscode/, /shopbrand/, /shopping/,
 *   /detail/); the live site has no URLs like these.
 * - Spam query variants of the homepage ("?channel=", "?_bd_prev_page=",
 *   "?_bdsid=", "?pcmypage?callback=") get a permanent redirect to the clean
 *   homepage, so the spam variants leave the index.
 * Redirects to pages that do exist are in next.config.ts.
 */
const SPAM_HOME_PARAMS = [
  "channel",
  "_bd_prev_page",
  "_bdsid",
  "pcmypage?callback",
];

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  if (pathname === "/") {
    if (SPAM_HOME_PARAMS.some((key) => searchParams.has(key))) {
      return NextResponse.redirect(new URL("/", request.url), 308);
    }
    return NextResponse.next();
  }
  return new NextResponse("Gone", {
    status: 410,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "x-robots-tag": "noindex",
    },
  });
}

export const config = {
  matcher: [
    // Homepage only when a spam query is present, so normal visits skip this.
    // (Matcher values must be literals: Next reads them at build time.)
    { source: "/", has: [{ type: "query", key: "channel" }] },
    { source: "/", has: [{ type: "query", key: "_bd_prev_page" }] },
    { source: "/", has: [{ type: "query", key: "_bdsid" }] },
    { source: "/", has: [{ type: "query", key: "pcmypage?callback" }] },
    "/explore",
    "/popular-products",
    "/become-seller",
    "/profile",
    "/products/:path*",
    "/backend/:path*",
    "/goodscode/:path*",
    "/shopbrand/:path*",
    "/shopping/:path*",
    "/detail/:path*",
    "/(.*\\.(?:php|html|htm|do))",
  ],
};
