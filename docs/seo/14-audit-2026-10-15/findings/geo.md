# GEO / AI search readiness re-audit: arrowbin.com (15 October 2026)

Baseline: `../../12-audit-2026-10-14/geo.md` and `agentic.md`. Sprint log: `../../13-sprint-2026-10-15/agent-log.md`, `editor-report.md`. Read-only: no source edits, no build, no git, no server changes.

Two targets, and every number below says which one it came from:
- **LOCAL** = http://localhost:3117 (production build with every 15 Oct sprint change, not deployed).
- **LIVE** = https://arrowbin.com (still build 959866d). Used only for edge, TLS and redirect checks, plus a "is the new work live yet" check.

## 1. Score

| Dimension | Weight | 14 Oct live | 15 Oct LIVE | 15 Oct LOCAL | Main reason for the local number |
|---|---|---|---|---|---|
| Citability | 25% | 62 | 62 | **80** | 10 new guides: 99 of 99 content H2s are questions; 69 of 99 answer capsules are 40 to 80 words; 6 to 23 primary-source links per post; dated "as of October 15, 2026" prices. Held back by cross-post price conflicts and 3 old guides with 0 to 1 sources. |
| Structural readability | 20% | 52 | 52 | **88** | 0 `<div hidden id="S:">` blocks on all 29 sitemap URLs (was 5 to 10 on live), full text inside `<main>` on every template, TOC, 37 sections with tables. |
| Multi-modal | 15% | 50 | 50 | **62** | 5 to 6 captioned SVG charts per new guide with data-describing alt text, tables, cover images. No video, no YouTube. |
| Authority and brand | 20% | 20 | 20 | **30** | On-site: byline, one founder `@id`, sourced and labelled estimates. Off-site: unchanged (no LinkedIn company page, no Wikidata, empty GitHub org). |
| Technical accessibility | 20% | 66 | 66 | **80** | Valid robots.txt, llms.txt, llms-full.txt, security.txt, canonical on every page. Capped because the Cloudflare 403 on training bots will still apply after deploy. |
| **AI Search Readiness** | | **50** | **50** | **69 / 100** | 14 Oct local projection was 55. |

- **LIVE: 50, unchanged.** Nothing is deployed. Live `/blog/vibe-coded-app-production-ready` and the other 9 new posts return 404, `/llms-full.txt` and `/.well-known/security.txt` return 404, and the live sitemap has 19 URLs against 29 local.
- **LOCAL: 69.** Deploying the build as-is should move the live number to about 69. Opening the training bots at Cloudflare adds about 3 (technical 80 to 95). Executing the off-page kit (LinkedIn company, Clutch claimed, Crunchbase, 3 or more reviews, 2 or more mentions) is worth about 4 to 8 more, mostly through the authority dimension. Resolving the price conflicts adds about 1.
- Platform estimates are judgment, not measurement (no DataForSEO or live-chat tool was run). LOCAL deployed with the edge as-is: Google AI Overviews 55 (was 40), ChatGPT 42 (30), Perplexity 58 (35), Bing Copilot 45 (30), Claude 55 (40). LIVE is unchanged from 14 Oct: 40, 30, 35, 30, 40.

## 2. What works

- **Search and user agents are open at the edge** (LIVE): OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Googlebot, Bingbot, Applebot all get 200 on `/`, `/llms.txt`, `/robots.txt`, a blog post and `/sitemap.xml`.
- **All Suspense-hidden blocks are gone** (LOCAL). Fixes 14 Oct "NEW/OPEN Medium" on `/services` and service pages. Main-text words, no JS, no hidden blocks:

| Page | main words / total | hidden S: blocks |
|---|---|---|
| / | 1376 / 1488 | 0 |
| /services | 735 / 847 (was 42 / 847) | 0 |
| /work, /about, /contact | 525, 648, 478 | 0 |
| /blog, /privacy, /terms | 996, 1183, 629 | 0 |
| 8 service pages | 1427 to 2001 | 0 |
| 3 core guides | 3553, 2734, 2626 | 0 |
| 10 new guides | 4724 to 5974 | 0 |

  The single `<div hidden>` on each page is Next's empty metadata outlet (`<!--$--><!--/$-->`). Counted with a stdlib HTML parser, not trafilatura.
- **Manifesto word doubling** ("We We are"): not present (0 matches in `/`). Closed.
- **llms.txt is now a good agent entry point** (section 4): key facts, a "Start a project" section with the Cal.com link, the brief form anchor and email, 13 guides, and an `Optional` link to a new llms-full.txt.
- **robots.txt**: 12 groups parse (stdlib robotparser); GPTBot, ClaudeBot, CCBot, OAI-SearchBot, Claude-SearchBot, PerplexityBot, Google-Extended, anthropic-ai, Bytespider, Amazonbot, cohere-ai can fetch `/` and `/blog/*`, and `/api/contact` is disallowed for all. `Disallow: /api` now precedes `Allow: /`, so first-match parsers also block `/api` (14 Oct quirk closed). Lighthouse 12.8.2 `robots-txt` audit: score 1.
- **Form hygiene** (section 7): honeypot renamed to `hp_trap`, required fields exposed, success announced and focused on both forms. Closes agentic A-5, A-6 and A-8 (measured). A-7 (chip group name) was changed in source per the agent log; the accessible name was not re-measured.
- **Schema/entity plumbing**: one `#founder` Person, `foundingDate: 2020`, `legalName: Arrowbin LLC`, `sameAs` without the placeholder LinkedIn. Identical on `/`, `/about`, `/contact` and a post.
- **security.txt** (RFC 9116) 200, `Expires: 2027-10-15`.

