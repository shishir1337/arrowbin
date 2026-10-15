# Arrowbin technical SEO audit, live site re-verification

Date: 2026-10-01. Target: https://arrowbin.com (Next.js 16, Cloudflare). Method: curl plus a Node HTML parser against all 19 live sitemap URLs plus about 45 probe URLs. No Python runtime, no builds, no server changes. Baseline compared: `docs/seo/01-audit/technical-audit.md` (2026-09-29).

**Headline.** Every Critical, High and Medium finding from the pre-launch audit that can be observed on the live site is STILL OPEN. Titles, descriptions, H1 markup, canonicals, sitemap dates, redirect behaviour, testimonials, headers and payload sizes are byte-for-byte consistent with the 2026-09-29 crawl (same titles, same description lengths, same payload sizes, same `lastmod` values). Source check: `next.config.ts` has no `redirects()` and no `poweredByHeader: false`, there is no `src/proxy.ts` or `middleware.ts`, and `src/lib/testimonials.ts` still holds the stand-in testimonials. So the pre-launch fixes were not applied before or at the 2026-09-29 launch.

## Technical score: 62 / 100

| Category | Score | Status |
|---|---|---|
| 1. Crawlability (robots, sitemap) | 82 | Pass with notes |
| 2. Indexability (canonicals, status, redirects, legacy, spam) | 50 | Fail |
| 3. Security headers | 93 | Pass |
| 4. URL structure | 85 | Pass |
| 5. Mobile | 75 | Pass (performance not re-measured) |
| 6. Core Web Vitals potential | 50 | Fail (source-level signals, no lab run) |
| 7. Structured data | 70 | Needs work |
| 8. JS rendering / raw HTML | 55 | Fail (H1 spacing) |
| 9. IndexNow | 0 | Not implemented (low priority) |
| Hreflang | n/a | Correctly absent (single language) |

Weighted overall 62. The infrastructure (HTTPS, HSTS, CSP, SSR, sitemap) is strong; the score is held down by unfixed H-1, H-3, H-4, H-2 and the fabricated testimonials.

## Status of each pre-launch finding

| ID | Finding | Status |
|---|---|---|
| C-1 | Fabricated testimonials on homepage | STILL OPEN |
| C-2 | Search Console / verification | PARTLY FIXED (tag now renders in production); property access not verifiable from outside, treat as OPEN |
| H-1 | H1 words run together in HTML | STILL OPEN (all 17 non-blog pages) |
| H-2 | Duplicate title home vs custom-software service | STILL OPEN |
| H-3 | Spam URLs (/products5070048.html, ?channel=) | STILL OPEN (404 and 200, not 410 and 301) |
| H-4 | Legacy URLs 404 with no redirects | STILL OPEN (0 of 23 mapped redirects implemented) |
| H-5 | Mobile LCP 4.0 to 5.0 s | NOT RE-MEASURED; STILL OPEN by proxy (same JS/CSS/HTML weight) |
| M-1 | Root canonical inherited by 404 | STILL OPEN |
| M-2 | Slogan H1s | STILL OPEN |
| M-3 | Title / description lengths | STILL OPEN |
| M-4 | Blog-to-service internal links | NOT RE-CHECKED here (content audit scope) |
| M-5 | Thin content, no case studies | STILL OPEN (`/work/<slug>` returns 404) |
| M-6 | sameAs weak | STILL OPEN |
| M-7 | Schema gaps | STILL OPEN |
| M-8 | NAP inconsistency | Out of scope (local audit) |
| M-9 | Sitemap lastmod stale | STILL OPEN |
| M-10 | Image alt text | STILL OPEN |
| M-11 | HTML payload weight | STILL OPEN |
| L-1 | http://www two-hop chain | STILL OPEN |
| L-2 | privacy/terms og:url | STILL OPEN |
| L-3 | X-Powered-By | STILL OPEN |
| L-4 | Outdated AI bot list | STILL OPEN |
| L-5 | Cloudflare not caching HTML | STILL OPEN |

NEW findings are listed at the end of each severity bucket and marked NEW.

---

## Critical

