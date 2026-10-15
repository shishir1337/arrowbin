# Service page: WordPress to Next.js migration services

**Status:** draft copy, ready for founder review. Documents only; nothing is built.
**Item:** #4 in `docs/seo/14-audit-2026-10-15/findings/clusters.md` section 4, and SXO finding N4 (`findings/sxo.md`).
**Template:** A (service page) from `docs/seo/06-content-plan/content-plan.md`, mapped onto the fields in `src/lib/services.ts` (`Service` plus `ServiceExtras`).
**Founder inputs needed:** F4 (free call or paid discovery), F8 (does "send us a URL, get an estimate" exist as an offer), a typical timeline range, and optionally a starting price (D4). Every gap is marked `[FOUNDER: ...]`. The page can ship without a price, as the WordPress post already does, but not with the placeholders left in.

---

## 1. Why a service page, and why this URL

- **The query wants a seller.** "wordpress to next.js migration services" (WebSearch, 15 Oct 2026, US) returned 4 agency or freelancer service pages and 4 Fiverr or Upwork gig listings out of 9 results. No guide ranks. The informational post at `/blog/wordpress-to-nextjs-migration` cannot win that click on its own (SXO N4).
- **It is Arrowbin's best-proven offer.** Every live site in the portfolio (8 of 8 in `src/lib/portfolio.ts`) is a WordPress to Next.js rebuild, per the founder, and arrowbin.com itself sends old WordPress URLs to their new pages or returns 410 Gone (`next.config.ts`, `src/proxy.ts`).
- **Recommended URL: `/services/wordpress-to-nextjs-migration`.** The keyword map (`05-keyword-map/keyword-map.md`) planned a broader `/services/nextjs-development` for P2. I recommend the narrower URL first because it matches the query word for word and the proof is about migrations, not greenfield Next.js builds. A later `/services/nextjs-development` page can link down to it. If the lead prefers the broad page, keep this copy as its main section and move the "next.js development agency" terms to the head.

### Pairwise check against the blog post (run 15 Oct 2026)

