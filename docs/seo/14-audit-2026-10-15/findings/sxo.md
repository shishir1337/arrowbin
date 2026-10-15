# SXO re-audit: arrowbin.com, 15 October 2026

Scope: the 10 new sprint posts, plus a re-score of `/`, `/services/ecommerce-development` and `/services/ai-automation`. Baseline: `docs/seo/12-audit-2026-10-14/sxo.md`.

**What was measured.** Page content comes from the local production build, http://localhost:3117 (not deployed). Live https://arrowbin.com is still build 959866d and was fetched only to diff old against new copy. SERPs come from WebSearch on 15 Oct 2026. All scores are analyst judgement, not user tests, and they are separate from the SEO Health Score.

## Score

| Measure | 14 Oct | 15 Oct (local) | Note |
|---|---|---|---|
| SXO category score | 63.5 | **64** | 14 Oct published no single number, so 63.5 is the mean of the three persona averages (64.9 / 67.3 / 58.3). 15 Oct is the same set with only the 3 re-scored pages updated (65.5 / 68.2 / 58.7). The other four pages (custom, mobile, SaaS, cost guide) also changed tonight and were not re-scored, so 64 is a floor. |
| Persona averages, 7-page set (P1 / P2 / P3) | 64.9 / 67.3 / 58.3 | 65.5 / 68.2 / 58.7 | See section 4 |
| New-post layer (10 posts, primary-fit cells only) | not applicable | P1 70.6 / P2 69.1 / P3 65.0, mean 68 | Different population from the page set, so not comparable like for like. For reference the one old post scored 73 / 68 / 50 |

## 1. Headline

1. **No CRITICAL page-type mismatch.** 7 of 10 posts are ALIGNED with their SERP (guide, cost guide or checklist). Three are PARTIAL (MEDIUM): courier API, payment gateway and WordPress to Next.js.
2. **The real format gap is the calculator.** On all four cost keywords (AI agent, MVP, SaaS, maintenance) the guide type matches, but the adjacent "calculator" queries return interactive estimators from Techsy, Planeks, Tenet, Xgenious, Space-O, ScienceSoft, Wavect and Credencys. SolGuruz's guide title even carries "[With Calculator]". None of our posts has a tool.
3. **Content is strong, Action is weak.** Across the scored cells, Relevance runs 14 to 25, Clarity 17 to 21, Trust 15 to 18 and Action 10 to 15. The Bangladesh posts are our best P3 content (payment 75, courier 70), but P3 Action averages 10.8 of 25 because there is no WhatsApp path and no BDT quote path.
4. **Tonight's service-page copy helps, and the homepage did not move.** E-commerce gains +1/+2/+2 and AI +3/+4/+1 for P1/P2/P3. The homepage body is unchanged since the 14 Oct local build.

## 2. Post-by-post table

Match: yes = the post is the page type and angle the SERP rewards; partial = right topic but the SERP rewards a different type or a format we lack; no = wrong type. Persona scores are totals of Relevance/Clarity/Trust/Action (25 each). "n/r" means that persona would not search this query, so no score was given. Breakdowns are in section 3.

