# Performance audit 2026-10-14 (live vs local)

Lab data only. PSI API returned HTTP 429 (no CrUX field data, no real INP). Lighthouse 12 via npx, simulated throttling, run from this machine on 2026-10-14. Live = https://arrowbin.com (commit 959866d). Local = http://localhost:3117 (uncommitted build). Local TTFB is 5 to 24 ms (localhost), so local FCP/LCP are not strictly comparable with live network timing.

## Performance (CWV) score

| Environment | Score | Basis |
|---|---|---|
| Live | 62 / 100 | Mobile LCP fails (3.4 to 4.7 s on home, 4.05 s service, 4.66 s work), TBT fails on home/service/work, CLS passes except service page; desktop 91 to 98. Mobile average 65 (home median 61). |
| Local | 66 / 100 | Same LCP and home TBT failures; service and work TBT lower (426, 189 ms) but service CLS 0.139. Mobile average 72 (single runs on non-home pages, high variance). Desktop 96 to 99. |

Score is a judgement weighted toward mobile. Previous audit (11-audit-2026-10-01) was 62 with mobile average 64: effectively flat. INP: not measurable in the lab; TBT is the proxy.

## Lighthouse results

Home mobile = median of 3 runs per environment (raw runs listed below). Other pages = 1 run.

### Mobile

| Page | Env | Score | LCP | TBT | CLS | FCP | SI |
|---|---|---|---|---|---|---|---|
| / (median of 3) | live | 61 | 3.86 s | 1,153 ms | 0 | 2.15 s | 4.80 s |
| / (median of 3) | local | 61 | 3.80 s | 1,279 ms | 0 | 1.84 s | 4.36 s |
| /services/custom-software-development | live | 59 | 4.05 s | 838 ms | 0.138 | 2.09 s | 3.50 s |
| /services/custom-software-development | local | 68 | 4.32 s | 426 ms | 0.139 | 1.82 s | 3.10 s |
| /work | live | 58 | 4.66 s | 734 ms | 0 | 2.18 s | 5.68 s |
| /work | local | 80 | 4.36 s | 189 ms | 0 | 1.82 s | 3.61 s |
| /blog/how-much-does-custom-software-development-cost | live | 81 | 2.94 s | 486 ms | 0 | 1.80 s | 2.74 s |
| /blog/how-much-does-custom-software-development-cost | local | 80 | 3.93 s | 288 ms | 0.001 | 1.82 s | 3.29 s |

Home raw runs (score / LCP / TBT / FCP / SI). Live: 47 / 4.63 / 2,170 / 2.13 / 6.88; 64 / 3.40 / 1,153 / 2.15 / 4.32; 61 / 3.86 / 993 / 2.15 / 4.80. Local: 51 / 4.69 / 1,571 / 1.89 / 5.52; 66 / 3.72 / 861 / 1.82 / 3.90; 61 / 3.80 / 1,279 / 1.84 / 4.36.

### Desktop (1 run each)

| Page | Env | Score | LCP | TBT | CLS | FCP | SI |
|---|---|---|---|---|---|---|---|
| / | live | 96 | 0.95 s | 38 ms | 0.009 | 0.54 s | 1.66 s |
| / | local | 96 | 0.82 s | 74 ms | 0.009 | 0.57 s | 1.88 s |
| /services/custom-software-development | live | 98 | 1.06 s | 0 ms | 0.002 | 0.54 s | 1.14 s |
| /services/custom-software-development | local | 97 | 1.08 s | 15 ms | 0.002 | 0.60 s | 1.43 s |
| /work | live | 98 | 0.98 s | 2 ms | 0.001 | 0.60 s | 1.11 s |
| /work | local | 98 | 1.10 s | 12 ms | 0.001 | 0.47 s | 1.04 s |
| /blog/... | live | 91 | 1.23 s | 0 ms | 0.020 | 0.98 s | 2.19 s |
| /blog/... | local | 99 | 0.89 s | 1 ms | 0.020 | 0.47 s | 0.85 s |

Field data (CrUX p75), real INP: not measured.

## Evidence summary (home mobile, run 3 each)

