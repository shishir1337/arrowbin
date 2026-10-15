# Schema / Structured Data Audit: arrowbin.com (2026-10-01)

Method: curl of live HTML, JSON-LD parsed programmatically, cross-checked against `src/lib/schema.ts` and `src/lib/site.ts` (read-only).
Pages checked: `/`, `/services`, `/services/custom-software-development`, `/services/ai-automation`, `/services/mobile-app-development`, `/work`, `/about`, `/contact`, `/blog`, `/blog/how-much-does-custom-software-development-cost`, `/privacy`.

## Schema score: 79 / 100

| Area | Result |
|---|---|
| JSON-LD validity, format, @context, absolute URLs, ISO dates | Pass (all blocks parse; https://schema.org; absolute URLs) |
| Organization | Good, one data problem (sameAs) |
| WebSite | Pass |
| ProfessionalService | Needs work (shared virtual office, duplicated, weak differentiation) |
| Service / ItemList / BreadcrumbList / BlogPosting / AboutPage / CollectionPage | Pass with minor gaps |
| Review / AggregateRating | None emitted (correct; keep it that way until genuine reviews exist) |
| HowTo | None (correct; process steps use ItemList) |

## Detection matrix (live)

Every page carries the same sitewide block from the layout: Organization, WebSite, 2x ProfessionalService (Dhaka, St. Petersburg), BreadcrumbList. Page-specific nodes:

| URL | Page-specific schema |
|---|---|
| `/` | FAQPage; BreadcrumbList has a single item (Home) |
| `/services` | ItemList of 8 Service, FAQPage |
| `/services/*` (3 sampled) | Service (`#service` @id), ItemList (process), FAQPage |
| `/work` | ItemList of CreativeWork (creator references Org @id) |
| `/about` | AboutPage, Person (`#founder`) |
| `/contact` | ProfessionalService x2 emitted AGAIN (duplicates), FAQPage |
| `/blog` | CollectionPage (`/blog#collection`, hasPart BlogPosting urls) |
| `/blog/<post>` | BlogPosting, FAQPage |
| `/privacy` | Sitewide block only |

## Findings

### Critical
None. No invalid JSON, no deprecated types, no fake ratings.

### High

**H1. LinkedIn sameAs is a placeholder (Organization and both ProfessionalService nodes).**
Evidence: live `sameAs` = `https://www.linkedin.com/in/arrowbinllc`; `site.ts` line 55 carries `TODO: replace with the real Arrowbin company page`. `/in/` is the personal-profile path, so it asserts a person profile as the company entity, which can mis-resolve the knowledge graph (LinkedIn returned HTTP 999 to curl, so existence could not be confirmed). GitHub `https://github.com/Arrowbin-LLC` returns HTTP 200 but is not in `sameAs`.
Fix: remove the LinkedIn URL from schema `sameAs` now; re-add the company URL (`https://www.linkedin.com/company/<slug>`) once it exists. Add GitHub. Keep the footer `socials` list separate from schema `sameAs` (currently `sameAs = site.socials.map(...)`).

**H2. St. Petersburg ProfessionalService node is built on a shared virtual office.**
Evidence: address `7901 4th St N, St. Petersburg, FL 33702` (Ste 300 omitted), with `geo`, `openingHoursSpecification` Mon-Fri 09:00-18:00 and a US phone. That markup asserts a staffed, walk-in location. Virtual offices are not eligible for a Google Business Profile, and presenting one as a business location is a spam-policy risk. It also conflicts with the brief's wish not to emphasise offices.
Advice:
- Keep the US address only as a `PostalAddress` inside Organization `address`, including `Ste 300` so it matches citations exactly.
- Delete the St. Petersburg `ProfessionalService` node (or at minimum drop `geo` and `openingHoursSpecification`).
- Do not build a GBP or local-pack strategy on this address; use it as a registered/mailing address only.

**H3. Duplicate entity emission on `/contact`.**
Evidence: the two ProfessionalService blocks appear twice (layout plus contact page, same @ids). Identical @ids parse fine but it is noise and a maintenance trap. Emit from one place only.

### Medium

**M1. The two ProfessionalService nodes are barely distinguishable.** Both use `url: https://arrowbin.com`, the same logo and `sameAs`; only the name suffix differs. After H2 only Dhaka remains; give it a distinct `url` (for example `/contact`). The Dhaka `streetAddress` is `Mohammadpur`, a neighbourhood, not a street line; use a real street line or omit it. `priceRange: "$$"` is vague; remove unless supported.

**M2. Founder Person is only rendered on `/about`, but referenced elsewhere.** BlogPosting `author` inlines `@id .../#founder` with a partial node (no jobTitle, no worksFor), so posts are not self-contained. Organization lacks `founder: {"@id": ".../#founder"}`, which would complete the Org-Person link both ways.

**M3. Founder sameAs is a single LinkedIn profile** (`linkedin.com/in/md-shishir-ahmed`, matches the brief; fine). Add further personal profiles only if they exist.

### Low

- **L1.** `/` BreadcrumbList has one item; it adds no value, omit on the homepage.
- **L2.** ItemList nodes (`/services`, `/work`) lack `name`; add `name` and `@id`.
- **L3.** Service nodes have no `offers`. Fine while pricing is unpublished.
- **L4.** Service `areaServed` includes `Place "Worldwide"`, not a recognised entity; Organization uses the plain string. Consider a Country list.
- **L5.** BlogPosting has no `@id`; add `<url>#article` so other nodes can reference it.
- **L6.** Person `email` (`shishir@arrowbin.com`) is exposed on `/about`; intentional, note spam exposure.

### Info

- **I1. FAQPage present on `/`, `/services`, `/services/*`, `/contact` and blog posts.** Google retired FAQ rich results for all sites on 2026-05-07, so there is no SERP benefit. The markup is valid and harmless; no removal recommended, and no new FAQPage for SERP purposes. Any AI/GEO benefit is unconfirmed. Genuine user Q&A would be QAPage.
- **I2.** No Review/AggregateRating anywhere. Correct; add only with real, named, verifiable reviews displayed on the page.
- **I3.** HowTo not used; process steps use ItemList (keep).
- **I4.** `speakable` is emitted on Service and BlogPosting; neutral (Google supports it narrowly). Selectors `#service-answer` and `#tldr` are gated in code, good.
- **I5.** Sitewide payload (Org, 2x ProfessionalService, WebSite) is on every page including `/privacy`; it shrinks after H2/M1.
- **I6. Optional opportunities:** `ContactPage` type for `/contact`; `WebPage` wrapper with `isPartOf` WebSite; `Organization.founder`. A WebSite SearchAction is not needed (no site search).

## Corrected JSON-LD snippets

### 1. Organization (sameAs fixed, founder added, US address with Ste 300 as postal only)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://arrowbin.com/#organization",
  "name": "Arrowbin",
  "legalName": "Arrowbin LLC",
  "foundingDate": "2020",
  "url": "https://arrowbin.com",
  "logo": { "@type": "ImageObject", "url": "https://arrowbin.com/logo.png", "width": 512, "height": 512 },
  "image": "https://arrowbin.com/logo.png",
  "description": "Arrowbin is a software development company. We build custom software, web & mobile apps, SaaS, AI automation and cloud solutions for clients worldwide.",
  "email": "hello@arrowbin.com",
  "telephone": "+8801843596038",
  "areaServed": "Worldwide",
  "founder": { "@id": "https://arrowbin.com/#founder" },
  "sameAs": [
    "https://github.com/Arrowbin-LLC",
    "https://www.facebook.com/arrowbinllc/",
    "https://www.instagram.com/arrowbinllc",
    "https://x.com/Arrowbinllc"
  ],
  "address": [
    { "@type": "PostalAddress", "addressLocality": "Dhaka", "addressRegion": "Dhaka", "postalCode": "1207", "addressCountry": "BD" },
    { "@type": "PostalAddress", "streetAddress": "7901 4th St N Ste 300", "addressLocality": "St. Petersburg", "addressRegion": "FL", "postalCode": "33702", "addressCountry": "US" }
  ]
}
```

Keep the existing `knowsAbout` and `contactPoint` arrays unchanged. Append the LinkedIn company URL to `sameAs` when it exists.

### 2. Code change for `sameAs` (src/lib/site.ts, owner to apply)

```ts
// Schema sameAs: only verified entity profiles. Footer socials stay separate.
export const sameAs = [
  "https://github.com/Arrowbin-LLC",
  "https://www.facebook.com/arrowbinllc/",
  "https://www.instagram.com/arrowbinllc",
  "https://x.com/Arrowbinllc",
  // add "https://www.linkedin.com/company/<slug>" once the company page is live
];
```

### 3. Single location node (Dhaka only; delete the St. Petersburg node)

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
  "address": { "@type": "PostalAddress", "addressLocality": "Dhaka", "addressRegion": "Dhaka", "postalCode": "1207", "addressCountry": "BD" },
  "areaServed": ["Bangladesh", "Worldwide"]
}
```