## 3. AI crawler access

### 3a. Edge, LIVE (unverified requests from a Dhaka IP, official UA strings; raw: `raw/live-ua-matrix.txt`)

| Agent | Class | robots.txt says (live) | `/` | `/llms.txt` | `/robots.txt` | blog post | `/sitemap.xml` |
|---|---|---|---|---|---|---|---|
| GPTBot | training | Allow | **403** | **403** | 200 | **403** | **403** |
| ClaudeBot | training | Allow | **403** | **403** | 200 | **403** | **403** |
| CCBot | training | Allow | **403** | **403** | 200 | **403** | **403** |
| anthropic-ai | training | falls to `*` Allow | **403** | **403** | 200 | **403** | **403** |
| Amazonbot | training | falls to `*` Allow | **403** | **403** | 200 | **403** | **403** |
| Bytespider | training | falls to `*` Allow | **403** | **403** | 200 | **403** | **403** |
| OAI-SearchBot | search | Allow | 200 | 200 | 200 | 200 | 200 |
| ChatGPT-User | user-triggered | Allow | 200 | 200 | 200 | 200 | 200 |
| Claude-SearchBot | search | `*` (live), explicit Allow (local) | 200 | 200 | 200 | 200 | 200 |
| Claude-User | user-triggered | `*` (live), explicit Allow (local) | 200 | 200 | 200 | 200 | 200 |
| PerplexityBot | search | Allow | 200 | 200 | 200 | 200 | 200 |
| Perplexity-User | user-triggered | Allow | 200 | 200 | 200 | 200 | 200 |
| Googlebot, Bingbot, Applebot | search | Allow | 200 | 200 | 200 | 200 | 200 |
| Chrome UA, `curl/8.0` | control | n/a | 200 | 200 | 200 | 200 | 200 |
| Google-Extended | robots token only, not a crawler | Allow | 200 with that UA string (no such crawler exists; nothing to enforce) | | | | |

- The 403 is `Server: cloudflare`, `Content-Type: text/plain`, `Content-Length: 25`, body `Your request was blocked.` Same status table as 14 Oct on all 6 blocked agents: the sprint changed nothing at the edge.
- `robots.txt` is 200 for every UA, so a blocked crawler can still read the policy it is being denied.
- The live robots.txt has no Cloudflare-injected Content-Signal block (managed robots.txt is off).
- http://arrowbin.com and https://www.arrowbin.com both 301 to https://arrowbin.com/ in one hop.
- **Not checked:** whether the real GPTBot and ClaudeBot (verified by IP) are also blocked. The rule behaves like a UA-class rule, so they very likely are. Confirm in Cloudflare Security > Events.

### 3b. robots.txt, LOCAL

- 12 groups (`*` plus GPTBot, OAI-SearchBot, ChatGPT-User, Google-Extended, PerplexityBot, Perplexity-User, ClaudeBot, Claude-SearchBot, Claude-User, Applebot-Extended, CCBot), each `Disallow: /api` then `Allow: /`, one `Sitemap:` line. Live had the obsolete `Claude-Web` group and no Claude-SearchBot or Claude-User.
- Not named (so governed by `*`, Allow): anthropic-ai, cohere-ai, Bytespider, Amazonbot, Meta-ExternalAgent. Fine under an allow-all policy.

### 3c. The Content-Signal-as-comment trade-off (judgement)

Line 1 to 3 of local robots.txt is a comment: `# Content-Signal: search=yes, ai-input=yes, ai-train=yes`.

- **Why the trade is real.** Lighthouse 12.8.2's `robots-txt` audit has a fixed directive safelist (`user-agent, disallow, allow, sitemap, crawl-delay, clean-param, host, request-rate, visit-time, noindex`, in `core/audits/seo/robots-txt.js`). Anything else throws "Unknown directive", so a real `Content-Signal:` line would fail that audit. It passes now.
- **What the comment costs.** A comment is invisible to any parser, so it is a human-readable note and no longer a machine-readable preference. The standard behind it is a Cloudflare CC0 policy, its IETF individual draft expired 2026-04-04 (vendor matrix checked 2026-09-23), and no crawler operator has publicly confirmed honouring it. The audit failure is one diagnostic in the Lighthouse SEO category, which is not a ranking input.
- **Verdict.** Keep the comment. The trade-off is reasonable, and nothing a major AI crawler acts on is lost. Two caveats:
  1. **The comment is false on LIVE today.** It tells readers training is welcome (`ai-train=yes`, "welcome to ... learn from these pages") while Cloudflare returns 403 to GPTBot, ClaudeBot and CCBot. Either open the edge (G-1) or change the comment to match.
  2. If a consumer ever appears, serve it from Cloudflare's managed robots.txt at the edge. Note Lighthouse run against live would then flag it, so decide with eyes open.
