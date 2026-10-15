# E1 editor report: 13 posts, one publication (15 October 2026)

Scope: the 10 new posts in `src/lib/posts/` and the content of the 3 core guides in `src/lib/blog.ts`. Text edits only: no types, helpers, SVGs, `index.ts` or other files touched. No git, no build.

Abbreviations used below:

| Code | Post |
|---|---|
| COST | how-much-does-custom-software-development-cost (core, canonical for prices and the maintenance band) |
| CHOOSE | how-to-choose-a-software-development-company (core) |
| TIME | how-long-does-it-take-to-build-an-mvp (core) |
| AI | ai-agent-cost-small-business |
| GPT | chatgpt-shopping-for-online-stores |
| COUR | courier-api-integration-bangladesh |
| MVP$ | mvp-development-cost |
| PAY | payment-gateway-integration-bangladesh |
| SAAS | saas-development-cost |
| SHOP | shopify-vs-custom-ecommerce |
| MAINT | software-maintenance-cost |
| VIBE | vibe-coded-app-production-ready |
| WP | wordpress-to-nextjs-migration |
| SVC | `src/lib/services.ts` FAQs and page copy (canonical for service timelines; not my file) |

## 1. Arrowbin facts inventory

Every statement that is Arrowbin's own number or promise. "Conflict" means two published places say different things.

### Prices

| Fact | Where | Value(s) | Status | Resolution |
|---|---|---|---|---|
| Overall custom software range | COST (TL;DR, H2 answer, excerpt, takeaway) | $5,000–$250,000+ | Consistent | None needed |
| Where most first products land | COST TL;DR | $30,000–$120,000 | **Conflict** | Founder decision F1 |
| | COST H2 answer, closing, takeaway | $40,000–$120,000 | | |
| Lean MVP / internal tool | COST table + H3, MVP$ (TL;DR, table, takeaway), TIME FAQ | $5,000–$30,000 | Consistent across posts | |
| | SVC custom software FAQ | "from $8,000 for a focused tool" | **Conflict** with COST | Founder decision F5 (SVC not my file) |
| Polished, launch-ready MVP or app | COST closing, MVP$, SAAS | $40,000–$120,000 | Consistent across these | |
| | TIME FAQ ("standard MVP") | $30,000–$90,000 | **Conflict** | Founder decision F2 |
| | SVC mobile FAQ ("polished MVP") | $12,000–$40,000 | **Conflict** | Founder decision F5 |
| Mid-size web or mobile app | COST table + H3; SHOP (store build); MAINT table | $30,000–$90,000, 3–6 months | Consistent | |
| Full SaaS platform | COST, SAAS, MAINT | $80,000–$200,000, 5–9 months | Consistent | |
| | SVC custom software FAQ | "$75,000+ for a full platform" | Near-conflict | F5 |
| Mobile apps and enterprise | COST H3 | $50,000–$500,000+ | **Conflict** with SVC mobile $12,000–$40,000 MVP | F5 |
| Enterprise system | COST table | $150,000–$500,000+, 9–18 months | Consistent | |
| Worked example | COST, MVP$, SAAS, MAINT | $60,000 SaaS MVP, about 14 weeks, split 10/15/50/15/10 | Consistent | Derived figures checked: $4,300/week, $6,000 discovery, $9,000–$12,000/yr upkeep |
| First AI automation | SVC AI FAQ, AI post (TL;DR, tables, takeaway) | $10,000–$15,000 including a year of running costs | Consistent | |
| Regional rates | COST | $25–180/hour by region (Arrowbin estimate) | Consistent | |
| Custom store 3-year cost | SHOP | $43,500–$144,000 ($30k–$90k build + 15–20%/yr) | Consistent with COST; arithmetic checked | |

### Maintenance band and what it includes

