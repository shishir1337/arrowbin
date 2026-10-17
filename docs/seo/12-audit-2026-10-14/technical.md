# Arrowbin technical SEO audit, 14 October 2026

Scope: https://arrowbin.com (LIVE, commit 959866d) vs http://localhost:3117 (LOCAL, uncommitted fixes). Method: Python stdlib HTTP probes without redirect following, all 19 sitemap URLs fetched on both, 23 legacy URLs and 19 extra probes on both, link graph built from raw HTML. Read-only; nothing installed, built or edited. Lighthouse was not run (CWV items are source-level only). Scripts live in the session scratchpad.

## Technical score

| | LIVE | LOCAL (projected once deployed) |
|---|---|---|
| Overall | **62 / 100** | **89 / 100** |

| Category | LIVE | LOCAL | Notes |
|---|---|---|---|
| 1 Crawlability | 82 | 92 | robots + sitemap valid; local adds Claude-SearchBot/Claude-User, `Disallow: /api`, honest lastmod |
| 2 Indexability | 48 | 90 | legacy 404s and `?channel=` 200 on live; all handled locally |
| 3 Security headers | 92 | 96 | same headers; X-Powered-By removed locally |
| 4 URL structure | 85 | 95 | spam/param variants stripped locally |
| 5 Mobile | 78 | 80 | viewport OK everywhere; performance unmeasured |
| 6 Core Web Vitals (source) | 50 | 55 | unmeasured; 87 scripts live vs 74 local on home |
| 7 Structured data | 70 | 90 | duplicate @ids gone, sameAs fixed, founder added |
| 8 JS rendering / raw HTML | 55 | 90 | H1 spacing and home `<main>` content fixed locally |
| 9 IndexNow | 0 | 0 | not implemented (low) |
| Hreflang | n/a | n/a | correctly absent |

Local would score higher still but for: no real Lighthouse evidence, CWV unfixed, raw HTML 100 to 305 KB per page, edge HTML caching DYNAMIC.

## Re-check of every finding from 11-audit-2026-10-01/technical.md

| ID | Finding | Status now | Evidence |
|---|---|---|---|
| C-1 | Placeholder testimonials | OPEN (live and local; founder keeps for now) | "Sarah Mitchell" present in `/` raw HTML on both |
| C-2 | Search Console | OPEN (not verifiable externally) | `google-site-verification` meta present on all 19 pages, both envs |
| H-1 | H1 words run together | FIXED-LOCAL | live `Softwaredevelopmentservices`, `Built.Shipped.Live.`; local `Software development services`, `Built. Shipped. Live.` (all 16 pages). See N-3 for residual |
| H-2 | Duplicate title home vs custom-software | FIXED-LOCAL | live both `Custom Software Development Company \| Arrowbin`; local home `Software Development Company for Startups & SMBs`, service `Custom Software Development Company & Services`. No duplicate titles in local set of 19 |
| H-3 | Spam URLs | FIXED-LOCAL | live `/?channel=5f1f69&name=LARRY` 200, `/products5070048.html` 404, www variant 301 then 404. Local 308 to `/` and 410 with `x-robots-tag: noindex` |
| H-4 | Legacy redirects | FIXED-LOCAL | live 0 of 22 testable rows implemented (all 404); local 12 redirects 308 to the mapped targets and 9 rows 410. Full table below |
| H-5 | Mobile LCP | OPEN (not re-measured) | no Lighthouse run this audit |
| H-6 | Launch shipped without fixes | OPEN (process) | still true; everything above is undeployed |
| M-1 | Root canonical inherited by 404 | OPEN | `/nonexistent-xyz` 404 has canonical `https://arrowbin.com` and two robots metas (`noindex` and `noindex, follow`) on live and local |
| M-2 | Slogan H1s | OPEN | `Built. Shipped. Live.`, `We build it like it's ours.`, `Read before you build.`, `Tell us what you're building.` unchanged on local |
| M-3 | Title/description lengths | PARTLY FIXED-LOCAL | 14 pages fixed (titles 54 to 59, descriptions 146 to 158, home 150). Still OPEN locally: `/privacy` title 25, `/terms` title 27, `/terms` description 118; `/about` and `/contact` titles unchanged but acceptable (45) |
| M-5 | No case-study pages | OPEN | `/work/silent-lifestyle-bd` 404 both |
| M-6 | sameAs | FIXED-LOCAL | live starts with `linkedin.com/in/arrowbinllc`; local has GitHub, Facebook, Instagram, X, no LinkedIn |
| M-7 | Schema gaps/duplication | FIXED-LOCAL | live `/contact` has 4 ProfessionalService with duplicate @id `#localbusiness-dhaka`, `#localbusiness-st-petersburg`; local: no duplicate ids, `founder` present, home has 1 ProfessionalService |
| M-9 | Sitemap lastmod stale | FIXED-LOCAL | live 2026-06-24 on 16 URLs; local 2026-10-01 (see N-5) |
| M-10 | Image alt text | PARTLY FIXED-LOCAL | `/blog` 3 empty alts to 0; each post 3 to 1. Still OPEN locally: `/work` 5 empty alts (portfolio screenshots), `/about` 1 (founder photo), 1 avatar on posts |
| M-11 | HTML weight | OPEN | home 308,877 B live vs 304,556 local; custom-software 283,678 vs 281,947 |
| M-12 | Home sitemap loc without slash | Info, no action | matches canonical |
| M-13 | `/favicon.ico` 404 | FIXED-LOCAL | live 404 text/html (78,580 B); local 200, `<link rel="icon" href="/favicon.ico..." sizes="48x48">` added |
| L-1 | `http://www` two hops | OPEN (Cloudflare, untestable locally) | `http://www.arrowbin.com/` 301, 301, 200 |
| L-2 | privacy/terms og:url | OPEN | `/privacy` and `/terms` og:url = `https://arrowbin.com` live and local |
| L-3 | X-Powered-By | FIXED-LOCAL | live `X-Powered-By: Next.js`; local header absent (`poweredByHeader: false` in next.config.ts) |
| L-4 | AI bot list | FIXED-LOCAL | local drops Claude-Web, adds Claude-SearchBot and Claude-User |
| L-5 | HTML not edge-cached | OPEN | `cf-cache-status: DYNAMIC` on `/` |
| L-9 | llms.txt leads with offices | OPEN | `llms.txt` byte-identical live and local, still "with offices in Dhaka ... and St. Petersburg" (conflicts with founder rule on offices) |
| L-12 | `/api/` 308 to `/api` | FIXED-LOCAL | local robots `Disallow: /api` (no trailing slash). `/api` is 404 both |

