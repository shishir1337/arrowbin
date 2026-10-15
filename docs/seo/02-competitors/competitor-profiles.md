# Competitor profiles

Research date: 2026-09-29. Method: live SERP checks (WebSearch, US results), fetches of each homepage, key pages, `llms.txt` and XML sitemaps. Blog post counts are estimates from counting `<loc>` entries in post sitemaps (drafts, noindex and mixed sitemaps make them approximate). Schema types were read from the raw HTML of the homepage (plus one cost or service page where noted), so "schema" means "seen on those pages", not site-wide. Clutch figures are as rendered on the profile or list pages on the research date and will drift.

Profiled: 6 Tier A (Bangladesh), 7 Tier B (global), 4 Tier C (Tampa Bay / Florida). Tier D directories are summarised at the end.

---

## Tier A: Bangladesh / South Asia direct peers

### Brain Station 23 (brainstation-23.com)
- **Positioning:** H1 "Build AI-Powered, Scalable Software for Startups to Enterprises"; secondary "Scale Your Dev Team With Top 1% Bangladeshi Talents in 4 Weeks" (https://brainstation-23.com/).
- **Services and URL structure:** flat root slugs such as `/staff-augmentation/`, `/mvp-services/`, `/ai-software-development-company/`, `/erp-software-company/`. The page sitemap holds about 185 URLs, including stray test pages like `/demo-rafi-3/`.
- **Industry pages:** `/industries/` hub plus root slugs (`/retail/`, `/startup/`, `/real-estate/`).
- **Location pages:** country + service combinations, e.g. `/fintech-app-development-company-uk/`, `/software-services/software-development-company-in-dubai-uae/`, `/telehealth-app-development-services-australia/`. One US hire page: `/hire-php-developer-usa/`.
- **Pricing:** no pricing page or calculator. Clutch lists $25–49/hr and staff augmentation from $2,500/month (https://clutch.co/profile/brain-station-23).
- **Case studies:** root slugs like `/city-bank/`. Overview / Challenges / Solution / Impact + tech stack, with hard metrics (e.g. "446,000+ users").
- **Blog:** about 149 posts (estimate). Main pattern: 25+ "top X companies in <country>" listicles, including `/top-software-companies-in-bangladesh/`, which ranks BS23 #1 and has a 6-question FAQ (https://brainstation-23.com/top-software-companies-in-bangladesh/).
- **Lead magnets:** Calendly calls, `/brochure/`, a free 60-minute strategy session.
- **Trust:** Clutch 4.9 (21 reviews). ISO 27001 and CMMI Level 3 claimed on site. Microsoft, AWS and Odoo partnerships.
- **Schema:** Organization, LocalBusiness, WebSite, FAQPage (10 Qs), 24 Service entities, AggregateRating, Person. The richest in the BD set.
- **AEO/GEO:** a hand-written `llms.txt` (about 19 KB) that names its target markets. FAQ blocks on the homepage and service pages.

### Vivasoft (vivasoftltd.com)
- **Positioning:** H1 "Top Custom Software Development Company"; "We Deploy World Class Agile Product Teams on Demand" (https://vivasoftltd.com/).
- **Services:** `/team-augmentation/`, `/end-to-end-development/`, `/mvp-service/`, `/react-js-development-company/`. Hire pages include `/hire-developers/`, `/hire-python-developers/`, `/hire-golang-developers/` (6 in total). Industries appear in the nav but have no pages. No location pages.
- **Pricing:** `/mvp-cost-calculator/` is a 5-step quiz (type, stage, platform, industry, timeline) that gives a per-feature estimate with a 15% buffer. The result is gated behind a work email.
- **Case studies:** `/case-study/<slug>/`, about 30 of them. Overview, Technologies, Challenges, Solution, Features, team table, Duration. Business metrics are weak.
- **Blog:** about 225 posts (estimate). Tech tutorials, `/staff-augmentation-vs-outsourcing/`, cost posts (`/mvp-development-cost/`, `/flutter-app-development-cost/`), and a self-ranking `/best-software-companies-in-bangladesh/` (https://vivasoftltd.com/best-software-companies-in-bangladesh/). Bylines say "Vivasoft Team", not a named author.
- **Trust:** Clutch 5.0 (9 reviews). ISO 9001/27001/27701. Client logos include City Bank and Banglalink.
- **Schema:** Organization, WebSite, FAQPage (4 Qs), Article, VideoObject, Person.
- **AEO/GEO:** no `llms.txt` (404). Homepage FAQ.

### Kaz Software (kaz.com.bd)
- **Positioning:** H1 "Top software company in Bangladesh", tagline "Get your software done." The H1 targets the head term directly (https://kaz.com.bd/).
- **Services and URL structure:** the cleanest hierarchy in the set: `/services/<x>`, `/technologies/<x>/<sub>`, 13 pages at `/industries/<x>`, and `/solutions/<x>`. There is also a dedicated `/outsource-software-development-to-bangladesh` page (https://kaz.com.bd/outsource-software-development-to-bangladesh). No hire or location pages.
- **Pricing:** none found.
- **Case studies:** `/our-work/<client>`, about 40 (UNICEF and World Bank-type clients). Need / Solution / Challenge / Partnership + stack. Scale metrics, but no ROI.
- **Blog:** about 509 posts (estimate), with a recent high-volume AI push. It ranks #1 organic for "offshore software development Bangladesh" (https://www.kaz.com.bd/blog/offshore-software-development-bangladesh). Its self-ranking top-10 BD listicle includes a disclosure.
- **Trust:** Clutch 5.0 from only 2 reviews (https://clutch.co/profile/kaz-software). Over 200 client logos. AWS, Microsoft and OpenAI partner claims.
- **Schema:** LocalBusiness and WebSite only.
- **AEO/GEO:** a short `llms.txt` (about 3 KB). Built on Wix.

### Riseup Labs (riseuplabs.com)
- **Positioning:** H1 "Scale Faster with AI Powered Digital Solutions"; "10X faster delivery, 100% IP protection".
- **Services:** the most aggressive programmatic SEO seen. About 444 service URLs (e.g. `/mvp-development-company-in-uk/`) and about 492 hire URLs (e.g. `/hire-drupal-website-developers/`). Industry pages at `/<industry>-software-solutions/`. About 15 thin `/riseup-labs-in-<country>/` pages. Bangladesh offshoring pages: `/why-bangladesh/`, `/cost-savings/`.
- **Pricing:** none. The contact form uses budget buckets (under $5K to $50K+).
- **Case studies:** Overview / Challenge / Solution, with no metrics and no testimonial.
- **Blog:** about 1,066 posts (estimate). Many "top/best X" posts. A self-ranking list ranks Riseup #1 (https://riseuplabs.com/best-software-development-company-in-bangladesh/). 43 author bio pages.
- **Trust:** Clutch 4.9 (46 reviews), the most in the BD set (https://clutch.co/bd/developers). APICTA 2025 and Digital Bangladesh awards claimed. ISO 9001/27001.
- **Schema:** Organization, WebSite, WebPage, Place, ContactPoint.
- **AEO/GEO:** an auto-generated Rank Math `llms.txt` (about 216 KB), a `/faqs/` page, and author bios.

### SJ Innovation (sjinnovation.com)
- **Why it matters:** the closest structural twin to Arrowbin: a New York entity with delivery from Dhaka and Sylhet (plus Goa). It ranks for "offshore software development in Bangladesh" (https://sjinnovation.com/offshore-software-development-in-bangladesh).
- **Positioning:** H1 "Build smarter, faster, and stronger with AI-powered custom software"; "NYC-based, AWS-certified".
- **Services:** about 18 pages at `/services/<x>`; industry pages at `/industry/<x>`. No hire or location pages.
- **Pricing:** none. Cost posts only.
- **Case studies:** 13 at `/case-study/<slug>` plus about 110 portfolio pages. Scope / Stack / Goals / Challenges / Solution / Result, all qualitative.
- **Blog:** about 458 posts (estimate). AWS, AI, QA and Drupal. The sampled post had no visible author or date.
- **Trust:** Clutch 4.9 (39 reviews). Inc. 5000. ISO 9001/27001.
- **Schema:** Organization, WebSite, WebPage (the site is JS-rendered, so other types are not verified).
- **AEO/GEO:** no `llms.txt`, no homepage FAQ.

### Technext (technext.it), short profile
- **Positioning:** "Trusted Development Partner for SMBs & Startups", the same buyer as Arrowbin.
- **Pages:** hire pages (`/hire-reactjs-developers/`), `/cto-as-a-service/`. `/mvp-cost-calculator/` is mostly an article with a named author and an FAQ (the interactive widget is not verified).
- **Blog:** about 154 posts (estimate), including `/software-companies-in-bangladesh/` (https://technext.it/software-companies-in-bangladesh/) and a Sylhet list.
- **Trust:** Clutch 5.0 (13 reviews), a `/wall-of-love/` testimonials page, and its own products (ThemeWagon, MailBluster).
- **AEO/GEO:** a Rank Math `llms.txt`.

---

## Tier B: global agencies that own the money SERPs

### ScienceSoft (scnsoft.com)
- **Positioning:** "AI Transformation and Software Development"; claims 37 years, 750+ staff and 4,300+ projects on the homepage.
- **Services:** deep topic paths (`/software-development/mvp`, `/ecommerce/services/development`). Industry hubs such as `/healthcare`, several with their own blog. Location pages are minimal (`/software-development/dallas`). 10 hire pages at `/software-development/<tech>/developers-for-hire`.
- **Cost assets (strongest in the set):** 275 calculator URLs, e.g. https://www.scnsoft.com/software-development/costs/calculator. Each is an 8-step form that gives no instant number: the user leaves a work email and gets a quote within 24 hours. About 22 cost pages, including `/software-development/costs` (co-authored by the CTO, a solution architect and a talent director).
- **Case studies:** about 1,000 at `/case-studies/<slug>`. Often anonymous, light metrics.
- **Blog:** about 925 posts (estimate). Stats pages such as `/healthcare/telemedicine-statistics`.
- **Trust:** Clutch 4.8 (43 reviews). Financial Times, IAOP Global Outsourcing 100 and Newsweek listings claimed. ISO 9001/27001/27701.
- **Schema:** Organization, AggregateRating, Product, WebSite, Person on the homepage; Article + Person on the cost page.
- **AEO/GEO:** no `llms.txt`. About 57 `/experts` bio pages. Mentioned 5 times in the Arrowbin LLM visibility test (see Tier D notes).

### Itransition (itransition.com)
- **Positioning:** "global software engineering company ... for over 25 years", 3,000+ engineers (https://www.itransition.com/software-development).
- **SERPs:** top 3 for "custom software development company" and "ecommerce development company" (https://www.itransition.com/ecommerce/development). Also appears on the Clutch Dhaka list.
- **Structure:** topic-root paths, heavy ERP/CRM/Dynamics clusters. About 20 hire pages at `/developers/<tech>`, which also holds X vs Y posts (`/developers/angular-vs-react`). It ranks for "Next.js development company" (https://www.itransition.com/developers/nextjs).
- **Pricing:** quote only. Topic cost pages such as `/healthcare/ehr/costs`.
- **Case studies:** 157 at `/portfolio/<slug>`, named clients with metrics.
- **Content:** statistics pages (`/software-development/statistics`), about 455 non-service URLs (a mixed estimate).
- **Trust:** Clutch 4.9 (42 reviews). Gartner, Forrester and Everest Group mentions. ISO 9001/27001.
- **Schema:** Organization, LocalBusiness, AggregateRating; FAQPage (6 Qs) on `/software-development`.
- **AEO/GEO:** a YAML `llms.txt`; robots.txt `Content-Signal: ai-input=yes, ai-train=no`; 33 `/experts/<name>` bios.

### Simform (simform.com)
- **Positioning:** "Engineering the next best thing for the digital world", focused on enterprise product engineering, Azure, data and AI.
- **Structure:** 62 pages at `/services/<slug>/`, 8 industry pages, and 17 US city pages (`/custom-software-development-chicago/`, `/software-development-texas/`).
- **Case studies:** 63, with strong business-impact metrics.
- **Blog:** about 515 posts (estimate), including 29 "top/best" listicles. The flagship `/blog/top-custom-software-development-companies/` puts Simform at #3 of 17, runs about 8.5–9K words with a 12-question FAQ, and has a credentialed author (https://www.simform.com/blog/top-custom-software-development-companies/).
- **Lead magnets:** 32 ebooks (e.g. an estimate-cost-of-custom-software ebook), whitepapers, webinars, podcast.
- **Trust:** Clutch 4.8 (88 reviews). Microsoft, Databricks and Snowflake partner badges. Enterprise logos.
- **Schema:** Organization, Service, OfferCatalog, Person, BreadcrumbList, SearchAction.
- **AEO/GEO:** a 73 KB sectioned `llms.txt`; robots.txt names GPTBot, ClaudeBot and PerplexityBot. **The most-mentioned brand (8 mentions) in the Arrowbin LLM visibility test.**

### Andersen (andersenlab.com)
- **SERPs:** #1 for "how much does custom software development cost 2026" with https://andersenlab.com/blueprint/custom-software-development-costs-in-2026, which gives tiered ranges ($25–80K / $80–250K / $250–500K+) and a named author with LinkedIn. It has no FAQ and no calculator.
- **Structure:** 162 `/services/` URLs, 120 industry URLs, 23 hire pages at `/hire-developers/<tech>`, no location pages.
- **Case studies:** 260 at `/project-cases/<slug>`, with industry, duration, team, stack and metrics.
- **Blog:** about 198 posts in `/blueprint/` (estimate), including "top custom software development companies" listicles.
- **Lead magnets:** 16 white papers and a company profile PDF.
- **Trust:** Clutch 4.9 (129 reviews).
- **AEO/GEO:** `llms.txt` (16 KB); BlogPosting + Person schema on posts.

### Aalpha (aalpha.net)
- **Why it matters:** an Indian offshore peer with the same cost-led pitch Arrowbin would use. It sits #1 on the Clutch list of developers serving Bangladesh with 4.9 from 218 reviews, the highest count seen (https://clutch.co/bd/developers).
- **Structure:** India-keyword service slugs (`/services/custom-software-development-india/`); 15 country pages (`/<service>-company-<country>/` for the UK, Canada, Germany and Australia); a `/pricing/` hub with MVP, discovery and maintenance sub-pages.
- **Blog:** about 1,483 posts (estimate), including 155 cost URLs and 89 "top/best" URLs. It ranks for "offshore software development hourly rates" (https://www.aalpha.net/articles/offshore-software-development-hourly-rates/). Posts show an author and a reviewer.
- **Case studies:** thin, no metrics.
- **AEO/GEO:** `llms.txt` present; no FAQPage schema despite a visible FAQ.

### Space-O Technologies (spaceotechnologies.com)
- **Structure:** 62 hire pages at `/hire/<x>-developers/`, 8 industry pages at `/solution/<x>/`, and 19 calculators (`/estimation/<x>-calculator/`, `/software-cost-calculator/`, `/app-cost-calculator/`), all email-gated.
- **Content:** about 417 posts (estimate), 39 cost URLs, 14 listicles; ranks for "top SaaS development companies" (https://www.spaceotechnologies.com/blog/saas-development-companies/). The flagship `/blog/software-development-cost/` has a 20-year author, an Aug 2026 update and a 15+ question FAQ. Also a 29-page `/glossary/`.
- **Trust:** Clutch 4.8 (75 reviews). Nike, McAfee and HP logos.
- **Schema:** the richest of the Tier B set: Organization, AggregateRating, FAQPage, Service, OfferCatalog on the homepage; BlogPosting + FAQPage on posts.
- **AEO/GEO:** `llms.txt` (updated June 2026).

### Upsilon (upsilonit.com)
- **Why it matters:** it owns the listicle SERPs for "MVP development companies" and "SaaS development companies" (https://www.upsilonit.com/blog/best-mvp-development-companies-in-usa, https://www.upsilonit.com/blog/saas-development-companies) and sells to the same startup buyer.
- **Positioning:** "Build your AI product with a result-driven product studio".
- **Pricing:** `/mvp-calculator` (feature picker, gated), estimate-MVP templates, and `/pricing/dedicated-teams`.
- **Case studies:** the best format seen in the research: a "Key numbers" block (e.g. 13 weeks to MVP), team, stack, and a named client testimonial.
- **Blog:** about 272 posts (estimate). MVP cost, startup and AI topics, a `/startup-faqs` hub (29 pages).
- **Trust:** Clutch profile shows 0 reviews. **This proves a firm can win these SERPs on content alone, without review volume.**
- **AEO/GEO:** no `llms.txt`; 12 author pages.

---

## Tier C: Tampa Bay / Florida

SERP snapshot: seven of the nine results for "custom software development St Petersburg FL" were city landing pages, and the rest were directories. Clutch's St. Petersburg list shows only 7 firms, and only 66Loop is based in St. Pete (https://clutch.co/developers/st-petersburg).

### 2muchcoffee (2muchcoffee.com), the closest local analogue
- **Address:** 7901 4th St N, Ste 300, St. Petersburg 33702, **the same street address as Arrowbin**, which suggests a shared office or virtual-office building. The local phone is a 347 (NYC) number (https://2muchcoffee.com/).
- **Location page:** https://2muchcoffee.com/software-development-company-st-petersburg is about 1,800 words (estimate) with the local address, "Serving St. Petersburg and Tampa Bay", an FAQ, Clutch 5.0/26 and client quotes. Schema: LocalBusiness, Service, City, FAQPage. It also has `/us-software-development-company`.
- **Other:** industry pages (`/healthcare-app-development`), about 283 blog posts (estimate), `/estimate` lead magnet, `llms.txt` present, AggregateRating markup.
- **Implication:** Arrowbin will compete with an identical address in local citations. NAP consistency and a distinct suite number (if one exists) matter.

### Sourcetoad (sourcetoad.com)
- **Positioning:** "Unlock 10x efficiency without adding headcount". AI and automation for service businesses. Offices in Tampa, Perth and Bacolod.
- **Structure:** flat slugs, industry pages (`/private-equity/`), HIPAA pages, and about 40 thin integration pages. A new "AI prototype to production" set: `/lovable-dev-to-production-help/`, `/cursor-to-production-help/`, `/vibe-audits/`. No location pages.
- **Trust:** Clutch 5.0 (9 reviews) (https://clutch.co/profile/sourcetoad), Google 4.4 per Expertise.com. SOC 2 Type II.
- **Blog:** about 158 posts (estimate). No FAQ, no `llms.txt`, Yoast default schema only.

### DragonPoint (dragonpoint.com)
- Based in Rockledge, FL (not Tampa), but ranks for "software development company Tampa" with https://dragonpoint.com/custom-software-development-tampa/.
- 6 templated Florida city pages, about 1,000–1,400 words each (estimate), with no local detail and the Rockledge address. The homepage FAQ quotes $100K–$1M+. About 49 blog posts. AIOSEO auto `llms.txt`. The Clutch profile has no reviews.
- **Implication:** Tampa rankings are reachable with modest page quality.

### RevStar Consulting (revstarconsulting.com)
- Tampa, "Your Digital Transformation Partner" for healthcare, insurance and finance. About 312 blog posts (estimate). Clutch 4.8 (8 reviews). Clutch Tampa/St. Pete badges on the homepage. No location pages, no JSON-LD detected, no `llms.txt`. Lead magnet: a 75-minute "Innovation Briefing".

### Out-of-area city-page players (not profiled in depth)
- **binary-studio.com:** a city × service matrix (https://binary-studio.com/custom-software-development-tampa/).
- **ringomedia.com:** Fort Lauderdale, `/florida/st-petersburg/<service>`.
- **ditstek.com/florida:** LocalBusiness schema carries an Indian address.
- **gaazzeebo.net/locations/st-petersburg:** a genuinely local Tampa Bay firm. About 2,800 words with **published prices** (audits from $3k, AI agents from $6k, ops software from $15k) and an FAQ (https://gaazzeebo.net/locations/st-petersburg).

---

## Tier D: directories and aggregators (summary)

- **Clutch** (clutch.co) and **DesignRush** (designrush.com) each hold top organic slots for "software development company Bangladesh" and "software development company Tampa". They were also the two most-cited domains (7 citations each) in an LLM visibility test run for arrowbin.com on 2026-09-29 across ChatGPT, Claude, Gemini and Perplexity (Babylovegrowth tool, 5 buyer-intent prompts). **Arrowbin was mentioned in 0 of 5 prompts.** The most-mentioned brands were Simform (8), BairesDev (7), Fingent (6), ScienceSoft (5), and eSparkBiz, Goji Labs and Vention (4 each). Other frequently cited sources were agency-owned "best companies" listicles (lowcode.agency 6, esparkinfo.com 4, keyholesoftware.com 4). Caveat: the tool auto-generated the prompts, and two of them named odd competitors (Uinno, Digiteum), so treat this as directional.
- **GoodFirms**, **TechBehemoths** (490 BD companies listed: https://techbehemoths.com/companies/software-development/bangladesh), **The Manifest**, **Expertise.com**, **UpCity** and **Built In** own the remaining BD and Tampa list slots.
- **Upwork** and **Toptal** own "hire X developers" and "hire developers in Bangladesh" (https://www.upwork.com/hire/enterprise-software-developers/bd/, https://www.toptal.com/developers/offshore).
- Sortlist and G2 were not observed in the SERPs checked.
- DesignRush and GoodFirms block automated fetches (HTTP 403), so their on-page content was not verified.
