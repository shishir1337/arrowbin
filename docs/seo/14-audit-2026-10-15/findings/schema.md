# Schema / Structured Data Re-audit: arrowbin.com (15 Oct 2026)

**Measured:** LOCAL production build at http://localhost:3117 (canonical host https://arrowbin.com mapped to localhost). LIVE (https://arrowbin.com) was fetched once only to confirm it is still the old build: it still emits `#localbusiness-st-petersburg`, still has the `linkedin.com/in/arrowbinllc` placeholder and has no `#founder` reference. So the LIVE score is unchanged.

**Method:** All 29 sitemap URLs fetched with curl; every `<script type="application/ld+json">` extracted and parsed with Python stdlib (58 blocks, 2 per page: layout block plus page block). Checks run on all of them: syntax, `@context`, relative URLs, placeholders, `@id` graph (definitions vs references), duplicate and conflicting nodes, required properties per type, schema vs visible text (FAQ, breadcrumbs, dates, bylines, service names, phone and email, work list, blog index), speakable selectors, image URLs (status, type, pixel size). Raw extract and the check script are in `findings/raw/schema-jsonld-extract.json` and `findings/raw/schema-checks.py`. No source edited, no build, no server touched.

## Score

| | 14 Oct | 15 Oct |
|---|---|---|
| LOCAL (:3117, with the 15 Oct sprint) | 89 | **94 / 100** |
| LIVE (still commit 959866d) | 79 | **79 / 100** (not deployed) |
| Projected LOCAL after the fixes below and the founder items | 95 | 98 |

Deductions on the 94: entity gap, no LinkedIn company page and no Clutch (-2); markup that the page does not show, namely the postal addresses and geo pin and the OfferCatalog deliverables (-2.5); small hygiene items such as `Place "Worldwide"`, redundant `sameAs` on the Dhaka node, and missing `isPartOf` links (-1); date-only timestamps (-0.5).

## What works

- **Syntax and hygiene:** 58 of 58 blocks parse. All use `https://schema.org`. Zero relative URLs, zero `http://`, zero placeholder text. No HowTo, SpecialAnnouncement, Review or AggregateRating. No SearchAction (correct: there is no site search).
- **`Organization.founder` resolves on all 29 pages.** The Organization node embeds the full `#founder` Person (name, jobTitle, image, url, sameAs, worksFor), so no page depends on `/about` to define it.
- **Homepage breadcrumb gone** (was a one-item trail). No page has a BreadcrumbList with fewer than 2 items; the 28 trails all have contiguous positions and every name appears in the visible page.
- **Dhaka ProfessionalService:** no `openingHoursSpecification`, no `streetAddress`, no `priceRange`. `url` is `/contact`. It points to the Organization through `parentOrganization`.
- **BlogPosting on all 13 posts** has `@id` (`<url>#article`), `mainEntityOfPage` as `{WebPage, @id}`, author Person with `@id`, `jobTitle`, `worksFor`, `image`, `url`, `sameAs`, `datePublished`, `dateModified`, `inLanguage`, `wordCount`, `articleSection`, `keywords`, `publisher` and `copyrightHolder` as `#organization` references. Image is an ImageObject 1200x630; all 13 `/opengraph-image` URLs return 200 `image/png` at exactly 1200x630. Headline equals the H1 on 13 of 13. Headlines are under 70 characters. The byline is visible on all 13.
- **Dates match the page and the sitemap.** `datePublished` and `dateModified` appear verbatim in the visible text of all 13 posts, and `dateModified` equals the sitemap `lastmod` for all 13.
- **CollectionPage** name is now `Arrowbin Blog` (was the SEO title). Its 13 `hasPart` `@id`s equal the 13 BlogPosting `@id`s. The HTML has 13 distinct post links.
- **Named ItemLists:** `/services#list` ("Arrowbin software development services", 8) and `/work#list` ("Arrowbin client work", 8). The 8 Service stubs on `/services` carry the same `@id`s as the 8 detail-page Service nodes. All 8 work items are visible on `/work`.
- **FAQPage:** 169 Q&As on 24 pages (home, `/services`, 8 service pages, `/contact`, 13 posts). All 169 questions and answers appear verbatim in the visible page text. So the markup does not break the "marked-up content must be visible" rule.
- **Identity facts match the page:** phones `+8801843596038` and `+1 813-421-5874`, `hello@arrowbin.com`, `Arrowbin LLC` (terms and privacy), founder name and "Founder" title, `shishir@arrowbin.com` and `foundingDate` 2020 on `/about`. All five `sameAs` URLs (GitHub, Facebook, Instagram, X, founder LinkedIn) are linked from the pages. The `in/arrowbinllc` placeholder is gone from the markup and from the HTML.
- **Speakable:** present on 21 nodes (8 Service, 13 BlogPosting); every selector (`h1`, `#service-answer`, `#tldr`) exists in the HTML. Neutral, keep as is.

