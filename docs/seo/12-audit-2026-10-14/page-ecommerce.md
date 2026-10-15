# Page analysis: https://arrowbin.com/services/ecommerce-development

**Date:** 14 October 2026. **Primary keyword:** ecommerce development company (93 mapped keywords; no verified volume yet). **Secondary:** ecommerce website development (services / company), online store development, custom ecommerce website development, headless ecommerce development services, ecommerce development agency (`../05-keyword-map/page-targets.csv`).
**Method:** as `page-home.md` (curl raw HTML live and local, stdlib parser, Playwright desktop and mobile, Lighthouse 12 mobile lab, 19-URL inbound crawl, WebFetch of ranking pages).
**SERP baseline:** `../03-serp/serp-analysis.md` #13 (29 Sep) and `../11-audit-2026-10-01/sxo.md` (1 Oct). Top results: itransition.com/ecommerce/development, scnsoft.com/ecommerce/services/development, clutch.co/developers/ecommerce (directory), orbitmedia.com/ecommerce-web-design (#4, the closest mid-size agency analogue). Difficulty: High for the top 3, Medium for page one (government and spam pages sit in the tail). A 14 Oct web search for the services variant returned agencies (Rishabh, Elogic, Virtina) and directories (GoodFirms, SelectedFirms).

---

## Score card

| Category | Live | Local (pending deploy) |
|---|---|---|
| On-Page SEO | 45 | 58 |
| Content Quality | 60 | 60 |
| Technical | 60 | 64 |
| Schema | 75 | 82 |
| Images | 85 | 85 |
| **Overall** (25/30/20/15/10) | **61** | **66** |

```
Local build
On-Page SEO:     58/100  ██████░░░░
Content Quality: 60/100  ██████░░░░
Technical:       64/100  ██████░░░░
Schema:          82/100  ████████░░
Images:          85/100  ████████░░
```

This should be Arrowbin's strongest service page: six of its eight portfolio projects are commerce builds. Today the page shows only three of them, never uses the primary keyword, has no price information, and leads with Shopify although no Shopify store appears in the portfolio (every portfolio line that names a stack says Next.js or a WordPress-to-Next.js rebuild).

---

## On-page snapshot

| Element | Live | Local | Assessment |
|---|---|---|---|
| Title | "E-commerce Development Services \| Arrowbin" (42) | "E-commerce Website Development Services \| Arrowbin" (50) | Neither contains "company". OPEN (see H2) |
| Meta description | 169 chars (truncates) | 155: "E-commerce website development that loads fast and converts: Shopify stores, headless storefronts and custom commerce platforms that scale with your sales." | Length FIXED-LOCAL; no CTA, no brand differentiator |
| Canonical | self | self | OK |
| Robots | index, follow | same | OK |
| OG / Twitter | complete, no og:image:alt | same | Minor |
| URL | /services/ecommerce-development | | Good |
| H1 (raw) | "E-commerceDevelopment" | "E-commerce Development" | FIXED-LOCAL |
| Words in `<main>` (raw) | 956 (+568 hidden streamed) | 963 (+568 hidden) | OPEN (H5) |
| Rendered main words | 1,566 | 1,574 | Orbit about 1,350; Itransition about 2,000; ScienceSoft about 2,000 to 2,400 |
| Readability (prose) | | Flesch 64, grade 7.4 | Good |

### Heading outline (local, raw HTML order)
```
H1  E-commerce Development
H2  Get a free quote
H2  What is E‑commerce Development?        (U+2011 non-breaking hyphen, see L1)
    H3 Is this for you?
    H3 What you get
       H4 Built to convert / Blazing fast / Sells everywhere / Easy to manage
H2  Which platform fits your store?
    H3 Shopify / Headless Next.js / Custom platform
H2  Checkout the way your customers pay
    H3 Local payments / Global payments / Delivery & fulfilment
H2  How we deliver
    H3 Strategy / Design / Build & integrate / Optimize
H2  Built by us, live today
    H3 Maneel Club / গ তে গয়না / YT Shop India
H2  Three ways to start
H2  Read before you build                  (2 generic custom-software guides)
H2  Often combined with
H2  Services / Company / Say hello         (footer)
--- after </main>, in <div hidden id="S:n"> ---
H2  Turn more visitors into orders        (funnel model, visually section 02)
H2  Anatomy of a store we build           (visually section 03)
H2  Questions? Answered.  (6 FAQ H3s)
H2  Let's build something loud
```

