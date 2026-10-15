# PB (JavaScript up front): report, 15 Oct 2026

Workspace `C:\tmp\perf-2` (prod 3212, dev 3312). Final build verified; all numbers below are from that copy on this machine, with the other agents running at the same time.

## Summary

- **Service pages:** every one of the 8 service pages shipped all 8 services' demos (151 KB raw / 42 KB gz). Each page now downloads only its own demo through `next/dynamic`. That cuts first-wave JS by 26 to 34 KB gz (Lighthouse transfer: 224 KB to 191-198 KB).
- **/contact:** shipped the whole `services.ts` data module for 8 names. It now gets a slim prop, and the form island loads at hydration: first wave -13.7 KB gz, mobile 87 to 90, LCP 3.46 s to 3.29 s.
- **/about:** `AboutValues` loads at hydration: first wave -4 KB gz, about neutral (88 to 89).
- **Home, /work, /blog, the post and /services: left as they were.** Deferring islands on pages that have the paint stall made Lighthouse *worse* (see root cause 4). I tried it on home, /work and the post, measured it, and reverted it.
- **SSR HTML:** visible text and markup are identical on all 15 pages checked, with scripts stripped and React `useId` values normalised.
- **Visual and interaction checks:**
  - Pixel diffs show only continuously animated elements.
  - 138 interaction checks pass in dev and prod, on desktop and mobile.
  - Every control on all 8 service pages hydrates and responds.

## Root causes (with evidence)

### 1. Every service page shipped all eight services' demos
- `services/signature/ServiceSignature.tsx` (a server component) statically imported all 8 signature components. `services/[slug]/page.tsx` statically imported every bespoke widget.
- In the app router, a page's first scripts contain every client component imported anywhere in its server module graph, whether rendered or not.
- Chunk `3o34y24teowvx.js` was 151 KB raw / 42.9 KB transfer, in the `<head>` of all 8 service pages. Split by module (gz):

  | Module | gz |
  |---|---|
  | AgentSignature | 5.6 KB |
  | FidelitySignature | 5.4 KB |
  | PhoneSignature | 4.7 KB |
  | PipelineSignature | 4.2 KB |
  | DecaySignature | 3.7 KB |
  | ScaleSignature | 3.7 KB |
  | OrderRace | 3.3 KB |
  | FunnelSignature | 3.1 KB |
  | GroundedChat | 2.9 KB |
  | UxAudit | 2.7 KB |
  | IncidentPlans | 2.6 KB |
  | MvpScoper | 2.5 KB |
  | AutoscaleLive | 2.5 KB |
  | ServiceQuoteForm | 2.5 KB |
  | StoreAnatomy | 2.4 KB |
  | TokenPlayground | 2.2 KB |
  | RoiCalculator | 1.9 KB |
  | PlanToggle | 1.2 KB |

- The custom-software page uses only OrderRace and the quote form.

### 2. `services.ts` data in client bundles
- `ContactBrief` imported `services` (all intros, FAQs and process steps) to render 8 chip names. That module costs 29.8 KB raw / 10.4 KB gz in the /contact first wave.
- Home carries the same 10.4 KB gz through `components/home/motion/ServicesMotion.tsx`, which reads only `services.length`. That file belongs to another agent; see "Found, not fixed".

### 3. Why not `<Suspense>`, and where `next/dynamic` fits
- **`<Suspense>`:** React's server renderer outlines any boundary over 500 bytes once the shell has flushed more than 12.8 KB.
  - Source: `react-dom-server` `flushSegment` + `isEligibleForOutlining`, `progressiveChunkSize` 12800.
  - That outlining produces the "hidden block after `</main>`" the page comments warn about. So no Suspense boundaries are used anywhere.
- **`next/dynamic` with SSR (default):** its `PreloadChunks` (`next/dist/shared/lib/lazy-dynamic/preload-chunks.js`) calls `ReactDOM.preload(chunk, {as: "script", fetchPriority: "low"})` during SSR.
  - That adds a `<link rel="preload">` in `<head>` for only the demos the page renders.
  - So the download timing is unchanged and only unused code is removed. That is exactly what the service pages need.
