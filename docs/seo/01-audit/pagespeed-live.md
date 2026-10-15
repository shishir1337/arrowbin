# PageSpeed / Core Web Vitals: live arrowbin.com

Captured 2026-09-29 (11:20 to 11:23 UTC). Site measured: the currently deployed https://arrowbin.com.

## 1. Why these are Lighthouse numbers, not PageSpeed Insights numbers

The PageSpeed Insights public API was called as briefed:

- `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://arrowbin.com&strategy=mobile`
- `...&strategy=desktop`

Both returned **HTTP 429 RESOURCE_EXHAUSTED** ("Quota exceeded for quota metric 'Queries' and limit 'Queries per day'", `quota_limit_value: "0"`). Keyless PSI calls now have a zero daily quota. To get PSI and CrUX field data, create a Google Cloud API key and append `&key=YOUR_KEY`.

As a substitute I ran **Lighthouse 13.5.0** locally (the same engine PSI uses) against the live URL, with headless Chrome and the default simulated throttling: Moto G Power / slow 4G for mobile, and the desktop preset. The test machine is in Dhaka, Bangladesh, and Cloudflare served from the DAC edge. Lab scores vary from run to run, so I ran the homepage twice per form factor.

## 2. Field data (CrUX: INP, LCP, CLS at p75)

**Not available.** The PSI API was blocked (above), and the CrUX API also needs a key. The site probably has too little Chrome traffic to have a CrUX record anyway. INP is a field-only metric, so there is no INP value. Total Blocking Time (TBT) is the lab proxy for it.

Action: after launch, check Search Console > Core Web Vitals and PSI with an API key. If the origin has no CrUX data, use GA4 with the `web-vitals` library for real-user INP/LCP/CLS.

## 3. Lab results

### Homepage, mobile (simulated slow 4G, Moto G Power)

| Metric | Run 1 | Run 2 | Good threshold |
|---|---|---|---|
| Performance score | **55** | **76** | 90+ |
| First Contentful Paint | 2.9 s | 2.3 s | ≤ 1.8 s |
| **Largest Contentful Paint** | **4.5 s** | **4.0 s** | ≤ 2.5 s |
| Total Blocking Time (INP proxy) | **880 ms** | 320 ms | ≤ 200 ms |
| Max potential FID | 610 ms | 200 ms | n/a |
| **Cumulative Layout Shift** | 0 | 0 | ≤ 0.1 |
| Speed Index | 5.6 s | 3.9 s | ≤ 3.4 s |
| Time to Interactive | 5.7 s | 5.9 s | n/a |
| Server response (TTFB, root doc) | 130 ms | 130 ms | ≤ 600 ms (lab) |
| Main-thread work | 6.4 s | 7.2 s | n/a |
| Total transfer | 665 KiB | 664 KiB | n/a |
| Accessibility / Best practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 | n/a |

LCP element (both runs): the hero intro paragraph, "Arrowbin is a software studio that designs and engineers web platforms, mobile ...", with selector `section.relative > div.mx-auto > div.md:col-span-5 > p.mt-5`. It is text, not an image. In the new build this element only animates `transform` and stays opaque (`src/app/globals.css`, `.js [data-hero-fade]`), and a transform does not delay LCP. The LCP time therefore comes from render-blocking CSS, web-font loading/swap (Geist with `display: swap`) and main-thread contention, not from image weight.

### Homepage, desktop

| Metric | Run 1 | Run 2 |
|---|---|---|
| Performance score | 97 | 98 |
| FCP | 0.6 s | 0.6 s |
| LCP | 1.0 s | 1.0 s |
| TBT | 10 ms | 50 ms |
| CLS | 0.007 | 0.009 |
| Speed Index | 1.3 s | 1.2 s |
| TTFB | 130 ms | 130 ms |
| Total transfer | 815 KiB | 815 KiB |
| A11y / BP / SEO | 100 / 100 / 100 | 100 / 100 / 100 |

The only accessibility flag is `label-content-name-mismatch`: some element's visible text does not match its accessible name.

### Other templates, mobile (1 run each)

| Page | Perf | FCP | LCP | TBT | CLS | Transfer | LCP element |
|---|---|---|---|---|---|---|---|
| /services/custom-software-development | 73 | 2.3 s | **5.0 s** | 180 ms | 0 | 737 KiB | Intro paragraph `p.svh-fade` (animated fade-in) |
| /blog/how-much-does-custom-software-development-cost | 81 | 2.3 s | **4.3 s** | 100 ms | 0 | 709 KiB | n/a |

## 4. Recurring Lighthouse opportunities (every run)

| Audit | Detail |
|---|---|
| Render-blocking requests | 2 CSS chunks (`/_next/static/chunks/2b0fzpkmsbkla.css`, `/_next/static/chunks/0_qx_k6s_cpdx.css`). Estimated savings: 600 to 630 ms on mobile, 60 to 110 ms on desktop |
| Reduce unused JavaScript | 98 to 99 KiB on the homepage, 163 KiB on the service page, 125 KiB on the blog post |
| Forced reflow | Flagged on every run (JS reads layout after writing styles; likely GSAP/scroll code) |
| Network dependency tree | Long critical request chains |
| Cache lifetimes | Small (4 KiB), probably the Cloudflare beacon |
| Image delivery | 19 KiB of savings on the blog post |

## 5. Raw HTML size (curl, uncompressed)

| URL | HTML bytes | Response time (Dhaka) |
|---|---|---|
| / | 308,501 | 0.26 s |
| /services/custom-software-development | 283,532 | 0.18 s |
| /blog/how-much-does-custom-software-development-cost | 279,475 | 0.16 s |
| /services | 219,167 | 0.12 s |
| /contact | 112,899 | 0.11 s |

Most of each page's HTML is the inline React Server Components payload (`self.__next_f.push`), which repeats the rendered content as serialized data.

## 6. Headers seen (homepage)

`HTTP/1.1 200`, `Server: cloudflare`, `cf-cache-status: DYNAMIC` (Cloudflare does **not** cache the HTML), `Cache-Control: s-maxage=31536000`, `X-Powered-By: Next.js`, `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, full CSP, `X-Frame-Options: DENY`.

## 7. Reading

- Desktop is fine. Mobile LCP (4.0 to 5.0 s) fails the 2.5 s "good" threshold on every template tested, and TBT is unstable (320 to 880 ms). That gives a real INP risk on low-end Android.
- CLS is excellent (0 on mobile).
- The server is not the problem (TTFB 130 ms). The cost comes from render-blocking CSS (about 600 ms estimated), font swap on the LCP text, and JS execution (smooth scroll, custom cursor, motion code) that competes for the main thread.
- The new build shares the same architecture (`src/app/layout.tsx` mounts `SmoothScroll` and `Cursor` on every page), so expect similar numbers until the fixes in `technical-audit.md` (H-5) are made. Re-run this benchmark against the new build before launch.
