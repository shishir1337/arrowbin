# Hreflang and international SEO: arrowbin.com (2026-10-14)

Method: `claude-seo:seo-hreflang` checklist, run with curl only (no plugin Python runtime). Every URL in the sitemap (19) was fetched from LIVE (https://arrowbin.com, commit 959866d) and LOCAL (http://localhost:3117, production build with the uncommitted fixes), plus probe URLs (static 404, unknown dynamic slugs, http/www variants, `/bn`, `?lang=bn`, `Accept-Language: bn-BD`). Source read: `src/app/layout.tsx`, `src/lib/site.ts`, `src/app/sitemap.ts`, `src/proxy.ts`, `src/lib/schema.ts`, and the Next.js 16.2.9 docs in `node_modules/next/dist/docs/`.

## Summary

- Pages scanned: 19 sitemap URLs x 2 builds, plus 8 probe URLs.
- Language variants detected: 1 (English). Hreflang tags found: 0.
- Verdict: **correct for a monolingual site.** Nothing to fix before a second language exists.
- Issues: Critical 0, High 0, Medium 0, Low 1, Info 4.
- The main value of this file is the ready-to-ship implementation for the planned Bangla page (section 4), including two traps in the current code that would silently break it.

## 1. Monolingual validation (current state)

| Check | Live | Local | Result |
|---|---|---|---|
| `<html lang>` | `en` on 19/19 | `en` on 19/19 | Pass |
| Canonical present, absolute, https, matches sitemap `<loc>` exactly | 19/19 | 19/19 | Pass |
| Trailing-slash consistency (home canonical `https://arrowbin.com`, sitemap loc `https://arrowbin.com`) | match | match | Pass |
| Hreflang `<link>` tags | 0 | 0 | Pass (correct for one language) |
| Sitemap `xmlns:xhtml` / `xhtml:link` | none | none | Pass (correct for one language) |
| Language or geo redirect (`Accept-Language: bn-BD` on `/`) | 200 English, no `Vary: Accept-Language` | same | Pass |
| `Content-Language` header | absent | absent | Pass (Google ignores it; `lang` covers it) |
| Protocol / host | `http://` 301 to https; `https://www` 301 to apex | n/a | Pass (see H-5 for the 2-hop case) |
| RSS `<language>` | `en` | `en` | Pass |
| BlogPosting `inLanguage` | `en` | `en` | Pass |
| WebSite schema `inLanguage` | absent | absent | Info (H-4) |
| `og:locale` | 3/19 pages (`/`, `/privacy`, `/terms`) | 3/19 | Info (H-1) |
| Organization ContactPoint `availableLanguage` | `["English","Bengali"]` | same | Pass (honest, matches team) |

Evidence commands (scratchpad `a12/`):
```
curl -s https://arrowbin.com/sitemap.xml | grep -o '<loc>[^<]*' ; then for each loc:
curl -s -A "Mozilla/5.0" <url> | grep -oE '<html lang="[^"]*"|<link rel="canonical"[^>]*>|hreflang=|og:locale" content="[^"]*"'
=> live: 19 ok, 0 mismatch ; local: 19 ok, 0 mismatch ; hreflang=0 everywhere
curl -s -D - -o /dev/null -H "Accept-Language: bn-BD,bn;q=0.9" https://arrowbin.com/
=> HTTP/1.1 200 OK ; Vary: rsc, next-router-state-tree, ..., Accept-Encoding (no Accept-Language)
```

### Why these are the right values for a monolingual site

- **`lang="en"`, not `en-US`.** The site sells to English-speaking buyers worldwide (US first, then UK/CA/AU, plus English-reading Bangladeshi businesses). A region subtag would claim a US-only audience for no gain. Google determines language from visible text and ignores `lang`; Bing has said it reads `lang` and content-language as language hints, and `en` is accurate for both.
- **No self-only hreflang.** `hreflang="en"` + `x-default` pointing at the same single URL carries no information; the canonical already does self-reference. The comment on `pageAlternates()` in `src/lib/site.ts` documents this decision correctly. Keep it.
- **No `en-US` / `en-GB` / `en-CA` / `en-AU` variants.** Those would be four near-identical English copies. Google already serves the one English page to every English market. Only create regional English URLs if their content genuinely differs (for example a GBP price table with UK contract terms), and only then add hreflang between them.
- **No auto-redirects by IP or `Accept-Language`.** Verified absent. `src/proxy.ts` only matches legacy spam paths. Keep it that way when a Bangla page ships: Googlebot mostly crawls from the US without `Accept-Language`, so a language redirect would hide the Bangla URL from it.

## 2. Findings

### H-1 (Info, OPEN): `og:locale` only on 3 of 19 pages
- Evidence: `og:locale" content="en_US"` on `/`, `/privacy`, `/terms` only, live and local. Pages that define their own `openGraph` object (`src/app/{about,blog,contact,services,work}/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/services/[slug]/page.tsx`) replace the root object from `src/app/layout.tsx` instead of merging, so `locale` is lost.
- Impact: none for search (Open Graph consumers default to `en_US`). It matters only as a trap for the Bangla page: see section 4, step 4.
- Fix: add `locale: "en_US"` to each page-level `openGraph`, or build page OG objects through one helper in `src/lib/site.ts`. Effort S. Owner dev.
- How we'd know it failed: `curl -s <url> | grep -c 'og:locale'` returns 0 on any sitemap URL.

### H-2 (Low, OPEN): unknown dynamic slugs render a 404 shell with no `lang`
- Evidence: `https://arrowbin.com/services/foo-bar` and `/blog/foo-bar` (live and local) return 404 with `<!DOCTYPE html><html id="__next_error__">`: no `lang`, no `<main>`, no `<h1>` in the raw HTML. The static 404 (`/this-page-does-not-exist-xyz`) is fine: `<html lang="en">`, noindex.
- Impact: accessibility only (WCAG 3.1.1 on that response). Noindexed 404, so no ranking effect. Note `/services/web-development` is now 308-redirected locally, so the known external link no longer lands here.
- Fix: add `export const dynamicParams = false` to `src/app/services/[slug]/page.tsx` and `src/app/blog/[slug]/page.tsx` so unknown slugs return the prerendered root 404 (which has `lang="en"`). Verify after build, do not assume. Effort S. Owner dev.
- How we'd know it failed: `curl -s https://arrowbin.com/services/foo-bar | head -c 120` still shows `__next_error__` or no `lang=`.

### H-3 (Info, NEW): Bangla project name has no `lang="bn"`
- Evidence: `<h3 class="font-display ...">গ তে গয়না` on `/` and `/work` (live and local), rendered from `src/lib/portfolio.ts:85` by `src/components/home/WorkStack.tsx:89` and `src/components/work/WorkExplorer.tsx:255` and `:329`.
- Impact: proper names are exempt from WCAG 3.1.2, but an English screen-reader voice will skip or garble Bengali script without the hint.
- Fix: add an optional `lang?: "bn"` to the portfolio item type, set it on this item, render `<h3 lang={p.lang}>`. No visual change. Effort S. Owner dev.
- How we'd know it failed: `curl -s https://arrowbin.com/work | grep -c 'lang="bn"'` returns 0.

### H-4 (Info, OPEN): WebSite schema has no `inLanguage`
- Evidence: `websiteSchema()` in `src/lib/schema.ts:81` emits no `inLanguage`; BlogPosting already has `inLanguage: "en"` (`src/lib/schema.ts:348`).
- Fix: add `inLanguage: "en"` to `websiteSchema()`. When the Bangla page ships, its WebPage/Service node gets `inLanguage: "bn-BD"` (section 4). Effort S. Owner dev.
- How we'd know it failed: `curl -s https://arrowbin.com/ | grep -o '"@type":"WebSite"[^}]*'` lacks `inLanguage`.

