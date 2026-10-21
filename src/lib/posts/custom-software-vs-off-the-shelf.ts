import type { Post } from "@/lib/blog";
import { site } from "@/lib/site";

const DIR = "/blog/custom-software-vs-off-the-shelf";

export const post: Post = {
  slug: "custom-software-vs-off-the-shelf",
  title: "Custom Software vs Off-the-Shelf: When Building Pays Off",
  description:
    "Custom software vs off the shelf for small firms: a 12-point comparison, a five-year cost model with real seat prices, the hybrid route and a checklist.",
  keywords: [
    "custom software vs off the shelf",
    "build vs buy software",
    "custom software vs saas",
    "off the shelf software pros and cons",
    "when to build custom software",
    "custom software for small business",
    "bespoke vs off the shelf software",
  ],
  date: "2026-10-22",
  dateLabel: "October 22, 2026",
  author: "Md. Shishir Ahmed",
  readingTime: "13 min read",
  category: "Guides",
  excerpt:
    "Off-the-shelf software is the right call for most jobs. This is how to spot the few where custom pays off, with a five-year cost model built on vendors' own seat prices.",
  image: {
    src: `${DIR}/cover.webp`,
    alt: "Mockup of a custom operations app in a browser window, with a job board and sync badges for the accounting and CRM tools it connects to, in front of a crowded spreadsheet and a list of per-seat subscriptions",
    width: 1280,
    height: 720,
  },
  tldr: "Buy off-the-shelf software for jobs that work the same in every company, like accounting, payroll or a standard CRM; build custom when the workflow is your edge, seat fees grow with every hire, your tools can't share data, or you need to own the data. In our illustrative five-year example using vendors' list prices, a 40-person company paid less by keeping its SaaS tools ($82,140), while at 80 people, keeping the CRM and building a custom operations tool cost $122,067–$129,567 against $160,140. For most small businesses the best answer is a hybrid: buy the core and build only the missing piece.",
  body: [
    {
      type: "p",
      text: "If your business runs on a dozen subscriptions, three spreadsheets and one person who knows how they fit together, you've probably wondered whether it's time to build your own system. This post is for the owner or operations lead who has to make that call, with real prices instead of a pitch.",
    },
    {
      type: "p",
      text: "We build custom software at Arrowbin, so you'd expect me to say build. Mostly I won't. Accounting and payroll are solved problems. So are email and a standard CRM, and paying someone to solve them again is a poor use of money.",
    },
    {
      type: "p",
      text: "The case for custom is narrower than agencies make it sound. It's also stronger than SaaS vendors admit.",
    },

    {
      type: "h2",
      text: "Custom software or off-the-shelf: which should a small business choose?",
    },
    {
      type: "p",
      text: "Choose off-the-shelf software when the job works the same way in most companies, such as accounting, payroll, email or a standard sales pipeline. Build custom when the workflow is part of what makes your business different, when per-seat fees climb with every hire, when your tools don't share data, or when you need to own the data and the rules.",
    },
    {
      type: "p",
      text: "For most businesses with 10 to 200 staff, the right answer is a mix: keep the standard tools and build the one piece that's missing. In the UK and Australia you'll hear custom software called bespoke software. The trade-offs don't change.",
    },
    {
      type: "table",
      headers: ["Factor", "Off-the-shelf (SaaS)", "Custom software"],
      rows: [
        [
          "Upfront cost",
          "Low: a subscription plus setup time",
          "$5,000–$30,000 for an internal tool, $30,000–$90,000 for a mid-size app (Arrowbin estimates)",
        ],
        [
          "Ongoing cost",
          "Per seat or per tier, every month, rising with headcount and price increases",
          "Roughly 15–20% of the build cost a year (Arrowbin planning rule), mostly flat as headcount grows",
        ],
        [
          "Time to start",
          "Days to a few weeks (our view)",
          "4–10 weeks for an internal tool, 3–6 months for a mid-size app (Arrowbin estimates)",
        ],
        [
          "Fit to your workflow",
          "You adapt to the product",
          "The product is built around how you work",
        ],
        [
          "Features",
          "Many, most of which you won't use",
          "Only what you need, plus what you add later",
        ],
        [
          "Integrations",
          "Built-in connectors and tools like Zapier",
          "Built for your systems, within what their APIs allow",
        ],
        [
          "Hosting, security and updates",
          "The vendor's job",
          "Yours or your developer's",
        ],
        ["Roadmap", "Set by the vendor for all its customers", "Set by you"],
        [
          "Data ownership",
          "On the vendor's platform; exports are often CSV files",
          "Your database and your structure",
        ],
        [
          "Lock-in",
          "Easy to cancel; workflows and history are hard to move",
          "No vendor, but you depend on the code and whoever knows it",
        ],
        [
          "Main risk",
          "Price rises, plan changes, features removed",
          "Budget overrun, or one developer holding all the knowledge",
        ],
        [
          "Best for",
          "Accounting, payroll, email, a standard CRM",
          "The workflow that sets you apart, and the glue between tools",
        ],
      ],
    },
    {
      type: "p",
      text: "Two rows decide most cases: fit to your workflow, and how the ongoing cost grows. If the product fits and your seat count is small, buy it. If your team spends its day working around the tool, keep reading.",
    },

    {
      type: "h2",
      text: "What does off-the-shelf software do better than custom?",
    },
    {
      type: "p",
      text: "Off-the-shelf software wins on speed, on upfront cost and on all the running work you never see. For jobs that are the same in every company, it's almost always the right call.",
    },
    {
      type: "p",
      text: "Take payroll. Tax tables and filing rules change regularly, and a payroll vendor spreads the cost of keeping up across all its customers. A custom payroll system would have you paying for that work alone. Accounting is the same story, and so is email.",
    },
    {
      type: "p",
      text: "I'd put a standard sales CRM on that list for most small teams too. Pipelines and email tracking are well-trodden ground, and the big products do them well. If your complaint about your CRM is one missing report, build the report. Don't rebuild the CRM.",
    },
    {
      type: "p",
      text: "Speed matters as well. You can trial most SaaS tools this afternoon and have a team on one next week. Our own estimate for even a small internal tool is 4–10 weeks, which is a long wait if a product would have done the job.",
    },
    {
      type: "p",
      text: "Then there's the work nobody sees. The vendor hosts the product, patches it, backs it up and keeps it running. On a custom system those jobs become yours or your developer's, and our guide to [what software maintenance costs each year](/blog/software-maintenance-cost) explains what that upkeep pays for.",
    },
    {
      type: "p",
      text: "Off-the-shelf also comes with a crowd. Reviews tell you what breaks, and thousands of other customers have already hit the odd cases. A custom build has one customer: you.",
    },

    {
      type: "h2",
      text: "When is custom software worth building?",
    },
    {
      type: "p",
      text: "Custom software is worth building in four situations: the workflow is your edge, seat fees grow faster than the value, your tools can't share data cleanly, or you need to own the data and the logic. One of these alone rarely justifies a build. Two or more usually do.",
    },
    {
      type: "ul",
      items: [
        "Your workflow is the edge. If the way you quote, schedule, price or deliver is why customers pick you, a generic tool will flatten it into everyone else's process. That's where custom earns the most.",
        "Seat fees pile up. Per-seat pricing grows with every hire, including people who only need one screen. A technician who updates a job twice a day costs you the same seat as your heaviest user.",
        "Your tools don't talk to each other. When the same customer gets typed into the CRM, the job tracker and the invoice, someone is paying in hours. Connectors help until your rules get specific.",
        "You need to own the data and the rules. Some businesses can't spread customer records across six vendors, or need permissions and audit trails that no product offers.",
      ],
    },
    {
      type: "p",
      text: "Our clearest examples are admin systems we've built for online stores. Silent Lifestyle BD's order queue has staff call each customer before an order is confirmed, with its own statuses such as on hold and returned. Maneel Club's admin can ban phone numbers that place fake orders. Neither is exotic code, but both are how those businesses actually run.",
    },
    {
      type: "p",
      text: "That's the test. Custom pays when it encodes how you work, not when it copies a product you could rent.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/build-or-buy-matrix.svg`,
        alt: "Build vs buy matrix for small business software: accounting and payroll sit in the buy quadrant; a CRM or help desk in buy and configure; integrations or customer portals in the hybrid quadrant; a core workflow like quoting or dispatch in the build quadrant",
        caption:
          "Where common business software tends to land. Arrowbin view, not a measurement.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "cta",
      title: "Not sure which side of the line you're on?",
      text: "Send us the tools you pay for, your seat counts and the jobs your team still does by hand. We'll tell you what to keep and whether anything is worth building. Often nothing is.",
      href: "/contact",
      label: "Get a second opinion",
    },

    {
      type: "h2",
      text: "How do per-seat fees change the math as your team grows?",
    },
    {
      type: "p",
      text: "Per-seat fees grow in a straight line with headcount, while a custom system's cost tracks what it does rather than how many people log in. At 10 seats that rarely matters. At 50 or 100 it can decide the question.",
    },
    {
      type: "p",
      text: "These are list prices from each vendor's own pricing page, opened on October 22, 2026, all for annual billing:",
    },
    {
      type: "ul",
      items: [
        "monday.com work management Pro: $19 a seat a month, per [monday.com's pricing page](https://monday.com/pricing). Plans start at 3 users, and teams over 40 users are invited to request a quote.",
        "Airtable Business: $45 a user a month, per [Airtable's pricing page](https://www.airtable.com/pricing). Its Team plan is $20.",
        "HubSpot Sales Hub Professional: $90 a seat a month on an annual commitment ($100 paid monthly), plus a required one-time onboarding fee of $1,500, per [HubSpot's pricing page](https://www.hubspot.com/pricing/sales).",
        "Salesforce Pro Suite: $100 a user a month, billed annually, per [Salesforce's pricing page](https://www.salesforce.com/sales/pricing/).",
      ],
    },
    {
      type: "table",
      headers: [
        "Plan (list price, billed annually)",
        "10 seats a year",
        "25 seats a year",
        "50 seats a year",
        "100 seats a year",
      ],
      rows: [
        ["monday.com Pro, $19", "$2,280", "$5,700", "$11,400", "$22,800"],
        ["Airtable Business, $45", "$5,400", "$13,500", "$27,000", "$54,000"],
        [
          "HubSpot Sales Hub Pro, $90",
          "$10,800",
          "$27,000",
          "$54,000",
          "$108,000",
        ],
        [
          "Salesforce Pro Suite, $100",
          "$12,000",
          "$30,000",
          "$60,000",
          "$120,000",
        ],
      ],
    },
    {
      type: "p",
      text: "Larger teams can often negotiate, so treat the right-hand columns as list-price math rather than what you'd pay. The direction is the point: every hire adds a line to the bill.",
    },
    {
      type: "p",
      text: "Two things push these numbers up over time. Prices rise: [Vertice](https://www.vertice.one/insights/saas-inflation-rate), which tracks software prices across more than $75 billion of spend it manages, put SaaS inflation at 12.7% in August 2026, with an early September reading of 14.3%. Seats also go to waste. Zylo's [2026 SaaS Management Index](https://zylo.com/news/2026-saas-management-index) found organizations leave an average of 36% of their SaaS licenses unused.",
    },
    {
      type: "p",
      text: "Check your own admin panels before anything else. Inactive seats are the cheapest saving you'll find this year, and cutting them makes any build-vs-buy comparison honest.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/seat-fees-by-headcount.svg`,
        alt: "Line chart of yearly per-seat software fees from 0 to 100 seats at list prices of $19, $45, $90 and $100 a seat a month, rising in straight lines past a flat band showing the yearly cost of a $30,000 to $90,000 custom build spread over five years plus upkeep",
        caption:
          "Seat fees from vendors' pricing pages (Oct 22, 2026); custom band from Arrowbin's published cost tiers. Shows the mechanism, not like-for-like features.",
        width: 1280,
        height: 720,
      },
    },

    {
      type: "h2",
      text: "What do custom and off-the-shelf cost over five years?",
    },
    {
      type: "p",
      text: "In our worked example, a 40-person company pays less by keeping its SaaS tools, and the same company at 80 people saves about $30,000–$38,000 over five years by keeping its CRM and building a custom operations tool. Replacing everything with custom is the widest bet of all.",
    },
    {
      type: "p",
      text: "This is an illustrative model, not a quote. These are the assumptions, so you can swap in your own:",
    },
    {
      type: "ul",
      items: [
        "A hypothetical company with 40 staff, 6 of them in sales. Then the same company at 80 staff, with 12 in sales.",
        "Operations run in monday.com Pro with a seat for everyone, sales in HubSpot Sales Hub Professional, and the two are glued together with Zapier's Team plan at $69 a month billed annually, its entry tier on [Zapier's pricing page](https://zapier.com/pricing).",
        "List prices stay flat for five years: no discounts, no price rises.",
        "Accounting and payroll cost the same in every option, as does email, so they're left out.",
        "Build costs come only from the published tiers in our guide to [what custom software costs](/blog/how-much-does-custom-software-development-cost). Upkeep is that guide's 15–20% of the build cost a year, counted for all five years.",
        "Each build option keeps paying for the tools it replaces while it's built: six months for the full replacement, three for the hybrid.",
      ],
    },
    {
      type: "table",
      headers: ["Five-year cost (illustrative)", "40 staff", "80 staff"],
      rows: [
        [
          "A. Keep buying: monday.com plus HubSpot, glued with Zapier",
          "$82,140",
          "$160,140",
        ],
        [
          "B. Hybrid: keep HubSpot, build a custom operations tool ($30,000 build)",
          "$87,387–$94,887",
          "$122,067–$129,567",
        ],
        [
          "C. Replace all three with one custom system ($30,000–$90,000 build)",
          "$60,714–$188,214",
          "$68,514–$196,014",
        ],
      ],
    },
    {
      type: "p",
      text: "At 40 staff, buying wins on fees. The hybrid costs about $5,200–$12,700 more over five years, and I'd only build it if the tool did something monday.com can't.",
    },
    {
      type: "p",
      text: "At 80 staff the picture flips. The monday.com line doubles while the custom tool costs the same, so the hybrid comes out $30,573–$38,073 cheaper. A team that size would ask monday.com for a quote, and a volume discount would narrow that gap.",
    },
    {
      type: "p",
      text: "Option C is the one I'd be wary of. Its low end looks cheap, but it means rebuilding a sales CRM, which is exactly the commodity work SaaS does well. Its high end is the most expensive line in the table.",
    },
    {
      type: "p",
      text: "For the hybrid, I priced the build at $30,000, the top of the guide's internal-tool tier, because the tool has to sync with the CRM and the accounting system. A simpler tool would cost less.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/five-year-cost.svg`,
        alt: "Range chart of five-year cost for three options at 40 and 80 staff: keep buying SaaS costs $82,140 and $160,140, a hybrid with a custom operations tool costs $87,387 to $94,887 and $122,067 to $129,567, and a full custom replacement spans $60,714 to $196,014",
        caption:
          "Illustrative worked example. Seat prices from vendors' pricing pages (Oct 22, 2026); build and upkeep from Arrowbin's published cost guide.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "The model leaves out the number that usually decides it: staff time. [O*NET](https://www.onetonline.org/link/localwages/43-9061.00), which publishes Bureau of Labor Statistics wage data, puts the 2025 US median for general office clerks at $21.64 an hour.",
    },
    {
      type: "p",
      text: "At that wage, every hour a week one person spends copying data between tools costs about $1,080 a year before payroll taxes. If three people each lose four hours a week to it, that's about $13,000 a year. Saving even a fifth of that for five years is enough to flip the 40-person result.",
    },
    {
      type: "p",
      text: "Count those hours honestly before you build. They're the one input only you can measure.",
    },

    {
      type: "h2",
      text: "What hidden costs come with each option?",
    },
    {
      type: "p",
      text: "Off-the-shelf software hides its costs in tier jumps, add-ons and the workarounds people build beside it. Custom software hides them in upkeep, in your own team's time, and in depending on whoever knows the code.",
    },
    {
      type: "p",
      text: "On the off-the-shelf side, watch for these:",
    },
    {
      type: "ul",
      items: [
        "Tier jumps. The feature you need is often one plan up, and every seat moves with it.",
        "Setup fees, like the $1,500 onboarding HubSpot requires for Sales Hub Professional.",
        "Add-ons and connectors, each billed on its own.",
        "Workarounds: the spreadsheet next to the tool, and the person who keeps it alive.",
        "Exit cost. An export usually gives you records, not your automations, permissions or history in a form you can reuse.",
      ],
    },
    {
      type: "p",
      text: "On the custom side:",
    },
    {
      type: "ul",
      items: [
        "Upkeep. Plan for 15–20% of the build cost a year to cover hosting and fixes. Skipping it is how custom systems rot.",
        "Your team's time. Someone who knows the workflow has to spend hours in planning and testing, because nobody else can tell a developer how your business really works.",
        "Key-person risk. If one freelancer holds the code, the passwords and the knowledge, you don't own your system in any practical sense.",
        "Scope creep. Once people see what's possible, the wish list grows. Budget new features separately from upkeep.",
      ],
    },
    {
      type: "p",
      text: "The fix for key-person risk is contractual and dull. The code lives in a repository your company owns, hosting sits in your name, and handover notes are a deliverable. Our guide on [how to choose a software development company](/blog/how-to-choose-a-software-development-company) covers what to put in that contract.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/hidden-costs.svg`,
        alt: "Two-column comparison of hidden costs. Off-the-shelf software: tier jumps, setup fees, price rises, unused seats, add-ons, staff workarounds. Custom software: yearly upkeep, internal time, key-person risk, scope creep, paying for old tools during the build.",
        caption:
          "Costs that rarely appear on the first quote. Price rise and unused seat figures from Vertice and Zylo; upkeep is an Arrowbin planning rule.",
        width: 1280,
        height: 720,
      },
    },

    {
      type: "h2",
      text: "Can you keep your off-the-shelf tools and build only what's missing?",
    },
    {
      type: "p",
      text: "Yes, and for most small businesses that's the best route. Keep the standard tools for what they do well, and build a thin custom layer for the part that's specific to you: an integration, a customer portal, an operations screen or the reports nobody sells.",
    },
    {
      type: "p",
      text: "What makes this work is the API, a documented door that lets other software read and write a product's data. Most business SaaS tools have one. A custom layer can pull a won deal from your CRM, create the job, and send the invoice to your accounting system without anyone typing the customer twice.",
    },
    {
      type: "p",
      text: "Typical hybrid projects look like this:",
    },
    {
      type: "ul",
      items: [
        "An integration that keeps customer records and invoices in sync between tools that don't connect, or connect badly.",
        "A customer portal on top of your existing systems, so clients can check status or download documents without emailing you.",
        "A quoting or pricing tool that follows your rules, then writes the deal into the CRM.",
        "A simple screen for staff who only need one task. Read the vendor's license terms first, because some don't allow API access to stand in for paid seats.",
        "Reporting that joins data from several tools into the numbers you actually run the business on.",
      ],
    },
    {
      type: "p",
      text: "The hybrid has a running cost of its own. Each integration depends on someone else's API, and APIs change. Plan for that in upkeep, and log every sync so you can see when one fails.",
    },
    {
      type: "p",
      text: "Before you commission anything, consider testing the workflow in a no-code tool first. Airtable's Team plan is $20 a user a month billed annually, per [its pricing page](https://www.airtable.com/pricing). It's per seat again, so it won't stay cheap as you grow, but a month of real use shows exactly what to build.",
    },
    {
      type: "p",
      text: "If the missing piece is an AI agent, the same logic applies. Our breakdown of [what an AI agent costs a small business](/blog/ai-agent-cost-small-business) compares buying one, wiring one up in a no-code tool and commissioning a custom one, with published prices.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/hybrid-stack.svg`,
        alt: "Diagram of the hybrid build vs buy approach: bought tools such as accounting software and a CRM at the bottom, a thin custom layer in the middle with an operations screen and a customer portal joined by a sync service, and staff and customers using that layer at the top",
        caption:
          "Buy the core, build the layer people actually touch. Simplified Arrowbin view.",
        width: 1280,
        height: 720,
      },
    },

    {
      type: "h2",
      text: "How do you know you've outgrown off-the-shelf software?",
    },
    {
      type: "p",
      text: "You've outgrown off-the-shelf software when the workarounds cost more than the tool. It shows up as a handful of signs, and if two or more of these are true, a custom build deserves a proper quote:",
    },
    {
      type: "ol",
      items: [
        "The same data gets typed into two or more tools every day.",
        "A spreadsheet next to the tool holds the real process, and one person understands it.",
        "You pay full seats for people who use one or two screens.",
        "The feature you need sits on a tier that costs several times more per seat.",
        "Your seat count is likely to double within three years.",
        "Customers choose you partly for how you work, and the tool forces you to work like everyone else.",
        "You need permissions, audit trails or data rules the product can't give you.",
        "You can fund the build plus 15–20% of it every year, and someone on your side can own the project.",
      ],
    },
    {
      type: "p",
      text: "There are good reasons to keep buying, too. Keep buying if the tool covers most of what you need and the gaps are annoyances rather than costs. Keep buying if the job is a commodity.",
    },
    {
      type: "p",
      text: "And keep buying if nobody on your side has time to own a build. An unowned custom project fails slowly, and it's expensive the whole way down.",
    },

    {
      type: "h2",
      text: "What do we recommend for most small businesses?",
    },
    {
      type: "p",
      text: "Buy the commodity tools, connect them properly, and build custom only for the workflow that makes you money or the seat bill that grows fastest. Start with one tool, not a platform.",
    },
    {
      type: "p",
      text: "If I were advising a 40-person company today, I'd list every subscription with its seat count and an owner, then cancel the unused seats. Next I'd find the one process that eats the most staff hours, and ask whether a connector, a better setup or a no-code prototype fixes it. Only if none of those work would I scope a custom build, starting with the smallest version that removes that pain.",
    },
    {
      type: "p",
      text: "Order matters here. A small first build the team relies on is worth more than a grand replacement plan that never ships.",
    },
    {
      type: "p",
      text: "When it is time to build, that's the work our [custom software development](/services/custom-software-development) team does: internal tools and integrations, plus the custom layer on top of the systems you already pay for. You own the code.",
    },
    {
      type: "p",
      text: `Want a straight read on your own stack first? [Book a 30-minute call](${site.bookingUrl}) and bring your list of tools and seat counts. If the answer is to keep buying, you'll hear it from us.`,
    },
  ],
  takeaways: [
    "Buy off-the-shelf software for commodity jobs that work the same everywhere, from payroll to a standard CRM.",
    "Build custom when the workflow is your edge, seat fees grow with every hire, your tools can't share data, or you need to own the data and the rules.",
    "Per-seat fees grow in a straight line with headcount; on October 22, 2026, list prices ran from $19 a seat (monday.com Pro) to $100 a user (Salesforce Pro Suite) a month, billed annually.",
    "In our illustrative five-year model, keeping SaaS was cheaper at 40 staff, while keeping the CRM and building a custom operations tool saved $30,573–$38,073 at 80 staff.",
    "Staff time spent re-keying data can outweigh the license bill: each hour a week costs about $1,080 a year at the median US office-clerk wage.",
    "For most businesses with 10 to 200 staff, the hybrid route of buying the core and building the layer on top is the best fit.",
    "Custom software needs roughly 15–20% of its build cost a year in upkeep, a code repository you own, and someone on your side who owns the project.",
  ],
  faqs: [
    {
      question: "Is custom software cheaper than SaaS in the long run?",
      answer:
        "Sometimes, but not by default. Per-seat SaaS fees grow with headcount and price rises, while custom software costs more upfront and then roughly 15–20% of the build a year to run (an Arrowbin planning estimate). In our five-year example, SaaS stayed cheaper for a 40-person company and a hybrid won at 80 people, so run the numbers with your own seat counts.",
    },
    {
      question:
        "How many employees do you need before custom software makes sense?",
      answer:
        "There's no headcount rule. What matters is how many seats you pay for, what each one costs, and how many hours your team loses to workarounds. A 15-person firm with an unusual core process can justify a build, while a 150-person firm with standard needs may never need one.",
    },
    {
      question: "Should a small business build its own CRM?",
      answer:
        "Usually not. Sales pipelines and email tracking are well served by products like HubSpot and Salesforce, and rebuilding them costs more than it saves. Build around the CRM instead: a quoting tool, an integration or a report it doesn't offer.",
    },
    {
      question:
        "Can custom software connect to QuickBooks, HubSpot or other tools we already use?",
      answer:
        "In most cases, yes, through the vendor's API, which lets other software read and write your data. Check the vendor's API documentation and license terms before you commit, because they decide what's possible and what it costs to run.",
    },
    {
      question:
        "Who owns the code if we pay a company to build custom software?",
      answer:
        "Whoever the contract says owns it, so get a written assignment of the code and IP to your company before work starts. Ask for the code in a repository your company controls and hosting in your name. At Arrowbin, clients own the source code outright.",
    },
    {
      question:
        "How long does it take to build custom software for a small business?",
      answer:
        "By Arrowbin's published estimates, a focused internal tool takes about 4–10 weeks and a mid-size web app about 3–6 months. A narrow first version that replaces one painful process is the quickest way to find out whether a bigger build is worth it.",
    },
    {
      question: "Is a no-code tool like Airtable a good middle ground?",
      answer:
        "Often, yes, especially for proving a workflow before you pay to build it. No-code tools are usually priced per seat too: Airtable's Team plan listed $20 a user a month, billed annually, on October 22, 2026. Use one to learn what you need, then decide whether to keep it or build.",
    },
    {
      question:
        "What happens if the developer who built our software disappears?",
      answer:
        "If your company owns the code repository, the hosting accounts and decent documentation, another team can pick the system up after some ramp-up time. If one person holds all of that, you have a real problem. Make those three things contract deliverables from the first day.",
    },
  ],
};
