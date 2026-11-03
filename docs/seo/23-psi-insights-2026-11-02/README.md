# PageSpeed insights and diagnostics (2 November 2026)

After `37c970f` was deployed, live PageSpeed Insights (mobile and desktop, home
page) still listed:

- Render-blocking requests (two CSS files, est. 450 ms mobile, 100 ms desktop)
- Forced reflow (`_lighthouse-eval.js` 104 ms, plus GSAP and ScrollTrigger code)
- Network dependency tree (HTML, then CSS, then the Bengali font: 1,576 ms)
- Legacy JavaScript (14 KiB: Next.js polyfills)
- Reduce unused JavaScript (24 KiB, the React DOM chunk)
- Minimize main-thread work (2.6 s mobile, 2.7 s desktop)

The founder wanted them gone without changing how the site looks or feels.

## What each one was, and what changed

### Legacy JavaScript: fixed

Next.js ships `next/dist/build/polyfills/polyfill-module.js` to every browser.
It patches `trimStart`, `flat`, `at`, `Object.hasOwn` and others that every
browser Next 16 supports already has. `turbopack.resolveAlias` in
next.config.ts swaps it for `src/lib/next-polyfills.ts`, which keeps only
`URL.canParse` (Chrome 120, Safari 17; Next supports Chrome 111 and Safari
16.4). If a Next upgrade moves the file, the alias stops matching and Next's
own polyfills come back; nothing breaks.

### Network dependency tree: fixed

The insight fails on any chain of two or more critical requests, and a
`<link rel="stylesheet">` in the HTML is one. Lighthouse treats preloaded files
as not critical (trace engine, `NetworkDependencyTree.isCritical`). So
`src/proxy.ts` now adds

    Link: </_next/static/chunks/….css>; rel=preload; as=style, …

to every page response (documents only, not RSC fetches), with the two
stylesheet URLs read once from the prerendered home page. Cloudflare can send
the same header as 103 Early Hints (Speed > Optimization > Early Hints).

The proxy now runs for every page instead of only the old spam URLs. Its 410
and redirect rules moved into code with the same patterns; 44 URLs (spam
paths, case variants, pages, feeds, files, redirects) return exactly the same
status and Location as before (`tools/urlcheck.sh BASE`, URL list in `tools/urls.txt`).

**Side effect in Lighthouse's simulation.** A preloaded stylesheet starts as
"non-blocking" in its network record, so Lantern stops waiting for it: the
simulated first paint moved from 1.36 s to about 1.0 s on the home page, and
every long task after it started counting as blocking time. The biggest was
the home page's full layout right after the first frame (FirstFrame turns
`content-visibility` off in one go: about 100 ms on a fast desktop). Home
mobile fell to 92 until that was split (next section). Real browsers are
unaffected either way: the stylesheet still blocks rendering.

### Main-thread work and forced reflow: mostly fixed

About 40% of the main-thread time PageSpeed measured was frames nobody asked
for. Chrome builds a main-thread frame (style, layout, paint, commit) 60 times
a second while anything on the page needs one, and every such frame restyles
every running CSS animation, including ones the compositor would otherwise
run for free. Found with `tools/survey.py`, `tools/pausetest.py` and
`tools/compfail.py`:

| Cause | Change |
|---|---|
| Lenis ran an endless `requestAnimationFrame` loop on desktop pages | Frames only while a smooth scroll is moving (every scroll goes through `lenis.scrollTo`; the loop stops on the frame it settles). SmoothScroll.tsx |
| ServiceArt shapes animate inside an SVG, which Chrome runs on the main thread, even off screen | Paused while off screen (`ArtSvg`, `lib/offscreen.ts`); they resume where they stopped |
| The CTA's pulsing ring: Chrome keeps it on the main thread while it's off screen ("no visible change"), about 100 ms per second | `OffscreenLoop`, same pause |
| Hero arrow: `translate` keyframes plus Tailwind's `rotate-90` (the separate `rotate` property) on an `<svg>` ("SVG target has independent transform property") | Animation and rotation moved to a wrapping `<span>` |
| Hero "Scroll · Explore" ring: rotating the `<svg>` caused a layout every frame | Rotation moved to a wrapping `<span>` |
| GSAP on the home page set up at idle during load: its layout measuring is the "forced reflow" (Lighthouse wraps `requestIdleCallback`, so our idle callbacks show up as `_lighthouse-eval.js`), and importing ScrollTrigger starts its endless empty frame loop (a Firefox workaround inside GSAP) | Home scroll motion and the testimonials deck set up once the visitor starts using the page: first touch, wheel, key, pointer move or actual scroll (`whenEngaged`), or right away when the page opens scrolled or on a #link. The hero fills the first screen, so every section is in its starting pose until then |
| FirstFrame laid out the rest of a phone page in one long task after the first frame | Laid out a few elements per animation frame (at most 12 frames), then `cv-off`; GSAP waits for `cv-off` before it measures (`laidOut` in lib/gsap.ts) |

