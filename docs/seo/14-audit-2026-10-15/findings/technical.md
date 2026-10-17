# Technical SEO re-audit, 15 October 2026

Measured: **LOCAL** = http://localhost:3117 (production build, `.next/BUILD_ID` written 08:24 local). **LIVE** = https://arrowbin.com (still the old build 959866d), used only for edge items (AI crawler user agents, www/http hops, a few file probes). Baseline: `docs/seo/12-audit-2026-10-14/technical.md`. Read-only: no source edited, no build, no server touched, no git.

Method: Python stdlib crawler without redirect following over all 29 `<loc>` entries in `/sitemap.xml` (raw HTML parsed for title, description, canonical, robots meta, X-Robots-Tag, OG/Twitter, viewport, headings, JSON-LD, links, images, hidden `S:` blocks), plus `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/.well-known/security.txt`, `/blog/rss.xml`, 6 unknown URLs, about 50 legacy/probe URLs, a link graph built from the raw HTML, and 126 external links. `bash docs/seo/12-audit-2026-10-14/verify-live.sh http://localhost:3117` was also run. Scripts and raw output: the session scratchpad (`t15/crawl.py`, `t15/batch.py`, `t15/batch.out`, `t15/verify-local.out`).

## Score

| | 14 Oct (LIVE) | 14 Oct (LOCAL projected) | 15 Oct LOCAL (measured) |
|---|---|---|---|
| **Technical overall** | 62 | 89 | **93 / 100** |

LIVE is not re-scored: nothing is deployed, so the live score stays at about 62 and the edge probes below are unchanged from 14 Oct.

| Category | 14 Oct LOCAL | 15 Oct LOCAL | Notes |
|---|---|---|---|
| 1 Crawlability | 92 | 96 | robots valid and parseable, sitemap 29 of 29 parity, llms.txt, llms-full.txt, security.txt added |
| 2 Indexability | 90 | 96 | 404 no longer inherits a canonical, one robots meta, all titles and descriptions unique |
| 3 Security headers | 96 | 96 | all 6 headers on every response incl. 404, CSP covers GA4 per Google's guide |
| 4 URL structure | 95 | 97 | 12 redirects 308, 11 gone paths 410, trailing slash 308 |
| 5 Mobile | 80 | 82 | viewport correct on 29 of 29; tap targets and rendering not measured here |
| 6 Core Web Vitals (source only) | 55 | 55 | not measured (no Lighthouse run in my brief); raw HTML 98 to 391 KB, 52 to 59 percent of it RSC flight data |
| 7 Structured data (presence) | 90 | 92 | JSON-LD on 29 of 29, 0 parse errors; depth belongs to the schema agent |
| 8 JS rendering / raw HTML | 90 | 97 | 0 hidden `S:` blocks on 29 of 29, one H1 each, content in raw HTML |
| 9 IndexNow | 0 | 70 | key file and `scripts/indexnow.mjs` exist; live 404 until deploy; never submitted |
| Hreflang | n/a | n/a | correctly absent, monolingual |

## verify-live.sh result

`bash docs/seo/12-audit-2026-10-14/verify-live.sh http://localhost:3117` exited 0 with **ALL CHECKS PASSED** (78 PASS lines, 0 FAIL): titles and H1s, home `<main>` 1,376 words, 0 hidden blocks on 5 key pages, legacy 308s and 410s, `?channel=` 308, favicon 200, no X-Powered-By, Claude-SearchBot in robots, 1 ProfessionalService node on `/contact`, no canonical on the 404, llms/security/content-signal/robots-directive checks, og:url and og:locale on 9 pages, 404 on unknown slugs, and all 29 sitemap URLs 200 with no hidden blocks or em dashes. Sections 7 and 8 (AI user agents, host hops) only run against the live host; my own live measurements are in the next section.

Caveat on what the gate proves: `src/lib/blog.ts` and `src/app/sitemap.ts` were modified at 08:32, after the 08:24 build, so the running :3117 build is older than the source (see F-2). Re-run the gate after the final rebuild.

## Live edge measurements (https://arrowbin.com, old build 959866d, measured 15 Oct)

