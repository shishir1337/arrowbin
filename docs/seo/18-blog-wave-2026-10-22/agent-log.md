# Agent log, blog wave 22 October 2026

Writer reports, one section per post. Append only.

## headless-commerce

**Files written (all new, nothing else touched)**
- `src/lib/posts/headless-commerce.ts`: the post. Title "Headless Commerce: Is It Worth It for Your Store in 2026?" (57 characters). Category "E-commerce". Date 2026-10-22, 14 min read.
- `public/blog/headless-commerce/`: `cover.svg` + `cover.webp` (37 KB), and six charts:
  - `headless-vs-traditional.svg`
  - `what-moves-to-you.svg`
  - `monthly-software-bill.svg`
  - `headless-options.svg`
  - `seo-safeguards.svg`
  - `headless-decision-tree.svg`

  All are 1280x720, on the brand palette with no green, and each is under 15 KB. Every one was rendered with sharp and checked.
- `docs/seo/18-blog-wave-2026-10-22/briefs/headless-commerce.md`: SERP check, angle, source list.

**Checks**
- Body: 3,116 words, 10 question H2s (the last is the closing "So what should you do first?"), one cta block (to /contact), 8 FAQs, 7 takeaways.
- `pnpm tsc --noEmit -p .` exits 0.
- Biome is clean.
- Zero em dashes in my files.
- ai_tells.py shows no HARD or WARN lines: sd 9.9, 20% short sentences, 1.0 triplets per 1k words, 19.6 contractions per 1k words.

**Keywords**
- Primary: headless commerce (question angle: is headless commerce worth it).
- Secondary: is headless commerce worth it, what is headless commerce, headless commerce pros and cons, headless shopify, headless commerce cost, headless woocommerce, composable commerce.

**SERP summary (22 Oct 2026)**
- **"headless commerce" and "what is headless commerce":** definitions and vendor guides (Wikipedia, TechTarget, Salesforce, Pimcore, glossaries).
- **"is headless commerce worth it" and its cost variants:** agency and vendor blogs (EasySell, Apr 2026; Presta, Jul 2026; Crystallize, Apr 2025). They agree small stores should wait, but:
  - Their cost and uplift numbers are unsourced.
  - None of them lists real platform prices.
  - None covers the 14 Oct 2026 framework-agnostic Hydrogen release.
  - SEO and migration risk is thin or missing.
  - AI shopping assistants are barely mentioned.

  Our angle covers each of those gaps:
  - an honest "probably not yet" for small stores
  - prices taken from the vendors' own pricing pages
  - what changes for the business (page editing, apps)
  - the platform options, including the new Hydrogen
  - SEO safeguards
  - a checklist

**Sources (all opened 22 Oct 2026)**

Platforms:
- shopify.com/pricing and shopify.com/plus/pricing
- shopify.dev: the headless overview, the Hydrogen page, Hydrogen fundamentals (Oxygen) and the Hydrogen 2026-10 changelog
- bigcommerce.com/essentials/pricing
- catalyst.dev
- commercetools.com/pricing
- the commercetools blog post on headless, composable and MACH
- woocommerce.com/woocommerce and the WooCommerce Store API docs

Running costs:
- vercel.com/pricing
- sanity.io/pricing
- algolia.com/pricing

Search, crawlers and speed:
- Google Search Central: JavaScript SEO basics and site moves with URL changes
- Vercel's AI crawler study (Dec 2024)
- web.dev "Milliseconds make millions"

Full table in the brief.

**Arrowbin facts used**
- Arrowbin builds custom Next.js storefronts and admin panels.
- Planning estimates: 8–12 weeks for a headless storefront and 3–6 weeks for a Shopify theme store (both already published).
- The 15–20% yearly maintenance planning rule (already published).

The post makes no claim that Arrowbin has built a headless Shopify or headless WooCommerce store. It gives no new Arrowbin prices and tells no client stories.

