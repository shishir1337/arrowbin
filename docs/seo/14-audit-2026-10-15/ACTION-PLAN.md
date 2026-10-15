# Action plan after the 15 October re-audit

This file updates `../12-audit-2026-10-14/FIX-PLAN.md`.
- **Done locally:** Phase 2 Release A items, unless marked otherwise below. "Done" still means deployed and verified with `verify-live.sh`.
- **Owners:** "dev" means me or another engineer; "founder" means Shishir.

## Critical: this week

| # | Action | Owner | Why |
|---|---|---|---|
| 1 | Review on `pnpm dev` (MORNING-BRIEF section 4). Deploy. Purge the Cloudflare HTML cache. Run `verify-live.sh` on production | founder, dev | Live is still 63; the local build is 84 |
| 2 | `node scripts/indexnow.mjs` after deploy. In GSC: resubmit the sitemap, request indexing for `/`, `/blog` and the new posts, and file Removals for the two spam URLs | founder | New URLs get crawled in days, not weeks |
| 3 | Cloudflare: allow the AI crawlers (or set `ai-train=no` in the robots comment). Add a one-hop www redirect | founder | Training bots still get 403 |
| 4 | Fix the GitHub org: email, description, location | founder | It is in `sameAs` on every page |
| 5 | Decide F1 to F5 (prices and timelines) and F4 (discovery). Dev then propagates them to `services.ts`, the posts and the llms files | founder, dev | Conflicting numbers are now quoted to AI engines |

## High: next 2 weeks

| # | Action | Owner |
|---|---|---|
| 6 | **Publishing cadence.** Either publish all posts now, or release them in waves (about 4 a week). For waves, dev sets real publish dates and filters unpublished posts out of the blog, sitemap, RSS and llms files. A rebuild on each release day is required; ISR can automate this | founder decides, dev implements |
| 7 | Off-page kit days 1 to 14: Clutch claim, LinkedIn page, footer-credit emails, review requests, directories, the LinkedIn post calendar | founder |
| 8 | Confirm the offers the posts mention (F8): AI-code review, AI-shopping check, migration estimate from a URL, fixed quotes | founder |
| 9 | Regenerate the 5 blog photos with lime-green furniture (Nano Banana, brand palette). Then delete the 19 unused green WebPs | founder, dev |
| 10 | Performance, invisible part: `next/dynamic` for below-fold motion components and `ServiceQuoteForm`; trim and split `globals.css`; test preloading the Anybody display font | dev |
| 11 | Performance, sign-off part: start the infinite decorative animations after first paint; static hero image instead of WebGL on phones (FIX-PLAN P2.8) | founder approves, dev |

## Medium: this month

| # | Action | Owner |
|---|---|---|
| 12 | Next posts (`findings/clusters.md`): `mvp-vs-prototype-vs-poc` and `ai-automation-for-small-business` are being written tonight. Then `app-development-cost-bangladesh` (needs BDT prices), and a sourced `software-developer-rates-by-country` data post (the best link magnet) | dev, founder for prices |
| 13 | New commercial pages that two posts need as landing pages: a WordPress to Next.js migration service page and a vibe-code production audit page (both need visual sign-off) | dev, founder |
| 14 | Bangladesh path: WhatsApp click-to-chat and a BDT budget chip on /contact (D7), then `/ecommerce-website-development-bangladesh` | founder, dev |
| 15 | An AI-agent monthly cost calculator (SXO: calculators win the "cost calculator" SERPs; it needs no founder prices) | dev, sign-off |
| 16 | A code-sample block type for the payment and courier posts (SXO: those SERPs are developer packages) | dev, sign-off |
| 17 | Founder bio box on posts, and a longer /about founder section (E-E-A-T) | founder text, dev |

## Monitoring

- `verify-live.sh` weekly; the exit code is the number of failures.
- **GSC:** indexed pages (target: all 31 pages), impressions for each new post's primary keyword, and Removals status.
- **GA4:**
  - Events: `generate_lead`, `book_call_click`, `contact_click` and web-vitals events.
  - Mark `generate_lead` as a key event.
  - Register the custom dimensions `method`, `link_location`, `metric_rating` and `metric_id`.
  - Add an "AI assistants" channel group.
- **Re-audit:** at day 30 with the same specialists.
