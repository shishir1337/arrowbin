# Seed list and method: keyword universe

Collected 2026-09-29. Output: `keyword-universe.csv` (1,492 keywords) and `question-keywords.md`. No search volumes, KD or CPC were collected at this step; those columns are intentionally empty for the enrichment step.

## Method

1. **Seeds.** Hand-written seed terms for each of the 8 services, the general "software development company / agency" theme, industries matching Arrowbin's portfolio, the supported tech stack, Bangladesh, Florida / Tampa Bay, comparisons, hiring / outsourcing, cost, and how-to topics (full lists below).
2. **Expansion with Google Autocomplete.** Each query was sent to the public suggest endpoint `https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=<query>`, which returns up to 10 suggestions. Rate: a small thread pool (3 to 6 workers) with a 0.3 s pause per request.
   - First 3 seeds of each service / general cluster: seed + every suffix modifier, and every prefix modifier.
   - Remaining service seeds: seed + `cost`, `company`, `services`, `for startups`, `best`, `hire`, and prefixes `how to`, `best`.
   - Alphabet soup (seed + a to z) on 16 priority seeds.
   - Question expansion: 10 question words x 21 topics.
   - Industry seeds: seed, seed + `company`, seed + `cost`. Hiring seeds: seed, + `for startups`, + `cost`. Cost seeds: seed, + `for`. Tech, BD, FL, comparison and how-to seeds: seed only.
   - Totals: 2,325 unique queries, 13,123 suggestions returned, 9,770 unique suggestions (612 queries returned nothing).
3. **Manual additions.** Every seed that autocomplete did not echo back, plus about 50 hand-picked terms for Arrowbin-specific angles (for example `shopify to next.js migration`, `n8n automation agency`, `ecommerce website development company in bangladesh`). These are tagged `source=manual` and noted "confirm volume"; some may have little or no search volume.
4. **Noise filtering.** Removed: jobs, salaries, courses, certifications, students, interview, accounting treatment (capitalisation, amortisation, GAAP/IFRS), app downloads, sports and other unrelated meanings (for example "MVP" in sport), non-English-script results other than Bangla, and every location Arrowbin does not target (Indian, Pakistani, Gulf, European, African and other cities / countries, plus US cities outside Florida). A whitelist vocabulary check then dropped any suggestion containing a word outside the seed and service vocabulary, which removes most brand names and one-off junk. Result: 4,127 candidates.
5. **Normalisation and de-duplication.** Lower-cased, whitespace collapsed, question marks removed, exact duplicates dropped, and `e commerce` / `e-commerce` variants dropped where the `ecommerce` spelling was already present. Near-duplicates that are genuinely different queries (singular / plural, `in usa` / `usa`) were kept, because they can have different volumes; the keyword-map step should merge them onto one URL.
6. **Tagging** (rule-based, then spot-checked):
   - `service_cluster`: assigned in priority order local-bd > local-fl > comparison > cost-pricing > hiring-outsourcing > how-to (question words, guides, templates, process) > industry > technology > the 8 services > general-agency. For non-service clusters, `notes` says which service page the keyword maps to ("maps to ...").
   - `intent`: transactional (hire, near me, quote), local (BD / FL geo terms), commercial (company / agency / services / cost / best / vs), informational (questions, guides, examples), navigational (named platforms such as Upwork, Toptal, Clutch).
   - `funnel`: BOFU (vendor-seeking: company, agency, services, hire, near me), MOFU (cost, comparisons, best / top lists, checklists, timelines), TOFU (general questions and definitions).
   - `source`: `autocomplete` or `manual`. **PAA was not collected**: no SERP API was available in this session and Google result pages cannot be scraped reliably. Add PAA questions when a SERP tool (for example DataForSEO) is connected.
7. **Selection to 1,492.** Within each cluster, keywords were ranked by a simple lead-value score (BOFU / commercial terms, cost terms, startup / small business / USA modifiers up; UK / CA / AU modifiers, very long tails and bare two-word topics down) and capped per cluster. Seed head terms get a bonus so short, high-intent heads (for example `custom software development company`) are never cut in favour of long tails, and a few head terms were force-included. The discarded candidates are still in the working cache and can be re-added if the volume step shows gaps.

## Caveats