- **Plain `React.lazy` with no boundary** (`components/home/islands.tsx`):
  - On the server, the static prerender keeps the content in place.
  - On the client, React 19 treats an unresolved lazy as `SuspenseException` (`resolveLazy`). With no boundary above it, the hydration work loop yields (`SuspendedOnData`) and resumes at the same fiber when the chunk lands. There is no fallback and no re-render, and the page commits once, in the same order as before.
  - `IslandPreload` starts all of a page's island downloads together at hydration, so there is no waterfall. Verified in the Lighthouse network log: the island chunks start within 2 ms of each other.

### 4. Deferring to hydration only pays where first paint comes before hydration
- Lantern's pessimistic graph takes every request started before the **observed** LCP. A chunk fetched at hydration also hangs one level deeper (HTML, then a script, then the hydration task, then the chunk).
- Where observed LCP is early (/contact 0.2 s, /about 0.4 s), deferred islands leave the graph: a win.
- Where it is late (home 1.3 s; /work, the post and the service pages 1.3 or 2.3 s), the deferred chunks are still inside the graph, one level deeper.
  - Measured on home: simulated LCP 3.60 s to 4.01 s, with pre-LCP JS 195 KB to 204 KB.
  - /work 4.25 s to 4.41 s.
  - The post was mixed.
  - So those pages were reverted to static imports.
- **The observed first paint is quantised to about 1 s ticks:** 0.2-0.4 s, about 1.3 s or about 2.3 s, on every page, and it varies from run to run.
  - Within a page, simulated LCP is set mostly by which tick a run lands on, not by the code.
  - Example: the original custom-software code, re-measured in this session, gave 4.26 to 4.29 s at the 1.3 s tick and 4.56 s at the 2.3 s tick.
  - So I compare runs that landed on the same tick ("matched") as well as medians.

## Files changed (paths relative to the repo root)

| File | Change |
|---|---|
| `src/components/services/signature/demos.tsx` (new) | `"use client"`; `next/dynamic` exports for the 8 signatures and the 9 page widgets, one chunk each |
| `src/components/services/signature/ServiceSignature.tsx` | imports the 8 signatures from `./demos` instead of statically |
| `src/app/services/[slug]/page.tsx` | imports StoreAnatomy, MvpScoper, UxAudit, TokenPlayground, GroundedChat, RoiCalculator, AutoscaleLive and IncidentPlans from `demos` |
| `src/components/services/saas/SaasPlumbing.tsx` | `PlanToggle` from `../signature/demos` |
| `src/components/home/islands.tsx` (new) | `"use client"`; `React.lazy` islands (no Suspense, no preload link) + `IslandPreload`; exports `AboutValues`, `ContactBrief` |
| `src/app/contact/page.tsx` | `ContactBrief` from `islands` + `IslandPreload`; passes `services={slug, name}[]` |
| `src/components/contact/ContactBrief.tsx` | takes the slim `services` prop instead of importing `@/lib/services` (same chips, same `?service=` preselect) |
| `src/app/about/page.tsx` | `AboutValues` from `islands` + `IslandPreload` |

No other files differ from the original. `ServiceHero.tsx`, `Cta.tsx`, `Bento.tsx`, `app/page.tsx`, `work/page.tsx`, both blog pages and `services/page.tsx` were changed during testing and then restored byte-identical.

Note for merging: `next dev` wrote an `AGENTS.md` into `C:\tmp\perf-2` ("Generated AGENTS.md for AI agents"). Do not copy it. Also, the main repo has since changed `ArrowField.tsx`, `LiquidCanvas.tsx`, `Navbar.tsx`, `InnerMotion.tsx` and `useIdleEffect.ts`; my copy still has the old versions, so merge only the 8 files above.

## Lighthouse (lh.py, 3 runs each, medians; same machine; other agents running)

"Before" is the untouched copy. "After" is the final code: custom software and /contact from the final build; mobile, SaaS, /about and home from the previous build, whose code and chunks for those pages are identical.

