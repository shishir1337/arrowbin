# Brief: fixed-price-vs-time-and-materials (next wave, #10 in clusters.md)

**Status:** brief ready; **blocked on founder decision F4** (is discovery a free call, a paid phase, or both?). The post can be written in full except one section and the CTA, which have three ready variants below. Format follows `docs/seo/13-sprint-2026-10-15/briefs/`. Template C (comparison post) from `06-content-plan/content-plan.md`: a verdict in the first paragraph, an 8 to 12 row table, a section per criterion, a cost comparison, "what we recommend", FAQ.

**Founder inputs:**
- **F4 (blocking):** free call, paid discovery, or a free call then paid discovery. Decides section 8, the CTA and the closing paragraph, and the trimmed cost-guide text.
- **F1/F2 (not blocking):** the post should reuse the cost guide's $60,000, about 14-week worked example only as an illustration, so it doesn't need F1/F2 settled. If the founder changes that example, update this post with it.
- **Optional:** how Arrowbin actually bills post-launch work (monthly retainer, hourly with a cap, or both). If the founder gives it, section 6 can say "this is how we do it"; if not, it stays general.

## Keywords
- **Slug:** `/blog/fixed-price-vs-time-and-materials`
- **Primary keyword:** fixed price vs time and materials (software development)
- **Secondary (4 to 8):** time and materials vs fixed price · fixed price vs time and materials contract · software development pricing models · fixed price software development · fixed fee contract vs time and materials · capped time and materials · milestone-based pricing software
- **Question phrasings seen in results:** "Which is better, fixed price or time and materials?", "Who carries the risk in a fixed price contract?", "What happens when scope changes on a fixed price project?", "Is time and materials more expensive?", "Should I pay for a discovery phase?"
- **Keyword list size:** 4 mapped terms in `05-keyword-map/keyword-map.md` (P2 list), plus "fixed price vs time and materials contract", "firm fixed price contract vs time and materials", "fixed fee contract vs time and materials", "software development pricing models", "it outsourcing pricing models" in `04-keywords/keyword-universe.csv`. No volumes measured.

## Search intent and reader
Commercial investigation. The reader is a founder or SMB owner holding two or three proposals priced different ways, or about to ask for one. Not an engineer and not a procurement officer. They want to know which model protects their budget, what the catch is in each, what to put in the contract, and which to ask for at their stage.

## Overlap with published pages (must be handled in the same pass)

| Page | What overlaps | Action when this post ships |
|---|---|---|
| Cost guide, `src/lib/blog.ts` (slug `how-much-does-custom-software-development-cost`) | H2 "Fixed price vs time & materials: which costs less?" with an intro paragraph, a 5-row table, a recommendation paragraph and the `pricing-models.svg` chart (lines about 336 to 375); FAQ "Should I get a fixed price or pay hourly?"; FAQ "How accurate is an estimate before discovery?" | **Trim to a summary plus link** (clusters C-7). Draft replacement below. Keep the H2 and the chart so the page doesn't change shape much; replace the paragraph, table and paragraph with one paragraph. Shorten the FAQ answer to match F4 |
| MVP cost post, `src/lib/posts/mvp-development-cost.ts` | H2 "Should an MVP be fixed price or time and materials?" (3 paragraphs) | Keep: it's MVP-specific and short. Add one link to the new post. Make sure its discovery wording matches F4 |
| Maintenance cost post | H2 "Retainer, pay as you go, or an in-house developer" plus a table | Keep: different question (upkeep after launch). Link to it from section 9 of the new post |
| How to choose, `src/lib/blog.ts` | Scorecard row "Fixed price vs time & materials" | Add one link from that passage |

### Draft replacement for the cost guide section (paste when this post ships)

Keep the H2 "Fixed price vs time & materials: which costs less?" and the `pricing-models.svg` image. Replace the intro paragraph, the table and the "Our recommendation" paragraph with:

