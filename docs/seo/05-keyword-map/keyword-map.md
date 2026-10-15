# Keyword map: one page per search intent

**Built:** 29 September 2026. **Inputs:** `04-keywords/keyword-universe.csv` (1,492 real Google Autocomplete + manual keywords), `03-serp/serp-summary.csv` (difficulty and page type per head term), `02-competitors/gap-analysis.md`.

**Files in this folder**
- `keyword-map.csv`: every keyword with its target URL, page status (existing/new), page priority and intent. Sorted by page, primary keyword first.
- `page-targets.csv`: one row per page with its primary keyword and all secondary keywords.
- `build_keyword_map.py`: the rules. Edit the rules, re-run, and both CSVs regenerate.

**Result:** 1,352 keywords mapped to 45 target pages · 104 excluded (not buyer intent: job seekers, "how to start an agency", templates, definitions) · 36 unmapped for manual review.

## The rules this map enforces
1. **One primary keyword per page, and no page targets another page's primary.** This prevents cannibalisation. The audit found one live case: the homepage and the custom-software page share the title "Custom Software Development Company | Arrowbin" (`01-audit` H-2). The fix is below.
2. **The homepage targets the brand plus "software development company".** "custom software development company" (US 2,900/mo, CPC $78.98, verified) belongs to `/services/custom-software-development`.
3. **Directory-dominated terms get off-site work, not new pages.** These are "software development company in usa / florida", "hire software developers", "ui ux design agency" and "ai development company" (`03-serp`: Clutch, DesignRush, Upwork and Toptal own page one). They are won by listings, reviews and listicle inclusion (`07-geo-aeo`, `09-links`).
4. **New pages only where the search results show a winnable gap** (Low to Medium difficulty in `03-serp`) or where the page is a conversion asset (pricing, calculator).
5. **Local pages stay out of the main navigation** (founder rule: don't emphasise offices). They're linked from the footer and from relevant content only.

## Target pages

### Existing pages (optimise)
| URL | Primary keyword | Mapped kws | Difficulty (03-serp) | Notes |
|---|---|---|---|---|
| `/` | software development company | 170 | Very High | Brand + head term as secondary. Change title from the custom-software one (H-2). |
| `/services` | software development services | 22 | High | Hub page; link every service and the new pages. |
| `/services/custom-software-development` | custom software development company | 48 | High | Verified US 2.9K/mo. Owns "custom software development services / company / bespoke". Add a CRM/ERP section (`#crm-erp`, 25 kws). |
| `/services/ecommerce-development` | ecommerce development company | 93 | High | Strongest proof area (8 live e-commerce sites). |
| `/services/mobile-app-development` | mobile app development company | 108 | Very High | Win long-tail ("for startups", "flutter", "react native") first. |
| `/services/saas-product-engineering` | saas development company | 42 | High | Pair with SaaS cost guide. |
| `/services/ui-ux-design` | ui ux design agency | 43 | Very High | Directory-dominated. Support with a Dribbble/Behance profile. |
| `/services/ai-automation` | ai automation agency | 131 | Medium | Winnable. Add n8n, chatbot and AI agent sections (long-tail). |
| `/services/cloud-devops-hosting` | devops consulting services | 62 | Medium-High | SMB and startup DevOps angle, plus the Hostinger partnership. |
| `/services/maintenance-support` | software maintenance and support services | 40 | Medium | Retainer tiers and an SLA table win this format. |
| `/blog/how-much-does-custom-software-development-cost` | how much does custom software development cost | 66 | Medium-High | Upgrade: answer-first, regional rate table, calculator link, FAQ. |
| `/blog/how-long-does-it-take-to-build-an-mvp` | how long does it take to build an mvp | 3 | Medium | Quick win. Two Bangladesh agencies already rank in the US. |
| `/blog/how-to-choose-a-software-development-company` | how to choose a software development company | 17 | Medium | Reposition as a scorecard + RFP template. |

### New pages: P1 (build first; quick wins or conversion assets)
| URL | Primary keyword | Mapped kws | Why |
|---|---|---|---|
| `/offshore-software-development-bangladesh` | offshore software development bangladesh | 82 | Low difficulty. Top pages are about 1,800 words with no directories. The "US LLC + Dhaka team" angle is unique (only SJ Innovation shares it). |
| `/ecommerce-website-development-bangladesh` (+ Bangla version) | ecommerce website development company in bangladesh | 11 | Low-Medium difficulty. Strongest live proof. |
| `/blog/app-development-cost-bangladesh` | app development cost in bangladesh | 7 | Low difficulty. Show USD and BDT. |
| `/pricing` | software development pricing | 24 | No Bangladesh peer publishes prices. Honest starting ranges per service. |
| `/tools/software-cost-calculator` | software development cost calculator | 3 | That results page is all calculators, and every competitor gates the number behind a form. Ours shows a range instantly. |
| `/blog/mvp-development-cost` | mvp development cost | 4 | Medium difficulty; the natural sibling to the MVP timeline post. |
| `/blog/shopify-vs-custom-ecommerce` | shopify vs custom ecommerce website | 3 | Low difficulty; our own builds as proof. |
| `/blog/mvp-vs-prototype-vs-poc` | mvp vs prototype | 0 (from 03-serp) | Medium difficulty; extractable comparison table. |
| `/blog/staff-augmentation-vs-dedicated-team` | staff augmentation vs dedicated team | 2 | Low difficulty (LinkedIn posts rank). |
| `/software-development-tampa-bay` | software development company tampa | 59 | 7 of 9 St. Pete results are thin city pages. Covers Tampa, St. Pete and Clearwater. **No GBP at the virtual office** (see `08-local`). |

### New pages: P2 (months 2 to 4)
`/services/mvp-development` (34) · `/services/dedicated-development-team` (6) · `/services/nextjs-development` (8) · `/services/web-application-development` (29) · `/hire/nextjs-developers` (3) · `/custom-software-for-small-business` (7) · `/blog/saas-development-cost` (5) · `/blog/ecommerce-website-cost` (11) · `/blog/web-app-development-cost` (2) · `/blog/app-development-cost` (49) · `/blog/software-development-outsourcing-guide` (22) · `/blog/offshore-vs-nearshore-vs-onshore` (7) · `/blog/in-house-vs-outsourcing-software-development` (2) · `/blog/fixed-price-vs-time-and-materials` (4) · `/blog/custom-software-vs-off-the-shelf` (7) · `/blog/bangladesh-ecommerce-integrations` (bKash, Nagad, SSLCommerz, Pathao, Steadfast, RedX: 6).

### New pages: P3 (months 4 to 12, or when proof exists)
`/industries/*` (53 kws; build a vertical only when there is a case study to show) · `/blog/flutter-vs-react-native` · `/blog/agency-vs-freelancer` · `/hire/react-developers` · `/blog/software-maintenance-cost` · the remaining comparison backlog (`/blog/comparisons`, 39 kws, to split into individual posts) · `/work/<slug>` case studies (parked by the founder; high value for M-5 in the audit).

## Pages we deliberately do NOT build
- Hundreds of programmatic "hire X developers" or city pages. Riseup Labs (about 490) and Simform (17 cities) do this. It's thin-content risk for a young domain, and a staff-augmentation motion Arrowbin may not want (`02-competitors/winning-content-formats.md` §5).
- "Top software companies in Bangladesh" as a quick win. It's crowded with self-ranking lists. It's a medium-term bet and must disclose its criteria (see `06-content-plan`).
- Head-term cost guides like "how much does it cost to build an app" (Very High). We target narrower variants instead.

## Next step: fill in volumes
`volume_us` is empty for all but 14 keywords (`04-keywords/volume-data-verified.csv`). Once a volume source is connected (recommended: DataForSEO, see `10-roadmap`), fill the column, then re-rank page priorities by summed volume per page × commercial value ÷ difficulty.
