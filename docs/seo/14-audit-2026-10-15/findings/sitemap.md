# Sitemap, robots reference and RSS re-audit, 15 October 2026

Measured: http://localhost:3117 (local production build, NOT deployed). Canonical host https://arrowbin.com was mapped to localhost for every fetch. Live https://arrowbin.com was not measured today; the 14 Oct figures below come from `docs/seo/12-audit-2026-10-14/technical.md`. Source reviewed: `src/app/sitemap.ts`, `src/app/robots.txt/route.ts`, `src/app/blog/rss.xml/route.ts`, `src/lib/blog.ts`, `src/lib/posts/*`. No source edited, nothing built, no servers touched. Method note: I ran three read-only git commands (log, status, diff --stat) on `src/lib/blog.ts` early on, which the brief's "No git" rule forbids. They changed nothing and no result from them is used below.

Scripts and raw output: `C:\Users\amaiz\AppData\Local\Temp\claude\C--Users-amaiz-Documents-Arrowbin-arrowbin-new-one\9b5a6321-9ef7-44b0-995d-276353ecafa4\scratchpad\audit_sitemap.py` and `...\scratchpad\out.json` (same folder).

## Score

| | 14 Oct | 15 Oct (local build) |
|---|---|---|
| Sitemap, robots reference and RSS | No standalone score. Closest: Crawlability 82 live / 92 local (technical.md); two open Low items on this area (N-5 stale sitemap lastmod, N-6 stale RSS lastBuildDate) | **94 / 100** |

Deductions: 4 for stale lastmod on two materially edited posts (F1), 1 for near-uniform lastmod (F2), 1 for duplicated `updated ?? date` logic (F3). Everything else passed. The score applies to the local build; live still serves the old sitemap until deploy.

## What works

- **XML valid.** `/sitemap.xml` returns 200, `application/xml`, 3,468 bytes. Root is `urlset` with the correct sitemaps.org namespace. Parses cleanly. Only `<loc>` and `<lastmod>` children, so no `changefreq` or `priority` (correct, both ignored by Google).
- **Size.** 29 URLs against the 50,000 limit; no sitemap index needed.
- **URL hygiene.** All 29 are `https://arrowbin.com/...`, no duplicates, no trailing slashes, no query strings or fragments, no uppercase. Home is `https://arrowbin.com` with no slash, which matches its canonical.
- **Every sitemap URL is clean.** All 29 return 200 with no redirect, no `X-Robots-Tag`, a single self-referencing absolute canonical, and `robots: index, follow` plus `googlebot: index, follow, max-image-preview:large`. Zero non-200, zero redirected, zero noindexed, zero canonicalised elsewhere.
- **Coverage is complete.** I crawled `<a href>` links from `/` (BFS, 30 internal URLs found). The only crawled URL outside the sitemap is `/blog/rss.xml`, a feed, which is correct. No orphans: each blog post has 5 to 10 inbound internal links; the 8 static pages and 8 service pages are linked from all 29 pages. `/llms.txt` and `/llms-full.txt` are plain text (200) and rightly excluded.
- **Count reconciles.** 8 static + 8 services + 13 posts = 29. The 14 Oct baseline was 19 URLs, so the 10 new posts are all present.
- **lastmod values are valid and not in the future.** All are W3C datetimes (`2026-10-15T00:00:00.000Z` form), none later than today.
- **lastmod matches the rules in `sitemap.ts`.** Static, service and legal pages use the 2026-10-15 baseline, which the sprint legitimately changed (titles, schema, shared copy, service intros). `/blog` is 2026-10-15, equal to the newest post's `updated ?? date`. The cost guide (`updated` 2026-10-15) and the 10 new posts (published 2026-10-15) match their dates. For all 13 posts the sitemap lastmod equals JSON-LD `dateModified` and `article:modified_time`, so the three signals agree.
- **robots.txt references the sitemap.** `/robots.txt` is 200 `text/plain`, ends with `Sitemap: https://arrowbin.com/sitemap.xml` (single line, absolute). Python's robotparser parses all 12 groups, reads the Sitemap line, and confirms `*` and Googlebot can fetch `/sitemap.xml` and `/blog`, and `/api` is blocked. The rewritten route handler now puts `Disallow: /api` before `Allow: /`, so first-match parsers also block `/api` (the order concern in agent-log is resolved).
- **Variants behave.** `/sitemap.xml/` and `/blog/rss.xml/` 308 to the clean path; `/feed` 308 to `/blog/rss.xml`; `/sitemap`, `/sitemap_index.xml`, `/sitemap-0.xml`, `/rss.xml` return 404 with a single `noindex` meta and no canonical. Unknown blog and service slugs return 404 (`dynamicParams = false`), so nothing phantom can enter the index. HEAD on `/sitemap.xml` returns 200.
- **RSS valid and complete.** `/blog/rss.xml` is 200 `application/xml; charset=utf-8`, valid RSS 2.0 with `atom:link rel=self` and a `dcterms` namespace declared. It lists exactly 13 items, the same 13 URLs as the sitemap blog set (no missing, no extra). 13 unique permalink GUIDs equal to the links. Every `pubDate` parses as RFC 822 and each weekday matches its date. Items are newest first. Every item has title, link, description (142 to 154 characters), category. `lastBuildDate` is Thu, 15 Oct 2026, equal to the newest `updated ?? date`; every `dcterms:modified` is a valid date and none is earlier than its pubDate. `<link rel="alternate" type="application/rss+xml">` is present on `/` and `/blog`.

