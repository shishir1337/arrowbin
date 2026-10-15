# Page analysis: https://arrowbin.com/services/custom-software-development

**Date:** 14 October 2026. **Primary keyword:** custom software development company (verified 2,900 US searches/month, CPC $78.98; `../04-keywords/volume-data-verified.csv`). **Secondary:** custom software development services, custom software development, bespoke software development, custom CRM/ERP development (keyword map `#crm-erp`, 25 keywords).
**Method:** as `page-home.md` (curl raw HTML live and local, stdlib parser, Playwright desktop 1440x900 and mobile 390x844, Lighthouse 12 mobile lab, 19-URL inbound link crawl, WebFetch of ranking pages).
**SERP baseline:** `../03-serp/serp-analysis.md` #1 and #2 (29 Sep) and `../11-audit-2026-10-01/sxo.md` (1 Oct). Top 3 for the primary keyword: avenga.com/custom-software-development, itransition.com/software-development, luxoft.com/services/custom-software-development (ScienceSoft's /software-development/custom ranks for the "services" variant). Difficulty: High (Very High for the top 3). A web search on 14 Oct returned the same set plus andersenlab.com, innowise.com and openxcell.com, all big agencies.

---

## Score card

| Category | Live | Local (pending deploy) |
|---|---|---|
| On-Page SEO | 55 | 68 |
| Content Quality | 58 | 58 |
| Technical | 60 | 66 |
| Schema | 75 | 82 |
| Images | 85 | 85 |
| **Overall** (25/30/20/15/10) | **63** | **68** |

```
Local build
On-Page SEO:     68/100  ███████░░░
Content Quality: 58/100  ██████░░░░
Technical:       66/100  ███████░░░
Schema:          82/100  ████████░░
Images:          85/100  ████████░░
```

The page is well built and already about as long as the top 3 (about 1,830 rendered words vs about 2,000 each for Avenga, Itransition and Luxoft). It loses on four things that word count will not fix: the exact keyword never appears in the copy, the FAQ and price answer are streamed outside `<main>`, the proof is e-commerce rather than custom software, and there is no visible pricing, industries or CRM/ERP section.

---

## On-page snapshot

| Element | Live | Local | Assessment |
|---|---|---|---|
| Title | "Custom Software Development Company \| Arrowbin" (46), identical to the live homepage title | "Custom Software Development Company & Services \| Arrowbin" (57) | Good; cannibalisation resolved together with the homepage change. FIXED-LOCAL |
| Meta description | 155: "Arrowbin builds custom software for your business: web platforms, internal tools and enterprise systems..." | 155: "Custom software development for startups and growing businesses: web platforms, internal tools and business systems. You own the code. Get a free estimate." | Good, has CTA. FIXED-LOCAL |
| Canonical | https://arrowbin.com/services/custom-software-development | same | OK |
| Robots | index, follow | same | OK |
| OG / Twitter | title, description, 1200x630 route image, summary_large_image | same with new title | OK (no og:image:alt, minor) |
| URL | /services/custom-software-development | | Short, hyphenated, keyword-rich |
| H1 (raw HTML) | "CustomSoftwareDevelopment" (no spaces) | "Custom Software Development" | FIXED-LOCAL. No "company" or "services" modifier |
| Words in `<main>` (raw) | 1,345 (+545 in hidden streamed blocks) | 1,347 (+545 hidden) | OPEN (see H3) |
| Rendered main words | 1,825 | 1,828 | Comparable to top 3 |
| Readability (prose) | | Flesch 66, grade 7.8 | Good |

