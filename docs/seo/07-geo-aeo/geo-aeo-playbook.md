# GEO / AEO playbook for Arrowbin

**Date:** 29 September 2026. Evidence and sources: `ai-search-research.md`. Prompt-level targets: `prompt-citation-map.csv`. Monthly tracking: `ai-prompt-tracking.csv`.

**Starting point:** Arrowbin was mentioned in 0 of 20 AI answers (4 engines, 5 prompts). There is no LinkedIn company page, no directory profile, no Wikidata item and no third-party mention. The site itself (robots, llms.txt, schema, content) is in good technical shape. **The gap is off-site.** Most of the effort below goes to getting Arrowbin named on pages AI engines already cite.

**Principle:** AI engines recommend brands that other trusted pages name next to the category ("software development company", "MVP", "Bangladesh"). The best evidence says web mentions matter far more than backlinks ([Ahrefs](https://ahrefs.com/blog/ai-overview-brand-correlation/)), and listicles plus directories make up most citations for "best X" prompts ([Ahrefs](https://ahrefs.com/blog/best-lists-research/)).

---

## 0. Priority order (first 90 days)

| # | Action | Why | Effort | Owner |
|---|---|---|---|---|
| 1 | Create the **LinkedIn company page** and fix `sameAs` in `src/lib/site.ts` | Currently a placeholder URL (`linkedin.com/in/arrowbinllc`) in Organization schema; LinkedIn is the top AI Mode domain | 1 h | Founder + dev |
| 2 | Verify **Bing Webmaster Tools** (import from GSC), submit sitemap, enable IndexNow; submit to **Brave** | ChatGPT and Copilot lean on Bing; Claude appears to use Brave | 1 h | Dev |
| 3 | **Clutch** profile + ask 5–10 past clients for reviews | clutch.co was the most-cited domain in our baseline test | 1 day + client follow-up | Founder |
| 4 | **GoodFirms, DesignRush, TechBehemoths, Techreviewer, The Manifest** profiles (identical NAP, description, services, founding year) | Each appears as a cited source on at least one target prompt | 1 day | Marketing |
| 5 | **Crunchbase** organization + founder person profile | External reference needed for Wikidata and knowledge graphs | 2 h | Founder |
| 6 | Google Business Profiles (Dhaka + St. Petersburg), Yelp, Expertise.com nomination | Local prompts (Tampa, St. Pete, Dhaka) cite these | See `08-local` | Marketing |
| 7 | Upgrade the 3 existing posts to citation-ready format (section 3) | They target prompts that AIs answer with competitor posts | 2 days | Content |
| 8 | Outreach to the 15 listicles in section 2.2 | Direct route into ChatGPT "best X" answers | Ongoing, 5 per week | Marketing |
| 9 | Publish 2 original-data assets (MVP cost/timeline from Arrowbin projects; Bangladesh developer rates) | Primary data is cited far more than commodity content ([Growth Memo](https://www.growth-memo.com/p/2026-growth-memo-research-summary)) | 1 week | Founder + content |
| 10 | Wikidata item (after 3–5 above exist) | Structured entity for knowledge graphs | 2 h | Marketing |

---

## 1. Entity building

Goal: every engine should resolve "Arrowbin" to one entity: *Arrowbin LLC, a software development company founded in 2020 by Md. Shishir Ahmed, serving clients worldwide*. "Arrow" brands (Arrow Electronics, Arrowbits, Apache Arrow) crowd the name, so consistency matters.

### 1.1 Canonical entity facts (use word-for-word everywhere)
- **Name:** Arrowbin (legal: Arrowbin LLC)
- **One-line description:** "Arrowbin is a founder-led software development company that designs, builds and maintains custom software, web and mobile apps, SaaS products and AI automation for startups and growing businesses worldwide."
- **Founded:** 2020. **Founder:** Md. Shishir Ahmed.
- **Website:** https://arrowbin.com. **Email:** hello@arrowbin.com
- **Addresses and phones:** exactly as in `docs/seo/00-brief/business-brief.md` (same format on every listing).
- **Category terms:** software development company; custom software development; MVP development; e-commerce development.

### 1.2 Profiles to create or claim (then add each to `sameAs`)
| Profile | URL to create / claim | Notes |
|---|---|---|
| LinkedIn company page | https://www.linkedin.com/company/setup/new/ | Founder lists "Founder at Arrowbin" linking to the page. Post weekly (section 4). |
| Clutch | https://clutch.co (get listed) | Clutch reports Verified profiles average about 8x more AI citations than free ones ([Clutch, vendor claim](https://clutch.co/press-releases/ai-visibility-dashboard)). Consider Verified once reviews exist. Choose categories: Custom Software Development, E-commerce Development, Mobile App Development, Web Development. |
| GoodFirms | https://www.goodfirms.co | Cited for Bangladesh, Tampa and app-cost queries. |
| DesignRush | https://www.designrush.com | Cited on nearly every list prompt we checked (startups, offshore, SaaS, Bangladesh, Next.js, AI automation). |
| TechBehemoths | https://techbehemoths.com | Free; cited for Dhaka web development. |
| Techreviewer | https://techreviewer.co | Cited for startups and AI automation. |
| The Manifest | https://themanifest.com | Clutch sister site; cited for Tampa. |
| Crunchbase | https://www.crunchbase.com | Organization + Person (founder). |
| Upwork agency profile | https://www.upwork.com | Cited for "hire developers in Bangladesh". |
| GitHub org | https://github.com/Arrowbin-LLC (exists) | Add website + description. |
| Facebook | https://www.facebook.com/arrowbinllc/ (exists) | Match description. |
| YouTube channel | new | YouTube mentions are the strongest AI-visibility correlate in Ahrefs' 2026 report ([Business Wire](https://www.businesswire.com/news/home/20260526119691/en/Across-75000-Brands-YouTube-Mentions-Are-the-Strongest-Signal-of-AI-Visibility-New-Ahrefs-Report-Reveals)). |
| Dribbble / Behance | new | UI/UX listicles draw on these. |
| BASIS (Bangladesh Association of Software and Information Services) and e-CAB membership | basis.org.bd, e-cab.net | Member directories are authoritative BD citations. |
| Hostinger partner listing | via Hostinger partner program | Ask for a partner directory entry or case study that names Arrowbin. |

### 1.3 Wikidata (do this after Crunchbase, LinkedIn and 2+ directories exist)
Wikidata items must be backed by serious, publicly available references or fill a structural need ([Wikidata:Notability](https://www.wikidata.org/wiki/Wikidata:Notability)). Do not create it on the strength of arrowbin.com alone.
- Item "Arrowbin" : instance of (P31) business (Q4830453); industry (P452) software development; country (P17) United States; inception (P571) 2020; founded by (P112) → founder item (only if referenceable); official website (P856) https://arrowbin.com; LinkedIn company ID (P4264); Crunchbase organization ID (P2088); GitHub username (P2037) Arrowbin-LLC; Facebook username (P2013) arrowbinllc.
- Every statement gets a reference URL (Crunchbase, Florida Division of Corporations record at sunbiz.org, directory profiles).
- Then add the Wikidata URL to Organization `sameAs`.

### 1.4 Schema changes in the new build
File: `src/lib/site.ts` and `src/lib/schema.ts`.
1. Replace the LinkedIn placeholder with the real company page URL. Until it exists, **remove** it: a wrong `sameAs` is worse than none.
2. Extend `site.socials` / `sameAs` with GitHub, Clutch, GoodFirms, DesignRush, Crunchbase, YouTube and Wikidata as each goes live.
3. Organization: add `foundingDate: "2020"`, `founder: {"@id": ".../#founder"}`, `knowsAbout` (service names), `areaServed: "Worldwide"`, `slogan` if any. Keep `LocalBusiness` for the two offices.
4. Person (founder): extend `author.sameAs` with Crunchbase person, GitHub, X/Twitter if active; add `jobTitle: "Founder"`, `worksFor`, `knowsAbout`, and an `image`.
5. Once Clutch reviews exist, do **not** mark up third-party reviews as your own `AggregateRating` (Google's self-serving review policy); link to the Clutch profile instead.
Google states no special schema is needed for AI features ([Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)); the point here is entity disambiguation, not a ranking trick.

---

## 2. Getting into the listicles and directories AI engines cite

### 2.1 Directory category pages (list Arrowbin, then earn reviews)
From `prompt-citation-map.csv`, these pages recur as sources:
- https://clutch.co/developers , https://clutch.co/developers/startups , https://clutch.co/us/developers/small-business , https://clutch.co/developers/tampa , https://clutch.co/bd/web-developers , https://clutch.co/it-services/msp/website-maintenance , https://clutch.co/app-developers/startups
- https://www.designrush.com/agency/software-development , /startups , /offshore-software-developers , /saas , /small-business , /bd , /florida/tampa ; https://www.designrush.com/agency/ecommerce/bd ; https://www.designrush.com/agency/web-development-companies/nextjs ; https://www.designrush.com/agency/ai-companies/ai-automation-agency
- https://www.goodfirms.co/directory/country/top-software-development-companies/bangladesh , https://www.goodfirms.co/directory/city/top-software-development-companies/tampa , https://www.goodfirms.co/companies/web-development-agency/bangladesh
- https://techbehemoths.com/companies/web-development/dhaka ; https://techreviewer.co/top-software-development-companies ; https://themanifest.com/software-development/companies/tampa ; https://www.expertise.com/business/software-development/florida/tampa

Ranking inside these directories depends on reviews. Aim for 10 Clutch reviews in 6 months, from the named clients in the brief (Sikkhon, Dizishore, Rize Capital, Vellio Properties, Khaza Confectionery, ABC Tiles, Hatch Apps, portfolio brands).

### 2.2 Listicles to pitch (ranked by fit)
These are articles that currently appear for target prompts and that include companies of Arrowbin's size. Pitch with: one-paragraph description, founding year, 2–3 portfolio links, price range, a client reference, and Clutch link once live. Offer data or a quote rather than money; if a placement is paid, it must be disclosed.

**Bangladesh (highest probability):**
1. https://www.bdtask.com/blog/top-software-companies-in-bangladesh
2. https://www.ontiktechnology.com/blog/top-software-companies-in-bangladesh
3. https://technext.it/software-companies-in-bangladesh/
4. https://riseuplabs.com/best-software-development-company-in-bangladesh/
5. https://www.fusioninfotechltd.com/top-10-software-development-companies-in-bangladesh/
6. https://getup.com.bd/blog/best-ecommerce-website-development-company-in-bangladesh (e-commerce angle)
7. https://konigle.com/info/i/web-development-companies-dhaka

**Startup / MVP / custom software (global):**
8. https://techfundingnews.com/best-custom-software-development-companies-in-2026/
9. https://thectoclub.com/services/best-custom-software-development-company/
10. https://itechcraft.com/blog/best-software-development-companies-for-startups/
11. https://helpware.com/blog/tech/mvp-development-companies
12. https://s-pro.io/mvp-development-companies
13. https://www.gearbrain.com/best-offshore-software-development-startups-2675319949.html
14. https://xchange.avixa.org (community posts listing app/SaaS companies)
15. https://www.agencycluster.com/top-25/product-engineering-agencies

**Niche lists where a small studio can be named:** Next.js agency lists (https://gitnation.com/contents/top-nextjs-agency-and-nextjs-development-companies-to-hire, https://designrevision.com/blog/best-nextjs-development-agencies), AI automation for small business (https://automatenexus.com/blog/best-ai-automation-agencies-for-small-business), UX directories (https://agency.uxplanet.org/startup/, https://globaluxagencies.com/startups).

Freshness matters: 79.1% of cited lists were updated in 2025 ([Ahrefs](https://ahrefs.com/blog/best-lists-research/)). Prioritise lists with a current-year title; re-pitch lists when they update.

### 2.3 Arrowbin's own comparison content
Agency-authored lists are heavily cited (lowcode.agency, esparkinfo.com, keyholesoftware.com, andersenlab.com, vivasoftltd.com). Arrowbin can publish its own, honestly:
- "Software development companies in Bangladesh: an honest comparison for US buyers (2026)". Include 8–10 real competitors with a criteria table (founded, team size, specialties, Clutch rating, typical budget), clearly label Arrowbin as the author's company, and do not auto-rank Arrowbin #1 without justification.
- "AI automation agencies for small businesses compared" (fragmented, young SERP).
- "Best Next.js agencies for startups" (niche where Arrowbin has real stack depth).
Ahrefs recommends transparency and linking to alternatives in such lists ([Ahrefs](https://ahrefs.com/blog/best-lists-research/)).

### 2.4 Earned mentions beyond directories
- **Reddit:** founder account answering genuine questions in r/startups, r/SaaS, r/Entrepreneur, r/webdev, r/nocode, r/bangladesh (costs, timelines, how to vet agencies). Disclose affiliation; never astroturf. Reddit is a top Perplexity source ([Profound](https://www.tryprofound.com/blog/ai-platform-citation-patterns)).
- **LinkedIn articles** by the founder: LinkedIn Pulse already ranks for "freelancer vs agency".
- **dev.to / Medium / Hashnode** cross-posts (canonical to arrowbin.com): dev.to ranks for "how to choose a software development company"; Medium is a rising ChatGPT source ([Semrush](https://www.semrush.com/blog/most-cited-domains-ai/)).
- **Press releases** for real news (new US client, Hostinger partnership, open-sourced tool) via a wire service; PR Newswire citations grew in ChatGPT ([Semrush](https://www.semrush.com/blog/most-cited-domains-ai/)).
- **Podcasts / guest posts** on Bangladesh tech and startup media (Future Startup, The Daily Star tech section, Tampa Bay tech blogs).
- **Client-side mentions:** ask clients to name Arrowbin in their site footer credit or case study.

---

## 3. Content patterns that get cited (apply to every service page and post)

1. **Answer first.** Put the direct answer in the first one or two sentences under each H2 question. Example pattern for the MVP post: "A simple web MVP at Arrowbin typically ships in [X–Y] weeks." Fill the range only from real project data.
2. **Ranges with sources.** Every price or time claim is either Arrowbin's own data (labelled as such) or cited with a link (Clutch pricing data, GoodFirms survey, etc.). Never invent a number.
3. **Comparison tables.** Cost by project type, rates by region, freelancer vs agency vs in-house, native vs cross-platform. Tables are easy for engines to lift.
4. **Original data.** Publish "What 15+ Arrowbin projects actually cost and took (2020–2026)" as anonymised ranges. This is the single most defensible GEO asset.
5. **Definitions.** One-sentence definitions for MVP, headless commerce, AI agent, DevOps retainer: short, quotable, early in the page.
6. **FAQs.** 5–8 real buyer questions per service page with 40–80 word answers; FAQPage schema already exists in the build.
7. **Freshness.** Show "Last updated" dates; refresh cost/rate posts every quarter and change the date only when content changes.
8. **Focus.** One intent per page. Indig's data shows focused pages beat sprawling guides for ChatGPT citations ([Growth Memo](https://www.growth-memo.com/p/2026-growth-memo-research-summary)).
9. **Named author.** Every post bylined by Md. Shishir Ahmed with Person schema and LinkedIn link (already implemented).
10. **Service pages are citation targets too.** In agency categories, company landing pages were cited more than their blog lists ([Ahrefs](https://ahrefs.com/blog/best-lists-research/)). Each service page should state: who it is for, typical budget range, typical timeline, engagement model, tech stack, 2 proof links.
11. **YouTube versions.** 3–5 minute videos for the cost, MVP timeline and how-to-choose topics, embedded on the posts. YouTube is now the most cited AI Overviews domain ([Ahrefs](https://ahrefs.com/blog/ai-overview-citations-top-10/)).

### New content backlog for AI visibility (from the prompt map)
| Page | Target prompts |
|---|---|
| MVP development cost 2026 (own data) | "how much does it cost to build an MVP" |
| Mobile app cost 2026 | "how much does a mobile app cost" |
| E-commerce website cost | "how much does an ecommerce website cost" |
| Developer rates in Bangladesh vs India vs Eastern Europe | rates prompts, offshore prompts |
| Outsourcing software development to Bangladesh (US-entity angle) | Bangladesh MOFU prompts |
| Freelancer vs agency vs in-house | comparison prompt |
| Onshore vs nearshore vs offshore | comparison prompt |
| Questions to ask before hiring a dev agency | Reddit-dominated prompt |
| E-commerce case studies (3) with metrics | e-commerce BOFU prompts |
| Honest comparison list (Bangladesh companies) | "top software companies in Bangladesh" |

---

## 4. llms.txt and robots.txt recommendations

### robots (`src/app/robots.ts`)
Current posture (all AI crawlers allowed) is right for a lead-gen business. Edits:
- Add `Claude-SearchBot` and `Claude-User` (Anthropic's current search and user-fetch agents ([Search Engine Land](https://searchengineland.com/anthropic-claude-bots-470171))). Remove `Claude-Web` (legacy).
- Optionally add `Perplexity-User` (present), `meta-externalagent`, `DuckAssistBot`, `MistralAI-User`, `Bytespider` explicitly. They are already allowed by `*`, so this is documentation, not a functional change.
- Keep `Disallow: /api/`.
- Check hosting/CDN bot protection so these agents get HTTP 200, not a challenge page. Test with `curl -A "OAI-SearchBot" https://arrowbin.com/`.

### llms.txt (`src/app/llms.txt/route.ts`)
Low impact (Google does not use it; crawlers rarely fetch it ([Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide); [OtterlyAI](https://otterly.ai/blog/the-llms-txt-experiment/))), but cheap to improve:
- Add a "Key facts" section: founded 2020, founder name + LinkedIn, typical project budgets and timelines (from real data), engagement models, industries, Hostinger partnership.
- Add links to `/services`, `/blog`, `/work` hub pages and, when live, `/work/<slug>` case studies.
- Add a "Profiles" list with the external profiles (Clutch, LinkedIn, GitHub, Crunchbase) to reinforce the entity.
- Optional `llms-full.txt` with the plain-text service page content (currently 404). Skip unless trivial.

### Indexes to be in
- Google Search Console (action #1 in the roadmap), **Bing Webmaster Tools** + IndexNow, **Brave Search** URL submission. Without Bing and Brave, ChatGPT/Copilot and Claude have less to find.

---

## 5. Measurement

### 5.1 GA4 "AI Assistants" channel
GA4 now has a native AI Assistant channel (May 2026), but reports say it misses some platforms and is not retroactive ([Seresa](https://seresa.io/blog/ai-traffic-attribution/your-ga4-ai-traffic-regex-stopped-working-here-is-why)). Add a custom channel group as well:
- Admin → Data display → Channel groups → copy default → add channel "AI Assistants", condition *Session source matches regex*:
  `^(chatgpt\.com|chat\.openai\.com|perplexity\.ai|www\.perplexity\.ai|gemini\.google\.com|copilot\.microsoft\.com|claude\.ai|deepseek\.com|chat\.deepseek\.com|grok\.com|meta\.ai|you\.com|poe\.com|chat\.mistral\.ai)$`
- Move it above "Referral" and save ([Swydo guide](https://www.swydo.com/blog/track-ai-traffic-in-ga4/)).
- Build an Exploration: AI Assistants sessions → landing page → key event (form submit, cal.com booking click). Track leads, not just sessions.
- Add "How did you hear about us?" to the contact form with an "AI assistant (ChatGPT, Perplexity, etc.)" option; much AI influence arrives with no referrer.

### 5.2 Search Console and Bing
- GSC: AI Overviews / AI Mode impressions are folded into Web search; watch impressions for question queries (cost, timeline, how to choose).
- Bing Webmaster Tools **AI Performance** report: Copilot citations, cited pages and grounding queries ([Bing](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)). This is the only first-party citation data available; review monthly.

### 5.3 Manual prompt tracking (`ai-prompt-tracking.csv`)
- 40 prompts: services, Bangladesh, Tampa/St. Pete, cost, timeline, how to choose, and 3 brand prompts ("What is Arrowbin?").
- **Monthly, first Monday:** run every prompt in ChatGPT (search on), Perplexity, Google AI Mode, Google AI Overview (the normal SERP), Gemini, Copilot and Claude (web search on). Use logged-out or fresh sessions, US location (VPN) for US prompts and BD location for Bangladesh prompts.
- One row per prompt per engine per month (copy the 40 rows for each engine). Columns: `engine`, `date` (YYYY-MM-DD), `arrowbin_mentioned` (yes/no), `position` (rank in the list, blank if not listed), `cited_url` (Arrowbin URL or third-party page that named Arrowbin), `competitors_mentioned` (pipe-separated).
- Re-run the BabyLoveGrowth LLM visibility test monthly for the automated view (`llm-visibility-baseline.md`).
- **KPIs:** mention rate (share of prompt × engine answers naming Arrowbin); citation rate (share citing an arrowbin.com URL); share of voice vs the top 5 recurring competitors; count of third-party pages that name Arrowbin (list them); AI-referred leads per month.
- **Realistic targets (estimates, not forecasts):** first mentions on Bangladesh and local prompts within 3–4 months of directory profiles and reviews going live; global "best company" prompts are a 6–12 month effort that depends on reviews and listicle placements.

AI answers vary run to run, so treat single results as noise and look at monthly trends across all 40 prompts.