## New findings

### N-1. Live homepage content sits outside `<main>` (High, FIXED-LOCAL)
- Evidence: live `/` `<main>` holds 414 characters of text, 0 h2 and 0 links, while the body has 8,961 characters and 11 h2. Local `<main>` holds 8,403 characters and 8 of the 11 h2. Live homepage `<main>` contains no link to any service page, so the homepage passes no contextual link signal to service pages in main content.
- Fix: already done (Suspense wrappers removed). Deploy.
- Effort S, owner dev. Fails if: `curl -s https://arrowbin.com | ` and extracting `<main>` returns under 2,000 characters.

### N-2. Homepage inbound links to services only exist locally (Medium, FIXED-LOCAL)
Live homepage main has 0 links to `/services*`; local has 9 (8 services plus `/services`). Same fix as N-1.

### N-3. Homepage H1 duplicates its own text and has a double space (Low, NEW)
Local H1 text extracts as `Arrowbin, a software development company for startups and growing businesses: software that moves. Software That  Moves`: the sr-only sentence is followed by the aria-hidden animated letters, so non-rendering crawlers read "Software That Moves" twice, with two spaces before "Moves". Not harmful, but tidy: render the sr-only sentence only to text extractors and keep the letter spans out of the text node (for example the letters in a `role="presentation"` sibling outside the `<h1>`). Effort S, owner dev. Fails if: extracted H1 contains the tagline twice.

### N-4. Typed blog-to-service linking is thin (Medium, OPEN)
Blog posts link to only 2 of 8 services (cost post to custom-software; choose post to custom-software and `/work`; MVP post to saas-product-engineering). Services with zero blog inbound links: ecommerce, mobile-app, ui-ux, ai-automation, cloud-devops, maintenance. Fix in `src/lib/blog.ts` body links. Effort S, owner dev or content. Fails if: any service page has zero inbound links from `/blog/*`.

### N-5. Sitemap lastmod 2026-10-01 predates deploy (Low, NEW)
Local lastmod `2026-10-01T00:00:00.000Z` for 16 URLs. Content changed after that (titles, H1s, schema, portfolio copy), so Google will see lastmod older than the real change. Set `STATIC_BASELINE` in `src/app/sitemap.ts` to the actual deploy date. Effort S, owner dev. Fails if: lastmod is earlier than the deploy date.

### N-6. RSS lastBuildDate stale (Low, OPEN)
`/blog/rss.xml` `lastBuildDate` is Tue, 12 May 2026 on both; posts are dated June 2026. Derive from the newest post `updated`. Effort S.

