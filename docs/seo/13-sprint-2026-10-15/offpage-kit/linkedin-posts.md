# LinkedIn posts: one per guide

Fifteen posts, one for each finished guide on arrowbin.com/blog, plus a placeholder (post 16) for the developer salary data post that is still being written. Post them from your personal profile (https://www.linkedin.com/in/md-shishir-ahmed), then reshare from the Arrowbin company page once it exists (FIX-PLAN P1.4, P4.10).

**Before each post:** open the link in a private window and check it loads. On 15 October 2026 only the three original guides were live; the new ones go live with the next deploy. Don't post a link that 404s.

**Prices:** posts 5, 6, 9, 10 and 11 quote the guides' own illustrative estimates. They make no claim about Arrowbin's minimum project size. [FOUNDER: minimum project size] is still open (decision F5). If that decision changes a guide's figures, update the matching post before you publish it.

**How these are written:** first person, a specific observation up top, one useful takeaway from the guide, the link, at most three hashtags, no emojis. Every number is from the guide itself, which cites its source. Edit freely so they sound like you, but don't add numbers or client stories that aren't in the guide.

**Optional tracking:** add `?utm_source=linkedin&utm_medium=social&utm_campaign=guides` to the end of each link if you want these visits to show up separately in GA4.

---

## Posting calendar (two a week, Tuesday and Thursday)

| # | Date | Guide | Live on 15 Oct? |
|---|---|---|---|
| 1 | Tue 20 Oct 2026 | Is your vibe-coded app production ready? | after deploy |
| 2 | Thu 22 Oct 2026 | Bangladesh payment gateway integration | after deploy |
| 3 | Tue 27 Oct 2026 | How much does an AI agent cost for a small business? | after deploy |
| 4 | Thu 29 Oct 2026 | WordPress to Next.js migration | after deploy |
| 5 | Tue 3 Nov 2026 | MVP development cost in 2026 | after deploy |
| 6 | Thu 5 Nov 2026 | Shopify vs custom ecommerce website | after deploy |
| 7 | Tue 10 Nov 2026 | How to get your products on ChatGPT shopping | after deploy |
| 8 | Thu 12 Nov 2026 | Bangladesh courier API integration | after deploy |
| 9 | Tue 17 Nov 2026 | SaaS development cost in 2026 | after deploy |
| 10 | Thu 19 Nov 2026 | How much does software maintenance cost per year? | after deploy |
| 11 | Tue 24 Nov 2026 | How much does custom software development cost? | yes |
| 12 | Wed 25 Nov 2026 | How to choose a software development company | yes (moved off Thu 26 Nov, US Thanksgiving) |
| 13 | Tue 1 Dec 2026 | How long does it take to build an MVP? | yes |
| 14 | Thu 3 Dec 2026 | MVP vs prototype vs POC | after deploy |
| 15 | Tue 8 Dec 2026 | AI automation for small business | after deploy |
| 16 | Thu 10 Dec 2026, or the first Tuesday or Thursday after the post is final | Developer salaries by country (original data) | not written yet |

If the deploy slips, swap in posts 11 to 13 first; those guides are already live.

After the run, keep one post a week (FIX-PLAN P4.10): a new guide, a lesson from a build (as process, without client details), or a reshare of a guide with a different takeaway.

---

## 1. Is your vibe-coded app production ready?

When I review an app someone built with Lovable, Bolt or Cursor, the first thing I test is simple: can a logged-in stranger read another user's data?

AI builders are great at getting working screens up fast. They don't decide, on their own, who is allowed to see which rows. In Supabase that job belongs to Row Level Security, and the public Lovable and Moltbook incidents both came down to it.

So I start with two checks. Are access rules switched on, and written, for every table? And does the secret key stay on the server? The Supabase publishable key is meant to be public. The secret key must never reach a browser, a shipped app or a Git repo.

If the data model is sound, fix the app in place. Rebuild only the part where the data model, auth or payment flow is wrong at the root.

The checklist goes on to payments and error alerts. My favourite item is the dullest one: restore a backup once before launch. Until you've done it, you don't know how long recovery takes.

https://arrowbin.com/blog/vibe-coded-app-production-ready

#VibeCoding #Supabase #AppSecurity

---

## 2. Bangladesh payment gateway integration

In a Bangladeshi online store, the redirect back from the payment page is the least trustworthy step in the whole checkout.

A shopper can close the tab, lose signal on the way back, or reload the success page. If your store marks an order paid because the browser landed on that URL, sooner or later you'll ship something nobody paid for.

The fix is boring and it works. Mark an order paid only after your server has validated the payment with the gateway, and check the amount against your own database. On bKash, never retry Execute after a timeout. Call Query Payment first and act on what it says.

On which gateway to pick: for most stores I'd start with cash on delivery plus one aggregator such as SSLCommerz, which takes cards and the main wallets through one integration. As of 15 October 2026, SSLCommerz lists a Tk 25,500 Basic plan (non-refundable) and 2.5% per successful transaction, 3.5% for AMEX. Go direct with bKash once it carries most of your online payments.

The guide compares the options and walks through the integration steps.

https://arrowbin.com/blog/payment-gateway-integration-bangladesh

#Ecommerce #Bangladesh #bKash

---

## 3. How much does an AI agent cost for a small business?

The model bill is usually the smallest line in an AI agent budget.

For 3,000 conversations a month, we worked out about $5 to $216 a month in model fees, using the providers' own price lists on 15 October 2026. The range is wide because models differ a lot in price. Even the top of it is small next to the build.

What actually sets the budget is three questions. How many of your systems does the agent connect to? How much can it do without a person checking? And who keeps it accurate after launch, when your prices and policies change?

Off-the-shelf tools are often the right answer. Intercom lists its Fin agent at $0.99 per outcome, which is cheap at low volume and only adds up when volume grows. A custom build makes sense when no product covers your channel or your workflow.

My advice to most small businesses: start with one read-only workflow, run it on real traffic for a month, measure it, then widen what it's allowed to do.

https://arrowbin.com/blog/ai-agent-cost-small-business

#AIAgents #SmallBusiness

---

## 4. WordPress to Next.js migration

The most important file in a WordPress to Next.js migration is a spreadsheet: every old URL, and where it goes now.

Most of the client sites on our work page started life on WordPress, so this is a list I know well. Every old address gets a permanent redirect (Next.js returns 308, which Google treats the same as 301) to its closest new page. A page you removed on purpose gets a 410 Gone. Keep the redirects for at least a year.

Even when all of that is right, rankings can move for a few weeks. Google says to expect temporary movement during a site move, so plan launches around it and don't panic in week two.

The other trap is plugins. Before anyone writes code, list what every plugin actually does. SEO and form plugins often carry hidden jobs, like redirects you forgot about and leads stored in the database.

And sometimes the answer is to stay. If editors publish every day on a WordPress site that works, a migration may cost more than it saves.

https://arrowbin.com/blog/wordpress-to-nextjs-migration

#NextJS #WordPress #TechnicalSEO

---

## 5. MVP development cost in 2026

On a $60,000, 14-week SaaS MVP, each week of scope is worth about $4,300.

That number is from an illustrative example in our new guide, and it's the clearest way I know to explain MVP pricing. The budget is mostly build weeks times team size times weekly rate. So the most direct way to cut cost is to cut weeks, and the most direct way to cut weeks is to cut scope.

What to cut first: extra user roles, a second platform, and back-office features you could run by hand for the first few months. What to keep: the one workflow that proves people want the product.

After launch, set aside roughly 15 to 20% of the build cost each year to run it.

If you can, test demand with a cheap prototype first. Just don't let it take payments or store personal data until an engineer has hardened it.

https://arrowbin.com/blog/mvp-development-cost

#MVP #StartupFounders

---

## 6. Shopify vs custom ecommerce website

We build custom stores, and I'd still tell most new stores to start on Shopify.

Here's the maths from our new guide. On platform fees alone, a custom build (our estimate: $30,000 to $90,000, plus 15 to 20% a year to run) only catches up with Shopify's best plan at about $142,000 a month in gateway-paid sales. Below that, Shopify is cheaper on fees.

So the reason to go custom is capability. A checkout Shopify won't let you change, complex pricing, deep integrations with the systems you already run, or local payment flows it handles poorly.

That last one matters in Bangladesh. Shopify Payments isn't available there, so Shopify adds 2% on Basic or 1% on Grow to every order paid through a gateway, on top of the gateway's own fee. Cash on delivery orders carry no Shopify fee.

Card processing costs money on every platform, so leave it out when you compare.

https://arrowbin.com/blog/shopify-vs-custom-ecommerce

#Ecommerce #Shopify

---

## 7. How to get your products on ChatGPT shopping

ChatGPT's crawler doesn't run JavaScript. If your product page only shows the price after a script runs in the browser, ChatGPT may never see that price.

That's the first thing I'd check on any store that wants to show up in AI shopping answers. You don't need Shopify for this. A WooCommerce or custom store works too, if the product pages are rendered on the server and carry complete Product and Offer markup: a price above zero with its currency, stock status, shipping and returns.

Then check two settings. Allow OAI-SearchBot in robots.txt. After that, check your CDN, because the edge can block a crawler that robots.txt invites.

Since March 2026, OpenAI lets merchants use their own checkout and focuses ChatGPT on product discovery. As of October 2026, its direct product feed is approval-only, so for most stores a clean Google Merchant Center feed is the sensible first step.

https://arrowbin.com/blog/chatgpt-shopping-for-online-stores

#Ecommerce #ChatGPT #AISearch

---

## 8. Bangladesh courier API integration

If someone on your team copies addresses from your store admin into a courier panel every morning, a courier API integration can take that job off their hands.

It books the parcel with Steadfast, Pathao or RedX straight from each confirmed order, saves the tracking ID on the order, and brings delivery status and cash-on-delivery data back into your admin.

The hardest part is addresses. Collect district and area from a list at checkout, not as free text, and keep one mapping table per courier, because each one names areas its own way.

The second rule: treat every webhook as a hint. Confirm "delivered" or "paid" through the courier's API before you change the order. And book once per order number. Never blindly retry a create call that timed out, or you'll book the same parcel twice.

One courier on WooCommerce or Shopify? A plugin is enough. Several couriers or a custom storefront is where a custom build earns its cost.

https://arrowbin.com/blog/courier-api-integration-bangladesh

#Ecommerce #Bangladesh

---

## 9. SaaS development cost in 2026

On US cards, Stripe processing plus Stripe Billing takes about 4.2% of a $50 monthly plan. That's before hosting, email and error tracking.

I start SaaS budget conversations there because running costs are easy to forget when you're pricing the build. In our new guide, a small stack (two Vercel Pro seats, Supabase Pro, Resend Pro, Sentry Team) starts around $111 a month in plan fees, before usage.

On the build itself, our estimates are about $60,000 for a focused SaaS MVP (an illustrative 14-week example) and $80,000 to $200,000 for a full multi-tenant platform over 5 to 9 months.

What moves a budget from one to the other is SaaS-only work. Tenant isolation and billing belong in version one. SSO, audit logs and most other features can wait until paying customers ask for them.

One more for founders outside the US: if Stripe doesn't support your country, settle the payment provider and company setup before anyone starts on billing.

https://arrowbin.com/blog/saas-development-cost

#SaaS #StartupFounders

---

## 10. How much does software maintenance cost per year?

Two dates show why software maintenance isn't optional. Google Play has required API level 36 for app updates since August 31, 2026. PostgreSQL 14 gets its final release on November 12, 2026.

Platforms set those dates. Miss them and the maintenance still happens, just later and in a hurry.

Our planning estimate is roughly 15 to 20% of the build cost every year. For a $60,000 SaaS MVP, that's $9,000 to $12,000 a year. It's an Arrowbin estimate, not an industry statistic, and it goes up with every integration and every old dependency you carry.

The money buys four kinds of work: fixing bugs, adapting to platform changes, improving features people rely on, and preventive work like backups and security patches. On that last one, Patchstack's 2025 data puts the weighted median time to first exploit for WordPress-ecosystem flaws at 5 hours. Quarterly patching doesn't keep up with that.

One practical rule: upgrade one major version at a time.

https://arrowbin.com/blog/software-maintenance-cost

#SoftwareMaintenance #DevOps

---

## 11. How much does custom software development cost?

In our typical budget split, development is only about half the cost of a custom software project.

The other half pays for discovery and design before the build, and QA and project management during it. Budgets that only count coding hours are the ones that run short.

Where a project lands depends on scope, technical complexity, how much design you need, how many platforms you ship on, and how senior your team is.

Rates vary by region, by 3 to 5 times on our estimate. The cheapest rate rarely gives you the cheapest project, though, because rework and slow communication cost hours too.

Two habits keep cost under control: start with a tightly scoped MVP, and get a fixed estimate after discovery, when both sides understand the work.

https://arrowbin.com/blog/how-much-does-custom-software-development-cost

#SoftwareDevelopment #StartupFounders

---

## 12. How to choose a software development company

One question sorts software companies faster than any portfolio: who, by name, will build this?

Then ask the second one: who owns the code when the project ends? You want names, and you want "you do" with no conditions.

When I put our guide together, I tried to boil the rest down to a short process. Shortlist three to five firms. Look at live products you can actually open and use; screenshots don't count. Ask every firm the same questions so you can compare answers. Weight track record, communication and process above price.

The red flags are familiar but easy to ignore when a quote looks good: a price far below everyone else's, a vague timeline, and slow or unclear replies before you've even signed.

For what it's worth, at Arrowbin you talk to the people building your product, and you own all of the source code. Hold every firm, including us, to the same questions.

https://arrowbin.com/blog/how-to-choose-a-software-development-company

#SoftwareDevelopment #Outsourcing

---

## 13. How long does it take to build an MVP?

Most well-scoped MVPs launch in 6 to 14 weeks. A simple tool takes 6 to 8, a standard MVP 10 to 14, and a complex SaaS MVP 14 to 20.

When a schedule slips, the usual causes are scope creep, unclear requirements and slow decisions. All three are things a founder can influence, which is good news.

It helps to be clear on what an MVP is. It's a complete, working product for one core workflow. It isn't a rough prototype, and it isn't version one of everything you've imagined.

What speeds things up: lock the scope before the build starts, reuse proven components instead of designing every piece from scratch, and make decisions within a day or two when the team asks. Good teams also run design, build and QA in parallel instead of one after another.

The guide breaks the build down week by week.

https://arrowbin.com/blog/how-long-does-it-take-to-build-an-mvp

#MVP #ProductDevelopment

---

## 14. MVP vs prototype vs POC

Before you build anything, name the question you're trying to answer. It decides what you should build first.

A proof of concept asks whether the thing can be built at all. A prototype asks whether people understand it and can use it. An MVP asks whether they'll use it for real and pay.

So start with whichever one tests the assumption most likely to sink you. Technical risk calls for a POC. Usability risk calls for a prototype. Demand risk calls for an MVP.

Most web and SaaS ideas can skip the POC, because accounts, payments and dashboards are solved problems. By our estimates, a clickable prototype takes days to 2 weeks, and an MVP 6 to 14 weeks.

Two details from the guide I'd underline. Jakob Nielsen's model says five test users find about 85% of a prototype's usability problems, so you don't need a big study to learn a lot. And POC code is written to answer one question. It should rarely reach customers.

That goes for AI-built apps too. Until one has been hardened for real users, payments and personal data, treat it as a high-fidelity prototype.

https://arrowbin.com/blog/mvp-vs-prototype-vs-poc

#MVP #ProductDevelopment

---

## 15. AI automation for small business

For most small businesses, the best first AI automation is a dull one: sorting the inbox, or entering invoice and document details. A customer-facing chatbot can wait.

Our new guide has a quick way to choose. Score each job you'd like to automate from 1 to 5 on four things: volume, how repetitive it is, how costly a mistake would be, and whether the information is already written down. Then multiply the four. One weak score sinks the total, which is the point.

Build it plainly. A dependable automation is mostly ordinary workflow with one AI step, plus checks, an approval point and a log.

Then move up slowly. The guide calls it the autonomy ladder: shadow, approve, sample, and only then act alone on cases you've named. Keep a person approving anything that reaches a customer, moves money or acts on text written by strangers, until a month of results says otherwise.

On buy versus build: buy when the job lives inside one tool you already pay for. Build custom when it touches your own systems or follows unusual rules.

https://arrowbin.com/blog/ai-automation-for-small-business

#AIAutomation #SmallBusiness

---

## 16. Developer salaries by country (original data) [write after the post is final]

Placeholder. The post `developer-salaries-by-country` is still being written, from the Stack Overflow Developer Survey dataset (https://survey.stackoverflow.co/).

When the post is final, write this one with the same rules as the others, plus:
- Open with the single most surprising figure from the post, exactly as the post states it, with the survey year.
- Include the Bangladesh figure only as the post publishes it, and say what it is (for example a median, in USD, for a stated group of respondents).
- Name the source in the post text ("from the Stack Overflow Developer Survey [year]") and give the sample size if the post does.
- One takeaway for founders hiring or outsourcing. No claims about Arrowbin's own rates.
- Link: https://arrowbin.com/blog/developer-salaries-by-country (check the final slug).