> How you're billed matters almost as much as the rate. A fixed price suits a clearly scoped first version, because the agency carries the risk of being wrong. Time and materials suits a product that changes every week after launch, because you only pay for work that gets done. Our [fixed price vs time and materials guide](/blog/fixed-price-vs-time-and-materials) compares them row by row and lists what each contract should include.

Replace the FAQ "Should I get a fixed price or pay hourly?" answer with one line per F4 outcome, for example (free call then paid discovery): "Use a fixed price for a well-scoped first version and time and materials once the product is live. A short paid discovery is what makes the fixed price accurate." Leave "How accurate is an estimate before discovery?" alone unless F4 says discovery is free.

## SERP snapshot

WebSearch 15 Oct 2026 (two queries, unranked) plus the 29 Sep list in `03-serp/serp-analysis.md` D9 (rated Medium).

| # | Title | URL | Opened? | Gap |
|---|---|---|---|---|
| 1 | Fixed price vs time and materials: which contract fits your software project? (Wavect) | https://wavect.io/software-development-guide/fixed-price-vs-time-and-materials/ | Yes | Dated 26 Jun 2026. Verdict: fixed price when scope is settled, weekly retainer when it moves, most projects combine both. 6-dimension table. "Discovery from EUR 3,500". Does not cover small budgets, change-request mechanics in any detail, how to write a scope, milestone or capped models |
| 2 | Fixed Price vs Time and Materials: The Short Answer (13Labs) | https://www.13labs.au/guides/fixed-price-vs-time-and-materials-software | Yes | Dated 25 Jul 2026. No table. Paid discovery then fixed build. Leans on 2012 McKinsey/Oxford, Standish 2020, PMI 2017 and Flyvbjerg figures, all second-hand; MVP range unsourced. Promotional |
| 3 | Fixed Price (FP) vs Time & Materials (T&M) (Cprime) | https://cprime.com/?p=77295 | No | Vendor guide |
| 4 | Time & materials vs fixed price (Miquido, 2 URLs) | https://miquido.com/blog/time-materials-vs-fixed-price | No | Vendor guide |
| 5 | Fixed price vs time and materials (Monterail) | https://www.monterail.com/blog/2016/fixed-price-vs-time-and-materials | No | URL dated 2016 |
| 6 | Time and materials vs fixed price 2025 (Baytech, 2 URLs) | https://www.baytechconsulting.com/blog/time-and-materials-vs-fixed-price-2025 | No | "2025" in the URL: stale against a 2026 page |
| 7 | Codewave, Moodup, Scopic, Edana, Pragmatic Coders, Spiria | see search results | No | Vendor guides; Edana dated 22 Mar 2026 |
| 29 Sep | Saigon Technology, NetSuite, ScienceSoft, Powergate, Soltech, Enkonix, The Virtual Forge, GainHQ | `03-serp` D9 | No | Vendor guides and one ERP vendor (NetSuite) |

**Overall gaps:**
- Every result is a vendor that sells one of the two models, and most say so near the end. None cites a neutral definition.
- Change requests are mentioned everywhere and shown nowhere: nobody walks through one with numbers.
- Few give a contract checklist per model, and none covers what a small business with one project and a fixed budget should ask for.
- Hybrids (capped time and materials, milestone pricing, fixed-price discovery) get a line, not a comparison.
- Several leaders are dated 2016 or "2025".