### Keyword usage (local)
| Term | Count (all text) | Notes |
|---|---|---|
| ecommerce development company / e-commerce development company | **0** | Not in title, H1, body or schema |
| e-commerce development | 4 | H1, "What is", schema |
| ecommerce (no hyphen) | 0 | Searchers mostly type "ecommerce"; Google treats the forms as close variants, so this is minor |
| shopify | 8 | |
| headless | 9 | |
| woocommerce / bigcommerce / magento | 0 / 0 / 0 | |
| bkash / sslcommerz / stripe | 4 / 2 / 2 | |
| migration / migrate | 1 (FAQ) | |
| b2b | 1 ("B2B pricing") | |

---

## Entity and topic coverage vs ranking pages

| Topic / entity | Itransition | ScienceSoft | Orbit Media | Arrowbin (local) |
|---|---|---|---|---|
| H1 | "Ecommerce development services & solutions" | "Ecommerce Website Design & Development Services" | "Ecommerce Website Design Services" | "E-commerce Development" |
| "Company" framing | Clutch "Top Ecommerce Development Company" | H2 "ScienceSoft as an Ecommerce Development Company"; title "...Development Company" | "experienced ecommerce web design agency" | None |
| Platforms | Adobe Commerce, Salesforce/Agentforce, SAP, Odoo, Shopify, WordPress | Adobe Commerce/Magento, Shopify, BigCommerce, Drupal | Shopify, WooCommerce, Drupal Commerce | Shopify, headless Next.js (Shopify or Medusa), custom |
| Business models | B2C, B2B, B2B2C, D2C, marketplace, social selling | B2C, B2B, marketplace, multistore, subscriptions | B2B, B2C, DTC | Subscriptions, marketplace (custom platform), "B2B pricing" in one line |
| Situations (launch / migrate / support) | Development, modernization, integration, support, audit | Launch, Migration, Support (H3s) | Redesign, replatform, support | Launch implied; migration only in one FAQ |
| Integrations | ERP (SAP, Dynamics), OMS, POS, payments, marketing | ERP, PIM (Akeneo, Pimcore), CRM, POS, OMS, payments | ShipStation, Shippo, FedEx, NetSuite, QuickBooks, PayPal, GA | bKash, Nagad, Rocket, SSLCommerz, COD, Stripe, PayPal, Apple Pay, Google Pay; couriers and ERP generic |
| Cost | No figures | "Startup from $25,000, midsized from $55,000, large from $200,000" + cost factors | "Transparent pricing", no figures | **None** |
| Timelines | No | MVP in 6 months (case) | No | Per platform (3–6, 8–12, 12+ weeks) and per step (good) |
| CRO / speed / SEO | AI recommendations, speed metrics | CX capabilities | CRO, SEO, AI visibility, ADA | Funnel model (illustrative), Core Web Vitals claim |
| Case studies with outcomes | Yes, metrics | 25 success stories | 7 named clients, "$22M revenue" | 3 live store links, factual one-liners |
| Reviews / awards | Clutch ranking, Stevie, analysts | FT, IAOP, ISO, BBB | Google/Clutch/Glassdoor 4.9, Clutch awards | None |
| Industries | Retail, fashion, cosmetics, wholesale | 11 named | Client examples | Fashion and jewelry implied by proof |
| FAQ | None | None | None | 6 (advantage) |

