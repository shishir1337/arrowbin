# Content quality and E-E-A-T audit: arrowbin.com

**Date:** 1 October 2026 (site live since 29 September 2026)
**Scope:** 17 URLs: `/`, `/services`, 8 x `/services/<slug>`, `/work`, `/about`, `/contact`, `/blog`, 3 blog posts.
**Method:** raw HTML fetched with curl (all 17 returned 200), visible text extracted with a local HTML parser (scripts, styles, SVG and JSON-LD removed). Headings, title, meta description, canonical and JSON-LD types parsed per page. Cross-page boilerplate measured by exact-line matching across the 8 service pages. Readability computed with Flesch Reading Ease / Flesch-Kincaid Grade using a heuristic syllable counter. Checked against `00-brief/business-brief.md`, `05-keyword-map/keyword-map.md`, `src/lib/testimonials.ts`, `src/lib/portfolio.ts` and `src/lib/schema.ts`. The plugin Python runtime was not used.

**Caveat on raw text:** the site renders animated text as duplicated or per-letter spans. Word counts below include some duplication and site chrome; main-content estimates are given where they matter.

---

## Scores

| Score | Value | One-line reason |
|---|---|---|
| **Content Quality** | **56 / 100** | Strong structure, depth and readability, pulled down hard by fabricated testimonials and placeholder outcome metrics that are live. |
| **On-Page** | **68 / 100** | Clean titles and descriptions, FAQ and answer-first blocks, but the homepage still cannibalises the custom-software primary keyword and several service titles/H1s miss their mapped keyword. |
| E-E-A-T (weighted) | 41 / 100 | See breakdown. Trust is the weakest factor. |
| AI citation readiness | 68 / 100 | Good short-answer blocks, HTML tables and FAQs; weak sourcing and some key data only in images. |

### E-E-A-T breakdown (skill's internal weighting, not Google's)

| Factor | Weight | Score | Evidence |
|---|---|---|---|
| Experience | 20% | 45 | 8 live, clickable client sites and 7 named clients are genuine first-hand proof. But the per-project outcome metrics are placeholders, "A real example" sections in two posts are generic models, and there are no case studies (`/work/<slug>` parked). |
| Expertise | 25% | 55 | Named author (Md. Shishir Ahmed) with Person schema and LinkedIn `sameAs` on every post; technically sound content on MVP scoping, pricing models, RAG, CI/CD, WCAG 2.2 AA. No bio beyond one line, no credentials, no years of experience, no named engineers despite "senior team" claims. |
| Authoritativeness | 25% | 30 | No third-party reviews (Clutch, Google, GoodFirms), no press, no awards, no certifications beyond the Hostinger partnership. Blogs cite one external source in total. |
| Trustworthiness | 30% | 35 | Positives: legal entity (Arrowbin LLC), two phone numbers, email, booking link, privacy/terms, affiliate link disclosed and marked `rel="sponsored"`, AggregateRating deliberately withheld from schema. Negatives: fabricated testimonials and placeholder performance claims shown to buyers (Critical). |

Weighted: 0.20 x 45 + 0.25 x 55 + 0.25 x 30 + 0.30 x 35 = **40.75**.

### Page inventory

