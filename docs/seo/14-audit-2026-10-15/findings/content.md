# Content quality and E-E-A-T re-audit: arrowbin.com (15 Oct 2026)

Measured: the local production build at http://localhost:3117 (all 27 pages fetched, all 200). Live https://arrowbin.com is still build 959866d and was used only for one edge test (GPTBot user agent, see N-5). Baseline: docs/seo/12-audit-2026-10-14/content.md. No source edits, no builds, no git.

Method: rendered HTML and JSON-LD fetched with Python stdlib; `ai_tells.py` run on all 10 new post files and `blog.ts`; `boilerplate_share.py` run against :3117; I read all 10 new post sources in full, the cost guide's change log, the homepage, /about, /work, and the custom-software and maintenance service pages in full. External figures were opened with curl (WebFetch is not available in this session) and compared to the post text.

## Not checked (stated up front)

- Flesch readability was not computed. Sentence-rhythm metrics from `ai_tells.py` are used instead.
- Full prose of /contact, /blog index, /privacy, /terms, the /services hub, and six of the eight service pages (ecommerce, mobile, SaaS, UI/UX, AI, cloud). For those I have word counts, price strings, boilerplate share and hero text only.
- The five 14 Oct placeholder metric strings were grepped on the homepage and /work only (absent), not on the service pages.
- Whether `public/blog/saas-development-cost/first-year-cost.svg` was corrected after the editor flagged it (editor-report section 7).
- The cloud FAQ "20 to 40%" and mobile "30 to 40%" claims (editor flag F9): not re-read this run.
- My own banned-word and cross-post duplication scans did not complete (script error). The project linter result below covers banned words per post; cross-post repetition is from reading, not measured.
- HTML entity forms of em dashes (&mdash;) were not searched. Literal U+2014 count is 0 on all 27 pages.

## Scores

| Score | 14 Oct live | 14 Oct local | 15 Oct local (this audit) | Reason |
|---|---|---|---|---|
| Content Quality | 55 | 66 | **76 / 100** | Ten sourced, well-written posts and a fixed boilerplate problem. Held back by fabricated-looking testimonials (founder decision), unverified homepage claims, open price conflicts, and no first-party outcome data. |
| AI citation readiness | 66 | 69 | **84** | Answer-first TL;DRs and H2 answers, tables, 12 to 13 original diagrams per post, dated figures, 6 to 29 primary-source links per post. Held back by price conflicts and the longest TL;DRs. |

Live stays at 55 until the build is deployed.

E-E-A-T (weights Exp 20, Expertise 25, Authority 25, Trust 30):

| Factor | 14 Oct local | 15 Oct local | Evidence |
|---|---|---|---|
| Experience | 52 | 60 | Posts describe process in the first person and cite verifiable own work: client checkout footers (PAY), own 410 and 308 setup (WP), own GPTBot 403 (GPT, reproduced on live today), "we don't have a Shopify store in our public portfolio" (SHOP). No case study, no client outcome, every worked example is labelled illustrative. |
| Expertise | 55 | 74 | Technically precise (bKash Execute/Query flow, SSLCommerz IPN validation, RLS checks, Next.js 308 vs 301, Proxy limits). Arithmetic in the posts checked out (see scorecard). Founder named on every post with Person schema (jobTitle, image, LinkedIn). No visible bio box on posts. |
| Authoritativeness | 30 | 40 | Heavy primary-source citation helps. Still no third-party reviews, press, Clutch or Google profiles. |
| Trust | 45 | 52 | Estimates are labelled "Arrowbin estimate", dates are stamped, unverifiable things are admitted ("wouldn't load for us", "we couldn't find a public Nagad developer portal"). Offset by 3 placeholder testimonials, "15+ brands", and price conflicts. |
| Weighted | 46.9 | **56.1** | |

## What works