| Page | Mobile before | Mobile after | LCP before to after | TBT before to after | Desktop before to after |
|---|---|---|---|---|---|
| /services/custom-software-development | 78 | 79 | 4.27 to 4.48 s* | 286 to 142 ms | 99 to 99 |
| /services/mobile-app-development | 79 | 86 | 4.41 to 3.96 s | 157 to 128 ms | 99 to 99 |
| /services/saas-product-engineering | 80 | 81 | 4.14 to 4.30 s* | 297 to 130 ms | 99 to 99 |
| /contact | 87 | 90 | 3.46 to 3.29 s | 201 to 145 ms | 99 to 100 |
| /about | 88 | 89 | 3.43 to 3.43 s | 178 to 178 ms | 99 to 99 (CLS 0.055, pre-existing) |
| / (code unchanged) | 68** | 75 | 3.60 to 3.81 s | 804** to 442 ms | 98 to 99 |
| /work, /blog, the post | code unchanged, not re-measured | | | | |

\* These medians come from runs on different paint ticks. Before: custom 0 of 3 runs on the slow 2.3 s tick, SaaS 1 of 3. After: custom 3 of 3, SaaS 2 of 3. Matched-tick comparison, simulated LCP:

| Page | Tick | Before | After |
|---|---|---|---|
| custom | 1.3 s | 4.26-4.29 s | 4.10 s |
| custom | 2.3 s | 4.56-4.57 s (A/B re-run of the original code) | 4.48-4.49 s |
| mobile | 1.3 s | 4.06 s | 3.49 / 3.96 s |
| mobile | 2.3 s | 4.38-4.42 s | 4.31 s |
| SaaS | 1.3 s | 4.01 / 4.14 s | 3.93 s |
| SaaS | 2.3 s | 4.43 s | 4.30 s |
| contact | 0.2 s | 3.45-3.47 s | 3.20-3.31 s |

