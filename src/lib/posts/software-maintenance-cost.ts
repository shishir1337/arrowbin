import type { Post } from "@/lib/blog";
import { site } from "@/lib/site";

const DIR = "/blog/software-maintenance-cost";

export const post: Post = {
  slug: "software-maintenance-cost",
  title: "How Much Does Software Maintenance Cost Per Year in 2026?",
  description:
    "Software maintenance costs roughly 15–20% of the build cost a year. See what it buys, the 2026 deadlines that force updates, and how to choose a plan.",
  keywords: [
    "how much does software maintenance cost",
    "software maintenance cost per year",
    "software maintenance cost percentage",
    "app maintenance cost",
    "saas maintenance cost",
    "software maintenance retainer",
    "what is included in software maintenance",
    "maintenance cost of custom software",
  ],
  date: "2026-10-15",
  dateLabel: "October 15, 2026",
  author: "Md. Shishir Ahmed",
  readingTime: "14 min read",
  category: "Guides",
  excerpt:
    "Software keeps costing money after launch, and for good reasons. Here is how much to budget, what the money buys, and the 2026 deadlines that make skipping it expensive.",
  image: {
    src: `${DIR}/cover.webp`,
    alt: "Mockup of a software maintenance dashboard: 30-day uptime bars, pending Node.js and PostgreSQL major updates, a monthly report card with tested backups and applied patches, and a PostgreSQL 14 deadline reminder",
    width: 1280,
    height: 720,
  },
  tldr: "Budget roughly 15–20% of the original build cost every year to keep custom software running, which comes to $9,000–$12,000 a year for a $60,000 SaaS MVP (an Arrowbin planning estimate, not an industry statistic). The money pays for four kinds of work: fixing bugs, adapting to platform and dependency changes, improving features people rely on, and preventive work like backups and security patches. Skipping it isn't a real option, because platforms set fixed deadlines: Google Play requires API level 36 for app updates from August 31, 2026; PostgreSQL 14 gets its final release on November 12, 2026.",
  body: [
    {
      type: "p",
      text: "Most software quotes answer one question: what will it cost to build? The bill that follows you for years gets a line at the bottom, if it gets one at all. This guide is about that second bill.",
    },
    {
      type: "p",
      text: "If you're about to sign for a build, you want the after-launch number before you commit. If you already own software, maybe built by a team that has since moved on, you're pricing a maintenance plan and want to know what's fair. We build software and run monthly maintenance plans, so we see both ends of it. If you haven't decided to build yet, weigh [per-seat SaaS fees against a custom build](/blog/custom-software-vs-off-the-shelf) first.",
    },
    {
      type: "p",
      text: "Every number links to its source or is labelled as our estimate. Deadlines are quoted as of October 15, 2026.",
    },

    { type: "h2", text: "How much does software maintenance cost per year?" },
    {
      type: "p",
      text: "Budget roughly 15–20% of the original build cost each year. That's an Arrowbin planning estimate, the same band we use in our guide to [what the original build costs](/blog/how-much-does-custom-software-development-cost), and it isn't an industry statistic.",
    },
    {
      type: "p",
      text: "The band is for owning the software, not only for engineering hours. It covers the upkeep work (fixes, updates, monitoring, support) plus the hosting and third-party services the product runs on. If one of those bills is big on its own, like a cloud bill for heavy traffic or SMS fees at volume, give it a separate line. Those costs grow with usage, not with the code.",
    },
    {
      type: "table",
      headers: [
        "Project type",
        "Build cost (cost guide)",
        "Yearly budget at 15–20%",
        "Roughly per month",
      ],
      rows: [
        [
          "Internal tool or simple MVP",
          "$5,000–$30,000",
          "$750–$6,000",
          "$60–$500",
        ],
        [
          "Mid-size web or mobile app",
          "$30,000–$90,000",
          "$4,500–$18,000",
          "$375–$1,500",
        ],
        [
          "Full SaaS platform",
          "$80,000–$200,000",
          "$12,000–$40,000",
          "$1,000–$3,300",
        ],
        [
          "Worked example: SaaS MVP",
          "$60,000",
          "$9,000–$12,000",
          "$750–$1,000",
        ],
      ],
    },
    {
      type: "p",
      text: "A $60,000 SaaS MVP works out to $9,000–$12,000 a year, or about $750–$1,000 a month. Remember the monthly figure. It's how maintenance is usually sold, and it's the number you'll hold quotes against.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/maintenance-budget-by-project.svg`,
        alt: "Range bar chart of yearly software maintenance budgets at 15–20% of build cost: $750–$6,000 for an internal tool or simple MVP, $4,500–$18,000 for a mid-size app, $12,000–$40,000 for a SaaS platform and $9,000–$12,000 for a $60,000 SaaS MVP",
        caption:
          "Yearly maintenance budget by project type at 15–20% of build cost. Arrowbin estimate, using the build ranges from our cost guide.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Where you land inside the band depends on the product. Plan for the top of it, or above, if you handle health or payment data, connect to lots of outside systems, ship on the web and both app stores, or are growing fast. AI agents belong there too, because the models under them get repriced and retired, as our guide to [AI agent costs](/blog/ai-agent-cost-small-business) shows. The bottom fits a stable internal tool that 20 staff use and nobody has asked to change in a year.",
    },

    { type: "h2", text: "What does software maintenance actually include?" },
    {
      type: "p",
      text: "Software maintenance is four kinds of work: fixing bugs, adapting to platform and dependency changes, improving features people already use, and preventive work (monitoring, backups, security patches). Engineers call them corrective, adaptive, perfective and preventive maintenance.",
    },
    {
      type: "p",
      text: "Most owners picture only the first kind. Bug fixes are the part you see. The adaptive and preventive work is invisible when it's done well, which is exactly why it's the first thing cut when money gets tight.",
    },
    {
      type: "table",
      headers: [
        "Work type",
        "Examples",
        "How often it comes up",
        "What happens if you skip it",
      ],
      rows: [
        [
          "Corrective: fixing bugs",
          "A checkout that fails for one card type, a report with wrong totals, a layout that breaks on a new phone",
          "Often in the first months after launch, then less",
          "Users live with workarounds for a while, then leave",
        ],
        [
          "Adaptive: keeping up with platforms",
          "New iOS and Android SDK targets, a framework major version, a payment API version change, a database end of life",
          "Several times a year, often on fixed dates",
          "Store rejections, unsupported runtimes, broken integrations",
        ],
        [
          "Perfective: improving what exists",
          "Faster search, a clearer onboarding step, the export your finance team keeps asking for",
          "Ongoing, at whatever pace you fund",
          "The product slowly falls behind what users expect",
        ],
        [
          "Preventive: reducing future risk",
          "Uptime and error monitoring, security updates, backups with test restores, cleaning up fragile code",
          "Daily to monthly",
          "Small problems grow into outages, breaches or lost data",
        ],
      ],
    },
    {
      type: "p",
      text: "The frequencies in that table are our rough experience across web and mobile products, not measured data. Your mix will differ. A WooCommerce store spends more of its time on plugin updates; a native app spends more on store requirements.",
    },
    {
      type: "cta",
      title: "What would your software cost to keep healthy?",
      text: "From what your software does, what it's built with and who built it, we can list the upkeep it needs and what a monthly plan would cover.",
      href: "/contact",
      label: "Ask for a maintenance quote",
    },

    { type: "h2", text: "Why can't you just skip software maintenance?" },
    {
      type: "p",
      text: "Because the platforms under your software change on fixed dates, and attackers move within hours once a flaw is public. In October 2026 PHP had to ship an [emergency fix for two critical bugs](/blog/php2shell-php-vulnerability-check-and-fix), and AWS had already logged an attack attempt four days earlier. Software nobody updates eventually gets rejected by the app stores, stops receiving security fixes, or gets broken into.",
    },
    {
      type: "p",
      text: "The dates below are quoted from each official page as of October 15, 2026.",
    },
    {
      type: "table",
      headers: [
        "Platform",
        "Requirement or end of support",
        "Date",
        "What it means for you",
        "Source",
      ],
      rows: [
        [
          "Apple App Store",
          "Uploads must be built with Xcode 26 or later using an iOS 26 SDK (or the matching 26 SDK)",
          "Since April 28, 2026",
          "Every iOS update, even a one-line fix, needs a build on current tools",
          "Apple Developer",
        ],
        [
          "Apple App Store",
          "iOS and iPadOS apps must target iOS 13 or later",
          "Since September 9, 2026",
          "Apps still targeting very old iOS versions must raise the target first",
          "Apple Developer",
        ],
        [
          "Google Play",
          "New apps and app updates must target Android 16 (API level 36) or higher (Wear OS, TV, Automotive OS and XR apps have lower targets)",
          "From August 31, 2026; extensions to November 1, 2026 on request",
          "You can't ship an update until the target is raised",
          "Android Developers",
        ],
        [
          "Google Play",
          "Existing apps must target Android 15 (API level 35) or higher to stay available to new users on newer Android versions",
          "From August 31, 2026",
          "A neglected app disappears for new users on newer phones",
          "Android Developers",
        ],
        [
          "PostgreSQL 14",
          "Final release (each major version gets 5 years of support)",
          "November 12, 2026",
          "No more bug or security fixes for databases on 14",
          "PostgreSQL",
        ],
        [
          "Node.js 20 (Iron)",
          "End of life",
          "April 30, 2026",
          "No more security releases for apps still on it",
          "Node.js",
        ],
        [
          "Node.js 22 (Jod)",
          "Scheduled end of life (dates subject to change)",
          "April 30, 2027",
          "Plan the move to Node.js 24 now",
          "Node.js",
        ],
        [
          "PHP 8.2",
          "End of security support",
          "December 31, 2026",
          "WordPress or Laravel sites on 8.2 need a PHP upgrade, with plugin testing",
          "php.net",
        ],
        [
          "TLS certificates",
          "Maximum validity drops from 200 days to 100 days",
          "March 15, 2027",
          "Certificate renewal has to be automated",
          "CA/Browser Forum",
        ],
        [
          "WordPress plugins and themes",
          "Weighted median time to first exploit: 5 hours; 46% of flaws had no fix at public disclosure",
          "2025 data, report updated February 25, 2026",
          "Security updates have to go out within hours, not at the next monthly check",
          "Patchstack",
        ],
      ],
    },
    {
      type: "p",
      text: "The app store rules bite hardest because they block releases. Apple's [upcoming requirements page](https://developer.apple.com/news/upcoming-requirements/) and Google's [target API level requirements](https://developer.android.com/google/play/requirements/target-sdk) apply to every upload, so an app that misses them can't ship even a bug fix. Google also sidelines stale apps: one that targets Android 14 (API level 34) or lower is only offered on devices running that version or older.",
    },
    {
      type: "p",
      text: "Servers run on their own calendar. PostgreSQL's [versioning policy](https://www.postgresql.org/support/versioning/) supports each major version for 5 years, then stops. The Node.js [previous releases page](https://nodejs.org/en/about/previous-releases) lists Node.js 20 as end of life and says production applications should only use Active LTS or Maintenance LTS releases.",
    },
    {
      type: "p",
      text: "The Node.js dates in the table come from the Release team's [schedule](https://github.com/nodejs/Release), which notes they can change. The PHP date is from php.net's [supported versions page](https://www.php.net/supported-versions.php).",
    },
    {
      type: "p",
      text: "Even TLS certificates have a schedule now. The CA/Browser Forum's [Baseline Requirements](https://cabforum.org/working-groups/server/baseline-requirements/requirements/) cut the maximum certificate lifetime to 200 days on March 15, 2026, then to 100 days a year later. If anyone still renews a certificate by hand, that job has to become automatic.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/platform-deadlines-2026-2027.svg`,
        alt: "Timeline of platform deadlines that force software maintenance between April 2026 and April 2027, from Apple's Xcode 26 SDK rule and Google Play's API 36 target to PostgreSQL 14's final release, PHP 8.2's security end and Node.js 22's scheduled end of life",
        caption:
          "Platform deadlines from April 2026 to April 2027, as published on October 15, 2026. Sources: Apple, Google, PostgreSQL, Node.js, php.net, CA/Browser Forum.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Security is the other clock. Patchstack's [State of WordPress Security in 2026](https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/) counted 11,334 new vulnerabilities in the WordPress ecosystem in 2025, 42% more than the year before, and 91% of them were in plugins. In 46% of cases the developer hadn't shipped a fix by the time the flaw went public, and the weighted median time to first exploit was just 5 hours.",
    },
    {
      type: "p",
      text: "A monthly update window doesn't survive numbers like that. Someone has to be watching. The data covers WordPress only, but I see no reason to think attackers give npm or Composer packages more patience.",
    },

    { type: "h2", text: "What drives software maintenance cost up or down?" },
    {
      type: "p",
      text: "Five things move the number most: the number of integrations, the number of platforms you ship on, how much of the code has automated tests, how old the dependencies are, and how fast the product is still changing. Sensitive data adds a sixth.",
    },
    {
      type: "ul",
      items: [
        "Integrations. Every payment gateway, courier API or accounting sync ties you to someone else's roadmap. When they release a new API version or retire an endpoint, you pay to follow. Our [courier integration guide](/blog/courier-api-integration-bangladesh) is a worked example of what owning one involves after launch.",
        "Platforms. A web app has one release pipeline. Add iOS and Android and you have three, each with its own store rules and yearly SDK changes.",
        "Test coverage. With automated tests on the main flows, checking a dependency update is routine. Without them, every update means someone clicking through the app by hand, and things still slip through.",
        "Dependency age. Software one version behind is cheap to bring current. Software three major versions behind needs a project of its own.",
        "Rate of change. A product still finding its market changes every month, and every change adds code someone has to maintain. A finished internal tool barely changes.",
        "Data sensitivity. Health records or payment data bring audits and access reviews that a brochure site never needs.",
      ],
    },
    {
      type: "p",
      text: "Say you run two products that cost the same to build. One is a WooCommerce store with 30 plugins, two payment gateways and a courier integration. The other is a booking tool with one payment provider and no plugins. The store will cost more to keep, because more of its moving parts belong to other people. Codebase size matters less than people think.",
    },

    {
      type: "h2",
      text: "Retainer, pay as you go, or an in-house developer: which costs less?",
    },
    {
      type: "p",
      text: "For most products after launch, a monthly retainer gives the most cover per dollar, because the routine work never stops. Pay as you go suits stable tools that rarely change. An in-house developer makes sense once you have a full-time stream of product work, not just upkeep.",
    },
    {
      type: "table",
      headers: [
        "Model",
        "How you pay",
        "Response time",
        "Best for",
        "Watch-out",
      ],
      rows: [
        [
          "Monthly retainer",
          "A fixed monthly fee for a defined scope and amount of work",
          "Written into the plan as an SLA, with faster targets for critical issues",
          "Products that take payments, hold customer data or run daily operations",
          "Check what counts as critical and what happens to unused hours",
        ],
        [
          "Pay as you go",
          "Hourly or per ticket, only for work done",
          "Best effort: you join the queue",
          "Stable internal tools that rarely change",
          "Nobody watches the system between tickets",
        ],
        [
          "In-house developer",
          "Salary plus benefits and overheads",
          "Fast in office hours; one person can't cover nights, holidays or sick days",
          "A full-time stream of product work",
          "A single point of failure unless the system is documented",
        ],
        [
          "In-house plus a small retainer",
          "A salary plus a smaller monthly fee",
          "Shared: the outside team takes alerts and cover",
          "Teams with one or two developers",
          "Agree in writing who gets paged first",
        ],
      ],
    },
    {
      type: "p",
      text: "In-house looks cheap per hour and costs far more per year. The US Bureau of Labor Statistics puts [median pay for software developers, QA analysts and testers](https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm) at $134,040 a year in May 2025, and that's salary alone. For what developers earn in other countries, see our [salary data by country](/blog/developer-salaries-by-country).",
    },
    {
      type: "p",
      text: "In the BLS [employer cost survey](https://www.bls.gov/news.release/ecec.nr0.htm), benefits made up 30.0% of private-industry compensation costs in June 2026. Apply that share and one developer costs roughly $191,000 a year before overheads like equipment or recruiting. That's our arithmetic, not a BLS figure.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/in-house-vs-maintenance-budget.svg`,
        alt: "Bar chart comparing one in-house developer at roughly $191,000 a year (a $134,040 BLS median salary plus about $57,000 in benefits) with yearly maintenance budgets of $12,000–$40,000 for a SaaS platform, $4,500–$18,000 for a mid-size app and $9,000–$12,000 for a $60,000 SaaS MVP",
        caption:
          "One salaried developer against yearly maintenance budgets. Sources: BLS median pay (May 2025) and employer cost survey (June 2026); budgets are Arrowbin estimates.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Now hold that against the $9,000–$12,000 a year our band gives for a $60,000 SaaS MVP. One developer on a typical salary costs about as much as 16 to 21 years of that product's upkeep. Hire when you have more product work than one person can do, not because something needs patching.",
    },
    {
      type: "p",
      text: "Pay as you go has a hidden cost: nobody watches between tickets. That's fine for an internal tool a few staff use. For anything that takes payments, it's a poor fit. The deadlines and exploits above don't wait for a ticket.",
    },

    { type: "h2", text: "What should a software maintenance plan include?" },
    {
      type: "p",
      text: "A maintenance plan should cover six things: monitoring with alerts, regular security patching, backups with tested restores, bug fixes, a monthly report, and a written response time for critical issues. If a plan you're quoted leaves one out, ask why.",
    },
    {
      type: "ul",
      items: [
        "Uptime and error monitoring, with alerts that reach a named person rather than a shared inbox.",
        "Security and dependency updates on a schedule, plus same-day patches when a serious flaw is published.",
        "Backups that someone restores on purpose, on a schedule, so you know they work before you need them.",
        "Bug fixes, with a clear line between a bug and a new feature.",
        "A monthly report on what was updated, what broke and got fixed, and which platform deadlines are coming.",
        "A written response time for critical issues, and a written definition of critical.",
        "Access you own: the code repository, the hosting and app store accounts, the runbooks.",
      ],
    },
    {
      type: "p",
      text: "Ideally your [monitoring, backups and hosting](/services/cloud-devops-hosting) all run in accounts in your name. Then changing provider means handing over access, not moving servers.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/maintenance-calendar.svg`,
        alt: "Software maintenance calendar for a live product: monitoring runs all the time, backups daily, patch review weekly, a health report monthly, a restore test quarterly and major version upgrades once a year",
        caption:
          "A sensible upkeep cadence for a live product. Our recommendation, not an industry standard.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Read the response time line twice. A response target says how fast someone acknowledges the problem and starts on it. A resolution target says how fast it's fixed. Those are different promises, and the plan should say which one it makes for critical issues.",
    },
    {
      type: "p",
      text: "Be careful with anyone who guarantees a fix time for every bug. Some fixes depend on a payment gateway or a cloud provider that nobody on your side controls.",
    },
    { type: "h3", text: "Questions to ask any maintenance provider" },
    {
      type: "ol",
      items: [
        "What counts as a critical issue, and what is the response target for it?",
        "Who receives the alert at 2 a.m. on a Sunday?",
        "How do you test that backups restore, and how often?",
        "Which platform deadlines in the next 12 months affect my software?",
        "What happens to hours we don't use in a month?",
        "If we part ways, what do we get back, and how quickly?",
      ],
    },

    {
      type: "h2",
      text: "How does the maintenance budget change over the first few years?",
    },
    {
      type: "p",
      text: "Year one usually carries more bug fixes, because real users find the edge cases testing missed. Later years shift toward updates and improvements, with a heavier year whenever a framework, runtime or database major version comes due. Keep 15–20% as the planning band and check it each year against what you actually spent.",
    },
    {
      type: "p",
      text: "Published year-by-year figures are rare. The best we've found is a [benchmark from Wavect](https://wavect.io/blog/software-maintenance-cost-benchmark-dach-saas/), a software agency, covering 24 SaaS products in the German-speaking DACH region. It reports median yearly spend of 24% of the build cost in year one, 21% in year two and 26% in year three.",
    },
    {
      type: "p",
      text: "Treat those numbers with care. The author calls the sample directional, the method isn't published, and these are SaaS businesses still shipping features. The shape is the useful part: a dip after year one, then a rise the author puts down to framework major versions, cloud growth and piled-up product requests. My view is that a SaaS product still adding features every month belongs at the top of our band or above it. Maintenance is only one line of that bill, though; our SaaS guide shows [how SaaS running costs add up](/blog/saas-development-cost) once payment fees, hosting and tool plans join it.",
    },
    {
      type: "p",
      text: "Major versions are the lumpy part. Say you launched in mid-2023 on Node.js 20, the newest even-numbered release line at the time. That runtime reached end of life on April 30, 2026. Three newer even-numbered majors have come out since. A PostgreSQL 15 database from the same launch now has three newer majors above it, and its support runs out on November 11, 2027.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/version-drift.svg`,
        alt: "Version drift chart for software launched in mid-2023 and never upgraded: by October 2026 Node.js 20 is end of life with three newer LTS majors released, PostgreSQL 15 has three newer majors above it, and PHP 8.2 has three newer branches with its security support ending December 31, 2026",
        caption:
          "How far behind a mid-2023 launch falls by October 2026 if nobody upgrades. Sources: Node.js release schedule; PostgreSQL versioning policy; php.net.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "One major version at a time is routine. Three at once is a project, with breaking changes stacked on each other. Put one upgrade window a year into the budget and the lumps stay small.",
    },

    {
      type: "h2",
      text: "What if the software is old or built by someone else?",
    },
    {
      type: "p",
      text: "Start with an audit of the code and infrastructure, fix the urgent risks first, then modernize step by step. A full rewrite is rarely the right first move.",
    },
    {
      type: "p",
      text: "When we take over software another team built, these are the first things we check:",
    },
    {
      type: "ul",
      items: [
        "Who holds the keys: domain, hosting, code repository, app store accounts. Nothing else can start until access is sorted.",
        "Whether backups exist, and whether anyone has ever restored one.",
        "Which versions of the runtime, framework or database are running, and when each reaches end of life.",
        "Known vulnerabilities in dependencies, which npm audit or composer audit will list in minutes.",
        "Whether any automated tests exist, and how code reaches production.",
        "Secrets committed to the repository, such as API keys sitting in Git history.",
      ],
    },
    {
      type: "p",
      text: "The audit should end in a short ranked list. Urgent: an end-of-life runtime, exposed secrets, no working backup. Next: missing monitoring and manual deploys. Later: code quality and refactoring. Work through it in that order.",
    },
    {
      type: "p",
      text: "Expect the first year on inherited software to cost more than the 15–20% band, since the audit and the stabilizing work come before routine upkeep. How much more depends on what the audit finds.",
    },
    {
      type: "p",
      text: "Two special cases. If the code came out of an AI app builder, the checks are different, and we've written up [what to look for in an AI-built codebase](/blog/vibe-coded-app-production-ready). If it's an old WordPress site that keeps breaking, price the patching against [moving it to Next.js](/blog/wordpress-to-nextjs-migration) before you commit to either.",
    },

    {
      type: "h2",
      text: "How can you lower maintenance costs without adding risk?",
    },
    {
      type: "p",
      text: "Keep routine work small and regular: update dependencies a little each month, automate tests on the flows that make money (sign-up, checkout and payment webhooks), ship each fix as one merged pull request, and delete plugins and packages you don't use. Patchstack's 2025 data found 91% of WordPress vulnerabilities in plugins, so a short plugin list is cheap insurance.",
    },
    {
      type: "ol",
      items: [
        "Update a little, often. A minor version a month is routine work. Tools like Dependabot or Renovate open the update pull requests for you.",
        "Test the flows that make money. Automated tests on sign-up and checkout, plus the payment webhooks, catch the breakages that cost the most. Not every screen needs a test.",
        "Make deploys boring. When a fix ships with one merged pull request, patches go out the same day. When it takes an afternoon of manual steps, they wait.",
        "Delete what you don't use. Every plugin, package or cron job you've forgotten about is one more thing to patch.",
        "Write it down. A README covering setup and deploys, plus how to restore from backup, lets any competent engineer take over. You aren't tied to one person or one agency.",
      ],
    },
    {
      type: "p",
      text: "Don't cut monitoring, backups or security updates to save money. They're a small slice of the monthly bill, and they're the first things you'll wish you had when something breaks.",
    },

    { type: "h2", text: "How do you work out your own maintenance budget?" },
    {
      type: "p",
      text: "Take your build cost and multiply it by 0.15 and 0.20. That's your yearly range, and dividing by 12 gives the monthly figure to hold any quote against. Then check the deadline table against what your software runs on. Anything that appears on it is your first job.",
    },
    {
      type: "p",
      text: `If you'd rather hand the routine to someone else, that's what our [software maintenance and support plans](/services/maintenance-support) are for. They're monthly retainers with a defined response SLA, and every plan includes monitoring, backups, bug fixes, a monthly health report, and security and dependency updates. On a [30-minute call](${site.bookingUrl}) we can check what your software runs on against the deadline table above.`,
    },
  ],
  takeaways: [
    "Budget roughly 15–20% of the build cost per year to own custom software (Arrowbin estimate), which is $9,000–$12,000 a year for a $60,000 SaaS MVP.",
    "Maintenance is four kinds of work: fixing bugs, adapting to platform changes, improving existing features, and preventive work like backups and patches.",
    "Platform deadlines make upkeep non-optional: Google Play requires API level 36 for app updates from August 31, 2026, and PostgreSQL 14's final release is on November 12, 2026.",
    "Patchstack's 2025 data puts the weighted median time to first exploit for WordPress-ecosystem flaws at 5 hours, so patching can't wait for a quarterly check.",
    "A retainer suits most live products and pay as you go suits stable internal tools; an in-house hire makes sense once there's full-time product work.",
    "A good plan spells out monitoring, updates, tested backups, bug fixes, a monthly report and a written response time for critical issues.",
    "Upgrade one major version at a time; three at once turns routine upkeep into a project.",
  ],
  faqs: [
    {
      question: "Is 15–20% a year normal for software maintenance?",
      answer:
        "It's our planning estimate for custom software, not an industry statistic. Simple, stable tools can need less, while products with regulated data or many integrations usually need more. Check it each year against what you actually spent.",
    },
    {
      question: "Does a maintenance plan include hosting?",
      answer:
        "Usually not. A maintenance plan pays for engineering work such as monitoring, updates and fixes, while bills from your host, domain registrar or API providers go to those companies directly. Our 15–20% planning band still counts them, because they're part of owning the software.",
    },
    {
      question: "Can I stop maintenance once the software is stable?",
      answer:
        "You can pause new features, but you can't pause the platforms underneath. Security patches, runtime end-of-life dates and app store requirements keep arriving on dates you don't control, so a minimum level of upkeep has to continue.",
    },
    {
      question:
        "What happens if my Android app isn't updated for Google Play's requirements?",
      answer:
        "From August 31, 2026, Google Play requires new apps and app updates to target Android 16 (API level 36), so you can't ship even a bug fix until the target is raised. Existing apps that target Android 14 (API level 34) or lower are only available on devices running that version or older, which hides them from new users on newer phones.",
    },
    {
      question: "Is a maintenance retainer worth it for a small business?",
      answer:
        "If your software takes payments, stores customer data or runs daily operations, yes, because someone has to watch it and patch it on a schedule. A very simple internal tool that rarely changes can be fine on pay as you go.",
    },
    {
      question: "Can unused retainer hours go toward new features?",
      answer:
        "On our plans, yes: hours not needed for upkeep go into improvements from a list we agree with you. Policies differ between providers, so ask how unused hours are handled before you sign.",
    },
    {
      question: "Will you maintain software another team built?",
      answer:
        "Yes. We start with an audit of the code and infrastructure, fix the urgent risks first, then take over routine maintenance with a plan to move the product forward.",
    },
    {
      question: "Do mobile apps cost more to maintain than web apps?",
      answer:
        "Usually, if you ship on both iOS and Android. Start from the same 15–20% of build cost a year and lean toward the top of it, because each store sets its own yearly requirements. In 2026 Apple required builds with Xcode 26 from April 28, and Google Play required API level 36 for updates from August 31.",
    },
  ],
};
