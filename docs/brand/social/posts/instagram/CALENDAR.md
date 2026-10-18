# Instagram posts: ready to schedule after recovery

The same 12 posts as Facebook, made for Instagram:

- **Images:** 1080×1350 (4:5 portrait), the size Instagram's feed shows biggest. Everything important sits inside the 3:4 crop that the profile grid shows.
- **Captions:** the Facebook text, but each link line now says "link in bio", because links in Instagram captions can't be clicked.
- **Hashtags:** 5 or fewer per post, which is Instagram's limit.

## Before the first post

1. Recover the account. Then set the name to `Arrowbin` and the username to `arrowbinhq` (see `../../ACCOUNTS-AUDIT.md`).
2. Switch to a Professional (Business) account and connect it to the Facebook page in Meta Business Suite.
3. Add two bio links:
   - Contact: `https://arrowbin.com/contact?utm_source=instagram&utm_medium=social&utm_campaign=profile`
   - Blog: `https://arrowbin.com/blog?utm_source=instagram&utm_medium=social&utm_campaign=social_2026_10`
4. Tell Claude the new handle. The website's social links still point to `instagram.com/arrowbinllc` and need updating, then a deploy and a Cloudflare purge.

## When and how

**When:** Mon, Wed and Fri at 8:00 PM Bangladesh time, the same slot as Facebook. Start with post 1 on the first Mon, Wed or Fri after recovery, then keep the order. Post 12 must not go out before 13 Nov 2026, because it says PostgreSQL 14's final release was on 12 Nov.

**How:** Meta Business Suite → Planner → Create post → tick Instagram → upload the image, paste the caption → set the date and time → Schedule. Paste the alt text too if the composer has a field for it. If it doesn't, add it in the Instagram app after the post goes live: ... → Edit → Edit alt text.

| # | Type | Image | Caption | Date posted |
|---|---|---|---|---|
| 1 | Who we are | `post-01-what-we-build.png` | `post-01-what-we-build.txt` | |
| 2 | Guide | `post-02-mvp-timeline.png` | `post-02-mvp-timeline.txt` | |
| 3 | Guide | `post-03-hiring-red-flags.png` | `post-03-hiring-red-flags.txt` | |
| 4 | Guide | `post-04-custom-software-cost.png` | `post-04-custom-software-cost.txt` | |
| 5 | Guide | `post-05-shopify-vs-custom.png` | `post-05-shopify-vs-custom.txt` | |
| 6 | Guide | `post-06-wordpress-to-nextjs.png` | `post-06-wordpress-to-nextjs.txt` | |
| 7 | Guide | `post-07-poc-prototype-mvp.png` | `post-07-poc-prototype-mvp.txt` | |
| 8 | Checklist | `post-08-vibe-coded-checklist.png` | `post-08-vibe-coded-checklist.txt` | |
| 9 | Guide | `post-09-chatgpt-shopping.png` | `post-09-chatgpt-shopping.txt` | |
| 10 | Guide | `post-10-ai-what-to-automate.png` | `post-10-ai-what-to-automate.txt` | |
| 11 | Guide | `post-11-bangladesh-payments.png` | `post-11-bangladesh-payments.txt` | |
| 12 | Guide | `post-12-maintenance-cost.png` | `post-12-maintenance-cost.txt` | |

## 1. Who we are

Image: `post-01-what-we-build.png`

Alt text:

```
Arrowbin post on an ultraviolet background. Headline: Software that moves. Services listed: custom software, web apps, mobile apps, e-commerce stores, SaaS products, UI/UX design, AI automation, cloud and DevOps. For startups and small businesses worldwide, since 2020.
```

Caption:

```
Arrowbin builds software for startups and small businesses: custom platforms, web and mobile apps, online stores, SaaS products and AI automation.

We've been at it since 2020, and the work we like most is taking something slow or fragile and making it fast and dependable.

Here we'll share what we learn on real projects. Honest cost ranges, timelines, checklists, and the odd strong opinion.

Have a project in mind? Book a free call. The link is in our bio.

#SoftwareDevelopment #Startups #WebDevelopment #AppDevelopment #Arrowbin
```

## 2. Guide

Image: `post-02-mvp-timeline.png`

Alt text:

```
Bar chart titled How long does an MVP take? Simple tool 6 to 8 weeks, standard MVP 10 to 14 weeks, complex SaaS MVP 14 to 20 weeks. Most well-scoped MVPs launch in 6 to 14 weeks. Arrowbin estimates, 2026.
```

Caption:

```
Most well-scoped MVPs launch in 6 to 14 weeks.

Our estimates for 2026:
• Simple tool: 6–8 weeks
• Standard MVP: 10–14 weeks
• Complex SaaS MVP: 14–20 weeks

Scope moves the timeline more than anything else. Every feature you move to version two buys you time. The next biggest delays are unclear requirements and slow decisions, and you can fix both before anyone writes code.

The full guide, with a worked example, is on our blog. Link in bio.

#MVP #StartupTips #ProductDevelopment #SoftwareDevelopment
```

## 3. Guide

Image: `post-03-hiring-red-flags.png`

Alt text:

```
List titled 6 red flags when you hire a dev company: a quote that seems too good to be true, vague timelines and no clear process, no live work you can use, no mention of testing, security or maintenance, won't confirm you own the code, slow unclear replies before you sign.
```

Caption:

```
Six red flags when you're hiring a software company:

1. A quote that seems too good to be true. It usually leaves out design, QA or discovery.
2. Vague timelines, no clear process and hand-wavy answers about how they work.
3. They won't share references or let you use their live work.
4. No mention of testing, security or maintenance.
5. They won't confirm you'll own the code and infrastructure.
6. Slow, unclear replies during the sales process. It only gets worse after you sign.

Weigh track record, communication and process far above price. Shortlist three to five firms and ask each one the same questions.

The full guide, with the questions to ask, is on our blog. Link in bio.

#SoftwareDevelopment #HiringTips #Outsourcing #Startups
```

## 4. Guide

Image: `post-04-custom-software-cost.png`

Alt text:

```
Cost card titled What does custom software cost? Most business products land at $30k to $120k in 2026. Full range $5k to $250k plus. About 50% of the budget is development. Arrowbin estimates, 2026.
```

Caption:

```
Custom software usually costs $5,000 to $250,000+ in 2026, and most business products land between $30,000 and $120,000.

The range is wide because five things set the price: scope, technical complexity, design depth, how many platforms you ship on, and the seniority and location of the team.

In our typical budget split, development is only about half the cost. Discovery, design, QA and project management make up the rest.

The best way to keep it under control is a tightly scoped MVP and a fixed estimate after discovery. The full breakdown is on our blog. Link in bio.

#CustomSoftware #SoftwareDevelopment #StartupBudget #MVP
```

## 5. Guide

Image: `post-05-shopify-vs-custom.png`

Alt text:

```
Two cards titled Shopify or a custom store? Pick Shopify if you want to launch fast, your catalog and checkout are standard, and you don't want servers to patch. Go custom if checkout or pricing doesn't fit, you need deep integrations, or local payment flows matter.
```

Caption:

```
For most new online stores, Shopify is the right start. It launches fast, the checkout is hosted and there are no servers to patch.

Go custom when the store needs something Shopify handles poorly: checkout changes, complex pricing, deep integrations or local payment flows.

A note for Bangladesh: Shopify Payments isn't available there, so Shopify adds 2% (Basic) or 1% (Grow) to every gateway-paid order, on top of the gateway's own fee. Cash-on-delivery orders carry no Shopify fee.

The full comparison, with the fee math, is on our blog. Link in bio.

#Shopify #Ecommerce #OnlineStore #Bangladesh
```

## 6. Guide

Image: `post-06-wordpress-to-nextjs.png`

Alt text:

```
Two cards titled WordPress to Next.js: worth it? Move when slow pages cost you, plugin upkeep eats your time, or you need custom features. Stay when editors publish every day or the site already works well. Every old URL gets a 308 or a 410.
```

Caption:

```
Moving from WordPress to Next.js pays off when slow pages, plugin upkeep or custom features are costing you money. It's rarely worth it when editors publish every day on a site that already works.

Most of the risk sits in the URLs. Map every old address, give each one a permanent 308 redirect to its closest new page or a 410 if you removed it on purpose, and keep those redirects for at least a year. Google says to expect some ranking movement during any site move, even a well-run one.

Before anyone writes code, list what every plugin actually does. SEO and form plugins often carry hidden jobs like redirects and stored leads.

The full migration guide is on our blog. Link in bio.

#WordPress #NextJS #WebDevelopment #SEO
```

## 7. Guide

Image: `post-07-poc-prototype-mvp.png`

Alt text:

```
Three rows titled POC, prototype or MVP? POC: can it be built? Prototype: can people use it? Days to 2 weeks. MVP: will they use it and pay? 6 to 14 weeks.
```

Caption:

```
POC, prototype and MVP get mixed up a lot, but each one tests something different.

A proof of concept tests whether it can be built.
A prototype tests whether people understand it and can use it.
An MVP tests whether they'll use it for real, and pay.

Build first whichever one tests the risk most likely to sink the idea. Most web and SaaS ideas can skip the POC, because accounts, payments and dashboards are solved problems. By our estimates, a clickable prototype takes days to 2 weeks and an MVP 6 to 14 weeks.

How to choose: the full guide is on our blog. Link in bio.

#MVP #Prototype #StartupTips #ProductDevelopment
```