| Post (slug) | Target keyword (`keywords[0]`) | SERP page type (what wins today) | Match | P1 / P2 / P3 | Top fix |
|---|---|---|---|---|---|
| `ai-agent-cost-small-business` | how much does an ai agent cost for a small business | Vendor and agency cost guides (Solulab, Creole Studios, AIChat, Lilach Bullock, Ultimo, Quickchat, Sista); estimator forms on the "calculator" query (Credencys) | **yes** (calculator gap) | 63 / 72 / n/r | Turn the post's monthly model-fee worked example into an interactive calculator (conversations, calls, tokens, model). It needs no founder numbers because it uses published token prices |
| `chatgpt-shopping-for-online-stores` | how to get products on chatgpt shopping | How-to guides and listicles (Publitas, Texta, Practical Ecommerce, two independent writers) plus WooCommerce plugin pages (QuickShop AI); agentic-commerce explainers (Naturaily, Salt, Saleor) | **yes** | n/r / 70 / 56 | Add a downloadable feed template and checklist (CSV/JSON sample), because results say sellers "submit a CSV or JSON feed". P3 cell is low because the post's reader is US-centred |
| `courier-api-integration-bangladesh` | courier api integration bangladesh | Ready-made packages and plugins: 3 Odoo modules, Packagist Laravel package, Shopify app (WD Easy Courier BD), WordPress plugin (BC CourierHub BD), a dev.to tutorial. No editorial guide and no official docs in results | **partial** (MEDIUM) | n/r / n/r / 70 | Add a one-screen courier quick-reference (auth, create-order, webhook, COD fields) and a short request/response sample. The blog has no code block type, so this needs a dev change plus sign-off |
| `mvp-development-cost` | mvp development cost | Agency cost guides (SoftTeco, Empat, RaftLabs, Netguru, Guru, CMARIX, Codica); calculators on the adjacent query (Tenet, Planeks, Techsy, Xgenious, Hunted.space) | **yes** (calculator gap) | 74 / 61 / n/r | MVP scope-to-weeks-to-dollars calculator using the post's own phase table. Needs the founder's F2/F3 numbers first |
| `payment-gateway-integration-bangladesh` | payment gateway integration bangladesh | Vendor plugin product page (ECOSIRE WooCommerce SSLCommerz plugin, repeated in 10 locale URLs, "from $99", "2-4 weeks"). No guide and no gateway docs surfaced | **partial** (MEDIUM, winnable) | n/r / n/r / 75 | Put a decision table (SSLCommerz vs direct bKash vs Nagad: fee, go-live time, best for) and a go-live timeline in the first screen, because the only ranking page sells a price and a timeline. Add WhatsApp |
| `saas-development-cost` | saas development cost | Agency cost guides (Netguru "2025", Innovecs, RaftLabs x2, Cleveroad, Saigon, Promatics "2025"); calculators (Techsy, Planeks, Inqodo) | **yes** (calculator gap; freshness edge, since several leaders are dated 2025) | 74 / n/r / 60 | Running-cost calculator (Stripe fees, hosting, tools) as the differentiator. Techsy already quotes "$2K-15K a month to operate" |
| `shopify-vs-custom-ecommerce` | shopify vs custom ecommerce website | Comparison guides (ecommerce-platforms.com, Magenest, Sharpei, Folio3, Sydcon); a data compare page (costbench) and "5-year cost verdict" posts on the 3-way query | **yes** | n/r / 73 / 67 | 3-year cost calculator built from the post's own fee maths, plus a verdict table above the fold. Note that the SERP's "custom" often means WooCommerce or Adobe Commerce, so keep the WooCommerce section prominent |
| `software-maintenance-cost` | how much does software maintenance cost | Agency guides (Keenethics, Vention, Arka, Bridge Global, Koombea, GeeksforGeeks, EPAM, WalkMe); calculators (Space-O, ScienceSoft, Wavect) | **yes** (calculator gap) | 65 / 72 / n/r | Yearly maintenance budget calculator (build cost x complexity x compliance), labelled as an Arrowbin estimate. Show our 15-20% beside the SERP's 20-25% (and Wavect's 21-26% for SaaS) so the gap is explained, not hidden |
| `vibe-coded-app-production-ready` | vibe coded app production ready | Checklists (RaftLabs, Leanware, DEV.to "25 checks", catdoes, axonbuild, itlackey, a Bluestar PDF, a GitHub repo) plus agency "finish your vibe-coded app" pages (CodeConductor, GoodBarber, groovyweb) | **yes** | 77 / 66 / n/r | Downloadable checklist (PDF or markdown), since a PDF and a repo both rank. Separately, the commercial variant "fix vibe coded app" is a service-page query; see N4 |
| `wordpress-to-nextjs-migration` | wordpress to next.js migration | Mixed: service and gig pages (John Kavanagh, Gautam Khorana, Contra) about 40%; guides and checklists (browsercat, index.dev, eseospace, Kavanagh checklist) about 60%. On the "cost" variant, price-band pages from Kolonell (EUR 12,000 to 40,000) | **partial** (MEDIUM) | n/r / 70 / 62 | Add a migration checklist download now. Price band and a service landing page are founder-gated (the post deliberately quotes no price) |