## Our angle
"Neither model is cheaper. The difference is who pays for being wrong, and you can see it in the contract." Written by a founder who quotes both ways. Use the US Federal Acquisition Regulation as the neutral, quotable definition of each model (it's the clearest public text on when each one fits), then translate it for a small business. Add the two things the SERP lacks: a worked change request on the cost guide's $60,000 example, and a two-column contract checklist. Close with which model fits which stage of a product, so it hands off to the MVP, maintenance and cost posts instead of repeating them.

## Title, meta, excerpt
- **Title (57 chars):** Fixed Price vs Time and Materials: Which Should You Pick?
- **Meta description (148 chars):** Fixed price vs time and materials for software: who carries the risk, how change requests work, what each contract needs, and which fits your stage.
- **Excerpt:** Neither pricing model is cheaper. They differ in who pays when the plan turns out wrong. Here's how each works, what to put in the contract, and which to ask for at each stage.

## Outline (H2s as questions, each opening with the direct answer)

**Opening verdict (first paragraph, Template C):** Choose a fixed price when you can write down what "done" means and you need a budget you can't exceed. Choose time and materials when the scope will change as you learn, usually after launch. Most products use both, in that order.

1. **What's the difference between fixed price and time and materials?**
   Answer: A fixed price is one agreed number for an agreed scope, and the agency absorbs overruns; time and materials bills the hours actually worked at agreed rates, and you absorb them.
   Cover: the FAR definitions in plain words (T&M buys labour hours at fixed hourly rates plus materials at cost; FAR says T&M "may be used only when it is not possible" to estimate the work accurately). Note the FAR is US government procurement, used here because it's a clear public definition, not because private contracts follow it.
   **Comparison table (10 rows):** Row label | Fixed price | Time and materials. Rows: what you agree up front; who pays for overruns; budget certainty; flexibility to change; what a change costs; paperwork per change; incentive for the team; what you must watch; best stage; biggest risk. (Headers must differ from the cost guide's `["", "Fixed price", "Time & materials"]`; use "Question", "Fixed price", "Time and materials".)
2. **Which model costs less?**
   Answer: Neither, on average. A fixed price includes a buffer for the agency's risk; time and materials has no buffer but no ceiling either. What you pay depends on how much the scope moves.
   Cover: illustrative example on the cost guide's $60,000, about 14-week MVP. Fixed: the quote includes a buffer (hypothetical, labelled: "say 15%"). T&M: the same estimate at a blended rate, landing lower if scope holds and higher if it grows. **Chart 2.** Label "Illustrative, not Arrowbin pricing".
3. **Who carries the risk in each model?**
   Answer: Under a fixed price the agency carries the cost risk and you carry the scope risk (getting exactly what was written, no more). Under time and materials you carry the cost risk, so you need visibility.
   Cover: FAR 16.601 says T&M "provides no positive profit incentive to the contractor for cost control or labor efficiency" and requires "appropriate Government surveillance". Translate: for a small business, "surveillance" means weekly demos, timesheets you can read, and a budget alert. **Chart 1** (who carries what).
4. **How do change requests work on a fixed-price project?**
   Answer: Anything outside the written scope gets a written change request with its own price and time impact, which you approve before the work starts.
   Cover: a worked change request (hypothetical): adding Google sign-in two weeks before launch; what the change note should say (what, why, hours, price, effect on the launch date); why vague scopes turn into change-request fights. **Chart 3** (change request flow).
5. **When is time and materials the better choice?**
   Answer: When you can't write down "done" yet: after launch, for features that depend on user feedback, for research-heavy work such as AI features whose output quality is uncertain, and for open-ended upkeep.
   Cover: FAR 16.202-2's mirror image (fixed price fits when "performance uncertainties can be identified and reasonable estimates of their cost impact can be made"). What a good T&M arrangement looks like: a rate card, a monthly cap or alert, weekly demos, a two-week notice period.
6. **What about capped time and materials, milestones and retainers?**
   Answer: They're hybrids that trade some flexibility for some certainty: a cap limits the bill, milestones tie payment to working software, and a retainer buys a fixed block of hours each month.
   **Table columns:** Model | How you pay | What's fixed | What can move | Good for | Watch out for. Rows: fixed price; time and materials; capped T&M (not-to-exceed); fixed price per milestone; monthly retainer; dedicated team (one line, link out later to the staff augmentation post when it exists). Link the maintenance post for retainers.
7. **What should each contract include?**
   Answer: A fixed-price contract needs a scope with acceptance criteria and a change process; a time-and-materials contract needs rates, a cap or alert, reporting and an exit clause. Both need IP ownership and a handover.
   **Two-column checklist (Chart 4 plus a list block).** Fixed: scope document with screens or user stories, acceptance criteria, change-request process and rate for changes, payment milestones tied to working builds, bug-fix period after launch, IP and handover. T&M: rate card per role, monthly budget cap or alert threshold, weekly timesheets and demo, notice period, IP assigned as work is paid, handover. Not legal advice; say so once.
8. **Should you pay for discovery before a fixed price?** `[F4-dependent: write after the founder decides]`
   General answer that holds under any F4 outcome: A fixed price is only as good as the scope behind it, and discovery is the work that writes that scope; some agencies charge for it and some fold it into the sales process.
   Cover: what discovery produces (scope, flows, architecture, estimate); the cost guide's split puts discovery at about 10% of the $60,000 example, roughly $6,000 (already published in MVP$); one vendor in the SERP lists discovery "from EUR 3,500" (Wavect, opened). Then one of the three Arrowbin variants below.
9. **Which model fits each stage of a product?**
   Answer: Fixed or capped for discovery, fixed price for the first version, time and materials or a retainer after launch.
   Cover: stage table or **Chart 5** (idea, discovery, MVP, post-launch, upkeep), linking MVP cost, MVP timeline, maintenance cost. Keep it short; those posts hold the numbers.
10. **So which should you ask for?** (closing, not "Conclusion")
    One short paragraph: ask for the model that matches what you know today, then the F4 variant sentence and one link to `/services/custom-software-development`, plus `/contact` or the booking link once.

### F4 variants for section 8, the CTA and the closing (pick one)

- **(a) Free call, then a paid discovery, then a fixed price:**
  "We start with a free 30-minute call to see if we're the right team. If we are, a short paid discovery turns your idea into a written scope, and the build gets a fixed price against it."
  CTA: title "Holding two proposals priced differently?", text "Send us both. On a free 30-minute call we'll tell you what each one leaves out.", label "Book a free call".
- **(b) Free call, then a fixed estimate (no paid discovery):**
  "We scope the first version with you on a free call and a short follow-up, then give you a fixed estimate before any work starts."
  CTA: same title, text "Tell us what you're building and we'll come back with a fixed estimate.", label "Get a fixed estimate".
- **(c) Paid discovery only:**
  "We run a short paid discovery first, because a fixed price is only honest when there's a written scope behind it."
  CTA: same title, text "Tell us what you're building and we'll suggest a discovery scope and price.", label "Ask about discovery".

The same choice must then be applied to the cost guide FAQ, the MVP cost and SaaS cost CTAs and closings, the TIME CTA, and the custom software service FAQ ("After a short discovery call we give you a fixed estimate"), per editor-report F4.

## Original chart and diagram ideas
1. **Who carries what: a two-sided risk diagram.** Fixed price: agency carries cost overrun, client carries "got what was written". T&M: client carries cost overrun, agency carries little. No numbers.
2. **Same project, two bills (illustrative).** The $60,000 example: fixed price as one bar (estimate plus a labelled hypothetical buffer); T&M as a range (scope holds / grows 20% / grows 40%). Label "Illustrative, not Arrowbin pricing".
3. **Change request flow.** Request, impact note (hours, price, date), client approves or drops, work starts, scope document updated.
4. **Contract checklist matrix.** Rows of clauses, ticks under Fixed price, Time and materials, Both.
5. **Stage map.** Idea, discovery, first version, post-launch, upkeep, each tagged with the usual model.
6. **Cover:** a proposal or e-signature UI mockup with two pricing cards side by side ("Fixed price" and "Time and materials"), a scope checklist and a change-request panel. UI labels only.

## FAQs
1. **Is time and materials always more expensive?** No. If the scope holds, it often costs less than a fixed price because there's no risk buffer in the number. It costs more when the scope keeps growing and nobody is watching the hours.
2. **Can a fixed price go up?** Only through approved change requests for work outside the written scope. If a fixed price rises without a signed change, that's a contract problem, not a pricing model.
3. **What is a not-to-exceed or capped time and materials contract?** You pay for hours worked, but the total can't pass an agreed cap without your written approval. It suits work where the scope is mostly known but a few parts are uncertain.
4. **Which pricing model is best for an MVP?** Usually a fixed price, once the scope is written down, so the launch budget can't run away. Switch to time and materials or a retainer after launch, when changes follow user feedback.
5. **How do I stop a time and materials project from running over?** Set a monthly cap or alert, ask for weekly timesheets and a demo of working software every week or two, and keep the right to pause with short notice.
6. **Are milestone payments the same as a fixed price?** Not quite. Milestones split payment into stages tied to working software. Each milestone can be fixed or capped, which gives you checkpoints to stop if the project goes wrong.
7. **What should a fixed-price scope document include?** The screens or user stories, what counts as done for each one (acceptance criteria), what's out of scope, and how changes are priced. If it's two pages of adjectives, the price behind it is a guess.
8. **Does the pricing model change who owns the code?** It shouldn't. Under either model the contract should assign the code and IP to you as work is paid for, and include a handover at the end.

## Internal links
| Target | Anchor text |
|---|---|
| `/services/custom-software-development` | a fixed-scope first version |
| `/blog/how-much-does-custom-software-development-cost` | the $60,000 example budget |
| `/blog/mvp-development-cost` | pricing an MVP |
| `/blog/software-maintenance-cost` | retainers after launch |
| `/blog/how-to-choose-a-software-development-company` | comparing agency proposals |
| `/contact` or the booking link (once) | per the F4 variant |

**Inbound when it ships (3+):** the cost guide (the trimmed section above), the MVP cost post (its fixed vs T&M H2), the "how to choose" post (its scorecard row). Clusters.md section 4 suggests COST and CHOOSE; MVP$ is the third natural source.

## Verified facts to cite (all opened 15 Oct 2026)
| Fact (exact) | Source URL | Published |
|---|---|---|
| FAR 16.601: a T&M contract is for "supplies or services on the basis of" direct labour hours at specified fixed hourly rates and actual materials cost; it "may be used only when it is not possible at the time of placing the contract" to estimate accurately the extent or duration of the work or anticipate costs with confidence; it "provides no positive profit incentive to the contractor for cost control or labor efficiency"; "appropriate Government surveillance of contractor performance is required" | https://www.acquisition.gov/far/16.601 | FAC 2026-01, effective 13 Mar 2026; page "Last Updated 09/23/2026" |
| FAR 16.202-2: a firm-fixed-price contract is suitable when fair prices can be set at the outset, for example when "available cost or pricing information permits realistic estimates of the probable costs of performance" or "performance uncertainties can be identified and reasonable estimates of their cost impact can be made" | https://www.acquisition.gov/far/16.202-2 | FAC 2026-01, effective 13 Mar 2026 |
| Wavect lists "Discovery from EUR 3,500" and recommends fixed price for settled scope, a weekly retainer for moving scope | https://wavect.io/software-development-guide/fixed-price-vs-time-and-materials/ | 26 Jun 2026. Cite as one vendor's published price, if at all |
| Arrowbin's worked example: a $60,000, about 14-week MVP with discovery at about 10% (about $6,000) | `/blog/how-much-does-custom-software-development-cost` and `/blog/mvp-development-cost` (our own, labelled Arrowbin estimate) | 15 Oct 2026 |

Before quoting the FAR, the writer should re-open both pages and copy the exact sentences (the fetch tool paraphrased parts of the definition).

## Length
1,800 to 2,400 words. Template C is table-led; don't pad.

## Do not claim
- Overrun statistics (McKinsey/Oxford "45% over budget", Standish CHAOS, PMI, BCG, Flyvbjerg) unless the writer opens the primary source. 13Labs quotes them second-hand, and the McKinsey page timed out in this research.
- Wavect's "55–70% of fixed-price projects hit at least one scope change" and "80–90% of T&M engagements drift" (self-reported by a vendor, not opened).
- Any Arrowbin rate, buffer percentage or discovery price (F4, D4). The 15% buffer in section 2 is a labelled hypothetical, not our pricing.
- That fixed price "protects you from all overruns" or that T&M "always costs more".
- Legal advice. One line saying "this isn't legal advice; have a lawyer read the contract" is enough.
- No em dashes.
