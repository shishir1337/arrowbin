# SEO + AEO + GEO roadmap (12 months)

**Built:** 29 September 2026 · synthesises folders `01` to `09`. Each action lists its owner, what it depends on, and **how we'd know it failed**, so nothing runs on faith.

## Where we start (baseline, 29 Sep 2026)
- **AI answers:** Arrowbin appears in **0 of 20** answers (5 buyer prompts × ChatGPT, Claude, Gemini, Perplexity). AIs recommend Simform, BairesDev, Fingent and ScienceSoft, and cite **Clutch, DesignRush and "best companies 2026" listicles** (`07-geo-aeo/llm-visibility-baseline.md`).
- **Organic:** a third-party tool estimates 0 ranking keywords. **No Search Console access for arrowbin.com** (the GSC/GA4 connection in the research session belongs to another business).
- **Authority:** 2 confirmed followed backlinks (client footers), no directory profiles, no reviews, no press (`09-links/backlink-baseline.md`).
- **Content:** 3 blog posts; competitors run 150 to 1,500.
- **Market signal:** "custom software development company" = **2,900 US searches/mo, CPC $78.98**; that SERP opens with a **Local Pack** (`04-keywords/volume-data-verified.csv`). Leads in this niche are valuable enough that a handful per month pays for the whole programme.

---

## Phase 0: blockers (this week, before or at launch)

| # | Action | Owner | Why / evidence | Failure check |
|---|---|---|---|---|
| 0.1 | **Remove or replace the placeholder testimonials** ("Sarah Mitchell", "David Chen", "Rafiul Islam", marked stand-ins in `src/lib/testimonials.ts`) with real, approved client quotes | Founder + dev | US FTC rule 16 CFR 465 on fake reviews; trust (audit C-1) | Any testimonial without a written client OK still exists |
| 0.2 | **Verify the Florida LLC status** on Sunbiz (a snippet says ARROWBIN LLC L24000209589 was administratively dissolved 26 Sep 2025); reinstate if needed | Founder | Every US listing, Clutch verification and review platform checks the legal entity (`08-local` §0) | Sunbiz shows anything other than ACTIVE |
| 0.3 | **Connect arrowbin.com to Google Search Console** (DNS verification via Cloudflare), set `GOOGLE_SITE_VERIFICATION` in production, submit the sitemap; add **Bing Webmaster Tools** (import from GSC) + IndexNow | Dev | No first-party data exists; ChatGPT and Copilot lean on Bing (audit C-2, `07-geo-aeo`) | Sitemap not "Success" in GSC/Bing within 7 days |
| 0.4 | **Fix spaced text in headings** (hero H1s render "CustomSoftwareDevelopment" in raw HTML) | Dev | AI crawlers read raw HTML (audit H-1) | `curl` of a service page shows an H1 without spaces |
| 0.5 | **End title cannibalisation**: homepage targets "software development company"; custom-software page keeps "custom software development company" | Dev | Audit H-2 | Both pages still share a title |
| 0.6 | **410 the spam URLs** (`/products5070048.html`, `?channel=` Japanese spam) and request removal in GSC; security check | Dev | A past WordPress hack is still indexed under the brand (audit H-3) | Spam URLs still in `site:arrowbin.com` after 30 days |
| 0.7 | **Deploy the redirect map** (`01-audit/redirect-map.csv`, about 20 legacy WordPress/marketplace URLs) | Dev | Recover old link equity (audit H-4) | Any listed URL still returns 404 |
| 0.8 | **Fix `sameAs`**: remove the placeholder `linkedin.com/in/arrowbinllc`; add GitHub (`Arrowbin-LLC`) and YouTube if owned | Dev | Wrong entity links confuse knowledge graphs (audit M-6, `07-geo-aeo`) | Any `sameAs` URL isn't 200 or isn't Arrowbin |
| 0.9 | **Root layout canonical**: remove `canonical: "/"` from the layout; set it on the homepage only | Dev | Future pages silently canonicalising to the homepage (audit M-1) | 404 page still outputs a canonical |
| 0.10 | Standardise **NAP + email** everywhere (GitHub org says info@ and "Arrowbin Digital Agency") | Founder | `08-local` §0.3 | Any profile disagrees with `08-local` §5 |

## Phase 1: foundations (weeks 1 to 4)

| # | Action | Owner | Depends on | Failure check |
|---|---|---|---|---|
| 1.1 | Apply recommended **titles, descriptions and H1s** to every page (`01-audit/on-page-titles-meta.csv`) | Dev | 0.5 | CSV and live pages differ |
| 1.2 | **Mobile LCP to ≤ 2.5 s** (currently 4.0–5.0 s): critical CSS, font loading, defer smooth-scroll/cursor on mobile (audit H-5) | Dev | launch | CrUX/PSI mobile LCP > 2.5 s after 28 days |
| 1.3 | **Entity profiles:** LinkedIn company page, Crunchbase (company + founder), Clutch, GoodFirms, DesignRush, TechBehemoths, Techreviewer, The Manifest, Hostinger Agency Directory, GitHub, Dribbble/Behance. Identical description, founding year, services and NAP | Founder + marketing | 0.2, 0.10 | Fewer than 10 live profiles at week 4 |
| 1.4 | **Ask 5 to 10 past clients for Clutch reviews** (the Dhaka and St. Pete Clutch lists have competitors with 1 to 9 reviews, so 5 to 10 is enough to appear) | Founder | 1.3 | Fewer than 3 published reviews by week 6 |
| 1.5 | **Client footer credits** ("Designed & built by Arrowbin") on the 6 client sites missing them (2 already live: nbafl.net, maneelclub.com) | Founder | none | Fewer than 4 new followed links by week 4 |
| 1.6 | **Upgrade the 3 existing posts** + apply the service-page template (`06-content-plan` §1A, §2) | Content + dev | 1.1 | Posts lack an answer box, tables or FAQ |
| 1.7 | **robots.ts:** add `Claude-SearchBot`, `Claude-User`; drop the deprecated `Claude-Web`. Submit the site to **Brave Search** | Dev | none | Named bots blocked or missing |
| 1.8 | **GA4:** create an "AI assistants" channel group (chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, claude.ai); mark `generate_lead` as a key event | Dev | none | AI traffic not visible as its own channel |
| 1.9 | **Dhaka Google Business Profile**, only if the Mohammadpur office is staffed and visitable. **No GBP at the St. Petersburg virtual office** | Founder | 0.10 | GBP suspended or unverified |

