# Morning brief: overnight SEO sprint, 15 October 2026

**For:** Shishir. **From:** the lead agent. **Status:** everything is built and verified locally. **Nothing is committed, pushed or deployed.** You decide that (D1).

## 1. In one minute

- **SEO Health Score:** the full re-audit with the claude-seo skills puts the local production build at **84/100**. Live is still 63 (14 Oct: 63 live, 76 for the local build). Details: `docs/seo/14-audit-2026-10-15/FULL-AUDIT-REPORT.md`.
- **SEO fixes:** every "Release A" fix from FIX-PLAN is built, apart from the "How did you hear about us?" field and the booking webhook in P2.10. Both need your approval. These fixes don't change the design. The deploy gate (`verify-live.sh`) passes all **80 checks** on the local production build. This morning it failed 7 locally and 34 on live.
- **13 new blog guides:** 16 posts in total, written from fresh trend and keyword research, with about 105 original on-brand charts and covers. One is an **original data post**: developer salaries in 38 countries, computed from the Stack Overflow survey dataset. It comes with a downloadable CSV and is the kind of asset that earns links.
  - Every external number links to a source the writer opened. The audit checked 67 figure groups against their sources and found none wrong.
  - There are no em dashes, and every post passes our AI-writing linter with zero warnings.
  - An editor pass and a fix pass made the posts consistent and cross-linked: every new post has 3 or more inbound links.
- **Lighthouse (mobile, local prod build):**
  - SEO 100, Accessibility 100 and Best Practices 100 on home, service pages and posts.
  - Performance: home 77 (61–68 on 14 Oct), service pages 80–81 (71–73), posts 85.
  - The service-page layout shift went from 0.139 to 0.
- **Two real bugs found and fixed:**
  - GA4: the site's Content Security Policy blocked GA4's `www.google.com/g/collect` hits on live, losing Google signals data.
  - `robots.txt`: Lighthouse reported it as invalid.
- **Still needed from you:** a look at the changes, about 20 minutes (section 4), a handful of numbers and decisions (section 5), and then the deploy (section 6).

## 2. What changed, by area

| Area | What was done | Visible on the site? |
|---|---|---|
| Crawlability | Every remaining `<Suspense>` wrapper removed (/services, all service pages, /about, /work, /blog, posts). All text now ships inside `<main>` in the raw HTML. No hidden streamed blocks remain on any page | No |
| Metadata | Per-page canonical, `og:url`, `og:locale`, X card on every page via a new `pageShare()` helper. 404 has one robots tag and no canonical. Privacy and Terms titles fixed. Unknown `/services/x` and `/blog/x` now return a real 404 | No |
| Schema | Founder Person node resolves on every page. Dhaka node has no invented hours or street. BlogPosting gets `@id`, author job title and employer. ItemLists named. No one-item breadcrumbs | No |
| AI readiness | `llms.txt` rewritten: founder, founding year, services, booking and brief links for agents, all 13 guides. New `llms-full.txt` (80 KB digest generated from the data). Content-signal policy in `robots.txt`. `/.well-known/security.txt` | No |
| Forms | `required`/`aria-required` on required fields. Quote form success is announced to screen readers. Honeypot renamed so AI agents stop filling it, and the API still rejects the old name | No |
| Analytics | GA4 events: `book_call_click`, `contact_click` (email/phone/WhatsApp), `generate_lead` (no double firing). Core Web Vitals reported to GA4. CSP fixed per Google's guide | No |
| Service pages | Titles carry the keyword (e-commerce, AI, UI/UX, cloud). The first hero sentence names the service. A 50-word "what we build, for whom, how long" answer. Shared boilerplate cut from 31–43% to 10–17% of each page by tailoring the "Three ways to start" cards, the process line, the form intro and the closing CTA. Proof headings now say "web builds" where the cards are websites | **Copy only**, same layout |
| Homepage | Manifesto words are in the HTML once instead of twice. Tested in `next dev` and the prod build: identical, including reduced motion (`manifesto-fix/` has the screenshots) | No (please glance at it) |
| Blog | 12 new guides. CTA card inside posts. All 19 lime-green infographics in the 3 old guides redrawn in brand colours with the same information. Related posts chosen by topic. RSS dates fixed. Charts open full size on tap, with a phone-only hint. Mockup covers are never cropped: the /blog lead card shows them as a framed 16:9 screen, and the post banner fits them on frost. Wide tables no longer scroll sideways on desktop | **Yes**: new posts, CTA card, recoloured charts, framed lead cover |
| Schema (re-audit fixes) | Service offer catalogs that no longer matched the pages removed. AboutPage, ContactPage and `isPartOf` links added. /work items get `@id` and image | No |
| Fonts | Geist Mono preloaded. It was the cause of the service-page layout shift (the breadcrumb wrapped, then unwrapped) | No |
| Housekeeping | Every em dash removed from code comments. Unverified "64 districts" and "live in 8 weeks" result lines on /work reworded as plain facts | Copy only |

