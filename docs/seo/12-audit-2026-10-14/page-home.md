# Page analysis: https://arrowbin.com/ (homepage)

**Date:** 14 October 2026. **Primary keyword:** software development company (secondary: brand "Arrowbin"; "custom software development company" belongs to `/services/custom-software-development` per `../05-keyword-map/keyword-map.md`).
**Method:** raw HTML via curl (live and http://localhost:3117), stdlib HTML parser for headings, words, links, images and JSON-LD; Playwright (chromium, 1440x900 desktop and 390x844 mobile) for rendered text, image bytes and CTA positions; Lighthouse 12 mobile (lab, run while other audit agents were also running Lighthouse, so treat timings as indicative); inbound links counted across all 19 sitemap URLs; competitor pages fetched with WebFetch. Status labels follow `CONTEXT.md`.
**SERP baseline:** `../03-serp/serp-analysis.md` #3 (29 Sep) and `../11-audit-2026-10-01/sxo.md` (1 Oct). Top 3: microsoft.com definition article, scnsoft.com homepage, itransition.com/software-development. Difficulty: Very High. The homepage cannot realistically reach the top 3 for the bare head term in the near term; its job is to own the brand, support "software development company for startups / small business" variants, and pass authority to the service pages.

---

## Score card

| Category | Live | Local (pending deploy) |
|---|---|---|
| On-Page SEO | 45 | 74 |
| Content Quality | 50 | 55 |
| Technical | 58 | 70 |
| Schema | 68 | 82 |
| Images | 85 | 85 |
| **Overall** (25/30/20/15/10 weighting) | **57** | **70** |

```
Local build
On-Page SEO:     74/100  ███████░░░
Content Quality: 55/100  █████░░░░░
Technical:       70/100  ███████░░░
Schema:          82/100  ████████░░
Images:          85/100  ████████░░
```

The local build fixes the two biggest problems on this page (wrong keyword in title/H1, and 94% of text hidden outside `<main>`). What remains is mostly content and trust: no visible keyword in the copy, no founder or team, no third-party proof, no route to the cost guide, and slow mobile rendering.

---

## On-page snapshot

| Element | Live | Local | Assessment |
|---|---|---|---|
| Title | "Custom Software Development Company \| Arrowbin" (46 chars) | "Software Development Company for Startups & SMBs \| Arrowbin" (59) | Local is correct for the map. FIXED-LOCAL |
| Meta description | 162 chars, no CTA | 150 chars: "Arrowbin is a founder-led software development company building custom software, web and mobile apps, SaaS and AI automation. Get a free consultation." | Good. FIXED-LOCAL |
| Canonical | https://arrowbin.com | same | OK (self-referencing) |
| Meta robots | index, follow | same | OK |
| OG / Twitter | Complete (title, description, 1200x630 image, alt, card summary_large_image) | Complete, updated title | OK |
| H1 (accessible text) | sr-only "Arrowbin, a custom software development company: software that moves." | sr-only "Arrowbin, a software development company for startups and growing businesses: software that moves." | Keyword now correct. Visible H1 is "Software That Moves" (decorative, aria-hidden) |
| H1 count | 1 | 1 | OK |
| Words in `<main>` (raw HTML) | 66 (1,197 more words in `<div hidden id="S:n">` after `</main>`) | 1,276 (0 hidden blocks) | FIXED-LOCAL |
| Rendered main words | 1,318 | 1,331 (only about 730 are prose; the rest are marquee tapes, labels and the doubled manifesto) | Thin for a head-term homepage |
| Readability (prose) | | Flesch 56, grade 8.8, 13.5 words/sentence | Fine for B2B |
| Hreflang | none | none | Correct (single language) |
| Mobile H1 position | y=696 of 844 | y=696 of 844 | OPEN (see M4) |

### Heading outline (local, document order)
```
H1  Arrowbin, a software development company for startups and growing businesses: software that moves. (sr-only) + "Software That Moves" (visual, aria-hidden)
H2  What we build
    H3 x8  Custom Software Development / E-commerce Development / Mobile App Development / SaaS / Product Engineering / UI/UX Design / AI Automation / Cloud, DevOps & Hosting / Maintenance & Support
H2  Numbers that don't whisper
    H3  Brands shipped for / Disciplines, one team / Weeks to first launch / Code you own
H2  Proof, not pitch
    H3 x6  Silent Lifestyle BD / FlexOver BD / North Bengal Agro Farms / Maneel Club / Brandingly / গ তে গয়না
H2  From first call to launch
    H3  Discover / Design / Build / Launch & grow
H2  Built different, on purpose
    H3  Weekly demos. Zero mystery. / 100% your code / Proven tools only / Fixed estimates. No surprise invoices.
H2  Clients say it best
H2  Questions? Answered.
    H3 x5  What does Arrowbin do? / How much does it cost to work with Arrowbin? / How long does a typical project take? / Do you work with clients worldwide? / Do I own the code you build?
H2  Let's build something loud
H2  Services / Company / Say hello   (footer)
```
No skipped levels. Most H2s are slogans ("Numbers that don't whisper", "Proof, not pitch", "Built different, on purpose"), so the outline carries almost no topical signal beyond the eight service names.

### Keyword usage (local, all text)
| Term | Count | Where |
|---|---|---|
| software development company | 3 | sr-only H1, FAQ answer "What does Arrowbin do?", footer/description |
| software studio | 2 | Visible hero lede ("Arrowbin is a software studio that designs...") and manifesto |
| custom software | 5 | Service card, tapes |
| startups | 2 | sr-only H1, title |

The visible copy above the fold never says "software development company". The only above-fold text a user or a non-JS reader sees first is "Arrowbin is a software studio...".

---

## Entity and topic coverage vs ranking pages

| Topic / entity | Microsoft (definition) | ScienceSoft (home) | Itransition | dev.co (closest small-agency analogue, #6) | Arrowbin (local) |
|---|---|---|---|---|---|
| Definition: what a software development company does | Yes (full article) | No | No | FAQ | Partial (FAQ "What does Arrowbin do?") |
| Founding year / years in business | n/a | 37 years (1989) | 25+ | Since 2013 | Not visible (only `foundingDate` 2020 in schema) |
| Team size / named people | Roles | 750+, named experts | 3,000+ | "Senior engineers", none named | None; founder not named on the page |
| Projects delivered | n/a | 4,300+ | n/a | 390+ | "15+ brands shipped for" |
| Service catalogue | Types | 9 service lines | 3 + related | 12 disciplines | 8 services (good) |
| Industries | Customer types | Healthcare, finance + more | 12 named | 10 named | One line in Numbers ("retail, agro-export, fashion, fintech and media") |
| Engagement / pricing models | n/a | Ballpark estimate in 24 h | Fixed price, T&M, dedicated team | Fixed-scope, dedicated pod, embedded | Fixed estimate only; the "Three ways to start" block lives on service pages, not here |
| Price signal | n/a | Pricing page link | FAQ | Calculator link | FAQ "$5,000–$10,000" start |
| Comparison vs in-house / offshore / freelancer | n/a | No | FAQ | Table | None |
| Process | Lifecycle | 8 management areas | 6 steps | 6 steps | 4 steps (good) |
| Tech stack | Cloud, AI, DevOps | 13 groups | Full list | Full list | 15 tools in a bento card |
| Certifications / partners | Microsoft | ISO 9001/27001, Microsoft, AWS | ISO 9001/27001 | None | Hostinger partner badge (footer only) |
| Named testimonials / case studies | n/a | 11 named + case studies | 7 named + reference letters | 4 logo case studies | 3 placeholder testimonials (founder decision); 6 portfolio cards |
| AI in development | Yes | Yes | Yes | FAQ | None |
| Insights / guides block | Resources | Yes | No | No | None (no link to any blog post) |

**Gaps that matter most for this page:** a visible definition-style answer containing the keyword, a named founder and team, founding year, industries, engagement models, a comparison table, and a guides block. Size claims (headcount, project counts) cannot be matched and should not be inflated; the honest angle is "founder-led, senior, small, fixed estimates, you own the code".

---

## Links

**Outbound from the page (local):** 8 service pages (card links with long anchors such as "01 → Custom Software Development Software built around your exact workflows..."), /services, /about ("About the studio"), /work ("All 8 projects"), /contact ("Tell us the problem"), cal.com (2), mailto (2), 6 live client sites (rel="noopener noreferrer", followed). No link to /blog or to any post.

**Inbound (all 19 sitemap URLs):** logo, nav "Home" and breadcrumbs from every page (18 pages). No contextual in-body link points to `/` from posts or service pages, which is normal for a homepage.

**Assessment:** the homepage is the strongest internal-link source on the site but passes nothing to the blog, so the cost guide (the most commercially valuable informational page) gets no homepage equity. The service card anchors are long concatenations of title plus description; the title portion carries the keyword, which is acceptable.

---

## Images

| Image | Alt | Bytes (desktop / mobile) | Loading |
|---|---|---|---|
| 6 portfolio screenshots (`/_next/image`, WebP/AVIF via Next) | "<Client> website, built by Arrowbin" | 15 to 46 KB / 20 to 62 KB | lazy (below fold, correct) |
| Hostinger partner badge (SVG, footer) | "Arrowbin is a verified Hostinger Partner" | 5 KB | lazy |

No hero image (the hero is a canvas/blob animation). All alts present and descriptive. No `width`/`height` attributes (Next `fill` inside sized containers), and CLS measured 0, so no action. No image is above 200 KB.

---

## Schema (JSON-LD)

| Node | Live | Local |
|---|---|---|
| Organization (legalName, logo, foundingDate 2020, 2 PostalAddress, 2 ContactPoint, knowsAbout) | sameAs includes `linkedin.com/in/arrowbinllc` placeholder | sameAs = GitHub, Facebook, Instagram, X; adds `founder: {"@id": "https://arrowbin.com/#founder"}` |
| WebSite | yes | yes |
| ProfessionalService | 2 (Dhaka + St. Petersburg virtual office with geo and hours) | 1 (Dhaka only) |
| BreadcrumbList | 1 item | 1 item |
| FAQPage | 5 Q&A | 5 Q&A (matches visible FAQ) |

Validation notes (local): all nodes parse. One new issue: `Organization.founder` points to `#founder`, but the Person node with that `@id` is only emitted on `/about` and blog posts. On the homepage the reference is dangling, so Google and AI parsers see a founder with no name. FAQPage gives no Google rich result since May 2026; keep it as an AI-citation signal only.

---

## CTAs and conversion path

- Above the fold: "Start a project" (cal.com, y=296 desktop / 272 mobile) and "See the work". Good.
- Mid-page: "Tell us the problem" (/contact), "All 8 projects".
- End: "Book a call" (cal.com) + email.
- No form on the homepage (service pages have a 3-field quote form in the hero). No pricing link (there is no /pricing page yet).
- Risk reversal (free discovery, fixed estimate, code ownership) is stated in copy, which is good.

---

## E-E-A-T

| Signal | Status |
|---|---|
| Experience | 6 live client sites linked, all Bangladesh / e-commerce or small corporate; factual result lines now (FIXED-LOCAL, placeholder metrics removed) |
| Expertise | Stack and process described; no named engineer, no founder bio, no years of experience |
| Authoritativeness | No Clutch / GoodFirms / Google reviews, no press, no LinkedIn company page; Hostinger badge only |
| Trust | Placeholder testimonials still shown (founder decision, risk unchanged); prices differ from the cost guide and service pages; legal entity status unverified (CONTEXT) |

---

## AI citability

- **Good:** FAQ answers are self-contained 30 to 45 word passages. "What does Arrowbin do?" is a clean entity definition that AI answers can lift. In the local build these sit inside `<main>`.
- **Weak:** the brand is described as a "software studio" in the most prominent sentence, which conflicts with the entity definition elsewhere; no numbers that are both specific and verifiable (founding year, project count, team size); the manifesto is still doubled word by word in raw HTML ("We We are are a a..."), because the overlay copy is `aria-hidden` but still in the DOM text.
- **Crawler access (live, 14 Oct):** OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot, Bingbot return 200; GPTBot and ClaudeBot still return 403 from Cloudflare while robots.txt allows them. Claude-SearchBot was 403 on 1 Oct and is now 200.

---

## Performance (lab, Lighthouse 12 mobile, indicative)

| Build | Perf | LCP | TBT | CLS | LCP element |
|---|---|---|---|---|---|
| Live | 58 | 4.0 s | 1,280 ms | 0 | Hero lede paragraph ("Arrowbin is a software studio...") |
| Local | 66 | 3.5 s | 1,160 ms | 0 | Same |

The LCP element is plain text, so the delay is render and script cost, not image weight. TBT above 1 s on mobile is the main problem (see `../11-audit-2026-10-01/performance.md`).

---

## Findings (prioritised)

### H1. Homepage targets the custom-software keyword on live (cannibalisation)
- **Priority:** High. **Status:** FIXED-LOCAL.
- **Evidence:** live title "Custom Software Development Company | Arrowbin" and sr-only H1 "Arrowbin, a custom software development company"; the service page title is "Custom Software Development Company | Arrowbin" too. Local title and H1 now target "software development company for startups and growing businesses".
- **Fix:** deploy `src/app/page.tsx` (lines 18 to 20) and `src/components/home/Hero.tsx`.
- **Effort:** S (deploy). **Owner:** dev.
- **How we'd know it failed:** `curl -s https://arrowbin.com/ | grep -o '<title>[^<]*'` still contains "Custom Software"; or two sitemap URLs share a title.

### H2. 94% of homepage text sits outside `<main>` in hidden streamed blocks (live)
- **Priority:** High. **Status:** FIXED-LOCAL.
- **Evidence:** live raw HTML: 66 words in `<main>`, 1,197 words in 3 `<div hidden id="S:n">` blocks; local: 1,276 words in `<main>`, 0 hidden blocks (`grep -c 'hidden id="S:'` = 0).
- **Fix:** deploy (Suspense wrappers already removed in `src/app/page.tsx`).
- **Effort:** S. **Owner:** dev.
- **How we'd know it failed:** `curl -s https://arrowbin.com/ | grep -c 'hidden id="S:'` returns more than 0.

### H3. No visible copy contains the primary keyword; the hero calls Arrowbin a "software studio"
- **Priority:** High. **Status:** OPEN.
- **Evidence:** the keyword appears only in the sr-only H1 and one FAQ answer. The visible lede (LCP element) reads "Arrowbin is a software studio that designs and engineers web platforms...". Competitors put the head term in the visible H1 or first sentence (dev.co: "Software development company for the world of agentic AI"; Microsoft: "What is a software development company?").
- **Fix:** copy-only change in `src/components/home/Hero.tsx` line 52, no layout change: "Arrowbin is a founder-led software development company that designs and builds web platforms, mobile apps, AI systems and cloud infrastructure for startups and growing businesses worldwide." Optionally change the manifesto's "software studio" too (`src/components/home/Manifesto.tsx`). Founder approves wording.
- **Effort:** S. **Owner:** founder (wording) then dev.
- **How we'd know it failed:** the first visible paragraph in the rendered page does not contain "software development company".

### H4. Homepage passes no link equity to the blog or the cost guide
- **Priority:** High. **Status:** OPEN.
- **Evidence:** the outbound link list (local) contains no `/blog` URL in `<main>`; the cost guide's 15 inbound links come from /blog, 7 service cards and 2 posts, none from `/`.
- **Fix:** add a "Guides" block (reuse `ServiceGuides` from `src/components/services/ServiceProof.tsx`) before the FAQ with the 3 posts, and link the FAQ answer "How much does it cost to work with Arrowbin?" to `/blog/how-much-does-custom-software-development-cost` (and to `/pricing` once it exists). Needs founder sign-off because it adds a visible section.
- **Effort:** S. **Owner:** dev (founder approves).
- **How we'd know it failed:** `curl -s https://arrowbin.com/ | grep -c 'href="/blog/how-much-does-custom-software-development-cost"'` returns 0.

### H5. No named founder, team or founding year on the page (E-E-A-T)
- **Priority:** High. **Status:** OPEN.
- **Evidence:** "shishir" 0 occurrences, "2020" 0 occurrences in homepage text; "senior" appears 6 times with no person behind it. All three top results show years, people or headcount.
- **Fix:** add one sentence to the manifesto or "Built different" intro: "Founded in 2020 by Md. Shishir Ahmed, Arrowbin is a small senior team..." and a link to /about. If the founder approves a visual block, add a compact founder card (photo already exists at `/team/shishir-ahmed.webp`). Do not invent headcount.
- **Effort:** S (sentence) to M (card). **Owner:** founder then dev.
- **How we'd know it failed:** rendered homepage text contains neither the founder's name nor a founding year.

### M1. Price on the homepage contradicts the service page and the cost guide
- **Priority:** Medium. **Status:** OPEN (was M-1 / H7 on 1 Oct).
- **Evidence:** home FAQ "Smaller builds typically start around $5,000–$10,000" (`src/app/page.tsx` line 52); custom-software FAQ "$8,000 for a focused tool to $75,000+"; cost guide "MVP or internal tool: $5,000 to $30,000" and "most business products land between $30,000 and $120,000".
- **Fix:** one price-band constant (for example `src/lib/pricing.ts`) read by every FAQ and the cost guide; founder supplies the real bands.
- **Effort:** S once numbers exist. **Owner:** founder (numbers) then dev.
- **How we'd know it failed:** two pages quote different starting prices for the same project type.

### M2. Dangling `founder` reference in Organization schema
- **Priority:** Medium. **Status:** NEW (introduced by local fix 4).
- **Evidence:** local homepage JSON-LD has `"founder": {"@id": "https://arrowbin.com/#founder"}` but no node with that `@id` on the page; the Person node exists only on /about and blog posts.
- **Fix:** in `src/lib/schema.ts` (line 58) inline the Person: `"founder": {"@type": "Person", "@id": ".../#founder", "name": "Md. Shishir Ahmed", "url": "https://arrowbin.com/about", "sameAs": ["https://www.linkedin.com/in/md-shishir-ahmed"]}`.
- **Effort:** S. **Owner:** dev.
- **How we'd know it failed:** Schema Markup Validator on `/` shows `founder` without a `name`.

### M3. Industries, engagement models and a comparison are missing
- **Priority:** Medium. **Status:** OPEN.
- **Evidence:** see the entity table; all three top results and dev.co have industries and engagement models; dev.co adds an "us vs offshore shop vs in-house" table.
- **Fix:** reuse the `Engagement` block ("Three ways to start", `src/components/services/Engagement.tsx`) on the homepage, and add a short static HTML table "Agency vs freelancer vs in-house" (rows: cost, speed, accountability, continuity, ownership). Name only industries with live proof (retail and fashion e-commerce, agro-export, agencies, marketplaces).
- **Effort:** M. **Owner:** dev (founder approves layout).
- **How we'd know it failed:** homepage has no H2 for engagement models or industries 30 days after approval.

### M4. Mobile H1 sits at y=696 of 844 behind a decorative blob
- **Priority:** Medium. **Status:** OPEN (Medium on 1 Oct).
- **Evidence:** Playwright 390x844: `h1Top` 696 live and local; screenshot `scratchpad/rend/local-home-mobile-fold.png` shows lede, two buttons and a large animated blob before "SOFTWARE THAT MOVES".
- **Fix:** design decision for the founder (shrink the blob or move it behind the headline on small screens). Not changed without approval.
- **Effort:** S to M. **Owner:** founder then dev.
- **How we'd know it failed:** H1 top is still below 600 px on a 390x844 viewport.

### M5. Mobile TBT over 1 s and LCP 3.5 to 4.0 s
- **Priority:** Medium. **Status:** OPEN (improved locally: LCP 4.0 to 3.5 s, perf 58 to 66).
- **Evidence:** Lighthouse mobile above; LCP element is text.
- **Fix:** per `../11-audit-2026-10-01/performance.md`: defer canvas/blob and marquee animations until idle, gate pointer-only effects, trim hydration on static sections.
- **Effort:** M. **Owner:** dev.
- **How we'd know it failed:** Lighthouse mobile TBT above 300 ms or LCP above 2.5 s on `/` after deploy.

### L1. Manifesto words doubled in raw text
- **Priority:** Low. **Status:** OPEN.
- **Evidence:** local raw text "We We are are a a software software studio studio..." (overlay `<span aria-hidden="true" class="mf-word absolute">` duplicates every word).
- **Fix:** in `src/components/home/Manifesto.tsx`, draw the fill layer with CSS (`background-clip:text` on the same span, or a `::after { content: attr(data-word) }`) so each word exists once in the DOM.
- **Effort:** S. **Owner:** dev.
- **How we'd know it failed:** `curl -s localhost:3117/ | grep -c 'We</span><span aria-hidden'` greater than 0.

### L2. Two headings join words when read as plain text
- **Priority:** Low. **Status:** OPEN.
- **Evidence:** text extraction gives "Questions?Answered." and "Let's buildsomething loud" because the words are split by `<br />` with no space (`src/components/home/Faq.tsx` lines 60 to 67, `src/components/home/Cta.tsx` lines 23 to 25). Browsers and Google treat `<br>` as a break; `textContent`-based AI extractors do not.
- **Fix:** add `{" "}` before each `<br />`.
- **Effort:** S. **Owner:** dev.
- **How we'd know it failed:** `node -e` / Python `textContent` of the H2 still returns "Questions?Answered.".

### L3. Placeholder testimonials (founder decision)
- **Priority:** Low here (Critical in the 1 Oct report). **Status:** OPEN by founder decision.
- **Evidence:** "Sarah Mitchell, Product Lead, SaaS Startup", "David Chen", "Rafiul Islam", 5 stars, no company.
- **Fix:** replace with real quotes or Clutch-verified reviews when available.
- **Owner:** founder. **How we'd know it failed:** any testimonial without written client consent.

### Info. AI training crawlers still blocked at Cloudflare
- **Status:** OPEN for GPTBot and ClaudeBot (403); search bots now 200. Founder decides whether training crawlers should be allowed (`curl -A "GPTBot/1.1" https://arrowbin.com/` returns 403).

---

## Recommended section outline to compete with the top 3

The top 3 win on domain authority, scale and definitional depth. Arrowbin should not copy their size claims. The outline below keeps the current design blocks (founder rule) and adds text, proof and links. New blocks need founder approval before build.

1. **Hero** (unchanged visually). sr-only H1 as local. Lede: "Arrowbin is a founder-led software development company for startups and growing businesses..." CTAs unchanged.
2. **Tapes + manifesto** (keep). Manifesto adds one factual line: founded 2020, founder named, clients in N countries (real number).
3. **H2 "Software development services"** (rename from "What we build" or keep the visual title and add a sub-line containing the phrase). 8 cards, unchanged.
4. **H2 "Who we build for"** (new, small): startups (MVP to scale), growing businesses (internal tools, integrations), e-commerce brands. 3 short paragraphs linking to custom software, SaaS and e-commerce pages.
5. **Numbers** (keep) with verifiable numbers only: founding year, live products, countries, weeks to first launch.
6. **Selected work** (keep) plus at least one non-e-commerce item when available; each card links to its future `/work/<slug>` case study.
7. **H2 "How we work together"** (reuse Engagement block): Project, Product team, Care plan, with a starting price band per model once the founder confirms numbers.
8. **Process** (keep).
9. **H2 "Agency, freelancer or in-house?"** (new static table, 5 rows). This is the extractable comparison AI answers like to quote.
10. **Why Arrowbin** (keep), add a 2-line founder card linking to /about.
11. **Testimonials** (keep until real ones exist; replace with Clutch reviews).
12. **H2 "Guides before you hire"** (new): cost guide, how to choose, MVP timeline.
13. **FAQ** (keep 5, add 3): "What does a software development company do?" (40 to 60 word definition containing the keyword), "How much does it cost to hire a software development company?" (links to the cost guide), "How do you use AI in development?".
14. **CTA** (keep).

Target: about 1,500 to 1,800 words of real prose (from about 730), the keyword in title, H1, lede and one FAQ, and links to all 8 services, the 3 guides, /work and /about.

---

## Schema suggestion (replace the founder reference in Organization)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://arrowbin.com/#organization",
  "name": "Arrowbin",
  "legalName": "Arrowbin LLC",
  "foundingDate": "2020",
  "url": "https://arrowbin.com",
  "founder": {
    "@type": "Person",
    "@id": "https://arrowbin.com/#founder",
    "name": "Md. Shishir Ahmed",
    "jobTitle": "Founder",
    "url": "https://arrowbin.com/about",
    "sameAs": ["https://www.linkedin.com/in/md-shishir-ahmed"]
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Software development services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@id": "https://arrowbin.com/services/custom-software-development#service"}},
      {"@type": "Offer", "itemOffered": {"@id": "https://arrowbin.com/services/ecommerce-development#service"}}
    ]
  }
}
```
(Keep the existing address, contactPoint, sameAs and knowsAbout properties; extend the catalogue to all 8 service `@id`s.)

---

## Evidence and sources
- Raw HTML: `curl -A <Chrome UA>` of https://arrowbin.com/ and http://localhost:3117/ (14 Oct 2026, 200 OK, 308 KB / 305 KB).
- Hidden blocks: `grep -c 'hidden id="S:'` live 3, local 0.
- Inbound links: crawl of the 19 sitemap URLs (live and local identical except the homepage cards moving into `<main>`).
- Lighthouse 12.x mobile JSON (scratchpad `lh/live-home.json`, `lh/local-home.json`).
- Competitors: [microsoft.com definition](https://www.microsoft.com/en-us/software-development-companies/resources/articles/what-is), [scnsoft.com](https://www.scnsoft.com/), [itransition.com/software-development](https://www.itransition.com/software-development), [dev.co](https://dev.co/).
