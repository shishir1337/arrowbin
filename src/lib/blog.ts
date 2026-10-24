/**
 * Blog content store. Posts are structured (not raw HTML) so they render safely and
 * consistently. Each post is written to target a real question people search, which
 * is good for SEO and AEO. Add new posts as one file each in `./posts/` (see
 * posts/index.ts).
 */

import { extraPosts } from "./posts";
import { site } from "./site";

/** An image used in a post. When `pending`, the renderer shows a placeholder card
 * with the generation `prompt` and target `src` path instead of an <img>. */
export type PostImage = {
  /** Public path, e.g. "/blog/<slug>/cost-ranges.webp" (or an original .svg chart). */
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  /** AI image-generation prompt, shown in the placeholder so it can be produced. */
  prompt?: string;
  /** True until the real image file exists at `src`. */
  pending?: boolean;
};

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; image: PostImage }
  /** A command or config snippet readers copy. `label` names where it runs
   * ("Terminal", "php.ini"); the renderer adds a copy button. `wrap` wraps long
   * lines instead of scrolling, for prose such as a message to send. */
  | { type: "code"; code: string; label?: string; wrap?: boolean }
  /** One modest in-article call to action: a short pitch and a single link.
   * `href` is a site path ("/contact") or an absolute URL (the booking page). */
  | { type: "cta"; title: string; text: string; href: string; label: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  /** ISO date. */
  date: string;
  /** Human-readable date. */
  dateLabel: string;
  /** ISO date the post was last meaningfully updated (freshness signal). */
  updated?: string;
  updatedLabel?: string;
  author: string;
  readingTime: string;
  category: string;
  excerpt: string;
  /** Optional custom card/social thumbnail; defaults to the generated OG image. */
  thumbnail?: string;
  /** Feature image: shown on blog cards and as the article banner. */
  image?: PostImage;
  /** Direct-answer TL;DR shown up top (AEO/GEO). */
  tldr?: string;
  body: ContentBlock[];
  /** Scannable key-takeaways shown before the conclusion. */
  takeaways?: string[];
  /** Optional FAQ block → emitted as FAQPage JSON-LD. */
  faqs?: { question: string; answer: string }[];
};

const COST_DIR = "/blog/how-much-does-custom-software-development-cost";
const CHOOSE_DIR = "/blog/how-to-choose-a-software-development-company";
const MVP_DIR = "/blog/how-long-does-it-take-to-build-an-mvp";