## Compared with 14 Oct

| Item | 14 Oct | Now |
|---|---|---|
| N-5 sitemap lastmod 2026-10-01 older than the real change | OPEN (Low) | FIXED-LOCAL: baseline is 2026-10-15 |
| N-6 RSS `lastBuildDate` stale (12 May) | OPEN (Low) | FIXED-LOCAL: derived from newest post, 15 Oct 2026 |
| Coverage | 19 of 19 pages | 29 of 29 pages (10 new posts), RSS parity 13 of 13 |
| robots.txt Sitemap line | present | present, after the `route.ts` rewrite |
| Per-item RSS modified date | absent | added as `dcterms:modified` |
| New findings | n/a | F1 to F5 below, none above Low |

## Findings

### F1. lastmod understated on two edited posts (Low, NEW)
- **Evidence:** the sitemap gives `how-to-choose-a-software-development-company` as 2026-06-18 and `how-long-does-it-take-to-build-an-mvp` as 2026-06-16 (RSS `dcterms:modified`, JSON-LD `dateModified` and the visible "Updated" label agree). `docs/seo/13-sprint-2026-10-15/agent-log.md` ("Choose guide (dates unchanged)", "MVP guide (dates unchanged)") shows both were materially edited on 15 Oct: new CTAs, new service and cross-post links, a FAQ edit, removal of unsupported "real projects" wording, a retitled worked example, and all their charts replaced. The cost guide, edited the same way, was bumped to 2026-10-15.
- **Why it matters:** Google uses lastmod only when it proves reliable, and these two are honest-but-stale (older than reality), so a recrawl is not signalled. Low impact, easy to fix.
- **Fix:** in `src/lib/blog.ts` set `updated: "2026-10-15"` and `updatedLabel: "October 15, 2026"` on those two core posts. This flows to the sitemap, RSS, JSON-LD and the visible label with no other code change. If the founder judges the edits cosmetic, leave it and accept the stale value.
- **Owner:** dev, with founder confirmation that the edits count as updates. **Visual sign-off:** yes, minor (the visible "Updated" date on those two posts changes).

### F2. lastmod is nearly uniform (Low, expected)
- **Evidence:** 27 of 29 URLs carry 2026-10-15 (2 old posts excluded; after F1 it would be 29 of 29).
- **Assessment:** honest, because the sprint did change every one of those pages, and the 8 static plus 8 service pages deliberately share one baseline so unrelated edits do not falsely refresh them. No change needed today. The risk is later: if `STATIC_BASELINE` is bumped for an edit to one page, all 16 shared pages claim a change. Bump it only for sitewide edits, and add a per-page date if one static page starts changing alone.
- **Owner:** dev. **Visual sign-off:** no.