Reading the table:
- The three PARTIAL rows are all "developer or buyer wants a tool, a plugin or a price" intents. A long guide still wins authority and links, but it will not satisfy the click on its own.
- Three of the four cost-post calculator gaps (MVP, SaaS, maintenance) can ship only after the founder settles the price conflicts F1 to F5 (editor-report). The AI-agent calculator is the exception.
- Cannibalisation watch: five posts open with a "How much does X cost in 2026?" H2 (cost guide, AI, MVP, SaaS, maintenance). The link matrix routes them well, but check the right Search Console property after indexing for pages swapping places. (The GSC/GA4 connectors attached to this session belong to a different business and were not used.)

## 3. Persona scores (R / C / T / A, 25 each)

Personas as on 14 Oct: P1 US seed-stage founder, P2 US/UK SMB owner, P3 Bangladesh business owner. Evidence common to every post: TL;DR and key takeaways present, 14 to 31 external source links, FAQPage and BlogPosting JSON-LD, one in-body CTA at about 15 percent of the document, a closing CTA with 4 Cal.com links, 0 forms, 0 interactive inputs, 0 code blocks, 0 `wa.me` links, no client case study, no third-party reviews.

| Post | P1 | P2 | P3 |
|---|---|---|---|
| AI agent cost | 15/19/16/13 = **63** | 22/20/16/14 = **72** | n/r |
| ChatGPT shopping | n/r | 21/19/17/13 = **70** | 14/17/15/10 = **56** |
| Courier API BD | n/r | n/r | 24/19/16/11 = **70** |
| MVP cost | 23/20/16/15 = **74** | 15/18/15/13 = **61** | n/r |
| Payment gateway BD | n/r | n/r | 25/20/18/12 = **75** |
| SaaS cost | 23/20/17/14 = **74** | n/r | 17/17/16/10 = **60** |
| Shopify vs custom | n/r | 22/20/17/14 = **73** | 21/18/17/11 = **67** |
| Maintenance cost | 18/19/15/13 = **65** | 22/20/15/15 = **72** | n/r |
| Vibe-coded app | 24/21/17/15 = **77** | 17/19/16/14 = **66** | n/r |
| WordPress to Next.js | n/r | 21/19/17/13 = **70** | 18/17/16/11 = **62** |
| **Average (cells scored)** | **70.6** (5) | **69.1** (7) | **65.0** (6) |

Why the cells land where they do:
- **Relevance and Clarity are high** because each H2 is a question with a direct answer, TL;DRs and tables are present, and the angles are specific (computed model fees, Stripe fee share, 308 redirects, official-source BD docs).
- **Trust sits at 15 to 18.** Primary sources are cited and Arrowbin figures are labelled as estimates (the sprint fixed that). It is capped by no named case, no reviews, and several own-numbers conflicts (F1 to F5). Payment BD gets 18 because it cites SSLCommerz and bKash primary sources and shows two live BD stores.
- **Action is the weakest column (10 to 15).** No calculator while SERPs offer one, one in-body CTA, no form, no WhatsApp, and the contact chips start at "Under $5k". P3 Action averages 10.8, P1 14.0, P2 13.7.
- **Lowest cells:** ChatGPT shopping x P3 56 (US-centred reader), SaaS x P3 60 (strong "outside Stripe's supported countries" section, but USD only), MVP x P2 61, WordPress x P3 62, AI x P1 63.

