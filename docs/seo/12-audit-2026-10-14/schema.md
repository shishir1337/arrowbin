# Schema / Structured Data Audit: arrowbin.com (2026-10-14)

Method: JSON-LD extracted with a Python stdlib script from raw HTML on LIVE (https://arrowbin.com) and LOCAL (http://localhost:3117), 11 URLs each: `/`, `/services`, `/services/custom-software-development`, `/services/ai-automation`, `/services/mobile-app-development`, `/work`, `/about`, `/contact`, `/blog`, `/blog/how-much-does-custom-software-development-cost`, `/privacy`. Cross-checked with `src/lib/schema.ts` and `src/lib/site.ts`. Read-only.

## Schema score

| | Score |
|---|---|
| LIVE (commit 959866d) | **79 / 100** (unchanged from 1 Oct; nothing deployed) |
| LOCAL (uncommitted fixes, pending deploy) | **89 / 100** |
| Projected after remaining fixes below | **95 / 100** |

All blocks on both versions parse, use `https://schema.org`, absolute URLs and ISO dates. No deprecated types (no HowTo, no SpecialAnnouncement), no fake Review/AggregateRating.

## Detection matrix

| URL | LIVE | LOCAL |
|---|---|---|
| all pages (sitewide) | Organization, WebSite, ProfessionalService Dhaka, ProfessionalService St. Petersburg, BreadcrumbList | Organization, WebSite, ProfessionalService Dhaka, BreadcrumbList |
| `/` | + FAQPage (5) | same |
| `/services` | + ItemList (8 Service), FAQPage (5) | same |
| `/services/*` (3) | + Service `#service`, ItemList (process), FAQPage (6/7/6) | same (Service text differs only by new descriptions) |
| `/work` | + ItemList (CreativeWork) | same |
| `/about` | + AboutPage, Person `#founder` | same |
| `/contact` | sitewide + both ProfessionalService AGAIN + FAQPage | no duplicates, FAQPage only |
| `/blog` | + CollectionPage `/blog#collection` | same |
| blog post | + BlogPosting, FAQPage (7) | same |
| `/privacy` | sitewide only | sitewide only |

Page-specific nodes are byte-identical live vs local except the 3 Service pages (description changes).

## Re-check of 1 Oct findings

| ID | Finding | Status | Evidence |
|---|---|---|---|
| H1 | LinkedIn `/in/arrowbinllc` placeholder in sameAs | **FIXED-LOCAL** | LIVE Org sameAs still has `linkedin.com/in/arrowbinllc`; LOCAL = GitHub, Facebook, Instagram, X. Footer `socials` still holds the placeholder (not schema; fix with the real company page). |
| H2 | St. Petersburg ProfessionalService (virtual office) | **FIXED-LOCAL** | LIVE has `#localbusiness-st-petersburg` with geo + hours on every page; LOCAL has only Dhaka. US address kept as PostalAddress on Organization (with Ste 300). |
| H3 | Duplicate ProfessionalService on `/contact` | **FIXED-LOCAL** | LIVE `/contact` emits 4 ProfessionalService blocks; LOCAL none extra. |
| M1 | Dhaka node weak: `Mohammadpur` as street, unverified hours, geo | **OPEN** | LOCAL Dhaka node still has `streetAddress: "Mohammadpur"`, `openingHoursSpecification` Mon-Fri 09:00-18:00, `geo` (23.766, 90.359). `priceRange` is gone. `url` now `/contact` (fixed). |
| M2 | Org lacks `founder`; BlogPosting author partial | **Org part FIXED-LOCAL; author OPEN** | LOCAL Org has `founder {"@id": ".../#founder"}`. BlogPosting author still has no jobTitle/worksFor. |
| M3 | Founder sameAs single LinkedIn | OPEN (Info) | Fine; add only real profiles. |
| L1 | Homepage BreadcrumbList with a single item | **OPEN** | LOCAL `/` breadcrumb = [Home] only. |
| L2 | ItemList nodes lack name/@id | **OPEN** | `/services` and `/work` ItemLists still unnamed. Process ItemList is named. |
| L4 | areaServed `Place "Worldwide"` | OPEN | Still in Service nodes. |
| L5 | BlogPosting has no `@id` | **OPEN** | No `@id`. |
| I1 | FAQPage on `/`, `/services`, `/services/*`, `/contact`, posts | Info, unchanged | Valid; Google retired FAQ rich results 7 May 2026. No SERP benefit. No removal recommended, no new FAQPage. |

## Findings (remaining and new)

### Medium

**S1. Dhaka ProfessionalService asserts unverified specifics (OPEN; was M1)**
- Evidence: LOCAL node has `streetAddress: "Mohammadpur"` (an area, not a street line, also repeated in the Organization address), fixed office hours and `geo`. Founder says offices should not be emphasised, and no source confirms Mon-Fri 09:00-18:00 is published on the site.
- Fix: `src/lib/site.ts` (Dhaka office) and `localBusinessSchema()` in `src/lib/schema.ts`. Drop `openingHoursSpecification`; keep `geo` only if a pin is intentional; omit `streetAddress` when it is just a neighbourhood (use `addressLocality: "Dhaka"` plus `postalCode`). Code below.
- Effort S. Owner dev (hours and address confirmation: founder).
- How we'd know it failed: Rich Results/Schema validator shows hours that differ from the site, or a Dhaka Google Business Profile mismatch.

**S2. BlogPosting is not self-contained and has no `@id` (OPEN; was M2/L5)**
- Evidence: author node has name, image, url, sameAs, `@id` but no `jobTitle` or `worksFor`; BlogPosting has no `@id`; `mainEntityOfPage` is a bare URL string. Blog pages do not emit the Person node (only `/about` does), so the `#founder` reference resolves only if a consumer merges across pages.
- Fix: `blogPostingSchema()` in `src/lib/schema.ts`. Code below. Effort S. Owner dev.
- Failure signal: author shows as a name-only entity in validators.

**S3. Footer LinkedIn placeholder still points to `/in/arrowbinllc` (OPEN, not schema)**
- Evidence: `site.ts` line 62 with TODO. Not in sameAs locally, so no entity damage, but it is a live link. Re-add the company URL to `sameAs` once it exists. Owner founder (create/confirm the company page). Effort S.

### Low

**S4. Homepage BreadcrumbList has one item (OPEN, L1).** Skip emission when `items.length < 2`. Effort S.
**S5. `/services` and `/work` ItemLists lack `name`/`@id`; Service items in the list lack `@id` (OPEN, L2).** Reuse `#service` @id so list and detail pages resolve to one entity. Code below.
**S6. `areaServed` uses `Place "Worldwide"` in Service nodes while Org uses a string (OPEN, L4).** Use Countries or plain list. Low value; optional.
**S7. CollectionPage `name` is `Blog & Insights | Arrowbin` (NEW).** It copies the SEO title with the brand suffix. Use `Arrowbin Blog`. Also `hasPart` lists BlogPosting URLs only; fine. Effort S.
**S8. `/work` CreativeWork items use third-party client URLs as `url` (NEW, Info-level).** Correct as the work's own site, but no `@id` or `image`; optional. Reminder: placeholder testimonials are not emitted as Review markup, which is right.
**S9. Sitewide payload on `/privacy` and every page (Info).** Smaller locally (Dhaka only); acceptable.

### Info

- Person `#founder` is emitted on `/about` only, while Organization (every page) references it. Acceptable; optional to add a minimal Person to blog posts via S2.
- No `ContactPage` type on `/contact` (optional): `/contact` currently carries only FAQPage plus sitewide nodes.
- Founder `email` exposed on `/about` Person (intentional).
- No HowTo, no Review/AggregateRating, no SearchAction (no site search): all correct.
- `speakable` selectors `h1`, `#service-answer`, `#tldr` are gated in code; neutral.
- Entity sameAs quality (LOCAL): GitHub `Arrowbin-LLC`, Facebook, Instagram, X are all brand-named profiles; no LinkedIn company page yet (largest gap for entity resolution). Founder LinkedIn `md-shishir-ahmed` matches the brief.

## Ready-to-apply code

### 1. Dhaka node without unverified hours/street (src/lib/schema.ts, `localBusinessSchema`)

```ts
      address: {
        "@type": "PostalAddress",
        ...(o.streetAddress && !o.areaOnly ? { streetAddress: o.streetAddress } : {}),
        addressLocality: o.city,
        addressRegion: o.region,
        postalCode: o.postalCode,
        addressCountry: o.country,
      },
      geo: { "@type": "GeoCoordinates", latitude: o.geo.lat, longitude: o.geo.lng },
      areaServed: [o.countryName, "Worldwide"],
      // openingHoursSpecification removed: add back only if hours are published on the site.
```

In `src/lib/site.ts`, add `areaOnly: true` to the Dhaka office (and `areaOnly: false` to the other) and apply the same `!o.areaOnly` guard in `organizationSchema()` address mapping.

### 2. BlogPosting self-contained (src/lib/schema.ts, `blogPostingSchema`)

```ts
    "@id": `${siteUrl}/blog/${opts.slug}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${opts.slug}` },
    ...
    author: {
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: opts.author,
      jobTitle: author.jobTitle,
      image: `${siteUrl}${author.image}`,
      url: author.url,
      sameAs: author.sameAs,
      worksFor: { "@id": ORG_ID },
    },
```

### 3. Breadcrumb skip on single item

```ts
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  if (items.length < 2) return null; // callers: render only when non-null
  ...
}
```

### 4. Named ItemLists reusing Service @id (src/lib/schema.ts)

```ts
export function serviceListSchema(items: { name: string; slug: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/services#list`,
    name: "Arrowbin software development services",
    itemListElement: items.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        "@id": `${siteUrl}/services/${s.slug}#service`,
        name: s.name,
        url: `${siteUrl}/services/${s.slug}`,
        provider: { "@id": ORG_ID },
      },
    })),
  };
}
// workListSchema: add "@id": `${siteUrl}/work#list`, name: "Arrowbin client work".
```

### 5. CollectionPage name

In the `/blog` page call to `collectionPageSchema`, pass `name: "Arrowbin Blog"`.

### 6. After LinkedIn company page exists (src/lib/site.ts)

Append `"https://www.linkedin.com/company/<slug>"` to `sameAs` and update the footer `socials` LinkedIn `href`.

## Priority order
1. Deploy the local schema fixes (H1, H2, H3, Org.founder): this alone moves live 79 to 89.
2. S1, S2 (S effort each).
3. S3 when the founder creates the LinkedIn company page.
4. S4 to S7 at leisure.