- LCP element: hero intro paragraph `p.mt-5` (text) on home, `p.svh-fade` on service and work, `h1.svh-fade` on blog. Not an image. Home LCP subparts live: TTFB 656 ms, element render delay 794 ms; local: TTFB 24 ms, render delay 1,271 ms. The delay is main-thread/render blocking, not network.
- Main thread (simulated 4x CPU), home live: styleLayout 4.9 s, other 4.6 s, scriptEvaluation 2.5 s, paint/composite 1.8 s. Local: styleLayout 4.4 s, other 3.9 s, script 2.2 s. Style and layout, not script, is the largest bucket now.
- Unthrottled trace of local home: 722 UpdateLayoutTree events (641 ms) and 482 Layout events (622 ms) in about 4 s; one initial Layout of 432 ms over 1,747 objects. Most forced-layout stacks from JS came from a lazy chunk and `2w6a05k9p9po9.js`; I did not map chunks back to source.
- Long tasks live home: document 829 ms, `3fphk9vnfo7vj.js` 541 ms, `3rhq072msbol_.js` 414 ms, `2hkqzir1f_04p.js` 292/261 ms. Local home: document 969 ms, Lighthouse eval 745 ms (artifact), `3fphk9vnfo7vj.js` 197 ms, `1gcz06w_8ou_y.js` 174/150/149 ms, gtag 165/117 ms.
- Third party: Google Tag Manager/gtag 168 KiB, 182 ms blocking, 69 KiB unused (seen in local run; in the live run it did not land inside the window); Cloudflare beacon about 10 KiB, 1 ms blocking.
- Render-blocking CSS: live `2b0fzpkmsbkla.css` 27 KB (est. 300 ms) plus 1.6 KB; local 28 KB (est. 613 ms) plus 2.5 KB. `src/app/globals.css` is 34 KB source, 1,486 lines.
- Fonts: 3 preloaded woff2 (57, 29, 24 KB) plus 4 KB Bengali subset, all `display: swap`. No font-display audit failure.
- Unused JS: one 71 KB chunk with 27 KB unused; legacy-JS savings 13 KiB (down from 22 to 24 KiB; browserslist is already modern in package.json). DOM 1,195 to 1,206 elements. Transfer: live home 475 KiB, local 476 to 653 KiB.

## Findings