**Suggested inbound links (none exist today)**
1. `src/lib/posts/shopify-vs-custom-ecommerce.ts`, the "middle route people forget: headless Shopify" paragraph (around line 322). Append: "Our take on [whether headless commerce is worth it](/blog/headless-commerce) covers what it costs to run." Anchor: "whether headless commerce is worth it".
2. `src/lib/posts/wordpress-to-nextjs-migration.ts`, the first WooCommerce route list item ("Keep WooCommerce as the back end and build a Next.js storefront on top...", around line 394). Append: "Our [headless commerce guide](/blog/headless-commerce) covers when that split pays for itself." Anchor: "headless commerce guide".
3. `src/lib/posts/chatgpt-shopping-for-online-stores.ts`, the "Headless and custom React storefronts are the opposite case..." paragraph (around line 471). Append: "If you haven't committed yet, [weigh the costs of going headless](/blog/headless-commerce) first." Anchor: "weigh the costs of going headless".
4. Optional: `src/lib/posts/software-maintenance-cost.ts`, the WooCommerce store vs booking tool paragraph (around line 314). Append: "A headless storefront adds a second system to that list, as our [headless commerce breakdown](/blog/headless-commerce) shows." Anchor: "headless commerce breakdown".

**Registration (lead)**
Add `import { post as headlessCommerce } from "./headless-commerce";` and `headlessCommerce` to `extraPosts` in `src/lib/posts/index.ts`.

**Keyword overlap**
`src/lib/services.ts` (e-commerce service, around line 166) lists "headless commerce" as a keyword. Suggestion:
- Change it to "headless commerce development", so the service page targets hiring intent and this post owns the informational head term.
- Have the service page link to the post.

**For the founder's eyes**
- **Shopify yearly prices:** Shopify's pricing page on 22 Oct 2026 showed yearly billing at $19 / $49 / $299 a month. The Shopify vs custom post (15 Oct) says $22 / $58 / $359, while the monthly prices ($25 / $65 / $399) match. Either Shopify changed its yearly prices or the page showed a regional or promotional rate. Worth checking from a US connection before anyone edits that post. This post quotes monthly billing only.
- **Service page wording:** the e-commerce service page says headless storefronts "score high on Core Web Vitals and rank well on Google". This post says, with sources, that headless doesn't make a store fast by itself. The two don't contradict each other, but the service copy could be softened to match.
- **BigCommerce add-on prices:** BigCommerce's pricing page lists extra-storefront add-ons ($30, $50 and $100 a month), but the page text doesn't say which plan each price belongs to. The post only says "extra storefronts are a paid add-on".

## app-development-cost-bangladesh

**Files written (all new):**
- `src/lib/posts/app-development-cost-bangladesh.ts` (post data; not registered in `posts/index.ts`, the lead does that)
- `public/blog/app-development-cost-bangladesh/`: `price-ladders.svg`, `rate-tiers.svg`, `feature-costs.svg`, `year-one-budget.svg`, `time-zone-overlap.svg`, `quote-checklist.svg`, `cover.svg`, `cover.webp` (all rendered with sharp and viewed)
- `docs/seo/18-blog-wave-2026-10-22/briefs/app-development-cost-bangladesh.md` (updated SERP check, FX rate, conversions, 17 sources with what was used and when)

**Post:** "App Development Cost in Bangladesh (2026): BDT and USD" (54 chars). Meta 149 chars. Category "Guides". Date 2026-10-22. Body 2,774 words, 12 min read. 10 question H2s (closing: "So what should you budget first?"), 2 H3s, 2 tables, 6 SVGs, 1 cta (/contact), 7 takeaways, 8 FAQs. Every dollar figure uses Bangladesh Bank's WAR of Tk 123.65 for 19 Oct 2026, stated in the body and on every chart.

**Keywords:** primary "app development cost in bangladesh"; secondary "mobile app development cost in bangladesh", "android app development cost in bangladesh", "app development cost bangladesh bdt", "hire app developer in bangladesh cost", "how much does it cost to make an app in bangladesh", "custom software development cost in bangladesh". No e-commerce website, website cost or salary terms.

**Checks:** `pnpm tsc --noEmit -p .` clean; `pnpm biome check --write` on the post fixed formatting only; ai_tells.py: no HARD or WARN (sd 10.3, 23% short sentences, 0 triplets, 22 contractions per 1k words); zero em dashes in all my files; no banned words; no "Arrowbin LLC".