- **Boilerplate is fixed (M-8).** Repeated-line share across the 8 service pages is now 5.0 to 10.5% of lines and 3.6 to 8.0% of words, against 33 to 49% on 14 Oct. Target was under 25%. Page by page (lines% / words%): custom 5.7/3.6, ecommerce 5.0/3.6, mobile 9.3/7.6, SaaS 10.5/8.0, UI/UX 10.0/7.9, AI 8.8/4.9, cloud 9.1/4.6, maintenance 5.7/4.0. The "Three ways to start" blocks are now tailored per service (checked on custom and maintenance).
- **AI-writing tells are low on the new posts.** `ai_tells.py` returns INFO only (no HARD, no WARN) on all 10: sentence-length sd 7.9 to 10.4 (target 8+; two posts sit at 7.9), short sentences 19 to 28% (target 15%+), triplets 0.3 to 3.5 per 1,000 words (limit 4), contractions 15.6 to 28.1 per 1,000. Reading them, they sound like an engineer with opinions: "I'd pick Shopify over it" (SHOP), "I don't think per-outcome pricing is a rip-off" (AI), "Almost right is fine for a landing page. It isn't fine for a permission check." (VIBE).
- **Sourcing is real.** About 124 post-to-source links across the 10 posts. None returned 404 or 410. The blocked ones were BLS (403 to curl) and, intermittently, Shopify Help (403, then 200 on retry). Every figure I could open matched (scorecard below).
- **Honest hedging.** Single-vendor data is flagged as such (Profound/SEJ in GPT, Wavect "directional" in MAINT). Arrowbin numbers are tagged "Arrowbin estimate" or "illustrative". Competitor-friendly advice appears (SHOP: "Shopify is the sensible default").
- **Fixes from 14 Oct confirmed in the rendered pages:** "A real example" is now "Worked example ... an illustrative model, not a specific client project" (H-3 fixed); the rate table is labelled "Arrowbin estimate" (H-4 mitigated); the manifesto text no longer doubles in raw text; no em dashes anywhere; the cost guide now shows "Published May 12, 2026 . Updated October 15, 2026".
- **Internal linking.** New posts show 3 to 7 other-blog links each; service pages now carry "Read before you build" guide cards (custom links to the vibe, cost and choose guides; maintenance links to the maintenance and WordPress guides). CTA cards are varied (editor report).
- **Structured data:** every post emits BlogPosting with Person author (name, jobTitle, image, url /about, sameAs LinkedIn), FAQPage, BreadcrumbList, datePublished and dateModified.

## Per-post scorecard

Words = prose words in the source file (from `ai_tells.py`); rendered main-column counts including FAQ and related cards are higher (4,724 to 5,974). E-E-A-T and human-voice are 1 to 5, my judgement. Sources: "ok" = figure found on the cited page and matching the post; "failed" = page opened but figure missing or different; "not checked" = page would not open or render for curl.