| Query | Results seen |
|---|---|
| wordpress to next.js migration services (this page) | johnkavanagh.co.uk service page, perfectiongeeks.com, eseospace.com `/migration/` page, fiverr.com gig, 3 upwork.com gigs, webkul.com, pandacodegen.com |
| wordpress to next.js migration (the post, from `sxo.md` and the post's brief) | browsercat.com, johnkavanagh.co.uk service page, johnkavanagh.co.uk checklist, eseospace.com blog, index.dev, kolonell.com, contra.com gig, fiverr.com gig |

Shared exact URLs: **2** (the Kavanagh service page and the same Fiverr gig). By the cluster method's thresholds (2 to 3 = interlink), these are **two pages that must link to each other**, not one page. The post keeps "steps, SEO, redirects, cost drivers, Next.js vs WordPress"; the service page takes "services, agency, company, hire".

## 2. Keyword set

| Keyword | Owner | Note |
|---|---|---|
| **wordpress to next.js migration services** | this page (primary) | Service and gig SERP |
| wordpress to next.js migration service / agency | this page | Same intent |
| woocommerce to next.js migration | this page | The post keeps "woocommerce to next.js" (how-to); this page takes the "migration" service phrasing |
| headless wordpress development | this page | Covers clients who keep the WordPress admin |
| next.js development agency / next.js development company / nextjs development services | this page (secondary) until a broad Next.js page exists | `03-serp` section 26: Medium difficulty, small boutiques and listicles |
| shopify to next.js migration | not this page | In `keyword-universe.csv`, but there is no Shopify migration in the portfolio. Do not target it |
| wordpress to next.js migration, migrate wordpress to next.js, wordpress to next.js seo, wordpress to next.js redirects, next.js vs wordpress | the post | Keep off this page's title, H1 and meta |
| wordpress to next.js migration cost | the post for now | The cost SERP is Kolonell's city pages and a dev.to post. Revisit once D4 gives a real band |

## 3. SERP snapshot (WebSearch, 15 Oct 2026, unranked)

| Result | URL | Type | What it does / gap |
|---|---|---|---|
| WordPress to Next.js Migration (John Kavanagh) | https://johnkavanagh.co.uk/services/wordpress-to-nextjs-migration/ | Freelancer service page (opened) | Sections: Short Answer, Typical Symptoms, Likely Causes, What I Look at First, How I Help, Common Questions (3), case studies (Polestar, Lotus, no metrics), testimonials. No prices or timelines. Strong on scoping, silent on e-commerce |
| Next.js Migration Services (Webkul) | https://webkul.com/nextjs-migration-services/ | Large agency page (opened) | Partner badges, client logos, 3 case studies, 6-phase process, 4 FAQs ("zero downtime", "SEO impact", platforms, headless). Claims "35%+ uplift" with no source. No prices or durations |
| Seamless Next.js Migration Services (PerfectionGeeks) | https://www.perfectiongeeks.com/technologies/next-js/migration-services | Agency page (not opened) | Search summary only: planning, data mapping, 301 redirects |
| Migrating From WordPress to Next.js (eSEOspace) | https://eseospace.com/migration/wordpress-to-nextjs/ | Agency page (not opened) | Search summary only: crawl of URLs, templates and plugins |
| PandaCodeGen migration services | https://www.pandacodegen.com/ai-info/migration-services | Productised service (not opened) | The search tool's summary says it lists fixed packages and a PageSpeed refund guarantee. Not verified, do not cite |
| Fiverr and 3 Upwork gigs | e.g. https://fiverr.com/azaz_khan_dev/convert-wordpress-to-code | Gig listings | One Upwork gig promises "10x speed". Gigs on page one mean the SERP is soft |

**What wins:** a page that names the job in the H1, shows migrated sites, explains how SEO is protected, and lists a process. Agency pages hide prices; gigs show them.

**Gaps we can fill:**
- No service page shows the actual redirect approach (308 for moved pages, 410 for retired ones, redirects kept a year). We run it on our own site.
- No service page says when you should *not* migrate. The post does; the service page should keep one honest FAQ about it.
- Few cover WooCommerce: order history, customer accounts, gateway callbacks. Six of our eight portfolio sites are tagged as online stores in `portfolio.ts`.
- None shows a live portfolio where every site is a WordPress rebuild.

## 4. Page outline, mapped to the existing service-page sections

The new slug would fall through to the **default branch** of `src/app/services/[slug]/page.tsx`. Section order there:

| # | Component | Field(s) it reads | What goes in it |
|---|---|---|---|
| 01 | `ServiceHero` | `heading`, `intro`, `copy.form` | H1 with the head term, intro, quote form |
| 01b | `ServiceValue` | `answer`, `outcomes`, `idealFor`, `copy.fit`, `benefits` | 50-word answer, 3 stat chips, who it's for, 4 benefits |
| 02 | `ServiceSignature` | `slug` | Default fallback for now. A bespoke "redirect map" widget is a later idea (needs dev and visual sign-off) |
| 03 | `ServiceDeliver` | `deliverables`, `tech` | What you get, stack |
| 04 | `ServiceProcess` | `process`, `copy.process` | 4 steps |
| 05 | `ServiceWork` | `relatedWork` | 3 portfolio cards. Pass `title="Sites we moved from WordPress to Next.js"` (the prop exists) |
| 06 | `Engagement` | `copy.engagement` | Three cards: Project, Product team, Care plan |
| 07 | `ServiceGuides` | `relatedPosts` | 3 guide cards |
| 08 | `Faq` | `faqs` | 8 FAQs (FAQPage JSON-LD is automatic) |
| 09 | `ServiceRelated` | `slug` | Other services |
| 10 | `Cta` | `copy.cta` | Closing line |

**Build note for the lead (not copy):** adding an entry to the `services` array changes the homepage services list ("/08" becomes "/09"), the About disciplines grid, the Contact brief chips, the navbar, the footer and the `llms.txt` count. That is a visual change across the site. A cleaner option is a second array (for example `specialistServices`) rendered by the same `[slug]` route and added to the sitemap, linked from the parent service pages and the posts, but not from the nav. Either way it needs visual sign-off (standing rule 2). The hero's "Service 09 / 09" counter also needs a decision.

## 5. Draft copy, field by field

Voice: the founder, plain and specific. No em dashes. Placeholders are `[FOUNDER: ...]`.

### Core fields (`Service`)

- **slug:** `wordpress-to-nextjs-migration`
- **name:** WordPress to Next.js Migration
- **heading (H1):** WordPress to Next.js Migration
- **icon:** `code` (or whichever existing `IconName` the lead prefers; no new icon needed)
- **summary (cards):** Move your WordPress site or WooCommerce store to Next.js without losing the pages Google already ranks.
- **metaTitle (39 characters, plus " | Arrowbin"):** WordPress to Next.js Migration Services
- **metaDescription (145 characters):** WordPress to Next.js migration services for business sites and WooCommerce stores. Every old URL is mapped and redirected, so your rankings hold.
- **keywords:** `["wordpress to next.js migration services", "wordpress to next.js migration agency", "woocommerce to next.js migration", "headless wordpress development", "next.js development agency", "next.js development company"]`

- **intro (head term in sentence one):**
  > Our WordPress to Next.js migration services move your site or WooCommerce store onto Next.js and keep the pages Google already ranks. Every live site in our portfolio started on WordPress and now runs on Next.js, and so does arrowbin.com. We start with your list of URLs, not a design mockup, because the redirect map is where most migrations go wrong.

- **benefits (4):**
  1. **Rankings protected.** Every old URL gets a permanent redirect to its closest new page, or a 410 if you retired it on purpose. We test the full list on staging before DNS moves.
  2. **No plugin layer to patch.** Each plugin's job is rebuilt as code or handed to a service, so updates stop breaking the site.
  3. **Your editors choose.** Keep the WordPress admin as a headless CMS, or move the content out to Markdown or a hosted CMS.
  4. **Stores included.** Products, customer accounts, order history and payment callbacks are planned before we build the storefront.

- **deliverables (6):**
  - URL inventory and redirect map
  - Next.js templates and components
  - Content and media migration
  - Replacements for forms, search and SEO plugins
  - WooCommerce storefront or store move
  - Staging site and launch checklist

- **tech:** `["Next.js", "React", "TypeScript", "WordPress (headless)", "WooCommerce", "Node.js", "Cloudflare"]` `[FOUNDER: confirm this is the stack you use; drop anything you don't]`

- **process (4 steps, same shape as the other pages):**
  1. **Inventory.** We export every URL, plugin and form, and mark the pages that bring in leads or sales.
  2. **Redirect map.** Every old URL gets a destination or a 410, and we decide where your content will live.
  3. **Rebuild on staging.** Templates become components, content moves across, and you review the whole site before launch.
  4. **Launch and watch.** We switch DNS, re-crawl the old URL list and check Search Console daily for the first two weeks.

  `durations` prop (optional, as the maintenance page uses): `[FOUNDER: typical weeks per step, e.g. "1 week", "1 week", "...", "30 days"]`. Leave the prop out if you would rather not publish durations.

### Extras (`ServiceExtras`)

- **answer (about 50 words, AEO block):**
  > A WordPress to Next.js migration rebuilds your site's templates in Next.js, moves the content across, and gives every old URL a permanent redirect or a deliberate 410. Arrowbin does this for business sites and WooCommerce stores; every live site in our portfolio is one. A typical migration takes [FOUNDER: range in weeks].

  If the founder won't publish a range, end instead with: "How long it takes depends on your templates, plugins and store data, so we quote after the URL inventory." (Word count stays near 50.)

- **outcomes (3 stat chips, all checkable facts):**
  - `{ value: "308", label: "Permanent redirect for moved pages" }`
  - `{ value: "410", label: "For pages you retire on purpose" }`
  - `{ value: "8 of 8", label: "Portfolio sites moved off WordPress" }`

  Check "8 of 8" against `portfolio.ts` at build time; if a non-WordPress project is added, change it.

- **idealFor (4):**
  - WordPress sites that slow down or break after plugin updates
  - WooCommerce stores that have outgrown their plugin stack
  - Businesses whose pages bring in leads they can't afford to lose
  - Teams that want to keep editing in WordPress behind a faster site

- **relatedWork (3):** `["FlexOver BD", "Brandingly", "North Bengal Agro Farms"]` (one multi-category store, one agency site, one corporate site with a store, so the cards show range). FlexOver's portfolio line already reads "Rebuilt from WordPress as a multi-category Next.js store".
- **relatedPosts (3):** `["wordpress-to-nextjs-migration", "shopify-vs-custom-ecommerce", "software-maintenance-cost"]`

- **copy.form:**
  - intro: Send us your site's URL. No obligation. `[FOUNDER: F8, confirm the "estimate from a URL" offer]`
  - placeholder: What's the URL, and is there a WooCommerce store?
- **copy.fit:** If plugin updates make you nervous, let's look at your site.
- **copy.process:** The redirect map is signed off before we build a single template.

- **copy.engagement:**
  - **intro:** Most migrations run as one fixed project. After launch, a care plan keeps the new site patched, or a team keeps building on it.
  - **project** (card "Project")
    - lead: A migration with a fixed estimate, redirect map first.
    - fit: Best for business sites and WooCommerce stores.
    - points:
      1. Every old URL mapped before launch
      2. Staging review before DNS moves
      3. `[FOUNDER: F4]` either "Fixed estimate after a free call" or "Fixed price after a short paid discovery"
  - **team** (card "Product team")
    - lead: A team that keeps building on the new site, month to month.
    - fit: Best when the site is also your sales channel.
    - points:
      1. New templates and landing pages
      2. Store features and integrations
      3. Speed checks after each release
  - **care** (card "Care plan")
    - lead: Patching and monitoring for your new Next.js site.
    - fit: Best for sites with no developer in-house.
    - points:
      1. Dependency and security updates
      2. Redirect and 404 checks
      3. Uptime alerts that reach an engineer

- **copy.cta (closing line):**
  > Send us your URL and tell us which pages bring in business. We'll come back with what the move involves and what it costs, usually within a day.

  "usually within a day" is the wording every live service page already uses; keep it only if it is still true.

### FAQs (8; plain text, no links, none copied from the post's FAQ)

1. **How much do WordPress to Next.js migration services cost?**
   `[FOUNDER: D4, a starting price or a band, or keep the next two sentences only]`. The price follows the number of page templates, the plugins we replace, whether there's a store, and how many old URLs need a new home. We quote a fixed price once the URL inventory is done. `[FOUNDER: F4, say whether that inventory is part of a free call or a paid discovery]`

2. **How long does a migration take?**
   `[FOUNDER: typical range]`. A brochure site with a few templates is a small job, and a WooCommerce store with payment gateways and years of orders is a big one. After launch, Google's site-move guide says most pages on a small to medium site move over within a few weeks, so we don't launch the week before your biggest sale.

3. **Will we lose our Google rankings?**
   Some movement is normal, and Google's own guide says to expect it during any site move. What we control is the redirect map: each old URL gets a permanent redirect to its closest new page, or a 410 if it's gone on purpose, and the redirects stay live for at least a year. Be wary of anyone who promises zero movement.

4. **Can our team keep editing in WordPress?**
   Yes. In a headless setup your editors keep the WordPress admin and its revision history, and Next.js renders the public site. If the plugins were the problem and you publish rarely, moving the content out of WordPress altogether is usually simpler to run.

5. **What happens to our WooCommerce orders and customer accounts?**
   We decide that before choosing a storefront. You can keep WooCommerce as the back end behind a Next.js storefront, or move products, customers and orders to another system. Payment gateway callbacks move with the checkout, and that's the part we test hardest.

6. **Which sites have you moved from WordPress?**
   All of the live sites on our work page: Silent Lifestyle BD, FlexOver BD, North Bengal Agro Farms, Maneel Club, Brandingly, গ তে গয়না, YT Shop India and OutNet started on WordPress and now run on Next.js. So does arrowbin.com, which returns 410 Gone for old WordPress URLs that have no equivalent.

7. **Where will the new site be hosted?**
   Anywhere that runs Node.js, including a VPS you already pay for. You don't need Vercel. We can set up hosting and deploys for you, and we're a Hostinger partner if you need a VPS. You keep every account in your own name. `[FOUNDER: confirm "every account in your own name" is how you work]`

8. **Is moving off WordPress always worth it?**
   No. If your editors publish every day and the site works, WordPress may be the right tool, and we'll say so. A move pays off when slow pages, plugin upkeep or features you can't build are costing you leads or sales.

## 6. Links

**Out (on the page, via existing components):** guide cards to the post, Shopify vs custom, maintenance cost; ServiceRelated to the other services.

**In, when it ships (3+ body links, content plan rule):**

| From | Passage | Anchor | Note |
|---|---|---|---|
| `/blog/wordpress-to-nextjs-migration` | Closing paragraph, which today links "rebuild WordPress sites on Next.js" to `/services/custom-software-development` | rebuild WordPress sites on Next.js | Re-point to the new page. Also consider pointing the in-body CTA card (`href: "/contact"`) here |
| `/blog/software-maintenance-cost` | Any passage on aging WordPress or plugin upkeep | moving an aging WordPress site to Next.js | New anchor |
| `/blog/shopify-vs-custom-ecommerce` | The WooCommerce section | WooCommerce to Next.js migration | New anchor |
| `/blog/courier-api-integration-bangladesh` | WooCommerce courier plugins passage (clusters L-14 suggests linking WP there) | when a WooCommerce plugin stack is worth replacing | Point at the post as L-14 says, or here if the founder prefers the commercial page |
| `/services/cloud-devops-hosting` and `/services/maintenance-support` | `relatedPosts` cards already show the WP post | n/a | Optionally add a one-line link from their FAQs once FAQ answers can render links (clusters H-4) |

## 7. Schema

The route already emits `Service`, the process as an `ItemList`, `FAQPage` and `BreadcrumbList` for any slug (Home > Services > WordPress to Next.js Migration). No new schema code is needed. Do not add an `OfferCatalog` or `priceRange` unless D4 supplies a real price.

## 8. Do not claim

- Speed, ranking, traffic or conversion results for any portfolio site. Name them only as WordPress to Next.js rebuilds.
- "Zero downtime", "zero ranking loss", "no SEO drop" or any guarantee about rankings.
- That the stores were WooCommerce. `portfolio.ts` tags six of the eight as e-commerce, not which platform they left. `[FOUNDER: if they were WooCommerce, say so and the FAQ 6 answer can name it]`
- Prices or timelines from Kolonell, the dev.to techpotions post, PandaCodeGen or gig listings.
- "Vercel partner" or any badge Arrowbin does not hold.
- Shopify migrations (none in the portfolio).