| Fact | Where | Value(s) | Status | Resolution |
|---|---|---|---|---|
| Yearly ownership budget | COST, MVP$, SAAS, SHOP, AI, MAINT | 15–20% of build cost a year (Arrowbin estimate) | Consistent number | |
| What the band covers | COST body + FAQ | Hosting, third-party services, security patches, bug fixes, small improvements | Canonical | |
| | MAINT | Upkeep plus hosting and third-party services; big usage-driven bills get their own line | Matches COST | |
| | MVP$, SHOP | Hosting and services inside; features separate | Matches COST | |
| | SAAS (before edit) | Maintenance only; hosting, tool plans and running costs on top | **Conflict** | **Resolved**: SAAS aligned to COST (see section 4) |
| Future features | COST hidden-cost list implied inside the band; COST FAQ says "small improvements"; MVP$, SAAS, MAINT say features are a separate budget | **Ambiguity** | **Resolved**: one sentence added to COST's list item ("Budget these separately; the 15–20% covers small improvements, not a new roadmap"), matching COST's own FAQ |
| Agents in the band | AI | Top of the band, because models move | Consistent; MAINT now says the same and links AI | |

### Plans, response times, ownership

| Fact | Where | Value(s) | Status |
|---|---|---|---|
| Maintenance plan contents | SVC, MAINT closing + FAQ | Monitoring, security and dependency updates, backups, bug fixes, monthly health report; higher plans add faster response, 24/7 critical cover, more dev hours | Consistent |
| Unused hours | SVC, MAINT FAQ | Go into improvements from an agreed list | Consistent |
| Contract | SVC | Month to month after onboarding | Not repeated in posts |
| Response time | SVC ("attention immediately under the SLA, targets agreed in your plan"), MAINT ("written into the plan as an SLA") | No numeric response time anywhere | Consistent, nothing to confirm |
| Enquiry reply | SVC maintenance page ("usually within a day") | Not in posts | n/a |
| Code ownership | SVC, SAAS FAQ, CHOOSE | 100% of code, accounts, infrastructure | Consistent |

### Fixed estimate and discovery

| Where | Wording | Note |
|---|---|---|
| COST CTA and closing | "fixed, transparent estimate after a short discovery call" | Free call implied |
| COST body + FAQ | "short, paid discovery phase first, then a fixed price" | Paid discovery |
| MVP$ body and phase table | fixed price "after a short paid discovery"; discovery about 10% ($6,000 on the example) | Paid |
| SAAS closing | "A short paid discovery turns that into a fixed price" | Paid |
| TIME CTA and closing | "fixed estimate" after a free 30-minute call | Free call implied |
| SVC custom software FAQ | "After a short discovery call we give you a fixed estimate" | Free call implied |
| WP, COUR CTAs | "fixed estimate"; PAY CTA and closing "fixed quote" | Silent on discovery |

**Conflict**: free call vs paid discovery (founder decision F4). What I changed: the MVP$ and SAAS CTAs no longer promise "a fixed estimate after a short discovery call", because both posts' own bodies say discovery is paid. Each post is now internally consistent. Everything else is left for the founder.

### Audits, reviews and checks offered (no prices stated anywhere)

| Offer | Where |
|---|---|
| Read-only review / audit of an AI-built repo | VIBE CTA and closing |
| AI-crawler readiness check from a product URL | GPT CTA and closing |
| Estimate from a URL (templates and redirects) | WP CTA |
| Code and infrastructure audit before taking over | SVC maintenance FAQ, MAINT |
| Audit, refactor and scale other teams' SaaS | SVC SaaS FAQ |
| UX audit, 1–2 weeks | SVC UI/UX FAQ |
| Cloud usage audit ("frequently cuts cloud costs by 20–40%") | SVC cloud FAQ (unsourced number, not in posts) |

Founder decision F8: confirm each offer exists as described and whether the VIBE review and GPT check are free.

### Timelines (SVC canonical for service timelines)