Concrete improvements by persona, weakest first:
- **P3:** a `wa.me` click-to-chat beside every BD CTA (founder supplies the number, D7); BDT starting prices in the two BD guides' CTAs (D4); a lower budget chip on `/contact`. Expected lift: +3 to +5 on each BD post from Action alone.
- **P2:** the AI and maintenance calculators; a visible post-launch support term near the maintenance CTA.
- **P1:** MVP and SaaS scope calculators; one real or anonymised case in the vibe-coded post if Arrowbin has done a takeover (the writer's own flag says it has not been confirmed).

## 4. Re-score: homepage and 2 service pages

Basis: current local build vs the 14 Oct local build scores in `sxo.md`. Page chosen: `/services/ecommerce-development` (highest-intent page, largest P3 relevance) and `/services/ai-automation` (title, intro, proof heading and related guides all changed). Mobile and SaaS got the same Engagement, form and proof-heading changes but were not re-scored.

| Page | P1 (14 Oct local, now, change) | P2 | P3 | What moved |
|---|---|---|---|---|
| `/` | 60, 60, 0 | 61, 61, 0 | 64, 64, 0 | The body copy is identical to the 14 Oct local build (diffing live against local shows only the title, the sr-only H1 and the portfolio lines, all 14 Oct changes). Tonight changed metadata, JSON-LD and footer icons, none of which a visitor reads. Still no form, no mid-page price, and the two unattributed testimonials remain ("Sarah Mitchell", "David Chen") |
| `/services/ecommerce-development` | 62, **63**, +1 | 74, **76**, +2 | 76, **78**, +2 | Title now "E-commerce Development Company for Online Stores" (keyword fit, R +1 for P2). The answer block gives timelines, Shopify 3-6 weeks and headless 8-12 (C +1 for P1 and P2). The Engagement cards are store-specific (payments and delivery scoped, 301 redirects, checkout monitoring, new payment or courier options) and the related guides are now Shopify vs custom and the BD payment gateway guide (R +1 and T +1 for P3). Still no `$` on the page, still 3 of 6+ stores, still no `wa.me` |
| `/services/ai-automation` | 60, **63**, +3 | 73, **77**, +4 | 54, **55**, +1 | Title "AI Automation Agency for Small Businesses", intro and answer block with 2-3 week prototype and 3-6 week production (R +1, C +1 for P1 and P2). Form prompt now "Tell us which task eats your team's time" (A +1 for P2). Proof heading changed from "Products we've built and automated" to "Websites and stores by the same team", so the page no longer promises AI proof it lacks (T +1 for P1 and P2). Related guides are now the AI agent cost post and the ChatGPT shopping post (supports P1 and P2 relevance). P3 gains only +1 Clarity: still no COD-confirmation or courier-status workflow |

Implied averages if only these three pages changed: **P1 65.5** (14 Oct 64.9), **P2 68.2** (67.3), **P3 58.7** (58.3). Treat as a floor, not a final figure, because custom, mobile, SaaS and the cost guide also changed and were not re-scored.

## 5. Findings

Status key against the 14 Oct baseline: FIXED-LOCAL (fixed at :3117, not deployed), PARTIAL, OPEN, NEW.

### Movement against the 14 Oct findings

| 14 Oct | Status now | Evidence |
|---|---|---|
| S1 proof does not match service | PARTIAL, founder-gated | Headings relabelled honestly (mobile "Related web builds, live today", SaaS "Web platforms we've shipped", AI "Websites and stores by the same team"). Cards still show websites. A real project per service is Founder-gated (D5) |
| S2 conflicting prices, none on e-commerce/SaaS | OPEN, founder-gated | E-commerce text has no `$`. Home FAQ still "$5,000-$10,000", AI FAQ "$10,000-$15,000". Editor-report F1 to F5 lists the conflicts |
| S3 no risk reversal | OPEN, founder-gated | No guarantee, refund or exit line found on the three scored pages (the only "refund" text is inside the AI demo) |
| S4 unattributed testimonials | OPEN, founder-gated | Still on the homepage |
| S5 homepage first-screen clarity | PARTIAL | Title and sr-only H1 are FIXED-LOCAL from 14 Oct. Visible sentence and short form still open |
| S6 e-commerce page | PARTIAL | "Company" in the title is FIXED-LOCAL. Still 3 stores, no price, no `wa.me` |
| S7 AI page | PARTIAL | "Agency" in the title is FIXED-LOCAL. The n8n comparison now lives in the AI cost post (route table). The page itself has no tool comparison, price table or BD workflow |
| S8 cost guide | PARTIAL, FIXED-LOCAL | "Updated" date is present. Mid-article CTA after the first table. "Worked example" label. Estimates labelled. BD row and "what Arrowbin projects cost" box are open (need D4) |
| S9 conversion friction | OPEN | Posts have no form and 4 Cal.com links each. Service-page form prompts are now service-specific (small gain) |
| S10 SaaS page decision content | OPEN | Unchanged apart from copy. The new SaaS cost post carries the cost content, but the page does not link a price |
| S11 Bangladesh path | PARTIAL | New BD content layer: payment gateway, courier, Shopify BD section, SaaS outside Stripe. Still 0 `wa.me` on `/`, services or posts, and `/contact` still starts at "Under $5k" |

### New findings

**N1. No calculator on the four cost posts.** Medium, NEW. Owner: dev for the component, founder for MVP/SaaS numbers. Needs visual sign-off: yes (new UI).
- Evidence: SERPs for "mvp cost calculator", "saas development cost calculator", "software maintenance cost calculator" and "ai agent cost calculator small business" return interactive tools; the head-term SERPs carry the same vendors' guides. Our 4 cost posts have 0 inputs and 4 tables each.
- Fix: one shared calculator component, built in this order: (1) AI agent monthly model fees (published token prices, no founder input), (2) maintenance yearly budget (the 15-20% estimate is stable), (3) MVP and SaaS scope (after F1 to F5). Every output labelled "Arrowbin estimate", and link back to the matching post.
- Fails if: Action cells stay at 13 to 15 and the posts keep losing the "calculator" click to Techsy and Planeks.

**N2. Bangladesh posts are capped by Action.** Medium, NEW evidence for the S11 OPEN item. Owner: founder (WhatsApp number D7, BDT bands D4), then dev. Needs visual sign-off: yes (new button).
- Evidence: payment 75 and courier 70 are the best P3 scores, but P3 Action is 10 to 12 of 25 on all six scored cells. 0 `wa.me` links on `/`, the services, `/contact` and any post.
- Fix: `wa.me` button beside the BD CTAs and a BDT starting-price line in the payment and courier posts. Add a "Under 3 lakh" chip on `/contact`.

**N3. Courier and payment SERPs reward tool-style pages.** Medium (PARTIAL mismatch), NEW. Owner: dev, with sign-off. Needs visual sign-off: yes (new block type).
- Evidence: courier SERP is packages and plugins with no editorial page; payment SERP shows a single plugin product page with price and timeline. Our posts are 5,266 and 5,295 words with no code block (`ContentBlock` has no code type).
- Fix: add a `code` block type; add a quick-reference table at the top of the courier post (auth, create order, webhook, COD fields) and a go-live timeline and decision table at the top of the payment post. This turns an authority guide into something a developer can use in one screen, while keeping the guide's depth.
- Opportunity: neither SERP has an editorial guide, so ranking is realistic if the first screen answers the tool intent.

**N4. Two commercial queries need a service page, not a post.** Medium, NEW. Owner: founder decision, then dev. Needs visual sign-off: yes.
- Evidence: "wordpress to next.js migration" returns service and gig pages for about 40% of results, and price pages (Kolonell, EUR 12,000 to 40,000) on the cost variant. "Fix vibe coded app" (our secondary keyword) returns agency service pages (CodeConductor, GoodBarber, groovyweb).
- Fix: decide whether Arrowbin wants a `/services/wordpress-to-nextjs-migration` page and a "rescue an AI-built app" offer. If yes, each post links to it as the next step. The post alone will not capture the "hire someone" click.

**N5. Downloadable assets are missing.** Low, NEW. Owner: dev plus founder. Needs visual sign-off: yes if a download card is added.
- Evidence: a Bluestar PDF and a GitHub checklist rank for the vibe-coding query; Kavanagh's migration checklist ranks for WordPress; the ChatGPT results emphasise feed files.
- Fix: three free downloads (vibe-coded launch checklist, WordPress migration checklist, product-feed template). They also give an email-free lead magnet and a share target.

**N6. Own-number conflicts cap Trust and Clarity.** Medium, OPEN, founder-gated. Not re-raised as a new item. F1 to F5 in `docs/seo/13-sprint-2026-10-15/editor-report.md` (headline range $30,000 vs $40,000, standard MVP price, simple MVP timeline, free vs paid discovery, service-page prices vs the cost guide) still decide how far Trust can rise on MVP, SaaS and maintenance posts.

### Founder-gated (listed, not re-raised)
- D4 one price table, USD plus BDT (unblocks S2, N1 for MVP/SaaS, N2).
- D5 real proof per service (S1).
- D7 WhatsApp number for Bangladesh buyers (N2).
- F1 to F5 price and timeline conflicts, F4 free vs paid discovery, F8 whether the VIBE review and GPT readiness check exist as offered.
- Testimonials and review collection (S4); a risk-reversal line (S3).

### What works
- Page types are right on 7 of 10 posts; titles carry the SERP head term; question H2s open with direct answers; each post has a TL;DR, takeaways, FAQs and JSON-LD.
- The angles are defensible against the SERP: computed model fees (AI), Stripe fee share (SaaS), official-source BD docs (payment, courier), 308 vs 301 redirects (WordPress), RLS exposure with a CVE (vibe-coded).
- Freshness: several leading cost guides are still dated 2025 (Netguru, Promatics), while ours say 2026.
- Internal linking gives every new post at least 3 inbound links (editor-report matrix), so the cost cluster hangs together.
- Tonight's service-page copy removed generic text and put timelines and store- or AI-specific points into the first screens.

## 6. Limitations

- **SERP evidence is unranked.** WebSearch returned 9 to 10 results per query with no order, no PAA boxes, no AI Overview and no featured-snippet data, so "what wins" is a type count, not a position map. Some queries returned noise (ten locale copies of one ECOSIRE page for the payment query; WordPress plugin locale URLs for ChatGPT and courier). The payment SERP in particular may hide guides that exist.
- 14 Oct had the same tool limitation, so this audit is comparable to it, not stronger.
- Vendor descriptions in the results are the search tool's summaries; I did not open each competitor page to measure depth or schema.
- Personas are judgement, not testing. No GSC or GA4 data was used (the connected properties belong to a different business). No visual rendering check; the homepage and service pages were compared as text (live vs local).
- Not re-scored: custom, mobile, SaaS pages and the cost guide after tonight's changes. Not checked: Bengali-language SERPs for P3 (keywords were English only), mobile rendering of new CTA cards, and the effect of the 19 replaced charts on engagement.
- Live was used only for the old-copy diff. Nothing here describes what is deployed on arrowbin.com.

## 7. Summary

The new content is in the right format for its SERPs on seven of ten keywords, and the three partials (courier, payment gateway, WordPress to Next.js) are intents where the ranking page is a tool, a plugin or a price list, so each needs a first-screen quick-reference or a service page behind it. The one gap shared by all four cost posts is the calculator, which the adjacent "calculator" SERPs show as an established format; start with the AI agent monthly-fee calculator because it needs no founder numbers. New posts average 70.6 / 69.1 / 65.0 for P1 / P2 / P3 on their primary-fit cells, with Action the weakest column (P3 Action 10.8 of 25) because there is still no WhatsApp or BDT path. Against 14 Oct's persona averages, the homepage did not move (60 / 61 / 64), e-commerce moved +1 / +2 / +2 and AI +3 / +4 / +1, which lifts the 7-page averages to roughly 65.5 / 68.2 / 58.7. The bigger lifts (price table, real proof per service, WhatsApp, reviews, risk reversal) remain founder-gated.

Generate a PDF report? Use `/seo google report`.
