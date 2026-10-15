# Visual / Mobile / Above-the-fold audit, arrowbin.com (2026-10-01)

Method: Playwright Chromium, desktop 1440x900, mobile 390x844 (touch, DPR 2), networkidle plus 1.5s. Screenshots: `screenshots/{home,services,services-custom-software-development,work,contact,blog}-{desktop,mobile}.png`.

## Images score: 78 / 100

| Area | Result |
|---|---|
| Alt coverage (missing attribute) | 0 missing on all 6 pages |
| Alt quality | Descriptive and unique on portfolio images ("X website, built by Arrowbin"); Hostinger badge has alt |
| Empty alt on content images | /work 5 of 14, /blog 3 of 4 |
| Dimensions declared | 13 of 14 (/work), 6 of 7 (/), 3 of 4 (/blog, service page) lack width/height attributes |
| Format / sizing | Blog uses webp; portfolio jpg via next/image; home requests `w=3840` |
| CLS measured | 0.000 to 0.007 on all pages (good) |

## Above-the-fold summary

| Page | Desktop H1 + CTA | Mobile H1 + CTA | Horizontal overflow |
|---|---|---|---|
| / | Yes / Yes (Start a project, Book a call) | H1 top at y=696 of 844, CTAs at y~270-320, see P1 | None (390=390) |
| /services | Yes / Yes | Yes / Yes (Start your project 211x52) | None |
| /services/custom-software-development | Yes / Yes (Book a free call 196x52) | Yes / Yes | None |
| /work | Yes / Yes | Yes / Yes | None |
| /contact | Yes / email + call card | Yes / Yes | None |
| /blog | Yes / no CTA, only RSS and featured post | Same, no conversion CTA | None |

Viewport meta is correct (`width=device-width, initial-scale=1`). No cookie banner, modal, or interstitial visible. Static header is 77px tall on mobile (acceptable, under 10% of viewport). Content parity: same DOM is served to mobile and desktop, so mobile-first indexing has no hidden-content gap found.

## Findings

### P1 (high)
1. **Home mobile: the H1 sits below the hero blob and intro copy.** The H1 "SOFTWARE THAT MOVES" renders at y=696 to 785 of 844 on mobile, pushed down by the tagline, CTAs and a large gradient blob. It is technically above the fold but only just, and on shorter phones (e.g. 667px tall) it falls below. Fix: reduce blob height on mobile (cap at ~35vh) or place the H1 above the paragraph and CTAs.
2. **Home H1 text mismatch.** The DOM H1 reads "Arrowbin, a custom software development company: Software that moves." (visually-hidden prefix plus display text). Good for keywords, but confirm the hidden prefix is not `display:none` and that it is not flagged as cloaking-like; use `sr-only` clip technique, which it appears to use. Low risk, verify.
3. **Home hero images requested at w=3840.** Portfolio images on / use `_next/image?...&w=3840&q=75`, meaning no `sizes` attribute or an oversized one. Fix: add accurate `sizes` (e.g. `(min-width:768px) 50vw, 100vw`) so 640 to 828px variants are chosen; saves LCP and bandwidth on mobile.

### P2 (medium)
4. **Empty alt on content images.** /work has 5 of 14 images with `alt=""` (the first five project thumbnails, duplicated by a second set with proper alt); /blog has all 3 post thumbnails with `alt=""`. If decorative duplicates inside a link with visible text, that is acceptable; otherwise give blog thumbnails descriptive alt (e.g. "Team collaborating on a software project"). Also dedupe the duplicated /work image set to avoid double-loading (7 extra requests, 4 lazy above the fold on /work).
5. **Missing width/height on next/image.** 13 images on /work, 6 on /, 3 on /blog and service page lack intrinsic dimension attributes. CLS measured as ~0 today (likely `fill` with aspect-ratio wrappers), so confirm every wrapper has a fixed aspect ratio.
6. **`loading="lazy"` on 4 above-the-fold images on /work (desktop and mobile) and 1 on /blog desktop.** Fix: `priority`/`fetchPriority="high"` on the first visible image, remove lazy there.
7. **Tap targets under 44px (mobile).** Measured: footer service links 24px tall (Custom Software Development, E-commerce Development, Mobile App Development, SaaS, UI/UX, AI Automation, Cloud: all 24px), "ALL SERVICES" and "ALL 8 PROJECTS" 41px, breadcrumb HOME/SERVICES links 19px tall, footer email 23 to 32px, contact phone numbers 21px, "Copy" and "RSS feed" buttons 40px, logo 28px. Fix: add vertical padding (`py-2.5`/`min-h-11`) to footer and breadcrumb links; 44px min for RSS/Copy.
8. **Desktop nav links 40px tall** (under 44px; below WCAG 2.2 AAA, meets AA 24px). Low impact; bump to 44px.
9. **Mobile menu overlay exists in DOM as `fixed inset-0 z-40` (844px tall) on every page plus seven 358px links.** It is not visible in screenshots, but confirm it is `inert`/`aria-hidden` and `visibility:hidden` while closed so it does not trap focus or get read as hidden-link spam. Also confirm it uses real `<a href>` links (they do render as links, which is good for crawling).
10. **/blog has no conversion CTA above the fold.** Only RSS feed and the featured post. Add a "Start a project" link in the hero or header to keep parity with other pages (header has "Book a call" on desktop only; on mobile the header CTA is replaced by Menu).

### P3 (low)
11. **Font sizes.** Body is 16px; 12px mono labels are heavily used (111 to 116 elements on desktop; 106 to 110 on mobile) and 10 to 11px appears on /work and the service page (8 to 21 elements). Labels under 12px fall below recommended readability; raise to 12px minimum.
12. **Custom cursor elements** (`cursor-ring`, `cursor-dot`) on desktop are fixed divs; harmless, but ensure `pointer-events:none` and they are disabled on touch (they are absent on mobile: good).
13. **Contrast.** Muted intro text (#4a4a6a-ish grey on #f0f1f7) looked adequate (~7:1) in screenshots; yellow-on-blue and white-on-blue (#3a2cff) chips pass. The pale mono eyebrow text over the blurred blob on / (desktop) sits over colored gradient; spot-check "NOW BOOKING NEW PROJECTS" and footer strip with a contrast tool. No measured failure.
14. **Hero blob overlaps H1 on desktop** (intentional, dark text over blue/pink). The "W" and "VES" letters cross the bright blob; legible, but check contrast of black-on-saturated-blue region (~4:1 risk).
15. **Home "SCROLL · EXPLORE" badge is 80x80**, fine, but its text is decorative; ensure `aria-hidden`.

## Passed
- No horizontal overflow on any page at 390px.
- CLS <= 0.007 on all pages; no load-time layout jumps.
- No intrusive interstitials, popups or cookie walls.
- H1 present and singular on every tested page, matching page intent.
- Primary CTA visible above the fold on 5 of 6 pages on both viewports (blog excepted).
- All 200 status; correct viewport meta.
