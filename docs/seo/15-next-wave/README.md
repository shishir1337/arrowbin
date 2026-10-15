# Next wave: briefs and draft copy (prepared 15 October 2026)

**What this folder is:** the next four pieces of content, prepared so work can start the moment the founder approves. Two are commercial service pages with draft copy for every field in `src/lib/services.ts`; two are full blog briefs in the sprint format. **Documents only:** no site code, posts or data files were changed, and nothing touches git.

**Where they come from:** the "next 10" list in `docs/seo/14-audit-2026-10-15/findings/clusters.md` section 4 and SXO finding N4 (`findings/sxo.md`). Items #1 (MVP vs prototype vs POC) and #3 (AI automation for small business) on that list were already written in the sprint, and the developer salary data post covers much of #5's job as a link-earning data asset. This folder covers #2, #4, #8 and #10. Not prepared here: #6 offshore Bangladesh page and #7 Bangladesh e-commerce hub (both founder-gated on facts and prices) and #9 `/pricing` plus calculator (gated on F1, F2, F3, F5).

**Rules followed:** `docs/seo/13-sprint-2026-10-15/SPRINT-RULES.md` and `WRITING-GUIDE.md`. No em dashes. No invented facts, prices, timelines or client results: every gap is marked `[FOUNDER: ...]`. Every external figure was opened on 15 Oct 2026 and is listed with its URL; anything not opened is marked "not opened, do not cite".

## The four items