| Post | Words | Sources checked ok / failed / not checked | E-E-A-T | Voice | Top fix |
|---|---|---|---|---|---|
| ai-agent-cost-small-business | 4,352 | 8 / 0 / 0 (Intercom $0.99 per outcome; Hostinger KVM 1 $6.49 renewing $11.99; n8n Starter 20 EUR, 2.5K executions; OpenAI gpt-6-luna $0.10/$0.50 and gpt-6.1-sol $2/$10; Gemini 3.6 Flash $0.75 rising to $1.50 on Jan 1 2027; FRBSF "nearly 40%"; Census 17 to 20% and 37%; Anthropic Sonnet 5.5 $2/$10 text present). Sums re-derived: $108, $72+$36 ok. | 4 | 4 | Add a review-by date: Gemini 3.6 Flash doubles on Jan 1 2027 and the whole fee table ages fast. If a real pilot exists, add one anonymised number. Add an in-post partner disclosure for Hostinger (L-4). |
| chatgpt-shopping-for-online-stores | 4,349 | 5 / 0 / 0 (SEJ/Profound 8.26% to 61.54%, 65%; Vercel "none of the major AI crawlers currently render JavaScript"; TechCrunch "use their own checkout experiences"; Cloudflare defaults Sept 15 2026; own-site GPTBot 403 reproduced on live). Vercel page does not show the "December 17, 2024" date the caption cites. | 4 | 4 | Fix the Cloudflare GPTBot rule on arrowbin.com, then rewrite the "we've caught it on our own site" paragraph (N-5). Shorten the 4-sentence, roughly 120-word TL;DR. |
| courier-api-integration-bangladesh | 3,965 | 2 / 0 / 2 (Steadfast 1% COD, 80 Tk minimum, 500-order upload and Delivery Risk Check ok). RedX developer page is JS-rendered (curl got ~1 character): endpoints, 8 statuses and sandbox URL not checked. Pathao sign-in claim not checked. | 3 | 4 | Have someone open the RedX docs in a browser and confirm the 8 statuses, `/parcel/info` and the weight unit. Add one real integration artifact (screenshot of an order screen or a payout import) or state the guide is docs-based. |
| mvp-development-cost | 3,672 | 11 / 0 / 2 (CB Insights 431, 43%, 70%; Bubble $29/$32; Lovable $25; Apple $99; Google Play $25; Vercel $20; Sentry $26; Stripe 2.9% + 30c). BLS pages returned 403: $134,040 and 30.0% not checked. Arithmetic ok ($4,300/week, $36k, $191k, $850/yr). | 3 | 4 | Founder to settle F2/F3 (6 to 8 week lean MVP vs 4 to 10 in COST, "standard MVP" $30k to $90k in TIME). Verify BLS figures in a browser. |
| payment-gateway-integration-bangladesh | 4,233 | 4 / 0 / 1 (SSLCommerz Tk 25,500 non-refundable, 2.5%, 3.5% AMEX; bKash refund docs 10 partial refunds, 60 days; Shopify Payments list has no Bangladesh; Stripe n/a). Bangladesh Bank MFS page returned ~300 characters: 2,392.40 lakh and 871.54 lakh not checked. | 4 | 4 | Founder to re-confirm the Silent Lifestyle, FlexOver and gte goyna checkout details quoted from live footers, and the SSLCommerz renewal terms (writer's open flag). Check the MFS figures in a browser. |
| saas-development-cost | 4,036 | 9 / 0 / 1 (Stripe 2.9% + 30c, Billing 0.7%, $620/month, Meters 100M; WorkOS $125; Resend $20/50,000; Sentry $26; Vercel $20; Stripe global: Bangladesh absent, India Preview). Supabase Team $599 not checked. Arithmetic ok ($531 total, $2.10 per $50, 4.2%). | 3 | 4 | Confirm the first-year-cost.svg now says "$74,000 to $77,000" (editor flagged the old $75,400 to $78,400 figure; not checked). |
| shopify-vs-custom-ecommerce | 3,919 | 8 / 1 drift / 1 (Shopify pricing $25/$65/$399, yearly $22/$58/$359, Plus $2,300; SSLCommerz 2.5%/3.5%; Patchstack 11,334 and 91%; Shopify Payments list lacks Bangladesh). W3Techs: post says 40.0% (data Oct 14), page today says 39.7%. "41 entries" not checked. 3-year table and $142k crossover re-derived and correct ($7,992, $5,688). | 4 | 5 | Say "about 40%" (or date-stamp and refresh) for WordPress share. Strongest post for voice and honest trade-offs. |
| software-maintenance-cost | 4,064 | 8 / 0 / 2 (Patchstack 11,334, 42%, 46%, 91%; Wavect 24/21/26% and "directional"; PostgreSQL 14 final release Nov 12 2026 and 15 on Nov 11 2027; Android API 36 and Nov 1 2026 extension). BLS 403: not checked. 16 to 21 years of upkeep claim re-derived. | 3 | 4 | Add a dated "next review" line: the whole deadline table is time-bound. Verify BLS in a browser. |
| vibe-coded-app-production-ready | 3,734 | 6 / 0 / 0 (Palmer 170 of 1,645, 303 endpoints, 10.3%; Wiz 1.5M tokens, 35,000 emails; Veracode 45%, 86%; Stack Overflow 84/46/66/33; OWASP 2025 and Supabase/Firebase/Lovable/Stripe docs load). | 4 | 4 | Founder to confirm the offered "read-only review of your repo" exists and is priced or free (F8). Nothing else blocks it. |
| wordpress-to-nextjs-migration | 4,109 | 6 / 1 drift / 0 (HTTP Archive WordPress 45%, Duda 85%; W3Techs 58.5%; Next.js 1,024 redirect cap and 308; Patchstack). W3Techs "40.0%" vs 39.7% today. | 4 | 4 | Founder to confirm arrowbin.com's history ("a WordPress site and, later, a marketplace") and "every live site in our portfolio" (writer's open flag). Say "about 40%". |
| how-much-does-custom-software-development-cost (core) | ~3,550 rendered | not checked (7 external links) | 3 | 3 | Founder to pick F1: TL;DR says $30,000 to $120,000, body says $40,000 to $120,000. |
| how-to-choose-a-software-development-company (core) | ~2,730 rendered | not checked (6 external links) | 3 | 3 | Edited Oct 15 but dateModified still 2026-06-18 (deliberate per A4; revisit). |
| how-long-does-it-take-to-build-an-mvp (core) | ~2,630 rendered | not checked (6 external links) | 3 | 3 | TIME FAQ "standard MVP $30,000 to $90,000" conflicts with MVP$ and COST ($40,000 to $120,000 polished). dateModified still 2026-06-16. |

