# Content quality, E-E-A-T and on-page audit: arrowbin.com (14 Oct 2026)

Method: all 20 URLs fetched with Python urllib from live (https://arrowbin.com) and local (http://localhost:3117), all returned 200. Text extracted with html.parser (scripts, styles, svg removed). Word counts are raw visible words including nav/footer chrome and animated duplicate spans. Compared with ../11-audit-2026-10-01/content.md.

Not verified (stopped early on coordinator request): full read of /about, /contact, /blog, /privacy, /terms body copy; Flesch readability was NOT recomputed (1 Oct figures stand: posts grade 7.7 to 8.8, service pages 11 to 13, unverified today); per-page title/H1 keyword check for blog posts only by title match; no Search Console data (none available for this site).

## Scores

| Score | Live | Local (projected after deploy) | Reason |
|---|---|---|---|
| Content Quality | 55 / 100 | 66 / 100 | Live still shows placeholder metrics and fake testimonials. Local removes the metrics only. Testimonials remain (founder decision), capping the score. |
| On-Page | 68 / 100 | 82 / 100 | Local adds keyword-bearing titles on all service pages and the homepage. H1s, price conflicts and boilerplate still open. |
| AI citation readiness | 66 | 69 | Answer-first blocks, tables, FAQs exist; sourcing weak; key data still in widgets. |

E-E-A-T (weights Exp 20, Expertise 25, Authority 25, Trust 30):

| Factor | Live | Local | Evidence |
|---|---|---|---|
| Experience | 45 | 52 | 8 live client sites named and linkable. Local result lines are factual ("Rebuilt from WordPress on Next.js") but some are still unconfirmed ("Online ordering live in 8 weeks", "all 64 districts"). No case studies. |
| Expertise | 55 | 55 | Named author on posts, technically sound posts. No founder bio, no named engineers despite "senior team" (22 mentions). |
| Authoritativeness | 30 | 30 | No third-party reviews, press or awards found. One weak outbound source across posts (per 1 Oct; not rechecked). |
| Trust | 35 | 45 | Live: 3 fake testimonials plus 5 placeholder metrics. Local: metrics gone, testimonials remain. Contact details, legal pages present. |
| Weighted | 40.8 | 46.9 | |

## Word counts (raw, live / local)

/ 1199/1218; /services 746/752; custom-software 1883/1890; ecommerce 1519/1529; mobile 1403/1414; saas 1530/1538; ui-ux 1370/1386; ai-automation 1491/1502; cloud-devops 1348/1356; maintenance 1395/1404; /work 484/504; /about 652/654; /contact 519/521; /blog 473/478; cost post 3199; choose post 2538; MVP post 2441; /privacy 1211/1212; /terms 675/676.

Thin pages: none by the 800-word service floor or 1,500 post floor. Thin by purpose only: /work (about 500, no case studies), /blog index, /contact. /services hub (746 raw, below the 800 floor, but it is a hub). Main content per service page after stripping nav, footer and shared blocks is about 690 to 1,050 words (custom software highest at 1,057, mobile lowest at 695), so several service pages are closer to the 800 floor than raw counts suggest.

## Findings

### Critical

**C-1 Fabricated testimonials. Status: OPEN (live and local).** Evidence: Sarah Mitchell, David Chen, Rafiul Islam present in both / texts. The David Chen quote claims "Page loads dropped dramatically and sales followed", an outcome claim with no client. Founder decision keeps them, risk stands (FTC 16 CFR 465 on fake reviews, per 1 Oct analysis; not legal advice). Fix: remove section in src/components/home testimonials and src/lib/testimonials.ts. Owner: founder (decision) then dev. Effort: S. Fails if: `curl -s https://arrowbin.com/ | grep -c "Sarah Mitchell"` is above 0.

**C-2 Placeholder metrics on real client names. Status: FIXED-LOCAL.** Live still shows "+28% mobile conversion", "2.4s faster page loads", "Checkout drop-off cut by ~30%", "1,000+ verified listings", "Bounce rate down 22%" on / (3), /work (5) and all 7 service pages with portfolio cards (counts 1 to 3 each). Local portfolio.ts replaces all five (grep on local finds none of them in cards). Fix: deploy. Owner: dev. Effort: S. Fails if live grep for the five strings is non-zero after deploy.

### High

**H-1 Homepage cannibalises custom software keyword. Status: FIXED-LOCAL (title, sr-only H1); partly OPEN.** Live title "Custom Software Development Company | Arrowbin" identical to the service page. Local "Software Development Company for Startups & SMBs | Arrowbin" and H1 "a software development company for startups...". Still OPEN locally: visible hero says "software studio" and the manifesto says "software studio" (L-5). Owner: dev, S.

**H-2 No third-party proof. Status: OPEN.** No Clutch, Google or press links found in text. Fix: create profiles, request reviews, build two /work/<slug> case studies. Owner: founder, L.

**H-3 "A real example" sections are generic. Status: NOT RE-VERIFIED this run (posts unchanged in word count live vs local, 3199/2538/2441), treat as OPEN.** Fix: rename to "A worked example" or use a real anonymised project. Owner: founder (content), S.

**H-4 Rate table unsourced. Status: OPEN (rate table text still present live and local).** Fix: label as Arrowbin estimate, add sources. Owner: founder, M.

**H-5 NEW. Proof not relevant to service.** Local and live service cards (from project-name matching): AI page shows FlexOver, YT Shop, OutNet (no AI work); mobile page shows Silent Lifestyle, Maneel, YT Shop (all websites/stores, none is a mobile app); cloud page shows Silent Lifestyle, NBAFL, YT Shop; SaaS page shows FlexOver, NBAFL, YT Shop (none is SaaS); UI/UX shows Maneel, Brandingly, OutNet. Only e-commerce is well matched. The portfolio contains 0 verified mobile, AI or SaaS products. Buyers and raters will read this as claim without proof. Fix: label cards honestly ("Related web work") or remove cards on mobile/AI/SaaS until real projects exist, and add a one-line caveat; ideal: one real case per service. Owner: founder (supply projects) plus dev, M.

### Medium

**M-1 Conflicting prices. Status: OPEN (price strings identical live vs local).** Every price per page:
- `/`: smaller builds start $5,000 to $10,000 (FAQ). (Also "Surprises $0.00" widget.)
- `/services`: $8,000 focused tool to $75,000+ full platform.
- `/services/custom-software-development`: $8,000 to $75,000+.
- `/services/mobile-app-development`: polished MVP $12,000 to $40,000.
- `/services/ai-automation`: starts around $10,000 to $15,000 including a year of running costs; calculator shows typical build $14k, $35/hour, $58k saved. Other dollar figures are demo UI.
- `/services/saas-product-engineering`: illustrative plan prices $29/$79/$199, $49 per customer (widgets, labelled illustrative).
- `/contact`: budget selector Under $5k, $5k to $15k, $15k to $50k, $50k+.
- Blog index and posts: $5,000 to $250,000+; MVP $5,000 to $30,000; mid-size $30,000 to $90,000; SaaS $80,000 to $200,000; enterprise $150,000 to $500,000+; "mobile apps and enterprise $50,000 to $500,000+"; "most business products $30,000 to $120,000" and "$40,000 to $120,000" in the same post; $60,000 example.
- Pages with no prices: /ecommerce, /ui-ux, /cloud, /maintenance, /work, /about, privacy, terms. Maintenance has no price at all although prices are a buying signal.
Conflicts: floor is $5k (home, posts) vs $8k (services, custom) vs $10k (AI) vs $12k (mobile). Ceiling $75k vs $120k vs $250k vs $500k+. Mobile MVP $12k to $40k sits inside the cost post's mid-size $30k to $90k band but below its "mobile $50k+". Fix: one pricing data file feeding all FAQs and a /pricing page. Owner: founder (numbers) then dev, M.

**M-2 Service titles/H1 keyword alignment. Status: FIXED-LOCAL for titles, OPEN for H1/intro.** Local titles: custom "Custom Software Development Company & Services", ecommerce "E-commerce Website Development Services", mobile "Mobile App Development Company: iOS & Android", SaaS "SaaS Development Company: From MVP to Scale", AI "AI Automation Services & AI Agent Development", cloud "Cloud & DevOps Services and Managed Hosting", UI/UX "UI/UX Design Services for Web & Mobile Apps". Gaps against 1 Oct map terms: ecommerce title lacks "company"; AI title lacks "agency"; UI/UX lacks "agency"; cloud lacks "devops consulting". All H1s remain bare names ("AI Automation"). Intros are answer-first and good, but none of the 8 hero first sentences contains the exact mapped head term (they open with a hook: "AI is only useful when...", "Your storefront is your hardest-working salesperson."); the second paragraph "X is..." definition does carry the term. Fix: put the keyword in hero sentence one. Owner: dev, S. I did not recheck the keyword map file this run, mapped terms are from the 1 Oct audit.

**M-3 Keyword-map sections missing. Status: OPEN (not rechecked in depth; word counts unchanged).** Owner: founder content, M.

**M-4 Data in widgets/images. Status: NOT RE-VERIFIED, assume OPEN.** Owner: dev, S.

**M-5 Split words in raw H1. Status: FIXED-LOCAL.** Live H1 text reads "Softwaredevelopmentservices", "CustomSoftwareDevelopment", "We build itlike it'sours." Local reads with spaces ("Software development services"). Remaining OPEN locally: homepage manifesto still doubles every word in raw text ("WeWe areare aa softwaresoftware studiostudio") and stats read "15+15+", "0808", "100%100%". Fix: aria-hidden on the duplicate layer. Owner: dev, S.

**M-6 Founder/team E-E-A-T thin. Status: OPEN** (/about 652 vs 654 words, no change). Owner: founder, M.

**M-7 Reused sourcing sentence in MVP post. Status: NOT RE-VERIFIED, treat as OPEN.** Owner: founder, S.

**M-8 Service boilerplate. Status: OPEN, worse than 1 Oct estimate.** Method: main-content lines (between breadcrumb and footer, lines over 25 chars) appearing on 3 or more of the 8 service pages. Share of lines / words: AI 49% / 43%; cloud 48% / 45%; mobile 45% / 46%; UI/UX 48% / 43%; SaaS 43% / 46%; maintenance 41% / 39%; ecommerce 39% / 42%; custom 33% / 33%. Live and local are the same within 1 point. Shared blocks: "Three ways to start" (Project, Product team, Care plan), quote form copy, "If one of these sounds like you, we should talk.", "Short sprints, a demo at the end of each one...", the guide cards, "Pairs well with". Some of this is form and UI, so true editorial duplication is below these figures, but unique copy is only about 400 to 700 words per page. Target under 25%. Fix: tailor "Three ways to start" and process subtitle per service. Owner: dev plus founder copy, M.

**M-9 NEW. Unsourced statistics and unverifiable claims.** Homepage "15+ brands shipped for ... fintech and media, across several countries" while /work shows 8 projects and 7 named others (15 total, retail/fashion/agro mostly; fintech and media not evidenced by names beyond Rize Capital). "6 to 12 weeks to first launch", "100% code you own", "senior engineers" are asserted, not evidenced. AI page ROI numbers ($58k saved, 1,656 hours, pays back in 3 months) are labelled by the calculator but marked rough; confirm an "Illustrative" label is visible. Local portfolio lines "Online ordering live in 8 weeks" and "all 64 districts" could not be verified by me. Fix: confirm with client facts or soften. Owner: founder, S.

### Low

**L-1 AI-typical phrasing. Status: OPEN, counts identical live and local:** "actually" 31, "honest" 12, "not just" 8, "Here's" 16, "sweet spot" 3, "ruthless" 2, "senior team" 22, "peace of mind" 1, "Blazing" 1. Examples: "Great design is invisible. It just works", "peace of mind", "Numbers that don't whisper". Repeated "X is..." definition and "Is this for you?" skeleton on all 8 service pages. (My "real" count regex failed; the 1 Oct figure of 57 is unverified today.) Owner: founder, S.

**L-2 Freshness. Status: OPEN, Info.** Posts say 2026; schedule quarterly review. Owner: founder, S.

**L-3 Meta description length. Status: FIXED-LOCAL.** Live ecommerce 169, SaaS 170 chars. Local all service descriptions 146 to 158 chars. Live homepage description is 162 chars (borderline), local 150.

**L-4 Section numbering / DOM order. Status: OPEN (not rechecked).**

**L-5 Brand descriptor drift. Status: OPEN.** Local homepage hero still reads "Arrowbin is a software studio" and manifesto "software studio" while FAQ and title say "software development company".

**L-6 NEW. Hero intros use padded definitions.** Not an issue of correctness; no action beyond M-2.

## Em dashes and other checks

- Em dashes in visible copy and raw HTML: 0 on all 20 URLs, live and local. Meets founder rule. (En dashes used in ranges like $5,000-$10,000 are not em dashes.)
- CTA placement: service pages have a hero "Book a free call", an inline quote form in the first screen, and a footer CTA; homepage has hero, selected-work and closing CTAs; blog posts: not rechecked. Status: no issue found.
- Legal pages: /privacy 1,211 and /terms 675 words, titles "Privacy Policy | Arrowbin" and "Terms of Service | Arrowbin". Local privacy description 144 chars vs live 161. Content accuracy of legal text was not reviewed. Entity status of the Florida LLC is unverified (see CONTEXT.md).
- Homepage H1 is visually hidden (sr-only) text; visible hero is "Software That Moves", live and local.

## AI citation readiness (66 live, 69 local)

Positives: short-answer blocks on all 3 posts, question H2s, HTML tables in the cost post, FAQs on homepage and service pages, "X is..." definition sentences on all 8 service pages (quotable). Negatives: conflicting prices (M-1) reduce citation confidence, no source list, key tables in widgets, doubled text in raw HTML for crawlers (M-5), no named expert quotes.

## Priority order

1. Deploy local fixes (C-2, H-1, M-2 titles, M-5 H1 spacing, L-3). Owner dev, S.
2. Decide on testimonials (C-1). Owner founder.
3. Unify prices (M-1) and add maintenance pricing.
4. Fix proof relevance (H-5) and boilerplate (M-8).
5. Reviews, case studies, founder bio (H-2, M-6).

## Structured findings (Content Quality)

```json
{"category":"Content Quality","date":"2026-10-14","scores":{"live":{"content_quality":55,"on_page":68,"eeat":41,"ai_citation":66},"local":{"content_quality":66,"on_page":82,"eeat":47,"ai_citation":69},"eeat_breakdown_live":{"experience":45,"expertise":55,"authoritativeness":30,"trust":35},"eeat_breakdown_local":{"experience":52,"expertise":55,"authoritativeness":30,"trust":45}},"em_dashes_visible":0,"findings":[
{"id":"C-1","status":"OPEN"},{"id":"C-2","status":"FIXED-LOCAL"},{"id":"H-1","status":"FIXED-LOCAL"},{"id":"H-2","status":"OPEN"},{"id":"H-3","status":"OPEN"},{"id":"H-4","status":"OPEN"},{"id":"H-5","status":"NEW"},{"id":"M-1","status":"OPEN"},{"id":"M-2","status":"FIXED-LOCAL"},{"id":"M-5","status":"FIXED-LOCAL"},{"id":"M-6","status":"OPEN"},{"id":"M-8","status":"OPEN"},{"id":"M-9","status":"NEW"},{"id":"L-1","status":"OPEN"},{"id":"L-3","status":"FIXED-LOCAL"},{"id":"L-5","status":"OPEN"}]}
```