| Fact | Where | Value(s) | Status |
|---|---|---|---|
| SaaS MVP | SVC | 8–14 weeks | Canonical |
| | SAAS | 8–14 focused, 14–20 complex multi-tenant, example about 14 | Reconciles SVC with TIME; founder to confirm (F6) |
| | TIME | complex SaaS MVP 14–20 | |
| Simple MVP / internal tool | TIME, MVP$ | 6–8 weeks | **Conflict** (F3) |
| | COST table | 4–10 weeks | |
| | SVC custom software | MVP 6–12 weeks | |
| | TIME FAQ | "sometimes" 4 weeks | |
| Polished MVP | MVP$ table | 10–20 weeks (W7 joined standard 10–14 and complex 14–20) | Founder to confirm (F7) |
| Mobile MVP | SVC | 10–16 weeks | Not repeated in posts |
| E-commerce | SVC, SHOP | Shopify 3–6, headless 8–12, custom 12+ weeks | Consistent |
| AI | SVC, AI | Prototype 2–3 weeks, production 3–6 more | Consistent |
| UI/UX, cloud | SVC | 4–8 weeks; UX audit 1–2 weeks; cloud setup 4–7 weeks | Not in posts |
| WordPress migration | WP | No published week count (deliberate) | n/a |

### Other own-facts checked

| Fact | Where | Status |
|---|---|---|
| Silent Lifestyle BD takes orders "rather than card checkout" | SHOP (from `portfolio.ts` blurb) vs PAY (live footer lists "Pay on delivery • bKash • Nagad • Card") | **Conflict. Resolved in SHOP**: now "is set up around cash on delivery with phone confirmation". `portfolio.ts` blurb still says "rather than card checkout" (lead) |
| SSLCommerz app on Shopify | SHOP said it could not confirm one; PAY links the free SSLCOMMERZ app | **Resolved**: SHOP now says SSLCommerz has a free one and points to PAY |
| Redirect status | SHOP said "301 redirects"; WP explains Next.js sends 308, which Google treats as 301 | **Resolved**: SHOP says "permanent (301 or 308) redirects" |
| Effort scale S/M/L | VIBE: L = a week or more; GPT: L = a few weeks | **Resolved**: GPT now "L a week or more" |
| "Eleven AI crawlers" in our robots.txt | GPT | Verified: 11 user agents in `src/app/robots.txt/route.ts` |
| Hostinger partnership | AI | Allowed by sprint rules |
| Unsourced service claims | SVC: cloud "cuts costs by 20–40%", mobile cross-platform "saves 30–40%" | Not repeated in posts; founder F9 |

## 2. Founder decisions (no canonical answer, not changed)

- **F1. Headline range for first products.**
  - COST TL;DR says most business products land at $30,000–$120,000.
  - COST body, closing and takeaway say $40,000–$120,000. MVP$ and SAAS use $40,000–$120,000.
  - Pick one; the TL;DR is what AI engines quote.
- **F2. "Standard MVP" price.**
  - The TIME FAQ says $30,000–$90,000.
  - COST, MVP$ and SAAS say $40,000–$120,000 for a "polished, launch-ready MVP or app".
  - COST itself uses $30,000–$90,000 for a "mid-size web or mobile app".
- **F3. Simple MVP timeline.**
  - COST table: 4–10 weeks.
  - TIME and MVP$: 6–8 weeks. TIME's own FAQ says 4 weeks is sometimes possible.
  - SVC custom software: 6–12 weeks for a minimum viable version.
- **F4. Discovery: free or paid.**
  - Several places say a fixed estimate follows "a short discovery call". Others say "a short, paid discovery phase".
  - If it is both (a free 30-minute call, then a paid discovery before a fixed price), say it once in COST, and the CTAs can follow.
- **F5. Service-page prices vs the cost guide.**
  - SVC custom software: "$8,000 for a focused tool to $75,000+ for a full platform".
  - SVC mobile: "polished MVP $12,000–$40,000".
  - Both disagree with COST ($5,000–$30,000 lean MVP, $40,000–$120,000 polished MVP or app, $80,000–$200,000 SaaS, mobile and enterprise from $50,000).
  - COST is canonical for prices, so `services.ts` should change, but that needs the founder's numbers and is not my file.