| Probe | Result |
|---|---|
| GPTBot, ClaudeBot, CCBot, Amazonbot, Bytespider user agents on `/` | **403** (unchanged from 14 Oct) |
| OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Applebot, bingbot, spoofed Googlebot, curl, browser UA | 200 |
| `http://arrowbin.com/` | 1 hop to `https://arrowbin.com/` (200) |
| `https://www.arrowbin.com/` | 1 hop (200) |
| `http://www.arrowbin.com/` | **2 hops** (L-1 still open) |
| `https://www.arrowbin.com/about/` | 2 hops to `/about` |
| `/llms-full.txt`, `/.well-known/security.txt`, `/favicon.ico`, IndexNow key file | 404 on live (exist locally; deploy needed) |
| `/` headers | `Server: cloudflare`, `X-Powered-By: Next.js` still present, `Cache-Control: s-maxage=31536000`, `cf-cache-status: DYNAMIC` |

## What works

- **Crawl parity:** sitemap lists 29 URLs (8 static, 8 services, 13 posts), no duplicates, valid namespace; the crawl reaches 29 of 29 and every `<loc>` is 200 with no redirect. `/blog/rss.xml` is the only linked URL outside the sitemap, which is correct.
- **Canonicals:** self-referencing, absolute, https non-www on all 29 pages (home is `https://arrowbin.com`, matching the sitemap). No `X-Robots-Tag` on any page. Robots meta is `index, follow` once per page. No hreflang anywhere.
- **404 handling (M-1 fixed):** `/services/nope`, `/blog/nope`, `/random`, `/nonexistent-xyz` return a real 404 with exactly one robots meta (`noindex`), no canonical, no og:url, `Cache-Control: no-store`, `lang="en"`.
- **Titles and descriptions:** 29 unique titles (38 to 60 chars) and 29 unique descriptions (142 to 158 chars). Privacy (46), Terms (38) and the Terms description (149) are now sound (M-3 closed).
- **Headings:** exactly one H1 per page, no heading level skips on any of the 29 pages. All H1s render with correct spacing (H-1 closed); service and post H1s are clean.
- **Raw HTML rendering:** 0 `<div hidden id="S:` blocks on all 29 pages; `<main>` holds 478 to 5,974 words per page (home 1,376, was 414 characters live). Pages are fully server-rendered; no `noscript` dependence.
- **Open Graph and X:** og:url equals the canonical on 29 of 29; og:locale, og:image (absolute, with alt), twitter:card/title/description/image/site present on all; posts use `og:type article`; RSS alternate link on all 29.
- **Redirects and gone paths:** all 12 `next.config.ts` redirects return 308 to the mapped target (`/contact-us`, `/help`, `/refund`, `/feed`, `/blog/feed`, `/sitemaps.xml`, `/authors`, `/authors/arrowbin-llc`, `/products/tags/blog`, `/portfolio`, `/about-us`, `/services/web-development`). `/explore`, `/popular-products`, `/become-seller`, `/profile`, `/products`, `/products/*`, `/backend`, `/backend/*`, `/products5070048.html` return 410 with `x-robots-tag: noindex`. `/?channel=5f1f69&name=LARRY` 308 to `/`. Trailing slashes (`/about/`, `/services/`, `/blog/`, `/sitemap.xml/`, `/robots.txt/`) 308 to the slashless URL. `/ABOUT`, `/index.html`, `/wp-login.php`, `/xmlrpc.php`, `/wp-admin`, `/wp-json`, `/api` are plain 404 (fine).
- **robots.txt:** 12 groups, `Disallow: /api` now listed before `Allow: /`, so both longest-match and first-match parsers block `/api` (the A3 optional tweak was applied). Python robotparser confirms every named bot may fetch pages and is blocked from `/api` and `/api/contact`. Single `Sitemap:` line, absolute https. No unknown directives (Lighthouse-safe). Claude-SearchBot and Claude-User present, Claude-Web gone.
- **llms files:** `/llms.txt` (9.0 KB, text/plain) lists all 8 services, hubs and all 13 guides; `/llms-full.txt` (80 KB) is the full digest. All 31 and 19 internal URLs inside them return 200, no em dashes, no office emphasis.
- **security.txt:** RFC 9116 fields present (Contact, Expires 2027-10-15, Preferred-Languages, Canonical); served 200 text/plain. Diary the expiry.
- **RSS (N-6 fixed):** well-formed RSS 2.0, atom self link, 13 items each with permalink guid, RFC 822 pubDate, category, description and `dcterms:modified`; no duplicate guids; every item is in the sitemap; `lastBuildDate` is Thu, 15 Oct 2026 (was 12 May).
- **Security headers:** HSTS (63072000, includeSubDomains, preload), CSP, X-Content-Type-Options, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy are present on pages, 404, RSS, llms, robots, sitemap, security.txt, favicon and the API route. No X-Powered-By. CSP covers GA4 against Google's CSP guide: `script-src` has `https://www.googletagmanager.com`; `img-src` has `google-analytics.com`, `*.google-analytics.com`, `*.analytics.google.com`, googletagmanager, `*.google.com`, `*.google.com.bd`, `*.g.doubleclick.net`; `connect-src` has the same plus `cloudflareinsights.com`. The GA tag (`gtag/js`) is in the raw HTML of the build.
- **Internal links:** no broken internal links, no broken fragment links (`/contact#brief` exists), no internal link to a redirect. Max crawl depth 2; 15 pages at depth 1 (nav/footer), all 13 posts at depth 2 via `/blog`. Every post is also linked from at least 4 other pages besides `/blog`, all from inside body content (see table below). All 8 service pages now receive 3 to 8 contextual (in `<main>`) links from posts (N-4 closed).
- **External links:** 126 distinct external URLs checked, 0 returned 404/410/5xx/DNS errors. 6 returned 403 or 999 (help.shopify.com x3, bls.gov x2, LinkedIn profile), which is bot blocking, not breakage. The Hostinger referral link carries `rel="sponsored noopener noreferrer"`; no `target=_blank` link lacks `noopener`.
- **Images:** 249 `<img>` on 29 pages, 0 missing `alt` attributes, all non-fill images have width and height; `/work` empty alts 5 to 0 (M-10 largely closed).
- **Favicons and manifest:** `/favicon.ico` 200 (48x48), `/icon.svg`, `/apple-icon`, `/manifest.webmanifest`, `/opengraph-image` and per-service/per-post OG images all 200.
- **Compression:** home is 304 KB raw, 42 KB gzip.