Totals across the 10 new posts: 67 figure groups matched their sources, 0 mismatched, 2 drifted (the same W3Techs 40.0% vs 39.7% in SHOP and WP), and 9 could not be checked from here (BLS in MVP$ and MAINT, Bangladesh Bank MFS, RedX docs, Pathao docs, Supabase Team, Shopify "41 entries", and two further RedX/BLS items listed in the table). Where a source failed to open I did not assume correctness. The three core guides' external links were not checked.

Core guides vs new posts (from `ai_tells.py` on `blog.ts`): contractions 6.1 per 1,000 words (new posts 15.6 to 28.1), triplets 85 total or 11.5 per 1,000 (still WARN, limit 4). The three core guides read stiffer than the new posts, which is visible side by side on the blog index.

## Findings

Status uses the 14 Oct IDs where one exists. "Visual sign-off" is whether the change alters how a page looks.

### Critical

None new. C-1 below stays Critical by 14 Oct's rating but is founder-gated.

### Founder-gated (do not re-raise; listed with current state)

**C-1 Placeholder testimonials. OPEN, founder decision to keep.** Sarah Mitchell, David Chen, Rafiul Islam are still on `/` ("Page loads dropped dramatically and sales followed" with no client). One risk note, not re-argued: fabricated reviews and testimonials are covered by the FTC rule on fake reviews (16 CFR Part 465); not legal advice. Owner: founder. Visual sign-off: yes if removed.

**M-1 Conflicting prices. OPEN (F1 to F5, F7).** Current strings, local build:
- `/`: smaller builds start "$5,000 to $10,000".
- `/services` and custom software FAQ: "$8,000 for a focused tool to $75,000+".
- Mobile FAQ: "polished MVP $12,000 to $40,000". AI page and AI post: "$10,000 to $15,000 including a year of running costs" (consistent).
- Ecommerce, UI/UX, cloud, maintenance, /work, /about: no price. /contact budget bands: under $5k, $5k to $15k, $15k to $50k, $50k+.
- Blog: lean MVP $5,000 to $30,000, mid-size $30,000 to $90,000, polished MVP $40,000 to $120,000, SaaS $80,000 to $200,000, mobile and enterprise from $50,000.
- COST TL;DR "$30,000 to $120,000" vs body "$40,000 to $120,000"; TIME FAQ "$30,000 to $90,000" for a standard MVP.
Within the 10 new posts the numbers are now mutually consistent (SAAS maintenance mismatch resolved by the editor). The remaining conflicts are service-page FAQs and the two older posts. Owner: founder (numbers), then dev.

**F4, F8, F9 (discovery paid or free; offers; unsourced percentages):** unchanged, see editor-report.md.

### High

