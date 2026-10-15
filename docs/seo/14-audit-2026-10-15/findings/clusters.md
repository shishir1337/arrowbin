# Topic clusters, cannibalisation and internal links (re-audit, 15 Oct 2026)

**Area:** semantic clustering, hub and spoke, cannibalisation, next content, internal links.
**Measured on:** the local build at http://localhost:3117 for rendered links (service pages, all 13 post pages, home, blog index, sitemap). Source files read: `src/lib/blog.ts`, `src/lib/posts/*.ts`, `src/lib/services.ts` (`serviceExtras.relatedPosts`), `src/components/services/ServiceProof.tsx`. Live arrowbin.com (build 959866d) was not measured; it has none of the sprint posts.
**Baseline:** `docs/seo/12-audit-2026-10-14/` (3 posts; FIX-PLAN P2.7 said 6 of 8 service pages had no inbound link from the blog).

## Score

**Clusters and internal linking: 64 / 100.** 14 Oct: not scored in the baseline report. My retrospective estimate for that state is about 20 (3 posts, 6 of 8 service pages with zero blog inbound). Treat both numbers as judgment, not measurement.

Why 64 and not higher:
- Link graph is healthy for 13 posts (every post has 3+ body inbound links, every post links to a service page, every service page now shows 2 to 3 guide cards).
- The graph is built around the cost guide, not around hubs: 5 of 8 hubs have no topical spoke of their own, the Bangladesh e-commerce cluster has no hub page, and the courier post has no hub card.
- Three real cannibalisation edges exist inside the existing set (TIME vs MVP$, the Shopify-in-Bangladesh keyword split across PAY, SHOP and COUR, and the hub numbers disagreeing with the spokes).
- Four planned pages in the content plan would cannibalise existing posts if built as written.

## Method and limits

