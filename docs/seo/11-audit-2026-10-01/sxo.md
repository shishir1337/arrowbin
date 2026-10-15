# SXO audit: arrowbin.com (search experience vs what Google rewards)

**Date:** 1 October 2026 (site live since 29 September 2026). **Scope:** `/`, `/services/custom-software-development`, `/services/ecommerce-development`, `/services/mobile-app-development`, `/services/ai-automation`, `/blog/how-much-does-custom-software-development-cost`, plus `/contact`, `/work` and `/about` as conversion and proof context.

**Method.** Live HTML fetched with curl on 2026-10-01 (all pages are server-rendered Next.js, so raw HTML equals what users see apart from animation). Parsed for title, meta, headings, word count, JSON-LD types, forms and CTAs. SERPs re-checked today with a US web search API for all six primary keywords and compared against `03-serp/serp-summary.csv` and `03-serp/serp-analysis.md` (29 Sep). Target keywords from `05-keyword-map/keyword-map.md`.

**Score labels.** The **SXO Gap Score** (0 to 100, 7 dimensions) is separate from any SEO health score in `01-audit`. Persona scores are 0 to 100 (Relevance, Clarity, Trust, Action, 25 each).

---

## 1. Headline findings

1. **No page has a page-type mismatch that blocks ranking; the gap is proof and decision content, not format.** All five money pages are the right type (agency service page or homepage) for SERPs where agency service pages are 55 to 70 percent of page one. The cost guide is the right type (agency cost guide, 9 of 9). The one exception is AI automation, where the SERP has no dominant type (MEDIUM).
2. **Trust is the weakest persona dimension on every page (average 12.4 of 25).** Mobile and AI pages show e-commerce websites as their "Selected work", homepage testimonials have no company names, and there is no third-party review anywhere on the site. This is the single biggest conversion risk for the two Western personas.
3. **The homepage still carries the custom-software title** ("Custom Software Development Company | Arrowbin", identical to `/services/custom-software-development`) and its screen-reader H1 says "a custom software development company". Audit item H-2 is not fixed on the live site.
4. **Prices contradict each other across pages**, and `/pricing` returns 404. A founder who reads the mobile page ($12k to $40k MVP) and then the cost guide ($50k to $500k+ for mobile apps) will distrust both.
5. **The Bangladesh e-commerce owner is the best-served persona on the e-commerce page (76) but has no local-language or local-channel way to act**: no BDT prices, no WhatsApp, no Bangla copy, budget chips start at "Under $5k".

---

## 2. SERP consensus and page-type mismatch

Page-type taxonomy: agency service page, agency homepage, directory, listicle ("Top N"), explainer/guide, cost guide, UGC/spam.

| Page | Primary keyword | SERP today (top 9 to 10) | Dominant type (confidence) | Arrowbin page type | Mismatch |
|---|---|---|---|---|---|
| `/` | software development company | Microsoft definition; dev.co and ScienceSoft homepages; Forte and Techreviewer listicles; Clutch x2; Door3 city page; Miles IT service page | Mixed: agency homepage/service 45%, directory/listicle 45%, definition 10% | Agency homepage | **MEDIUM**: type fits, but the page is optimised for the wrong keyword (title and hidden H1 target "custom software development company") |
| `/services/custom-software-development` | custom software development company | Avenga, Luxoft, Chetu, Softjourn, Devox (city), Devzish service pages; Fingent and Miles IT listicles; one classifieds ad | Agency service page (about 65%) | Agency service page | **ALIGNED** (depth and proof gap: winners run 5,000 to 14,000 words with headcount, badges and case studies; Arrowbin has 1,863 words) |
| `/services/ecommerce-development` | ecommerce development company | Brihaspati, ScienceSoft, Itransition, ecomdevelopment.us, Netlynx service pages; ClickPost and Anchor Group listicles; Clutch, RightFirms | Agency service page (about 55%) | Agency service page | **ALIGNED** (proof is strong but under-surfaced; title says "Services" not "Company") |
| `/services/mobile-app-development` | mobile app development company | ScienceSoft, Intellectsoft, Simpalm, Dogtown, Zazz, Appinventiv, Esferasoft; Clutch, GoodFirms; TechAhead listicle | Agency service page (about 70%) | Agency service page | **HIGH (effective)**: format aligns, but every ranking page shows shipped apps; Arrowbin's page shows three websites under "Mobile-first products we've built" |
| `/services/ai-automation` | ai automation agency | DesignRush and Techreviewer directories; Latenode and AY Automate listicles "with pricing"; theaiautomationagency.ai homepage; theautomators.ai city pages x2; Ostracon and Jadasquad explainers | None above 45%: listicle/directory 45%, agency page 33%, explainer 22% | Agency service page | **MEDIUM**: page type is valid but the SERP rewards "what an agency does + what it costs + comparison". Title lacks "agency". Note: the Gumroad "start an agency" courses seen on 29 Sep are gone today, so buyer intent is stronger than `03-serp` suggested |
| `/blog/how-much-does-custom-software-development-cost` | how much does custom software development cost | Velvetech, Saritasa, Softsuave, OpenArc, GainHQ, Cozcore, Kimei, Vrinsofts cost guides; one 2024 Substack post | Agency cost guide (100%) | Agency cost guide | **ALIGNED** (new entrants since 29 Sep: Velvetech, Softsuave, GainHQ, Cozcore; Cleveroad no longer in top 9) |