- **F6. SaaS MVP timelines.** Confirm the reconciliation: 8–14 weeks for a focused MVP and 14–20 weeks for a complex multi-tenant one.
- **F7. MVP$ table.** Confirm "polished MVP: 10–20 weeks".
- **F8. Offers.**
  - Confirm the VIBE read-only review, the GPT readiness check, the WP estimate from a URL, the COUR "fixed estimate" and the PAY "fixed quote" exist as described.
  - Say whether the review and check are free.
- **F9. Unsourced service-page percentages.** Either label them as estimates or drop them: cloud "20–40%" and mobile "30–40%".
- **Writers' open flags still stand** (see their agent-log sections):
  - RedX docs maybe behind a login (COUR).
  - Pathao details (COUR).
  - arrowbin.com's history and old URLs (WP).
  - The Cloudflare 403 test on our own site (GPT).
  - The Wavect benchmark (MAINT).
  - SSLCommerz Tk 25,500 renewal terms (PAY).
  - Bangla keyword wording (PAY).
  - Model prices that change on January 1, 2027 (AI).

## 3. Link matrix (blog-to-blog links in body text, after this pass)

Rows link to columns. "·" is the post itself.

| from \ to | COST | CHOOSE | TIME | AI | GPT | COUR | MVP$ | PAY | SAAS | SHOP | MAINT | VIBE | WP | out |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **COST** | · | x | x | x |  |  | x |  | x |  | x |  |  | 6 |
| **CHOOSE** | x | · | x |  |  |  |  |  |  |  |  | x |  | 3 |
| **TIME** | x | x | · |  |  |  | x |  | x |  |  |  |  | 4 |
| **AI** | x | x |  | · | x |  |  |  |  |  | x |  |  | 4 |
| **GPT** |  |  |  | x | · |  |  |  |  | x |  |  | x | 3 |
| **COUR** |  |  |  |  |  | · |  | x |  | x |  |  |  | 2 |
| **MVP$** | x |  | x |  |  |  | · |  | x |  | x | x |  | 5 |
| **PAY** |  |  |  |  |  | x |  | · |  |  |  |  | x | 2 |
| **SAAS** | x |  |  |  |  |  | x | x | · |  | x |  |  | 4 |
| **SHOP** | x |  |  |  | x | x |  | x |  | · |  |  | x | 5 |
| **MAINT** | x |  |  | x |  | x |  |  |  |  | · | x | x | 5 |
| **VIBE** |  | x | x |  |  |  | x |  |  |  |  | · |  | 3 |
| **WP** | x |  |  |  | x |  |  | x |  | x |  |  | · | 4 |
| **in** | 8 | 4 | 4 | 3 | 3 | 3 | 4 | 4 | 3 | 3 | 4 | 3 | 4 | |

- Every new post now links to at least 2 other posts and receives at least 3 inbound links from 3 different posts.
- Before this pass, 4 new posts had 0 inbound links: AI, COUR, SAAS and MAINT.
- Checked across all 13 posts:
  - No paragraph or list item has more than 2 links.
  - No URL repeats inside a paragraph.
  - No links in headings, TL;DRs, takeaways or FAQs.
- Every anchor added in this pass is worded differently from the other anchors to the same post. A few older anchors still repeat across posts: "what custom software costs" in CHOOSE and TIME, and "what custom development costs" in AI and WP.

### Links added (23 links in 22 places)

