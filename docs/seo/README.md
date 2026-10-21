# Arrowbin SEO / AEO / GEO research

**Research date:** 29 September 2026 · **Goal:** rank top 1 to 3 for winnable, commercially valuable keywords, get recommended in AI answers, and turn both into leads.

Start here. **Latest (15 Oct 2026): `13-sprint-2026-10-15/MORNING-BRIEF.md` (what the overnight sprint built, decisions, deploy steps) and `14-audit-2026-10-15/ACTION-PLAN.md`.** The phased plan it updates is `12-audit-2026-10-14/FIX-PLAN.md`; the 12-month strategy is `10-roadmap/seo-roadmap.md`.

## Executive summary

1. **Starting point is zero.**
   - AI answers: Arrowbin appears in 0 of 20 (5 buyer prompts across ChatGPT, Claude, Gemini and Perplexity).
   - Rankings: a third-party estimate shows 0 organic keywords.
   - Authority: 2 confirmed backlinks, no directory profiles or reviews.
   - Data: no Search Console access yet for arrowbin.com.
   - This is normal for a young domain, and it means every early win is visible.
2. **The market is valuable.** "custom software development company" has 2,900 US searches/month at a **$78.98 CPC**. A handful of leads per month justifies the whole programme.
3. **Broad head terms belong to directories and big agencies.**
   - Clutch ranks on 17 of 51 analysed results pages.
   - "Software development company in USA/Florida", "hire software developers" and "UI UX design agency" are won by **getting listed and reviewed**, not by new pages.
4. **The winnable ground is specific:**
   - Bangladesh offshore development: Low difficulty; the "US LLC + Dhaka team" angle is nearly unique.
   - Bangladesh e-commerce: Arrowbin's strongest proof and weak competition.
   - Cost, timeline and comparison guides.
   - An **ungated cost calculator + public pricing**: every competitor hides the number behind a form.
   - Tampa Bay local pages: 7 of 9 results are thin city pages.
5. **AI visibility follows off-site signals.**
   - AIs cite Clutch, DesignRush and "best companies 2026" listicles.
   - Brand mentions correlate with AI visibility far more than backlinks do (0.664 vs 0.218).
   - Priority: LinkedIn company page, Clutch + reviews, directories, Crunchbase then Wikidata, listicle outreach, Bing (feeds ChatGPT/Copilot) and Brave (feeds Claude).
6. **Fix these before or at launch:**
   - Placeholder testimonials on the homepage (FTC risk).
   - Possibly dissolved Florida LLC (verify on Sunbiz).
   - The US address is a virtual office: **no Google Business Profile there**.
   - Headings missing spaces in raw HTML.
   - Title cannibalisation between the homepage and the custom-software page.
   - Indexed spam URLs.
   - About 20 legacy 404s.
   - Placeholder LinkedIn in `sameAs`.
   - Mobile LCP of 4–5 s.

## Folder map

| Folder | What's inside | Key file |
|---|---|---|
| `00-brief/` | Business facts, goals, house style | `business-brief.md` |
| `01-audit/` | Technical + on-page audit (2 Critical, 5 High), per-page title/meta/H1 recommendations, legacy redirect map, Lighthouse numbers | `technical-audit.md`, `on-page-titles-meta.csv`, `redirect-map.csv` |
| `02-competitors/` | 50 competitors in 4 tiers, 17 deep profiles, winning content formats, gap analysis | `gap-analysis.md` |
| `03-serp/` | Top-10 analysis for 51 keywords, difficulty and recommended page type, AEO question bank | `serp-summary.csv`, `people-also-ask.md` |
| `04-keywords/` | 1,492-keyword universe (Google Autocomplete), 725 question keywords, verified volume data | `keyword-universe.csv`, `volume-data-verified.csv` |
| `05-keyword-map/` | Every keyword assigned to one target page (45 pages), with the rule script | `keyword-map.md`, `page-targets.csv` |
| `06-content-plan/` | Page templates, P1 briefs, 6-month calendar, internal linking plan | `content-plan.md` |
| `07-geo-aeo/` | AI search research, AI visibility baseline, prompt/citation map, GEO playbook, 40-prompt monthly tracker | `geo-aeo-playbook.md`, `llm-visibility-baseline.md` |
| `08-local/` | Dhaka + Tampa Bay local plan, GBP eligibility, NAP standard, citation list | `local-seo-plan.md`, `citations.csv` |
| `09-links/` | Backlink baseline, 6-month link plan, opportunity list | `link-building-plan.md`, `link-opportunities.csv` |
| `10-roadmap/` | Phased 12-month plan, owners, dependencies, failure checks, KPIs, founder decisions | `seo-roadmap.md` |
| `11-audit-2026-10-01/` | **Full post-launch audit of the live site: SEO Health Score 63/100**, 10 specialist reports, screenshots, sequenced fix plan | `AUDIT-REPORT.md` |
| `12-audit-2026-10-14/` | **Re-audit, live vs local build: live 63/100, 76 once the local fixes deploy.** 14 specialist reports, the phased **fix plan** (owners, dependencies, KPIs) and `verify-live.sh` (the deploy gate: a fix counts only when it passes on production) | `FIX-PLAN.md`, `AUDIT-REPORT.md` |
| `13-sprint-2026-10-15/` | **Overnight sprint:** Release A fixes, 13 new guides (incl. an original salary data post with CSV), off-page kit, writing guide, AI-tells linter, topic research and briefs, editor report, agent log | `MORNING-BRIEF.md`, `offpage-kit/`, `editor-report.md` |
| `14-audit-2026-10-15/` | **Re-audit after the sprint: local build 84/100 (live 63 until deploy).** 9 specialist findings, screenshots, action plan | `FULL-AUDIT-REPORT.md`, `ACTION-PLAN.md` |
| `15-next-wave/` | **Prepared, not built:** draft copy for a WordPress to Next.js migration service page and a vibe-code cleanup page (needs F8), briefs for a Bangladesh app-cost post and a fixed-price vs T&M post (needs F4) | `README.md` |
| `17-gsc-2026-10-20/` | **Search Console check after the deploy:** impressions up about 50x, Bangladesh top 10 vs US page 5, 7 service pages not crawled yet, why not the Indexing API, the traffic plan | `GSC-CHECK.md` |

## Data sources and limits (read before quoting numbers)
- **Real data:**
  - Google Autocomplete (keyword universe)
  - Live web search results (SERP analysis; positions approximate, give or take 2)
  - Competitor sites and sitemaps (blog counts are sitemap estimates)
  - Clutch and directory pages
  - A BabyLoveGrowth LLM visibility test (raw output in `07-geo-aeo/`)
  - A Ubersuggest volume lookup
  - A local Lighthouse run
- **Not available in this research:**
  - Search volumes for most keywords (see the roadmap "Tools" section)
  - Live People Also Ask boxes (the question bank is tagged by source)
  - Real-user Core Web Vitals
  - Paid backlink indexes
- The GSC/GA4 connection available in the research session belongs to **a different business (ooraa.org)**. None of its data is used here.
- Targets in the roadmap are planning goals, not forecasts. Re-baseline after 3 months of Search Console data.

## How to keep this current
- Re-run `python docs/seo/05-keyword-map/build_keyword_map.py` after adding keywords or changing page targets.
- Log the monthly AI prompt test in `07-geo-aeo/ai-prompt-tracking.csv`.
- Refresh cost and timeline content every January.
- Repeat the competitor and SERP research quarterly.
