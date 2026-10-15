# PA report: fonts, CSS and HTML weight (15 Oct 2026)

Workspace: `C:\tmp\perf-1` (prod build served on port 3211, dev checked on 3311). Only two files changed: `src/app/layout.tsx` and `src/app/globals.css`. `next.config.ts`, `Crumbs.tsx`, `JsonLd.tsx` and `schema.ts` are unchanged.

## TL;DR

1. **All three web fonts are now preloaded.** Anybody was the only one left out, and Geist Mono keeps its preload.
   - Why this helps: in Lighthouse 12's FCP simulation, a font found through the stylesheet gets "VeryHigh" priority and counts as render-blocking. A preloaded font gets "High" and does not count.
   - Result: simulated mobile FCP dropped by 0.15 to 0.30 s on every measured page. The CLS of 0.055 on desktop /about and 0.063 on desktop /blog is now 0.
2. **Dropping the Geist Mono preload (the lead's idea) makes things worse in Lighthouse.** I tested it: simulated FCP went up by 0.15 to 0.30 s and LCP did not change. I put the preload back.
3. **The Geist Mono swap shift is fixed at its root**, so CLS stays 0 even when the font arrives late (slow networks).
   - next/font's fallback for Geist Mono was Arial scaled to 134.59%, which is far too wide for capital letters.
   - It is replaced by system monospace faces scaled to Geist Mono's exact 0.6em character width.
   - With Geist Mono delayed by 1.5 s, the shift on 6 of the 8 service pages at 390 and 412 px went from 0.135-0.140 to 0.0000.
4. **CSS shrank from 160,589 to 144,135 bytes raw, and from 26,094 to 23,592 gz** (-10.2% raw, -9.6% gz). I removed dead rules and stopped Tailwind scanning 25 files that nothing imports.
5. **`experimental.inlineCss` is rejected.** It makes the home HTML 753 KB raw / 117 KB gz, against 301 KB / 41.7 KB without it.
6. **The HTML and RSC payload are not reduced by anything in my files** (the HTML grew 257 bytes from one more preload link). The biggest contributors sit in other agents' files; exact fixes are listed below.

## Root causes, with evidence

### A. How Lighthouse 12 (Lantern) treats fonts
I read the source in `@paulirish/trace_engine/models/trace/lantern`.

- **FCP**, in both the optimistic and the pessimistic graph, includes every network request with `hasRenderBlockingPriority()` that finished before the observed FCP.
  - `hasRenderBlockingPriority()` is true for priority `VeryHigh`, or `High` for scripts.
  - A font that Chrome discovers through the CSS gets `VeryHigh`, so it counts as render-blocking.
  - A preloaded font gets `High` and does not count.
- **LCP**, in both graphs, includes every request that finished before the observed LCP, except low-priority images. Preloading makes no difference here.
- **Evidence from the LH network logs** (home, mobile):
  - Baseline: Geist and Geist Mono were preloaded, priority High, finishing at 40 ms. Anybody was VeryHigh, starting at 295 ms and ending at 298 ms, with the observed FCP at 1342 ms. So Anybody's 58 KB was counted as render-blocking.
  - Variant A (Geist Mono not preloaded): Geist Mono became VeryHigh and finished at 405 ms. Simulated FCP went from 1669 to 1820 ms on home and from 1516 to 1813 ms on custom-software, while simulated LCP stayed at 4268 vs 4271 ms.
  - Final: all three fonts are High and start at 37 ms. Simulated FCP is 1361 ms on home and 1357 ms on custom-software.
- **Conclusion:** preloading takes a font out of the simulated FCP and leaves it in the simulated LCP either way. Fonts used above the fold should be preloaded, not left for the CSS to discover.

### B. Geist Mono shift (the old CLS of 0.139)
- Geist Mono is strictly monospaced: every glyph is 600/1000 em wide, with no kerning and no ligatures (checked with fontTools).
- next/font's automatic fallback is `local(Arial)` at `size-adjust: 134.59%`. That value matches lowercase width, but the labels are uppercase, and Arial's capitals at 134.59% are much wider. So breadcrumbs and labels wrap onto more lines until Geist Mono arrives.
- **Fix (`globals.css` plus the `fallback` option in `layout.tsx`):**
  - Three local monospace families, each scaled to an exact 0.6em advance, with ascent and descent matched to Geist Mono (1.005em / 0.295em):
    - ab-mono-a: Menlo / DejaVu Sans Mono, 1233/2048 em, `size-adjust` 99.66%;
    - ab-mono-b: Consolas, 1126/2048 em, 109.13%;
    - ab-mono-c: Courier New and its metric clones, Droid Sans Mono, Noto Sans Mono, 0.6 em.
  - Each family has its own regular and bold face, so no fake bold is synthesised.
  - Their `unicode-range` equals Geist Mono's latin subset, so they only ever stand in for characters Geist Mono itself draws.
  - Characters Geist Mono lacks, such as the arrows in labels like "SEE ALL WORK →", fall through to `ab-mono-arial`, a byte-for-byte copy of next/font's old "Geist Mono Fallback" face. So those glyphs render exactly as before.
  - I first shipped this without the unicode-range, and the pixel diff caught a changed arrow glyph. That is fixed and re-verified.
  - Across all 34 prerendered pages, no character falls in Geist Mono's range but is missing from the font. So once the font has loaded, the new faces render nothing.
- **Measured:** a Playwright harness delayed the Geist Mono files by 1.5 s and summed the `layout-shift` entries, on 16 pages at 390, 412 and 1440 px.
  - Before, 9 page/width pairs on 6 service pages shifted by 0.135 to 0.140 (`div.mt-10.grid`, the hero under the breadcrumb).
  - After, every one of the 48 page/width pairs is 0.0000.

### C. Desktop CLS on /about (0.055) and /blog (0.063)
- The elements Lighthouse reports as shifted are `main > section.relative.pb-20` (the post list on /blog) and `figure.svh-fade` on /about. Their hero `h1` changes height.
- With Anybody delayed in Playwright, the same shifts reproduce: /blog 0.082 and /about 0.053 at 1440 px. Delaying Geist (sans) causes nothing.
- The cause is the display face's fallback (Arial at 110.25%), which is wider than Anybody for capitals at `wdth` 104. "READ BEFORE" is about 975 px in the fallback against an 875 px column, so it wraps onto 2 lines and then snaps back.
- With Anybody preloaded, it lands before first paint. Lighthouse desktop CLS is now 0.000 on /about, /blog, the MVP post (was 0.025) and home (was 0.006).

### D. CSS (render-blocking on every page)
- Of the 160 KB, 124 KB is Tailwind utilities generated from `src/`; `globals.css` itself accounts for about 25 KB.
- **25 files are unreachable from `src/app`.** I checked with an import-graph script and confirmed with grep that none has a live importer:
  - all of `src/components/sections/`;
  - motion: `CountUp`, `CursorGlow`, `CursorGlowMount`, `Magnetic`, `Reveal`, `SpotlightCard`, `StaggerGroup`, `gsap.ts`, `useGsapReveal`, `useTilt`;
  - ui: `Breadcrumbs`, `Button`, `Container`, `Eyebrow`, `SectionHeading`.
  - They are now excluded with `@source not`, which removes about 70 classes found only in them.
- **The portfolio placeholder gradients** (`gradient` in `lib/portfolio.ts`, 16 `from-*` / `to-*` classes, about 4 KB raw) are never rendered by any component. They are excluded with `@source not inline(...)`.
- **Dead `globals.css` rules removed.** Each was grepped across `src/`, including `classList` calls and dynamic strings:
  - `.card-surface`, `.card-interactive`, `.glass`, `.glow-brand`, `.text-gradient` (and its `@supports`), `.rule-gradient`;
  - `.blob` and `@keyframes blob-drift`, `.spotlight` (3 rules), `.tilt`, `.glow-ring` (2 rules);
  - `.js [data-reveal]`, `.js [data-hero=*]` (6 rules) and `@keyframes hero-in`, `.js [data-countup]`, plus their reduced-motion overrides;
  - the tokens `--grad-*`, `--sheen`, `--shadow-card`, `--shadow-card-hover`, `--shadow-glow`, `--glass-bg` and `--z-*`.
- **Kept:** the `.lenis-*` classes (added by the library), `[data-hidden]` / `[data-state]` (set through `dataset` in `Cursor.tsx`) and `menu-in` (used from `Navbar.tsx`).
- **Check:** none of the 175 removed class selectors appears in the SSR markup or the RSC classNames of any measured page.

| | raw | gzip |
|---|---|---|
| main CSS before | 160,589 | 26,094 |
| main CSS after | 144,135 | 23,592 |
| font CSS before / after | 5,368 / 5,259 | 1,231 / 1,234 |

### E. `experimental.inlineCss` (Next 16.4.1; I read `inlineCss.md` first)
The docs say styles are duplicated in a `<style>` tag and in the RSC payload. Measured on the built HTML:

| page | without (raw/gz) | with inlineCss (raw/gz) |
|---|---|---|
| / | 301 KB / 41.7 KB | 753 KB / 117 KB |
| /blog | 230 / 30.6 | 682 / 106 |
| /about | 142 / 23.8 | 594 / 99 |

That roughly triples the bytes before LCP, so it is clearly worse. I did not run Lighthouse on it, and it is not adopted.

## Files changed

- `src/app/layout.tsx`:
  - Anybody `preload: true` (was false), with a comment explaining why;
  - Geist Mono keeps `preload: true` and gets `adjustFontFallback: false` with `fallback: ["ab-mono-a", "ab-mono-b", "ab-mono-c", "ab-mono-arial"]`.
- `src/app/globals.css`:
  - `@source not` for the 25 unused files and `@source not inline(...)` for the 16 unrendered portfolio gradient classes;
  - 7 `@font-face` rules: the width-matched mono fallbacks plus the Arial copy;
  - dead rules and tokens removed (listed in D).

## Lighthouse medians (3 runs, local prod build, three agents sharing the machine)

Mobile:

| page | before: score / LCP / TBT / CLS / FCP / SI | after |
|---|---|---|
| / | 81 / 3.59 / 323 / 0 / 1.66 / 3.67 | 80 / 3.71 / 345 / 0 / **1.36** / 3.71 |
| /services/custom-software-development | 78 / 4.27 / 294 / 0 / 1.52 / 3.22 | **86** / 3.69 / 213 / 0 / **1.36** / 1.66 (recheck on final build: 87 / 3.62 / 178 / 0 / 1.36 / 1.73) |
| /services/mobile-app-development | 78 / 4.43 / 206 / 0 / 1.36 / 4.72 | 81 / 4.38 / 111 / 0 / **1.21** / 4.58 |
| /work | 81 / 4.27 / 196 / 0 / 1.52 / 2.66 | 80 / 4.54 / 132 / 0 / **1.21** / 3.32 |
| /blog | 84 / 3.90 / 209 / 0 / 1.37 / 3.16 | **88** / 3.67 / 133 / 0 / **1.21** / 1.68 (recheck: 89 / 3.65 / 108 / 0 / 1.21 / 1.78) |
| /blog/how-long-does-it-take-to-build-an-mvp | 85 / 3.82 / 170 / 0 / 1.51 / 3.06 | **92** / 3.09 / 135 / 0 / **1.36** / 1.55 |
| /about | 84 / 4.08 / 172 / 0 / 1.36 / 3.27 | **89** / 3.39 / 174 / 0 / **1.21** / 1.82 |

Desktop:

| page | before: score / LCP / TBT / CLS / FCP / SI | after |
|---|---|---|
| / | 98 / 0.88 / 56 / 0.006 / 0.42 / 1.21 | 99 / 0.90 / 63 / **0.000** / 0.37 / 0.95 |
| custom-software | 99 / 0.91 / 0 / 0.001 / 0.41 / 0.79 | 99 / 0.88 / 0 / 0.000 / 0.37 / 0.72 |
| mobile-app | 99 / 0.86 / 0 / 0.001 / 0.37 / 0.76 | 99 / 0.86 / 0 / 0.000 / 0.33 / 0.69 |
| /work | 99 / 0.96 / 2 / 0.001 / 0.42 / 0.81 | 99 / 0.94 / 0 / 0.000 / 0.33 / 0.81 |
| /blog | 98 / 0.93 / 0 / **0.063** / 0.38 / 0.85 | 99 / 0.91 / 0 / **0.000** / 0.33 / 0.70 |
| MVP post | 99 / 0.85 / 2 / 0.025 / 0.42 / 0.64 | 99 / 0.83 / 0 / **0.000** / 0.37 / 0.54 |
| /about | 99 / 0.85 / 0 / **0.055** / 0.37 / 0.69 | 99 / 0.85 / 0 / **0.000** / 0.33 / 0.60 |

**How to read this:**
- The simulated FCP gain is deterministic: every single run moved.
- Simulated LCP and SI are dominated by the bimodal first-paint stall (the lead's item 2). Per run, observed FCP is either 0.2 to 0.5 s or 1.2 to 2.4 s, so the LCP and score deltas carry noise of about ±5 points.
- custom-software had a fast first paint in 5 of 6 runs after the change, against 0 of 3 before. mobile-app was still slow in 2 of 3, /work in 2 of 3, and home in 3 of 3. So the Anybody preload may remove the stall on some pages, but it is not the general fix.
- Home LCP is +0.12 s, consistent in 2 of its 3 runs. This may be the early 58 KB preload competing in the simulated graph; home's score moved 81 to 80, within noise.
- Mobile CLS stayed 0.000 on every page. Desktop CLS is now 0.000 on every page.

## Visual-diff evidence
- **Method:** Playwright shots of 16 pages (home, /services, all 8 service pages, /work, /blog, 1 post, /about, /contact, /privacy), at 1440x900 and 390x844, at 8 scroll positions each, after 3.5 s plus 2.6 s settles. That is 256 shots per build: before, after, and a control (the after build shot twice).
- **Result (before vs final):** 180 of 256 shots are identical. The control (final vs final) has 178 of 256 identical, so most differences are continuous motion: the WebGL blob, marquees, bobbing tiles, spinning rings, the pointer-driven ArrowField and carousel state.
- **Only 4 shots differ from before while being identical in the control.** Each was inspected:
  - `services_maintenance-support-m-0`: the spinning dashed ring (`sa-spin`) at a different phase.
  - `services_saas-product-engineering-d-0`: the bobbing hero tile (`svh-bob`) at a different phase.
  - `services_mobile-app-development-d-7`: the pointer-driven ArrowField.
  - `about-d-4`: 7x29 px of photo resampling noise.
- **An earlier /about mobile difference** was a 20 px height change: the auto-advancing values carousel was on tab 02 instead of 01 at capture time. Verified in the browser: the page is 8459 px with tab 01 and 8479 px with tab 02. It does not occur in the final shots.
- **The pixel diff caught one real change** while I was working: the arrow glyph in "SEE ALL WORK →" was rendered by Consolas instead of scaled Arial. I fixed it with the unicode-range plus the `ab-mono-arial` face, and re-verified.
- **Dev mode** (`next dev`, port 3311): I scrolled through /, custom-software, /about and /blog at 1440 and 390. No page errors or console errors. `.hero-in` is applied on home, the `.im` class and 21 `.is-in` reveals fire on the service page, Lenis is active, and 12 to 30 CSS and WAAPI animations are running.

## Found but not fixed (for the lead to route)

1. **JSON-LD is sent twice on every page:** once as the `<script>` in HTML and once as RSC text rows (`6:Tc23,...` holds the layout graph, about 3.1 KB, then the page graph of 1 to 4.7 KB).
   - Gzip cannot deduplicate the two copies; they are over 32 KB apart.
   - The cost is about 7 to 16 KB raw and about 2 to 3 KB gz per page.
   - Option: render the Organization, WebSite and ProfessionalService graph only on `/` (and maybe /about and /contact), and point to it by `@id` elsewhere.
   - This is an SEO call, so I did not touch `schema.ts` or the layout JSON-LD.
2. **Repeated long className strings dominate the RSC payload.** They make up 68 KB of home's 145 KB of decoded flight data, and the same strings appear again in the HTML markup. Fixes, all in other agents' files:
   - `components/layout/Footer.tsx` (every page): `group inline-flex min-h-11 items-center gap-1.5 text-[0.95rem] text-ink-2 transition-colors hover:text-ultra` appears 17 times, and `h-1.5 w-1.5 scale-0 rounded-full bg-plasma transition-transform group-hover:scale-100` 15 times. That is about 3.1 KB in the flight data plus 3.1 KB in markup per page. Move them into two short classes in `globals.css` (for example `.ft-link` and `.ft-dot`), or into a descendant rule on the list.
   - `components/home/Manifesto.tsx`: 34 words × a 133-character class string, plus `mf-word absolute inset-0 text-ink will-change-[opacity]` × 34, about 6.4 KB in the flight data plus 6.4 KB in markup. Put the shared styles on the row with a `.mf-row > span` rule.
   - `components/blog/BlogIndex.tsx` (/blog): class strings repeated 12 to 15 times at 98 to 262 characters each, about 12 KB in the flight data.
   - `components/home/Bento.tsx`: `cal-cell ...` × 16 at 102 characters.
3. **Portfolio items are spread with `...p` into client components** (`home/Work.tsx`, `work/WorkExplorer.tsx`). That serialises unused fields, such as `gradient`, into the RSC props. Pass only the fields that are rendered.
4. **Anybody is 58 KB (latin subset).** Its `gvar` table is 63 KB uncompressed (two axes, wght 100 to 900). Limiting the wght axis to the weights in use, or self-hosting a range-limited instance, could roughly halve it. I could not test it here: the build sandbox has no Google Fonts access, and it changes the font source.
5. **A late Anybody swap still causes CLS for slow real users** (preloading only makes it rarer). Harness, Anybody delayed 1.5 s, before this change: /services/saas 390 px 0.118, /contact 390 px 0.100, /services/cloud-devops 1440 px 0.089, /blog 1440 px 0.082.
   - I tried a per-character-class Arial fallback (capitals 103%, lowercase 135%, digits 115%, space 94%).
   - It fixed saas, contact and blog at 390 px and /about at 1440 px.
   - But it regressed ai-automation at 1440 px (0.001 to 0.024) and the cost post at 412 px (0 to 0.022). Kerning and natural wrapping make any single scale a trade-off, so I reverted it. The data is in `scratchpad/pa/fontcls-*.txt`.
6. **The 25 unused legacy files should be deleted by their owners.** Then the `@source not` lines in `globals.css` can go. If one of them is ever imported again, its line must be removed, or its classes will be missing.
7. **The first-paint stall** (home on every run; service pages and /work some of the time) is not caused by anything in my files. The Anybody preload helped custom-software but not the others.
8. **`biome check` reports a parse error on `globals.css` line 3** (`@import "tailwindcss" source("../")`). This already happens on the original file and is not from my changes.

## Post-restart check (19:35)
- `C:\tmp\perf-1` still holds the final `layout.tsx` and `globals.css`. I rebuilt it (`pnpm build`, exit 0) and the prod server is running again on port 3211.
- The rebuild gives the same CSS (144,135 + 5,259 bytes) and the same HTML (/ 301,520 raw / 42,212 gz; custom-software 277,334 / 44,195; /about 142,670 / 24,044; /blog 230,296 / 30,866). All three fonts are preloaded on every page.
- The main repo's `src/app/layout.tsx` and `src/app/globals.css` are already byte-identical to the copy's final versions. The other four owned files are unchanged in both places.
- Lighthouse, 1 run per page (`scratchpad/pa/lh-post-restart.txt`), in line with the 3-run medians above:

| page | mobile: score / LCP / TBT / CLS / FCP / SI | desktop score / CLS |
|---|---|---|
| / | 81 / 3.72 / 316 / 0 / 1.37 / 3.68 | 99 / 0.000 |
| custom-software | 85 / 3.72 / 220 / 0 / 1.36 / 1.74 | 99 / 0.000 |
| /about | 90 / 3.41 / 140 / 0 / 1.21 / 1.87 | 99 / 0.000 |
| /blog | 89 / 3.65 / 100 / 0 / 1.21 / 1.78 | 99 / 0.000 |