## 3. The 10 new guides

| Post | Primary keyword | Why it can rank |
|---|---|---|
| Is Your Vibe-Coded App Production Ready? A 2026 Checklist | vibe coded app production ready | Strongest 2026 trend for founders; results are tool pitches |
| WordPress to Next.js Migration: Steps, SEO and Cost Drivers | wordpress to next.js migration | Our deepest first-hand experience |
| Bangladesh Payment Gateway Integration: bKash vs SSLCommerz | payment gateway integration bangladesh | Thin competition; primary sources |
| How Much Does an AI Agent Cost for a Small Business in 2026? | how much does an ai agent cost for a small business | Running costs worked out from official price lists |
| How to Get Your Products on ChatGPT Shopping (Any Platform) | how to get products on chatgpt shopping | 2026 trend; non-Shopify gap |
| Shopify vs Custom Ecommerce Website: Which Wins in 2026? | shopify vs custom ecommerce website | Honest verdict plus fee maths and Bangladesh angle |
| MVP Development Cost in 2026: How to Work Out Your Budget | mvp development cost | Budget formula; reuses our published estimates |
| SaaS Development Cost in 2026: From MVP to Full Platform | saas development cost | Real monthly running costs at 50/200/1,000 customers |
| Bangladesh Courier API Integration: Steadfast, Pathao, RedX | courier api integration bangladesh | No editorial results exist today |
| How Much Does Software Maintenance Cost Per Year in 2026? | how much does software maintenance cost | 2026–2027 platform deadline table |
| MVP vs Prototype vs POC: Which Should You Build First? | mvp vs prototype vs poc | Verdict-first comparison with a 10-row table |
| AI Automation for Small Business: What to Automate First | ai automation for small business | Use-case table plus a workflow scoring worksheet |
| Software Developer Salaries by Country in 2026 (Real Data) | software developer salary by country | Original data (n = 25,416, ODbL), CSV download, methodology and "how to cite": a link magnet |

Each has a TL;DR answer, 8 to 10 question headings that open with the answer, tables, an FAQ, takeaways, 5 or 6 original charts and a realistic UI-mockup cover. Each service page's guide cards point at the most relevant new posts.

**Decision for you: publish all at once, or in waves?** The content audit flagged that 13 posts sharing one date, one author and one structure can look like scaled content. Two options:
- **(a) Publish all now.** The posts are distinct, sourced and useful.
- **(b) Release them in waves of about 4 a week.** I set real publish dates, and posts appear on their date. This needs a rebuild on each release day, or one small ISR change.

I lean to (b) for safety. It also matches the LinkedIn calendar in the off-page kit (Tuesdays and Thursdays from 20 Oct).

The code for (b) is already in:
- A post dated in the future stays unpublished: no page, and no sitemap, RSS or llms.txt entry.
- Links to a not-yet-published post show as plain text until its date.

So scheduling means changing each post's `date` and rebuilding on release days. Proposed waves:

| Wave | Date | Posts |
|---|---|---|
| 1 | deploy day | vibe-coded checklist, WordPress to Next.js, Bangladesh payment gateways, AI agent cost |
| 2 | Tue 20 Oct | MVP cost, Shopify vs custom, ChatGPT shopping, MVP vs prototype vs POC |
| 3 | Tue 27 Oct | SaaS cost, Bangladesh courier APIs, software maintenance cost, AI automation for small business |
| 4 | Tue 3 Nov | developer salaries by country (data post; pitch it to press the same week) |

## 4. Please review (about 20 minutes on `pnpm dev`, port 3001)

1. **Blog:** `/blog`, then 2 or 3 new posts. Check the cover, the charts, the lilac "next step" card, the tables on a phone and the "More before you build" cards.
2. **The old guides' charts:** `/blog/how-much-does-custom-software-development-cost`, now brand colours instead of lime green.
3. **One service page** (for example `/services/saas-product-engineering`):
   - the new intro sentence, the "What is …?" answer and the "Three ways to start" card text;
   - the proof heading, which now reads "Web platforms we've shipped";
   - the closing CTA line.
4. **Homepage manifesto:** scroll through it once. It should look exactly as before. If it ever looks unfilled in dev, restart `pnpm dev`; that is what went wrong last time.
5. **Full copy diff (old → new):** in `agent-log.md`, sections A2 and A5.

## 5. Decisions and facts only you can give

