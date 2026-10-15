# PC: first-paint stall + main-thread work (15 Oct 2026)

Status: **done**. Workspace `C:\tmp\perf-3` (prod 3213, dev 3313). The changed files are listed below, and a unified diff against the untouched source is in my scratch dir as `pc\pc.diff` (path at the end).

## Summary
- **The first-paint stall is gone in the full measurement.** Observed FCP was 1.2 to 1.35 s on home, both service pages, /about and /blog. In all 18 mobile Lighthouse runs of the final `lh.py` pass it is 0.18 to 0.37 s, with no stalled run.
- **The fix lowers the risk; it does not remove it.** In 4 quick runs earlier on the same build, 2 still stalled (csd 1331 ms, home 1199 ms) while the machine was heavily loaded. See "Remaining risk" below.
- **Mobile scores:**
  - home 71 -> 90
  - custom-software-development 79 -> 90
  - mobile-app-development 80 -> 91
  - /blog 83 -> 94
  - /about 89 -> 91
  - /work 86 -> 87
- **Home TBT:** 706 -> 220 ms. The WebGL shader compile no longer blocks the main thread.
- **Desktop:** unchanged at 99.
- **CLS:** 0 on mobile.
- **Visuals and motion:** unchanged. Pixel diffs show only continuously animated elements, and a scroll-through in dev showed all the motion running.

## Root causes, with evidence

### 1. The first-paint stall
It comes from Chrome's frame scheduling, triggered by a long first layout.

**What the trace shows** (Lighthouse `--save-assets`, home, csd and /contact):
- On csd (observed FCP 2346 ms), all network work is done by 290 ms and the main thread is idle from about 420 to 1241 ms and from 1257 to 2245 ms.
- The renderer's compositor gets **no BeginFrames** in those windows: four impl-only frames at 225 to 237 ms (all `STATE_DROPPED`), then one frame at 1241 ms, then 2245 ms.
- So the steps are exactly 1 s apart. That is viz throttling a frame sink to 1 BeginFrame per second after it submits frames that never get drawn. `pagereveal` fires at 1241 ms, which is the first rendering opportunity.

**Why those dropped frames happen:**
- They are drawn by the compositor while the main thread is still busy with the first full-page style + layout, before the first commit.
- csd: Layout of 1630 objects takes 184 ms, plus 31 ms of style recalc, starting right after DOMContentLoaded.
- Home: Layout of 1778 objects takes 215 ms.
- /contact: Layout of 604 objects takes 100 ms and finishes before the trigger, so it painted at 222 ms.
- The trigger time varies from run to run (60 to 225 ms after navigation start). It looks like a browser-side surface sync after the navigation commit. Whenever it lands while a long main-thread task is still running before the first commit, FCP is pushed to about 1.3 s or about 2.3 s.

**Bisect** (a rewriting proxy in front of the prod server, Lighthouse mobile):
| Variant | Observed FCP |
|---|---|
| No JS at all | still stalls, 2.3 s |
| Everything below the hero hidden | 0.24 s |
| Either half of the page hidden | still stalls |
| A 150 ms busy loop in /contact's head | /contact stalls too, 2.2 s |

So the trigger is time-based and caused by total first-frame layout, not by one component. /about, /blog and even /contact (under machine load) sit near the threshold.

**Tooling note for the other agents:** plain Playwright does **not** reproduce the stall. It launches Chrome with `--disable-features=...PaintHolding...` and other flags. A Chrome launched with chrome-launcher's flags but driven by Playwright did not reproduce it either. Use Lighthouse itself to check FCP.