### Heading outline (local, document order in raw HTML)
```
H1  Custom Software Development
H2  Get a free quote                       (hero form)
H2  What is Custom Software Development?
    H3 Is this for you?
    H3 What you get
       H4 Built for your workflow / Scalable architecture / Own your IP / Secure by design
H2  What we build for you
    H3 Web platforms & dashboards / Internal & admin tools / Workflow automation / API & system integrations / Legacy modernization / Enterprise & B2B portals
H2  Built in layers, built to last
    H3 Interface / Logic & APIs / Data / Infrastructure
H2  How we deliver
    H3 Discovery / Architecture / Agile build / Launch & support
H2  Off-the-shelf or built for you?        (comparison table)
H2  Built by us, live today
    H3 North Bengal Agro Farms / YT Shop India / FlexOver BD
H2  Three ways to start
    H3 Project / Product team / Care plan
H2  Read before you build
    H3 x3 blog posts
H2  Often combined with
H2  Services / Company / Say hello          (footer)
--- after </main>, inside <div hidden id="S:n"> until JS moves them ---
H2  One order, two ways                     (interactive demo, visually section 02)
H2  Questions? Answered.
    H3 x6 FAQ
H2  Let's build something loud
```
Hierarchy is valid. H2s are mostly descriptive, but only one ("What is Custom Software Development?") carries the head term, and none says "services" or "company".

### Keyword usage (local)
| Term | Body count | Notes |
|---|---|---|
| custom software development company | **0** | Only in `<title>`, og:title and twitter:title |
| custom software development services | 0 | Only in title ("...Company & Services") |
| custom software development | 9 | H1, "What is", guide card, FAQ question |
| custom software | 14 | |
| bespoke | 0 | Map secondary keyword |
| CRM / ERP | 2 / 3 | Inside the integrations illustration and one FAQ answer only |
| legacy | 2 | Deliverable card |

---

## Entity and topic coverage vs the top 3 (plus ScienceSoft)

| Topic / entity | Avenga | Itransition | Luxoft | ScienceSoft | Arrowbin (local) |
|---|---|---|---|---|---|
| H1 wording | "Custom Software Development Services" | "Custom software development services" | "Custom software development services" | "Custom Software Development Services" | "Custom Software Development" |
| Service lines | 7 (product eng, embedded teams, AI in SDLC, modernization, CX, platform eng, QA) | 3 + related (platform implementation, modernization) | 6 (web, mobile, cloud, legacy, integration, tech advisory) | 10+ | 6 deliverables (web platforms, internal tools, automation, integrations, legacy, B2B portals) |
| Software types (CRM, ERP, HRM, portals, inventory) | No | ERP, CRM, BPM, HRM, accounting, portals | No | ERP, CRM, SCM, HR, LMS, portals, inventory, billing | Portals only; CRM/ERP only as integration targets |
| Industries | 11 | 12 of 20+ | 6 | 15 | **None** |
| Benefits / TCO | Outcomes | Transformation | Lower TCO, security, compliance, integration | ROI section + calculator | 4 benefits + build-vs-buy table (strong) |
| Process | 5 phases | 6 steps | 7 steps | 8 steps | 4 steps with durations (good) |
| Engagement / pricing models | Embedded teams | Fixed price, T&M; outsourcing, dedicated team, augmentation | 4 managed models | Fixed price, T&M with cap | Project / Product team / Care plan (names, no prices) |
| Cost figures | No | FAQ only | FAQ "what impacts cost" | Example cost ranges by app type | FAQ "$8,000 to $75,000+" (streamed outside `<main>`) |
| Security / compliance | ISO 27001, PCI DSS, DORA | ISO 9001/27001 | "Total compliance" | ISO, HIPAA, PCI | "Secure by design" (auth, RBAC, encryption, audit logs); no frameworks named |
| Tech stack | Cloud, CI/CD | Full list | Full list | Full list | 10 named in 4 layers |
| Case studies with outcomes | 3 | 10 | No | Many | 3 cards, all websites/stores; none is an internal tool or integration |
| Named people / testimonials | 5 testimonials | 7 testimonials + reference letters | 3 leadership profiles | Testimonials + experts | None |
| Scale stats | 30+ yrs, 6,000+ staff | 25+ yrs, 3,000+ | 17,000+ staff, 425 clients | 37 yrs, 750+ | "100% ownership, 6–12 weeks, 0 licence fees" |
| FAQ topics | Fit, stack, modernization, team integration, security, after launch | Why custom, models, pricing, cost, how to choose, in-house vs outsourcing | Timeline, integration, cost factors, involvement | (cut off) | Cost, timeline, ownership, integration, build vs buy, after launch (good) |
| Interactive element | No | No | No | ROI quiz, cost calculator | "One order, two ways" race + calculator (unique, but hidden in raw HTML) |

