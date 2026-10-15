# Maps intelligence: Dhaka (Mohammadpur) and Tampa Bay - 14 October 2026

Tier 0 (free sources only). DataForSEO MCP not available. Builds on ../08-local/local-seo-plan.md (29 Sep) and ../02-competitors/competitor-list.csv. Read-only audit.

## 0. Data limits (read first)
- Live Google map packs, Maps review counts and category labels could NOT be observed. A direct Google local search fetch returned only a Bengali access notice; DuckDuckGo HTML returned a bot challenge. No SERP/Maps API was available.
- Only Maps figure on record: TopOfStack Software, Tajmahal Rd, Dhaka 1207, 4.8 stars / 47 reviews (snippet seen 29 Sep, not re-verified today). All other ratings below are Clutch, not Google.
- Competitor density comes from OpenStreetMap (Overpass). OSM coverage of Bangladeshi businesses is partial and is NOT a proxy for Google Maps; treat counts as a floor.
- Nothing here is a ranking measurement. Geo-grid/SoLV is not computable at Tier 0.

## 1. Arrowbin Maps presence today (NEW baseline)
| Check | Result | Evidence |
|---|---|---|
| OSM / Nominatim "Arrowbin" | No object | Nominatim `q=Arrowbin` returned `[]`; Overpass name regex "arrowbin" returned no elements (2026-10-14) |
| Google Business Profile | None discoverable; no GBP/Maps link on the site | live arrowbin.com and /contact HTML: no google.com/maps, g.page, maps.app.goo.gl or `hasMap` |
| Schema NAP (live) | Dhaka `streetAddress` is only "Mohammadpur"; US node uses 7901 4th St N | JSON-LD in live HTML. Status: OPEN (local build changes the St. Pete node to mailing-only, FIXED-LOCAL; Dhaka street address still incomplete everywhere) |
| sameAs | LinkedIn personal-style path `/in/arrowbinllc`, Facebook, Instagram, X on live | live JSON-LD; local build removes LinkedIn placeholder |
| Bing Places / Apple Business Connect | Not checked via tools (require login); assume absent | per 08-local plan |

Verdict: Arrowbin has zero Maps presence in either market. Priority High, owner founder (needs the real address, hours, signage and a verification method).

## 2. Market 1: Dhaka / Mohammadpur
Target queries: software company in dhaka; software development company dhaka; ecommerce website development dhaka; app development company dhaka.

### Who appears (discoverable)
- Organic pages for these queries are directories and listicles (Clutch Dhaka, GoodFirms, Glassdoor, top10place, Brain Station 23, Bdtask, Dcastalia, Smart Software, DUSRA Soft), per the 29 Sep SERP capture. Google Maps place pages (for example TopOfStack Software) also appear in organic results for "software company in dhaka", which means Maps listings are ranking beyond the pack.
- Likely map-pack candidates (inferred from Clutch strength and Dhaka HQ, NOT observed in a pack): Brain Station 23, Dcastalia, Riseup Labs, ZAAG Systems, Musemind, Vivasoft, Technext, Kaz Software, TopOfStack, Smart Software, DUSRA Soft.

### Ratings and review counts (Clutch, fetched 29 Sep; Google counts unknown unless stated)
| Firm | Rating | Reviews | Source |
|---|---|---|---|
| TopOfStack Software | 4.8 | 47 (Google) | Maps snippet |
| Musemind | 4.9 | 48 | Clutch Dhaka |
| Riseup Labs | 4.9 | 46 | Clutch |
| Itransition (BD list) | 4.9 | 42 | Clutch |
| ZAAG Systems | 4.8 | 39 | Clutch |
| Dcastalia (e-commerce list) | 4.9 | 72 | Clutch |
| Brain Station 23 | 4.9 | 21 | Clutch |
| Augmex | 5.0 | 17 | Clutch |
| Wavespace | 4.9 | 16 | Clutch |
| Vivasoft | 5.0 | 9 | Clutch |
| Kaz Software | 5.0 | 2 | competitor-list.csv |

Benchmarks: Google review target to be credible is roughly 45 to 50 (single data point). On Clutch, 1 to 4 reviews already appear on page one of Dhaka e-commerce.

### Categories used
Not observable without Maps/DataForSEO. Expected from category-list research in 08-local: "Software company" as primary is the dominant pattern for Dhaka agencies; secondary typically "Website designer", "Business software development company"/"Software development company" variants, "E-commerce service", "Mobile app development company" (name to be confirmed in the dashboard). Action later: pull `categories` and `additional_categories` for the top 10 via DataForSEO `business_data_business_listings_search` and copy the modal primary.