- Fail test for any future change: `curl -s https://arrowbin.com/robots.txt | grep -c '^Content-Signal'` should be 0 while the Lighthouse audit matters, and `lighthouse --only-audits=robots-txt` must stay at score 1.

## 4. llms.txt and llms-full.txt (LOCAL)

### llms.txt (8,998 bytes, `text/plain; charset=utf-8`, `public, max-age=3600`)

- **Format: valid llmstxt.org.** One H1, a blockquote summary, free text and a "Key facts" list with no headings, then H2 sections of link lists, then `## Optional`. 41 unique URLs across llms.txt and llms-full.txt; every arrowbin.com URL returns 200 locally, and `cal.com/arrowbin/30min` returns 200.
- **Accuracy against the site: good.** Founder name, 2020, "clients worldwide" (offices sentence gone, fixes agentic A-4), 8 services with the same one-line summaries as the pages, 13 guides with the post meta descriptions, Hostinger line unchanged. The brief-form line ("Name, email and a few lines about the project are required; services, budget, timeline and company are optional") matches the real form (3 `aria-required`, `company` optional). `#brief` exists on `/contact`.
- **Useful to an agent that wants to book or brief: yes.** "Start a project" gives the booking URL, the brief URL with what is required and the reply time, and a mailto fallback, in the first screen. It deliberately does not advertise `/api/contact` (correct: keeps the human in the loop). Gaps: no phone or WhatsApp number (the footer has two), no time zone or availability note for the booking page. Low.
- Fixes agentic A-4 (booking link missing) and the 14 Oct geo item "no key-facts block, no hub links, still says software development company".

### llms-full.txt (80,471 bytes, 12,897 words, new)

- One Markdown digest generated from `services.ts`, `portfolio.ts`, `blog.ts`. Per service: answer block, intro, deliverables, tech, process, FAQs. Per guide: date, author, TL;DR, takeaways, FAQs. Portfolio outcome lines are left out on purpose. Fixes agentic A-10.
- It is a digest, not the full article text: the guides' tables and worked examples are not in it. Acceptable for an agent; say so in the file header if wanted. Low.
- **New problem (see G-4):** the digest puts the conflicting price ranges in one file. Examples measured in it: custom software FAQ "$8,000 for a focused tool to $75,000+" next to the cost guide's "$5,000-$250,000+"; mobile FAQ "$12,000 to $40,000" polished MVP next to the MVP cost guide's "$40,000-$120,000"; MVP timeline guide FAQ "$30,000 to $90,000" standard MVP.

### Residual llms.txt points (all Low)

- Services appear twice (inside "Key facts" and again in `## Services`).
- "a free discovery call, then a written scope and a fixed, itemised estimate" conflicts with the cost guide FAQ's "short, paid discovery" (founder decision F4). Founder-gated.
- "Most well-scoped MVPs take 6 to 14 weeks" is wider than the MVP timeline guide's own simple (6 to 8) and standard (10 to 14) bands (F3). Founder-gated.
- "Arrowbin LLC" is stated as fact in the blockquote paragraph and Key facts. The off-page kit says the Florida LLC showed "Inactive" on OpenCorporates on 14 Oct and tells the founder to use "Arrowbin" until Sunbiz is checked (D3). Founder-gated; the site, schema and footer already say "Arrowbin LLC".

## 5. Non-JS accessibility by template (LOCAL, curl with a GPTBot UA, no JS)

All 29 sitemap URLs return 200 with the H1, the body copy, internal links and JSON-LD in the first response; one canonical each (`https://arrowbin.com/<path>`); no `Vary: Accept`/Markdown delivery (unchanged, agentic A-9, optional). Templates covered: home, services hub, 8 service pages, work, about, blog index, 13 posts, contact, privacy, terms. Table in section 2.

- **H1, home (Low, carried over):** raw H1 = sr-only sentence "Arrowbin, a software development company for startups and growing businesses: software that moves." followed by the aria-hidden letter-by-letter "S o f t w a r e T h a t M o v e s" (one span per character). Extractors that insert a space per element read it as spaced letters. The entity sentence is intact; the duplicate is noise. Fix: render the visual line as one text node with CSS-split characters, or `aria-hidden` plus `data-` text. Dev, needs visual sign-off.
- **Live-vs-local gap:** all of the above is LOCAL. LIVE `/services` and every service page still stream the FAQ and CTA into hidden blocks until deploy (the 14 Oct "NEW/OPEN Medium" item).

## 6. Citability of the 10 new posts (LOCAL; per-section data in `raw/post-sections.json`, `raw/post-metrics.json`)