### H-5 (Info, OPEN): `http://www` takes two hops
- Evidence: `http://www.arrowbin.com/` 301 to `https://www.arrowbin.com/`, which 301s to `https://arrowbin.com/`.
- Fix: one Cloudflare redirect rule sending `http://www.*` straight to `https://arrowbin.com/$path`. Effort S. Owner dev (Cloudflare).
- How we'd know it failed: `curl -sIL http://www.arrowbin.com/ | grep -c '^HTTP'` is greater than 2.

## 3. Pre-launch rules for any second language

1. Pair only true equivalents. The planned Bangla page is a translation of the planned English `/ecommerce-website-development-bangladesh` (content plan section 3.2, scheduled Nov 2026). It is **not** an equivalent of `/services/ecommerce-development` (generic, worldwide, USD). If the Bangla page is ready before its English twin, launch it standalone (self-canonical, no hreflang) and add the pair the day the English page goes live.
2. Translate the whole page: title, description, H1, body, FAQ, CTA labels, form labels and errors, prices (BDT), breadcrumb names, and ideally the nav and footer. A Bangla body inside English chrome is acceptable for a first version but weaker.
3. Each language version is self-canonical. Never canonical the Bangla page to the English one (that tells Google to drop it).
4. Hreflang is a swap signal, not a ranking boost. It only decides which of the two URLs Google shows to a given searcher.