**Honest differentiators Arrowbin can lead with:** headless Next.js stores that it has actually shipped, WordPress-to-Next.js rebuilds (Maneel Club, Brandingly, OutNet), cash-on-delivery and local wallet checkout at national scale (Silent Lifestyle BD, FlexOver BD), fixed estimates and code ownership. **Gaps to close:** a "company" framing, price bands, a migration section, WooCommerce and B2B coverage, and full use of the commerce portfolio.

---

## Links

**Outbound (local, body):** cal.com, /work, 3 store links (maneelclub.com, gtegoyna.com.bd, ytshopindia.com), /contact x2, /services/maintenance-support x2, 2 blog posts (both custom-software guides), UI/UX and Cloud service cards. No link to the homepage portfolio stores Silent Lifestyle BD or FlexOver BD, no e-commerce-specific content (none exists yet).

**Inbound (19-URL crawl):** nav and footer on all 18 other pages ("E-commerce Development"); card links from `/` (main locally, hidden stream live), `/services` (hidden stream on both), `/about`, `/services/ui-ux-design` and `/services/maintenance-support`. **Zero contextual links from any blog post.** None of the posts mentions e-commerce in a way that links here.

---

## Images

| Image | Alt | Bytes desktop / mobile | Loading |
|---|---|---|---|
| Maneel Club screenshot | "Maneel Club website, built by Arrowbin" | 18 KB / 36 KB | lazy |
| গ তে গয়না screenshot | "গ তে গয়না website, built by Arrowbin" | 13 KB / 28 KB | lazy |
| YT Shop India screenshot | "YT Shop India website, built by Arrowbin" | 15 KB / 27 KB | lazy |
| Hostinger badge (footer) | "Arrowbin is a verified Hostinger Partner" | 5 KB | lazy |

The store mock-up in "Anatomy of a store we build" is HTML, not an image. Alt text could name the store type for relevance ("Maneel Club, a mobile-first Next.js fashion store built by Arrowbin"), and the Bengali store name could carry a transliteration ("Go Te Goyna") so the alt is readable to English engines. No file over 200 KB.

---

## Schema (local)

Same pattern as the custom-software page: BreadcrumbList (3 items), Service (`#service`, provider, areaServed Worldwide/US/BD, speakable h1 + `#service-answer` which exists, OfferCatalog with 6 deliverables, 4 audiences), ItemList (process, 4 steps), FAQPage (6). Live additionally emits the St. Petersburg ProfessionalService (FIXED-LOCAL). Missing: `offers` with a price, `category`, and any link to case studies (`subjectOf` / `CreativeWork` for live stores). Organization `founder` reference is dangling (see `page-home.md` M2).

---

## CTAs

Hero "Book a free call" plus the 3-field quote form (desktop y=627 / 696, mobile y=570 / 1,251); "Scope a project" and "Talk about a team" mid-page; "Book a call" at the end inside the hidden streamed block. A price anchor ("Shopify stores from $X, headless from $Y") near the form would qualify leads and match what ScienceSoft does.

---

## E-E-A-T

- **Experience:** genuine and visible (live stores you can click), but the page shows only half of it and gives no detail (platform, timeline, integrations, what changed). Factual one-liners replaced the placeholder metrics locally ("+28% mobile conversion" and "Checkout drop-off cut by ~30%" are gone: FIXED-LOCAL).
- **Expertise:** good platform comparison with honest trade-offs ("We build on all three, so we have no reason to push one"); but Shopify is presented as "Most stores start here" with no Shopify build in the portfolio (`src/lib/portfolio.ts` lists Next.js and WordPress rebuilds only). A buyer who asks "show me a Shopify store you built" has no answer.
- **Authority:** no reviews, no platform partner status (Shopify Partner, Medusa), no awards.
- **Trust:** the funnel model uses specific lifts ("+15%", "+25%", "4.3% from 2.1% before") with no source; the numbers changed between live (3.7%) and local (4.3%), which shows they are tunable rather than measured. It is labelled "Illustrative model", which helps, but AI answers can lift the numbers without the label.

