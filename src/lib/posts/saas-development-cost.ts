import type { Post } from "@/lib/blog";
import { site } from "@/lib/site";

const DIR = "/blog/saas-development-cost";

export const post: Post = {
  slug: "saas-development-cost",
  title: "SaaS Development Cost in 2026: From MVP to Full Platform",
  description:
    "What a SaaS product costs to build and run in 2026: our ranges from MVP to full platform, what multi-tenancy and billing add, and monthly running costs.",
  keywords: [
    "saas development cost",
    "how much does it cost to build a saas",
    "saas app development cost",
    "cost to build a saas platform",
    "multi-tenant saas cost",
    "saas running costs",
    "saas hosting and billing costs",
    "saas development cost breakdown",
  ],
  date: "2026-10-15",
  dateLabel: "October 15, 2026",
  author: "Md. Shishir Ahmed",
  readingTime: "13 min read",
  category: "Product",
  excerpt:
    "A SaaS product costs more than its build quote: billing and tenant isolation add to the build, and running costs arrive every month. Here are our ranges and the running-cost sums, worked out from published prices.",
  image: {
    src: `${DIR}/cover.webp`,
    alt: "Mockup of a SaaS admin dashboard with a workspace switcher open in the sidebar, a billing overview showing monthly recurring revenue and active subscriptions, and a plans panel with three subscription tiers",
    width: 1280,
    height: 720,
  },
  tldr: "A focused SaaS MVP comes to around $60,000 in Arrowbin's illustrative 14-week example, and a full multi-tenant SaaS platform costs $80,000–$200,000 over 5–9 months on our estimates. The jump comes from SaaS-only work such as tenant isolation and subscription billing, and later from enterprise extras like SSO and audit logs. After launch, plan on 15–20% of the build cost a year for maintenance plus hosting and tool plans, and give payment fees their own line because they grow with revenue: on published US prices, Stripe takes about 4.2% of a $50 monthly plan.",
  body: [
    {
      type: "p",
      text: "The SaaS budgets that worry me are the ones that stop at the build quote. A subscription product keeps costing money after launch. Every charge pays a fee. Every new customer adds a little load, and sooner or later a bigger prospect sends you a security questionnaire.",
    },
    {
      type: "p",
      text: "I wrote this for founders and SMB owners planning a SaaS product, including teams turning an internal tool into something they can sell. We build SaaS products at Arrowbin, so the build figures below are our own published estimates. The running costs are worked out from vendors' price pages as listed on October 15, 2026, with the sums shown so you can redo them with your own numbers.",
    },

    { type: "h2", text: "How much does SaaS development cost in 2026?" },
    {
      type: "p",
      text: "Using Arrowbin's published estimates, a focused SaaS MVP comes to around $60,000 in our illustrative 14-week example, and a full multi-tenant SaaS platform runs $80,000–$200,000 over 5–9 months. Maintenance and running costs come on top of both build numbers.",
    },
    {
      type: "table",
      headers: [
        "Stage",
        "What's usually in it",
        "Build cost (Arrowbin estimate)",
        "Typical timeline",
      ],
      rows: [
        [
          "SaaS MVP",
          "One core workflow, sign-up and login, billing, a simple onboarding flow and an admin view",
          "Around $60,000 in our illustrative example; our wider band for a polished, launch-ready MVP or app is $40,000–$120,000",
          "8–14 weeks for a focused MVP; 14–20 weeks for a complex multi-tenant one",
        ],
        [
          "Full platform (v1 for bigger customers)",
          "Teams and roles plus analytics; deeper admin tooling; integrations; SSO and audit logs once buyers ask",
          "$80,000–$200,000 in total",
          "5–9 months",
        ],
        [
          "Scale",
          "Hardening the architecture and billing for real traffic, then the features paying customers request",
          "15–20% of the build cost a year for maintenance plus hosting and tool plans, with payment fees and new features as separate lines",
          "Ongoing",
        ],
      ],
    },
    {
      type: "p",
      text: "Read the platform range as the cost of the whole product at that stage. Most teams get there in phases: an MVP first, then the pieces paying customers ask for. Timelines follow the same shape. A focused SaaS MVP usually takes 8–14 weeks, a complex multi-tenant MVP takes 14–20, and our $60,000 example sits at roughly 14. For how those weeks are spent, see [the week-by-week MVP timeline](/blog/how-long-does-it-take-to-build-an-mvp) in our schedule guide.",
    },
    {
      type: "p",
      text: "These are planning figures, not quotes. Our [full custom software cost guide](/blog/how-much-does-custom-software-development-cost) covers the other tiers and shows where the $60,000 goes, phase by phase.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/build-stages.svg`,
        alt: "Range chart of SaaS development cost in 2026 on Arrowbin estimates: a $60,000 illustrative SaaS MVP of about 14 weeks, inside the $40,000 to $120,000 band for a polished launch-ready MVP, and the $80,000 to $200,000 band for a full multi-tenant SaaS platform built over 5 to 9 months",
        caption:
          "Where a SaaS build lands, from first version to full platform. Arrowbin estimates from our cost guide.",
        width: 1280,
        height: 720,
      },
    },

    { type: "h2", text: "Why does SaaS cost more than a regular web app?" },
    {
      type: "p",
      text: "A SaaS costs more because many customers share one system and pay for it every month. That setup needs tenant isolation and subscription billing from the start. Later it needs roles and admin tooling, plus the reliability people expect from something they pay for. Almost none of it shows up in a demo.",
    },
    {
      type: "p",
      text: "A web app for one company has one set of users and one pile of data. Put a hundred companies on the same code and the same database and the rules change. The table lists the parts that exist because of that, with our view of when each one is needed.",
    },
    {
      type: "table",
      headers: [
        "SaaS component",
        "Why a SaaS needs it",
        "MVP or later",
        "Why it adds cost",
      ],
      rows: [
        [
          "Tenant isolation",
          "Customer A must never see customer B's data, even by accident",
          "Day one",
          "Every query and background job has to carry the tenant ID, and tests have to prove nothing leaks",
        ],
        [
          "Sign-up, login and 2FA",
          "Self-serve accounts are how most SaaS customers arrive",
          "Day one",
          "Password resets and email checks need building and testing; a good auth library does most of it",
        ],
        [
          "Subscription billing",
          "Plans and trials, plus retrying failed cards (dunning) and sending invoices",
          "Day one",
          "Billing runs on webhooks from the payment provider, and each edge case (proration, refunds, cancellations) has to be handled exactly once",
        ],
        [
          "Admin view",
          "Your team has to look up accounts and fix data when support tickets come in",
          "Day one, kept simple",
          "It's a second app with its own permissions that no customer ever sees",
        ],
        [
          "Teams and roles",
          "Customers want to invite colleagues with less access than the owner",
          "Later, when customers ask",
          "Permission checks spread into every screen and API route",
        ],
        [
          "Product analytics",
          "You need to know which features paying customers actually use",
          "A light version early",
          "Event tracking plus dashboards someone keeps accurate",
        ],
        [
          "Audit logs",
          "Bigger customers ask who changed what, and when",
          "Later (earlier for regulated data)",
          "An append-only record of sensitive actions that customers can search and export",
        ],
        [
          "SSO (SAML or OIDC)",
          "Enterprise buyers want staff to sign in through Okta or Microsoft Entra",
          "When enterprise buyers ask",
          "Setup and testing per customer, or a per-connection fee if you buy it",
        ],
        [
          "Public API and webhooks",
          "Customers want to connect your product to their own tools",
          "Later",
          "Versioning and API keys, plus docs that stay current",
        ],
        [
          "White-labelling",
          "Resellers want their own brand and domain on it",
          "Later",
          "Custom domains, per-tenant theming and per-tenant email settings",
        ],
        [
          "Monitoring, alerts and daily backups",
          "Paying customers notice downtime before you do",
          "Day one",
          "Setup time plus monthly tooling fees (priced in the running-cost section)",
        ],
        [
          "Compliance work, such as SOC 2 readiness",
          "Enterprise security reviews ask for evidence of your controls",
          "Later",
          "Written policies and evidence of your controls, plus the audit firm's fee",
        ],
      ],
    },
    {
      type: "p",
      text: "None of these rows is hard on its own. The cost comes from how they touch each other. Billing changes what a user is allowed to do, roles decide who can change billing, and every one of them has to respect the tenant boundary.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/saas-layers.svg`,
        alt: "Layer diagram of the SaaS-only work on top of a web app's core workflow: six layers in the first version, from tenant isolation and billing up to monitoring and backups, and six that wait for paying customers, from teams and roles up to SSO and compliance work",
        caption:
          "The SaaS-only layers, and which ones belong in the first version. Original Arrowbin diagram based on our SaaS service scope.",
        width: 1280,
        height: 720,
      },
    },

    {
      type: "h2",
      text: "What goes into the first version, and what can wait?",
    },
    {
      type: "p",
      text: "Your core workflow, sign-up and login, and billing go in from day one, usually with a simple onboarding flow and an admin view. Teams and roles, public APIs, SSO, white-labelling and native apps can usually wait until paying customers ask for them.",
    },
    {
      type: "p",
      text: "Billing on day one surprises some founders. I'd still insist on it. A customer who pays is the only test of a SaaS idea I fully trust, and bolting billing onto a free product later means moving every existing account onto a plan.",
    },
    {
      type: "p",
      text: "Tenant isolation can't wait either. Adding a Team page in month six is a normal feature. Adding a tenant ID to every table and stored file once real customer data exists is a migration that touches everything, and a mistake there shows one customer's data to another.",
    },
    {
      type: "p",
      text: "For everything else, wait for a signal from someone who pays you:",
    },
    {
      type: "ul",
      items: [
        "Teams and roles: a customer asks to invite a colleague who shouldn't see billing.",
        "SSO: a deal stalls in a security review because the buyer's IT team wants staff to sign in through their identity provider.",
        "Public API: several customers ask to connect the same tool, and copying data across by hand is costing them time.",
        "White-labelling: a reseller or agency wants to sell the product under its own brand.",
        "Native apps: your analytics show people opening the web app on their phones every day.",
      ],
    },
    {
      type: "p",
      text: "If you're working out that first version's budget line by line, our guide on [how to budget the first version](/blog/mvp-development-cost) covers the formula and what to cut. I won't repeat it here.",
    },
    {
      type: "cta",
      title: "Know your core workflow and how you'll charge?",
      text: "Those two answers place your first version on these ranges. We'll tell you where it sits and which SaaS layers it can leave for later.",
      href: "/contact",
      label: "Scope your SaaS with us",
    },

    {
      type: "h2",
      text: "What does it cost to run a SaaS product each month?",
    },
    {
      type: "p",
      text: "Expect two kinds of running cost: payment and billing fees that grow with revenue, and monthly plans for hosting and tools that start small and grow with usage. For a SaaS with 200 customers on a $50 plan, the published prices below add up to about $531 a month before usage-based charges.",
    },
    {
      type: "p",
      text: "Take a hypothetical B2B SaaS with 200 customers paying $50 a month, all on US cards. That's $10,000 of monthly recurring revenue. Two developers deploy it on Vercel, the database lives on Supabase, transactional email goes through Resend and errors go to Sentry. Those are common picks for the stack we use. They aren't the only sensible ones, so swap in your own vendors and redo the sums.",
    },
    {
      type: "table",
      headers: [
        "Line item",
        "Price as listed on October 15, 2026",
        "Assumption",
        "Monthly cost",
      ],
      rows: [
        [
          "Stripe card processing",
          "2.9% + 30¢ per successful domestic card charge",
          "200 charges of $50",
          "$350",
        ],
        [
          "Stripe Billing",
          "0.7% of Billing volume, pay as you go",
          "$10,000 billed",
          "$70",
        ],
        [
          "Vercel Pro",
          "$20 a month per developer seat, with $20 of included credit",
          "2 seats, usage within the credit",
          "$40",
        ],
        [
          "Supabase Pro",
          "From $25 a month, with $10 of compute credits",
          "One project on the base plan",
          "$25",
        ],
        [
          "Resend Pro",
          "$20 a month for 50,000 emails",
          "Under 50,000 emails",
          "$20",
        ],
        [
          "Sentry Team",
          "$26 a month, billed annually",
          "Under the plan's error quota",
          "$26",
        ],
        ["Total", "", "$10,000 of monthly revenue", "$531 (5.3% of revenue)"],
      ],
    },
    {
      type: "p",
      text: "Stripe's [pricing page](https://stripe.com/pricing) lists 2.9% + 30¢ per successful transaction for domestic cards, and [Stripe Billing](https://stripe.com/billing/pricing) on pay-as-you-go adds 0.7% of Billing volume with no recurring fee. On a $50 charge that's $1.75 plus 35¢. Call it $2.10 per customer per month.",
    },
    {
      type: "p",
      text: "Hosting is cheap at this size. [Vercel's pricing](https://vercel.com/pricing) puts Pro at $20 a month per developer seat, with a $20 included credit to use across resources. Don't run a paying product on the free Hobby plan, though. Vercel says Hobby is for personal, non-commercial use.",
    },
    {
      type: "p",
      text: "[Supabase](https://supabase.com/pricing) Pro starts at $25 a month and includes $10 of compute credits, an 8 GB disk per project and 100,000 monthly active users. Its free projects pause after a week of inactivity. Fine for a prototype. An awkward surprise for a customer.",
    },
    {
      type: "p",
      text: "[Resend](https://resend.com/pricing) lists Pro at $20 a month for 50,000 emails, and [Sentry's](https://sentry.io/pricing/) Team plan is $26 a month when billed annually. Both have free tiers that can carry a pilot: Resend's caps you at 100 emails a day, and Sentry's Developer plan is limited to one user.",
    },
    {
      type: "p",
      text: "Treat the $531 as a floor. Data transfer beyond Vercel's included 1 TB, more database compute, extra disk, SMS, a status page or a support inbox all come on top, and they depend on how people use your product. File-heavy products can make hosting the biggest line. That's why our [hosting and DevOps for SaaS](/services/cloud-devops-hosting) work starts by sizing usage before anyone picks a plan.",
    },
    {
      type: "p",
      text: "Run the same plans for 50 customers, then 200, then 1,000, and the mix changes. At 50 customers the fixed plans are just over half the bill. At 1,000, Stripe is about 95% of it, and the total settles near 4.4% of revenue.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/monthly-running-cost.svg`,
        alt: "Stacked bar chart of a small SaaS's monthly running costs on a $50 plan: $216 at 50 customers, $531 at 200 customers and $2,211 at 1,000 customers, falling from 8.6% to 4.4% of revenue as Stripe fees replace fixed plan fees as the main cost",
        caption:
          "Monthly running cost at three customer counts. Prices as listed on each vendor's pricing page on October 15, 2026; usage charges excluded.",
        width: 1280,
        height: 720,
      },
    },

    { type: "h2", text: "How much of your SaaS revenue goes to Stripe?" },
    {
      type: "p",
      text: "On US cards with Stripe Billing's pay-as-you-go plan, Stripe takes 3.6% of each charge plus 30¢. That works out to 4.2% of a $50 monthly plan, and more on cheaper plans or international cards.",
    },
    {
      type: "p",
      text: "The fixed 30¢ is the part people miss. On a $10 plan it's 3% of the charge by itself, so Stripe's total cut comes to 6.6%. On a $500 plan it barely registers and you pay about 3.7%. If you're still choosing price points, that's a small argument against very cheap monthly plans.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/stripe-fee-by-price.svg`,
        alt: "Bar chart of Stripe processing plus Stripe Billing fees as a share of a monthly SaaS charge on US cards: 6.6% on a $10 plan, 4.8% on $25, 4.2% on $50, 3.9% on $100 and 3.7% on $500, because the fixed 30 cent fee weighs most on cheap plans",
        caption:
          "Stripe's share of each charge by plan price, US domestic cards. Source: Stripe pricing and Stripe Billing pricing pages, as listed on October 15, 2026.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Annual billing helps for the same reason. One $600 charge a year pays the 30¢ once instead of twelve times, which cuts a $50 customer's yearly fees from $25.20 to $21.90. Small per customer. Across a thousand customers it's $3,300 a year.",
    },
    {
      type: "p",
      text: "International customers cost more to charge. Stripe adds 1.5% for international cards and another 1% when currency conversion is required:",
    },
    {
      type: "table",
      headers: [
        "Card and currency",
        "Stripe fees on a $50 charge (with Billing)",
        "Share of the charge",
      ],
      rows: [
        ["US card, charged in US dollars", "$2.10", "4.2%"],
        ["International card", "$2.85", "5.7%"],
        ["International card with currency conversion", "$3.35", "6.7%"],
      ],
    },
    {
      type: "p",
      text: "Two more lines for the spreadsheet. Stripe charges $15 for each dispute you receive. And Stripe sells Billing on an annual contract from $620 a month, but at 0.7% pay-as-you-go only reaches that cost at about $88,600 of monthly Billing volume. An early SaaS should stay on pay-as-you-go.",
    },

    {
      type: "h2",
      text: "What pushes a SaaS budget from MVP toward the platform range?",
    },
    {
      type: "p",
      text: "Mostly two things: more roles and integrations, and enterprise requirements such as SSO and audit logs. Deeper reporting and compliance work for regulated data push it further. Each one adds build and test time, and they tend to arrive together once you start selling to bigger companies.",
    },
    {
      type: "p",
      text: "Roles are the sneaky one. An owner and a member is a couple of checks. Five roles with custom permissions per workspace is a permissions system, and it reaches into every screen and API route.",
    },
    {
      type: "p",
      text: "Integrations cost more than their size suggests. Each one needs its own auth and retry logic, plus a plan for the day the other company's API goes down or changes shape.",
    },
    {
      type: "p",
      text: "SSO is where enterprise readiness starts to show up as a monthly bill. If you buy it instead of building it, [WorkOS](https://workos.com/pricing) lists Single Sign-On at $125 per connection a month for the first 15 connections. A connection is one group of users signing in through an identity provider such as Okta or Microsoft Entra, so ten enterprise customers on SSO would cost $1,250 a month. For most B2B products I'd still buy it. SAML is fiddly, and every customer's identity provider is set up a little differently.",
    },
    {
      type: "p",
      text: "Audit logs look simple and aren't. Bigger customers want an append-only record of who changed what and when, which they can search and export, and it has to cover what your own admin team does too.",
    },
    {
      type: "p",
      text: "Compliance is the biggest jump. Under the [AICPA's SOC 2 framework](https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2), a SOC 2 report covers an examination of a service organization's controls relevant to security, availability, processing integrity, confidentiality or privacy. The engineering side (access reviews, logging, tested backups, change control) is work a development team can scope. The audit fee is set by the audit firm, so get quotes before you promise a customer a date.",
    },
    {
      type: "p",
      text: "Your vendors' plans move with you, too. Supabase's Team plan starts at $599 a month against $25 for Pro, and it's the tier where SOC2 and ISO 27001 appear on its pricing page. If a customer's security review asks for your database provider's reports, that's the plan you'd be on.",
    },

    { type: "h2", text: "How much should you budget after launch?" },
    {
      type: "p",
      text: "Plan roughly 15–20% of the build cost a year to own the product (an Arrowbin estimate). That band covers maintenance plus the hosting and tool plans; payment fees, heavy usage and the features paying customers ask for get their own lines. On the $60,000 example, the band is $9,000–$12,000 a year.",
    },
    {
      type: "p",
      text: "On a SaaS, maintenance means dependency and security updates, database upgrades, keeping up with your payment provider's API changes, and fixing what real customers find. None of it is optional once people pay you monthly. Our guide to [software maintenance costs](/blog/software-maintenance-cost) breaks that work down, along with the 2026 platform deadlines behind it.",
    },
    {
      type: "p",
      text: "Put a first year together for the $60,000 example and it looks like the chart below. We assumed 200 customers at $50 for all twelve months, which is generous for a first year. The $1,332 of plan fees from the running-cost table ($111 × 12) sits inside the maintenance band, the way our cost guide counts hosting. Stripe's $5,040 ($420 × 12) gets its own line, because it grows with revenue rather than with the code.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/first-year-cost.svg`,
        alt: "Stacked bar of a first year for the $60,000 illustrative SaaS MVP: $60,000 build, $9,000 to $12,000 for maintenance with the $1,332 of hosting and tooling plans counted inside it, and $5,040 of Stripe fees on $120,000 of revenue, about $74,000 to $77,000 in total",
        caption:
          "A first year for the $60,000 example, with every assumption labelled. Build and maintenance are Arrowbin estimates; vendor prices as listed on October 15, 2026.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Add it up: $60,000 for the build, $9,000–$12,000 for the band, plus $5,040 in Stripe fees. That's roughly $74,000–$77,000 for the year. The Stripe line only exists because $120,000 of revenue came in, so model fees against expected revenue rather than as a fixed overhead.",
    },
    {
      type: "p",
      text: "Keep new features in a separate budget. Paying customers will ask for things, and the requests that win renewals are worth building. We scope those as small projects so they don't quietly eat the maintenance money.",
    },

    { type: "h2", text: "Which tech stack keeps SaaS costs predictable?" },
    {
      type: "p",
      text: "A widely used stack keeps hiring and hosting predictable. For us that's usually Next.js and Node.js with PostgreSQL, Redis for caching and queues, Stripe for billing, and AWS or Vercel for hosting. The stack matters less than keeping the architecture simple early.",
    },
    {
      type: "p",
      text: "For multi-tenancy we nearly always start with one shared PostgreSQL database, a tenant ID on every row, and row-level security as a second lock behind the application code. PostgreSQL's [row security docs](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) say that if no policy exists for a table, a default-deny policy is used, so a forgotten rule fails closed.",
    },
    {
      type: "p",
      text: "A database per customer sounds safer. It also multiplies the migrations and backups you have to run, so we keep it for customers whose contract requires it.",
    },
    {
      type: "p",
      text: "Skip microservices for an early SaaS. One well-structured app with a job queue is cheaper to build and host, and far easier to debug when something breaks. You can split it later along the lines real load shows you.",
    },
    {
      type: "p",
      text: "Two habits keep the bills predictable. Set spend limits from day one; Vercel gives new teams a default on-demand usage budget of $200, which you can change. And tag background jobs and heavy queries with the tenant, so when one customer's usage spikes you can see it and price for it.",
    },

    {
      type: "h2",
      text: "What if you're building a SaaS from outside Stripe's supported countries?",
    },
    {
      type: "p",
      text: "Check payment availability before you write any billing code. Bangladesh isn't on Stripe's supported list, so founders there often form a company in a supported country (Stripe Atlas offers a US company) or use another billing provider.",
    },
    {
      type: "p",
      text: "On October 15, 2026, [Stripe's global availability page](https://stripe.com/global) listed India as Preview and didn't list Bangladesh at all. The same page says Atlas lets you 'Incorporate a US company from anywhere in the world', and that once Stripe supports your country you can sell to customers anywhere.",
    },
    {
      type: "p",
      text: "The answer shapes the build as well as the paperwork. Webhooks, invoices, tax handling, payout currency: all of it depends on which provider and which legal entity you end up with, so settle it before billing work starts. We'll build against whichever provider you choose, but we don't give legal or tax advice. Talk to an accountant who works with founders in your country.",
    },
    {
      type: "p",
      text: "If you also sell to customers inside Bangladesh, local payments are a separate integration with their own fees and flows. Our guide to [bKash and SSLCommerz integration](/blog/payment-gateway-integration-bangladesh) covers that side. If the product is a mobile app, see [Bangladeshi app prices in Taka and dollars](/blog/app-development-cost-bangladesh).",
    },

    { type: "h2", text: "How do you get an accurate SaaS quote?" },
    {
      type: "p",
      text: "Bring your core workflow, your pricing model (per seat, usage-based or flat), the integrations you can't launch without, and who your first customers are. A short paid discovery turns that into a fixed price for the MVP.",
    },
    {
      type: "p",
      text: "The pricing model matters more than people think. A flat monthly plan is the simplest billing you can build. Per-seat pricing needs seat counts and proration. Usage-based pricing needs metering; Stripe's pricing page says basic usage-based billing through its Meters API is included up to 100M events a month, but you still have to record every billable event reliably.",
    },
    {
      type: "p",
      text: "Your first customers matter just as much. If they're small teams, you can leave SSO and audit logs for later. If your first deal is a bank, they can't, and the budget moves toward the platform range before you've launched.",
    },
    {
      type: "p",
      text: `When you're ready, our [SaaS product engineering](/services/saas-product-engineering) team can run that discovery with you, and you own all of it from day one: code, accounts, infrastructure. Your pricing model is the first thing we'll ask about on a [30-minute call](${site.bookingUrl}), and it's the quickest route to a real number.`,
    },
  ],
  takeaways: [
    "On Arrowbin's estimates, a full multi-tenant SaaS platform costs $80,000–$200,000 over 5–9 months, and our illustrative SaaS MVP is $60,000 over roughly 14 weeks.",
    "SaaS-only work is what moves a budget from MVP toward platform: tenant isolation and billing first, enterprise extras such as SSO and audit logs later.",
    "Tenant isolation and billing belong in the first version; most other SaaS features can wait until paying customers ask for them.",
    "On US cards, Stripe processing plus Stripe Billing takes 4.2% of a $50 monthly charge, more on cheap plans and international cards.",
    "A small SaaS stack (two Vercel Pro seats, Supabase Pro, Resend Pro, Sentry Team) starts around $111 a month in plan fees, before usage.",
    "Budget 15–20% of the build cost a year for maintenance plus hosting and tool plans (Arrowbin estimate), and give payment fees and new features their own lines.",
    "If Stripe doesn't support your country, settle the payment provider and company setup before any billing work starts.",
  ],
  faqs: [
    {
      question: "Is $50,000 enough to build a SaaS?",
      answer:
        "Possibly, if the first version is one core workflow plus sign-up and billing, and very little else. Our illustrative SaaS MVP example is $60,000, and our band for a polished, launch-ready MVP or app is $40,000–$120,000, so going under $50,000 means a tight scope. Our custom software cost guide covers the smaller tiers.",
    },
    {
      question: "Is 8–14 weeks realistic for a SaaS MVP?",
      answer:
        "Yes, for a focused one: that's our usual range when the first version is one core workflow with sign-up and billing. A complex, multi-tenant SaaS MVP takes 14–20 weeks, and a full SaaS platform is a 5–9 month build on our estimates.",
    },
    {
      question: "What does Stripe cost for a SaaS business?",
      answer:
        "For US domestic cards, Stripe lists 2.9% + 30¢ per successful charge, and Stripe Billing on pay-as-you-go adds 0.7% of Billing volume, per its pricing pages on October 15, 2026. International cards add 1.5%, and currency conversion adds another 1%.",
    },
    {
      question: "Do I need multi-tenancy from day one?",
      answer:
        "You need tenant isolation from day one if customers' data shares one system, because adding it later means migrating every table that holds customer data. Team management and roles can come later, once customers ask.",
    },
    {
      question: "When should a SaaS add single sign-on?",
      answer:
        "When an enterprise buyer asks for it, usually during a security review. Before that it's cost without revenue. If you buy rather than build it, WorkOS lists $125 per connection a month for the first 15 connections.",
    },
    {
      question: "What are the biggest hidden costs of running a SaaS?",
      answer:
        "Maintenance is the big one. After that come payment and billing fees, usage-based hosting and disputes, then the features customers ask for after launch. Fees and usage grow with revenue, so model them at your expected customer count rather than your launch count.",
    },
    {
      question: "Can I use Stripe from Bangladesh?",
      answer:
        "Bangladesh isn't on Stripe's global availability list as of October 15, 2026. Many founders use a company in a supported country, and Stripe Atlas offers a US company, or they pick another provider. Get legal and tax advice before you decide.",
    },
    {
      question: "What do I own at the end of an Arrowbin SaaS build?",
      answer:
        "All of it. You own 100% of the source code from day one, along with the accounts and infrastructure it runs on. There's no lock-in, and we document the system so your own team can take over at any point.",
    },
  ],
};
