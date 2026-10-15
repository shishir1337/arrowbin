
## A1 structure + metadata

**Verification:** `pnpm tsc --noEmit -p .` passes and `pnpm biome check` is clean on every changed file. A grep for the em dash character (U+2014) finds nothing in the changed files; I also fixed two old em dashes in a layout.tsx comment. I did not build. Expected HTML below comes from reading the Next 16.2.9 docs and source (`lib/metadata/resolve-metadata.js`, `lib/metadata/metadata.js`, `server/app-render/app-render.js`). Uncommitted changes already in these files were kept.

### Files changed
- **`src/lib/metadata.ts` (new).** `pageShare({ path, title, description, image? })` returns three complete objects:
  - `alternates`: canonical from `pageAlternates()` plus the RSS `types` link.
  - `openGraph`: type website, siteName, locale `en_US`, url = the page path, title, description, and an image with alt (default `defaultOgImage`).
  - `twitter`: card with site/creator `@Arrowbinllc` and the same title, description and image.
  - Also exports `ogLocale`, `xHandle` and `feedAlternate`.
  - Why it exists: Next merges metadata shallowly, so a page's `openGraph`, `twitter` or `alternates` replaces the root object completely.
- **`src/app/layout.tsx`.**
  - Root `alternates` is now only `{ types: feedAlternate }`, with no canonical.
  - Root `openGraph` no longer has `url`, so the 404 does not claim the homepage URL. Locale and handles come from the helper constants.
- **`src/app/not-found.tsx`.** `robots: null`.
  - Next adds its own `<meta name="robots" content="noindex">` to every 404 (the `NonIndex` component in app-render, and the server-inserted HTML for `notFound()`).
  - `null` replaces the root robots during the shallow merge, and the robots renderer outputs nothing for null.
  - Result: exactly one robots meta (`noindex`) and no canonical.
- **`src/app/page.tsx` (metadata only).** Uses `pageShare("/")`, so home keeps the canonical (`https://arrowbin.com`) and the RSS link it used to inherit from the root. Its X card gains site/creator and image alt. I removed the unused `Suspense` import. The page body is untouched.
- **`src/app/services/page.tsx`.** Removed 5 Suspense wrappers (ServiceIndex, Capabilities, Engagement, Faq, Cta) and switched to `pageShare`.
- **`src/app/services/[slug]/page.tsx`.**
  - Removed all 28 Suspense wrappers: ServiceSignature, Faq and Cta in each of the 9 body branches, plus StoreAnatomy on e-commerce.
  - Added `export const dynamicParams = false`.
  - Switched to `pageShare`. The image now has alt `Arrowbin service: <heading>`, so `og:image:alt` and `twitter:image:alt` are output.
- **`src/app/about/page.tsx`.** Removed the Suspense around Cta and switched to `pageShare`.
- **`src/app/work/page.tsx`.** Removed the Suspense around Cta and switched to `pageShare`. This page was not in the brief, but verify-live section 12 checks every sitemap URL for hidden blocks.
- **`src/app/contact/page.tsx`.** Switched to `pageShare`, which adds type, siteName, locale and its own X card.
- **`src/app/privacy/page.tsx`.**
  - Title is "Privacy Policy: How Arrowbin Handles Your Data". The template renders "... | Arrowbin" (57 chars).
  - og:url is now `/privacy`.
  - Description unchanged (144 chars).
- **`src/app/terms/page.tsx`.**
  - Title is "Terms of Service for Arrowbin Projects". It renders "... | Arrowbin" (49 chars).
  - og:url is now `/terms`.
  - New description (149 chars): "The terms for using the Arrowbin website and how our software development projects are agreed: quotes, signed agreements, IP ownership and liability."
- **Project name components:** `src/components/work/WorkExplorer.tsx` (grid card h3 and index row), `src/components/home/WorkStack.tsx` and `src/components/services/ServiceProof.tsx`.
  - They now add `lang="bn"` when the name contains Bengali script (U+0980 to U+09FF). Only গ তে গয়না matches.
  - Biome rewrote the regex's `\u` escapes as literal characters. It behaves the same.

### Why the Suspense boundaries existed
- Commit 8821609 added them to split hydration (one hydration task per section).
- Nothing inside them reads search params, cookies or headers, or waits on data. Each is a sync server component or a client island.
- React's prerender streamed each wrapped section as a `<div hidden id="S:...">` block after `</main>`. Unwrapped, the HTML sits inline in document order.
- Suspense adds no DOM element, so the final page looks the same.
- Trade-off: each page now hydrates in one task. FIX-PLAN P2.1 says to measure TBT (median of 3 Lighthouse runs) on /services and one service page. If TBT rises, split client components; do not put Suspense back.
- Without boundaries, a hydration mismatch would no longer stay inside one section. I checked the newly unwrapped client components for render-time `window`, `Math.random` and `Date` use and found none.

### Canonical check
- Every page sets its own canonical through `pageShare`, which calls `pageAlternates()`:
  - Home, /services and all 8 service pages.
  - /work, /about, /contact, /privacy and /terms.
- /blog and /blog/[slug] (A4) set it with `pageAlternates()` directly.
- The 404 has no canonical.

### Expected changes after build
- **404 page:** no canonical, one robots meta (`noindex`) and no og:url. It keeps the RSS alternate link.
- **`/services/<unknown>`:** returns a real 404 that renders the root not-found page with `<html lang="en">`.
- **Open Graph:** og:locale `en_US` on every page I own, and og:url equals the page's own URL.
- **RSS link:** now on every page I own. Before, only home, privacy, terms, the 404 and /blog had it.
- **X cards:** twitter:title and twitter:description on /services, /work, /about, /contact, /privacy and /terms used to be the homepage's (inherited from root). Each page now has its own.

### For A4 / the lead
- **Blog Open Graph:** `/blog` and `/blog/[slug]` have no og `locale` and no `siteName`. The blog index also has no og `type`. Verify-live section 10 checks /blog for og:locale.
  - The blog index can use `pageShare`.
  - Posts need `type: "article"`, so they should build their own object with `ogLocale`, `xHandle` and `feedAlternate` from `@/lib/metadata`.
- **Blog X cards:** blog post cards have no site/creator, because a page-level `twitter` replaces the root one.
- **Still open in A4's files:**
  - One Suspense each in `blog/page.tsx` and `blog/[slug]/page.tsx`.
  - `dynamicParams` on the blog slug route.
  - An em dash in a code comment in `blog/[slug]/page.tsx` (around line 49).

### Not done
- **`src/app/services/[slug]/opengraph-image.tsx`:** left unchanged. Its exported `alt` ("Arrowbin service") is never used, because file-based images only apply when the page omits `openGraph.images`, and the page sets it.
  - Optional: also add `dynamicParams = false` there, so unknown-slug image URLs return 404 instead of a generic card.
- **Project `lang` field:** a `lang?: "bn"` field on `Project` in `src/lib/portfolio.ts` (not my file) would be cleaner than the script check.

### Needs the founder's eyes
- **Privacy and Terms titles:** I kept the " | Arrowbin" template, matching the services, work and service pages. So "Arrowbin" appears twice, e.g. "Privacy Policy: How Arrowbin Handles Your Data | Arrowbin". To avoid the repeat, switch to `{ absolute: ... }` as /about and /contact do (46 and 38 chars).
- **/terms meta description:** new wording (quoted above).


## A2 schema + social + keywords

**Verification:**
- `pnpm tsc --noEmit -p .` passes (exit 0, whole project).
- `pnpm biome check` is clean on my 5 files. `--write` only re-wrapped one line in services.ts.
- No em dashes in my 5 files. I also replaced 9 old em dashes in code comments in schema.ts, site.ts and services.ts.
- No U+2011 left in ServiceValue.tsx. No `in/arrowbinllc` anywhere in `src/` or `public/`.
- JSON-LD check: I ran the real builders under Node (type stripping) for /, /services, a service page, /about, /work, /blog and a post. Each run merged the layout nodes with the page nodes. Results:
  - 0 dangling `@id` references.
  - `#founder` appears twice on /about and on posts. The shared values are identical; /about adds only `email`.
  - The Dhaka node has no hours and no street.
  - No one-item BreadcrumbList.
- No build was run. Uncommitted changes already in these files were kept.

### Files changed
- **`src/lib/site.ts`**
  - Removed the placeholder LinkedIn (`linkedin.com/in/arrowbinllc`) from `site.socials`. A comment above the array gives the exact entry to add back once the company page exists, and says to append the same URL to `sameAs`.
  - `sameAs` is unchanged: GitHub, Facebook, Instagram, X. Its comment now says to add the Clutch profile once it has been claimed. **Clutch is not added:** clutch.co/profile/arrowbin-0 exists but is unclaimed.
  - Dhaka office: `streetAddress: "Mohammadpur"` is now `undefined`. The comment says a neighbourhood is not a street address; add the real street line once the founder confirms it (D8).
  - New `site.slogan: "Software that moves."` (the homepage hero and footer line).
  - Changed `site.description`. It feeds the Organization and WebSite descriptions, the root default meta/OG/X description, the manifest and the llms.txt blockquote.
    - Old: "Arrowbin is a software development company. We build custom software, web & mobile apps, SaaS, AI automation and cloud solutions for clients worldwide."
    - New (160 chars): "Arrowbin is a software development company for startups and SMBs worldwide. We build custom software, web & mobile apps, SaaS, AI automation and cloud services."
