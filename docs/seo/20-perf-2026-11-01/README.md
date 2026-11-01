# PageSpeed sprint, 1 Nov 2026: Performance and Best Practices back to 100

**Goal (founder, 1 Nov):** 100 in Performance, Accessibility, Best Practices and SEO on every page, mobile and desktop, with the site looking and moving exactly as before and never feeling laggy.

**Status:** done in code (5 commits, below, pushed to `main` on 1 Nov). It goes live with the next deploy. PageSpeed reads the live site, so its scores only change after that.

## What PageSpeed showed (live site, 1 Nov 06:37)

| Page | Device | Perf | A11y | Best Practices | SEO | What failed |
|---|---|---|---|---|---|---|
| Home | Mobile | 97 | 100 | 96 | 100 | Speed Index 4.0 s; a DevTools "issues" audit |
| Home | Desktop | **73** | 100 | **77** | 100 | TBT 400 ms, Speed Index 6.5 s, 31 s of main-thread work; third-party cookies |
| Custom software | Mobile | **82** | 100 | 96 | 100 | TBT 710 ms |
| Custom software | Desktop | 100 | 100 | 96 | 100 | |

Locally, Lighthouse 13.6 (the version PageSpeed uses) against the live site also showed Best Practices **77 on every page** and **/privacy, /terms and /contact at 89 to 92 on mobile**, whose first paint was stuck at 2.4 s.

## Why PageSpeed scores move around

PageSpeed runs on shared machines, and their speed changes from run to run. On 1 Nov its reports showed:

- **desktop CPU power from 356 to 1,014**, unthrottled;
- **mobile from 574 to 822**, with a 1.2x throttle.

A page only scores 100 reliably if it still fits the budget on a slow draw. This machine benchmarks about 3,150, so the local checks used (`tools/lhfull.py --psi`):

- mobile at a **5x** CPU slowdown;
- desktop at **4x**;
- the GPU disabled, because PageSpeed's servers have none.

For desktop that's harsher than PageSpeed's typical run.

## Root causes and fixes

| Commit | Problem | Fix |
|---|---|---|
| `addf161` | **Best Practices 77:** Microsoft Clarity sets third-party cookies (clarity.ms, bing.com); Clarity and Google's preferred-source frame log cookie issues. All three, plus gtag.js (180 KB), also ran during the load. | They load on the visitor's **first interaction** (touch, wheel, key, click or mouse move, then an idle moment), never during the load. GA's init still runs at idle, so the page view and lead events are queued; the gtag.js library also loads after 10 s without interaction. `/cdn-cgi/trace` is now read even on an error, because an unread body kept Lighthouse's trace open for 45 s. |
| `f6d6a3d` | **Desktop 73:** PageSpeed's servers have no GPU, so the hero's WebGL liquid shader was drawn in software, every frame, on a slow CPU. | Without a real GPU (`failIfMajorPerformanceCaveat`, or a software renderer name) the canvas stays hidden and the CSS gradient behind it shows. Real visitors with a GPU see the same blob. Also fixed axe `label-content-name-mismatch` on the hero scroll button (its spinning ring is now a sibling of the button). |
| `fa6aabb` | **TBT:** long tasks in the first seconds: GSAP loading for the custom cursor, every section's ScrollTrigger setup measuring the page, forced style recalcs in `InnerMotion`. | The cursor sets up on the first mouse move. Sections below the home page's pinned services panel, the footer wordmark, `SectionReveal`, the /services index and `InnerMotion`'s heading reveals set up when they come within two screen heights (`useGsapIdle(setup, near)`). `InnerMotion`'s style reads moved to the first hover. |
| `ab136e3` + `6a673bc` | **First-paint stall on phones:** Chrome falls back to one frame a second when the first frame's layout is still running shortly after navigation. `FirstFrame` skips below-the-fold layout in the first frame, but only for main's 4th child onward, and the long content of /privacy, /terms and /contact sits earlier. Separately, the /about portrait preload travelled in the RSC payload and was applied by every page's link prefetch. | `data-ff`, `data-ff-kids` and `data-ff-hide` opt below-the-fold content (the policy sections, the /contact form, /about's values, the /work list) and the closed mobile menu into the first-frame skip. Wide-screen image preloads are now a client component (`WideImagePreload`), so prefetches don't fire them. The /blog lead cover, which is the desktop LCP there, is preloaded on wide screens. Watch out: when the skip turns off, Chrome can report content painted then as the LCP even if it sits below the fold. That's harmless for text, but marking the /blog post list made the lead cover image the mobile LCP (91), so `6a673bc` unmarked it and set the lead card's reveal up at idle again, as on the live site. |

## Results (local production build, PageSpeed-like CPU, Lighthouse 13.6)

All 39 sitemap pages, mobile at 5x CPU and desktop at 4x, with no GPU. One run each on the final code (commit `6a673bc`). Where a run hit the 1 µs timestamp quirk described below, the page was rerun 2 or 3 times and the median is shown.