**H-2 No third-party proof. OPEN.** No Clutch, Google, press or award links on any page; posts are authoritative about sources but the business itself has no external validation. Fix: create and link profiles, then use the A6 off-page kit. Owner: founder. Visual sign-off: yes (new badges).

**N-1 NEW. Ten near-identical posts published on one date by one author.** All ten carry datePublished and dateModified 2026-10-15, the same Person author, the same skeleton (TL;DR, about ten question H2s, a CTA after the first third, 12 to 13 SVGs, a "Which X should you ...?" closing H2, 8 FAQs), and 4,000+ words each. The 2025 and 2026 quality guidelines describe repetitive structure across pages as a marker of scaled content, and the text itself is good, so the risk is the pattern rather than the prose. Fix, in order of preference: publish in two or three waves of 3 to 4 posts over several weeks (set `date` to the real publish day, not backdated); keep the CTA and closing patterns varied (editor already did); add something no template produces, such as one original data point per post (see N-2). Owner: founder (schedule) and dev. Visual sign-off: no.

### Medium

**N-2 NEW. Experience signals are process and public-docs only.** Strong: client checkout footers (PAY), own 410 and 308 rules (WP), own GPTBot 403 (GPT), "we don't have a Shopify store in our public portfolio" (SHOP). Missing: any measured outcome from a real project. Every worked example (the $60,000 SaaS MVP, 3,000-conversation agent, 400-order gateway) is explicitly illustrative, which is honest but means no post contains data a competitor could not reproduce from the same price pages. Sprint rules forbid invented anecdotes, so this needs real material. Fix: one anonymised real number per post, only if the founder has it (for example, actual weeks and cost of one portfolio rebuild; median time to fix a courier webhook issue). Owner: founder. Visual sign-off: no.

**M-6 Founder and team E-E-A-T thin. OPEN, small improvement.** Posts show "Md. Shishir Ahmed, Founder, Arrowbin" and the Person schema is complete, but no post has a visible bio box, credentials or years, and /about has one line plus one quote (655 words, unchanged from 654). "Senior team" and "senior engineers" are still asserted with no named engineers. Fix: a 60 to 80 word bio block at the foot of each post (since 2020, what he has built, LinkedIn) and a short founder section on /about. Owner: founder (content), dev. Visual sign-off: yes.

**M-9 Unverified homepage and work claims. OPEN.** Still present: "15+ brands shipped for ... fintech and media, across several countries" (home and /about; /work shows 8 projects plus 7 named others, 15 total, only Rize Capital is fintech-like), "Cash-on-delivery ordering live nationwide" (home and /work), "Fixed estimates" and "6 to 12 weeks" as universal promises. Sprint rule 11 lists "15+ brands" and "live nationwide" style claims as ones not to repeat, yet they remain on two pages. Fix: soften ("15+ projects"), delete "nationwide", or document. Owner: founder, dev. Visual sign-off: no (text only).

**N-5 NEW. GPT post publishes an edge failure on our own site.** The post says GPTBot's user agent got a 403 from Cloudflare "in our October 2026 audit". I reproduced it on live today: `GPTBot` user agent returns 403 on https://arrowbin.com/ and 200 on :3117; `OAI-SearchBot/1.0` returns 200 on both. The honesty is a strength, but the post and the site contradict each other (robots.txt welcomes eleven AI crawlers while the edge blocks GPTBot), and the paragraph will be false the day the rule is fixed. Fix: change the Cloudflare rule (or decide to keep it and say so in the post), then reword to "we found this in our October 2026 audit and fixed it on <date>". Owner: founder (Cloudflare), dev (post text). Visual sign-off: no.

**H-5 Proof relevance. MITIGATED, still open in substance.** Proof headings were relabelled honestly ("Related web builds, live today", "Web platforms we've shipped", "Websites and stores by the same team"). That removes the false-claim risk. The mobile, SaaS and AI pages still show website cards, not mobile, SaaS or AI products. Owner: founder (supply real projects).

### Low

