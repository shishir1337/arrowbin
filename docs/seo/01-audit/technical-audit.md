# Arrowbin: technical and on-page SEO audit

Date: 2026-09-29. Scope: the live site (https://arrowbin.com, old design) and the new build in this repo (Next.js 16 App Router, not deployed yet).

Companion files in this folder:
- `on-page-titles-meta.csv`: every indexable URL with its current title, description and H1, plus recommended versions.
- `redirect-map.csv`: the migration and legacy redirect map.
- `pagespeed-live.md`: raw lab Core Web Vitals numbers.

## How this was measured

| Check | Method |
|---|---|
| Status codes, redirects, headers, timings | `curl -D -` against http/https, www/non-www and trailing-slash variants |
| robots.txt, sitemap.xml, llms.txt, rss.xml | Fetched live |
| On-page elements for all 19 sitemap URLs plus 5 probe URLs | A Python crawler parsing title, meta description, canonical, robots meta, H1, H2 count, JSON-LD `@type`s, OG tags, hreflang, `<img>` alt and internal links |
| Core Web Vitals | PSI API returned HTTP 429 (keyless quota is 0), so I ran Lighthouse 13.5.0 locally against the live URL instead. See `pagespeed-live.md` |
| Indexation | Web search for `site:arrowbin.com`, `arrowbin` and `arrowbin software development company`. These are results from a search API, not Google itself, so treat them as indicative |
| Legacy URLs | Wayback Machine CDX API (`web.archive.org/cdx/search/cdx?url=arrowbin.com/*`) |
| New build | Code read only: `src/app/**`, `src/lib/site.ts`, `src/lib/schema.ts`, `src/lib/services.ts`, `src/lib/blog.ts`, `next.config.ts`. No build was run. The local server on :3117 was not running (curl exit 7), so no rendered pages were fetched |

**Key context.** The live "old design" site already runs the same Next.js SEO layer as this repo: identical robots.txt, sitemap, llms.txt, titles, descriptions and JSON-LD. Its 19 sitemap URLs match the new build's routes one to one. **The redesign changes no URLs.** The migration risk sits in legacy URLs from earlier incarnations of the domain (a 2023 WordPress site and a 2024 digital-products marketplace) and in pieces of config that could be lost at deploy.

## Scorecard

| Area | Status |
|---|---|
| HTTPS, HSTS (preload), security headers | Pass |
| Canonicals (self-referencing, absolute) | Pass on all 19 pages; latent risk (M-1) |
| robots.txt / sitemap.xml / llms.txt / RSS | Pass; sitemap has 19 URLs, all 200 |
| Trailing slash, www, http | Pass, with one 2-hop chain (L-1) |
| 404 handling | Pass (true 404 + noindex) |
| Structured data | Good base; gaps in M-7 |
| Titles / descriptions | All present and unique except one exact duplicate (H-2) |
| H1s | Present on every page, but with broken spacing and weak keywords (H-1, M-3) |
| Mobile performance | Fail: LCP 4.0–5.0 s (H-5) |
| Trust / E-E-A-T | Critical issue (C-1) |
| Measurement | Critical gap (C-2) |

---

## Critical

### C-1. Fabricated testimonials are published on the homepage
- **Issue.** The homepage Testimonials section shows three named, 5-star quotes ("Sarah Mitchell, Product Lead, SaaS Startup", "David Chen", "Rafiul Islam"). The source file says they are not real.
- **Evidence.** `src/lib/testimonials.ts` lines 1–7: "NOTE: these are stand-ins approved for launch and will be replaced with real, named, verifiable client reviews before production." A live check (`curl -s https://arrowbin.com | grep -o "Sarah Mitchell\|David Chen\|Rafiul Islam"`) found all three names in production today. `src/app/page.tsx` renders `<Testimonials />` in the new build too. The JSON-LD Review/AggregateRating is correctly switched off (`src/lib/schema.ts`, the comment in `organizationSchema`).
- **Why it matters.** The US FTC rule on fake reviews and testimonials (16 CFR Part 465, in force since 21 Oct 2024) prohibits testimonials that misrepresent that they come from real customers, with civil penalties per violation (https://www.ftc.gov/legal-library/browse/federal-register-notices/16-cfr-part-465-trade-regulation-rule-use-consumer-reviews-testimonials). Google's quality rater guidelines treat deceptive trust signals as a lowest-quality marker. AI engines that crawl the page may quote these names as real clients. The US is the primary market in the brief.
- **Fix.** Remove the Testimonials section from `src/app/page.tsx` before launch, or replace `testimonials` with real, attributable quotes the clients have approved in writing (name, role, company, ideally with a link to Clutch, Google Business Profile or LinkedIn). Keep Review/AggregateRating schema off until those reviews exist and are also visible on the page.
- **Verify.** `curl -s https://arrowbin.com | grep -c "Sarah Mitchell"` returns 0 after deploy.

### C-2. No Search Console access, and the verification tag depends on an env var
- **Issue.** No first-party search data exists for arrowbin.com (brief: "no first-party search data for arrowbin.com yet"). The live page carries a `google-site-verification` meta (`eWZ41RiznsOVDOsKWeDPuI8YgDxziPp1UrkLv6xSstc`, seen in the live 404 HTML), so someone did verify a property, but nobody on the team has the data. In the new build the tag only renders when `GOOGLE_SITE_VERIFICATION` is set (`src/app/layout.tsx`). It is set in `.env.local`, which does not deploy.
- **Why it matters.** A relaunch is the moment you most need Search Console: to submit the sitemap, watch coverage and 404s, remove the spam URLs (H-3) and confirm Google picks up new titles. If the production host lacks the env var, meta-tag verification silently breaks.
- **Fix.** (1) Verify arrowbin.com as a **Domain property** through a Cloudflare DNS TXT record, which survives any code change. (2) Set `GOOGLE_SITE_VERIFICATION` in the production environment, or hard-code a fallback the same way `gaId` is handled in `layout.tsx`. (3) Submit `https://arrowbin.com/sitemap.xml`. (4) Add Bing Webmaster Tools (import from GSC); Bing feeds ChatGPT search and Copilot.
- **Verify.** GSC shows "Ownership verified" via DNS. The sitemap status reads "Success, 19 discovered". `curl -s https://arrowbin.com | grep google-site-verification` still matches after the new deploy.

---

## High

### H-1. H1 text has no spaces between words in the HTML (service pages and most heroes)
- **Issue.** Kinetic headings split each word or line into separate `<span>`s with no whitespace between them, so the raw text runs together.
- **Evidence (live crawl, H1 text as parsed from HTML):** `CustomSoftwareDevelopment`, `MobileAppDevelopment`, `E-commerceDevelopment`, `SaaS&ProductEngineering`, `AIAutomation`, `Softwaredevelopmentservices`, `We build itlike it'sours.`, `Read beforeyou build.`, `Tell uswhat you'rebuilding.`, `Privacypolicy.` The homepage H1 parses as `Arrowbin, a custom software development company: software that moves.SoftwareThatMoves` (an sr-only sentence followed by the aria-hidden visual letters). Sources: `src/components/services/ServiceHero.tsx` lines 45–56 (`service.heading.split(" ").map(...)` into `inline-block` spans), and `ServicesHero.tsx`, `AboutHero.tsx`, `BlogIndex.tsx`, `ContactHero.tsx`, `WorkHero.tsx`, `LegalPage.tsx` (the same line-array pattern).
- **Why it matters.** The H1 is the strongest on-page relevance signal after the title. Google renders pages and usually recovers block-level line breaks, but the service H1s use `inline-block` word spans, where rendered `innerText` also drops the spaces. AI crawlers (GPTBot, ClaudeBot, PerplexityBot) mostly read raw HTML without rendering, so they see "CustomSoftwareDevelopment", which is not the keyword.
- **Fix.** Emit a real space between the spans, for example `{i > 0 && " "}` before each `<span>` in `ServiceHero.tsx`, and a trailing `{" "}` after each line span in the line-array heroes. Visual layout is unchanged because the spans are block or inline-block. For the homepage, keep the sr-only sentence and give the aria-hidden visual block a leading space, or move the visual letters out of the `<h1>` into a sibling `div`.
- **Verify.** `curl -s https://arrowbin.com/services/custom-software-development | python -c "import sys,re;print(re.sub('<[^>]+>','',re.search(r'<h1.*?</h1>',sys.stdin.read(),re.S).group(0)))"` prints `Custom Software Development` with spaces. Repeat for each template.

### H-2. The homepage and the custom-software service page compete for the same keyword
- **Issue.** Both pages carry the exact title `Custom Software Development Company | Arrowbin` (46 chars), and the homepage H1 also says "custom software development company".
- **Evidence.** Live crawl: the `/` title and the `/services/custom-software-development` title are identical. Code: `src/app/page.tsx` line 18 (`homeTitle`), and `src/lib/services.ts` line 46 (`metaTitle`) plus the `%s | Arrowbin` template.
- **Why it matters.** Duplicate titles split relevance and let Google pick the "wrong" URL (usually the homepage) for the commercial query, leaving the dedicated service page without traffic. The homepage should own the broader head term, "software development company".
- **Fix.** Home: `Software Development Company for Startups & SMBs | Arrowbin`, with the H1 sr-only text "Arrowbin: a software development company building software that moves". Service page: `Custom Software Development Company & Services | Arrowbin`, H1 "Custom software development company". Full set in `on-page-titles-meta.csv`.
- **Verify.** No two URLs share a title (rerun the crawler, or GSC > Pages > HTML improvements via a third-party crawler). After 4–8 weeks, GSC Performance for "custom software development company" shows the service URL as the ranking page.

### H-3. Spam URLs are indexed under the brand
- **Issue.** Brand searches return junk URLs on the domain.
- **Evidence.** The `site:arrowbin.com` results (2026-09-29) include `https://www.arrowbin.com/products5070048.html`, titled "Arrowbin", and `https://arrowbin.com/?channel=5f1f69&from=news.php%3Fid%3D1639428-2276&name=LARRY+HALL+US+Orig+LP+STAND+RECORDS...ロカビリー...`. That pattern matches the "Japanese keyword hack" and spam-link injections that often follow a compromised WordPress install; Wayback shows `www.arrowbin.com` ran WordPress in 2023–2025. Today the `.html` URL returns 404, and the `?channel=` URL returns 200 with `canonical: https://arrowbin.com`.
- **Why it matters.** It pollutes the brand SERP and signals low site quality. If GSC has a Security Issues or Manual Action flag, it can suppress the whole domain.
- **Fix.** (1) Once C-2 is done, check GSC > Security & Manual Actions. (2) Return **410** for `/products*.html` and remove it with GSC > Removals. (3) Add a Cloudflare rule that 301s any homepage request carrying the `channel`/`from`/`name` spam parameters to the clean `https://arrowbin.com/`. (4) Check whether the old WordPress host still serves anything under another hostname.
- **Verify.** `site:arrowbin.com` shows only real pages within 4–8 weeks, and GSC shows no security issues.

### H-4. Legacy URLs from the 2023 WordPress site and the 2024 marketplace 404 with no redirects
- **Issue.** The domain previously hosted a WordPress site (2023–2025) and a digital-products marketplace (Oct 2024). Those URLs now return 404. `next.config.ts` has no `redirects()`.
- **Evidence.** Wayback CDX lists `/contact-us`, `/help`, `/refund`, `/feed`, `/authors`, `/authors/arrowbin-llc`, `/products/ultimate-seo-optimizer`, `/products/advanced-notification-bar-plugin`, `/products/custom-countdown-timer-plugin`, `/products/apexx-esports-gaming-wordpress-theme`, `/products/tags/blog`, `/explore`, `/popular-products`, `/become-seller`, `/profile`, `www.arrowbin.com/sitemaps.xml` and others. `curl` returns 404 for every one of them today.
- **Why it matters.** Any backlinks or bookmarks to those URLs lose their equity, and Google keeps recrawling dead URLs.
- **Fix.** Implement `redirect-map.csv`: 301 the pages that have an equivalent (`/contact-us` to `/contact`, `/refund` to `/terms`, `/feed` to `/blog/rss.xml`, `/authors*` to `/about`, and so on) and return 410 for marketplace pages with no equivalent. In Next.js 16, add `async redirects()` to `next.config.ts` with `permanent: true`, or use Cloudflare Bulk Redirects. For 410s, use a Cloudflare rule or middleware (`proxy.ts` in Next 16; read `node_modules/next/dist/docs/` first). Check backlinks (Ahrefs/Moz free tools or GSC Links) before choosing 410 over a 301 to `/services`.
- **Verify.** `while read u; do curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" "$u"; done` over the `old_url` column returns 301/308 to the listed target, or 410.

### H-5. Mobile LCP fails on every template tested (4.0–5.0 s)
- **Evidence.** Lighthouse mobile (see `pagespeed-live.md`): homepage LCP 4.5 s and 4.0 s (performance 55 and 76), TBT 880 ms and 320 ms. `/services/custom-software-development` LCP 5.0 s. Blog post LCP 4.3 s. CLS is 0 everywhere. TTFB is 130 ms. The LCP element is hero body text, and two CSS files block render (estimated 600 ms). Unused JS is 98–163 KiB, and main-thread work is 6.4–7.2 s.
- **Why it matters.** Core Web Vitals are a ranking tie-breaker, and INP and LCP drive bounce on mobile, where the text-heavy LCP should be easy to fix. No field (CrUX) data is available to confirm what real users see.
- **Fix.** (1) Load `SmoothScroll` and `Cursor` (mounted globally in `layout.tsx`) after idle and not on touch devices (`matchMedia('(pointer:fine)')`). The repo already has `useIdleEffect.ts`. (2) Make Geist the only preloaded face, and consider `display: "optional"` or a `size-adjust`ed fallback so the font swap does not re-stamp LCP. (3) Split page-specific CSS where possible. Next 16 `experimental.inlineCss` was removed on purpose (see `next.config.ts` comment), so trim the global CSS instead. (4) Find the forced-reflow source that Lighthouse flags on every run.
- **Verify.** Lighthouse mobile median of 3 runs: LCP ≤ 2.5 s and TBT ≤ 200 ms. After launch, check GSC > Core Web Vitals.

---

## Medium

### M-1. The root layout sets `canonical: "/"`, which every page without its own `alternates` inherits
- **Evidence.** In `src/app/layout.tsx`, `alternates: { ...pageAlternates("/") }`. The live 404 page outputs `<link rel="canonical" href="https://arrowbin.com">` together with `noindex` (crawl of `/nonexistent-xyz`, `/portfolio`, `/team`, `/careers`). The homepage itself sets no `alternates` and relies on this.
- **Why it matters.** Any future page that forgets `pageAlternates()` will quietly canonicalise to the homepage and drop out of the index.
- **Fix.** Remove `canonical` from the root layout (keep the RSS `types`). Add `alternates: pageAlternates("/")` to `src/app/page.tsx`.
- **Verify.** The 404 page has no canonical, the homepage canonical is `https://arrowbin.com`, and every other page still self-canonicalises.

### M-2. Non-home H1s carry slogans, not keywords
- **Evidence.** `/work` "Built. Shipped. Live.", `/about` "We build it like it's ours.", `/blog` "Read before you build.", `/contact` "Tell us what you're building." Service H1s omit the modifiers people search with ("company", "services").
- **Fix.** Keep the visual slogan, but put a keyword phrase inside the H1, as the homepage already does. For example, render the eyebrow as part of the `<h1>` ("Software development portfolio:" plus the slogan), or add an sr-only prefix. Recommended H1s per URL are in the CSV.
- **Verify.** Rerun the crawler; each H1 contains its page's primary keyword.

### M-3. Title and description lengths
- **Evidence (live).** Descriptions over 160 chars, which will truncate: home 162, e-commerce 169, SaaS 170, privacy 161. Most titles are short (25–50 chars) and waste SERP space: `/blog` 26, `/work` 31, `/services/ui-ux-design` 32.
- **Fix.** Use the CSV recommendations. Every recommended title is ≤ 60 chars and every description 144–158 chars, each with the primary keyword near the start.
- **Verify.** Character counts in the CSV, plus a SERP preview tool.

### M-4. Internal linking: the blog barely links to the money pages
- **Evidence.** In-body links in `src/lib/blog.ts` go to `/services/custom-software-development` twice and `/services/saas-product-engineering` once. Six of the eight service pages get no contextual link from any article. In the other direction, service pages do link to related posts and work (`relatedPosts` and `relatedWork` in `src/lib/services.ts`), and the footer links all 8 services (`Footer.tsx`).
- **Fix.** Link from each post to the 2–3 most relevant service pages with descriptive anchors. For example, the MVP post links to `/services/saas-product-engineering` ("MVP development") and `/services/mobile-app-development`, and the cost post links to the e-commerce and mobile service pages. Link `/work` project cards to the matching service page.
- **Verify.** Every service URL has at least 3 contextual inbound internal links (count with the crawler or Screaming Frog).

### M-5. Thin content and proof, relative to the target market
- **Evidence.** 3 blog posts. No case-study pages (`/work/<slug>` is parked). All 8 portfolio projects are Bangladesh or India e-commerce and brand sites, while the brief's primary market is the USA and the priority services are custom software, SaaS and mobile.
- **Why it matters.** Service pages targeting "SaaS development company" or "mobile app development company" have no matching proof page to rank or cite. Competitors rank with case studies.
- **Fix.** Ship `/work/<slug>` case studies (problem, stack, timeline, result, client quote only if real) and link them from the relevant service pages. Grow the blog around cost and timeline intent per service (see `04-keywords`, `06-content-plan`).
- **Verify.** Each service page links to at least one case study hosted on arrowbin.com.

### M-6. Organization entity signals (`sameAs`) are weak or unverified
- **Evidence.** In `src/lib/site.ts`, the LinkedIn URL is `https://www.linkedin.com/in/arrowbinllc` with the comment "TODO: replace with the real Arrowbin company page". `/in/` is a personal-profile path, and LinkedIn returned 999 (bot block), so it could not be verified. `linkedin.com/company/arrowbin` and `/company/arrowbinllc` both returned 404. Brand search surfaces `https://github.com/Arrowbin-LLC` (200) and a YouTube channel `UCWk7fxXHRkb1iFJCqlxrAAA`, and neither is in `sameAs`. Florida Sunbiz has an entity record for "Arrowbin LLC", which is a strong identity anchor.
- **Why it matters.** `sameAs` is how Google's Knowledge Graph and LLMs reconcile "Arrowbin" with the right company, and the name collides with unrelated "Arrow*" brands in results.
- **Fix.** Create a LinkedIn company page and use its `/company/` URL. Add GitHub and YouTube (if owned). Add a Clutch or GoodFirms profile once one exists. Consider adding the Sunbiz record URL as `sameAs` or `identifier`.
- **Verify.** Every `sameAs` URL returns 200 and links back to arrowbin.com.

### M-7. Schema gaps and duplication
Current graph (live crawl): every page has Organization, WebSite and 2x ProfessionalService from the layout, plus page-specific BreadcrumbList, FAQPage, Service, ItemList, BlogPosting, AboutPage, Person and CollectionPage.

| Gap | Evidence | Fix |
|---|---|---|
| Organization has no `founder` | `organizationSchema()` in `src/lib/schema.ts` | Add `founder: { "@id": FOUNDER_ID }` and `numberOfEmployees` if known |
| Person (founder) is only on /about | `founderSchema()` is only used in the about page | Emit the Person node site-wide in the layout, or at least on blog posts, so `author.@id` resolves on the same page |
| Duplicate ProfessionalService nodes on /contact | Crawl shows 4 ProfessionalService nodes (the layout emits 2, and `src/app/contact/page.tsx` emits `...localBusinessSchema()` again with the same `@id`s) | Remove `localBusinessSchema()` from the contact page |
| Separate `<script>` blocks, no `@graph` | 5–8 blocks per page | Optional: merge into a single `@graph` for cleaner entity linking |
| Service has no offer or price signal | `serviceSchema()` | If Arrowbin publishes real starting prices, add `offers: { "@type": "Offer", priceSpecification: { minPrice, priceCurrency: "USD" } }`. Only with genuine prices |
| Dhaka ProfessionalService lacks a street address | `streetAddress: "Mohammadpur"` | Use the full street address if one exists; otherwise keep as is |
| WebSite has no `inLanguage` | `websiteSchema()` | Add `inLanguage: "en"` |
| Review / AggregateRating | Correctly omitted (C-1) | Add only with real, on-page reviews |
| FAQPage | Present on home, services, contact and posts | Keep for AI answers, but note Google has limited FAQ rich results to authoritative government and health sites since Aug 2023 (https://developers.google.com/search/blog/2023/08/howto-faq-changes), so do not expect SERP stars from it |

Verify with the Rich Results Test and validator.schema.org on `/`, one service, one post, `/about` and `/contact`.

### M-8. NAP inconsistency across the web
- **Evidence.** Search results for "arrowbin software development company" surface "7901 4th St N STE 300", "(813) 421-5874" and "info@arrowbin.com". The site uses "7901 4th St N" with no suite and `hello@arrowbin.com` (`src/lib/site.ts`).
- **Fix.** Choose one canonical NAP (including or excluding "STE 300") and use it identically on the site, in schema, Google Business Profile, Sunbiz and all citations. Detail in `08-local`.
- **Verify.** A citation audit shows 100% NAP match.

### M-9. Sitemap `lastmod` is not updated for the relaunch
- **Evidence.** `STATIC_BASELINE = "2026-06-24"` in `src/app/sitemap.ts`, yet `/privacy` and `/terms` say "Updated 29 September 2026" (`UPDATED_ISO`), and the redesign will change every page.
- **Fix.** Set `STATIC_BASELINE` to the launch date on deploy, and derive legal-page dates from their `UPDATED_ISO` constants.
- **Verify.** The `lastmod` values in `/sitemap.xml` match launch or content dates.

### M-10. Image SEO
- **Evidence (live crawl).** `/work` has 5 portfolio images with `alt=""` (`WorkDeck.tsx` line 68 and `WorkExplorer.tsx` lines 318 and 367; one copy elsewhere has proper alt text at line 235). The `/about` founder photo has `alt=""` in `AboutFounder.tsx` line 42 (the AboutHero copy has a good alt). Blog related-post cards also use `alt=""` next to their titles, which is acceptable. The service OG image alt is the generic "Arrowbin service" (`src/app/services/[slug]/opengraph-image.tsx` line 4). No image sitemap exists.
- **Fix.** Give each unique content image a descriptive alt (for example "Silent Lifestyle BD e-commerce store homepage, built by Arrowbin"). Keep `alt=""` only on true duplicates or decorative copies. Make the service OG alt dynamic (`${service.name} services by Arrowbin`, via `generateImageMetadata` or `alt` per slug). Optionally add `images` entries to the sitemap for portfolio and blog images.
- **Verify.** Crawler: 0 non-decorative images with empty alt text.

### M-11. HTML payload weight
- **Evidence.** Uncompressed HTML: home 308 KB, service pages 220–284 KB, posts 250–280 KB, most of it inline RSC payload (`self.__next_f.push`).
- **Why it matters.** It slows HTML parsing on mobile (H-5), and some AI crawlers truncate large documents.
- **Fix.** Keep large static content in Server Components and avoid passing big props (full post bodies, service data) into Client Components, which then get serialised twice.
- **Verify.** Home HTML under about 150 KB uncompressed.

---

## Low

| ID | Issue | Evidence | Fix | Verify |
|---|---|---|---|---|
| L-1 | Redirect chain for http://www | `http://www.arrowbin.com` 301 to `https://www.arrowbin.com/` 301 to `https://arrowbin.com/` (2 hops) | Cloudflare redirect rule: `http(s)://www.arrowbin.com/*` to `https://arrowbin.com/${1}`, 301, one hop | `curl -sIL http://www.arrowbin.com` shows one 301 |
| L-2 | privacy/terms og:url points at the homepage | Live: `og:url = https://arrowbin.com` and og:title "Arrowbin \| Software Development Company" on /privacy and /terms (they inherit the layout `openGraph`) | Add `openGraph: { url: "/privacy", title, images: [defaultOgImage] }` (and the same for /terms) | og:url matches the page |
| L-3 | `X-Powered-By: Next.js` header | Live headers | `poweredByHeader: false` in `next.config.ts` | Header absent |
| L-4 | robots.txt AI agent list is partly outdated | `Claude-Web` is retired; `Claude-SearchBot` and `Claude-User` (Anthropic's current agents) and `Bingbot` (feeds Copilot and ChatGPT search) are missing. All are already allowed by the `*` rule, so this is cosmetic | Update the `aiBots` array in `src/app/robots.ts` | robots.txt lists current agents |
| L-5 | Cloudflare does not cache HTML | `cf-cache-status: DYNAMIC` despite `s-maxage=31536000` | Optional Cache Rule for HTML with purge-on-deploy. TTFB is already 130 ms, so the gain is small | `cf-cache-status: HIT` |
| L-6 | Preview deployments are indexable | `robots.ts` always allows `/`, whatever the environment | On non-production hosts return `disallow: "/"` (check `VERCEL_ENV` or a similar variable). Absolute canonicals already limit the damage | Preview host robots.txt disallows |
| L-7 | Dead component carries a second H1 | `src/components/sections/Hero.tsx` has `<h1>We build software that grows your business</h1>` and nothing imports it (grep) | Delete it, so it cannot be reused and create two H1s | grep shows no file |
| L-8 | `keywords` meta | Set in the layout, services and posts; Google ignores it | Harmless; optional removal | n/a |
| L-9 | llms.txt stresses the offices | Line: "with offices in Dhaka, Bangladesh and St. Petersburg, Florida" (`src/app/llms.txt/route.ts`), against the founder's "clients worldwide" preference | Reword to lead with "clients worldwide". Add key facts AI answers need: founding year, founder, engagement models, typical timelines and (if real) starting prices | Read /llms.txt |
| L-10 | hreflang | None on any page | Correct for a single-language site (see `pageAlternates` comment). No action | n/a |

---

## Crawl budget and duplicate-content risk

- **Crawl budget: not a concern.** 19 indexable URLs, no faceted navigation, no parameter-driven pages. The only parameter URLs Google knows are spam (H-3). They canonicalise to home today; a 301 is cleaner.
- **Duplicate risk.** (1) The exact duplicate title (H-2). (2) Near-duplicate boilerplate: 8 service pages share one template (benefits, deliverables, tech, process, FAQs), but each has about 525–595 unique words (including code identifiers) in its `src/lib/services.ts` entry, plus per-service extras (stats, ideal-for, related work and posts), so the risk is low to moderate. Deepen the thinnest pages as the keyword map dictates. (3) Preview deployments (L-6). (4) `www` and `http` variants are already consolidated by 301s.
- **Thin pages.** `/privacy` and `/terms` are thin by nature and fine to index. `/blog` lists only 3 posts (M-5).

## Indexation snapshot (indicative, search API, 2026-09-29)

- `site:arrowbin.com` returned the homepage (with the old title "Software Development Company | Arrowbin", so Google has not yet picked up the current "Custom Software Development Company | Arrowbin") plus 2 spam URLs (H-3). No service or blog URLs appeared.
- A search for `arrowbin` returns Instagram, GitHub (Arrowbin-LLC), Facebook, YouTube, the homepage and Sunbiz. The brand ranks for itself.
- A search for `arrowbin software development company` returns the homepage and Facebook alongside unrelated "Arrow Software" companies, so entity disambiguation is weak (M-6).
- Confirm real coverage in GSC once C-2 is done. I could not verify how many of the 19 URLs are indexed.

## Migration plan (old live to new build)

1. **URL parity: confirmed.** All 19 live sitemap URLs exist in the new build (static routes in `src/app`, 8 slugs in `src/lib/services.ts`, 3 in `src/lib/blog.ts`), plus `/llms.txt` and `/blog/rss.xml`. The redesign itself needs no 301s. Parked `/work/<slug>` routes are not live and not in the sitemap.
2. **Legacy redirects.** Implement `redirect-map.csv` (H-4, H-3, L-1) in the same release.
3. **Carry-over config.** Set `GOOGLE_SITE_VERIFICATION` (C-2) and `NEXT_PUBLIC_GA_ID` in production (GA falls back to `G-ZZ3NJCZVMZ`), and keep the Cloudflare http/www rules.
4. **Metadata changes.** Apply the CSV titles and descriptions at launch, not in a later release, so Google re-evaluates once.
5. **Pre-launch crawl.** Run the crawler (or Screaming Frog) against the staging URL. Expected results: every page 200, self-canonical, one H1 with spaces, no duplicate titles, no `noindex` leaking from staging config.
6. **Launch day.** Bump the sitemap `lastmod` (M-9), resubmit the sitemap in GSC, and use URL Inspection "Request indexing" for `/`, `/services` and the 8 service URLs.
7. **Post-launch, weeks 1 to 4.** Watch GSC Pages (404 and "Crawled, not indexed"), Core Web Vitals, and the queries for the 8 service keywords. Re-run Lighthouse on the new build against the `pagespeed-live.md` baseline.

## What already works (keep it)

HTTPS with HSTS preload and a strict CSP. One canonical host. Self-referencing absolute canonicals. Clean slugs with no trailing slash (308). A true 404 with noindex. A lean, valid XML sitemap with honest `lastmod`. robots.txt that welcomes AI crawlers. A generated llms.txt and RSS feed. Per-page OG images (services and posts) at 1200x630. BreadcrumbList everywhere. Service schema with `provider` `@id`. BlogPosting with a Person author, `dateModified` and `speakable`. A deliberate absence of fake Review schema. Lighthouse SEO, Accessibility and Best Practices at 100. CLS at 0.
