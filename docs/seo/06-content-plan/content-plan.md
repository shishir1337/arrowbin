# Content plan: what to publish, in what order, and how

**Built:** 29 September 2026 from `05-keyword-map`, `03-serp`, `02-competitors`, `07-geo-aeo` and the question banks (`03-serp/people-also-ask.md`, `04-keywords/question-keywords.md`).

Capacity assumption: founder + 1 writer/marketer, and dev time for page builds. **Pace: 2 pieces per week** (1 page + 1 post), sustainable for 6 months. Quality beats volume: Arrowbin can't outpublish Riseup Labs (about 1,066 posts) or Aalpha (about 1,483). It has to out-answer them on narrow topics.

---

## 1. Page templates (use these every time)

### A. Service page (the 8 existing + new service pages)
The new build already has bespoke, interactive service pages. Keep the design; make sure each one also has:
1. **H1 containing the primary keyword** ("Custom software development company" + the visual slogan). Fixes audit M-2.
2. **An answer-first intro (40 to 60 words)** stating what we build, for whom, typical cost range and timeline. AI engines quote this block.
3. **Starting price range + timeline** in visible HTML, linking to `/pricing` and the calculator.
4. **Proof block**: relevant `/work` projects (and later `/work/<slug>` case studies with confirmed numbers).
5. **Process + deliverables** (what the client gets each week).
6. **Comparison table** (e.g. "Custom vs off-the-shelf", "Shopify vs custom") when relevant.
7. **FAQ (6 to 10 questions)** taken from the question bank for that cluster, with FAQPage schema. Google retired FAQ rich results in May 2026, so don't expect a SERP feature. The schema still helps AI extraction.
8. **Service schema** + BreadcrumbList (already present) + a named author/reviewer (founder) for E-E-A-T.
9. **3+ contextual internal links in** (from posts) and **links out** to 2 to 3 related posts (audit M-4).

### B. Cost guide ("How much does X cost in 2026")
Winning anatomy from `02-competitors/winning-content-formats.md` §2:
- **TL;DR answer box** with the range in the first 60 words (already in the new blog template as "The short answer").
- **Tiered table**: simple / standard / complex, each with price range, timeline and example.
- **Cost breakdown by phase** (discovery, design, build, QA, launch, maintenance).
- **Regional rate table**: US, Western Europe, Eastern Europe, Latin America, India, **Bangladesh**. Every number cited to a source.
- **3 worked example budgets.**
- **What drives cost up/down**, hidden costs, and how to save.
- **A calculator link** (inline CTA).
- FAQ from the question bank, a named author, and an "Updated <Month YYYY>" date.

### C. Comparison post ("X vs Y")
A verdict in the first paragraph ("Choose X if…, choose Y if…"), then a comparison table with 8 to 12 rows, then sections per criterion, a cost comparison, "what we recommend for most startups", and an FAQ. LLMs extract these tables verbatim.

### D. Market/local landing page (Bangladesh, Tampa Bay)
City or country in the H1, genuine local proof (named clients, local payment/courier integrations for Bangladesh), a local price table (USD + BDT for Bangladesh), how engagement works across time zones, an FAQ, and LocalBusiness/ProfessionalService schema **only with a real address** (see `08-local`). Linked from the footer, not the main navigation.

### E. Data / linkable asset
Original numbers (Arrowbin project data, a survey) or carefully sourced public data (BASIS, ICT Division, Clutch rate filters), with a methodology section, downloadable CSV, embeddable chart, "cite this" box and an update date. These earn links and AI citations (`07-geo-aeo`).

### Writing rules (all content)
- **No em dashes.** Use commas, colons, full stops or parentheses. En dashes are fine in ranges.
- Never invent statistics, testimonials or client results. Cite a source URL for every number; publish client metrics only with written approval.
- Named author (Md. Shishir Ahmed) with bio + LinkedIn; add "Reviewed by" once there is a second senior person.
- Put the year in titles only where the SERP shows it wins (cost and timeline posts); update yearly.
- Every post links to 2 to 3 money pages with descriptive anchors, and to the calculator where relevant.

---

## 2. Existing content upgrades (weeks 1 to 3)

| Page | Upgrade |
|---|---|
| `/blog/how-much-does-custom-software-development-cost` | Add a regional rate table with a Bangladesh row, 3 worked budgets, a calculator link, FAQ from question-bank §1, and links to the ecommerce, mobile and SaaS service pages. |
| `/blog/how-long-does-it-take-to-build-an-mvp` | Answer-first timeline table by MVP type (6–8 / 10–14 / 14–20 weeks, already in the post); link to the new MVP cost post and `/services/mvp-development`. Quick-win SERP (Medium). |
| `/blog/how-to-choose-a-software-development-company` | Reposition as a **vendor scorecard + downloadable RFP template** (the SERP is saturated with generic lists; DesignRush, Vention and Forbes lead). |
| All 8 service pages | Apply template A. The on-page CSV (`01-audit/on-page-titles-meta.csv`) has the recommended titles, descriptions and H1s. |
| `/` | Retarget title and H1 to "software development company"; end the cannibalisation with `/services/custom-software-development`. |

---

## 3. P1 briefs (months 1 to 2)

