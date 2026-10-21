# Brief: headless-commerce (22 October 2026)

Post file: `src/lib/posts/headless-commerce.ts`. Visuals: `public/blog/headless-commerce/`.

## Target

- **Primary keyword:** headless commerce, with the question angle "is headless commerce worth it".
- **Secondary keywords (kept after the SERP check):** is headless commerce worth it, what is headless commerce, headless commerce pros and cons, headless shopify, headless commerce cost, headless woocommerce, composable commerce.
- **Dropped:** "is headless commerce worth it for small business" as a separate keyword. It is the same intent as the primary and is covered by one H2 and one FAQ rather than a keyword slot.
- **Reader:** owner or marketing/e-commerce lead of a growing brand on Shopify, WooCommerce or BigCommerce who keeps hearing "go headless". Mostly US, also UK and Australia. Not a developer.
- **Search Console:** "headless commerce", 2 impressions at position 68.5 (3 months to 19 Oct 2026). No page on the site owned the topic.

## SERP check (WebSearch, 22 Oct 2026)

| Query | What ranks | Page types | Freshness |
|---|---|---|---|
| headless commerce | Wikipedia, TechTarget, Salesforce guide, Pimcore, FedEx small-business hub, Firework and Nexway glossaries | Definitions and vendor guides | Mostly undated or older; Salesforce guide undated |
| what is headless commerce | Salesforce, Plytix glossary, Hostinger tutorials, TechTarget, CB Insights | Glossaries and vendor explainers | Mixed |
| is headless commerce worth it | Crystallize (ROI post, Apr 2025), Presta (Jul 2026), BlazeCommerce FAQ (WooCommerce), DEV Community posts, Netsmartz, Tenten | Agency and vendor blogs | 2025 to 2026 |
| headless shopify pros and cons cost 2026 | Weaverse pricing, Aureate Labs (actually Feb 2024 despite "2026" title), Storyblok, Shopify community thread, Presta | Agency blogs, one community thread | Mixed, some stale |
| headless commerce cost small business | Alokai, FitSmallBusiness, EasySell (Apr 2026), easy.bi, Contentful myth-busting post | Vendor and agency blogs | 2024 to 2026 |
| headless woocommerce worth it | Elegant Themes, Pressable, BlazeCommerce, Codesphere | Hosting and agency blogs | Mixed |

### What the ranking pages cover

- **Definitions** (Salesforce, TechTarget, commercetools): front end separated from the commerce back end, joined by APIs; composable as the broader idea; MACH as the principles.
- **"Worth it" posts** (EasySell, Presta, Crystallize): mostly agree small stores should not go headless; give revenue thresholds ($500k, $2M, $3M to $5M) and build ranges ($20k to $150k+).

### What they miss (our angle)

1. **Sourcing.** EasySell's and Presta's cost, conversion and traffic numbers are unsourced estimates (EasySell: "35% of migrations perform worse", "$2.6M average enterprise implementation", no source). Crystallize leans on vendor surveys. Nobody prices the running stack from the vendors' own pages.
2. **Real platform prices.** None of the "worth it" pages list Shopify's plan prices, the headless storefront allowance per plan (1 on Basic to Advanced, 25 on Plus), Oxygen being free, BigCommerce's plans, or what a CMS and search add per month.
3. **Fresh platform news.** Shopify's new framework-agnostic Hydrogen went GA on 14 Oct 2026 with Next.js and React Router starters, and Vercel Shop is a Next.js template built on it. No ranking page reflects this yet.
4. **SEO and migration risk.** EasySell and Crystallize skip it; Presta covers it in outline. Nobody ties it to Google's own site-move and JavaScript guidance.
5. **AI shopping assistants.** Barely mentioned. A headless front end that renders prices in the browser is invisible to AI crawlers that don't run JavaScript.
6. **The team after launch.** Thin everywhere. Shopify's own docs say a headless storefront "costs more to build and run than a theme" and that the merchant needs developers after launch.
7. **Honest "not yet" for small stores**, written for a business owner, plus WooCommerce and BigCommerce options in one place, and a checklist.

**Angle that beats them:** a decision-maker's guide that says "probably not yet" to most stores and shows why with vendor-sourced prices (no invented uplift numbers), names what actually changes for the business (including who edits pages and which apps stop working), covers the October 2026 Hydrogen change, and ends with a checklist. Links out to our Shopify vs custom post for the build-cost tables rather than repeating them.

## Overlap with existing posts

- `shopify-vs-custom-ecommerce.ts`: mentions headless Shopify as a middle route, has build-time (8–12 weeks headless, Arrowbin estimate) and 3-year cost tables. We reuse only the labelled 8–12 week estimate and link the post for cost tables.
- `wordpress-to-nextjs-migration.ts`: owns "WordPress as a headless CMS" and the three WooCommerce routes. We link it for those.
- `chatgpt-shopping-for-online-stores.ts`: owns AI shopping. We link it and keep our AI section short.
- `software-maintenance-cost.ts`: owns the 15–20% yearly planning rule. We link it for the team-after-launch section.

## Sources (all opened 22 Oct 2026 unless marked)