### Post inbound links (excluding `/blog`, from `<main>` and body)

| Post | Inbound from posts | Inbound from service pages |
|---|---|---|
| cost guide | 8 | 1 |
| choose guide | 6 | 2 |
| MVP timeline guide | 5 | 3 |
| vibe-coded, WordPress migration, payment gateway, AI agent, MVP cost, Shopify vs custom, ChatGPT shopping, SaaS cost, maintenance cost | 3 to 7 | 1 to 2 |
| courier API | 4 | **0** |

The home page, `/services`, `/work` and `/about` link to no post (posts are reached from `/blog` and the service pages).

## Status of every 14 Oct finding

| ID | Finding | Now | Evidence |
|---|---|---|---|
| C-1 | Placeholder testimonials | OPEN, founder-gated | "Sarah Mitchell" still in `/` raw HTML |
| C-2 | Search Console | OPEN, not verifiable externally | `google-site-verification` present on 29 of 29 pages |
| H-1 | H1 words run together | FIXED (local) | 29 of 29 clean |
| H-2 | Duplicate title home vs custom software | FIXED (local) | 29 unique titles |
| H-3 | Spam URLs | FIXED (local) | `?channel=...` 308, `/products5070048.html` 410 + noindex |
| H-4 | Legacy redirects | FIXED (local) | 12 of 12 308, 11 paths 410 |
| H-5 | Mobile LCP | NOT CHECKED | no Lighthouse run in this brief |
| H-6 | Launch shipped without fixes | OPEN (process) | live is still 959866d |
| M-1 | Canonical inherited by 404 | **FIXED (local)** | 404 has 0 canonicals and 1 robots meta |
| M-2 | Slogan H1s | OPEN, founder-gated | `Built. Shipped. Live.`, `We build it like it's ours.` etc. unchanged |
| M-3 | Title/description lengths | **FIXED (local)** | privacy 46, terms 38, terms description 149 |
| M-5 | No case-study pages | OPEN | `/work` still one page; not in sitemap |
| M-6/M-7 | sameAs and schema duplication | presence OK, depth is the schema agent's | see Structured data |
| M-9 | Sitemap lastmod stale | FIXED (local), see F-2 for two posts | 2026-10-15 on 27 URLs |
| M-10 | Image alt text | MOSTLY FIXED | `/work` 5 to 0; `/about` founder photo and 13 post author avatars still `alt=""` (F-7) |
| M-11 | HTML weight | OPEN | home 304,156 B (was 304,556); posts 250 to 391 KB (F-5) |
| M-13 | `/favicon.ico` 404 | FIXED (local) | 200 local, 404 live |
| L-1 | `http://www` two hops | OPEN (Cloudflare) | live 2 hops |
| L-2 | privacy/terms og:url | **FIXED (local)** | og:url `/privacy`, `/terms` |
| L-3 | X-Powered-By | FIXED (local) | absent locally, present live |
| L-4 | AI bot list | FIXED (local) | Claude-SearchBot, Claude-User listed |
| L-5 | HTML not edge-cached | OPEN | live `cf-cache-status: DYNAMIC` (F-6) |
| L-9 | llms.txt leads with offices | **FIXED (local)** | new llms.txt has no office text |
| L-12 | `/api/` 308 | FIXED (local) | `Disallow: /api`, `/api` 404 |
| N-1/N-2 | Home content outside `<main>` | FIXED (local) | main 1,376 words, 0 hidden blocks |
| N-3 | Home H1 repeats tagline | **STILL OPEN** (F-4) | extracted H1 ends "software that moves. Software That Moves" |
| N-4 | Blog-to-service linking thin | **FIXED** | all 8 services have 3 to 8 contextual post links |
| N-5 | lastmod predates deploy | FIXED in source (baseline now 2026-10-15) | `STATIC_BASELINE = "2026-10-15"`; re-bump if deploy date moves and copy changes |
| N-6 | RSS lastBuildDate stale | **FIXED** | 15 Oct 2026 |
| N-7/N-8 | 410 on bare `/products`, 308 vs 301 | Info, no action | |
| IndexNow | not implemented | PARTLY FIXED | `public/153b8750f638c8c3ef93f06a89168199.txt` (content equals filename) and `scripts/indexnow.mjs`; live 404 until deploy |

