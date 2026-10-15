# Brief: mvp-vs-prototype-vs-poc (clusters.md item 1)

## Keywords
- **Slug:** `/blog/mvp-vs-prototype-vs-poc`
- **Primary keyword:** mvp vs prototype vs poc
- **Secondary (4 to 8):** proof of concept vs prototype · prototype vs mvp · poc vs mvp · difference between prototype and mvp · what comes first poc or prototype · proof of concept vs prototype vs mvp
- **Question phrasings seen in results:** "What comes first, proof of concept or prototype?", "What is the difference between a POC and an MVP?", "Can a PoC, prototype and MVP be used together?", "When should a business use a PoC instead of an MVP?", "Is a prototype the same as an MVP?", "Do you always need to code your POC, prototype or MVP?", "How long does a PoC take?"

## Search intent and reader
Informational with a decision attached. The reader is a non-technical founder or a product owner at an SMB who has an idea, maybe some funding, and keeps hearing the three terms used loosely by agencies and investors. They want plain definitions, a side-by-side table, and a straight answer on which one to spend money on first. Secondary reader: a founder holding an AI-built app who isn't sure whether it is a prototype or an MVP.

## SERP snapshot (web search, 15 Oct 2026, US)
| # | Title | URL | Gap |
|---|---|---|---|
| 1 | POC vs MVP vs Prototype: How Do They Differ and Relate? | https://synodus.com/?p=17311 | Agency blog; generic definitions |
| 2 | Prototype vs MVP vs Proof of Concept: Key Differences Explained (2026) | https://www.uxpin.com/studio/blog/prototype-vs-mvp-vs-proof-of-concept/ | Opened. Updated 9 May 2026, about 1,500 words, 7-row table. Timelines unsourced and inconsistent between table and FAQ (prototype "days to weeks" vs "1 to 4 weeks"). No cost. Plugs own product in every section. |
| 3 | Prototype vs MVP vs Proof of Concept (Goodreads author blog) | https://www.goodreads.com/author_blog_posts/24002467-prototype-vs-mvp-vs-proof-of-concept-differences-and-similarities | Syndicated agency post |
| 4 | POC, MVP, prototype differences | https://www.nomtek.com/blog/poc-mvp-prototype-differences | Opened. Oct 2023, no table, no costs, no exit criteria, all examples are its own clients. |
| 5 | PoC vs MVP vs Prototype: What's the Difference? | https://softwaremind.com/blog/poc-vs-mvp-vs-prototype-whats-the-difference/ | Opened. Mar 2025, 6-row table, cost only "low / moderate / higher", contradicts itself on whether a PoC tests design. |
| 6 | Prototype vs POC vs MVP | https://www.rishabhsoft.com/blog/poc-vs-prototype-vs-mvp | Agency blog |
| 7 | POC vs prototype vs MVP: differences explained | https://program-ace.com/blog/poc-prototype-mvp/ | Agency blog |
| Variant query "what comes first proof of concept or prototype" | netguru, cprime, idealogic ("MVP vs Prototype vs POC: What to Build First"), eleken, cleveroad, gorrion, entrepreneur.com | Same shape: POC first by default, "it depends" |

**Overall gaps:** every page is a vendor blog with the same skeleton (define three terms, table, "it depends"). Timelines are unsourced and often contradict themselves. Nobody says what each one cannot tell you, what result should move you to the next stage (exit criteria), or what happens to the code afterwards. Nobody deals with the 2026 problem: AI app builders produce something that looks like an MVP but is really a high-fidelity prototype. Nobody points out that "prototype" means a working model in engineering (NASA TRL 6) but a clickable mockup in software design, which is where much of the confusion comes from.

## Our angle
"Build the one that tests the assumption most likely to sink you." Verdict first, then a 10-row table with a "what it can't tell you" row and a "what happens to it afterwards" row. Every timeline is either Arrowbin's published figure (prototype days to 2 weeks, MVP 6 to 14 weeks, from the timeline post) or labelled "our view". Sourced anchors: Eric Ries's MVP definition, NN/g on prototypes and 5-user testing, GV's one-day prototype, NASA's TRL scale for where "proof of concept" comes from, CB Insights on why startups fail, Gartner's prediction on GenAI projects dropped after PoC. Owns the definitions and the decision; links out for MVP cost, MVP timeline and AI-built apps instead of repeating them.

## Title, meta, excerpt
- **Title (54 chars):** MVP vs Prototype vs POC: Which Should You Build First?
- **Meta description (about 150 chars):** MVP vs prototype vs POC: what each proves, how long each takes, what each can't tell you, and a simple path for deciding which one to build first.
- **Excerpt:** A proof of concept, a prototype and an MVP each answer a different question. This guide compares them side by side and shows how to pick the one your idea needs first.

