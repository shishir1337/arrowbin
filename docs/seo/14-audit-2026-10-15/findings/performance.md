# Performance / Core Web Vitals re-audit, 15 Oct 2026

Target: http://localhost:3117 (local production build with the 15 Oct sprint, NOT deployed). Live arrowbin.com was not measured and is still build 959866d. Lab data only: no PSI call was made (brief says skip unless one succeeds), so there is no CrUX field data and no real INP. TBT is the INP proxy.

Method: Lighthouse 12.8.2 (Chrome 155, `--headless=new`), mobile default (simulated throttling), performance category only, 3 runs per page, per-metric median reported. Desktop preset once for `/` and one post. Machine: Ryzen 7 5700X, Windows 11, shared with the other audit agents (CPU load was 43 percent before my first run; Lighthouse benchmarkIndex ranged 2,308 to 3,019), so TBT carries some noise. Local TTFB is about 4 ms, so network timing is not comparable with live. Raw JSON: `C:\Users\amaiz\AppData\Local\Temp\claude\C--Users-amaiz-Documents-Arrowbin-arrowbin-new-one\9b5a6321-9ef7-44b0-995d-276353ecafa4\scratchpad\lh\` (files `m_<page>_<n>.json`, `d_<page>_1.json`, traces in `art_*`), summary script `...\scratchpad\lh-summary.py`.

## Score

| Environment | 14 Oct | 15 Oct | Basis |
|---|---|---|---|
| Local build (this audit) | 66 | **76 / 100** | Mobile median scores 78 to 89 (average of the 7 pages: 83, was 72). CLS 0.000 on all 21 mobile runs. TBT under 200 ms on 4 of 7 pages. Desktop 99 and 100. Mobile LCP still fails on 7 of 7 pages (3.1 to 4.6 s in the lab model). |
| Live (still 959866d) | 62 | not measured | Will stay near 62 until the sprint build is deployed. |

Score is a judgement weighted toward mobile. I held it at 76 rather than 80 because every mobile LCP fails the 2.5 s line, no field data exists, and cause 2 below is not root-caused. I did not go lower because the lab LCP is largely a model artefact (see "How real is the LCP failure").

## Medians, mobile (median of 3 runs per metric)

| Page | Score | LCP | LCP element | TBT | CLS | FCP | SI | Total | Images | JS (first-party + gtag) |
|---|---|---|---|---|---|---|---|---|---|---|
| / | 78 | 3.74 s | `p.mt-5` hero intro text | 376 ms | 0.000 | 1.52 s | 3.76 s | 662 KB | 0 | 441 KB (265 + 176) |
| /services/custom-software-development | 80 | 4.31 s | `p.svh-fade` hero intro text | 211 ms | 0.000 | 1.52 s | 3.25 s | 735 KB | 0 | 497 KB (321 + 176) |
| /services/ecommerce-development | 82 | 4.31 s | `p.svh-fade` hero intro text | 149 ms | 0.000 | 1.66 s | 3.30 s | 733 KB | 0 | 497 KB (321 + 176) |
| /work | 81 | 4.54 s | `p.svh-fade` hero intro text | 201 ms | 0.000 | 1.67 s | 3.63 s | 801 KB | 125 KB | 461 KB (285 + 176) |
| /blog | 86 | 3.67 s | `p.text-lg` in `div.svh-fade` | 180 ms | 0.000 | 1.37 s | 2.02 s | 759 KB | 68 KB | 455 KB (279 + 176) |
| /blog/payment-gateway-integration-bangladesh | 89 | 3.17 s | `h1.svh-fade` post title | 135 ms | 0.000 | 1.51 s | 1.54 s | 723 KB | 19 KB | 455 KB (279 + 176) |
| /blog/chatgpt-shopping-for-online-stores | 86 | 3.78 s | `h1.svh-fade` post title | 156 ms | 0.000 | 1.51 s | 3.03 s | 728 KB | 18 KB | 455 KB (279 + 176) |

Sizes are transfer bytes (gzip). Fonts are 111 to 115 KB and CSS 31 KB on every page. The gtag 176 KB is the Google Analytics script (loaded after `load`, `lazyOnload`).

Raw runs (score / LCP s / TBT ms):

| Page | Run 1 | Run 2 | Run 3 |
|---|---|---|---|
| / | 72 / 3.75 / 585 | 78 / 3.74 / 376 | 79 / 3.74 / 354 |
| custom-software-development | 80 / 4.31 / 211 | 73 / 4.33 / 436 | 82 / 4.30 / 181 |
| ecommerce-development | 82 / 4.31 / 145 | 78 / 4.63 / 148 | 82 / 4.25 / 165 |
| /work | 79 / 4.54 / 200 | 81 / 4.59 / 103 | 82 / 3.95 / 240 |
| /blog | 89 / 3.61 / 115 | 85 / 3.84 / 180 | 86 / 3.67 / 194 |
| payment-gateway post | 87 / 3.75 / 114 | 89 / 3.09 / 236 | 92 / 3.17 / 135 |
| chatgpt post | 86 / 3.79 / 156 | 86 / 3.78 / 174 | 92 / 3.16 / 137 |

### Desktop (1 run each)

| Page | Score | LCP | TBT | CLS | FCP | SI | Total | Images | JS |
|---|---|---|---|---|---|---|---|---|---|
| / | 99 | 0.87 s (`p.mt-5`) | 55 ms | 0.006 | 0.41 s | 0.99 s | 815 KB | 0 | 522 KB |
| /blog/payment-gateway-integration-bangladesh | 100 | 0.80 s (`img.object-cover`, post cover) | 0 ms | 0.001 | 0.41 s | 0.56 s | 863 KB | 33 KB | 526 KB |

### Against 14 Oct (local build)

| Page | 14 Oct score / LCP / TBT / CLS | 15 Oct median | Change |
|---|---|---|---|
| / | 61 / 3.80 s / 1,279 ms / 0 (median of 3) | 78 / 3.74 s / 376 ms / 0 | Score +17, TBT down 71 percent (best 14 Oct run was 861 ms, worst 15 Oct run is 585 ms), LCP flat |
| custom-software-development | 68 / 4.32 s / 426 ms / 0.139 (1 run) | 80 / 4.31 s / 211 ms / 0.000 | CLS fixed, TBT halved, LCP flat |
| /work | 80 / 4.36 s / 189 ms / 0 (1 run) | 81 / 4.54 s / 201 ms / 0 | Flat (within noise) |
| a blog post | 80 / 3.93 s / 288 ms (cost post, 1 run) | 86 to 89 / 3.2 to 3.8 s / 135 to 174 ms | Different posts, so indicative only |

FCP home 1.84 to 1.52 s and SI 4.36 to 3.76 s also improved. Desktop home 96 to 99, post 99 to 100.

## What works

- **Service CLS is fixed.** 0.139 on 14 Oct, 0.000 on all 6 service runs and on all 21 mobile runs. The Geist Mono preload removed the breadcrumb reflow (`div.mt-10.grid` hero shift). Desktop home CLS 0.006 is a font swap on the hero line 2 (`span.text-ultra`, "Web font loaded"), well inside the 0.1 limit.
- **Removing every Suspense wrapper did not hurt.** TBT fell on every template (home 1,279 to 376 ms, service 426 to 211 ms). Keep them removed. I did not isolate how much of the drop is Suspense versus the other sprint changes, and the machine noise is real, so do not quote the 71 percent as a precise gain.
- **Blog images are cheap.** Post covers are WebP at 13 to 15 KB each (post pages carry 18 to 19 KB of images on mobile), the SVG charts are `unoptimized` and a few KB each, and the blog index loads 68 KB of covers. No image is an LCP element on mobile, so image bytes are not a mobile LCP cause. `/work` carries 125 KB of images, also not LCP.
- **LCP is text, not a late resource.** Simulated LCP subparts: TTFB about 455 ms (Lantern's modelled RTT), load delay 0, load time 0, render delay 2.6 to 4.1 s (about 88 percent). No resource is discovered late.
- **GA is not on the critical path.** gtag starts after `load` (around 1.7 s observed, finishes around 2.3 s) and is `lazyOnload`.
- **Desktop is effectively perfect** (99 and 100).

## How real is the LCP failure

The mobile LCP of 3.1 to 4.6 s is a Lantern simulation (4x CPU, slow-4G model) fed with the observed trace. Evidence that the model, not the page, drives most of it:

- Observed (unthrottled) metrics in the same Lighthouse runs: FCP = LCP = 1.33 to 1.37 s on `/`, services and `/work`, and 0.24 to 0.25 s on `/blog` and the posts.
- Lighthouse with `--throttling-method=provided` (home, 1 run): FCP = LCP = 1.33 s, score 100, TBT 51 ms.
- Plain Playwright Chromium, mobile viewport, no throttle (3 runs each): FCP = LCP of 232 to 264 ms on home, 220 to 244 ms on a service page, 148 to 164 ms on `/blog`. System Chrome 155 headless: home 336 to 380 ms, service 344 to 408 ms, `/work` 376 to 380 ms, `/blog` 208 to 212 ms.

So an unthrottled mobile-viewport browser paints the hero in under 0.4 s. The pass/fail question needs field data (CrUX, or the GA4 web-vitals events the sprint added, once deployed). Until then treat the lab LCP as a relative signal, not a verdict.

## Top 3 remaining causes of slow mobile LCP

### 1. JavaScript hydration modelled before the LCP paint (invisible fix)

- Evidence: home with every `/_next/static/chunks/*.js` request blocked (Lighthouse, 1 run): score 97, TBT 0 ms, simulated LCP 2.49 s versus 3.74 s with JS. So about 1.25 s of the modelled home LCP is JS, and TBT 376 ms is all JS. First-party JS is 265 KB (home) to 321 KB (service pages) transferred, in about 15 chunks; the largest are `1gcz06w_8ou_y.js` (74 KB transferred, 231 KB raw), `27jgy6osnb7nu.js` (42 KB, 151 KB raw), `3fuuvgfgkcrqq.js` (30 KB, 79 KB raw), `3fphk9vnfo7vj.js` (29 KB, 71 KB raw, lazy, fetched at about 1.37 s) and `0cz1d0mv5g_q7.js` (113 KB raw, not on home).
- Unthrottled trace of home (run 2): the whole load needs only about 0.6 s of main-thread work. JS is small (EvaluateScript about 45 ms before the first frame, one 27 ms task for `1gcz06w_8ou_y.js`), so the 4x model multiplies a modest cost.
- Fix (dev, no visual change): turn purely presentational client components into server components, `next/dynamic` the below-fold motion components (the `home/motion/*Motion.tsx` set and `ServiceQuoteForm` on services), and check the 3 big chunks for what they contain. Keep Suspense removed. Expected: part of the 1.25 s, not all of it (some JS is framework runtime).
- Not checked: chunk-to-source mapping and the `script-treemap-data` / `unused-javascript` audits (I did not open them), so I cannot say how much of the 265 KB is React/Next runtime versus app code.

### 2. First-paint delay on the heroes of `/`, services and `/work` (root cause not isolated; the fixes differ)

- Evidence: observed first paint is 1.33 to 1.37 s on those pages and 0.24 s on `/blog` and posts, even though DOMContentLoaded is at 0.2 to 0.3 s on all of them. It persists with all JS blocked (home: observed FCP 1,320 ms), so it is not hydration. The filmstrip is white at 0.46 s and shows the full hero at once at 1.8 s. In the home trace the main thread is idle from about 0.5 s to 1.3 s; the first task is one 236 ms task containing a single 195 ms Layout (the whole 1.2k-element document is laid out before first paint); no main-frame request happens until about 1.3 s. Blocking the fonts changed nothing in observed FCP (1,319 ms).
- The delay appears only under the Lighthouse harness (tracing plus screenshots). Plain Chrome shows 0.2 to 0.4 s (see above). Because the model takes the observed 1.33 s as the LCP anchor, this delay feeds the whole simulated LCP.
- What differs on these heroes versus blog/post heroes: infinite decorative animations (`animate-ping`, `spin-slow`, `svh-bob`), per-letter `will-change-transform` layers on the home h1, isolated `overflow-hidden` hero sections, and the WebGL canvas (home only). I tested only the canvas (disabled in plain Chromium: no change). Which of the others triggers the stall: not checked.
- Fix, invisible: `content-visibility: auto` with `contain-intrinsic-size` on below-fold sections so the first Layout does not cover the whole page (check it adds no CLS or anchor jumps), and drop `text-wrap: balance` cost only if it measures as material (not checked).
- Fix, VISUAL/MOTION (needs founder sign-off): start the infinite ping, spin and bob animations after first paint (small change in the first second), drop `will-change-transform` from the 12 hero letters, serve a static gradient instead of the WebGL blob on phones.
- Do not spend dev time on the visual options before the invisible ones and a field-data read.

### 3. FCP floor from render-blocking CSS plus late display font (mostly invisible)

- Evidence: simulated FCP is 1.51 s on every page even with JS blocked (home, no JS: FCP 1.67 s, LCP 2.49 s, i.e. the floor with zero JS is already at the 2.5 s limit). Two render-blocking stylesheets (28.6 KB + 2.7 KB, built CSS is 165 KB raw in one file from a 1,491-line `globals.css`). Fonts: 2 preloaded woff2 (24 KB and 30 KB); the 58 KB Anybody display file and the 4.7 KB Anek Bangla subset are only requested at about 0.29 s after CSS parse (not preloaded, by design per the `layout.tsx` comment). With all fonts blocked the simulated LCP was 3.41 s versus 3.74 s (1 run), so fonts are worth about 0.3 s in the model.
- Fix, invisible: trim and split `globals.css` (page-specific rules out of the global sheet), test preloading the Anybody file now that hero text is already opaque (the earlier reason for not preloading was bandwidth competition), keep only the faces used above the fold in the preload list.
- Fix, VISUAL: changing the display font, its weights or the swap behaviour would change how the headlines look during load; leave as is.
- Not checked: `unused-css-rules` and `render-blocking-resources` audit numbers for these runs.

## Findings

| # | Finding | Severity | Status vs 14 Oct | Evidence | Fix | Owner | Visual sign-off |
|---|---|---|---|---|---|---|---|
| 1 | Mobile LCP 3.1 to 4.6 s in the lab on all 7 pages (fail) | High | OPEN (home 3.80 to 3.74, services 4.32 to 4.31, work 4.36 to 4.54) | Medians table; observed LCP 1.33 s; plain Chrome 0.2 to 0.4 s | Causes 1 to 3; confirm with field data | dev | partly (see 2) |
| 2 | JS hydration before LCP, TBT 376 ms home, 211 ms CSD, 201 ms /work | High | PARTLY FIXED (home TBT 1,279 to 376) | JS-blocked run: LCP 2.49 s, TBT 0 | Cause 1 | dev | no |
| 3 | First-paint stall on home, services, work heroes under Lighthouse | Medium | NEW (diagnosed, not root-caused) | Observed FCP 1.33 s vs 0.24 s on blog, persists without JS | Cause 2 | dev, founder for motion options | invisible option yes, motion options need sign-off |
| 4 | Render-blocking CSS and display-font fetch set the FCP floor | Medium | OPEN | FCP 1.5 s on every page, 28.6 + 2.7 KB CSS | Cause 3 | dev | no (font changes yes) |
| 5 | Service page CLS 0.139 | Medium | FIXED | 0.000 on 21 of 21 mobile runs | Geist Mono preload (already in `layout.tsx`) | dev | no |
| 6 | No field data or INP | Medium | OPEN until deploy (GA4 web-vitals events added in the sprint, per sprint log; not tested here) | PSI not called | After deploy, read CLS/INP/LCP events in GA4, add PSI key, check Search Console CWV report | dev/founder | no |
| 7 | Desktop home CLS 0.006 (hero line 2, font swap) | Low | NEW, passes | Layout-shift item `span.text-ultra`, cause "Web font loaded" | None needed | dev | no |
| 8 | GA/gtag 176 KB, after `load` | Low | OPEN, not on the LCP path | Network timeline: starts about 1.7 s observed | Optional: defer to first interaction | dev | no |
| 9 | Suspense removal TBT trade-off | Info | CLOSED, no regression | TBT fell on all templates | Keep wrappers removed | dev | no |
| 10 | Cloudflare HTML cache, live TTFB, live vs local | Info | Not checked (live not measured) | n/a | n/a | founder/dev | no |

Items from the 14 Oct list not re-measured: style/layout bucket totals (finding 2 on 14 Oct), legacy-JS audit, DOM size, third-party blocking time. All "not checked". I saw one 195 ms Layout in the home trace but did not extract the per-bucket main-thread breakdown for these runs.

## Founder-gated

Needs founder sign-off because it changes visuals or motion: pausing or delaying the hero's infinite animations until after first paint, removing the per-letter hero layers, replacing the WebGL blob with a static image on mobile, any change to the display font or its loading behaviour. Everything else above (JS splitting, server components, dynamic imports, `content-visibility`, CSS trimming, preload tuning) is invisible to visitors.

## Not checked

PSI API and CrUX (not called), INP, the live site, `script-treemap-data`, `unused-javascript`, `unused-css-rules`, `render-blocking-resources`, `legacy-javascript`, per-bucket main-thread breakdown, chunk-to-source mapping, baseline benchmarkIndex of 14 Oct, repeat desktop runs (1 each). The three diagnostic Lighthouse variants (JS blocked, fonts blocked, `provided` throttling) and the Playwright tests are single exploratory runs.

## Summary

Local mobile median scores rose to 78 to 89 (home 61 to 78), service CLS is fixed (0.000 on all 21 mobile runs) and home TBT fell from 1,279 to 376 ms, so the Suspense removal and the Geist Mono preload did what they were meant to. The score for this build is 76 (was 66 local, 62 live; live stays at 62 until deploy). Mobile LCP still fails on all seven pages in the lab (3.1 to 4.6 s), but the observed LCP in the same runs is 1.33 s and plain Chrome paints the hero in 0.2 to 0.4 s, so treat it as a model-inflated signal until field data arrives. The three remaining causes are JS hydration (about 1.25 s of the modelled home LCP, invisible fix), a first-paint stall on the home, service and work heroes that is not root-caused (invisible `content-visibility` option, plus motion options that need founder sign-off) and the render-blocking CSS plus late display font that set a 1.5 s FCP floor (invisible).
