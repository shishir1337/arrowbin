# Visual / mobile re-audit, arrowbin.com (15 Oct 2026)

**Score: 80 / 100** (14 Oct visual and images score: 84). Down 4 because the sprint's new charts are unreadable on a phone and the new lead blog card crops its cover. Nothing regressed on the pages the sprint was not meant to touch.

Measured on: local production build http://localhost:3117 (NOT the live site, which is still build 959866d). Python Playwright, Chromium. Desktop 1440x900 at DPR 1; mobile 390x844 at DPR 3 with touch (same settings as the 14 Oct run, so the screenshots are comparable pixel for pixel). Pages: /, /services, /services/saas-product-engineering, /work, /about, /contact, /blog and the 4 new posts (vibe-coded-app-production-ready, payment-gateway-integration-bangladesh, ai-agent-cost-small-business, courier-api-integration-bangladesh). Metrics were taken after networkidle plus 1.5s, then again after a full scroll pass so lazy images and reveal animations had settled.

Screenshots (24 files) are in `docs/seo/14-audit-2026-10-15/screenshots/`:
- `local-<page>-desktop.png` and `local-<page>-mobile.png` for all 11 pages (page names: home, services, saas, work, about, contact, blog, post-vibe, post-pay, post-ai, post-courier).
- `local-blog-mobile-full.png` (390 wide, DPR 2, 14,200 CSS px tall) and `local-post-vibe-mobile-full.png` (390 wide, 29,575 CSS px tall).
- Diff overlays against 14 Oct and element crops (charts, tables as cards, CTA cards) are in the scratchpad, not the repo: `C:\Users\amaiz\AppData\Local\Temp\claude\C--Users-amaiz-Documents-Arrowbin-arrowbin-new-one\9b5a6321-9ef7-44b0-995d-276353ecafa4\scratchpad\` (`diff-*.png`, `m-figs.png`, `m-cta.png`, `m-cards.png`, `metrics.json`, `posts.json`).

## What works

- No horizontal scroll on any of the 22 page and viewport combinations (document scrollWidth never exceeds the viewport). No offscreen content except decorative items (desktop cursor ring and dot, the contact form honeypot field).
- Exactly one H1 per page. H1 positions are identical to 14 Oct on every shared page (see the table below).
- Shared pages did not change visually (details below). Contact (desktop and mobile) and /work mobile are pixel identical to 14 Oct.
- New posts: cover renders on all 4, tables become cards on phones (13 of 13 tables hidden on phone, 13 of 13 card lists shown, no overflow, cards sit at x 16 to 374 inside the 390 viewport), CTA card is styled the same in all 4, no green anywhere in the DOM, SVGs or new covers.
- Page background is frost `rgb(241, 242, 247)` on every page. Large coloured bands are all ultra `#3b2bff`, not dark.
- No broken resources. Console clean apart from a WebGL performance warning on home (GPU stall due to ReadPixels, Info) and Google Analytics collect requests failing in the headless run (expected in this environment, Info).

## Comparison with the 14 Oct local screenshots

Method: pixel diff (threshold 24 of 255) of the 14 Oct `local-*` screenshots against today's, same viewport and DPR.

| Page | Desktop diff | Mobile diff | Verdict |
|---|---|---|---|
| / | 11.6%, only x 594 to 1430 (the animated blob, text column x<594 identical) | 10.1%, only the blob area (y 303 to 2011 at DPR 3) | Animation frame difference. No copy or layout change visible in the hero text. |
| /services | 0.48%, only the right-hand icon art | 0.85%, one band y 1047 to 1245 (the icon strip) | Animated art. Hero text identical. |
| /work | 11.1%, only the stacked card deck (x 829 to 1417) | 0.00% | Animated deck. Text column identical. |
| /contact | 0.00% | 0.00% | Pixel identical. |
| /blog | 17.2% | 18.0% | Expected: the index now has 13 posts, a new lead card, 5 category chips. See below. |

Mobile home was eyeballed (H1 still at y 696 of 844) and the new blog pages were eyeballed. The home, work and services animated regions were compared by diff bounding box, not frame by frame. No unintended visual change found on any shared page. The sprint's "copy only" promise holds for the pages I could compare.

