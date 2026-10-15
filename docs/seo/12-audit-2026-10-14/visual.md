# Visual / Mobile / Above-the-fold / Images audit, arrowbin.com (2026-10-14)

Method: Python Playwright chromium, live https://arrowbin.com vs local http://localhost:3117. Desktop 1440x900; mobile 390x844, DPR 3, touch. Pages: /, /services, /services/mobile-app-development, /work, /contact, /blog. Screenshots: `screenshots/{live,local}-{home,services,mobileapp,work,contact,blog}-{desktop,mobile}.png` (24 files). Metrics measured after networkidle + 1.5s, CLS via PerformanceObserver. Compared with ../11-audit-2026-10-01/visual.md (previous score 78).

## Images score: 84 / 100 (live 78, local 84)

| Area | Live | Local |
|---|---|---|
| Missing alt attribute | 0 | 0 |
| Empty alt on content images | /blog 3 of 3 content images; /work 5 (aria-hidden decorative deck, OK) | /blog 0 (descriptive alt added); /work 5 aria-hidden decorative, OK |
| Above-fold lazy | /work 4 (deck), /blog 1 | 0 (eager / auto) |
| currentSrc width vs rendered | OK: /work desktop 640w for 395-535 CSS px (nat 432-559); mobile 1080w for ~334 px at DPR3 (~1000 needed); blog 750/1200w fine | same |
| width/height attrs | only Hostinger badge; next/image `fill` everywhere else | same (OPEN, low) |
| CLS | 0 to 0.009 | 0 to 0.009 |

Not measured: below-fold lazy images on / (nat 0 at capture), so the previous `w=3840` claim could not be re-verified. Check with a scroll pass.

## Findings

1. FIXED-LOCAL (Medium): /blog thumbnails had `alt=""`; local has "A software development team...", "Two business people shaking hands...", "A product team celebrating...". Source: BlogIndex.tsx.
2. FIXED-LOCAL (Medium): above-fold images were `loading=lazy` (/work 4 deck images, /blog hero). Local: /work deck eager, /blog hero auto (priority). Re-verify after deploy.
3. OPEN (Low): no width/height attributes on next/image fill images (13 on /work, 6 on /). CLS stays <=0.009 because wrappers have fixed aspect ratios. Owner dev, effort S, fail signal: CLS >0.1 in Lighthouse.
4. FIXED-LOCAL (Medium): tap targets. Footer service/link rows 24px on live (about 8 links per page) are now no longer in the <44px list; breadcrumb Home/Services 19px now 43px (not 44, round up to `min-h-11`); Copy and RSS buttons 40px now >=44. Live <44px list was 22 to 31 elements per page, local 5 to 13.
5. OPEN (Medium), remaining sub-44px local: logo 167x28 (all pages), footer/contact email links 176x23, 268x32, 358x32, 296x32, 335x36, 286x32 (header strip/footer), "All services" and "All 8 projects"/"See all work" 41px, desktop nav pills 40px (WCAG 2.2 AA 24px passes), breadcrumb 43px, contact phone numbers 21px on live (not listed locally on desktop, cut off my list, recheck). Fix: `min-h-11 inline-flex items-center` in Footer.tsx, Header logo, CTA links.
6. OPEN (Low): fonts under 12px: 11px labels on / (6), /contact (4), /work (19 at 11px, 8 at 10px), service page (3 at 10px, 1 at 11px). Identical live and local. Raise to 12px in the WorkDeck/ServiceHero mono labels.
7. OPEN (Medium, mobile home): H1 "SOFTWARE THAT MOVES" top at y=696 of 844, after tagline, CTAs and blob (screenshot confirms: blob fills 330-1580px of 2000). Primary CTA "Start a project" is above the fold; H1 is only just visible and below fold on 667px phones. Design change, needs founder approval. Same on live and local.
8. OPEN (Low): blog has no CTA in hero or mobile header (no "Start a project" above the fold; desktop header "Book a call" exists). Same on live and local.
9. NEW (Info): /work desktop 1440 hero deck: right-most card is clipped by the viewport edge (see local-work-desktop.png, x ~1380 to 1440). Founder rule says no cropped or offscreen content, but it is identical on live (a stacked-card design) so not a regression; confirm if intended.
10. Info: empty-alt aria-hidden images on /work deck are decorative duplicates and acceptable.

## Above the fold (local = live)

| Page | Desktop H1 / CTA | Mobile H1 / CTA | Overflow |
|---|---|---|---|
| / | y417 / Start a project, Book a call | y696 (late) / Start a project | none |
| /services | y191 / yes | y175 / yes | none |
| /services/mobile-app-development | y234 / Book a free call | y218 / yes | none |
| /work | y191 / yes | y175 / yes | none |
| /contact | y191 / email + call card | y175 / call card | none |
| /blog | y191 / header CTA only | y175 / none | none |

Exactly one H1 per page. Home H1 DOM text now has word spaces ("Arrowbin, a custom software development company: software that moves.") on both. No horizontal overflow at 390px anywhere.

## Contrast spot checks (visual)
Muted grey intro text on #f0f1f7 reads clearly (about 7:1). Mono "NOW BOOKING NEW PROJECTS" sits on near-white blob edge, legible. Black H1 over saturated blue on desktop home is the only risk (about 4:1 by eye); no measured failure.

## Regression check, local vs live
No unintended visual change found: same H1 positions, same image sizes (+/-10px on the animated /work deck, an animation artifact), same CLS. Intended changes confirmed: footer link rows to 44px, Copy/RSS to 44px, breadcrumb height 19 to 43px, blog alt text, eager above-fold images. Screenshots were eyeballed for local home mobile and local work desktop only; remaining pairs were compared by metrics, not pixel diff.

## Status vs 1 Oct audit
Fixed locally: empty alt on blog, lazy above fold, footer/breadcrumb/Copy/RSS tap sizes. Still open: home mobile H1 depth, missing width/height, sub-12px labels, nav 40px, blog CTA, logo 28px.