- **SERP overlap.** I ran 8 WebSearch queries on 15 Oct 2026 (US). The tool returns 8 to 10 results per query, with some duplicate URL variants, so it approximates Google page one; it is not a rank tracker. I compared exact URLs, then domains. Only these 8 queries were run (the lead capped web searches), so most of the 78 possible post pairs are not measured; where I rely on the 29 Sep `03-serp` data or on keyword lists instead, the table says so.
- **Volumes are not measured** anywhere in this file (same limit as the sprint's `topic-research.md`). "Winnable" means the visible results are weak or off-intent, judged from the results, not from volume or backlink data.
- Post abbreviations follow `editor-report.md`: COST, CHOOSE, TIME, AI, GPT, COUR, MVP$, PAY, SAAS, SHOP, MAINT, VIBE, WP.
- I did not edit any file, build, or touch git or servers.

## What works

- The body link matrix in `editor-report.md` section 3 is accurate. I re-extracted every `[anchor](/path)` from all 13 files and it matches cell for cell.
- Every post links to at least one service page; COST links to all 8. No post has an orphan state: body inbound is 3 to 8 for every post, plus hub-card and auto-related links (table below).
- The "Read before you build" cards render on all 8 service pages in the :3117 HTML (2 or 3 guide links each), so the hub to spoke direction exists on the page, not just in data.
- The sprint folded the right topics instead of splitting them: `vibe-coding-vs-hiring-a-developer` into VIBE, `nextjs-vs-wordpress` into WP, MCP into AI and GPT, `ai-agent-development-cost` skipped. Those are all confirmed as correct decisions below.
- Exact-URL overlap between all 8 measured SERPs is 0 (28 pairs). By the methodology thresholds (7 to 10 same post, 4 to 6 same cluster, 2 to 3 interlink, 0 to 1 separate), none of the measured posts should be merged, and the posts that were split (COST / MVP$ / SAAS / MAINT / TIME) were split correctly.
- Sitemap lists 13 posts plus `/blog` (14 blog URLs).

---

## 1. Hub and spoke map (as built on :3117)

### 1a. Service hub to guides (rendered "Read before you build" cards) and posts that link back

| Hub (service page) | Cards on the hub page | Posts whose body links to the hub | Topical spokes that fit the hub | Gap |
|---|---|---|---|---|
| `/services/custom-software-development` | VIBE, COST, CHOOSE | COST, CHOOSE, AI, GPT, COUR, MVP$, VIBE, WP (8) | COST (pillar), CHOOSE, VIBE | Healthy. Hub for the cost cluster. |
| `/services/ecommerce-development` | SHOP, PAY | COST, GPT, COUR, PAY, SHOP, WP (6) | SHOP, PAY, COUR, GPT, WP | COUR has no card; GPT and WP are e-commerce posts but sit on other hubs' cards. |
| `/services/mobile-app-development` | MVP$, TIME | COST, TIME, MVP$ (3) | none mobile-specific | Generic cards only. Very High difficulty head terms; leave until proof exists. |
| `/services/saas-product-engineering` | SAAS, MVP$, TIME | COST, TIME, MVP$, SAAS (4) | SAAS, MVP$, TIME | Healthy. |
| `/services/ui-ux-design` | CHOOSE, TIME | COST, CHOOSE, TIME (3) | none | Neither card is about design. First real spoke should be mvp-vs-prototype (item 1 below). |
| `/services/ai-automation` | AI, GPT | COST, TIME, AI, GPT (4) | AI, GPT | Only cost and commerce; no "what can an agent do for a small shop" informational spoke (item 3). |
| `/services/cloud-devops-hosting` | VIBE, WP | COST, CHOOSE, GPT, SAAS, VIBE, WP, MAINT (7) | WP, VIBE | Healthy. |
| `/services/maintenance-support` | MAINT, WP | COST, CHOOSE, AI, COUR, PAY, VIBE, WP, MAINT (8) | MAINT | Healthy. |

### 1b. Clusters as they actually behave

| Cluster | Hub | Pillar-style post | Spokes | State |
|---|---|---|---|---|
| Cost, timeline and choosing a builder | custom-software-development, saas-product-engineering, mobile-app-development | COST (8 body inbound, links to all 8 hubs) | MVP$, SAAS, TIME, MAINT, CHOOSE, AI (cost side) | Strongest. No pricing or calculator destination yet. |
| E-commerce and Bangladesh | ecommerce-development (no Bangladesh hub page) | none | SHOP, PAY, COUR, GPT, WP | Posts are good; hub is the generic service page, so "Bangladeshi brands" anchors point at a page that is not about Bangladesh. |
| AI | ai-automation | none | AI, GPT | Two spokes, both bottom of funnel (cost, commerce feed). |
| Platform and upkeep | cloud-devops-hosting, maintenance-support | none | WP, VIBE, MAINT | WP and VIBE have no commercial page of their own to land on. |
| Design | ui-ux-design | none | none | Empty. Directory-dominated SERP (`03-serp`), so an empty spoke is acceptable but the cards are mismatched. |

MAINT is the "after launch" spoke of every cluster and is correctly linked from COST, MVP$, SAAS and AI.

### 1c. Inbound links per post

| Post | Body links in (editorial) | Hub cards in | Auto "related" links in (not in body) | Note |
|---|---|---|---|---|
| COST | 8 | 1 | 0 | Pillar. |
| CHOOSE | 4 | 2 | 2 | |
| TIME | 4 | 3 | 1 | |
| AI | 3 | 1 | 1 | |
| GPT | 3 | 1 | 4 | Auto-related over-picks GPT (see C-9). |
| COUR | 3 | **0** | 1 | Only post with no hub card. |
| MVP$ | 4 | 2 | 1 | |
| PAY | 4 | 1 | 1 | |
| SAAS | 3 | 1 | 1 | |
| SHOP | 3 | 1 | 2 | |
| MAINT | 4 | 1 | 2 | |
| VIBE | 3 | 2 | 0 | |
| WP | 4 | 2 | 1 | |

Home links only to `/blog` (3 anchors), not to any single guide. Blog index lists all 13.

---

## 2. SERP overlap results (queries run 15 Oct 2026)

| Query (stands for post) | Results seen (domains) |
|---|---|
| mvp development cost (MVP$) | softteco, empat, raftlabs, netguru (`/blog/mvp-costs`), gurutechnolabs, cmarix, codica |
| saas development cost (SAAS) | auxanoglobalservices, saigontechnology, prioxis, acropolium, sigosoft, techvify, aglowiditsolutions |
| how much does custom software development cost (COST) | intetics, smarttek, gurutechnolabs (`/custom-software-development-cost`), nextpit forum, synodus, planeks, mobibean, kindgeek, jbs.live |
| how long does it take to build an mvp (TIME) | netguru (`/blog/mvp-timeline`), upsilonit, pragmaticcoders (a "how long and how much" page, two URLs), altar.io, thisisglance, wavect (`/mvp-timeline-benchmark-2026/`), asperbrothers, weareaffective |
| software maintenance cost per year (MAINT) | wavect (`/software-maintenance-cost-benchmark-dach-saas/`), aquaveo (a service page), codestringers, valentin-software, unican.es (course PDF), walkme, axented, mecanik |
| app development cost in bangladesh (candidate) | bdstall (3 marketplace listings), abbacustechnologies, engineerbabu (India), clutch.co/bd, goodfirms, superbcompanies |
| mvp vs prototype vs poc (candidate) | synodus, uxpin, goodreads blog, nomtek, softwaremind, rishabhsoft, program-ace |
| ai automation for small business (candidate) | bika.ai, dev.to, bushe.co, adventuremedia.ai (2 URLs), softileo, a notion.site page, a lovable.app subdomain, an is-a.dev personal blog |

**Pairwise result (28 pairs among these 8 queries): shared exact URLs = 0 in every pair.** Domain-level overlap, which is the only signal other than topic:

| Pair | Shared domain | Reading |
|---|---|---|
| MVP$ vs TIME | netguru (cost page vs timeline page) | Same site ranks separate pages for adjacent intents. Supports two posts. |
| MVP$ vs COST | gurutechnolabs (MVP cost page vs custom cost page) | Same. |
| TIME vs MAINT | wavect (timeline benchmark vs maintenance benchmark) | A site with data on both ranks on both. Supports a data-led cluster. |
| COST vs mvp-vs-prototype | synodus | Same. |

Threshold outcome: every measured pair scores 0 to 1, so "separate". **No pair reaches 4 to 6 ("same cluster") or 2 to 3 ("interlink").** The clusters in section 1b are therefore topical and hub-based groupings, not SERP-overlap groupings. That is expected for posts that were deliberately given distinct primary keywords, but it means the 4-overlap rule in the cluster methodology cannot be used as evidence for these groupings.

Not measured (no search budget left): AI vs GPT, PAY vs SHOP vs COUR, WP vs SHOP, CHOOSE vs COST, VIBE vs CHOOSE, and every candidate against the service-page queries. Where the table below says "unmeasured", run the pairwise check before writing.

Mixed intent worth noting: the TIME query returns pragmaticcoders' "how long and how much does it take to build an MVP", and the maintenance query returns a service page (aquaveo) beside cost guides. So "time" SERPs reward some cost content and "cost" SERPs tolerate service pages. That justifies a cost FAQ in TIME and keeps cost words off service-page titles, but it also means TIME and MVP$ are the nearest pair (C-1).

---

## 3. Cannibalisation findings

| ID | Severity | Pair | Evidence | Fix | Owner | Visual sign-off |
|---|---|---|---|---|---|---|
| C-1 | Medium | TIME vs MVP$ | Both answer "how long and how much" for an MVP. TIME has the H2 "MVP vs prototype vs full product: how do timelines compare?", the FAQ "How much does it cost to build an MVP?" and a "standard MVP" price of $30,000 to $90,000 (founder item F2) while MVP$ owns cost at $40,000 to $120,000. The two SERPs share 0 URLs but one site (netguru) ranks a page for each, so Google will happily show two pages from one site. | TIME keeps time only: shorten the cost FAQ to one sentence plus a link to MVP$; MVP$ keeps only a time column and links to TIME (it already does). Settle F2 so the two numbers cannot disagree. | dev (text), founder for F2 | no |
| C-2 | Medium | TIME against itself and the cost cluster | TIME's worked-example H2 says "a typical 12-week SaaS MVP" (and its chart alt says 12 weeks) but the same post's earlier timeline section says "a typical 14-week SaaS MVP" and COST, MVP$, SAAS and MAINT all use the $60,000, about 14 week example. Not on the editor's F-list. | Make the worked example 14 weeks (and fix the alt text and the chart), or label it a different example. | dev (text and SVG check) | no (text); yes if the chart image changes |
| C-3 | Medium | PAY vs SHOP vs COUR | Each carries a Shopify plus Bangladesh keyword: PAY "shopify payment gateway bangladesh", SHOP "shopify in bangladesh" and "shopify transaction fees third party payment", COUR "shopify courier app bangladesh". Unmeasured, but three posts on one sub-topic is the likeliest place two URLs will fight. PAY also does not link to SHOP. | Name one owner per query: SHOP owns "shopify in bangladesh", PAY owns "payment gateway" (with a Shopify section that links to SHOP), COUR owns "courier". Drop the other two keywords from the metadata `keywords` of the non-owner posts. Add the missing PAY to SHOP link (L-1 below). Run a pairwise check on the three queries. | dev | no |
| C-4 | Medium | Hub numbers vs spoke numbers | The cost guide, TIME FAQ and `services.ts` still quote different prices and timelines (editor items F1, F2, F3, F5). Not re-raised here as a new decision; listed because a hub that disagrees with its own spokes weakens the whole cost cluster for both readers and answer engines. | Founder to settle F1 / F2 / F3 / F5, then align `services.ts`. | founder, then dev | no |
| C-5 | Medium | Planned `ecommerce-website-cost-bangladesh` blog vs planned `/ecommerce-website-development-bangladesh` landing page | `05-keyword-map` lists "ecommerce website cost in bangladesh" and "ecommerce website development cost in bangladesh" as secondary keywords of the landing page. `topic-research.md` scores the same phrase as its own parked blog post. Two URLs, one query. | Build one page (the landing page, with the price table inside). Only split a blog post later if a pairwise SERP check shows 3 or fewer shared URLs. | founder (prices), dev | yes (new page) |
| C-6 | Low | AI vs ai-automation service page vs planned `ai-automation-for-small-business` | `keyword-map.md` tells the service page to add n8n, chatbot and AI-agent sections. AI post keywords include "ai agent for small business", "n8n ai agent cost". The planned post's primary is close to the first of those. | Service page owns "ai automation agency" and "ai agent development company". AI post owns every "cost" and "n8n ai agent cost" variant. The new post owns "ai automation for small business" and should not reuse "ai agent for small business" (remove it from the new post's keywords). | dev | no |
| C-7 | Low | Planned content-plan pages that overlap existing sections | `fixed-price-vs-time-and-materials` overlaps COST's H2 "Fixed price vs time & materials: which costs less?" and FAQ. `custom-software-vs-off-the-shelf` overlaps COST's FAQ "Is custom software cheaper than off-the-shelf?". `agency-vs-freelancer` overlaps CHOOSE's H2 and FAQ. `mvp-vs-prototype-vs-poc` overlaps TIME's H2 and FAQ. `web-app-development-cost` and `app-development-cost` overlap COST and SAAS. `bangladesh-ecommerce-integrations` is now fully covered by PAY plus COUR. | Rule when writing any of these: cut the old section to 2 or 3 sentences with a link to the new post in the same pass. Do not write `bangladesh-ecommerce-integrations`, `web-app-development-cost` or `app-development-cost` at all. | dev | no |
| C-8 | Low | Post vs service-page titles | SAAS "From MVP to Full Platform" vs service "From MVP to Scale"; MAINT "Cost Per Year" vs service "Software Maintenance & Support Services". The 29 Sep SERP data and the maintenance query above show different result types (service pages and directories vs cost guides), so intent differs. | Keep as is. Keep "cost" out of service-page titles and H1s. | none | no |
| C-9 | Low | Auto "related posts" block | `relatedPosts()` ranks by same category (+3) then shared topic words. It shows GPT (E-commerce) as a neighbour of TIME, VIBE and COUR, and gives GPT 4 auto inbound links, because category weighting beats topic fit. These links sit outside the body, so they do not replace editorial links, but they are the links a reader sees last. | Add an optional `related?: string[]` override to `Post` and set it for VIBE, TIME, COUR. Not urgent. | dev | no |
| C-10 | Info | Pairs confirmed safe by evidence | COST vs MVP$ vs SAAS vs MAINT vs TIME have 0 shared URLs in the measured SERPs. VIBE and WP fold-ins (vibe vs hiring, next.js vs wordpress) were the right call: no separate SERP was needed. | Keep the five-way split. | none | no |

