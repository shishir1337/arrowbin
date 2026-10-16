# Service page: AI-built app audit and production hardening

> **NEEDS FOUNDER CONFIRMATION (F8). Do not build or publish any part of this page until the founder confirms the offer exists.**
> The vibe-coded post already offers "a read-only review" in its CTA card and closing paragraph, but the founder has not confirmed that offer, whether it is free, how long it takes, or that Arrowbin has done this kind of takeover (editor-report F8; SXO notes the writer's own flag that no takeover was confirmed). Every line below that promises something is marked `[FOUNDER: ...]`. If the answer to F8 is "no", soften the post's CTA instead and drop this page.

**Status:** draft copy only. Nothing is built.
**Item:** #8 in `docs/seo/14-audit-2026-10-15/findings/clusters.md` section 4, and SXO finding N4.
**Template:** A (service page), mapped onto `Service` plus `ServiceExtras` in `src/lib/services.ts`.
**Informational twin:** `/blog/vibe-coded-app-production-ready` (the checklist post, keyword "vibe coded app production ready").

## Founder questions this page cannot go live without

| # | Question | Where it shows on the page |
|---|---|---|
| Q1 (F8) | Does Arrowbin offer an audit of AI-built code as a distinct service? | The whole page |
| Q2 (F8) | Is the audit free, fixed-fee, or folded into a paid discovery (F4)? If paid, what price can be shown? | Answer block, form intro, Project card, FAQ 1 |
| Q3 | How long does the audit take, and what is delivered (written report, call, both)? | Answer block, process, FAQ 2 |
| Q4 | Read-only access only, under NDA? Which access do you need (repo, database read role, hosting)? | Outcomes, process step 1, FAQ 4 |
| Q5 | Which builders' output have you actually worked on (Lovable, Bolt, v0, Replit, Cursor, Claude Code)? Only list those. | Intro, idealFor, FAQ 5 |
| Q6 | Has Arrowbin hardened or taken over an AI-built app yet? If yes, can it be described anonymously (client type, what was fixed, year)? | Proof section. Without it, the proof heading must say "Production sites by the same team" |
| Q7 | Do you keep the client's stack, or move apps to your own (for example Next.js on a VPS)? | Benefits, FAQ 6 |

## 1. Why a service page

- **The commercial queries return service pages, not checklists.** On 15 Oct 2026 (WebSearch, US):
  - "vibe code cleanup" returned 9 results, all agency service pages or their blogs: Forasoft, Innowise, Chudovo (2), SoftTeco (2), Acropolium, DBB Software, Redwerk.
  - "fix vibe coded app service" returned 5 Fiverr gigs, 1 Upwork gig, PC Apps and Wavect's "Vibe Code Rescue" page.
  - "vibe code cleanup audit lovable app production hardening" returned Wavect (2), DBB Software, MetaCTO "Vibe Rescue", Valletta Software (2), MEV "Vibe-Code to Production", Innowise and a SolGuruz Q&A page.
- **The post can't take that click.** The post's own keywords include "fix vibe coded app" and "vibe code cleanup", but those SERPs are sellers. SXO N4 says the post alone won't capture the "hire someone" click.
- **The post already sells it.** Its CTA ("Send us your repo for a review") points to `/contact`, with no page behind it.

### Pairwise check against the post

The post's SERP (from its brief, 15 Oct 2026): withsurface, codeconductor, getautonoma, jetadmin, dev.to, redwerk blog, knolli, vibeappscanner. Shared exact URLs with each of the three service queries above: **0**. The page and the post are separate. Keep "production ready", "security risks", "RLS check" and "is Lovable safe" on the post; move the seller phrasings to this page.

**Recommended URL:** `/services/vibe-code-cleanup`. The working name in clusters.md was `/services/vibe-code-audit`. "Cleanup" is the phrase with the cleanest service-page SERP (9 of 9), and the audit appears as step one in the copy. If the founder only wants to sell the audit, use `/services/vibe-code-audit` and the same copy minus the hardening steps.

## 2. Keyword set

| Keyword | Owner | Note |
|---|---|---|
| **vibe code cleanup** | this page (primary) | 9 of 9 results are service pages |
| vibe coding cleanup services | this page | Same intent |
| fix vibe coded app | this page | Move it out of the post's `keywords` when this ships |
| ai-built app audit / vibe code audit | this page | Sourcetoad and Valletta use "vibe audit" |
| lovable app to production (help) | this page, once Q5 confirms Lovable work | Sourcetoad has a dedicated "lovable dev to production help" page (`02-competitors/gap-analysis.md` gap 8). Unmeasured; run a pairwise check against the post before moving it |
| vibe coded app production ready, vibe coding security risks, supabase row level security check, is lovable safe for production, vibe coding vs hiring a developer | the post | Keep off this page's title and H1 |

## 3. SERP snapshot (15 Oct 2026, unranked)

| Result | URL | Opened? | What it offers / gap |
|---|---|---|---|
| Vibe Code Rescue (Wavect) | https://wavect.io/services/vibe-coding-rescue/ | Yes | Two ways in: a "Vibe Code Audit" ("Usually a few days", "typically a few days at a fixed fee") and a "Full Rescue" ("a few weeks"). Six steps: Audit, Triage, Harden, Test, Ship, Handover. A keep-vs-rebuild call. Downloadable sample findings. 11 FAQs, including cost and time. No prices. Its FAQ describes weekly billing and cancellation, which reads oddly beside its fixed-scope promise |
| Vibe Audits (Sourcetoad) | https://www.sourcetoad.com/vibe-audits/ | Yes | A "Vibe Readiness Report" for "$499" per project, with a 0 to 100 score, top priorities, a "fix now / fix soon / nice to have" roadmap and a PDF. Says "Within hours, you'll receive a detailed scorecard". No FAQ |
| Vibe Code Cleanup (Redwerk) | https://redwerk.com/services/vibe-code-cleanup/ | No | Search summary only |
| Vibe coding cleanup services (Innowise, SoftTeco, Chudovo, Acropolium, DBB, Forasoft) | see section 1 | No | Search summaries describe audit, refactor, security hardening, tests. Chudovo mentions a free codebase evaluation |
| Vibe Rescue (MetaCTO), Vibe-Code to Production (MEV), Vibe Audit (Valletta) | https://www.metacto.com/solutions/product-development/vibe-rescue, https://mev.com/services/vibe-code-to-production, https://vallettasoftware.com/vibe-audit | No | The search tool's summary says Valletta lists audits "from $199". Not opened, so do not cite |
| Fiverr and Upwork gigs (6) | e.g. https://fiverr.com/fahddev/fix-bugs-and-build-your-vibe-coded-app-fast | No | Fix-bugs gigs; some quote very low prices |

**What wins:** a named audit with a named deliverable, a clear second step (fix or harden), a keep-vs-rebuild promise, the builder tools named, and FAQs on cost and time.

**Gaps we can fill:**
- Most pages repeat one vendor statistic (Veracode's "45%"). Our post already cites primary sources (Lovable's docs, the Stack Overflow survey, the reported Lovable and Moltbook RLS incidents), so the page can link out to those instead of repeating a number.
- None we opened publishes the actual checklist. Ours is public, in the post, so the buyer can run it first and know what they're paying for.
- Few say plainly what the audit will *not* do (rewrite your app on day one).
- None offers the same team for upkeep afterwards. We have the maintenance and cloud pages to hand over to.

## 4. Page outline, mapped to the existing sections

Default branch of `src/app/services/[slug]/page.tsx`, same as the WordPress page. The build note in `wordpress-to-nextjs-migration-service.md` section 4 applies here too (keep it out of the main `services` array or accept a sitewide visual change).

| # | Component | Fields | Content |
|---|---|---|---|
| 01 | `ServiceHero` | `heading`, `intro`, `copy.form` | H1, intro, "send us the repo" form |
| 01b | `ServiceValue` | `answer`, `outcomes`, `idealFor`, `copy.fit`, `benefits` | Answer block, 3 chips, who it's for, 4 benefits |
| 02 | `ServiceSignature` | default | Later idea: a mini self-check (5 yes/no questions from the post) that links to the post. Dev plus sign-off |
| 03 | `ServiceDeliver` | `deliverables`, `tech` | Audit report and fixes |
| 04 | `ServiceProcess` | `process` | 5 steps from the post's "production hardening project" section |
| 05 | `ServiceWork` | `relatedWork` | `title="Production sites by the same team"` unless Q6 gives a real case (rule from `page.tsx`: no heading may promise proof we can't show) |
| 06 | `Engagement` | `copy.engagement` | Project / Product team / Care plan |
| 07 | `ServiceGuides` | `relatedPosts` | VIBE post, MVP vs prototype, maintenance cost |
| 08 | `Faq` | `faqs` | 7 FAQs |
| 09 | `ServiceRelated`, 10 `Cta` | `copy.cta` | Closing line |

## 5. Draft copy, field by field

Everything here is conditional on Q1. Placeholders are `[FOUNDER: ...]`.

### Core fields

- **slug:** `vibe-code-cleanup`
- **name:** AI-Built App Audit
- **heading (H1):** Vibe Code Cleanup and Production Hardening
- **summary (cards):** An engineer's audit of your AI-built app, then the fixes that let it take real users and real payments.
- **metaTitle (47 characters):** Vibe Code Cleanup: AI-Built App Audit and Fixes
- **metaDescription (146 characters):** Vibe code cleanup for apps built with AI tools: a read-only audit of data access and secret keys, then the fixes that make the app safe to launch.
  `[FOUNDER: Q4, "read-only" is a promise]`
- **keywords:** `["vibe code cleanup", "vibe coding cleanup services", "fix vibe coded app", "vibe code audit", "ai-built app audit", "lovable app to production"]` (the last one only if Q5 confirms Lovable work)

- **intro (head term in sentence one):**
  > Our vibe code cleanup starts with an engineer reading your AI-built app before anyone changes a line. We check who can read and change data, where the secret keys live, how payments are confirmed, and whether a backup can actually be restored. Then we fix what blocks launch and leave the screens that already work alone. `[FOUNDER: Q5, optionally add one sentence naming the builder tools you've worked with, e.g. "We've cleaned up apps from Lovable and Bolt."]`

- **benefits (4):**
  1. **Audit before changes.** `[FOUNDER: Q4]` We read the code and the database rules first, and rank what we find by risk, in plain English.
  2. **Fix or rebuild, per part.** Most of an AI-built app is worth keeping. We tell you which module, if any, has to be rebuilt, and why.
  3. **Your stack stays.** `[FOUNDER: Q7]` We harden what you have instead of moving you to our favourite framework.
  4. **Safe to change later.** Tests on sign-in and checkout, a deploy pipeline and error alerts, so the next AI-written change can't quietly break production.

- **deliverables (6):**
  - Written audit, ranked by risk `[FOUNDER: Q3, format]`
  - Database access rules (RLS) fixed and tested
  - Secret keys moved server-side and rotated
  - Payment webhooks verified and made idempotent
  - Tests and a deploy pipeline
  - Error alerts and a tested backup restore

- **tech:** `["Supabase", "PostgreSQL", "Next.js", "React", "Stripe", "Firebase", "GitHub Actions"]` `[FOUNDER: confirm; list only what you'll take on]`

- **process (5 steps, taken from the post's "What does a production hardening project look like?" section):**
  1. **Audit.** We read everything without changing anything, and rank the findings by risk. `[FOUNDER: Q3, Q4]`
  2. **Launch blockers.** Data access rules, exposed keys and payment checks get fixed first, as small separate changes.
  3. **Tests and CI.** Automated tests for sign-in and checkout, then the core workflow, run on every push.
  4. **Alerts.** Error tracking and uptime alerts that reach a person who will act on them.
  5. **Handover.** A short document: how to run it, where secrets live, how to roll back, and what was left for later.

  The other pages use 4 steps; `ServiceProcess` takes any number, but check the layout with 5 at sign-off, or merge steps 3 and 4.

### Extras

- **answer (about 50 words):**
  > Vibe code cleanup is an engineer's audit and repair of an app built with AI coding tools, so it can safely take real users and payments. Arrowbin starts with a read-only review of data access, secrets, payments and backups, then fixes the launch blockers. The audit takes [FOUNDER: Q3] and costs [FOUNDER: Q2].

  If Q2 means a free review: "...then fixes the launch blockers. The first review is free and takes [FOUNDER: Q3]."

- **outcomes (3 chips; each is a commitment, so each needs a yes):**
  - `{ value: "Read-only", label: "Audit before any change" }` `[FOUNDER: Q4]`
  - `{ value: "Per module", label: "Fix-or-rebuild call" }`
  - `{ value: "Yours", label: "Repo and accounts stay in your name" }` `[FOUNDER: confirm]`

- **idealFor (4):**
  - Founders about to take payments in an app built with AI tools
  - Apps that store personal data and have never had a security review
  - Products where every new feature breaks an old one
  - Teams that got a security questionnaire from a business customer

  (These are the "get a human in now" triggers from the post, so the page and the post agree.)

- **relatedWork:** `["Silent Lifestyle BD", "FlexOver BD", "OutNet"]` with `title="Production sites by the same team"`, unless Q6 supplies a real AI-built app case.
- **relatedPosts:** `["vibe-coded-app-production-ready", "mvp-vs-prototype-vs-poc", "software-maintenance-cost"]`

- **copy.form:**
  - intro: Send us the repo link. No obligation. `[FOUNDER: Q1, Q2]`
  - placeholder: Which tool built it, and what must work on launch day?
- **copy.fit:** If you're about to charge money through it, let's look first.
- **copy.process:** Nothing gets rewritten on day one. The audit decides what changes.

- **copy.engagement:**
  - **intro:** Start with the audit and the launch-blocker fixes as one project. After launch, a care plan keeps it patched, or a team keeps building.
  - **project** ("Project")
    - lead: An audit, then the fixes that block launch. `[FOUNDER: Q2, add "with a fixed price" only if true]`
    - fit: Best for an app about to take real users or payments.
    - points:
      1. Written audit before any change `[FOUNDER: Q3]`
      2. Data access and keys fixed first
      3. Tests on sign-in and checkout
  - **team** ("Product team")
    - lead: Engineers who keep building the app with you, month to month.
    - fit: Best once customers ask for more than the prototype does.
    - points:
      1. New features, reviewed before deploy
      2. AI tools kept for drafts, not production
      3. The same people who did the audit
  - **care** ("Care plan")
    - lead: Patching, backups and alerts after the cleanup.
    - fit: Best for founders without an engineer on staff.
    - points:
      1. Dependency and security updates
      2. A backup restore tested monthly
      3. Alerts that reach an engineer

  "A backup restore tested monthly" matches the post's advice, but it's a care-plan commitment: `[FOUNDER: confirm the care plan includes it]`.

- **copy.cta (closing line):**
  > Send us the repo and the flows that must work on launch day. We'll tell you what blocks launch, what can wait, and whether any part needs a rebuild. `[FOUNDER: Q2, Q3; add a turnaround only if you can keep it]`

### FAQs (7; plain text, no links, none copied from the post's FAQ)

1. **How much does a vibe code cleanup cost?**
   `[FOUNDER: Q2, audit price or "the first review is free"]`. The fixes are priced after the audit, because missing guards can take days while a wrong data model can take weeks. Anyone quoting the full cleanup before reading the code is guessing.

2. **How long does the audit take?**
   `[FOUNDER: Q3]`. You get `[FOUNDER: a written report / a call / both]` that ranks each finding as a launch blocker, something to fix soon, or something that can wait.

3. **Will you rewrite my app?**
   Usually not. The screens an AI tool generates are often fine and are the cheapest part to keep. We rebuild a module only when its data model, auth or payment flow is wrong at the root, and we tell you which one and why before you agree to anything.

4. **What access do you need?**
   `[FOUNDER: Q4]` Read-only access to the repository and the database, plus a list of the flows that must work. We don't need production write access for the audit, and you can revoke everything when it's done.

5. **Which AI coding tools do you work with?**
   `[FOUNDER: Q5]`. The tool matters less than what it produced. We run the same checks on all of them, starting with the database rules and where the keys live.

6. **Can I keep building with AI tools after the cleanup?**
   Yes. Keep them for new screens and drafts. The difference is that every change is reviewed and tested before the pipeline deploys it. Nothing goes straight from a chat window to production.

7. **Is Lovable or Bolt code safe for production?**
   It can be, if the configuration is right: every table needs access rules, secret keys stay on the server, and auth allows only your real domain. Lovable's own security documentation says its scanners can't guarantee complete security, so get a human review before you handle payments or personal data.

   (FAQ 7 overlaps the post's "Is Lovable safe for production?" in topic. The wording above is different and adds Bolt; if the editor still sees a duplicate, drop it and keep 6 FAQs.)

## 6. Links

**In, when it ships (3+ body links):**

| From | Passage | Anchor | Note |
|---|---|---|---|
| `/blog/vibe-coded-app-production-ready` | CTA card (`href: "/contact"`) and the closing paragraph ("turn a prototype into production software", today linked to custom software) | vibe code cleanup | Re-point the closing link, keep custom software as a second link if wanted. Then remove "fix vibe coded app" and "vibe code cleanup" from the post's `keywords` |
| `/blog/how-to-choose-a-software-development-company` | Any passage on taking over existing code | an audit of AI-built code | New anchor |
| `/blog/software-maintenance-cost` | Inherited or unknown code passage | cleaning up AI-written code first | New anchor |
| `/blog/mvp-vs-prototype-vs-poc` | The prototype section | hardening an AI-built prototype | Optional fourth |

**Out:** guide cards (above). Service pages to link from: `custom-software-development` (its card already shows the VIBE post) and `maintenance-support` (FAQ on inherited software), once FAQ links render (clusters H-4).

## 7. Do not claim

- Any rescue, takeover or hardening story, client name, metric or before-and-after unless Q6 supplies it in writing.
- "Free" anywhere until Q2 says so. "Fixed price" anywhere until Q2 and F4 say so.
- Any turnaround ("within 48 hours", "in a few days") until Q3.
- Unsourced statistics: "74% fail in production", "80% of AI-built apps", or Veracode's 45% unless the writer opens Veracode's own report.
- Any builder tool the team hasn't actually worked with (Q5).
- That a cleanup makes an app "secure" or "unhackable". Say what was checked and fixed.
