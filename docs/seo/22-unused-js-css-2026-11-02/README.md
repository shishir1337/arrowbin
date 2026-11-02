# Unused JavaScript and CSS (2 November 2026)

The founder asked for less unused JavaScript and CSS on every page, with no
visible change and nothing slower or laggier.

## What PageSpeed showed before

Live PSI on 2 Nov 2026 (home and the PHP2Shell post, mobile and desktop):

| Item | Result | Cause |
|---|---|---|
| Reduce unused JavaScript | 26 to 28 KiB, one file | React DOM plus Next's router runtime (`react-dom-client.production.js`, 199 KiB raw) |
| Legacy JavaScript | 14 KiB | Next's built-in polyfills, in the same file |
| Reduce unused CSS | passes | |

Lighthouse only lists a script when its unused part is over 20 KiB after
compression. Every page loaded much more unused code than that one file, in
files below the threshold.

## What was found

Measured with Lighthouse's `script-treemap-data` on a build with browser source
maps (tools below), on 12 pages:

1. **GSAP and ScrollTrigger loaded on every page.** That is about 47 KiB
   compressed, about 70% of it unused on /privacy.
   - SmoothScroll loaded them at idle only to re-measure scroll triggers after
     the fonts loaded, even on pages with no triggers.
   - InnerMotion, SectionReveal, ServiceIndexMotion, FooterWordmark,
     Magnetic and the custom cursor each pulled them in as well.
2. **Draggable** (34 KiB raw, 80% unused at load) loaded at idle on the home
   page, for the testimonials deck seven sections down.
3. **web-vitals** (9 KiB raw) was in the layout chunk that every page loads first.
4. **26 dead source files**: `components/sections/*`, old motion helpers and old
   UI parts that nothing imported. They didn't ship, but they were kept out of
   Tailwind's scan by hand.
5. **Unused fields on portfolio projects.** `mark` and `gradient` went into
   the /work page's RSC payload and nothing read them.
6. **CSS.** One 150 KiB stylesheet (25 KiB compressed) for the whole site.
   - Each page uses 13 to 28% of it on first load.
   - 112 KiB of it is Tailwind utilities that are genuinely used somewhere.
   - Hand-written CSS is about 20 KiB, and every class, keyframe and variable
     in it is used.
   - Four utilities came only from words in comments and blog text
     (`container`, `inline`, `content-baseline`, `shadow/halo`).
   - Lighthouse passes "Reduce unused CSS" because Tailwind v4 wraps the
     utilities in `@layer` blocks, which its CSS coverage counts as used.

## What changed

GSAP now loads only where it is needed: the home page's sections, and the
magnetic buttons once a visitor with a mouse starts using the page. Everything
else moves the same way without it.

| Part | Before | Now |
|---|---|---|
| InnerMotion: heading word rise | gsap.from yPercent 110, 1 s expo.out, 0.06 s stagger, at "top 88%" | Words split as before. `.wr-word` / `.wr-in` CSS transition with the same numbers (globals.css) |
| InnerMotion: process rail | ScrollTrigger scrub 0.4, "top 70%" to "bottom 60%" | `scrubWithScroll` in lib/motion.ts with the same range and about 0.4 s of smoothing |
| SectionReveal, ServiceIndexMotion | gsap.from y 40 / 36, opacity 0 | `riseInWhenReached`: a paused Web Animation, played once at 90% / 92% of the screen. Same pose, duration, ease and stagger. It sits on top of the element's own styles like a GSAP tween does |
| FooterWordmark | two scrubbed, staggered GSAP tweens | the same timelines (widths 50 to 104 at 0.06 s steps, rise from 60% at 0.04 s steps, scrub 0.6) computed from scroll progress |
| Cursor | gsap.quickTo, 0.08 s and 0.45 s, power3.out | a frame loop that restarts the same power3.out tween on every pointer move. Fades are 0.2 s Web Animations |
| SmoothScroll (Lenis) | always loaded GSAP to drive Lenis | Lenis runs on its own frame loop and hands over to GSAP's ticker when GSAP arrives, so pinned home sections still scrub in lock-step |
| Font refresh | SmoothScroll loaded GSAP at idle to call ScrollTrigger.refresh() | Done inside loadGsap(), only when GSAP is on the page |
| Magnetic | GSAP at idle on every page, phones too | GSAP after the first interaction, mouse devices only |
| Testimonials Draggable | at idle | when the deck is within two screen heights (NEAR_MARGIN) |
| web-vitals | layout chunk | its own chunk, loaded at idle (AfterIdle). Buffered entries keep every metric. A failed chunk load renders nothing, never the error page |

Smaller changes:

- The 26 dead files were deleted, along with their `@source not` lines.
- `mark` and `gradient` were dropped from the portfolio data.
- The four junk utilities are excluded with `@source not inline(...)`.
- `firstInteraction.ts` is shared by AfterInteraction and Magnetic.

## Tried and dropped

- **Prefetching links only after the first interaction** (a `Link` wrapper).
  - It saved about 45 KiB per page: the home route's code fetched through the
    logo link, and on desktop the code of every page in the menu.
  - But Next's router chunk then sat idle during the Lighthouse load: its
    unused share went from 38% to 54%, past the 20 KiB line. PageSpeed would
    have flagged two files (53 KiB) instead of one (28 KiB).
  - Next's default prefetching is also the vendor-recommended behaviour, so it
    stays.