---

## AI citability

- **Strong:** "What is E-commerce Development?" (about 38 words, `#service-answer`); the platform comparison (launch speed, design freedom, affordability per platform) is a natural table for AI answers, but it is built as three cards with meters, so the comparison is not in one extractable `<table>`.
- **Weak:** FAQ (including "How long does it take to build an online store?" with 3–6 / 8–12 / 12+ weeks) is in `<div hidden>` after `</main>` in raw HTML. No price passage exists anywhere. No sentence says "Arrowbin is an e-commerce development company".

---

## Performance (Lighthouse 12 mobile, lab, indicative)

| Build | Perf | LCP | TBT | CLS |
|---|---|---|---|---|
| Live | 65 | 4.1 s | 580 ms | 0.137 |
| Local | 67 | 3.6 s | 660 ms | 0.139 |

LCP element is the hero lede paragraph; CLS comes from the web-font swap in the hero grid (same as the custom-software page; `performance.md` finding 4).

---

## Findings (prioritised)

### H1. H1 without spaces and over-long meta description (live)
- **Priority:** High. **Status:** FIXED-LOCAL.
- **Evidence:** live raw H1 "E-commerceDevelopment", description 169 chars; local H1 "E-commerce Development", description 155.
- **Fix:** deploy (`src/components/services/ServiceHero.tsx`, `src/lib/services.ts` lines 160 to 162).
- **Effort:** S. **Owner:** dev.
- **How we'd know it failed:** raw H1 text has no space between words, or the description exceeds 160 characters.

### H2. The primary keyword "ecommerce development company" appears nowhere
- **Priority:** High. **Status:** OPEN (M-2 on 1 Oct; the local title change moved to "Website ... Services" but still has no "company").
- **Evidence:** 0 occurrences in title, H1, body or schema (live and local). ScienceSoft's title and an H2 use "Ecommerce ... Development Company"; Itransition is labelled a "Top Ecommerce Development Company" by Clutch on the page.
- **Fix:**
  1. Title (`metaTitle`, `src/lib/services.ts` line 160): "E-commerce Development Company & Website Services" (49 chars + " | Arrowbin" = 60). Keeps "website development services" coverage.
  2. Lede (`intro`, line 171): "Arrowbin is an e-commerce development company that builds fast, conversion-focused online stores: headless Next.js storefronts, Shopify builds and custom commerce platforms."
  3. Meta description: add a differentiator and CTA, for example "E-commerce development company for growing brands: headless Next.js and Shopify stores, local and global payments, fixed estimates. Get a free quote." (about 150 chars).
- **Effort:** S. **Owner:** founder (wording) then dev.
- **How we'd know it failed:** `curl -s <url> | grep -ci 'commerce development company'` returns 0.

### H3. The strongest proof on the site is under-used on its own service page
- **Priority:** High. **Status:** OPEN.
- **Evidence:** the page shows 3 builds (Maneel Club, গ তে গয়না, YT Shop India). It omits Silent Lifestyle BD and FlexOver BD (nationwide cash on delivery, all 64 districts) and North Bengal Agro Farms (online ordering), which the homepage shows. Cards carry one line each; no platform, timeline, integrations or before/after. `relatedWork` in `src/lib/services.ts` line 1000 limits the list to three.
- **Fix:** show all six commerce builds (or the best five) with a compact fact row each: platform/stack, launch time, payments and couriers integrated, what was migrated. Add one short migration story ("Maneel Club: WordPress to Next.js, URLs preserved with 301s") if the founder can confirm the details. Link each to `/work/<slug>` when case-study pages exist.
- **Effort:** M. **Owner:** founder (facts) then dev.
- **How we'd know it failed:** fewer than 5 commerce builds on this page, or cards still have only one line.

