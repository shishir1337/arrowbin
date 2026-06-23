# Service Detail Page — Spec (Arrowbin)

A build-it-once playbook for `/services/[slug]` pages that convert *and* rank (SEO + AEO + GEO + AIO). Brand: monochrome (charcoal `#0a0a0a`) + electric lime (`#a3e635` / `#65a30d`), "Feature-Rich Showcase" style, Next.js 16 + Tailwind v4 + GSAP.

---

## 1. Goals

A service page must do four jobs at once:

1. **Convert** — a visitor with intent ("custom software company") should quickly trust us and book a call.
2. **Rank (SEO)** — target the service head term + long-tail; clean metadata, headings, internal links.
3. **Answer (AEO/GEO)** — open with a direct, extractable answer; question-style H2s; FAQ schema; so answer engines and AI Overviews quote us.
4. **Prove (E-E-A-T)** — show real work, real outcomes, transparent pricing, ownership and support.

### What's wrong with the current page (baseline)
- Hero is a plain icon + text; no punch, no trust signal.
- Benefits read as features, not outcomes.
- No social proof / stats / featured work → weak conversion.
- No "who it's for" / use-cases → visitors can't self-qualify.
- No content-cluster links to the blog (cost / choose / MVP guides) → weak SEO + lost internal linking.
- `Service` JSON-LD is minimal (no offer catalog, no provider detail).
- No answer-first overview for AEO/GEO.

---

## 2. Page structure (top to bottom)

| # | Section | Purpose | Notes |
|---|---------|---------|-------|
| 1 | **Hero** | Hook + intent match + first CTA | Eyebrow (icon + "Service"), `<h1>` = service heading, **answer-first** 1–2 sentence sub, two CTAs ("Discuss your project" → `/contact?service=`, "Book a call" → cal.com). Lime radial-glow + grid texture background. Small trust strip under CTAs (e.g. "Own your code · Senior team · BD + USA"). |
| 2 | **Stats / outcomes band** | Instant credibility | 3 outcome statements per service (benefit-oriented), in a bordered band. Animated counters where numeric. |
| 3 | **Overview (answer-first)** | AEO/GEO direct answer | A short "What is / Why it matters" block whose **first sentence directly answers** the implied question ("Custom software development is …"). 2–3 short paragraphs. |
| 4 | **Who it's for** | Self-qualification | 4–6 `idealFor` use-cases as a checklist or small cards. |
| 5 | **What you get (benefits)** | Value, as outcomes | Keep the card grid but phrase as outcomes. |
| 6 | **What we deliver + tech** | Concrete scope + credibility | Two columns: deliverables checklist + tech chips. |
| 7 | **How we deliver (process)** | De-risk | 4 numbered steps. |
| 8 | **Featured work** | Proof | 2–3 relevant portfolio projects (`relatedWork`), with screenshots, linking out; fallback "See all work" → `/work`. |
| 9 | **Why Arrowbin** | Trust (shared) | 4 shared trust points: own your IP, senior team, transparent fixed pricing, post-launch support. |
| 10 | **Related guides** | Content cluster (SEO/GEO) | 1–3 relevant blog posts (`relatedPosts`) as cards with thumbnails. |
| 11 | **FAQ** | AEO + objections | Answer-first Q&A pairs → FAQPage schema. |
| 12 | **Related services** | Internal linking | 3 sibling services. |
| 13 | **CTA section** | Final conversion | Existing `CTASection`, service-specific title. |

Sections 9 (Why Arrowbin) and the trust strip are **shared** across all services (no per-service content needed). Everything else is data-driven.

---

## 3. Data model additions (`src/lib/services.ts`)

Add to the `Service` type (all required unless noted):

```ts
/** One-sentence direct answer for the overview/AEO (e.g. "Custom software development is …"). */
answer: string;
/** 2–3 outcome statements for the stats band (benefit-first, e.g. "Cut manual work"). */
outcomes: { value: string; label: string }[];
/** Who this service is for — use cases for self-qualification. */
idealFor: string[];
/** Portfolio project names (from portfolio.ts) to feature as proof. Optional. */
relatedWork?: string[];
/** Blog slugs for the content cluster. Optional. */
relatedPosts?: string[];
```

Keep existing fields (`benefits`, `deliverables`, `tech`, `process`, `faqs`, etc.).

---

## 4. Design / UX

- **Style:** Feature-Rich Showcase — feature/benefit cards, grid, card hover lift (color/border, never layout-shifting scale), scroll-reveal via existing `Reveal`/`StaggerGroup`.
- **Container:** site `max-w-7xl` everywhere — consistent with the rest of the site.
- **Hierarchy:** one `<h1>`; section headings `<h2>`; card titles `<h3>`. Question-style H2s where natural (good for AEO).
- **Color:** lime accent for eyebrows/CTAs/icons; muted text ≥ 4.5:1; dark mode parity.
- **Motion:** GSAP transform/opacity only; honor `prefers-reduced-motion`; content visible without JS (the `.js`-gated reveal pattern).
- **Accessibility:** visible focus, 44px targets, alt text on work screenshots, labeled links, semantic landmarks.
- **Performance:** static generation; `next/image` for work screenshots (lazy, sized → no CLS); no new render-blocking JS.

---

## 5. Structured data (`src/lib/schema.ts`)

Enhance `serviceSchema` to emit a richer `Service` node:

- `serviceType`, `name`, `description`, `url`, `provider: { @id ORG }`.
- `areaServed: ["Worldwide", "United States", "Bangladesh"]`.
- `hasOfferCatalog` → `OfferCatalog` whose `itemListElement` is the service's deliverables (as `Offer` → `Service`).
- `audience` (optional) from `idealFor`.
- Keep `BreadcrumbList` + `FAQPage` already on the page.
- Do **not** add `aggregateRating` until real reviews exist.

---

## 6. Internal linking / content cluster

- Each service links to **related blog guides** (`relatedPosts`) and **related services** (siblings).
- Where relevant, link a phrase in the overview to the cost/MVP guide.
- Featured work links out to the live sites and to `/work`.
- This builds the hub-and-spoke topical authority Google + LLMs reward.

---

## 7. Conversion elements

- Two CTAs in the hero (project enquiry + book a call), repeated in the final CTA section.
- Trust strip + stats band high on the page.
- Featured work + "Why Arrowbin" before the final CTA.
- Pricing transparency signalled ("fixed estimate after a free call") rather than a fake price.

---

## 8. Pre-delivery checklist

- [ ] Hero: eyebrow, h1, answer-first sub, 2 CTAs, trust strip.
- [ ] Stats/outcomes band (3 per service).
- [ ] Answer-first overview (first sentence = direct answer).
- [ ] "Who it's for" use-cases.
- [ ] Benefits (outcome-phrased) + deliverables + tech.
- [ ] Process (4 steps).
- [ ] Featured work (2–3 projects w/ screenshots) or "See work" fallback.
- [ ] Why Arrowbin (shared trust).
- [ ] Related guides (blog) + related services.
- [ ] FAQ + enhanced Service/FAQ/Breadcrumb JSON-LD.
- [ ] One h1, question H2s, alt text, focus states, reduced-motion.
- [ ] `pnpm lint` + `pnpm build` clean; page static.
```