| Measure | Result |
|---|---|
| Content H2s that are questions | 99 of 99 (10 closing "Key takeaways" blocks are the only other H2s) |
| Answer capsule (first paragraph under each H2) length | 5 at 20 to 29 words, 26 at 30 to 39, 40 at 40 to 49, 23 at 50 to 59, 5 at 60 to 69; 68 of 99 inside 40 to 80 |
| Capsules containing a figure | 25 of 99 (every "how much / how long / how many / what does X cost" heading: 12 of 14 lead with a figure; the 2 that do not are both in the WordPress guide) |
| Sections with a table | 37 of 109 |
| FAQs | 8 per post (FAQPage JSON-LD), average answer 37 to 47 words |
| Primary-source links (excluding share buttons and Cal.com) | vibe 11, WordPress 11, payments 11, AI agent 14, MVP cost 12, Shopify 15, ChatGPT shopping 23, SaaS 10, courier 6, maintenance 11 |
| Dates | Visible "Published October 15, 2026" plus JSON-LD `datePublished` and `dateModified` all 2026-10-15; prices labelled "as listed on October 15, 2026" |
| Author | "Md. Shishir Ahmed, Founder, Arrowbin" byline on all 10; same `#founder` node in the BlogPosting |
| Passage length 134 to 167 words | Not a useful test here: H2 sections run 80 to 1,000+ words because they hold H3s, tables and lists. The extractable unit is the 40 to 60 word capsule plus the 37 to 47 word FAQ answers, and those are on target. |

Compared with 14 Oct (F-7: "no external sourced links ... in the main text of any of the three posts"): fixed for the new posts, still open for the three core guides (cost 1 source, choose 0, MVP timeline 0).

### 6a. The 5 most citable passages (verbatim)

1. **payment-gateway-integration-bangladesh, "How much do payment gateways cost in Bangladesh?" (50 words).** "SSLCommerz publishes its price: a Tk 25,500 Basic plan, marked non-refundable, plus 2.5% per successful transaction and 3.5% for AMEX, as listed on October 15, 2026. bKash, Nagad and the other aggregators don't publish e-commerce merchant rates on the pages we checked, so ask for the current rate in writing."
   Why: leads with the answer, three figures, a named source, a retrieval date, and an honest "not published" statement that stops a model inventing a number.
2. **ai-agent-cost-small-business, "What does it cost to run an AI agent each month?" (55 words).** "For one example workload of 3,000 conversations a month, AI model fees come to between $5.04 and $216.00 a month depending on the model, at prices listed on October 15, 2026. Add hosting, a vector database and monitoring, and a lean setup lands around $17 a month; a managed one lands around $162 plus €50."
   Why: defined workload, a range with units, dated provider prices (OpenAI, Anthropic, Google pricing pages are linked in the post), nobody else publishes this arithmetic.
3. **shopify-vs-custom-ecommerce, "What does Shopify really cost per month and per order?" (42 words).** "Shopify costs a monthly subscription, plus an extra 2% (Basic), 1% (Grow), 0.6% (Advanced) or 0.2% (Plus) of each order if a third-party provider takes the payment instead of Shopify Payments. That fee sits on top of whatever your payment provider charges."
   Why: the exact plan-by-plan fee table in one extractable sentence, self-contained, linked to Shopify help pages.
4. **mvp-development-cost, "Is hiring an in-house developer cheaper than outsourcing an MVP?" (47 words).** "For a first version, usually not. The Bureau of Labor Statistics counts software developers together with QA analysts and testers, and their US median pay was $134,040 a year ($64.44 an hour) in May 2025. That buys one person with one skill set, before benefits or recruiting."
   Why: a direct yes/no, a government statistic with year, linked to bls.gov; the caveat about the BLS category is stated, which keeps it quotable without overclaiming.
5. **saas-development-cost, "What does it cost to run a SaaS product each month?" (52 words).** "Expect two kinds of running cost: payment and billing fees that grow with revenue, and monthly plans for hosting and tools that start small and grow with usage. For a SaaS with 200 customers on a $50 plan, the published prices below add up to about $531 a month before usage-based charges."
   Why: names the two cost classes, then a worked scenario with a total; Stripe, Vercel, Supabase, Resend and Sentry pricing pages are linked.

Honourable mentions: MVP budget phase split ("About half of an MVP budget pays for development ..."), WordPress ranking-protection capsule (redirect plus 410 plus "keep redirects for at least a year").

### 6b. The 5 weakest capsules, with rewrites

Shared fault in four of the five: the capsule is a thin summary, and the specific, quotable material (formula, worked example, statistic, source) sits in the next paragraph. Rewrite = promote it. Rewrites use only facts already in the same post or the site; bracketed items need founder data.

1. **vibe-coded-app-production-ready, "What can you check in your app today?" (34 words, not self-contained).** Current: "Run the five database checks from earlier, today. Most take minutes, and together they cover the failures that have actually made the news. Then clear the checklist's 'Yes' rows before you take another payment."
   Problem: "from earlier" and "the checklist's 'Yes' rows" mean nothing when the passage is lifted out.
   Rewrite (about 65 words): "Start with five checks, most of which take minutes: every database table has row-level access rules, no secret key appears in browser JavaScript, payment webhooks verify a signature and record each event ID, errors alert a real person, and you have restored a backup at least once. These cover the failures behind the public Lovable and Moltbook incidents, so clear them before you take another payment."
   Check: the five items come from the post's own TL;DR; make sure they match the "five database checks" the closing refers to.
2. **courier-api-integration-bangladesh, "What should you settle before anyone writes courier code?" (56 words, generic).** Current: "Start with the money and the addresses, then the code. Get each courier's rates and API access in writing. Fix your checkout so it collects district and area from a list. Write down your status mapping and who handles returned parcels. With those settled, the choice between a plugin and a custom build is usually obvious."
   Rewrite (about 62 words): "Settle four things before any courier code is written: each courier's rates and API access in writing, a checkout that collects district and area from a list, a mapping from each courier's statuses to your order statuses, and who handles returned parcels. RedX alone lists six delivery types, from regular to partial-return, so returns need their own rules from day one."