### H4. No price information at all
- **Priority:** High. **Status:** OPEN (SXO "Missing decision content: Pricing" on 1 Oct).
- **Evidence:** no "$" figure and no cost question in the FAQ; the "Read before you build" cards point to the custom-software cost guide, not to anything about store cost. ScienceSoft publishes "Startup from $25,000; midsized from $55,000; large from $200,000".
- **Fix:** founder sets bands per platform; add a static H2 "How much does an e-commerce website cost?" with a 3-row table (Shopify store / headless Next.js store / custom platform: starting price, typical timeline, best for) from the single price source, plus a FAQ entry. Later, link to `/blog/ecommerce-website-cost` and `/blog/shopify-vs-custom-ecommerce` (keyword map P1/P2).
- **Effort:** M. **Owner:** founder (numbers) then dev.
- **How we'd know it failed:** no USD figure inside `<main>` 30 days after the founder supplies prices.

### H5. 568 words, including the FAQ, are streamed outside `<main>`
- **Priority:** High. **Status:** OPEN.
- **Evidence:** raw HTML (live and local): "Turn more visitors into orders", "Anatomy of a store we build", the 6 FAQs and the closing CTA sit in `<div hidden id="S:n">` after `</main>`. Source: `src/app/services/[slug]/page.tsx` lines 188 to 211 (`Suspense` around `ServiceSignature`, `StoreAnatomy`, `Faq`, `Cta`).
- **Fix:** same as the custom-software page H3: remove the Suspense wrappers from server-rendered text; keep any boundary inside the client-only interactive part.
- **Effort:** S. **Owner:** dev.
- **How we'd know it failed:** `grep -c 'hidden id="S:'` on the raw HTML is above 0.

### M1. Shopify is the lead recommendation without Shopify proof
- **Priority:** Medium. **Status:** NEW.
- **Evidence:** platform card "MOST STORES START HERE: SHOPIFY" and FAQ "For most stores, Shopify is the fastest way to launch"; portfolio entries are Next.js stores and WordPress rebuilds (`src/lib/portfolio.ts` result lines 68, 79, 90, 112). `../03-serp` #14 notes Shopify buyers expect Shopify Partner status and Shopify portfolios.
- **Fix:** if Arrowbin has shipped Shopify stores, add one to the proof and get a Shopify Partner profile. If not, keep Shopify as an honest option but lead with headless Next.js ("what we have shipped") and say Shopify builds are available.
- **Effort:** S. **Owner:** founder.
- **How we'd know it failed:** the page recommends a platform that has no matching build in the portfolio.

### M2. No migration / replatforming section, no WooCommerce, no B2B
- **Priority:** Medium. **Status:** OPEN.
- **Evidence:** migration appears only as a FAQ; WooCommerce, BigCommerce and Magento never appear; B2B appears once. ScienceSoft uses "Launch / Migration / Support" as H3s; Orbit names WooCommerce; Itransition and ScienceSoft have B2B sections. Arrowbin has real migration proof (three WordPress rebuilds).
- **Fix:** add H2 "Moving from WooCommerce, WordPress or Shopify without losing SEO" (steps: audit and URL map, data migration, 301 redirects, Search Console checks, post-launch monitoring) and a short B2B paragraph (customer-specific pricing, bulk orders, quotes) only if Arrowbin will take that work.
- **Effort:** M. **Owner:** dev (founder confirms scope).
- **How we'd know it failed:** no H2 containing "migrat" and no mention of WooCommerce.

### M3. Unsourced conversion-lift numbers in the funnel model
- **Priority:** Medium. **Status:** OPEN.
- **Evidence:** "+15%", "+25%", "+25%", "+15%", "+10%", "4.3% from 2.1% before" (local; live shows 3.7%). Labelled "Illustrative model" and "conservative, typical ranges we plan around", with no citation.
- **Fix:** either cite each lever (for example Baymard Institute checkout research, Google/Deloitte "Milliseconds Make Millions" for speed) or show the levers without percentages. Keep the "illustrative" label next to the totals, not only above the chart (`src/components/services/ecommerce/FunnelSignature.tsx`).
- **Effort:** S. **Owner:** dev (founder approves).
- **How we'd know it failed:** a percentage lift appears on the page without a linked source or an adjacent "illustrative" label.