## Outline (H2s as questions, each opening with the direct answer)
1. **What's the difference between a POC, a prototype and an MVP?** Each answers one question: can it be built, will people understand it, will they use it and pay. Comparison table (10 rows: purpose, question, audience, fidelity, typical time, typical cost, what you learn, what it can't tell you, what happens to it afterwards, next step).
2. **What is a proof of concept, and when do you need one?** Feasibility test of one risky piece; throwaway code; pass/fail written before. NASA TRL 3 origin. Gartner prediction: passing a PoC is not a business case. Most CRUD web and SaaS products don't need one.
3. **What is a prototype, and what can it tell you?** NN/g: a prototype is a hypothesis; low vs high fidelity. GV sprint: one-day prototype, realistic facade. NN/g 5 users find about 85% of problems. Engineering vs design meaning of "prototype". Link `/services/ui-ux-design`.
4. **What is an MVP, and why isn't it just a smaller product?** Ries definition and "not about creating minimal products". Real users, real money. CB Insights 43% poor product-market fit. Arrowbin 6 to 14 weeks; link the timeline and cost posts.
5. **Which should you build first?** Decision path (numbered list + decision-tree SVG). Start with the riskiest assumption.
6. **How long does each one take compared with the others?** Relative time chart. Prototype days to 2 weeks and MVP 6 to 14 weeks (Arrowbin); PoC sized to one question (our view). What you pay for: people and weeks. Link `/services/saas-product-engineering`.
7. **Is an AI-built app a prototype or an MVP?** High-fidelity prototype that happens to run, until it is safe for strangers' data and money. Link the vibe-coded post.
8. **What should each stage hand to the next?** Exit criteria and handover artifacts; the mistakes (PoC code in production, endless prototype polishing, an MVP with every feature).
- Closing H2 (distinct): **What's the cheapest test you can run this month?**

## Original chart and diagram ideas
1. **Reality vs audience map** (how real it is vs who sees it): POC (real code, own team), prototype (looks real, test users), MVP (real code, real customers), AI-built app sitting between. Original diagram.
2. **Usability problems found vs number of test users** from Nielsen's model (L = 31%; 5 users about 85%, 15 users all). Source: NN/g 2000.
3. **Decision tree: which to build first.** Original diagram.
4. **Relative time bars on one week axis:** prototype days to 2 weeks, MVP 6 to 14 (complex to 20), PoC days to a few weeks (our view, hatched). Arrowbin estimates.
5. **Handover pipeline:** what each stage passes on and what gets thrown away. Original diagram.

## FAQs
1. Can a prototype be used as an MVP?
2. Is a pilot the same as an MVP?
3. Should you show investors a POC, a prototype or an MVP?
4. Is proof of concept code thrown away?
5. Can you skip the prototype and go straight to an MVP?
6. What's the difference between a wireframe and a prototype?
7. How do you know your MVP is small enough?

## Internal links
| Target | Anchor text |
|---|---|
| `/blog/how-long-does-it-take-to-build-an-mvp` | week-by-week MVP timeline |
| `/blog/mvp-development-cost` | what an MVP costs and why |
| `/blog/vibe-coded-app-production-ready` | production checklist for AI-built apps |
| `/services/ui-ux-design` | UI/UX design and prototyping |
| `/services/saas-product-engineering` | SaaS product engineering |
| `/contact` | send us a short brief |

## Verified facts to cite (all opened 15 Oct 2026)
| Fact (exact) | Source URL | Published |
|---|---|---|
| MVP is "that version of a new product which allows a team to collect the maximum amount of validated learning about customers with the least effort"; "MVP, despite the name, is not about creating minimal products." | https://www.startuplessonslearned.com/2009/08/minimum-viable-product-guide.html | Eric Ries, 3 Aug 2009 |
| A prototype is "a hypothesis"; low fidelity = static, a person plays "the computer"; high fidelity "often look like 'live' software to users"; "Ripping up code is very expensive." | https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/ | Kara Pernice, NN/g, 18 Dec 2016 |
| Five test users find about 85% of usability problems (L = 31% per user); run 3 studies of 5 rather than 1 of 15; at least 15 users to find all problems; model holds for comparable users | https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/ | Jakob Nielsen, 18 Mar 2000 |
| The sprint is "a five-day process"; Thursday prototype: "A realistic façade is all you need to test with customers", "you can finish your prototype in just one day"; Friday: interview customers and watch them react | https://www.gv.com/sprint/ | GV, page copyright 2019 |
| NASA TRL 3: "A proof-of-concept model is constructed"; TRL 6: "a fully functional prototype or representational model" | https://www.nasa.gov/directorates/somd/space-communications-navigation-program/technology-readiness-levels/ | 27 Sep 2023, updated 25 Jun 2026 |
| 431 VC-backed shutdowns since 2023; poor product-market fit 43%; ran out of capital 70% ("almost always the final cause of death, not the root problem") | https://www.cbinsights.com/research/report/startup-failure-reasons-top/ | 5 Mar 2026 |
| Gartner predicted at least 30% of GenAI projects would be abandoned after proof of concept by end of 2025 (poor data quality, inadequate risk controls, escalating costs, unclear business value) | https://www.intelligentcio.com/eu/2024/08/05/gartner-predicts-30-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025/ | 5 Aug 2024 (Gartner's own release returned 403; cite as reported) |

**Arrowbin published figures to reuse (no new ones):** prototype "days to 2 weeks", MVP 6 to 14 weeks (simple 6 to 8, standard 10 to 14, complex SaaS 14 to 20), full product 6 to 18 months (timeline post); lean MVP $5,000 to $30,000, polished $40,000 to $120,000 (cost guide and MVP cost post).

## Length
1,800 to 2,600 words of body. Table-led; keep prose tight.

## Do not claim
- Any Arrowbin price or timeline for a POC or a standalone prototype (none published). Label POC length "our view".
- Any client story, or that Arrowbin has built a specific POC or prototype for a named client.
- Unsourced timelines from the SERP pages ("PoC 2 to 6 weeks", "MVP 2 to 6 months").
- That Gartner's prediction came true (no follow-up data found).
- The Dropbox video, Zappos or Airbnb MVP stories (no primary source opened tonight).
- No em dashes.
