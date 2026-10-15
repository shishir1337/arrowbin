# GEO / AI search readiness audit: arrowbin.com

**Date:** 1 October 2026 (site live since 29 September 2026). **Method:** live `curl` fetches of every sitemap URL (19 pages) plus robots.txt, llms.txt and llms-full.txt; user-agent access tests against the Cloudflare edge; raw-HTML text extraction (no JS execution, which is how most AI crawlers see the site); entity checks via the Wikidata and Wikipedia APIs, GitHub API, direct profile URLs and Brave Search. **Builds on:** `../07-geo-aeo/` (baseline, playbook, research). Findings already covered there are referenced, not repeated.

---

## 1. AI Search Readiness score: 52 / 100

| Dimension | Weight | Score | Weighted | Why |
|---|---|---|---|---|
| Citability | 25% | 62 | 15.5 | The 3 blog posts are strong: answer-first "short answer" boxes, question H2s, tables, key takeaways, FAQs. Service pages have one short definition each, few numbers, almost no sourced statistics. One external source on the whole site. |
| Structural readability | 20% | 55 | 11.0 | Good heading hierarchy on posts. But H1s on 11 pages have no spaces in raw text, ~94% of the homepage text sits in hidden streamed `<div hidden>` blocks after `</main>`, and the home manifesto doubles every word in raw HTML. |
| Multi-modal | 15% | 50 | 7.5 | 14 to 16 images with alt text per post, real `<table>` elements, diagrams. No video, no YouTube presence, no downloadable data. |
| Authority and brand | 20% | 20 | 4.0 | Bylines, Person schema, published/updated dates are in place. Off-site entity is essentially empty: no LinkedIn company page, Clutch, GoodFirms, Crunchbase, Wikidata or reviews. Placeholder LinkedIn `sameAs` still live. |
| Technical accessibility | 20% | 68 | 13.6 | SSR/prerendered HTML, search and user-fetch AI bots get HTTP 200, llms.txt valid. But Cloudflare returns **403** to GPTBot, ClaudeBot, CCBot, Bytespider, Amazonbot, anthropic-ai and cohere-ai, contradicting robots.txt. |
| **Total** | | | **51.6, rounded 52** | |

### Platform-specific readiness (estimates)