### M4. No contextual inbound links and no supporting content
- **Priority:** Medium. **Status:** OPEN.
- **Evidence:** 0 blog links to this page; its "Read before you build" cards point to two custom-software guides.
- **Fix:** publish `/blog/shopify-vs-custom-ecommerce` (Low difficulty, quick win per `../03-serp` D12) and `/blog/ecommerce-website-cost`, both linking here with anchors such as "e-commerce development company" and "headless e-commerce development"; link from the cost guide's "Mid-size web or mobile app" section ("marketplace") and from /work cards. Set this page's `relatedPosts` to the new posts.
- **Effort:** M (two posts). **Owner:** dev / writer.
- **How we'd know it failed:** fewer than 2 in-content links from posts 60 days after publishing.

### M5. Mixed market framing (US keyword, Bangladesh-specific details)
- **Priority:** Medium. **Status:** OPEN.
- **Evidence:** taka prices (৳2,450) in the store mock-up, bKash/Nagad/Rocket first in the payments block, "Several of our stores sell nationwide on cash on delivery". The primary keyword targets US buyers; the Bangladesh buyer has a separate planned page (`/ecommerce-website-development-bangladesh`, keyword map P1).
- **Fix:** keep the local-payments capability (it is a real differentiator) but lead the payments block with global options for this page, use USD in the mock-up, and build the BD page with BDT bands, bKash/SSLCommerz/Nagad and Pathao/Steadfast/RedX couriers. Cross-link the two.
- **Effort:** S here, M for the BD page. **Owner:** founder decides, dev builds.
- **How we'd know it failed:** the US page's first currency shown is BDT.

### M6. Mobile CLS 0.137 to 0.139 (web-font swap)
- **Priority:** Medium. **Status:** NEW. See `page-custom-software.md` M4 and `performance.md` finding 4.

### L1. Non-breaking hyphen in the "What is" H2
- **Priority:** Low. **Status:** NEW.
- **Evidence:** H2 renders "What is E‑commerce Development?" with U+2011 (`src/components/services/ServiceValue.tsx` line 40: `service.name.replaceAll("-", "‑")`). Some text pipelines treat U+2011 as a different character, so the heading may not match "e-commerce" or "ecommerce".
- **Fix:** keep the normal hyphen and prevent the line break with CSS (`white-space: nowrap` on a span around the name).
- **Effort:** S. **Owner:** dev.
- **How we'd know it failed:** `grep -c $'‑'` on the raw HTML is above 0.

### L2. Outcome stats are adjectives, not facts
- **Priority:** Low. **Status:** OPEN.
- **Evidence:** the three stats under "What is" are "Fast", "Mobile", "Secure" (`src/lib/services.ts` lines 989 to 993).
- **Fix:** use verifiable facts: "6 live stores", "3–6 weeks to launch on Shopify / 8–12 headless", "COD + wallets + cards".
- **Effort:** S. **Owner:** dev.
- **How we'd know it failed:** stats remain non-numeric.

### L3. og:image:alt missing; image alts could carry more context
- **Priority:** Low. **Status:** OPEN. **Fix:** as `page-custom-software.md` L3; enrich portfolio alts in `src/lib/portfolio.ts`. **Effort:** S. **Owner:** dev.

---

## Recommended section outline to beat the current top 3

Target about 2,500 to 3,000 words (top agency pages are about 1,350 to 2,400). Lead with what Arrowbin has actually shipped.