| URL | Primary keyword (map) | Title | H1 (as rendered text) | Words (raw, incl. chrome) | Answer-first intro |
|---|---|---|---|---|---|
| `/` | software development company | Custom Software Development Company \| Arrowbin | "Arrowbin, a custom software development company: software that moves." (sr-only) | 1,205 | Partial (hero line, FAQ answer is answer-first) |
| `/services` | software development services | Software Development Services \| Arrowbin | Software development services | 746 | Yes (short) |
| `/services/custom-software-development` | custom software development company | Custom Software Development Company \| Arrowbin | Custom Software Development | 1,891 | Yes (definition block) |
| `/services/ecommerce-development` | ecommerce development company | E-commerce Development Services \| Arrowbin | E-commerce Development | 1,523 | Yes |
| `/services/mobile-app-development` | mobile app development company | Mobile App Development Company \| Arrowbin | Mobile App Development | 1,407 | Yes |
| `/services/saas-product-engineering` | saas development company | SaaS Development & Product Engineering \| Arrowbin | SaaS & Product Engineering | 1,538 | Yes |
| `/services/ui-ux-design` | ui ux design agency | UI/UX Design Services \| Arrowbin | UI/UX Design | 1,374 | Yes |
| `/services/ai-automation` | ai automation agency | AI Automation Services \| Arrowbin | AI Automation | 1,503 | Yes |
| `/services/cloud-devops-hosting` | devops consulting services | Cloud, DevOps & Hosting Services \| Arrowbin | Cloud, DevOps & Hosting | 1,356 | Yes |
| `/services/maintenance-support` | software maintenance and support services | Software Maintenance & Support Services \| Arrowbin | Maintenance & Support | 1,413 | Yes |
| `/work` | (portfolio) | Our Work & Portfolio \| Arrowbin | Built. Shipped. Live. | 484 | n/a |
| `/about` | (brand) | About Arrowbin \| Software Development Company | We build it like it's ours. | 656 | Yes (one sentence) |
| `/contact` | (conversion) | Contact Arrowbin \| Free Software Consultation | Tell us what you're building. | 521 | n/a |
| `/blog` | (hub) | Blog & Insights \| Arrowbin | Read before you build. | 473 | n/a |
| `/blog/how-much-does-custom-software-development-cost` | how much does custom software development cost | matches | matches | 3,246 | Yes ("The short answer") |
| `/blog/how-to-choose-a-software-development-company` | how to choose a software development company | matches | matches | 2,572 | Yes |
| `/blog/how-long-does-it-take-to-build-an-mvp` | how long does it take to build an mvp | matches | matches | 2,486 | Yes |

All service pages exceed the 800-word service floor; all posts exceed 1,500. No page is thin by length. Unique main content per service page is roughly 900 to 1,300 words once shared blocks are removed.

**Em dash check:** 0 em dashes (U+2014) in visible text and 0 in raw HTML across all 17 pages. Founder rule met.

**Metadata templating:** titles follow "Topic | Arrowbin" (normal). No description echoes its title, no shared closing CTA, no brand suffix in descriptions. Risk: low. Two descriptions run long (ecommerce 169 chars, SaaS 170 chars) and will truncate.

---

## Critical

### C-1. Fabricated testimonials are live on the homepage
- **URL:** https://arrowbin.com/ (section "(07) Testimonials / Clients say it best")
- **Evidence:** visible text contains "Sarah Mitchell, Product Lead, SaaS Startup", "David Chen, Founder, E-commerce Brand", "Rafiul Islam, Operations Director, Logistics", each with 5 stars. `src/lib/testimonials.ts` states: "these are stand-ins approved for launch and will be replaced with real, named, verifiable client reviews before production." The site is in production. None of the three roles map to a portfolio client (there is no logistics project). JSON-LD correctly omits Review/AggregateRating (`src/lib/schema.ts` note), so this is a visible-content problem, not a schema one.
- **Risk:** FTC 16 CFR Part 465 (Trade Regulation Rule on the Use of Consumer Reviews and Testimonials, effective 21 Oct 2024) prohibits testimonials from people who do not exist or who did not have the stated experience; civil penalties apply per violation. Arrowbin LLC is a US entity targeting US buyers. Under Google's QRG, deceptive trust content can drive a Lowest rating for the page. It also contradicts the blog's own advice ("talk to our clients", "reference call is worth more than any case study").
- **Fix:** remove the Testimonials section today (hide the component, keep the data file empty). Reinstate only with real clients, full name plus company, written permission on file, and ideally a link to the same review on Clutch or Google. Two or three real quotes from Silent Lifestyle BD, FlexOver BD or North Bengal Agro Farms would be stronger than any stand-in.
- **Falsifiability check:** `curl -s https://arrowbin.com/ | grep -c "Sarah Mitchell\|David Chen\|Rafiul Islam"` must return 0. If each name can be matched to a real client with signed consent, this finding is wrong and downgrades to Low (add company names).