## 4. Exact implementation for the Bangla page

### 4.1 URL pattern and codes

| Version | URL | hreflang | `<html lang>` | `og:locale` |
|---|---|---|---|---|
| English (also x-default) | `https://arrowbin.com/ecommerce-website-development-bangladesh` | `en` | `en` | `en_US` |
| Bangla | `https://arrowbin.com/bn/ecommerce-website-development-bangladesh` | `bn-BD` | `bn-BD` | `bn_BD` |
| Fallback | English URL | `x-default` | | |

Why:
- **Subdirectory `/bn/` on the same domain:** keeps all authority on arrowbin.com, one Search Console property, no ccTLD cost. Not a `bn.` subdomain (splits signals), not `?lang=bn` (Google advises against parameter-based language URLs), not `/bd/` (`bd` is a country code, not a language).
- **ASCII slug, identical to the English slug after `/bn/`:** a predictable 1:1 mapping, and no percent-encoded Bangla URL (`/bn/%E0%A6%87...`) that breaks when pasted into WhatsApp or Facebook. The Bangla keyword belongs in the title, H1 and body, where it counts.
- **`bn-BD`:** ISO 639-1 `bn` + ISO 3166-1 `BD`; the content is Bangladesh-specific (BDT, bKash/Nagad/SSLCommerz, Pathao/Steadfast/RedX, 64 districts), so the region qualifier is accurate. Avoid `bd`, `ben` (ISO 639-2), `bn_BD` (underscore is the Open Graph format, invalid in hreflang) and `bn-BGD`. Optional: also emit `bn` pointing at the same Bangla URL so Bangla searchers outside Bangladesh (West Bengal, diaspora) are matched; one URL may carry several hreflang values. Skip unless wanted.
- **English as `en`, not `en-US`:** this page's English audience is Bangladeshi businesses, diaspora and foreign brands selling into Bangladesh, not only the US.
- **`x-default` = English:** everyone who is neither a Bangla searcher in Bangladesh nor matched otherwise gets English.

### 4.2 Required `<head>` output (identical alternate set on both pages)

English page:
```html
<html lang="en">
<link rel="canonical" href="https://arrowbin.com/ecommerce-website-development-bangladesh"/>
<link rel="alternate" hreflang="en" href="https://arrowbin.com/ecommerce-website-development-bangladesh"/>
<link rel="alternate" hreflang="bn-BD" href="https://arrowbin.com/bn/ecommerce-website-development-bangladesh"/>
<link rel="alternate" hreflang="x-default" href="https://arrowbin.com/ecommerce-website-development-bangladesh"/>
<meta property="og:locale" content="en_US"/>
<meta property="og:locale:alternate" content="bn_BD"/>
```