## Findings (new and still open)

### F-1. Nothing is deployed: live fails most of the gate (High, owner dev/founder, no visual sign-off)
Evidence: live `/favicon.ico`, `/llms-full.txt`, `/.well-known/security.txt` and the IndexNow key file are 404; `X-Powered-By: Next.js` is present; `http://www` takes 2 hops; AI-training user agents get 403. Every green line above is LOCAL only.
Fix: rebuild, deploy, then run `bash docs/seo/12-audit-2026-10-14/verify-live.sh` against https://arrowbin.com (it includes sections 7 and 8 for the edge items), then `node scripts/indexnow.mjs`, resubmit the sitemap and file Removals for the two spam URLs.

### F-2. Running build is older than the source; two posts show a stale lastmod (Low, dev)
Evidence: `src/lib/blog.ts` and `src/app/sitemap.ts` have mtime 08:32, `.next/BUILD_ID` is 08:24. The :3117 sitemap and the BlogPosting JSON-LD still show `how-to-choose-a-software-development-company` lastmod/dateModified 2026-06-18 and `how-long-does-it-take-to-build-an-mvp` 2026-06-16, although both guides were edited on 15 Oct (new CTAs, links, charts). The source now has `updated: "2026-10-15"` on all three core guides (blog.ts lines 88, 551, 989), so this should resolve itself on the next build, and the visible "Updated" label on those two posts will change to October 15, 2026.
Fix: rebuild and confirm the sitemap shows 2026-10-15 for all three guides and `blog.ts` changes did not break anything (re-run verify-live). Fails if: any `<lastmod>` is older than a real content change. Needs visual sign-off only for the changed "Updated" date label.

