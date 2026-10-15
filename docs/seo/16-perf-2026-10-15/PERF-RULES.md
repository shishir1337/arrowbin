# Performance sprint, 15 Oct 2026: rules for every agent

**Goal:** Lighthouse **performance 90+ on mobile and 95+ on desktop on every page**, as close to 100 as possible.

**Hard constraints from the founder:**
- **No visual change.** Every page must look and move exactly as it does now, at every scroll position, on desktop and mobile.
- **No animation removed or simplified.**

## Baseline (local prod build, Next.js 16.4.1, Lighthouse 12 mobile, 1 run)

| Page | Mobile | LCP | TBT | CLS | FCP | SI | Desktop |
|---|---|---|---|---|---|---|---|
| / | 80 | 3.60 s | 343 ms | 0 | 1.67 s | 3.76 s | 99 |
| /services | 88 | 3.31 | 213 | 0 | 1.36 | 1.62 | 100 |
| /services/custom-software-development | 77 | 4.56 | 214 | 0 | 1.51 | 4.83 | 99 |
| /services/mobile-app-development | 78 | 4.40 | 202 | 0 | 1.36 | 4.77 | 99 |
| /work | 86 | 3.92 | 143 | 0 | 1.51 | 2.22 | 99 |
| /about | 90 | 3.40 | 154 | 0 | 1.36 | 1.80 | 99 (CLS 0.055) |
| /contact | 91 | 3.27 | 87 | 0.066 | 1.36 | 1.36 | 99 |
| /blog | 89 | 3.65 | 112 | 0 | 1.36 | 1.65 | 98 (CLS 0.063) |
| a blog post | 88 | 3.67 | 143 | 0 | 1.51 | 1.54 | 100 |
| /privacy | 90 | 3.27 | 175 | 0 | 1.36 | 1.36 | 100 |

## Diagnosis so far (the lead's analysis; verify it yourself)

### 1. Mobile LCP is a Lighthouse simulation effect
- Lighthouse's **observed** LCP equals observed FCP: the hero text paints at once, opaque. Hero entrances are transform-only by design (`svh-fade`, `[data-hero-fade]` keep opacity 1).
- The **simulated** mobile LCP is 3.3 to 4.6 s while simulated FCP is about 1.4 s.
- Lighthouse's lantern model averages:
  - an *optimistic* graph: render-blocking resources only;
  - a *pessimistic* graph: **every request that started before the observed LCP**.
- Next.js puts all page JS chunks in `<head>` as async scripts, so about **250 KB of JS (transfer size)** starts at 50 ms, before LCP, and all of it lands in the pessimistic graph.
- Also before LCP:
  - 2 preloaded fonts (Geist 24 KB, Geist Mono 30 KB);
  - 30 KB of CSS (160 KB raw);
  - a 43 to 45 KB HTML document (300 KB raw, about half of it RSC flight data).
- **So every KB that starts before LCP costs simulated LCP.**
- The levers:
  - load less JS up front (code-split below-the-fold client islands so their chunks load after hydration);
  - preload fewer fonts;
  - smaller CSS and HTML.

### 2. First-paint stall on home, service pages and /work
- Under Lighthouse's mobile emulation (412x823, DPR 1.75), observed FCP is 1.4 s (home) and 2.3 s (service pages), even unthrottled. Other pages paint in about 0.2 s.
- A late observed LCP pulls even more requests into the pessimistic graph (on service pages, the second wave of JS at about 1.3 s), and it inflates Speed Index (4.8 s on service pages).
- The 14 Oct audit saw the main thread idle from 0.5 to 1.3 s after one 195 ms Layout. Suspects:
  - raster or compositing cost of large layers (`will-change`, many composited layers, SVG or canvas);
  - a WebGL canvas;
  - font loading;
  - something hidden until a timer.
- Find it with a trace: Playwright with CDP `Tracing`, or Lighthouse `--save-assets` (gives the trace), then look at Paint/Raster/GPU and main-thread events between 0 and FCP.