### C-1. Fabricated testimonials are live (STILL OPEN)
- **Evidence.** Raw homepage HTML contains the three stand-in names: the parser flagged `"testi":true` for `/` only (Sarah Mitchell, David Chen, Rafiul Islam). Source: `src/lib/testimonials.ts:20 name: "Sarah Mitchell"`.
- **Fix.** Remove the Testimonials section from `src/app/page.tsx` or replace with real, written-approved, attributable quotes. Keep Review/AggregateRating schema off.
- **How we'd know it failed.** `curl -s https://arrowbin.com | grep -c "Sarah Mitchell"` returns anything above 0.

### C-2. Search Console ownership (PARTLY FIXED)
- **Evidence.** `google-site-verification` meta is present on all 19 pages (`"gsv":true`), so the env var is set in production. GA ID `G-ZZ3NJCZVMZ` is present on all pages. Whether the team can access the property cannot be seen from outside.
- **Fix.** Add a DNS TXT Domain property in Cloudflare, submit the sitemap, add Bing Webmaster Tools.
- **How we'd know it failed.** GSC shows no sitemap submitted, or the meta tag disappears after a deploy.

---

## High

### H-1. H1 text has no spaces between words in raw HTML (STILL OPEN, on every page)
Raw-HTML H1 text after stripping tags (this is what non-rendering AI crawlers read):

```
/                        Arrowbin, a custom software development company: software that moves.SoftwareThatMoves
/services                Softwaredevelopmentservices
/work                    Built.Shipped.Live.
/about                   We build itlike it'sours.
/blog                    Read beforeyou build.
/contact                 Tell uswhat you'rebuilding.
/privacy                 Privacypolicy.
/terms                   Terms ofservice.
/services/custom-software-development   CustomSoftwareDevelopment
/services/ecommerce-development         E-commerceDevelopment
/services/mobile-app-development        MobileAppDevelopment
/services/saas-product-engineering      SaaS&ProductEngineering
/services/ui-ux-design                  UI/UXDesign
/services/ai-automation                 AIAutomation
/services/cloud-devops-hosting          Cloud,DevOps&Hosting
/services/maintenance-support           Maintenance&Support
blog posts (3)           correct (plain H1)
```
16 of 19 pages are broken. Only the 3 blog posts are clean. Each page has exactly one H1 (no duplicates), good.
- **Fix.** Emit a literal space between word/line spans (`{i > 0 && " "}` in `ServiceHero.tsx`, a trailing `{" "}` in the line-array heroes `ServicesHero`, `AboutHero`, `BlogIndex`, `ContactHero`, `WorkHero`, `LegalPage`). For the homepage, put the aria-hidden visual letters in a sibling element, or add a leading space.
- **How we'd know it failed.** Re-run the H1 extraction (`curl -s URL | node -e "..."` or grep the `<h1>` block, strip tags) and any H1 shows a lowercase-to-uppercase join like `CustomSoftwareDevelopment`.

### H-2. Duplicate title, home vs custom-software service (STILL OPEN)
- **Evidence.** Both `/` and `/services/custom-software-development` return `<title>Custom Software Development Company | Arrowbin</title>`. Only duplicate in the 19 URLs.
- **Fix.** Home: `Software Development Company for Startups & SMBs | Arrowbin`. Service: `Custom Software Development Company & Services | Arrowbin` (see `on-page-titles-meta.csv`).
- **How we'd know it failed.** Any two sitemap URLs share a title; GSC shows the homepage ranking for "custom software development" instead of the service URL.

### H-3. Spam URLs still respond (STILL OPEN)
```
GET https://arrowbin.com/?channel=5f1f69&name=LARRY  -> 200, robots "index, follow", canonical https://arrowbin.com
GET https://arrowbin.com/products5070048.html        -> 404 (want 410)
GET https://www.arrowbin.com/products5070048.html    -> 301 -> https://arrowbin.com/products5070048.html -> 404
```
Parameterised homepage duplicates return 200 and are indexable (only the canonical protects them).
- **Fix.** Cloudflare rule: 301 any `/` request with `channel`, `from` or `name` params to `https://arrowbin.com/`; 410 for `/products*.html`; GSC Removals for the two known URLs; check Security & Manual Actions.
- **How we'd know it failed.** `site:arrowbin.com` still lists `products5070048.html` or `?channel=` URLs after 4 to 8 weeks; the curl above still prints 200 or 404.