3. **courier-api-integration-bangladesh, "How do you reconcile cash on delivery payouts?" (39 words, no figure).** Current: "Match every line of a courier payout to a tracking ID and an order, check the amount against what you expected after the courier's charges, and chase any parcel marked delivered that hasn't been paid by your cut-off date."
   Problem: the formula and the worked example are two paragraphs lower.
   Rewrite (about 62 words): "To reconcile cash on delivery payouts, match every payout line to a tracking ID and an order, then compare it with the expected amount: cash collected, minus the delivery charge, minus the COD charge, minus any VAT. With Steadfast's published 1% COD and risk management charge, a ৳2,000 parcel carries a ৳20 COD charge before VAT and delivery (Steadfast pricing page, October 15, 2026)."
4. **software-maintenance-cost, "How can you lower maintenance costs without adding risk?" (27 words, generic).** Current: "Keep dependencies current in small, regular steps. Automate tests and deploys, remove what you don't use, and document the system so any engineer can pick it up."
   Rewrite (about 65 words): "Keep routine work small: update dependencies a little each month, automate tests on sign-up, checkout and payment webhooks, ship each fix as one merged pull request, and delete plugins you do not use. Patchstack's 2025 data found 91% of WordPress vulnerabilities in plugins, so a short list is cheap insurance. Do not cut monitoring, backups or security updates; they are a small slice of the bill."
5. **wordpress-to-nextjs-migration, "How long does a WordPress to Next.js migration take?" (about 55 words, no figure; the cost heading has the same problem).** Current opens "It depends mostly on how many distinct page templates you have, how many plugins need replacing, and whether there's a store." and the post says "We don't publish a standard week count".
   Rewrite (about 70 words; needs founder ranges): "A WordPress to Next.js migration takes from [N] weeks for a brochure site with a handful of templates to [N] weeks or more for a WooCommerce store with local payment gateways and years of order history. Five things move the number: page templates, plugins to replace, a store, integrations and the size of the redirect map. After launch, Google needs a few weeks to reprocess your old URLs."
   Do the same for "What does a migration cost": a bracketed range in the first sentence. Without a figure, an engine answering "how long / how much" will cite a competitor that gives one.

Next weakest (not rewritten): software-maintenance-cost "What if the software is old or built by someone else?" (28 words). Its best line, "Expect the first year on inherited software to cost more than the 15-20% band", is buried; move it into the capsule.

## 7. Agentic form hygiene (LOCAL, Playwright with `/api/contact` intercepted, nothing sent; desktop 1366 and mobile 390)

| Check | `/contact` | Service quote form | 14 Oct |
|---|---|---|---|
| Required fields exposed | 3 `aria-required="true"` (name, email, message); labels read "Name", "Email", "About the project" (asterisk `aria-hidden`) | 3 native `required`; same labels | Closed (A-5) |
| Honeypot name | `hp_trap`, `autocomplete="off"`, `tabindex=-1`, `aria-hidden`, label "Leave this field empty", positioned at about left -9,800 px | same | Closed (A-8). `company_website` no longer in either rendered page. |
| Honeypot not confusable with a real field | Real company field is `company`; honeypot is non-semantic | n/a | Closed |
| Empty submit | 3 `aria-invalid`, focus on Name; **0 `role="alert"` nodes** found | 3 `aria-invalid`, 3 `role="alert"` messages, focus on Name | Partly (see G-12) |
| Success announcement | `<output>` (role status) "Brief received ...", focus moved into it | `<output>` "Thanks, we're on it ...", focus moved into it | Closed (A-6, A-7). Both viewports. |
| POST body | name, email, message, needs, budget, timeline, company | service, `hp_trap` empty, name, email, message, page | Correct |
| Booking | `cal.com/arrowbin/30min` 200 | linked | Unchanged |

- Source check: `/api/contact` honours `hp_trap` and the old `company_website` and logs the field name of each hit, so a mis-filled honeypot no longer drops a lead silently.
- Dead code: `src/components/sections/HeroLeadForm.tsx` still contains `company_website` (nothing imports it). Delete the file. Low, dev.

## 8. Entity consistency (LOCAL)

| Fact | Schema (Org, WebSite, founder) | llms.txt and llms-full | /about | Footer | Home meta, hero |
|---|---|---|---|---|---|
| Name | Arrowbin | Arrowbin | Arrowbin | "Arrowbin" wordmark | Arrowbin |
| Legal name | Arrowbin LLC | Arrowbin LLC | n/a | (c) 2026 Arrowbin LLC | n/a |
| Founder | Md. Shishir Ahmed, one `#founder` @id | Md. Shishir Ahmed, founder and lead engineer | "Md. Shishir Ahmed, Founder, Arrowbin" | n/a | n/a |
| Founded | `foundingDate: 2020` | Founded: 2020 | "Building since 2020" | n/a | About meta "since 2020" |
| Description | "software development company for startups and SMBs worldwide" | "software development company for startups and SMBs" | "founder-led software development company" (meta) | "Software that moves. Built for companies worldwide." | meta "founder-led software development company"; H1 sr-only "for startups and growing businesses"; hero paragraph and manifesto "software studio ... for ambitious companies / companies that refuse to be boring" |
| Email | hello@arrowbin.com (Org); shishir@arrowbin.com (founder on /about) | hello@arrowbin.com | n/a | hello@arrowbin.com | n/a |
| Location | Dhaka node, "Worldwide" areaServed, no street | "clients worldwide", no offices | no city | two numbers: +8801843596038 and +1 813-421-5874 | n/a |