/** The original three guides. New posts live one per file in `./posts/`. */
const corePosts: Post[] = [
  {
    slug: "how-much-does-custom-software-development-cost",
    title: "How Much Does Custom Software Development Cost in 2026?",
    description:
      "Custom software development costs in 2026: price ranges by project type, what drives the number, regional rates, hidden costs, and how to spend smart.",
    keywords: [
      "custom software development cost",
      "how much does software development cost",
      "software development pricing",
      "cost to build custom software",
      "software development cost breakdown 2026",
    ],
    date: "2026-05-12",
    dateLabel: "May 12, 2026",
    updated: "2026-10-15",
    updatedLabel: "October 15, 2026",
    author: "Md. Shishir Ahmed",
    readingTime: "14 min read",
    category: "Guides",
    excerpt:
      "Custom software can cost anywhere from $5,000 to $250,000+. See what drives the number, broken down by project type, region and pricing model, plus how to spend smart.",
    image: {
      src: `${COST_DIR}/team-collaboration.webp`,
      alt: "A software development team collaborating around a screen, planning a project budget and scope",
      width: 1280,
      height: 720,
    },
    tldr: "Custom software development usually costs $5,000 to $250,000+ in 2026, and most business products land between $30,000 and $120,000. The number tracks your scope, the technical complexity, the depth of design, the platforms you ship on, and how senior your team is and where they sit. To keep it under control, start with a tightly scoped MVP and lock in a fixed estimate after discovery.",
    body: [
      {
        type: "p",
        text: "If you're planning a custom software project, the first question on your mind is almost certainly how much it will cost. It's also the hardest question to answer in a single number. [Custom software](/services/custom-software-development) is built around your own workflows and users, so the price moves with what you actually need. This guide is for founders, product owners and operations leaders who want a realistic budget before they talk to a single agency. We build custom software for a living, and the numbers below are our best estimate of 2026 market pricing, not a sales pitch. If you're still deciding whether to build at all, start with our comparison of [custom software and off-the-shelf tools](/blog/custom-software-vs-off-the-shelf).",
      },
      {
        type: "p",
        text: "The ranges in this guide are Arrowbin estimates, drawn from our own scoping and quoting work and checked against public [developer salary data](/blog/developer-salaries-by-country). They're planning figures, not quotes. We'll cover price ranges by project type, what you're actually paying for, the factors that move the number most, how regional rates change the math, the costs nobody mentions up front, and a worked example of a typical $60,000 build. By the end you should be able to budget with confidence and spot a bad quote quickly.",
      },

      {
        type: "h2",
        text: "How much does custom software development cost in 2026?",
      },
      {
        type: "p",
        text: "Custom software development costs between $5,000 and $250,000 or more in 2026. A simple internal tool or a lean MVP usually falls in the $5,000–$30,000 band. A mid-size web or mobile app lands around $30,000–$90,000. A full SaaS platform runs $80,000–$200,000, and enterprise-grade systems start at $150,000 and climb from there. Most funded startups and established businesses end up spending between $40,000 and $120,000 on their first serious product.",
      },
      {
        type: "table",
        headers: ["Project type", "Typical cost (2026)", "Timeline", "Example"],
        rows: [
          [
            "Internal tool / simple MVP",
            "$5,000 – $30,000",
            "4–10 weeks",
            "Booking tool, admin dashboard",
          ],
          [
            "Mid-size web or mobile app",
            "$30,000 – $90,000",
            "3–6 months",
            "Marketplace, customer portal",
          ],
          [
            "Full SaaS platform",
            "$80,000 – $200,000",
            "5–9 months",
            "Multi-tenant B2B product",
          ],
          [
            "Enterprise system",
            "$150,000 – $500,000+",
            "9–18 months",
            "ERP, logistics platform",
          ],
        ],
      },
      {
        type: "cta",
        title: "Want a fixed number for your scope?",
        text: "Ranges only get you so far. Tell us what you are building and we will give you a fixed, transparent estimate after a short discovery call, before any work begins.",
        href: "/contact",
        label: "Get a fixed estimate",
      },
      {
        type: "p",
        text: "These figures are Arrowbin estimates, so treat them as planning ranges, not quotes. The same feature list can cost twice as much with one team as another, depending on complexity, design and who's doing the work. The rest of this guide explains why, so you can place your own project on this map.",
      },
      {
        type: "image",
        image: {
          src: `${COST_DIR}/cost-spectrum.svg`,
          alt: "Staircase chart of four custom software project tiers with 2026 price ranges: MVP or internal tool $5,000 to $30,000, mid-size web or mobile app $30,000 to $90,000, SaaS platform $80,000 to $200,000, enterprise system $150,000 to $500,000 or more",
          caption:
            "The 2026 cost spectrum, from a lean MVP to an enterprise platform (Arrowbin estimate).",
          width: 1280,
          height: 720,
        },
      },

      {
        type: "h2",
        text: "What is actually included in a software development cost?",
      },
      {
        type: "p",
        text: "When you pay for custom software, you're paying for more than code. A credible quote covers the whole lifecycle: discovery and planning, UX/UI design, engineering, quality assurance, and project management. Writing code is only about half the work. The other half is figuring out the right thing to build and making sure it actually works.",
      },
      {
        type: "image",
        image: {
          src: `${COST_DIR}/budget-composition.svg`,
          alt: "Stacked bar chart showing how a custom software budget splits across discovery, design, development, QA and project management",
          caption:
            "Development is the biggest slice. The other 50% is what makes software ship and last.",
          width: 1280,
          height: 720,
        },
      },
      {
        type: "p",
        text: "Here is what each phase buys you, and why skipping any of them tends to cost more later:",
      },
      {
        type: "ul",
        items: [
          "Discovery and planning (~10%): requirements, user flows, technical architecture and a clear scope. This is where rework gets prevented.",
          "UX/UI design (~15%): wireframes, a design system and polished screens that make the product usable and trustworthy.",
          "Development (~50%): front-end, back-end, integrations, infrastructure and the actual feature build.",
          "QA and testing (~15%): manual and automated testing so the product holds up across devices, edge cases and load.",
          "Project management (~10%): coordination, communication and keeping scope, budget and timeline on track.",
        ],
      },
      {
        type: "p",
        text: "If a quote is dramatically cheaper than the rest, ask which of these phases has been cut. Usually it's discovery, QA or design, and those are exactly the phases that protect you from an expensive rebuild six months later.",
      },

      {
        type: "h2",
        text: "What factors affect custom software development costs the most?",
      },
      {
        type: "p",
        text: "A handful of factors explain most of the price difference between projects. Understand them and you can steer the budget instead of just reacting to a quote.",
      },
      { type: "h3", text: "1. Scope: how much you are building" },
      {
        type: "p",
        text: "Scope is the single biggest driver. Every screen, feature, user role and report adds design, build and testing time. A product with 5 core features will always cost a fraction of one with 25. That's why a focused MVP is the best cost-control tool you have.",
      },
      { type: "h3", text: "2. Technical complexity" },
      {
        type: "p",
        text: "Not all features are equal. A static content page is cheap. Real-time data, payments, [AI features](/services/ai-automation), third-party integrations, complex permissions and high-scale infrastructure are expensive, because they take more engineering and far more testing. Two products with the same screen count can differ wildly in cost based on what happens under the hood. If the AI part is an agent that works inside your systems, our guide to [AI agent costs for small businesses](/blog/ai-agent-cost-small-business) breaks that bill down.",
      },
      { type: "h3", text: "3. Design depth" },
      {
        type: "p",
        text: "A templated, off-the-shelf UI is fast and cheap. Bespoke, brand-aligned [UI/UX design](/services/ui-ux-design), with custom interactions, animation and a full design system, costs more, but for customer-facing products it often pays for itself in conversion and retention.",
      },
      { type: "h3", text: "4. Platforms and devices" },
      {
        type: "p",
        text: "A web-only product is the cheapest path. Adding [native iOS and Android apps](/services/mobile-app-development) can increase cost significantly because each platform needs its own build and testing. Cross-platform frameworks reduce this, but multi-platform is still more than single-platform.",
      },
      { type: "h3", text: "5. Team seniority and location" },
      {
        type: "p",
        text: "A senior team charges more per hour but often costs less overall. They make better architectural decisions, write cleaner code and ship with fewer defects. Location matters too. A developer in San Francisco and one in Dhaka with identical skills can have a 4–5x difference in rate (Arrowbin estimate).",
      },
      {
        type: "image",
        image: {
          src: `${COST_DIR}/cost-factors.svg`,
          alt: "Infographic of the five main factors that affect custom software cost: scope, technical complexity, design depth, platforms, and team seniority and location",
          caption: "The five levers that move a software budget the most.",
          width: 1280,
          height: 720,
        },
      },

      { type: "h2", text: "How much does each type of software project cost?" },
      {
        type: "p",
        text: "Costs get much more concrete once you anchor them to a project type. Here is what each tier typically buys in 2026.",
      },
      { type: "h3", text: "MVP or internal tool: $5,000 to $30,000" },
      {
        type: "p",
        text: "A minimum viable product or a focused internal tool covers one core workflow done well. Think an admin dashboard, a booking system or a simple two-sided app with a handful of screens. The goal is to validate value or remove a manual bottleneck quickly, then expand based on real usage. For the schedule side of that decision, see our guide on [how long it takes to build an MVP](/blog/how-long-does-it-take-to-build-an-mvp), and for the budget, our guide to [MVP development cost](/blog/mvp-development-cost) works through the sums.",
      },
      { type: "h3", text: "Mid-size web or mobile app: $30,000 to $90,000" },
      {
        type: "p",
        text: "This is where most businesses end up: a polished product with user accounts, a real database, several integrations, payments and a considered design. A customer portal, an [online store or marketplace](/services/ecommerce-development), or a content platform usually lands here. If it's a store, weigh [Shopify against a custom store](/blog/shopify-vs-custom-ecommerce) before you budget for a build at all.",
      },
      { type: "h3", text: "SaaS platform: $80,000 to $200,000" },
      {
        type: "p",
        text: "A full [software-as-a-service product](/services/saas-product-engineering) adds multi-tenancy, subscription billing, role-based permissions, analytics, admin tooling and the reliability customers expect from something they pay for monthly. The higher cost reflects the surrounding engineering, not just more screens. Our guide to [what a SaaS costs to build and run](/blog/saas-development-cost) breaks that work down, monthly running costs included.",
      },
      {
        type: "h3",
        text: "Mobile apps and enterprise systems: $50,000 to $500,000+",
      },
      {
        type: "p",
        text: "Native mobile apps add per-platform build and review overhead. Enterprise systems such as ERPs, logistics platforms, and regulated healthcare or fintech products carry the highest cost. They have to integrate with legacy systems, meet security and compliance requirements, and cover a much wider set of functionality.",
      },
      {
        type: "image",
        image: {
          src: `${COST_DIR}/project-types.svg`,
          alt: "Four product wireframes, one per tier: an admin dashboard for an MVP or internal tool, a marketplace app for a mid-size product, an analytics dashboard for a SaaS platform and a dense data table for an enterprise system",
          caption:
            "What you get at each tier, from a single workflow to a full platform.",
          width: 1280,
          height: 720,
        },
      },

      {
        type: "h2",
        text: "How does developer location and seniority affect price?",
      },
      {
        type: "p",
        text: "Location is one of the biggest hidden variables in any quote. The same product can cost three to five times more depending on where your team sits, because hourly rates vary enormously by region. Here is our 2026 estimate for a senior development team. These are Arrowbin estimates of blended agency rates, not published survey figures, so use them to compare regions rather than to price a specific quote. For the sourced pay figures underneath them, see our [developer salaries by country](/blog/developer-salaries-by-country) data.",
      },
      {
        type: "image",
        image: {
          src: `${COST_DIR}/developer-rates-by-region.svg`,
          alt: "Bar chart of typical 2026 custom software hourly rates by region, from North America at $120-180 to South Asia at $25-60 (Arrowbin estimate)",
          caption:
            "Blended senior team rates by region (USD/hour), 2026. Arrowbin estimate.",
          width: 1280,
          height: 720,
        },
      },
      {
        type: "table",
        headers: ["Region", "Typical 2026 hourly rate (Arrowbin estimate)"],
        rows: [
          ["North America", "$120–180"],
          ["Western Europe", "$90–150"],
          ["Eastern Europe", "$50–90"],
          ["Latin America", "$45–80"],
          ["South Asia", "$25–60"],
        ],
      },
      {
        type: "p",
        text: "It's tempting to chase the lowest rate. But rate and total cost aren't the same thing. A cheap team that needs three attempts to get something right ends up more expensive than a strong team that gets it right once. The best value is usually a senior team in a lower-cost region: strong engineering at a sustainable rate, with [enough time-zone overlap for real collaboration](/blog/offshore-vs-nearshore-vs-onshore). If you are weighing how to [evaluate a senior team](/blog/how-to-choose-a-software-development-company) rather than just a rate card, that comes down to proof and process more than geography.",
      },
      {
        type: "p",
        text: "If you're weighing a team in Bangladesh, our guide to [what an app costs to build in Bangladesh](/blog/app-development-cost-bangladesh) puts local price lists in Taka and dollars.",
      },
      {
        type: "quote",
        text: "The cheapest quote is rarely the cheapest project. Rework, missed requirements and fragile code cost far more than getting it right the first time.",
        cite: "Md. Shishir Ahmed, Founder at Arrowbin",
      },

      {
        type: "h2",
        text: "Fixed price vs time & materials: which costs less?",
      },
      {
        type: "p",
        text: "How you're billed matters almost as much as the rate. The two common models are fixed-price (one agreed number for a defined scope) and time & materials (you pay for the hours actually worked). Neither is universally cheaper. They suit different situations.",
      },
      {
        type: "table",
        headers: ["", "Fixed price", "Time & materials"],
        rows: [
          [
            "Best for",
            "Well-defined scope, MVPs",
            "Evolving scope, long builds",
          ],
          ["Budget certainty", "High", "Lower, but flexible"],
          ["Flexibility to change", "Low", "High"],
          ["Risk sits with", "The agency", "Shared / the client"],
          [
            "Typical use",
            "Phase 1 / discovery output",
            "Ongoing product development",
          ],
        ],
      },
      {
        type: "p",
        text: "Our recommendation: run a short, paid discovery phase first, then take a fixed price for a clearly scoped MVP so you have budget certainty for the launch. Once the product is live and evolving, switch to time & materials so you can adapt quickly to what real users tell you.",
      },
      {
        type: "image",
        image: {
          src: `${COST_DIR}/pricing-models.svg`,
          alt: "Side-by-side comparison of fixed-price and time and materials pricing: fixed price suits a well-defined scope and gives budget certainty, time and materials suits an evolving scope and gives flexibility",
          caption:
            "Two pricing models. Match the model to the stage of your project.",
          width: 1280,
          height: 720,
        },
      },

      { type: "h2", text: "What hidden costs should you budget for?" },
      {
        type: "p",
        text: "The build price isn't the whole story. Software keeps running after launch, and a realistic budget accounts for the costs that arrive once development ends (and sometimes while it's still going). As a planning rule of thumb (an Arrowbin estimate, not an industry statistic), set aside roughly 15–20% of your build cost per year for ongoing ownership. Our guide to [what software maintenance costs per year](/blog/software-maintenance-cost) explains what that money buys and when it runs higher.",
      },
      {
        type: "ul",
        items: [
          "[Hosting and infrastructure](/services/cloud-devops-hosting): cloud servers, databases and bandwidth that scale with usage.",
          "Third-party services: payment processors, email, SMS, maps and other APIs that charge per use.",
          "[Maintenance and updates](/services/maintenance-support): bug fixes, security patches, and keeping libraries current.",
          "Support and monitoring: uptime monitoring, error tracking and responding to issues.",
          "Future features: the roadmap you'll inevitably want once real users arrive. Budget these separately; the 15–20% covers small improvements, not a new roadmap.",
          "Compliance and security: audits, certifications and data protection for regulated industries.",
        ],
      },
      {
        type: "image",
        image: {
          src: `${COST_DIR}/hidden-costs.svg`,
          alt: "Iceberg infographic: the build cost sits above the waterline, while hosting, maintenance, third-party APIs, support, security and future features sit below it",
          caption:
            "The visible build price sits above a larger run of ongoing costs. Plan for ownership, not just delivery.",
          width: 1280,
          height: 720,
        },
      },

      {
        type: "h2",
        text: "How can you reduce software costs without sacrificing quality?",
      },
      {
        type: "p",
        text: "There's a right way and a wrong way to cut a software budget. The wrong way is skipping QA, design or discovery, which just defers cost into expensive rework. The right way is to build less, and to build it in the right order.",
      },
      {
        type: "ol",
        items: [
          "Start with an MVP: build the smallest version that proves value, then expand using revenue and feedback.",
          "Prioritize hard. Cut every feature that is not essential to your core workflow. You can always add it later.",
          "Reuse instead of rebuilding. Lean on proven frameworks, design systems and third-party services rather than building everything from scratch.",
          "Invest in discovery. A few thousand dollars of planning routinely saves tens of thousands in rework.",
          "Choose a senior team. They ship cleaner code faster, which lowers total cost even at a higher hourly rate.",
          "Phase the build, and fund each stage with the value the previous stage created.",
        ],
      },
      {
        type: "image",
        image: {
          src: `${COST_DIR}/cost-reduction.svg`,
          alt: "Roadmap of phased, MVP-first development rising through four stages: MVP, launch, scale and expand, each funded by the stage before it",
          caption: "Build in phases, funded by the value each phase creates.",
          width: 1280,
          height: 720,
        },
      },

      {
        type: "h2",
        text: "Worked example: what a typical $60,000 SaaS MVP looks like",
      },
      {
        type: "p",
        text: "To make this concrete, here is a representative breakdown of a $60,000 SaaS MVP: a multi-tenant B2B product with accounts, a dashboard, billing and a couple of integrations, delivered in roughly 14 weeks. It's an illustrative model built on the budget split above, not a specific client project.",
      },
      {
        type: "table",
        headers: ["Line item", "Share", "Approx. cost"],
        rows: [
          ["Discovery & architecture", "10%", "$6,000"],
          ["UX/UI design", "15%", "$9,000"],
          ["Front-end & back-end development", "50%", "$30,000"],
          ["QA & testing", "15%", "$9,000"],
          ["Project management", "10%", "$6,000"],
        ],
      },
      {
        type: "p",
        text: "Notice that development is exactly half the budget. The other $30,000 is what turns working code into a product people trust and pay for. A quote that puts 90% into development and almost nothing into design, QA or planning looks cheap, but it usually just moves the cost into a rebuild later.",
      },
      {
        type: "image",
        image: {
          src: `${COST_DIR}/project-timeline.svg`,
          alt: "Gantt chart of a representative 14-week SaaS MVP: discovery in weeks 1 to 2, design in weeks 2 to 4, development in weeks 3 to 11, QA in weeks 9 to 13 and launch in weeks 13 to 14, with each phase's share of the $60,000 budget",
          caption: "A representative 14-week MVP timeline, phase by phase.",
          width: 1280,
          height: 720,
        },
      },

      { type: "h2", text: "So, how much should you budget?" },
      {
        type: "p",
        text: "For most businesses building their first serious product in 2026, a budget of $40,000–$120,000 is realistic for a polished, launch-ready MVP or app. The exact figure comes down to scope, complexity and design. Below that range you're usually looking at a simple tool or a single-workflow MVP. Above it, a full platform or an enterprise system. Whatever your range, the same few habits keep it under control: keep the scope tight, spend properly on planning, work with a senior team, and release in phases so each stage funds the next.",
      },
      {
        type: "p",
        text: `At Arrowbin, we give you a fixed, transparent estimate after a short discovery call, so you know the real number before any work begins. If you want a grounded figure for your specific idea, [book a free 30-minute call](${site.bookingUrl}) and we'll map your scope to a budget on the spot.`,
      },
      {
        type: "image",
        image: {
          src: `${COST_DIR}/team-collaboration.webp`,
          alt: "A software development team collaborating around a screen, planning a project budget and scope",
          caption:
            "A budget only becomes a working product once a team puts the planning behind it.",
          prompt:
            "A warm, natural photograph of a small, diverse software team of 3-4 people collaborating around a laptop and a wall of sticky notes in a bright modern office. Candid, professional, soft daylight, shallow depth of field. Subtle ultraviolet (#3b2bff) and sun-yellow (#ffd23f) accents in the environment, no green. No visible brand logos or readable screen text. 1280x720, authentic startup atmosphere.",
        },
      },
    ],
    takeaways: [
      "By Arrowbin's estimate, most custom software costs $5,000–$250,000+, and most first products land in the $40,000–$120,000 range.",
      "Cost tracks scope, technical complexity, design depth, the number of platforms, and your team's seniority and location.",
      "In our typical budget split, development is only about 50% of the cost. Discovery, design, QA and PM make up the rest.",
      "Regional rates vary 3–5x (Arrowbin estimate), but the cheapest rate rarely produces the cheapest project.",
      "As a rule of thumb, budget roughly 15–20% of the build cost per year for hosting, maintenance and ongoing ownership (Arrowbin estimate).",
      "Control cost by starting with a tightly scoped MVP and getting a fixed estimate after discovery.",
    ],
    faqs: [
      {
        question: "Is custom software cheaper than off-the-shelf?",
        answer:
          "Upfront, off-the-shelf is almost always cheaper, and for standard jobs like accounting or payroll it usually stays cheaper. Custom software can cost less over several years when per-seat fees grow with headcount, when you pay for overlapping tools, or when staff lose hours moving data between them. Run a five-year comparison with your own seat counts before deciding; for many small businesses the best answer is to keep the standard tools and build only the missing piece.",
      },
      {
        question: "Can I build custom software in phases to spread the cost?",
        answer:
          "Yes, and we strongly recommend it. Launch a focused MVP first, then expand in phases funded by the value (and revenue) the product creates. This lowers upfront risk and lets real user feedback guide where you spend next.",
      },
      {
        question: "Why are two quotes for the same app so different?",
        answer:
          "Usually because of team seniority, location and what's included. A low quote may leave out discovery, design or QA, or lean on junior developers. Compare what each quote actually covers, not just the bottom-line number.",
      },
      {
        question: "How much does it cost to maintain custom software?",
        answer:
          "As a rule of thumb, plan for roughly 15–20% of the original build cost per year (an Arrowbin estimate). That covers hosting, third-party services, security patches, bug fixes and small improvements. It's the cost of keeping the product reliable and current.",
      },
      {
        question: "Does location really change the price that much?",
        answer:
          "Yes. By our 2026 estimate, senior team rates range from around $120–180/hour in North America to $25–60/hour in South Asia. The same product can cost three to five times more depending on where your team is based.",
      },
      {
        question: "Should I get a fixed price or pay hourly?",
        answer:
          "Use a fixed price for a well-defined MVP so you have budget certainty, then move to time & materials for ongoing development once the product is live and evolving. Running a short paid discovery first makes a fixed price far more accurate.",
      },
      {
        question: "How accurate is an estimate before discovery?",
        answer:
          "A pre-discovery estimate is a planning range, not a commitment. A short discovery phase covering requirements, user flows and architecture lets a team give you a tight, reliable fixed price, which is why we always recommend it before the main build.",
      },
    ],
  },
  {
    slug: "how-to-choose-a-software-development-company",
    title: "How to Choose a Software Development Company in 2026",
    description:
      "A practical 2026 guide to choosing a software development company: the criteria that matter, the questions to ask, and the red flags to avoid.",
    keywords: [
      "how to choose a software development company",
      "choosing a software development agency",
      "hire software developers",
      "software development company checklist",
      "questions to ask a software agency",
    ],
    date: "2026-04-28",
    dateLabel: "April 28, 2026",
    updated: "2026-10-15",
    updatedLabel: "October 15, 2026",
    author: "Md. Shishir Ahmed",
    readingTime: "13 min read",
    category: "Guides",
    excerpt:
      "Picking the wrong development partner is expensive. Use this framework of criteria, questions, red flags and a decision scorecard to choose a team that delivers.",
    image: {
      src: `${CHOOSE_DIR}/choosing-a-partner.webp`,
      alt: "Two business people shaking hands to begin a software development partnership",
      width: 1280,
      height: 720,
    },
    tldr: "To choose the right software development company, weight proven track record, communication and process far above price. Shortlist three to five firms, review live work, ask who builds your project and who owns the code, and watch for red flags such as suspiciously low quotes and vague timelines.",
    body: [
      {
        type: "p",
        text: "Your software is too important to hand to the wrong team. The right development partner gives you a product that moves the business forward; the wrong one can cost you months and a chunk of your budget before you even realize it. This guide lays out a practical framework: the criteria that actually matter, the questions to ask, the red flags to avoid, and a simple way to make the final call.",
      },
      {
        type: "p",
        text: "It's written for founders, product owners and business leaders who are about to spend real money and can't afford to get this wrong. The advice here reflects how we run our own selection and onboarding at Arrowbin, not a generic checklist. Let's start with the decision itself.",
      },
      {
        type: "image",
        image: {
          src: "/blog/how-to-choose-a-software-development-company/choosing-a-partner.webp",
          alt: "Two business people shaking hands to begin a software development partnership",
          caption:
            "The right partner works like an extension of your team and stays invested in the outcome.",
          prompt:
            "A warm, natural photograph of two professionals shaking hands across a table in a bright modern office, laptops and notes visible, signalling the start of a partnership. Candid, soft daylight, shallow depth of field, subtle ultraviolet (#3b2bff) and sun-yellow (#ffd23f) accents in the environment, no green, no visible brand logos. 1280x720, authentic business atmosphere.",
        },
      },

      {
        type: "h2",
        text: "How do you choose the right software development company?",
      },
      {
        type: "p",
        text: "Choose a software development company on proof, not promises. Review live products they've shipped, talk to past clients, confirm who will actually work on your project, and check how they communicate and test. Shortlist three to five firms, score them against consistent criteria, and pick the one that pairs genuine technical depth with clear communication and a real process. Price comes last.",
      },
      {
        type: "p",
        text: "That's the short version. The rest of this guide breaks each part down so you can run the process yourself, starting with what 'good' actually looks like.",
      },

      {
        type: "h2",
        text: "What should you look for in a development partner?",
      },
      {
        type: "p",
        text: "A strong partner is more than a group of capable coders. The firms that consistently deliver share a handful of qualities, and weighting them correctly is the difference between a smooth build and an expensive lesson.",
      },
      { type: "h3", text: "Proven, verifiable track record" },
      {
        type: "p",
        text: "Look for shipped products you can open and use, ideally in or near your industry. Live work tells you far more than a deck full of logos. Ask which parts they actually built and what problems they solved.",
      },
      { type: "h3", text: "Clear, proactive communication" },
      {
        type: "p",
        text: "You'll spend months working with this team. Watch how they communicate during the sales process. How clear and honest they are now, and how fast they reply, is the best predictor of how the project itself will go.",
      },
      { type: "h3", text: "Genuine technical depth and a real process" },
      {
        type: "p",
        text: "Ask about their approach to architecture, testing, code reviews and deployment, and who looks after [hosting and DevOps](/services/cloud-devops-hosting) once the product is live. A serious team has opinions and a repeatable process. A risky one improvises. Technical skill is table stakes. Process is what makes it reliable.",
      },
      {
        type: "p",
        text: "Put these together and price should be one of the smaller factors in your decision. Here is roughly how we'd weight the criteria:",
      },
      {
        type: "image",
        image: {
          src: "/blog/how-to-choose-a-software-development-company/decision-criteria-weights.svg",
          alt: "Bar chart weighting the criteria for choosing a software partner: track record 25%, communication 20%, technical 20%, process 15%, fit 10%, price 10%",
          caption:
            "What a firm has shipped, how it communicates and how it works should outweigh price.",
          width: 1280,
          height: 720,
        },
      },

      { type: "h2", text: "What questions should you ask before hiring?" },
      {
        type: "p",
        text: "The right questions surface how a company really works. Ask every shortlisted firm the same set so you can compare answers directly:",
      },
      {
        type: "ul",
        items: [
          "Can I see and use products you've built, ideally live and in production?",
          "Who exactly will work on my project, and how senior are they?",
          "How do you communicate progress, and how often will I hear from you?",
          "What is your process for testing, code review and security?",
          "Do I own the source code, accounts and infrastructure?",
          "What happens after launch? Do you offer maintenance and support?",
          "How do you handle scope changes and disagreements?",
        ],
      },
      {
        type: "image",
        image: {
          src: `${CHOOSE_DIR}/questions-checklist.svg`,
          alt: "Checklist of seven questions to ask a software development company before hiring: live work, who builds it, progress updates, testing and security, code ownership, life after launch, and scope changes",
          caption:
            "Ask every shortlisted firm the same questions, then compare.",
          width: 1280,
          height: 720,
        },
      },
      {
        type: "p",
        text: "Listen closely to the answer about life after launch. Software needs [ongoing maintenance and support](/services/maintenance-support): security patches, dependency updates and someone to call when something breaks. A partner with no plan for that is handing you a future problem. Ask what the plan costs, too: our guide to [what a fair maintenance plan should cost](/blog/software-maintenance-cost) gives you a number to hold their quote against.",
      },
      {
        type: "p",
        text: "If the project is a prototype someone built with AI tools, add one question: how will you audit it before changing anything? Our [production checklist for vibe-coded apps](/blog/vibe-coded-app-production-ready) covers what that audit should look for.",
      },
      {
        type: "cta",
        title: "Put these questions to us",
        text: "Ask us everything on this list and we will walk you through live products we have shipped. Book a free 30-minute call and treat it as your first interview.",
        href: site.bookingUrl,
        label: "Book a 30-minute call",
      },

      {
        type: "h2",
        text: "How do you evaluate a company's portfolio and track record?",
      },
      {
        type: "p",
        text: "A portfolio is only useful if you interrogate it. Don't just look at the screenshots. Open the live products, test them on your phone, and ask pointed questions about each one.",
      },
      {
        type: "ul",
        items: [
          "Is the work live and usable, or just mockups and concept art?",
          "Did they build it end-to-end, or only a small slice?",
          "Is any of it similar in complexity or industry to your project?",
          "Will they connect you with the client to ask how it went?",
          "Are the products fast, polished and still maintained?",
        ],
      },
      {
        type: "p",
        text: "A reference call is worth more than any case study. Ask past clients what surprised them, how the team handled problems, and whether they'd hire them again. Honest answers to those three questions tell you most of what you need to know.",
      },
      {
        type: "image",
        image: {
          src: "/blog/how-to-choose-a-software-development-company/portfolio-review.webp",
          alt: "A person reviewing a software company's portfolio of live products on a laptop and phone",
          caption: "Open the live products. Don't settle for screenshots.",
          prompt:
            "A natural photograph of a person at a desk comparing a software portfolio on a laptop screen and a smartphone, evaluating real apps. Soft daylight, shallow depth of field, modern office, subtle ultraviolet (#3b2bff) and sun-yellow (#ffd23f) accents, no green, no readable brand names or text on screens. 1280x720, candid professional style.",
        },
      },

      {
        type: "h2",
        text: "Agency vs freelancer vs in-house: which is right for you?",
      },
      {
        type: "p",
        text: "There are three common ways to build software, and the right choice depends on your scope and budget, and on how central software is to your business.",
      },
      {
        type: "table",
        headers: ["", "Freelancer", "Agency", "In-house team"],
        rows: [
          [
            "Best for",
            "Small, defined tasks",
            "End-to-end products",
            "Long-term ownership",
          ],
          [
            "Team breadth",
            "One skill set",
            "Design, dev, QA, PM",
            "Whatever you hire",
          ],
          [
            "Cost",
            "Lowest hourly",
            "Mid; a full team",
            "Highest (salaries + overhead)",
          ],
          ["Speed to start", "Fast", "Fast", "Slow (hiring takes months)"],
          [
            "Continuity risk",
            "High (single person)",
            "Low (team covers)",
            "Low once built",
          ],
          [
            "Ideal when",
            "Budget tight, scope small",
            "You need a product shipped",
            "Software is your core",
          ],
        ],
      },
      {
        type: "p",
        text: "For most businesses building their first serious product, an agency is usually the best fit: a full team and a repeatable process without the cost and delay of hiring. This is the usual route for [custom software](/services/custom-software-development) where you need [UI/UX design](/services/ui-ux-design), engineering and QA under one roof. Freelancers suit small, well-defined tasks. An in-house team makes sense once software becomes your core, ongoing advantage.",
      },
      {
        type: "image",
        image: {
          src: `${CHOOSE_DIR}/agency-vs-freelancer.svg`,
          alt: "Three ways to build software compared: a freelancer for small, defined tasks, an agency team for end-to-end products, and an in-house team for long-term ownership",
          caption:
            "Three ways to build. Match the model to your stage and scope.",
          width: 1280,
          height: 720,
        },
      },

      { type: "h2", text: "What are the biggest red flags to avoid?" },
      {
        type: "p",
        text: "Some warning signs reliably predict a painful project. If you see these, slow down. No portfolio is worth a partner you can't trust.",
      },
      {
        type: "ul",
        items: [
          "A quote that seems too good to be true. It usually leaves out design, QA or discovery.",
          "Vague timelines, no clear process, and hand-wavy answers about how they work.",
          "Reluctance to share references or let you use their live work.",
          "No mention of testing, security or maintenance.",
          "They won't confirm you'll own the code and infrastructure.",
          "Slow, unclear communication during the sales process. It only gets worse after you sign.",
        ],
      },
      {
        type: "image",
        image: {
          src: `${CHOOSE_DIR}/red-flags.svg`,
          alt: "Six red flags when hiring a software development company: a too-good-to-be-true quote, vague timelines, no references or live work, no testing or maintenance plan, unclear code ownership, and slow communication",
          caption: "Spot these early. They rarely improve after you sign.",
          width: 1280,
          height: 720,
        },
      },
      {
        type: "quote",
        text: "Poor communication during the sales process is the single most reliable predictor of a difficult project. It rarely improves once the contract is signed, and the small frustrations tend to pile up over the months that follow.",
        cite: "Md. Shishir Ahmed, Founder at Arrowbin",
      },

      { type: "h2", text: "How should you compare quotes and contracts?" },
      {
        type: "p",
        text: "The cheapest quote is rarely the cheapest project. When you compare proposals, compare what's actually included, not just the number at the bottom.",
      },
      {
        type: "table",
        headers: ["What to compare", "Why it matters"],
        rows: [
          [
            "What's included (discovery, design, QA)",
            "Cheap quotes often omit the phases that prevent costly rework",
          ],
          [
            "Fixed price vs time & materials",
            "Match the model to how well-defined your scope is",
          ],
          [
            "Who owns the code and IP",
            "You should own your source code and infrastructure outright",
          ],
          [
            "Post-launch support terms",
            "Software needs maintenance, so know the cost before you sign",
          ],
          [
            "Who actually builds it",
            "Senior teams ship cleaner code, lowering total cost",
          ],
        ],
      },
      {
        type: "p",
        text: "If you want the full picture on pricing, our guide on [what custom software costs](/blog/how-much-does-custom-software-development-cost) breaks down the ranges, regional rates and hidden costs in detail. Use it alongside this one when you compare proposals.",
      },
      {
        type: "image",
        image: {
          src: `${CHOOSE_DIR}/quote-comparison.svg`,
          alt: "Two software proposals compared line by line under a magnifying glass: the cheaper one leaves out discovery, QA and post-launch support",
          caption:
            "Compare what's included, not just the number at the bottom.",
          width: 1280,
          height: 720,
        },
      },

      {
        type: "h2",
        text: "Why communication and process matter more than you think",
      },
      {
        type: "p",
        text: "In our experience, most software projects that go wrong don't come undone over technical choices. They come undone over communication. Missed expectations, slow responses and unclear scope cause far more damage than a suboptimal framework choice. A partner who sends a weekly demo, flags risks early and pushes back when you're about to make a costly mistake is worth more than one who just says yes to everything.",
      },
      {
        type: "p",
        text: "Ask how often you'll see working software, who your point of contact is, and how they handle disagreements. A clear, repeatable process is the strongest signal that a team can be trusted with your budget and timeline. If the team works in another time zone, check [how many working hours you'd actually share](/blog/offshore-vs-nearshore-vs-onshore) before you sign.",
      },
      {
        type: "image",
        image: {
          src: `${CHOOSE_DIR}/communication-cadence.svg`,
          alt: "Weekly communication loop between a client and a development team: demo, check-in, progress update and feedback",
          caption: "A predictable weekly cadence keeps projects on track.",
          width: 1280,
          height: 720,
        },
      },

      { type: "h2", text: "A simple framework to make the final decision" },
      {
        type: "p",
        text: "Once you've gathered the information, the decision itself is straightforward. Run every candidate through the same five steps so you're comparing like for like.",
      },
      {
        type: "image",
        image: {
          src: "/blog/how-to-choose-a-software-development-company/selection-process.svg",
          alt: "Five-step process for choosing a software development partner: define needs, shortlist, review live work, interview, decide",
          caption: "A repeatable five-step selection process.",
          width: 1280,
          height: 720,
        },
      },
      {
        type: "ol",
        items: [
          "Define your needs: goals, must-have features, budget range and a realistic [launch timeline](/blog/how-long-does-it-take-to-build-an-mvp).",
          "Shortlist three to five firms whose live work and focus fit your project.",
          "Review their products and talk to past clients about real outcomes.",
          "Interview each team with the same questions and score the answers.",
          "Decide on overall fit. Proof, communication and process come first, price last.",
        ],
      },
      {
        type: "image",
        image: {
          src: `${CHOOSE_DIR}/decision-scorecard.svg`,
          alt: "Example vendor scorecard rating three software development companies from 1 to 5 on track record, communication, technical ability, process maturity and price",
          caption: "Score each firm against the same weighted criteria.",
          width: 1280,
          height: 720,
        },
      },

      { type: "h2", text: "Making the call" },
      {
        type: "p",
        text: "Choosing a development partner is one of the biggest calls your project will face. Get it right and you gain a team that ships and stays invested in your success. Anchor your decision in the work they've shipped, the way they communicate and the process they follow, treat price as a tiebreaker rather than the headline, and pay attention to how a team behaves before you sign. That behavior is exactly what you'll live with afterward.",
      },
      {
        type: "p",
        text: `At Arrowbin, we welcome every one of the questions above. You can [inspect the products we've shipped](/work), talk to our clients, and you always own your code. If you'd like to see whether we're the right fit, [book a free 30-minute call](${site.bookingUrl}) and we'll talk through your project honestly, with no pressure.`,
      },
      {
        type: "image",
        image: {
          src: "/blog/how-to-choose-a-software-development-company/team-partnership.webp",
          alt: "A development team and client collaborating closely on a software project",
          caption: "The best partnerships outlast the first launch.",
          prompt:
            "A warm, candid photograph of a software team and a client collaborating around a screen in a bright modern office, engaged and smiling, sticky notes on the wall. Soft daylight, shallow depth of field, subtle ultraviolet (#3b2bff) and sun-yellow (#ffd23f) accents, no green, no visible logos or readable screen text. 1280x720, authentic partnership atmosphere.",
        },
      },
    ],
    takeaways: [
      "Weight proven track record, communication, technical depth and process above price.",
      "Shortlist 3–5 firms and review live products you can actually open and use.",
      "Ask every firm the same questions, especially who builds it and who owns the code.",
      "Choose an agency for end-to-end products, freelancers for small tasks, in-house when software is your core.",
      "Treat too-good-to-be-true quotes, vague timelines and weak communication as red flags.",
      "Score candidates against consistent criteria and decide on overall fit, not the lowest number.",
    ],
    faqs: [
      {
        question: "Should I hire freelancers or an agency?",
        answer:
          "Freelancers can be great for small, well-defined tasks. For anything ongoing or complex, an agency gives you a full team across design, engineering, QA and project management, plus continuity if one person is unavailable.",
      },
      {
        question: "How important is location and time zone?",
        answer:
          "Less than it used to be. What matters is overlap for real-time communication and clear, reliable processes. Arrowbin works with clients worldwide, across time zones.",
      },
      {
        question: "What questions should I ask a software development company?",
        answer:
          "Ask to see and use their live work, who exactly will build your project and how senior they are, how they communicate progress, what their testing and security process is, whether you own the code, and what post-launch support looks like.",
      },
      {
        question: "How do I know if a development company is reliable?",
        answer:
          "Reliability shows up as live, usable products, references who'd hire them again, a clear process for testing and communication, and honest, responsive behavior during the sales conversation. Vagueness and slow replies are the warning signs.",
      },
      {
        question: "Should I always choose the cheapest quote?",
        answer:
          "No. The cheapest quote often leaves out discovery, design or QA, or relies on junior developers, which leads to rework that costs more overall. Compare what's included and who's building it, then treat price as a tiebreaker.",
      },
      {
        question: "Do I own the source code if an agency builds my software?",
        answer:
          "You should. Confirm in writing that you own the source code, accounts and infrastructure outright. A trustworthy partner has no problem with this; reluctance here is a serious red flag.",
      },
    ],
  },
  {
    slug: "how-long-does-it-take-to-build-an-mvp",
    title: "How Long Does It Take to Build an MVP in 2026?",
    description:
      "How long it takes to build an MVP in 2026: typical timelines by type, the week-by-week build, what affects the schedule, and how to launch faster.",
    keywords: [
      "how long to build an mvp",
      "mvp development timeline",
      "minimum viable product development",
      "mvp timeline 2026",
      "how long does it take to build an app",
    ],
    date: "2026-04-10",
    dateLabel: "April 10, 2026",
    updated: "2026-10-15",
    updatedLabel: "October 15, 2026",
    author: "Md. Shishir Ahmed",
    readingTime: "12 min read",
    category: "Product",
    excerpt:
      "Most MVPs take 6–14 weeks. Here's the week-by-week timeline, what shapes it, the common delays, and how to launch faster without sacrificing quality.",
    image: {
      src: `${MVP_DIR}/team-shipping.webp`,
      alt: "A product team celebrating the launch of a minimum viable product",
      width: 1280,
      height: 720,
    },
    tldr: "Most well-scoped MVPs take 6–14 weeks from kickoff to launch in 2026: a simple tool in 6–8 weeks, a standard MVP in 10–14, and a complex SaaS MVP in 14–20. The timeline tracks scope, clarity, integrations and how fast you make decisions. The fastest path is ruthless prioritization.",
    body: [
      {
        type: "p",
        text: "An MVP, or minimum viable product, is the smallest version of your product that delivers real value and lets you learn from actual users. Done right, it gets you to market fast and takes a lot of risk out of the bigger build, because you're working from evidence instead of guesses. The question every founder asks is simple: how long will it take? This guide gives you honest 2026 timelines and a week-by-week breakdown, looks at what speeds the schedule up or slows it down, and shows how to launch sooner without skipping the work that matters.",
      },
      {
        type: "p",
        text: "It's written for founders and product owners who need a realistic schedule before committing. We ship MVPs for a living, and the ranges below are Arrowbin estimates drawn from that planning and delivery work, not best-case marketing.",
      },

      { type: "h2", text: "How long does it take to build an MVP?" },
      {
        type: "p",
        text: "A well-scoped MVP takes 6 to 14 weeks from kickoff to launch for most products. A simple, single-workflow tool can be ready in 6–8 weeks. A standard MVP with accounts, a database and a couple of integrations usually lands around 10–14 weeks. A complex, multi-tenant SaaS MVP runs 14–20 weeks. The single biggest variable is scope: how much you try to build before you launch.",
      },
      {
        type: "table",
        headers: ["MVP type", "Typical timeline", "Example"],
        rows: [
          [
            "Simple tool / micro-MVP",
            "6–8 weeks",
            "Internal tool, single-flow app",
          ],
          ["Standard MVP", "10–14 weeks", "Two-sided app, customer portal"],
          ["Complex / SaaS MVP", "14–20 weeks", "Multi-tenant B2B platform"],
        ],
      },
      {
        type: "image",
        image: {
          src: "/blog/how-long-does-it-take-to-build-an-mvp/timeline-by-type.svg",
          alt: "Bar chart of MVP build timelines by complexity: simple 6-8 weeks, standard 10-14 weeks, complex 14-20 weeks",
          caption: "MVP timelines by complexity. Scope is the biggest lever.",
          width: 1280,
          height: 720,
        },
      },

      { type: "h2", text: "What is an MVP, and what should it include?" },
      {
        type: "p",
        text: "An MVP is not a half-finished product or a rough prototype. It's a complete, working product that does one core job well, enough for real users to adopt it and, ideally, pay for it. The hard part of an MVP is deciding what to leave out.",
      },
      {
        type: "ul",
        items: [
          "Keep the single core workflow that delivers your main value, end to end.",
          "Add just enough around it to make that workflow usable, such as sign-in, basic data and a clean UI.",
          "Set aside secondary features, edge cases, admin nice-to-haves and the 'while we're at it' ideas.",
          "Defer anything you can add later without blocking the core value.",
        ],
      },
      {
        type: "p",
        text: "Every feature you add to v1 stretches the timeline and delays the feedback that actually tells you what to build next. The discipline to ship less is what makes an MVP fast.",
      },
      {
        type: "image",
        image: {
          src: `${MVP_DIR}/mvp-scope.svg`,
          alt: "Diagram of MVP scope: the core workflow sits in the centre for version one, while secondary features such as planning, integrations, notifications, tracking, maps, analytics and profiles wait for later",
          caption: "Keep the core workflow; defer everything else.",
          width: 1280,
          height: 720,
        },
      },

      { type: "h2", text: "What does the MVP build look like, week by week?" },
      {
        type: "p",
        text: "A modern MVP is built in overlapping agile phases. Design starts before discovery fully ends, and QA runs alongside development rather than after it. A typical 14-week SaaS MVP flows like this.",
      },
      {
        type: "image",
        image: {
          src: "/blog/how-long-does-it-take-to-build-an-mvp/mvp-timeline-gantt.svg",
          alt: "Gantt chart of an MVP build showing discovery, design, development, QA and launch phases overlapping across 14 weeks",
          caption: "Phases overlap. That's what keeps an agile MVP fast.",
          width: 1280,
          height: 720,
        },
      },
      {
        type: "table",
        headers: ["Phase", "Typical duration", "What you get"],
        rows: [
          [
            "Discovery & planning",
            "1–2 weeks",
            "Locked scope, user flows, architecture",
          ],
          [
            "UX/UI design",
            "1.5–3 weeks",
            "A design system and the key screens",
          ],
          ["Development", "5–9 weeks", "The working product"],
          ["QA & testing", "1–2 weeks (overlapping)", "A stable, tested build"],
          [
            "Launch & iterate",
            "Ongoing",
            "A live product and first real feedback",
          ],
        ],
      },
      {
        type: "cta",
        title: "Want a timeline for your MVP?",
        text: "Tell us the one workflow your product has to nail. We will map it to a realistic week-by-week plan and a fixed estimate, so you know what it takes to launch.",
        href: "/contact",
        label: "Get a timeline and estimate",
      },

      { type: "h2", text: "What factors affect how long an MVP takes?" },
      {
        type: "p",
        text: "Two MVPs with the same headline idea can differ by weeks. These are the factors that move the schedule most.",
      },
      { type: "h3", text: "Scope" },
      {
        type: "p",
        text: "The number of features and screens in v1 is the single biggest lever. The fewer you commit to before launch, the faster you ship. Platforms count as scope too: every extra platform, such as separate [iOS and Android apps](/services/mobile-app-development), adds its own build and testing time.",
      },
      { type: "h3", text: "Clarity" },
      {
        type: "p",
        text: "How well you know your core user and their key workflow before you start decides how much rework you avoid. Vague requirements turn into change requests mid-build.",
      },
      { type: "h3", text: "Integrations" },
      {
        type: "p",
        text: "Payments, third-party APIs, data imports and [AI features](/services/ai-automation) all add build and testing time. A single complex integration can quietly stretch a sprint. If one of those features is an AI agent, our guide to [what an AI agent adds to the budget](/blog/ai-agent-cost-small-business) covers its running costs as well as the build.",
      },
      { type: "h3", text: "Design" },
      {
        type: "p",
        text: "Reusing a design system is far faster than building bespoke screens for everything. Custom [UI/UX design](/services/ui-ux-design) is worth it for some products, but it costs days you should plan for.",
      },
      { type: "h3", text: "Decision speed" },
      {
        type: "p",
        text: "Fast, clear feedback keeps momentum. Slow approvals stall sprints and are one of the most common reasons a timeline slips without anyone choosing to add scope.",
      },
      { type: "h3", text: "Team experience" },
      {
        type: "p",
        text: "A senior team that has shipped MVPs before avoids the dead ends that cost weeks. They know which shortcuts are safe and which ones come back to bite you. If you're still picking that team, our guide on [how to choose a software development company](/blog/how-to-choose-a-software-development-company) covers what to check.",
      },
      {
        type: "image",
        image: {
          src: `${MVP_DIR}/timeline-factors.svg`,
          alt: "Six factors that affect an MVP timeline: scope, clarity, integrations, design, decision speed and team experience",
          caption: "Six factors that speed up or slow down an MVP.",
          width: 1280,
          height: 720,
        },
      },

      {
        type: "h2",
        text: "MVP vs prototype vs full product: how do timelines compare?",
      },
      {
        type: "p",
        text: "It helps to know where an MVP sits between a quick prototype and a full product. They answer [different questions](/blog/mvp-vs-prototype-vs-poc) and take very different amounts of time. If you already have a prototype built with an AI tool, read [what separates an AI-built prototype from a launch-ready MVP](/blog/vibe-coded-app-production-ready) before you count it as weeks saved.",
      },
      {
        type: "table",
        headers: ["", "Prototype", "MVP", "Full product"],
        rows: [
          ["Goal", "Show the idea", "Learn from real users", "Serve at scale"],
          [
            "Built with",
            "Clickable mockups",
            "Real, working code",
            "Complete feature set",
          ],
          ["Timeline", "Days–2 weeks", "6–14 weeks", "6–18 months"],
          ["Can users pay?", "No", "Yes", "Yes"],
          [
            "Best for",
            "Pitching, testing UX",
            "Validating the market",
            "Scaling a proven product",
          ],
        ],
      },
      {
        type: "image",
        image: {
          src: `${MVP_DIR}/mvp-vs-prototype.svg`,
          alt: "Three stages on one line: a clickable prototype in days to 2 weeks, a working MVP in 6 to 14 weeks, and a full product in 6 to 18 months",
          caption: "Three stages, three very different timelines.",
          width: 1280,
          height: 720,
        },
      },

      { type: "h2", text: "What slows MVPs down, and how do you avoid it?" },
      {
        type: "p",
        text: "Most MVP delays come from a handful of avoidable causes. Recognizing them early keeps your launch on schedule.",
      },
      {
        type: "ul",
        items: [
          "Scope creep: adding 'just one more feature' is the number-one cause of slipped timelines.",
          "Unclear requirements: starting to build before the core workflow is agreed.",
          "Slow decisions and feedback: sprints stall waiting on approvals.",
          "Perfectionism: polishing details that don't affect whether the idea works.",
          "Underestimated integrations: a single complex API can add a week.",
          "Changing direction mid-build: pivoting the core after development starts.",
        ],
      },
      {
        type: "image",
        image: {
          src: `${MVP_DIR}/delay-causes.svg`,
          alt: "Six common causes of MVP delays: scope creep, unclear requirements, slow decisions and feedback, perfectionism, underestimated integrations, and changing direction mid-build",
          caption: "The usual suspects behind a slipped MVP launch.",
          width: 1280,
          height: 720,
        },
      },
      {
        type: "quote",
        text: "The fastest MVPs aren't built by working faster. They're built by building less. Ruthless prioritization beats raw speed every time.",
        cite: "Md. Shishir Ahmed, Founder at Arrowbin",
      },

      { type: "h2", text: "How can you launch your MVP faster?" },
      {
        type: "p",
        text: "You can compress an MVP timeline without sacrificing quality. The trick is discipline about scope and process, not rushing the work.",
      },
      {
        type: "ol",
        items: [
          "Define one core workflow and cut everything that isn't essential to proving it.",
          "Lock scope before development starts, and resist mid-build additions.",
          "Reuse a design system and proven components instead of designing from scratch.",
          "Use third-party services for non-core needs such as auth, payments and email rather than building them.",
          "Work in weekly sprints with a live demo, so problems surface early.",
          "Make decisions fast. A same-day answer keeps a sprint moving.",
        ],
      },
      {
        type: "image",
        image: {
          src: `${MVP_DIR}/launch-faster.svg`,
          alt: "Rocket beside a sprint checklist: one core workflow, scope locked before development, a reused design system, third-party services for auth, payments and email, a live demo every week and same-day decisions",
          caption:
            "Discipline on scope and cadence is what compresses the timeline.",
          width: 1280,
          height: 720,
        },
      },

      { type: "h2", text: "Worked example: a smaller 12-week SaaS MVP" },
      {
        type: "p",
        text: "This is a different, smaller example than the 14-week build above. The $60,000 example in our cost guide also runs about 14 weeks, but it's multi-tenant and adds a couple of integrations. This one keeps to accounts, one core workflow, billing and a simple dashboard, so it maps across 12 weeks. Both are representative plans, not specific client projects.",
      },
      {
        type: "table",
        headers: ["Week", "Focus"],
        rows: [
          ["1–2", "Discovery, scope lock and architecture"],
          ["2–4", "Design system and core screens"],
          ["3–10", "Build: auth, the core workflow, billing, dashboard"],
          ["8–11", "QA, fixes and polish (overlapping the build)"],
          ["12", "Launch to first users and start gathering feedback"],
        ],
      },
      {
        type: "image",
        image: {
          src: `${MVP_DIR}/worked-example.svg`,
          alt: "Week-by-week plan of a smaller 12-week SaaS MVP with accounts, one core workflow, billing and a simple dashboard: discovery in weeks 1 to 2, design in weeks 2 to 4, build in weeks 3 to 10, QA in weeks 8 to 11 and launch in week 12",
          caption: "The smaller 12-week example, week by week.",
          width: 1280,
          height: 720,
        },
      },

      { type: "h2", text: "So, how long will yours take?" },
      {
        type: "p",
        text: "For most products, plan on 6–14 weeks to a launch-ready MVP in 2026. Expect the lower end for a focused single-workflow tool and the upper end, or a little beyond, for a multi-tenant SaaS product. The exact number comes down to scope and clarity, both of which you control. If you get the core workflow right and hold the rest for later, you'll be learning from real users far sooner than a 'build everything first' plan would allow.",
      },
      {
        type: "p",
        text: "Timeline is only half the planning question; the other half is budget. Our [MVP budget guide](/blog/mvp-development-cost) turns week counts like these into dollars, and our guide on [what custom software costs](/blog/how-much-does-custom-software-development-cost) breaks down the ranges by project type.",
      },
      {
        type: "p",
        text: "If yours is a multi-tenant product, our [SaaS development cost guide](/blog/saas-development-cost) covers what tenancy and billing add. For the engineering side, see how we approach [SaaS product engineering](/services/saas-product-engineering).",
      },
      {
        type: "p",
        text: `At Arrowbin, we specialize in shipping focused MVPs fast, then scaling them on the back of real feedback. If you have an idea, [book a free 30-minute call](${site.bookingUrl}) and we'll map it to a realistic timeline and a fixed estimate, so you know exactly what it takes to launch.`,
      },
      {
        type: "image",
        image: {
          src: "/blog/how-long-does-it-take-to-build-an-mvp/team-shipping.webp",
          alt: "A product team celebrating the launch of a minimum viable product",
          caption:
            "Ship the core, learn fast, then build what users actually want.",
          prompt:
            "A warm, candid photograph of a small diverse software team in a bright modern office, gathered around a laptop at the moment of a product launch, looking energised. Soft daylight, shallow depth of field, subtle ultraviolet (#3b2bff) and sun-yellow (#ffd23f) accents, no green, no visible logos or readable screen text. 1280x720, authentic startup atmosphere.",
        },
      },
    ],
    takeaways: [
      "Most well-scoped MVPs launch in 6–14 weeks: simple tools in 6–8, complex SaaS in 14–20.",
      "Scope is the biggest lever. The fewer features in v1, the faster you ship and learn.",
      "An MVP is a complete, working product for one core workflow, not a rough prototype.",
      "Modern MVPs overlap phases, running design, build and QA in parallel to stay fast.",
      "Scope creep, unclear requirements and slow decisions are the top causes of delay.",
      "Launch faster by locking scope, reusing components and making decisions quickly.",
    ],
    faqs: [
      {
        question: "What's the difference between an MVP and a prototype?",
        answer:
          "A prototype demonstrates an idea (often clickable mockups), while an MVP is a real, working product that users can actually use and pay for. The MVP is what you launch to learn from the market.",
      },
      {
        question:
          "Should I build an MVP if I have funding for the full product?",
        answer:
          "Usually yes. An MVP tests your assumptions with real users before you invest heavily, which sharply cuts the risk of building the wrong thing. It also gets you to market months sooner.",
      },
      {
        question: "How long does it take to build an MVP?",
        answer:
          "Most well-scoped MVPs take 6–14 weeks from kickoff to launch. A simple single-workflow tool can ship in 6–8 weeks, while a complex multi-tenant SaaS MVP usually takes 14–20 weeks.",
      },
      {
        question: "Can an MVP be built in 4 weeks?",
        answer:
          "Sometimes, for a very narrow, single-feature tool with a reused design system and no complex integrations. Most genuinely useful MVPs need at least 6–8 weeks to be stable and usable.",
      },
      {
        question:
          "What's the most common reason MVPs take longer than planned?",
        answer:
          "Scope creep. Adding 'just one more feature' during the build is the single biggest cause of slipped MVP timelines. Locking scope before development starts is the best protection.",
      },
      {
        question: "How many features should an MVP have?",
        answer:
          "As few as possible while still delivering your core value end to end. Often that means one primary workflow plus the minimum around it, such as sign-in and basic data. Everything else can wait for v2.",
      },
      {
        question: "What happens after the MVP launches?",
        answer:
          "You gather real usage data and feedback, then iterate. That usually means fixing the rough edges users hit first, leaning into whatever is clearly working, and adding the features people keep asking for. The MVP is the start of the product, not the end.",
      },
      {
        question: "How much does it cost to build an MVP?",
        answer:
          "A simple MVP typically costs $5,000 to $30,000, while a standard MVP with accounts, a database and a few integrations usually runs $30,000 to $90,000. The figure tracks scope, technical complexity and how senior your team is. Our custom software cost guide breaks the ranges down in detail.",
      },
    ],
  },
];