**SERP (22 Oct, 5 queries):** still no editorial page. Results are bdstall listings, Clutch (now also its `.md` mirror), Superb Companies directories, Abbacus Technologies vendor pages (new, unsourced USD rates), projectcostestimator.com (new; its "Bangladesh" rates are a South Asia band), EngineerBabu (India) and generic global guides. Nobody shows BDT and USD with a dated rate, or separates build from running costs. New angle used: Bdtask's blog puts local rates at Tk 1,000–4,000 an hour while its own Clutch profile lists $25–49.

**Sources opened 22 Oct 2026 and cited:** Bangladesh Bank FX sheet; Bdtask cost guide; Dcastalia cost guide; Clutch bd/app-developers (first page, 50 firms, 49 with a rate: 24 at $25–49, 16 under $25, 8 at $50–99, 1 at $150–199; cross-checked against the `.md` mirror); Paylab software engineer (25 respondents; opened on second try after HTTP 500); StatCounter mobile OS Bangladesh (Android 93.47%, Sep 2026); Apple enrollment and Apple organization enrollment (D-U-N-S); Google Play registration fee; Google Play closed-test rule; Android Developers Blog (D-U-N-S for organizations, 2023); Android target API level page; SSLCommerz pricing; Steadfast pricing; Wikipedia Bangladesh Standard Time; Financial Express on BASIS exporters. Not cited: timeanddate (HTTP 403), bdstall, Abbacus, projectcostestimator.

**Internal links (6):** /services/mobile-app-development ("Android and iOS app development"), /services/custom-software-development ("custom web app development"), /blog/how-much-does-custom-software-development-cost ("what custom software costs worldwide"), /blog/developer-salaries-by-country ("why there's no reliable Bangladesh salary median"), /blog/payment-gateway-integration-bangladesh ("SSLCommerz and bKash fees in detail"), booking link once in the closing. The cta block points to /contact. No link to the parallel offshore post (as asked).

**Suggested inbound links (new anchors; no existing anchor points here):**
1. `src/lib/blog.ts`, cost guide, the paragraph after the regional rate table that starts "It's tempting to chase the lowest rate." Add at the end: "If you're weighing a team in Bangladesh, our guide to [what an app costs to build in Bangladesh](/blog/app-development-cost-bangladesh) puts local price lists in Taka and dollars."
2. `src/lib/posts/saas-development-cost.ts`, section "What if you're building a SaaS from outside Stripe's supported countries?", paragraph "If you also sell to customers inside Bangladesh, local payments are a separate integration...". Add: "If the product is a mobile app, see [Bangladeshi app prices in Taka and dollars](/blog/app-development-cost-bangladesh)."
3. `src/lib/posts/developer-salaries-by-country.ts`, section "Why is there no salary figure for Bangladesh, Vietnam or Nigeria?", paragraph "Be wary of any page that quotes an exact developer salary...". After "Until the samples grow, ask vendors there for their salary bands by level." add: "For what Bangladeshi teams charge clients, we collected the published figures in [app development rates in Bangladesh](/blog/app-development-cost-bangladesh)."
4. `src/lib/posts/payment-gateway-integration-bangladesh.ts`, closing section "Which payment setup should you launch with?", after the paragraph linking /services/ecommerce-development: "Building an app rather than a website? Our [app budget guide for Bangladesh](/blog/app-development-cost-bangladesh) adds store fees and upkeep."

**Keyword overlap:** none. No existing post or service page targets any of this post's terms ("android app development" on the mobile service page is a service query, not a cost query). Nothing to remove.

**For the founder:**
- F10 respected: no US vs Bangladesh multiple anywhere and no US bar on the rate chart. The cost guide paragraph proposed for inbound link 1 sits next to the old "three to five times" line, which still waits on F10.
- D4 respected: no Arrowbin prices. The post says we price each app from its feature list. A labelled "What Arrowbin charges" box can go after the first table once D4 arrives.
- D7: no WhatsApp link.
- The post names Bdtask and Dcastalia (competitors) and sets Bdtask's blog rate beside its own Clutch band. The wording is neutral; say if you'd rather not name them.
- Clutch counts are a snapshot of 22 Oct 2026 and the order includes paid placement; worth a quick recount before publishing. Re-check the Bangladesh Bank rate too if publishing much later.
- Proof gap: the post claims no app Arrowbin has built. The গ তে গয়না Android and iOS apps (in progress per portfolio-facts) would be the natural proof line in the closing once the client agrees.
- 16 external citations, above the guide's "4 to 10 is normal", because every number needed its own source.

