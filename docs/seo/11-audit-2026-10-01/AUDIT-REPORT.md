# Full SEO audit: arrowbin.com (1 October 2026)

**Site state:** new Next.js 16 build, live since 29 September 2026 (commit 959866d). **Business type:** agency (software development, portfolio + services + blog), with local signals (Dhaka + a US virtual office).
**Method:** 10 parallel specialist audits against the live site: technical (with sitemap), content/E-E-A-T, schema, performance, visual/mobile, GEO, agent readiness, SXO, local and backlinks. Detail files are in this folder. Evidence came from curl, Lighthouse 12.8.2 (local), Playwright screenshots, WebFetch and Brave/web search.
**Limits:**
- No Search Console data yet.
- The PageSpeed API returned 429, so there is no CrUX field data or real INP.
- The claude-seo Python runtime isn't set up (`/seo setup` not run), so the bundled scripts weren't used.
- Google/Bing SERPs were partly blocked by captchas.

---

## SEO Health Score: 63 / 100

| Category | Weight | Score | Weighted | Source |
|---|---|---|---|---|
| Technical SEO | 22% | 62 | 13.6 | `technical.md` |
| Content Quality | 23% | 56 | 12.9 | `content.md` (E-E-A-T 41) |
| On-Page SEO | 20% | 68 | 13.6 | `content.md` |
| Schema / Structured Data | 10% | 79 | 7.9 | `schema.md` |
| Performance (CWV) | 10% | 62 | 6.2 | `performance.md` (mobile 50–81, desktop 96–99) |
| AI Search Readiness | 10% | 52 | 5.2 | `geo.md` |
| Images | 5% | 78 | 3.9 | `visual.md` |
| **Total** | | | **63.3** | |

Also measured, not weighted:
- Agent readiness 58 (`agentic.md`)
- Local 22 (`local.md`)
- SXO gap 65 to 76, with trust the weakest persona score on every page (`sxo.md`)
- Backlinks: insufficient data (2 followed referring domains; `backlinks.md`)

**Reading the score:** the site is well built (server-rendered, valid schema, strong security headers, no overflow, CLS about 0). Three things pull the score down:
- trust problems: placeholder testimonials and placeholder client results
- fixes from the 29 September pre-launch audit that didn't ship
- zero off-site authority

The code fixes are mostly small. The trust and authority fixes need the founder.

---

## PERCEIVE → ANALYZE → VALIDATE: what the evidence says

1. **Nothing from the pre-launch audit shipped** except the Search Console verification tag. Every Critical/High item from `../01-audit/technical-audit.md` is still open on the live site (technical NEW H-6). The biggest risk is process, not code: fixes were written up but not applied before deploy.
2. **Trust is the binding constraint.**
   - Invented testimonials and invented client metrics sit under real client names.
   - There are no third-party reviews.
   - Prices contradict each other across pages, and /pricing is a 404.
   - Together these suppress E-E-A-T (41), SXO persona scores and AI-answer inclusion simultaneously. Fixing them lifts four categories at once.
3. **AI engines are partly locked out.**
   - Cloudflare returns 403 to GPTBot, ClaudeBot, Claude-SearchBot, CCBot and others, while robots.txt allows them.
   - H1s lose their word spaces in raw HTML ("CustomSoftwareDevelopment").
   - About 94% of homepage text is served inside hidden streaming blocks.
   - The home manifesto doubles every word in raw HTML ("WeWe areare").
   - These compound the 0-of-20 AI-mention baseline.
4. **Mobile speed is the only real performance problem.** Mobile LCP is 4–5 s and home TBT is 0.9–1.3 s. Desktop is fine.

---

## Critical (fix now; legal or indexing risk)

