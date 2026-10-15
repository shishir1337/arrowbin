# FLOW analysis: all stages, arrowbin.com (14 Oct 2026)

> Framework and prompts © Daniel Agrici, CC BY 4.0, github.com/AgriciDaniel/flow

**How this was produced:** the seo-flow agent produced the analysis (its environment could not write files, so it was saved by the orchestrator).
**Limits:**
- The FLOW prompt files were not present in this install, so stage logic was applied from the framework rather than individual prompt files.
- The agent could not reach the local build. Statuses come from `CONTEXT.md` and live checks.
**Orchestrator corrections (verified 14 Oct):**
- AI crawler access is partly fixed: GPTBot, Claude-SearchBot, PerplexityBot and OAI-SearchBot return 200; **ClaudeBot still returns 403**.
- The homepage has **no** hero lead form (the old `HeroLeadForm` component is unused). Lead capture is the contact brief, the service-page quote form and Cal.com.

## FIND
- **Volume data:** 1,352 keywords are mapped, but only 14 have volumes, so page priority is judgement, not numbers [NEW]. Fix the data gap first: Search Console, Bing Webmaster Tools, and Keyword Planner or DataForSEO.
- **AI prompts differ from Google keywords** (e.g. "agency that builds Bangladesh e-commerce with bKash", "US-contracted Bangladesh dev team"). The 40-prompt tracker covers these, but no prompt is mapped to a page. Add a prompt-to-page column.
- **Branded search is untracked.** Once Search Console is live, "arrowbin" queries are the earliest sign of entity recognition.
- **Homepage title:** "Software Development Company for Startups & SMBs" is FIXED-LOCAL, not live. Live still shows "Custom Software Development Company | Arrowbin".
- **Evidence needed:**
  - Search Console queries and impressions
  - Bing data
  - volumes for the 12 primary keywords
  - the monthly AI prompt tracker

## LEVERAGE (assets already owned)
| Asset | How to use it | Gap in existing plan | Priority |
|---|---|---|---|
| 8 live client sites | Link and proof candidates. Only 2 have footer credits (nbafl.net, maneelclub.com). | The roadmap treats it as a footer-credit chore. One ask per client should cover all three: footer credit, a short quote, and a Clutch review. | High |
| Founder (Md. Shishir Ahmed) | Named author on every guide and a Person entity (schema, LinkedIn, GitHub). | The founder isn't used as the trust signal. Add a byline + "why I wrote this" on guides, a LinkedIn posting cadence, and journalist requests (Qwoted etc.) under his name. | High |
| Bangladesh e-commerce proof (Silent Lifestyle BD, FlexOver BD, North Bengal Agro Farms, Maneel Club, gtegoyna) | The strongest, least contested niche; supports `/ecommerce-website-development-bangladesh`. | Planned for November. Move it **ahead of the Tampa page** (real proof exists; Tampa has none). | High |
| Next.js stack | An open-source Next.js kit for Bangladeshi gateways (bKash, Nagad, SSLCommerz): developer links + GitHub entity; supports `/services/nextjs-development`. | Planned for months 4–6; a small repo + README could ship in weeks. | Medium |
| Hostinger partnership | The badge links out with referral code "arrowbin". | Outbound only. Ask Hostinger for an inbound partner-page link and a co-written agency hosting guide; list in the Hostinger Agency Directory. | Medium |
| Homepage pricing statements ("smaller builds typically start around $5,000–$10,000", "first usable version in 6–12 weeks") | The seed of `/pricing` and the calculator. | Prices contradict across pages: the founder must pick one source of truth. | High |
| Cal.com booking + `/api/contact` with `generate_lead` events | The conversion plumbing exists. | See WIN. | Medium |