### Competitor density near Mohammadpur (OSM)
Centre: Nominatim "Mohammadpur" way, 23.7594, 90.3663 (Lalmatia/Mohammadpur, postcode 1207).
- `office=it` features within 3 km: 38 (query hit the 200-element cap shared with `office=company`/education, so true OSM count is possibly higher). Names include Onnorokom Software, Kurinur Web Technologies, NetLink, Pipilica, Mysoft, Azolution Software, BASIS, Bdjobs.com, Creative IT, JoomShaper, DUSRA Soft, Peddlecloud, ReformedTech, Craft IT, Nobom IT, CodeCrafters International, ThoughtHub, Icicle Corporation, QLigence, OptimaX, Top IT, US Software Limited (Panthapath).
- Only 1 `office=web_design` feature. Treat this as OSM tagging sparsity, not real scarcity.
- Reading: the area is a dense IT cluster (Mohammadpur, Lalmatia, Panthapath, Green Road, Dhanmondi adjacency), so Google's distance factor will favour many nearby firms. Real density on Google is likely multiples of 38.
- A 10 km Overpass count timed out (server error); not retried to avoid load.

### Honest assessment for Arrowbin
Low chance of top 3 map pack for the generic "software company in dhaka" in the first 6 months (new profile, 0 reviews vs ~47). Better odds: long-tail/service queries with fewer rivals ("ecommerce website development dhaka", "shopify developer dhaka", "next.js developer dhaka") and proximity searches from Mohammadpur/Lalmatia/Dhanmondi.

## 3. Market 2: Tampa Bay / St. Petersburg
Queries: software development company tampa; app developers st petersburg fl.

### Who appears
- Organic: Clutch (Tampa, St. Pete, app developers), Built In, UpCity, Expertise.com, Yelp, DesignRush, GoodFirms, TechBehemoths, The Manifest; plus out-of-area agencies with city pages (iQlance, Trango Tech, NIX United, Binary Studio, Ringo Media, 2muchcoffee).
- Real local firms (not observed in pack): Sourcetoad (Tampa, 5.0/9 Clutch), RevStar Consulting (Tampa, 4.8/8), 66Loop (St. Pete, 4.9/6), 2muchcoffee (St. Pete, 5.0/26, same street address 7901 4th St N Ste 300), Saritasa (4.8/106), Miles IT (5.0/15), Phenomenon Studio (5.0/52), SoftDoes (5.0/39), NIX (4.8/33), Gaazzeebo.
- Google review counts and categories for these: NOT observed.
- Competitor density near the St. Pete address: not measured (Overpass skipped; OSM is thin for US agencies and the point is moot because the address is not usable).

### Eligibility
7901 4th St N Ste 300 is a shared virtual office (registered-agent product; 08-local section 0 documents other tenants, and 2muchcoffee uses the same suite). Google: "a virtual office isn't eligible for a Business Profile." Do not create a GBP, Bing Places or Apple Business Connect listing there. Also resolve the Florida LLC status (L24000209589 reported inactive) before any US verification. Status: OPEN, owner founder.

Realistic Tampa Bay route: organic city page + B2B directories (see 08-local section 4 and citations.csv). Map pack is not a target.

## 4. Geo-grid assessment plan (for later, when DataForSEO is available)
Only the Dhaka profile qualifies. Prerequisite: GBP live and verified, with at least a few days of indexing.
1. Grid: 7x7 (49 points), 1 km spacing, centred on the Mohammadpur office pin (~23.7594, 90.3663), covering about 6 km x 6 km (Mohammadpur, Lalmatia, Dhanmondi, Shyamoli, Kalyanpur, Farmgate edge). Optionally a second 5x5 at 2 km spacing to reach Gulshan/Motijheel and see the decay.
2. Keywords (4): software company in dhaka; software development company dhaka; ecommerce website development dhaka; app development company dhaka. Add 2 long-tail: shopify developer dhaka; web design company dhaka.
3. Call: Maps SERP live with `location_coordinate` per point, language `en`, depth 20, device mobile. Cost ~ 49 x 6 = 294 requests per run; run monthly, then quarterly once stable. Confirm price in skills/seo/references/maps-api-endpoints.md before running.
4. Metrics: SoLV (share of grid points with Arrowbin in top 3), average rank, top-20 coverage, and the same for the top 5 competitors for a relative SoLV. Record `categories` of the top 10 per point.
5. Baseline expectation: ~0% SoLV before launch. Success target: SoLV above 10% within 6 months on the e-commerce query, above 25% within 12 months for points within 2 km of the office.
6. Do NOT run a grid for St. Petersburg (no eligible profile); a rank-tracking SERP check on organic only.

## 5. GBP launch checklist: Dhaka office
Preconditions (founder): the Mohammadpur office is real, staffed during stated hours, and clients can visit. If it is a home office with no visiting, a service-area profile with hidden address may be possible; otherwise skip GBP and use directories. Prepare video verification: exterior with street/signage, the entrance, the workspace, staff, and a business document.

