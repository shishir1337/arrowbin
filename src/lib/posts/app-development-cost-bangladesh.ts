import type { Post } from "@/lib/blog";
import { site } from "@/lib/site";

const DIR = "/blog/app-development-cost-bangladesh";

export const post: Post = {
  slug: "app-development-cost-bangladesh",
  title: "App Development Cost in Bangladesh (2026): BDT and USD",
  description:
    "App development cost in Bangladesh for 2026 in Taka and US dollars: published local price ranges and hourly rates, plus store fees and running costs.",
  keywords: [
    "app development cost in bangladesh",
    "mobile app development cost in bangladesh",
    "android app development cost in bangladesh",
    "app development cost bangladesh bdt",
    "hire app developer in bangladesh cost",
    "how much does it cost to make an app in bangladesh",
    "custom software development cost in bangladesh",
  ],
  date: "2026-10-22",
  dateLabel: "October 22, 2026",
  author: "Md. Shishir Ahmed",
  readingTime: "12 min read",
  category: "Guides",
  excerpt:
    "Local price lists for Bangladeshi apps disagree and cite nothing. We put them side by side in Taka and dollars, add the rates and running costs, and show what a fair quote should include.",
  image: {
    src: `${DIR}/cover.webp`,
    alt: "Mockup of a phone shopping app with a Pay with bKash button next to an app estimate card that has a BDT and USD toggle, one line per part of the job from UI design to store release, and a badge saying the code and accounts are yours",
    width: 1280,
    height: 720,
  },
  tldr: "A basic app in Bangladesh costs about Tk 1.5–3.5 lakh ($1,200–2,800), a medium app Tk 4–12 lakh ($3,200–9,700) and a large business app Tk 12–30 lakh ($9,700–24,300), according to one Bangladeshi vendor's published price list, converted at Bangladesh Bank's Tk 123.65 to the dollar (October 19, 2026). These are vendor estimates, not survey data, and a second vendor's ladder runs higher. About half the Bangladeshi app firms listed on Clutch show $25–49 an hour, while that first vendor puts local rates at Tk 1,000–4,000 ($8–32). After launch, budget for store fees and payment or courier charges, plus roughly 15–20% of the build cost a year for upkeep (our estimate).",
  body: [
    {
      type: "p",
      text: "This guide is for two readers. One runs a business in Bangladesh and is pricing an app in Taka: a delivery app, a booking app, or an app for a shop that already sells online. The other is a founder in the US, the UK or Australia who has quotes from home and wants to know what a Bangladeshi team would charge, and what the catch is.",
    },
    {
      type: "p",
      text: "We build web and mobile software for clients worldwide, including online stores for Bangladeshi brands. We didn't run a survey for this post, and we found no published survey of app prices in Bangladesh. So every number below either links to the page it came from or carries a label saying it's our estimate. Each one appears in Taka and in dollars.",
    },
    {
      type: "p",
      text: "One note for readers outside South Asia: a lakh is 100,000, so Tk 1.5 lakh is Tk 150,000.",
    },

    {
      type: "h2",
      text: "How much does it cost to build an app in Bangladesh in 2026?",
    },
    {
      type: "p",
      text: "One Bangladeshi vendor's published price list puts a basic app at about Tk 1.5–3.5 lakh ($1,200–2,800), a medium one at Tk 4–12 lakh ($3,200–9,700) and a large business app at Tk 12–30 lakh ($9,700–24,300). Those are vendor estimates, not survey data, and they cover the build only.",
    },
    {
      type: "p",
      text: "The ladder comes from [Bdtask's cost guide](https://www.bdtask.com/blog/app-development-cost-in-bangladesh), last updated June 28, 2026, which prices in Taka. Every dollar figure in this post uses Bangladesh Bank's [weighted average rate](https://www.bb.org.bd/en/index.php/econdata/exchangerate) of Tk 123.65 to the dollar for October 19, 2026. If the rate moves, so does the dollar column.",
    },
    {
      type: "table",
      headers: [
        "App size (Bdtask's label)",
        "Published range (BDT)",
        "About (USD)",
        "Build time Bdtask gives",
      ],
      rows: [
        ["Basic app", "Tk 1.5–3.5 lakh", "$1,200–2,800", "1–2 months"],
        ["Medium complexity app", "Tk 4–12 lakh", "$3,200–9,700", "2–4 months"],
        [
          "Large-scale business app",
          "Tk 12–30 lakh",
          "$9,700–24,300",
          "4–8 months",
        ],
        [
          "Enterprise-level application",
          "Tk 30–60 lakh+",
          "$24,300–48,500+",
          "6–12 months",
        ],
      ],
    },
    {
      type: "p",
      text: "A second Bangladeshi agency, Dcastalia, publishes [a dollar ladder](https://dcastalia.com/blog/app-development-cost-in-bangladesh/) dated October 2025. It quotes $2,000–5,000 for a simple app (about Tk 2.5–6.2 lakh), $5,000–15,000 for a medium one (Tk 6.2–18.5 lakh) and $15,000 or more for a complex app. It calls the ranges 'an estimate', which is honest of it.",
    },
    {
      type: "p",
      text: "Put the two side by side and they don't line up. Dcastalia's simple app reaches $5,000, well inside Bdtask's medium band. Neither page defines 'simple' the same way, and neither cites a source for its prices.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/price-ladders.svg`,
        alt: "Range chart of two published Bangladeshi app price ladders on one dollar axis: Bdtask's basic app at $1,200 to $2,800, medium at $3,200 to $9,700, large business at $9,700 to $24,300 and enterprise from $24,300 to $48,500 and up, against Dcastalia's simple app at $2,000 to $5,000, medium at $5,000 to $15,000 and complex from $15,000",
        caption:
          "Vendor estimates, not survey data. Sources: Bdtask (updated Jun 28, 2026), Dcastalia (Oct 14, 2025); converted at Tk 123.65 per USD, Bangladesh Bank, Oct 19, 2026.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "So treat these ladders as the range of opening quotes you're likely to hear. They aren't a price list. We don't publish one either: we price each app from its feature list, because two 'medium' apps can differ by more than the whole basic band.",
    },

    { type: "h2", text: "Why do app quotes in Bangladesh vary so much?" },
    {
      type: "p",
      text: "Scope drives most of the difference. The rest comes from two markets sharing one country: shops that price for Bangladeshi clients, and export agencies that price for foreign ones. For similar work, their hourly rates can sit far apart.",
    },
    {
      type: "p",
      text: "Published rates show the split. Bdtask's Taka price guide gives an hourly rate of Tk 1,000–4,000, about $8–32. On [Clutch's Bangladesh app developer list](https://clutch.co/bd/app-developers), where firms market themselves to buyers abroad, the most common band is $25–49 an hour. Both can be true at once, because they're priced for different clients.",
    },
    {
      type: "p",
      text: "Who builds your app matters as much as where. You'll usually hear from three kinds of seller:",
    },
    {
      type: "ul",
      items: [
        "Freelancers. Often the cheapest quote, and often one person doing every job. Fine for a small app if you can manage the project yourself.",
        "Small local shops that sell packaged or template apps, sometimes listed on marketplaces with a price tag. Fast and cheap when your app matches the template. Painful when it doesn't.",
        "Export agencies with project managers and testers, and contracts written for foreign clients. They cost more per hour and usually include work the cheaper quotes leave out.",
      ],
    },
    {
      type: "p",
      text: "That missing work is where most cheap quotes come from. A low number often skips proper UI design or the admin panel your staff will use. Testing on real phones goes too, and sometimes the store submission itself. Ask every seller to price each of those as its own line, and the gap between quotes usually shrinks.",
    },
    {
      type: "cta",
      title: "Want a quote in Taka or dollars?",
      text: "Send us the feature list. We'll come back with a line-item estimate in the currency you pay in.",
      href: "/contact",
      label: "Get a line-item estimate",
    },

    {
      type: "h2",
      text: "What do Bangladeshi app developers charge per hour?",
    },
    {
      type: "p",
      text: "The most common rate for Bangladeshi app firms on Clutch is $25–49 an hour (about Tk 3,100–6,100). When we read the first page of Clutch's Bangladesh app developer list on October 22, 2026, 49 firms showed a rate: 24 in that band, 16 under $25 and 8 at $50–99.",
    },
    {
      type: "p",
      text: "One more firm listed $150–199. Minimum project sizes ran from $1,000+ to $100,000+. Each company reports its own band, and the order of the list includes paid placement. Read the bands as asking prices from firms that sell abroad. They aren't a market average.",
    },
    {
      type: "p",
      text: "For context, our own planning figure for a blended senior team in South Asia is $25–60 an hour (Tk 3,100–7,400), from our guide to [what custom software costs worldwide](/blog/how-much-does-custom-software-development-cost). That's an Arrowbin estimate, not survey data. It sits close to what the Clutch listings show.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/rate-tiers.svg`,
        alt: "Chart of Bangladeshi app developer hourly rates in dollars: one local vendor's range of $8 to $32 (Tk 1,000 to 4,000), Clutch listings for 49 Bangladeshi app firms with 16 under $25, 24 at $25 to $49 and 8 at $50 to $99, and Arrowbin's South Asia estimate of $25 to $60",
        caption:
          "Sources: Bdtask blog (updated Jun 28, 2026); Clutch Bangladesh app developers, first page, read Oct 22, 2026 (self-reported bands); Arrowbin estimate. Tk 123.65 per USD.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Salaries sit underneath those rates, and public pay data for Bangladesh is thin. Paylab's [software engineer page](https://paylab.com/bd/salaryinfo/information-technology/software-engineer?lang=en) says 80% of software engineers earn Tk 16,927–103,219 a month gross (about $140–830), but that comes from 25 verified respondents. Stack Overflow's survey had 92 qualifying Bangladeshi developers across two years. That's too few for a median, which is [why there's no reliable Bangladesh salary median](/blog/developer-salaries-by-country) in our salary data.",
    },
    {
      type: "p",
      text: "If you're comparing teams, ask who's on yours. A rate tells you little until you know the seniority it buys.",
    },

    {
      type: "h2",
      text: "What does each kind of app cost: Android, iOS, cross-platform or web app?",
    },
    {
      type: "p",
      text: "In Bdtask's published tables, a basic Android app costs Tk 1.5–3 lakh ($1,200–2,400) and a basic iOS app Tk 2–4 lakh ($1,600–3,200). Prices climb as you add a backend, an admin panel and integrations. One cross-platform codebase for both phones usually costs less than two separate native apps.",
    },
    {
      type: "table",
      headers: [
        "App type",
        "Published range (BDT)",
        "About (USD)",
        "What usually pushes it up (our view)",
      ],
      rows: [
        [
          "Basic Android",
          "Tk 1.5–3 lakh",
          "$1,200–2,400",
          "Custom design instead of a template",
        ],
        [
          "Medium Android",
          "Tk 3.5–10 lakh",
          "$2,800–8,100",
          "Online payments, maps, an admin panel",
        ],
        [
          "Advanced Android",
          "Tk 10–25 lakh+",
          "$8,100–20,200+",
          "Live tracking, chat, a heavy backend",
        ],
        [
          "Basic iOS",
          "Tk 2–4 lakh",
          "$1,600–3,200",
          "Fixes after Apple's review",
        ],
        [
          "Medium iOS",
          "Tk 4.5–12 lakh",
          "$3,600–9,700",
          "Subscriptions, payments, an admin panel",
        ],
        [
          "Advanced iOS",
          "Tk 12–25 lakh",
          "$9,700–20,200",
          "Wallet or fintech features",
        ],
      ],
    },
    {
      type: "p",
      text: "Bdtask prices iOS a little higher at every level, and it also prices single Android features. Those feature lines are more useful than any tier. An admin panel runs Tk 80,000–4 lakh+ ($650–3,240+), payment gateway integration Tk 40,000–1.2 lakh ($320–970) and chat Tk 80,000–2.5 lakh ($650–2,020).",
    },
    {
      type: "p",
      text: "Add the cheap end of all three, Tk 2 lakh together, to a Tk 1.5 lakh basic Android app and the price more than doubles. Add the top end, Tk 7.7 lakh or more, and you're at the edge of the advanced band.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/feature-costs.svg`,
        alt: "Range bar chart of what single features add to an Android app's price in Bangladesh, from Bdtask's published estimates: push notifications Tk 15,000 to 40,000, login Tk 20,000 to 80,000, UI/UX design Tk 30,000 to 1.5 lakh, payment gateway Tk 40,000 to 1.2 lakh, location tracking Tk 50,000 to 2 lakh, chat Tk 80,000 to 2.5 lakh, e-commerce module Tk 80,000 to 3 lakh and admin panel Tk 80,000 to 4 lakh and more",
        caption:
          "Vendor estimates for Android features. Source: Bdtask (updated Jun 28, 2026); USD at Tk 123.65, Bangladesh Bank, Oct 19, 2026.",
        width: 1280,
        height: 720,
      },
    },
    { type: "h3", text: "Should you build cross-platform or native?" },
    {
      type: "p",
      text: "For a first version, we'd usually pick cross-platform. Flutter or React Native builds both apps from one codebase, so you pay for one set of screens and fix each bug once. Bdtask's language table starts Flutter work at Tk 3 lakh, its lowest entry. Go native when the app leans hard on the camera, Bluetooth or heavy animation, or when nearly all your users are on one platform.",
    },
    {
      type: "p",
      text: "In Bangladesh that last case is common. StatCounter's [mobile OS figures](https://gs.statcounter.com/os-market-share/mobile/bangladesh) put Android at 93.47% of mobile web traffic in September 2026. If your customers look like that, an Android-only first version saves real money, and iOS can follow once the app earns it.",
    },
    { type: "h3", text: "What about a web app instead?" },
    {
      type: "p",
      text: "Neither price list covers web apps. For an internal tool, a booking system or a staff dashboard, a web app is often the cheaper first version: one build runs on every device, and no store has to approve it. We build those as [custom web app development](/services/custom-software-development) projects and price them the same way, from a feature list.",
    },

    {
      type: "h2",
      text: "What does an e-commerce app cost in Bangladesh?",
    },
    {
      type: "p",
      text: "Bdtask publishes Tk 3.5–12 lakh ($2,800–9,700) for an e-commerce app on Android and Tk 4–14 lakh ($3,200–11,300) on iOS. Selling through the app then adds payment and delivery fees on every order.",
    },
    {
      type: "p",
      text: "Take one common payment setup. SSLCommerz [lists](https://sslcommerz.com/pricing/) a Tk 25,500 Basic plan (about $206), marked non-refundable, plus 2.5% per successful transaction (3.5% for AMEX). It says the rate covers bKash and Nagad as well as cards. Our guide to [SSLCommerz and bKash fees in detail](/blog/payment-gateway-integration-bangladesh) compares it with integrating the wallets directly.",
    },
    {
      type: "p",
      text: "Cash on delivery has its own cost. Steadfast's [pricing page](https://steadfast.com.bd/pricing) lists a 1% cash on delivery and risk management charge, before delivery charges and VAT. On a Tk 2,000 order, that's Tk 20 to the courier, or Tk 50 to SSLCommerz if the customer pays online.",
    },
    {
      type: "p",
      text: "If you already sell through a website, ask whether the app quote reuses that store's backend or builds a second one. Two backends means two copies of your stock and prices to keep in sync. That's an expensive thing to discover after launch.",
    },

    { type: "h2", text: "What does an app cost to run after launch?" },
    {
      type: "p",
      text: "Budget for four things after launch: store accounts, servers, per-order fees and upkeep. Apple charges $99 a year (about Tk 12,200) and Google Play a one-time $25 (about Tk 3,100). We estimate yearly maintenance at 15–20% of the build cost; Bdtask publishes 15–25%.",
    },
    {
      type: "p",
      text: "The store fees come from [Apple's enrollment page](https://developer.apple.com/support/enrollment/), which says Apple bills in local currency where available, and from [Google Play's sign-up help](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en). They're the smallest line on the bill.",
    },
    {
      type: "p",
      text: "Google Play also costs you time before launch. Personal developer accounts created after November 13, 2023 must run a [closed test](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en) with at least 12 testers, opted in for at least 14 days in a row, before the app can go live. New organization accounts face a different hurdle: Google asks for a D-U-N-S number at sign-up, per its [2023 announcement](https://android-developers.googleblog.com/2023/07/boosting-trust-and-transparency-in-google-play.html).",
    },
    {
      type: "p",
      text: "Upkeep isn't optional on mobile. From August 31, 2026, Google Play requires new apps and app updates to [target Android 16](https://developer.android.com/google/play/requirements/target-sdk) (API level 36). An app nobody maintains soon can't ship even a bug fix.",
    },
    {
      type: "p",
      text: "The rest varies too much to price honestly here: servers, one-time password SMS, push notifications, email. Get those as monthly figures in writing from whoever builds the app. They're the lines that grow with your users.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/year-one-budget.svg`,
        alt: "Illustrative year-one budget for a Tk 8 lakh app in Bangladesh: the build at Tk 8 lakh, upkeep at 15 to 20 percent or Tk 1.2 to 1.6 lakh, an SSLCommerz Basic plan at Tk 25,500, Apple at about Tk 12,200 a year and Google Play at about Tk 3,100 once, for about Tk 9.6 to 10 lakh or $7,800 to $8,100 before servers and per-order fees",
        caption:
          "Illustrative. Build from the middle of Bdtask's medium band; upkeep is an Arrowbin estimate; fees from each provider's own page (Oct 22, 2026). Tk 123.65 per USD.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "In that example, a Tk 8 lakh app (the middle of Bdtask's medium band, about $6,500) costs roughly Tk 9.6–10 lakh ($7,800–8,100) in its first year. Servers and per-order fees come on top. The store accounts are small change next to upkeep.",
    },

    {
      type: "h2",
      text: "Is it cheaper for a US, UK or Australian company to build an app in Bangladesh?",
    },
    {
      type: "p",
      text: "Usually the hourly rate is lower, but the total depends on how much rework and management you take on. Choose the team on proof and process first. Look at the rate after that.",
    },
    {
      type: "p",
      text: "You already have quotes from home. The useful comparison is line by line, for the same written scope, with the seniority of each person named. A national average can't tell you whether this team's senior developer is senior. And as the salary data above shows, Bangladesh has no reliable public pay median to check against.",
    },
    {
      type: "p",
      text: "There's a real export market to choose from. BASIS, the Bangladeshi software industry association, says nearly 500 of its members exported in FY 2024-25, around 300 of them regularly, to more than 104 countries, as reported by the [Financial Express](https://thefinancialexpress.com.bd/trade/basis-honours-top-10-it-ites-exporters-for-fy25). Exporters are the firms most likely to be set up for foreign contracts and dollar invoices, and for calls at odd hours. The cheapest local tier often isn't.",
    },
    {
      type: "p",
      text: "Time zones shape how a project feels day to day. Bangladesh runs on [UTC+6 all year](https://en.wikipedia.org/wiki/Bangladesh_Standard_Time), with no daylight saving. London and Sydney get two to four hours of shared working day, depending on the season. For New York there's no overlap in normal office hours: Dhaka's evening is your morning. Our [overlap comparison for ten team cities](/blog/offshore-vs-nearshore-vs-onshore) shows how that compares with Latin America and Europe.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/time-zone-overlap.svg`,
        alt: "Timeline on a Dhaka clock showing where a client's 9-to-5 working day falls from November to March: Sydney overlaps Dhaka's morning by 3 hours, London overlaps Dhaka's afternoon by 2 hours, and New York's day starts at 8 pm in Dhaka with no overlap",
        caption:
          "Dhaka is UTC+6 with no daylight saving. Offsets shown for roughly November to March. From April to October the overlap with London and with Sydney grows by an hour.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Our view: for US clients, the overlap matters less than the habit of writing things down. A team that sends a short written update and an installable build before your morning starts will feel closer than one that's online at the same hour and vague.",
    },

    {
      type: "h2",
      text: "What's the catch when you hire a Bangladeshi app team?",
    },
    {
      type: "p",
      text: "The real risks are who actually does the work, who ends up owning the code and the store accounts, and how payments and fixes after launch are handled. None of that is unique to Bangladesh. You can settle each one in writing before you sign.",
    },
    {
      type: "ul",
      items: [
        "The team you meet isn't always the team that builds. Ask for the names and experience of the developers on your project, and whether any work is subcontracted.",
        "The contract should name the legal entity you're paying and the governing law. It should also say the code and designs become yours once paid for. Have your own lawyer read it.",
        "Code should live in a repository your company owns from the first week, not arrive as a zip file at the end.",
        "Store accounts should be yours. Apple says an organization needs a [D-U-N-S Number](https://developer.apple.com/programs/enroll/) to enroll, and the organization's name shows as the seller on the App Store, so start that paperwork early.",
        "Agree the currency up front. A dollar invoice spares you exchange-rate arguments; decide who pays the bank fees on each transfer.",
        "Ask to install a test build at every milestone. A demo on someone else's phone proves very little.",
      ],
    },
    {
      type: "p",
      text: "A good team will agree to all six without fuss. Treat pushback on any of them as information.",
    },

    {
      type: "h2",
      text: "How do you get a fair app quote in Bangladesh and protect it?",
    },
    {
      type: "p",
      text: "Ask for a written scope and a quote that prices each part of the job on its own line, from design to store submission. Then make sure the contract puts the code and the store accounts in your name.",
    },
    {
      type: "p",
      text: "This is the checklist we'd hand a friend before they sign with anyone, us included:",
    },
    {
      type: "ol",
      items: [
        "A written scope: every screen, and what a user can do on it.",
        "Every part of the job priced on its own line, from design through to the store release.",
        "Apple and Google developer accounts opened in your company's name, with the developer added as a user.",
        "Source code in a repository you own, plus a handover document at the end.",
        "The currency (BDT or USD), and for a Taka quote, whether VAT is included.",
        "Payment milestones tied to builds you can install, not to calendar dates.",
        "A bug-fix period after launch, with its length in writing.",
        "The maintenance price, quoted before you sign.",
      ],
    },
    {
      type: "image",
      image: {
        src: `${DIR}/quote-checklist.svg`,
        alt: "Checklist of eight things a fair app development quote in Bangladesh should include, in four groups: scope with line items; store accounts and code in your name; currency with VAT plus milestones tied to installable builds; then a bug-fix period and a maintenance price",
        caption:
          "Eight things to get in writing before you sign. Arrowbin checklist.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Be wary of anyone who wants 100% up front, or who sends a firm price within an hour of a two-line message. A serious estimate needs your feature list, and it should come back with questions.",
    },
    {
      type: "p",
      text: "If one quote is far below the others, hold it against the checklist. Usually a line is missing. It's often testing, or the admin panel.",
    },

    { type: "h2", text: "So what should you budget first?" },
    {
      type: "p",
      text: "Write the feature list, price the first version against the ranges above, and add a year of running costs. That gives you a number you can defend, in Taka or in dollars, before anyone quotes.",
    },
    {
      type: "p",
      text: `If you'd like a team to price it, we do [Android and iOS app development](/services/mobile-app-development) for clients worldwide, usually from one cross-platform codebase. [Book a 30-minute call](${site.bookingUrl}) with your feature list, and we'll tell you which parts drive the cost and what we'd leave out of version one.`,
    },
  ],
  takeaways: [
    "One Bangladeshi vendor's price list puts a basic app at about Tk 1.5–3.5 lakh ($1,200–2,800) and a medium app at Tk 4–12 lakh ($3,200–9,700), at Tk 123.65 to the dollar.",
    "Those ranges are vendor estimates with no cited source, and two vendors' ladders don't agree, so use them to sanity-check quotes rather than as a price list.",
    "About half the Bangladeshi app firms on Clutch list $25–49 an hour, while one local vendor puts local rates at Tk 1,000–4,000 ($8–32): two markets in one country.",
    "Single features move the price most. In one vendor's tables, an admin panel alone runs Tk 80,000–4 lakh+, more than a whole basic Android app at the top end.",
    "After launch, budget $99 a year for Apple and $25 once for Google Play, plus fees on every order and about 15–20% of the build cost a year for upkeep.",
    "Clients in the US, the UK or Australia should judge a Bangladeshi team on proof and process first, and on the rate after that.",
    "Protect any quote with a written scope and line items. Put the accounts and the code in your name, and tie milestones to builds you can install.",
  ],
  faqs: [
    {
      question: "How much does a simple Android app cost in Bangladesh?",
      answer:
        "One Bangladeshi vendor publishes Tk 1.5–3 lakh for a basic Android app, about $1,200–2,400 at Bangladesh Bank's October 19, 2026 rate. A login, a few content screens and push notifications fit that budget. Payments, chat or an admin panel push it higher.",
    },
    {
      question: "What hourly rate do Bangladeshi app agencies charge?",
      answer:
        "On Clutch's Bangladesh list in October 2026, about half the app firms showing a rate listed $25–49 an hour, about a third listed under $25, and roughly one in six listed $50–99. Shops that price for local clients often quote far less per hour, so compare line-item quotes for the same scope rather than rates alone.",
    },
    {
      question: "Should I pay a Bangladeshi developer in Taka or dollars?",
      answer:
        "Pay in the currency you earn in if you can, and fix the currency in the contract so exchange-rate moves don't reopen the price. If you're paying in Taka, ask whether VAT is included.",
    },
    {
      question: "Who should own the Google Play and App Store accounts?",
      answer:
        "You should. Open both developer accounts in your company's name and add the developer as a user, so the app and its reviews stay yours if you change teams. Company accounts need a D-U-N-S number, so apply early.",
    },
    {
      question: "Why is my local quote so much lower than an agency's?",
      answer:
        "Usually because it covers less: little design work, no testing on real phones, a template backend, or no bug-fix period. Ask each vendor to list what's included line by line, and the gap tends to narrow.",
    },
    {
      question: "How long does it take to build an app in Bangladesh?",
      answer:
        "One Bangladeshi vendor publishes 1–2 months for a basic app and 6–12 months for an enterprise one. Plan for Google Play too: new personal developer accounts must run a closed test with at least 12 testers for 14 days before launch.",
    },
    {
      question: "How much does app maintenance cost per year?",
      answer:
        "We plan on 15–20% of the build cost a year, and one Bangladeshi vendor publishes 15–25%. That pays for OS and store rule updates and security fixes, plus small changes. Servers and payment fees come on top.",
    },
    {
      question: "Can a Bangladeshi team build an app for a US or UK company?",
      answer:
        "Yes. BASIS, the industry association, says nearly 500 of its member firms took part in exports in FY 2024-25. Check overlap with your working day, who signs the contract, how code is handed over and proof of similar work, as you would with any team.",
    },
  ],
};