/** Today's date (YYYY-MM-DD) in Dhaka, where the site is built and published. */
const today = new Date().toLocaleDateString("en-CA", {
  timeZone: "Asia/Dhaka",
});

/**
 * Every published post: the core guides plus the per-file posts in `./posts/`.
 * A post dated in the future stays unpublished (no page, no sitemap, RSS or
 * llms.txt entry) until a build runs on or after its date, so posts can be
 * scheduled in waves by setting `date`.
 */
export const posts: Post[] = [...corePosts, ...extraPosts].filter(
  (p) => p.date <= today,
);

export const postSlugs = posts.map((p) => p.slug);

/** Slugify a heading into a stable anchor id. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Table of contents derived from a post's H2 headings. */
export function tableOfContents(post: Post): { id: string; text: string }[] {
  return post.body
    .filter((b) => b.type === "h2")
    .map((b) => {
      const text = (b as { text: string }).text;
      return { id: headingId(text), text };
    });
}

/**
 * True when a post's cover is a designed 16:9 UI mockup (`cover.webp` or
 * `cover.svg` in the post's folder) rather than a photo. Mockups carry labels
 * and screens that must never be cropped, so layouts show them whole.
 */
export function isMockupCover(image: PostImage): boolean {
  return /\/cover\.(webp|svg)$/.test(image.src);
}