| From | Block | To | Anchor |
|---|---|---|---|
| WP | WooCommerce payment-gateway paragraph (required) | PAY | Bangladesh payment gateway guide |
| WP | "Move to Shopify" list item | SHOP | Shopify vs custom store comparison |
| WP | "Redirects are half the job" (before the SEO table) | GPT | getting products into ChatGPT shopping |
| MVP$ | "The trap is the in-between" (required) | VIBE | engineering review of the AI-built code |
| MVP$ | "Build times come from our guide..." | SAAS | SaaS development cost |
| MVP$ | first-year running costs, "after launch, the money goes on people's time" | MAINT | software maintenance guide |
| GPT | 2nd paragraph of "Do you need Shopify...?" (required) | SHOP | whether to move to Shopify or build custom |
| GPT | MCP paragraph | AI | what an AI agent costs a small business |
| SAAS | after-launch section (required) | MAINT | software maintenance costs |
| PAY | COD-as-its-own-flow paragraph | COUR | courier API integration guide |
| SHOP | COD work in Bangladesh | COUR | courier booking from the order screen |
| MAINT | "Where you land inside the band" | AI | AI agent costs |
| MAINT | Integrations list item | COUR | courier integration guide |
| AI | planning figure for upkeep | MAINT | maintenance rule as for other custom software |
| AI | MCP section close | GPT | AI shopping assistants for online stores |
| VIBE | "Keep using the AI tools..." | MVP$ | what an MVP costs |
| COST | Technical complexity (required) | AI | AI agent costs for small businesses |
| COST | MVP H3 (required) | MVP$ | MVP development cost |
| COST | SaaS H3 (required) | SAAS | what a SaaS costs to build and run |
| COST | hidden-costs paragraph (required) | MAINT | what software maintenance costs per year |
| CHOOSE | new paragraph after the question list (required) | VIBE | production checklist for vibe-coded apps |
| TIME | closing budget paragraph, split in two (required) | MVP$, SAAS | MVP budget guide; SaaS development cost guide |

## 4. The SAAS maintenance fix (arithmetic)

**Before.**
- SAAS treated the 15–20% band as maintenance only. Hosting, tool plans and running costs were "on top".
- First year = $60,000 build + $9,000–$12,000 maintenance + $5,040 Stripe + $1,332 plan fees = $75,372–$78,372, shown as "about $75,400–$78,400".

**After (aligned to COST and MAINT).**
- The band covers maintenance plus the hosting and tool plans.
- Stripe's fees are a large, revenue-driven bill, so they get their own line, which is MAINT's rule for big usage-driven costs.
- Plan fees: $111 × 12 = $1,332, now counted inside the $9,000–$12,000 band.
- Stripe: $420 × 12 = $5,040, a separate line.
- First year: $60,000 + $9,000–$12,000 + $5,040 = $74,040–$77,040, shown as "roughly $74,000–$77,000".

**Text changed in SAAS:**
- TL;DR.
- The first H2 answer.
- The "Scale" row of the stage table.
- The after-launch answer, plus the new sentence linking MAINT.
- The first-year paragraph, which now shows the arithmetic.
- The total paragraph.
- The first-year chart's alt text.
- The takeaway.

## 5. Sameness fixes (closings, CTAs, intros, FAQs)

**Closing H2s.** These were "So what should you do first?" ×4 and "So where should you start?" ×3. They are now:

| Post | Closing H2 |
|---|---|
| AI | Which job should your first AI agent take on? |
| GPT | Which of these fixes pays off first? |
| COUR | What should you settle before anyone writes courier code? |
| MVP$ | Where should your first MVP dollar go? |
| PAY | Which payment setup should you launch with? |
| VIBE | What can you check in your app today? |
| WP | What can you do now if the move is a year away? |
| MAINT | How do you work out your own maintenance budget? (was "So what should you budget...", which echoed COST) |
| SAAS, SHOP | Unchanged (already distinct) |

No internal links point at heading anchors, so the TOC IDs can change safely.

**CTA cards.**

| Post | Change |
|---|---|
| AI | Title "Have one job you'd hand to an agent?"; text opens "Describe it in a sentence" |
| MVP$ | Title "How many build weeks is your MVP?"; new text; label "Check my MVP scope" |
| PAY | Title "Choosing between SSLCommerz and direct bKash?"; text reworded |
| SAAS | Title "Know your core workflow and how you'll charge?"; new text, no free-call promise |
| SHOP | Title "Which side of the line is your store on?"; text reworded |
| MAINT | Title "What would your software cost to keep healthy?"; text reworded |
| VIBE | Title "Which checks would your app fail?" |
| COUR | Label "Price a courier integration" |
| WP | Text opens "A URL is enough to start"; label "Get a migration estimate" |
| GPT | Unchanged |