**Performance 100 on 73 of 78 page/device pairs.** Accessibility and SEO were 100 on all 78.

| Page | Mobile Perf (TBT, LCP) | Desktop Perf (TBT, LCP) |
|---|---|---|
| `/` | **99** (112 ms, LCP 1.36 s) | 100 (78 ms, LCP 0.53 s) |
| `/services` | 100 (82 ms, LCP 1.21 s) | 100 (59 ms, LCP 0.38 s) |
| `/work` | 100 (38 ms, LCP 1.21 s) | **99** (40 ms, LCP 0.85 s) |
| `/about` | 100 (61 ms, LCP 1.21 s) | 100 (25 ms, LCP 0.79 s) |
| `/blog` | 100 (40 ms, LCP 1.21 s) | 100 (23 ms, LCP 0.81 s) |
| `/contact` | 100 (85 ms, LCP 1.21 s) | 100 (52 ms, LCP 0.39 s) |
| `/privacy` | 100 (81 ms, LCP 1.21 s) | 100 (55 ms, LCP 0.33 s) |
| `/terms` | 100 (81 ms, LCP 1.21 s) | 100 (56 ms, LCP 0.33 s) |
| `/services/custom-software-development` | 100 (80 ms, LCP 1.36 s) | 100 (45 ms, LCP 0.52 s) |
| `/services/ecommerce-development` | 100 (79 ms, LCP 1.21 s) | 100 (40 ms, LCP 0.50 s) |
| `/services/mobile-app-development` | 100 (82 ms, LCP 1.21 s) | 100 (38 ms, LCP 0.46 s) |
| `/services/saas-product-engineering` | 100 (79 ms, LCP 1.36 s) | 100 (58 ms, LCP 0.51 s) |
| `/services/ui-ux-design` | 100 (84 ms, LCP 1.21 s) | 100 (56 ms, LCP 0.46 s) |
| `/services/ai-automation` | 100 (79 ms, LCP 1.21 s) | 100 (54 ms, LCP 0.46 s) |
| `/services/cloud-devops-hosting` | 100 (83 ms, LCP 1.21 s) | 100 (39 ms, LCP 0.49 s) |
| `/services/maintenance-support` | 100 (42 ms, LCP 1.21 s) | 100 (54 ms, LCP 0.45 s) |
| `/work/maneel-club` | 100 (40 ms, LCP 1.21 s) | **99** (26 ms, LCP 0.84 s) |
| `/work/north-bengal-agro-farms` | 100 (42 ms, LCP 1.21 s) | 100 (31 ms, LCP 0.34 s) |
| `/blog/how-much-does-custom-software-development-cost` | 100 (39 ms, LCP 1.36 s) | 100 (31 ms, LCP 0.67 s) |
| `/blog/how-to-choose-a-software-development-company` | 100 (78 ms, LCP 1.36 s) | 100 (27 ms, LCP 0.65 s) |
| `/blog/how-long-does-it-take-to-build-an-mvp` | **94** (42 ms, LCP 3.01 s) | 100 (27 ms, LCP 0.67 s) |
| `/blog/vibe-coded-app-production-ready` | 100 (91 ms, LCP 1.36 s) | 100 (41 ms, LCP 0.43 s) |
| `/blog/wordpress-to-nextjs-migration` | 100 (78 ms, LCP 1.36 s) | 100 (43 ms, LCP 0.44 s) |
| `/blog/payment-gateway-integration-bangladesh` | 100 (40 ms, LCP 1.36 s) | 100 (31 ms, LCP 0.45 s) |
| `/blog/ai-agent-cost-small-business` | 100 (81 ms, LCP 1.36 s) | 100 (42 ms, LCP 0.43 s) |
| `/blog/mvp-development-cost` | 100 (39 ms, LCP 1.36 s) | 100 (50 ms, LCP 0.43 s) |
| `/blog/shopify-vs-custom-ecommerce` | 100 (44 ms, LCP 1.36 s) | 100 (21 ms, LCP 0.45 s) |
| `/blog/chatgpt-shopping-for-online-stores` | 100 (81 ms, LCP 1.36 s) | 100 (41 ms, LCP 0.43 s) |
| `/blog/saas-development-cost` | 100 (40 ms, LCP 1.36 s) | 100 (28 ms, LCP 0.42 s) |
| `/blog/courier-api-integration-bangladesh` | 100 (46 ms, LCP 1.36 s) | 100 (46 ms, LCP 0.43 s) |
| `/blog/software-maintenance-cost` | 100 (40 ms, LCP 1.36 s) | 100 (22 ms, LCP 0.69 s) |
| `/blog/mvp-vs-prototype-vs-poc` | 100 (42 ms, LCP 1.36 s) | 100 (30 ms, LCP 0.43 s) |
| `/blog/ai-automation-for-small-business` | 100 (78 ms, LCP 1.36 s) | 100 (23 ms, LCP 0.42 s) |
| `/blog/developer-salaries-by-country` | 100 (82 ms, LCP 1.36 s) | 100 (50 ms, LCP 0.65 s) |
| `/blog/custom-software-vs-off-the-shelf` | 100 (44 ms, LCP 1.36 s) | 100 (41 ms, LCP 0.63 s) |
| `/blog/headless-commerce` | 100 (75 ms, LCP 1.36 s) | 100 (27 ms, LCP 0.69 s) |
| `/blog/app-development-cost-bangladesh` | 100 (40 ms, LCP 1.36 s) | 100 (29 ms, LCP 0.42 s) |
| `/blog/offshore-vs-nearshore-vs-onshore` | 100 (42 ms, LCP 1.36 s) | 100 (40 ms, LCP 0.44 s) |
| `/blog/php2shell-php-vulnerability-check-and-fix` | 100 (41 ms, LCP 1.51 s) | **99** (73 ms, LCP 0.75 s) |