### F-3. AI-training bots are 403 at Cloudflare while robots.txt invites them (Medium, owner founder; already a founder decision D2, listed under Founder-gated)
New evidence: measured again today on live. GPTBot, ClaudeBot, CCBot, Amazonbot and Bytespider get 403; the retrieval and citation bots (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User) get 200. The local robots.txt allows GPTBot, ClaudeBot and CCBot, and its header comment says the site welcomes AI "to learn from these pages".
Note on the signal: `Content-Signal` now appears only inside a `#` comment (kept because Lighthouse marks the directive invalid), so no parser reads it. verify-live check "robots.txt states a content signal" passes on the comment alone. If the founder wants a machine-readable signal, it must be a directive inside the group (Lighthouse will flag it); otherwise treat the comment as documentation.

### F-4. Home H1 text repeats the tagline for non-rendering extractors (Low, dev, visual sign-off needed if markup moves)
Evidence: `/` H1 text is `Arrowbin, a software development company for startups and growing businesses: software that moves.` (sr-only span) followed by the aria-hidden animated letters `Software That Moves`. Same as N-3 on 14 Oct.
Fix: keep the animated letters out of the `<h1>` text node (for example a `role="presentation"` sibling outside the heading) or give the sr-only span the whole phrase and render the animation as `aria-hidden` outside the `<h1>`. Fails if: extracted H1 contains the tagline twice.

### F-5. Raw HTML weight and script count are still high (Medium, dev; not measured with Lighthouse)
Evidence: raw HTML home 304 KB, services 217 KB, custom-software 282 KB, posts 250 to 391 KB (new posts 310 to 391 KB); 37 to 108 `<script>` tags (home 74, ChatGPT-shopping post 108). 52 to 59 percent of every page's bytes is `self.__next_f.push` RSC flight data (home 165 KB of 304 KB; ChatGPT post 232 KB of 391 KB), which duplicates page content. Gzip brings the home page to 42 KB, so transfer is fine; parse and hydration cost is the risk.
Fix: stop passing large post/service data objects as props to client components (render static content as server components, pass ids not bodies); measure with Lighthouse mobile x3 on a long post. Fails if: median mobile TBT above 200 ms or LCP above 2.5 s. Perf agent owns the numbers.

### F-6. If Cloudflare is ever told to cache HTML, the 1-year s-maxage needs a purge step (Low, dev/founder)
Evidence: static pages are sent with `Cache-Control: s-maxage=31536000` (live already does; `cf-cache-status: DYNAMIC` so nothing is cached at the edge today, L-5 still open). A page rule that caches HTML would hold stale pages for a year unless purged on each deploy.
Fix: add a "purge cache on deploy" step before enabling an HTML cache rule, or lower `s-maxage`.

### F-7. Remaining empty alts (Low, dev)
`/about` founder photo and the author avatar on all 13 posts have `alt=""`. Acceptable if the person's name is printed next to each image (it is a decorative duplicate); otherwise give the founder photo `alt="Md. Shishir Ahmed, founder of Arrowbin"`. No visual change.

### F-8. Courier post has no inbound link from a service page; home links to no post (Low, dev/content)
Evidence: `courier-api-integration-bangladesh` has 4 inbound links, all from other posts. The e-commerce service page links only to payment-gateway and Shopify posts. The home page, `/services`, `/work` and `/about` link to no post.
Fix: add the courier guide to the e-commerce service page "related guides"; optionally surface the 3 newest guides on the home page. Needs visual sign-off for the home change only.

### F-9. OG/X description differs from the meta description on 5 pages (Info)
`/services`, `/work`, `/about`, `/blog`, `/contact` pass a shorter, generic string to OG and X (for example `/blog`: "Guides on software development, cost, MVPs, SaaS and AI."). The other 24 pages match. Harmless for search; align only if share previews should carry the keywords.

### F-10. `?channel=` with an empty value returns 200 (Info)
`/?channel=` (empty value) is not matched by the proxy `has: query` rule; the real spam URL (`channel=5f1f69&name=LARRY`) is redirected. `/services?channel=x` and `/?utm_source=x` are 200 with a clean canonical, which is fine.