**What the top 3 have that Arrowbin lacks and can honestly add:** a "services" framing in the H1 or lede, a software-types section (CRM, ERP-lite, portals), industries, named people, a cost section with models, security practices by name, and case studies that are actually custom software. **What Arrowbin has that they do not:** a build-vs-buy decision table, a workflow ROI demo, published timelines per step, and a founder-led, own-your-code positioning for startups and small businesses. That is the angle for the long-tail ("custom software development company for startups / small business").

---

## Links

**Outbound (local, in body):** cal.com ("Book a free call"), /work, 3 client sites (nbafl.net, ytshopindia.com, flexoverbd.com), /contact x2 ("Scope a project", "Talk about a team"), /services/maintenance-support, 3 blog posts, 3 related services (UI/UX, Cloud, AI). No link to /about, /services/saas-product-engineering or /services/mobile-app-development from the copy.

**Inbound (19-URL crawl):**
| Source | Region | Anchor |
|---|---|---|
| All 18 other pages | nav / footer | "Custom Software Development" |
| / | main (local); hidden stream (live) | "01 → Custom Software Development Software built around your..." |
| /services | hidden stream (live and local) | "( 01 ) Custom Software Development..." and "Explore Custom Software Development" |
| /about | main | "01 Custom Software Development" |
| 4 service pages | main ("Often combined with") | "Service 01 Custom Software Development..." |
| /blog/how-much-does-custom-software-development-cost | main | "Custom software" |
| /blog/how-to-choose-a-software-development-company | main | "custom software" |

Only two contextual links come from content, both with the generic anchor "custom software". No internal link uses "custom software development company" or "custom software development services". The MVP post does not link here at all, and the /services hub link sits in a hidden streamed block.

---

## Images

| Image | Alt | Bytes desktop / mobile | Loading |
|---|---|---|---|
| North Bengal Agro Farms screenshot | "North Bengal Agro Farms website, built by Arrowbin" | 32 KB / 62 KB | lazy |
| YT Shop India screenshot | "YT Shop India website, built by Arrowbin" | 15 KB / 27 KB | lazy |
| FlexOver BD screenshot | "FlexOver BD website, built by Arrowbin" | 15 KB / 27 KB | lazy |
| Hostinger badge (footer, SVG) | "Arrowbin is a verified Hostinger Partner" | 5 KB | lazy |

All illustrations (dashboard, integrations, legacy terminal, portal roles) are HTML/CSS, not images, so they are crawlable text. Alt text is present everywhere; no image over 200 KB. No action beyond the proof issue (H4).

---

## Schema (local)