Setting up pinned sections after a jump used to push the visitor's content away.
This happens when the visitor opens `/#work`, presses End or uses the find bar.
The live site already did this for #links: `/#work` ended up 3,100 px past Work.
`holdView`/`restoreView` in useIdleEffect.ts now keep the section in the middle
of the screen in place through the setups and re-measures. `tools/jumpprobe.py`
and `tools/hashprobe.py` check it.

### Render-blocking requests: not fixable without a worse score

The insight fails whenever a render-blocking request exists before the first
paint. The only fix is inlining all CSS into every page. With Next's
`experimental.inlineCss` the home page HTML went from 307 KB to 775 KB raw,
because Next copies the CSS into the RSC payload as well. The 1 November
measurements also had home mobile falling from 99 to 93 (see next.config.ts).
Left as is.

### Reduce unused JavaScript: not fixable from the site

The one file listed is React DOM plus Next's router (`react-dom-client`,
about 200 KB raw). About a third of it is code a page doesn't run during load.
Lighthouse lists a file when the unused share is over 20 KiB after compression:

- Live gzip: 24 KiB.
- Brotli at maximum quality would still be 20.6 KiB (measured on the live
  chunk: 62.5 KB × 33.7%).

See also `docs/seo/22-unused-js-css-2026-11-02`.

## Results

Local production builds side by side, the deployed `37c970f` (before) and this
change (after). Lighthouse 13.6 with `lhfull.py --psi`, one run per page and
form factor. These settings use a harsher CPU than PageSpeed: the live home
page measured 4.0 s of main-thread work here against PageSpeed's 2.6 s, a
ratio of about 0.7.

**Scores** (performance; accessibility and SEO 100 everywhere):

| Page | Mobile before → after | Desktop before → after |
|---|---|---|
| / | 98 → 98 (FCP 1.36 → 0.99 s, SI 1.61 → 1.31 s, TBT 148 → 165 ms) | 99 → 100 (TBT 110 → 43 ms) |
| /about | 100 → 100 | 99 → 100 |
| /services | 100 → 99 (TBT 86 → 112 ms) | 100 → 100 |
| /services/custom-software-development | 100 → 100 | 99 → 100 |
| /blog | 100 → 99 (TBT 38 → 107 ms) | 100 → 100 |
| /work | 100 → 100 | 99 → 99 |

On phones, first paint, LCP and Speed Index improved on every page.
Simulated blocking time rose on some pages, because the earlier simulated
first paint now counts React's hydration task (see the side effect above).
Both effects come from Lighthouse's simulation; the page does the same
work either way.

**Insights shown** (12 reports: 6 pages × mobile and desktop):

| Insight | Before | After |
|---|---|---|
| Network dependency tree | 12 | 0 |
| Legacy JavaScript | 12 | 0 |
| Minimize main-thread work (here, harsher CPU) | 9 | 5 |
| Forced reflow | 3 (home: GSAP) | 3 (small, "unattributed": no script named; varies run to run) |
| Render-blocking requests | 12 | 12 (see above) |
| Reduce unused JavaScript | 12 | 12 (React DOM, see above) |

Main-thread work in seconds here, before → after:

| Page | Mobile | Desktop |
|---|---|---|
| / | 4.0 → 2.6 | 3.7 → 2.2 |
| /about | 2.6 → 1.5 | 2.5 → 1.4 |
| /services | 3.6 → 2.0 | 3.1 → 2.7 |
| /services/custom-software-development | 2.6 → 2.1 | 2.8 → 2.3 |
| /blog | 1.4 → 1.4 | 1.6 → 1.2 |
| /work | 1.9 → 1.9 | 2.3 → 1.5 |