/about and /services/saas-product-engineering have no 14 Oct screenshot (baseline used /services/mobile-app-development), so they are checked on their own, not compared.

### /blog changes (all intended)

- 13 posts render. Category chips are now Engineering 1, Guides 4, E-commerce 4, AI 1, Product 3 (total 13) and wrap to two rows on desktop. Fine.
- Lead card is now the vibe-coded checklist post with an SVG-derived mockup cover. Cards cycle ultra, plasma, sun and lilac. No green.
- "Quick answers" now lists 12 rows (cap of 12), a long block but no layout issue.
- Mobile page is 14,200 px tall (13 stacked cards). No overflow.
- NEW issue found here: the lead card crops its cover (finding V2).

## Above the fold (390x844 and 1440x900)

| Page | Desktop H1 top / CTA visible | Mobile H1 top / CTA visible | vs 14 Oct |
|---|---|---|---|
| / | 417 / Start a project, Book a call | 696 (late) / Start a project | same |
| /services | 191 / Book a free call | 175 / Book a free call | same |
| /services/saas-product-engineering | 234 / 3 CTAs | 246 / Book a free call | new page |
| /work | 191 / Book a free call | 175 / Book a free call | same |
| /about | 191 / header Book a call only | 175 / none in view | new page |
| /contact | 191 / header Book a call (call card per 14 Oct, regex did not match tel links) | 175 / none matched (pixels identical to 14 Oct, which noted a call card) | same |
| /blog | 191 / header Book a call only | 175 / none | same |
| 4 new posts | 243 / header Book a call only | 227 / none | new pages |

The H1 is visible without scrolling on every page. Post pages show category pill, reading time, H1, description, author and date, then the cover begins at about y 717 to 755 on a phone (the top of the cover is just above the fold, as designed).

## Findings

### V1. Charts are unreadable on a phone (High, dev, needs visual sign-off)
- Evidence: all 22 SVG charts in the 4 new posts are 1280x720 with a minimum font of 18 to 20 user units. On a 390 phone the figure is 358 px wide, a scale of 0.28, so the smallest labels render at 5.0 to 5.6 px and most body labels at 5 to 6 px. Largest text (titles) is about 11 px (a headline number in lovable-rls-scan reaches 17.9 px). On desktop the 768 px column gives about 10.8 px minimum, which is acceptable. The sprint check "text 18px or larger" was applied to the SVG's own coordinate space, not the rendered size. Viewport allows pinch zoom (`width=device-width, initial-scale=1`, no maximum-scale), and every figure has a 160 to 350 character alt and a caption with the takeaway, so the information is not lost, but a sighted reader sees tiny labels. The 19 replaced charts in the 3 core guides use the same 1280x720 format, so they will have the same problem (not measured individually, not checked).
- Fix (pick one or combine):
  1. Add a tap-to-enlarge control (open the SVG in a full-width scrollable overlay) on phones.
  2. Make phone variants of the densest charts (portrait or 4:5 viewBox, text 28 units or more), served with `<picture>` or a CSS swap.
  3. At minimum, say "Tap and pinch to zoom" in the caption on phones.
- Needs visual sign-off: yes (new chart variants or lightbox are visual changes).

### V2. Lead card on /blog crops the new cover (Medium, dev, needs visual sign-off)
- Evidence: desktop lead card image box is 553x509 px (near square) while the vibe cover is 16:9, with `object-fit: cover`, so about 39% of the width is cut. In `local-blog-desktop.png` the mockup is cut at both sides ("es.sql" at the left edge, "Launch check" at the right edge). On mobile the box is 358x256 for a 16:9 source, about 21% cropped. The other 12 cards show 0% crop. The founder rule is no cropped or offscreen content. The old lead was a photo, which tolerates cropping; a UI mockup does not.
- Fix: for mockup (SVG-derived) covers in the lead card, use `object-contain` on a frost or lilac field, or change the lead art box to 16:9 on desktop, or lead with a post whose cover is a photo.
- Needs visual sign-off: yes.