- **BreadcrumbList:** Home > Services > Custom Software Development. Valid.
- **Service** (`@id` .../custom-software-development#service): name, description, url, provider (#organization), areaServed (Worldwide, United States, Bangladesh), serviceType, speakable (h1, #service-answer, which exists), hasOfferCatalog with 6 Offers, audience x4. Valid. No `offers`/`PriceSpecification`, no `category`, no link to the cost guide (`subjectOf`).
- **ItemList** "How Arrowbin delivers Custom Software Development" (4 steps). Valid.
- **FAQPage** 6 Q&A. Matches the FAQ text, but that text is in a hidden streamed block in raw HTML (visible after hydration). Kept for AI citation only; no Google rich result since May 2026.
- **Site-wide:** Organization, WebSite, ProfessionalService (Dhaka). Live also emits the St. Petersburg ProfessionalService with geo and hours (FIXED-LOCAL). Organization `founder` reference is dangling here too (see `page-home.md` M2).

---

## CTAs

- Hero: "Book a free call" (cal.com) and a 3-field quote form "Get my free quote" (desktop y=696, mobile y=1,320). Strongest conversion setup of the four pages.
- Mid: "Scope a project" and "Talk about a team" (/contact), "See maintenance & support".
- End: "Book a call" + email, inside the hidden streamed block.
- Missing: a price anchor near the CTA (users who want a number before a call must find the FAQ or the blog).

---

## E-E-A-T

- **Experience:** the three proof cards are a corporate website with ordering, a marketplace and an e-commerce store. None shows an internal tool, integration, portal or legacy rebuild, which is what the page sells. Result lines are factual in the local build (FIXED-LOCAL: "1,000+ verified listings onboarded" is gone).
- **Expertise:** architecture and process are specific and credible; no named engineer or author.
- **Authority:** no reviews, certifications or partner badges relevant to custom software.
- **Trust:** the FAQ price ($8,000 to $75,000+) contradicts the cost guide ($5,000 to $30,000 for an MVP or internal tool; "most business products $30,000 to $120,000") and the homepage ($5,000 to $10,000 start).

---

## AI citability

- **Strong passages:** "What is Custom Software Development?" (about 45 words, `#service-answer`, self-contained definition); the build-vs-buy table (6 rows, clear winners per factor) is exactly the format AI answers lift.
- **Weak:** the cost answer, timeline answer and the whole FAQ are in `<div hidden>` after `</main>` in raw HTML, so non-JS crawlers (GPTBot, ClaudeBot, PerplexityBot fetchers) may skip them. The decorative dashboard text "+24%", "1.2k", "98%" and order numbers are real text nodes, not `aria-hidden`, and could be quoted as if they were results.
- **Entity clarity:** the page never says "Arrowbin is a custom software development company"; an AI answer to "best custom software development company for startups" has no sentence to cite.

---

## Performance (Lighthouse 12 mobile, lab, indicative)

| Build | Perf | LCP | TBT | CLS | LCP element |
|---|---|---|---|---|---|
| Live | 65 | 3.7 s | 710 ms | 0.138 | Hero lede paragraph |
| Local | 78 | 3.2 s | 370 ms | 0.139 | Same |

CLS 0.138 comes from the web-font swap shifting `div.mt-10.grid` in the hero (Lighthouse "layout-shifts"); it is the same live and local. See `performance.md` finding 4 in this folder.

---

## Findings (prioritised)

### H1. Title shared with the homepage and H1 without spaces (live)
- **Priority:** High. **Status:** FIXED-LOCAL.
- **Evidence:** live: both `/` and this page have the title "Custom Software Development Company | Arrowbin"; raw H1 "CustomSoftwareDevelopment". Local: unique title "Custom Software Development Company & Services | Arrowbin", H1 "Custom Software Development".
- **Fix:** deploy (`src/lib/services.ts` line 46, `src/components/services/ServiceHero.tsx`, `src/app/page.tsx`).
- **Effort:** S. **Owner:** dev.
- **How we'd know it failed:** `curl -s https://arrowbin.com/services/custom-software-development | grep -o '<h1.*</h1>' | sed 's/<[^>]*>//g'` prints words without spaces, or the homepage title still contains "Custom Software".

### H2. The primary keyword never appears in the page copy
- **Priority:** High. **Status:** OPEN.
- **Evidence:** body count of "custom software development company" = 0 and of "custom software development services" = 0 (title only). All four ranking pages put "Custom Software Development Services" in the H1, and Avenga/ScienceSoft put "Company" in the title.
- **Fix (copy only, no layout change):**
  1. Hero lede (`intro` in `src/lib/services.ts` lines 56 to 57): "Arrowbin is a custom software development company for startups and growing businesses. Off-the-shelf tools force your business to bend around their limits; we build software that fits the way you actually work..."
  2. Rename H2 "What we build for you" to "Custom software development services" (or keep it as the visual title and add the phrase in the sub-line), in `src/components/services/custom/BuildGallery.tsx`.
  3. Optional, founder decision: make the visual H1 "Custom Software Development Services" (adds one word to a 3-line display heading).
- **Effort:** S. **Owner:** founder (wording) then dev.
- **How we'd know it failed:** the rendered first 150 words of `<main>` do not contain "custom software development company" or "services".

### H3. FAQ, price answer, ROI demo and final CTA are streamed outside `<main>`
- **Priority:** High. **Status:** OPEN (geo.md F-4 on 1 Oct; fixed on the homepage only).
- **Evidence:** raw HTML (live and local) has 2 `<div hidden id="S:n">` blocks after `</main>` holding 545 words: "One order, two ways", the 6 FAQs (including the only price statement on the page) and "Let's build something loud". Source: `src/app/services/[slug]/page.tsx` lines 162 to 164, 177 to 183 wrap `ServiceSignature`, `Faq` and `Cta` in `<Suspense fallback={null}>`. The same pattern repeats for all 8 services (lines 188 to 406).
- **Fix:** remove the Suspense wrappers around `Faq` and `Cta` (server-rendered text) for every service branch; for `ServiceSignature`, move the boundary inside the client-only animated part so its headline and explanatory copy render in place.
- **Effort:** S. **Owner:** dev.
- **How we'd know it failed:** `curl -s http://localhost:3117/services/custom-software-development | grep -c 'hidden id="S:'` is above 0, or the FAQ question text appears after `</main>`.

### H4. Proof does not match the service
- **Priority:** High. **Status:** OPEN (H8 on 1 Oct covered mobile and AI; it applies here too).
- **Evidence:** "Built by us, live today" shows North Bengal Agro Farms (corporate site with ordering), YT Shop India (marketplace) and FlexOver BD (e-commerce store). No internal tool, integration, dashboard or portal is shown, while every top-3 page shows custom-software case studies.
- **Fix:** founder supplies 1 to 2 genuine custom builds (anonymised is fine: "order and invoicing tool for a wholesale distributor, 9 weeks, Next.js + PostgreSQL, replaced 3 spreadsheets"). Until then, retitle the section "Platforms we've built" and describe the custom logic in each card (for YT Shop India: listing verification and payment flow). Data lives in `src/lib/portfolio.ts` and `getServiceExtras` in `src/lib/services.ts`.
- **Effort:** S (copy) to M (case study). **Owner:** founder then dev.
- **How we'd know it failed:** none of the proof cards on this page describes software other than a website or store.

### H5. No visible pricing section, and the FAQ price contradicts the cost guide
- **Priority:** High. **Status:** OPEN (M-1 / H7 on 1 Oct).
- **Evidence:** FAQ "$8,000 for a focused tool to $75,000+ for a full platform" (`src/lib/services.ts` line 123) vs cost guide "$5,000 to $30,000" (MVP/internal tool) and "$30,000 to $90,000" (mid-size) vs homepage "$5,000–$10,000". ScienceSoft has an H2 "Our Pricing Models and Costs" with example ranges; Itransition and Luxoft answer cost in the FAQ.
- **Fix:** founder confirms one set of bands; store them once (for example `src/lib/pricing.ts`); add a static H2 "How much does custom software development cost?" with a 3-row table (focused tool / business platform / SaaS or complex system: price band, typical timeline, example), the pricing models (fixed price per scoped phase, monthly product team, care plan) and a link to the cost guide.
- **Effort:** M. **Owner:** founder (numbers) then dev.
- **How we'd know it failed:** any two pages give different ranges for the same project type, or the page has no price figure inside `<main>`.

### M1. No CRM / ERP / business-systems section (keyword map `#crm-erp`)
- **Priority:** Medium. **Status:** OPEN (M-3 on 1 Oct).
- **Evidence:** 25 mapped keywords (custom CRM development, custom ERP software, inventory management software development...) have no section; CRM/ERP appear only as integration icons and one FAQ answer. Itransition and ScienceSoft list software types explicitly.
- **Fix:** add H2 "CRM, ERP and business systems" (`id="crm-erp"`) with 5 to 6 short H3 blocks: custom CRM, inventory and order management (ERP-lite), booking and scheduling, customer and partner portals, invoicing and accounting integrations, reporting dashboards. Static HTML, 60 to 90 words each.
- **Effort:** M. **Owner:** dev (founder confirms what Arrowbin actually builds).
- **How we'd know it failed:** no H2 containing "CRM" or "ERP" in the raw HTML.

### M2. No industries, no named people
- **Priority:** Medium. **Status:** OPEN.
- **Evidence:** all four ranking pages have an industries block; Luxoft and ScienceSoft show named experts. Arrowbin shows neither.
- **Fix:** an "Industries we have built for" strip limited to industries with live proof (retail and fashion e-commerce, agro-export, marketplaces, agencies), and a "Who builds your software" block: founder card plus roles, linking to /about. No invented headcount.
- **Effort:** S to M. **Owner:** founder then dev.
- **How we'd know it failed:** no industry names and no person's name in the rendered page.

### M3. Weak internal anchor text into this page
- **Priority:** Medium. **Status:** OPEN.
- **Evidence:** only 2 contextual links from content, both "custom software"; none from the MVP post; the /services hub link is in a hidden streamed block.
- **Fix:** in `src/lib/blog.ts`, add links with varied anchors: cost post intro "custom software development services", choose post "a custom software development company", MVP post "custom software development". On /about, link "custom software" in the founder story. Unwrap the Suspense blocks on `/services` (`src/app/services/page.tsx` lines 81 to 95).
- **Effort:** S. **Owner:** dev.
- **How we'd know it failed:** fewer than 4 contextual (in-`<main>`, non-card) links point here in a re-crawl.

### M4. Mobile CLS 0.138 from the web-font swap
- **Priority:** Medium. **Status:** NEW (same live and local).
- **Evidence:** Lighthouse mobile "layout-shifts": `div.mt-10.grid` in the hero, cause web font (woff2). Live CLS 0.138, local 0.139.
- **Fix:** see `performance.md` finding 4: size-adjusted fallback for the display face or preload it on service heroes (`src/app/layout.tsx`, `src/components/services/ServiceHero.tsx`).
- **Effort:** S. **Owner:** dev.
- **How we'd know it failed:** CLS above 0.1 on three mobile Lighthouse runs.

### M5. Security and compliance described without names
- **Priority:** Medium. **Status:** OPEN.
- **Evidence:** "Secure by design: authentication, role-based access, encryption and audit logging"; competitors name ISO 27001, PCI DSS, HIPAA, GDPR.
- **Fix:** name only what is true: OWASP Top 10 review, dependency scanning, backups and restore tests, GDPR-ready data handling, least-privilege access, NDA on request. Do not claim certifications Arrowbin does not hold.
- **Effort:** S. **Owner:** founder confirms, dev writes.
- **How we'd know it failed:** a named standard appears on the page that Arrowbin cannot evidence.

### L1. Decorative mock numbers read as data
- **Priority:** Low. **Status:** OPEN.
- **Evidence:** "+24%", "1.2k", "98%", "#1042 Approved" in the "Web platforms & dashboards" illustration are plain text nodes without `aria-hidden` (checked in raw HTML).
- **Fix:** mark the illustration containers `aria-hidden="true"` in `src/components/services/custom/BuildGallery.tsx` (the card titles and descriptions stay readable).
- **Effort:** S. **Owner:** dev.
- **How we'd know it failed:** text extraction of `<main>` still contains "+24%".

### L2. Service schema has no price or guide link
- **Priority:** Low. **Status:** OPEN.
- **Fix:** once bands are confirmed, add `offers` with `PriceSpecification` and `subjectOf` the cost guide (snippet below), in `serviceSchema()` in `src/lib/schema.ts`.
- **Effort:** S. **Owner:** dev.
- **How we'd know it failed:** Rich Results / Schema validator shows the Service without `offers` after prices are published.

### L3. og:image has no alt on service pages
- **Priority:** Low. **Status:** OPEN.
- **Evidence:** home has `og:image:alt`; this page does not.
- **Fix:** add `alt` to the `openGraph.images` entry in `generateMetadata` (`src/app/services/[slug]/page.tsx` lines 83 to 89).
- **Effort:** S. **Owner:** dev.
- **How we'd know it failed:** `curl -s <url> | grep -c 'og:image:alt'` returns 0.

---

## Recommended section outline to beat the current top 3

Target about 2,800 to 3,300 words (top 3 are about 2,000 each; ScienceSoft's 12,000-word page is not the model). Keep the existing design components; new sections are static HTML in the same style. Order:

1. **Hero:** H1 "Custom Software Development" (or "...Services" if approved). Lede opens with "Arrowbin is a custom software development company for startups and growing businesses." Keep the 3-field quote form and "Book a free call".
2. **H2 What is custom software development?** Keep the 45-word definition and the three stats.
3. **Is this for you? / What you get** (keep).
4. **H2 Custom software development services** (renamed "What we build for you"): the 6 deliverables plus 2 cross-links (MVP and SaaS builds, AI features).
5. **H2 CRM, ERP and business systems** (`#crm-erp`, new): 6 software types, 60 to 90 words each.
6. **H2 One order, two ways** (keep; rendered inside `<main>`).
7. **H2 Built in layers, built to last** (keep) with an H3 "Security practices" listing named, true practices.
8. **H2 How we deliver** (keep durations) plus one deliverable per step (scope document, clickable prototype, weekly demo, handover docs).
9. **H2 How much does custom software development cost?** (new): 3-row band table from the single price source, pricing models, link to the cost guide (and a calculator later).
10. **H2 Off-the-shelf or built for you?** (keep the table).
11. **H2 Custom software we have built** (replaces "Built by us, live today"): 2 to 3 relevant case summaries (problem, what we built, stack, timeline, factual outcome), each linking to `/work/<slug>` when those pages exist.
12. **H2 Industries we have built for** (new, proof-backed only).
13. **H2 Three ways to start** (keep) with starting prices once confirmed.
14. **H2 Who builds your software** (new): founder card, roles, link to /about; reviews widget when Clutch or GoodFirms reviews exist.
15. **H2 Read before you build** (keep 3 guides).
16. **FAQ** (keep 6, add 4): "How do I choose a custom software development company?" (links to the choose post), "Can you work with our in-house team?", "Do you sign an NDA?", "Which technologies do you use?".
17. **Often combined with + final CTA** (keep, rendered inside `<main>`).

Long-tail focus while the head term is out of reach: "custom software development company for startups", "custom software development for small business", "custom CRM development", "custom software development company USA" (via listings, see `../05-keyword-map`).

---

## Schema suggestion (extend the existing Service node once prices are confirmed)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://arrowbin.com/services/custom-software-development#service",
  "name": "Custom Software Development",
  "serviceType": "Custom software development",
  "category": "Software development",
  "provider": {"@id": "https://arrowbin.com/#organization"},
  "areaServed": [{"@type": "Place", "name": "Worldwide"}],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "minPrice": 8000,
      "priceCurrency": "USD",
      "description": "Fixed estimate after a free discovery call. Replace minPrice with the founder-confirmed starting band."
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Custom software development services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Custom CRM development"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Inventory and order management systems"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Customer and partner portals"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "API and system integrations"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Legacy software modernization"}}
    ]
  },
  "subjectOf": {
    "@type": "BlogPosting",
    "@id": "https://arrowbin.com/blog/how-much-does-custom-software-development-cost",
    "headline": "How Much Does Custom Software Development Cost in 2026?"
  }
}
```
(Keep the existing `audience`, `speakable` and the deliverables already in the catalogue. Do not publish `minPrice` until it matches the single price source.)

---

## Evidence and sources
- Raw HTML (14 Oct): live 283 KB, local 282 KB, both 200; `grep -c 'hidden id="S:'` = 2 on both.
- Rendered text: Playwright desktop and mobile (`scratchpad/rend/local-custom.main.txt`), mobile fold screenshot `local-custom-mobile-fold.png`.
- Lighthouse 12 mobile JSON: `lh/live-custom.json`, `lh/local-custom.json`.
- Competitors fetched 14 Oct: [avenga.com](https://www.avenga.com/custom-software-development/), [itransition.com](https://www.itransition.com/software-development), [luxoft.com](https://www.luxoft.com/services/custom-software-development), [scnsoft.com](https://www.scnsoft.com/software-development/custom). Web search sample: [andersenlab.com](https://andersenlab.com/services/custom-software-development), [innowise.com](https://innowise.com/services/custom-software-development/), [openxcell.com](https://www.openxcell.com/custom-software-development-company).