| Item | Spec | Owner |
|---|---|---|
| Name | "Arrowbin" exactly (no keywords) | founder |
| Primary category | Software company (confirm exact label in dashboard) | founder |
| Secondary (3 to 5, only what is sold) | Website designer; Business software development company (or nearest label); E-commerce service; Computer consultant; Mobile app development company if offered and available | founder |
| Address | Full street address as on signage, pin on building; update JSON-LD `streetAddress` (currently only "Mohammadpur") to match exactly | founder + dev |
| Phone | +880 1843-596038, same as site | founder |
| Website | https://arrowbin.com/?utm_source=gbp&utm_medium=organic&utm_campaign=dhaka; appointment link cal.com/arrowbin/30min | founder |
| Hours | Real hours; Bangladesh week (Sun to Thu) if true | founder |
| Services | Add all 8 services with 1 to 2 sentence descriptions and links to /services/<slug> | founder + dev |
| Description | up to 750 chars, factual, no URLs or phones | founder |
| Attributes | Languages English and Bengali; onsite services / appointments only if true | founder |
| Photos | Day 1: exterior with signage, entrance, interior, team, founder portrait, logo, cover. Then 8 to 10 portfolio shots. Target 15+ at launch, 2 to 4 new per month. Real only, no stock | founder |
| Posts | Weekly for the first 8 weeks, then every 2 weeks: case study, blog post, offer. No phone numbers in posts | founder |
| Q&A | Google has been scaling back Q&A in some regions. If present, seed 5 to 8 real questions answered from the owner account (pricing ranges, timelines, remote delivery, BDT vs USD, language). If absent, put these on the site FAQ and on the service pages | founder |
| Products/Services menu | Optional "packages" linking to service pages | founder |
| Site link-back | Add the GBP Maps link as `hasMap` and `sameAs` in Organization/ProfessionalService JSON-LD once live; add an embedded map and address on /contact | dev (src/lib/schema.ts) |
| Consistency | NAP identical on Facebook, LinkedIn, GitHub (fix info@ to hello@), Clutch, GoodFirms, Bing Places, Apple Business Connect | founder |

### Review velocity targets (Dhaka GBP)
| Horizon | Google reviews | Rating | Reply rate |
|---|---|---|---|
| Day 30 | 5 | 5.0 | 100% within 3 days |
| Month 3 | 12 | >=4.8 | 100% |
| Month 6 | 20 to 25 | >=4.8 | 100% |
| Month 12 | 45 to 50 (matches the only observed benchmark) | >=4.8 | 100% |
That is about 1 to 2 reviews per month after the initial push. Method: ask existing Bangladeshi clients first (Silent Lifestyle BD, FlexOver BD, North Bengal Agro Farms, Maneel Club, Brandingly, Sikkhon, Dizishore and others listed in the brief) via the GBP short link at project handover, one reminder after 7 days. No incentives, no review gating, no reviews from staff or family accounts. Foreign clients go to Clutch first (target 10 in 6 months).

### Failure signals
- Suspension or video verification failure: usually address/signage mismatch; do not recreate profiles repeatedly.
- No impressions after 30 days: check categories and that the website URL is correct; check for duplicate listings of the same address.
- Reviews filtered: reviews posted in bursts from new accounts get filtered; keep a steady pace.

## 6. Prioritised actions
| # | Priority | Action | Status | Owner | Effort |
|---|---|---|---|---|---|
| 1 | High | Founder supplies full Mohammadpur address, hours, signage photos; decide if office is client-visitable | NEW | founder | S |
| 2 | High | Create and verify Dhaka GBP per section 5 | NEW | founder | M |
| 3 | High | Start review requests to 8 to 15 BD clients (GBP) and Clutch for foreign clients | OPEN | founder | M |
| 4 | Medium | Put full street address in JSON-LD and on /contact; add hasMap after GBP is live | OPEN | dev | S |
| 5 | Medium | Resolve Florida LLC status; keep US as mailing address on directories only, no US GBP | OPEN | founder | M |
| 6 | Medium | Claim Bing Places and Apple Business Connect for Dhaka | NEW | founder | S |
| 7 | Medium | Run DataForSEO category pull and 7x7 geo-grid baseline after GBP is live | NEW | dev | M |
| 8 | Low | Add an OSM node for the Dhaka office (free, helps Apple/DuckDuckGo-type consumers) | NEW | founder | S |
| 9 | Low | Build /software-development-tampa-bay and /software-company-dhaka pages per 08-local section 4 | OPEN | dev | M |

How we'd know it failed: no GBP impressions within 30 days of verification; fewer than 5 reviews after 60 days; geo-grid SoLV still 0% at 3 months.

## 7. Cost report
DataForSEO credits consumed: 0. Free APIs used: Nominatim (2 requests), Overpass (3 successful queries, 2 server errors), 2 WebFetch attempts (blocked).