## custom-software-vs-off-the-shelf

**Files written (all new, nothing else touched)**
- `src/lib/posts/custom-software-vs-off-the-shelf.ts`: the post (not registered; the lead adds it to `src/lib/posts/index.ts`).
- `public/blog/custom-software-vs-off-the-shelf/`: `cover.svg` + `cover.webp` (30 KB; a custom ops app mockup in front of a spreadsheet and a per-seat subscription list), and five charts:
  - `build-or-buy-matrix.svg`
  - `seat-fees-by-headcount.svg`
  - `five-year-cost.svg`
  - `hidden-costs.svg`
  - `hybrid-stack.svg`

  All are 1280x720, on the brand palette with no green, and each is under 15 KB. Every one was rendered with sharp and checked.
- `docs/seo/18-blog-wave-2026-10-22/briefs/custom-software-vs-off-the-shelf.md`: SERP check, angle, worked-example math, source list.

**Post and checks**
- Title "Custom Software vs Off-the-Shelf: When Building Pays Off" (56 characters). Description 152 characters. Category "Guides". Date 2026-10-22, 13 min read.
- Body: 2,911 words (FAQ adds 463). 9 question H2s, each opening with a direct answer; the last is "What do we recommend for most small businesses?" and carries the service link and the booking link. A 12-row comparison table, a seat-fee table and a five-year cost table. One cta block (to /contact). 8 FAQs, 7 takeaways.
- Internal links (6): /services/custom-software-development, /blog/how-much-does-custom-software-development-cost, /blog/software-maintenance-cost, /blog/ai-agent-cost-small-business, /blog/how-to-choose-a-software-development-company, and the booking link once (site.bookingUrl).
- `pnpm tsc --noEmit -p .` exits 0. Biome applied to the post. Zero em dashes in my files.
- ai_tells.py shows no HARD or WARN lines: sd 9.0, 26% short sentences, 0.8 triplets per 1k words, 20.5 contractions per 1k words.

**Keywords**
- Primary: custom software vs off the shelf.
- Secondary: build vs buy software, custom software vs saas, off the shelf software pros and cons, when to build custom software, custom software for small business, bespoke vs off the shelf software (UK and Australian wording; BCS and UK agencies rank for it).

