import type { Post } from "@/lib/blog";
import { site } from "@/lib/site";

const DIR = "/blog/mvp-development-cost";

export const post: Post = {
  slug: "mvp-development-cost",
  title: "MVP Development Cost in 2026: How to Work Out Your Budget",
  description:
    "What an MVP costs in 2026 and why: the formula behind the number, what to cut, what it costs to run, and when a prototype is the smarter first step.",
  keywords: [
    "mvp development cost",
    "how much does an mvp cost",
    "cost to build an mvp for a startup",
    "saas mvp cost",
    "mvp cost breakdown",
    "no-code mvp vs custom mvp",
    "mobile app mvp cost",
  ],
  date: "2026-10-15",
  dateLabel: "October 15, 2026",
  author: "Md. Shishir Ahmed",
  readingTime: "12 min read",
  category: "Product",
  excerpt:
    "An MVP budget is build weeks times team times rate. Launch and running costs go on top. We show the sums with our published ranges so you can test your own number.",
  image: {
    src: `${DIR}/cover.webp`,
    alt: "Mockup of an MVP product dashboard in a browser window beside a $60,000 MVP budget card split by phase: discovery, design, development, QA and project management",
    width: 1280,
    height: 720,
  },
  tldr: "By Arrowbin's estimate, a lean MVP that does one workflow well costs $5,000–$30,000 to build in 2026, and a polished, launch-ready MVP for most businesses costs $40,000–$120,000. The number is mostly build weeks times team size times rate, so scope drives it, with integrations and extra platforms close behind. Set aside roughly 15–20% of the build cost each year to run it, and test demand with a cheap prototype first when you can.",
  body: [
    {
      type: "p",
      text: "Founders often ask what an MVP costs before they've decided what the MVP is. That's backwards, but it's normal. You need a number to raise money, get a budget signed off or decide whether the idea is worth chasing at all.",
    },
    {
      type: "p",
      text: "So here's the number first, then how it's built, so you can check any quote against your own sums. I run Arrowbin, and we scope and build MVPs and SaaS products for founders worldwide. Every Arrowbin figure below is an estimate we already publish in our cost and timeline guides. Every market figure links to its source.",
    },

    { type: "h2", text: "How much does MVP development cost in 2026?" },
    {
      type: "p",
      text: "A lean MVP that does one workflow well usually costs $5,000–$30,000, and a polished, launch-ready MVP or app for most businesses lands at $40,000–$120,000. Both are Arrowbin estimates, and they're the same ranges you'll find in our [full custom software cost guide](/blog/how-much-does-custom-software-development-cost), which also covers bigger platforms and enterprise systems.",
    },
    {
      type: "table",
      headers: [
        "What you're building",
        "Build time",
        "Arrowbin estimate",
        "Typical example",
      ],
      rows: [
        [
          "Lean, single-workflow MVP",
          "6–8 weeks",
          "$5,000–$30,000",
          "Booking tool, internal dashboard, single-flow app",
        ],
        [
          "Polished, launch-ready MVP or app",
          "10–20 weeks",
          "$40,000–$120,000",
          "Customer portal, two-sided app, multi-tenant B2B product",
        ],
        [
          "Worked example: SaaS MVP",
          "About 14 weeks",
          "About $60,000",
          "Accounts and a dashboard, with billing and a couple of integrations",
        ],
      ],
    },
    {
      type: "p",
      text: "Build times come from our guide on [how long an MVP takes](/blog/how-long-does-it-take-to-build-an-mvp). The bands are wide on purpose. Two founders can describe the same idea in one sentence and need very different builds: one needs a single type of user and a form that saves to a database, the other needs team accounts with permissions, plus Stripe billing and an iOS app. For a subscription product, add tenant isolation and billing on top; our guide to [SaaS development cost](/blog/saas-development-cost) prices both.",
    },
    {
      type: "p",
      text: "The rest of this guide is about working out which band you're in, and how to move down one without building something nobody can use.",
    },

    { type: "h2", text: "How do you work out an MVP budget yourself?" },
    {
      type: "p",
      text: "Multiply the build weeks by the size of the team and its weekly rate per person, then add launch costs and the first year of running costs. Written out: MVP budget = (weeks × team size × weekly rate) + launch costs + year-one running costs.",
    },
    {
      type: "p",
      text: "The first term is nearly all of it. Launch costs for a web MVP are small: a domain, a few service sign-ups, and app store accounts if you ship mobile. Running costs matter more, but they arrive after launch and spread across a year.",
    },
    {
      type: "p",
      text: "Take the worked example from our cost guide, a $60,000 SaaS MVP built over roughly 14 weeks. Divide one by the other and the team costs about $4,300 a week. Keep that number in your head. Each week of scope you add costs roughly another $4,300 on that build. Each week you remove saves it.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/mvp-cost-formula.svg`,
        alt: "MVP cost formula diagram: build weeks times team size times weekly rate, plus launch costs and first-year running costs, with a worked example where a $60,000, 14-week SaaS MVP costs about $4,300 per build week and two extra weeks of scope add about $8,600",
        caption:
          "The MVP cost formula, applied to our $60,000 worked example. Arrowbin estimate.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "So when you talk to a team, ask how many weeks your scope takes before you ask about hourly rates. These are the things that add weeks, roughly in order of how much they usually add (our view):",
    },
    {
      type: "ul",
      items: [
        "Core workflows. Each separate job the product does, such as booking, paying or reporting, needs its own screens and logic, and each one has to be tested.",
        "User roles. A second role, like an admin or a team manager, touches permissions on almost every screen.",
        "Integrations. Payments, login providers, email, maps or any third-party API you depend on. Each one brings its own failure cases to handle.",
        "Platforms. Web only is the cheapest route. Native [mobile app MVPs](/services/mobile-app-development) mean a separate build and test cycle per platform, plus app store review.",
        "Design depth. A reused design system is quick. Custom illustration and motion take weeks, and so does a bespoke brand system.",
        "Decision speed. A team waiting two days for your answer is still being paid for those two days.",
      ],
    },

    { type: "h2", text: "What does each phase of an MVP budget pay for?" },
    {
      type: "p",
      text: "About half of an MVP budget pays for development. The other half pays for discovery and design before the build, then QA and project management during it. That's the work that makes the code usable and keeps the launch date real. It's our typical split, and it's the one behind the $60,000 example.",
    },
    {
      type: "table",
      headers: [
        "Phase",
        "Share of budget",
        "Typical length",
        "What you walk away with",
      ],
      rows: [
        [
          "Discovery and scope",
          "About 10%",
          "1–2 weeks",
          "A locked feature list and user flows, plus the architecture and a fixed quote",
        ],
        [
          "UX/UI design",
          "About 15%",
          "1.5–3 weeks",
          "A small design system and the key screens, clickable",
        ],
        [
          "Development",
          "About 50%",
          "5–9 weeks",
          "The working product: screens, server code, integrations, hosting",
        ],
        [
          "QA and testing",
          "About 15%",
          "1–2 weeks, overlapping the build",
          "A build that holds up on real devices and with messy input",
        ],
        [
          "Project management",
          "About 10%",
          "Throughout",
          "Weekly demos, a decision log and someone holding the scope line",
        ],
      ],
    },
    {
      type: "image",
      image: {
        src: `${DIR}/mvp-budget-by-phase.svg`,
        alt: "MVP budget breakdown by phase: discovery 10%, design 15%, development 50%, QA 15% and project management 10%, with how long each phase runs and what it delivers, from a locked scope to weekly demos",
        caption:
          "Development is half of an MVP budget. Shares are Arrowbin estimates; phase lengths come from our MVP timeline guide.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "When a cheap MVP quote lands in your inbox, look for the row that's missing. It's usually discovery or QA. Skipping discovery saves 10% on paper and then spends it again mid-build, when every change is priced at development rates and pushes the launch back.",
    },
    {
      type: "p",
      text: "QA is the other easy target. An MVP with no testing budget still gets tested. Your first users do it, and some of them won't come back.",
    },
    {
      type: "cta",
      title: "How many build weeks is your MVP?",
      text: "List the workflow your product has to get right and the integrations it can't launch without. We'll come back with the band it sits in, the weeks it needs and what would move it down a band.",
      href: "/contact",
      label: "Check my MVP scope",
    },

    {
      type: "h2",
      text: "Is hiring an in-house developer cheaper than outsourcing an MVP?",
    },
    {
      type: "p",
      text: "For a first version, usually not. The [Bureau of Labor Statistics](https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm) counts software developers together with QA analysts and testers, and their US median pay was $134,040 a year ($64.44 an hour) in May 2025. That buys one person with one skill set, before benefits or recruiting. Outside the US the numbers drop sharply: our [developer salaries by country](/blog/developer-salaries-by-country) data puts the median at about $55,000 in Poland and about $19,800 in India.",
    },
    {
      type: "p",
      text: "Salary isn't the whole bill. In June 2026, benefits made up 30.0% of employer compensation costs for US private industry workers. Wages and salaries were the other 70.0%, according to the BLS [Employer Costs for Employee Compensation](https://www.bls.gov/news.release/ecec.nr0.htm) release. If a developer's package matched that average, a $134,040 salary would come with roughly $57,000 in benefits, about $191,000 a year all in. That's rough arithmetic on averages, not a quote for any real hire.",
    },
    {
      type: "p",
      text: "Now set it against an MVP. Fourteen weeks of that median salary is about $36,000, and it covers one engineer. There's no designer or tester in that number, and nobody to run the project. It also assumes you've already found the person, and your runway keeps burning while you look.",
    },
    {
      type: "p",
      text: "In-house wins later. Once the product has paying users and a long roadmap, a salaried team that knows the codebase is, in my view, the cheaper way to build feature after feature. Before that point you'd be signing up for a year of salary to answer a question that should take a quarter. Outside the US the figures change, but the shape doesn't.",
    },

    {
      type: "h2",
      text: "What can you cut from an MVP without making it useless?",
    },
    {
      type: "p",
      text: "Cut anything that doesn't test your riskiest assumption. Keep the core workflow end to end, fake the expensive back-office parts with manual work, and leave extra roles and second platforms for later.",
    },
    {
      type: "p",
      text: "This matters more than shaving a rate. [CB Insights](https://www.cbinsights.com/research/report/startup-failure-reasons-top/) looked at 431 VC-backed startups that have shut down since 2023 and put poor product-market fit at 43%, with running out of capital top of the list at 70%. An MVP that spends its budget on polish before it knows whether anyone wants the product is heading for both problems at once.",
    },
    {
      type: "table",
      headers: ["Feature", "Keep, fake or cut for v1", "Why"],
      rows: [
        [
          "The core workflow, end to end",
          "Keep",
          "It's the thing you're testing. Half a workflow tests nothing.",
        ],
        [
          "Sign-up and login",
          "Keep, on a hosted auth service",
          "Users need accounts, but writing auth from scratch is money spent on a solved problem",
        ],
        [
          "Online payments",
          "Keep if willingness to pay is the risk; otherwise fake",
          "A payment link or a manual invoice can stand in for billing code with your first customers",
        ],
        [
          "Admin panel",
          "Fake",
          "Your team can work in the database console or a spreadsheet export until volume makes it painful",
        ],
        [
          "Email notifications",
          "Keep two or three; cut the rest",
          "Receipts and password resets matter. Digest emails and nudges can wait.",
        ],
        [
          "Team accounts and extra roles",
          "Cut",
          "Permissions touch every screen, so a second role spreads cost across the whole build",
        ],
        [
          "Native iOS and Android apps",
          "Cut, unless the product needs the phone",
          "A responsive web app reaches both platforms with one build",
        ],
        [
          "In-app analytics for customers",
          "Fake",
          "Send a weekly report by email and see whether anyone opens it",
        ],
        [
          "Second and third integrations",
          "Cut, or fake with a CSV import",
          "Every integration adds its own error cases and test time",
        ],
      ],
    },
    {
      type: "image",
      image: {
        src: `${DIR}/keep-fake-cut-matrix.svg`,
        alt: "Matrix for cutting MVP cost, with features plotted by how directly they test the riskiest assumption against what they cost to build: native apps and extra roles go in the cut zone, the admin panel and billing get faked by hand, and the core workflow and hosted login stay in",
        caption:
          "Sort every feature before you price it. Placement is illustrative.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "'Fake' here means doing the work by hand behind a working front end. It doesn't scale, and it isn't meant to. If 20 customers sign up and someone on your team spends an hour a day on manual admin, that's a good problem. You now know exactly which admin screens to build first.",
    },

    {
      type: "h2",
      text: "Is a no-code or AI-built MVP cheaper than custom code?",
    },
    {
      type: "p",
      text: "Yes, for testing whether anyone wants the product. A no-code or AI-built prototype costs a monthly subscription plus your time, against thousands for custom work. Plan for hardening or a rebuild before it takes payments or stores personal data, though.",
    },
    {
      type: "p",
      text: "The tool fees are small. [Bubble's plan documentation](https://manual.bubble.io/account-and-marketplace/account-and-billing/pricing-plans) lists its web-only Starter plan at $29 a month billed annually, or $32 billed monthly. [Lovable's Pro plan](https://docs.lovable.dev/introduction/subscription-plans) is $25 a month for 100 credits on monthly billing. Neither price includes your hours, and neither tells you how many credits or workload units your app will burn.",
    },
    {
      type: "table",
      headers: [
        "Route",
        "What you pay",
        "Time to a first version",
        "Where it stops working",
      ],
      rows: [
        [
          "No-code builder (Bubble and similar)",
          "Plan fees, from $29 a month on Bubble's web-only Starter (annual billing), plus your time",
          "Days to a few weeks (our view)",
          "The app lives on the vendor's platform; Bubble says there's no way to export it as code",
        ],
        [
          "AI-built prototype (Lovable, Bolt, v0)",
          "Credit plans, from $25 a month on Lovable Pro, plus your time",
          "Days (our view)",
          "Security and payment logic are only as good as the prompts; it needs an engineer's review before real users",
        ],
        [
          "Custom MVP (agency or in-house team)",
          "$5,000–$30,000 lean, $40,000–$120,000 polished (Arrowbin estimate)",
          "6–20 weeks",
          "Costs more up front, but you own the code and can change any part of it",
        ],
      ],
    },
    {
      type: "p",
      text: "The lock-in point is Bubble's own wording. Its [data ownership page](https://manual.bubble.io/account-and-marketplace/application-and-data-ownership) says Bubble apps 'can only be run on the Bubble platform' and that leaving means rebuilding the application logic. That's a fair trade for a test. It's a bigger one for a product you plan to grow for years.",
    },
    {
      type: "p",
      text: "My advice: if [your riskiest assumption](/blog/mvp-vs-prototype-vs-poc) is demand (will anyone sign up, will they pay), build the cheapest thing that answers it, and a $25 subscription is hard to beat. If the risk is technical, or the product handles money or personal data from day one, start with [custom MVP development](/services/custom-software-development) and skip the throwaway step.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/mvp-route-decision.svg`,
        alt: "Decision flow for choosing an MVP route: if the product takes payments or holds personal data at launch, or the hard part is technical, build a custom MVP for $5,000 to $120,000; otherwise prototype first with a no-code or AI builder for about $25 to $32 a month, then harden or rebuild once it gets traction",
        caption:
          "Prototype first only when demand is the open question. Plan fees from Lovable and Bubble; MVP ranges are Arrowbin estimates.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "The trap is the in-between: a prototype that got traction and quietly became the product. Real users arrive, then real money, and nobody who'd answer for the code has ever reviewed it. If that's where you are, budget for an [engineering review of the AI-built code](/blog/vibe-coded-app-production-ready) before you scale, and treat a partial rebuild as a likely line item rather than a failure.",
    },

    {
      type: "h2",
      text: "Should an MVP be fixed price or time and materials?",
    },
    {
      type: "p",
      text: "Fixed price, after a short paid discovery, for a clearly scoped MVP. Switch to time and materials once it's live and you're changing it based on what users actually do.",
    },
    {
      type: "p",
      text: "A fixed price only works when both sides agree on what 'done' means, and that agreement is what discovery buys. On the $60,000 example, discovery is about 10% of the budget, roughly $6,000. It turns a wish list into something a team can price without padding it for unknowns.",
    },
    {
      type: "p",
      text: "Before you sign a fixed-price MVP contract, check that it names these things:",
    },
    {
      type: "ul",
      items: [
        "The feature list, with a sentence of acceptance criteria for each, so 'done' isn't a matter of opinion.",
        "What's out of scope, in writing. This list matters as much as the scope itself.",
        "How change requests get priced and approved, because you will want changes once you see working screens.",
        "How many rounds of design revisions are included.",
        "Who owns the code, the hosting accounts and the app store listings. It should be you.",
        "What happens to bugs found in the first weeks after launch.",
      ],
    },
    {
      type: "p",
      text: "Time and materials suits the stage after launch, when you ship small changes every week and the roadmap moves with the data. Paying a fixed price for that kind of work means paying for someone's guess about change, plus a margin for being wrong.",
    },

    { type: "h2", text: "What does an MVP cost to run in its first year?" },
    {
      type: "p",
      text: "Plan on roughly 15–20% of the build cost per year for hosting and services, plus security patches and small fixes. On a $60,000 MVP that's $9,000–$12,000 (Arrowbin estimate), and the next round of features is a separate budget on top.",
    },
    {
      type: "p",
      text: "The launch fees are small and well documented. The [Apple Developer Program](https://developer.apple.com/programs/enroll/) is 99 USD per membership year, and Google Play charges a [one-time US$25 registration fee](https://support.google.com/googleplay/android-developer/answer/6112435). A web-only MVP pays neither.",
    },
    {
      type: "p",
      text: "Monthly platform bills are small at MVP scale too. List prices for a common stack, checked in October 2026:",
    },
    {
      type: "ul",
      items: [
        "Hosting: [Vercel](https://vercel.com/pricing) Pro is $20 a month per developer seat. Its free Hobby plan is for personal, non-commercial use only.",
        "Database and auth: [Supabase](https://supabase.com/pricing) Pro starts at $25 a month. Free projects pause after a week of inactivity, which suits a demo and not a product with customers.",
        "Error monitoring: [Sentry](https://sentry.io/pricing/) Team is $26 a month when billed annually.",
        "Payments: [Stripe](https://stripe.com/pricing) charges 2.9% + 30¢ per successful domestic card payment with no setup or monthly fee, so this line grows with revenue.",
      ],
    },
    {
      type: "p",
      text: "Add up the three subscriptions, with one Vercel seat, and you get about $850 a year at list price. Set that against the $9,000–$12,000 estimate and the point is plain: after launch, the money goes on people's time. Someone has to apply security patches, upgrade dependencies, answer the error alert out of hours and fix the bug your first customer found. Our [software maintenance guide](/blog/software-maintenance-cost) shows where that money goes.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/first-year-cost-curve.svg`,
        alt: "Line chart of an MVP's cumulative cost over its first year: spend climbs about $4,300 a week to roughly $60,000 at launch in week 14, then rises by $9,000 to $12,000 over the following 12 months, of which list-price platform subscriptions are about $850",
        caption:
          "A steep build, then a shallow first year. Illustrative, Arrowbin estimates; store fees from Apple and Google Play.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "The line founders forget is version two. If the MVP works, users will ask for things, and those features cost the same weekly rate as the first build. It's much easier to plan for that on day one than to discover it when the money's gone.",
    },

    { type: "h2", text: "How do you get an MVP quote you can trust?" },
    {
      type: "p",
      text: "Send a one-page brief that names your users, the one core workflow, the integrations you can't launch without and a target launch window. Then ask every team for weeks and team size, not only a total, so you can check the sum yourself.",
    },
    {
      type: "ol",
      items: [
        "Who uses it: one line per type of user, and say which one matters most.",
        "The core workflow, step by step, from the moment a user arrives to the moment they get value.",
        "Must-have integrations, by name: Stripe, Google sign-in, a courier API, whatever you can't launch without.",
        "Platforms, and which one comes first: web, iOS or Android.",
        "What already exists, such as designs, a prototype, old code or the spreadsheet the business runs on today.",
        "A launch window and a budget band, so a team can suggest what to cut instead of pricing your whole wish list.",
        "How you'll judge the MVP after launch: sign-ups, paid accounts, or one customer using it every day.",
      ],
    },
    {
      type: "p",
      text: "That's the shape of brief we ask for before a discovery call, because it lets us say early which band a project sits in and what would move it down. If you have one ready, [send us a one-page brief](/contact).",
    },
    {
      type: "p",
      text: "Then compare quotes on the arithmetic. Divide each total by its weeks. A quote that's half the others for the same weeks has a smaller team, cheaper people or missing phases, and it should tell you which. A quote with no week count at all is a guess wearing a price tag.",
    },

    { type: "h2", text: "Where should your first MVP dollar go?" },
    {
      type: "p",
      text: "Write down the one assumption that would sink the product if it turned out wrong. If a $25-a-month prototype can test it, start there. Spend the build money once you have evidence. If it can't, because the product handles payments or personal data or the hard part is technical, scope a lean custom MVP and run every quote through the formula above.",
    },
    {
      type: "p",
      text: `If you're building a subscription product, our [SaaS MVP development](/services/saas-product-engineering) work covers accounts and Stripe billing from the first version. And if you'd like a second opinion on a scope or a quote you already have, [book a free 30-minute call](${site.bookingUrl}) and we'll go through the numbers with you.`,
    },
  ],
  takeaways: [
    "By Arrowbin's estimate, a lean MVP costs $5,000–$30,000 in 2026 and a polished, launch-ready MVP or app costs $40,000–$120,000.",
    "MVP budget = build weeks × team size × weekly rate, plus launch costs and year-one running costs. The build term is almost all of it.",
    "On a $60,000, 14-week SaaS MVP, each week of scope is worth about $4,300, so cutting scope is the most direct way to cut cost.",
    "About half of an MVP budget is development. The rest pays for discovery and design up front, then QA and project management during the build.",
    "Keep the core workflow, fake expensive back-office features by hand, and cut extra roles and second platforms from version one.",
    "A no-code or AI-built prototype can test demand for a monthly subscription, but it needs hardening before it handles payments or personal data.",
    "After launch, set aside roughly 15–20% of the build cost a year to run the product, plus a separate budget for version two.",
  ],
  faqs: [
    {
      question: "Can I build an MVP for under $10,000?",
      answer:
        "Sometimes. A narrow single-workflow tool built on a reused design system with hosted login can land there, and so can a no-code or AI-built prototype. Expect one platform and few integrations. Be ready to rebuild parts of it if it takes off.",
    },
    {
      question: "Is a very cheap MVP quote a red flag?",
      answer:
        "Not on its own, but check what it leaves out. Divide the total by the number of weeks and ask how many people are on the team. Then check that discovery and QA show up as their own lines. A low quote with none of those usually means the cost turns up later as rework.",
    },
    {
      question: "Should my MVP be a web app or a mobile app?",
      answer:
        "Web first, in most cases. A responsive web app works on phones, ships from one codebase and skips app store review. Go mobile first only when the product depends on phone features such as the camera, location or push notifications.",
    },
    {
      question:
        "What does it cost to put an MVP on the App Store and Google Play?",
      answer:
        "Apple's Developer Program is 99 USD per membership year, and prices can vary by region. Google Play charges a one-time US$25 registration fee. Those are only the account fees; the bigger cost of a mobile MVP is building and testing for each platform.",
    },
    {
      question: "Are freelancers cheaper for building an MVP?",
      answer:
        "Often per hour, not always per project. With freelancers you become the project manager and the QA lead, and you're the one who joins design to code. If someone leaves mid-build, continuity is your problem too.",
    },
    {
      question: "Do I need a technical co-founder before paying for an MVP?",
      answer:
        "Not to get it built. You do need someone who can make technical decisions after launch, read a quote critically and hold the code and accounts. That can be a co-founder, a fractional CTO or a development partner you trust.",
    },
    {
      question: "How do I stop an MVP budget from growing during the build?",
      answer:
        "Lock the feature list after discovery and keep a written list of what's out of scope. Put new ideas on a version-two list instead of into the current sprint, and ask for a price before you approve any change. Weekly demos help because you see drift early.",
    },
    {
      question: "How much money should I keep back after the MVP launches?",
      answer:
        "As a rule of thumb, roughly 15–20% of the build cost per year to run and maintain it (an Arrowbin estimate), plus a separate budget for the features users ask for. On a $60,000 build that's about $9,000–$12,000 a year before any new features.",
    },
  ],
};