### 3.1 `/offshore-software-development-bangladesh`
- **Primary:** offshore software development bangladesh · **Secondary:** hire developers in bangladesh, software development company in bangladesh, outsource software development to bangladesh, bangladesh vs india/pakistan developers (82 mapped keywords).
- **Angle:** "US contract, Bangladesh engineering". Arrowbin LLC as the contracting entity (**verify the Florida LLC is active first**, see `08-local`), a Dhaka delivery team, founder-led.
- **Sections:** answer-first summary · why Bangladesh (sourced: BASIS, ICT Division; no recycled "600,000 IT professionals" claims) · rates table (Bangladesh vs India vs Eastern Europe vs US, sourced) · time-zone overlap plan for US/UK/AU clients · risks and how we mitigate them (holidays, power/internet redundancy, economic risk; competitors hide these, we don't) · engagement models (fixed scope, dedicated team, retainer) · proof · FAQ (question-bank "Hiring, outsourcing").
- **Beats:** kaz.com.bd, bjitgroup.com, vivasoftltd.com, impalaintech.com (about 1,800 words, unsourced stats, some stale).

### 3.2 `/ecommerce-website-development-bangladesh` (+ Bangla version later)
- **Primary:** ecommerce website development company in bangladesh.
- **Angle:** live proof from 4+ Bangladesh stores (Silent Lifestyle BD, FlexOver BD, North Bengal Agro Farms, গ তে গয়না, Maneel Club): bKash/Nagad/SSLCommerz, Pathao/Steadfast/RedX, cash-on-delivery with phone confirmation, and 64-district delivery.
- **Sections:** package/price table in BDT and USD (only real prices) · platform choice (Shopify vs WooCommerce vs custom) · integrations · timeline · portfolio · FAQ.
- **Beats:** brainstation-23.com generic page, local shops' thin package pages.

### 3.3 `/pricing`
- Honest "starting from" ranges per service plus engagement models (fixed scope, monthly retainer, dedicated team, hourly for small jobs), what's included, and how quotes are built. Link to the calculator and the contact brief. **The founder must supply the real numbers**; don't publish guesses.

### 3.4 `/tools/software-cost-calculator`
- **Ungated:** the range appears on the page instantly, and "email me the breakdown" is optional (it feeds the contact brief). Inputs: project type, platforms, features, design depth, integrations, team location. Output: range + timeline + a "what drives this" explanation. Build it with the same care as the service widgets (the OrderRace / RoiCalculator style).
- Separate SEO-targeted entry pages can come later: `/tools/app-cost-calculator`, `/tools/ecommerce-website-cost-calculator`.

### 3.5 `/blog/mvp-development-cost`
Template B. Links to the MVP timeline post, `/services/mvp-development` and the calculator.

### 3.6 `/blog/app-development-cost-bangladesh`
Template B with USD + BDT; web, mobile and e-commerce rows; a local vs international agency comparison.

### 3.7 `/blog/shopify-vs-custom-ecommerce`
Template C, using our own builds as examples; includes Bangladesh payment-gateway support differences.

### 3.8 `/blog/mvp-vs-prototype-vs-poc` and 3.9 `/blog/staff-augmentation-vs-dedicated-team`
Template C. Short (1,200 to 1,800 words), table-led.

### 3.10 `/software-development-tampa-bay`
Template D. **Don't create a Google Business Profile at 7901 4th St N (verified shared virtual office, ineligible).** Win organically: local page, Clutch/UpCity/Built In listings, and Tampa Bay clients' reviews when available. Covers Tampa, St. Petersburg and Clearwater in one strong page rather than three thin ones.

---

## 4. Calendar (6 months, 2 items per week)

| Month | Pages (dev) | Posts / assets (content) |
|---|---|---|
| **Oct 2026** | Launch new build (with fixes from `10-roadmap` phase 0) · `/pricing` · `/offshore-software-development-bangladesh` | Upgrade 3 existing posts · `mvp-development-cost` · `staff-augmentation-vs-dedicated-team` · `mvp-vs-prototype-vs-poc` |
| **Nov 2026** | `/tools/software-cost-calculator` · `/ecommerce-website-development-bangladesh` | `app-development-cost-bangladesh` · `shopify-vs-custom-ecommerce` · `ai-automation-for-small-business` (03-serp: Low-Medium) · `saas-development-cost` |
| **Dec 2026** | `/software-development-tampa-bay` · `/services/mvp-development` | **Data asset 1:** "Software developer rates by country 2026 (sourced)" · `ecommerce-website-cost` · `fixed-price-vs-time-and-materials` |
| **Jan 2027** | `/services/nextjs-development` · `/services/dedicated-development-team` | `software-development-outsourcing-guide` (pillar) · `offshore-vs-nearshore-vs-onshore` · `bangladesh-ecommerce-integrations` (bKash/SSLCommerz/Pathao) |
| **Feb 2027** | `/services/web-application-development` · `/custom-software-for-small-business` | **Data asset 2:** "Bangladesh e-commerce statistics 2026" (sourced) · `web-app-development-cost` · `in-house-vs-outsourcing-software-development` |
| **Mar 2027** | `/hire/nextjs-developers` · first 2 `/work/<slug>` case studies (if the founder un-parks them) | `app-development-cost` · `custom-software-vs-off-the-shelf` · honest listicle: "Best software development companies in Bangladesh (criteria disclosed)" |

Then from month 7: industry pages where proof exists, the remaining comparison backlog, yearly refresh of every cost and timeline post, and more case studies.

---

## 5. Internal linking plan
- **Hub and spoke:** `/services` → 8 service pages → their cost guide + comparison posts → back to the service page.
- **Cost cluster:** every cost post links to `/pricing` and the calculator; the calculator result links to the matching service page.
- **Bangladesh cluster:** offshore BD page ↔ e-commerce BD page ↔ app cost BD post ↔ BD integrations post.
- **Each new post gets 3+ links from existing posts within a week of publishing** (update older posts).
- Footer: add links to `/pricing`, the calculator, the Bangladesh pages and the Tampa Bay page.