### H-4. Legacy URLs: none of the redirect-map.csv entries are implemented (STILL OPEN)
Tested every non-wildcard redirect/410 row. Result: **23 of 23 still return plain 404** (the two www-host entries get a host 301, then 404):
```
404 <= /contact-us   (want 301 /contact)        404 <= /refund  (want 301 /terms)
404 <= /help         (want 301 /contact)        404 <= /feed    (want 301 /blog/rss.xml)
404 <= /authors, /authors/arrowbin-llc (want 301 /about)
404 <= /products/tags/blog (want 301 /blog)
404 <= /explore /popular-products /become-seller /profile (want 410)
404 <= /products/ultimate-seo-optimizer, /advanced-notification-bar-plugin, /custom-countdown-timer-plugin, /apexx-esports-gaming-wordpress-theme (want 410)
404 <= /portfolio /about-us /services/web-development /blog/feed (defensive 301s)
301 -> https://arrowbin.com/sitemaps.xml -> 404   (from www; want 301 /sitemap.xml)
```
Source confirms: `next.config.ts` has no `redirects()`, and no `proxy.ts`/`middleware.ts` exists.
- **Fix.** Add `async redirects()` (permanent) for the 301 rows and Cloudflare rules or `proxy.ts` (read `node_modules/next/dist/docs/` first) for 410s. Check GSC Links for backlinks before choosing 410.
- **How we'd know it failed.** Loop `curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n"` over the `old_url` column and any row returns 404.

### H-5. Mobile LCP (STILL OPEN by proxy, not re-measured)
No Lighthouse run was possible without a runtime. Unchanged signals: 12 script tags and 2 render-blocking stylesheets on the homepage, 308 KB raw HTML (34 KB brotli), TTFB 0.37 to 0.82 s from this location (`time_starttransfer` per URL). Pre-launch lab baseline was LCP 4.0 to 5.0 s.
- **Fix.** As in the pre-launch audit: defer `SmoothScroll`/`Cursor`, single preloaded font, trim global CSS.
- **How we'd know it failed.** Lighthouse mobile median of 3 runs: LCP above 2.5 s or TBT above 200 ms; GSC Core Web Vitals report "Poor".

### NEW H-6. Launch shipped without any of the pre-launch fixes (process finding)
Same titles, descriptions, sitemap dates, H1 markup, headers and sizes as 2026-09-29. Risk: the recommended "apply metadata at launch so Google re-evaluates once" window is already spent; every later change causes a second re-evaluation.
- **Fix.** Apply H-1, H-2, H-3, H-4, M-3, M-9 in one release, then resubmit the sitemap and Request Indexing for `/`, `/services` and the 8 service URLs.
- **How we'd know it failed.** Page titles in `site:arrowbin.com` still show old strings 4 weeks after the release.

---

## Medium

### M-1. Root canonical inherited by unrouted pages (STILL OPEN)
```
/nonexistent-xyz -> 404, <meta name="robots" content="noindex, follow"/> and
                    <link rel="canonical" href="https://arrowbin.com"/>
```
Noindex currently protects it; the homepage relies on the inherited canonical. The 404 HTML also emits two robots metas (`noindex` and `noindex, follow`).
- **Fix.** Remove `canonical` from the root layout; add `alternates: pageAlternates("/")` to `src/app/page.tsx`. Emit a single robots meta on the 404.
- **How we'd know it failed.** A new page without `alternates` shows canonical `https://arrowbin.com` in the crawl.

### M-2. Slogan H1s with no keywords (STILL OPEN)
`Built.Shipped.Live.`, `We build it like it's ours.`, `Read before you build.`, `Tell us what you're building.` Service H1s lack "company"/"services".
- **Fix.** Add an sr-only keyword prefix inside the H1 (recommendations in `on-page-titles-meta.csv`).
- **How we'd know it failed.** An H1 lacks the page's primary keyword.