## Phase 2: P1 content + conversion assets (months 2 to 3)
From `06-content-plan` §3–4: `/pricing` · `/offshore-software-development-bangladesh` · `/tools/software-cost-calculator` (ungated) · `/ecommerce-website-development-bangladesh` · `/software-development-tampa-bay` · posts: MVP cost, BD app cost, Shopify vs custom, MVP vs prototype, staff augmentation vs dedicated team, AI automation for small business, SaaS cost.

**Off-site in parallel:**
- Pitch the 15 listicles AIs cite (`07-geo-aeo/geo-aeo-playbook.md` §2.2), 5 per week.
- Journalist requests via Qwoted / Help a B2B Writer / Featured: 3 answers per week from the founder.

**Failure check:**
- P1 pages not indexed within 14 days of publishing (check GSC URL Inspection).
- No P1 page reaches top 20 for its primary keyword by the end of month 3.

## Phase 3: authority + expansion (months 4 to 6)
- **Data asset 1:** developer rates by country (sourced).
- **Data asset 2:** Bangladesh e-commerce statistics 2026 (sourced).
- **Open-source Next.js payment kit** for Bangladesh gateways (`09-links` §6).
- P2 pages (`05-keyword-map`): MVP, dedicated team, Next.js, web app, small business, outsourcing pillar, remaining cost guides.
- First `/work/<slug>` case studies, with metrics only as clients confirm them.
- **Wikidata item** once Crunchbase, LinkedIn and 2+ directories exist.

**Failure check:**
- Fewer than 20 followed referring domains by month 6.
- Assets earn fewer than 3 organic links in 60 days.

## Phase 4: compound (months 7 to 12)
- Industry pages only where proof exists.
- Yearly refresh of every cost and timeline post (January).
- Comparison backlog.
- More case studies.
- Guest posts and podcasts (a few high-quality ones).
- An honest "best software development companies in Bangladesh" listicle with disclosed criteria.
- Re-run the full research quarterly (the scripts and CSVs here are reusable).

---

## KPIs and targets
These are planning targets, not forecasts. There's no historical data yet; re-baseline after month 3 with GSC data.

| KPI | Baseline | Month 3 | Month 6 | Month 12 | Source |
|---|---|---|---|---|---|
| Indexed pages | about 19 live | 30+ | 45+ | 70+ | GSC |
| Keywords in top 10 (US) | 0 | 10 | 40 | 120 | GSC / rank tracker |
| Keywords in top 3 (US) | 0 | 3 (long-tail) | 15 | 50 | GSC / rank tracker |
| Organic clicks / month | unknown | 300 | 1,500 | 5,000 | GSC |
| AI mentions (40-prompt tracker) | 0 of 20 answers | 2 prompts | 8 prompts | 15 prompts | `07-geo-aeo/ai-prompt-tracking.csv` |
| Clutch reviews | 0 | 7 | 10+ | 20+ | Clutch |
| Followed referring domains | 2 | 10 to 12 | 20 to 30 | 50+ | GSC links / Ahrefs WMT |
| Leads (brief form + calls) from organic/AI | unknown | 3 / mo | 8 / mo | 20 / mo | GA4 `generate_lead` + CRM |

**Leading indicators to watch weekly** (they move before rankings do):
- GSC impressions for P1 pages
- average position of the 10 primary keywords
- number of new profiles and reviews
- AI referral sessions in GA4

## Tools and data this plan needs
| Need | Recommendation | Why |
|---|---|---|
| Search volumes + KD for 1,492 keywords | **DataForSEO** (pay-as-you-go API; the claude-seo plugin has a DataForSEO extension) or a **free Google Ads account** for Keyword Planner | Free tools cap at 1 to 3 lookups; no Ads account exists on the research Chrome profile |
| Rankings + first-party data | Google Search Console + Bing Webmaster Tools (free) | Phase 0.3 |
| Rank tracking | Ahrefs Webmaster Tools (free for verified sites) or DataForSEO SERP API | Weekly top-10 tracking of primary keywords |
| AI visibility | Monthly re-run of the LLM visibility test + `ai-prompt-tracking.csv` | Baseline exists |

## Decisions only the founder can make
1. Real client testimonials to replace the placeholders (0.1).
2. Florida LLC reinstatement if dissolved (0.2).
3. Real starting prices for `/pricing` and the calculator (Phase 2).
4. Whether to offer staff augmentation / dedicated teams (affects `/services/dedicated-development-team` and `/hire/*`).
5. Whether the Dhaka office qualifies for a GBP (staffed, visitable).
6. Un-parking `/work/<slug>` case studies (strongest proof asset for AI and organic).
7. Which volume data source to connect (DataForSEO vs Google Ads Keyword Planner).