/** Resolve a post's card/social thumbnail (defaults to its generated OG image). */
export function postThumbnail(post: Post): string {
  return post.thumbnail ?? `/blog/${post.slug}/opengraph-image`;
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Posts sorted newest-first. */
export const sortedPosts = [...posts].sort((a, b) =>
  b.date.localeCompare(a.date),
);

/** ISO date a post last changed: its `updated` date, or its publish date. */
export function postModified(post: Post): string {
  return post.updated ?? post.date;
}

/** Words too common in post keywords to say anything about the topic. */
const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "the",
  "to",
  "of",
  "for",
  "in",
  "on",
  "vs",
  "how",
  "what",
  "does",
  "it",
  "much",
  "long",
  "take",
  "build",
  "cost",
  "2026",
]);

/** The topic words each post targets, from its keywords and title. */
const topicTerms = new Map(
  posts.map((p) => [
    p.slug,
    new Set(
      [...p.keywords, p.title]
        .join(" ")
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((w) => w.length > 2 && !STOP_WORDS.has(w)),
    ),
  ]),
);

/** How many posts use each topic word. Words every post shares carry no signal. */
const termPostCount = new Map<string, number>();
for (const terms of topicTerms.values()) {
  for (const t of terms) termPostCount.set(t, (termPostCount.get(t) ?? 0) + 1);
}

/**
 * Up to `n` posts to read next: same category first, then the most shared topic
 * words (rarer words count for more), with the newest post winning a tie. Falls
 * back to the newest posts when nothing overlaps, so every article links on to
 * others as the blog grows.
 */
export function relatedPosts(post: Post, n = 3): Post[] {
  const mine = topicTerms.get(post.slug) ?? new Set<string>();
  return sortedPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      let overlap = 0;
      for (const t of topicTerms.get(p.slug) ?? []) {
        if (mine.has(t)) {
          overlap += Math.log(posts.length / (termPostCount.get(t) ?? 1));
        }
      }
      return { p, score: (p.category === post.category ? 3 : 0) + overlap };
    })
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .slice(0, n)
    .map(({ p }) => p);
}
