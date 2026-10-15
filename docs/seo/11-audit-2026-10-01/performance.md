# Performance audit: live arrowbin.com (Next.js 16 build)

Captured 2026-10-01 from Dhaka, Bangladesh (Cloudflare DAC edge). Lab data only.

## Performance score: 62 / 100

Weighted toward mobile (Google indexes mobile-first). Mobile average across the 4 templates is 64 (home 51, service 59, work 65, blog 81). Desktop is 96 to 99. Core Web Vitals status (lab): LCP FAIL on mobile (4.0 to 5.2 s vs 2.5 s), CLS PASS (0), INP not measurable in the lab, TBT is the proxy and FAILS on home, service and work (520 to 1,300 ms vs 200 ms).

## Method and caveats

- PSI API called for mobile: HTTP 429 again (keyless quota is 0). So no CrUX / loadingExperience field data and no real INP. Action: create a Google Cloud API key and append `&key=`, or read Search Console > Core Web Vitals; otherwise add `web-vitals` to GA4.
- Fallback: local Lighthouse via `npx` (it resolved to **Lighthouse 12.8.2**, older than the 13.5.0 used on 2026-09-29, so audit names differ slightly; the scoring formula is the same). Runs were sequential, simulated throttling (mobile: Moto G Power / slow 4G; desktop preset). Home mobile was run twice; other pages once. Lab variance is high (home mobile was 55 then 76 on the pre-launch run).

## Raw numbers

### Mobile

| Page | Perf | FCP | LCP | TBT | CLS | Speed Index | TTI | Transfer | Main thread | DOM nodes |
|---|---|---|---|---|---|---|---|---|---|---|
| / (run 1) | 52 | 2.06 s | 4.84 s | 1,296 ms | 0 | 5.4 s | 6.0 s | 650 KiB | 10.1 s | 1,208 |
| / (run 2) | 50 | 3.13 s | 4.98 s | 933 ms | 0 | 5.9 s | 5.8 s | 650 KiB | 6.8 s | 1,208 |
| /services/custom-software-development | 59 | 2.79 s | 5.23 s | 524 ms | 0 | 5.2 s | 6.0 s | 719 KiB | 5.6 s | 1,238 |
| /work | 65 | 2.16 s | 4.45 s | 538 ms | 0 | 5.3 s | 5.9 s | 791 KiB | 3.6 s | 666 |
| /blog/how-much-does-custom-software-development-cost | 81 | 2.00 s | 4.05 s | 192 ms | 0 | 3.3 s | 5.9 s | 708 KiB | 2.6 s | 980 |

### Desktop

| Page | Perf | FCP | LCP | TBT | CLS | Speed Index | Transfer |
|---|---|---|---|---|---|---|---|
| / (run 1 / run 2) | 96 / 98 | 0.75 / 0.54 s | 0.81 / 0.98 s | 46 / 31 ms | 0.007 / 0.009 | 1.8 / 1.3 s | 788 KiB |
| /services/custom-software-development | 99 | 0.42 s | 0.99 s | 0 ms | 0.002 | 0.9 s | 831 KiB |
| /work | 99 | 0.56 s | 0.96 s | 0 ms | 0.001 | 0.8 s | 904 KiB |
| /blog/... | 96 | 0.50 s | 1.32 s | 0 ms | 0.020 | 1.0 s | 864 KiB |

TTFB is 130 to 240 ms (up to 410 ms on one cold run); the server is not the bottleneck.

### LCP elements

| Page | Element | Note |
|---|---|---|
| / | `p.mt-5` hero intro paragraph (text) | mobile and desktop |
| /services/... | `p.svh-fade` intro paragraph (text) | mobile and desktop |
| /work | `p.svh-fade` intro (mobile); `img.object-cover` project image (desktop) | |
| /blog/... | `h1.svh-fade` (mobile); hero `img.object-cover` (desktop, alt text present) | |

LCP breakdown on mobile: TTFB 165 to 415 ms, **element render delay 1.1 to 2.1 s**. Since the mobile LCP nodes are text, not images, the delay is the browser not painting them: render-blocking CSS plus a saturated main thread (fonts and JS). Image load time is not involved.

### Comparison with pre-launch (2026-09-29, Lighthouse 13.5.0)

| Page (mobile) | Pre perf | Now perf | Pre LCP | Now LCP | Pre TBT | Now TBT |
|---|---|---|---|---|---|---|
| / | 55 / 76 | 52 / 50 | 4.5 / 4.0 s | 4.8 / 5.0 s | 880 / 320 ms | 1,296 / 933 ms |
| /services/custom-software-development | 73 | 59 | 5.0 s | 5.2 s | 180 ms | 524 ms |
| /blog/... | 81 | 81 | 4.3 s | 4.05 s | 100 ms | 192 ms |
| /work | not tested | 65 | n/a | 4.45 s | n/a | 538 ms |

Net: no improvement. Mobile LCP is still 4 to 5 s everywhere, and TBT got worse on home and service (partly lab variance and the different Lighthouse version, but the direction is consistently bad). Desktop and CLS are unchanged and fine. Payload is similar (650 to 790 KiB mobile).

## Bottlenecks found

