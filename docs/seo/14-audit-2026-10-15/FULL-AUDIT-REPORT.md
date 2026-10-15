# SEO re-audit after the overnight sprint (15 October 2026)

**Measured:** the local production build (`next start` on :3117) that contains every sprint change. **Not deployed.** Live https://arrowbin.com is still commit 959866d, and it scores what it scored on 14 October (63) until you deploy.

**Method:** the claude-seo audit skill with 9 specialist agents:
- technical, content and E-E-A-T, schema, sitemap, performance, visual, GEO/AI, SXO and topic clusters;
- business type: agency;
- local, maps and backlinks were not re-run, because nothing they measure changed tonight;
- Google API data was not used, because the connected account belongs to a different business.

Each specialist's evidence is in `findings/<area>.md`. The 14 October baseline is `../12-audit-2026-10-14/`.

## SEO Health Score

| Category (weight) | 14 Oct live | 14 Oct local | **15 Oct local** | Source |
|---|---|---|---|---|
| Technical SEO (22%) | 62 | 89 | **93** | `findings/technical.md` |
| Content quality (23%) | 55 | 66 | **76** | `findings/content.md` |
| On-page SEO (20%) | 68 | 82 | **88** | lead's estimate from the technical, SXO and cluster findings |
| Schema (10%) | 79 | 89 | **94** | `findings/schema.md` |
| Performance (10%) | 62 | 66 | **76** | `findings/performance.md` |
| AI search readiness (10%) | 50 | 55 | **69** | `findings/geo.md` |
| Images (5%) | 78 | 84 | **82** | `findings/visual.md` (new charts are hard to read on phones; see V-1) |
| **Total** | **63** | **76** | **84** | |

The FIX-PLAN projected 82 after Phases 1 and 2 and 85 after Phase 3. The local build is at 84 without any founder-only items. Most of what remains is founder-gated:
- prices (F1 to F5);
- Cloudflare AI crawler rules;
- off-site entity profiles and reviews;
- real project proof.

**Supporting scores:**
- Sitemap: 94.
- Topic clusters and internal linking: 64. There was no 14 Oct score; the specialist estimates it was about 20.
- SXO persona averages: 65.5 / 68.2 / 58.7 (14 Oct: 64.9 / 67.3 / 58.3). The new posts average 70.6 / 69.1 / 65.0.
- Lighthouse mobile (median of 3): home 78 (14 Oct: 61), service pages 80 to 82, /work 81, /blog 86, posts 86 to 89. SEO, Accessibility and Best Practices are 100 on every page tested. CLS is 0 everywhere.
- Deploy gate `verify-live.sh` on local: 77/77 passed, against 7 failures on 14 Oct (live then: 34 failures).

## What the sprint fixed (verified by the specialists)

- **Text inside `<main>`:** zero hidden streamed blocks on 29 of 29 pages. Main text is in the raw HTML on every template; /services went from 42 to 735 words inside `<main>`.
- **Indexing hygiene:**
  - Every page has a self-canonical, `og:url` and `og:locale`.
  - The 404 has no canonical and a single `noindex`.
  - Unknown slugs return 404.
  - 12 of 12 legacy redirects return 308, and 11 gone paths return 410.
- **Schema:**
  - 58 JSON-LD blocks, all parsing, with 0 dangling `@id`s.
  - The founder node resolves on every page.
  - All 13 BlogPostings are complete.
  - No one-item breadcrumbs remain.
- **AI readiness:**
  - `llms.txt` is valid and agent-actionable.
  - `llms-full.txt` (80 KB) and `security.txt` exist.
  - `robots.txt` is valid: Lighthouse robots-txt passes and `Disallow` comes before `Allow`.
  - Form hygiene was verified with Playwright.
- **Content:**
  - 10 new guides of 3,700 to 4,400 words, sourced to primary pages. 67 cited figure groups were checked and none mismatched.
  - Every post passes the AI-writing linter with no warnings, and the posts are consistent and cross-linked.
  - Service-page boilerplate is down from 33 to 49% to 5 to 10.5%.
- **Performance:**
  - Home TBT 1,279 ms to 376 ms.
  - Service-page CLS 0.139 to 0.
  - GA4 is no longer blocked by the CSP.

## Top open issues

| # | Severity | Issue | Owner | Fix |
|---|---|---|---|---|
| O-1 | High | Nothing is deployed. On live, the new posts, `llms-full.txt`, `security.txt` and the favicon all return 404 | founder (D1) | Deploy, then run `verify-live.sh` on production and `scripts/indexnow.mjs` |
| O-2 | High | Cloudflare returns 403 to GPTBot, ClaudeBot, CCBot, Amazonbot and Bytespider, while `robots.txt` says they are welcome | founder (D2, P1.1) | Allow them in AI Crawl Control, or change the robots comment to `ai-train=no`. The two must agree |
| O-3 | High | Off-site entity is empty: no LinkedIn company page, no Wikidata, an unclaimed Clutch profile, and the GitHub org still says "Digital Agency" | founder | `docs/seo/13-sprint-2026-10-15/offpage-kit/` |
| O-4 | Medium (High in GEO) | Price and timeline conflicts (F1 to F5) are now quoted side by side in `llms-full.txt` | founder | Decide once; dev propagates to `services.ts`, the posts and the llms files |
| O-5 | High (content) | Scaled-content risk: 10 posts share one date, author and structure | founder | Publish in waves (option below), and add one real data point per post where you have one |
| O-6 | High (visual) | New 1280-wide charts are hard to read on phones (labels about 5 px) | dev | Being fixed tonight: tap to open full size |
| O-7 | Medium | The /blog lead card and the post banner crop UI-mockup covers (up to 39%) | dev | Being fixed tonight: 16:9 boxes |
| O-8 | Medium | Mobile lab LCP 3.2 to 4.5 s (field paint is about 1.3 s; the lab model exaggerates) | dev (part needs sign-off) | `next/dynamic` for below-fold motion and the quote form (invisible). The animation timing and WebGL fallback need your approval |
| O-9 | Medium | Service `hasOfferCatalog` lists deliverables the pages no longer show | dev | Being fixed tonight (F1) |
| O-10 | Low | Home "15+ brands" counter vs 8 projects on /work | founder | It matches your own list (8 projects plus 7 other companies in `info.txt`). Confirm, or show the other names |

## Founder-gated (not counted as defects)

- **D1 to D10** from FIX-PLAN.
- **F1 to F9** price, timeline and offer decisions (`docs/seo/13-sprint-2026-10-15/editor-report.md`).
- **Placeholder testimonials:** kept by your decision; FTC risk noted.
- **Dhaka schema node:** address, hours and geo pin (D8).
- **WhatsApp number:** for Bangladesh buyers (D7).
- **Real project proof** per service.

## Where to look

| Area | File |
|---|---|
| Technical | `findings/technical.md` |
| Content and E-E-A-T (per-post scorecard) | `findings/content.md` |
| Schema (ready JSON-LD snippets) | `findings/schema.md` |
| Sitemap | `findings/sitemap.md` |
| Performance (Lighthouse medians, LCP analysis) | `findings/performance.md` |
| Visual (screenshots in `screenshots/`) | `findings/visual.md` |
| GEO / AI (citability, crawler table, weak-capsule rewrites) | `findings/geo.md` |
| SXO (SERP page types, personas) | `findings/sxo.md` |
| Clusters (next 10 pages, link gaps) | `findings/clusters.md` |
| Prioritised plan | `ACTION-PLAN.md` |