## OPTIMIZE
- **Trust is the binding constraint (E-E-A-T 41).** The placeholder testimonials are kept by founder decision; they're reported as a risk only (US FTC fake-review rule, and AI engines discount unverifiable proof). Truthful substitutes: "built by" client links, named GitHub and LinkedIn, a founder byline.
- **Verify the Florida LLC.** Every directory and Clutch step depends on it.
- **Entity consistency:** the GitHub org still says `info@` and "Arrowbin Digital Agency" [OPEN]. Unify name, description, email and phone everywhere.
- **AI crawler access:** ClaudeBot is still 403 [OPEN]; the others now return 200 [FIXED-LIVE].
- **Raw HTML:** H1 spacing and in-`<main>` text are FIXED-LOCAL, so deploying is the real action.
- **Process gap:** the 1 October fixes sat undeployed for two weeks. Add a "deployed and verified live" checkbox to every roadmap item.

## WIN (lead conversion from organic and AI traffic)
1. **Bookings are invisible in GA4.** `generate_lead` fires from the forms, but there's no Cal.com booking event [NEW]. Add a booking-click event and a Cal.com webhook or redirect-back.
2. **Intent-matched CTAs:** AI and organic visitors land on guides and cost posts. Each needs a mid-article CTA tied to its topic (cost post → calculator → quote form). Write a per-template CTA spec.
3. **One primary action per page type**, with the response promise ("reply within one business day") next to it.
4. **Ungated calculator** with an optional "email me the breakdown" step as lead capture; pre-fill the quote form from the calculator inputs.
5. **AI referral tracking:** besides the GA4 channel group, add a "How did you hear about us?" field with an AI-assistant option. Many AI visits arrive without a referrer.
6. **Lead response SLA:** an alert on submission and a same-day reply target.
7. **Objection handling:** repeat time zone, IP ownership ("100% code ownership, no lock-in") and payment safety near every CTA on offshore and cost pages.
8. **Proof near the CTA:** named client sites with links beside forms, not invented quotes.
9. **Segment by lead type:** Bangladeshi e-commerce owners (BDT, WhatsApp-first) vs US/UK founders (USD, calendar-first). Add WhatsApp on Bangladesh pages (no WhatsApp number is listed today).

## LOCAL
- **Agree:** no Google Business Profile at the shared virtual office; a Dhaka GBP only if that office is staffed and visitable; local pages linked from the footer only (founder rule).
- **Gap:** Dhaka/Bangladesh is the real local market. Consider the Bangla e-commerce page earlier, plus Bangla-language listings (local directories, Facebook business page).
- **Before any Dhaka GBP:** make the Dhaka phone and street address match everywhere.

## Gaps in the existing plan
1. No volume data.
2. No prompt-to-page mapping.
3. ClaudeBot still blocked.
4. Booking and WhatsApp events untracked.
5. Founder and client-site assets under-used.
6. No inbound ask to Hostinger.
7. No "deployed and live-verified" gate.
8. The Bangladesh e-commerce page should come before the Tampa page.

## Actions
| # | Action | Priority | Owner | Effort |
|---|---|---|---|---|
| 1 | Deploy the 7 local fixes and verify live with curl | Critical | dev | S |
| 2 | Unblock ClaudeBot in Cloudflare; re-test all AI user agents | Critical | founder | S |
| 3 | Verify the Florida LLC status on Sunbiz | Critical | founder | S |
| 4 | Connect Search Console + Bing, submit the sitemap | High | founder/dev | S |
| 5 | Cal.com booking event + "How did you hear about us?" field | High | dev | S |
| 6 | One price source of truth; publish `/pricing` | High | founder, dev | M |
| 7 | Bangladesh e-commerce page ahead of the Tampa page | High | dev, content | M |
| 8 | One message per client: footer credit + quote + Clutch review | High | founder | S |
| 9 | Founder byline and bio on every guide | High | content | S |
| 10 | Per-template CTA spec (cost post → calculator → quote form) | High | dev | M |
| 11 | Ask Hostinger for an inbound partner link + directory listing | Medium | founder | S |
| 12 | Prompt-to-page column in the AI tracker | Medium | content | S |
| 13 | Small open-source Next.js Bangladesh payments repo | Medium | dev | M |
| 14 | WhatsApp contact on Bangladesh pages | Medium | founder | S |
| 15 | Bangla version of the e-commerce page | Low | content | M |

**Failure checks:**
- no lead events in GA4 within 30 days of deploy
- any AI user agent still non-200
- fewer than 3 client reviews by week 6