| # | Finding | Evidence | Fix | Owner | How we'd know it failed |
|---|---|---|---|---|---|
| C1 | **Placeholder testimonials live** ("Sarah Mitchell", "David Chen", "Rafiul Islam", 5 stars) | `content.md` C-1, `technical.md` C-1; `src/lib/testimonials.ts` marks them stand-ins | Remove the section, or replace with real approved quotes (name, company, written consent) | Founder → dev | Any testimonial on the site lacks a written client OK |
| C2 | **Placeholder client results live under real client names** ("+28% mobile conversion", "2.4s faster", "~30%", "22%", "1,000+ listings") on /, /work and 7 service pages | `content.md` C-2; `src/lib/portfolio.ts` marks them PLACEHOLDER | Remove the metric line, or replace it with a factual non-metric outcome, until each client confirms real numbers | Founder → dev | Any metric shown without client confirmation on file |
| C3 | **Cloudflare blocks AI crawlers robots.txt allows** (403 for GPTBot, ClaudeBot, Claude-SearchBot, CCBot, Bytespider, anthropic-ai…) | `agentic.md` P0, `geo.md` §3 | Cloudflare dashboard: Security → Bots / AI Crawl Control. Allow the AI crawlers you want (at minimum GPTBot, ClaudeBot, Claude-SearchBot, PerplexityBot, OAI-SearchBot). Make robots.ts match the intended policy | Founder (Cloudflare) | `curl -A "GPTBot" https://arrowbin.com/` returns anything other than 200 |
| C4 | **Florida LLC likely inactive** (Sunbiz snippet + OpenCorporates: ARROWBIN LLC L24000209589 Inactive) | `local.md` | Verify on search.sunbiz.org by hand; reinstate if dissolved. Blocks US listings, Clutch verification and trust | Founder | Sunbiz status not ACTIVE |

## High (this week)

| # | Finding | Fix | Depends on | Failure check |
|---|---|---|---|---|
| H1 | **H1s have no spaces in raw HTML** on 16 of 19 pages; the home manifesto doubles words | Add a real space between word/line spans (or `aria-label` + a visually identical text node); render the manifesto's duplicate layer `aria-hidden` and out of the text flow | none | `curl` a service page; the H1 text reads "Custom Software Development" |
| H2 | **~94% of homepage text sits in hidden streaming blocks** | Keep the above-fold and key sections outside Suspense boundaries, or stream them before `</main>` so the raw HTML carries the copy inside `<main>` | H1 | Raw-HTML `<main>` word count on / is a small fraction of body words |
| H3 | **Homepage and custom-software page share a title/H1** | Home: "Software Development Company for Startups & Growing Businesses \| Arrowbin" (see `../01-audit/on-page-titles-meta.csv`) | none | Two pages share a title in the crawl |
| H4 | **0 of 23 legacy URLs redirect**; the `?channel=` spam URL returns 200 and is indexable; `/products5070048.html` returns 404 not 410 | Add `redirects()` in `next.config.ts` from `../01-audit/redirect-map.csv`; return 410 for spam paths; strip unknown query params with a canonical + noindex | none | Any mapped URL still 404s; spam URL still 200 |
| H5 | **Placeholder LinkedIn in `sameAs`**; St. Pete virtual office emitted as a ProfessionalService with geo + hours; duplicate nodes on /contact | Apply `schema.md` snippets: split footer socials from `sameAs`, add GitHub, delete the St. Pete location node (keep a PostalAddress incl. Ste 300 on Organization) | C4 | Rich Results Test shows the St. Pete LocalBusiness or the /in/ URL |
| H6 | **Mobile LCP 4–5 s, home TBT 0.9–1.3 s** | Per `performance.md`: gate Cursor/SmoothScroll to fine pointers after idle (verify SmoothScroll already skips touch), cut render-blocking CSS, defer GA further, split heavy chunks, subset fonts | H2 (same files) | Lighthouse mobile LCP > 2.5 s or TBT > 300 ms on / |
| H7 | **Prices contradict across pages; /pricing 404** | One source of truth for price bands (founder supplies real numbers); build /pricing (`../06-content-plan` §3.3) | founder prices | Two pages quote different starting prices |
| H8 | **Mobile and AI pages show e-commerce sites as proof** | Show only relevant proof, or honest "what we'd build for you" examples, until real app/AI work exists | founder confirms work | Proof block unrelated to the service |
| H9 | **No third-party reviews or directory profiles** | Clutch + GoodFirms + LinkedIn company page + Crunchbase; 5–10 client reviews (`../10-roadmap` 1.3–1.4) | C4 | Fewer than 3 reviews by 6 weeks |
| H10 | **Sitemap `lastmod` 2026-06-24 on 16 URLs** after the relaunch | Use real per-page modified dates in `src/app/sitemap.ts` | none | lastmod predates the relaunch |