Post vs service-page check (the other half of task 2):
- `custom-software-development` ("custom software development company", commercial, High) vs COST and CHOOSE: SERP types differ (agency service pages and listicles vs cost guides and checklists). Safe.
- `ecommerce-development`, `saas-product-engineering`, `ai-automation`, `maintenance-support` vs their cost posts: same reading. Safe as long as service pages avoid "cost" in title and H1.
- Home: not re-checked here; the 14 Oct audit covers the title retarget.

---

## 4. The next 10 posts or pages, in priority order

Selection rules: Low or Medium difficulty in `03-serp`, results that are small agencies, marketplaces or off-intent, a real hub to link into, and no overlap with a section that is already published. Items that need the founder are marked and are placed where the unblocked work runs out. Volumes are not measured.

| # | Page | Primary keyword | SERP-overlap cluster (evidence) | Target hub | Why now | Blocked on |
|---|---|---|---|---|---|---|
| 1 | `/blog/mvp-vs-prototype-vs-poc` (1,200 to 1,800 words, table-led) | mvp vs prototype (vs poc) | Product / MVP. Measured: 0 shared URLs and 0 shared domains with the MVP cost and MVP timeline SERPs. Separate post, interlink with MVP$, TIME, VIBE. Results are mid-size agency blogs plus uxpin (Medium). | `ui-ux-design` (first real spoke), `saas-product-engineering` | No founder input. Gives the empty UI/UX hub a topical card, and turns VIBE's "AI-built prototype" idea into a comparison table answer engines can quote. Trim TIME's H2 and FAQ on the same question to a link (C-7). | none |
| 2 | `/blog/app-development-cost-bangladesh` | app development cost in bangladesh | Cost plus Bangladesh bridge. Measured: 0 shared URLs with every other measured SERP. Results today are marketplace listings (bdstall), vendor pages and directories; no editorial cost guide with sources. | `mobile-app-development`, `custom-software-development` | The only unbuilt piece that connects the cost cluster to the Bangladesh cluster, in a SERP with no strong editorial page. Use COST's published USD bands and dated, cited market rates; add BDT only from a dated FX source. | none for USD; founder for any BDT package prices |
| 3 | `/blog/ai-automation-for-small-business` | ai automation for small business | AI. Measured: the results (dev.to, a notion page, a lovable.app subdomain, a personal blog) are very weak and none covers cost. AI vs this query is unmeasured; run it. | `ai-automation` | AI hub has only bottom-of-funnel spokes. This is the "what can it do for us, which job first" post that feeds AI, GPT and the service page. `03-serp` rates it Low-Medium. Remove "ai agent for small business" from the new post's keywords (C-6). | none |
| 4 | WordPress to Next.js migration landing page (`/services/nextjs-development` per `keyword-map.md` P2) | nextjs development agency / wordpress to next.js migration service | Platform. WP post is the informational twin. SERP for "nextjs development agency" is small specialist agencies plus listicles (Medium, `03-serp`). Pairwise against the WP query is unmeasured; run it first. | itself (new commercial hub for WP) | WP is the post Arrowbin can prove best (every live portfolio site) yet it has no page that sells the migration; it links to four generic service pages. Keep the page about the service and leave "steps, SEO, redirects" to WP. | none for copy; dev build; visual sign-off |
| 5 | `/blog/software-developer-rates-by-country` (data asset) | software development hourly rates by country | Cost / Bangladesh. `03-serp`: vendor data tables (Medium). Not measured today. | `custom-software-development` | The only item on the list that can earn referring domains, which a 2-domain site needs for every other ranking to move. COST's "$25 to $180 an hour by region (Arrowbin estimate)" table should link to it and shrink to a summary. Needs sourced rates (Clutch filters, public surveys) and a methodology section. | research time |
| 6 | `/offshore-software-development-bangladesh` | offshore software development bangladesh | Bangladesh (offshore). `03-serp`: Low; small BD agency blogs, no directories; 82 mapped keywords. | itself (links to `custom-software-development`) | Biggest mapped keyword set among the unbuilt pages and the lowest difficulty. Do not also write an outsourcing blog (`topic-research.md` already ruled that out). | founder: verify the Florida LLC is active (content plan 3.1) and agree how much to say about the offices (standing rule) |
| 7 | `/ecommerce-website-development-bangladesh` (price table inside, no separate cost blog, see C-5) | ecommerce website development company in bangladesh | E-commerce / Bangladesh. `03-serp`: Low-Medium; local package pages and one generic agency page. | itself (becomes the Bangladesh e-commerce hub for SHOP, PAY, COUR) | PAY and COUR already use the anchor "e-commerce development for Bangladeshi brands" and point at the generic service page. A real Bangladesh hub turns three good posts into a cluster. | founder: real prices (sprint rule 4), which gateway and courier sit behind each live store |
| 8 | Vibe-coded app production audit page (working URL `/services/vibe-code-audit`) | lovable to production / vibe code cleanup | Platform. `gap-analysis.md` gap 8 and `topic-research.md` section A: Redwerk, CodeConductor, Tepesoft, Sourcetoad and gig listings are service pages, so this is the commercial twin of VIBE. Unmeasured; run a pairwise check against VIBE's query so the page does not take "production ready". | `custom-software-development` card, `maintenance-support` | Strongest 2026 trend in the sprint research, and VIBE's CTA already offers a read-only review that has no page behind it. | founder: confirm the offer exists and whether it is free (F8) |
| 9 | `/pricing` plus `/tools/software-cost-calculator` | software development pricing / software development cost calculator | Cost. `gap-analysis.md` gap 1: calculators are gated behind forms, ours would not be. | all cost posts link to it | Five cost posts have only `/contact` as their conversion target. This is the cost cluster's missing hub. It cannot ship while F1, F2, F3 and F5 disagree. Move to the top of the list the day those are settled. | founder: F1 / F2 / F3 / F5 |
| 10 | `/blog/fixed-price-vs-time-and-materials` | fixed price vs time and materials software development | Cost / choosing a builder. `03-serp`: Medium; vendor comparison guides. COST holds an H2 on the same question (C-7). | `custom-software-development` | Forces the free-call vs paid-discovery answer (F4) to be written once, in the right place, and lets COST drop a section it duplicates. | founder: F4 |

