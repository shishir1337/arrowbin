# Full SEO audit: arrowbin.com (14 October 2026)

**Site state:** live production is still commit 959866d (29 Sep). Seven fix batches made after the 1 Oct audit exist only in the local build (uncommitted). Every finding below is marked:
- **OPEN:** broken on live and local.
- **FIXED-LOCAL:** fixed in the local build, waiting for deploy.
- **FIXED-LIVE:** fixed on production.
- **NEW:** not in the 1 Oct audit.

**Business type:** agency (custom software, web, mobile, SaaS, e-commerce, AI automation), founder-led. The team is in Dhaka; the US address is a mailing-only virtual office.

**Method:** 14 specialist audits run in parallel, each comparing live (https://arrowbin.com) with a production build of the local code (http://localhost:3117):
- technical + sitemap
- content / E-E-A-T
- schema
- performance
- visual / mobile / images
- GEO
- SXO
- local
- maps
- backlinks
- FLOW
- hreflang
- agent readiness
- 4 deep single-page analyses

The detail files are in this folder. Fix plan: **`FIX-PLAN.md`**. Deploy gate: **`verify-live.sh`**.

**Limits:**
- No Search Console data for arrowbin.com. The GSC/GA4 connector in this environment belongs to another business and was not used.
- PageSpeed API returned 429, so there is no CrUX field data or real INP. All performance numbers are Lighthouse 12 lab runs.
- WebSearch returned noisy results; Google/Bing SERPs and Maps were bot-blocked.
- No backlink index (Moz, Ahrefs, Bing) was available.
- The claude-seo Python runtime is not set up, so its bundled scripts were not used. Evidence came from curl, Python stdlib, Playwright and Lighthouse.

---

## SEO Health Score

| Category | Weight | Live (today) | Local build (deploy only) | Source |
|---|---|---|---|---|
| Technical SEO | 22% | 62 | 89 | `technical.md` |
| Content Quality | 23% | 55 | 66 | `content.md` (E-E-A-T 41 live, 47 local) |
| On-Page SEO | 20% | 68 | 82 | `content.md` |
| Schema / Structured Data | 10% | 79 | 89 | `schema.md` |
| Performance (CWV) | 10% | 62 | 66 | `performance.md` (lab only) |
| AI Search Readiness | 10% | 50 | 55 (60 with the Cloudflare fix) | `geo.md` |
| Images | 5% | 78 | 84 | `visual.md` |
| **Weighted total** | | **63 / 100** | **76 / 100** | |

**Previous audit:** 63 / 100 on 1 Oct. Live has not moved because nothing has been deployed since.

**Projected path:** see `FIX-PLAN.md` for the assumptions behind each step.

| Step | Projected score |
|---|---|
| Deploy (Phase 0) | 76 |
| Code sprint + Cloudflare (Phases 1 and 2) | about 82 |
| Trust, pricing and proof (Phase 3) | about 85 |
| Authority (Phase 4, months 2 to 6) | about 88 |

**Also measured, not weighted:**

| Area | Result | Source |
|---|---|---|
| Local SEO | 26 live (30 after deploy) | `local.md` |
| SXO persona averages (local build) | US founder 64.9, US/UK SMB owner 67.3, Bangladesh e-commerce owner 58.3; weakest cell SaaS page × Bangladesh owner (45) | `sxo.md` |
| Backlinks | Insufficient data. 2 followed referring domains (nbafl.net, maneelclub.com), unchanged since 1 Oct | `backlinks.md` |
| Maps presence | None in either market | `maps.md` |
| Hreflang | Correct for a monolingual site | `hreflang.md` |
| Agent readiness | 64 live, 66 local (1 Oct: 58). Lighthouse agentic 3/3 on most templates, 2/3 on the e-commerce service page (mobile CLS 0.137) | `agentic.md` |
| Deploy gate (`verify-live.sh`) | **Live fails 34 checks; the local build fails 7** | `verify-live.sh` |

---

## PERCEIVE: what the evidence says

1. **The biggest problem is still process, not code.** The 1 Oct fixes are built and verified locally but have sat undeployed for two weeks. Until they ship, live keeps all of these:
   - run-together H1s ("CustomSoftwareDevelopment")
   - 80 words of homepage text inside `<main>` (local: 1,405)
   - duplicate homepage/service titles
   - 22 legacy URLs returning 404
   - an indexable `?channel=` spam URL
   - the placeholder LinkedIn in `sameAs`
   - the virtual office marked up as a staffed business
   - placeholder client metrics under real client names

   Deploying alone moves the score from 63 to about 76.
2. **AI crawlers are still blocked at the Cloudflare edge** (re-tested three times today with official user agents):

   | Crawler | Result |
   |---|---|
   | GPTBot | **403** (a bare "GPTBot" string gets 200, which hid the problem) |
   | ClaudeBot | **403** |
   | CCBot | **403** |
   | OAI-SearchBot, ChatGPT-User, Claude-SearchBot, PerplexityBot | 200 |

   robots.txt allows all of them, so this is a Cloudflare setting, not code.
3. **Trust is still the binding constraint.**
   - **Testimonials:** the placeholder testimonials are kept by founder decision. They remain a reported risk under the US FTC fake-review rule, 16 CFR 465.
   - **Proof:**
     - The mobile, AI and SaaS pages show websites and stores as their "work". The portfolio has 0 mobile apps, 0 AI products and 0 SaaS products.
     - There are no third-party reviews.
     - A **Clutch profile already exists** (clutch.co/profile/arrowbin-0, 0 reviews, unclaimed details: Tampa wording, no Suite 300).
   - **Prices** contradict each other: the floor is $5k, $8k, $10k or $12k depending on the page, and the ceiling is $75k, $120k, $250k or $500k+. The e-commerce and SaaS pages show no build price at all.
   - **Florida LLC:** still unverified. OpenCorporates shows it Inactive.
4. **Raw-HTML problems the local build has not fixed yet** (all small code jobs):
   - **Hidden blocks:** /services, every service page, /about, /blog and blog posts still stream their FAQ, hub and CTA sections into hidden `<div hidden>` blocks after `</main>`. On /services only 42 words sit inside `<main>`.
   - **Manifesto:** the homepage manifesto still doubles every word for crawlers ("We We are are a a software software…"). The stats block does the same.
   - **404 page:** it inherits the homepage canonical and has two robots metas.
5. **Mobile performance is flat and now better diagnosed.**
   - **LCP** is 3.4 to 4.7 s on every template. The LCP element is hero text, not an image, held back by 0.8 to 1.3 s of render delay.
   - **Main-thread cost** is mostly style recalculation and layout (700+ recalcs in 4 s), not script.
   - **CLS (NEW):** the service pages score 0.138 from the web-font swap.
   - **Desktop** scores 91 to 99.
6. **Off-site authority is unchanged at almost zero:**
   - 2 followed links
   - no LinkedIn company page (404)
   - GitHub org with 0 repos and a stale info@ / "Digital Agency" description
   - no directory listings beyond the unclaimed Clutch stub
   - no Maps presence
   - AI-answer baseline 0 of 20

## ANALYZE: how the problems connect

- **Deploy unlocks four categories at once:**
  - Technical: redirects, 410s, favicon, headers.
  - On-page: titles, H1s.
  - Schema: sameAs, founder, the virtual-office node.
  - Content: the placeholder metrics come off.

  It is also the precondition for Search Console Removals and re-crawls. Nothing else in the plan should wait on anything except this.
- **The Cloudflare change is independent of code** and is the single biggest AI-visibility lever. GPTBot and ClaudeBot feed the training and retrieval indexes behind ChatGPT and Claude answers.
- **Trust fixes lift several scores together.** Matching proof, one price table, a risk-reversal line and real reviews would raise E-E-A-T, all three SXO persona scores, AI citation confidence and conversion. The founder has to supply the facts. Dev work is small once the facts exist.
- **Entity consistency comes before directories.** Clutch, GoodFirms and Crunchbase all ask for the legal entity and NAP (name, address, phone). If the LLC is inactive or the GitHub org still says info@ / "Digital Agency", every listing copies the inconsistency.
- **The performance fix overlaps the motion code.** Style and layout thrash (HeroMotion, InnerMotion, the GSAP reveals, `text-wrap: balance`, variable-font `wdth` animation, blur filters) sits in the same files as the hidden-block and manifesto fixes. Do them as one task, with visual sign-off on the founder's dev server.

## VALIDATE: what we are not sure of

- **Bot test location:** the AI-crawler 403s were tested from one IP. Cloudflare may treat real crawler IPs differently. The founder should confirm in Cloudflare (Security > Events, filtered by user agent) that real GPTBot and ClaudeBot hits are blocked or challenged.
- **Lab performance only:** run-to-run spread is wide (home TBT 993 to 2,170 ms on the same build). Treat any single run as noisy and judge on medians of 3.
- **Off-site absences:** "absent" for LinkedIn, GoodFirms, Crunchbase, GBP and Bing Places means "no evidence found". These sites block automated checks.
- **Unverified claims:** "Online ordering live in 8 weeks", "all 64 districts" and "15+ brands" were not verified by any agent. The founder should confirm them.
- **Score projections** are estimates from the category scorers, not measurements.

---

## Findings by priority

Each finding carries a fix ID that points to `FIX-PLAN.md`. "How we'd know it failed" is either a check in `verify-live.sh` or a measurable signal.

### Critical

| # | Finding | Status | Fix | Owner | How we'd know it failed |
|---|---|---|---|---|---|
| C1 | **Seven fix batches undeployed** (titles, H1s, homepage `<main>`, redirects/410s, schema, favicon, alt text, tap targets, factual portfolio lines) | FIXED-LOCAL | P0.1 to P0.4 | founder approves, dev deploys | `verify-live.sh` sections 1, 2, 5, 6 fail on production |
| C2 | **Cloudflare blocks GPTBot, ClaudeBot, CCBot** (official user agents, 403) while robots.txt allows them | OPEN | P1.1 | founder | `verify-live.sh` section 7 shows any 403 |
| C3 | **Placeholder testimonials** (Sarah Mitchell, David Chen, Rafiul Islam) | OPEN, kept by founder decision | P3.9 (decision only) | founder | Reported risk only |
| C4 | **Florida LLC status unverified** (OpenCorporates: Inactive) | OPEN | P1.2 | founder | Sunbiz shows anything but ACTIVE |

### High

| # | Finding | Status | Fix | Owner |
|---|---|---|---|---|
| H1 | /services, service pages, /about, /blog and posts stream FAQ/hub/CTA into hidden blocks after `</main>` (/services: 42 words in main) | OPEN, NEW scope | P2.1 | dev |
| H2 | Homepage manifesto and stats double every word in raw HTML | OPEN | P2.2 (needs founder visual sign-off) | dev |
| H3 | Mobile LCP 3.4 to 4.7 s; render delay from style/layout thrash; home TBT about 1.2 s median | OPEN | P2.8 | dev |
| H4 | Proof does not match the service on the mobile, AI, SaaS, cloud and UI/UX pages | OPEN, NEW detail | P3.2 | founder, then dev |
| H5 | Prices conflict across 8+ places; no price on e-commerce/SaaS/maintenance; no /pricing | OPEN | P3.1 | founder, then dev |
| H6 | No risk reversal anywhere (no exit terms, no post-launch fix window) | OPEN | P3.3 | founder |
| H7 | Entity gaps: no LinkedIn company page; GitHub org stale (info@, "Digital Agency", USA, 0 repos); Clutch profile unclaimed | OPEN, Clutch NEW | P1.3 to P1.5 | founder |
| H8 | 5 of 8 client sites give no credit; Brandingly credit is an HTML comment only | OPEN | P4.1 | founder |
| H9 | No conversion tracking for Cal.com bookings; no "how did you hear about us" field | NEW | P2.10 | dev |

### Medium

| # | Finding | Status | Fix |
|---|---|---|---|
| M1 | 404 page inherits the root canonical and has two robots metas | OPEN | P2.3 |
| M2 | Footer LinkedIn link still points to the placeholder `/in/arrowbinllc` | OPEN | P2.4 |
| M3 | Service page CLS 0.137 to 0.138 on mobile (custom software and e-commerce; web-font swap in the hero grid) | NEW | P2.8 |
| M4 | Service boilerplate: 33 to 49% of main-content lines repeat on 3+ other service pages | OPEN (worse than estimated) | P3.6 |
| M5 | Titles still lack the head term: e-commerce "company", AI "agency", UI/UX "agency"; hero sentence one never holds the mapped keyword | OPEN | P2.6 |
| M6 | Blog posts link to only 2 of 8 services; the cost guide has a single end CTA and still says "Updated June 20" | OPEN | P2.7, P3.7 |
| M7 | Schema: `Organization.founder` points to a `#founder` Person that only exists on /about and posts, so it dangles on every other page (NEW, introduced by the local fix); Dhaka node asserts "Mohammadpur" as a street plus unverified hours; BlogPosting has no `@id` and a thin author; single-item home breadcrumb; unnamed ItemLists; blog CollectionPage name carries the title suffix | OPEN / NEW | P2.5 |
| M8 | llms.txt leads with offices, has no key-facts block and no hub links | OPEN | P2.9 |
| M9 | No Bangladesh path (WhatsApp, BDT prices, Bangla page) | OPEN | P3.5 |
| M10 | Unverified claims ("15+ brands … fintech and media", "8 weeks", "64 districts") | NEW | P3.8 |
| M11 | GA/GTM costs about 180 ms of blocking time; 28 KB render-blocking CSS | OPEN | P2.8 |
| M12 | Remaining sub-44px tap targets (logo 28px, email links, nav pills 40px); 10 to 11px labels on /work and service pages | OPEN | P2.11 (design sign-off) |
| M13 | Mobile homepage H1 sits at y=696 of 844 | OPEN | P2.11 (design sign-off) |
| M14 | No Dhaka street address; no Dhaka GBP decision | OPEN | P1.6, P4.4 |
| M15 | Agent/form hygiene: no Content-Signal, llms.txt has no booking/brief links, required fields not exposed, quote success not announced, honeypot named like a real field, no security.txt | OPEN / NEW | P2.9, P2.13 |

### Low and Info

- `/privacy` and `/terms`:
  - og:url is the homepage.
  - Titles are short (25 and 27 chars).
  - The `/terms` description is 118 chars.

  (P2.3)
- Sitemap lastmod should be the deploy date; RSS `lastBuildDate` is stale (12 May). (P0.3, P2.7)
- `http://www` takes two hops; HTML is not edge-cached. (P1.1)
- No width/height on `fill` images (CLS is fine); empty alt on 5 /work images and the /about founder photo. (P2.11)
- AI-typical phrasing ("actually" 31, "Here's" 16, "honest" 12); "software studio" vs "software development company" wording drift. (P3.6)
- Homepage H1 text repeats the tagline once (sr-only sentence plus aria-hidden letters). (P2.2)
- Hreflang: `og:locale` on 3 of 19 pages; unknown dynamic slugs render a 404 with no `lang`; the Bangla project name has no `lang="bn"`; WebSite has no `inLanguage`. (P2.12)
- FAQPage markup is Info only. Google retired FAQ rich results on 7 May 2026. Keep it for AI extraction; don't add more for SERP reasons.
- /work desktop deck: the right-most card is clipped at the viewport edge. This is identical on live, so it is not a regression. Founder to confirm it is intended (the brand rule says no cropped content).

---

## Agent findings (one line each)

| Report | Score | Main point |
|---|---|---|
| `technical.md` | 62 → 89 | 9 of 10 1 Oct technical items fixed locally; new: homepage `<main>` had 0 service links live, blog-to-service linking thin, 404 canonical |
| `content.md` | 55 → 66 (E-E-A-T 41 → 47) | Placeholder metrics gone locally; proof relevance, prices, boilerplate and unverified claims open |
| `schema.md` | 79 → 89 (95 possible) | Duplicates, St. Pete node, sameAs fixed locally; Dhaka node, BlogPosting and ItemLists left; ready-made code in the file |
| `performance.md` | 62 → 66 | LCP fails all templates; style/layout thrash is the new root cause; keep the homepage Suspense unwrap |
| `visual.md` | 78 → 84 (images) | Alt, eager images, tap targets fixed locally; no visual regressions; mobile H1 position and small labels open |
| `geo.md` | 50 → 55/60 (~70 with all work) | Edge 403s, hidden blocks on service pages, empty entity graph; 5 ready rewrites in the file |
| `sxo.md` | personas 64.9 / 67.3 / 58.3 | Page types are right; decision content (proof, price, guarantees, WhatsApp) missing |
| `local.md` | 26 → 30 | Clutch stub found; LLC, Dhaka address, GitHub NAP, LinkedIn open |
| `maps.md` | presence none | Dhaka competitors at 17 to 72 Clutch reviews; review target 45 to 50; GBP only if Dhaka office is staffed and visitable |
| `backlinks.md` | insufficient data | 2 followed links; 15 next links listed, 7 of them from existing client relationships |
| `flow.md` | n/a | Add booking tracking, "how did you hear" field, Bangladesh e-commerce page before Tampa, founder byline, deploy gate |
| `hreflang.md` | correct | Nothing needed until a Bangla page exists; exact implementation for `bn-BD` is ready |
| `agentic.md` | 64 → 66 | Forms and booking are agent-completable; add Content-Signal, llms.txt action links, form semantics, honeypot rename, security.txt (P2.9, P2.13) |
| `page-home.md` | 57 → 70 | No visible copy uses the primary keyword (hero says "software studio"); no links to the guides; no named founder or year; outline for new sections |
| `page-custom-software.md` | 63 → 68 | Exact keyword never in copy; FAQ (the only price answer) and CTA outside `<main>`; add CRM/ERP, cost, industries, who-builds sections |
| `page-ecommerce.md` | 61 → 66 | Keyword missing from title and copy; 3 of 6 commerce builds shown; no prices; leads with Shopify though no Shopify store is in the portfolio; non-breaking hyphen in the H2 |
| `page-cost-post.md` | 75 → 75 | Rate table cites salary data, not agency rates; the "real example" is illustrative; "book a call" is not a link, so no CTA inside the article |

---

## ACT

The full sequenced plan is **`FIX-PLAN.md`**: phases, owners, effort, dependencies, failure checks, leading indicators and KPI targets. Short version:

1. **Today (founder, about 1 hour):**
   - Approve commit and deploy of the local build.
   - Fix the GitHub org description and email (the new `sameAs` points to it).
   - In Cloudflare, allow GPTBot, ClaudeBot and CCBot, and make `http://www` one hop.
   - Check Sunbiz.
2. **Deploy day (dev):** deploy, run `verify-live.sh`, submit the sitemap, request indexing, file Removals for the spam URLs.
3. **Week 1 to 2 (dev, no founder input):**
   - unwrap the remaining Suspense blocks
   - 404 canonical, footer LinkedIn, schema remainder, llms.txt, titles, blog links, booking tracking
   - performance pass

   Then the manifesto/stats fix and the small-label and tap-target changes, once the founder signs off on :3001.
4. **Week 1 to 3 (founder facts, then dev):**
   - one price table
   - matching proof or honest relabels
   - one risk-reversal line
   - WhatsApp number
   - claim Clutch, create LinkedIn and GoodFirms
   - client footer credits and review requests
5. **Weeks 3 to 12:** /pricing, two case studies, the Bangladesh e-commerce page, then the content plan and authority work from `../10-roadmap/seo-roadmap.md`.

**Deploy gate:** no item counts as done until `bash docs/seo/12-audit-2026-10-14/verify-live.sh` passes against production for that item.
