# PR and brand mentions

Where a small software company can earn real mentions in 2026, which of those places still exist, and what to pitch them. The goal (FIX-PLAN P4.10) is 2 or more linked or unlinked mentions of Arrowbin a month. A mention without a link still counts: Google and AI assistants learn that Arrowbin exists, and what it knows about, from other people writing about it.

Every URL below was opened on 15 October 2026 unless it says otherwise.

**Time budget:** about 30 minutes, three times a week. Answer only the requests you can answer well. One sharp, specific reply beats five generic ones.

---

## 1. Journalist request platforms

These send you questions from writers who need an expert quote. You answer; if they use your answer, you get a mention and often a link.

| Platform | Status on 15 Oct 2026 | Cost | Sign up | Fit for Arrowbin |
|---|---|---|---|---|
| **Qwoted** | Active (2026 footer, recent product news) | Free and Pro plans for experts (its pricing page title says so) | https://app.qwoted.com/users/sign_up | Good: business, tech and small-business writers. Start here. |
| **Featured** | Active | "Free to start. No credit card required." (its pricing page); paid plans exist | https://featured.com/signup | Good for founder Q&A-style quotes. Answer only strong-fit questions. |
| **Source of Sources** | Active (2026 footer); free daily email of media queries, run by Peter Shankman, who founded HARO | Free | the sign-up form on https://www.sourceofsources.com/ | Mixed topics; scan the daily email, answer the tech and small-business ones. |
| **MentionMatch** (where Help a B2B Writer now points) | helpab2bwriter.com now redirects to https://mentionmatch.com/, which says "launching soon" | Not stated | https://mentionmatch.com/register | Good topic fit (SaaS, AI & Tech, Ecommerce, Design & UX). Register now; requests may be slow to start. |
| **#JournoRequest on X** | Search works | Free | https://x.com/search?q=%23JournoRequest | Save the search; check it when you have five minutes. |

Not listed: Connectively (the old HARO), which Cision shut down in December 2024 (source in `docs/seo/09-links/link-opportunities.csv`), and SourceBottle, which we could not open on 15 October.

**Your expert profile** on each platform: use the short founder bio and photo from `profile-facts.md` section 10. Topics: software development cost, MVPs, SaaS, e-commerce in Bangladesh, payment gateways (bKash, Nagad, SSLCommerz), WordPress to Next.js migration, AI agents for small businesses, vibe-coded apps and security.

### How to answer a request (template)

