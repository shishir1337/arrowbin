# GEO / AI search readiness audit: arrowbin.com (14 October 2026)

Builds on `../07-geo-aeo/` and `../11-audit-2026-10-01/geo.md`. Method: curl with bot user agents against live and http://localhost:3117, raw-HTML word counts (no JS), Wikidata/GitHub/LinkedIn/GoodFirms/Clutch probes. Read-only.

## 1. Score

| Dimension | Weight | Live | Projected (local fixes deployed + Cloudflare fix + entity work) |
|---|---|---|---|
| Citability | 25% | 62 | 75 (after rewrites R-1..R-5) |
| Structural readability | 20% | 52 | 80 |
| Multi-modal | 15% | 50 | 52 |
| Authority and brand | 20% | 20 | 45 (profiles + reviews created) |
| Technical accessibility | 20% | 66 | 90 |
| **AI Search Readiness** | | **50 / 100** (1 Oct: 52) | **~70 / 100** (deploy and edge fix only: ~60) |

Live is 2 points lower than 1 Oct only because GPTBot, ClaudeBot etc. remain blocked and nothing was deployed; the scoring is otherwise unchanged. Platform estimates unchanged from 1 Oct (AIO 40, ChatGPT 30, Perplexity 35, Copilot 30, Claude 40).

## 2. AI crawler access (14 Oct, live, homepage and /llms.txt identical)

| Agent | Live status | Note |
|---|---|---|
| GPTBot | **403** | Still blocked. Tried short UA, `GPTBot/1.3` and the full official UA: all 403. The "now 200" report did not reproduce from this IP; re-test from the Cloudflare dashboard (Security > Events) as the rule may be IP/ASN dependent. |
| ClaudeBot | **403** | Still blocked (full official UA also 403). |
| CCBot, Bytespider, Amazonbot | **403** | Still blocked. |
| OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot | 200 | Citation/search agents fine. |
| Google-Extended, Applebot-Extended | 200 | robots tokens only. |

Status: OPEN (edge setting, not in app code). Priority High (was Critical on 1 Oct; search agents are unaffected). Fix: Cloudflare AI Crawl Control / Block AI bots, 10 min, owner founder. Fail test: `curl -A "GPTBot/1.3" -o /dev/null -w "%{http_code}" https://arrowbin.com/` still 403.

## 3. robots.txt, llms.txt

- robots.txt live: allows `*` and explicit groups, still lists `Claude-Web`, `Disallow: /api/`, no Claude-SearchBot/Claude-User. **FIXED-LOCAL**: local adds Claude-SearchBot and Claude-User, drops Claude-Web, `/api` disallow. Note local groups omit the trailing slash (`/api` also blocks `/api-docs`; harmless).
- llms.txt: 200 live and local, byte-identical, valid. **OPEN**: no key-facts block (founder, founded 2020, price and timeline ranges), no hub links (/services, /blog), still says "software development company" (homepage hero locally now says "for startups and growing businesses"; align). llms-full.txt 404 both (Low, skip).
- RSL: none; skip.

## 4. Raw-HTML text inside `<main>` and H1 (home/services/etc.)

| Page | Live main / total words | Local main / total | Live H1 raw | Local H1 raw |
|---|---|---|---|---|
| / | 80 / 1501, 10 hidden blocks | **1405 / 1517, 0 hidden** | `...moves.SoftwareThatMoves` | spaced, still repeats "Software That Moves" after the sr-only sentence |
| /services | 42 / 843, 5 hidden | **42 / 847, 5 hidden (still)** | `Softwaredevelopmentservices` | spaced |
| /services/custom-software-development | 1408 / 2070, 3 hidden | 1411 / 2075, 3 hidden | `CustomSoftwareDevelopment` | spaced |
| blog cost post | 3175 / 3329 | same | clean | clean |
| /about | 606 / 757 | same | `itlike it'sours` | spaced |

- Homepage Suspense removal: **FIXED-LOCAL** (80 to 1405 words in main). Verified.
- H1 spacing: **FIXED-LOCAL** on all pages checked.
- **NEW/OPEN (Medium):** `/services` and every service page still stream sections into `<div hidden>` after `</main>`. On `/services` the hub (service picker, capabilities, process, FAQ, CTA) is 82 words of hidden text and only 42 in main, so the hub's FAQ is not in main. On service pages the FAQ (S:1) and CTA are hidden; the FAQ is the most quotable block there. Fix: unwrap Suspense around `FAQ` in `src/app/services/page.tsx` and the service page template. Effort S, owner dev. Fail test: `curl -s localhost:3117/services | grep -c 'div hidden id="S:'` is not 0.
- Homepage manifesto word doubling (1 Oct F-8) not re-measured in detail; carry as OPEN until checked (`curl | grep "We We are"`).

## 5. Citability (delta only)