- Autocomplete shows that a phrase is searched, not how often. Many long tails will turn out to have near-zero volume.
- Autocomplete was requested with `gl=us`, so Bangladesh and Florida suggestions reflect what US-context autocomplete returns; Bangla-script queries barely surfaced. Re-running BD seeds with `gl=bd` is a cheap follow-up.
- Tagging is rule-based. Expect a few misfiles (for example a query containing "process" landing in how-to). The keyword-map step should correct these as it assigns URLs.

## Final count per cluster

| Cluster | Keywords |
|---|---|
| ai-automation | 75 |
| cloud-devops-hosting | 45 |
| comparison | 75 |
| cost-pricing | 165 |
| custom-software-development | 60 |
| ecommerce-development | 55 |
| general-agency | 75 |
| hiring-outsourcing | 137 |
| how-to | 170 |
| industry | 110 |
| local-bd | 115 |
| local-fl | 70 |
| maintenance-support | 45 |
| mobile-app-development | 60 |
| saas-product-engineering | 55 |
| technology | 125 |
| ui-ux-design | 55 |
| **Total** | **1492** |

## Seeds used

### Services and general theme

- **custom-software-development:** custom software development, custom software development company, custom software development services, bespoke software development, custom software, software development services, custom web application development, web application development, mvp development
- **ecommerce-development:** ecommerce website development, ecommerce development company, ecommerce development, ecommerce website design, online store development, shopify development, woocommerce development, headless ecommerce, custom ecommerce website
- **mobile-app-development:** mobile app development, app development company, mobile app development company, app development, ios app development, android app development, flutter app development, react native app development, app developers
- **saas-product-engineering:** saas development, saas development company, saas product development, build a saas, product engineering services, saas mvp development, software product development
- **ui-ux-design:** ui ux design agency, ui ux design services, ui ux design company, product design agency, web design agency, website redesign, app design agency, ux audit
- **ai-automation:** ai automation agency, ai automation, ai development company, ai chatbot development, business process automation, workflow automation, ai agent development, ai integration services, n8n automation, zapier automation
- **cloud-devops-hosting:** devops services, devops consulting, cloud migration services, managed hosting, aws consulting, website hosting for business, cloud devops, managed cloud services
- **maintenance-support:** software maintenance, website maintenance services, website maintenance, app maintenance, software support services, website maintenance cost, legacy software modernization, software maintenance and support
- **general-agency:** software development company, software development agency, software company, web development company, web development agency, app development agency, software development, software house, dev agency, digital agency

### Suffix modifiers

cost, price, pricing, company, agency, services, for startups, for small business, near me, in usa, bangladesh, offshore, hire, vs, best, examples, template, checklist, timeline, process, outsourcing, consultant

### Prefix modifiers

how to, best, hire, what is, how much does, affordable, cheap, top

### Alphabet soup seeds (a to z)

software development company, custom software development, mobile app development, ecommerce website development, saas development, ai automation, app development cost, software development cost, hire developers, outsource software development, web development company, ui ux design, devops services, website maintenance, mvp development, ai chatbot development

### Question words

what, how, why, can, should, is, does, which, when, who

### Question topics

custom software development, software development company, mobile app development, app development, ecommerce website, saas, ui ux design, ai automation, devops, website maintenance, mvp, outsourcing software development, offshore development, hiring developers, software development cost, app cost, shopify, ai chatbot, next js, react native, flutter

### Industry / vertical seeds

ecommerce app development, fashion ecommerce website, fashion app development, clothing ecommerce website development, jewelry ecommerce website, retail software development, agriculture software development, agritech app development, food export website, food delivery app development, grocery app development, restaurant app development, real estate software development, real estate app development, real estate website development, property management software development, fintech software development, fintech app development, investment platform development, marketplace development, marketplace app development, multi vendor marketplace development, software for agencies, white label development agency, logistics software development, delivery app development, courier management software, fleet management software development, healthcare software development, healthcare app development, telemedicine app development, education software development, edtech app development, lms development, learning management system development, booking app development, crm development, erp development, custom crm development, inventory management software development, pos software development, membership website development, club management software, b2b ecommerce development, subscription ecommerce development, print on demand website

### Technology seeds