What this fixed:
- Before, four titles opened "Not sure..." and several opened "Want...".
- "Get a fixed estimate" was the label on 4 cards; it is now only on COST.
- Six CTA texts opened "Send us"; now two do (GPT, VIBE).
- Every href is still /contact.

**Closing paragraphs.**
- 7 posts ended "[Book a 30-minute call] and bring X". COUR, SAAS, MAINT, VIBE and WP now use different sentences. AI and SHOP keep the original.
- 6 closings used "that's the work we do / that's what we do / that's what our X covers". AI, COUR, PAY and SHOP were reworded.
- COUR and PAY no longer share the anchor "e-commerce development for Bangladeshi brands".

**Intros.**
- "This guide is for..." appeared in 5 new posts. It is now gone from AI, COUR and SAAS.
- MAINT dropped "It's written for two readers", which echoed PAY's "This guide is for two people".
- GPT dropped "for a living", which COST and TIME also use.

**FAQs.**
- No two posts shared an identical question before or after this pass.
- Six template-shaped questions were reworded:

| Post | Before | After |
|---|---|---|
| SAAS | "Can I build a SaaS for under $50,000?" (matched MVP$'s "Can I build an MVP for under $10,000?") | "Is $50,000 enough to build a SaaS?" |
| SAAS | "How long does it take to build a SaaS MVP?" | "Is 8–14 weeks realistic for a SaaS MVP?" (answer leads with yes) |
| SAAS | "Who owns the code if Arrowbin builds my SaaS?" (echoed CHOOSE) | "What do I own at the end of an Arrowbin SaaS build?" |
| AI | "How long does it take to build a custom AI agent?" | "How quickly can a custom AI agent go live?" |
| MAINT | "How much does it cost to maintain a mobile app?" (echoed COST) | "Do mobile apps cost more to maintain than web apps?" (answer leads with "Usually") |
| SHOP | "Is a custom store faster than Shopify?" (echoed WP) | "Will a custom store load faster than a Shopify one?" |

**Other cross-post tells.**
- "2 a.m." appeared in 4 posts. It now stays only in MAINT's question list.
- Dates are now American format in all 13 posts ("October 15, 2026"; "Oct 15, 2026" in captions). Five posts used "15 October 2026".

## 6. Edits per post (brief)

- **SAAS:**
  - Maintenance alignment (section 4).
  - "a focused SaaS MVP is often around $60,000" became "comes to around $60,000 in our illustrative 14-week example", because the source is one illustrative example.
  - MAINT link.
  - CTA, intro, three FAQ questions and the booking sentence.
  - Dropped "at 2 a.m.".
  - Dates.
- **MVP$:**
  - Links to SAAS, VIBE (required) and MAINT.
  - CTA title, text and label.
  - Closing H2.
  - "at 2 a.m." became "out of hours".
- **VIBE:** MVP$ link; CTA title; closing H2; closing sentence; 1 date.
- **AI:**
  - Intro opener.
  - Links to MAINT and GPT.
  - CTA title and text.
  - Closing H2 and the closing paragraph's first sentence.
  - One FAQ question.
  - Dates.
- **GPT:**
  - Links to SHOP (required) and AI. Closing H2.
  - "I couldn't load that merchant page from here" became "wouldn't load for us when we checked on October 15".
  - The L effort scale now matches VIBE.
  - Takeaway softened to what the source shows: "in Vercel's 2024 crawler study, ChatGPT's and Claude's crawlers didn't run JavaScript", where it used to be a present-tense absolute.
- **COUR:** Intro reworded; CTA label; closing H2; closing paragraph and booking sentence; dates.
- **WP:** Links to PAY (required), SHOP and GPT; CTA text and label; closing H2; booking sentence.
- **SHOP:**
  - COUR link.
  - Silent Lifestyle BD contradiction fixed.
  - SSLCommerz Shopify app sentence.
  - "301" became "permanent (301 or 308)".
  - "2am alert" became "paged".
  - CTA title and text; one FAQ question; closing paragraph.
- **PAY:** COUR link; CTA title and text; closing H2; closing paragraph; dates.
- **MAINT:**
  - TL;DR cut from 4 sentences (about 120 words) to 3. The dropped sentence is still in the body.
  - Intro line removed.
  - Links to AI and COUR.
  - CTA title and text; closing H2; booking sentence; one FAQ.
- **COST:**
  - Excerpt "Here's what drives..." became "See what drives...".
  - Four required links (AI, MVP$, SAAS, MAINT).
  - "Future features" clarified as a separate budget.
- **CHOOSE:**
  - New paragraph after the question list: ask how they'd audit an AI-built prototype, with a link to VIBE.
  - "highest-leverage" became "biggest calls" (banned word).
- **TIME:**
  - Closing budget paragraph split in two, with links to MVP$ and SAAS.
  - Two "Here's how" openers reworded.

All external links are unchanged.

## 7. SVGs that now disagree with their post (lead to fix; SVGs are not mine)

- **`public/blog/saas-development-cost/first-year-cost.svg`.** It still shows the plan fees as a separate segment ("Plan fees: $1,332", "12 months × $111 for hosting and tooling, before usage") and "Total: about $75,400–$78,400". Suggested fix:
  - Fold the plan-fee segment into the maintenance segment.
  - Relabel that segment "Maintenance, hosting and tools: $9,000–$12,000".
  - Sub-label: "15–20% of the build cost a year, including $1,332 of plan fees (Arrowbin estimate)".
  - Change the total to "Total: about $74,000–$77,000".
  - The Stripe segment ($5,040) stays as is.
  - The post's alt text already describes the corrected chart.
- **`saas-development-cost/build-stages.svg`.** The footnote "Running costs and maintenance are extra" is still true, because it means extra to the build cost. No change needed.
- **Optional, cosmetic.** 14 SVGs print dates as "15 Oct 2026" or "15 October 2026", while post text is now American format:
  - AI: `model-fees-worked-example`, `model-price-jumps`.
  - COUR: `cod-reconciliation`, `order-status-state-machine`, `order-to-consignment-sequence`.
  - PAY: five charts.
  - SAAS: three charts.
  - VIBE: `lovable-rls-scan`.

## 8. Outside my files (for the lead)

- **`src/lib/portfolio.ts`.** The Silent Lifestyle BD blurb says "rather than card checkout", but the live footer (checked by W3) lists Card.
- **`src/lib/services.ts`.** Price and timeline conflicts F3, F5 and F9.
- **`src/lib/blog.ts` and the AI-tells linter.** The triplet WARN still fires, at 11.5 per 1k words against a threshold of 4.
  - It was there before this pass: 85 triplets before, 85 after.
  - It comes from the three core guides' lists, alt texts and image prompts. Clearing it would mean rewriting most of those guides, which this pass rules out.
  - I fixed the other two WARNs in `blog.ts`: the banned word ("highest-leverage") and three "Here's how/what" formulas.

## 9. Checks run (final state)

- **`python -I docs/seo/13-sprint-2026-10-15/tools/ai_tells.py`** on all 10 post files: no WARN or HARD. On `blog.ts`, only the triplet WARN described in section 8.
- **`pnpm tsc --noEmit -p .`:** exit 0.
- **`pnpm biome check --write`** on the 11 changed files: clean.
- **A grep for the em dash character (U+2014)** on the 11 changed files and on this report: nothing.
- **Script checks on all 13 posts:**
  - No duplicate block text within a post.
  - No identical FAQ question across posts.
  - At most 2 links per paragraph or list item.
  - No links in headings, TL;DRs, takeaways or FAQs.
