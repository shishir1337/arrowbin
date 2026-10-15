# Brief: software-maintenance-cost (backup 3)

## Cannibalisation check (read first)
- `/blog/how-much-does-custom-software-development-cost` already says, in "What hidden costs should you budget for?": "As a planning rule of thumb (an Arrowbin estimate, not an industry statistic), set aside roughly 15–20% of your build cost per year for ongoing ownership" (`src/lib/blog.ts` line 381). This post must use the **same 15–20% Arrowbin estimate** and go deeper (what it buys, why it can't be skipped, how to choose a plan). It must not restate the cost guide's project tiers except as inputs to the worked examples.
- `/services/maintenance-support` targets "software maintenance and support services" (commercial). This post targets the informational cost question and links to the service page with a commercial anchor. Keep the plan description consistent with the service FAQ: every plan covers monitoring, security and dependency updates, backups, bug fixes and a monthly health report; plans are monthly retainers with a defined response SLA, month to month after onboarding (`src/lib/services.ts` lines 903–935).

## Keywords
- **Slug:** `/blog/software-maintenance-cost`
- **Primary keyword:** how much does software maintenance cost
- **Secondary (4 to 8):** software maintenance cost per year · software maintenance cost percentage · app maintenance cost · saas maintenance cost · software maintenance retainer · what is included in software maintenance · maintenance cost of custom software
- **Question phrasings seen in results:** "How much does software maintenance cost per year?", "How much does application maintenance cost? A complete guide for businesses", "Software maintenance costs explained", "App maintenance and support costs in the USA in 2026"

## Search intent and reader
Informational with commercial follow-through. Two readers: (1) a founder or SMB owner about to commission software who wants the after-launch budget before signing; (2) an owner who already has software (often built by someone else) and is pricing a maintenance plan. US, UK, Australia first; Bangladeshi store owners as a secondary reader.

## SERP snapshot (web search, 15 Oct 2026)
| # | Title | URL | Gap |
|---|---|---|---|
| 1 | Software maintenance cost benchmark (DACH SaaS) | https://wavect.io/blog/software-maintenance-cost-benchmark-dach-saas/ | 24-product benchmark; useful but DACH SaaS only. **Not opened tonight; don't cite until a writer opens it** |
| 2 | Software maintenance costs explained | https://www.codestringers.com/articles/software-maintenance-costs-explained | Agency explainer; rule of thumb, no "why" |
| 3 | Software maintenance costs | https://blog.maddevs.io/customer-university/software-maintenance-costs/ | Agency; generic |
| 4 | Software maintenance cost | https://mecanik.dev/en/posts/software-maintenance-cost/ | UK freelancer; GBP bands, unsourced |
| 5 | How Much Does Application Maintenance Cost? A Complete Guide for Businesses | https://pctechmag.com/2026/08/how-much-does-application-maintenance-cost-a-complete-guide-for-businesses/ | Aug 2026 trade-site article; generic |
| 6 | App maintenance and support costs in the USA in 2026 | https://www.chopdawg.com/app-maintenance-and-support-costs-in-the-usa-in-2026/ | Mobile-app agency |
| 7 | Custom software maintenance cost 2026 | https://kolonell.com/en/blog/custom-software-maintenance-cost-2026 | Content-farm pattern (many city variants) |
| 8 | Software maintenance | https://aquaveo.com/maintenance | Off-intent: license maintenance for packaged software |

**Overall gaps:** every page repeats a percentage rule with no explanation of what forces the spend; nobody shows the dated platform deadlines (app stores, runtimes, databases) that make maintenance non-optional; few separate "keep it running" from "keep improving it"; none gives a plan-comparison table a buyer can use.

## Our angle
"Maintenance is not optional, and here are the dates that prove it." Pair Arrowbin's 15–20% estimate with a 2026 calendar of real, sourced deadlines: Apple's Xcode 26 SDK requirement (28 Apr 2026), Google Play's API 36 target (31 Aug 2026), PostgreSQL 14 end of life (12 Nov 2026), Node.js 20 already end of life, plus the speed of exploitation in the WordPress ecosystem. Then give the reader a way to choose between a retainer, pay-as-you-go and an in-house hire, and a checklist of what a plan should include.

## Title, meta, excerpt
- **Title (57 chars):** How Much Does Software Maintenance Cost Per Year in 2026?
- **Meta description (154 chars):** Plan on roughly 15–20% of the build cost a year. See what that buys, the 2026 platform deadlines that force updates, and how to choose a maintenance plan.
- **Excerpt:** Software keeps costing money after launch, and for good reasons. Here is how much to budget, what the money buys, and the 2026 deadlines that make skipping it expensive.

## Outline (H2s as questions, each opening with the direct answer)
1. **How much does software maintenance cost per year?**
   Answer: Budget roughly 15–20% of the original build cost each year (an Arrowbin planning estimate, not an industry statistic), plus hosting and third-party fees, which sit outside that figure.
   Cover: worked examples using the cost guide's tiers (see chart 1); the $60,000 SaaS MVP example gives $9,000–$12,000 a year; when to expect more (regulated data, many integrations, fast-growing usage) or less (a stable internal tool).
2. **What does software maintenance actually include?**
   Answer: Four kinds of work: fixing bugs, adapting to platform and dependency changes, improving what users rely on, and preventive work such as monitoring, backups and security patches.
   **Table columns:** Work type | Examples | How often it comes up | What happens if you skip it.
3. **Why can't you just skip maintenance?**
   Answer: The platforms under your software change on fixed dates, and attackers move fast once a flaw is public; an app that isn't updated eventually stops being accepted, supported or safe.
   **Table (the citable asset) columns:** Platform | Requirement or end-of-support | Date | What it means for you | Source. Rows: Apple App Store (Xcode 26 / iOS 26 SDK; iOS 13 minimum target from 9 Sep 2026); Google Play (API 36 for new apps and updates, extension to 1 Nov 2026 on request; existing apps below API 35 hidden from newer devices); PostgreSQL 14 final release; Node.js 20 listed as end of life; WordPress ecosystem (weighted median 5 hours to first exploit).
4. **What drives maintenance cost up or down?**
   Answer: Number of integrations, how many platforms you ship on, how much of the code is covered by tests, how old the dependencies are, and how fast the product is still changing.
5. **Retainer, pay as you go, or an in-house developer: which costs less?**
   Answer: A retainer suits most products after launch because the routine work never stops; pay-as-you-go suits very stable tools; an in-house hire makes sense once there is a full-time stream of work.
   **Table columns:** Model | How you pay | Response time | Best for | Watch-out. In-house reference: US median pay for software developers, QA analysts and testers was $134,040 a year (May 2025, BLS), before benefits and overhead.
6. **What should a maintenance plan include?**
   Answer: Monitoring and alerts, security and dependency updates, backups with tested restores, bug fixes, a monthly report, and a written response time for critical issues.
   Cover: checklist that mirrors the service page's plan contents; questions to ask any provider; what "response SLA" should state (response vs resolution). No invented response times.
7. **How does the budget change over the first few years?**
   Answer: Year one usually carries more fixes as real users find edge cases; later years shift toward updates and improvements. Keep the 15–20% as a planning band and review it yearly.
   Cover: qualitative only; no year-by-year percentages unless a source is opened (the Wavect benchmark is a candidate if a writer opens and verifies it).
8. **What if the software is old or built by someone else?**
   Answer: Start with a code and infrastructure audit, fix the urgent risks first, then modernize step by step instead of rewriting everything.
   Cover: matches the service FAQ; link to the vibe-coded app post for AI-built codebases.
9. **How can you lower maintenance costs without adding risk?**
   Answer: Keep dependencies current in small steps, automate tests and deploys, remove unused plugins and services, and document the system so any engineer can pick it up.

## Original chart and diagram ideas
1. **Range bar: yearly maintenance at 15–20% of build cost (Arrowbin estimate).** Data computed from the cost guide's published tiers: MVP or internal tool $5,000–$30,000 → $750–$6,000 a year; mid-size app $30,000–$90,000 → $4,500–$18,000; SaaS platform $80,000–$200,000 → $12,000–$40,000; $60,000 SaaS MVP example → $9,000–$12,000. Source: `/blog/how-much-does-custom-software-development-cost` (`src/lib/blog.ts` lines 118, 381, 442). Label every bar "Arrowbin estimate".
2. **Timeline: 2026 platform deadlines.** 28 Apr 2026 Apple SDK requirement; 31 Aug 2026 Google Play API 36; 9 Sep 2026 Apple iOS 13 minimum target; 1 Nov 2026 Google Play extension deadline; 12 Nov 2026 PostgreSQL 14 final release. Sources below.
3. **Stacked bar: where WordPress-ecosystem vulnerabilities came from in 2025.** 91% plugins, 9% themes, 6 in core; 46% unpatched at disclosure. Source: Patchstack (below).
4. **Diagram: the four kinds of maintenance work.** Corrective, adaptive, perfective, preventive, with one plain-English example each. Original.

## FAQs
1. **Is 15–20% a year normal for software maintenance?** It's our planning estimate for custom software. Simple, stable tools can need less; regulated or integration-heavy products more.
2. **Does maintenance include hosting?** Usually not. Hosting, domains, email and third-party API fees are separate running costs.
3. **Can I stop maintenance once the software is stable?** You can pause improvements, but platform updates and security patches keep arriving on dates you don't control.
4. **What happens if my app isn't updated for Google Play's requirements?** From 31 August 2026, new apps and updates must target API level 36; existing apps that target API 34 or lower stop showing to new users on newer Android versions.
5. **Is a maintenance retainer worth it for a small business?** If your software takes payments, stores customer data or runs daily operations, yes. A very simple internal tool may be fine with pay-as-you-go.
6. **Can unused retainer hours go to new features?** On our plans, yes: hours not needed for upkeep go into agreed improvements.
7. **Will you maintain software another team built?** Yes, after an audit of the code and infrastructure.

## Internal links
| Target | Anchor text |
|---|---|
| `/services/maintenance-support` | software maintenance and support plans |
| `/services/cloud-devops-hosting` | monitoring, backups and hosting |
| `/blog/how-much-does-custom-software-development-cost` | what the original build costs |
| `/blog/vibe-coded-app-production-ready` (when live) | taking over an AI-built codebase |
| `/blog/saas-development-cost` (when live) | SaaS running costs |
| `/blog/wordpress-to-nextjs-migration` (when live) | when to rebuild instead of patching |
| `/contact` | ask for a maintenance quote |

## Verified facts to cite (opened 15 Oct 2026 unless internal)
| Fact (exact) | Source URL | Published |
|---|---|---|
| Arrowbin estimate: "set aside roughly 15–20% of your build cost per year for ongoing ownership" (labelled "an Arrowbin estimate, not an industry statistic") | `/blog/how-much-does-custom-software-development-cost` (`src/lib/blog.ts` line 381) | live post |
| Apple: since 28 Apr 2026, "Apps uploaded to App Store Connect must be built with Xcode 26 or later using an SDK for iOS 26, iPadOS 26, tvOS 26, visionOS 26, or watchOS 26"; since 9 Sep 2026, iOS and iPadOS apps "must target iOS 13 or later" | https://developer.apple.com/news/upcoming-requirements/ | live page |
| Google Play: from 31 Aug 2026, "New apps and app updates must target Android 16 (API level 36) or higher"; "Existing apps must target Android 15 (API level 35) or higher to remain available to new users on devices running Android OS higher than your app's target API level"; extension available to 1 Nov 2026 | https://developer.android.com/google/play/requirements/target-sdk | live page |
| PostgreSQL: "supports a major version for 5 years after its initial release"; version 14 final release 12 Nov 2026; version 13 final release 13 Nov 2025 | https://www.postgresql.org/support/versioning/ | live page |
| Node.js: LTS "typically guarantees that critical bugs will be fixed for a total of 30 months"; "Production applications should only use Active LTS or Maintenance LTS releases"; v20 (Iron) listed as EOL | https://nodejs.org/en/about/previous-releases | live page |
| Patchstack: 11,334 new WordPress-ecosystem vulnerabilities in 2025 (+42%); 91% plugins, 9% themes, 6 in core; 46% unpatched at disclosure; weighted median time to first exploit 5 hours | https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/ | updated 25 Feb 2026 |
| US median pay, software developers, QA analysts and testers: $134,040 a year, $64.44 an hour (May 2025) | https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm | last modified 27 Aug 2026 |

## Length
2,200 to 2,800 words.

## Do not claim
- A different maintenance percentage from the cost guide's 15–20% without the founder updating both.
- Arrowbin plan prices or response times (the service page publishes neither).
- Competitor figures (Wavect's 24%/21%/26% medians, Kolonell or Mecanik bands, "60–80% of lifetime cost is maintenance") unless a writer opens and verifies the source; the lifetime-cost claim is widely repeated without a primary source.
- Node.js 22 or 24 end-of-life dates (the releases page fetched tonight didn't state them clearly).
- Any client's maintenance spend or incidents.
- No em dashes.