next.js development company, nextjs development services, next js agency, react development services, react development company, react js development company, node.js development company, node js development services, typescript development, shopify development agency, shopify plus agency, shopify expert, woocommerce development agency, woocommerce developer, wordpress development company, flutter development company, react native development company, flutter vs react native, ai chatbot development company, chatgpt integration services, llm development company, rag development, custom gpt development, openai api integration, ai agent development company, n8n agency, n8n expert, zapier agency, zapier expert, make.com automation agency, aws devops services, vercel hosting, vercel vs netlify, aws consulting partner, headless cms development, sanity cms development, strapi development, supabase development, firebase app development, postgresql consulting, stripe integration services, api development services, laravel vs next.js, next js vs wordpress, hostinger vps

### Bangladesh seeds

ecommerce website development in bangladesh, ecommerce website bangladesh, website development company in dhaka, website development company in bangladesh, app development company in bangladesh, software company in bangladesh, software company in dhaka, it company in bangladesh, web design company in bangladesh, web development bangladesh, mobile app development bangladesh, website making cost in bangladesh, ecommerce website cost in bangladesh, website price in bangladesh, app development cost in bangladesh, best software company in bangladesh, top software companies in bangladesh, software development outsourcing bangladesh, bangladesh it outsourcing, hire developers in bangladesh, offshore development center bangladesh, shopify developer bangladesh, wordpress developer bangladesh, digital agency bangladesh, ui ux agency bangladesh, ai company in bangladesh, website banano, ecommerce website banano, app banano, website toiri, domain hosting bangladesh, hosting bangladesh, website development mohammadpur, f commerce website, facebook shop website bangladesh, bkash payment gateway integration, sslcommerz integration, pathao courier api, steadfast courier api, ecommerce business in bangladesh, online business bangladesh website, software company chittagong

### Florida / Tampa Bay seeds

software development company tampa, software development tampa, web development tampa, app developers tampa, app development company tampa, website design tampa, web design st petersburg fl, software company st petersburg fl, app developers st petersburg fl, software development florida, app development company florida, web development company florida, software development company orlando, software development company miami, app developers miami, ecommerce website design tampa, it services tampa, ai automation agency tampa, ai consulting tampa, shopify developer tampa, clearwater web design, web design clearwater fl, software development jacksonville, custom software development tampa, mobile app development florida, digital agency st petersburg

### Comparison seeds

freelancer vs agency, in house vs outsourcing software development, custom software vs off the shelf, shopify vs woocommerce, shopify vs custom website, native vs cross platform app, flutter vs react native, saas vs custom software, build vs buy software, fixed price vs time and materials, upwork vs agency, onshore vs offshore development, nearshore vs offshore, next.js vs react, wordpress vs custom website, pwa vs native app, no code vs custom development, bubble vs custom development, webflow vs next.js, aws vs vercel, n8n vs zapier, make vs zapier, toptal vs, clutch software development, bangladesh vs india outsourcing, bangladesh vs pakistan developers

### Hiring / outsourcing seeds

hire software developers, hire developers, hire app developers, hire web developers, hire react developers, hire next js developers, hire shopify developer, hire flutter developers, hire dedicated developers, dedicated development team, outsource software development, offshore software development, software outsourcing, staff augmentation, it outsourcing, outsource app development, outsource web development, remote development team, hire ai developers, hire full stack developer, offshore development company, nearshore software development, white label web development, white label app development

### Cost / pricing seeds

app development cost, software development cost, custom software development cost, website development cost, ecommerce website cost, how much does an app cost, how much does it cost to build an app, how much does a website cost, mvp development cost, saas development cost, ai chatbot cost, shopify website cost, website maintenance cost, software developer hourly rate, offshore developer rates, ui ux design cost, app maintenance cost, cost to build a marketplace, cost to build an app like, devops cost, software development pricing models, how much to charge for, app development cost calculator, website cost calculator

### How-to / process seeds

how to build an app, how to build a saas, how to build an mvp, how to choose a software development company, how to hire developers, how to outsource app development, how to build an ecommerce website, how to start an ecommerce business, how to automate business processes, how to build an ai chatbot, how to write a software requirements, how to create an app, how to make a website for business, how to migrate to shopify, how to reduce aws costs, how to scale a saas, how to validate a startup idea, how to find a technical cofounder, how to build a marketplace, how to integrate ai into business, software development process, software development life cycle, mvp, product discovery, project brief template, software requirements specification template, app idea, software development contract, request for proposal software development

## Reproducing

The scripts (seeds, fetch with cache, filter / tag, select) were run from the session scratchpad and are not committed. Re-running is straightforward: loop the seed x modifier queries through the suggest endpoint above, then apply the filters described in steps 4 to 7.