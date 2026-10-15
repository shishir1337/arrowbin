# Performance sprint results, 15 Oct 2026

Local production build, Next.js 16.4.1, Lighthouse 12, medians of 3 to 5 runs.

| Page | Mobile before | Mobile after | Desktop after |
|---|---|---|---|
| / | 80 | 93 | 99 |
| /services | 88 | 92 | 100 |
| /services/custom-software-development | 77 | 93 | 99 |
| /services/mobile-app-development | 78 | 95 | 99 |
| /work | 86 | 88 | 99 |
| /about | 90 | 91 | 100 |
| /contact | 91 | 93 | 100 |
| /blog | 89 | 90 | 99 |
| blog post | 88 | 93 | 99 |
| /privacy | 90 | 96 | 100 |

CLS is 0 on every page, mobile and desktop. Visual diff (11 pages, 1440 and 390 wide, 5 scroll positions,
before vs after vs a second after run): no layout or content change; the only differences are running
animations and phones now getting 640px instead of 750px image files (same look). Dev mode: no errors,
motion, reveals, Lenis, WebGL and form islands all work.

## What changed
- PC: first-paint stall fixed (phones skip layout of far-below sections for the first frame only,
  `layout/FirstFrame.tsx`); WebGL shader compiles without blocking; idle-time setup for ArrowField,
  InnerMotion and GSAP sections.
- PA: Anybody preloaded, width-matched Geist Mono fallbacks (no swap shift), about 10% less CSS.
- PB: each service page loads only its own demos (`signature/demos.tsx`); /contact and /about islands
  load at hydration (`home/islands.tsx`).
- Lead: ServicesMotion no longer imports the services module; accurate image `sizes` on phones;
  /work deck and /about portrait preload on wide screens only (`lib/preloadWideImage.ts`); /blog
  featured cover no longer preloaded.

## Why /work is still 88 on mobile
Lighthouse simulates a 1.6 Mbps link and counts every byte that finishes before the headline paints.
On /work that includes the five hero screenshots that are visible at the bottom of the first screen
(about 100 KB). Getting it to 90 means loading those visible screenshots after first paint, so phones
would see the blurred placeholders a moment longer. That is a visible change, so it needs the
founder's OK. Locally `next start` serves HTTP/1.1; production behind Cloudflare uses HTTP/2, which
the simulation treats more kindly, so live scores may be a little higher.