- **`src/lib/schema.ts`**
  - **Founder node.** New private `founderNode()`: a Person with `@id` `#founder`, plus name, jobTitle, image, url, sameAs (the founder's LinkedIn only) and `worksFor` pointing to `#organization`.
  - **Where it is used:**
    - `Organization.founder` embeds it. The layout emits Organization on every page, so the reference resolves sitewide with no layout or page change.
    - `founderSchema()` (/about) is `founderNode()` plus `email`.
    - `BlogPosting.author` is `founderNode()` when the byline is the founder. Any other byline gets a plain `{Person, name}` with no `@id`, so it never merges into the founder.
    - Because every copy comes from one function, the values cannot drift. There is one definition per page graph, with no conflicting values.
  - **Organization:**
    - Added `slogan`.
    - `knowsAbout` is now exactly the 8 services: "Web application development" became "E-commerce development", and "Cloud and DevOps" became "Cloud, DevOps and hosting".
    - Checked and unchanged: `foundingDate` "2020", logo ImageObject 512x512, email, 2 contactPoints, `areaServed` "Worldwide". There is no Review or AggregateRating markup.
  - **WebSite:** added `inLanguage: "en"`.
  - **`breadcrumbSchema`:** a trail with fewer than 2 items now returns `{"@context":"https://schema.org","@graph":[]}`. That is valid JSON-LD with zero nodes, so `/` no longer emits a one-item BreadcrumbList and page.tsx did not need to change. The return type is now `Record<string, unknown>`.
  - **`serviceListSchema`:** added `@id` `/services#list`, name "Arrowbin software development services" and `numberOfItems`. Each Service item now carries `@id` `/services/<slug>#service`, the same `@id` as on the detail pages.
  - **`workListSchema`:** added `@id` `/work#list`, name "Arrowbin client work" and `numberOfItems`.
  - **`collectionPageSchema`:** `hasPart` items now have `@id` `/blog/<slug>#article`, matching the BlogPosting `@id`.
  - **`localBusinessSchema` (Dhaka):** removed `openingHoursSpecification`; a comment says to add hours back only once they are published. The street address is gone via site.ts. `geo` is kept (see the founder list).
  - **`blogPostingSchema`:**
    - Added `@id` `<url>#article`.
    - `mainEntityOfPage` is now `{"@type":"WebPage","@id":<url>}`.
    - The author now has `jobTitle` and `worksFor`.
    - Already in place: `dateModified` comes from `updated ?? date` (the page passes it), `inLanguage: "en"`, and an image with 1200x630.
- **`src/components/services/ServiceValue.tsx`**
  - The "What is …?" H2 no longer swaps "-" for U+2011.
  - Hyphenated words (today only "E-commerce") are wrapped in `<span className="whitespace-nowrap">`; all other names render as plain text.
  - Line breaking is the same as before.
- **`src/lib/services.ts`:** titles, hero intros, answer blocks and filler words (full list below).
- **`src/components/layout/Footer.tsx`:** no edit needed.
  - It renders `site.socials`, so the icon row now shows 3 icons (Facebook, Instagram, X) instead of 4.
  - The row is a left-aligned flex row of fixed 44px circles, so nothing else moves.

### Titles (rendered with " | Arrowbin")
All 8 titles are unique, at or under 59 characters, and each holds its keyword-map head term.

| Service | Old | New | Chars |
|---|---|---|---|
| E-commerce | E-commerce Website Development Services | E-commerce Development Company for Online Stores | 59 |
| AI | AI Automation Services & AI Agent Development | AI Automation Agency for Small Businesses | 52 |
| UI/UX | UI/UX Design Services for Web & Mobile Apps | UI/UX Design Agency for Web & Mobile Apps | 52 |
| Cloud | Cloud & DevOps Services and Managed Hosting | DevOps Consulting Services & Cloud Hosting | 53 |
| Custom | Custom Software Development Company & Services | unchanged | 57 |
| Mobile | Mobile App Development Company: iOS & Android | unchanged | 56 |
| SaaS | SaaS Development Company: From MVP to Scale | unchanged | 54 |
| Maintenance | Software Maintenance & Support Services | unchanged ("&" for "and") | 50 |

The cloud title changed because the keyword map's head term is "devops consulting services", and the old title did not contain it.

### Hero intros (`intro`)
Sentence one now holds the head term on all 8 pages. The H1s are unchanged. The number in brackets is the change in characters.

- **Custom (+4).**
  - Old: "Off-the-shelf tools force your business to bend around their limits. We build custom software that fits the way you actually work. That means cutting out manual steps, connecting the systems you already use, and giving you a platform that grows as you do."
  - New: "Arrowbin is a custom software development company for teams that have outgrown off-the-shelf tools. We build software that fits the way you work: cutting out manual steps, connecting the systems you already use, and giving you a platform that grows as you do."
- **E-commerce (-18).**
  - Old: "Your storefront is your hardest-working salesperson. We build fast, conversion-focused e-commerce, whether that's a Shopify store, a headless storefront or a fully custom commerce platform. Every decision comes back to one thing: turning visitors into customers."
  - New: "Arrowbin is an e-commerce development company that builds fast, conversion-focused online stores: headless storefronts, Shopify stores and fully custom commerce platforms. Every decision comes back to one thing: turning visitors into customers."
- **Mobile (+11).**
  - Old: "We design and build mobile apps people actually want to open: fast, intuitive and reliable across devices. With cross-platform tools we ship native-quality iOS and Android apps from one codebase, which keeps both your cost and your time to market down."
  - New: "As a mobile app development company, we design and build apps people want to open: fast, intuitive and reliable across devices. With cross-platform tools we ship native-quality iOS and Android apps from one codebase, which keeps your cost and time to market down."
- **SaaS (+5).**
  - Old: "Building a SaaS product is a long run of engineering decisions, most of them easy to get wrong. We act as your product engineering team: we validate an MVP quickly, then scale it with the multi-tenancy, billing, security and observability a real SaaS business depends on."
  - New: "We're a SaaS development company that works as your product engineering team through a long run of decisions, most of them easy to get wrong. We validate an MVP quickly, then scale it with the multi-tenancy, billing, security and observability a real SaaS business depends on."
- **UI/UX (-3).**
  - Old: "Great design is invisible. It just works, and users rarely notice the thought behind it. We combine user research, clean visual design and UX patterns that have earned their keep to create interfaces that feel effortless, build trust and turn visitors into customers."
  - New: "As a UI/UX design agency, we aim for design users never notice because it just works. We combine user research, clean visual design and UX patterns that have earned their keep to create interfaces that feel effortless, build trust and turn visitors into customers."
- **AI (-21).**
  - Old: "AI is only useful when it solves a real problem. We build practical AI automation: assistants, agents, document processing and LLM integrations that take repetitive work off your team's plate and surface the insights buried in your data."
  - New: "Arrowbin is an AI automation agency for small businesses, and we only build AI that solves a real problem: assistants, agents, document processing and LLM integrations that take repetitive work off your team's plate."
- **Cloud (+21).**
  - Old: "Slow deploys and fragile servers hold good products back. We build cloud infrastructure that's secure, automated and ready to scale, with CI/CD pipelines, monitoring and managed hosting that keep your product fast and online."
  - New: "Our DevOps consulting services fix the slow deploys and fragile servers that hold good products back. We build secure, automated cloud infrastructure that's ready to scale, with CI/CD, monitoring and managed hosting that keep your product online."
- **Maintenance (+17).**
  - Old: "Software is never really finished. We keep your applications secure, fast and reliable with proactive maintenance: applying updates, fixing issues, watching performance and shipping a steady stream of improvements so your product keeps getting better long after launch."
  - New: "Because software is never finished, our software maintenance and support services keep your applications secure, fast and reliable: applying updates, fixing issues, watching performance and shipping a steady stream of improvements so your product keeps getting better long after launch."

### Answer blocks (`serviceExtras.answer`)
This is the paragraph under "What is …?" (`#service-answer`, the speakable target). The data model already had this field, so no new UI was added. Each block keeps its definition first, then adds what Arrowbin builds, for whom, and a typical timeline. Every block is now 47 to 53 words. The timelines come from each page's own FAQ, outcomes or process durations.

- **Custom.**
  - Old ending: "...your workflows, your data, your users. Instead of bending your team to fit a generic, off-the-shelf tool, the software fits the business."
  - New ending: "...your workflows, your data, your users. Arrowbin builds web platforms, internal tools and system integrations for startups and growing businesses, and a usable first version usually takes 6–12 weeks, with you owning all the code."
- **E-commerce.**
  - Old ending: "...the integrations behind them. The whole point is turning visitors into paying customers."
  - New ending: "...the integrations behind them. Arrowbin builds headless, Shopify and custom stores for brands and retailers: a Shopify store typically launches in 3–6 weeks, and a headless storefront in about 8–12."
- **Mobile.** Old was one sentence. Added: "Arrowbin builds them for startups and businesses taking a product to mobile, and a focused MVP usually reaches the stores in 10–16 weeks."
- **SaaS.** Added: "Arrowbin builds SaaS MVPs for founders and for teams turning an internal tool into a product; a focused MVP usually launches in 8–14 weeks."
- **UI/UX.** Added: "Arrowbin designs web and mobile apps for founders and product teams, and a focused product or website usually takes 4–8 weeks from research to dev-ready designs."
- **AI.**
  - Old ending: "...to chat and decision support, so they can spend their time on higher-value work."
  - New ending: "...to chat and decision support. Arrowbin builds it for small and growing businesses: a working prototype on your real data usually takes 2–3 weeks, and taking it into production another 3–6."
- **Cloud.** Added: "Arrowbin does this for teams with slow or fragile deployments: a typical setup takes 4–7 weeks from first review to automated deploys, then we keep it running."
- **Maintenance.**
  - Old ending: "...and ongoing improvements, so it keeps earning its keep."
  - New ending: "...and ongoing improvements. Arrowbin runs it as a monthly plan for teams without in-house engineers or with inherited software: onboarding takes about a week, then the plan runs month to month."

### Filler-word trims (services.ts)
- Custom FAQ (build vs buy): "We'll give you an honest recommendation on the discovery call, even if it's to buy." -> "We'll tell you which on the discovery call, even if the answer is to buy."
- Mobile process "Develop": "...on real devices, where bugs actually show up." -> "...on real devices, where the bugs show up."
- SaaS process "Build MVP": "We ship a focused first version you can actually sell." -> "We ship a focused first version you can start selling."
- UI/UX FAQ: "...whether people can actually get things done." -> "...whether people can get things done."
- UI/UX FAQ question: "What will we actually receive?" -> "What will we receive?"
- AI FAQ question: "What can AI automation actually do for my business?" -> "What can AI automation do for my business?"
- Cloud process "Assess": "We review your current setup and figure out what it actually needs." -> "We review your current setup and work out what it needs."
- The intros above also lose "actually" (custom, mobile) and "really" (maintenance).
- Result: services.ts now has 0 hits for actually / Here's / honest / honestly / seamless / robust / leverage / cutting-edge.
- `ai_tells.py` on services.ts finds no HARD issues. It gives two file-wide WARNs, for sentence-length spread and "X, Y and Z" triplets, mostly from the existing FAQs and lists.

### Needs the lead (files I do not own)
1. **`src/app/blog/page.tsx` (A4/lead).** In the `collectionPageSchema({...})` call, change `name: "Blog & Insights | Arrowbin",` to `name: "Arrowbin Blog",`.
2. **`src/app/page.tsx` (optional cleanup).** The builder already outputs an empty graph for the one-item trail. You can delete the line `breadcrumbSchema([{ name: "Home", path: "/" }]),` from the JsonLd array and drop `breadcrumbSchema` from the import.
3. **llms.txt owner.** `site.description` changed (it is interpolated in the llms.txt blockquote). It now matches the homepage title.
4. **`layout.tsx`:** no change needed, because the founder is embedded in Organization.

### Needs the founder's eyes
- **Copy and voice.** Every change listed above.
- **Cloud timeline "4–7 weeks".** I added this number myself. It is the sum of the cloud page's own process durations (Assess 1 week + Design 1–2 + Automate 2–4). Confirm it or give a real number.
- **AI page wording.** It now says "for small businesses" (title from the plan) and "small and growing businesses" (answer). The meta description still says "growing businesses".
- **E-commerce order.** The intro now lists headless storefronts before Shopify, and the answer block uses the same order. The portfolio has no Shopify store (`page-ecommerce.md`).
- **Dhaka node.** The geo pin (23.766, 90.359, area-level Mohammadpur) is kept on the Dhaka ProfessionalService node; confirm or drop it. Please also send the full street line and real hours, if any (D8).
- **Social profiles.**
  - LinkedIn: create the company page (P1.4), then add it to `sameAs` and the footer.
  - Clutch: claim and correct clutch.co/profile/arrowbin-0 (P1.3), then add it to `sameAs`.
- **Visual effects of the copy changes** (no styling was changed):
  - The hero intros changed by -21 to +21 characters, so a hero paragraph may gain or lose one line at some widths.
  - The 8 answer paragraphs grew by about 13 to 25 words, which adds about 1 to 2 lines in the "What is …?" block.
  - The display font Anybody has no U+2011 glyph (I checked the cmap of the built woff2 files). So the old "What is E‑commerce Development?" H2 drew its hyphen from a fallback font. It now uses Anybody's own hyphen. Line breaks are the same, but the hyphen glyph may look slightly different. Worth a glance at /services/ecommerce-development on :3001.
- **AI-sounding phrases I left alone** (not on my list): "Blazing fast" (e-commerce benefit title), "not just bug fixes" (maintenance benefit), "peace of mind" (cloud "Is this for you?"), "really use the product" (SaaS process), "feel effortless" (UI/UX intro).

## A3 AI readiness + forms + tracking

Scope: FIX-PLAN P2.9, P2.13 and the non-visual part of P2.10 (agentic.md A-3 to A-8, A-10, A-11). No visual changes, no git, no build. `pnpm tsc --noEmit -p .` passes for the whole project; `pnpm biome check` is clean on every file below; no em dashes in any file I own.

### Files changed
- `src/app/llms.txt/route.ts` (rewritten): llmstxt.org layout. H1, a blockquote that opens with "a software development company for startups and SMBs", founded 2020 by Md. Shishir Ahmed, clients worldwide (no offices). Then a "Key facts" list (company, founder and lead engineer, 2020, the 8 services as links, how an engagement works, typical timeline, code ownership, reply time, email), "Start a project" (Cal.com booking link and `/contact#brief` brief link, so agents can act), Services, "Explore the site" (/services, /work, /about, /contact, /blog, RSS feed), Guides (still mapped from `sortedPosts`, so new posts appear automatically), Partnerships, and Optional (llms-full.txt, privacy, terms).
- `src/app/llms.txt/content.ts` (new, shared by both llms routes so they state the same facts): every fact is copied from existing site copy, with the source noted in comments (Engagement.tsx, home Process and Numbers, custom software FAQ, MVP guide TL;DR, /contact). The comment for the D4 price bands sits inside `keyFacts()`. No prices were added.
- `src/app/llms-full.txt/route.ts` (new): one Markdown digest generated from `services.ts` (summary, "what it is" answer, intro, deliverables, tech, process, FAQs), `portfolio.ts` (name, URL, blurb, tags; the `result` outcome lines are left out) and `blog.ts` (title, URL, dates, TL;DR, takeaways, FAQs). Site-relative links become absolute. Served as `text/plain; charset=utf-8`, `public, max-age=3600`, force-static. It is about 39 KB today.
- `src/app/robots.txt/route.ts` (new) replaces `src/app/robots.ts` (deleted). Next's `MetadataRoute.Robots` cannot write custom lines. Same 12 groups, same `Allow: /` + `Disallow: /api` order, same Sitemap line, Claude-SearchBot kept. Each group now has `Content-Signal: search=yes, ai-input=yes, ai-train=yes`. Same headers Next used before (`text/plain`, `public, max-age=0, must-revalidate`). Checked with Python's robotparser: all 12 groups parse and the Sitemap line is found.
- `src/components/contact/ContactBrief.tsx`: name, email and message get `aria-required="true"` (the form keeps `noValidate` and its own messages). The red asterisks are `aria-hidden`, so the fields are named "Name", "Email", "About the project". Each chip fieldset is named by its legend text through `aria-labelledby`, with "pick any" as `aria-describedby`, which fixes "What do you need?pick any". The honeypot is renamed from `company_website` to `hp_trap`, with `type="text"`, `autoComplete="off"`, `data-1p-ignore` and `data-lpignore`. It is still off-screen and `aria-hidden`, with label "Leave this field empty". `generate_lead` now goes through `track()`.
- `src/components/services/ServiceQuoteForm.tsx` (the service hero quote form): the success card is now an `<output>` (implicit `role="status"`, still `display:block`), `tabIndex={-1}`, named by its heading. It gets focus with `preventScroll` when the submit succeeds. `focus-visible:outline-none!` and `focus-visible:rounded-[1.75rem]!` stop the global unlayered `:focus-visible` rule (outline plus a 4px radius) from changing the card when it gets focus from the keyboard. I checked that Tailwind 4.3.1 emits both as `!important`. The asterisks are `aria-hidden`; the fields already had `required`. The honeypot rename matches the brief form (id `hero-hp`). `generate_lead` now goes through `track()`. Two em dashes in comments were removed.
- `src/app/api/contact/route.ts`: the honeypot check covers `hp_trap` and the old `company_website`, so cached pages stay protected (the comment says the old name can go in 2027). Any non-blank value counts as a hit, including non-string values, which is slightly stricter than before. Bots still get a fake `{ ok: true }`. Each hit is logged with the field name only, so a lead dropped by mistake now shows up in the logs. One em dash in a comment was removed. Tested with a node script, with `RESEND_API_KEY` unset so no email can be sent: an empty trap gives a stubbed success, a filled `hp_trap` or `company_website` is dropped, whitespace passes, a non-string is dropped, and a missing message gives 422.
- `src/components/analytics/track.ts` (new): `track(name, params)` calls `window.gtag`. Because GA loads `lazyOnload`, events sent before gtag exists (FCP, TTFB, a quick quote submit on a slow connection) wait in a queue and flush when gtag appears, for up to 60 s. The queue only runs once `enableTracking()` has been called, so dev builds stay inert. A node test confirmed the queue keeps event order and flushes correctly.
- `src/components/analytics/AnalyticsEvents.tsx` (new, client): one delegated capture listener for click and middle-click. It sends `book_call_click` for cal.com links (`link_url`, `link_text`, `link_location` = header/menu/main/footer) and `contact_click` with `method` = email / phone / whatsapp for `mailto:`, `tel:`, `wa.me` and whatsapp.com links. Web vitals use `useReportWebVitals` from `next/web-vitals` (Next 16 docs read), with a stable module-level callback, for CLS, INP, LCP, FCP and TTFB only. Each event carries `value` (the delta, CLS x1000), `metric_id`, `metric_value`, `metric_delta`, `metric_rating` and `non_interaction`.
- `src/components/analytics/GoogleAnalytics.tsx`: renders `<AnalyticsEvents />`, so it only runs when the layout renders GA. The two `lazyOnload` scripts are unchanged. I corrected the comment, which claimed gtag exists before load, and removed its em dashes.
- `src/components/contact/CopyEmail.tsx`: a successful copy sends `contact_click` with `method: "email_copy"`, which is a separate action from the mailto click.
- `public/.well-known/security.txt` (new, RFC 9116): Contact `mailto:hello@arrowbin.com`, Expires `2027-10-15T00:00:00.000Z`, Preferred-Languages `en`, Canonical. `src/proxy.ts` will not 410 it (its matcher lists only the old marketplace paths) and `next.config.ts` has no redirect for it. Next's static server allows the dot folder: `send` only hides dotfiles when the final segment starts with a dot. It is not gitignored.

### generate_lead
Both forms already fired `generate_lead` once on success. I kept exactly one call in each and routed it through `track()` so it is not lost if gtag has not loaded yet. Nothing fires it twice.

### Not done / out of scope
- The "How did you hear about us?" select (visible field, needs the founder) and the confirmed-booking signal (a Cal.com webhook or a redirect-back thank-you page) from P2.10. Neither was in my brief.
- `src/lib/email/templates.ts` did not need changes.
- `src/components/sections/HeroLeadForm.tsx` is dead code (nothing imports it) and still uses `company_website`. The route still rejects that name, so it is harmless. Deleting the file is the clean fix (not my file).

### Needs the founder's eyes
- **Training signal (D2):** robots.txt now says `ai-train=yes` in every group, but Cloudflare still returns 403 to GPTBot, ClaudeBot, CCBot and Amazonbot (agentic.md A-2). Either allow them at Cloudflare, or change one line (`CONTENT_SIGNAL` in `src/app/robots.txt/route.ts`) to `ai-train=no`. With option 2, also add `Disallow: /` for the training bots.
- **Prices:** llms.txt adds no price bands (waiting on D4; the comment in `content.ts` marks where they go). llms-full.txt repeats the price figures already on the site: the service FAQs (for example "$8,000 ... to $75,000+") and the cost guide's labelled estimates. If those change, the digest follows automatically.
- **Unverified portfolio claims:** `src/lib/portfolio.ts` still has "across all 64 districts" (FlexOver blurb) and "Online ordering live in 8 weeks" (North Bengal result). Both are on the banned list. llms-full drops the outcome lines and strips the "64 districts" clause, but the /work page still shows them. The owner of portfolio.ts should fix this.
- **Existing keyboard-only glitch (not changed):** the /contact success `<output>` has `outline-none rounded-[2rem]`, but the global unlayered `:focus-visible` rule in `globals.css` beats both. Keyboard users who submit the brief therefore see a focus ring and 4px corners on the success card. The fix is to add `focus-visible:outline-none! focus-visible:rounded-[2rem]!` to that card. I left it alone because it changes what that flow looks like, so it needs approval.
- **GA4 setup:** to report on the new parameters, register custom dimensions for `method`, `link_location`, `metric_rating` and `metric_id`, and mark `generate_lead` (and probably `book_call_click`) as key events. Web vitals add Next's bundled web-vitals code (a few KB) to the client JS when GA is on.
- **Optional robots tweak:** groups keep `Allow: /` before `Disallow: /api` as before. Google and other RFC 9309 parsers use the longest match, so `/api` stays blocked. First-match parsers such as Python's robotparser read `/api` as allowed. Putting the Disallow line first would satisfy both. I kept the old order because the brief said to keep the rules exactly.

### Verify after deploy
`curl -s https://arrowbin.com/robots.txt | grep -c Content-Signal` should print 12, the same as the User-Agent count. `curl -s https://arrowbin.com/llms.txt | grep -c cal.com/arrowbin` should print 1 or more. `/llms-full.txt` and `/.well-known/security.txt` should return 200. `grep -c 'aria-required="true"'` on /contact should print 3. verify-live.sh section 9 covers these checks.

## R1 research

**Files written:** `topic-research.md` (trend evidence with sources and dates, 15 scored candidates, top 5 and backups) and 7 briefs in `briefs/`: the top 5 plus backups 1 and 2. No code or git changes.

### Top 5 (priority order)
| # | Slug | Primary keyword | Why |
|---|---|---|---|
| 1 | `vibe-coded-app-production-ready` | vibe coded app production ready | Clearest 2026 buyer trend (Collins Word of the Year 2025, CVE-2025-48757, Wiz/Moltbook Feb 2026). Results are all tool or agency pitches; no big agency owns it. Feeds custom software, SaaS and maintenance. |
| 2 | `wordpress-to-nextjs-migration` | wordpress to next.js migration | Deepest first-hand experience: every portfolio site, plus arrowbin.com's own 308 redirects and 410s. Results are small agencies, two gig listings and a content farm. |
| 3 | `payment-gateway-integration-bangladesh` | payment gateway integration bangladesh | Bangladesh buyers. Primary sources (SSLCommerz docs and pricing, bKash developer portal, Bangladesh Bank MFS data) beat thin plugin pages and old listicles. Live proof: two rebuilt stores show COD, bKash, Nagad and cards. |
| 4 | `ai-agent-cost-small-business` | how much does an ai agent cost for a small business | 2026 trend with buyer intent. Running costs are worked out from Anthropic's and Google's own price lists, which no competitor does. Gives /services/ai-automation its first blog links. |
| 5 | `chatgpt-shopping-for-online-stores` | how to get products on chatgpt shopping | 2026 trend (OpenAI's March pivot to merchant checkout, Shopify Agentic Storefronts, UCP). The gap is stores not on Shopify, which is who Arrowbin builds for. |

### Backups (priority order)
1. `shopify-vs-custom-ecommerce` (brief written): planned P1, Low difficulty. Has correct fee maths from Shopify's pricing page and a Bangladesh section (no Shopify Payments).
2. `mvp-development-cost` (brief written): planned P1. **Cannibalisation note:** the live cost post already publishes MVP ranges and a $60,000 SaaS MVP example, so this post must reuse those Arrowbin estimates and go deeper on MVP-only questions.
3. `software-maintenance-cost`: feeds /services/maintenance-support.
4. `courier-api-integration-bangladesh` (Steadfast, Pathao, RedX): almost no editorial results, only packages and plugins.
5. `saas-development-cost`: feeds /services/saas-product-engineering.

### Limits and things the founder should see
- No keyword-volume or Google Trends access tonight. Volumes are unmeasured, and trend scores are judgment from dated sources and how fresh the results are.
- Pages that blocked or timed out, so their figures must not be cited: OpenAI's Instant Checkout post (403), Upwork State of AI in SMBs (403), bKash merchant pricing page (403), Adobe's AI-traffic blog and PDF (timed out), and the dev.to WordPress migration cost post (404). Each brief has a "do not claim" list.
- Founder questions:
  - Which gateway and courier APIs sit behind each Bangladesh store?
  - What are our own week and price ranges for WordPress to Next.js rebuilds?
  - Has Arrowbin ever taken over an AI-built codebase? If not, post #1 stays a checklist, not a case study.
- flexoverbd.com says "Cash on delivery available in all 64 districts". Sprint rules ban that claim for Arrowbin, so the briefs tell writers not to repeat it.

## A4 blog plumbing + links

Checks run: `pnpm tsc --noEmit -p .` passes (0 errors). `pnpm biome check --write` on the 11 changed source files is clean. A grep for the em dash character finds 0 in every changed file, including the 3 posts and the 19 new SVGs. Each SVG was rendered to PNG with sharp and checked by eye. I did not build or run anything.

### Files changed
- `src/app/blog/page.tsx`: removed the `<Suspense>` around `<Cta>` (the boundary came in with aaf3e82. Its only effect was that the closing CTA streamed as a hidden block after `</main>`. The home page had already dropped it for the same reason). Metadata now uses A1's `pageShare()`, which gives canonical + RSS alternate, og:url `/blog`, og:locale en_US, siteName, og:image with alt, and an X card. The `<title>` text is unchanged. CollectionPage name is now "Arrowbin Blog".
- `src/app/blog/[slug]/page.tsx`: removed the `<Suspense>` around `<Cta>`. Added `export const dynamicParams = false` (Next 16 docs: valid because cacheComponents is off; unknown slugs return 404). Metadata: canonical + RSS alternate, og type article, siteName, locale (`ogLocale`), url = page path, publishedTime, modifiedTime (`updated ?? date`), authors, section, og:image with a per-post alt, and an X card with site/creator (`xHandle`). Note: the page sets `openGraph.images`, so Next does not apply the file-based `opengraph-image` alt. The per-post alt is the one emitted. "Keep reading" now uses `relatedPosts(post, 3)`. The grid adds `lg:grid-cols-3` only when there are 3 cards, so today's 2-card layout is unchanged. Word count skips CTA blocks. Removed the em dash from a comment.
- `src/app/blog/[slug]/opengraph-image.tsx`: `dynamicParams = false`, so unknown slugs 404 instead of rendering a generic card.
- `src/app/blog/rss.xml/route.ts`: `lastBuildDate` is now the newest `updated ?? date` across all posts. Each item gets `<dcterms:modified>` (RSS 2.0 has no per-item updated field; `xmlns:dcterms` is declared).
- `src/lib/blog.ts`:
  - New `cta` ContentBlock: `{ type: "cta"; title; text; href; label }`.
  - New helpers: `postModified(post)` and `relatedPosts(post, n)`. `relatedPosts` scores same category +3, plus shared keyword/title words weighted by rarity (a word every post shares counts 0), and breaks ties newest first. For the 3 current posts its output matches the old "Keep reading" lists exactly.
  - Content edits (listed below), image swaps, and on-brand regeneration prompts for the 5 photos.
  - Fixed 2 em dashes in comments.
- `src/components/blog/PostBody.tsx`: renders the `cta` block as one lilac `rounded-[1.75rem]` card (the AuthorCard tokens) with a "Next step" label, a title, text and one link. The link is the site's primary pill button (`bg-ultra`, sun arrow disc, min height 52px, focus-visible outline). Internal links use next/link. External links open in a new tab with sr-only "(opens in a new tab)". The card is an `<aside aria-label={title}>`. Fixed 2 comment em dashes.
- `src/components/blog/BlogIndex.tsx`:
  - `Cover` passes `unoptimized` and skips the blur lookup for `.svg` covers. `.webp` covers still get the optimizer and blur.
  - A lead post with no image now spans the full card width. Before, it left 5 empty columns.
  - The rest-grid stagger is now `i % 2`, so the 10th card doesn't wait 0.8s.
  - Quick answers take up to 3 FAQs per post, with a total cap of 12 (per post = floor(12/posts), between 1 and 3). With today's 3 posts that is still 9 rows.
  - React keys now include the slug.
- `src/components/blog/ArticleHero.tsx`: `.svg` cover is `unoptimized` with no blur.
- `ReadingProgress.tsx`, `ShareLinks.tsx`, `Toc.tsx`: replaced 5 comment em dashes.
- New SVG charts (1280x720, white rounded card, brand palette plus the existing neutral greys, house type sizes). They replace every green infographic the posts render:
  - Cost guide: `cost-spectrum`, `cost-factors`, `project-types`, `pricing-models`, `hidden-costs`, `cost-reduction`, `project-timeline`.
  - Choose guide: `questions-checklist`, `agency-vs-freelancer`, `red-flags`, `quote-comparison`, `communication-cadence`, `decision-scorecard`.
  - MVP guide: `mvp-scope`, `timeline-factors`, `mvp-vs-prototype`, `delay-causes`, `launch-faster`, `worked-example`.
  - Each one carries the original image's information. Where the original had blank placeholder lines (checklist, red flags, delay causes), the chart now shows the post's actual list items. Alts were rewritten to describe the data.

### Content changes to the 3 existing posts
**Cost guide (`updated` set to 2026-10-15 / October 15, 2026):**
1. Intro paragraph 1: "the numbers below reflect real 2026 market pricing" became "are our best estimate of 2026 market pricing".
2. Intro paragraph 2: the ranges are now "Arrowbin estimates, drawn from our own scoping and quoting work and checked against public [developer salary data](survey.stackoverflow.co)". The anchor was "developer-rate data"; the source publishes salaries. Added "They are planning figures, not quotes." Dropped "honest". "a real $60,000 build" became "a typical $60,000 build".
3. New CTA after the first (project-type) table: "Want a fixed number for your scope?", linking to /contact with the label "Get a fixed estimate".
4. The paragraph after the table now opens "These figures are Arrowbin estimates, so treat them as planning ranges, not quotes."
5. New contextual links:
   - "[AI features](/services/ai-automation)" in Technical complexity.
   - "Bespoke, brand-aligned [UI/UX design](/services/ui-ux-design), with custom interactions..." in Design depth.
   - "[native iOS and Android apps](/services/mobile-app-development)" in Platforms.
   - New sentence in the MVP H3 linking to the MVP guide.
   - "an [online store or marketplace](/services/ecommerce-development)" in Mid-size (adds "online store").
   - "[software-as-a-service product](/services/saas-product-engineering)" in SaaS.
   - "[Hosting and infrastructure](/services/cloud-devops-hosting)" and "[Maintenance and updates](/services/maintenance-support)" in the hidden-costs list.
6. Team factor: added "(Arrowbin estimate)" after the 4–5x rate gap.
7. Rates section:
   - Text now says "our 2026 estimate... These are Arrowbin estimates of blended agency rates, not published survey figures, so use them to compare regions rather than to price a specific quote."
   - Table header is now "Typical 2026 hourly rate (Arrowbin estimate)".
   - Chart caption and alt say "Arrowbin estimate". The chart already reads "Source: Arrowbin 2026 market estimate".
   - No third-party rate source was verified, so I labelled the figures as estimates rather than cite one.
8. Hidden costs: the 15–20% figure is now "a planning rule of thumb (an Arrowbin estimate, not an industry statistic)".
9. H2 "A real example: what a $60,000 SaaS MVP looks like" became "Worked example: what a typical $60,000 SaaS MVP looks like". Added "It is an illustrative model built on the budget split above, not a specific client project." The timeline chart now uses the same phase weeks as the MVP post's existing Gantt and shows each phase's budget share.
10. "book a free 30-minute call" now links to https://cal.com/arrowbin/30min.
11. Takeaways 1, 3, 4 and 5 are labelled (Arrowbin's estimate, our typical split, rule of thumb).
12. FAQ edits:
    - Break-even: "In our experience, growing teams often reach the break-even point within 2–3 years."
    - Maintenance: "As a rule of thumb... (an Arrowbin estimate)".
    - Rates: "By our 2026 estimate...".

**Choose guide (dates unchanged):**
1. Technical depth: added "and who looks after [hosting and DevOps](/services/cloud-devops-hosting) once the product is live".
2. After the questions list:
   - New paragraph on life after launch, linking "[ongoing maintenance and support](/services/maintenance-support)".
   - Then a CTA, "Put these questions to us", linking to the cal.com booking page with the label "Book a 30-minute call".
3. Agency paragraph: "design" became "[UI/UX design](/services/ui-ux-design)".
4. Framework step 1: "budget range and timeline" became "budget range and a realistic [launch timeline](MVP guide)".
5. Closing "book a free 30-minute call" now links to the booking page.
6. FAQ on time zones: removed "from offices in Bangladesh and the USA" (rule 6).

**MVP guide (dates unchanged):**
1. Intro: removed "these numbers reflect real projects" and the irrelevant "publicly available developer-rate data". It now reads "the ranges below are Arrowbin estimates drawn from that planning and delivery work, not best-case marketing."
2. New CTA after the week-by-week table: "Want a timeline for your MVP?", linking to /contact with the label "Get a timeline and estimate".
3. Scope H3: new sentence on platforms linking "[iOS and Android apps](/services/mobile-app-development)".
4. Integrations: "[AI features](/services/ai-automation)".
5. Design: "Custom [UI/UX design](/services/ui-ux-design)".
6. Team experience: new sentence linking to the choose guide.
7. H2 "A real example: a 12-week SaaS MVP" became "Worked example: a typical 12-week SaaS MVP", with "It is a representative plan, not a specific client project." The caption changed from "A real 12-week MVP" to "A representative 12-week MVP".
8. Closing "book a free 30-minute call" now links to the booking page.

**Link totals across the 3 posts:**
- Service links: custom software 2, e-commerce 1, mobile 2, SaaS 2, UI/UX 3, AI 2, cloud 2, maintenance 2.
- Each post now links to both of the other posts.

### Ready for more posts
- The new posts in `src/lib/posts/` share the `Post` type, `posts`, `generateStaticParams`, the BlogPosting/FAQ JSON-LD path, the sitemap and RSS. They emit exactly like the core posts. One new post file, `vibe-coded-app-production-ready.ts`, exists and already uses the `cta` block, but is not yet registered in `posts/index.ts`.
- Scaling to 10+ posts: the lead is the newest by `date`. Same-date posts keep their `extraPosts` array order (consider registering in the order you want). The rest are 2-column cards, so an odd count leaves the last card alone on its row (fine). Quick answers are capped at 12. Category chips wrap.
- Known layout quirk: with 3 related posts, between 768 and 1023px the 3rd card sits alone on its own row (3 columns from 1024px).

### Needs the founder
- **Photos:** the 5 photos still in use have lime/chartreuse furniture accents: `team-collaboration.webp` (cost hero), `choosing-a-partner.webp`, `portfolio-review.webp`, `team-partnership.webp`, `team-shipping.webp`. `team-shipping.webp` also shows an Apple logo. I can't make replacement photos; the prompts are updated for regeneration.
- **19 old green WebPs** are no longer referenced but are still in `public/blog/*/`. Safe to delete after review:
  - Cost guide: cost-spectrum, cost-factors, project-types, pricing-models, hidden-costs, cost-reduction, project-timeline.
  - Choose guide: questions-checklist, agency-vs-freelancer, red-flags, quote-comparison, communication-cadence, decision-scorecard.
  - MVP guide: mvp-scope, timeline-factors, mvp-vs-prototype, delay-causes, launch-faster, worked-example.
  - The unreferenced `cover.webp` in each folder is in the same state.
- **Wording to confirm:** please confirm the new sourcing sentence "drawn from our own scoping and quoting work".
- **Price inconsistency in the cost guide:** the TL;DR says "most business products land between $30,000 and $120,000", but the body says $40,000. Not changed; this needs the founder's number (P3.7 / M-1).
- **Not done (outside this brief or needs founder numbers):**
  - H1/first-H2 duplicate in the cost guide (L1).
  - Splitting the "Mobile apps and enterprise systems" H3.
  - Bangladesh/BDT paragraph and "what Arrowbin projects cost" box (P3.7, needs P3.1).
  - A real third-party rate source (for example Clutch pricing data, checked and dated).
  - The unsourced MVP-cost FAQ figures in the MVP post.

### Visual change note
- The 3 new CTA cards and the 19 replaced charts are the only visual changes, both sanctioned by this brief.
- Unwrapping Suspense does not change how the pages look.
- Everything else renders identically with today's 3 posts.

### R1 addendum: backup briefs 3 to 5 (lead request)
I wrote three more briefs in `briefs/`, in the same format and to the same verification standard: `software-maintenance-cost.md`, `courier-api-integration-bangladesh.md` and `saas-development-cost.md`. I checked them for em dashes and banned words, and counted title and meta lengths with a script.

- **software-maintenance-cost.** Primary: "how much does software maintenance cost".
  - Uses the cost guide's own estimate, unchanged: 15–20% of build cost per year.
  - The new angle is dated 2026 platform deadlines from official pages: Apple's Xcode 26 SDK rule (28 Apr), Google Play's API 36 target (31 Aug, extension to 1 Nov), PostgreSQL 14 end of life (12 Nov), and Node.js 20 listed as end of life.
  - It keeps the plan description consistent with the maintenance service FAQ.
- **courier-api-integration-bangladesh.** Primary: "courier api integration bangladesh". Official sources only:
  - RedX: the full public OpenAPI docs (read in a browser).
  - Steadfast: its official WordPress plugin (by SteadFast Courier LTD) plus its business and pricing pages (1% COD charge, ৳80 pick-and-drop minimum).
  - Pathao: the developer page needs a merchant login, so the brief bans Pathao endpoint detail taken from third-party packages.
  - The brief does not claim which courier any client uses. The search results had no editorial pages at all, so this is the most winnable backup.
- **saas-development-cost.** Primary: "saas development cost".
  - It repeats the existing Arrowbin figures exactly: $80,000–$200,000 for a full SaaS platform over 5–9 months; the $60,000 SaaS MVP with its 10/15/50/15/10 split; 15–20% maintenance; and the service FAQ's 8–14 weeks, scope, stack and security.
  - It owns SaaS running costs, worked from Stripe, Stripe Billing, Vercel and Supabase price pages. Example: 200 customers at $50 a month is $420 a month in Stripe fees, 4.2% of revenue.
  - It links to the cost guide and the MVP cost post instead of repeating them.
- **Founder flag:** the site gives three different SaaS MVP timelines: 8–14 weeks on the service page, 14–20 weeks for a complex SaaS MVP in the timeline post, and about 14 weeks in the cost guide example. The brief reconciles them as "focused" versus "complex", which the founder needs to confirm.
- **Founder action:** Pathao's API details can only come from a Pathao merchant account.

## W1 vibe-coded-app-production-ready

**Post:** "Is Your Vibe-Coded App Production Ready? A 2026 Checklist" (57 chars). Description 152 chars. Category "Engineering", 13 min read, dated 2026-10-15.

### Files created (no other files touched)
- `src/lib/posts/vibe-coded-app-production-ready.ts`: exports `post: Post`. Not registered: the lead still needs to add it to `src/lib/posts/index.ts`. It imports `site` from `@/lib/site` for the booking URL, the same way the MVP post does.
- `public/blog/vibe-coded-app-production-ready/`:
  - `cover.svg` + `cover.webp` (32 KB): code editor open on `policies.sql` with a flagged "RLS off" line and a problems panel, next to a "Launch checklist" panel (4 of 6 done) and a "Deploy blocked: 2 issues" toast.
  - `demo-vs-production.svg`: the demo's UI talks straight to the database, while production puts 8 guard layers in between. Original diagram, no data.
  - `ai-code-security-by-language.svg`: Veracode failure rates (Java 72%, C# 45%, JavaScript 43%, Python 38%, 45% overall).
  - `lovable-rls-scan.svg`: CVE-2025-48757 scan (1,645 scanned, 170 vulnerable or 10.3%, 303 endpoints).
  - `fix-or-rebuild.svg`: decision flow built from the fix-or-rebuild table. Original, labelled as our rule of thumb.
  - `developer-trust-in-ai.svg`: Stack Overflow 2025 (84% use or plan to use AI, 66% "almost right" frustration, 46% distrust, 45% say debugging AI code takes longer, 33% trust).
  - I rendered every SVG to PNG and looked at it, and viewed the WebP. I fixed one label that overlapped the 45% line, adjusted the cover spacing and changed one subtitle wording. Every file uses brand colours only, with no green.

### Content
- **Word count:** 2,842 words of body prose and tables (3,000 counting headings and captions). Not counted: the TL;DR (82 words), FAQ (377) and takeaways (155).
- **Structure:**
  - 9 question H2s, each opening with a direct answer. The last one is the closing section, "So what should you do first?".
  - One H3: questions to ask before someone takes over your code.
  - Both brief tables: a 14-row production-readiness checklist (Area | What to check | How to check it yourself | Fix size (our estimate) | Blocks launch?) and a 7-row fix-or-rebuild table.
  - One `cta` block (to /contact) about a third of the way in, after the database section.
  - 8 FAQs and 7 takeaways.
- **Internal links:**
  - /services/custom-software-development, /services/maintenance-support, /services/cloud-devops-hosting
  - /blog/how-long-does-it-take-to-build-an-mvp, /blog/how-to-choose-a-software-development-company
  - /contact (CTA only)
  - booking link (closing)
- **No invented facts:**
  - No client stories, metrics or prices.
  - S/M/L fix sizes are labelled as our estimates (S = under a day, M = a few days, L = a week or more).
  - The fix-or-rebuild "one or two signals vs four or more" heuristic is labelled as a rule of thumb.

### External sources cited (all opened and checked 15 Oct 2026)
- https://blog.collinsdictionary.com/language-lovers/collins-word-of-the-year-2025-ai-meets-authenticity-as-society-shifts (definition of vibe coding)
- https://mattpalmer.io/posts/statement-on-CVE-2025-48757/ (1,645 / 170 / 10.3% / 303)
- https://www.wiz.io/blog/exposed-moltbook-database-reveals-millions-of-api-keys (key in client JS, no RLS, 1.5M tokens, 35,000 emails, write access, fixed within hours)
- https://www.veracode.com/blog/genai-code-security-report/ (45%, per-language rates, XSS 86%, 100+ LLMs)
- https://top10.owasp.org/2025 (A01 Broken Access Control, A03 Software Supply Chain Failures; owasp.org/Top10/2025/ redirects here)
- https://supabase.com/docs/guides/database/postgres/row-level-security (RLS quotes)
- https://supabase.com/docs/guides/api/api-keys (publishable key safe to expose; secret key bypasses RLS and must never be in a browser, shipped app or source control)
- https://firebase.google.com/docs/rules/insecure-rules ("NEVER use this ruleset in production...", auth != null warning)
- https://docs.lovable.dev/features/security (scan on publish; "cannot guarantee complete security")
- https://docs.stripe.com/webhooks (duplicate events, no ordering guarantee, retries up to three days, signature verification)
- https://survey.stackoverflow.co/2025/ai (84%, 46%, 33%, 66%, 72%; 45% debugging figure in the chart)
- Also checked but not linked: the Supabase redirect-URLs docs (exact URLs in production) and the local Next.js docs (`NEXT_PUBLIC_` values are inlined into the browser bundle).

### Checks
- `ai_tells.py`: exit 0 with no WARN or HARD lines. The stats are sd 8.0, 25% short sentences, 0.5 triplets per 1k words and 17.2 contractions per 1k words.
- `pnpm tsc --noEmit -p .`: exit 0. The `cta` block type already exists in `ContentBlock`.
- `pnpm biome check --write`: it reformatted the file and is now clean.
- A grep for the em dash character (U+2014) on the post and all SVGs prints nothing.
- The humanizer skill was applied while drafting and again during the edit pass.

### For the founder to confirm
- The CTA and closing say we start with a "read-only review/audit" of the repo. Please confirm Arrowbin offers this as described (no price is stated anywhere).
- Category is "Engineering". Change it to "Guides" if you want this post grouped with the cost guide in related posts.
- The bKash/SSLCommerz line is general server-side verification advice, not a claim about either provider's specific API.

## W2 wordpress-to-nextjs-migration

### Files (new, nothing else touched)
- `src/lib/posts/wordpress-to-nextjs-migration.ts`: exports `post: Post`. Not registered: the lead still needs to add it to `src/lib/posts/index.ts`.
- `public/blog/wordpress-to-nextjs-migration/`: `cover.svg` + `cover.webp` (33 KB), plus 6 SVG charts (each 2 to 4.5 KB).

### Post
- **Title (59 chars):** WordPress to Next.js Migration: Steps, SEO and Cost Drivers. I changed the brief's "Real Costs" because the founder hasn't supplied price ranges, so the post explains cost drivers and doesn't quote prices. "Real Costs" would promise numbers we don't give.
- **Description (151 chars):** WordPress to Next.js migration, step by step: how to keep Google rankings with 308 redirects and 410s, what drives cost, and when WordPress still wins.
- **Category:** Guides. **Reading time:** 15 min.
- **Length:**
  - Prose body: 2,896 words (brief asks for 2,800 to 3,400).
  - Body including tables: 3,453 words.
  - TL;DR: 105 words. FAQ: 8 questions, 370 words. Takeaways: 7.
- **Structure:**
  - 9 question H2s, each opening with a direct answer, plus a closing H2 "So where should you start?".
  - H3s for 301 vs 308, thousands of URLs, how Arrowbin handles its own old URLs, 410 vs 404, and WooCommerce stores.
  - 6 tables:
    - The 3-option comparison with the brief's 7 columns.
    - An SEO port table (WordPress feature to Next.js 16 equivalent).
    - The plugin table with the brief's columns.
    - A timeline drivers table.
    - A cost items table (one-off vs ongoing).
  - One `cta` block after the steps section (href `/contact`). The `cta` type already exists in ContentBlock, so tsc passes.
- **Internal links (6 inline):** `/work`, `/services/ecommerce-development`, `/blog/how-much-does-custom-software-development-cost`, `/services/cloud-devops-hosting`, `/services/maintenance-support`, `/services/custom-software-development`. There is also the CTA to `/contact`, and the closing section links the booking page through `site.bookingUrl`.
- **First-hand material, described as process:**
  - arrowbin.com's 308s in `next.config.ts` (/contact-us, /about-us, /portfolio, /help).
  - The 410 + `x-robots-tag: noindex` in `src/proxy.ts` (example: /become-seller).
  - The `?channel=` spam 308.
  - The fact that config redirects run before Proxy.
  - Nothing sensitive is named: /backend is not mentioned. No metrics are attached to any client.

### Visuals (all rendered to PNG and checked; palette only, no green, text 18px or larger)
1. `cwv-pass-rate-by-cms.svg`: mobile Core Web Vitals pass rates (Duda 85, TYPO3 79, Wix 74, Weebly 47, WordPress 45). Source: Web Almanac 2025 CMS chapter.
2. `migration-phases.svg`: Gantt of the 7 phases. Marked illustrative, with no week counts.
3. `three-architectures.svg`: classic vs headless WordPress vs Next.js with another CMS, and what each exposes publicly.
4. `redirect-decision-flow.svg`: what to do with each old URL, with arrowbin.com examples. Sources: Google's site-move guide plus our config.
5. `migration-drivers.svg`: a brochure site vs a WooCommerce store on 6 drivers. Labelled "Illustrative, Arrowbin estimate, not client data".
6. `wordpress-vulnerabilities-2025.svg`: 11,334 vulnerabilities (+42%), 91% plugins / 9% themes, 46% unpatched at disclosure, 5 h median time to exploit, 6 in core. Source: Patchstack.
- **Cover:** a browser showing a rebuilt storefront, a `next.config.ts` redirect map panel (308/308/308/410), and a light terminal showing `curl -I` returning 308 and 410. It has UI labels only and uses example.com.

### External sources cited (I opened every one on 15 Oct 2026 and checked the figures)
- https://w3techs.com/technologies/details/cm-wordpress (40.0% / 58.5%, data as of 14 Oct 2026)
- https://almanac.httparchive.org/en/2025/cms (45% mobile CWV pass rate, Duda 85%, Wix 74%, about 60% use a page builder; published 15 Jan 2026)
- https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/ (11,334; +42%; 91%/9%; 6 in core; 46%; 5 hours; updated 25 Feb 2026)
- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes (keep redirects at least 1 year, temporary fluctuation, a few weeks, no mass redirects to the homepage, no chains)
- https://developers.google.com/crawling/docs/troubleshooting/http-status-codes (308 equivalent to 301; all 4xx except 429 treated the same)
- https://nextjs.org/docs/app/guides/redirecting (`permanent` gives 308; the Vercel limit of 1,024; Proxy for 1000+; redirects run before Proxy)
- https://nextjs.org/docs/app/api-reference/file-conventions/proxy (middleware renamed to proxy in v16; check auth inside each server function)
- https://nextjs.org/docs/app/getting-started/deploying (Node.js server and Docker support all features)
- https://www.rfc-editor.org/rfc/rfc9110.html#name-410-gone (410 semantics)
- https://www.wpgraphql.com/ (free, open-source GraphQL plugin)
- https://developer.woocommerce.com/docs/apis/store-api/ (public cart and checkout endpoints)

That is 11 external citations, one over the guide's "4 to 10 is normal". Each one supports a specific claim.

### Checks
- `ai_tells.py`: no HARD or WARN lines.
  - About 4,031 words linted, sd 8.3, 29% short sentences.
  - Triplets 0.5 per 1k, contractions 17.1 per 1k, top opener "a" 6%.
- `pnpm tsc --noEmit -p .`: exit 0.
- `pnpm biome check --write` on the post: formatted, and a re-check is clean.
- Em dash grep (U+2014) on the post and all SVGs: no output.
- I ran the humanizer skill guidance over the draft. Changes included removing "whether you're", cutting 21 "X, Y and Z" lists, and varying "The" sentence openers.

### For the founder to confirm
- **The portfolio claim.** The excerpt and intro say every live portfolio site started on WordPress and now runs on Next.js (per SPRINT-RULES). Please confirm the wording.
- **Arrowbin's own history.** The post says arrowbin.com "had two earlier lives: a WordPress site and, later, a marketplace". This comes from the comment in `next.config.ts`. Please confirm you're happy to say it publicly, along with the example URLs (/contact-us, /about-us, /portfolio, /help, /become-seller, `?channel=` spam).
- **Process promises.** The CTA promises "a fixed estimate before anything gets built". The closing says we rebuild "the way this guide describes, redirect map first". The checkout section says payment callbacks are "the part we test hardest". The speed section says a page builder plus plugin scripts is "the pattern we usually find" in slow WordPress audits. Please confirm all of these.
- **No timeline or price ranges.** The brief allowed founder-supplied numbers only. If you supply ranges, they fit naturally in the timeline and cost sections.
- **A link to add later.** `/blog/payment-gateway-integration-bangladesh` is not linked because it is not live yet. Once it is, the lead could link it from the WooCommerce paragraph on payment gateways.
- **A code comment to soften (not my file, so I did not change it).** `src/proxy.ts` says a 410 "tells search engines to drop them faster than a 404". Google's current HTTP status code docs say all 4xx codes except 429 are treated the same. The post states this honestly and argues for 410 on intent and HTTP semantics instead. The lead may want to soften that comment.

## W3 payment-gateway-integration-bangladesh

**Post:** "Bangladesh Payment Gateway Integration: bKash vs SSLCommerz" (59 chars). Meta description: 154 chars. Category "E-commerce". Reading time is set to "15 min read". The post is not registered yet: the lead needs to add `post` from `./payment-gateway-integration-bangladesh` to `src/lib/posts/index.ts`.

### Files created
- `src/lib/posts/payment-gateway-integration-bangladesh.ts`: the full post (`export const post: Post`).
- `public/blog/payment-gateway-integration-bangladesh/`:
  - `cover.svg` plus `cover.webp` (38.8 KB, made with sharp). The mockup is a browser checkout showing bKash (selected), Nagad, Card (Visa, Mastercard) and Cash on delivery as labelled options, beside a phone showing "Payment received". No brand logos are drawn.
  - `mfs-february-2025.svg`: Bangladesh Bank MFS figures for February 2025. Shows registered and active accounts, agents, and transaction value by type. Merchant payments (about 4% of value) are highlighted.
  - `which-setup-fits.svg`: decision matrix covering a COD-heavy new store, a bKash-heavy store, a card-heavy store and a Shopify store.
  - `sslcommerz-payment-flow.svg`: sequence diagram from session through IPN and validation to "paid".
  - `bkash-tokenized-flow.svg`: tokenized checkout flow, including the failure/cancel branch, the 30-second timeout leading to Query Payment, and the 60-day refund path.
  - `go-live-checklist.svg`: 8-item go-live checklist.
  - `first-year-gateway-cost.svg`: illustrative first-year SSLCommerz cost at 100, 400 and 1,000 orders a month (Tk 2,000 average order). It shows the Tk 25,500 plan shrinking from about 30% to about 4% of the total.
  - I rendered every SVG and the WebP and checked each one. Nothing is clipped or overlapping, no colour is green, and all chart text is 18px or larger.

### Length and structure
- **Words:** body prose about 2,890, H2/H3 headings 105, tables 428. That is about 2,990 without tables and 3,420 with them. TL;DR is 82 words, takeaways 125, FAQ 413.
- **Sections:** 10 question-style H2s, the last being "So what should you do first?". Each opens with a direct answer.
- **Tables:** three.
  - Aggregator vs direct: option, methods, contracts, build effort, refunds, best for.
  - Production failures: failure, what the customer sees, cause, prevention.
  - Gateway cost comparison: setup cost, per-transaction fee, methods, settlement, developer docs. Every figure not on a provider page says "Check with provider".
- **Other blocks:** one `cta` block (to /contact) after the second H2, 7 takeaways and 8 FAQs.
- **Bangla variants:** used once each: পেমেন্ট গেটওয়ে and বিকাশ পেমেন্ট গেটওয়ে.

### Internal links (5)
- `/work`
- `/blog/wordpress-to-nextjs-migration`
- `/services/ecommerce-development`
- `/services/maintenance-support`
- `/contact`

### External sources cited inline (all opened 15 Oct 2026)
- https://www.bb.org.bd/en/index.php/financialactivity/mfsdata
  - February 2025 is the latest month published. I posted the page's search form for Mar, Jun and Dec 2025 and Mar and Aug 2026, and each returned "No data found".
- https://sslcommerz.com/pricing/
  - Basic plan ৳25,500 "(Non-Refundable)", and 2.5% per successful transaction (3.5% for AMEX).
- https://developer.sslcommerz.com/doc/v4/
  - Server-side calls only, the Order Validation API and TLS 1.2+.
  - IPN statuses, VALIDATED, risk_level, and the listener rules (ports 80/443, IP whitelist).
- https://developer.sslcommerz.com/registration/ (sandbox page)
- https://developer.bka.sh/docs
  - Facts taken from its sub-pages, which I opened but did not link: token lifetime 3,600 s, refresh at minute 50 to 55, no more than 2 grant/refresh calls an hour; paymentID valid 24 h.
  - Execute only after the success callback, 30 s timeout, then Query Payment; error 2062.
  - The IPN listener URL is shared with bKash during onboarding.
- https://developer.bka.sh/docs/refund.md
  - Full or partial refunds, up to 10 partial refunds, within 60 days. If there is no reply in 30 s, check Refund Status.
- https://wordpress.org/plugins/wc-sslcommerz-easycheckout/
  - Author SSLCommerz, hosted/popup checkout, IPN handled, order created as Pending.
- https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries
  - Bangladesh is not listed, and the page says you "need to use a third-party payment provider".
- https://apps.shopify.com/sslcommerz (free app by SSL Wireless)
- https://nextjs.org/docs/app/guides/environment-variables (NEXT_PUBLIC_ values are inlined into the browser bundle)
- https://sslcommerz.com/onboarding-requirements/ (proprietorship and private limited document lists)
- **Opened for first-hand checks, not linked:**
  - silentlifestylebd.com: footer reads "Pay on delivery • bKash • Nagad • Card".
  - flexoverbd.com: "We accept" lists Cash on Delivery, bKash, Nagad, Rocket, Visa and Mastercard.
  - gtegoyna.com.bd: header reads "Cash On Delivery Available".
  - nagad.com.bd: a merchant sign-up form only. I found no public developer portal.

### Checks
- **`ai_tells.py`:** exit 0, no HARD or WARN lines. Sentence-length sd 8.5, short sentences 25%, triplets 3.6 per 1k words, contractions 19.2 per 1k, top opener "if" at 4%.
  - Note for editors: Biome rewrites strings that contain inner double quotes as single-quoted strings, and the linter only reads double-quoted strings. So the figures above come from a JSON dump of the whole post object, which covers all strings. Run directly on the .ts file, the linter skips 4 strings and also shows no warnings.
- **`pnpm tsc --noEmit -p .`:** exit 0. `cta` already exists in `ContentBlock`.
- **`pnpm biome check --write`:** on the post only; clean.
- **Em dash grep:** searched the post and all SVGs for the em dash character (U+2014); nothing found.

### For the founder to confirm
- **Gateways Arrowbin has integrated.** The post never says which gateway any client uses, and it names no gateway as one we have integrated. Process lines in present tense: "On a custom build we keep every payment call in server-side route handlers"; "We put these [policy pages] live before any application goes in". Confirm these match how you work.
- **CTA and closing promise a "fixed quote".** Confirm that is how payment-integration work is quoted.
- **Other aggregators named without fees:** aamarPay, shurjoPay and EPS. Confirm you are happy naming them.
- **SSLCommerz Tk 25,500.** The pricing page shows it as the "Basic" price next to a "One-Time Setup Fee" item, and gives no renewal or annual fee. The cost chart treats it as paid once in year one and tells readers to ask about renewals. Worth a call to SSLCommerz if you want to state renewal terms.
- **Sibling post link.** `/blog/wordpress-to-nextjs-migration` is linked (anchor "moving a WooCommerce store to Next.js") because that post is being written in this sprint. If it does not go live with this one, remove that sentence from the "A custom Next.js store" section.
- **Bangla.** Check the wording of the two Bangla keyword variants, and the use of গ তে গয়না in body text (it appears in prose only, not in images).
- **Nagad.** The post says we couldn't find a public Nagad developer portal on 15 Oct 2026. If you have Nagad's merchant integration documents, that paragraph could be firmer.

## W4 ai-agent-cost-small-business

**Post:** "How Much Does an AI Agent Cost for a Small Business in 2026?" (60 characters). Meta description 151 characters. Category "AI", byline Md. Shishir Ahmed, dated 15 Oct 2026, 15 min read. Not registered in `src/lib/posts/index.ts` (the lead does that).

### Files created
- `src/lib/posts/ai-agent-cost-small-business.ts`: the post (`export const post: Post`).
- `public/blog/ai-agent-cost-small-business/cover.svg` + `cover.webp` (31.8 KB): mockup of an AI inbox assistant sorting emails into queues, a draft reply with "Approve & send", auto-sort and human-approval toggles, and a "Model fees this month" meter.
- Six original SVG charts (3.3 to 4.8 KB each), all rendered to PNG with sharp and checked for clipping and overlap:
  - `cost-buckets.svg`: build, running and upkeep over year one (labelled illustrative).
  - `ai-adoption-by-size.svg`: AI use by business size, US vs UK, in separate panels.
  - `buy-or-build-decision.svg`: decision path for buying, using no-code or going custom.
  - `model-fees-worked-example.svg`: monthly model fees for the worked example across 9 model/price rows.
  - `model-price-jumps.svg`: where input prices jump (Gemini 3.6 Flash date change, Haiku 5.5 over 100k tokens, gpt-6-luna over 272K).
  - `pilot-plan.svg`: 5-step read-only pilot, with durations taken from the AI automation service page.

### Shape
- Body is 3,493 words including tables (about 3,000 of prose) plus 423 words of FAQ. It has 10 question H2s, each opening with a direct answer.
- Four tables:
  - cost by agent type (FAQ bot, inbox/triage, document processing, knowledge assistant, multi-step workflow);
  - buy vs no-code vs custom, with the brief's columns;
  - the model-fee worked example;
  - a full running-cost stack (lean vs managed).
- One `cta` block (to /contact) after the route comparison. 7 takeaways and 8 FAQs.
- Internal links:
  - `/services/ai-automation` (twice)
  - `/services/custom-software-development`
  - `/services/maintenance-support`
  - `/blog/how-much-does-custom-software-development-cost`
  - `/blog/how-to-choose-a-software-development-company`
  - `/contact` (cta)
  - the booking link (closing paragraph)
- Worked example:
  - Assumptions: 3,000 conversations a month × 4 calls × (3,000 input + 300 output tokens), which is 36M input + 3.6M output tokens, with no caching or batch discounts.
  - Model fees come to $5.04 (Gemini 2.5 Flash-Lite) up to $216.00 (Claude Opus 5.5). The arithmetic is shown.
  - Full stack: lean setup about $17.39 a month (Haiku 5.5 + self-hosted n8n + pgvector + Langfuse Hobby); managed setup about $162 plus €50 (Sonnet 5.5 + n8n Cloud Pro + Supabase Pro + Langfuse Core).

### External sources cited (all opened on 15 Oct 2026; figures checked against the page)
- https://platform.claude.com/docs/en/about-claude/pricing
  - Haiku 5.5: $0.10 / $0.50 for prompts up to 100k tokens, $0.50 / $2.50 above. Sonnet 5.5: $2 / $10. Opus 5.5: $4 / $20.
  - Sonnet 5.5 cache hits $0.10 (0.05x); 5-minute cache writes $2.50.
  - Batch API: "50% discount on both input and output tokens".
  - The new tokenizer gives about 30% more tokens. Some models are marked retired. Sonnet 5 keeps $2 / $10 (the planned increase was cancelled).
- https://ai.google.dev/gemini-api/docs/pricing (last updated 14 Oct 2026)
  - 2.5 Flash-Lite: $0.10 / $0.40.
  - 3.6 Flash: $0.75 / $3.75 through 31 Dec 2026, then $1.50 / $7.50.
  - 3.1 Pro Preview: $2 / $12 for prompts up to 200k tokens.
- https://developers.openai.com/api/docs/pricing
  - gpt-6-luna $0.10 / $0.50; gpt-6.1-sol $2 / $10.
  - Long-context prices apply above 272K input tokens (gpt-6-luna input $0.20).
  - openai.com/api/pricing returned 403; this is the official docs page it redirects to.
- https://www.intercom.com/pricing: "Fin is priced at $0.99 per outcome", plus how an outcome is defined and charged once per conversation.
- https://n8n.io/pricing/: Starter €20 a month (2.5K executions) and Pro €50 a month (10K), both billed annually. A self-hosted version is on GitHub.
- https://zapier.com/pricing: Pro from $19.99 a month billed annually (750 tasks). AI steps are priced by model tier.
- https://www.hostinger.com/vps/n8n-hosting: KVM 1 (1 vCPU, 4 GB RAM) at $6.49 a month promotional, paid upfront, renewing at $11.99.
- https://supabase.com/pricing: Pro from $25 a month.
- https://supabase.com/docs/guides/database/extensions/pgvector: definition of pgvector.
- https://langfuse.com/pricing: Hobby free (50k units, 30 days); Core $29 (100k units, 90 days).
- https://census.gov/library/stories/2026/05/ai-use-businesses.html: 17% to 20% of businesses use AI (Dec 2025 to May 2026). 37% of firms with 250+ employees, under 20% of firms with 1 to 4.
- https://cy.ons.gov.uk/businessindustryandtrade/business/businessservices/articles/artificialintelligenceinukbusinesses/2023to2026: 28% of firms with 0 to 9 employees, 49% with 250+, around 35% with 10+ (around 12% in late 2023).
- https://www.frbsf.org/research-and-insights/publications/community-development-research-briefs/2026/07/ai-adoption-in-small-businesses-2024-sbcs/: nearly 40% using or planning to use AI, and the barriers to adoption.
- https://modelcontextprotocol.io/docs/getting-started/intro: definition of MCP, the USB-C analogy, and Claude and ChatGPT as clients.

### Checks
- `python -I docs/seo/13-sprint-2026-10-15/tools/ai_tells.py`: no HARD or WARN lines.
  - sd 10.4; 19% short sentences.
  - 5 triplets (1.2 per 1k words).
  - 69 contractions (15.9 per 1k words).
- `pnpm tsc --noEmit -p .`: exit 0. `cta` is already a ContentBlock type, so there were no errors.
- `pnpm biome check --write` on the post: clean.
- Em dash grep (U+2014) on the post and all SVGs: no matches.
- Palette: brand colours and light tints of them only. No green or cream.

### For the founder to confirm
1. **Arrowbin price used in the post.**
   - The TL;DR, two tables, a takeaway and the FAQ use the AI service page's own figure: "a focused first automation, such as invoice processing or support triage, typically starts around $10,000–$15,000 including a year of running costs".
   - The post maps that figure to the "inbox/triage" and "document processing" agent types, and says multi-step agents cost more.
   - Please confirm this figure is still current. The brief preferred no build price unless you supplied one; the lead's task allowed the service page figure.
2. **Upkeep rule of thumb.** The post applies the cost guide's "15–20% of build cost per year (Arrowbin estimate)" to agents and says agents should sit at the top of that range. "A few hours a week at first" for answer checks is labelled as our estimate.
3. **Hostinger partner disclosure.** The post says "Hostinger, which we partner with" in its source list. Remove that if you would rather not disclose it.
4. **Time to first version.** The route table puts off-the-shelf at "Days" and no-code at "Days to weeks", both labelled as our view.
5. **Model names.** The model names are exactly as the price pages list them on 15 Oct 2026. Gemini 3.6 Flash doubles on 1 Jan 2027, so the post needs a refresh around then.

## A5 service de-duplication

Scope: audit M-8 (service boilerplate) and H-5 (proof that does not match the service). This covers FIX-PLAN P3.6 and the relabel part of P3.2 (founder default D5).
- Text and props only: no new sections, no new UI, no styling changes, no prices and no new claims.
- A2's titles, intros and answer blocks in `services.ts` are untouched.

**Verification:**
- `pnpm tsc --noEmit -p .` passes (exit 0, whole project).
- `pnpm biome check --write` is clean on the 8 changed source files.
- A grep for the em dash character (U+2014) on every changed file prints nothing.
- `ai_tells.py` shows no HARD issues on `services.ts` or `ServiceRelated.tsx`.
  - The two WARNs (sentence-length spread, triplets) were already there per A2. They come mostly from the FAQs and lists.
  - I rewrote my own lines to drop most of their three-item lists.
- Rendered text was checked read-only on the dev server already running on :3002: all 8 service pages, plus `/services`, which still shows the generic Engagement copy.
- No build was run and git was not touched.

### Method and tool
`docs/seo/13-sprint-2026-10-15/tools/boilerplate_share.py` repeats the M-8 method:
- It fetches each service page (or reads saved HTML) and takes the text inside `<main>` after the breadcrumb.
- It splits that text into lines the way innerText does: block tags, Tailwind display classes at desktop width, and flex/grid children.
- It keeps lines over 25 characters.
- A line counts as boilerplate when it appears on 3 or more of the 8 pages. `--list` prints the repeated lines.

Run: `python -I docs/seo/13-sprint-2026-10-15/tools/boilerplate_share.py --base http://localhost:3002 --list`

My "before" is lower than the audit's 33 to 49% because the line model is an approximation and A2 had already changed some copy. Before and after use the same script on the same server.

### Before / after
Share of lines / share of words repeated on 3 or more pages. Target: under 25%.

| Page | Before | After |
|---|---|---|
| Custom software | 31.4% / 25.9% | **12.3% / 12.8%** |
| E-commerce | 31.0% / 28.4% | **9.9% / 11.5%** |
| Mobile | 37.2% / 30.9% | **12.8% / 12.9%** |
| SaaS | 43.4% / 33.0% | **17.1% / 16.5%** |
| UI/UX | 38.5% / 29.5% | **13.8% / 13.3%** |
| AI | 37.8% / 29.6% | **14.3% / 12.7%** |
| Cloud | 42.3% / 31.8% | **15.6% / 13.2%** |
| Maintenance | 35.2% / 30.3% | **11.5% / 12.7%** |

**What still repeats** (10 to 13 lines per page), and why:
- **Quote form footer:** "Reply within one business day. We never share your details." Kept on purpose, because it is the same promise on every page.
- **FAQ line:** "Still curious? Email hello@arrowbin.com and a human replies within a day." It lives in `home/Faq.tsx`, which I do not own.
- **Closing CTA paragraph:** lives in `home/Cta.tsx`, which I do not own. Per-service text is ready in the data (see "Needs the lead").
- **Guide cards:** post titles and descriptions come from `blog.ts`. Only 3 guides exist, so 7 pages show the same two.
- **Portfolio result lines** (`portfolio.ts`): 8 projects fill 24 card slots, so each line lands on about 3 pages by arithmetic.
- **Short UI repeats:**
  - "See maintenance & support →" on the care-plan card (7 pages).
  - The service names "Custom Software Development" and "SaaS / Product Engineering" in the related cards.

### Files changed
- **`src/lib/services.ts`**
  - New types `ServicePageCopy`, `EngagementCopy` and `EngagementModelCopy`.
  - New required field `ServiceExtras.copy`, filled for all 8 services: the form intro and hint, the "Is this for you?" line, the process line, the three engagement cards and the closing CTA text.
- **`src/components/services/Engagement.tsx`**
  - New optional `copy` prop. Each card's lead, fit line and three points come from it when it is given.
  - Card names, tags, colours and links are unchanged.
  - The generic text stays as the fallback for `/services`.
  - A card can override its link (used once; see "Needs the founder's eyes").
- **`src/components/services/ServiceProcess.tsx`:** new optional `note` prop. The default is the old line.
- **`src/components/services/ServiceQuoteForm.tsx`:** new optional `intro` and `placeholder` props. The defaults are the old text, and A3's form logic is unchanged.
- **`src/components/services/ServiceHero.tsx`:** new optional `form` prop, passed through to the quote form.
- **`src/components/services/ServiceValue.tsx`:** the line under "Is this for you?" now reads `extras.copy.fit`.
- **`src/components/services/ServiceRelated.tsx`**
  - `PAIRS` now holds `{ slug, why }`.
  - Each card says why that service pairs with this page's service.
  - This replaces the generic `summary`, which repeated on 3 to 5 pages.
- **`src/app/services/[slug]/page.tsx`**
  - Props only: `form`, `note` and `copy` at every call site.
  - Six honest proof headings.
  - One comment explaining H-5.
- **`docs/seo/13-sprint-2026-10-15/tools/boilerplate_share.py`** (new): the measuring script.

### Proof headings (H-5 / P3.2, D5 "relabel now")
No cards were added or removed. Each new heading is within about 20% of the old length, so the H2 wraps the same way.
- **Mobile:** "Mobile-first products we've built" -> "Related web builds, live today".
- **SaaS:** "Products we've taken to market" -> "Web platforms we've shipped".
- **UI/UX:** "Interfaces we've designed" -> "Web interfaces we've built". "Designed" is not verifiable for WordPress rebuilds.
- **AI:** "Products we've built and automated" -> "Websites and stores by the same team".
- **Cloud:** "Products we keep online" -> "Web builds we've shipped". Hosting these sites is not confirmed.
- **Maintenance:** "Products we look after" -> "Websites we've built". Ongoing care of these sites is not confirmed.
- **Custom and e-commerce:** unchanged. "Built by us, live today" makes no category claim.

### Copy changes (old -> new)
**Old generic lines.** Each service now replaces these. The old text stays as the fallback on `/services`.
- **Form intro:** "Tell us about your project. No obligation."
- **Form hint:** "What are you looking to build?"
- **Is this for you?:** "If one of these sounds like you, we should talk."
- **Process:** "Short sprints, a demo at the end of each one, and no surprises on scope or cost."
- **Engagement intro:** "Same senior team either way. Pick the shape that fits where your product is today; you can switch later."
- **Project card:**
  - Lead: "A defined build with a fixed, itemised estimate."
  - Fit: "Best for MVPs, launches, redesigns and new platforms."
  - Points: "Discovery call, then a written scope" / "Fixed estimate before any work starts" / "Weekly demos until launch".
- **Product team card:**
  - Lead: "A senior squad working on your roadmap, month to month."
  - Fit: "Best for SaaS and products that ship continuously."
  - Points: "Design, engineering and QA in one team" / "Monthly plan, weekly releases" / "Scale the team up or down as you need".
- **Care plan card:**
  - Lead: "Monitoring, updates and fixes so it keeps running well."
  - Fit: "Best for live sites, stores and apps."
  - Points: "Security updates and backups" / "Uptime monitoring and fast fixes" / "Small improvements every month".
- **Related cards:** each paired service's `summary`.
- **Closing CTA** (data only for now): "Tell us what you're making. You'll get a straight answer on scope, timeline and cost from a senior engineer, usually within a day."

**New text per service.** In the project, team and care lines, the format is lead | fit | points.

**custom-software-development**
- form.intro: Tell us what your team does by hand today.
- form.placeholder: Which tools or manual steps should it replace?
- fit: If your team works around its tools, we should talk.
- process: Two-week sprints, each ending with a working demo you can click through and comment on.
- engagement.intro: Start with a scoped build of the tool you need most. Once your team relies on it, move to a team or a care plan.
- project: A scoped build of one system, with a fixed estimate. | Best for internal tools and client portals. | We map the workflow before quoting / Fixed estimate for the first version / A working demo every two weeks
- team: A team on your platform's roadmap, planned month by month. | Best when the system keeps growing with the business. | New modules and integrations as needed / The people who built version one / Monthly plan, a release every sprint
- care: We keep the system and its integrations working after launch. | Best for tools your team uses every day. | Fixes when a connected API changes / Security and dependency updates / A health report every month
- cta (data only): Tell us which workflow costs your team the most time. We'll come back with a straight answer on scope and cost, usually within a day.
- pairs ui-ux-design: We design the screens and flows first, so the build matches how your team works day to day.
- pairs cloud-devops-hosting: Automated deploys and monitoring for the system, in place before your team starts relying on it.
- pairs ai-automation: Add AI to the workflows the system already runs, like reading documents or sorting requests.

**ecommerce-development**
- form.intro: Tell us what you sell. No obligation.
- form.placeholder: What do you sell, and where do you sell it now?
- fit: If your store is slow or you're starting one, let's talk.
- process: Strategy takes a week. Design and build follow, and testing carries on after launch.
- engagement.intro: Launch or move your store as a project. After that, a team keeps it growing, or a care plan keeps it running.
- project: A new store or a migration, with a fixed estimate. | Best for new brands and stores leaving a slow platform. | Payments and delivery scoped up front / 301 redirects so rankings hold / Admin training before launch
- team: A team that keeps improving the store, month to month. | Best for stores that test offers and checkout. | Checkout and product page tests / New payment or courier options / Sale and campaign pages when needed
- care: Monitoring and fixes so the store keeps taking orders. | Best for stores where downtime loses sales. | Checkout and payment monitoring / Fixes when a gateway changes its API / Backups of orders and products
- cta (data only): Tell us what you sell and where you sell it now. We'll tell you which platform fits and what it costs, usually within a day.
- pairs ui-ux-design: Product pages and checkout designed and tested with shoppers before they go into the build.
- pairs maintenance-support: Monitoring and fixes after launch, so checkout keeps working on your busiest sale days.
- pairs cloud-devops-hosting: Hosting that adds servers when a sale brings a traffic spike and scales back down after it.

**mobile-app-development**
- form.intro: Tell us about your app idea. No obligation.
- form.placeholder: What should the app do, and who is it for?
- fit: If your product belongs on a phone, we should talk.
- process: We prototype before we code, and test on real phones before anything goes to the stores.
- engagement.intro: Start with a fixed-scope MVP. Once the app is live in the stores, choose a team for new releases or a care plan for upkeep.
- project: An MVP for iOS and Android, with a fixed estimate. | Best for a first app or taking a product to mobile. | Feature set agreed before design / Clickable prototype before code / Store submission handled
- team: A team shipping app releases on your roadmap, month to month. | Best for apps that update often after launch. | App and backend built by one team / Releases through both stores / Changes based on how people use it
- care: Updates and fixes so the app keeps passing store review. | Best for live apps with real users. | Updates for each new iOS and Android / Crash and error monitoring / Store listing and policy checks
- cta (data only): Tell us what the app should do and who it's for. We'll say whether cross-platform fits and what the MVP costs, usually within a day.
- pairs ui-ux-design: Flows and screens prototyped and tested with users before any app code gets written.
- pairs saas-product-engineering: When the app is the front end of a subscription product, with accounts and billing behind it.
- pairs maintenance-support: New OS versions and store policy changes handled for you after the app launches.

**saas-product-engineering**
- form.intro: Tell us what customers will pay for.
- form.placeholder: Who pays, and what's the core workflow?
- fit: If customers will pay for it monthly, let's talk.
- process: We cut the MVP to what proves the idea, ship it, then scale what customers use most.
- engagement.intro: Build the MVP as a fixed project. Once customers pay, a product team keeps shipping, or a care plan keeps it up.
- project: A SaaS MVP: your core workflow, with billing built in. | Best for founders who need something to sell, soon. | Scope cut to what customers pay for / Stripe billing from day one / A fixed estimate before we start
- team: A product team on your roadmap after launch, month to month. | Best once paying customers start asking for more. | Features ranked by customer usage / SSO and team roles when buyers ask / Scale the team up or down
- care: Uptime and backups for a product customers pay for. | Best for stable products with a small team. | Daily backups, checked monthly / Error alerts and uptime monitoring / Security and dependency patches
- cta (data only): Tell us who will pay and for what. We'll come back with a first MVP scope and what it costs, usually within a day.
- pairs cloud-devops-hosting: Deploy pipelines and monitoring that keep up as your accounts and traffic grow.
- pairs ui-ux-design: Onboarding and core screens designed so trial users reach the point where they'd pay.
- pairs ai-automation: AI features inside your product, such as assistants that answer from each customer's own data.

**ui-ux-design**
- form.intro: Tell us what needs designing. No obligation.
- form.placeholder: A new product, a redesign or a UX audit?
- fit: If users get stuck or give up, let's look at why.
- process: Flows are settled in wireframes before visual design starts, so changes stay cheap.
- engagement.intro: Design starts as a fixed project. If we build it too, the same team carries on, or a care plan keeps the UI in shape.
- project: Research to dev-ready Figma files, with a fixed estimate. | Best for a new product or a full redesign. | User research and flows first / Clickable prototype to test / Figma files and a design system
- team: Designers and engineers on your roadmap, month to month. | Best when design and build should not be handed off. | Designs built by the same team / Usability checks on new features / Design system kept up to date
- care: Small UI fixes and checks so the product stays easy to use. | Best for live products after a redesign. | Dev hours for UI fixes each month / Broken layouts fixed as found / Monitoring and security updates
- cta (data only): Send us the product, or just the idea. We'll tell you what research it needs and what the design costs, usually within a day.
- pairs custom-software-development: We build what we design: internal tools and web platforms, made by the team that drew the screens.
- pairs mobile-app-development: The designs become iOS and Android apps, built by the same team that drew them.
- pairs ecommerce-development: Store designs built into a fast storefront, with payments and delivery wired in.

**ai-automation**
- form.intro: Tell us which task eats your team's time.
- form.placeholder: Which repetitive task would you automate first?
- fit: If someone copies data between tools all day, let's talk.
- process: We prove the value on your real data before building the full system around it.
- engagement.intro: Start with one automation as a project. Add more with a team, or keep the first one tuned with a care plan.
- project: One automation, proven on your data first. | Best for a first task worth automating, like invoices. | Prototype on your real data / Payback sized before you commit / Hand-off rules for unsure cases
- team: A team adding automations and AI features, month to month. | Best when several tasks are worth automating. | New workflows from a shared list / AI features inside your product / Models swapped without a rebuild
- care: We watch answer quality and fix what drifts after launch. | Best for automations your team relies on. | Output checks on real cases / Updates when model APIs change / Source documents kept in sync
- cta (data only): Tell us the task that eats your team's week. We'll tell you if AI can take it on and what it would pay back, usually within a day.
- pairs custom-software-development: When the automation needs a proper app around it, with dashboards and links to your other systems.
- pairs saas-product-engineering: Turn an AI workflow that works for your business into a product other businesses pay for.
- pairs cloud-devops-hosting: Hosting and monitoring for AI workloads, including private setups when data must stay in-house.

**cloud-devops-hosting**
- form.intro: Tell us where your product runs today.
- form.placeholder: Where is it hosted, and what keeps breaking?
- fit: If releases make your team nervous, we should talk.
- process: Changes roll out in stages with a rollback ready, so your product stays online throughout.
- engagement.intro: Fix deploys and hosting as a project. Then run it yourself, add a team, or let us manage it on a care plan.
- project: A cloud and CI/CD setup with a fixed estimate. | Best for slow deploys or a move to the cloud. | Review of what runs today / Infrastructure written as code / Rollback plan for the switch-over
- team: A team on your product and its infrastructure, month to month. | Best for products that release often and need to scale. | Pipelines that grow with the app / Cost reviews as traffic grows / Releases with previews and rollbacks
- care: Managed hosting, with an engineer on call when it breaks. | Best for teams who'd rather not run servers. | Uptime alerts go to an engineer / OS and security patching / Backups checked every month
- cta (data only): Tell us where you host and what keeps breaking. We'll come back with what to fix first and what it costs, usually within a day.
- pairs maintenance-support: Once the setup is in place, a monthly plan keeps it patched and watched.
- pairs saas-product-engineering: For SaaS teams: billing and new features built on the infrastructure we set up.
- pairs custom-software-development: When the app on top needs work as well, from new features to a rebuild of an old system.

**maintenance-support**
- form.intro: Tell us what needs looking after. No obligation.
- form.placeholder: What does it run on, and who built it?
- fit: If nobody looks after your software today, let's talk.
- process: Urgent risks get fixed first. Then the plan settles into steady monthly upkeep.
- engagement.intro: A care plan covers most upkeep. Use a project for a big fix-up, or a team when feature work is steady.
- project: A fixed-scope fix-up: audit, urgent risks, then upgrades. | Best for software you inherited or that has aged badly. | Code and infrastructure audit / Urgent risks fixed first / Upgrades in steps, no rewrite
- team: A team for ongoing feature work beyond upkeep, month to month. | Best when the product still has a long roadmap. | Features from a shared, ranked list / Upkeep handled by the same team / Grow or shrink hours as needed
- care: Upkeep and fixes, with response times agreed up front. | Best for products with no in-house engineer. | A monthly report in plain English / Response targets set in your plan / Spare hours go into improvements | link: Ask about a plan -> /contact
- cta (data only): Tell us what you need looked after. We'll suggest a plan and the response times that fit, usually within a day.
- pairs cloud-devops-hosting: Move fragile hosting to automated deploys and monitoring before it fails on a busy day.
- pairs ecommerce-development: For stores: checkout and courier links looked after by the people who build them.
- pairs custom-software-development: When upkeep is no longer enough and part of the system needs rebuilding or replacing.

### Needs the lead (files I do not own)
1. **`src/components/home/Cta.tsx`.**
   - Add an optional `text` prop and render `{text ?? "<current paragraph>"}` in the paragraph.
   - In `services/[slug]/page.tsx`, change each `<Cta index={n(..)} />` to `<Cta index={n(..)} text={extras?.copy.cta} />`.
   - The 8 texts are already in `serviceExtras[slug].copy.cta`. They drop "from a senior engineer" (P3.8 soften).
   - This removes one more repeated line from each page (custom would go to 11.3%, SaaS to 15.8%).
2. **`src/components/home/Faq.tsx` (optional).** A `note` prop would let service pages tailor the "Still curious? ..." line. I did not write that copy.
3. **`relatedPosts` in `services.ts`.**
   - Once the new sprint posts are registered in `posts/index.ts`, point the matching pages at them. For example: the payment-gateway and WordPress-to-Next.js posts on e-commerce, and the vibe-coded-app post on maintenance or custom.
   - Keep the same number of cards per page so the layout does not change.
   - This would remove most of the remaining repeated guide lines.
   - I did not change it now, because unregistered slugs would silently drop cards.
4. **`src/lib/portfolio.ts`.** No change is needed for this task. The repeated result lines come from spreading 8 projects over 24 card slots.

### Needs the founder's eyes
- **All the copy above.** Every line restates something already on the site (FAQs, process steps, plan cards, durations). A few lines are new wording of a commitment, so please confirm you are happy to promise these:
  - "Usability checks on new features" (UI/UX team card).
  - "Updates for each new iOS and Android" (mobile care card).
  - "The people who built version one" (custom team card). The old card said "Same senior team either way".
  - "Uptime alerts go to an engineer" (cloud care card). The FAQ already says on-call support.
  - "Product pages and checkout designed and tested with shoppers" (e-commerce page, UI/UX related card).
- **Maintenance page care-plan link.** On its own page, the care-plan card linked back to the same page ("See maintenance & support"). It now reads "Ask about a plan" and goes to `/contact`.
- **"Senior" removed** from the new Engagement intros and the CTA texts (P3.8). The generic `/services` copy still says "Same senior team either way".
- **"Most popular" tag** on the Project card is unchanged and unverified. Decide whether to keep it.
- **Proof headings.**
  - The headings are now honest, but the mobile, SaaS, AI, cloud and UI/UX pages still show websites.
  - The real P3.2 fix is one real project per service (anonymised is fine).
  - The alternative is dropping the cards, which changes the layout and needs your sign-off.
- **Layout.**
  - Every string is within about 20% of the line it replaces.
  - Engagement points are 38 characters or fewer.
  - The related-card lines are 17% shorter to 7% longer than the summaries they replace.
  - On desktop the Engagement cards share subgrid rows, so a longer line in one card cannot push the others.
  - On phones a card may gain or lose a line. Worth a glance at the "Three ways to start" block on :3001.

## W7 mvp-development-cost

**Files created (no other files touched, no git, no build):**
- `src/lib/posts/mvp-development-cost.ts` (`export const post: Post`, category "Product"). Not registered in `src/lib/posts/index.ts`; the lead does that.
- `public/blog/mvp-development-cost/`: `cover.svg` + `cover.webp` (1280x720, 37 KB) and 5 original charts: `mvp-cost-formula.svg`, `mvp-budget-by-phase.svg`, `keep-fake-cut-matrix.svg`, `mvp-route-decision.svg`, `first-year-cost-curve.svg` (each 3 to 7 KB).

**Post**
- Title (57 chars): MVP Development Cost in 2026: How to Work Out Your Budget
- Description (148 chars): What an MVP costs in 2026 and why: the formula behind the number, what to cut, what it costs to run, and when a prototype is the smarter first step.
- Body 2,786 words (3,451 with TL;DR, takeaways and FAQ). Reading time "12 min read" (body / 230).
- TL;DR with the ranges and drivers; 9 question H2s plus a closing "So what should you do first?"; tables for build bands, budget by phase (share, length, what you get), keep/fake/cut, and route comparison (no-code, AI-built prototype, custom: cost, time, limits); one `cta` block (/contact) after the phase section; 8 FAQs (none reuse the cost guide's FAQ wording); 7 takeaways.
- Angle: MVP budget = (weeks x team x weekly rate) + launch costs + year-one running costs, worked through Arrowbin's published $60,000 / 14-week example (about $4,300 per build week).
- Internal links (6): cost guide, MVP timeline post, `/services/mobile-app-development`, `/services/custom-software-development`, `/services/saas-product-engineering`, `/contact` (plus the cta to /contact and the booking link in the closing paragraph).

**Visuals (all rendered to PNG with sharp and viewed; brand palette, no green, text 18px or larger)**
1. MVP cost formula with the $60,000 / 14-week example (Arrowbin estimate).
2. Budget by phase: 10/15/50/15/10 split, phase lengths, deliverables (Arrowbin estimate + timeline post).
3. Keep / fake / cut matrix (illustrative placement).
4. Prototype-first vs custom MVP decision flow (Arrowbin view; Lovable and Bubble plan fees).
5. First-year cumulative cost curve: build to about $60,000, then +$9,000 to +$12,000 in year one (Arrowbin estimates; store fees sourced).
- Cover: browser window with a product dashboard wireframe beside an "MVP budget" card ($60,000, phase split from the cost guide's worked example, "Week 6 of 14").

**External sources (every one opened on 15 Oct 2026 and the figure checked)**
- https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm : median pay, software developers, QA analysts and testers, $134,040 a year / $64.44 an hour, May 2025.
- https://www.bls.gov/news.release/ecec.nr0.htm : private industry, June 2026 (released 9 Sep 2026): benefits 30.0%, wages and salaries 70.0% of employer compensation costs.
- https://www.cbinsights.com/research/report/startup-failure-reasons-top/ : 431 VC-backed shutdowns since 2023 (5 Mar 2026); poor product-market fit 43%, ran out of capital 70%.
- https://manual.bubble.io/account-and-marketplace/account-and-billing/pricing-plans : web-only Starter $29/month billed annually, $32 billed monthly.
- https://manual.bubble.io/account-and-marketplace/application-and-data-ownership : "Bubble apps can only be run on the Bubble platform"; leaving means rebuilding the logic.
- https://docs.lovable.dev/introduction/subscription-plans : Pro $25/month billed monthly for 100 credits.
- https://developer.apple.com/programs/enroll/ : 99 USD per membership year, prices vary by region.
- https://support.google.com/googleplay/android-developer/answer/6112435 : US$25 one-time registration fee.
- https://vercel.com/pricing : Pro $20/month per developer seat; Hobby is personal, non-commercial use.
- https://supabase.com/pricing : Pro from $25/month; free projects pause after 1 week of inactivity.
- https://sentry.io/pricing/ : Team $26/month billed annually.
- https://stripe.com/pricing : 2.9% + 30 cents per successful domestic card payment, no setup or monthly fees.

**Arrowbin figures (reused only, no new prices):** lean MVP $5,000 to $30,000; polished launch-ready MVP or app $40,000 to $120,000; $60,000 SaaS MVP over about 14 weeks; 10/15/50/15/10 phase split; 15 to 20% of build cost per year to run; timeline 6 to 8 / 10 to 14 / 14 to 20 weeks; fixed price after paid discovery, then time and materials. Derived arithmetic is labelled in the text: $4,300 a week ($60,000 / 14), $6,000 discovery, $9,000 to $12,000 a year, $36,000 for 14 weeks of the BLS median salary, about $57,000 benefits / $191,000 total if the ECEC 70/30 average applied, about $850 a year for the three list-price subscriptions with one Vercel seat.

**Checks:** `ai_tells.py` clean, no WARN or HARD lines (sd 8.4, 24% short sentences, 1.4 triplets per 1k words, 17.3 contractions per 1k words). `pnpm tsc --noEmit -p .` reports no errors. `pnpm biome check --write` on my file is clean. The em dash grep on my files prints nothing. The banned-word grep and the green-hex grep on the SVGs both return nothing. The humanizer skill was applied: I removed one "isn't X, it's Y" construction, a sweeping "most founders" claim and one florid phrase.

**Needs the founder's eyes**
1. **The two live posts disagree with each other.** The timeline post's FAQ says a standard MVP "usually runs $30,000 to $90,000". The cost guide uses $30,000 to $90,000 for a "mid-size web or mobile app" and $40,000 to $120,000 for a "polished, launch-ready MVP or app". The cost guide's table also gives 4 to 10 weeks for the lean MVP band, while the timeline post says 6 to 8 weeks for a simple tool. This post follows the brief: $40,000 to $120,000 from the cost guide and 6 to 8 weeks from the timeline post. Please reconcile the two older posts.
2. **Band-to-weeks mapping is my combination.** The table pairs "polished MVP $40,000 to $120,000" with "10 to 20 weeks". That joins two published figures (standard 10 to 14 weeks, complex SaaS 14 to 20 weeks) that were never stated together. Please confirm.
3. **Opinions are labelled as such.** These are marked "our view" in the post: "days" and "days to a few weeks" to a first no-code or AI version, the rough order of what adds weeks, and the claim that in-house is cheaper once a product has users and a long roadmap.
4. **Vendor prices will drift.** They are list prices as of 15 Oct 2026, and the post says "checked in October 2026". The Bubble figures are the web-only track; the web plus mobile tracks cost more.
5. **Links I could not add (files I don't own):**
   - The brief's link to `/blog/vibe-coded-app-production-ready` ("hardening an AI-built prototype") is left out because that post isn't registered yet. Once it's live, it belongs in the paragraph that starts "The trap is the in-between".
   - The brief also asks the cost guide and the timeline post (`src/lib/blog.ts`) to link back to `/blog/mvp-development-cost`. Suggested spots: the cost guide's "MVP or internal tool" paragraph, and the timeline post's closing paragraph "Timeline is only half the planning question...".
6. **Tooling note for the linter's owner.** `tools/ai_tells.py` was rewritten while I was working: for about a minute it didn't parse, then it was fine. The new `prose()` replaces links with `r""`, which drops link labels even though its comment says it keeps them. That's minor, but word counts will read a little low.

## W6 shopify-vs-custom-ecommerce

**Files (new, mine only):**
- `src/lib/posts/shopify-vs-custom-ecommerce.ts`: the post (`export const post: Post`), category "E-commerce", date 2026-10-15, "14 min read". Not registered: `src/lib/posts/index.ts` was not touched, so the lead needs to add it.
- `public/blog/shopify-vs-custom-ecommerce/`: `cover.svg` + `cover.webp` (1280x720, 26 KB, made with sharp), plus 6 SVG charts (2.9 to 4.3 KB each).

**Post**
- Title (56 chars): "Shopify vs Custom Ecommerce Website: Which Wins in 2026?"
- Meta description (151 chars): "Shopify vs a custom ecommerce website in 2026: real monthly and per-order fees, a 3-year cost comparison, Bangladesh payment limits and when to switch."
- Length: 2,814 words of body prose (3,190 counting table cells). Also a 108-word TL;DR, 7 takeaways and 8 FAQs.
- Structure (template C):
  - Verdict first: TL;DR plus the first H2 ("Choose Shopify if..., choose custom if...").
  - 10 question H2s, each opening with a direct answer.
  - A 12-row comparison table (Factor / Shopify / Custom / WooCommerce) and a Shopify plan table.
  - A 3-year cost table with the assumptions spelled out.
  - A decision checklist and one `cta` block (href /contact) after the cost section.
  - The closing H2 "What do we recommend for most startups and small brands?" links the service page and the booking URL once.
- Verdict:
  - Start on Shopify for most stores.
  - On platform fees alone, custom only catches the best Shopify plan at about $142,000 a month in gateway-paid sales.
  - Go custom for capability (checkout, pricing, integrations, local payment flows), not for fees.

**Fee maths (all from shopify.com/pricing on Oct 15, 2026, US view, USD)**
- Plans: Basic $25/$22, Grow $65/$58, Advanced $399/$359 (monthly/yearly billing); Plus from $2,300.
- Third-party gateway fee: 2% / 1% / 0.6% / 0.2%.
- Crossovers: Basic to Grow at $4,000 a month of gateway sales (monthly billing) or $3,600 (yearly); Grow to Advanced at $83,500 (monthly) or $75,250 (yearly).
- 3-year model: plan x 36 + rate x monthly sales x 36. It leaves out card processing (paid on any platform), apps and themes.
- Custom side: Arrowbin's own published estimate from the cost guide ($30k to $90k build, the "online store" mid-size tier, plus 15–20% a year), so $43,500 to $144,000 over 3 years.
- Break-even: custom's $43,500 low end against Advanced (12,924 + 0.216 x S) gives S of about $141,556 a month.
- Bangladesh worked example: Basic 2% + SSLCommerz 2.5% = 4.5%, Grow 3.5%, Advanced 3.1%, custom 2.5%. On a BDT 2,000 order that is BDT 90 / 70 / 62 / 50.
- COD carries no Shopify third-party fee: Shopify's help page says "You aren't charged third-party transaction fees for manual payments".

**Visuals (all viewed as PNG via sharp, on palette, no green, text at least 18px)**
1. `three-year-cost.svg`: 3-year cost lines for Basic, Grow and Advanced with the third-party fee, against Arrowbin's custom estimate band. Marks the about-$142k break-even. Computed from Shopify pricing plus our estimate.
2. `who-owns-what.svg`: who does the running work (hosting, patches, checkout code, updates, features) on Shopify vs WooCommerce vs custom. Labelled Arrowbin view.
3. `control-vs-upkeep.svg`: positioning chart for Shopify, headless Shopify, WooCommerce and custom. Labelled Arrowbin view, not a measurement.
4. `fee-per-order-bangladesh.svg`: stacked bars of fees on one gateway-paid order in Bangladesh, plus a COD row. Sources in the chart footer.
5. `ai-channels.svg`: how products reach AI assistants, Shopify path vs custom-store work, with the Agentic plan as an option.
6. `decision-tree.svg`: three questions leading to Shopify, WooCommerce, headless Shopify or custom.
- Cover: two browser windows side by side. On the left, a grey template storefront ("yourstore.example", product grid, "Add to cart"). On the right, a custom storefront ("yourbrand.example", gradient product hero, checkout panel with Card / Mobile wallet / Cash on delivery and "Place order"). No real logos and nothing cropped.

**External sources (each opened on Oct 15, 2026)**
- https://www.shopify.com/pricing (plan prices, third-party fees, "pricing and payment options may differ" by country)
- https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries (41 countries incl. US, UK, Australia; Bangladesh not listed)
- https://help.shopify.com/en/manual/payments/manual-payments ("You aren't charged third-party transaction fees for manual payments"; COD is a manual method)
- https://shopify.dev/docs/api/checkout-ui-extensions/2026-04 (information, shipping and payment step extensions "available only to stores on a Shopify Plus plan")
- https://changelog.shopify.com/posts/key-b2b-features-now-available-on-non-plus-plans (Apr 2, 2026: B2B on Basic, Grow and Advanced, up to 3 catalogs; unlimited catalogs, partial payments and deposits stay on Plus)
- https://shopify.dev/docs/storefronts/headless (Storefront API serves catalog and cart, hands off to checkout)
- https://shopify.com/news/agentic-commerce-momentum (Mar 24, 2026; ChatGPT, Copilot, AI Mode, Gemini; "no transaction fees beyond standard processing rates")
- https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts ("active by default for eligible stores"; Agentic plan lets you keep your existing online store)
- https://developers.openai.com/commerce (product feed by SFTP upload or API)
- https://vercel.com/blog/the-rise-of-the-ai-crawler (Dec 17, 2024: "none of the major AI crawlers currently render JavaScript")
- https://sslcommerz.com/pricing/ (2.5% per successful transaction, 3.5% AMEX, covers Visa, Mastercard, bKash, Nagad, Rocket; Basic plan BDT 25,500 non-refundable)
- https://stripe.com/pricing (2.9% + 30¢ per successful domestic card transaction)
- https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/ (11,334 new vulnerabilities in 2025, 91% in plugins; updated 25 Feb 2026)
- https://w3techs.com/technologies/details/cm-wordpress (WordPress 40.0% of all websites, 14 Oct 2026)
- https://woocommerce.com/woocommerce/ (open source, no "monthly platform fees")

**Internal links (6)**
- /services/ecommerce-development
- /blog/how-much-does-custom-software-development-cost
- /blog/wordpress-to-nextjs-migration
- /blog/payment-gateway-integration-bangladesh
- /blog/chatgpt-shopping-for-online-stores
- /contact (in the cta)
- Booking URL (`site.bookingUrl`) once in the closing paragraph.
- The three sibling posts exist as files in `src/lib/posts/` now.

**Checks**
- `ai_tells.py`: no HARD or WARN lines. sd 8.4, 22% short sentences, 0.3 triplets per 1k words, 28.9 contractions per 1k words.
- `pnpm tsc --noEmit -p .`: exit 0.
- `pnpm biome check --write` on the post: clean.
- grep for the em dash character (U+2014) on the post and every SVG: no output. Banned-word grep: no output.
- Humanizer skill applied: removed "here's what/how" openers, a three-part parallel paragraph and around 27 "X, Y and Z" lists, and tightened the prose.

**For the founder to confirm**
1. **Bangladeshi payment apps on Shopify.** I could not confirm a Shopify App Store listing for SSLCommerz, bKash or Nagad: the App Store search would not load, and only third-party sites claim one exists. The post therefore says to check that your gateway's Shopify app offers the wallets you need, and never claims one does.
2. **Shopify prices are the US view in USD.** Shopify says prices and payment options can vary by country.
3. **Shopify launch time.** "3–6 weeks for a Shopify store" comes from our own e-commerce service page. The post never claims Arrowbin has built Shopify stores, since none are in the public portfolio. The intro says plainly that we build custom stores and don't have a Shopify store in our portfolio.
4. **Portfolio mentions.** FlexOver BD and Maneel Club appear as WordPress/WooCommerce sites rebuilt on Next.js. Silent Lifestyle BD appears as COD with phone confirmation, from its portfolio blurb. No metrics are attached.
5. **URL paths.** The /products/ and /collections/ claim comes from how Shopify stores work, not from a Shopify help page I opened.
6. **Scratchpad.** Another agent appears to share my scratchpad folder: my `wc.py` and `render.js` were overwritten mid-run. My later helpers used a `w6_` prefix. Nothing in the repo was affected.

## W5 chatgpt-shopping-for-online-stores

### Files
- `src/lib/posts/chatgpt-shopping-for-online-stores.ts` (new). Exports `post: Post`, category "E-commerce". Not registered: `src/lib/posts/index.ts` is the lead's.
- `public/blog/chatgpt-shopping-for-online-stores/` (new): `cover.svg` + `cover.webp` (34 KB) and 5 SVG charts.

### Post
- **Title (59 chars):** How to Get Your Products on ChatGPT Shopping (Any Platform)
- **Description (145 chars):** "How to get your products into ChatGPT, Gemini or Copilot shopping answers on any platform: what changed in 2026, plus the crawler and data fixes." I rewrote the brief's version because the linter counted it as a triplet.
- **Length:** body 3,496 words (2,719 prose + 777 in 5 tables). FAQ 448, TL;DR 106, takeaways 150. Reading time "15 min read".
- **Structure:** 10 question H2s (9 from the brief plus "So where should you start?"), each opening with a direct answer. One `cta` block after the "Do you need Shopify?" section (href `/contact`, label "Ask for a readiness check"). 8 FAQs, 7 takeaways.
- **Tables:** AI assistant surfaces (ChatGPT, Google AI Mode/Gemini, Copilot, Perplexity), routes for non-Shopify stores, product fields to schema properties, crawler user agents, and a quarter checklist with effort (our estimate) and owner.
- **Internal links (6):** `/services/cloud-devops-hosting`, `/services/custom-software-development`, `/services/ai-automation`, `/blog/wordpress-to-nextjs-migration` (registered), `/services/ecommerce-development` (anchor "build a store AI assistants can read") and `/contact` once.

### Visuals (all viewed as PNG renders; palette only, no green)
- `cover.svg` / `cover.webp`: a chat window with three shirt product cards (prices, stock, Visit store) and a dashed click path to the store's product page in a browser, plus a `{ "@type": "Product" }` chip. No logos and no post title.
- `ai-shopping-timeline.svg`: dated timeline, Sep 2025 to Sep 15, 2026.
- `product-to-ai-answer.svg`: catalog, three routes in (crawled pages, feeds, platform catalogs), the answer, then your checkout or ACP/UCP agent checkout.
- `product-page-schema-map.svg`: annotated product page with 9 numbered fields marked Required or Recommended per Google. The product is labelled illustrative.
- `crawler-two-gates.svg`: robots.txt allows; the CDN either allows (200) or blocks (403).
- `acp-vs-ucp.svg`: side-by-side protocol cards.
- `client-vs-server-render.svg`: what a crawler receives from a client-rendered page vs a server-rendered page.

### External sources (all opened 15 Oct 2026)
1. https://techcrunch.com/2026/03/24/openais-plans-to-make-chatgpt-more-like-amazon-arent-going-so-well
2. https://www.shopify.com/news/agentic-commerce-momentum
3. https://blog.google/products/ads-commerce/agentic-commerce-ai-tools-protocol-retailers-platforms (UCP launch, Jan 11, 2026)
4. https://www.searchenginejournal.com/chatgpt-shopping-results-lean-hard-on-product-feeds/589000/ (Sep 9, 2026; Profound data)
5. https://developers.openai.com/api/docs/bots
6. https://developers.openai.com/commerce/guides/get-started
7. https://developers.google.com/search/docs/appearance/ai-features
8. https://support.google.com/merchants/answer/16837055
9. https://about.ads.microsoft.com/en/solutions/technology/agentic-commerce
10. https://www.perplexity.ai/hub/blog/shop-like-a-pro (Nov 18, 2024)
11. https://newsroom.paypal-corp.com/2025-11-PayPal-and-Perplexity-Launch-Instant-Buy (Nov 25, 2025)
12. https://developers.openai.com/commerce/specs/file-upload/products
13. https://woocommerce.com/products/google-listings-and-ads/
14. https://developers.google.com/search/docs/appearance/structured-data/merchant-listing (updated Sep 8, 2026)
15. https://github.com/woocommerce/woocommerce/blob/trunk/plugins/woocommerce/includes/class-wc-structured-data.php (read the source: variable products with different prices get an AggregateOffer)
16. https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers
17. https://docs.perplexity.ai/guides/bots
18. https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/ (updated Jul 1, 2026)
19. https://www.agenticcommerce.dev/
20. https://developers.openai.com/commerce/guides/key-concepts
21. https://ucp.dev/
22. https://vercel.com/blog/the-rise-of-the-ai-crawler (Dec 17, 2024)
23. https://support.google.com/analytics/answer/9756891 (GA4 "AI Assistant" default channel)

That is more than the usual 4 to 10. The topic is moving fast, and each link backs a specific dated claim, so I kept them. No paragraph has more than 2 links.

### Checks
- `ai_tells.py`: no HARD or WARN lines. About 4,315 words, sd 8.8, 22% short sentences, 8 triplets (1.9/1k), 25.5 contractions/1k, 'the' opener 5%.
- `pnpm tsc --noEmit -p .`: exit 0 (the `cta` block type exists).
- `pnpm biome check --write` on my file: clean.
- Em dash grep (U+2014) on the post and all SVGs: nothing.
- humanizer skill applied: removed a reflexive three-part list, an unverified "mostly", and a "the part most guides skip" opener.

### Needs the founder's eyes
1. **Own-site Cloudflare story.** The post says that in our October 2026 audit, requests with GPTBot's user agent got a 403 from Cloudflare even though robots.txt welcomes it (source: `docs/seo/12-audit-2026-10-14/agentic.md`). The crawler-two-gates caption says the same. These were user-agent tests from one IP. Confirm you are happy to publish this.
2. **Process claims:** "it's how we build stores" (server-rendered) and "We check this on every store we take on". Also "our robots.txt explicitly welcomes eleven AI crawlers", counted from `src/app/robots.txt/route.ts`; update the number if that list changes.
3. **CTA offer:** "Send us a product URL... tell you what to fix first" (no price stated). Confirm you want to offer this check.
4. **Not confirmed first-hand:** chatgpt.com/merchants and help.openai.com returned 403 to WebFetch, curl and the browser. The waitlist and the "self-serve later this year" plan are attributed to Search Engine Journal, and the post says I couldn't load that page. OpenAI's own developer docs (opened) confirm "currently available to approved partners".
5. **Profound numbers** (8.26% to 61.54% feed-sourced picks on Jul 10; about 65% by Sep 3) are one vendor's observational data, reported by SEJ. The post labels them that way.
6. **Left out on purpose:** Shopify Agentic plan pricing ($0/month appears only on third-party blogs; Shopify's announcement gives no price), the brief's unverified stats (Adobe, conversion rates, and so on), and the `utm_source=chatgpt.com` tag (only seen in search snippets of an OpenAI help page I couldn't open).
7. **For the lead:** `src/lib/posts/shopify-vs-custom-ecommerce.ts` exists but isn't registered. Once it's live, a link with the brief's anchor "Shopify or a custom store" fits in the second paragraph of "Do you need Shopify to sell through AI assistants?".

## W10 saas-development-cost

### Files
- `src/lib/posts/saas-development-cost.ts`: the new post, `export const post: Post`. Category "Product". It is not registered in `src/lib/posts/index.ts`; the lead does that.
- `public/blog/saas-development-cost/cover.svg` and `cover.webp` (38 KB): the cover is a SaaS admin billing dashboard mockup. It has a workspace switcher open in the sidebar, MRR, subscription and failed-payment cards, a plans panel (Starter, Growth, Scale), an invoices list with Paid and Retrying pills, and a "Payment succeeded" toast.
- 5 original SVG charts (each 2.6 to 3.7 KB):
  - `build-stages.svg`: range chart. The $60,000 illustrative MVP sits inside the $40,000–$120,000 band, beside the $80,000–$200,000 platform band. Arrowbin estimates.
  - `saas-layers.svg`: 6 SaaS layers that go in the first version and 6 that come later, stacked on the core workflow. Based on the service FAQ.
  - `monthly-running-cost.svg`: running cost at 50, 200 and 1,000 customers. Totals are $216, $531 and $2,211, or 8.6%, 5.3% and 4.4% of revenue.
  - `stripe-fee-by-price.svg`: Stripe's share of each charge on $10, $25, $50, $100 and $500 plans (6.6%, 4.8%, 4.2%, 3.9% and 3.7%).
  - `first-year-cost.svg`: the $60,000 build plus $9,000–$12,000 maintenance, $5,040 Stripe fees and $1,332 plan fees, about $75,400–$78,400 in total.
- I rendered every SVG to PNG and viewed it. I fixed a marker line that ran through two labels, rounded the end of the stacked bar, and removed an invoice row that the toast half-covered. All brand colours, no green.

### Content
- **Title:** SaaS Development Cost in 2026: From MVP to Full Platform (56 characters).
- **Meta description:** 152 characters. The excerpt is the brief's, lightly reworded to avoid a list of three.
- **Word count:** about 3,000 words of body (2,383 prose plus 621 in tables). Not counted: the TL;DR (82), FAQ (383) and takeaways (154). Reading time is "13 min read".
- **Sections:** 10 question H2s, each opening with a direct answer.
- **Tables:**
  - Build stages (MVP, full platform, scale).
  - SaaS cost items: 12 rows with columns component, why a SaaS needs it, MVP or later, why it adds cost.
  - Monthly running-cost worked example, priced as listed on 15 October 2026.
  - International-card surcharges on a $50 charge.
- **Other blocks:** one `cta` to /contact after the third H2, 8 FAQs and 7 takeaways.
- **Arrowbin figures**, reused exactly from the cost guide and service page:
  - $80,000–$200,000 over 5–9 months for a full platform.
  - The $60,000 example over roughly 14 weeks.
  - $40,000–$120,000 for a polished MVP or app.
  - 15–20% a year for maintenance.
  - 8–14 weeks for a focused SaaS MVP and 14–20 weeks for a complex one.
  - The MVP scope, stack and ownership wording from the service FAQ.
- No new Arrowbin prices, and no client stories.
- **Internal links (6):**
  - /blog/how-much-does-custom-software-development-cost
  - /blog/mvp-development-cost
  - /services/cloud-devops-hosting
  - /blog/payment-gateway-integration-bangladesh
  - /services/saas-product-engineering
  - /contact (CTA)
  - The booking link appears once, in the closing section.

### External sources (all opened 15 Oct 2026)
- https://stripe.com/pricing (US page):
  - 2.9% + 30¢ for domestic cards, +1.5% for international cards, +1% for currency conversion.
  - $15 per dispute received.
  - Meters API usage-based billing is included up to 100M events a month.
- https://stripe.com/billing/pricing: pay-as-you-go is 0.7% of Billing volume with no recurring fees and excludes one-off invoices. Pay monthly starts at $620 a month on a 1-year contract.
- https://stripe.com/global: Bangladesh is not listed, India is marked Preview. Atlas quote: "Incorporate a US company from anywhere in the world". I also confirmed "Bangladesh" is absent from the raw HTML.
- https://vercel.com/pricing:
  - Hobby is for "personal, non-commercial use".
  - Pro is $20 a month per developer seat with a $20 included credit and 1 TB of Fast Data Transfer.
  - New teams get a $200 default on-demand budget.
- https://supabase.com/pricing:
  - Pro is from $25 with $10 compute credits, 8 GB disk and 100,000 MAUs.
  - Free projects pause after 1 week of inactivity.
  - Team is from $599 and lists SOC2 and ISO 27001.
- https://resend.com/pricing: Pro is $20 a month for 50,000 emails. The free plan is limited to 100 emails a day.
- https://sentry.io/pricing/: Team is $26 a month "when billed annually". The Developer plan is limited to one user.
- https://workos.com/pricing: SSO is $125 per connection for 1–15 connections. The page calculator shows the total per month.
- https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2: the SOC 2 publication title, covering controls relevant to security, availability, processing integrity, confidentiality or privacy.
- https://www.postgresql.org/docs/current/ddl-rowsecurity.html: if no policy exists for a table, RLS uses default-deny.

### Checks
- `ai_tells.py`: exit 0 with no WARN or HARD lines. The stats are sd 8.5, 24% short sentences, 0.3 triplets per 1k words and 19.2 contractions per 1k words.
- `pnpm tsc --noEmit -p .`: exit 0.
- `pnpm biome check --write` on the post: clean.
- A grep for the em dash character on the post and all SVGs finds nothing.
- A search for the banned words finds nothing.
- I invoked the humanizer skill and used it while drafting and editing.

### For the founder to confirm
1. **Three SaaS MVP timelines:** the post uses "focused 8–14 weeks; complex multi-tenant 14–20 weeks; the $60,000 example roughly 14", as the brief suggested.
2. **Maintenance vs running costs:** this post (like the maintenance-cost brief) treats hosting and payment fees as costs on top of the 15–20% maintenance estimate. The cost guide's FAQ says the 15–20% "covers hosting, third-party services...". One of them should change so the site says one thing.
3. **Platform range:** the post reads $80,000–$200,000 as the cost of the whole product at that stage, which most teams reach in phases after an MVP. Please confirm that is how you mean the range.
4. **Process statements written in our voice:**
   - We default to one shared PostgreSQL database with a tenant ID and row-level security, and use a database per customer only when a contract requires it.
   - We'd avoid microservices early.
   - We'd usually buy SSO rather than build it.
   - Cloud work starts by sizing usage.
   - We scope feature requests as small projects.
   - We'll build against whichever billing provider the client chooses.
5. **Discovery wording:** the CTA says "fixed estimate after a short discovery call", while the closing says "a short paid discovery turns that into a fixed price for the MVP". Both phrasings already exist in the cost guide. Please confirm discovery is paid.
6. **Vendors in the worked example:** Vercel, Supabase, Resend and Sentry are illustrative. Supabase is not in the service page's tech list, which names PostgreSQL. The Sentry figure is the annual-billing price, because the page shows no monthly-billing price.
7. **Cover names:** the cover uses fictional workspace names (Acme Logistics, Brightside Clinics, Kestrel Labs) and the worked example's numbers ($10,000 MRR, 200 subscriptions).
8. **Links that need registering:** /blog/mvp-development-cost and /blog/payment-gateway-integration-bangladesh are sibling posts that must be registered in `index.ts`, or those links will 404. /blog/software-maintenance-cost did not exist when I finished, so I did not link it. Add a link from the "after launch" section once it is live.

## W9 courier-api-integration-bangladesh

**Post:** "Bangladesh Courier API Integration: Steadfast, Pathao, RedX" (59 chars). Meta description 152 chars and excerpt are as in the brief. Category E-commerce, "14 min read".

**Length:** about 3,220 body words counting tables, headings and the CTA (about 2,700 prose plus about 515 in tables). FAQ and takeaways are not counted. Structure: 10 question H2s (the last is the closing "So where should you start?"), 2 H3s, 4 tables, 1 cta block after section 3 (about a third of the way in), 8 FAQs and 7 takeaways.

### Files created (no other files touched)
- `src/lib/posts/courier-api-integration-bangladesh.ts`. Exports `post: Post`. Not registered in `index.ts` (that is the lead's job).
- `public/blog/courier-api-integration-bangladesh/`:
  - `cover.svg` and `cover.webp` (40 KB). The cover is an order admin panel: "Create consignment" button, courier choice as plain text pills (RedX, Steadfast, Pathao), area "ID matched" badge, COD amount, a tracking timeline card and a "Status confirmed" toast.
  - `courier-routing-funnel.svg`: per-parcel courier routing decision.
  - `order-to-consignment-sequence.svg`: order-to-consignment sequence diagram using the RedX endpoints.
  - `order-status-state-machine.svg`: RedX statuses mapped to store states, forward-only.
  - `cod-reconciliation.svg`: three-bucket COD reconciliation, with the Steadfast 1% worked example (Tk 2,000 parcel, Tk 20 charge).
  - `multi-courier-architecture.svg`: queue, router, adapters, webhook receiver, verify step and reconciliation.
- Every SVG was rendered to PNG with sharp and checked with the Read tool. No clipping or overlaps. On-palette, no green, no Bengali script, all under 9 KB.

### Links
- **Internal (6):**
  - `/services/ecommerce-development` (closing)
  - `/services/custom-software-development`
  - `/services/maintenance-support`
  - `/blog/payment-gateway-integration-bangladesh` (in the reconciliation section)
  - `/blog/shopify-vs-custom-ecommerce`
  - `/contact` (cta block)
  - Plus the booking link once, in the closing.
- **External (6, all opened 15 Oct 2026):**
  - https://redx.com.bd/developer-api/ (JS-rendered; read in Chrome)
  - https://wordpress.org/plugins/steadfast-api/
  - https://steadfast.com.bd/pricing
  - https://steadfast.com.bd/business
  - https://merchant.pathao.com/courier/developer-api (redirected to the merchant sign-in)
  - https://apps.shopify.com/redx-delivery
- Also opened but not cited: https://wordpress.org/plugins/redx-for-woocommerce/ (by ShopUP, 100+ installs).

### Checks
- `ai_tells.py`: no HARD or WARN lines. sd 8.0, 23% short sentences, 3.5 triplets per 1k words, 26 contractions per 1k words.
- `pnpm tsc --noEmit -p .`: exit 0.
- `pnpm biome check --write` on the post: clean, no fixes.
- Em dash grep (U+2014) on the post and SVGs: nothing.
- No "64 districts" claim, no client courier or metrics, and no Pathao endpoints.
- Humanizer pass applied.

### Needs the founder's eyes
1. **RedX docs may need a login.** When I opened redx.com.bd/developer-api/ in the browser, the page showed merchant navigation ("Create Parcel", "My Shops", "Logout"), so that browser has a RedX merchant session. WebFetch got an empty JS shell, so I could not confirm the page shows the docs to a logged-out visitor. The post says RedX publishes its docs "openly". Please open the page in a private window. If it asks for a login, change that wording in the TL;DR, section 2, the takeaways and FAQ 1.
2. **Pathao.** Pathao is described only as "API access through the merchant panel, docs behind login". The Sandbox, Webhooks, Auth and charge cells in the comparison table say "Ask Pathao". If you have a merchant account, those cells can be filled from the docs there.
3. **Steadfast.** The sandbox and webhooks cells say "not published; ask". An unofficial GitHub Laravel package describes a Steadfast callback with a bearer token. I did not use it, because the brief limits Steadfast to its own pages.
4. **RedX WordPress plugin.** The RedX docs page links "our dedicated WordPress plugin". I did not confirm which wordpress.org listing it points to, so the post does not name it.
5. **Cover pill.** The cover shows RedX as the selected courier pill, to match the worked example. If that could read as a preference, swap the selection to none.
6. **Fictional and suggested values.** The cover uses a fictional customer ("R. Hasan"), order numbers and Tk amounts. The 7-day COD cut-off is labelled as our starting suggestion. The status-to-store-state mapping and customer messages are labelled as our recommendation.
7. **Links that need registering.** `/blog/payment-gateway-integration-bangladesh` and `/blog/shopify-vs-custom-ecommerce` both exist as files, but they must be registered in `index.ts`, or the links will 404.


## W8 software-maintenance-cost

**Post:** "How Much Does Software Maintenance Cost Per Year in 2026?" (57 chars). Description 150 chars. Category "Guides", 14 min read, dated 2026-10-15.

### Files created (no other files touched)
- `src/lib/posts/software-maintenance-cost.ts`: exports `post: Post`. **Not registered:** the lead still needs to add it to `src/lib/posts/index.ts`. It imports `site` from `@/lib/site` for the booking URL, as the sibling posts do.
- `public/blog/software-maintenance-cost/`:
  - `cover.svg` + `cover.webp` (45 KB). The mockup is a maintenance dashboard in a browser: uptime bars, stat cards, and pending dependency updates (node 20 → 24, postgresql 14 → 18). Beside it sit a "Monthly report" card (backups tested, patches applied, SLA met, hours used), a "Restore test passed" toast and a "Next platform deadline: PostgreSQL 14, Nov 12, 2026" card. The UI values are illustrative.
  - `maintenance-budget-by-project.svg`: range bars for 15–20% of the cost guide's build tiers. Every bar is labelled as an Arrowbin estimate.
  - `platform-deadlines-2026-2027.svg`: a two-column timeline. "Already in force" covers Apple SDK, Node.js 20 EOL, Play API 36 and iOS 13 minimum. "Coming up" covers the Play extension end, PostgreSQL 14, PHP 8.2, TLS 100-day certificates and Node.js 22.
  - `in-house-vs-maintenance-budget.svg`: one developer's cost (the BLS median salary plus benefits at BLS's 30.0% share, about $191,000, our arithmetic) against the yearly upkeep bands.
  - `maintenance-calendar.svg`: a cadence chart running from continuous through daily, weekly, monthly and quarterly to yearly. It is labelled as our recommendation, not an industry standard.
  - `version-drift.svg`: how far a mid-2023 launch falls behind by October 2026 (Node.js 20, PostgreSQL 15, PHP 8.2), with real release dates.
  - I rendered every SVG to PNG and viewed it, and viewed the WebP. I fixed one unexplained colour encoding and the spacing on the cover's report card. Everything uses brand colours only, with no green. Every SVG is under 11 KB.

### Content
- **Word count:**
  - Body: 3,200 words (2,515 prose + 685 in tables).
  - Not counted: TL;DR 120, FAQ 409, takeaways 163, captions 101.
- **Structure:**
  - 10 question H2s, each opening with a direct answer. The last one is the closing, "So what should you budget, and what comes first?".
  - One H3: questions to ask any maintenance provider.
  - Four tables:
    - yearly budget by project type
    - work type, examples, frequency and skip risk
    - a 10-row 2026–2027 deadline table (Platform, Requirement, Date, What it means, Source)
    - maintenance models (Model, How you pay, Response time, Best for, Watch-out)
  - One `cta` block (to /contact) after section 2.
  - 8 FAQs and 7 takeaways.
- **Internal links (6):**
  - /blog/how-much-does-custom-software-development-cost, /services/cloud-devops-hosting, /services/maintenance-support
  - /blog/vibe-coded-app-production-ready, /blog/wordpress-to-nextjs-migration
  - /contact (CTA only)
  - Booking link in the closing section.
- **Arrowbin facts used:**
  - The 15–20% estimate from the cost guide, and the worked examples computed from its published tiers.
  - The plan contents, monthly retainer, defined response SLA and use of unused hours, all matching the maintenance-support service FAQ.
  - No Arrowbin prices or response times.
- **No invented facts:** no client stories or metrics. The frequencies in the work-type table are labelled as our rough experience. The hypotheticals are framed with "Say you...".

### External sources (all opened 15 Oct 2026; dates quoted as published)
- https://developer.apple.com/news/upcoming-requirements/ (Xcode 26 and 26 SDKs since April 28, 2026; target iOS 13 or later since September 9, 2026)
- https://developer.android.com/google/play/requirements/target-sdk (API 36 for new apps and updates from August 31, 2026; existing apps need API 35+ to reach new users on newer Android; extension to November 1, 2026; page last updated 2026-10-01)
- https://www.postgresql.org/support/versioning/ (5-year support; 14 final release November 12, 2026; 15 final release November 11, 2027; release dates for 15 to 18)
- https://nodejs.org/en/about/previous-releases (v20 listed EOL; "Production applications should only use Active LTS or Maintenance LTS releases")
- https://github.com/nodejs/Release (v20 EOL 2026-04-30; v22 EOL 2027-04-30; "Dates are subject to change")
- https://www.php.net/supported-versions.php (PHP 8.2 security support until 31 Dec 2026; release dates for 8.2 to 8.5)
- https://cabforum.org/working-groups/server/baseline-requirements/requirements/ (BR v2.3.1, section 1.2.2: 200 days from 2026-03-15, 100 days from 2027-03-15)
- https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/ (11,334 vulnerabilities, +42%, 91% plugins, 46% unpatched at disclosure, weighted median 5 hours to first exploit; updated 25.02.2026)
- https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm ($134,040 median, May 2025; page last modified August 27, 2026)
- https://www.bls.gov/news.release/ecec.nr0.htm (benefits 30.0% of private-industry compensation costs, June 2026; released September 9, 2026)
- https://wavect.io/blog/software-maintenance-cost-benchmark-dach-saas/ (24 DACH SaaS products; median 24%, 21% and 26% of build cost in years 1 to 3; the author calls the sample directional and the method is unpublished, which the post says plainly)
- Also opened but not cited: https://www.php.net/eol.php. I also tried https://www.iso.org/standard/80710.html for the ISO 14764 maintenance types, but it returned 403, so the four types are described without a standards citation.

### Checks
- `ai_tells.py`: exit 0 with no WARN or HARD lines. The stats are sd 8.0, 24% short sentences, 2.5 triplets per 1k words and 17.5 contractions per 1k words.
- `pnpm tsc --noEmit -p .`: exit 0.
- `pnpm biome check --write`: it reformatted the file and is now clean.
- `grep -n` for the em dash character on the post and all SVGs prints nothing.
- The humanizer skill was applied: I cut rule-of-three lists, removed summary sentences and added first-person judgement.

### For the founder to confirm
1. **Hosting inside or outside the 15–20%:** the brief said hosting and third-party fees sit outside the band. The cost guide's body and takeaway count hosting inside "ongoing ownership", so I followed the cost guide. The post says the band covers upkeep plus hosting and third-party services, and that big usage-driven bills (heavy traffic, SMS at volume) deserve their own line. If you want the brief's version instead, both posts need the same change.
2. **Wavect benchmark:** it's cited with caveats in the year-by-year section. Its medians (24%, 21%, 26%) sit above our 15–20%, and the post explains why (SaaS still shipping features, directional sample). Delete that paragraph if you'd rather not show a higher third-party number.
3. **Sibling links:** links to /blog/vibe-coded-app-production-ready and /blog/wordpress-to-nextjs-migration assume both posts get registered. Remove those links if either is held back.
4. **Deadlines beyond the brief:** I added PHP 8.2 (Dec 31, 2026), TLS 100-day certificates (Mar 15, 2027) and Node.js 22's scheduled EOL (Apr 30, 2027), each from the primary page above. The Node.js 22 date is marked "subject to change".
5. **"16 to 21 years" comparison:** one developer against a $60,000 MVP's upkeep is our arithmetic. It applies an all-private-industry benefits share to the developer median, and the chart footnotes say so.

## A6 off-page kit

Documents only, no code. All files are in `docs/seo/13-sprint-2026-10-15/offpage-kit/`.

### Files written
- `README.md`: why off-page matters now (2 followed referring domains, unclaimed Clutch profile, no LinkedIn page, stale GitHub org, a 15 Oct web search for "Arrowbin" software returned nothing about Arrowbin). What each kind of work builds (entity consistency, referring domains, review signals, founder authority, editorial mentions). Five decisions to make on day 1, a 14-day plan at 30 to 60 minutes a day, what to send dev for `sameAs`, what not to do, and a tracking sheet.
- `profile-facts.md`: the canonical fact sheet. Brand and legal name, a 42-character tagline, a 147-character one-liner, a ~50-word and a ~200-word description, a GBP description under 750 characters, the 8 services with URLs, company facts, the NAP block (Dhaka primary, US mailing address only once Sunbiz shows ACTIVE), verified social URLs from `site.ts`, logo and image URLs (all returned 200 live), portfolio entries, categories per directory and the founder bio.
- `directories.md`: Clutch (claim arrowbin-0), LinkedIn page, GoodFirms, DesignRush, Crunchbase (company and person), TechBehemoths, The Manifest, the Hostinger directory plus a partner-link message (P4.7), the GitHub org (P0.1), Google Business Profile and Bing Places (only if D8 is yes). Each entry has the start URL and how it was verified, the fields with exact text, and the URL to send back. There is also a tracking table.
- `client-outreach.md`: ground rules with Google policy links, each client's credit status, the footer credit email with an opener per client (Brandingly: turn the HTML comment into a visible link; NBAF and Maneel: thank-you and review only), the Clutch review email (no incentives, Clutch's five review parts, about 15 minutes, optional quote consent), one follow-up, WhatsApp versions and post-yes checks.
- `linkedin-posts.md`: 13 posts, one per guide, each 150 to 187 words, with at most 3 hashtags and no emojis. Calendar: Tuesday and Thursday from 20 Oct to 1 Dec 2026, moved off US Thanksgiving.
- `pr-and-mentions.md`: journalist platforms checked on 15 Oct (Qwoted, Featured, Source of Sources, MentionMatch, #JournoRequest), Bangladeshi press, communities, podcasts, DEV republishing, 5 pitch angles tied to the new guides, a pitch template and mention tracking.

### URL verification (15 Oct 2026)
- **Opened (200):** clutch.co/profile/arrowbin-0 (exists, 0 reviews, St. Pete HQ, Tampa wording), Clutch claim and reference help articles, goodfirms.co/get-listed, techbehemoths.com/register, linkedin.com/company/setup/new/ (redirects to login), LinkedIn help a543852, hostinger.com/agency-directory (190 agencies, no Arrowbin), Hostinger directory requirements, google.com/business, bingplaces.com (redirects to bing.com/forbusiness), crunchbase.com, Qwoted plus sign-up and pricing, featured.com plus signup and pricing, sourceofsources.com, mentionmatch.com/register, futurestartup.com, tbsnews.net/tech, thedailystar.net/tech-startup, bdnews24.com/technology, techshohor.com, lightcastlepartners.com/insights, basis.org.bd, e-cab.net, gdg.community.dev/gdg-dhaka, the Feedspot Bangladesh podcasts list, dev.to, google.com/alerts, and Google's spam, review and GBP guideline pages.
- **Blocked to our tools; confirmed through search or help pages:** designrush.com/add-listing, themanifest.com/get-listed, the Crunchbase help article. clutch.co/profile/arrowbin returned 404, so there is no obvious duplicate.
- **Could not confirm, so left out:** SourceBottle (timed out), JavaScript Weekly (timed out), the podcasts' own Spotify pages (403), and Clutch's written incentive policy (not found; the kit cites Google's policies instead).
- **GitHub API:** the org still shows the "Arrowbin Digital Agency" description, info@arrowbin.com, "United States of America" and the www URL, so P0.1 is not done yet.
- The 10 new guides return 404 on live today, so the LinkedIn calendar says to post each one only after the deploy.

### Checks
- The em dash grep over `docs/seo/13-sprint-2026-10-15/offpage-kit` (`grep -rn` for U+2014) prints nothing.
- Banned-word grep is clean, apart from "Showcase" inside GoodFirms' own page title, which is quoted.
- LinkedIn post word counts are 150 to 187, inside the 120 to 220 target.

### Deliberate deviations and notes for the founder
- **No "thank-you" incentive for credits.** The older `09-links/link-opportunities.csv` suggests offering "a free maintenance check or speed audit as thanks" for footer credits. Google's spam policy lists "exchanging goods or services for links", so the kit drops it.
- **Credit text defaults to "Arrowbin", not "Arrowbin LLC".** The LLC showed Inactive on OpenCorporates on 14 Oct. Switch to "Arrowbin LLC" once Sunbiz shows ACTIVE, to match the two existing credits.
- **Not recommended:** the backlinks.md idea of changing one existing credit to "Custom software development by Arrowbin". The kit keeps every anchor branded.
- **Clutch reviews:** phone interviews may be limited to paid Clutch tiers, so the email describes the online form first. The "15 minutes" is our estimate.
- **[FOUNDER] items:** Sunbiz status, Dhaka street address and whether the office is visitable (D8), the public phone and WhatsApp (D7), team size band, minimum project size, hourly rate, Hostinger starting price (D4), client contact names, whether shishir@ should be public on Crunchbase, and a LinkedIn cover image.

### A6 follow-up fixes (after the GEO re-audit, `docs/seo/14-audit-2026-10-15/findings/geo.md`)
- **Minimum size and prices:** the profile, directory and Hostinger fields now say "[FOUNDER: minimum project size]" (F5) and "[FOUNDER: hourly rate band]". I removed the "$8,000" pointer and the rate example. In the LinkedIn posts I took out the "$5,000 to ..." ranges (posts 5 and 11). A note says posts 5, 6, 9, 10 and 11 quote the guides' illustrative estimates only and must match the guides once F5 is decided.
- **Discovery:** "free discovery call" is now "a free 30-minute call" plus "[FOUNDER: discovery free or paid? (decision F4)]" in the long and GBP descriptions. The README's day-1 list gains F4.
- **Name:** the display name is "Arrowbin" everywhere, including new footer credits and the US mailing block. "Arrowbin LLC" goes only in legal-name fields (for example Crunchbase), after Sunbiz shows ACTIVE. The two existing "Arrowbin LLC" credits stay as they are.
- **One-line description:** now `site.description` word for word (160 characters), in `profile-facts.md` and as the GitHub org description.
- The em dash grep over the kit prints nothing.

### A6 follow-up 2 (two new guides and the salary data post)
- `linkedin-posts.md`: post 14 (MVP vs prototype vs POC, 193 words) and post 15 (AI automation for small business, 184 words) follow the same rules: facts only from each guide's TL;DR and takeaways, 2 hashtags each, no emojis. Post 16 is a placeholder for `developer-salaries-by-country`, marked "[write after the post is final]", with rules for using the Bangladesh figure and the survey source. Calendar rows: Thu 3 Dec, Tue 8 Dec, Thu 10 Dec 2026 (or the first slot after the post is final).
- `pr-and-mentions.md`: angle 6, original salary data by country including Bangladesh, aimed at tech journalists, newsletters and Bangladeshi tech desks. The facts are left as a fill-in until the post is final. The angle includes care points (state the survey year; self-reported pay is not payroll data; follow the dataset's licence terms). https://survey.stackoverflow.co/ returned 200 on 15 Oct.
- `README.md`: counts updated (15 posts plus a placeholder, six pitch angles).
- The em dash grep over the kit prints nothing.

## E1 editor

Full report: `docs/seo/13-sprint-2026-10-15/editor-report.md` (facts table, founder decisions, link matrix, edits per post, SVG notes).

### Files changed
- The 10 posts in `src/lib/posts/`.
- The content of the 3 core posts in `src/lib/blog.ts` (no types or helpers touched).
- New: `editor-report.md`.

### What changed
- **SAAS maintenance band aligned to the cost guide.** The 15–20% band now covers maintenance plus hosting and tool plans ($1,332/yr). Stripe fees ($5,040) are a separate, revenue-driven line.
  - First year is now $60,000 + $9,000–$12,000 + $5,040 = about $74,000–$77,000 (was $75,400–$78,400).
  - Updated: TL;DR, H2 answer, stage table, after-launch section, chart alt and takeaway.
- **Cross-links.** 23 blog-to-blog links added, including all 4 the writers could not add and the required links from the 3 core guides.
  - Every new post now has at least 2 outbound and at least 3 inbound links (AI, COUR, SAAS and MAINT had 0 inbound).
  - At most 2 links per paragraph; no links in TL;DR, takeaways, FAQs or headings.
- **Sameness.**
  - 7 shared closing H2s replaced with post-specific questions.
  - CTA titles, texts and labels made distinct ("Get a fixed estimate" now only on the cost guide).
  - Repeated "Book a call and bring X" closings, "that's the work we do" lines and "This guide is for" intros varied.
  - 6 template-shaped FAQ questions reworded; no identical FAQ questions across posts.
  - Dates made American format in all posts.
- **Consistency and claim fixes.**
  - SHOP's Silent Lifestyle BD line no longer contradicts PAY.
  - SHOP now notes the SSLCommerz Shopify app, and says "301 or 308" redirects.
  - GPT's effort scale matches VIBE's. GPT's crawler takeaway is now dated to Vercel's 2024 study.
  - SAAS "is often around $60,000" became "in our illustrative example".
  - The cost guide now says new features are budgeted outside the 15–20%, matching its own FAQ.
  - MVP$ and SAAS CTAs no longer promise a fixed estimate "after a short discovery call" when their bodies say discovery is paid.
- Fixed in `blog.ts`: "highest-leverage" (banned word) and 3 "Here's how/what" openers.

### Checks
- `ai_tells.py`: no WARN or HARD on all 10 posts. `blog.ts` still has its pre-existing triplet WARN (85 triplets before and after), which needs a rewrite of the core guides, not an edit.
- `pnpm tsc --noEmit -p .`: exit 0.
- `pnpm biome check --write` on the 11 changed files: clean.
- Em dash grep: nothing.
- No duplicate block text within any post.

### Needs the founder or lead
- **Founder decisions F1–F9 in the report.** The main ones:
  - Cost guide TL;DR $30k vs body $40k.
  - Timeline FAQ "$30k–$90k standard MVP".
  - "4–10 weeks" vs "6–8 weeks".
  - Discovery free or paid.
  - `services.ts` prices ($8k–$75k+, mobile $12k–$40k) vs the cost guide.
  - Whether the VIBE review and GPT readiness check are free.
- **Lead: `public/blog/saas-development-cost/first-year-cost.svg`** still shows plan fees as a separate segment and "Total: about $75,400–$78,400". Fold the plan fees into the maintenance segment and change the total to about $74,000–$77,000. The post alt text already describes the corrected chart.
- **Lead: `src/lib/portfolio.ts`.** The Silent Lifestyle BD blurb says "rather than card checkout", but the live footer lists Card.

## F1 fix pass

Source findings: `docs/seo/14-audit-2026-10-15/findings/` (clusters, schema, technical, sxo, content, geo 6b).

### Files changed
- `src/lib/blog.ts` (content of the 3 core guides only)
- `src/lib/posts/`: `ai-agent-cost-small-business.ts`, `chatgpt-shopping-for-online-stores.ts`, `courier-api-integration-bangladesh.ts`, `payment-gateway-integration-bangladesh.ts`, `saas-development-cost.ts`, `shopify-vs-custom-ecommerce.ts`, `software-maintenance-cost.ts`, `vibe-coded-app-production-ready.ts`, `wordpress-to-nextjs-migration.ts`
- `src/lib/services.ts`, `src/lib/schema.ts`
- `src/app/services/[slug]/page.tsx`, `src/app/contact/page.tsx`, `src/app/about/page.tsx`
- `src/components/about/AboutFounder.tsx`, `src/components/blog/ArticleHero.tsx`
- Not touched: `mvp-vs-prototype-vs-poc.ts`, `ai-automation-for-small-business.ts`, `posts/index.ts`, `mvp-development-cost.ts`, `src/app/work/page.tsx` (its schema fix lives in `schema.ts`), `BlogIndex.tsx` (see item 9).

### 1. Internal links: DONE (L-1 to L-15, H-1); H-2 to H-5 SKIPPED
All 15 were missing; all 15 added in real sentences with the suggested anchors. Max 2 links per paragraph, none in TL;DR, takeaways, FAQs or headings, no self-links (checked by script).
- L-1 PAY to SHOP: new paragraph after the Shopify paragraph (that one already had 2 links).
- L-2 SHOP to MAINT: the 15-20% planning-rule sentence.
- L-3 WP to MAINT: after "keep the new site patched".
- L-4 CHOOSE to MAINT: the "life after launch" paragraph.
- L-5 COUR to MAINT: the monitoring paragraph after "keeping integrations working after launch".
- L-6 PAY to MAINT: the closing paragraph was split in two so neither has more than 2 links.
- L-7 VIBE to MAINT: new paragraph after the "keep it safe after launch" list.
- L-8 MAINT to SAAS: the Wavect "SaaS still adding features" paragraph.
- L-9 SAAS to TIME: the "8-14 weeks" sentence.
- L-10 TIME to VIBE: the prototype vs MVP section intro.
- L-11 TIME to AI: next to the "AI features" service link.
- L-12 COST to SHOP: the "online store or marketplace" passage.
- L-13 VIBE to SAAS: the "bKash and SSLCommerz work the same way" payments paragraph.
- L-14 COUR to WP: the WooCommerce/Shopify plugin paragraph.
- L-15 AI to MVP$: the paragraph after the pilot plan.
- H-1: e-commerce `relatedPosts` is now SHOP, PAY, COUR (3 cards; the courier guide gets its first hub card).
- H-2 to H-5 skipped: H-2 waits for `mvp-vs-prototype-vs-poc` to be registered, H-3 needs the Bangladesh hub page, H-4 needs FAQ answers to render links (component change), H-5 is a home-page change. None of them can be done in my files without a new page or a visual change.

### 2. MVP timeline heading conflict: DONE (labelled as a different example)
TIME's "A typical 14-week SaaS MVP" (gantt) and the worked example were both called "typical". They are genuinely different illustrative examples, so no numbers changed. The H2 is now "Worked example: a smaller 12-week SaaS MVP"; the paragraph says plainly that it is a smaller example than the 14-week build above and than the $60,000, about 14-week, multi-tenant example in the cost guide; alt and caption updated. The TOC anchor changes to `#worked-example-a-smaller-12-week-saas-mvp` (no internal link used the old one).

### 3. SXO quick answers: DONE
- PAY: one lead-in sentence plus a table right after the intro, headers "Store situation / Start with / Why", 5 rows (new mostly-COD store, bKash-heavy, card-heavy, Shopify, WooCommerce). Every cell comes from facts already in the post.
- COUR: one lead-in sentence plus a table, headers "Courier service / Public API docs / Test sandbox / Status webhooks / Ready-made plugins", 3 rows (RedX, Steadfast, Pathao), all from the post. Header labels are unique within each post.

### 4. ChatGPT post GPTBot wording: DONE (text); SVG for the lead
The paragraph now reads "When we tested our own site on October 14, 2026, our robots.txt explicitly welcomed eleven AI crawlers, GPTBot among them, yet requests sent with GPTBot's user agent got a 403 from Cloudflare." No claim that it is fixed. The figure caption (in the post file) now says "what we found when we tested our own site on October 14, 2026".

### 5. Schema: DONE
- M2: `deliverables` removed from the Service schema call, so `hasOfferCatalog` is gone from all 8 service pages.
- L1: `AREA_SERVED` (with `Place "Worldwide"`) removed; Service nodes have no `areaServed` and inherit reach from the provider (the Organization keeps "Worldwide"). I also dropped the two Country entries, because a Service listing only the US and Bangladesh reads as office-bound (standing rule 6).
- L2: the Service node and the process ItemList on the detail page are now named from `service.heading` (the H1). `serviceListSchema` prefers `heading` too, so the `/services` stub with the same `@id` says "SaaS & Product Engineering" with no change to `services/page.tsx`. Visible nav, footer and breadcrumb labels still say "SaaS / Product Engineering" (see founder items).
- L4: AboutPage has `@id` `/about#page`, `isPartOf` WebSite and `mainEntity` Organization; CollectionPage has `isPartOf` WebSite and `inLanguage`; WebSite has `alternateName: "Arrowbin LLC"`; BlogPosting has `isPartOf` `/blog#collection`; a new `contactPageSchema()` is emitted on `/contact`.
- L6: `/work` CreativeWork items have `@id` (the live project URL) and `image` (absolute URL of the screenshot shown on /work).
- Not touched: the Dhaka node (M1). No Review or AggregateRating added.

### 6. Alt text: DONE
`AboutFounder.tsx` headshot: "Headshot of Md. Shishir Ahmed, founder of Arrowbin" (the /about hero photo already had an alt). `ArticleHero.tsx` avatar: "Md. Shishir Ahmed, founder of Arrowbin". No visual change.

### 7. Core guides' stiffness: DONE (small edits)
33 small edits in the 3 core guides: contractions; three "X, Y and Z" lists cut to two items or split where it read better; "sweet spot" replaced twice; British spellings (realise, behaviour, recognising) made American. Every link kept (38 before and after, checked by script). No numbers or meanings changed.
- `ai_tells.py` on `blog.ts`: before, triplets 85 (11.5/1k), contractions 45 (6.1/1k), sd 7.6; after, triplets 80 (10.6/1k), contractions 74 (9.8/1k), sd 7.7. The triplet WARN remains: most of the rest sit in lists, tables, alt text and image prompts, and clearing it needs the planned rewrite after F1 to F3.

### 8. GEO 6b capsules: DONE (4 of 5)
- VIBE "What can you check in your app today?": now self-contained; names the five database checks from the post's own list and the Lovable and Moltbook incidents, then the other launch blockers.
- COUR "settle before code": four named items plus RedX's six delivery types.
- COUR "reconcile COD payouts": the formula and the Steadfast 1% / ৳20 example moved into the capsule; the next paragraph was trimmed so nothing repeats.
- MAINT "lower costs": specific steps plus the Patchstack 91% figure; the same sentence was removed from the list item below so it isn't said twice.
- WordPress "how long" capsule skipped as instructed (needs founder ranges).

### 9. `<time dateTime>`: ALREADY IN PLACE, no change
`ArticleHero.tsx` (published and updated dates) and `BlogIndex.tsx` (`Meta`) already wrap dates in `<time dateTime=...>` in the working tree. The geo audit's count of 0 came from the older :3117 build. No other component prints `dateLabel` outside a `<time>`.

### 10. Descriptor check: DONE
Schema uses `site.description` ("software development company"); no post calls Arrowbin a studio, agency or "software company". The `/about` OG/X description changed from "founder-led software company" to "founder-led software development company" (metadata only). Manifesto left alone.

### Checks
- `ai_tells.py`: no HARD and no new WARN on the 9 post files (all INFO); `blog.ts` keeps its pre-existing triplet WARN (improved, see item 7).
- `pnpm tsc --noEmit -p .`: exit 0.
- `pnpm biome check --write` on the 17 changed files: clean (it reformatted one import in `contact/page.tsx`).
- Em dash grep on all changed files: nothing.
- Duplicate block text, duplicate list items, duplicate table header rows, links per paragraph and self-links: none, checked by script on all 12 edited posts.

### For the lead (files I don't own)
- `public/blog/chatgpt-shopping-for-online-stores/crawler-two-gates.svg`: the footer text "Row 2 is the pattern we found on our own site." should be dated, for example "Row 2 is what we found on our own site on Oct 14, 2026."
- Optional: `public/blog/how-long-does-it-take-to-build-an-mvp/mvp-timeline-gantt.svg` says "Example: a focused SaaS MVP delivered in ~14 weeks" and `worked-example.svg` is titled "a 12-week SaaS MVP". Both now agree with the text, but if you touch them, call the 14-week one "a typical" example and the 12-week one "a smaller" example.
- When `mvp-vs-prototype-vs-poc` is registered: trim TIME's "MVP vs prototype vs full product" H2 and its FAQ to a short summary plus a link (clusters C-7), and do H-2.

### Needs the founder's eyes (visible copy, not changed)
- L2, visible half: rename `name` "SaaS / Product Engineering" to "SaaS & Product Engineering" in `services.ts` if the nav, footer, cards, breadcrumb and contact chips should match the H1 (a one-character visible change).
- The `/about` hero says "Arrowbin is a software company for startups and growing businesses". "Software development company" would match the schema, but it changes visible hero copy and may reflow it.
- The 12-week and 14-week examples are now clearly labelled, but the cluster still says "focused SaaS MVP 8-14 weeks" (SAAS) against "standard MVP 10-14 weeks" (TIME): part of F2/F3.

## W11 mvp-vs-prototype-vs-poc

**Files created (no other files touched, no git, no build):**
- `src/lib/posts/mvp-vs-prototype-vs-poc.ts` (`export const post: Post`, category "Product", date 2026-10-15). Not registered in `src/lib/posts/index.ts`; the lead does that.
- `public/blog/mvp-vs-prototype-vs-poc/`: `cover.svg` + `cover.webp` (1280x720, 39 KB) and 5 charts: `reality-vs-audience.svg`, `usability-problems-by-test-users.svg`, `which-to-build-first.svg`, `time-to-build-compared.svg`, `stage-handover.svg` (each 4 to 6 KB).
- `docs/seo/13-sprint-2026-10-15/briefs/mvp-vs-prototype-vs-poc.md` (brief: keywords, SERP snapshot, angle, outline, charts, FAQs, links, verified facts, do-not-claim).

**Post**
- Title (54 chars): MVP vs Prototype vs POC: Which Should You Build First?
- Description (146 chars): MVP vs prototype vs POC: what each one proves, how long each takes, what each can't tell you, and a simple path for deciding which to build first.
- Body 2,596 words counting headings, the table and the cta (2,288 without the table); 3,185 with TL;DR, takeaways and FAQ. "11 min read".
- Verdict in the TL;DR: build first whichever one tests the assumption most likely to sink you (technical risk: POC; usability risk: prototype; demand risk: MVP); most web and SaaS ideas skip the POC.
- 8 question H2s plus the closing "What's the cheapest test you can run this month?". Each opens with a direct answer.
- 10-row comparison table: purpose, question it answers, who it's for, fidelity, typical time, typical cost, what you can learn, what it can't tell you, what happens to it afterwards, next step.
- Decision path as a numbered list plus a decision-tree chart. One `cta` (/contact, "Not sure which risk is biggest?") after the prototype section, about 38% of the way in. 7 FAQs, 7 takeaways.
- Internal links (6): `/blog/how-long-does-it-take-to-build-an-mvp`, `/blog/mvp-development-cost`, `/blog/vibe-coded-app-production-ready`, `/services/ui-ux-design`, `/services/saas-product-engineering`, `/contact` (once, in the closing paragraph).
- Cannibalisation: the post owns the definitions and the which-first decision. It gives MVP time and cost in one sentence each and links TIME and MVP$ for detail. The AI-built app section is 4 short paragraphs and links VIBE for the checklist.

**Visuals (all rendered to PNG with sharp and viewed; brand palette only, no green; text 18px or larger)**
1. Reality vs audience map: how real the build is against who uses it, with POC, prototype, MVP, plus AI-built app, wireframes and concierge test. Original diagram.
2. Usability problems found by number of test users: Nielsen's model with L = 31% (1 user 31%, 5 users about 85%, 15 nearly all). Source: NN/g 2000.
3. Which to build first: decision tree. Arrowbin view.
4. Time to build on one week scale: prototype days to 2 weeks and MVP 6 to 14 (complex to 20) are Arrowbin estimates from TIME; POC "days to a few weeks" is labelled our view.
5. Stage handover: what each stage passes on and leaves behind. Original diagram.
- Cover: three UI mockups side by side with stage pills. A code editor running `poc_extract.py` with passing tests; a design tool in Prototype mode with a phone screen, a tap hotspot, a connector to the next screen and a "Test session" chip; a live MVP dashboard with sign-ups, paid plans and a "New subscription" toast.

**External sources (every one opened on 15 Oct 2026; all return HTTP 200)**
- https://www.startuplessonslearned.com/2009/08/minimum-viable-product-guide.html : Eric Ries, 3 Aug 2009, MVP definition and "MVP, despite the name, is not about creating minimal products."
- https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/ : Kara Pernice, NN/g, 18 Dec 2016: a prototype is "a hypothesis"; low vs high fidelity; "Ripping up code is very expensive."
- https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/ : Jakob Nielsen, 18 Mar 2000: 5 users find about 85% of problems, L = 31%, 3 studies of 5 beat 1 of 15, 15 users to find all.
- https://www.gv.com/sprint/ : five-day sprint; prototype in one day; "A realistic façade is all you need to test with customers."
- https://www.nasa.gov/directorates/somd/space-communications-navigation-program/technology-readiness-levels/ : proof-of-concept model at TRL 3, "a fully functional prototype" at TRL 6.
- https://www.cbinsights.com/research/report/startup-failure-reasons-top/ : 5 Mar 2026; 431 VC-backed shutdowns, causes identified for 385; poor product-market fit 43%, ran out of capital 70% ("almost always the final cause of death, not the root problem"). The post says "43% of the VC-backed shutdowns where a cause could be identified".
- https://www.intelligentcio.com/eu/2024/08/05/gartner-predicts-30-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025/ : reports Gartner's prediction (at least 30% of GenAI projects abandoned after PoC by end of 2025, with reasons). Gartner's own press release returned HTTP 403, so the post links this report and frames it as a 2024 prediction, not an outcome.

**Arrowbin figures (reused only, no new prices):** prototype "days to 2 weeks", MVP 6 to 14 weeks and complex SaaS 14 to 20 (TIME); lean MVP $5,000 to $30,000 and polished MVP $40,000 to $120,000 (cost guide and MVP$). The only derived figure is "three to seven times as long" (6 and 14 weeks against a 2-week prototype). The post says we don't publish POC or prototype prices.

**Checks:**
- `ai_tells.py`: no WARN or HARD lines (sd 8.5, 20% short sentences, 3.7 triplets per 1k words, 20.0 contractions per 1k words).
- `pnpm tsc --noEmit -p .`: no errors.
- `pnpm biome check --write` on the post: clean.
- Em dash grep on the post, the SVGs and the brief: nothing.
- Banned-word grep: nothing. Every SVG colour is from the brand palette or a light tint of it. Spelling is American ("popularized").

**Needs the founder's eyes**
1. POC length "days to a few weeks" is labelled "our view" in the table, the text and chart 4. Please confirm it matches how Arrowbin scopes a POC, or give a number.
2. The post states "We don't publish price ranges for a POC or a prototype". Confirm you're happy to say that publicly, or supply ranges.
3. The CTA and the closing paragraph offer to tell a founder which of the three to start with, and to say so when they can test it without us. Confirm that offer.
4. The MVP cost figures follow MVP$ ($40,000 to $120,000 polished). TIME's FAQ still says $30,000 to $90,000 for a "standard MVP" (open item F2), so the two posts will disagree until F2 is settled.

**Links to add in files I don't own**
- `src/lib/blog.ts`, TIME post, H2 "MVP vs prototype vs full product: how do timelines compare?" (around line 1169). The sentence is: "It helps to know where an MVP sits between a quick prototype and a full product. They answer different questions and take very different amounts of time." Suggested edit: "They answer [different questions](/blog/mvp-vs-prototype-vs-poc) and take very different amounts of time." Per clusters.md C-7, also cut that section's prose to 2 or 3 sentences in the same pass. Its table can stay, since it is about timelines.
- Optional second TIME link (around line 1045): "An MVP is not a half-finished product or a rough prototype." Link "a rough prototype" to `/blog/mvp-vs-prototype-vs-poc`. Use only one of the two if you want to keep TIME's outbound count low.
- TIME FAQ "What's the difference between an MVP and a prototype?" now overlaps this post. Keep it short; FAQs carry no links.
- MVP$ (`src/lib/posts/mvp-development-cost.ts`), paragraph starting "My advice: if your riskiest assumption is demand". Link "your riskiest assumption" to this post. That paragraph has one link today, so it stays within the 2-link limit.
- `src/lib/services.ts` H-2: put this post in the `ui-ux-design` relatedPosts cards (visual sign-off needed).

## W12 ai-automation-for-small-business

**Post:** "AI Automation for Small Business: What to Automate First" (56 characters). Meta description 150 characters. Category "AI", byline Md. Shishir Ahmed, dated 15 Oct 2026, 13 min read. Not registered in `src/lib/posts/index.ts` (the lead does that).

### Files created
- `docs/seo/13-sprint-2026-10-15/briefs/ai-automation-for-small-business.md`: brief with the SERP snapshot for 3 queries, gaps, outline, sources and a do-not-claim list.
- `src/lib/posts/ai-automation-for-small-business.ts`: the post (`export const post: Post`).
- `public/blog/ai-automation-for-small-business/cover.svg` + `cover.webp` (38.4 KB): an "Automations" board in a browser window. Four workflows (inbox triage, invoices, order updates, lead follow-up) are drawn as step pipelines, with AI steps in blue and "Approval" steps in pink. Beside it are a "Waiting for approval" queue with Approve/Edit buttons and a card with "Human approval" on and "Auto-send" off. UI labels only.
- Five original SVG charts (3.2 to 5.7 KB each). Each was rendered to PNG with sharp and checked:
  - `use-case-map.svg`: the eight workflows on a 2×2 of how often the job happens against what a mistake costs (labelled Arrowbin judgment).
  - `automation-anatomy.svg`: six steps (trigger, AI step, checks, approval, action, log) with a "low risk, checks pass" bypass.
  - `scoring-example.svg`: the four-factor score for a hypothetical 20-person trades firm (320 / 225 / 12), with the 60 and 150 cut-off zones (labelled illustrative).
  - `autonomy-ladder.svg`: shadow, approve, sample, alone, with "climb when" criteria.
  - `uk-ai-technologies.svg`: ONS Wave 159 technology shares (LLMs 18%, visual content 16%, ML data processing 12%, image processing 6%, robotics 2%, other 2%), plus a side panel with 28% of firms with 0 to 9 employees vs 49% of firms with 250 or more.

### Shape
- Body text is 3,000 words counting tables and headings: 2,487 of prose and lists, 389 in tables, 124 in headings. FAQ adds 430 words.
- 10 question H2s, each opening with a direct answer. The use-case section has 8 H3s, one per workflow.
- Two tables:
  - use cases: workflow, what it saves, main risk, human step, buy or build;
  - the scoring worksheet: factor, scores 1/3/5, how to check it.
- One `cta` after the use-case table: "Not sure which of the eight fits your business?", linking to /contact as "Ask which to automate first".
- 7 takeaways and 8 FAQs. The FAQs are about ChatGPT alone, technical staff, human in the loop, existing software, measuring, data to keep out, five-person firms and mistakes. None repeats the cost post's FAQ.
- Closing H2: "What can you do this week?"
- Internal links (6):
  - `/services/ecommerce-development`
  - `/blog/chatgpt-shopping-for-online-stores`
  - `/blog/ai-agent-cost-small-business`, for all money questions
  - `/services/custom-software-development`
  - `/services/ai-automation`, in the closing section
  - `/contact`, in the cta
  - The booking link appears once, in the closing section.
- Cannibalisation: the post gives no prices. Its keywords leave out "ai agent for small business" and every "cost" or "agency" variant (C-6).
- Scoring method: score volume × repetitiveness × error cost (scored backwards) × data availability, each from 1 to 5, with 625 as the maximum. The post explains why the factors are multiplied instead of added. The cut-offs (over 150 start, 60 to 150 later, under 60 leave it) are labelled as our rule of thumb. The worked example is labelled made-up.

### External sources cited (all opened 15 Oct 2026)
- https://census.gov/library/stories/2026/05/ai-use-businesses.html
  - US use of AI hovered between 17% and 20% from Dec 2025 to May 2026.
  - Under 20% of firms with 4 or fewer employees used AI. Use did not change significantly for firms with fewer than 20 employees.
  - Retail Trade was around 14%.
- https://cy.ons.gov.uk/businessindustryandtrade/business/businessservices/articles/artificialintelligenceinukbusinesses/2023to2026
  - 28% of firms with 0 to 9 employees vs 49% of firms with 250 or more.
  - Technology shares, for firms with 10+ employees in June 2026: LLMs 18%, visual content 16%, ML data processing 12%, image processing 6%, robotics 2%, other 2%.
  - Earlier analysis found "difficulty identifying business use cases" a leading barrier, followed by cost and lack of expertise.
- https://www.frbsf.org/research-and-insights/publications/community-development-research-briefs/2026/07/ai-adoption-in-small-businesses-2024-sbcs/: the reasons non-adopters gave (accuracy and IP, human interaction, lack of perceived relevance).
- https://genai.owasp.org/llmrisk/llm01-prompt-injection/: the definition of indirect prompt injection, the email-assistant scenario, and the least-privilege and human-approval mitigations.
- https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/invoice: the prebuilt invoice model extracts key fields and line items into JSON and supports 27 languages.
- https://www.intercom.com/help/en/articles/7120684-fin-ai-agent-explained: Fin can learn from help center articles, PDFs and webpages, and "will always automatically hand off when that is the safest option".
- https://help.shopify.com/en/manual/shopify-flow: Flow is a free app on the Basic, Grow, Advanced and Plus plans.
- https://support.google.com/notebooklm/answer/16164461: the help page calls the tool "Gemini Notebook", and its answers are grounded in your sources with in-line citations.

### Checks
- `python -I docs/seo/13-sprint-2026-10-15/tools/ai_tells.py`: no HARD or WARN lines.
  - sd 9.4; 25% short sentences.
  - 3 triplets (0.8 per 1k words).
  - 67 contractions (17.1 per 1k words).
- `pnpm tsc --noEmit -p .`: exit 0.
- `pnpm biome check --write` on the post: clean.
- Em dash grep (U+2014) on the post, all SVGs and the brief: no matches. A grep for the banned words also finds nothing.
- Palette: brand colours plus light tints of them (#e6e1ff, #ffe1ef, #a99cf5) and the dark plasma text colour #c2186f that W4's cover also uses. No green, no cream.

### For the founder to confirm
1. **Our judgment calls presented as Arrowbin practice:**
   - the use-case map positions;
   - the scoring cut-offs (150 and 60);
   - the autonomy ladder ("Arrowbin's rollout pattern");
   - the six-step build pattern;
   - the pre-flight checklist ("the pre-flight list we run").
   Please confirm these describe how you actually scope and roll out automations.
2. **Test set size.** The post says 50 to 100 past examples, to match the AI cost post's pilot plan.
3. **Vendor names.** Intercom, Microsoft, Shopify Flow, Google's notebook tool, n8n, Zapier and Make are named as examples, not endorsements. Google's help page now titles the tool "Gemini Notebook" while the URL still says NotebookLM, and the post uses the help page's name.
4. **The "trades firm" worked example** is hypothetical and labelled as such.

### Inbound links to add in other posts (not edited by me)
- `src/lib/posts/ai-agent-cost-small-business.ts`, the "What can an AI agent do" section (line ~169), in "Where you draw that line depends on what a wrong answer costs.": link "what a wrong answer costs" to `/blog/ai-automation-for-small-business`. The paragraph has no links today.
- `src/lib/posts/ai-agent-cost-small-business.ts`, closing section (line ~594), in "Pick the one job that eats the most staff hours and has a clear right answer.": link "the one job that eats the most staff hours" to `/blog/ai-automation-for-small-business`. The paragraph has no links today.
- `src/lib/posts/chatgpt-shopping-for-online-stores.ts`, MCP paragraph (line ~431). It already has 2 links, so split off its last sentence ("Our guide to what an AI agent costs...") into a new paragraph and add: "For which store jobs to hand to AI first, such as order-status replies, see [where to start with AI automation](/blog/ai-automation-for-small-business)."


## W13 developer-salaries-by-country

**Status:** done. Data post written from the primary dataset, CSV published, 5 charts plus cover, all checks clean. Not registered in `src/lib/posts/index.ts` (lead does that).

### Files (all new, owned by W13)
- `src/lib/posts/developer-salaries-by-country.ts`: the post. Title "Software Developer Salaries by Country in 2026 (Real Data)" (58 chars), category Guides, 2026-10-15. 9 question H2s (last one is the closing section), full 38-country results table, experience-band table, below-threshold table, salary-to-hourly formula with worked table, methodology with limitations, "What's in the CSV file?" (README line plus ODbL note) and "How to cite this data" H3s, 8 FAQs, 6 takeaways, 1 cta. Body about 2,390 words including table cells.
- `public/blog/developer-salaries-by-country/developer-salaries-by-country-2026.csv`: 46 rows (38 countries with a median, plus 8 must-cover countries below threshold with n only and a note). Columns: country, region, respondents_n, median_usd, p25_usd, p75_usd, n and median per wave (2025, 2026), n and median per experience band (0_4, 5_9, 10plus), note.
- `public/blog/developer-salaries-by-country/`: `cover.svg` + `cover.webp` (pay-dashboard mockup: country ranking card, stat tiles for 38 countries and 25,416 respondents, Download CSV button), `median-pay-by-country.svg`, `pay-range-by-region.svg`, `pay-by-experience.svg`, `survey-vs-official-pay.svg`, `salary-to-hourly-rate.svg`. All 22px+ text (labels 24 to 46px), on palette, no green or cream, each under 6 KB; all rendered to PNG and viewed.
- `docs/seo/13-sprint-2026-10-15/tools/salary_by_country.py`: standard-library analysis script, re-runnable yearly (`--wave YEAR=path` per survey file). Method constants and the yearly re-run steps are in its docstring.

### Data and method
- Source: Stack Overflow Developer Survey public results files, GitHub archive `StackExchange/Survey/packages/archive/2025` and `/2026`. **A 2026 survey exists** (fielded June 23 to August 5, 2026; 30,903 valid responses, 169 countries per survey.stackoverflow.co/2026/methodology), so I used it. 2026 alone has too few respondents outside the big markets (Bangladesh 17 after cleaning), so the post **pools the 2025 and 2026 waves**. Justification shown in the post: large-sample medians barely move between waves (US $155,000 in both, India $19,761 vs $19,586, Germany $83,531 vs $81,884). Per-wave medians are in the CSV.
- Licence confirmed on the archive README and survey site footer: ODbL 1.0 for the database, DbCL 1.0 for contents, attribution "Stack Overflow Developer Survey, Stack Exchange Inc." Post carries the attribution, an ODbL link next to the CSV description, and a suggested citation. The CSV is a derived database under ODbL.
- Files were downloaded (LFS media URLs) into their own scratchpad folders and read only with `python -I` scripts kept elsewhere. SHA-256 matched the LFS pointers: 2026 `survey_results_public.csv` ad520b4d...fc2c (122 MB; the download host sent a Last-Modified of 15 Oct 2026 03:02 GMT for the 2026 schema file, which may only be a cache time, so the hash is recorded in case the file changes), 2025 `results.csv` 2d1f6530...aaa (141 MB).
- Filters: developers by profession (2025 MainBranch "I am a developer by profession"; 2026 CodeMain "I create code as a primary part of my job") with Employment "Employed". **Neither wave separates full-time from part-time any more**, so "employed full-time" from the brief became "employed (not freelance or self-employed)"; the post says so. Pay = ConvertedCompYearly (survey's own USD conversion; SO does not name the FX source or date). Dropped values under $1,000 or over $1,000,000 (599 of 26,015 answers). Thresholds: country n >= 100 pooled; band n >= 50; per-wave median n >= 100. Rounded to whole dollars.
- Cross-checks: BLS OOH May 2025 median $134,040 (software developers, QA analysts and testers; verified on the page) vs survey US $155,000, +16%. ONS ASHE 2025 provisional, table 14.7a, full-time, SOC 2134 programmers and software development professionals: £56,914 (parsed from the ONS zip) vs survey UK respondents paying in GBP £70,000 (n=1,746), +23%. Gap explained in the post (self-selection, 68% of US respondents have 10+ years, total comp vs wage measures, coverage).
- Hourly formula: rate = pay x (1 + on-costs + overheads) / billable hours / (1 - margin), with illustrative 30% / 25% / 1,500 h / 20%, labelled "not Arrowbin prices". US benefits load sourced from BLS ECEC June 2026 (benefits 30.0% of total comp, $14.07 on $32.82 wages, about 43% of wages). No Arrowbin rates published.
- Re-ran the script at the end: CSV byte-identical. A separate check script confirmed every row of the results, experience, below-threshold and hourly tables, the per-wave figures and every quoted ratio match the CSV exactly.

### Headline numbers (pooled 2025 + 2026, employed developers)
1. United States median $155,000 (n=6,098)
2. United Kingdom $95,299 (n=1,757); Germany $83,340 (n=2,472)
3. Poland $55,040 (n=534)
4. India $19,761 (n=1,149): US is 7.8x India
5. Pakistan $9,937 (n=107): US is 15.6x Pakistan, the lowest published median
- Experience: India 0-4 yrs $9,299 (n=449) vs 10+ yrs $40,684 (n=356), 4.4x; US $94,000 (n=711) vs $171,000 (n=4,133), 1.8x. So US/India is 10.1x for early-career but 4.2x for 10+ years.
- **Below threshold, no median published:** Bangladesh 92, Indonesia 61, Nigeria 60, Philippines 60, Egypt 55, Sri Lanka 46, Vietnam 35, Nepal 28. Because Bangladesh misses the bar, the TL;DR uses US/India and US/Pakistan instead of a US/Bangladesh ratio.

### Checks
- `ai_tells.py`: no WARN or HARD (sd 9.7, 19% short sentences, top opener "in" 5%, 3.9 triplets per 1k words, 20.7 contractions per 1k).
- `pnpm tsc --noEmit -p .`: exit 0. `pnpm biome check --write` on the post: clean (formatted).
- `grep -nP '\x{2014}'` on the post, SVGs, CSV and script: nothing.
- Links: internal = CSV (intro and CSV section), cost guide, how-to-choose, mvp-development-cost, /services/custom-software-development, /contact once (closing). The cta uses `site.bookingUrl` so /contact appears only once. External (all opened): GitHub survey archive, SO 2026 methodology, BLS OOH, BLS ECEC, ONS ASHE table 14 page, ODbL 1.0.

### Where a link to this post fits in the cost guide (`src/lib/blog.ts`, not edited)
- Line ~301, end of the paragraph before the regional rate chart: "These are Arrowbin estimates of blended agency rates, not published survey figures, so use them to compare regions rather than to price a specific quote." Suggested addition: "For the sourced pay figures underneath them, see our [developer salaries by country](/blog/developer-salaries-by-country) data." (clusters.md item 5 also suggests shrinking this table to a summary once the post is live.)
- Line ~109: "...checked against public [developer salary data](https://survey.stackoverflow.co/)." Retarget this link to `/blog/developer-salaries-by-country` (anchor e.g. "our analysis of public developer salary data").
- Line ~242: "A developer in San Francisco and one in Dhaka with identical skills can have a 4–5x difference in rate (Arrowbin estimate)." A link on "difference in rate" fits here.

### Needs the founder's eyes
- The cost guide's "4–5x" San Francisco vs Dhaka claim: the data has no Bangladesh median; US/India is 7.8x at the median but 4.2x at 10+ years, so "4–5x" is consistent only for senior developers. Consider rewording to "for senior developers".
- The illustrative formula maps the US median salary to about $200/hour, above the cost guide's North America band ($120–180, Arrowbin estimate). The post does not compare the two directly, but a careful reader might. Lower overheads or margins bring the US figure into that band; the founder may want to note this in the guide.
- Pooling two survey waves and the "Employed" definition (no full-time split) are judgement calls; both are disclosed in the methodology.
- ONS figure is the 2025 provisional release; ONS usually publishes the next ASHE release (revised 2025, provisional 2026) in the autumn, so refresh that one line when it appears.