### V3. Post hero banner crops the cover slightly (Low, dev, needs visual sign-off)
- Evidence: the article banner box is 1328x569 on desktop and 358x224 on a phone while the cover is 16:9, so about 24% (desktop, top and bottom) and 10% (phone) is cropped by `object-fit: cover`. On a phone the top of the mockup (browser dots and tabs) is visible; I did not confirm whether any text at the bottom edge is cut, and the desktop post screenshots were not eyeballed (not checked).
- Fix: render the banner at the cover's own aspect ratio (16:9) or confirm the covers are composed with a safe margin.

### V4. Wide tables still scroll sideways at 1440 on two posts (Low to Medium, dev, needs visual sign-off)
- Evidence: from 640 px up, tables render as a table in an `overflow-x-auto` region. At 1440 the AI post table is 853 px wide in a 761 px region and the courier post table is 993 px in 761 px, so the last column starts offscreen until scrolled. The region has `tabindex=0`, so it is keyboard reachable, but this breaks the "no cropped content" rule on tablet and laptop widths. Tablet (768) was not tested (not checked).
- Fix: remove `whitespace-nowrap` from header cells so they wrap, or keep the card layout up to `lg`.

### V5. CTA card is consistent (Info, no action)
- Evidence: all 4 cards use lilac `rgb(207, 196, 255)`, 28 px radius, 24 px padding, "Next step" label, 20 px display title, ultra pill button 52 px high with a sun arrow disc, link to /contact. Heights 316 to 364 px, widths 358 px. Titles wrap to 2 or 3 lines, no clipping. White on ultra and ink on lilac contrast are fine. Each post has exactly one in-article CTA, near the end. Button labels differ by post (Send us your repo for a review, Get a payment setup plan, Scope a pilot with us, Price a courier integration), which is intentional.

### V6. Legacy photos still have lime and chartreuse furniture (Founder-gated, not re-raised)
- Listed in the sprint log (5 photos: team-collaboration, choosing-a-partner, portfolio-review, team-partnership, team-shipping, plus the 19 unused green WebPs). Still visible in the /blog cards for the 3 core guides (yellow-green chairs in the cost and choose photos). Pixel scan: 0.0% green on all 10 new covers; 1 to 4% green in those photos. The founder's "no green" rule is met by every new asset and by all CSS, but not by these photos until they are replaced. Also not checked: whether the `cover.webp` files of the 3 core guides (8 to 13% green pixels, probably the old infographics) are used as social images.

### V7. Items still open from the 14 Oct audit (unchanged, sprint did not touch them)
- Home mobile H1 starts at y 696 of 844, below the tagline, CTAs and blob (design change, founder-gated).
- Tap targets under 44 px: non-inline interactive elements under 44 px per page are 10 to 17 on desktop and 5 to 12 on mobile (new posts: 9 to 12 on mobile, 13 to 14 on desktop). These are counts only; I did not itemise them this pass (not checked). Known from 14 Oct: logo 28 px high, footer email and phone links, "All services" style links, desktop nav pills 40 px. In-article CTA buttons are 52 px, so the new element passes.
- Fonts under 12 px: 11 px labels on / (6), /contact (4 to 6), /work (19 at 11 px, 8 at 10 px), /about (7 at 11 px, 10 at 10 px), /services/saas-product-engineering (21 to 24 at 11 px, 3 to 4 at 10 px). No new post or /blog page has any. Same pattern as 14 Oct.
- /work desktop: right-most deck card clipped by the viewport edge (design, unchanged).
- /services mobile: the icon strip is an intentional horizontal scroller (scrollWidth 2023 in a 423 px container), with the first and last icons cut at the screen edge. Unchanged from 14 Oct, but it does conflict with the "no cropped content" rule.
- /about on desktop and mobile has no primary CTA above the fold (desktop has the header "Book a call", mobile only the Menu button). New page vs 14 Oct, Low. Same for /blog and the posts (the 14 Oct finding 8 stands; the new in-article CTA card does not help above the fold).
- Missing width and height attributes on `fill` images, CLS (not measured this pass, not checked).