### C-2. Placeholder performance metrics shown as client results
- **URLs:** `/` (Selected work), `/work`, and service pages `/services/ecommerce-development`, `/services/maintenance-support`, `/services/ui-ux-design`, `/services/custom-software-development`, `/services/ai-automation`, `/services/saas-product-engineering`, `/services/mobile-app-development`.
- **Evidence:** live claims "+28% mobile conversion after launch" (Maneel Club), "2.4s faster page loads post-rebuild" (Brandingly), "Checkout drop-off cut by ~30%" (গ তে গয়না), "1,000+ verified listings onboarded" (YT Shop India), "Bounce rate down 22% after redesign" (OutNet). `src/lib/portfolio.ts` documents the `result` field as "PLACEHOLDER values, approved for launch, to be replaced with the client's real measured results before production." These are attributed to real, named, linkable businesses.
- **Risk:** unsubstantiated performance claims are deceptive advertising under FTC Act Section 5 (the advertiser must hold substantiation before making an objective claim). Attaching them to real named clients adds reputational and client-relationship risk. QRG raters are told to check claims against the linked sites; a client contradicting a number is a severe trust failure.
- **Fix:** replace each `result` with a verifiable, non-numeric fact (for example "Cash-on-delivery ordering live nationwide", "Live since 2024", "Bangla and English storefront") until the client's analytics confirm a number. When a number is confirmed, store the source (analytics screenshot, date range) internally and show the date range on the card.
- **Falsifiability check:** grep live `/`, `/work` and all service pages for `28%|2.4s|~30%|22%|1,000+`; must return 0 or each must have a documented source in `portfolio.ts`. If the founder has client analytics supporting every figure, this finding is wrong and becomes a Medium "add the measurement window".

---

## High

### H-1. Homepage still cannibalises "custom software development company"
- **URL:** https://arrowbin.com/ vs https://arrowbin.com/services/custom-software-development
- **Evidence:** both titles are exactly "Custom Software Development Company | Arrowbin". The homepage H1 (sr-only) reads "Arrowbin, a custom software development company: software that moves." Keyword map rule 2: homepage targets "software development company"; the custom-software page owns "custom software development company" (US 2.9K/mo, CPC $78.98). This was `01-audit` H-2 and is not fixed.
- **Fix:** homepage title "Arrowbin | Software Development Company for Startups & SMBs" (about 55 chars); H1 sr-only text "Arrowbin, a software development company: software that moves."; hero sentence change "software studio" to "software development company". Leave the service page as is.
- **Falsifiability check:** fetch both `<title>`s; they must differ and only the service page may contain "Custom Software Development Company". In Search Console (once connected), the query "custom software development company" should resolve to the service URL only.

### H-2. No verifiable third-party proof anywhere (Authoritativeness gap)
- **URLs:** sitewide; most visible on `/`, `/about`, `/work`.
- **Evidence:** no Clutch/GoodFirms/Google review widget or link, no press, no certifications, no named client quotes, no case study pages. Once C-1 and C-2 are fixed, the only proof is the live-site list, which is strong but mostly Bangladesh e-commerce while the primary market is the US.
- **Fix:** (1) create Clutch and Google Business Profile listings and request reviews from the 8 portfolio clients; (2) publish two `/work/<slug>` case studies with problem, stack, timeline and a client-approved quote; (3) link reviews from the homepage proof strip.
- **Falsifiability check:** at least one external review profile linked from the site and at least one case study URL returning 200 within 60 days.

### H-3. "A real example" sections are not real examples
- **URLs:** `/blog/how-much-does-custom-software-development-cost` (H2 "A real example: what a $60,000 SaaS MVP looks like"), `/blog/how-long-does-it-take-to-build-an-mvp` (H2 "A real example: a 12-week SaaS MVP", figure caption "A real 12-week MVP, week by week").
- **Evidence:** the body text says "here is a representative breakdown" and "typically maps across 12 weeks". No client, product, date or outcome is named. The cost breakdown is the same 10/15/50/15/10 split stated earlier in the post, applied to $60,000.
- **Risk:** misleading heading on an experience signal; QRG treats claimed first-hand experience that is not first-hand as a trust negative. It is also the classic "generic AI example" pattern.
- **Fix:** either rename to "A worked example" / "A typical 12-week SaaS MVP", or replace with a genuine anonymised project ("A B2B scheduling tool we shipped in 2025: 11 weeks, $54k, here is where the time went") with at least two specifics only a practitioner would know (what slipped, why).
- **Falsifiability check:** no H2 or caption containing "real" unless the section names or specifically describes a delivered Arrowbin project.

### H-4. Regional rate table is effectively unsourced
- **URL:** `/blog/how-much-does-custom-software-development-cost`
- **Evidence:** the table "Blended senior team rates by region (USD/hour), 2026" (North America $120 to 180 ... South Asia $25 to 60) and "3 to 5x" claims link only to `https://survey.stackoverflow.co/` via the words "developer-rate data". The Stack Overflow survey publishes salaries, not agency hourly rates, so the link does not support the table. It is the only outbound citation across all three posts. The house style says "never invent statistics; cite sources with URLs".
- **Fix:** cite rate sources that actually publish agency hourly rates (for example Clutch pricing pages or published rate surveys), label the table "Arrowbin estimate based on X and Y, checked September 2026", and add a "Sources" list at the end of each post.
- **Falsifiability check:** every numeric claim in the rate table and in "Key takeaways" traces to a linked source or is explicitly labelled as Arrowbin's own estimate.