## @id graph check per page type

Reference rule used: a node with `@id` and no other property except `@type` counts as a reference; anything else is a definition.

| Page type | Definitions | References | Result |
|---|---|---|---|
| Every page (29) | `#organization`, `#website`, `#localbusiness-dhaka`, `#founder` (embedded in Organization.founder) | `Organization.founder` -> `#founder`; `founder.worksFor` -> `#organization`; `WebSite.publisher` -> `#organization`; `ProfessionalService.parentOrganization` -> `#organization` | 0 dangling. Each defined once. |
| `/` | sitewide + FAQPage | none extra | Pass. No BreadcrumbList. |
| `/services` | `/services#list` (ItemList) | 8 Service `@id` stubs (`/services/<slug>#service`), `provider` -> `#organization` | Pass. 8 of 8 `@id`s equal the detail-page Service `@id`s. |
| `/services/<slug>` (8) | `<path>#service`, process ItemList (no `@id`), FAQPage (no `@id`) | Service.provider -> `#organization` | Pass. |
| `/work` | `/work#list` | 8 CreativeWork.creator -> `#organization` | Pass. |
| `/about` | AboutPage (no `@id`), Person `#founder` (second definition) | AboutPage.about -> `#organization`; Person.worksFor -> `#organization` | Pass. `#founder` is defined twice (Organization embed plus Person node). The two are identical except the Person adds `email`, so they merge without conflict. |
| `/blog` | `/blog#collection` | 13 `hasPart` `@id`s (`<post>#article`), publisher -> `#organization` | Pass. 13 of 13 match the post pages. |
| `/blog/<slug>` (13) | BlogPosting `<url>#article`, author Person `#founder` (second definition), FAQPage | publisher and copyrightHolder -> `#organization`; author.worksFor -> `#organization`; `mainEntityOfPage` -> `<url>` | Pass. `#founder` has zero differing properties between its two definitions on all 13 posts. `mainEntityOfPage` points at a WebPage `@id` that no node defines. That is the pattern in Google's Article docs and is not a defect (Info). |
| `/contact`, `/privacy`, `/terms` | sitewide + BreadcrumbList (+ FAQPage on `/contact`) | none extra | Pass. No duplicate ProfessionalService blocks (the 1 Oct H3 bug stays fixed). |

Duplicate or conflicting nodes: none that disagree. The only repeated `@id` is `#founder` (see above). Sitewide payload is 3 nodes (about 3 KB); it repeats on every page by design.

## Change log against the 14 Oct baseline

| ID (14 Oct) | Finding | Status 15 Oct | Evidence |
|---|---|---|---|
| S1 | Dhaka node asserts unverified street and hours | **FIXED, geo pin left** | No `streetAddress`, no hours. `geo` 23.766, 90.359 kept (founder decision). See M1 for the new parity point. |
| S2 / M2 | BlogPosting not self-contained, no `@id` | **FIXED** | `@id`, `mainEntityOfPage` object, author `jobTitle` + `worksFor`, all 13 posts. |
| M2 (Org.founder) | Org lacks `founder` | **FIXED** | Resolves on 29 of 29 pages. |
| S3 | Footer LinkedIn placeholder | **FIXED in code** | Not in `sameAs`, not in the HTML. The real company page does not exist yet: founder-gated. |
| S4 / L1 | Single-item homepage BreadcrumbList | **FIXED** | `/` emits no BreadcrumbList. |
| S5 / L2 | Unnamed ItemLists, Service stubs without `@id` | **FIXED** | See graph table. |
| S6 / L4 | `areaServed` `Place "Worldwide"` | **STILL OPEN (Low)** | All 8 Service nodes still have it (L1 below). |
| S7 | CollectionPage name copied the SEO title | **FIXED** | `Arrowbin Blog`. |
| S8 | `/work` CreativeWork has no `@id` or `image` | **STILL OPEN (Info)** | Optional. |
| H1/H2/H3 | LinkedIn placeholder, St. Petersburg node, duplicate PS blocks on `/contact` | **FIXED LOCAL, not live** | LIVE still shows the St. Petersburg node and the placeholder. Deploy needed. |
| I1 | FAQPage everywhere | Info, unchanged | See Info section. |