---

## 3. User stories (from SERP signals)

Each story cites the signal that produced it.

| # | Stage | Story | Signal |
|---|---|---|---|
| U1 | Awareness | As a founder who has never hired a dev shop, I want to know what a software development company does and costs, so I can decide whether to hire one or a freelancer. | Microsoft and IBM definition pages rank for "software development company"; cost PAA "How much does it cost to hire one?" (`03-serp` #3) |
| U2 | Consideration | As a buyer comparing custom-software vendors, I want a shortlist with rates, team size and founded year side by side, so I can filter before I talk to anyone. | Fingent and Miles IT "Top N 2026" listicles and Clutch at positions 4 to 6; listicle comparison tables (`03-serp` #1, #4) |
| U3 | Consideration | As an online-store owner, I want to see live stores a vendor built in my category and know which platform (Shopify, headless, custom) fits my budget, so I do not overpay or replatform twice. | E-commerce SERP winners lead with portfolios and platform lists (Xumulus, Dinarys "Shopify, BigCommerce, Adobe Commerce"); Clutch e-commerce category at #6 |
| U4 | Decision | As a seed-funded founder, I want a fixed MVP price band and a week-by-week timeline, so I can match the build to my runway before a call. | Cost guides' "Quick Answer" tables (Saritasa, Velvetech); MVP service pages promising "investor-ready MVPs in 3 to 4 weeks" (`03-serp` #9) |
| U5 | Decision | As an SMB operations lead, I want to see what an AI automation agency charges and a comparison of agencies, so I can judge whether a $10k to $15k first automation is fair. | "Best AI Automation Agencies 2026: 12 Compared, With Pricing" (AY Automate) and "17 Top ... Pricing Guide" (Latenode) now rank on page one |
| U6 | Decision | As a buyer wary of offshore risk, I want independent reviews and a named contract entity, so I know I can recover if the project fails. | Clutch, GoodFirms, DesignRush, Techreviewer appear on 5 of 6 SERPs checked today; offshore winners stress "security/IP assurances" (`03-serp` #5) |

---

## 4. SXO Gap Scores (per page)

Dimensions: Page Type (15), Content Depth (15), UX Signals (15), Schema (15), Media (15), Authority (15), Freshness (10).

| Page | Type | Depth | UX | Schema | Media | Authority | Fresh | **SXO Gap Score** |
|---|---|---|---|---|---|---|---|---|
| `/` | 11 | 9 | 11 | 12 | 10 | 5 | 7 | **65** |
| `/services/custom-software-development` | 13 | 10 | 13 | 13 | 10 | 5 | 7 | **71** |
| `/services/ecommerce-development` | 13 | 10 | 13 | 13 | 11 | 7 | 7 | **74** |
| `/services/mobile-app-development` | 10 | 9 | 13 | 13 | 11 | 3 | 7 | **66** |
| `/services/ai-automation` | 10 | 10 | 13 | 13 | 11 | 3 | 7 | **67** |
| `/blog/how-much-does-custom-software-development-cost` | 14 | 11 | 11 | 14 | 12 | 8 | 6 | **76** |

**Evidence behind the scores**
- **Type:** homepage loses 4 for keyword targeting (duplicate title, sr-only H1 "Arrowbin, a custom software development company"; visible H1 is "Software That Moves"). Mobile and AI lose 5 for proof that does not match the service.
- **Depth:** service pages are 1,364 to 1,863 words (measured, visible text). Winners: ScienceSoft 12,000 to 14,000; mid-size agencies 3,000 to 6,000. The cost guide is 3,088 words vs Cleveroad about 5,500 and Saritasa about 2,200.
- **UX:** every service page has a 3-field hero form ("Get my free quote", name, email, project details) plus a Cal.com link; this is better than most competitors, which gate behind long forms. The homepage has no form, and its hero H1 is an animated abstract phrase. The cost guide's only CTA is at the very end (no mid-article CTA, no calculator).
- **Schema:** Organization, ProfessionalService x2, BreadcrumbList, Service with OfferCatalog and Audience, FAQPage on all six; BlogPosting with Person author on the guide. No `Review` markup (correct, since there are no third-party reviews to mark up).
- **Media:** interactive demos (order race, checkout funnel, app simulator, inbox agent, ROI calculator) are strong. No screenshots of the actual client work on service pages beyond link cards; no video.
- **Authority:** no Clutch, GoodFirms, DesignRush or Google reviews linked; testimonials on `/` name "Sarah Mitchell, Product Lead, SaaS Startup" and "David Chen, Founder, E-commerce Brand" with no company, photo or link. Only founder is named; "senior engineers" are not. Hostinger partner badge is the only third-party signal. E-commerce scores higher because 6 live BD stores are linked.
- **Freshness:** site is new; guide shows "Updated June 20, 2026" while the top results carry "2026" and several were updated in the last quarter.

---

## 5. Persona scores

Personas:
- **P1, US seed-stage founder**: $500k to $3M raised, needs an MVP or app in one quarter, cares about runway, speed, IP, US contract, time-zone overlap, proof of shipped products.
- **P2, US/UK SMB owner**: needs an online store or an internal ops tool, cares about total cost, ROI, simple process, reviews, support after launch, contract jurisdiction (and GBP pricing for UK).
- **P3, Bangladesh e-commerce brand owner**: sells via Facebook and COD, needs bKash/Nagad/SSLCommerz, Pathao/Steadfast/RedX courier sync, BDT pricing, Bangla communication, WhatsApp contact.

Scores are Relevance / Clarity / Trust / Action (25 each).

| Page | P1 US founder | P2 US/UK SMB | P3 BD e-com owner |
|---|---|---|---|
| `/` | 15/14/10/18 = **57** | 16/15/11/18 = **60** | 18/15/18/13 = **64** |
| `/services/custom-software-development` | 16/19/11/21 = **67** | 21/20/12/21 = **74** | 14/18/16/15 = **63** |
| `/services/ecommerce-development` | 10/18/14/20 = **62** | 21/20/13/19 = **73** | 24/19/19/14 = **76** |
| `/services/mobile-app-development` | 21/20/7/20 = **68** | 15/19/8/20 = **62** | 12/18/12/14 = **56** |
| `/services/ai-automation` | 14/18/8/20 = **60** | 22/21/10/20 = **73** | 12/17/11/14 = **54** |
| `/blog/how-much-...-cost` | 22/22/17/12 = **73** | 19/21/16/12 = **68** | 10/18/13/9 = **50** |
| **Persona average** | **64.5** | **68.3** | **60.5** |

**Weakest cells, in order (fix these first):** cost guide x P3 (50), AI x P3 (54), mobile x P3 (56), homepage x P1 (57), AI x P1 (60), mobile x P2 (62).

### Persona improvement notes (weakest first)

**P3, Bangladesh e-commerce owner (avg 60.5)**
- Relevance drops everywhere except e-commerce because nothing speaks to a BD store: cost guide is USD-only with bands starting at $5,000; AI page has no WhatsApp order-bot, courier-status or COD-confirmation automation examples, although the custom-software page's "WhatsApp order" race proves the team understands the use case.
- Action: no WhatsApp link, no Bangla option, budget chips on `/contact` start at "Under $5k", and "Book a call" goes to an English-only Cal.com page.
- Fixes: (a) add a WhatsApp click-to-chat button (BD number) on `/services/ecommerce-development` and the planned `/ecommerce-website-development-bangladesh`; (b) add BDT starting prices on the e-commerce page, taken from Arrowbin's own recent BD invoices (do not invent); (c) add a "COD confirmation and courier booking bot" workflow card to `/services/ai-automation`; (d) add a short "Bangladesh budgets" paragraph and link from the cost guide to the planned `/blog/app-development-cost-bangladesh`; (e) add a lower budget chip or a BDT toggle on `/contact`.

**P1, US seed founder (avg 64.5)**
- Trust is the blocker (7 to 14): no shipped mobile app, no SaaS case study, unattributed testimonials, no reviews, no named engineers, no visible US contract/IP assignment statement outside the contact FAQ ("Can you sign an NDA").
- Homepage relevance: "startup", "MVP", "founder" do not appear above the fold; the visible H1 is abstract.
- Fixes: (a) replace or attribute testimonials (full name, company, role, LinkedIn or site link; remove any that cannot be attributed); (b) add a "Contract and IP" strip on every service page: "Contract with Arrowbin LLC (US). Full IP assignment on payment. NDA before discovery. Milestone payments."; (c) build `/services/mvp-development` (P2 in keyword map) with a fixed MVP offer and weekly timeline; (d) add a "Who you will work with" block with named leads and photos.

**P2, US/UK SMB owner (avg 68.3)**
- Best served, thanks to the ROI calculator and order-race demo. Loses on trust (8 to 16) and on pricing clarity for e-commerce (no number at all on the page).
- Fixes: (a) e-commerce price bands by platform (Shopify / headless / custom) next to the existing launch-time meters; (b) show a Clutch or Google review widget once 3 or more reviews exist; (c) mention UK clients can be invoiced in GBP if true.

---

## 6. Findings by priority

### P0 (this week)

**F1. Homepage still targets "custom software development company" (cannibalisation, H-2 unfixed).**
Evidence: live `<title>` on `/` and on `/services/custom-software-development` are both "Custom Software Development Company | Arrowbin"; the homepage sr-only H1 is "Arrowbin, a custom software development company: software that moves."
Fix: homepage title "Arrowbin | Software Development Company for Startups and SMBs"; sr-only H1 "Arrowbin, a software development company for startups and growing businesses"; add one visible line under the hero ("Software development company for startups and growing businesses. MVPs, e-commerce, mobile apps and AI automation.") so the keyword is visible, not only screen-reader text.

**F2. Proof on mobile and AI pages contradicts the service.**
Evidence: `/services/mobile-app-development` section "Mobile-first products we've built" shows Silent Lifestyle BD, Maneel Club, YT Shop India (all websites). `/services/ai-automation` section "Products we've built and automated" shows OutNet ("Bounce rate down 22% after redesign"), FlexOver BD and YT Shop India; none is an AI or automation result.
Fix: if Arrowbin has shipped an app or automation (for example for Hatch Apps or Sikkhon), add it, even as an anonymised one-paragraph case ("Retail client, WhatsApp order intake bot, 2024"). If not, relabel honestly ("Mobile-first stores we've built" / "Automation built into these products: order confirmation SMS, courier sync"), and point to the interactive demo as the evidence of capability. Do not show unrelated metrics under an AI heading.

**F3. Price anchors contradict each other; `/pricing` is 404.**
Evidence (live copy): homepage FAQ "Smaller builds typically start around $5,000 to $10,000"; custom-software FAQ "$8,000 for a focused tool to $75,000+"; mobile FAQ "polished MVP ... $12,000 and $40,000"; cost guide "Mobile apps and enterprise systems: $50,000 to $500,000+" and "Mid-size web or mobile app $30,000 to $90,000"; AI FAQ "$10,000 to $15,000"; e-commerce page: no price.
Fix: one source of truth (a `pricing` object in `src/lib`) feeding every FAQ; label market ranges in the guide as "market ranges (sources)" and Arrowbin's own as "What Arrowbin projects typically cost". Split the guide's "Mobile apps and enterprise systems" row so mobile MVPs match the service page. Then ship `/pricing` (P1 in keyword map).

**F4. Unattributed testimonials.**
Evidence: `/` "Sarah Mitchell, Product Lead, SaaS Startup", "David Chen, Founder, E-commerce Brand", "Rafiul Islam, Operations Director, Logistics", initials only, no company or link, 5 stars each.
Fix: attach company and a link or LinkedIn to each, with the client's written permission; remove any that cannot be verified. Unverifiable testimonials cost trust with P1 and P2 and are a risk under the FTC rule on fake reviews (16 CFR Part 465, in force since October 2024). Start collecting Clutch and Google reviews from the 8 portfolio clients now.

### P1 (next 2 to 4 weeks)

**F5. E-commerce page under-sells Arrowbin's strongest proof.**
Evidence: 6 of 8 portfolio projects are e-commerce, but the page shows 3 (Maneel Club, গ তে গয়না, YT Shop India); metrics like "+28% mobile conversion" and "Checkout drop-off cut by ~30%" have no case page behind them; no price; title "E-commerce Development Services | Arrowbin" while primary keyword is "ecommerce development company".
Fix: title "E-commerce Development Company | Arrowbin"; show all 6 stores with screenshots; add one short case block per metric (problem, what we built, result, time frame) until `/work/<slug>` exists; add price bands per platform; add a "Shopify" proof line only if a Shopify store was actually shipped (the page promises custom Shopify themes, and `03-serp` #14 says Shopify buyers look for Shopify Partner status).

**F6. AI page does not answer what the SERP now rewards.**
Evidence: page-one listicles "compared, with pricing"; page title "AI Automation Services | Arrowbin"; no n8n/Zapier/Make mention (0 occurrences); FAQ has a price but no comparison.
Fix: title "AI Automation Agency for Small Businesses | Arrowbin"; add a "What an AI automation agency does (and what we don't do)" section, a price table by automation type (triage, document extraction, chatbot, agent), and an n8n/Zapier/Make section (keyword map long-tail, "n8n automation agency" is Low difficulty). Pitch inclusion to AY Automate, Latenode and Techreviewer lists.

**F7. Missing risk reversal on every page.**
Evidence: pages promise "Fixed estimates. No surprise invoices" and "Surprises $0.00", but nothing says what happens if Arrowbin misses a date or the client wants to leave.
Fix: add one concrete, true guarantee the founder is willing to honour, for example "Discovery fee credited to the build if you go ahead", "Leave after any sprint with all code and docs", "Two weeks of post-launch fixes included". Put it next to the hero form and in the final CTA.

**F8. Cost guide converts poorly for its intent.**
Evidence: only CTA is at the end ("book a free 30-minute call"); no calculator; bands are market-level; "Updated June 20, 2026".
Fix: mid-article CTA after the first table ("Get a fixed estimate for your scope in one business day"); link to the planned `/tools/software-cost-calculator` (show a range with no email gate); add a "What Arrowbin projects actually cost" box with 3 real anonymised projects; add a BD/offshore row with a link to the BD cost post; update the date when content changes.

### P2 (months 2 to 3)

**F9. Homepage hero is abstract for commercial intent.** "Software That Moves" plus a manifesto section rendered word-by-word. P1 and P2 need who-for, what, proof within the first screen. Add a proof bar under the hero (live store logos or "15+ brands shipped for" with 3 recognisable names) and the visible keyword line from F1. Keep the animation (brand rule), but add plain copy.

**F10. Final CTA is identical on every page.** "Let's build something loud" with "Book a call". Make it service-specific ("Get a fixed estimate for your store", "Scope your MVP in 30 minutes") and add the risk-reversal line from F7.

**F11. "Book a call" leaves the site.** Cal.com opens off-domain with no context on who takes the call. Embed Cal.com inline on `/contact`, show the founder photo and "You'll talk to Md. Shishir Ahmed", and show available US and UK time slots.

**F12. Depth vs winners.** Do not chase 12,000 words. Add the three sections that every top-5 service page has and Arrowbin lacks: engagement and payment terms, team (named), and one detailed case study. This adds about 800 to 1,200 words per page of decision content rather than filler.

---

## 7. Conversion friction summary

| Path | What works | Friction | Fix |
|---|---|---|---|
| Service-page hero form | 3 required fields, honeypot, "Reply within one business day" | "Project details" textarea is required; no budget or timeline chips (the `/contact` form has them) | Make details optional when a budget/timeline chip is selected; reuse `/contact` chips |
| `/contact` brief | Service, budget and timeline chips; live preview; "What happens next" timeline; NDA FAQ | Lowest budget "Under $5k" (no BDT); no WhatsApp; no phone-hours info | Add BDT toggle and WhatsApp; show "US calls 9am to 5pm ET" if true |
| Book a call | Visible in header and every footer CTA | Off-site Cal.com, no host named | Inline embed, founder photo, what the call covers |
| Homepage | Two hero CTAs, FAQ with price | No form, no proof above fold | Proof bar, hero form or anchor to a short form |
| Cost guide | Answer-first, tables, founder byline, FAQ | One CTA at the end | Mid-article CTA and calculator link |

## 8. Missing decision content (by page)

| Decision content | `/` | Custom | E-com | Mobile | AI | Cost guide |
|---|---|---|---|---|---|---|
| Pricing | Range in FAQ | Range in FAQ | **Missing** | Range in FAQ | Range in FAQ + ROI calc | Market ranges only |
| Timeline | 6 to 12 weeks | Phased weeks | Per platform | 10 to 16 weeks | 2 to 3 + 3 to 6 weeks | Per tier |
| Relevant proof | BD e-com only | E-com/marketplace only | Yes, partial | **None relevant** | **None relevant** | $60k example (representative, not real) |
| Process | Yes | Yes | Yes | Yes | Yes | n/a |
| Risk reversal | **Missing** | **Missing** | **Missing** | **Missing** | **Missing** | **Missing** |
| Contract / IP / NDA | Code ownership | Code ownership | Missing | Store accounts owned by client | Data safety | Missing |
| Third-party reviews | **Missing** | **Missing** | **Missing** | **Missing** | **Missing** | **Missing** |

---

## 9. Cross-skill follow-ups

- E-E-A-T and testimonial verification: run `/seo content` on `/` and `/about`.
- Schema is solid; once real reviews exist on Clutch, link them via `sameAs` (do not self-mark `AggregateRating` from on-site testimonials). `/seo schema` only if pricing `Offer` values are added.
- Local intent is absent from these six SERPs; the Tampa and BD local plays stay in `08-local`.
- Thin-proof pages (mobile, AI): `/seo page` after F2 is shipped.

## 10. Limitations

- SERPs came from a US web search API (about 9 to 10 results, near-Google order), not a live Google page. PAA boxes, AI Overviews, ads and local packs were not observed directly. Positions are approximate (plus or minus 2).
- No first-party data: Search Console and GA4 for arrowbin.com are not connected, so no impressions, CTR, form-conversion or Cal.com booking data informed the scores.
- Pages were fetched as raw HTML (curl), not rendered in a browser, per instruction not to run the plugin runtime. The site is server-rendered, so text and forms are complete, but above-the-fold layout, animation timing and mobile rendering were not visually checked.
- Persona scores are analyst judgements from page content against SERP-derived needs, not user testing.
- Testimonial authenticity, the Shopify portfolio and any mobile/AI client work could not be verified from outside; F2, F4 and F5 depend on what the founder can confirm.
- Word counts are visible text from HTML and include repeated marquee and animation fragments, so true prose depth is somewhat lower than stated.

---

## 11. Structured findings (for audit-data.json, category "Search Experience")

```json
{
  "category": "Search Experience",
  "date": "2026-10-01",
  "sxo_gap_scores": {"/": 65, "/services/custom-software-development": 71, "/services/ecommerce-development": 74, "/services/mobile-app-development": 66, "/services/ai-automation": 67, "/blog/how-much-does-custom-software-development-cost": 76},
  "persona_averages": {"us_seed_founder": 64.5, "us_uk_smb_owner": 68.3, "bd_ecommerce_owner": 60.5},
  "mismatch": {"/": "MEDIUM", "/services/custom-software-development": "ALIGNED", "/services/ecommerce-development": "ALIGNED", "/services/mobile-app-development": "HIGH (proof)", "/services/ai-automation": "MEDIUM", "/blog/how-much-does-custom-software-development-cost": "ALIGNED"},
  "findings": [
    {"id": "SXO-F1", "priority": "P0", "title": "Homepage title and H1 target custom-software keyword (H-2 unfixed)", "pages": ["/"]},
    {"id": "SXO-F2", "priority": "P0", "title": "Mobile and AI pages show unrelated website projects as proof", "pages": ["/services/mobile-app-development", "/services/ai-automation"]},
    {"id": "SXO-F3", "priority": "P0", "title": "Contradictory price ranges across pages; /pricing 404", "pages": ["/", "/services/*", "/blog/how-much-does-custom-software-development-cost"]},
    {"id": "SXO-F4", "priority": "P0", "title": "Unattributed testimonials; no third-party reviews", "pages": ["/"]},
    {"id": "SXO-F5", "priority": "P1", "title": "E-commerce proof under-surfaced; no pricing; title lacks 'company'", "pages": ["/services/ecommerce-development"]},
    {"id": "SXO-F6", "priority": "P1", "title": "AI page misses agency framing, pricing table and n8n/Zapier section", "pages": ["/services/ai-automation"]},
    {"id": "SXO-F7", "priority": "P1", "title": "No risk reversal on any page", "pages": ["all"]},
    {"id": "SXO-F8", "priority": "P1", "title": "Cost guide has one end-of-page CTA, no calculator, no BD row", "pages": ["/blog/how-much-does-custom-software-development-cost"]},
    {"id": "SXO-F9", "priority": "P2", "title": "Abstract homepage hero, no proof above fold", "pages": ["/"]},
    {"id": "SXO-F10", "priority": "P2", "title": "Generic final CTA on every page", "pages": ["all"]},
    {"id": "SXO-F11", "priority": "P2", "title": "Off-site booking with no host context", "pages": ["all"]},
    {"id": "SXO-F12", "priority": "P2", "title": "Add terms, team and one deep case study per service page", "pages": ["/services/*"]}
  ]
}
```

Generate a PDF report? Use `/seo google report`.

**Sources (SERPs checked 2026-10-01):** [avenga.com](https://www.avenga.com/custom-software-development/), [luxoft.com](https://www.luxoft.com/services/custom-software-development), [fingent.com](https://www.fingent.com/blog/top-custom-software-development-companies-in-the-usa/), [scnsoft.com e-commerce](https://www.scnsoft.com/ecommerce/services/development), [clutch.co e-commerce](https://clutch.co/us/developers/ecommerce), [clutch.co mobile](https://clutch.co/directory/mobile-application-developers), [intellectsoft.net](https://www.intellectsoft.net/services/mobile-app-development-services), [designrush.com AI automation](https://www.designrush.com/agency/ai-companies/ai-automation-agency), [ayautomate.com](https://www.ayautomate.com/blog/best-ai-automation-agencies), [latenode.com](https://latenode.com/blog/industry-use-cases-solutions/enterprise-automation/17-top-ai-automation-agencies-in-2025-complete-service-comparison-pricing-guide), [velvetech.com](https://velvetech.com/blog/custom-software-development-cost/), [saritasa.com](https://www.saritasa.com/insights/how-much-does-custom-software-development-cost), [microsoft.com](https://www.microsoft.com/en-us/software-development-companies/resources/articles/what-is), [dev.co](https://dev.co/), [clutch.co developers](https://clutch.co/developers).