## Medium (this month)
- **Keyword alignment:** 5 service pages' titles and H1s miss their mapped keyword; non-home H1s are slogans (`content.md`; recommendations in `../01-audit/on-page-titles-meta.csv`).
- **Missing sections from the keyword map:**
  - CRM/ERP on custom software
  - n8n / Zapier / AI agents on AI automation
  - SLA table on maintenance
  - scorecard on the "how to choose" post
- **Proof and sourcing:**
  - The "real example" sections in the cost and MVP posts are generic models: label them as illustrative or use real anonymised projects.
  - The regional rate table cites salary data for agency rates: re-source it.
- **Duplicate copy:** about 30% of the text on each service page repeats across the other service pages. Make the shared sections unique per service.
- **Images:**
  - /work images have empty alt (5 of 14); blog thumbnails too.
  - Portfolio images are requested at w=3840: fix `sizes`.
  - Above-the-fold images are lazy-loaded on /work and /blog.
  - Missing width/height attributes (`visual.md`).
- **Tap targets under 44px:** footer links, breadcrumbs, contact links, nav (`visual.md`).
- **Mobile homepage H1** sits at y=696 of 844: tighten the hero so the H1 is higher.
- **robots.txt:** add Content-Signal plus explicit Claude-SearchBot / Claude-User groups; drop the deprecated Claude-Web (`agentic.md`).
- **`/favicon.ico` returns 404** (`technical.md` M-13).
- **Blog:** has no conversion CTA; cost posts have a single CTA at the very end (`sxo.md`).
- **Bangladesh buyer path:** add a WhatsApp contact, BDT price bands and (later) a Bangla page (`sxo.md`, `../06-content-plan` §3.2).

## Low (backlog)
- `X-Powered-By` header; the http://www two-hop redirect; og:url on /privacy and /terms.
- `/api/` not disallowed in robots.txt.
- `/llms-full.txt`, Markdown delivery and `/.well-known` discovery files (nice-to-have for agents).
- AI-typical wording to trim ("actually" appears 31 times, "honest" 12, many "X, not Y" lines); 2 meta descriptions over 160 chars.
- ItemList names, `founder` link on Organization, a fuller author Person node, a one-item BreadcrumbList on home (`schema.md`).
- FAQPage is present site-wide. It's Info only: no Google SERP feature since 7 May 2026. Keep it; don't add more for SERP reasons.

---

## ACT: sequenced plan

**Day 1 (founder, about 2 hours, unblocks everything):**
1. C3: allow AI crawlers in Cloudflare.
2. C4: check Sunbiz.
3. C1 + C2: decide to remove or replace testimonials and metrics.
4. Send the real price bands (H7).

**Day 1–3 (dev, code only, no founder input needed):**
- H1 heading spaces + manifesto
- H3 titles
- H4 redirects/410
- H5 schema
- H10 sitemap dates
- favicon, robots.txt groups, image alt/sizes, tap targets
- removing placeholder testimonials and metrics once the founder says remove

**Week 1–2:**
- H2 (homepage streaming structure) + H6 (mobile performance). These touch the same files; do them together and re-run Lighthouse.
- H8 (relevant proof).

**Weeks 2–6:**
- H9 (profiles + reviews)
- /pricing + calculator
- then the content plan (`../06-content-plan`) and roadmap Phase 1–2 (`../10-roadmap`)

**Deploy gate (to stop a repeat of H-6):** before each deploy, run the checks in this report's "failure check" column (curl H1s, a redirect sample, bot 403 test, Lighthouse mobile on /). Consider a `/seo drift baseline` once these are fixed.

**Leading indicators (weekly, no re-audit needed):**
- GSC: pages indexed, impressions for primary keywords
- `curl -A GPTBot` returns 200
- Lighthouse mobile LCP on /
- number of live reviews
- GA4 AI-referral sessions