- **Core identity is consistent:** name, legal name, founder, founding year, "software development company", "clients worldwide" are the same everywhere on site, and the off-page kit's short description is word for word the llms.txt blockquote.
- **Drift (G-7):** "startups and SMBs" vs "startups and growing businesses" vs "software studio / ambitious companies". Phone numbers are formatted differently on site (`+8801843596038`) and in the kit (`+880 1843-596038`), and the kit says "digits must match the site".
- **Conflict (G-8):** home and About show a "15+ Brands shipped for" counter (`src/components/about/AboutHero.tsx:9`) while `/work` lists 8 projects and llms-full.txt lists the same 8. The home counter also says "Retail, agro-export, fashion, fintech and media", and the portfolio has no fintech or media client. "15+ brands" is on the sprint's banned-claims list (`SPRINT-RULES.md` line 31).
- **Off-site disagreement:** GitHub org description "At Arrowbin Digital Agency ..." with `info@arrowbin.com`, location "United States of America", site URL `https://www.arrowbin.com/`; Clutch (per the kit) lists St. Petersburg and Tampa. Both contradict the site.

## 9. Brand mentions and off-site signals

| Signal | Result (15 Oct) | vs 14 Oct |
|---|---|---|
| Wikipedia | MediaWiki search "Arrowbin": 0 hits (suggestion "arrow in") | Unchanged |
| Wikidata | `wbsearchentities` returns `[]` | Unchanged |
| LinkedIn company | `/company/arrowbin` and `/company/arrowbinllc` 404. Founder's personal profile is referenced in `Person.sameAs` (not fetchable) | Unchanged, still open |
| GitHub | API: org `Arrowbin-LLC`, 0 public repos, description "At Arrowbin Digital Agency ...", email `info@arrowbin.com`, location US, blog `https://www.arrowbin.com/` | Unchanged; HTML profile returned 410 to a stdlib request, API is authoritative |
| Reddit | search endpoint 403 to scripted requests | Not checked (blocked) |
| YouTube | no branded channel known; results page is JS-rendered | Not checked in depth |
| Clutch, GoodFirms, Crunchbase | 403 to scripted requests | Not verifiable by curl. The kit says Clutch `arrowbin-0` exists, is unclaimed, 0 reviews |
| Cal.com | `cal.com/arrowbin/30min` 200 | Unchanged |

Off-page kit (`13-sprint-2026-10-15/offpage-kit/`, 6 files): a sound plan and the right order (fix GitHub, LinkedIn company, claim Clutch, ask clients for credits and reviews, then pitches). It scores 0 until executed, because every signal in the table above is unchanged. Strengths: one fact sheet, descriptions identical to the site, bans on paid links and incentivised reviews. Things to fix before the founder pastes anything:
- **Minimum project size.** `profile-facts.md` tells the founder the site says custom software "from $8,000". That is one side of the F5 price conflict; the cost guide says $5,000. Decide F5 first or Clutch will publish a third number.
- **"Free discovery call"** is pasted into the long description and the Google Business text, but the cost guide FAQ says paid discovery (F4).
- **Legal name.** The kit tells the founder to avoid "Arrowbin LLC" until Sunbiz is ACTIVE, but the site, schema and llms.txt already say "Arrowbin LLC". Pick one rule for both.
- **One-line description** in the kit ("founder-led software company") differs from the site's "software development company" by one word. Use the exact site sentence.
- The brand-mention correlations usually quoted for GEO (YouTube about 0.74, Reddit and Wikipedia high, backlinks about 0.27) are third-party figures, not Arrowbin measurements; treat them as direction only. The practical gap is: zero branded YouTube, zero Reddit presence evidence, no Wikidata entity.

## 10. Findings

Severity: Critical / High / Medium / Low / Info. "Visual" = needs founder visual sign-off.

### G-1 High, OPEN (founder, 10 minutes): Cloudflare 403 on GPTBot, ClaudeBot, CCBot, anthropic-ai, Amazonbot, Bytespider
- Evidence: section 3a. Identical to 14 Oct and 1 Oct. robots.txt (live and local) says Allow; the local robots.txt comment says `ai-train=yes`.
- Impact: no inclusion in OpenAI, Anthropic, Common Crawl or Amazon training data. Search and user agents are unaffected, so ChatGPT search, Claude search and Perplexity can still cite the site.
- Fix: one policy. Option 1: Cloudflare AI Crawl Control / Block AI bots, set those agents to Allow (prefer verified-bot signal). Option 2: keep the block, add `Disallow: /` for GPTBot, ClaudeBot, CCBot, anthropic-ai in robots.txt and change the comment to `ai-train=no`.
- Fail test: `curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.3; +https://openai.com/gptbot" https://arrowbin.com/` is still 403 (option 1), or robots.txt still says Allow for GPTBot (option 2).
- Founder-gated (D2): listed under "Founder-gated". Kept High because the contradiction ships with the deploy.