### F-11. CSP still relies on `'unsafe-inline'` (Low, accepted)
62 inline scripts on the home page (RSC flight chunks, JSON-LD, GA bootstrap, theme script) and no nonce, so `script-src 'unsafe-inline'` stays. A nonce CSP would force dynamic rendering for every page. No change recommended. Optional hardening: `Cross-Origin-Opener-Policy: same-origin`.

### F-12. security.txt expires 15 Oct 2027 (Info)
Add a calendar reminder; an expired file is treated as stale by scanners.

## Checks not done or not complete

- **Lighthouse / Core Web Vitals:** not run by me (performance agent). Categories 5 and 6 scores are source-level only.
- **Live `verify-live.sh`:** not run against https://arrowbin.com, per the brief (edge items only).
- **Live TLS and certificate expiry:** the curl probe returned no handshake detail in this shell; HSTS is present on live, protocol and chain not re-verified.
- **HSTS preload list submission** and **Search Console / GA4 state:** not checked (external; GA tools belong to another business and were not used).
- **Structured data validity (Rich Results, schema.org validator):** only presence and JSON parse tested; every page has Organization, WebSite and one ProfessionalService in the layout graph (the 14 Oct local projection said home only; now on all 29, one per page; duplicate @id check across pages not done), BreadcrumbList on 28 (all but the home page), Service + ItemList + FAQPage on the 8 service pages, BlogPosting + FAQPage on 13 posts. Schema agent to judge.

## Founder-gated (not re-raised as defects)

- C-1 placeholder testimonials (still in `/` HTML), M-2 slogan H1s, C-2 Search Console ownership.
- D2 AI-training bots 403 at Cloudflare vs the `ai-train=yes` comment (F-3).
- F1 to F9 price/timeline/discovery conflicts: the free-call wording in `llms.txt`, `llms-full.txt` and several CTAs versus "paid discovery" in the cost and MVP posts, and service-page price bands that `llms-full.txt` repeats verbatim. Whatever the founder decides must also change `src/app/llms.txt/content.ts` and `services.ts`.
- SVG charts and photos still to replace; 19 old green WebPs unreferenced in `public/blog/*/`.

## Pre-deploy checklist

1. Rebuild from the current source (blog.ts and sitemap.ts changed after the :3117 build) and re-run `verify-live.sh http://localhost:3117`.
2. Deploy, then `verify-live.sh https://arrowbin.com` (expect sections 7 and 8 to flag the AI-bot 403s and `http://www` 2 hops until the founder changes Cloudflare).
3. `node scripts/indexnow.mjs`; resubmit the sitemap in Search Console; Request Indexing for `/`, `/services`, the 8 service URLs and the 10 new posts; file Removals for `/products5070048.html` only (never for `?channel=` URLs: Search Console reads that prefix as the whole site and offers "Remove entire site?").
4. Cloudflare: single redirect rule for `http(s)://www` to `https://arrowbin.com` (L-1); decide D2.
5. Lighthouse mobile x3 on `/`, a service page and the heaviest post (F-5).

## Summary

The 15 Oct build is technically clean: the local score is 93/100 (14 Oct projection 89, live still about 62 because nothing is deployed). All 29 sitemap URLs are 200 with self-referencing absolute canonicals, unique titles and descriptions, one H1 each, no heading skips, zero hidden streamed blocks and full content in the raw HTML. The 404 canonical/duplicate-robots bug, the privacy/terms og:url and title gaps, the RSS lastBuildDate, the thin blog-to-service linking, the office wording in llms.txt, and the `/work` empty alts are all fixed; redirects, 410s, robots.txt, llms files, security.txt and the CSP (which now covers GA4 per Google's guide) all behave as designed, and `verify-live.sh` passes all 78 checks against localhost. Still open: the home H1 tagline duplication (Low), heavy RSC payload and script counts (Medium, unmeasured), the `http://www` two-hop and AI-training-bot 403s at Cloudflare (founder-gated), and a build/source mismatch that leaves two core guides with a stale lastmod on :3117 only until the next rebuild. The single most important next step is to rebuild, deploy and re-run the gate against production.