### 3. Home TBT 343 ms
JS hydration plus motion setup.

### 4. Service-page CLS was 0.139
- It was fixed by **preloading Geist Mono**: the breadcrumb wrapped to 2 lines in the fallback font, then snapped to 1.
- That preload now costs about 30 KB in the LCP graph. An invisible alternative that keeps CLS at 0 would let us drop it.

### 5. Desktop is already 98 to 100
Small CLS on /about (0.055) and /blog (0.063) at desktop width.

### 6. gtag
GA (176 KB) loads `lazyOnload`, after LCP, so it is outside the LCP graph. Keep it that way. It may still add TBT.

## Your workspace (never touch the main repo)

- **Isolated copy:** you get one at `C:\tmp\perf-N`, with its own `node_modules` and `.next`. Edit only your owned files there. The lead merges your files into the main repo afterwards.
- **Build and serve:**
  - Build: `pnpm build`.
  - Serve your prod build on your port: `pnpm next start -p 32N1`, run in the background.
  - Stop it with PowerShell: `Get-NetTCPConnection -LocalPort 32N1 | % { Stop-Process -Id $_.OwningProcess -Force }`.
  - Rebuild after each change you want to measure.
- **Dev mode:** if you need it, use `pnpm next dev -p 33N1` inside your copy only. Animations must also be checked in dev, because one past "invisible" change broke an effect only in dev.
- **Measure:** `MSYS_NO_PATHCONV=1 python -I C:/Users/amaiz/Documents/Arrowbin/arrowbin-new-one/docs/seo/13-sprint-2026-10-15/tools/lh.py --base http://localhost:32N1 --runs 3 --form both --out <your scratch dir> / /services/custom-software-development ...`
  - It prints medians and the LCP element.
  - Three agents run Lighthouse at the same time on one machine, so TBT is noisy. Compare before and after on the same machine minutes apart, and take medians of 3 or more runs.
- **Lighthouse JSON:** the per-request network list is in `audits['network-requests']`, and observed vs simulated timings are in `audits['metrics'].details.items[0]`.
- **Visual check (mandatory before you report):**
  - Write a Playwright script (Python is installed) that captures each page you affected at 1440x900 and 390x844, at several scroll positions, after animations settle. Take the same shots BEFORE your changes (build the untouched copy first) and AFTER.
  - Pixel-diff the shots. Differences may only come from continuously animated elements (marquees, canvas, bobbing). Explain any other difference, or revert the change.
  - Also scroll through in dev once to see the motion still plays.

## Rules

- **No em dashes** (U+2014) in anything you write.
- **No git commands.** The copies have no `.git` anyway.
- **No new npm packages.** Use what is in `node_modules`.
- **Next.js 16.4.1 is installed. Read `node_modules/next/dist/docs/` before using framework features:**
  - `next/dynamic` and lazy loading: `01-app/02-guides/lazy-loading.md`;
  - scripts: `scripts.md`;
  - fonts;
  - `next.config` options.
- **Never change what the page looks like or how it animates.** Every change must be invisible: when, how or where something loads, not what it is.
- **Keep SSR HTML content the same.** Crawlers must still get all text in the raw HTML. No `ssr: false` on anything that renders text or above-the-fold UI. A below-the-fold, purely decorative or interactive island may load its JS later, but its server-rendered HTML must stay.
- **Accessibility and SEO checks stay at 100**, and CLS must stay 0 on every page.
- **Your report** (also write it to `C:\Users\amaiz\Documents\Arrowbin\arrowbin-new-one\docs\seo\16-perf-2026-10-15\<agent>.md`) must cover:
  - the root causes you found, with evidence;
  - every file you changed: path relative to the repo root, plus a one-line summary;
  - before/after Lighthouse medians (mobile and desktop) for the pages you measured;
  - visual-diff evidence;
  - anything you found but did not fix, and why.