New this time: M1, M2, L2 to L5.

## Findings

No Critical or High findings.

### Medium

**M1. Postal addresses and geo pin are in the markup but nowhere on the site (NEW as a parity point).**
- Evidence: the Organization carries two PostalAddress entries (Dhaka 1207; `7901 4th St N, Ste 300, St. Petersburg, FL 33702`) and the Dhaka ProfessionalService carries a postal code and `geo`. A scan of the visible text of all 29 pages finds no "St. Petersburg", "7901", "Ste 300", "33702", "Florida", "Mohammadpur", "1207" or any Dhaka address (the word "Dhaka" appears only in body copy on one post). The site shows only the email and the two phone numbers. `llms.txt` states "no offices". No opening hours are visible either, so the removal of hours was right.
- Why it matters: Google asks that markup reflect what the page shows. A location-type node (ProfessionalService) with no visible location is the thinnest case of that. No rich result depends on it, so the risk is entity confusion, not a penalty. The US address is the registered virtual-office address of Arrowbin LLC (kept deliberately on 14 Oct).
- Fix, pick one (needs the founder, decision D8):
  - (a) Publish the registered address and, if wanted, the Dhaka area in the footer or on `/contact`, then keep the markup as is.
  - (b) Keep the Organization addresses (legal entity data) but delete the Dhaka ProfessionalService node, `localBusinessSchema()` in `src/lib/schema.ts` and its use in the layout. Code in "Ready JSON-LD" item 4.
  - (c) If the pin is kept, drop `geo` until a street line is supplied; a pin without a street is the weakest signal.
- Owner: founder decides, dev implements. Visual sign-off needed only for option (a). Effort S.
- Failure signal: Rich Results Test or a Google Business Profile claim shows an address the website does not print.

**M2. `hasOfferCatalog` lists deliverables the service pages no longer print (NEW).**
- Evidence: all 8 service pages now use bespoke bodies, so the generic `ServiceDeliver` section that rendered `service.deliverables` (`src/app/services/[slug]/page.tsx` line 347, fallback branch) is not used by any of the 8 slugs. Matching the 6 catalog names per page against the visible text (case-insensitive): custom software 4 of 6, e-commerce 1 of 6, maintenance 1 of 6, and 0 of 6 on AI automation, cloud/DevOps, mobile, SaaS and UI/UX. Example: the e-commerce Offer "Subscription & membership stores" is not on the page at all. The `audience` list (4 per page) and the 4 process steps do match the page text, so only the catalog is out of step.
- Fix: simplest is to remove `deliverables: service.deliverables,` from the `serviceSchema({...})` call in `src/app/services/[slug]/page.tsx` (line 137), which drops `hasOfferCatalog`. Or rewrite each `deliverables` array in `src/lib/services.ts` to the wording of the bespoke section headings so markup and page agree. No rich result is lost either way.
- Owner: dev. No visual change. Effort S.

### Low

**L1. `areaServed` still contains `{"@type":"Place","name":"Worldwide"}` in all 8 Service nodes (OPEN, was S6).** `Place` with a name of "Worldwide" is not a real place, and the Organization uses a plain string. Remove it (the Service inherits reach from `provider`) or keep only the two Country entries. Code in item 6. Owner dev, effort S.

**L2. Service name differs from its H1 on one page (NEW).** Schema, breadcrumb and the `/services` list say "SaaS / Product Engineering"; the H1 says "SaaS & Product Engineering" (`name` vs `heading` in `src/lib/services.ts` lines 365 and 366). Harmless for rich results but it splits one entity into two labels for AI extraction. Use the H1 wording in `name`, or confirm the nav label is intended. Owner dev, effort S.

**L3. Redundant and repeated entity data (NEW).**
- The Dhaka ProfessionalService repeats the Organization's four `sameAs` profiles. Those URLs identify the brand, not the office; delete `sameAs` from the Dhaka node.
- `#founder` is fully defined twice on `/about` and all 13 posts (identical). Fine for merging, but a reference-only author (`{"@id": ".../#founder"}` plus `name`) on posts would remove about 300 bytes per post. Optional.
- The ProfessionalService has no `description`. Optional.