**Numbers (the editor found these conflicts across pages; AI engines quote TL;DRs, so please pick one each):**
- **F1:** the cost guide's TL;DR says most first products cost **$30,000–$120,000**, but its body says **$40,000–$120,000**.
- **F2:** "standard MVP": **$30,000–$90,000** (MVP timeline FAQ) or **$40,000–$120,000** (cost guide, new posts)?
- **F3:** simple MVP timeline: **4–10 weeks** (cost guide), **6–8** (MVP posts) or **6–12** (custom software page)?
- **F4:** is discovery a **free call**, or a **paid phase** before the fixed price? Or both: a free 30-minute call, then a paid discovery.
- **F5:** service-page prices disagree with the cost guide: custom software "$8,000 to $75,000+" and mobile "polished MVP $12,000–$40,000".
- **F9:** unsourced percentages on service pages: cloud "cuts costs 20–40%", mobile "saves 30–40%". Label them as estimates, or drop them.
- **F10:** the cost guide says regional rates differ "three to five times" and "4–5x" between San Francisco and Dhaka. The new salary data shows the US median at 7.8× India's (4.2× at 10+ years of experience). Bangladesh has too few survey respondents (92) for a published median. Consider softening this to "4–8x", or say it applies to senior teams.
- **Cloud:** confirm the "4–7 weeks" answer on the cloud page (A2 summed the page's own process steps).

**Offers mentioned in the new posts (confirm or I will soften them):**
- a read-only code review for AI-built apps;
- a "send us a product URL" AI-shopping readiness check;
- an estimate from a URL for WordPress migrations;
- fixed quotes for payment and courier work.

Are the review and the check free?

**Facts the posts and profiles need:**
- Which payment gateways and couriers Arrowbin has integrated (the posts name none for any client).
- Whether the ChatGPT post may say our own Cloudflare blocked GPTBot in the 14 Oct audit.
- The Dhaka street address and whether clients can visit (D8).
- The WhatsApp number (D7).
- Sunbiz status of the Florida LLC (D3).
- Team size.

**Photos:** five blog photos still show lime-green furniture: team-collaboration, choosing-a-partner, portfolio-review, team-partnership and team-shipping (the last also shows an Apple logo). Regenerate them in Nano Banana with the brand palette when you have 15 minutes.

**Approval-gated items (not done):**
- the "How did you hear about us?" field;
- mobile LCP work (hero text animation, GA load timing);
- the visual polish batch (P2.11).

## 6. Deploy (when you say yes)

```bash
# 1. look at the diff (about 75 files plus new posts, charts and docs)
git status && git diff --stat
# 2. commit and push (or ask me to do it)
git add -A && git commit -m "SEO sprint: Release A fixes, 10 new guides, AI files" && git push
# 3. deploy the way you normally do (live is self-hosted Next.js behind Cloudflare),
#    purge the Cloudflare cache for HTML, then:
bash docs/seo/12-audit-2026-10-14/verify-live.sh          # all sections except 7 and 8 should pass
node scripts/indexnow.mjs                                  # tells Bing (and ChatGPT search) about every URL
```

Then in Google Search Console:
- resubmit `sitemap.xml`;
- request indexing for `/`, `/blog` and the 10 new posts;
- file Removals for `/products5070048.html` and `/?channel=5f1f69&name=LARRY` (P0.4).

Do the same sitemap step in Bing Webmaster Tools.

**Cloudflare (P1.1, 5 minutes):**
- Allow GPTBot, ClaudeBot, CCBot and the other AI crawlers in Bots / AI Crawl Control. They still get **403** today.
- Add one redirect from `http://www.arrowbin.com/*` to `https://arrowbin.com/$1`.

**Before deploy:** fix the GitHub org (P0.1): email hello@, description, location. The site's `sameAs` links to it.

## 7. Off-page (the biggest gap now)

The site has 2 referring domains, and a search for "Arrowbin" finds nothing about us. `offpage-kit/` makes the fixes copy-paste work:
- **`profile-facts.md`:** one fact sheet for every profile.
- **`directories.md`:** Clutch claim, LinkedIn page, GoodFirms, DesignRush, Crunchbase, TechBehemoths, The Manifest, Hostinger.
- **`client-outreach.md`:** footer credit and review emails for all 8 clients, plus WhatsApp versions.
- **`linkedin-posts.md`:** 13 posts scheduled Tuesday and Thursday from 20 Oct.
- **`pr-and-mentions.md`.**

Start with the README's 14-day plan.

## 8. Where everything is

| What | Where |
|---|---|
| Sprint rules, writing guide, agent reports | `docs/seo/13-sprint-2026-10-15/` (`agent-log.md` has every agent's report) |
| Topic research and briefs | `topic-research.md`, `briefs/` |
| Editor's fact table, conflicts, link matrix | `editor-report.md` |
| Next wave, ready to start (2 service-page drafts, 2 post briefs; F4 unblocks the most) | `docs/seo/15-next-wave/` |
| Re-audit after the sprint (score, findings, action plan) | `docs/seo/14-audit-2026-10-15/` (`FULL-AUDIT-REPORT.md`, `ACTION-PLAN.md`, `findings/`, `screenshots/`) |
| Deploy gate | `docs/seo/12-audit-2026-10-14/verify-live.sh` |
| AI-writing linter, boilerplate meter | `docs/seo/13-sprint-2026-10-15/tools/` |
| IndexNow | `scripts/indexnow.mjs`, key file in `public/` |