---

## Medium

### M-1. Price and timeline ranges contradict each other across pages
- **Evidence:**
  - `/` FAQ: "Smaller builds typically start around $5,000 to $10,000".
  - `/services` FAQ: "from around $8,000 for a focused tool to $75,000+ for a full platform".
  - Cost post: MVP $5,000 to $30,000; mid-size $30,000 to $90,000; "Mobile apps and enterprise systems: $50,000 to $500,000+".
  - `/services/mobile-app-development` FAQ: "A polished MVP usually lands between $12,000 and $40,000".
  - Cost post short answer: "most business products land between $30,000 and $120,000"; two paragraphs later: "between $40,000 and $120,000".
- **Why it matters:** AI engines quote whichever figure they retrieve; inconsistent numbers reduce citation confidence and look careless to a buyer comparing pages.
- **Fix:** one canonical price table (ideally the planned `/pricing` page) in a single data file that every FAQ reads from. Reword the cost post heading to "Enterprise systems" and give mobile its own row consistent with the service page.
- **Falsifiability check:** every "$" range on the site for the same project type matches the canonical table.

### M-2. Service page titles and H1s miss mapped keyword modifiers
- **Evidence (title vs map):** ecommerce "E-commerce Development Services" vs "ecommerce development company"; SaaS "SaaS Development & Product Engineering" vs "saas development company"; AI "AI Automation Services" vs "ai automation agency"; UI/UX "UI/UX Design Services" vs "ui ux design agency"; cloud "Cloud, DevOps & Hosting Services" vs "devops consulting services" (no "consulting" anywhere in title, H1 or intro). All service H1s are the bare service name (for example "AI Automation"), never the head term.
- **Fix:** titles such as "E-commerce Development Company | Arrowbin", "SaaS Development Company | Arrowbin", "AI Automation Agency | Arrowbin", "DevOps Consulting Services & Cloud Hosting | Arrowbin". Keep the display H1 short for design, but make the first sentence of the hero contain the primary keyword ("Arrowbin is an AI automation agency that...").
- **Falsifiability check:** each service page's title and first 100 words contain its mapped primary keyword (exact or close variant).

### M-3. Keyword-map sections not yet built
- **Evidence:** custom-software page has no CRM/ERP section (map: `#crm-erp`, 25 kws); AI page has no n8n, chatbot or AI-agent sub-sections (map notes); maintenance page has plan tiers inside an interactive widget but no static SLA table; cost post has no calculator link; choose post has no downloadable scorecard or RFP template (map: "reposition as a scorecard + RFP template").
- **Fix:** add those sections as static HTML (H2 plus a short answer paragraph plus table).
- **Falsifiability check:** H2s for "CRM & ERP development", "n8n automation", "AI chatbots", "AI agents" and an HTML SLA table exist on the respective pages.

### M-4. Key data exists only in images or interactive widgets
- **Evidence:** the choose-post criteria weights (track record 25%, communication 20%, technical 20%, process 15%, fit 10%, price 10%) appear only in an image alt attribute; the sentence before it ("Here is roughly how we'd weight the criteria:") has no text follow-up. Maintenance SLA tiers (4h / 1h / 15 min response, 5 / 20 / 80+ hours) and the AI ROI calculator live in interactive components.
- **Fix:** add the weights as an HTML table in the post, and a static SLA table on `/services/maintenance-support`. These are exactly the extractable facts AI answers quote.
- **Falsifiability check:** the weights and SLA numbers appear in server-rendered visible HTML text, not only in `alt` attributes or client state.

### M-5. Split and duplicated text in the raw DOM
- **Evidence:** H1s are built from block spans with no whitespace, so `textContent` reads "Softwaredevelopmentservices", "AIAutomation", "SaaS&ProductEngineering", "Tell uswhat you'rebuilding." The homepage manifesto renders every word twice ("WeWe areare aa softwaresoftware studiostudio"), stats render as "15+15+", "0808". Google's renderer uses layout and will mostly handle block spans, but many AI crawlers and some screen readers read raw text.
- **Fix:** add a literal space between H1 line spans (or an `sr-only` full-text H1 as the homepage already does, with the visual spans `aria-hidden`). Mark the manifesto's decorative duplicate layer and the duplicated stat layer `aria-hidden` (the outline layer is currently the unhidden one; confirm only one copy is exposed).
- **Falsifiability check:** `document.querySelector('h1').textContent` on each page reads as normal words; a text-only fetch of `/` does not contain "WeWe".