**L4. Pages are not linked to the WebSite or to each other (NEW, small gain).** `AboutPage` and `CollectionPage` have no `isPartOf` to `#website`; `AboutPage` has no `@id`; BlogPosting has no `isPartOf` to `/blog#collection`; `WebSite` has no `alternateName` (Google's site name guidance recommends it). Code in items 2, 3 and 5.

**L5. Date-only timestamps (NEW).** `datePublished`/`dateModified` use `2026-10-15` (valid ISO 8601). Google recommends a time and timezone, for example `2026-10-15T09:00:00+06:00`. Low value, and visible dates match, so only do it if the blog data model already holds times. The posts also have no `<time datetime>` elements (HTML, not schema; Info).

**L6. `/work` CreativeWork items still have no `@id` or `image` (OPEN, was S8).** Optional.

### Info

- **FAQPage (24 pages, 169 Q&As): Info, no action.** Google retired FAQ rich results for all sites on 7 May 2026, so there is no SERP feature. The markup is valid and verbatim-visible, and it keeps helping AI extraction and entity resolution. Do not remove it. Do not add FAQPage anywhere new for Google's sake. Genuine user Q&A would use QAPage.
- **Speakable** is not needed and no change is recommended. It is documented by Google for news publishers; the existing 21 nodes are harmless and their selectors resolve.
- **`mainEntityOfPage` `@id` has no matching node.** Standard Article pattern; leave it.
- **`/contact` has no `ContactPage` node.** Optional; code in item 7.
- **Do not add `numberOfEmployees`.** The About page prints no headcount ("Founder-led since 2020"), so any number would be unsupported. Add it only if the founder supplies and publishes one.
- **Person `knowsAbout`** is a reasonable, low-risk addition on `/about` (code in item 1) provided the founder confirms the topics.
- **Home breadcrumb item `https://arrowbin.com/`** has a trailing slash while the canonical, Organization `url` and sitemap use `https://arrowbin.com`. Same resource; no action.
- **All ten new posts are dated 15 Oct 2026** (published and modified the same day). Matches the visible dates; it is a publishing-cadence fact, not a markup error.
- **Not checked:** Google Rich Results Test / Schema.org validator online runs (not available to this audit); the 3 old posts' `dateModified` against their actual last edit (June dates match the sitemap and the page); Search Console enhancement reports (tool belongs to another business, not used).

## Founder-gated (not re-raised as defects)

| Item | State | What the founder supplies |
|---|---|---|
| D8 Dhaka street line, real hours, keep or drop `geo` | Hours and street removed; `geo` kept | Street line (if any), hours (if any), pin yes or no. Also decides M1. |
| LinkedIn company page (P1.4) | Not created; placeholder removed | URL, then append to `sameAs` and the footer `socials` (see item 8). |
| Clutch profile (P1.3) | `clutch.co/profile/arrowbin-0` exists but is unclaimed | Claim it, then append to `sameAs`. |
| F4 free call vs paid discovery | The FAQ markup repeats both. Home FAQ: "fixed estimate after a free consultation". `/services` FAQ: "free discovery call" and "free 30-minute discovery call". Cost post FAQ: "Running a short paid discovery first makes a fixed price far more accurate." | One answer. The markup mirrors visible copy, so fix the copy and the JSON-LD follows. |
| F1/F5 prices | Home FAQ: builds "start around $5,000-$10,000". `/services` and custom-software FAQ: "from $8,000". AI service FAQ: "$10,000-$15,000". Mobile FAQ: polished MVP "$12,000 and $40,000". Cost guide TL;DR: "$30,000 and $120,000" | A canonical price table; same fix path as above. |
| F6/F7 timelines | FAQs say 6-12 weeks (home, custom), 8-14 (SaaS service); posts say 10-14 and 14-20 | Confirm "focused" vs "complex" reconciliation. |

## Ready JSON-LD and code (do not apply without sign-off where marked)

### 1. Person: add `knowsAbout` on `/about` only (founder confirms topics)

`founderSchema()` in `src/lib/schema.ts`; adding it to the sitewide `founderNode()` would repeat it on all 29 pages.

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://arrowbin.com/#founder",
  "name": "Md. Shishir Ahmed",
  "jobTitle": "Founder",
  "image": "https://arrowbin.com/team/shishir-ahmed.webp",
  "url": "https://arrowbin.com/about",
  "email": "shishir@arrowbin.com",
  "sameAs": ["https://www.linkedin.com/in/md-shishir-ahmed"],
  "worksFor": { "@id": "https://arrowbin.com/#organization" },
  "knowsAbout": [
    "Custom software development",
    "SaaS product engineering",
    "E-commerce development",
    "AI automation",
    "Software development cost estimation",
    "Payment gateway integration in Bangladesh"
  ]
}
```

### 2. AboutPage with `@id`, `isPartOf` and `mainEntity`

```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://arrowbin.com/about#page",
  "name": "About Arrowbin",
  "url": "https://arrowbin.com/about",
  "isPartOf": { "@id": "https://arrowbin.com/#website" },
  "about": { "@id": "https://arrowbin.com/#organization" },
  "mainEntity": { "@id": "https://arrowbin.com/#organization" },
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "url": "https://arrowbin.com/logo.png",
    "width": 512,
    "height": 512
  }
}
```

### 3. CollectionPage and BlogPosting links

Add to the `/blog` CollectionPage:

```json
"isPartOf": { "@id": "https://arrowbin.com/#website" },
"inLanguage": "en"
```

Add to every BlogPosting in `blogPostingSchema()`:

```json
"isPartOf": { "@id": "https://arrowbin.com/blog#collection" }
```

### 4. M1 option (b): drop the Dhaka location node

In the root layout, stop emitting `localBusinessSchema()`; the Organization keeps its `address` array. If the node stays, trim it to:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://arrowbin.com/#localbusiness-dhaka",
  "name": "Arrowbin (Dhaka, Bangladesh)",
  "url": "https://arrowbin.com/contact",
  "image": "https://arrowbin.com/logo.png",
  "email": "hello@arrowbin.com",
  "telephone": "+8801843596038",
  "parentOrganization": { "@id": "https://arrowbin.com/#organization" },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dhaka",
    "addressRegion": "Dhaka",
    "postalCode": "1207",
    "addressCountry": "BD"
  }
}
```

