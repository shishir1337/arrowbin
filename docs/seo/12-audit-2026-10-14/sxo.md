# SXO audit: arrowbin.com, 14 October 2026

Scope: `/`, `/services/custom-software-development`, `/services/ecommerce-development`, `/services/mobile-app-development`, `/services/ai-automation`, `/services/saas-product-engineering`, `/blog/how-much-does-custom-software-development-cost`.
Baseline: `../11-audit-2026-10-01/sxo.md`. Status key: OPEN, FIXED-LOCAL (fixed at http://localhost:3117, not deployed), FIXED-LIVE, NEW. All scores are "SXO Gap" style analyst judgements, separate from the SEO Health Score.

## Method and limits
- Fetched live (https://arrowbin.com) and local (http://localhost:3117) HTML with Python stdlib; extracted title, H1, H2s, visible words, form count, price strings. Server-rendered, so raw HTML equals content. Plugin renderer not run (context rules).
- SERPs re-checked 14 Oct with WebSearch for 7 keywords. **The search tool returned noisy, partly spammy results today (Patreon, Yolasite, forum pages, scraped `?p=` URLs) and no ordered top 10, so it cannot confirm positions or SERP features.** What it did confirm: vendor pages and "top N" lists dominate every head term; the cost query returns agency cost guides only (Intetics, SmartTek, Guru Technolabs, Planeks, Mobibean, Kindgeek, JBS); "ai automation agency" returns agency pages, "how to start" guides (Dupple, Innovation Tube) and Beam; "saas development company" returns agency pages and listicles (Mind Studios, Solveit, Purrweb, Limeup, Agile Infoways, Debut Infotech). Page-type verdicts below therefore rest mainly on the 1 Oct and 29 Sep SERP data plus today's confirmation of type, not on fresh rank order.
- No GSC/GA4 data, no visual rendering check, personas are judgement not user testing.

## 1. Headline

1. **Page types are right everywhere; nothing is blocked by a format mismatch.** The only mismatch remaining is the SaaS page, which is the right type (agency service page) but unproven (see S1).
2. **The best-converting pages are held back by proof that does not match the service.** Mobile, AI and SaaS pages still show e-commerce/marketplace sites as "work". Local build does not change this.
3. **Pricing is still inconsistent and the highest-intent page (e-commerce) shows no number at all.** `/pricing` and risk reversal are still absent.
4. The local build fixes the homepage keyword targeting and the title/keyword fit of all five service pages. Everything about decision content (price, proof, guarantees, WhatsApp/BD paths) is OPEN.

## 2. Page-type match (live vs local)

| Page | Primary keyword | SERP type today | Arrowbin type | Mismatch | Live title -> local title |
|---|---|---|---|---|---|
| `/` | software development company | Mixed: agency homepages, directories/listicles, definitions | Agency homepage | MEDIUM live; **ALIGNED-ish local** | "Custom Software Development Company \| Arrowbin" (duplicate of service page) -> "Software Development Company for Startups & SMBs \| Arrowbin". Local H1 (sr-only) now "a software development company for startups and growing businesses". FIXED-LOCAL |
| `/services/custom-software-development` | custom software development company | Agency service pages + listicles (Codewave, GeeksforGeeks-style lists today) | Agency service page | ALIGNED | duplicate title -> "Custom Software Development Company & Services". FIXED-LOCAL |
| `/services/ecommerce-development` | ecommerce development company | Agency pages + "best companies" lists (Relevant, Amasty, Seahawk, YourStory) | Agency service page | ALIGNED (HIGH on proof/price) | "E-commerce Development Services" -> "E-commerce Website Development Services". Still no word "company". Partially fixed |
| `/services/mobile-app-development` | mobile app development company | Agency pages, "top N" lists, directories | Agency service page | HIGH (proof) | "Mobile App Development Company" -> "...Company: iOS & Android". Title FIXED-LOCAL, proof OPEN |
| `/services/ai-automation` | ai automation agency | Agency pages, "how to start" guides, directory/listicles, no dominant type | Agency service page | MEDIUM | "AI Automation Services" -> "AI Automation Services & AI Agent Development". Word "agency" still absent. Partial |
| `/services/saas-product-engineering` | saas development company | Agency pages + listicles, 2026 cost ranges in snippets (MVP $30-50k, 3-6 months) | Agency service page | MEDIUM (proof) | "SaaS Development & Product Engineering" -> "SaaS Development Company: From MVP to Scale". FIXED-LOCAL |
| `/blog/how-much-...-cost` | how much does custom software development cost | Agency cost guides (100%) | Agency cost guide | ALIGNED | unchanged. New entrants: Intetics, SmartTek, Mobibean ("2026" in title). Still "Updated June 20, 2026" |

Page weights measured (visible words, live/local): `/` 1501/1517; custom 2070/2075; e-commerce 1712/1721; mobile 1552/1561; AI 1644/1654; SaaS 1771/1776; guide 3329/3329. Content depth is unchanged by the local build.

## 3. User stories (signal cited)

| # | Stage | Story | Signal |
|---|---|---|---|
| U1 | Awareness | As a founder new to agencies, I want to know what a software development company does and how it differs from a freelancer. | Definition pages and "what is" openings in vendor results for "software development company" |
| U2 | Consideration | As a buyer shortlisting, I want comparison and proof (reviews, named clients) before I contact anyone. | "Top N" lists on custom software, e-commerce and SaaS SERPs; guides tell readers to check Clutch and portfolios |
| U3 | Decision | As a seed founder, I want an MVP price band plus timeline that fits my runway. | SaaS SERP snippets quote "MVP $30,000-$50,000, three to six months"; cost guides lead with tier tables |
| U4 | Decision | As a store owner, I want to know Shopify vs headless vs custom costs and see live stores like mine. | Seahawk, Relevant, Amasty stress platform fit and portfolio checks |
| U5 | Decision | As an SMB ops lead, I want agency pricing and a sense of the first automation worth buying. | "ai automation agency" results describe project/retainer models; price comparisons recurring |
| U6 | Decision | As an offshore-wary buyer, I want a named contract entity, IP terms and independent reviews. | Guides across all SERPs tell buyers to verify on Clutch/G2; self-reported claims flagged as unverified |
| U7 | Decision | As a Dhaka brand owner, I want bKash/COD/courier support, BDT pricing and a WhatsApp way to talk. | Not from the US SERPs: derived from the keyword map's BD pages and the e-commerce page's own payment section |

## 4. Persona scores (Relevance / Clarity / Trust / Action, 25 each)

Personas: P1 US seed-stage founder; P2 US/UK SMB owner (store or ops tool); P3 Bangladesh e-commerce brand owner. "Live" and "Local" differ only where the local build changes titles/H1/proof wording; Trust and Action are unchanged because testimonials, proof and forms are identical (confirmed by diffing section headings and body copy).

| Page | P1 live | P1 local | P2 live | P2 local | P3 live | P3 local |
|---|---|---|---|---|---|---|
| `/` | 15/14/10/18 = 57 | 17/15/10/18 = **60** | 16/15/11/18 = 60 | 17/15/11/18 = **61** | 18/15/18/13 = 64 | 18/15/18/13 = **64** |
| `/services/custom-software-development` | 67 | **68** | 74 | **74** | 63 | **63** |
| `/services/ecommerce-development` | 62 | **62** | 73 | **74** | 76 | **76** |
| `/services/mobile-app-development` | 68 | **68** | 62 | **62** | 56 | **56** |
| `/services/ai-automation` | 60 | **60** | 73 | **73** | 54 | **54** |
| `/services/saas-product-engineering` | 16/19/9/20 = 64 | **64** | 13/18/9/19 = 59 | **59** | 8/16/9/12 = 45 | **45** |
| `/blog/how-much-...-cost` | 73 | **73** | 68 | **68** | 50 | **50** |
| **Average** | 64.1 | **64.9** | 67.0 | **67.3** | 58.3 | **58.3** |

Rationale for the new SaaS row: P1 relevance high (MVP-scope tool, Stripe, multi-tenant), Trust 9 because the "taken to market" proof is YT Shop India, FlexOver BD and North Bengal Agro Farms (a marketplace, a delivery site and an ordering site, none a subscription SaaS); P3 has almost no SaaS need and the page offers no BD angle.

**Weakest cells (fix first):** SaaS x P3 (45), cost guide x P3 (50), AI x P3 (54), mobile x P3 (56), SaaS x P2 (59), AI x P1 (60), homepage x P1 (60).

Concrete improvements per persona:
- **P1:** one named, attributed case for each of mobile/AI/SaaS (or honest relabel); a "Contract and IP" line near the form (US contract entity only if the Florida LLC status is confirmed active; see CONTEXT); a founder-faced call block; fixed MVP offer with weekly timeline.
- **P2:** e-commerce price bands per platform; a visible post-launch support term; GBP invoicing line for UK only if true.
- **P3:** WhatsApp click-to-chat, BDT starting prices from real Arrowbin invoices, a lower budget chip on `/contact`, a COD-confirmation/courier bot card on the AI page, and a BD row/link in the cost guide.

## 5. Findings (prioritised)

Each: priority, status, evidence, fix, effort, owner, how we'd know it failed.

### S1. Proof does not match the service on mobile, AI and SaaS pages
- **High, OPEN (live and local), Effort M, Owner founder then dev.**
- Evidence (local and live identical): `/services/mobile-app-development` "Mobile-first products we've built" = Silent Lifestyle BD, Maneel Club, YT Shop India; `/services/ai-automation` "Products we've built and automated" = OutNet, FlexOver BD, YT Shop India; `/services/saas-product-engineering` "Products we've taken to market" = YT Shop India, FlexOver BD, North Bengal Agro Farms. The 7 Oct portfolio result lines are now factual (FIXED-LOCAL), but they still describe websites, not apps, automations or subscription products.
- Fix: founder to name any real app, automation or SaaS (anonymised is fine: client type, what shipped, year) and add to `src/lib/portfolio.ts`/service data. If none, relabel the headings honestly ("Stores and platforms we've built", "Automation inside these products") and lead with the interactive demos as capability proof. Do not use a heading that promises app/AI/SaaS proof.
- Fails if: P1 Trust cells stay at 7-9 and the hero form submissions on these three pages stay near zero while the e-commerce page converts.

### S2. Price anchors still conflict; e-commerce and SaaS pages have none; `/pricing` missing
- **High, OPEN, Effort M, Owner founder (numbers) + dev.**
- Evidence: homepage FAQ "Smaller builds typically start around $5,000-$10,000"; custom page "$8,000 ... $75,000+"; mobile "$12,000 ... $40,000"; AI "$10,000 ... $15,000"; guide "$5,000 to $250,000+", "$30,000 to $90,000", "$60,000 SaaS MVP"; SaaS page shows only demo figures ($490/$98 plan prices in the calculator), no build price; e-commerce page has no `$` at all. Live SERP snippet for SaaS quotes MVP $30,000-$50,000 over three to six months, so buyers arrive with an anchor.
- Fix: single `pricing` object in `src/lib` feeding all FAQs and the FAQ JSON-LD; add price bands (Shopify / headless / custom) to e-commerce; add an MVP band and weeks to SaaS; reconcile mobile $12k-$40k with the guide's mobile row; ship `/pricing`.
- Fails if: sales calls open with "your site said $X".

### S3. No risk reversal on any page
- **High, OPEN, Effort S, Owner founder.**
- Evidence: copy promises "Fixed estimate before any work starts" and "Surprises $0.00" (home) but no term for missed dates, exit or post-launch support (searched all 7 pages: no "guarantee", "credited", "refund policy" outside the AI demo).
- Fix: one honest line beside each hero form and in the closing CTA, e.g. "Leave after any sprint with all code and docs" or "Two weeks of post-launch fixes included". Only what the founder will honour.

### S4. Unattributed testimonials and zero third-party reviews
- **High (trust), OPEN, Owner founder.** Known founder decision to keep; reported once. Homepage still shows "Sarah Mitchell, Product Lead, SaaS Startup" and "David Chen, Founder, E-commerce Brand" with five stars and no company. Start Clutch/Google review collection from real clients so a verified proof exists to swap in.

### S5. Homepage keyword and first-screen clarity
- **Medium, FIXED-LOCAL (title, sr-only H1), residual OPEN.**
- Evidence: local `<title>` "Software Development Company for Startups & SMBs | Arrowbin", H1 text "a software development company for startups and growing businesses: software that moves". Still no form, no proof bar, no mid-page price; first visible H1 is "Software That Moves".
- Fix after deploy: keep animation, add one plain visible sentence under the hero and an anchor to a short form. (Founder rule: no trust-chip strip under heroes, so use a single plain sentence, not chips.) Also check local H1 renders "Software That  Moves" with a double space in extracted text (cosmetic).

### S6. E-commerce page under-sells strongest proof and lacks "company" keyword and price
- **Medium-High, partly fixed.** Title now "E-commerce Website Development Services" (FIXED-LOCAL for "website", but the SERP head term is "ecommerce development company"). Page still shows 3 stores while portfolio has 6+. No price. No WhatsApp link despite bKash/Nagad/SSLCommerz/COD content (strongest P3 relevance is wasted on Action).
- Fix: title "E-commerce Development Company | Arrowbin"; show all live stores; add price bands; add `wa.me` link (count of `wa.me` on all 7 pages = 0).

### S7. AI page misses agency framing and tool comparison
- **Medium, OPEN.** Title still lacks "agency". No n8n/Zapier/Make section, no price table by automation type, no BD workflow (COD confirmation, courier status). Fix: title "AI Automation Agency for Small Businesses | Arrowbin", add the sections; keep the $10k-$15k first-automation anchor but tie it to a table.

### S8. Cost guide: single CTA, stale date, no BD row, no Arrowbin-specific box
- **Medium, OPEN.** Still "Updated June 20, 2026" at 14 Oct; only a final CTA; "A real example: what a $60,000 SaaS MVP looks like" is representative, not a real project. Fix: mid-article CTA after the first table, link to a calculator when it exists, a "what Arrowbin projects cost" box, a short BD/USD vs BDT paragraph, honest "representative example" label, and a real update date when edited.

### S9. Conversion friction
- **Medium, mostly OPEN.** Service pages have a 3-field hero form (name, email, project details) plus Cal.com (6 `cal.com` links per page; 4 on the guide). Homepage and guide have no form (0 `<form>`). Details textarea required; no budget/timeline chips on the service-page form; Cal.com is off-site with no host named; closing CTA identical on every page ("Let's build something loud"). Fix: make details optional if a chip is chosen, inline Cal embed on `/contact` with founder name/photo and time-zone slots, service-specific CTA text. Owner dev.

### S10. SaaS page decision content
- **Medium, NEW.** Calculator shows weeks per feature (good timeline content: "12-14 weeks Solid first version"), but no total price, no SaaS case, no engagement-terms block. Fix with S1/S2.

### S11. Bangladesh path missing
- **Medium, OPEN.** No WhatsApp, no BDT, no Bangla, `/contact` lowest chip "Under $5k". Fix as in persona notes; link to planned `/ecommerce-website-development-bangladesh`.

## 6. Missing decision content (live = local, unless noted)

| Item | `/` | Custom | E-com | Mobile | AI | SaaS | Guide |
|---|---|---|---|---|---|---|---|
| Pricing | FAQ range | FAQ range | **None** | FAQ range | FAQ range | **None** | Market ranges |
| Timeline | Yes | Yes | Per platform | 10-16 wks | Yes | Yes (calculator) | Yes |
| Matching proof | BD stores | partial | Yes (3 of 6+) | **No** | **No** | **No** | Representative |
| Process | Yes | Yes | Yes | Yes | Yes | Yes | n/a |
| Risk reversal | **No** | **No** | **No** | **No** | **No** | **No** | **No** |
| Contract/IP/NDA | Code ownership only | same | **No** | store accounts | data safety | **No** | **No** |
| FAQs | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Reviews | **No** | **No** | **No** | **No** | **No** | **No** | **No** |

## 7. Fixed by the local build (confirm after deploy)
- Homepage title/H1 no longer duplicate `/services/custom-software-development`. **Closes previous SXO-F1.**
- Title changes on all five service pages (keywords "company", "iOS & Android", "AI Agent Development", "From MVP to Scale").
- Hero H1 word spacing in raw HTML (verified: local H1 now `' Custom Software Development'` with spaces, live concatenated `CustomSoftwareDevelopment`).
- Portfolio result lines factual (removes unconfirmed metric claims).
- Not fixed: previous F2, F3, F4, F5 (price/title part partly), F6, F7, F8, F9 (partly), F10, F11, F12.

## 8. Order of work
1. Founder inputs (this week): real mobile/AI/SaaS proof or relabel decision; honoured guarantee line; price table. (S1, S3, S2)
2. Dev (after deploy): pricing object + e-commerce/SaaS price bands, WhatsApp button, titles "company"/"agency", guide mid-CTA/date. (S2, S6, S7, S8)
3. Then `/pricing`, MVP service page, reviews collection, inline Cal embed. (S9, S4)

Cross-skill: `/seo content` for testimonials and E-E-A-T; `/seo schema` once prices exist (Offer); `/seo page` for the three proof-thin service pages after S1.