### N-7. Local 410 handler responds to bare `/products` too (Info)
`/products` returns 410 locally because the matcher `/products/:path*` matches it. Intended (legacy marketplace), no action.

### N-8. Redirect status is 308 not 301 (Info)
`next.config.ts` `permanent: true` emits 308. Equivalent for Google; no action.

## Category detail

### 1. Crawlability
- robots.txt live: 200 text/plain, `User-agent: *` Allow `/`, Disallow `/api/`, named AI bots GPTBot, OAI-SearchBot, ChatGPT-User, Google-Extended, PerplexityBot, Perplexity-User, ClaudeBot, Claude-Web, Applebot-Extended, CCBot all allowed, `Sitemap: https://arrowbin.com/sitemap.xml`. Local: same plus Claude-SearchBot and Claude-User, minus Claude-Web, Disallow `/api`. Both valid. Bingbot not named but covered by `*`.
- sitemap.xml: valid XML, correct namespace, 19 `<loc>`, all HTTPS non-www, no duplicates, no priority/changefreq (correct). Every `<loc>` returns 200 with no redirect on live and local. Coverage 19 of 19 real pages; no orphan pages (`/blog/rss.xml` is the only linked URL not in the sitemap, correct).
- lastmod: live 2026-06-24 (16), 06-20, 06-18, 06-16; local 2026-10-01 for the 16 non-post URLs, posts unchanged (see N-5).
- No noindex on any of the 19 pages (`index, follow`) on either environment.

### 2. Indexability
- Canonicals absolute, self-referencing, correct on all 19 pages both envs; home canonical `https://arrowbin.com` matches sitemap.
- Status codes: 19 of 19 are 200; unknown paths are real 404 with noindex (M-1 residual).
- Redirects (live): `http://arrowbin.com` 301 to https (1 hop); `https://www` 301 (1 hop); `http://www` 2 hops (L-1); `/about/` 308 to `/about`; `https://www.arrowbin.com/about/` 3 hops (301, 308); `/sitemap.xml/` 308; `/ABOUT` and `/index.html` 404. Host/protocol rules sit in Cloudflare so they cannot be verified locally.
- Legacy URL table (redirect-map.csv, non-wildcard rows with a changed target; www-host rows tested on the apex path):