**N-3 Source-check gaps.** BLS (two URLs, used in MVP$ and MAINT) returns 403 to non-browser clients; Bangladesh Bank MFS and RedX developer docs do not render without JavaScript; Pathao docs need a login. A person with a browser should confirm: BLS $134,040 and 30.0%; MFS 2,392.40 lakh, 871.54 lakh, Tk 6,922.67 crore merchant payments; RedX's 8 statuses, `/parcel/info`, charge-calculator fields. Owner: founder or dev with a browser.

**N-4 Stat blocks reused across posts.** The Patchstack numbers (11,334; 91%; 42%; 46%; 5 hours) appear in near-identical sentences in WP, MAINT and SHOP; the BLS salary and 30.0% benefits calculation in MVP$ and MAINT; the Stripe fee math in SHOP, SAAS and MVP$. Accurate, but reading three posts back to back it shows. Fix: keep the full statement in one post and link to it from the others, or vary the angle. Not measured with a duplicate scan (see Not checked). Owner: founder (edit). Visual sign-off: no.

**N-6 TL;DR length.** By my read the TL;DRs run roughly 90 to 125 words (GPT, SAAS, AI the longest), above the 2 to 4 short sentence guide intent and longer than an answer engine would likely quote whole. Fix: lead with a one-sentence verdict of about 40 words and move the numbers to the next sentence. Owner: founder. Visual sign-off: no.

**N-7 W3Techs share drifts.** SHOP and WP say 40.0% of all websites; the cited page today says 39.7% (and 58.5% of known CMS). Fix: "about 40%". Owner: dev.

**N-8 dateModified.** CHOOSE and TIME were edited on 15 Oct (links, CTAs, FAQ text) but still show dateModified 2026-06-18 and 2026-06-16. A4 left this deliberately. Material edits are small, so this is defensible; revisit when prices are unified. Owner: dev.

**N-9 Core guide voice.** See contractions and triplet figures above. The three older guides are the weakest remaining "AI-shaped" content next to the new posts. Rewrite after the founder settles F1 to F3 so the work is done once. Owner: founder. Visual sign-off: no.

**N-10 Partner disclosure in post.** The AI post says "Hostinger, which we partner with" and recommends its $6.49 plan. /about discloses the commission; the post does not. If the link earns a commission, add one sentence. Owner: founder. Visual sign-off: no.

**M-5 Doubled raw text. PARTLY FIXED.** The manifesto no longer doubles in extracted text. The stats strip still extracts as "15+15+", "0808", "6-126-12", "100%100%" with my method (the same method used on 14 Oct, which does not honor `aria-hidden`; the page has 94 aria-hidden nodes, so assistive tech may be fine). Raw-text crawlers that ignore aria-hidden still see doubles. Owner: dev. Visual sign-off: no.

**L-5 Brand descriptor drift. OPEN.** Title and H1 say "software development company"; hero and manifesto say "software studio"; /about says "software company". Owner: dev, founder.

**L-1 AI-typical phrasing on non-post pages. IMPROVED, not comparable.** Counts across home, about, work, services, contact and the 8 service pages (different page set from 14 Oct, so indicative only): "actually" 5, "honest" 5, "senior team" 4, "not just" 3, "Here's" 8, "sweet spot" 1, "whisper" 1 (14 Oct, site-wide: 31, 12, 22, 8, 16, 3, 1). Residual examples: "Off-the-shelf is the right call more often than agencies admit. Here is how we help clients decide, honestly." (custom page), "Numbers that don't whisper" (home).

### Info

- **Fixed since 14 Oct:** M-8 (boilerplate), H-3 ("worked example"), H-4 (rates labelled as estimates), manifesto doubled text, C-2 placeholder metrics (checked home and /work only), M-2/H-1/L-3 titles and descriptions (not re-measured; owned by the on-page specialist).
- **Word counts (raw, local):** `/` 1,229; /services 752; custom 1,917; ecommerce 1,559; mobile 1,469; SaaS 1,590; UI/UX 1,428; AI 1,535; cloud 1,403; maintenance 1,438; /work 509; /about 655; /contact 521; /blog 1,015. All service pages are above the 800-word floor; unique copy per page is now about 90 to 96% of the main column by the boilerplate tool.
- **Freshness:** new posts "Published October 15, 2026" only; cost guide shows Published May 12, Updated Oct 15. Time-bound content to schedule for review: AI model prices (Jan 1 2027), platform deadlines (MAINT), Cloudflare defaults and OpenAI merchant program status (GPT). Suggest a quarterly review date printed in each post.
- **Em dashes:** literal U+2014 count is 0 on all 27 fetched pages.