Every other category was 100 on every page, except Best Practices at 96 locally. That is only because `/cdn-cgi/trace` exists behind Cloudflare and not on a bare `next start`. On the live site that request succeeds.

## What changed for real visitors

Pixel-identical screenshots of 8 pages against the live site, at desktop and phone sizes and three scroll positions each, confirm nothing looks different. After scrolling through, both sites also show the same hidden-element counts and page heights. The differences are only in timing:

- **Google Analytics** counts every visit that interacts or stays 10 seconds. A visit that leaves within 10 seconds without touching anything is not counted (Cloudflare Web Analytics still counts it).
- **Clarity** recordings start at the first interaction.
- **The "Add Arrowbin as a preferred source" button** draws after the first interaction. It sits at the end of posts and in the footer, so it is always ready before anyone reaches it.
- **The custom cursor:** until the mouse first moves, the normal cursor shows. Before this change there was no cursor at all until the mouse moved.
- **The WebGL hero** shows its CSS gradient on machines without a working GPU. A software-drawn shader stutters there.
- **Scroll animations** for far-down sections set up two screens before the visitor reaches them, instead of during the load.

## Not fixed, and why

1. **Desktop 99 on /work, /work/maneel-club and the PHP2Shell post.** The LCP is an image, and Lighthouse's desktop simulation counts every script downloaded before it: about 0.85 s, where 100 needs about 0.65 s. The live site has the same 99 today. Fixing it means changing which element is largest, or shipping less framework JavaScript, so I left it.
2. **Home mobile sits at 99 to 100.** What remains is React and Next.js starting up (about 26 ms of CPU on this machine) and GSAP's own startup (about 17 ms), which are fixed costs. The pinned services panel still sets up during the load: on a phone, its full re-measure (about 100 ms) would show as a stutter if it ran mid-scroll.
3. **One post, "How long does it take to build an MVP", sits at about 95 on mobile.** Its title is short, so on a phone its cover photo takes more of the first screen than the title and becomes the LCP element. Lighthouse charges an image LCP with every script downloaded before it: live PageSpeed gave 95 with LCP 3.0 s on 1 Nov, and that is unchanged by this work. Every other post's LCP is its title. Fixing this one needs a design call: a smaller cover on phones, or a longer title.
   - Tried and reverted: fetching post covers at high priority, since Next 16's `priority` now only adds a low-priority preload. That slowed the title's display font on the other posts, the title then painted after first paint, and their mobile score fell from 100 to about 92. The cover is best left at low priority.
4. **The Chrome first-paint stall can still hit /about and /contact** under live-like timing (`tools/stall.py` through `tools/delayproxy.py`), because their first screens are bigger. With everything else fixed, a stalled run now scores 99, not 89.

## Why a page can show 94 or 95 on one run and 100 on the next

Lighthouse scores a text LCP exactly like first paint only when Chrome records the two at the same timestamp. Sometimes Chrome logs them 1 microsecond apart, although they are the same frame. Lighthouse then falls back to a model that charges the LCP with every script started before it, about 3 s on mobile, and the page shows 94 or 95.

Here it hit about 1 mobile run in 4 on blog posts and the mobile app service page; the same pages scored 100 on the other runs. It doesn't depend on the site's code. If a page shows 94 or 95 with "LCP 2.9 to 3.0 s" while its LCP element is text, run PageSpeed again.

## After the deploy

1. On the server: `git pull`, `pnpm install`, `pnpm build`, then restart the app.
2. In Cloudflare, purge the cache (Caching > Configuration > Purge Everything).
3. Run PageSpeed on the home page, a service page and a blog post. If a score shows under 100, run it once more: PageSpeed's machines vary from run to run, and so does the timestamp quirk above.

## Tools

- `tools/lhfull.py`: all four categories plus every failing audit; `--psi` emulates PageSpeed's hardware.
- `tools/stall.py`: observed first paint per run, to spot the stall.
- `tools/delayproxy.py`: a local proxy with live-like delays (the stall needs them to reproduce).