| Old path | Target | LIVE | LOCAL |
|---|---|---|---|
| /contact-us, /help | /contact | 404 | 308 /contact |
| /refund | /terms | 404 | 308 /terms |
| /feed, /blog/feed | /blog/rss.xml | 404 | 308 /blog/rss.xml |
| /authors, /authors/arrowbin-llc | /about | 404 | 308 /about |
| /products/tags/blog | /blog | 404 | 308 /blog |
| /sitemaps.xml (www) | /sitemap.xml | 301 then 404 | 308 /sitemap.xml |
| /portfolio | /work | 404 | 308 /work |
| /about-us | /about | 404 | 308 /about |
| /services/web-development | /services/custom-software-development | 404 | 308 to target |
| /explore, /popular-products, /become-seller, /profile | 410 | 404 | 410 + noindex |
| /products/ultimate-seo-optimizer, /advanced-notification-bar-plugin, /custom-countdown-timer-plugin, /apexx-esports-gaming-wordpress-theme | 410 | 404 | 410 + noindex |
| /products5070048.html | 410 | 404 (www: 301 then 404) | 410 + noindex |
| /products/* , /backend/* | 410 | 404 | 410 |
| /?channel=5f1f69&name=LARRY | 301 to / | **200, indexable** | 308 to / |
| /wp-login.php, /xmlrpc.php, /wp-admin, /wp-json | leave 404 | 404 (wp-admin and wp-json 308 to slashless then 404) | same |

Wildcard `/?channel=` redirect works locally; `/?utm_source=x` stays 200 on both (fine, canonical handles it). All sitemap pages verified live; pre-deploy action: also submit a Removal in Search Console for `/products5070048.html` (never for `?channel=` URLs: Search Console reads that prefix as the whole site and offers "Remove entire site?").

### 3. Security headers
Live and local identical: HSTS (63072000, includeSubDomains, preload), CSP (default-src 'self', frame-ancestors 'none', object-src 'none', base-uri, form-action, upgrade-insecure-requests; script/style 'unsafe-inline' remains), X-Content-Type-Options nosniff, X-Frame-Options DENY, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy. X-Powered-By: live present, local removed. No security.txt (404 both, optional). Cloudflare Web Analytics host is allowlisted in CSP.

### 4. URL structure
Lowercase, hyphenated, flat; max depth 2 URL segments; no trailing slash (308 normalises); parameter URLs strip locally for `channel`.

### 5. Mobile
All 19 pages on both envs: `width=device-width, initial-scale=1`, `<html lang="en">`. Local adds 44px tap targets (not measured by me). Performance unmeasured.

### 6. Core Web Vitals (source signals only)
Home: 87 script tags live vs 74 local, 2 stylesheets both, one font preload. Raw HTML: home 308,877 B live vs 304,556 local; smallest `/terms` 100,865 vs 98,959. Local eager above-fold images reduce LCP risk. Needs a Lighthouse mobile run after deploy: failure is LCP above 2.5 s or TBT above 200 ms.

### 7. Structured data
All JSON-LD parses on all pages. Live: Organization, WebSite, 2x ProfessionalService on every page, `/contact` has 4 with duplicate @ids. Local: one ProfessionalService on home only (Dhaka), none on service pages, BreadcrumbList on all, Service+ItemList+FAQPage on services, BlogPosting+FAQPage on posts, AboutPage+Person on `/about`. No Review/AggregateRating (correct while testimonials are placeholders). Local sameAs: GitHub, Facebook, Instagram, X. Organization.founder present.

### 8. JS rendering
Fully server-rendered on both; complete title, meta, canonical, JSON-LD and content in raw HTML. Raw-HTML H1 for all 19 sitemap URLs (live then local):
- `/` `Arrowbin, a custom software development company: software that moves.SoftwareThatMoves` then `Arrowbin, a software development company for startups and growing businesses: software that moves. Software That  Moves`
- `/services` `Softwaredevelopmentservices` then `Software development services`
- `/work` `Built.Shipped.Live.` then `Built. Shipped. Live.`
- `/about` `We build itlike it'sours.` then `We build it like it's ours.`
- `/blog` `Read beforeyou build.` then `Read before you build.`
- `/contact` `Tell uswhat you'rebuilding.` then `Tell us what you're building.`
- `/privacy` `Privacypolicy.` then `Privacy policy.`; `/terms` `Terms ofservice.` then `Terms of service.`
- 8 service pages: `CustomSoftwareDevelopment`, `E-commerceDevelopment`, `MobileAppDevelopment`, `SaaS&ProductEngineering`, `UI/UXDesign`, `AIAutomation`, `Cloud,DevOps&Hosting`, `Maintenance&Support` then the same with spaces (leading space only).
- 3 blog posts clean on both. Exactly one H1 per page on both.

### 9. IndexNow
Not implemented: `/indexnow.txt` and `/api/indexnow` 404. Low priority (Bing, Yandex, Naver only).

### Favicon
Live: only `/icon.svg` and `/apple-icon` declared; `/favicon.ico` 404. Local: `/favicon.ico` 200 (3,876 B), declared with sizes 48x48. FIXED-LOCAL.

### Internal linking, orphans, crawl depth
- Orphans: none (19 of 19 reachable on live and local). Crawl depth: home 0; 15 pages at depth 1 (all nav/footer-linked); 3 blog posts at depth 2 (linked from `/blog` and from service pages).
- Footer/nav links every page site-wide (18 inbound each), so all pages are depth 1.
- Contextual (inside `<main>`) inbound links per service page, live then local: custom-software 7 then 8; maintenance-support 8 then 9; cloud-devops 6 then 7; saas-product-engineering 5 then 6; ui-ux-design 5 then 6; ecommerce 3 then 4; ai-automation 3 then 4; mobile-app 2 then 3. Local gains come only from the homepage now being inside `<main>`. Mobile-app (3) and ecommerce/ai (4) are weakest; only custom-software and saas receive any blog link (N-4).
- No internal links point at 404 or redirected URLs on either env.

## Priority list for the deploy release
1. Deploy the local build (fixes H-1, H-2, H-3, H-4, M-6, M-7, M-9, M-13, L-3, L-4, N-1). Then resubmit the sitemap, Request Indexing for `/`, `/services` and the 8 service URLs, and file Removals for `/products5070048.html` only (never for `?channel=` URLs: Search Console reads that prefix as the whole site and offers "Remove entire site?").
2. Set `STATIC_BASELINE` to the deploy date (N-5).
3. Fix canonical inheritance and double robots meta on 404 (M-1), og:url on `/privacy` and `/terms` (L-2), `/privacy` and `/terms` titles and `/terms` description (M-3).
4. Add blog-to-service contextual links for the six unlinked services (N-4), alt text on `/work` and `/about` (M-10).
5. Cloudflare single rule for `http(s)://www` (L-1) and optional HTML edge caching (L-5).
6. Run Lighthouse mobile x3 on the deployed site (H-5), then trim JS and HTML weight (M-11).
7. Placeholder testimonials (C-1): risk accepted by the founder; remove or replace before any Review schema or paid promotion.