Also emit it from one place only (not both layout and `/contact`), and drop `priceRange` and unverified opening hours unless real and published on the site.

### 4. BlogPosting author, self-contained, with @id

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://arrowbin.com/blog/how-much-does-custom-software-development-cost#article",
  "author": {
    "@type": "Person",
    "@id": "https://arrowbin.com/#founder",
    "name": "Md. Shishir Ahmed",
    "jobTitle": "Founder",
    "url": "https://arrowbin.com/about",
    "sameAs": ["https://www.linkedin.com/in/md-shishir-ahmed"],
    "worksFor": { "@id": "https://arrowbin.com/#organization" }
  }
}
```

Merge into the existing BlogPosting; all other properties stay as they are.

### 5. Named ItemList (example for `/services`; same pattern for `/work`)

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://arrowbin.com/services#list",
  "name": "Arrowbin software development services",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "@id": "https://arrowbin.com/services/custom-software-development#service",
        "name": "Custom Software Development",
        "url": "https://arrowbin.com/services/custom-software-development",
        "provider": { "@id": "https://arrowbin.com/#organization" }
      }
    }
  ]
}
```

Reusing the page-level Service `@id` makes the list and detail pages reference one entity.

## Priority order
1. H1: remove the LinkedIn placeholder from sameAs, add GitHub.
2. H2: remove the St. Petersburg location node; keep the address in Organization only.
3. H3: de-duplicate `/contact`.
4. M1, M2 cleanup.
5. Low items at leisure.