**Do not write (cannibalise or fold):** `bangladesh-ecommerce-integrations` (PAY + COUR), `web-app-development-cost` and `app-development-cost` (COST + SAAS; head term is Very High), `ecommerce-website-cost-bangladesh` as a blog (C-5), `nextjs-vs-wordpress`, `vibe-coding-vs-hiring-a-developer`, `ai-agent-development-cost` head term, an outsourcing-to-Bangladesh blog (page 6 owns it).

**Next after these ten (11 to 14):** `custom-software-vs-off-the-shelf` (Medium; trim COST's FAQ), `staff-augmentation-vs-dedicated-team` (Low difficulty but its natural hub `/services/dedicated-development-team` does not exist and `keyword-map.md` doubts the motion fits), `offshore-vs-nearshore-vs-onshore`, `/software-development-tampa-bay` (after the GBP-eligibility check in `08-local`).

When each item ships, give it 3 inbound body links from existing posts in the same pass (content plan rule). Suggested sources: item 1 from TIME, MVP$, VIBE; item 2 from COST, SAAS, PAY; item 3 from AI, GPT, COST; item 4 from WP, MAINT, SHOP; item 5 from COST, CHOOSE, item 2; item 6 from COST, CHOOSE, PAY; item 7 from PAY, COUR, SHOP (re-point the existing "Bangladeshi brands" anchors); item 8 from VIBE, CHOOSE, MAINT; item 9 from COST, MVP$, SAAS, MAINT, AI; item 10 from COST, CHOOSE.

---

## 5. Missing internal links (existing pages)

Editor rules observed: at most 2 links per paragraph or list item, none in headings, TL;DR, takeaways or FAQs, and each anchor below differs from every existing anchor to the same target. "Where" names the passage to attach it to; if the passage has already been rewritten, use the nearest equivalent.

### 5a. Post to post

| ID | From | To | Where | Suggested anchor | Why |
|---|---|---|---|---|---|
| L-1 | PAY | SHOP | The paragraph on Shopify not having Shopify Payments in Bangladesh | whether Shopify suits a Bangladeshi store | Reverse of the existing SHOP to PAY link; fixes C-3. |
| L-2 | SHOP | MAINT | Where SHOP cites the 15 to 20% yearly ownership figure | what keeping a store running costs each year | SHOP quotes the maintenance band but never links the guide that explains it. |
| L-3 | WP | MAINT | Next to the existing "keep the new site patched" service link | the yearly upkeep budget after the move | MAINT already links WP; the return link is missing. |
| L-4 | CHOOSE | MAINT | The "ongoing maintenance and support" paragraph (currently service-page link only) | what a fair maintenance plan should cost | Vendor-selection readers need the price check. |
| L-5 | COUR | MAINT | The "keeping integrations working" paragraph | what integration upkeep costs per year | MAINT links COUR in its integrations list; the reverse is missing. |
| L-6 | PAY | MAINT | The "monitoring and fixing payment issues after launch" paragraph | budgeting for gateway upkeep | Same pattern as L-5. |
| L-7 | VIBE | MAINT | After the checklist, where the post says the cleaned-up app still needs care | the ongoing cost of owning cleaned-up code | MAINT links VIBE; the reverse is missing. |
| L-8 | MAINT | SAAS | The SaaS row of the stage table or the "saas maintenance cost" passage | how SaaS running costs add up | MAINT targets "saas maintenance cost"; SAAS owns the SaaS-specific number. |
| L-9 | SAAS | TIME | The sentence that says 8 to 14 weeks is realistic | the week-by-week MVP timeline | SAAS cites timelines without linking the timeline post. |
| L-10 | TIME | VIBE | The prototype or "how can you launch faster" section | what separates an AI-built prototype from a launch-ready MVP | VIBE links TIME; the reverse is missing, and it captures founders arriving with a prototype. |
| L-11 | TIME | AI | Next to the existing "AI features" service link | what an AI agent adds to the budget | TIME is the only cost or timeline guide that mentions AI features without linking the AI cost guide. |
| L-12 | COST | SHOP | The "online store or marketplace" passage | Shopify against a custom store | COST links the e-commerce service page but not the e-commerce cost comparison. |
| L-13 | VIBE | SAAS | Where VIBE discusses Supabase, Stripe and multi-tenant data | what a production SaaS costs to run | Most AI-built apps are SaaS-shaped; SAAS has no VIBE inbound. |
| L-14 | COUR | WP | Where COUR discusses WooCommerce courier plugins | when a WooCommerce plugin stack is worth replacing | WP is the destination for stores outgrowing plugins; COUR does not point there. |
| L-15 | AI | MVP$ | The prototype-then-production passage (agent built as a first version) | budgeting a first version before the full build | Connects the AI cluster to the product cluster. Optional. |

Result: after L-1 to L-15 the editorial body inbound counts become COST 8, MAINT 10, TIME 5, MVP$ 5, SAAS 5, SHOP 5, WP 5, CHOOSE 4, AI 4, PAY 4, VIBE 4, GPT 3, COUR 3. GPT and COUR stay at 3 because no natural passage exists in the other 12 posts; their fourth link should come from the new pages (GPT from item 3, COUR from items 2 and 7), and COUR also gains its hub card in H-1.

### 5b. Hub cards and service pages (`src/lib/services.ts`, `serviceExtras.relatedPosts`)

| ID | Change | Why | Visual sign-off |
|---|---|---|---|
| H-1 | `ecommerce-development`: set `relatedPosts` to SHOP, PAY, COUR (3 cards). | COUR is the only post with no hub card; 3 cards also fill the `xl:grid-cols-3` row, 2 cards leave a gap. | yes (card count changes) |
| H-2 | `ui-ux-design`: replace CHOOSE and TIME with mvp-vs-prototype (item 1) once it exists, keep one of the two as a second card. | Today's cards are off-topic for the hub. | yes |
| H-3 | When item 7 (Bangladesh e-commerce hub) ships, re-point the PAY and COUR anchor "e-commerce development for Bangladeshi brands" from the generic service page to it. Same for any future Bangladesh mentions. | Keeps the Bangladesh cluster on one hub. | no |
| H-4 | Service FAQ and `answer` text: add one contextual link per service to its pillar guide (custom software to COST, SaaS to SAAS, AI to AI, maintenance to MAINT, e-commerce to SHOP). Check first that FAQ answers can render links; today the only blog links on the service pages are the cards (I found no `/blog` href outside them in the HTML). | A card is a thumbnail link; a sentence-level link carries topical context. | yes if layout changes, no if plain text links |
| H-5 | Home: add one in-copy link to COST or the blog's best guide. | Home links only to `/blog` (3 anchors). | no |

Other small items:
- L-16 (optional, founder-fact gated): COUR and SHOP to `/work`, anchored differently from PAY's "Bangladeshi stores we have rebuilt". Only add if the founder confirms which gateways and couriers sit behind the live stores; do not imply courier work the portfolio has not shown.
- Category labels: "Guides" now covers COST, CHOOSE, MAINT and WP, while AI and VIBE are one-post categories. The related block weights category, so consider giving WP and MAINT their own label or merging AI and VIBE into one. Low.

---

## 6. Founder-gated (not re-raised as new findings)

From `editor-report.md`: F1, F2, F3, F5 (hub and spoke numbers, blocks item 9), F4 (blocks item 10), F8 (blocks item 8). New for this area: Bangladesh price ranges and which gateway and courier sit behind each live store (blocks item 7), LLC verification and how much to say about offices (blocks item 6), BDT package prices (item 2, optional).

## Summary

The 13 posts form a sound set: the body link matrix matches the editor's report, every post links to a service page, all 8 service pages now show 2 to 3 guide cards in the :3117 HTML, and the eight SERPs I could measure share no exact URL (0 of 28 pairs), so the cost, MVP, SaaS and maintenance posts are correctly separate rather than competing. The structure is thinner than it looks: only the cost cluster has a real pillar, the Bangladesh e-commerce posts have no Bangladesh hub, the courier post has no hub card, the UI/UX and mobile hubs have no topical spoke, and WP and VIBE have no commercial page to land on. The cannibalisation risks that matter are inside the set: TIME vs MVP$ on "how long and how much" (and TIME's 12-week vs 14-week example), the Shopify-in-Bangladesh keyword split across PAY, SHOP and COUR, hub numbers that still disagree with spokes, and four content-plan pages that would duplicate existing sections (fixed-price vs T&M, off-the-shelf, agency vs freelancer, mvp vs prototype) unless the old sections are trimmed in the same pass. The next ten, in order: mvp-vs-prototype-vs-poc, app-development-cost-bangladesh, ai-automation-for-small-business, a WordPress to Next.js migration service page, a sourced developer-rates data asset (the only link-earner), the offshore Bangladesh page, the Bangladesh e-commerce hub, a vibe-code audit page, /pricing with a calculator, and fixed-price vs time and materials, with the last five waiting on founder decisions or research. Fifteen post-to-post links and five hub or service-page changes (section 5) would lift 11 of 13 posts to 4 or more editorial inbound links (GPT and COUR stay at 3 until the new pages ship) and put COUR on a hub. Volumes were not measured, only 8 SERPs were checked, and the candidate pairs marked unmeasured need a pairwise check before writing.