At the 0.7 ratio, every page lands at or under PageSpeed's 2.0 s line, which
it needs to pass. Idle cost after load on the home page (style and task
time over 3 s): desktop 382 → about 100 ms, phone 254 → about 95 ms.

**Unchanged look and behaviour:**

- `shots.py` and `imgdiff.py` on 12 pages, mobile and desktop. Same page
  heights everywhere. Changed pixels are 0 to 0.22% (/work 0.9%: its rotating
  deck), all animation phases (tapes, the CTA ring, the spinning square).
- `motiontest.py`: 41 of 41 pass.
- Testimonials drag and buttons work on desktop and phone, as before.
- `jumpprobe.py`: the testimonials deck stays in place after a jump, on
  desktop and phone. Before the hold, setting up the home motion after the
  jump pushed it 3,100 px down.
- `hashprobe.py`: `/#work` and `/#services` stay on their section. On the
  live site `/#work` ends up 3,100 px past it.
- `tools/urlcheck.sh`: 44 URLs, same status and redirect target as before.

## Next.js 16.4.4 and two console fixes (3 November)

Next 16.4.3 → 16.4.4 (`pnpm add next@16.4.4`). It is a backport release with
nothing to adopt: a dev-only CSS reload fix, a revert of a chunk optimisation,
a CSP-nonce fix for partial prerendering (this site uses neither nonces nor
PPR), an analyzer fix and an internal JWT library swap. Per-page JS came out
about 0.1 KB smaller after gzip. The polyfill alias still matches (same import path), and
the scores, insights, 41 behaviour checks and 44 URLs are unchanged.

Next.js announced a security release for seven medium-severity issues on
3 November 2026, after 16.4.4. Upgrade again once it is on npm.

The founder's dev console showed two things, both also on the live site:

- `rotateX not eligible for reset` on every pointer move over the bento
  tiles. `gsap.quickTo` can't retarget GSAP's `rotateX`/`rotateY` aliases, so
  the hover tilt never moved. BentoMotion.tsx now uses `rotationX`/`rotationY`
  and adds `transformPerspective` on a tile's first hover. The tiles tilt up to
  4 degrees and settle back flat (`tools/tiltprobe.py`).
- A 404 for `/cdn-cgi/trace`: only Cloudflare answers it, so it fails on any
  local server. That console error cost local Best Practices runs 4 points.
  The cookie banner now asks the trace only on arrowbin.com and uses the time
  zone elsewhere (consent.ts). `tools/consentprobe.py` checks both host names:
  locally there is no request and the time zone decides; on arrowbin.com the
  edge country decides. Local Best Practices is 100 again.

## Tools

All Python, run with `python -I`; on Git Bash set `MSYS_NO_PATHCONV=1`.

- `tools/issues.py report.json...`: every performance insight and diagnostic
  a Lighthouse report would show as a problem, with its top items.
- `tools/survey.py BASE path...`: idle main-thread cost per page (style
  recalcs, layouts, task time over 3 s after load) and running animations
  Chrome can't composite.
- `tools/pausetest.py BASE path phone|desktop 'selector'...`: the same idle
  cost with chosen animations paused, to find which one costs frames.
- `tools/compfail.py BASE path phone|desktop`: Chrome's own reason, from a
  trace, for each animation it did not run on the compositor.
- `tools/jumpprobe.py BASE...` and `tools/hashprobe.py ID BASE...`: content
  stays in place when the home motion sets up after a jump or a #link.
- `tools/tiltprobe.py BASE`: hovers a bento tile and prints its transform
  and any console warnings.
- `tools/consentprobe.py PORT`: the cookie banner's region check on
  localhost and on the live host name (served locally).
- Scores: `docs/seo/20-perf-2026-11-01/tools/lhfull.py --psi`. Behaviour:
  `docs/seo/22-unused-js-css-2026-11-02/tools/motiontest.py`. Screenshots:
  the same folder's `shots.py` and `imgdiff.py`.