### M-3. Title and description lengths (STILL OPEN)
Descriptions above 160 chars: home 162, e-commerce 169, SaaS 170, privacy 161 (custom-software is exactly 160). Short titles: `/privacy` 25, `/terms` 27, `/blog` 30, `/ui-ux-design` 32, `/ai-automation` 33, `/work` 35. `/terms` description is only 118 chars.
- **Fix.** Apply the CSV (titles at most 60 chars, descriptions 144 to 158).
- **How we'd know it failed.** SERP shows truncated descriptions with an ellipsis.

### M-6. sameAs (STILL OPEN)
Live JSON-LD: `sameAs` starts `https://www.linkedin.com/in/arrowbinllc` (personal-profile path), then Facebook, Instagram, X. GitHub (Arrowbin-LLC) and YouTube not included.
- **Fix.** Create a LinkedIn company page, update `src/lib/site.ts`, add GitHub and YouTube if owned.
- **How we'd know it failed.** A `sameAs` URL returns non-200 or does not link back to arrowbin.com.

### M-7. Schema gaps and duplication (STILL OPEN)
Node types per page: layout emits Organization + WebSite + 2x ProfessionalService on every page; `/contact` adds 2 more ProfessionalService (4 total, duplicated `@id`s); no `@graph`; Person node only on `/about`.
- **Fix.** Remove `localBusinessSchema()` from `src/app/contact/page.tsx`; add `founder`, `inLanguage`; emit Person site-wide or on posts.
- **How we'd know it failed.** validator.schema.org reports duplicate `@id` nodes on `/contact`.

### M-9. Sitemap lastmod stale (STILL OPEN)
```
16 URLs  2026-06-24T00:00:00.000Z   (all static, service, legal pages)
1 URL    2026-06-20  cost post
1 URL    2026-06-18  choose post
1 URL    2026-06-16  MVP post
```
Redesign launched 2026-09-29; `/privacy` and `/terms` are dated "Updated 29 September 2026" on page but `lastmod` says 2026-06-24. Source: `STATIC_BASELINE = "2026-06-24"` in `src/app/sitemap.ts`.
- **Fix.** Set baseline to the release date; derive legal dates from their `UPDATED_ISO` constants.
- **How we'd know it failed.** `lastmod` older than the visible "Updated" date on any page.

### M-10. Image alt text (STILL OPEN)
Empty or missing alt: `/work` 5 images, `/about` 1, `/blog` 3, each blog post 3 (related-card images, acceptable). Service OG alt generic.
- **Fix.** Descriptive alt for `/work` and `/about` founder photo; dynamic service OG alt.
- **How we'd know it failed.** Crawl shows non-decorative images with `alt=""`.

### M-11. HTML weight (STILL OPEN)
Raw HTML bytes: home 308,510; custom-software 283,311; cost post 279,376; services 218,886. Brotli: home 34 KB, so transfer is fine; parse cost and truncation risk for AI crawlers remain.
- **Fix.** Keep large data in Server Components; stop serialising post bodies and service data into client props.
- **How we'd know it failed.** Home raw HTML above about 150 KB.

### M-5. No case-study pages (STILL OPEN)
`/work/silent-lifestyle-bd` returns 404. Parked by design. Content task; see the content plan.