| URL | What we used |
|---|---|
| https://www.shopify.com/pricing | Monthly prices $25 / $65 / $399, Plus from $2,300; yearly billing shown as $19 / $49 / $299; third-party fee 2% / 1% / 0.6% / 0.2%; "Build headless storefronts": 1 on Basic, Grow, Advanced and 25 on Plus |
| https://www.shopify.com/plus/pricing | Plus "starts at $2,300 USD a month ... on a 3-year term", "$2,500 USD per month for a 1-year term"; variable platform fee for complex, higher-volume businesses |
| https://shopify.dev/docs/storefronts/headless | Definition; "A headless storefront costs more to build and run than a theme"; merchant should have "developers to maintain the storefront after launch"; Storefront API "hands customers off to checkout"; Customer Account API; Headless channel |
| https://shopify.dev/docs/storefronts/headless/hydrogen | Hydrogen is "Shopify's headless toolkit"; React Router starter on Oxygen; Next.js starter (Vercel Shop, Next.js 16, deployed to Vercel) |
| https://shopify.dev/docs/storefronts/headless/hydrogen/fundamentals | "Oxygen is available at no extra charge on paid Shopify plans"; "Oxygen isn't available on Agentic plans" |
| https://shopify.dev/changelog/blog/hydrogen-2026-10-is-now-available | 14 Oct 2026: framework-agnostic Hydrogen GA; "Hydrogen now works with any JavaScript framework"; host anywhere "including Oxygen, which is still free"; existing storefronts keep working |
| https://apps.shopify.com/headless | Headless channel app, free, gives Storefront API and Customer Account API access |
| https://www.bigcommerce.com/essentials/pricing/ | Core $39, Growth $105, Scale $399 monthly ($29 / $79 / $299 yearly); Performance from $1,499 a month billed annually; Open Payment Provider fee 2.0% / 1.0% / 0.6%; extra storefronts are a paid add-on (plan mapping unclear in page text, so not quoted per plan) |
| https://www.catalyst.dev/ | Catalyst, BigCommerce's storefront for composable commerce, "optimized for Next.js and React Server Components", optional Makeswift visual editor |
| https://commercetools.com/pricing | No public prices; order-based model; "Contact us for more information on pricing plans" |
| https://commercetools.com/blog/the-differences-between-composable-headless-and-mach | Definitions of headless, composable and MACH (2 Mar 2026) |
| https://machalliance.org/ | Opened; page does not expand the acronym, so not cited for the definition |
| https://woocommerce.com/woocommerce/ | "without limits, compromises, or monthly platform fees" |
| https://developer.woocommerce.com/docs/apis/store-api/ | Store API: public REST endpoints for cart, checkout and products; unauthenticated |
| https://vercel.com/pricing | Hobby is "for personal, non-commercial use"; Pro $20/mo per developer seat with $20 usage credit, then pay as you go |
| https://www.sanity.io/pricing | Free $0 (up to 20 seats); Growth $15 per seat per month |
| https://www.algolia.com/pricing | Grow: 10K search requests/month included, then $0.50 per additional 1K |
| https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics | Rendering queue "may stay on this queue for a few seconds, but it can take longer than that"; "not all bots can run JavaScript"; server-side or pre-rendering "is still a great idea" |
| https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes | "Expect temporary fluctuation in site ranking during the move"; server-side permanent redirects (301, 308) |
| https://vercel.com/blog/the-rise-of-the-ai-crawler | "none of the major AI crawlers currently render JavaScript" (17 Dec 2024) |
| https://web.dev/case-studies/milliseconds-make-millions | Google-commissioned study by 55 and Deloitte, 37 brand sites, 30M+ sessions, late 2019; "A 0.1 second improvement of mobile site speed increases conversion rates by 8.4% for retail sites"; "every page across the user journey had to improve" |

### SERP pages opened for analysis only (do not cite as sources of fact)

- https://easysellapp.com/blogs/wiki/shopify-headless-commerce-hydrogen-worth-it-small-store-2026 (2 Apr 2026, app vendor, unsourced figures)
- https://crystallize.com/blog/headless-commerce-roi (15 Apr 2025, vendor)
- https://wearepresta.com/is-headless-ecommerce-worth-it-the-complete-2026-step-by-step-guide/ (19 Jul 2026, agency, own estimates)
- https://www.salesforce.com/commerce/headless/guide/ (undated, vendor)

### Not opened: do not cite

- Weaverse, Aureate Labs, Storyblok, Tenten, Alokai, FitSmallBusiness, easy.bi, Contentful myth post, BlazeCommerce, Pressable, Elegant Themes, Codesphere, TechTarget, Wikipedia, LoyaltyLion headless docs, the LinkedIn post about Vercel Ship 26, Contentful pricing.

## Notes for the founder

- Shopify's pricing page on 22 Oct 2026 shows yearly billing at $19 / $49 / $299 a month. The Shopify vs custom post (15 Oct) says $22 / $58 / $359. Either Shopify cut yearly prices this week or the page shows a regional or promotional rate. Monthly prices ($25 / $65 / $399) match. Worth a look from a US connection before anyone edits that post; this post quotes monthly billing only.