| # | Finding | Priority | Status | Evidence | Fix (source) | Effort | Owner | Failure check |
|---|---|---|---|---|---|---|---|---|
| 1 | Mobile LCP 3.4 to 4.7 s on all templates; LCP is hero text with 0.8 to 1.3 s render delay | High | OPEN (live and local) | Table above | Reduce first-paint main-thread work (items 2, 3, 5); hero text is gated by `.svh-fade` reveal in `src/app/globals.css` and `src/components/home/motion/HeroMotion.tsx`; make sure the LCP paragraph is visible in first paint and only transform animates | M | dev | Mobile LCP at or under 2.5 s on two consecutive runs |
| 2 | Style recalc and layout dominate the main thread (about 4.4 to 6.0 s simulated) with 700+ style recalcs in 4 s | High | NEW (not diagnosed last audit) | styleLayout bucket in all four pages; trace counts above | Find layout-triggering work: hero/inner animations (`HeroMotion.tsx`, `InnerMotion.tsx`, `useGsapReveal.ts`), `text-wrap: balance` (globals.css line 151) on many headings, `font-variation-settings` on `--wdth` (globals.css line 175), `backdrop-filter` (line 214), `filter: blur(48px)` (line 261). Animate transform/opacity only, avoid reading layout in ScrollTrigger refreshes (`SmoothScroll.tsx` refresh after `document.fonts.ready`) | M | dev | DevTools Performance: style+layout under 1 s unthrottled on load; Lighthouse styleLayout under 2 s |
| 3 | TBT 0.8 to 1.3 s on home (median), live and local | High | OPEN | 1,153 ms live, 1,279 ms local | Split chunks `3fphk9vnfo7vj.js`, `3rhq072msbol_.js`/`2w6a05k9p9po9.js`, `2hkqzir1f_04p.js` with a bundle analyzer; dynamic-import below-fold sections and GSAP consumers (`src/lib/gsap.ts` is already lazy). `Cursor.tsx` and `SmoothScroll.tsx` already gate on fine pointer and run on idle, so they are not the mobile cause (previous audit fix 1 is effectively already in the code; I did not verify whether live runs the same code) | M | dev | No task over 100 ms from first-party chunks in Lighthouse long-tasks |
| 4 | Service page CLS 0.138 on mobile (fails 0.1) | Medium | NEW (was 0 on 2026-10-01); same live and local | Culprit: `div.mt-10.grid` in the hero, cause "Web font loaded" (Geist woff2 files) | Add size-matched fallback metrics (`adjustFontFallback` is on for next/font; check display face `Anybody` with `preload: false` in `src/app/layout.tsx`), reserve hero height, or preload the display face for service heroes (`src/components/services/ServiceHero.tsx`) | S | dev | CLS under 0.1 on three mobile runs; single run, so may be timing variance |
| 5 | GA/GTM main-thread cost 180 ms blocking, 69 KiB unused | Medium | OPEN | Third-party summary | `src/components/analytics/GoogleAnalytics.tsx`: already `lazyOnload`; defer to first interaction or idle with a cap, or use Cloudflare Zaraz | S | dev | GTM blocking under 50 ms before interaction; GA4 Realtime still receives events |
| 6 | Render-blocking CSS 28 KB (est. 300 to 613 ms) | Medium | OPEN | Render-blocking insight | `inlineCss` was tried and removed (config note), so trim `src/app/globals.css` (34 KB) by splitting page-specific rules, or ship hero-critical CSS only | M | dev | Render-blocking insight under 100 ms |
| 7 | Legacy JS polyfills | Low | FIXED-LIVE (browserslist modern; savings 13 KiB, was 22 to 24) | Legacy-JS audit | Remaining 13 KiB likely in a dependency chunk; optional | S | dev | Audit passes |
| 8 | Fonts | Low | OPEN | 57+29+24 KB preloaded woff2 | `src/app/layout.tsx`: confirm only hero-needed faces are preloaded; Geist (29 KB) and Geist Mono preload choices | S | dev | Fewer preloaded files |
| 9 | Cloudflare HTML cache | Info | not measured today; live `cache-control: s-maxage=31536000`, `x-nextjs-cache: HIT`, no `cf-cache-status` header seen in the first response | curl -I | Confirm Cache Rule in Cloudflare | S | founder/dev | `cf-cache-status: HIT` |
| 10 | No field data or INP | Medium | OPEN | PSI 429 | Add PSI key, `web-vitals` INP reporter in `GoogleAnalytics.tsx`, check Search Console CWV report | S | dev/founder | INP p75 visible |

LiquidCanvas: I did not inspect or measure it, so no finding is made. Chunk-to-source mapping was not done (stopped at coordinator request).

## Suspense trade-off

The local build removed the homepage Suspense wrappers (fix 7) so all text sits inside `<main>` in the initial HTML. Home TBT median moved from 1,153 ms (live) to 1,279 ms (local), about 11 percent higher, while the median score (61 each), LCP (3.86 vs 3.80 s) and FCP (2.15 vs 1.84 s) did not get worse. Run-to-run spread on the same build is far larger (live 993 to 2,170 ms), so the TBT increase is within noise but directionally expected. Advice: keep the unwrap on the homepage; crawlable HTML outweighs the small lab cost, and the lever for TBT is items 2 and 3, not Suspense.

For /services and the individual service pages, which still stream FAQ/CTA into hidden blocks: unwrap them too if the FAQ/CTA text is meant to rank or be cited, since streamed content inside hidden blocks can be missed by crawlers and AI fetchers that do not run scripts. These pages are already lighter locally (service TBT 426 ms local vs 838 ms live in single runs, not conclusive). Prefer unwrapping but keep FAQ answers server-rendered in the first HTML, then re-measure TBT; if TBT rises, reduce cost by splitting client components rather than restoring Suspense.

## Comparison with 2026-10-01

Live mobile then vs now (home 51 to 61 median, service 59 to 59, work 65 to 58, blog 81 to 81): flat within variance. LCP 4 to 5 s now 2.9 to 4.7 s (slightly better on blog and home). Desktop unchanged (91 to 98). New: service CLS 0.138 (was 0), and style/layout identified as the dominant main-thread cost.