1. **Hero:** H1 "E-commerce Development" (optionally "E-commerce Development Company" if the founder approves the longer display line). Lede with the keyword (H2 fix). Keep the quote form; add one price anchor line under the form once bands exist.
2. **H2 What is e-commerce development?** (keep the definition; stats become facts).
3. **Is this for you? / What you get** (keep).
4. **H2 Stores we have built** (moved up and expanded): 5 to 6 builds with platform, launch time, payments/couriers, migration notes.
5. **H2 Turn more visitors into orders** (keep the funnel, with sources or without percentages; rendered inside `<main>`).
6. **H2 Which platform fits your store?** (keep) plus one static `<table>` comparing Shopify, WooCommerce, headless Next.js and custom on cost, launch time, flexibility, fees, SEO control.
7. **H2 How much does an e-commerce website cost?** (new): band table per platform, what changes the price, link to the cost posts.
8. **H2 Moving your store without losing SEO** (new): migration steps and the WordPress-to-Next.js proof.
9. **H2 Payments, shipping and integrations** (rework "Checkout the way your customers pay"): global first (Stripe, PayPal, Apple Pay, Google Pay, Shop Pay if supported), then local wallets and COD, then couriers, inventory/ERP, email/SMS, analytics. Name only integrations Arrowbin has built or will support.
10. **H2 Anatomy of a store we build** (keep, inside `<main>`).
11. **H2 How we deliver** (keep durations).
12. **H2 B2B and marketplace stores** (short, only if offered; YT Shop India as marketplace proof).
13. **H2 Three ways to start** (keep) with Care plan pricing.
14. **Guides** (new e-commerce posts instead of generic ones).
15. **FAQ** (keep 6, add: "How much does an e-commerce website cost?", "Shopify or a custom store: which is better?", "Do you work with WooCommerce?", "Can you add multi-currency and international shipping?").
16. **CTA** (inside `<main>`).

Out of scope for this page: "shopify development agency" (needs Shopify Partner status and a Shopify portfolio; `../03-serp` #14) and Bangladesh-specific queries (dedicated page).

---

## Schema suggestion (extend the Service node)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://arrowbin.com/services/ecommerce-development#service",
  "name": "E-commerce Development",
  "serviceType": "E-commerce website development",
  "category": "E-commerce development",
  "provider": {"@id": "https://arrowbin.com/#organization"},
  "areaServed": [{"@type": "Place", "name": "Worldwide"}],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "E-commerce development services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Headless Next.js storefront development"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Shopify store development"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Store migration from WordPress and WooCommerce"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Payment gateway and courier integration"}}
    ]
  },
  "subjectOf": [
    {"@type": "CreativeWork", "name": "Maneel Club online store", "url": "https://maneelclub.com/"},
    {"@type": "CreativeWork", "name": "FlexOver BD online store", "url": "https://www.flexoverbd.com/"}
  ]
}
```
(Add `offers` with `PriceSpecification` once price bands are published; switch `subjectOf` URLs to `/work/<slug>` pages when they exist.)

---

## Evidence and sources
- Raw HTML (14 Oct): live 246 KB, local 244 KB; `grep -c 'hidden id="S:'` = 2 on both; U+2011 count 2 (heading and RSC payload).
- Live vs local rendered diff: placeholder metrics replaced by factual lines; funnel total 3.7% (live) vs 4.3% (local).
- Lighthouse 12 mobile JSON: `lh/live-ecom.json`, `lh/local-ecom.json`.
- Competitors fetched 14 Oct: [itransition.com](https://www.itransition.com/ecommerce/development), [scnsoft.com](https://www.scnsoft.com/ecommerce/services/development), [orbitmedia.com](https://www.orbitmedia.com/ecommerce-web-design/); directory at #3: [clutch.co](https://clutch.co/developers/ecommerce). Web search sample: [rishabhsoft.com](https://www.rishabhsoft.com/ecommerce-development), [elogic.co](https://elogic.co/), [goodfirms.co](https://www.goodfirms.co/ecommerce-development-companies).