Bangla page:
```html
<html lang="bn-BD">
<link rel="canonical" href="https://arrowbin.com/bn/ecommerce-website-development-bangladesh"/>
<link rel="alternate" hreflang="en" href="https://arrowbin.com/ecommerce-website-development-bangladesh"/>
<link rel="alternate" hreflang="bn-BD" href="https://arrowbin.com/bn/ecommerce-website-development-bangladesh"/>
<link rel="alternate" hreflang="x-default" href="https://arrowbin.com/ecommerce-website-development-bangladesh"/>
<meta property="og:locale" content="bn_BD"/>
<meta property="og:locale:alternate" content="en_US"/>
```

Expected validation once live:

| Language | URL | Self-ref | Return tags | x-default | Canonical = self |
|---|---|---|---|---|---|
| en | /ecommerce-website-development-bangladesh | yes | yes (bn-BD links back) | yes | yes |
| bn-BD | /bn/ecommerce-website-development-bangladesh | yes | yes (en links back) | yes | yes |

Every other page on the site keeps canonical only, no hreflang.

### 4.3 Next.js 16 code

**Step 1. One source of truth** (`src/lib/site.ts`, next to `pageAlternates`):
```ts
import type { Metadata } from "next";

type Languages = NonNullable<NonNullable<Metadata["alternates"]>["languages"]>;

/** Pages that exist in more than one language. Root-relative paths. */
export const localizedPages = {
  ecommerceBangladesh: {
    en: "/ecommerce-website-development-bangladesh",
    "bn-BD": "/bn/ecommerce-website-development-bangladesh",
  },
} as const;

/**
 * Canonical (always) plus hreflang (only when the page has real translations).
 * x-default always points at the English version.
 */
export function pageAlternates(
  path: string,
  languages?: { en: string } & Languages,
): Metadata["alternates"] {
  if (!languages) return { canonical: path };
  return {
    canonical: path,
    languages: { ...languages, "x-default": languages.en },
  };
}
```
Existing calls `pageAlternates("/x")` keep working unchanged. In metadata, root-relative paths resolve against `metadataBase` (`https://arrowbin.com`).

**Step 2. English page** (`src/app/ecommerce-website-development-bangladesh/page.tsx`, or under `src/app/(en)/` if you take option A in step 4):
```ts
const pair = localizedPages.ecommerceBangladesh;

export const metadata: Metadata = {
  title: "Ecommerce Website Development Company in Bangladesh",
  description: "...",
  alternates: pageAlternates(pair.en, pair),
  openGraph: {
    type: "website",
    url: pair.en,
    locale: "en_US",
    alternateLocale: ["bn_BD"],
    title: "...",
    description: "...",
    images: [defaultOgImage],
  },
};
```

**Step 3. Bangla page** (`src/app/(bn)/bn/ecommerce-website-development-bangladesh/page.tsx`):
```ts
const pair = localizedPages.ecommerceBangladesh;

export const metadata: Metadata = {
  title: "বাংলাদেশে ই-কমার্স ওয়েবসাইট তৈরি", // final copy from the founder, not machine translation
  description: "...",
  alternates: pageAlternates(pair["bn-BD"], pair), // canonical = the Bangla URL itself
  openGraph: {
    type: "website",
    url: pair["bn-BD"],
    locale: "bn_BD",
    alternateLocale: ["en_US"],
    title: "...",
    description: "...",
    images: [defaultOgImage],
  },
};
```

Two traps in the current code that this avoids:
- **Inherited canonical.** The root layout sets `alternates: pageAlternates("/")` (`src/app/layout.tsx`, metadata block). Any page that forgets `alternates` inherits `canonical = https://arrowbin.com`, which would canonicalise the Bangla page to the English homepage. The 404 responses already show this inheritance (`<link rel="canonical" href="https://arrowbin.com"/>` on `/this-page-does-not-exist-xyz`). Always set `alternates` on the Bangla page.
- **Inherited `og:locale`.** If the Bangla page set no `openGraph`, it would inherit `en_US` from the root layout; if it set one without `locale`, it would have none (H-1). Set `locale: "bn_BD"` explicitly.

