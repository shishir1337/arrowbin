import { type NextRequest, NextResponse } from "next/server";

/**
 * Cleans up URLs left over from the old WordPress site and the 2024 marketplace
 * that once lived on this domain (docs/seo/01-audit/redirect-map.csv):
 * - Pages with no current equivalent answer 410 Gone: an explicit "removed on
 *   purpose" signal (Google treats 404 and 410 alike, but other crawlers and
 *   people reading the logs see the intent).
 * - Spam "?channel=" links pointing at the homepage get a permanent redirect
 *   to the clean homepage, so the spam variant leaves the index.
 * Redirects to pages that do exist are in next.config.ts.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/" && request.nextUrl.searchParams.has("channel")) {
    return NextResponse.redirect(new URL("/", request.url), 308);
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
    // Homepage only when the spam query is present, so normal visits skip this.
    { source: "/", has: [{ type: "query", key: "channel" }] },
    "/explore",
    "/popular-products",
    "/become-seller",
    "/profile",
    "/products/:path*",
    "/backend/:path*",
    "/products5070048.html",
  ],
};