### G-2 High, OPEN (dev): the sprint is not live
- Evidence: LIVE 404 for `/blog/vibe-coded-app-production-ready`, `/blog/saas-development-cost`, `/llms-full.txt`, `/.well-known/security.txt`; live sitemap 19 URLs vs 29 local; live robots.txt still has `Claude-Web`, no `Content-Signal` comment, `Allow` before `Disallow`.
- Fix: deploy the local build, then run `verify-live.sh` section 9 and the curls in the agent log.
- Fail test: `curl -s -o /dev/null -w "%{http_code}" https://arrowbin.com/llms-full.txt` is not 200.

### G-3 High, OPEN (founder, 1 to 2 days): off-site entity is empty
- Evidence: section 9. Every probe matches 14 Oct.
- Fix: execute `offpage-kit/README.md` week 1 (GitHub org fix, LinkedIn company, Clutch claim), then send URLs to dev for `sameAs` and `site.socials`.
- Fail test: `/company/arrowbin` still 404; GitHub org description still says "Digital Agency".

### G-4 Medium, OPEN (founder, then dev): price and timeline conflicts are now machine-visible in one file
- Evidence: `raw/local-llmsfull.txt` contains "$8,000 ... to $75,000+" (custom FAQ), "$12,000 to $40,000" (mobile FAQ), "$30,000 to $90,000" standard MVP (timeline guide FAQ), "$40,000-$120,000" polished MVP (MVP and SaaS guides) and "$5,000-$250,000+" (cost guide). The cost guide TL;DR "$30,000-$120,000" vs body "$40,000-$120,000" persists (editor F1). Timelines: simple MVP 4 to 10 / 6 to 8 / 6 to 12 weeks (F3).
- Impact: an LLM that ingests llms-full.txt, or retrieves two Arrowbin pages for one question, gets contradictory figures and either hedges or drops Arrowbin as a source.
- Fix: founder answers F1 to F5 once; dev updates `services.ts`, cost guide TL;DR and the MVP FAQ so one band per scope exists; llms-full follows automatically.
- Fail test: `grep -o '\$[0-9,]*' llms-full.txt` shows more than one lower bound for "simple/lean MVP" or "focused tool".
- Founder-gated (F1 to F5); new evidence is the single-file exposure.

### G-5 Medium, OPEN (dev or founder): three core guides have no primary sources
- Evidence: external sources: cost guide 1 (Stack Overflow survey), choose guide 0, MVP timeline guide 0, against 6 to 23 on each new guide.
- Fix: add 4 to 6 dated primary sources per core guide, as the new posts do, or keep every number labelled "Arrowbin estimate" (the cost guide already does).
- Fail test: `grep -o 'href="https://[^"]*"'` on the post HTML, excluding arrowbin.com, cal.com and share links, returns under 4.

### G-6 Medium, OPEN (founder numbers): numeric-intent headings without a figure
- Evidence: 2 of 14 such headings in the new posts, both in `wordpress-to-nextjs-migration` ("How long ..." and "What does ... cost, and what drives it?"). By design the post publishes no ranges.
- Fix: rewrite 5 in section 6b once the founder supplies ranges; bracketed.
- Fail test: those capsules still contain no digit.

### G-7 Low to Medium, OPEN (founder voice, visual): the one-sentence company description drifts
- Evidence: section 8 (startups and SMBs / growing businesses; company / studio / "refuse to be boring").
- Fix: choose one descriptor and use it in site.description, H1 sr-only, hero paragraph, manifesto lead and the kit. Hero and manifesto copy need visual and voice sign-off.
- Fail test: `grep -ri "software studio" src/` still matches while schema says "software development company".

### G-8 Medium, OPEN (founder, dev): "15+ Brands shipped for" vs 8 listed projects
- Evidence: counter in `AboutHero.tsx:9` and on the home page; `/work` shows 8; the sprint rule bans the claim in new copy.
- Fix: replace with a verified number or "8 live sites"; or remove the counter. Visual sign-off for the text swap.
- Fail test: `curl -s localhost:3117/about | grep -c '15+'` is not 0.

### G-9 Info: Content-Signal as a comment
- Verdict and caveats in section 3c. No change required beyond making the comment truthful (G-1).

### G-10 Low, OPEN (dev): llms.txt polish
- Dedupe the services list; add a phone/WhatsApp line and a time-zone note beside the booking link; add a sentence in the llms-full header saying guides are summarised, not complete.
- Fail test: `grep -c "Custom Software Development" llms.txt` is above 2.

### G-11 Low, OPEN (dev, visual): home H1 duplicate visual text
- Section 5. Carry-over from 14 Oct.

### G-12 Low, OPEN (dev): contact form error semantics
- Evidence: `/contact` empty submit has 3 `aria-invalid` fields but 0 `role="alert"` nodes; the service form has 3 `role="alert"`. Error text is presumably tied by `aria-describedby`, not announced.
- Fix: mirror ServiceQuoteForm's alert pattern. No visual change.
- Also delete the dead `HeroLeadForm.tsx` (it still uses `company_website`).
- Fail test: Playwright after empty submit on `/contact` finds no `[role=alert]`.