### M-6. About page is thin on E-E-A-T for the founder
- **URL:** https://arrowbin.com/about (about 500 words of main content)
- **Evidence:** founder named with photo, one-line quote and LinkedIn link; no bio, no background, no years of experience, no prior roles, no team members, no office/entity details beyond the footer. Homepage and services repeatedly claim "senior engineers" and "one senior team" with no people shown. Person schema has `jobTitle` "Founder" only.
- **Fix:** 150 to 250-word founder bio (background, what he has shipped, tech specialism), a small team section with names, roles and years of experience, and "Arrowbin LLC, registered in Florida" with the founding year. Extend Person schema with `knowsAbout` and `alumniOf` where true.
- **Falsifiability check:** `/about` contains a founder bio paragraph and at least one additional named team member, or the "senior team" claims are softened.

### M-7. MVP post reuses a cost-post sourcing sentence that does not fit
- **URL:** `/blog/how-long-does-it-take-to-build-an-mvp`
- **Evidence:** "The ranges below come from Arrowbin's own delivered work and publicly available developer-rate data, not a sales sheet." Developer-rate data is irrelevant to timelines, and the sentence is a near-copy of the cost post's line. Classic templated-generation artifact.
- **Fix:** rewrite to state what the timelines are actually based on (for example "the MVPs we have shipped since 2020", with the real count), or delete.
- **Falsifiability check:** the phrase "developer-rate data" appears only on the cost post.

### M-8. Service-page boilerplate share around 30%
- **Evidence:** exact-line matching shows 26% (custom software) to 34% (SaaS) of each service page's text lines are identical across 3 or more service pages: the "Three ways to start" block (Project / Product team / Care plan), quote form copy, "If one of these sounds like you, we should talk.", "Short sprints, a demo at the end of each one...", guide cards and footer CTA. Unique content is still substantial (about 900 to 1,300 words), so this is not a duplicate-content penalty risk, but it dilutes each page's topical signal.
- **Fix:** tailor the "Three ways to start" intro and the process subtitle per service (for example maintenance leads with Care plan; SaaS leads with Product team), and give each page a service-specific one-line proof under the portfolio cards.
- **Falsifiability check:** re-run the line-match script; target under 20% shared lines per service page.

---

## Low

### L-1. AI-typical phrasing and verbal tics
- **Evidence (site-wide counts in visible text):** "actually" 31, "real" 57, "honest/honestly" 12, "not just" 8, "Here's" 16, "sweet spot" 3, "ruthless prioritization" 2. Examples: "Great design is invisible. It just works" (UI/UX hero), "Blazing fast" (ecommerce), "peace of mind" (cloud), "without the usual headaches" (mobile), "table stakes" (choose post), repeated "X, not Y" constructions ("proof, not promises", "planning ranges, not quotes", "not a sales sheet", "not best-case marketing"). The two long posts share an identical skeleton: short answer, "On this page", 10 question H2s, founder pull-quote, "So, how much/long...", six Key takeaways, FAQ.
- **Fix:** a copy pass that cuts "actually" and "honest" by at least half, replaces two or three "X, not Y" lines per page with a concrete fact, and varies the post skeleton (for example lead the choose post with the scorecard).
- **Falsifiability check:** recount; "actually" under 15 and "honest" under 6 site-wide.

### L-2. Blog freshness signals
- **Evidence:** posts dated April to May 2026, last modified 16 to 20 June 2026, titles say "in 2026". Fine now; stale by Q1 2027.
- **Fix:** schedule a quarterly review; update `dateModified` only when content materially changes.

### L-3. Long meta descriptions
- **Evidence:** `/services/ecommerce-development` 169 chars, `/services/saas-product-engineering` 170 chars.
- **Fix:** trim to about 150 chars.

### L-4. Section numbering gaps
- **Evidence:** service pages jump from "(09) Guides" to "(11) Pairs well with"; interactive sections numbered "(02)" render after the footer in DOM order.
- **Fix:** cosmetic; renumber, and keep DOM order equal to visual order so text extractors read the page in sequence.

### L-5. Brand wording drift
- **Evidence:** homepage hero calls Arrowbin a "software studio"; about says "software company"; FAQs say "software development company".
- **Fix:** use "software development company" in the first sentence of `/` and `/about` (supports H-1 and entity consistency for AI engines).