## Priority order

1. Decide F1 to F5 (prices) and publish them once in a single data file; this removes the biggest Trust drag. (Founder, then dev.)
2. Fix the Cloudflare GPTBot rule and reword the GPT paragraph (N-5).
3. Schedule the ten posts in waves (N-1) and add one real data point per post where the founder has it (N-2).
4. Soften or document "15+ brands" and "live nationwide" (M-9).
5. Add an author bio block and founder section (M-6).
6. Browser-verify the unchecked sources (N-3) before deploy.
7. Rewrite the three older guides after the numbers are settled (N-9).

## Summary

On the local build, Content Quality is 76/100 (14 Oct: 55 live, 66 local), with E-E-A-T at 56 (47 before) and AI citation readiness at 84 (69 before). The 10 new posts are the main gain: each is 3,700 to 4,400 prose words, answer-first, sourced to primary pages, with consistent numbers across the set; 67 figure groups I could open matched their sources (none mismatched) and the arithmetic I re-derived was right; the AI-tells linter returns no warnings and they read like an engineer with opinions rather than a template. Service-page boilerplate fell from 33 to 49% to 5 to 10.5%. What still caps the score is not prose quality: the three placeholder testimonials (founder decision, kept), "15+ brands" and "live nationwide" claims, service-page prices that still disagree with the cost guides, no third-party proof, a thin founder bio, no first-party outcome data in any post, and the risk that ten same-day, same-skeleton posts read as scaled content. Nine items could not be verified from here (BLS, Bangladesh Bank, RedX and Pathao docs, Supabase Team) and are marked "not checked" rather than assumed correct.

## Structured findings (Content Quality)

```json
{"category":"Content Quality","date":"2026-10-15","target":"http://localhost:3117","scores":{"live_unchanged":{"content_quality":55},"local":{"content_quality":76,"eeat":56,"ai_citation":84,"eeat_breakdown":{"experience":60,"expertise":74,"authoritativeness":40,"trust":52}}},"em_dashes_visible":0,"boilerplate_share_lines_pct":{"min":5.0,"max":10.5},"findings":[
{"id":"C-1","status":"OPEN","gate":"founder"},{"id":"C-2","status":"FIXED-LOCAL","note":"checked home and work only"},{"id":"H-1","status":"FIXED-LOCAL"},{"id":"H-2","status":"OPEN"},{"id":"H-3","status":"FIXED-LOCAL"},{"id":"H-4","status":"MITIGATED"},{"id":"H-5","status":"MITIGATED"},{"id":"M-1","status":"OPEN","gate":"founder"},{"id":"M-5","status":"PARTLY-FIXED"},{"id":"M-6","status":"OPEN"},{"id":"M-8","status":"FIXED-LOCAL"},{"id":"M-9","status":"OPEN"},{"id":"L-1","status":"IMPROVED"},{"id":"L-5","status":"OPEN"},
{"id":"N-1","status":"NEW","severity":"High"},{"id":"N-2","status":"NEW","severity":"Medium"},{"id":"N-5","status":"NEW","severity":"Medium"},{"id":"N-3","status":"NEW","severity":"Low"},{"id":"N-4","status":"NEW","severity":"Low"},{"id":"N-6","status":"NEW","severity":"Low"},{"id":"N-7","status":"NEW","severity":"Low"},{"id":"N-8","status":"NEW","severity":"Low"},{"id":"N-9","status":"NEW","severity":"Low"},{"id":"N-10","status":"NEW","severity":"Low"}]}
```