**Step 4. `<html lang="bn-BD">`.** The root layout hardcodes `lang="en"` (`src/app/layout.tsx:138`), and a nested layout cannot re-render `<html>`. Choose one:

- **Option A (recommended): two root layouts via route groups** (documented in `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route-groups.md`).
  - `git mv` every current route folder plus `page.tsx`, `layout.tsx`, `not-found.tsx`, `error.tsx`, `opengraph-image.tsx`, `icon.svg`, `apple-icon.tsx` into `src/app/(en)/`. Route groups do not change URLs.
  - Create `src/app/(bn)/layout.tsx`: same structure as the English layout but `<html lang="bn-BD">`, Bangla nav/footer strings, and a real Bengali font (for example `next/font/google` Noto Sans Bengali or Anek Bangla with `subsets: ["bengali"]`). The current `anekBangla` file is a 3 KB subset of only the "গ তে গয়না" glyphs (`src/app/layout.tsx:42`) and cannot render a full page.
  - Keep route handlers, metadata routes and `global-error.tsx` (it already renders its own `<html lang="en">`) at the app root: `robots.ts`, `sitemap.ts`, `manifest.ts`, `llms.txt/`, `api/`, `favicon.ico`, `global-error.tsx`. `blog/rss.xml/` simply moves with `blog/` into `(en)/`; its URL does not change.
  - With multiple root layouts there is no single layout for unmatched URLs, so add `src/app/global-not-found.tsx` (with `<html lang="en">`) and `experimental: { globalNotFound: true }` in `next.config.ts` (`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/not-found.md`, marked experimental).
  - Caveat from the docs: navigating between the two groups is a full page load. That is fine for a language switch.
  - After the build, confirm icons, OG image and the static prerender (`x-nextjs-prerender: 1`) still appear on both groups.
- **Option B (stopgap for a single page):** keep the one root layout and wrap the Bangla page content in `<div lang="bn-BD">`. Hreflang still works because Google detects language from visible text. Costs: `<html lang>` stays `en` on a Bangla page (WCAG 3.1.1 fails for that page; Bing loses a language hint), and the nav and footer stay English. Acceptable for a first version only.
- **Do not** set `lang` from client JavaScript, and do not read `headers()` in the root layout to switch `lang`: that makes every page dynamic and loses the static prerender currently served (`x-nextjs-prerender: 1`, `x-nextjs-cache: HIT`).

**Step 5. Sitemap annotations** (`src/app/sitemap.ts`). Next.js writes `alternates.languages` values into the XML verbatim, without resolving `metadataBase` (`node_modules/next/dist/build/webpack/loaders/metadata/resolve-route-data.js`, around line 106), and does not add the self-reference for you, so use absolute URLs and list all three keys:
```ts
import { localizedPages, siteUrl } from "@/lib/site";

const abs = (p: string) => `${siteUrl}${p}`;

const localizedRoutes: MetadataRoute.Sitemap = Object.values(localizedPages).flatMap(
  (pair) => {
    const languages = {
      en: abs(pair.en),
      "bn-BD": abs(pair["bn-BD"]),
      "x-default": abs(pair.en),
    };
    return [pair.en, pair["bn-BD"]].map((p) => ({
      url: abs(p),
      lastModified: new Date("YYYY-MM-DD"), // the real publish date of each version
      alternates: { languages },
    }));
  },
);

return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...localizedRoutes];
```
Expected output (Next adds `xmlns:xhtml` automatically when any entry has alternates):
```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
<url>
<loc>https://arrowbin.com/ecommerce-website-development-bangladesh</loc>
<xhtml:link rel="alternate" hreflang="en" href="https://arrowbin.com/ecommerce-website-development-bangladesh" />
<xhtml:link rel="alternate" hreflang="bn-BD" href="https://arrowbin.com/bn/ecommerce-website-development-bangladesh" />
<xhtml:link rel="alternate" hreflang="x-default" href="https://arrowbin.com/ecommerce-website-development-bangladesh" />
<lastmod>...</lastmod>
</url>
<url>
<loc>https://arrowbin.com/bn/ecommerce-website-development-bangladesh</loc>
<xhtml:link rel="alternate" hreflang="en" href="https://arrowbin.com/ecommerce-website-development-bangladesh" />
<xhtml:link rel="alternate" hreflang="bn-BD" href="https://arrowbin.com/bn/ecommerce-website-development-bangladesh" />
<xhtml:link rel="alternate" hreflang="x-default" href="https://arrowbin.com/ecommerce-website-development-bangladesh" />
<lastmod>...</lastmod>
</url>
</urlset>
```
HTML tags (step 1 to 3) are the primary method for a two-page set. The sitemap block is optional; if you emit both, both come from `localizedPages`, so they cannot disagree (a mismatch between the two methods is the actual risk, not having both).

