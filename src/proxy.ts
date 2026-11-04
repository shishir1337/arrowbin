import { readFileSync } from "node:fs";
import { join } from "node:path";
import { type NextRequest, NextResponse } from "next/server";
import { isMissingArticle } from "@/lib/articles";
import { postSlugs } from "@/lib/blog";

/**
 * Two jobs:
 *
 * 1. Cleans up URLs left over from the old WordPress site and the 2024
 *    marketplace that once lived on this domain
 *    (docs/seo/01-audit/redirect-map.csv), plus the Japanese keyword-spam links
 *    that still point here (Search Console, 15 Oct 2026: about 4,700 spam URLs,
 *    most of the domain's crawl):
 *    - Pages with no current equivalent answer 410 Gone: an explicit "removed
 *      on purpose" signal (Google treats 404 and 410 alike, but other crawlers
 *      and people reading the logs see the intent). That covers the spam shop
 *      paths (*.php, *.html, *.htm, *.do, /goodscode/, /shopbrand/, /shopping/,
 *      /detail/); the live site has no URLs like these.
 *    - Spam query variants of the homepage ("?channel=", "?_bd_prev_page=",
 *      "?_bdsid=", "?pcmypage?callback=") get a permanent redirect to the clean
 *      homepage, so the spam variants leave the index.
 *    Redirects to pages that do exist are in next.config.ts.
 *
 * 2. Every page response gets a `Link: <…css>; rel=preload; as=style` header
 *    for the site's two stylesheets (cssPreloadLink below). The browser starts
 *    them as soon as the headers arrive, and Cloudflare can send them as 103
 *    Early Hints before the page itself. It also flattens the "HTML, then CSS,
 *    then font" chain that PageSpeed's "Network dependency tree" insight
 *    flags: preloaded files are not counted as chained critical requests.
 *    Side effect in Lighthouse's simulation: a preloaded stylesheet starts as
 *    "non-blocking" there, so its simulated first paint comes earlier and any
 *    long task right after it counts as blocking time. That is why FirstFrame
 *    lays the rest of a phone page out in short steps.
 *
 * 3. A /blog/<slug> that is neither a post in src/lib/posts nor a live RankYak
 *    article is rewritten to a path with no route, so Next answers with the
 *    site's own 404 page (status 404, full layout). Left to the page, a
 *    notFound() during an on-demand render returns Next's bare error document
 *    instead (`<html id="__next_error__">`: no lang, no styles, empty body
 *    until JavaScript draws it).
 */
const OWN_POSTS = new Set(postSlugs);
const BLOG_POST = /^\/blog\/([^/]+)$/;
const SPAM_HOME_PARAMS = [
  "channel",
  "_bd_prev_page",
  "_bdsid",
  "pcmypage?callback",
];

// The same paths as the 410 entries in `config.matcher` (case-sensitive, like
// the matcher): exact old pages, old sections with anything below them, and
// file-style spam URLs.
const GONE = [
  /^\/(?:explore|popular-products|become-seller|profile)$/,
  /^\/(?:products|backend|goodscode|shopbrand|shopping|detail)(?:\/.*)?$/,
  /^\/.*\.(?:php|html|htm|do)$/,
];

/**
 * The `Link` header value preloading the stylesheets of this build, or null.
 * Every route shares the root layout's two stylesheets (globals.css and the
 * next/font faces), so they are read once, from the head of the prerendered
 * homepage. If that file is missing or holds no stylesheet (a dev server, a
 * future Next.js layout), pages are served without the header; nothing else
 * depends on it.
 */
let cssLink: string | null | undefined;
function cssPreloadLink(): string | null {
  if (cssLink !== undefined) return cssLink;
  cssLink = null;
  if (process.env.NODE_ENV !== "production") return cssLink;
  try {
    const html = readFileSync(
      join(process.cwd(), ".next", "server", "app", "index.html"),
      "utf8",
    );
    const head = html.slice(0, html.indexOf("</head>"));
    const hrefs = [
      ...head.matchAll(/<link rel="stylesheet" href="(\/_next\/[^"]+\.css)"/g),
    ].map((m) => m[1]);
    if (hrefs.length > 0) {
      cssLink = hrefs
        .map((href) => `<${href}>; rel=preload; as=style`)
        .join(", ");
    }
  } catch {
    // No prerendered homepage to read: serve pages without the hint.
  }
  return cssLink;
}

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  if (
    pathname === "/" &&
    SPAM_HOME_PARAMS.some((key) => searchParams.has(key))
  ) {
    return NextResponse.redirect(new URL("/", request.url), 308);
  }
  if (GONE.some((re) => re.test(pathname))) {
    return new NextResponse("Gone", {
      status: 410,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-robots-tag": "noindex",
      },
    });
  }
  const post = BLOG_POST.exec(pathname)?.[1];
  const response =
    post && !OWN_POSTS.has(post) && (await isMissingArticle(post))
      ? NextResponse.rewrite(new URL("/_blog-post-not-found", request.url))
      : NextResponse.next();
  // Page loads only. Client-side navigations and prefetches are fetch()es
  // (Sec-Fetch-Dest "empty"; Next hides its own RSC markers from the proxy),
  // and the stylesheets are already on the page by then. Clients that send no
  // Sec-Fetch-Dest (crawlers, curl) get the header too; it is harmless there.
  const dest = request.headers.get("sec-fetch-dest");
  const link = dest && dest !== "document" ? null : cssPreloadLink();
  if (link) response.headers.set("Link", link);
  return response;
}

export const config = {
  matcher: [
    // Pages: any path without a dot (files such as robots.txt, images and
    // feeds have one), except Next's own assets, the API and the generated
    // icon and social images. (Matcher values must be literals: Next reads
    // them at build time.)
    "/((?!_next/|api/|apple-icon)(?!.*opengraph-image)[^.]*)",
    // The 410 paths that have a dot, or sit below an old section.
    "/products/:path*",
    "/backend/:path*",
    "/goodscode/:path*",
    "/shopbrand/:path*",
    "/shopping/:path*",
    "/detail/:path*",
    "/(.*\\.(?:php|html|htm|do))",
  ],
};