That removes the duplicated `sameAs`, the redundant `logo` and the `geo` pin (add `geo` back only together with a printed address).

### 5. WebSite `alternateName`

```json
"alternateName": ["Arrowbin LLC", "arrowbin.com"]
```

### 6. Service `areaServed` (L1)

Remove the `Place "Worldwide"` entry from `AREA_SERVED` in `src/lib/schema.ts`:

```json
"areaServed": [
  { "@type": "Country", "name": "United States" },
  { "@type": "Country", "name": "Bangladesh" }
]
```

### 7. ContactPage on `/contact` (optional)

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://arrowbin.com/contact#page",
  "name": "Contact Arrowbin",
  "url": "https://arrowbin.com/contact",
  "isPartOf": { "@id": "https://arrowbin.com/#website" },
  "about": { "@id": "https://arrowbin.com/#organization" }
}
```

### 8. After the LinkedIn company page and Clutch claim exist (`src/lib/site.ts`)

Append `https://www.linkedin.com/company/<slug>` and the claimed Clutch profile URL to `sameAs`, and restore the LinkedIn entry in `site.socials`. This is the largest remaining entity-resolution gain.

## Priority order

1. Deploy the local build (moves LIVE 79 to about 94 by itself: H1, H2, H3, Org.founder, S1 to S5, S7).
2. M2 (one-line removal or copy alignment), then L1 and L2.
3. Decide M1 with the founder (D8), together with the hours, street and geo questions.
4. L3 to L5 and the optional nodes (items 1, 2, 3, 5, 7) at leisure.
5. LinkedIn company page and Clutch claim: founder tasks, largest entity-score gain.

## Summary

Schema is in good shape on the local build: 58 of 58 JSON-LD blocks parse, there are zero dangling `@id` references, `Organization.founder` resolves on all 29 pages, all 13 BlogPostings are self-contained with matching dates, 1200x630 images and a full author node, the homepage no longer has a one-item breadcrumb, the Dhaka node has no hours or fake street, and all 169 FAQ answers are visible verbatim (FAQPage stays as Info only, since Google retired its rich results on 7 May 2026). The remaining gaps are small: the markup asserts postal addresses and a geo pin that the site never prints (M1, founder decision D8), the OfferCatalog lists deliverables the bespoke service pages no longer show (M2), `Place "Worldwide"` is still in the Service nodes, and entity links such as `isPartOf` and LinkedIn/Clutch `sameAs` are missing. Score: LOCAL 94 / 100 (14 Oct local 89), LIVE 79 / 100 unchanged because the sprint is not deployed.