- **Removing Next's polyfills** (the "Legacy JavaScript" item).
  - The real file is 1.4 KiB; Lighthouse estimates 14 KiB.
  - Our browserslist doesn't need it, and Next only uses `URL.canParse` in dev
    tools.
  - But it is imported by a relative path inside Next, so dropping it means
    patching Next on every upgrade. Not worth it.
- **Unwrapping Tailwind's `@supports (color:color-mix(...))` fallbacks.** It
  would save 12 KiB raw but only 1.2 KiB compressed, through a custom build
  step.
- **Splitting the stylesheet per page.** Tailwind utilities must stay in one
  sheet in one order: a `flex lg:hidden` element breaks if the two classes end
  up in different files loaded in the wrong order.

## What stays on every page

PageSpeed will still show about 27 KiB under "Reduce unused JavaScript" for one
file. That file is React DOM (199 KiB raw) plus Next's router. About 40% of it
is code for features a page doesn't use on load: updates, transitions,
Suspense and form actions.

- No app code can remove it. Even served with maximum brotli it would show
  about 24 KiB, still over the 20 KiB line.
- nextjs.org itself showed 170 KiB of unused JavaScript (this same chunk
  included), 13 KiB of unused CSS and a mobile score of 90 on 2 Nov 2026.

## Results

Local production builds, before (`4d5d7c5`) and after, side by side, with
Lighthouse 13.6 on 12 pages (`tools/unused.py`, `tools/cmp.py`).

**JavaScript downloaded per page** (KiB, compressed):

| Page | Mobile | Desktop |
|---|---|---|
| /privacy | 243 → 194 | 292 → 244 |
| /about | 271 → 222 | 295 → 247 |
| /contact | 252 → 203 | 295 → 247 |
| /work, /work/maneel-club | 255 → 206 | 288 → 240, 296 → 248 |
| /blog and posts | 257 → 208 | 300 → 252 |
| /services/custom-software-development | 271 → 222 | 309 → 261 |
| /services/ai-automation | 281 → 232 | 319 → 272 |
| /services (index) | 257 → 207 | 288 → 239 |
| / (home, keeps GSAP) | 254 → 237 | 303 → 287 |
| **Average of 12 pages** | **259 → 213** | **299 → 254** |

**Unused JavaScript at load** (raw KiB, from script coverage, averaged over 12
pages): mobile 321 → 256, desktop 400 → 341. Each inner page also loads two
fewer script files.

**PageSpeed-like scores** (`docs/seo/20-perf-2026-11-01/tools/lhfull.py --psi`,
two runs each):

| Page | Mobile before → after | Desktop before → after |
|---|---|---|
| / | 98 → 99 (TBT 134 → 108 ms) | 100 → 100 |
| /about | 100 → 100 (TBT 69 → 40 ms) | 100 → 100 |
| /services | 100 → 100 | 100 → 100 |
| /services/custom-software-development | 100 → 100 | 100 → 100 |
| /blog | 100 → 100 | 100 → 100 |
| /privacy | 100 → 100 | 100 → 100 |

- Accessibility and SEO were 100 everywhere. Best Practices shows 96 locally
  only because `/cdn-cgi/trace` exists only behind Cloudflare.
- "Reduce unused JavaScript" still lists the one React DOM file (about
  27 KiB); see above. "Reduce unused CSS" passes, as before.

**Unchanged look and behaviour:**

- `tools/shots.py` and `tools/imgdiff.py` on 22 pages, mobile and desktop. Every
  page has the same height. The changed pixels (0 to 0.2%, /work about 1%) are
  animation timing only: a deck that rotates on a timer, marquees, the CTA
  ring pulse and demo loops.
- `tools/motiontest.py`: 41 checks pass.
- The testimonials drag and buttons work the same before and after, on desktop
  and phone.

## Tools

All Python run with `python -I`. On Git Bash, set `MSYS_NO_PATHCONV=1` so `/`
paths aren't rewritten.

- `tools/unused.py --base URL --out DIR [--form desktop] path...`: Lighthouse's
  unused-JS and unused-CSS results per page, plus every script's raw and unused
  bytes. Build once with `productionBrowserSourceMaps: true`, then run
  `tools/modules.py report.json...` to rank modules by unused bytes.
- `tools/cmp.py`: the before and after table from two `unused.py` runs.
- `tools/cssuse.py --base URL [--desktop] path...`: how much of each
  stylesheet a page really uses (CDP rule usage, leaf rules only).
- `tools/junkutil.py REPO CSS`: Tailwind utilities that no component uses.
- `tools/deadfiles.py REPO`: source files no route reaches.
- `tools/shots.py` and `tools/imgdiff.py`: full-page screenshots (scrolled
  through, animations frozen) and a pixel diff with side-by-side crops.
- `tools/motiontest.py BASE`: behaviour checks for everything above.
  - No GSAP on inner pages, reveals finish, rails move, the wordmark stretches.
  - The cursor follows, magnetic buttons pull, Lenis scrolls.
  - Draggable loads near the deck, no page errors.
- A side-by-side baseline: `git worktree add --detach <dir> HEAD`, then
  `pnpm install` and `pnpm build`, and `next start -p 3200` there.