**Step 6. Language switcher** on both pages, as a plain visible link:
```tsx
<a href="/bn/ecommerce-website-development-bangladesh" hrefLang="bn-BD" lang="bn">বাংলায় পড়ুন</a>
<a href="/ecommerce-website-development-bangladesh" hrefLang="en" lang="en">Read in English</a>
```
No automatic redirect by IP or browser language; at most a dismissible suggestion banner.

**Step 7. Schema.** On the Bangla page, the WebPage and Service nodes get `inLanguage: "bn-BD"`, Bangla `name`/`description`, the same `provider: { "@id": ORG_ID }`, Bangla breadcrumb names, and `priceCurrency: "BDT"` on any offers. The English page uses `inLanguage: "en"`. Do not add a second Organization node.

**Step 8. Everything else on the Bangla page.** Bangla form labels, errors and success text in the brief form; BDT budget chips (see `../11-audit-2026-10-01/sxo.md`, P3 persona); the WhatsApp contact the SXO audit asked for; add the Bangla URL to `src/app/llms.txt/route.ts`. No change to `robots.ts`. Bing Webmaster Tools geo-targeting can stay unset for the domain.

### 4.4 Post-launch checks ("how we'd know it failed")

```
# both pages: exactly 3 hreflang tags, same set, canonical = self
for u in https://arrowbin.com/ecommerce-website-development-bangladesh https://arrowbin.com/bn/ecommerce-website-development-bangladesh; do
  curl -s "$u" | grep -oiE '<html lang="[^"]*"|<link rel="canonical"[^>]*>|<link rel="alternate" hreflang="[^"]*"[^>]*>'
done
# (React writes the attribute as hrefLang; HTML attributes are case-insensitive, hence grep -i)
# no other page carries hreflang
curl -s https://arrowbin.com/sitemap.xml | grep -c 'hreflang='     # expect 6 (3 per URL), only on the two URLs
# lang on the Bangla page
curl -s https://arrowbin.com/bn/ecommerce-website-development-bangladesh | head -c 300 | grep -o 'lang="bn-BD"'
```
Failure signs: a page shows 0 or 2 hreflang tags; the Bangla canonical points at the English URL or the homepage; `lang="en"` on the Bangla page (unless option B was chosen knowingly); Search Console URL Inspection on the Bangla URL reports "Duplicate, Google chose different canonical" (usually means the translation is too thin or the canonical is wrong); hreflang appears on unrelated pages.

| Item | Priority | Status | Effort | Owner |
|---|---|---|---|---|
| Keep monolingual setup as is | Info | Pass | n/a | n/a |
| H-1 og:locale on all pages | Info | OPEN | S | dev |
| H-2 dynamicParams=false on slug routes | Low | OPEN | S | dev |
| H-3 `lang="bn"` on Bangla project name | Info | NEW | S | dev |
| H-4 WebSite `inLanguage` | Info | OPEN | S | dev |
| H-5 single-hop http://www redirect | Info | OPEN | S | dev |
| Bangla page: English twin first, then pair | Info | Plan | M | founder |
| Bangla page: steps 1 to 8 | Info | Plan | M (option B) / L (option A) | dev |