**Fix: render only what is on screen in the first frame.**
- Until the first frame, on phones only, `content-visibility: auto` (with `contain-intrinsic-size: auto 1000px`) applies to `main > *:nth-child(n+4)` and `body > footer`. Child 4 onward is always more than one screen down on a phone: I measured the tops at 390x844 and 412x823 on all 10 main pages (smallest is 1103 px, home).
- An inline script adds `cv-off` to `<html>` right after the first frame, which turns the rule off. The full layout then happens in frame 2, after first paint and long before any GSAP/ScrollTrigger measuring. That measuring runs in idle callbacks after hydration.
- The rule is skipped:
  - without JS (it is gated on the root layout's `js` class);
  - on loads with a `#hash`;
  - on reload and back/forward loads (navigation type is not `navigate`), so restored scroll positions and anchor jumps never see placeholder heights;
  - at widths of 768 px and up (desktop was not stalling).
- Result in the first frame: home Layout 41 ms (330 objects, was 215 ms), csd 59 to 88 ms (306 objects, was 184 ms). First commit lands at about 110 to 150 ms.

**Remaining risk:** the trigger can land as early as 60 ms. The first frame still has a 40 to 90 ms layout, so a stall is still possible, more so on a loaded machine. Two of my 4 quick runs on the new build stalled; 0 of 18 stalled in the full pass. Making the first frame cheaper reduces the risk further: fonts and HTML size (see "Found but not fixed", item 1).

### 2. Home TBT: the WebGL shader compile
- `LiquidCanvas` ran in an idle callback, but `getShaderParameter(COMPILE_STATUS)` / link blocked the main thread on the GPU process for the whole HLSL compile: **one 133 ms task**.
- Lighthouse attributes it to `_lighthouse-eval.js` because LH wraps `requestIdleCallback`. Simulated, it was 449 to 495 ms, about 400 ms of TBT.
- **Fix:** compile and link without asking for the status, then poll `KHR_parallel_shader_compile`'s `COMPLETION_STATUS_KHR` once per frame. Read `LINK_STATUS` only when the program is ready (a failed shader fails the link, so the CSS fallback still works), then start the identical render loop and fade-in.
- Lighthouse's Chrome supports the extension. The task is gone from the trace, and the canvas fades in as before (dev check: opacity 1, canvas sized).

### 3. Hydration-time forced style recalc from ArrowField
- csd trace: inside the 35 ms hydration task, a 24 ms `UpdateLayoutTree` of 1584 elements plus a layout. Its stack is `0fsfbm1mdt2kb.js` line 3 col 1714, which is `ArrowField`'s `build()` reading `canvas.clientWidth` in a plain `useEffect`.
- ArrowField lives in the closing CTA on every page.
- **Fix:** it initialises with `useIdleEffect`, where styles are already clean. It is a bottom-of-page canvas, far below the fold, and its IntersectionObserver-driven loop is unchanged.

### 4. GSAP arrival made one long task
- Every component waiting on `loadGsap()` resumes in the same microtask flush when the chunk lands: csd 40 ms (`EvaluateScript` gsap + `RunMicrotasks`), home 55 ms.
- **Fix:**
  - `useGsapIdle` gives each section's setup its own idle task (FIFO, so creation order, and with it ScrollTrigger/pin order, is unchanged).
  - `InnerMotion`'s GSAP block does the same.
  - `InnerMotion`'s heading split now reads all heading positions before splitting any heading. Before, it interleaved `getBoundingClientRect` with DOM writes, forcing a layout per heading. The decisions are identical: only headings below the fold are split, and splitting one can only push later ones further down.

## Files changed (in `C:\tmp\perf-3`, all inside my ownership)
| Path | Change |
|---|---|
| `src/components/layout/FirstFrame.tsx` (new) | Static `<style>` (phones-only, `html.js:not(.cv-off)`) + inline script that adds `cv-off` after the first frame; skips hash and reload/back-forward loads. |
| `src/components/layout/Navbar.tsx` | Renders `<FirstFrame />` first, so it is parsed before `<main>`. |
| `src/components/home/LiquidCanvas.tsx` | Non-blocking shader compile via `KHR_parallel_shader_compile` polling; the render loop moved into `run()`, unchanged. |
| `src/components/home/ArrowField.tsx` | `useEffect` -> `useIdleEffect`. |
| `src/lib/useIdleEffect.ts` | New `whenIdle()` helper; `useGsapIdle` runs each setup in its own idle task after GSAP arrives. |
| `src/components/motion/InnerMotion.tsx` | GSAP setup in its own idle task; heading positions read before any DOM write. |

**Alternative placement for the lead:** the CSS could go in `globals.css` and the script into `layout.tsx`'s `themeScript`. I kept both in a file I own. Navbar is in the root layout on every page and comes before `<main>`.
- A plain `<style>`/`<script>` in body gave no hydration warnings in dev.
- The only `<html>` change is the `cv-off` class, and `<html>` already has `suppressHydrationWarning`.

## Lighthouse before -> after
`lh.py`, 3 runs, medians, same machine about 40 minutes apart; the other two agents were running Lighthouse at the same time. Observed values come from `audits.metrics`.

| Page | Form | Score | sim FCP | sim LCP | SI | TBT | CLS | **obs FCP / LCP (ms)** |
|---|---|---|---|---|---|---|---|---|
| / | mobile | 71 -> **90** | 1.66 -> 1.51 | 3.59 -> **2.94** | 3.74 -> 2.78 | 706 -> **220** | 0 -> 0 | 1339 -> **228** |
| / | desktop | 99 -> 99 | 0.41 -> 0.45 | 0.87 -> 0.91 | 1.20 -> 1.01 | 62 -> 0 | 0.006 -> 0.006 | 648 -> 593 |
| /services/custom-software-development | mobile | 79 -> **90** | 1.51 -> 1.51 | 4.27 -> **3.17** | 3.36 -> **1.75** | 210 -> 204 | 0 -> 0 | 1348 -> **242** |
| same | desktop | 99 -> 99 | 0.41 -> 0.41 | 0.92 -> 0.89 | 0.83 -> 0.77 | 0 -> 0 | 0.001 | 705 -> 612 |
| /services/mobile-app-development | mobile | 80 -> **91** | 1.36 -> 1.36 | 4.11 -> **3.02** | 3.25 -> **1.57** | 153 -> 183 | 0 -> 0 | 1352 -> **256** |
| same | desktop | 99 -> 99 | 0.37 -> 0.37 | 0.85 -> 0.85 | 0.70 -> 0.71 | 0 -> 0 | 0.001 | 522 -> 552 |
| /work | mobile | 86 -> 87 | 1.66 -> 1.66 | 3.93 -> 3.87 | 2.10 -> 1.83 | 133 -> 93 | 0 -> 0 | 366 -> 287 |
| /work | desktop | 99 -> 99 | 0.41 -> 0.41 | 0.92 -> 0.91 | 0.78 -> 0.74 | 0 -> 0 | 0.001 | 444 -> 479 |
| /about | mobile | 89 -> 91 | 1.36 -> 1.36 | 3.41 -> 3.37 | 3.00 -> **1.51** | 150 -> 117 | 0 -> 0 | 1217 -> **284** |
| /about | desktop | 99 -> 99 | 0.37 -> 0.37 | 0.83 -> 0.82 | 0.59 -> 0.58 | 0 -> 0 | 0.055 (pre-existing) | 440 -> 421 |
| /blog | mobile | 83 -> **94** | 1.36 -> 1.36 | 4.31 -> **3.01** | 3.33 -> **1.57** | 136 -> 102 | 0 -> 0 | 1232 -> **190** |
| /blog | desktop | 98 -> 99 | 0.37 -> 0.37 | 0.89 -> 0.89 | 0.70 -> 0.72 | 0 -> 0 | 0.063 (pre-existing) | 415 -> 431 |

Observed LCP equals observed FCP in every run (the hero text paints opaque).

**Mobile observed FCP, every after run (ms):**
- home: 260, 228, 219
- csd: 220, 274, 242
- mad: 256, 226, 258
- /work: 263, 287, 374
- /about: 284, 242, 303
- /blog: 178, 190, 200

**Machine noise:** the machine was heavily loaded (about 35 Chrome and 44 node processes). Single-run TBT swings by 100 to 300 ms. One csd run hit 434 ms while the other two were 97 and 204 ms.

## Visual-diff evidence
- **Method** (`pc\shots.py` + `pc\pdiff.py`):
  - 10 pages (/, /services, both service pages, /work, /about, /contact, /blog, a post, /privacy);
  - 1440x900 and 390x844 (touch, mobile);
  - scroll positions 0, 1, 2 and 4 viewports, plus the bottom, each after a 2.2 s settle;
  - BEFORE taken from the untouched build, AFTER from the changed build.
- **Results:** every diff over 0.1% is continuous animation:
  - the WebGL blob (home-d-0);
  - the tapes marquee (home-d-1, home-m-1);
  - the services-index icon marquee (services-m-0);
  - "is-live" panel artwork (home-d-3);
  - the work-stack scrub (work-d-3);
  - the footer wordmark / ArrowField strip (the `-4` shots).
- All other diffs are under 0.1% and in the same spots (bobbing badge, pill dots).
- **Noise floor:** two BEFORE runs of the untouched build show the same classes of diff (`pc\diff-noise`: home-d-0 1.6%, home-d-1 4.2%, work-d-3 6.2%, footer strip about 0.15%).
- Side-by-side images: `pc\diff-after1\`.

**Motion check in dev** (`next dev -p 3313`, `pc\motion.py`): home, csd and /work at 1440x900 (wheel scrolling through Lenis) and 390x844 (touch):
- `cv-off` set after load;
- `hero-in` applied;
- WebGL canvas sized and at opacity 1 (parallel-compile path works in dev);
- Lenis active on desktop;
- InnerMotion split 12 headings on csd and 3 on /work;
- 21 `[data-inview]` reveals fired on csd;
- the footer wordmark was mid-scrub (`wdth 102.2`) at the bottom on mobile.

The dev console shows no hydration warnings and no errors. The only warnings are GSAP's "rotateX/rotateY not eligible for reset" from BentoMotion's `quickTo`, in code I did not change.

## Found but not fixed
1. **Fonts dominate layout cost** (PA's area).
   - Forcing Arial on everything halved the frame layout on csd (159 -> 80 ms, Playwright). `text-wrap: balance` and `text-rendering: optimizeLegibility` made no measurable difference.
   - Anybody (display face) is not preloaded and arrives at about 290 ms. Its swap forces a full re-layout of the page (47 ms on home, 25 ms on csd) right after hydration.
   - A cheaper first layout (fonts, smaller HTML) widens the safety margin of the stall fix.
2. **Frame 2 still does one long full layout after FCP** (150 to 260 ms observed, unthrottled). This is the same work the old first frame did, now after first paint. Lighthouse's simulated TBT did not go up: home fell, services were flat.
   - If it ever shows up in TBT, the next step is progressive un-skipping, one section per frame. The design: a `data-cv="K"` attribute on `<html>`, with `main>section`/`main>div` tag selectors so the style invalidation stays narrow. I did not build it because the numbers did not need it.
3. **GA** (gtag 24 ms eval + 47 ms timer task observed, about 125 to 250 ms of simulated TBT on every page, because it lands inside TTI). It is already `lazyOnload` and after LCP. The only further lever is loading it later (for example after first interaction or about 5 s idle). That changes analytics coverage of short visits, so it is a product decision, not mine to make.
4. **ScrollTrigger cost on home:** a 33 to 38 ms auto-refresh rAF after the section setups, and the pinned services track setup (about 43 ms). Both are needed for correct measurement; splitting further would change GSAP behaviour.
5. **Desktop-only hydration work in InnerMotion** (not in the mobile numbers): `getComputedStyle` per `[data-tilt]` after adding `.im` forces a full style recalc, and the kinetic hero title is split into letter spans at hydration. I left both: moving the split would change when the existing subtle re-wrap happens.
6. **Hero letter `will-change-transform`** (17 layers) and the other layer and raster suspects are not involved in the stall (no raster/GPU time before the first commit). I left them because removing will-change could change text antialiasing.
7. **Desktop CLS** on /about (0.055) and /blog (0.063) is pre-existing and outside my files.

## Scratch artefacts
`C:\Users\amaiz\AppData\Local\Temp\claude\C--Users-amaiz-Documents-Arrowbin-arrowbin-new-one\9b5a6321-9ef7-44b0-995d-276353ecafa4\scratchpad\pc\`:
- `pc.diff` (full patch);
- `lh-before\`, `lh-after1\` (Lighthouse JSON);
- `lhtrace\` (baseline traces);
- `keep\` (traces of the after build);
- `shots-before\`, `shots-before2\`, `shots-after1\`, `diff-after1\`, `diff-noise\`, `motion-dev\`;
- tools: `proxy.py` (rewriting proxy for bisecting with Lighthouse), `lhq.py`, `obs.py`, `tasks.py`, `antrace.py`, `shots.py`, `pdiff.py`, `motion.py`.

## Server state
- All of my servers are now stopped: prod 3213, dev 3313 and the proxy on 3293.
- Correction: my hand-back message said prod 3213 was still running. It exited right after that message.
- To serve the changed build again: `pnpm next start -p 3213` in `C:\tmp\perf-3`.