### G-13 Low, OPEN (dev, no visual change): publication dates are plain text
- Evidence: `<time>` count is 0 in the main of all 13 posts; dates exist as text ("Published October 15, 2026 · Updated ...") and in JSON-LD.
- Fix: wrap in `<time datetime="2026-10-15">`.
- Fail test: `grep -c '<time' post.html` is 0.

### G-14 Low, Info: ten posts share one publication date
- All 10 new posts are "Published October 15, 2026" with `dateModified` the same day. Normal for a launch; do not backdate. From now, bump `updated` only when a figure changes.

### Carried items still open from 14 Oct (unchanged, not re-scored as new)
- RSL licensing: none. Skip.
- Markdown delivery (`/page.md`, `Accept: text/markdown`): absent. Optional (agentic A-9).
- WebMCP, ai-catalog.json: absent. Correct for now (A-12).
- Wikidata entity: not creatable until notability sources exist.

## 11. Founder-gated (listed, not re-raised as new)

| Item | State | New evidence |
|---|---|---|
| D2 training policy / Cloudflare AI bots | Open; robots.txt now carries `ai-train=yes` in a comment | Edge status identical on 15 Oct |
| D3 Sunbiz / "Arrowbin LLC" | Open | Site says "Arrowbin LLC" in 4 places; kit says avoid it until ACTIVE |
| D4 price bands in llms.txt | llms.txt has none | llms-full already prints the conflicting ranges |
| D7 phone, D8 address | Open | Footer prints two numbers with no location label |
| F1 to F5 price conflicts, F3 timelines, F4 free vs paid discovery, F6 to F9 | Open | G-4 |
| LinkedIn company, Clutch claim, Crunchbase, GoodFirms | Open | G-3 |
| Pathao API details, RedX docs access | Open | Courier post stays at 6 sources |

## 12. Top 5 changes by impact

1. **Deploy the local build** (G-2). Dev, S. Worth about +19 points on the live score by itself.
2. **Decide the training-bot policy and make edge, robots.txt and the comment agree** (G-1). Founder, 10 minutes. About +3 and removes a self-contradiction.
3. **Answer F1 to F5 once and let one price band propagate** (G-4). Founder 30 minutes, dev S. Protects the strongest citable content.
4. **Create the LinkedIn company page, claim Clutch, fix the GitHub org** (G-3). Founder, 1 to 2 days. The authority dimension is the lowest at 30 and moves nothing else.
5. **Rewrite the five weak capsules and add figures to the two WordPress headings** (section 6b, G-6). Dev S plus founder ranges. Raises citability; no visual change.

## 13. Not checked

- Live ChatGPT, Perplexity or Gemini answers for branded and category prompts (no DataForSEO call, no live-chat tool run). Platform scores are estimates.
- The real GPTBot/ClaudeBot by verified IP; Cloudflare dashboard (Security > Events, AI Crawl Control).
- Reddit, YouTube, Clutch, GoodFirms, Crunchbase content (403 or JS-rendered to scripted requests).
- Bing Webmaster Tools / IndexNow state (Copilot score is an estimate).
- Trafilatura boilerplate-stripped extraction (stdlib parser used instead; word counts include nothing from scripts or styles).
- Lighthouse beyond the `robots-txt`, `is-crawlable` and `document-title` audits (no Agentic Browsing category in Lighthouse 12.8.2; the 14 Oct mobile CLS item A-1 was not re-measured here, it belongs to the performance area).

## 14. Evidence

All in `docs/seo/14-audit-2026-10-15/findings/raw/`: `live-ua-matrix.txt`, `live-robots.txt`, `local-robots.txt`, `local-llms.txt`, `local-llmsfull.txt`, `local-security.txt`, `local-sitemap.xml`, `sitemap-urls.txt`, `html/*.html` (29 pages), `post-metrics.json`, `post-sections.json`, `lh-geo-robots.json`.

## Summary

AI Search Readiness is **69 / 100 on the local build against 55 projected on 14 Oct, and 50 / 100 live, unchanged, because nothing from the sprint is deployed and Cloudflare still returns 403 to GPTBot, ClaudeBot, CCBot, anthropic-ai, Amazonbot and Bytespider while every search and user agent gets 200.** The sprint closed most of the on-site list: no hidden Suspense blocks on any of 29 pages, a valid and much richer llms.txt with booking and brief links, a new llms-full.txt, security.txt, a Disallow-first robots.txt that passes Lighthouse, a renamed honeypot, required fields and success announcements that work on both forms, and ten well-sourced question-led guides whose best capsules (payment gateway fees, AI agent running costs, Shopify per-order fees, BLS developer pay, SaaS monthly costs) are strong citation candidates. The Content-Signal comment is a defensible trade for a Lighthouse pass, provided the comment stops claiming training is welcome while the edge blocks it. What holds the score down is outside the code: the off-site entity is still empty (no LinkedIn company, no Wikidata, a GitHub org that says "Digital Agency"), the price and timeline conflicts between pages now sit side by side in llms-full.txt, three core guides carry no sources, a "15+ brands" counter contradicts the eight projects on /work, and five answer capsules bury their best fact one paragraph down (rewrites in section 6b).