## 8. Checklist

Image: `post-08-vibe-coded-checklist.png`

Alt text:

```
Checklist titled Is your AI-built app ready to launch? Strangers can't read or change other users' data, secret keys never reach the browser, payments are verified and processed once, errors alert a real person, a backup has been restored.
```

Caption:

```
Built your app with Lovable, Cursor or another AI tool? Check these five things before you take payments or store personal data:

1. Strangers can't read or change other users' data
2. Secret keys never reach the browser
3. Payments are verified and processed only once
4. Errors alert a real person
5. Someone has restored a backup as a test

The public incidents so far mostly came down to missing database access rules and leaked keys, so start there. If the data model is sound, fix the app in place, and rebuild only the part that's wrong at the root.

The full checklist is on our blog. Link in bio.

#VibeCoding #AIApps #AppSecurity #Startups
```

## 9. Guide

Image: `post-09-chatgpt-shopping.png`

Alt text:

```
List titled Get your products into ChatGPT: product pages that load without JavaScript, complete Product and Offer markup, OAI-SearchBot allowed and not blocked by your CDN, a clean Google Merchant Center feed.
```

Caption:

```
ChatGPT now answers shopping questions with product picks. Since March 2026, OpenAI lets merchants keep their own checkout, so the job is getting found and being right about price and stock.

You don't need Shopify for this. You need:
1. Product pages that load without JavaScript. In Vercel's 2024 crawler study, ChatGPT's and Claude's crawlers didn't run it.
2. Complete Product and Offer markup: price, currency, stock, shipping and returns.
3. OAI-SearchBot allowed in robots.txt, and a CDN that doesn't block it anyway.
4. A clean Google Merchant Center feed. OpenAI's own feed is approval-only as of October 2026.

The full guide, for any platform, is on our blog. Link in bio.

#Ecommerce #ChatGPT #AISearch #OnlineStore
```

## 10. Guide

Image: `post-10-ai-what-to-automate.png`

Alt text:

```
Formula titled What should you automate first? Volume times repetitive times error cost times data ready. Score each task 1 to 5 and start with the highest. Good first picks: inbox triage and invoice or document entry, not a customer-facing chatbot.
```

Caption:

```
Most small businesses shouldn't start AI with a customer-facing chatbot.

Start with the job your team repeats most, done the same way every time, where a mistake is cheap to catch and the information is already written down. For most teams that's inbox triage, or invoice and document entry.

A quick way to pick: score each task from 1 to 5 on volume, repetitiveness, error cost and data availability, then multiply. One weak factor sinks a task, which is exactly what you want.

Keep a person approving anything that reaches a customer or moves money until a month of results says otherwise.

The guide, with a worked scoring example, is on our blog. Link in bio.

#AIAutomation #SmallBusiness #AI #Productivity
```

## 11. Guide

Image: `post-11-bangladesh-payments.png`

Alt text:

```
Cards titled bKash or SSLCommerz? Our pick for most stores: cash on delivery plus one aggregator such as SSLCommerz. Add direct bKash once it carries most online payments. Mark an order paid only after your server validates it.
```

Caption:

```
For most online stores in Bangladesh, we recommend cash on delivery plus one aggregator such as SSLCommerz, which takes cards and the main mobile wallets through a single integration.

SSLCommerz lists a Tk 25,500 non-refundable Basic plan and 2.5% per successful transaction (3.5% for AMEX), as of October 15, 2026.

Add a direct bKash integration once bKash carries most of your online payments.

One rule for any gateway: mark an order paid only after your server has validated the payment with the gateway. The redirect back to your site isn't proof of payment.

The full guide is on our blog. Link in bio.

#bKash #SSLCommerz #Ecommerce #Bangladesh #OnlinePayments
```

## 12. Guide

Image: `post-12-maintenance-cost.png`

Alt text:

```
Card titled What does it cost to keep software running? 15 to 20% of the build cost every year, for fixing bugs, platform updates, improving features, and backups and security patches.
```

Caption:

```
Plan to spend roughly 15–20% of the build cost every year to keep custom software running. For a $60,000 SaaS MVP, that's $9,000 to $12,000 a year (our planning estimate, not an industry statistic).

The money covers four kinds of work: fixing bugs, adapting to platform and dependency changes, improving features people rely on, and preventive work such as backups and security patches.

Platforms also set fixed deadlines. PostgreSQL 14 got its final release on November 12, 2026, so it receives no more fixes.

The full breakdown is on our blog. Link in bio.

#SoftwareMaintenance #SaaS #TechDebt #Startups
```