> [One-sentence direct answer to their exact question, with a number if you have a sourced one.]
>
> [Two to four sentences of detail: the specific thing most people get wrong, or what you'd do instead, and why.]
>
> [Optional: one line pointing to the guide for their research, e.g. "We worked out the model costs from the providers' price lists here: https://arrowbin.com/blog/ai-agent-cost-small-business"]
>
> Md. Shishir Ahmed, Founder and Lead Engineer, Arrowbin (https://arrowbin.com)

Rules: answer the question asked, keep it under 150 words, use only numbers from the guides (each one is sourced there), and never claim client results the guides don't contain.

---

## 2. Bangladeshi tech and business press

| Outlet | URL | What it covers | How to approach |
|---|---|---|---|
| Future Startup | https://futurestartup.com/ | Longform on Bangladeshi startups, business and technology | Contributed analysis pieces. We found no current guidelines page (an old `/contribute` path is 404); use the "Write For Us" link in the site footer. **[FOUNDER: check the footer link before pitching.]** |
| The Daily Star, Tech & Startup | https://www.thedailystar.net/tech-startup (redirects to https://www.thedailystar.net/news/technology) | Tech news and startup features | Pitch a timely, data-led angle to the tech desk. **[FOUNDER: find the current tech editor's email on the site.]** |
| The Business Standard, Tech | https://www.tbsnews.net/tech | Tech and business news; also runs op-eds | An op-ed under your byline (SME digitisation, online payments for small stores). |
| bdnews24.com, Technology | https://bdnews24.com/technology | General tech news | News pegs only (a launch, a free tool, a dataset). |
| TechShohor (Bangla) | https://techshohor.com/ | Bangla-language tech news | A Bangla explainer pitch, for example on courier or payment integrations. |
| LightCastle Partners, Insights | https://lightcastlepartners.com/insights/ | Research-led analysis of Bangladeshi markets | Later: a co-written piece once you have original data (see the survey idea in `09-links/link-building-plan.md`). |

## 3. Communities and events in Bangladesh

| Group | URL | Why |
|---|---|---|
| BASIS (Bangladesh Association of Software and Information Services) | https://basis.org.bd/ | National software industry body. Paid membership, a member listing and events. Worth it if you will actually attend. |
| e-CAB (e-Commerce Association of Bangladesh) | https://e-cab.net/ | Most of Arrowbin's live clients are e-commerce stores. Offer a talk on payment or courier integrations at an SME event. |
| GDG Dhaka (Google Developer Groups) | https://gdg.community.dev/gdg-dhaka/ | Offer a technical talk (Next.js performance, bKash integration). Event pages usually name and link speakers. |

## 4. Podcasts

Feedspot's Bangladesh list (https://podcast.feedspot.com/bangladesh_podcasts/) includes three shows that fit a founder interview:
- **2 Cents Podcast**: conversations with Bangladeshi entrepreneurs and experts on business, marketing and productivity (weekly, per Feedspot).
- **Bangladesh Angels**: angel investing and startups, from the Bangladesh Angels Network.
- **Bangladeshi Trailblazers**: profiles of professionals across industries in Bangladesh.

We could not open the shows' own pages (Spotify blocked us), so check each is still releasing episodes before you pitch. Angle: a founder-led software company in Bangladesh building for clients worldwide since 2020, and what you've learned about pricing software honestly.

## 5. Developer sites (republish with a canonical link)

- **DEV** (https://dev.to/): republish the technical guides (vibe-coded checklist, courier API, payment gateway, WordPress to Next.js) with the canonical URL set to the arrowbin.com version, so Google treats arrowbin.com as the original. Links from DEV are nofollow; the value is readers and mentions.
- Do this one or two weeks after the original is live and indexed.

---

## 6. Six pitch angles tied to the new guides

Each angle has a hook, the sourced facts to use (all from the guide, where every number links to its source), and who it suits. Never pitch a guide before it is live on arrowbin.com.

### Angle 1: "Before your AI-built app takes money, check who can see the data"
- **Guide:** https://arrowbin.com/blog/vibe-coded-app-production-ready
- **Facts:** the public Lovable and Moltbook incidents both came down to missing Row Level Security; the Supabase secret key must never reach a browser; a backup isn't proven until you've restored it.
- **Offer:** a five-point pre-launch checklist founders can run in an afternoon.
- **For:** startup and tech desks, Qwoted/Featured requests about AI coding tools, Future Startup.

### Angle 2: "What it really costs a small Bangladeshi store to take online payments in 2026"
- **Guide:** https://arrowbin.com/blog/payment-gateway-integration-bangladesh
- **Facts:** SSLCommerz lists a Tk 25,500 non-refundable Basic plan and 2.5% per successful transaction (3.5% for AMEX), as of 15 October 2026; most stores still need cash on delivery alongside bKash and Nagad; never mark an order paid from the browser redirect.
- **Offer:** a plain comparison of aggregator vs direct bKash, and the integration mistake that loses orders.
- **For:** The Daily Star Tech & Startup, TBS, TechShohor (in Bangla), e-CAB events.

### Angle 3: "The model bill is the smallest part of an AI agent's cost"
- **Guide:** https://arrowbin.com/blog/ai-agent-cost-small-business
- **Facts:** about $5 to $216 a month in model fees for 3,000 conversations, worked out from providers' price lists on 15 October 2026; Intercom lists Fin at $0.99 per outcome; integrations and how much the agent may do unsupervised drive the real cost.
- **Offer:** a three-question budget test any small business can use before buying or building.
- **For:** small-business and tech writers on Qwoted, Featured and MentionMatch.

### Angle 4: "Shopify charges Bangladeshi stores an extra fee on every gateway order"
- **Guide:** https://arrowbin.com/blog/shopify-vs-custom-ecommerce
- **Facts:** Shopify Payments isn't available in Bangladesh, so Shopify adds 2% (Basic) or 1% (Grow) to every gateway-paid order on top of the gateway's fee; cash on delivery orders carry no Shopify fee; on fees alone a custom store only catches the best Shopify plan at about $142,000 a month in gateway-paid sales.
- **Offer:** an honest "start on Shopify unless..." checklist from a company that builds custom stores.
- **For:** Bangladeshi business press, e-CAB, e-commerce Facebook group admins.

### Angle 5: "A November deadline for anyone still running PostgreSQL 14"
- **Guide:** https://arrowbin.com/blog/software-maintenance-cost
- **Facts:** PostgreSQL 14 gets its final release on November 12, 2026; Google Play has required API level 36 for app updates since August 31, 2026; Patchstack's 2025 data puts the weighted median time to first exploit for WordPress-ecosystem flaws at 5 hours.
- **Offer:** what a sensible yearly maintenance budget covers (Arrowbin's planning estimate: roughly 15 to 20% of the build cost).
- **For:** tech desks before 12 November; small-business writers any time.
- **Timing:** this one is time-sensitive. Pitch in the last week of October or the first week of November, or not at all.

### Angle 6: "What developers earn by country, including Bangladesh: original data"
- **Post:** https://arrowbin.com/blog/developer-salaries-by-country (being written; check the final slug, and don't pitch until it is live).
- **Source:** Arrowbin's own analysis of the Stack Overflow Developer Survey dataset (https://survey.stackoverflow.co/). Original analysis of a public dataset is what data journalists and newsletter editors look for, because they can cite it and check it.
- **Facts:** [write after the post is final: the survey year, the sample size, the Bangladesh figure exactly as published (median or mean, currency, which respondents), and two or three country comparisons]. Use only numbers the post publishes, with its method note.
- **Offer:** the chart and the method, a short quote on what the gap means for founders hiring or outsourcing, and the cleaned country table if the post shares one.
- **For:** tech journalists and newsletters covering developer pay, hiring and remote work; Bangladeshi tech desks (The Daily Star Tech & Startup, TBS Tech, Future Startup, TechShohor in Bangla); Qwoted and Featured requests about developer salaries or offshoring.
- **Care points:** say which survey year you used and that self-reported survey pay is not payroll data. Follow the dataset's licence and attribution terms as the post states them.

Backups if a desk wants something else: the courier API guide (why stores still retype addresses into courier panels) and the WordPress to Next.js guide (how to move without losing Google rankings).

---

## 7. Pitch email template

Send to one named person. Personalise the first line, or don't send it.

**Subject:** [Specific, under 60 characters, e.g. "Data: what small BD stores pay to take bKash and cards"]

> Hi [first name],
>
> [One line showing you read their work: "Your piece on [topic] last [month] made the point that [specific point]."]
>
> I run Arrowbin, a software development company that builds online stores and custom software for clients worldwide, many of them in Bangladesh. We've just published a guide on [topic], and one finding might be useful for a story:
>
> [The single most interesting sourced fact, in one or two sentences, with its date.]
>
> [One sentence on why it matters to their readers now.]
>
> Everything in the guide links to its source: [guide URL]. I'm happy to answer questions, give a quote, or write a short piece for you on [angle] if that's more useful.
>
> Thanks for reading,
> Md. Shishir Ahmed
> Founder and Lead Engineer, Arrowbin
> hello@arrowbin.com | https://arrowbin.com

**Follow-up** (once, after 5 to 7 working days): "Hi [name], following up once in case this is useful for anything you're working on. No worries if not."

### Pitch rules
- One outlet, one person, one angle per email. No mass sends, no BCC lists.
- Lead with the fact, not with Arrowbin.
- Never offer payment or a gift for coverage, and never pay for a "sponsored" article that passes a followed link (Google counts that as link spam).
- If a writer quotes you without a link, say thank you anyway. The mention still helps.

---

## 8. Track mentions

- Set a Google Alert (https://www.google.com/alerts) for `"Arrowbin"` and for `"Md. Shishir Ahmed"`.
- Once a month, search Google and Bing for `"Arrowbin" -site:arrowbin.com` and note new mentions in the tracking sheet in `README.md`.
- Ask ChatGPT, Perplexity and Google's AI Mode once a month: "What is Arrowbin?" and "Who are good software development companies for e-commerce in Bangladesh?" Note whether Arrowbin appears and what it says. On 15 October 2026 a web search for "Arrowbin" software returned nothing about Arrowbin, so any appearance is progress.