| # | File | What it is | Target URL | Primary keyword | Why now |
|---|---|---|---|---|---|
| 1 | `wordpress-to-nextjs-migration-service.md` | Service page: keyword set, SERP snapshot, section map, full draft copy (intro, answer, outcomes, ideal-for, benefits, deliverables, process, form, engagement cards, 8 FAQs, closing line), links, schema notes | `/services/wordpress-to-nextjs-migration` (recommended over the keyword map's broader `/services/nextjs-development`) | wordpress to next.js migration services | The services query returns service pages and gigs, not guides (SXO N4), so the post can't take that click. It's the offer Arrowbin proves best: all 8 live portfolio sites are WordPress to Next.js rebuilds, and so is arrowbin.com |
| 2 | `app-development-cost-bangladesh.md` | Full blog brief (template B, BDT and USD) | `/blog/app-development-cost-bangladesh` | app development cost in bangladesh | The only unbuilt piece linking the cost cluster to the Bangladesh cluster. Every ranking page is a small vendor with unsourced numbers in one currency; no editorial page exists (clusters #2) |
| 3 | `vibe-code-production-audit-service.md` | Service page, same depth as #1, **marked "needs founder confirmation" throughout** | `/services/vibe-code-cleanup` (working name was `/services/vibe-code-audit`) | vibe code cleanup (plus "fix vibe coded app") | "vibe code cleanup" returned 9 service pages out of 9. The vibe-coded post already offers "a read-only review" in its CTA, and no page sits behind it. Strongest 2026 trend in the sprint research |
| 4 | `fixed-price-vs-time-and-materials.md` | Full blog brief (template C), with three ready F4 variants and the replacement text for the cost guide's duplicate section | `/blog/fixed-price-vs-time-and-materials` | fixed price vs time and materials | Writes the free-call vs paid-discovery answer once, in the right place, and lets the cost guide drop a section it duplicates (clusters C-7) |

## What each item needs from the founder

Decision codes are from `docs/seo/13-sprint-2026-10-15/MORNING-BRIEF.md` section 5 and `editor-report.md` section 2 (F1 to F10), and `docs/seo/12-audit-2026-10-14/FIX-PLAN.md` (D-codes).

| Item | Blocking | Nice to have | Not needed |
|---|---|---|---|
| 1. WordPress migration page | **F8** (does "send us a URL, get an estimate" exist?), **F4** (wording on the Project card and FAQ 1), a **typical timeline range** in weeks (or approval to publish none, as the post does) | **D4** starting price; confirm the tech list; confirm "every account stays in your name"; whether the portfolio stores were WooCommerce | F1, F2, F3, F5 (no prices quoted) |
| 2. App cost Bangladesh | **F10** must be settled before the post mentions any US vs Bangladesh multiple (the brief avoids one, so the writer can start) | **D4** Arrowbin's own BDT and USD starting prices for a "What Arrowbin charges" box; **D7** WhatsApp number for a `wa.me` link | F4 beyond the CTA wording |
| 3. Vibe cleanup page | **F8** (does the offer exist, is the review free) plus the page's own Q1 to Q7: price or free, turnaround, deliverable, access needed, which AI tools you've actually worked with, any real takeover to describe, keep the client's stack or not | D5-style proof (an anonymised AI-built app case) | D4, F1 to F3 |
| 4. Fixed price vs T&M | **F4** (free call, paid discovery, or both). It decides section 8, the CTA, the closing, and the matching edits on 5 other pages | How Arrowbin bills post-launch work (retainer, capped hourly), so section 6 can describe it | F1, F2 (the post reuses the $60,000 example as an illustration only) |

**One question unblocks the most:** F4. It is needed by items 1 and 4, and it also fixes the free-vs-paid conflict on the cost guide, MVP cost, SaaS cost, MVP timeline and custom software pages (editor-report F4). F8 is second: it unblocks item 3 and confirms the wording on item 1.

## Order to build

1. **WordPress to Next.js migration service page (item 1). Start now.** Copy is drafted; only three answers are needed (F8, F4, a timeline or "none"). The developer can build the route and data while the founder answers. Highest commercial value of the four and the best-proven offer.
2. **App development cost in Bangladesh (item 2). Start now, in parallel.** A writer job, not a dev job. Nothing blocks the market-data version; D4 can be added later as one labelled box. Publish without Arrowbin prices rather than wait.
3. **Vibe code cleanup page (item 3)**, as soon as F8 and Q1 to Q7 are answered. If the answer to F8 is "no", don't build it: soften the vibe-coded post's CTA and closing instead (they currently offer a review).
4. **Fixed price vs time and materials (item 4)**, as soon as F4 is decided. Trim the cost guide in the same pass, using the replacement text in the brief.

Items 3 and 4 swap if F4 arrives well before F8. If both arrive together, do the vibe page first: it targets a buyer query, and a live post already makes the offer.

**Publishing slot:** the sprint's proposed waves end on Tue 3 Nov (salary data post). Items 2 and 4 fit the same Tuesday rhythm after that. Service pages don't need a wave; ship them when built and signed off.

## Effort (estimates, not measured)

| Item | Founder | Writer / editor | Developer | Visual sign-off |
|---|---|---|---|---|
| 1 | 15 min to answer and read the copy | 30 min to drop in answers and re-point 3 to 4 links in existing posts | About half a day to add the data and route, more if the lead keeps it out of the main `services` array (see below) | Yes (new page; possibly nav/home if added to `services`) |
| 2 | 5 min (F10), 15 min more if supplying D4 | About 1 day: 2,400 to 3,000 words, 4 to 5 SVG charts, a mockup cover, linter and editor pass | 15 min to register the post | Only the new post |
| 3 | 20 to 30 min for F8 and Q1 to Q7 | 30 min to resolve placeholders | About half a day, reusing item 1's approach | Yes |
| 4 | 5 min to decide F4 (then the same answer goes to 5 other pages) | Half to one day: 1,800 to 2,400 words, 4 to 5 SVGs, cover; 20 min to trim the cost guide | 15 min to register the post | Only the new post (plus the cost guide's shorter section) |

## Build note for the lead: where do the two service pages live?

Adding a slug to the `services` array in `src/lib/services.ts` also changes the homepage services list ("/08" becomes "/09"), the About disciplines grid, the Contact brief's need chips, the navbar, the footer, `llms.txt` ("Services (8)") and the hero counter ("Service 01 / 08"). That's a visible change across the site (standing rule 2). Two options:

- **(a) Separate list.** A second array (for example `specialistServices`) using the same `Service` and `ServiceExtras` types, rendered by the same `[slug]` route's default branch, added to `generateStaticParams`, the sitemap, `llms.txt` and the OG image route, and linked from the parent service pages and the posts. Nav and homepage unchanged. My recommendation.
- **(b) Full services.** Add both to `services`. Simpler code, bigger visual change, and the navbar dropdown grows to 10.

Either way: both pages fall through to the default section order (Hero, Value, Signature fallback, Deliver, Process, Work, Engagement, Guides, FAQ, Related, CTA). Pass a `title` to `ServiceWork` so no heading promises proof the cards don't show.

## SERP checks run for this folder (WebSearch, 15 Oct 2026, US, unranked)

| Query | What came back | Use |
|---|---|---|
| wordpress to next.js migration services | 4 service pages, 4 gig listings, 1 productised service | Item 1 snapshot. **Pairwise against the post's SERP: 2 shared URLs** (Kavanagh service page, one Fiverr gig), which is the "interlink" band: two pages, linked both ways |
| wordpress to next.js migration cost | dev.to post, a Vercel community thread, 8 Kolonell city pages | Leave "cost" with the post until D4 gives a real band |
| fix vibe coded app service | 5 Fiverr gigs, 1 Upwork gig, PC Apps, Wavect | Item 3 |
| vibe code cleanup | 9 agency service pages | Item 3 primary keyword |
| vibe code cleanup audit lovable app production hardening | Wavect, DBB, MetaCTO, Valletta, MEV, Innowise, SolGuruz | Item 3. **Pairwise against the vibe post's SERP: 0 shared URLs** for all three vibe queries |
| app development cost in bangladesh 2026 | bdstall, 5 Superb Companies directory pages, EngineerBabu, Digitalya | Item 2, with the 29 Sep list in `03-serp` D13 |
| fixed price vs time and materials software development (2 variants) | Vendor guides only (Cprime, Miquido, Monterail 2016, Codewave, Baytech "2025", Wavect, Moodup, Scopic, Edana, Pragmatic Coders, 13Labs, Spiria) | Item 4 |

Pages opened and used as sources: Bangladesh Bank FX rate sheet, Bdtask, Dcastalia, Clutch Bangladesh app developers, Paylab Bangladesh, Financial Express (BASIS), Apple Developer enrollment, two Google Play help pages, FAR 16.601 and 16.202-2, Wavect (rescue page and pricing-model guide), Sourcetoad Vibe Audits, 13Labs, John Kavanagh's service page, Webkul. Failed to open: bdstall (403), Rexoit (socket closed), McKinsey (timeout). Those are not cited.

## When each item ships

- Give it 3 or more inbound body links from existing posts in the same pass (content plan rule). Each file lists the passages and new anchors.
- Move keywords so pages don't compete:
  - Item 1: keep "services / agency / company" on the page and "steps / SEO / redirects / cost" on the post.
  - Item 3: remove "fix vibe coded app" and "vibe code cleanup" from the vibe-coded post's `keywords`.
  - Item 2: do not add any "ecommerce website cost in bangladesh" terms (they belong to the planned Bangladesh e-commerce page, clusters C-5).
  - Item 4: trim the cost guide's fixed price vs T&M section to the summary in the brief.
- Run `grep -rnP '\x{2014}'` on every new file, and `python -I docs/seo/13-sprint-2026-10-15/tools/ai_tells.py` on every new post, as the sprint did.