**SERP summary (22 Oct 2026)**
- Page 1 for the primary and its variants is agency and vendor blogs (Netguru, Upsilon, MindInventory, Acropolium, Shoothill, RaftLabs, Alloy Software). Most show 2026 update dates.
- None uses real, current SaaS seat prices; their cost models use invented per-user figures. Few say plainly that buying wins most of the time. The hybrid route is missing or a short section (Shoothill, RaftLabs). Statistics are often unsourced (Netguru's "85–90% of features unused", "ROI within 2–3 years").
- Our angle: list prices opened today from HubSpot, Salesforce, monday.com, Airtable and Zapier; a five-year worked example where buying wins at 40 staff and the hybrid wins at 80; honest "buy the commodity tools" advice; the hybrid as the main recommendation; a checklist an owner can run.

**Worked example (labelled illustrative in the post)**
- A, keep buying (monday.com Pro for all staff, HubSpot Sales Hub Pro for sales, Zapier Team): $82,140 at 40 staff, $160,140 at 80.
- B, hybrid (keep HubSpot, build a $30,000 ops tool at the top of the cost guide's internal-tool tier, plus 15–20% a year): $87,387–$94,887 at 40, $122,067–$129,567 at 80.
- C, replace everything with custom (cost guide mid-size tier, $30,000–$90,000): $60,714–$188,214 at 40, $68,514–$196,014 at 80.
- Staff time: O*NET (BLS 2025 data) puts the median office-clerk wage at $21.64/hour, so each hour a week of re-keying costs about $1,080 a year.
- Arrowbin numbers used: only the cost guide's published tiers, timelines and the 15–20% upkeep rule. No new Arrowbin prices.

**Sources (all opened 22 Oct 2026)**
- https://www.hubspot.com/pricing/sales: Sales Hub Pro $90/seat/month annual, $100 monthly, required $1,500 onboarding
- https://www.salesforce.com/sales/pricing/: Pro Suite $100/user/month, billed annually
- https://monday.com/pricing: Pro $19/seat/month billed annually; plans start at 3 users; teams over 40 can request a quote
- https://www.airtable.com/pricing: Team $20 and Business $45 per user/month, billed annually
- https://zapier.com/pricing: Team entry tier $69/month billed annually
- https://www.vertice.one/insights/saas-inflation-rate: SaaS inflation 12.7% in August 2026, early September reading 14.3% (page updated October 2026)
- https://zylo.com/news/2026-saas-management-index: organizations leave 36% of SaaS licenses unused on average (released 29 Jan 2026)
- https://www.onetonline.org/link/localwages/43-9061.00: office clerks, general, US median $21.64/hour (BLS 2025 wage data)
- Not cited: QuickBooks (regular prices could only be inferred from the layout), Gusto (403), the bls.gov OEWS table (returned index pages), and the Gartner, Forrester and McKinsey figures that competitors quote (not opened).

**Proposed changes in files I don't own**
1. Cost guide FAQ (`src/lib/blog.ts`, "Is custom software cheaper than off-the-shelf?"). Its answer claims break-even "within 2–3 years", which this post's example contradicts at 40 staff. Keep the question and replace the answer with:
   "Upfront, off-the-shelf is almost always cheaper, and for standard jobs like accounting or payroll it usually stays cheaper. Custom software can cost less over several years when per-seat fees grow with headcount, when you pay for overlapping tools, or when staff lose hours moving data between them. Run a five-year comparison with your own seat counts before deciding; for many small businesses the best answer is to keep the standard tools and build only the missing piece."
2. Cost guide body link (`src/lib/blog.ts`, the first intro paragraph, starting "If you're planning a custom software project", one link today). Append: "If you're still deciding whether to build at all, start with our comparison of [custom software and off-the-shelf tools](/blog/custom-software-vs-off-the-shelf)."
3. Service page (`src/lib/services.ts`, `serviceExtras["custom-software-development"].relatedPosts`): add "custom-software-vs-off-the-shelf". It matches the page's "teams that have outgrown off-the-shelf tools" intro.

**Suggested inbound links (none exist today; every anchor is different)**
1. `src/lib/posts/ai-agent-cost-small-business.ts`, the paragraph starting "Off-the-shelf wins more often than agencies like to admit" (one link today). Append: "The same rule holds for business software in general, as our [build-or-buy comparison for business software](/blog/custom-software-vs-off-the-shelf) shows."
2. `src/lib/posts/ai-automation-for-small-business.ts`, the paragraph starting "One more opinion. A workflow builder is the right first step" (no links). Append: "For tools beyond AI, our guide to [when building your own software pays off](/blog/custom-software-vs-off-the-shelf) runs the same decision with five-year numbers."
3. `src/lib/posts/software-maintenance-cost.ts`, the intro paragraph starting "If you're about to sign for a build" (no links). Append: "If you haven't decided to build yet, weigh [per-seat SaaS fees against a custom build](/blog/custom-software-vs-off-the-shelf) first."
4. The cost guide link in item 2 above (anchor "custom software and off-the-shelf tools").

**Registration (lead)**
Add `import { post as customSoftwareVsOffTheShelf } from "./custom-software-vs-off-the-shelf";` and `customSoftwareVsOffTheShelf` to `extraPosts` in `src/lib/posts/index.ts`.

**Keyword overlap**
No keyword needs removing elsewhere. `ai-agent-cost-small-business` keeps "custom ai agent vs off the shelf", which is AI-specific. The only overlap is the cost guide FAQ in item 1; trimming its answer is enough.

**For the founder's eyes**
- **Client names:** the post names Silent Lifestyle BD (an order queue where staff call before confirming) and Maneel Club (phone-number bans for fake orders) as examples of admins built around a workflow. It lists features only, no metrics, as portfolio-facts.md allows. Drop them if you'd rather keep this US-facing post free of Bangladeshi client names.
- **Code ownership:** an FAQ says "At Arrowbin, clients own the source code outright", based on the service page's "You own 100% of the source code". Confirm that holds for every contract.
- **The $30,000 hybrid figure:** it's the top of the cost guide's published internal-tool tier, not a new price, but it's the number readers will remember.
- **Price dates:** vendor list prices move. The post dates them to October 22, 2026, so re-check them at the next refresh.

## offshore-vs-nearshore-vs-onshore

**Files written**
- `src/lib/posts/offshore-vs-nearshore-vs-onshore.ts` (the post; not registered, see below)
- `public/blog/offshore-vs-nearshore-vs-onshore/`: `overlap-new-york.svg`, `overlap-by-season.svg`, `feedback-loop.svg`, `hybrid-model.svg`, `decision-tree.svg`, `cover.svg`, `cover.webp` (5 charts plus cover; every SVG under 12 KB, brand palette only, all rendered with sharp and checked by eye)
- `docs/seo/18-blog-wave-2026-10-22/briefs/offshore-vs-nearshore-vs-onshore.md` (SERP check, time-zone method, full overlap tables, source list)

**Shape and checks**
- Title "Offshore vs Nearshore vs Onshore Software Development" (53 characters); description 144 characters; category Guides; date 2026-10-22; 15 min read.
- Body about 3,340 words (tables included), 10 question H2s each opening with a direct answer, verdict ("Onshore if..., nearshore if..., offshore if...") in the first paragraph, an 8-row comparison table (cost, overlap, communication, legal and IP, talent pool, management overhead, risk, best for), tldr, 7 takeaways, 8 FAQs, one cta block (`/contact`), closing section "So which model should you start with?".
- Internal links (5 plus booking): /blog/developer-salaries-by-country, /blog/how-much-does-custom-software-development-cost, /blog/how-to-choose-a-software-development-company, /blog/software-maintenance-cost, /services/custom-software-development, and the cal.com booking link once.
- `pnpm tsc --noEmit -p .`: no errors. `pnpm biome check --write` on the post: clean. Em dash grep on all my files: none. `ai_tells.py`: no HARD or WARN lines; sd 9.5, 25% short sentences, 0.7 triplets per 1k words, 19.6 contractions per 1k words.

**Keywords**
- Primary: offshore vs nearshore vs onshore software development
- Secondary: nearshore vs offshore; onshore vs offshore software development; offshore software development pros and cons; offshore development time zone overlap; how to manage an offshore development team; hybrid onshore offshore model

**SERP summary (22 Oct 2026)**
Every ranking page for the six queries checked is a vendor blog recommending its own geography (EngineerBabu, India; Orient Software, Vietnam; Brainhub, Poland; ClickIT, Mexico; BairesDev, Assuresoft, Codev and others). They give unsourced rate tables and generic overlap claims ("2–4 hours with the US"), never compute overlap for real cities, never mention daylight saving time, and stop at "sign a contract" on IP. Our angle: computed 9-to-5 overlap for New York and San Francisco against 10 team cities (plus London and Sydney), with the DST gap weeks shown; pay figures only from our own salary data; peer-reviewed sources for hidden costs; the US Copyright Office on why commissioned code needs an assignment; and an honest disclosure.

**Sources (all opened 22 Oct 2026)**
- time.is pages for New York, San Francisco, London, Sydney, Mexico City, Bogotá, São Paulo, Lisbon, Warsaw, Bucharest, Kyiv, Bangalore, Dhaka, Ho Chi Minh City and Manila (current offsets and next DST change). Cross-checked with Node's ICU time-zone data: identical.
- https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst (US DST rule)
- https://transport.ec.europa.eu/transport-themes/summertime_en (EU DST rule)
- https://news.rice.edu/news/2024/hidden-cost-working-across-time-zones and https://econpapers.repec.org/paper/ehllserod/128758.htm (Organization Science 2024: 1 hour more distance, 11% less synchronous communication; that hour was 19% of business-hour overlap)
- https://aisel.aisnet.org/misq/vol32/iss2/9/ (MIS Quarterly 2008: client extra costs in four areas on six offshored projects)
- https://www.copyright.gov/circs/circ30.pdf (Circular 30, works made for hire)
- https://uncitral.un.org/en/texts/arbitration/conventions/foreign_arbitral_awards/status2 (New York Convention, 172 parties)
- https://www.ef.com/wwen/epi/ plus its country pages (EF EPI 2025 ranks)
- https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/ (Octoverse 2025)
- Our own /blog/developer-salaries-by-country for every pay figure.
- Not cited: timeanddate.com (403 on every page), bairesdev.com (403), the EUR-Lex directive page (empty).

**Registration (lead)**
Add `import { post as offshoreVsNearshoreVsOnshore } from "./offshore-vs-nearshore-vs-onshore";` and `offshoreVsNearshoreVsOnshore` to `extraPosts` in `src/lib/posts/index.ts`.

**Suggested inbound links (none exist today; every anchor is different)**
1. `src/lib/blog.ts`, cost guide, section "How does developer location and seniority affect price?", the paragraph starting "It's tempting to chase the lowest rate" (one link today). Turn the phrase "enough time-zone overlap for real collaboration" into a link: "[enough time-zone overlap for real collaboration](/blog/offshore-vs-nearshore-vs-onshore)".
2. `src/lib/blog.ts`, choosing guide, section "Why communication and process matter more than you think", the paragraph starting "Ask how often you'll see working software" (no links). Append: "If the team works in another time zone, check [how many working hours you'd actually share](/blog/offshore-vs-nearshore-vs-onshore) before you sign."
3. `src/lib/posts/developer-salaries-by-country.ts`, section "How big is the developer pay gap between regions?", the paragraph starting "Eastern Europe and Latin America overlap almost completely" (no links). Change "time zone and the specific team matter more than the regional pay level" to "[time-zone overlap](/blog/offshore-vs-nearshore-vs-onshore) and the specific team matter more than the regional pay level".
4. `src/lib/posts/app-development-cost-bangladesh.ts` (sibling post in this wave, other writer), the paragraph starting "Time zones shape how a project feels day to day" (one link). Append: "Our [overlap comparison for ten team cities](/blog/offshore-vs-nearshore-vs-onshore) shows how that compares with Latin America and Europe." Its Dhaka overlap figures agree with this post's (London 2 h and Sydney 3 h in the northern winter).

**Keyword overlap**
No keyword needs removing elsewhere. `developer-salaries-by-country` keeps "offshore developer salaries", which is a pay query, not a location-choice one. This post mentions Dhaka only as one row of the time-zone tables, so the planned Bangladesh landing page keeps "offshore software development bangladesh" and "outsourcing to Bangladesh" to itself. Optional: the choosing guide's FAQ "How important is location and time zone?" answers "Less than it used to be"; it doesn't contradict this post, but a link-free tweak such as "It matters most when your project needs live decisions; 2 to 4 shared hours a day covers most projects" would make the two pages agree.

**For the founder's eyes**
- **Disclosure sentence (needs approval).** Intro, second paragraph: "Full disclosure, then: Arrowbin's own engineering team is offshore, in Bangladesh, so weigh my view with that in mind." It's the only place the post says where our team is. If you'd rather not name the country, swap it for "Arrowbin's own engineering team works offshore, in a lower-cost country", the wording the salary post uses.
- **Arrowbin mention:** one sentence in the closing ("At Arrowbin we build custom software for founders and small businesses worldwide, and we set each project up around the overlap the client needs."). No prices, no client names, no metrics.
- **Opinions stated as ours:** 2 to 4 shared hours a day is enough for most projects; a few hours a week of client management time on any outsourced build; for most small builds, a remote lead who shifts their day plus the founder as product owner. Change any you don't agree with.
- **Legal section:** it explains Circular 30 and recommends an IP assignment and an arbitration clause, and says plainly it isn't legal advice.
- **Dates to refresh:** the main overlap table is dated 22 Oct 2026 (US and Europe on summer time); the heatmap and DST list give the winter and gap-week figures, and the UK/Australia table is labelled by season, so nothing goes stale when the clocks change. Re-check offsets if any country changes its DST rules.