So on service pages the change is worth about 0.1 to 0.2 s of simulated LCP at a given tick. The tick itself (agent PA's paint stall) is worth 0.3 to 0.5 s.

\*\* TBT on home is very noisy here: the before runs overlapped my screenshot job. The home code is unchanged.

**First-wave JS** (scripts and script preloads in the initial HTML).

Local gzip of the chunk files:

| Page | Before | After | Change |
|---|---|---|---|
| custom software | 204.9 KB | 171.3 KB | -33.5 KB |
| mobile | 204.9 KB | 172.7 KB | -32.1 KB |
| SaaS | 204.9 KB | 175.6 KB | -29.3 KB |
| e-commerce | 204.9 KB | 173.6 KB | -31.2 KB |
| AI | 204.9 KB | 178.4 KB | -26.4 KB |
| /contact | 168.5 KB | 154.8 KB | -13.7 KB |
| /about | 166.5 KB | 162.6 KB | -4.0 KB |
| home | 177.2 KB | 178.5 KB | +1.3 KB |
| /work, /blog, the post, /services | unchanged | unchanged | 0 |

The home +1.3 KB gz has identical raw bytes. Turbopack now splits home's page chunk into two files: a shared chunk with next/image, ArrowField, Faq and Magnetic, plus the rest. Same code, slightly worse compression.

Lighthouse transfer, mobile run 0:

| Page | Before | After |
|---|---|---|
| custom software | 224.4 KB | 190.6 KB |
| mobile | 224.4 KB | 192.0 KB |
| SaaS | 224.4 KB | 197.7 KB |
| /contact | 184.9 KB | 171.1 KB |
| /about | 184.4 KB | 180.5 KB |
| home | 194.8 KB | 196.3 KB |

All JS a service page downloads in the whole run: 311.5 KB before, 274-279 KB after.

## SSR HTML check
- `curl` of 15 pages (home, /services, all 8 service pages, /work, /about, /contact, /blog, a post).
- With `<script>` and script preloads stripped, and React `useId` values normalised, visible text and markup are **identical on all 15 pages**.
- The only additions:
  - service pages gain 1 to 3 `<link rel="preload" as="script" fetchpriority="low">` (their own demos);
  - /contact's RSC payload gains about 700 bytes (the slim service list).
- No `<!--$-->` boundaries were added, and nothing was moved after `</main>`.

## Visual diff (Playwright, 1440x900 and 390x844, 11 scroll positions per page, 1.8 s settle)
- Pages: 5 service pages, /about and /contact, final build against the untouched build. Earlier rounds also covered home, /work, /blog and the post.
- **/contact: 0 differing pixels at every position.**
- Every other difference sits on continuously animated elements, at the same magnitude as two captures of the *same* build:
  - the CTA ArrowField canvas and the `sa-ring` pulse (0.3 to 3.9%);
  - the ServiceArt icon loops;
  - the hero art bob;
  - OrderRace's running timer;
  - the live clock and typing tile, the logo marquee and the LiquidCanvas WebGL hero (round 1 only).
- **One non-animated difference:** custom-software position 06, the ServiceWork screenshots (about 1%).
  - Zoomed, the before frame is softer and the after frame is sharp; there is no shift (best 2D offset is 0,0).
  - Two captures of the after build agree, so the before capture caught the next/image blur placeholder still fading out.
  - The markup is identical, and the settled state is the sharp one.
- Diff images are in my scratchpad (`shots-diff*`).

## Interaction checks (founder rule: each action more than once)
- Playwright, final code in both `next dev` and the prod build, desktop and mobile: **138 of 138 pass**, with no hydration warnings or errors. Coverage:
  - home: Testimonials next x3, previous, drag-throw; live clock ticks; typing tile; FAQ 5-click sequence; CTA magnetic pull;
  - custom software: quote form hydrated, OrderRace range x2, race button, FAQ;
  - mobile: platform toggle x3, FAQ;
  - SaaS: PlanToggle on/off, scale range x2, FAQ;
  - /work: view and filter buttons x3;
  - /about: AboutValues picks x4;
  - /contact: `?service=` preselect, 9 chips, chip toggles x3, FAQ;
  - post: share links, reading progress x2, TOC jumps x2, FAQ.
- All 8 service pages: every `button` / `input` / `tab` in `<main>` is hydrated (14 to 34 controls per page), and clicking each demo button twice changes the DOM. No console errors.
- Console warnings seen on both dev and prod after the change: `rotateX/rotateY not eligible for reset` (GSAP, from a motion file that is not mine) and WebGL `ReadPixels` driver notes. I did not check whether they appeared before.

## Heavy dependencies
- gsap is a lazy chunk, not in any first wave: 70.6 KB raw / 27 KB gz, plus ScrollTrigger 43 KB raw / 17 KB gz.
- lenis is a lazy chunk, not in any first wave: 18.7 KB raw / 5.5 KB gz.
- No three.js and no icon library (`components/ui/Icon.tsx` is hand-written SVG).

## Found, not fixed (and why)
1. **`src/components/home/motion/ServicesMotion.tsx` (another agent's file) imports `services` from `@/lib/services` only for `services.length`.**
   - It puts the whole data module (29.8 KB raw / 10.4 KB gz) into home's first wave.
   - Fix: pass the count as a prop from `Services.tsx`, or hardcode/derive it on the server. This is the largest remaining first-wave cut on home.
2. **The paint stall (agent PA's area) decides the score more than the bytes do.**
   - Observed FCP lands on about 1 s ticks (0.2, 1.3 or 2.3 s). In the r1 trace it fell right before gtag's `lazyOnload` start, i.e. near load plus idle.
   - At the 2.3 s tick the pessimistic graph also swallows gsap, lenis and the island chunks (custom software: 279 KB of JS before LCP against 228 KB at the 1.3 s tick).
   - Once the stall is gone (observed LCP under about 0.4 s), these are ready-made `islands.tsx` candidates that should then help rather than hurt: home Testimonials, Faq, the Bento live tiles; /work WorkExplorer; the post's Toc, ShareLinks and ReadingProgress; /services Capabilities.
   - I measured them as a net loss *with* the stall, so they are not shipped.
3. **next/image's client half is in the first wave of every page that uses `<Image>`:** about 10 KB raw / 5 KB gz (`Image`, `getImgProps`, loader). That is the framework's own; not touched.
4. **`InnerMotion` (5.2 KB raw) and `ArrowField` (2.3 KB raw) are static on every inner page;** both are other agents' files.
5. **/services index:** `Capabilities` and the FAQ could be deferred (its observed LCP is about 0.4 s). Reverted only because I had no same-session baseline or before screenshots for that page.
6. **CLS:** /contact mobile 0.066, /about desktop 0.055 and /blog desktop 0.063 are unchanged and pre-existing; not in my scope.