- Blog posts unchanged and still the only citable passages (P-1..P-5 in the 1 Oct report). Cost post: 3,175 words in main, no external sourced links detected in the main text of any of the three posts by this check (1 Oct found one, Stack Overflow, which does not support the rate table). **OPEN** F-7 (sourced statistics), High.
- Service pages: my probe found no "What is X" H2 paragraph naming Arrowbin; **OPEN** F-6, High. Local portfolio result lines now factual (**FIXED-LOCAL**, lowers hallucination risk but also removes quotable numbers; add method-labelled first-party figures instead).
- Placeholder testimonials: kept by founder decision, risk noted only.

## 6. Entity signals (14 Oct)

| Signal | Result | Status |
|---|---|---|
| LinkedIn company (`/company/arrowbin`, `arrowbinllc`, `arrowbin-llc`) | 404 x3 | OPEN, High |
| Org `sameAs` | Live still has placeholder `linkedin.com/in/arrowbinllc`; local replaces it with GitHub and adds `founder` | **FIXED-LOCAL** (add real /company/ URL after creating it) |
| Wikidata | `wbsearchentities` returns `[]` | OPEN (not creatable until notability sources exist; low priority) |
| GitHub org Arrowbin-LLC | 0 public repos, description "At Arrowbin Digital Agency, we're dedicated to turning your concepts into captivating digital realities." | OPEN, Medium: rewrite description, publish 1 or 2 useful repos |
| Clutch / GoodFirms / Crunchbase | Bots get 403 on probes; 1 Oct showed no profile. Not verifiable by curl; check manually in a browser | OPEN (unverified) |
| Brave brand search | arrowbin.com result present (title "Arrowbin"); not re-analysed in depth | Info |
| YouTube | no branded channel | OPEN, Low |

## 7. What changed since 1 Oct

Live: nothing (still commit 959866d). Local: homepage `<main>` text, H1 spacing, sameAs/founder, robots Claude agents, bot-agnostic redirects/410s. Unchanged: edge 403s, empty off-site entity, service-page answers, sourcing, `/services` hidden blocks.

## 8. Five more citable rewrites (new; R-1..R-5 from 1 Oct still pending). Bracketed items must be filled with real data.

1. **Homepage "What does Arrowbin do?" (entity block, 70 words, inside main):** "Arrowbin is a founder-led software development company, started in 2020 and run by Md. Shishir Ahmed. We design and build custom software, web and mobile apps, SaaS products, e-commerce stores and AI automation for startups and growing businesses. Teams work from Dhaka, Bangladesh and serve clients worldwide. First versions usually ship in 6 to 12 weeks, and clients own all source code."
2. **Mobile app service, short answer (about 60 words):** "Mobile app development costs roughly $[X] to $[Y] for a first release on iOS and Android from one codebase, and takes [N] to [N] weeks. Arrowbin builds with [framework], hands over the source code, and quotes a fixed estimate after a free discovery call. The biggest cost drivers are backend complexity, integrations and the number of unique screens."
3. **E-commerce service, comparison sentence:** "A hosted platform such as Shopify suits stores with standard catalogues and under [N] SKUs; a headless or custom build suits stores with custom pricing, B2B ordering or heavy integrations. Arrowbin chooses on three tests: how unusual the checkout is, how many systems must sync, and expected traffic. Typical builds take [N] to [N] weeks."
4. **SaaS service, FAQ answer "How long to launch a SaaS MVP?" (about 55 words):** "Most SaaS MVPs Arrowbin builds launch in 10 to 14 weeks: two weeks of discovery, two of design, six to eight of build in two-week sprints, and two of testing and launch. Scope is fixed after week two. Adding billing, multi-tenancy or integrations typically adds 2 to 4 weeks."
5. **Cloud/Hosting, partnership fact (about 45 words):** "Arrowbin is a verified Hostinger Partner. Clients who host with Hostinger can use coupon code ARROWBIN at checkout, and Arrowbin sets up deployments, backups and monitoring for [N] sites. Managed hosting plus maintenance starts at $[X] a month." (Confirm the partner claim is verifiable on Hostinger's partner directory before leaning on it.)

## 9. Top actions

1. Cloudflare: allow GPTBot/ClaudeBot/CCBot (10 min, founder, High).
2. Deploy local build (pending since 1 Oct; unlocks H1, homepage main text, sameAs, robots) (dev, S).
3. Unwrap Suspense around FAQ/hub sections in `/services` and service pages (S, dev).
4. Create LinkedIn company page, Clutch, GoodFirms, Crunchbase, then add the LinkedIn URL to `src/lib/site.ts` sameAs (founder, 1 to 2 days).
5. Add answer blocks (R-1, R-2, above rewrites) and method-labelled first-party numbers; add key-facts to llms.txt (dev/founder, 1 day).

Evidence: curl outputs 14 Oct 2026 (status table in section 2), Python stdlib word counts on live and localhost:3117, LinkedIn 404s, Wikidata `[]`, GitHub API org payload.