1. **Render-blocking CSS**: `/_next/static/chunks/2b0fzpkmsbkla.css` (27 KB) plus `0_qx_k6s_cpdx.css` (1.5 KB). The render-blocking insight estimates 200 to 600 ms savings on mobile (home 450, service 600, work 410, blog 200).
2. **Main-thread JS**: bootup 0.7 to 1.1 s, long tasks up to 640 ms. Heaviest first-party chunks: `2hkqzir1f_04p.js` (72 KB transferred, long tasks of 236 to 409 ms), `2w6a05k9p9po9.js` (0.6 to 1.8 s script time), `3fphk9vnfo7vj.js` (0.25 to 1.0 s). Layout mounts `SmoothScroll` and `Cursor` on every page (`src/app/layout.tsx` lines 147 to 148).
3. **Unused JS**: 100 to 163 KiB per page; 75 KB of it is the GA tag (`gtag/js?id=G-ZZ3NJCZVMZ`, 174 KB transferred), plus 25 to 38 KB each in three first-party chunks. Legacy-JS polyfills add 22 to 24 KiB.
4. **Third parties**: Google Tag Manager/GA blocks the main thread 170 to 214 ms; the Cloudflare beacon 25 to 35 ms and is the only short-cache asset (4 KB). GA is already `lazyOnload` (`src/components/analytics/GoogleAnalytics.tsx`), so its cost lands in TBT, not LCP.
5. **Fonts**: 57 KB + 29 KB woff2 (display face and Geist) on every page, all `display: swap`. The swap repaint competes with the LCP paragraph.
6. **Hero animation**: `.svh-fade` and `[data-hero-fade]` animate transform only (fine for LCP and CLS). No fix needed there.
7. **Images**: fine. Only 12 KiB responsive-image savings on /work; the blog hero is WebP at 30 KB.
8. **HTML**: about 280 to 310 KB uncompressed (mostly inlined RSC payload); the transferred document is 36 to 38 KB. Pre-launch check showed `cf-cache-status: DYNAMIC` (HTML not edge-cached); not re-checked today.

## Prioritised fixes

| # | Fix | Files | Expected impact | Verify |
|---|---|---|---|---|
| 1 | Stop mounting `SmoothScroll` and `Cursor` on touch/mobile: load via `next/dynamic` with `ssr:false`, only when `(hover: hover) and (pointer: fine)` and not `prefers-reduced-motion`, and after idle | `src/app/layout.tsx`, `src/components/motion/` | TBT down 400 to 900 ms on mobile; LCP render delay down about 0.5 to 1 s; biggest single win | Mobile Lighthouse: TBT under 200 ms on /, /services/*, /work; no `2hkqzir1f_04p.js` long task over 100 ms |
| 2 | Inline critical CSS or shrink the main stylesheet (27 KB): try Next's inline CSS option (check `node_modules/next/dist/docs/` for the Next 16 name) or split non-hero CSS | `next.config.*`, `src/app/globals.css` | 300 to 600 ms off FCP and LCP on mobile | Render-blocking insight under 100 ms; FCP under 1.8 s |
| 3 | Load GA later: trigger on first user interaction or `requestIdleCallback` with a 3 to 5 s cap, or move to Cloudflare Zaraz / Partytown | `src/components/analytics/GoogleAnalytics.tsx` | 150 to 200 ms less TBT; 75 KB less unused JS during load | Third-party summary shows GTM under 50 ms before interaction; events still arrive in GA4 Realtime |
| 4 | Find and split the three large first-party chunks with `@next/bundle-analyzer`; dynamic-import below-the-fold sections (motion, marquee, forms) | `src/components/home`, `sections`, `services` | 60 to 100 KiB less JS; 100 to 300 ms TBT | Unused-JS audit under 50 KiB; bootup under 0.6 s |
| 5 | Set a modern browserslist target to drop 22 to 24 KiB of legacy polyfills | `package.json` | About 20 KiB, about 50 ms | Legacy-JavaScript audit passes |
| 6 | Reduce font cost: subset the display face (Latin only, Bengali separate via `unicode-range`), preload only the hero face, keep `adjustFontFallback` on so the swap does not shift or repaint the LCP text | `src/app/layout.tsx` | 100 to 300 ms on mobile LCP | Fewer and smaller preloaded woff2 files (the 57 KB face under 30 KB) |
| 7 | Cache static HTML at Cloudflare (Cache Rule, Edge TTL plus stale-while-revalidate); remove the Cloudflare beacon if unused | Cloudflare dashboard | TTFB to under 100 ms for distant users | `cf-cache-status: HIT` on a repeat curl |
| 8 | Get field data: add an API key for PSI/CrUX and a `web-vitals` INP reporter to GA4 | `GoogleAnalytics.tsx` | Enables real INP monitoring | PSI returns `loadingExperience`; INP events in GA4 |

Target after fixes 1 to 4: mobile score 85+, LCP under 2.5 s, TBT under 200 ms.

## Verification check (run after deploy)

Run for each of `/`, `/services/custom-software-development`, `/work`, `/blog/how-much-does-custom-software-development-cost`:

    npx -y lighthouse@13 "https://arrowbin.com<path>" --output=json --output-path=out.json --quiet --chrome-flags="--headless=new" --only-categories=performance

Pass when mobile LCP is 2.5 s or less, TBT is 200 ms or less, CLS is 0.1 or less, and performance is 85 or more on all four pages across two consecutive runs. Then confirm with CrUX/PSI field data (p75) after 28 days.