### NEW M-12. Sitemap lists the homepage without a trailing slash, blog dates not tied to site-wide change
`<loc>https://arrowbin.com</loc>` matches the canonical exactly (https://arrowbin.com), so consistent and fine. No action, noted for completeness. Sitemap has no `priority`/`changefreq` (correct).

### NEW M-13. 404 for `/favicon.ico`
```
404 text/html https://arrowbin.com/favicon.ico
```
Icons are declared (`/icon.svg?...`, `/apple-icon`), so browsers are fine, but Google and many crawlers still request `/favicon.ico`, and a 404 there can delay favicon pickup in SERPs (SVG-only favicons are supported but a PNG/ICO fallback is safer).
- **Fix.** Add `src/app/favicon.ico` (48x48 multiple of 48 px) alongside the SVG.
- **How we'd know it failed.** Google SERP shows a globe icon instead of the Arrowbin mark after 2 to 4 weeks.

---

## Low

| ID | Issue | Evidence | Status | Fix | How we'd know it failed |
|---|---|---|---|---|---|
| L-1 | http://www is 2 hops | `http://www.arrowbin.com` hops=2; `http://arrowbin.com`, `https://www.arrowbin.com` hops=1 | STILL OPEN | Cloudflare single redirect rule for `http(s)://www.*` to `https://arrowbin.com/${1}` | `curl -sIL http://www.arrowbin.com` shows two 301s |
| L-2 | privacy/terms og:url | `/privacy` og:url = `https://arrowbin.com`, `/terms` same | STILL OPEN | Set `openGraph.url`, title, image in both pages | og:url differs from page URL |
| L-3 | X-Powered-By | Header `X-Powered-By: Next.js` on HTML | STILL OPEN | `poweredByHeader: false` | Header present |
| L-4 | AI bot list | robots.txt lists GPTBot, OAI-SearchBot, ChatGPT-User, Google-Extended, PerplexityBot, Perplexity-User, ClaudeBot, Claude-Web, Applebot-Extended, CCBot; lacks Claude-SearchBot, Claude-User, Bingbot. All allowed anyway via `*` | STILL OPEN (cosmetic) | Update `aiBots` in `src/app/robots.ts`, drop Claude-Web | Agent not named in robots.txt |
| L-5 | HTML not cached at edge | Homepage `cf-cache-status: DYNAMIC`, `Cache-Control: s-maxage=31536000` | STILL OPEN | Cloudflare cache rule with purge on deploy | No HIT |
| L-6 | Preview deployments indexable | robots.ts always allows `/` | Not testable live | Disallow on non-prod hosts | Preview host indexed |
| L-7 | Dead Hero.tsx with second H1 | Live pages each show exactly one H1 | Latent | Delete file | Two H1s appear |
| L-9 | llms.txt leads with offices | `with offices in Dhaka, Bangladesh and St. Petersburg, Florida (USA)` | STILL OPEN | Lead with "clients worldwide"; add founding year, founder, engagement models | Text unchanged |
| L-10 | hreflang | 0 hreflang occurrences on all 19 pages; `<html lang="en">` | PASS (correct for single-language) | None | n/a |
| NEW L-11 | Query-param homepage is indexable | See H-3 | NEW | 301 strip | n/a |
| NEW L-12 | `/api/` 308 to `/api` (robots disallows `/api/`) | `308 location: /api` | NEW, trivial | Also `Disallow: /api` | Crawlers index `/api` (it returns 404, so harmless) |

---

## Category detail

### 1. Crawlability (82)
- robots.txt: 200 `text/plain`, `User-Agent: *` Allow `/`, Disallow `/api/`, AI bots all allowed, `Sitemap: https://arrowbin.com/sitemap.xml` declared. Validated: the declared sitemap returns 200 `application/xml`. Pass.
- Sitemap: 19 `<loc>`, valid XML, namespace correct, no `priority`/`changefreq`, no duplicate URLs, HTTPS and non-www throughout. Coverage vs actual pages: 19 of 19 crawlable pages, missing none (home, services, 8 services, work, about, blog, 3 posts, contact, privacy, terms). Extra/404 URLs in sitemap: none (every `<loc>` returned 200 with no redirect). Not in sitemap but live and fine: `/llms.txt`, `/blog/rss.xml`, `/manifest.webmanifest`.
- lastmod issues: see M-9. No `.xml` sitemap index needed at this size.
- No noindex on any of the 19 pages (`robots: index, follow`).
- `/sitemaps.xml` and `/feed` 404 (legacy, H-4).

Crawl table (status, raw bytes, TTFB, redirects): all 19 returned 200 with 0 redirects; sizes 100 KB (terms) to 308 KB (home); TTFB 0.38 to 0.82 s from this vantage point.

### 2. Indexability (50)
- Canonicals: absolute, self-referencing and correct on all 19 pages. Pass. Homepage canonical `https://arrowbin.com` (no slash) matches the sitemap.
- Status codes: real 404 for unknown URLs, `noindex`. Pass.
- http to https: 301 single hop. www to non-www: 301 single hop over https. http://www: 2 hops (L-1). Trailing slash: `/about/` 308 to `/about`; `/sitemap.xml/` 308 to `/sitemap.xml`. Case: `/ABOUT` 404 (fine). `/index.html` 404 (fine).
- Redirect chains: only the http://www chain.
- Legacy and spam: H-3, H-4 fail.
- Duplicate title: H-2.

### 3. Security headers (93)
Present on HTML, robots and sitemap: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `Content-Security-Policy` (default-src 'self', frame-ancestors 'none', object-src 'none', base-uri 'self', form-action 'self', upgrade-insecure-requests), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`. Gaps: CSP allows `'unsafe-inline'` for scripts and styles (accepted trade-off for Next.js inline RSC payload; a nonce-based CSP would be stronger), `X-Powered-By` leaks (L-3), no `security.txt` (404, optional).
- **How we'd know it failed.** securityheaders.com grade drops below A; a third-party script is blocked by CSP (check the console for violations after adding a new tag or widget, for example a Cal.com embed would be blocked: `cal.com` is not in `script-src`, `frame-src` falls back to `default-src 'self'`).

### 4. URL structure (85)
Lowercase, hyphenated, flat slugs, no trailing slash, no parameters in indexable URLs. Depth at most 2. Gap: parameter URLs accepted with 200 (H-3).

### 5. Mobile (75)
All 19 pages: `<meta name="viewport" content="width=device-width, initial-scale=1">`, `<html lang="en">`. Responsive CSS (clamp-based type). Touch targets not measured from source. Performance is the open risk (H-5). Custom cursor and smooth-scroll scripts load globally (per prior audit).

### 6. Core Web Vitals potential (50)
Not lab-tested now. Source signals unchanged since the pre-launch Lighthouse run (LCP 4.0 to 5.0 s mobile, CLS 0, TBT 320 to 880 ms). 12 scripts and 2 blocking stylesheets on the homepage. See H-5, M-11.

### 7. Structured data (70)
Present and parseable (no JSON parse errors in any block): Organization, WebSite, ProfessionalService (x2), BreadcrumbList on all pages, Service + ItemList + FAQPage on 8 service pages, BlogPosting + FAQPage on posts, AboutPage + Person on `/about`, CollectionPage on `/blog`, ItemList on `/work`. No Review or AggregateRating (correct while testimonials are not real). Issues: M-6, M-7.

### 8. JS rendering (55)
Fully server-rendered: complete HTML, title, meta, canonical, JSON-LD and body text present in the raw response, no client-side shell. Pass. The fail is H-1 (H1 words concatenated in raw HTML), which affects any crawler that does not execute CSS layout.

### 9. IndexNow (0)
No key file found in probes of common locations (not tested with a specific key). Low priority: Google does not support IndexNow; Bing, Yandex and Naver do. Optional: generate a key, serve `/<key>.txt`, ping on deploy.

### Hreflang
None present and none needed (single English site, `lang="en"`). PASS.

### Structured headers / other endpoints
`/llms.txt` 200 `text/plain`; `/blog/rss.xml` 200 `application/xml` valid RSS 2.0 with atom self link (`lastBuildDate` Tue, 12 May 2026, likely stale relative to post `updated` dates); `/manifest.webmanifest` 200; `<link rel="alternate" type="application/rss+xml">` present in head; OG image 1200x630 and `twitter:card summary_large_image` present.

## Priority fix order (one release)
1. C-1 remove or replace testimonials.
2. H-1 add spaces to H1 spans (16 pages).
3. H-4 and H-3 redirects and 410s (Cloudflare Bulk Redirects is the fastest path).
4. H-2, M-3, M-2 titles, descriptions, keyword H1s.
5. M-9 sitemap lastmod; then resubmit the sitemap in GSC.
6. M-1 canonical cleanup; L-1, L-2, L-3, M-13.
7. H-5 performance work, re-measure with Lighthouse.