---

## What is working (keep)

- Answer-first "The short answer" blocks on all three posts, each 40 to 60 words and directly quotable.
- Question-form H2s that mirror search queries, HTML tables (cost by project type, fixed vs T&M, agency vs freelancer vs in-house, MVP vs prototype), and FAQPage schema on 14 of 17 pages.
- Named author with Person schema, LinkedIn `sameAs`, published and updated dates on every post.
- Honest "build vs buy" framing on the custom-software page ("Off-the-shelf is the right call more often than agencies admit") and illustrative widgets clearly labelled "Illustrative".
- Hostinger affiliate disclosed in copy and marked `rel="sponsored"`.
- No em dashes anywhere; readability of posts is good (Flesch-Kincaid grade 7.7 to 8.8, average sentence 15 words). Service pages read at grade 11 to 13, partly inflated by joined UI fragments.
- `llms.txt` present and accurate.

## Priority order

1. C-1 remove fabricated testimonials (same day).
2. C-2 replace placeholder metrics (same day).
3. H-1 homepage title/H1 (15 minutes).
4. H-3 and M-7 rename "real example" sections and fix the reused sourcing line.
5. H-4 and M-1 source the rate table and unify price ranges.
6. H-2 and M-6 reviews, case studies, founder bio.
7. M-2 to M-5, M-8, then Low items.

## Structured findings (for audit-data.json, category "Content Quality")

```json
{
  "category": "Content Quality",
  "date": "2026-10-01",
  "scores": {"content_quality": 56, "on_page": 68, "eeat": 41, "ai_citation_readiness": 68,
             "eeat_breakdown": {"experience": 45, "expertise": 55, "authoritativeness": 30, "trustworthiness": 35}},
  "metadata_template": {"site_risk": "low", "templated_ratio": 0.0, "shared_cta_phrases": []},
  "em_dashes_visible": 0,
  "findings": [
    {"id": "C-1", "severity": "critical", "url": "/", "title": "Fabricated testimonials live (Sarah Mitchell, David Chen, Rafiul Islam)"},
    {"id": "C-2", "severity": "critical", "url": "/, /work, 7 service pages", "title": "Placeholder outcome metrics attributed to real clients"},
    {"id": "H-1", "severity": "high", "url": "/", "title": "Homepage title/H1 cannibalise custom-software primary keyword"},
    {"id": "H-2", "severity": "high", "url": "sitewide", "title": "No third-party reviews, case studies or recognition"},
    {"id": "H-3", "severity": "high", "url": "/blog/how-much-does-custom-software-development-cost, /blog/how-long-does-it-take-to-build-an-mvp", "title": "'A real example' sections are generic models"},
    {"id": "H-4", "severity": "high", "url": "/blog/how-much-does-custom-software-development-cost", "title": "Regional rate table cites a source that does not publish rates"},
    {"id": "M-1", "severity": "medium", "url": "/, /services, cost post, mobile page", "title": "Inconsistent price ranges"},
    {"id": "M-2", "severity": "medium", "url": "5 service pages", "title": "Titles/H1s miss mapped primary keyword"},
    {"id": "M-3", "severity": "medium", "url": "custom, ai, maintenance, cost post, choose post", "title": "Keyword-map sections not built"},
    {"id": "M-4", "severity": "medium", "url": "choose post, maintenance", "title": "Key data only in images or widgets"},
    {"id": "M-5", "severity": "medium", "url": "sitewide", "title": "Split/duplicated text in raw DOM"},
    {"id": "M-6", "severity": "medium", "url": "/about", "title": "Thin founder/team E-E-A-T"},
    {"id": "M-7", "severity": "medium", "url": "/blog/how-long-does-it-take-to-build-an-mvp", "title": "Reused sourcing sentence"},
    {"id": "M-8", "severity": "medium", "url": "8 service pages", "title": "About 30% boilerplate per service page"},
    {"id": "L-1", "severity": "low", "url": "sitewide", "title": "AI-typical phrasing and repeated post skeleton"},
    {"id": "L-2", "severity": "low", "url": "blog", "title": "Freshness cadence"},
    {"id": "L-3", "severity": "low", "url": "ecommerce, saas", "title": "Meta descriptions over 160 chars"},
    {"id": "L-4", "severity": "low", "url": "service pages", "title": "Section numbering gaps and DOM order"},
    {"id": "L-5", "severity": "low", "url": "/, /about", "title": "Brand descriptor drift"}
  ]
}
```