| Platform | Score | Main constraint |
|---|---|---|
| Google AI Overviews / AI Mode | 40 | Depends on Google ranking; domain is 2 days old with no authority. Content format is AIO-friendly. |
| ChatGPT Search | 30 | OAI-SearchBot and ChatGPT-User get 200 (good), GPTBot is 403. Relies heavily on Bing index plus directory/listicle sources where Arrowbin is absent. |
| Perplexity | 35 | PerplexityBot and Perplexity-User get 200. No third-party mentions for it to corroborate. |
| Bing Copilot | 30 | bingbot gets 200; Bing Webmaster Tools / IndexNow status unconfirmed. |
| Claude (web search) | 40 | Claude-SearchBot and Claude-User get 200; Brave (Claude's likely index) ranks arrowbin.com #1 for "Arrowbin" and "Arrowbin software development company". ClaudeBot is 403. |

---

## 2. What changed since the 29 September baseline

| Item | 29 Sep 2026 | 1 Oct 2026 | Changed? |
|---|---|---|---|
| AI answer mentions (20 answers, 4 engines) | 0 of 20 | Not re-run (2 days is too short to move; re-run on the monthly cycle) | n/a |
| robots.txt | Explicit allows; Claude-Web listed; Claude-SearchBot and Claude-User missing | Identical | No |
| Edge (Cloudflare) bot access | Not tested (playbook said "check the WAF") | **403 for 7 training/AI agents** (see F-1) | New finding |
| llms.txt | Valid, no key-facts section | Identical | No |
| llms-full.txt | 404 | 404 | No |
| Organization `sameAs` | Placeholder `linkedin.com/in/arrowbinllc` | Same placeholder | No |
| Service-page H1 spacing | `CustomSoftwareDevelopment` etc. (technical-audit H-series) | Unchanged | No |
| LinkedIn company page | None | `linkedin.com/company/arrowbin`, `/arrowbinllc`, `/arrowbin-llc` all 404 | No |
| Wikidata / Wikipedia | No item / no article | No item (`wbsearchentities` empty) / 0 hits | No |
| Clutch, GoodFirms, TechBehemoths, Crunchbase | None | GoodFirms `/company/arrowbin` redirects to home (no profile), TechBehemoths 404, Clutch/DesignRush/Crunchbase block bots; Brave shows none of them for brand queries | No |
| Brave Search brand SERP | Site, Facebook, GitHub | arrowbin.com #1, plus an infobox built from the homepage FAQ ("Projects start around $5,000 to $10,000", "full code ownership") | Slight improvement |

**Bottom line:** nothing on-site or off-site has changed since the baseline. The one positive signal is that Brave (likely Claude's search index) already extracts the homepage FAQ into a brand infobox.

---

## 3. AI crawler access (tested 1 Oct 2026)

robots.txt allows everything except `/api/`. The Cloudflare edge overrides this for several agents. Tests used each bot's published user-agent string from a non-bot IP; Cloudflare's "Block AI bots" rule matches on user agent, so the real crawlers will get the same response.

| Agent | Governs | robots.txt | Edge response | Status |
|---|---|---|---|---|
| OAI-SearchBot | ChatGPT Search index | Allow (explicit) | 200 | OK |
| ChatGPT-User | ChatGPT live fetches for a user | Allow (explicit) | 200 | OK |
| GPTBot | OpenAI model training only | Allow (explicit) | **403 "Your request was blocked."** | Contradiction |
| Claude-SearchBot | Claude search citations | Allow (via `*` only) | 200 | OK, but not listed |
| Claude-User | Claude live fetches for a user | Allow (via `*` only) | 200 | OK, but not listed |
| ClaudeBot | Anthropic model training only | Allow (explicit) | **403** | Contradiction |
| anthropic-ai | Legacy Anthropic token | Allow (via `*`) | **403** | Harmless |
| PerplexityBot / Perplexity-User | Perplexity index / live fetch | Allow (explicit) | 200 / 200 | OK |
| Google-Extended | Gemini/Vertex training and grounding (not AI Overviews) | Allow (explicit) | robots token only, no UA | OK |
| Applebot-Extended | Apple Intelligence training only | Allow (explicit) | robots token only; Applebot gets 200 | OK |
| CCBot | Common Crawl (training datasets) | Allow (explicit) | **403** | Contradiction |
| Bytespider | ByteDance training | Allow (via `*`) | **403** | Contradiction |
| Amazonbot | Amazon / Alexa | Allow (via `*`) | **403** | Contradiction |
| cohere-ai | Cohere training | Allow (via `*`) | **403** | Contradiction |
| meta-externalagent, Diffbot | Meta AI, Diffbot | Allow (via `*`) | 200 | OK |
| Googlebot / bingbot | Google Search + AIO / Bing + Copilot + ChatGPT grounding | Allow | 200 / 200 | OK |

The block is not in the app (no bot logic in `src/`); it is Cloudflare's AI Crawl Control / "Block AI bots" setting. Note `robots.txt` itself returns 200 to GPTBot, but `llms.txt` and every page return 403.

**Impact:** search citability in ChatGPT, Claude and Perplexity is **not** affected, because their search agents get through. What is lost is training exposure (GPTBot, ClaudeBot, CCBot feed future model knowledge of "Arrowbin"), which matters for a brand with zero entity presence: unprompted mentions in model answers come from training data. The robots.txt and the edge also currently tell crawlers two different things.

---

## 4. llms.txt and RSL

- **llms.txt:** present, valid (H1, blockquote summary, Services, Guides, Company, Partnerships, Policies). Unchanged since baseline. Gaps listed in `07-geo-aeo/ai-search-research.md` section 5.2 remain: no key facts (founder, founding year, typical budgets and timelines), no links to `/services`, `/blog`, `/work` hubs, no external profiles. Returns 403 to GPTBot and ClaudeBot (see F-1).
- **llms-full.txt:** 404. Low priority.
- **RSL 1.0 licensing:** none (`/license.xml` 404, no `License:` line in robots.txt). Not needed for a lead-gen site that wants maximum exposure; skip.
- **RSS:** `/blog/rss.xml` returns 200 and is linked in `<head>`. Good.

---

## 5. Findings by priority

### Critical

**F-1. Cloudflare blocks 7 AI agents that robots.txt explicitly allows.**
- Evidence: `curl -A "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.3; +https://openai.com/gptbot)" https://arrowbin.com/` returns `403`, body `Your request was blocked.`, `Server: cloudflare`. Same for ClaudeBot, CCBot, Bytespider, Amazonbot, anthropic-ai, cohere-ai. OAI-SearchBot, Claude-SearchBot, PerplexityBot return 200.
- Why: robots.txt signals "train on us", the edge says no. For a brand with no Wikipedia, Wikidata, directory or press footprint, training crawls are one of the few ways models learn Arrowbin exists. The playbook (section 4) already asked for this check.
- Fix: Cloudflare dashboard > AI Crawl Control (or Security > Bots > "Block AI bots"): set to "Do not block", or allow GPTBot, ClaudeBot, CCBot and Applebot individually. If the founder prefers to block training, make robots.txt say so (remove the explicit Allow groups for those agents) so the two layers agree. Recommended: allow, since the business goal is visibility.
- Verify: rerun the curl above for each agent; expect 200.
- Effort: 10 minutes.

**F-2. Entity is still empty off-site (unchanged since baseline).**
- Evidence: Wikidata search "Arrowbin" returns `[]`; Wikipedia 0 hits; LinkedIn `/company/arrowbin`, `/company/arrowbinllc`, `/company/arrowbin-llc` 404; GoodFirms and TechBehemoths have no profile; Brave's brand SERP shows only the site, Instagram, Facebook and GitHub. GitHub org `Arrowbin-LLC` has 0 public repos and the old description "Arrowbin Digital Agency".
- Why: the baseline showed AI "best X company" answers are built from Clutch, DesignRush and listicles. Without these, citation probability for commercial prompts is near zero regardless of on-site quality.
- Fix: execute playbook section 0, items 1 to 5 (LinkedIn company page, Bing Webmaster Tools + IndexNow, Clutch with reviews, GoodFirms/DesignRush/TechBehemoths, Crunchbase). Update the GitHub org description to the canonical one-liner.
- Effort: 1 to 2 days of founder time plus client review follow-up.

### High

**F-3. Placeholder LinkedIn URL is still in Organization `sameAs` and the footer.**
- Evidence: every page's Organization JSON-LD has `"sameAs":["https://www.linkedin.com/in/arrowbinllc", ...]`; footer links to the same URL. `/in/` is a personal-profile path.
- Fix: remove it from `src/lib/site.ts` today; add the `/company/` URL once F-2 creates it. Add `https://github.com/Arrowbin-LLC` to `sameAs` now.
- Effort: 5 minutes.

**F-4. Homepage and /services content is streamed into hidden divs outside `<main>`.**
- Evidence: `src/app/page.tsx` wraps 10 sections in `<Suspense fallback={null}>`; `/services` wraps 5; each service page 3 to 4 (including the FAQ). In the raw HTML, `<main>` on the homepage contains **80 words**; the other ~1,400 words (services, numbers, work, process, testimonials, FAQ) sit in `<div hidden id="S:0">` to `S:9` after `</main>`, moved into place by an inline script. `/services`: 42 words in `<main>` of 838. Service pages: roughly 600 words each (the FAQ and the interactive section) are outside `<main>`.
- Why: Googlebot renders JS and will see the final DOM. Most AI crawlers (OAI-SearchBot, PerplexityBot, Claude-SearchBot) do not execute JS. Boilerplate extractors used in AI pipelines (Readability, trafilatura-style) generally key on `<main>` and discard `hidden` elements, so the homepage "What does Arrowbin do?" FAQ, the numbers and the service list can be dropped or reordered. The content is in the HTML, so this is a risk, not a certainty, but it affects the two most important entity pages.
- Fix: remove the `Suspense` wrappers around server-rendered text sections (the comment says they exist to split hydration; the same effect can be had by keeping the boundary inside the client-only interactive part, or by using `content-visibility` CSS). At minimum, unwrap `Faq`, `Services`, `Numbers` on the homepage and the FAQ on service pages. Verify: `curl -s https://arrowbin.com/ | grep -c 'div hidden id="S:'` should be 0 or near 0, and the FAQ text should appear before `</main>`.
- Effort: 1 to 2 hours plus a Lighthouse check for INP regression.

**F-5. H1s have no spaces between words in raw HTML (11 pages).**
- Evidence (textContent of `<h1>`): `CustomSoftwareDevelopment`, `MobileAppDevelopment`, `E-commerceDevelopment`, `SaaS&ProductEngineering`, `UI/UXDesign`, `AIAutomation`, `Cloud,DevOps&Hosting`, `Maintenance&Support`, `Softwaredevelopmentservices`, `We build itlike it'sours.`, `Read beforeyou build.`, `Tell uswhat you'rebuilding.`, `Privacypolicy.`. The shared CTA H2 renders `Let's buildsomething loud` on every page. Homepage H1 is fine for machines because it has an `sr-only` sentence, but its textContent still appends `SoftwareThatMoves`.
- Why: the H1 is the primary topic signal a text-only crawler sees. `CustomSoftwareDevelopment` is not the phrase "custom software development".
- Fix: already specified in `01-audit/technical-audit.md` (emit `{" "}` between word spans in `ServiceHero.tsx` and the line-array heroes). On the homepage the letter spans are already `aria-hidden`; also give the H1 an `aria-label` equal to the sr-only sentence so extractors that ignore `aria-hidden` get one clean string.
- Effort: 30 minutes.

**F-6. Service pages lack citable, self-contained, Arrowbin-attributed answers.**
- Evidence: each service page has one "What is X?" paragraph of 30 to 45 words that never names Arrowbin, followed by unsourced stat tiles ("100% Source code ownership", "6–12 Weeks", "0 Per-seat license fees") and card copy. No cost range, no timeline table, no named client result on-page except link cards ("Online ordering live in 8 weeks"). The AI automation calculator ($58k saved, $14k typical build) is interactive and illustrative, not a citable fact.
- Fix: add a 130 to 170 word "Short answer" block under each "What is X?" H2 (see rewrite R-1), a "How much does X cost and how long does it take?" H2 with a 3-row table using Arrowbin's own ranges, and one named mini case study with a number per page.
- Effort: 1 day for all 8 pages.

**F-7. Statistics are mostly unsourced; the one source does not support the claim.**
- Evidence: across 3 posts there is one external link: `https://survey.stackoverflow.co/` attached to "developer-rate data" in the cost post. The Stack Overflow survey reports salaries, not agency hourly rates by region, so the regional rate table ($120 to 180 North America, $25 to 60 South Asia) is effectively unsourced. The MVP and "how to choose" posts have zero external citations. "These ranges come from Arrowbin's own delivered projects" gives no project count or period.
- Why: AI engines and Google's quality raters favour claims with verifiable attribution; first-party data is only citable if its method is stated.
- Fix: for each number, either cite a primary source that actually contains it (verify before linking) or label it as Arrowbin data with a method line: "Based on N Arrowbin projects delivered between 2020 and 2026." See rewrite R-4.
- Effort: 3 to 4 hours.

### Medium

**F-8. Homepage manifesto doubles every word in raw HTML.**
- Evidence: raw text reads "We We are are a a software software studio studio for for companies companies that that refuse refuse to to be be boring. boring." Stat tiles also double ("15 + 15 +", "0 8 0 8"). Nav links double site-wide ("Services Services Work Work"), which is minor.
- Fix: mark the animation duplicate layer `aria-hidden="true"` and keep a single `sr-only` copy of the sentence, or render one layer and animate it with CSS. Same for the number tiles.
- Effort: 30 minutes.

**F-9. Inconsistent entity description.**
- Evidence: homepage hero and manifesto say "a software studio"; title, meta, schema and llms.txt say "a software development company"; GitHub and Facebook say "Arrowbin Digital Agency ... captivating digital realities". About page: "founder-led software development company ... since 2020". A Brave result shows a Sunbiz record for ARROWBIN LLC filed 05/06/2024 with status **INACTIVE** (Sunbiz blocked automated verification; founder must confirm).
- Why: models resolve entities from repeated identical statements. Mixed labels and a possibly inactive state registration weaken trust and disambiguation from Arrowbit, Arrowsoft and similar names that appear in the same SERPs.
- Fix: use the playbook's canonical one-liner everywhere (hero sub-copy, GitHub, Facebook, Instagram bio). Confirm the Florida LLC status and file an annual report or reinstatement if it is inactive; state "operating since 2020, incorporated as Arrowbin LLC in 2024" if that is the accurate history.
- Effort: 1 hour plus any filing.

**F-10. Testimonials are unattributable.**
- Evidence: "Sarah Mitchell, Product Lead, SaaS Startup", "David Chen, Founder, E-commerce Brand", "Rafiul Islam, Operations Director, Logistics". No company names, links or photos.
- Why: generic testimonials add no citable trust signal and can read as fabricated to both users and quality systems. If any are not real, they must be removed (FTC endorsement rules).
- Fix: replace with named clients from the portfolio (FlexOver BD, North Bengal Agro Farms, YT Shop India) with permission, and move reviews to Clutch where they count as third-party evidence.
- Effort: depends on client outreach.

**F-11. llms.txt still lacks a key-facts block, and robots.txt still lists `Claude-Web` instead of `Claude-SearchBot` / `Claude-User`.**
- Already specified in `07-geo-aeo/geo-aeo-playbook.md` section 4. Still not done. 20 minutes total.

### Low

**F-12. Visual tables are duplicated in extracted text.** Each blog table is rendered once as styled cards and once as a real `<table>`, so text extraction shows every row twice (for example "Internal tool / simple MVP Typical cost (2026) $5,000 – $30,000 ..." then the table). Mark the card version `aria-hidden="true"` (the table already carries the data) or hide the `<table>` visually but keep it first in source order.

**F-13. 404 page emits a canonical to the homepage and two robots meta tags** (`noindex` and `noindex, follow`). Not a GEO issue by itself, but a canonical on error pages pointing at `/` is a mixed signal. Remove the canonical from `not-found.tsx`.

**F-14. No video or YouTube presence.** `youtube.com/@arrowbin` resolves but is an unrelated or empty handle with no Arrowbin branding. YouTube mentions are the strongest brand-mention correlate with AI visibility (Ahrefs 2026). A short "How much does custom software cost in 2026" explainer that mirrors the blog post would serve both the post (embed) and the entity.

---

## 6. Top 5 passages most likely to be cited today

Ranked by fit with high-volume AI prompts, answer-first structure and self-containment. All are on blog posts; no service-page passage currently qualifies.

**P-1. Cost range** (`/blog/how-much-does-custom-software-development-cost`, H2 "How much does custom software development cost in 2026?", 72 words + table)
> Custom software development costs between $5,000 and $250,000 or more in 2026. A simple internal tool or a lean MVP usually falls in the $5,000–$30,000 band. A mid-size web or mobile app lands around $30,000–$90,000. A full SaaS platform runs $80,000–$200,000, and enterprise-grade systems start at $150,000 and climb from there. Most funded startups and established businesses end up spending between $40,000 and $120,000 on their first serious product.

Why: direct numeric answer to a top prompt, followed by a 4-row table with cost, timeline and example. Weakness: no attribution inside the passage.

**P-2. MVP timeline** (`/blog/how-long-does-it-take-to-build-an-mvp`, "The short answer" and FAQ, 45 words)
> Most well-scoped MVPs take 6–14 weeks from kickoff to launch in 2026: a simple tool in 6–8 weeks, a standard MVP in 10–14, and a complex SaaS MVP in 14–20. The timeline tracks scope, clarity, integrations and how fast you make decisions.

Why: tiered numbers, question-matching phrasing, repeated in FAQPage schema.

**P-3. Maintenance cost rule of thumb** (cost post FAQ "How much does it cost to maintain custom software?", 40 words)
> Plan for roughly 15–20% of the original build cost per year. That covers hosting, third-party services, security patches, bug fixes and small improvements. It's the cost of keeping the product reliable and current.

Why: a single memorable figure answering a common follow-up question; fully self-contained.

**P-4. Budget breakdown by phase** (cost post, "What is actually included in a software development cost?")
> Discovery and planning (~10%) ... UX/UI design (~15%) ... Development (~50%) ... QA and testing (~15%) ... Project management (~10%).

Why: list format with percentages, reinforced by the $60,000 worked example table. Engines like percentage splits for "what does a quote include" prompts.

**P-5. How to choose a development company** (`/blog/how-to-choose-a-software-development-company`, H2 answer, 62 words)
> Choose a software development company on proof, not promises. Review live products they have shipped, talk to past clients, confirm who will actually work on your project, and check how they communicate and test. Shortlist three to five firms, score them against consistent criteria, and pick the one that pairs genuine technical depth with clear communication and a real process. Price comes last.

Why: imperative, self-contained, matches "how do I choose" prompts. Weakness: generic; many competitor posts say the same.

---

## 7. Five rewrites that would be more citable

Numbers in square brackets are placeholders the founder must fill with real figures. Do not publish invented data.

**R-1. Custom Software Development service page, "What is custom software development?"** (replaces the 38-word definition; 150 words)

> Custom software development is the process of designing, building and maintaining software for one organisation's specific workflows, data and users, instead of licensing a generic off-the-shelf product. It typically covers discovery, UX/UI design, engineering, testing, deployment and ongoing support. At Arrowbin, a software development company founded in 2020, a first usable version of a custom platform usually takes 6 to 12 weeks, and projects start at around $5,000 for a focused internal tool, with most business platforms landing between $30,000 and $120,000. Clients own 100% of the source code, designs and infrastructure, and pay no per-seat licence fees. Custom software is the better choice when your process is a competitive advantage, when several systems need to share data, or when per-seat SaaS fees grow faster than your team. Off-the-shelf is better when a mature product already fits at least 80% of your workflow.

Why it is better: names the entity, includes founding year, cost and timeline ranges, a decision rule, and survives extraction with no surrounding context.

**R-2. Homepage FAQ "What does Arrowbin do?"** (entity definition; 120 words; also paste into llms.txt, LinkedIn "About" and every directory profile)

> Arrowbin (Arrowbin LLC) is a founder-led software development company that designs, builds and maintains custom software, web and mobile apps, SaaS products, e-commerce stores and AI automation for startups and growing businesses worldwide. It was founded in 2020 by Md. Shishir Ahmed and operates from St. Petersburg, Florida, USA and Dhaka, Bangladesh. Arrowbin has shipped [15+] products for clients in retail, agro-export, fashion, fintech and media, including FlexOver BD, North Bengal Agro Farms and YT Shop India. Typical projects launch a first version in 6 to 12 weeks, are priced as a fixed estimate after a free discovery call, and hand full code ownership to the client. Arrowbin is a verified Hostinger Partner.

Why it is better: every entity attribute (name, legal name, category, founder, year, locations, proof, pricing model) in one quotable block. Must also live inside `<main>` (see F-4).

**R-3. AI Automation service page, "Is AI automation worth it?"** (replaces the interactive calculator intro with a static, citable answer above it; 140 words)

> AI automation is usually worth it when a repetitive task takes a team more than about 20 hours a week and follows rules that can be written down. Worked example: 6 people spending 10 hours a week each on invoice entry, at $35 an hour including overheads, cost about $96,600 a year over 46 working weeks. If AI handles 60% of that work, the saving is roughly $58,000 a year, or 1,656 hours. A first automation of this kind typically costs Arrowbin clients around [$14,000] to build, including a year of running costs, so it pays for itself in about 3 months. Good first candidates are invoice and receipt entry, support ticket triage, lead qualification, contract review and report writing. Poor candidates are tasks that need judgement on every case or happen less than weekly.

Why it is better: turns an interactive widget (invisible to crawlers) into plain-text math that an engine can quote, with a clear threshold and examples.

**R-4. Cost post, method and regional rates** (replaces "These ranges come from Arrowbin's own delivered projects and publicly available developer-rate data" plus the rates intro; 135 words)

> How we built these numbers: the project-type ranges below come from [N] projects Arrowbin scoped or delivered between 2020 and 2026, adjusted to 2026 rates. Regional hourly rates are blended senior-team agency rates, cross-checked against [named source that actually publishes agency rates by region, for example a directory's published pricing survey, linked]. Blended senior agency rates in 2026 run about $120 to $180 an hour in North America, $90 to $150 in Western Europe, $50 to $90 in Eastern Europe, $45 to $80 in Latin America and $25 to $60 in South Asia. That spread means the same product can cost three to five times more depending on where the team sits, but the lowest rate rarely produces the lowest total cost, because rework on a weak build often exceeds the hourly saving.

Why it is better: states method and sample size, links a source that actually contains the figures (replace the Stack Overflow link, which does not), and keeps the rates in one extractable sentence.

**R-5. MVP post, "A real example: a 12-week SaaS MVP"** (make the example specific and attributable; 140 words)

> Example: [Client or anonymised descriptor, e.g. "a US B2B scheduling startup"] launched its SaaS MVP with Arrowbin in 12 weeks in [year]. Weeks 1 to 2 covered discovery and a signed scope of [N] core features. Weeks 3 to 4 produced clickable designs and the data model. Weeks 5 to 10 were three two-week build sprints with a demo at the end of each. Weeks 11 and 12 were QA, a closed beta with [N] users and launch. The build cost [$X], within [Y%] of the fixed estimate. Two decisions kept it on schedule: scope was frozen after week 2, with 7 feature requests moved to a v2 list, and the founder approved each sprint demo within 24 hours. Within [N] weeks of launch the product had [metric, e.g. 40 paying teams].

Why it is better: first-party data with specific numbers is the content type AI engines cite most, and it is the one thing competitors cannot copy.

---

## 8. Top 5 highest-impact changes

| # | Change | Finding | Impact | Effort |
|---|---|---|---|---|
| 1 | Turn off Cloudflare "Block AI bots" (or align robots.txt with it) | F-1 | Restores training exposure for GPTBot, ClaudeBot, CCBot; removes contradictory signals | 10 min |
| 2 | Create LinkedIn company page, Clutch, GoodFirms, DesignRush, Crunchbase profiles with the R-2 text; fix `sameAs` | F-2, F-3, F-9 | Only route into "best X company" answers; builds the entity | 1 to 2 days + reviews |
| 3 | Remove `Suspense` wrappers from text sections on home, /services and service-page FAQs | F-4 | Puts ~1,400 homepage words and all service FAQs inside `<main>` for non-JS crawlers | 1 to 2 h |
| 4 | Fix H1 word spacing and the doubled manifesto/stat text | F-5, F-8 | Clean topic signals in raw HTML on 11 pages | 1 h |
| 5 | Add R-1 style answer blocks plus cost/timeline tables to all 8 service pages; add method lines and real sources to stats (R-4, R-5) | F-6, F-7 | Makes service pages citable at all and upgrades the blog's existing top passages | 1.5 days |

Then: llms.txt key facts + robots.txt Claude agents (F-11, 20 min), attributable testimonials (F-10), one YouTube explainer (F-14). Re-run the 5-prompt LLM visibility test on 1 November 2026 and log it in `07-geo-aeo/ai-prompt-tracking.csv`.

---

## 9. Evidence log

- `curl -A "<bot UA>" https://arrowbin.com/` for 16 agents, 1 Oct 2026 (results in section 3).
- `curl https://arrowbin.com/{robots.txt,llms.txt,llms-full.txt,license.xml,sitemap.xml,blog/rss.xml}`: 200, 200, 404, 404, 200, 200.
- Raw HTML of all 19 sitemap URLs; `<main>` vs body word counts and `<div hidden id="S:n">` counts per page (home: 10 boundaries, 80 of 1,495 words in `<main>`; /services: 5, 42 of 838; service pages: 3 to 4 boundaries each).
- Wikidata `wbsearchentities` "Arrowbin": empty. Wikipedia search: 0 hits. GitHub API `orgs/Arrowbin-LLC`: 0 public repos, description "At Arrowbin Digital Agency...".
- LinkedIn `/company/arrowbin`, `/company/arrowbinllc`, `/company/arrowbin-llc`: 404. GoodFirms `/company/arrowbin`: redirects to homepage. TechBehemoths `/company/arrowbin`: 404. Clutch, DesignRush, Crunchbase, Sunbiz, Reddit: blocked automated checks (403 or challenge); none appear in Brave results for brand queries.
- Brave Search "Arrowbin" and "Arrowbin software development company": arrowbin.com position 1; Facebook, Instagram, GitHub; Sunbiz snippet "ARROWBIN LLC, filed 05/06/2024, INACTIVE" (unverified).
- Google and Bing SERPs and knowledge panel could not be checked reliably (automated queries were served captchas or unrelated results); check manually in a clean browser.