### V8. Image "broken" flags are a measurement race (Info)
- After the scroll pass, 2 related-post photos (choosing-a-partner.webp, team-shipping.webp) reported `complete` with `naturalWidth` 0 on /blog and the vibe post at 390. A direct request of the same `/_next/image` URLs at w=640, 750 and 1080 returns 200 with image data, and the blog full-page screenshot shows both photos rendered. Treated as a lazy-decode timing artefact, not a bug.

## Brand rules check

| Rule | Result |
|---|---|
| No green | PASS in code and new assets: computed-style scan (text, background, border, fill, stroke, gradients) found 0 green on all 22 page and viewport combinations; 0 green hex in 22 new SVGs; 0.0% green pixels in all 10 new covers. FAIL only on legacy photos (V6, founder-gated). |
| No dark base | PASS. Body and html are frost on every page. Large dark-ish blocks are all ultra `#3b2bff` bands. The only near-black panel is the code `pre` inside a home bento tile (ink `rgb(14, 11, 36)`, existing). Table header rows on desktop post tables are `bg-ink` (existing component, Info). |
| No cream or beige | PASS by eye on all screenshots viewed; not scanned programmatically. |
| No sticker badges by hero headlines | PASS with a note for the founder. No rotated stickers or number badges. Small label chips exist beside or above some headlines: post hero category pill and reading time above the H1, the "Now booking new projects" mono label on home, "Service 04 / 08" on the service page, the 5 category chips and yellow RSS pill under the /blog intro. All existed on 14 Oct (the posts were not compared) and are filters or labels, not stickers; confirm the post category pill is acceptable. |
| No cropped or offscreen content | PARTIAL. See V2, V3, V4 and the open items in V7 (services icon strip, work deck). |
| "Arrowbin" wordmark | PASS in the header and footer on every screenshot viewed. Rendered body copy was not scanned for a lowercase "arrowbin" (not checked). |
| Static header | Not checked (no scroll-behaviour test run). Headers sit at the top of every screenshot. |
| No em dashes in rendered copy | Not checked in the DOM. None in this file. |

## New posts checklist (390 wide)

| Check | Result |
|---|---|
| Cover renders | Yes on all 4 (lilac to plasma gradient mockups, no green). 10% crop, see V3. |
| Charts readable on phone | No. See V1 (5 to 6 px labels). |
| Tables become cards | Yes, 13 of 13. Cards are clean, label column 7.5rem, 14 px text; the vibe checklist cards are the longest (4 fields per card). |
| Horizontal scroll | None (page level and inside content on phone). |
| Tap targets 44 px | CTA buttons 52 px and author avatar 44 px pass. About 9 to 12 other non-inline targets per post are under 44 px (shared header, footer, share links; not itemised). Inline links inside paragraphs excluded, as WCAG allows. |
| Nothing cropped or offscreen | Passes on the post body. Cover crop in V3. |
| No green | Pass. |
| CTA card consistent | Pass (V5). |

## Summary

The sprint's visual changes landed cleanly: the four new posts render covers, brand-colour charts, card-style tables and one consistent lilac CTA card, with no horizontal scroll and no green in code or new assets, and the shared pages (/, /services, /work, /contact) show no unintended visual change against the 14 Oct screenshots (contact and /work mobile are pixel identical; the other diffs are animated art regions only; /blog changed as intended). The score is 80 (14 Oct: 84) because of three new issues: the new 1280x720 charts shrink to 5 to 6 px labels on a phone (High), the new lead card on /blog crops its UI mockup cover by 39% on desktop (Medium), and two post tables still scroll sideways at 1440 (Low to Medium). Everything else open is carried over from 14 Oct (home mobile H1 depth, sub-44 px tap targets, sub-12 px labels, no CTA above the fold on /about and /blog) or founder-gated (lime-accented legacy photos). Not checked: header scroll behaviour, CLS, tablet width, itemised tap target list, desktop post screenshots by eye, rendered-copy scan for lowercase wordmark and em dashes, and chart sizes in the 3 core guides.
