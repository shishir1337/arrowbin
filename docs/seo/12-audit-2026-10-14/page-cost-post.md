# Page analysis: https://arrowbin.com/blog/how-much-does-custom-software-development-cost

**Date:** 14 October 2026. **Primary keyword:** how much does custom software development cost (66 mapped keywords: custom software development cost, software development cost breakdown, cost to build custom software, software development pricing, hourly rates by region...). **Intent:** informational with high commercial value (buyers in research phase).
**Method:** as `page-home.md` (curl raw HTML live and local, stdlib parser, Playwright desktop and mobile, Lighthouse 12 mobile lab, 19-URL inbound crawl, WebFetch of ranking guides).
**SERP baseline:** 29 Sep (`../03-serp` #27): saritasa.com, cleveroad.com, eventpro.net. 1 Oct (`../11-audit-2026-10-01/sxo.md`): Velvetech, Saritasa, Softsuave, then OpenArc, GainHQ, Cozcore, Kimei, Vrinsofts; Cleveroad dropped out of the top 9. A 14 Oct web search returned a fresh wave of "2026" guides (TechnBrains, Space-O, MTechZilla, GainHQ, Cozcore, Shimira "Rates + Calculator"). The SERP is volatile and rewards freshness, tables and cited numbers. Difficulty: Medium-High; no directories. Guides fetched for comparison: Velvetech, Saritasa, Cleveroad, GainHQ (Softsuave was not fetched).

---

## Score card

| Category | Live | Local |
|---|---|---|
| On-Page SEO | 78 | 78 |
| Content Quality | 62 | 62 |
| Technical | 78 | 78 |
| Schema | 85 | 85 |
| Images | 82 | 88 |
| **Overall** (25/30/20/15/10) | **75** | **75** |

```
On-Page SEO:     78/100  ████████░░
Content Quality: 62/100  ██████░░░░
Technical:       78/100  ████████░░
Schema:          85/100  ████████░░
Images:          88/100  █████████░
```

This is the best-optimised of the four pages: answer-first, four HTML tables, a founder byline with photo and LinkedIn, dates, seven FAQs and a key-takeaways list. The local build changes only the related-post image alts. What holds it back is trust in its numbers (one mismatched citation, a "real example" that is not real, a claim that the ranges come from Arrowbin's own projects), missing sections that newer guides now carry (cost by software type, estimation method, rates by seniority, TCO, AI), and a weak path from reading to booking.

---

## On-page snapshot

| Element | Value (live = local) | Assessment |
|---|---|---|
| Title | "How Much Does Custom Software Development Cost in 2026?" (55 chars) | Exact query + year. No brand suffix (acceptable for a guide) |
| Meta description | 150 chars: "Custom software development costs in 2026: price ranges by project type, what drives the number, regional rates, hidden costs, and how to spend smart." | Good; could lead with the range ("$5,000 to $250,000+") to win the click |
| Canonical / robots | self / index, follow | OK |
| OG / Twitter | og:type article, 1200x630 route image, summary_large_image | OK |
| URL | /blog/how-much-does-custom-software-development-cost | Exact-match slug, no year (good for refreshes) |
| H1 | "How Much Does Custom Software Development Cost in 2026?" | OK |
| First H2 | "How much does custom software development cost in 2026?" | Duplicates the H1 word for word (L1) |
| Byline / dates | Md. Shishir Ahmed, Founder; "Published May 12, 2026 · Updated June 20, 2026" (`<time>` elements) | Good; Velvetech updated 17 Aug 2026 |
| Words | 2,900 rendered in `<main>`; about 2,570 prose words; 40 words (final CTA) streamed outside `<main>` | In range: Saritasa about 1,700, Velvetech about 3,000, Cleveroad about 3,000, GainHQ about 4,500 to 5,000 |
| Readability (prose) | Flesch 62, grade 8.2, 14.4 words/sentence | Good |
| Tables | 4 (project type, rates by region, fixed vs T&M, $60k breakdown) | Cleveroad 7, GainHQ 7 |
| External citations | 1 (survey.stackoverflow.co, "developer-rate data") | GainHQ 8, Velvetech 3, Saritasa 2 |
| Keyword use | exact question 5x; "custom software development cost" 10x; "hourly" 9x; "offshore" 0; "Bangladesh" 0 ("Dhaka" 1) | Natural |

### Heading outline
```
H1  How Much Does Custom Software Development Cost in 2026?
    [THE SHORT ANSWER box, #tldr, ~65 words]
H2  How much does custom software development cost in 2026?          (duplicate of H1)
H2  What is actually included in a software development cost?
H2  What factors affect custom software development costs the most?
    H3 1. Scope / 2. Technical complexity / 3. Design depth / 4. Platforms and devices / 5. Team seniority and location
H2  How much does each type of software project cost?
    H3 MVP or internal tool: $5,000 to $30,000
    H3 Mid-size web or mobile app: $30,000 to $90,000
    H3 SaaS platform: $80,000 to $200,000
    H3 Mobile apps and enterprise systems: $50,000 to $500,000+
H2  How does developer location and seniority affect price?
H2  Fixed price vs time & materials: which costs less?
H2  What hidden costs should you budget for?
H2  How can you reduce software costs without sacrificing quality?
H2  A real example: what a $60,000 SaaS MVP looks like
H2  So, how much should you budget?
H2  Key takeaways
H2  Questions? Answered.   (7 FAQ H3s)
H2  More before you build  (2 related posts)
H2  Let's build something loud   (streamed after </main>)
```
Question-style H2s map well to People Also Ask and AI sub-queries. The mobile/enterprise H3 mixes two unrelated categories and overlaps the SaaS and mid-size bands.

---

## Entity and topic coverage vs ranking guides

| Topic | Saritasa | Velvetech | Cleveroad | GainHQ | Arrowbin |
|---|---|---|---|---|---|
| Answer-first range | "$50,000 to $250,000 for most projects" | "$5,000 to $1,000,000+" | "$40,000 to $500,000+" | "$15,000 to $300,000+" plus Clutch average $132,000 / 13 months | "$5,000 to $250,000+, most $30,000 to $120,000" (good) |
| Cost by project size / tier | 3 tiers | 4 tiers (qualitative) | 3 tiers + project type (new, modernization, integration) | 4 tiers | 4 project types |
| Cost by software type (CRM, ERP, e-commerce, marketplace) | No | 7 types (qualitative) | Domains (healthcare, logistics, fintech) | 6 types with ranges | **No** |
| Budget split by phase | Yes (design 10 to 25%, dev 60 to 75%...) | Yes (BA, UI/UX, PM, dev+QA) | No | Yes | Yes (10/15/50/15/10) |
| Hourly rates by region | Offshore $25 to US $250 | No | 5 regions x junior/mid/senior | 4 regions x junior/mid/senior | 5 regions, blended senior only, **source mismatched** |
| Team roles | No | Role table by project size | PM, BA, FE, BE | Roles listed | No |
| Pricing models | No | Fixed, T&M, dedicated team, hybrid | Outsourcing vs outstaffing | Fixed, hourly, hybrid | Fixed vs T&M only |
| Maintenance % | 15 to 20% | Mentioned, no % | 15 to 25% | 15 to 25% | 15 to 20% (unsourced) |
| Hidden / ongoing costs with numbers | Partial | Licences, servers, migration | Feature creep 10 to 20%, hosting $30 to $500/month, licences $50 to $300/month | Integrations, infra, support | 6 items, **no numbers** |
| Estimation method | No | Template + checklist + "why estimates are wrong" | Rough vs detailed estimate | 7-step framework | No (only "fixed estimate after discovery") |
| Custom vs off-the-shelf TCO | No | No | No | 3- and 5-year TCO tables | FAQ line ("break-even within 2 to 3 years", unsourced) |
| AI's effect on cost | No | No-code / low-code | No | Dedicated H2 | **No** |
| ROI | No | No | No | ROI formula + worked example | No |
| Compliance cost | HIPAA, SOC 2, GDPR | No | GDPR, HIPAA, audits | Yes | One bullet |
| Worked example | $100k maintenance | Mobile app phases | Client case (Row Nation) | 1,200 h x $50 | "$60,000 SaaS MVP" (representative, labelled "real") |
| Calculator | No | No | No | No | No (a 14 Oct result, Shimira, advertises one) |
| Author credentials | Bio, 10+ yrs | Name + short bio | CTO + BA + solution architect | Name only | Founder, photo, LinkedIn, one-line bio |
| FAQ count | 0 | 3 embedded | 4 | 9 | 7 |
| Sources | Statista, Forbes | Grand View, Sensor Tower, Glassdoor | Springer x2 | Clutch, Andersen, McKinsey, Business of Apps, Keyhole... | Stack Overflow survey (salaries, not agency rates) |

**Arrowbin's opening:** no ranking guide gives a transparent, cited rate table *and* a calculator *and* a real project breakdown. Arrowbin can be the guide that shows its own price bands next to market ranges, which is also what AI answers look for (a named company stating a concrete number).

---

## Links

**Outbound, in body:** /services/custom-software-development (anchor "Custom software", intro), survey.stackoverflow.co ("developer-rate data"), /blog/how-to-choose-a-software-development-company ("evaluate a senior team"), /about ("More about Arrowbin"), LinkedIn (author), 2 related posts, share buttons. The closing sentence "book a free 30-minute call" is plain text, not a link. The only booking link is the closing CTA, which is streamed after `</main>` (`src/app/blog/[slug]/page.tsx` lines 254 to 256).

**Missing outbound links:** the post discusses SaaS platforms, mobile apps, maintenance (15 to 20% a year), e-commerce/marketplaces and AI features but links none of `/services/saas-product-engineering`, `/services/mobile-app-development`, `/services/maintenance-support`, `/services/ecommerce-development` or `/services/ai-automation`.

**Inbound (15 links from 10 pages):** /blog (title link plus 3 FAQ teaser links), 7 service pages ("Read before you build" cards), the choose and MVP posts ("what custom software costs" and title links). No link from `/` or from `/services`. Anchors are mostly the full title; "what custom software costs" is the only descriptive variant.

---

## Images

| Image | Alt | Bytes (desktop) | Loading |
|---|---|---|---|
| Hero: team-collaboration.webp | "A software development team collaborating around a screen, planning a project budget and scope" | 68 KB | eager, preloaded (correct for LCP) |
| 7 in-body infographics (WebP and SVG) | Descriptive, include the data ("from North America at $120-180 to South Asia at $25-60") | 0.8 to 16 KB | lazy |
| Author photo (byline 44px) | empty (decorative, name is adjacent: acceptable) | 0.5 KB | lazy |
| Author photo (bio box) | "Md. Shishir Ahmed, Founder of Arrowbin" | 1 KB | lazy |
| 2 related-post covers | live: empty alt; local: descriptive | 25 to 37 KB | lazy |

The related-post alts are FIXED-LOCAL. Every chart's data is also in an HTML table or list except the budget split (list) and the 14-week timeline (image only), so AI crawlers lose nothing important.

---

## Schema

- **BlogPosting:** headline, description, url, mainEntityOfPage, image (1200x630), inLanguage, keywords, wordCount 1,950 (body text only), articleSection, speakable (h1, `#tldr`, which exists), datePublished 2026-05-12, dateModified 2026-06-20, author Person (`@id` #founder, name, image, url, LinkedIn sameAs), publisher (#organization). Valid.
- **BreadcrumbList:** Home > Blog > post. Valid.
- **FAQPage:** 7 Q&A matching the visible FAQ. AI-citation value only.
- **Missing:** author `jobTitle` and `knowsAbout`; `citation` for sources; `about` / `mentions` linking the custom-software Service node. Live also carries the St. Petersburg ProfessionalService (FIXED-LOCAL).

---

## CTAs and conversion path

- In-article: none. The text "book a free 30-minute call" (blog.ts line 459) is unlinked.
- End: "Book a call" block, streamed outside `<main>`.
- No calculator, no "get a fixed estimate for your scope" form, no link to /contact. The 1 Oct SXO audit flagged the same: "One CTA at the end".
- This is the page most likely to attract a buyer with a budget question; it should be the site's best lead page.

---

## E-E-A-T

- **Experience:** "We build custom software for a living"; "These ranges come from Arrowbin's own delivered projects" (blog.ts line 99). The portfolio shows commerce and corporate sites, not $150,000 to $500,000 enterprise systems, so the claim overreaches for the upper tiers. The "$60,000 SaaS MVP" is introduced as "a worked example of a real $60,000 build" (line 99) and headed "A real example" (line 420), but the body says "a representative breakdown" and it re-applies the 10/15/50/15/10 split.
- **Expertise:** clear, practitioner-style explanations; one founder quote; no technical reviewer.
- **Authority:** one external link, and it points at salary data (Stack Overflow Developer Survey) to support agency hourly rates.
- **Trust:** internal inconsistency ("most business products land between $30,000 and $120,000" in the short answer vs "between $40,000 and $120,000" two paragraphs later) and conflicts with the homepage ($5,000 to $10,000 start) and the service FAQ ($8,000 to $75,000+).

---

## AI citability

- **Strong:** the 65-word short answer (`#tldr`) is ideal; the project-type table, rates table and FAQ answers are self-contained and numeric. All of it is inside `<main>` in raw HTML.
- **Weak:** numbers are not attributed, so an AI answer citing "North America $120 to $180/hour" cannot tie it to a source; there is no sentence of the form "Arrowbin charges X for Y", which is what gets a brand named in "how much does it cost" answers; GPTBot and ClaudeBot (training) still get 403 at Cloudflare, while OAI-SearchBot, Claude-SearchBot and PerplexityBot get 200.

---

## Performance (Lighthouse 12 mobile, lab, indicative)

| Build | Perf | LCP | TBT | CLS | LCP element |
|---|---|---|---|---|---|
| Live | 81 | 3.1 s | 480 ms | 0 | H1 text |
| Local | 74 | 3.9 s | 510 ms | 0.001 | H1 text |

The live/local gap is run variance (other audit agents were running Lighthouse at the same time). The blog template is the fastest on the site; TBT is still above 200 ms.

---

## Findings (prioritised)

### H1. Rate table and ranges are not supported by their only citation
- **Priority:** High. **Status:** OPEN (H-4 on 1 Oct).
- **Evidence:** "These ranges come from Arrowbin's own delivered projects and publicly available developer-rate data" links to https://survey.stackoverflow.co/, which publishes developer salaries, not agency hourly rates (`src/lib/blog.ts` line 99). Maintenance "15–20%" and "break-even within 2–3 years" have no source. GainHQ cites Clutch's pricing data (average project about $132,000 over 13 months) and Andersen's regional rates; Cleveroad and GainHQ give rates by seniority.
- **Fix:** re-source the rate table from published agency-rate data (for example Clutch's pricing pages, https://clutch.co/developers/pricing, checked and dated), present it by region and seniority, label any Arrowbin estimate as such, cite the maintenance range, and add a "Sources" list at the end. Do not copy competitor numbers without attribution.
- **Effort:** M. **Owner:** founder (approves numbers) and writer/dev.
- **How we'd know it failed:** any number in the rate table or key takeaways without a linked source or an "Arrowbin estimate" label.

### H2. "A real example" is a representative model
- **Priority:** High. **Status:** OPEN (H-3 on 1 Oct).
- **Evidence:** intro "a worked example of a real $60,000 build" (line 99); H2 "A real example: what a $60,000 SaaS MVP looks like" (line 420); body "here is a representative breakdown".
- **Fix:** rename to "Worked example: a typical $60,000 SaaS MVP" and fix the intro, or replace with an anonymised Arrowbin project with specifics (scope, weeks, team, what slipped). Also soften "These ranges come from Arrowbin's own delivered projects" to what is true (for example "from Arrowbin's own quotes and delivered projects up to $X, plus the sources below").
- **Effort:** S. **Owner:** founder (fact check) then dev.
- **How we'd know it failed:** the words "real example" or "real $60,000" remain without a named or specifically described delivered project.

### H3. No conversion path inside the article
- **Priority:** High. **Status:** OPEN (SXO 1 Oct).
- **Evidence:** the in-text "book a free 30-minute call" is unlinked (line 459); the only booking link is the closing CTA, which is in a hidden streamed block after `</main>` (`src/app/blog/[slug]/page.tsx` lines 254 to 256); no calculator, no estimate form.
- **Fix:** (1) link the sentence to https://cal.com/arrowbin/30min or /contact; (2) add one inline CTA card after the project-type table ("Get a fixed estimate for your scope") and one after "So, how much should you budget?"; (3) remove the Suspense wrapper around `Cta` in the blog template; (4) link to `/tools/software-cost-calculator` when it ships (keyword map P1).
- **Effort:** S (1 to 3), L (calculator). **Owner:** dev.
- **How we'd know it failed:** no `cal.com` or `/contact` link inside `<main>` before the FAQ.

### H4. Prices conflict inside the post and with the rest of the site
- **Priority:** High. **Status:** OPEN (M-1 / H7 on 1 Oct).
- **Evidence:** short answer "most business products land between $30,000 and $120,000" (line 91) vs "between $40,000 and $120,000" (line 108); homepage "$5,000–$10,000" start; custom-software FAQ "$8,000 to $75,000+"; mobile FAQ "$12,000 and $40,000" for an MVP vs the post's "Mobile apps and enterprise systems: $50,000 to $500,000+".
- **Fix:** one price source (for example `src/lib/pricing.ts`) feeding all FAQs; in the post, separate "market ranges (cited)" from "Arrowbin's starting prices"; split the "Mobile apps and enterprise systems" H3 into two rows consistent with the mobile service page.
- **Effort:** M. **Owner:** founder (numbers) then dev.
- **How we'd know it failed:** two different ranges for the same project type anywhere on the site.

### M1. Missing sections that newer guides now carry
- **Priority:** Medium. **Status:** OPEN.
- **Evidence:** see the coverage table: no cost by software type, no estimation method, no rates by seniority, no dedicated-team model, no ongoing-cost numbers, no TCO table, no AI section.
- **Fix:** add, as static HTML tables, in this order of value: "Cost by type of software" (CRM, inventory/ERP-lite, e-commerce store, marketplace, SaaS, mobile app, AI feature add-on), "How to estimate your project's cost" (5 steps with a worked formula), "Ongoing costs after launch" (monthly ranges), "Custom vs off-the-shelf: 3-year cost" (cite vendor pricing pages), "How AI tools change cost in 2026" (short and honest). Add "Dedicated product team" as a third pricing model.
- **Effort:** L (about 1,000 to 1,400 new words). **Owner:** writer, founder review.
- **How we'd know it failed:** the post still has 4 tables and no H2 containing "estimate" or "type of software" after the refresh.

### M2. The post links to only one money page
- **Priority:** Medium. **Status:** OPEN.
- **Evidence:** one body link to `/services/custom-software-development` (anchor "Custom software"); none to SaaS, mobile, maintenance, e-commerce or AI pages, although each is discussed. Not linked from `/` or `/services`.
- **Fix:** add contextual links: SaaS H3 to `/services/saas-product-engineering`, mobile H3 to `/services/mobile-app-development`, hidden-costs maintenance bullet to `/services/maintenance-support`, "marketplace" to `/services/ecommerce-development`, AI features to `/services/ai-automation`; use "custom software development services" as the anchor for the existing link. Add the post to the homepage guides block (`page-home.md` H4).
- **Effort:** S. **Owner:** dev (`src/lib/blog.ts`).
- **How we'd know it failed:** fewer than 5 service-page links inside the article body.

### M3. Thin author signals
- **Priority:** Medium. **Status:** OPEN (M-6 on 1 Oct, about page).
- **Evidence:** bio is one line ("Founder of Arrowbin. Writes about shipping software, what it costs..."); no years of experience, no projects, no reviewer. Cleveroad shows a CTO with a Forbes Council membership plus a business analyst and a solution architect.
- **Fix:** 60 to 100-word bio (years building software, what he has shipped, stack), "Reviewed by" an engineer if one exists, and `jobTitle` plus `knowsAbout` in the Person schema (`founderSchema()` in `src/lib/schema.ts` line 243).
- **Effort:** S. **Owner:** founder (facts) then dev.
- **How we'd know it failed:** the author box still has a single sentence.

### M4. Freshness lag in a "2026" SERP
- **Priority:** Medium. **Status:** OPEN.
- **Evidence:** "Updated June 20, 2026"; Velvetech updated 17 Aug 2026; several new "2026" guides appeared between 29 Sep and 14 Oct.
- **Fix:** ship the H1, H2, H4 and M1 changes as one substantive refresh, then update `dateModified` (and sitemap `lastmod`) only for real content changes; schedule a quarterly review.
- **Effort:** S (process). **Owner:** founder / writer.
- **How we'd know it failed:** `dateModified` older than 120 days, or bumped without visible changes.

### L1. First H2 repeats the H1
- **Priority:** Low. **Status:** NEW.
- **Evidence:** H1 "How Much Does Custom Software Development Cost in 2026?" and H2 "How much does custom software development cost in 2026?" (line 104).
- **Fix:** rename the H2 to "Custom software development cost by project type (2026)", which also targets a secondary keyword.
- **Effort:** S. **Owner:** dev.
- **How we'd know it failed:** H1 and first H2 are identical ignoring case.

### L2. The offshore angle Arrowbin is best placed to own is missing
- **Priority:** Low. **Status:** NEW (founder decision).
- **Evidence:** "offshore" 0, "Bangladesh" 0; the post argues "the best value is usually a senior team in a lower-cost region" without saying what that looks like in practice. The keyword map's P1 page `/offshore-software-development-bangladesh` has low difficulty.
- **Fix:** if the founder agrees (offices are not to be emphasised), add a short neutral section "What a South Asia-based senior team costs" with a link to the offshore page once it exists. Otherwise skip.
- **Effort:** S. **Owner:** founder.
- **How we'd know it failed:** n/a (decision item).

### Info. Related-post image alts
- **Status:** FIXED-LOCAL (live: empty alt on both related-post covers; local: descriptive alts).

---

## Recommended section outline to beat the current top 3

Target about 3,800 to 4,300 words, 8 or more HTML tables, a Sources list, two inline CTAs, and one real Arrowbin data point. Keep the existing order where it works; new or changed sections are marked.

1. **H1** How Much Does Custom Software Development Cost in 2026? Byline, photo, "Updated <date>", "Reviewed by" (if available).
2. **The short answer** (keep, 50 to 65 words) with one cited benchmark (for example Clutch's average project cost, linked and dated).
3. **H2 Custom software development cost by project type (2026)** (renamed): keep the table; add a column "Typical team and timeline"; split mobile and enterprise rows. Inline CTA card.
4. **H2 Cost by type of software** (new): CRM, inventory/ERP-lite, e-commerce store, marketplace, SaaS, mobile app, internal tool, AI feature add-on. Each row links to its service page.
5. **H2 What is included in the price?** (keep budget split; keep it as a list or table).
6. **H2 What drives the cost?** (keep 5 factors, add integrations and compliance).
7. **H2 Hourly rates by region and seniority** (reworked, cited): region x junior/mid/senior, plus "the same 1,000-hour project in four regions" total-cost table.
8. **H2 How to estimate your project's cost** (new): 5 steps (list features, size each, hours x blended rate, add 10 to 20% contingency, add year-one running costs) and a link to the calculator when it ships.
9. **H2 Pricing models: fixed price, time and materials, dedicated team** (expanded table).
10. **H2 Ongoing costs after launch** (reworked hidden costs): monthly ranges for hosting, third-party services, maintenance (cited 15 to 20% or 15 to 25%), support.
11. **H2 Custom software vs off-the-shelf: 3-year cost** (new table, vendor pricing cited).
12. **H2 How AI tools change software costs in 2026** (new, 150 to 250 words, honest about where savings are and are not).
13. **H2 How to reduce cost without cutting quality** (keep).
14. **H2 Worked example: a $60,000 SaaS MVP** (renamed) or a real anonymised Arrowbin project.
15. **H2 So, how much should you budget?** (keep) with a linked CTA and Arrowbin's own starting prices from the single price source.
16. **Key takeaways** (keep, numbers sourced).
17. **FAQ** (keep 7, add: "How much does it cost to hire a software development company?", "What is the average cost of a custom software project?", "Does AI reduce software development cost?").
18. **Sources** (new list).
19. **Author box** (expanded bio) and **CTA** rendered inside `<main>`.

---

## Schema suggestion (extend the existing BlogPosting)

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://arrowbin.com/blog/how-much-does-custom-software-development-cost#article",
  "headline": "How Much Does Custom Software Development Cost in 2026?",
  "datePublished": "2026-05-12",
  "dateModified": "2026-06-20",
  "author": {
    "@type": "Person",
    "@id": "https://arrowbin.com/#founder",
    "name": "Md. Shishir Ahmed",
    "jobTitle": "Founder, Arrowbin",
    "url": "https://arrowbin.com/about",
    "knowsAbout": ["Custom software development", "Software project estimation", "Next.js"],
    "sameAs": ["https://www.linkedin.com/in/md-shishir-ahmed"]
  },
  "publisher": {"@id": "https://arrowbin.com/#organization"},
  "about": {"@type": "Thing", "name": "Custom software development cost"},
  "mentions": {"@id": "https://arrowbin.com/services/custom-software-development#service"},
  "citation": [
    {"@type": "CreativeWork", "name": "Clutch: software development pricing", "url": "https://clutch.co/developers/pricing"}
  ]
}
```
(Merge into the existing node from `blogPostingSchema()` in `src/lib/schema.ts`; keep image, keywords, wordCount, speakable and inLanguage. Only list sources the article actually cites, and set `dateModified` to the refresh date.)

---

## Evidence and sources
- Raw HTML (14 Oct): live 279 KB, local 278 KB; `grep -c 'hidden id="S:'` = 1 on both (closing CTA, 40 words).
- Rendered text: `scratchpad/rend/local-cost.main.txt`; `<time>` values 2026-05-12 and 2026-06-20.
- Lighthouse 12 mobile JSON: `lh/live-cost.json`, `lh/local-cost.json`.
- Source lines: `src/lib/blog.ts` lines 91, 95, 99, 104, 108, 420, 459; `src/app/blog/[slug]/page.tsx` lines 254 to 256.
- Guides fetched 14 Oct: [saritasa.com](https://www.saritasa.com/insights/how-much-does-custom-software-development-cost), [velvetech.com](https://velvetech.com/blog/custom-software-development-cost/), [cleveroad.com](https://www.cleveroad.com/blog/software-development-cost/), [gainhq.com](https://gainhq.com/blog/custom-software-development-cost/), [eventpro.net](https://www.eventpro.net/how-much-does-custom-software-development-cost.html). Web search sample (14 Oct): [technbrains.com](https://www.technbrains.com/blog/custom-software-development-costs/), [spaceotechnologies.com](https://www.spaceotechnologies.com/blog/software-development-cost/), [cozcore.com](https://www.cozcore.com/blog/custom-software-development-cost-guide/), [shimirait.com](https://shimirait.com/guides/custom-software-development-cost).