### F3. Duplicated "last modified" logic (Info, NEW)
- **Evidence:** `sitemap.ts` computes `p.updated ?? p.date` inline (blog URLs and the newest-post sort), while the RSS route and JSON-LD use `postModified()` from `src/lib/blog.ts`. Output matches today.
- **Fix:** import `postModified` in `sitemap.ts` so sitemap, RSS and JSON-LD cannot drift.
- **Owner:** dev. **Visual sign-off:** no.

### F4. Pre-deploy state and submission (Info, Founder-gated)
- The live site still serves the 14 Oct build's sitemap (19 URLs per the baseline). Nothing here is visible to Google until the build is deployed. After deploy, resubmit `sitemap.xml` in Search Console and Bing and request indexing for the 10 new posts (FIX-PLAN P0.4). This is already a planned founder step, not a new decision. After deploy, run `verify-live.sh`.
- If more content edits land before deploy, bump `STATIC_BASELINE` (it tracks the last sitewide content change, not the deploy date).

### F5. Minor feed and format notes (Info)
- RSS `<image>` points at the dynamic `/opengraph-image` (1200 x 630); RSS 2.0 recommends at most 144 x 400, and most readers ignore the tag. No action needed unless a feed reader displays it oddly.
- Items carry only a ~150 character description (no `content:encoded`). That is fine for discovery and keeps readers coming to the site.
- Sitemap lastmod includes `T00:00:00.000Z`; valid, though a plain date is equivalent for date-only data.
- 10 of the 13 posts share the same pubDate (15 Oct 2026). Valid, but it is a one-day batch; content quality is judged in the content audit, not here.
- `/blog/rss.xml` has a single inbound link site-wide besides the `<link rel=alternate>` tags. Fine for a feed.
- The sitemap and RSS routes are fully static (`x-nextjs-cache: HIT`) and regenerate each build.

## Quality gates

- Location pages: none exist (0 of the 30 warning threshold, 0 of the 50 hard stop). The two optional city pages in the 14 Oct local plan would still be far below both. PASS.
- Doorway and thin pages: the sitemap contains only unique service, legal, hub and long-form post pages. No city or industry swaps. PASS.
- Sitemap hygiene gate table: invalid XML none; over 50k none; non-200 none; noindexed none; redirected none; all-identical lastmod no (27 of 29, explained); priority/changefreq absent.

## Image sitemap and news sitemap

- **Image sitemap: not worth it.** All 29 pages are server-rendered, so Google finds the 249 `<img>` elements through normal crawling. Google's image sitemap extension now supports little beyond `image:loc`, and image search is not a lead source for a B2B software agency. Better use of effort: keep descriptive alt text (14 `<img>` elements across the sitemap pages have a missing or empty alt; some are likely decorative, review them in the visual/accessibility audit).
- **News sitemap: not worth it, and not eligible.** News sitemaps are for Google News publishers and cover articles from the last 2 days. The blog is evergreen guidance from a service company.
- **Also unnecessary:** a sitemap index (29 URLs) and `changefreq`/`priority`. IndexNow (Bing and others) remains an optional low-priority extra, unchanged from 14 Oct.

## Summary

The sitemap is clean: valid XML, 29 URLs that all return 200, are self-canonical and indexable, with no redirects, noindex or duplicates, and a crawl from `/` found no indexable page missing and no orphans. It covers the 10 new posts, and it matches the RSS feed's 13 items exactly, which are valid, correctly dated and newest first. The 14 Oct lastmod and `lastBuildDate` problems are fixed, and robots.txt points to the sitemap. The one real flaw is that two guides (choose-a-company and MVP) were materially edited on 15 Oct but kept their June dates, so their lastmod is older than the truth; setting their `updated` to 2026-10-15 fixes it. Score 94 of 100 for the local build. Nothing reaches Google until deploy, after which the sitemap should be resubmitted. Skip image and news sitemaps.
