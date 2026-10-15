/**
 * The 8 Arrowbin services. Single source of truth for the services overview page,
 * each /services/[slug] detail page, the navbar dropdown, the footer, and the sitemap.
 * Each entry carries SEO metadata (title/description/keywords), marketing copy, a
 * delivery process, and FAQ pairs that feed FAQPage JSON-LD for AEO.
 */

import type { IconName } from "@/components/ui/Icon";

export type ServiceFaq = { question: string; answer: string };

export type Service = {
  slug: string;
  /** Short label for nav/cards. */
  name: string;
  /** Page <h1>. */
  heading: string;
  icon: IconName;
  /** One-line value prop for cards. */
  summary: string;
  /** SEO <title> (without the "| Arrowbin" suffix). */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Lead paragraph(s) on the detail page. */
  intro: string;
  /** What you get: benefit bullets. */
  benefits: { title: string; description: string }[];
  /** Things we build / deliverables. */
  deliverables: string[];
  /** Technologies we use for this service. */
  tech: string[];
  /** Delivery process steps. */
  process: { title: string; description: string }[];
  faqs: ServiceFaq[];
};

export const services: Service[] = [
  {
    slug: "custom-software-development",
    name: "Custom Software Development",
    heading: "Custom Software Development",
    icon: "code",
    summary:
      "Software built around your exact workflows, from internal tools to the platforms your business runs on.",
    metaTitle: "Custom Software Development Company & Services",
    metaDescription:
      "Custom software development for startups and growing businesses: web platforms, internal tools and business systems. You own the code. Get a free estimate.",
    keywords: [
      "custom software development",
      "bespoke software",
      "enterprise software development",
      "software development company",
      "custom web application development",
    ],
    intro:
      "Arrowbin is a custom software development company for teams that have outgrown off-the-shelf tools. We build software that fits the way you work: cutting out manual steps, connecting the systems you already use, and giving you a platform that grows as you do.",
    benefits: [
      {
        title: "Built for your workflow",
        description:
          "Software designed around your processes, not a generic template, so adoption is fast and friction is low.",
      },
      {
        title: "Scalable architecture",
        description:
          "Clean, modular codebases and cloud-native infrastructure that grow from your first user to your millionth.",
      },
      {
        title: "Own your IP",
        description:
          "You own 100% of the source code, documentation, and infrastructure. No lock-in, no surprises.",
      },
      {
        title: "Secure by design",
        description:
          "Authentication, role-based access, encryption and audit logging baked in from day one.",
      },
    ],
    deliverables: [
      "Web platforms & dashboards",
      "Internal & admin tools",
      "Workflow automation systems",
      "API & system integrations",
      "Legacy software modernization",
      "Enterprise & B2B portals",
    ],
    tech: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "PostgreSQL",
      "AWS",
    ],
    process: [
      {
        title: "Discovery",
        description:
          "We map your workflows and constraints, then turn them into a clear scope you can sign off on.",
      },
      {
        title: "Architecture",
        description:
          "We design the data model and the stack the system will run on.",
      },
      {
        title: "Agile build",
        description:
          "We ship in short sprints, with a working demo and a feedback loop at the end of each one.",
      },
      {
        title: "Launch & support",
        description:
          "We deploy, watch it in production, and keep improving after go-live.",
      },
    ],
    faqs: [
      {
        question: "How much does custom software development cost?",
        answer:
          "Most custom software projects run from $8,000 for a focused tool to $75,000+ for a full platform. What moves the number is scope, the integrations involved and how complex the logic gets. After a short discovery call we give you a fixed estimate, so there are no surprises later.",
      },
      {
        question: "How long does it take to build custom software?",
        answer:
          "A minimum viable version usually takes 6–12 weeks. We deliver larger platforms in phases, so you get something usable early and we refine the rest based on real feedback.",
      },
      {
        question: "Do I own the source code?",
        answer:
          "Yes. You get full ownership of the source code, the documentation and the infrastructure. There's no vendor lock-in.",
      },
      {
        question: "Can you work with the systems we already use?",
        answer:
          "Usually, yes. We integrate with CRMs, ERPs, accounting, payment and shipping tools through their APIs, and we can import data from spreadsheets and older databases. If a system has no API, we'll find the safest workaround during discovery.",
      },
      {
        question:
          "Should we build custom software or buy an off-the-shelf tool?",
        answer:
          "Buy when an existing product fits your workflow well and per-seat costs stay reasonable. Build when your process is a competitive advantage, when you're stitching several tools together, or when licence fees keep growing. We'll tell you which on the discovery call, even if the answer is to buy.",
      },
      {
        question: "What happens after launch?",
        answer:
          "We monitor the system, fix issues fast and keep improving it through a monthly care plan. You can also take it in-house at any time: everything is documented and you own all of it.",
      },
    ],
  },
  {
    slug: "ecommerce-development",
    name: "E-commerce Development",
    heading: "E-commerce Development",
    icon: "cart",
    summary:
      "Online stores and headless commerce that load fast and turn more browsers into buyers.",
    metaTitle: "E-commerce Development Company for Online Stores",
    metaDescription:
      "E-commerce website development that loads fast and converts: Shopify stores, headless storefronts and custom commerce platforms that scale with your sales.",
    keywords: [
      "ecommerce development",
      "ecommerce website development",
      "headless commerce",
      "shopify development agency",
      "online store development",
    ],
    intro:
      "Arrowbin is an e-commerce development company that builds fast, conversion-focused online stores: headless storefronts, Shopify stores and fully custom commerce platforms. Every decision comes back to one thing: turning visitors into customers.",
    benefits: [
      {
        title: "Built to convert",
        description:
          "Conversion-optimized product, cart and checkout flows backed by analytics and A/B testing.",
      },
      {
        title: "Blazing fast",
        description:
          "Headless, edge-rendered storefronts that score high on Core Web Vitals and rank well on Google.",
      },
      {
        title: "Sells everywhere",
        description:
          "Payments, subscriptions, multi-currency and multi-channel selling built in.",
      },
      {
        title: "Easy to manage",
        description:
          "Intuitive admin and CMS so your team can update products and content without a developer.",
      },
    ],
    deliverables: [
      "Custom Shopify storefronts",
      "Headless commerce (Next.js)",
      "Subscription & membership stores",
      "Payment gateway integration",
      "Inventory & ERP integration",
      "Conversion rate optimization",
    ],
    tech: ["Shopify", "Next.js", "Stripe", "Medusa", "Sanity", "Tailwind CSS"],
    process: [
      {
        title: "Strategy",
        description:
          "We map out your catalog, your funnel and the conversion goals that matter.",
      },
      {
        title: "Design",
        description:
          "We design a storefront that sells, with the looks to match.",
      },
      {
        title: "Build & integrate",
        description:
          "We wire up payments, shipping and inventory so the whole thing runs.",
      },
      {
        title: "Optimize",
        description:
          "After launch we measure what's working, test changes and lift conversion.",
      },
    ],
    faqs: [
      {
        question: "Which e-commerce platform is best for my business?",
        answer:
          "For most stores, Shopify is the fastest way to launch. If you need full design control, a complex catalog or top-end performance, a headless storefront on Next.js usually wins. We'll point you to the right one once we understand your catalog and goals.",
      },
      {
        question: "Can you migrate my existing store without losing SEO?",
        answer:
          "Yes. We move your products, content and customers across, with 301 redirects and careful URL mapping so your search rankings hold.",
      },
      {
        question: "Will my store be fast and mobile-friendly?",
        answer:
          "Yes. We build mobile-first storefronts that pass Core Web Vitals, and that speed helps both your conversions and your Google rankings.",
      },
      {
        question: "Can you add bKash, Nagad or cash on delivery?",
        answer:
          "Yes. We integrate local gateways like bKash, Nagad, Rocket and SSLCommerz, plus cash on delivery with order confirmation, alongside Stripe, PayPal and card payments for international buyers.",
      },
      {
        question: "How long does it take to build an online store?",
        answer:
          "A Shopify store typically launches in 3–6 weeks. A headless storefront takes around 8–12 weeks, and a fully custom platform 12 weeks or more. We can launch a focused first version sooner and add features after.",
      },
      {
        question: "Will I be able to manage products and orders myself?",
        answer:
          "Yes. Your team gets an easy admin for products, prices, stock, orders and content, and we train you on it before launch. No developer needed for day-to-day changes.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    heading: "Mobile App Development",
    icon: "mobile",
    summary:
      "Native-quality iOS and Android apps from a single codebase, built to feel fast.",
    metaTitle: "Mobile App Development Company: iOS & Android",
    metaDescription:
      "Mobile app development company for iOS and Android. We build native and cross-platform apps with React Native, Flutter and Swift, from MVP to App Store.",
    keywords: [
      "mobile app development",
      "ios app development",
      "android app development",
      "react native development",
      "cross platform app development",
    ],
    intro:
      "As a mobile app development company, we design and build apps people want to open: fast, intuitive and reliable across devices. With cross-platform tools we ship native-quality iOS and Android apps from one codebase, which keeps your cost and time to market down.",
    benefits: [
      {
        title: "One codebase, both stores",
        description:
          "Ship to iOS and Android together with React Native or Flutter, without compromising on quality.",
      },
      {
        title: "Native performance",
        description:
          "Smooth 60fps interfaces, offline support and device features like camera, GPS and push.",
      },
      {
        title: "App store ready",
        description:
          "We handle store submission, review compliance and release management end to end.",
      },
      {
        title: "Designed to retain",
        description:
          "Thoughtful UX, onboarding and notifications that keep users coming back.",
      },
    ],
    deliverables: [
      "iOS & Android apps",
      "Cross-platform (React Native / Flutter)",
      "App UI/UX design",
      "Backend & API development",
      "Push notifications & analytics",
      "App store deployment",
    ],
    tech: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Expo"],
    process: [
      {
        title: "Define",
        description:
          "We agree on the feature set, the platforms and what the MVP needs to do.",
      },
      {
        title: "Design",
        description:
          "We prototype the flows and the interface before any code.",
      },
      {
        title: "Develop",
        description:
          "We build, integrate and test on real devices, where the bugs show up.",
      },
      {
        title: "Ship & iterate",
        description:
          "We launch to the stores, then improve the app based on how people use it.",
      },
    ],
    faqs: [
      {
        question: "Should I build a native or cross-platform app?",
        answer:
          "For most products, cross-platform (React Native or Flutter) gives you native-quality results from one codebase and saves 30–40% versus building each platform separately. We only push for fully native when an app is heavy on performance or hardware.",
      },
      {
        question: "How much does it cost to build a mobile app?",
        answer:
          "A polished MVP usually lands between $12,000 and $40,000, depending on the features and integrations. We give you a fixed estimate once the core feature set is defined.",
      },
      {
        question: "Do you handle App Store and Google Play submission?",
        answer:
          "Yes. We handle the whole release: store listings, review compliance, builds and updates, so your app goes live without the usual headaches.",
      },
      {
        question: "How long does it take to build a mobile app?",
        answer:
          "A focused MVP usually takes 10–16 weeks from kickoff to the stores: about 1–2 weeks defining scope, 2–3 weeks of design and 6–10 weeks of development and testing. Store review then takes anywhere from a day to a week.",
      },
      {
        question: "Can the app work offline?",
        answer:
          "Yes. We cache the data people need most, queue their actions while they're offline, and sync everything when the connection returns, so the app stays usable on a poor network.",
      },
      {
        question: "Who owns the app and the store accounts?",
        answer:
          "You do. The source code, the App Store and Google Play developer accounts and all app data belong to you. We work inside your accounts, never ours.",
      },
    ],
  },
  {
    slug: "saas-product-engineering",
    name: "SaaS / Product Engineering",
    heading: "SaaS & Product Engineering",
    icon: "rocket",
    summary:
      "From MVP to scale, we engineer SaaS products with multi-tenancy, billing and analytics built in.",
    metaTitle: "SaaS Development Company: From MVP to Scale",
    metaDescription:
      "SaaS development company for founders: multi-tenant architecture, subscriptions, billing and analytics, from first MVP to scale. Your product team, on demand.",
    keywords: [
      "saas development",
      "saas product engineering",
      "mvp development",
      "saas development company",
      "build a saas product",
    ],
    intro:
      "We're a SaaS development company that works as your product engineering team through a long run of decisions, most of them easy to get wrong. We validate an MVP quickly, then scale it with the multi-tenancy, billing, security and observability a real SaaS business depends on.",
    benefits: [
      {
        title: "Ship an MVP fast",
        description:
          "Get a usable, sellable product in front of customers in weeks, not quarters.",
      },
      {
        title: "Built to scale",
        description:
          "Multi-tenant architecture, queues and caching designed for thousands of accounts.",
      },
      {
        title: "Revenue ready",
        description:
          "Subscriptions, metered billing, trials and plans wired up with Stripe.",
      },
      {
        title: "Product analytics",
        description:
          "Usage tracking and dashboards so you can make data-driven product decisions.",
      },
    ],
    deliverables: [
      "MVP development",
      "Multi-tenant SaaS architecture",
      "Subscription & billing (Stripe)",
      "Admin & analytics dashboards",
      "Role-based access & teams",
      "Scaling & performance engineering",
    ],
    tech: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Stripe",
      "Redis",
      "AWS",
      "Vercel",
    ],
    process: [
      {
        title: "Validate",
        description:
          "We pin down the smallest product that proves your idea works.",
      },
      {
        title: "Build MVP",
        description: "We ship a focused first version you can start selling.",
      },
      {
        title: "Scale",
        description:
          "We harden the architecture, billing and security for real traffic.",
      },
      {
        title: "Grow",
        description:
          "We keep adding features, guided by how customers really use the product.",
      },
    ],
    faqs: [
      {
        question: "How long does it take to build a SaaS MVP?",
        answer:
          "A focused SaaS MVP usually takes 8–14 weeks to launch. We build the core workflow that proves value first, then expand once you have paying users and their feedback to work from.",
      },
      {
        question: "Can you take over an existing SaaS codebase?",
        answer:
          "Yes. We regularly audit, refactor and scale products other teams started. In most cases we can improve performance and reliability without a full rewrite.",
      },
      {
        question: "Do you help with subscriptions and billing?",
        answer:
          "Yes. We set up plans, trials, metered usage and the full Stripe billing lifecycle, including invoicing and dunning.",
      },
      {
        question: "What goes into a SaaS MVP, and what should wait?",
        answer:
          "Your core workflow, sign-up and login, and billing go in from day one, usually with a simple onboarding flow and an admin view. Teams and roles, public APIs, SSO, white-labelling and native apps can usually wait until paying customers ask for them.",
      },
      {
        question: "Which tech stack do you use for SaaS products?",
        answer:
          "Usually Next.js and Node.js with PostgreSQL, Redis for caching and queues, Stripe for billing, and AWS or Vercel for hosting. It's a proven, well-supported stack that's easy to hire for later. If you already have a stack, we work with it.",
      },
      {
        question: "Is the product secure and ready for bigger customers?",
        answer:
          "Yes. We build in tenant isolation, role-based access, encryption, 2FA and audit logs, and add SSO when enterprise buyers need it. We also set up monitoring, alerts and daily backups so issues are caught early.",
      },
      {
        question: "Do we own the code and the product?",
        answer:
          "Yes. You own 100% of the source code, accounts and infrastructure from day one. There's no lock-in, and we document everything so your own team can take over at any point.",
      },
    ],
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    heading: "UI/UX Design",
    icon: "palette",
    summary:
      "Research-driven product design that looks sharp, stays accessible and is built to convert.",
    metaTitle: "UI/UX Design Agency for Web & Mobile Apps",
    metaDescription:
      "UI/UX design services for web and mobile apps: user research, wireframes, design systems and high-fidelity interfaces that look sharp and convert.",
    keywords: [
      "ui ux design services",
      "product design agency",
      "ui design",
      "ux design",
      "web app design",
    ],
    intro:
      "As a UI/UX design agency, we aim for design users never notice because it just works. We combine user research, clean visual design and UX patterns that have earned their keep to create interfaces that feel effortless, build trust and turn visitors into customers.",
    benefits: [
      {
        title: "User-centered",
        description:
          "Research and usability testing ensure we design for real people, not assumptions.",
      },
      {
        title: "Conversion-focused",
        description:
          "Every screen is crafted to guide users toward the action that matters.",
      },
      {
        title: "Design systems",
        description:
          "Reusable component libraries that keep your product consistent and fast to build.",
      },
      {
        title: "Accessible by default",
        description:
          "WCAG-compliant contrast, focus states and semantics built into every design.",
      },
    ],
    deliverables: [
      "UX research & user flows",
      "Wireframes & prototypes",
      "High-fidelity UI design",
      "Design systems & component libraries",
      "Web & mobile app design",
      "Usability testing & audits",
    ],
    tech: [
      "Figma",
      "Design Systems",
      "Prototyping",
      "WCAG 2.2",
      "User Research",
    ],
    process: [
      {
        title: "Research",
        description:
          "We get to know your users, your goals and who you're up against.",
      },
      {
        title: "Wireframe",
        description:
          "We work out the flows and layouts before anyone touches visuals.",
      },
      {
        title: "Design",
        description:
          "We turn the wireframes into polished, on-brand interfaces.",
      },
      {
        title: "Handoff",
        description:
          "We hand over dev-ready files and a design system your team can build on.",
      },
    ],
    faqs: [
      {
        question: "What's the difference between UI and UX design?",
        answer:
          "UX (user experience) design is about how a product works: the flows, the structure, whether people can get things done. UI (user interface) design is about how it looks, from visual style to typography and components. We do both as one process rather than handing them off between teams.",
      },
      {
        question: "Do you provide developer-ready design files?",
        answer:
          "Yes. You get organized Figma files with components, tokens and specs, plus a design system your developers can build from directly.",
      },
      {
        question: "Can you redesign my existing product?",
        answer:
          "Yes. We start with a UX audit to find where users get stuck, then redesign against measurable goals like higher conversion and better retention.",
      },
      {
        question: "How long does a UI/UX design project take?",
        answer:
          "A focused product or website usually takes 4–8 weeks from research to dev-ready designs. A UX audit of an existing product takes 1–2 weeks. Larger platforms with a full design system take longer, and we agree the timeline up front.",
      },
      {
        question: "Do you design for accessibility?",
        answer:
          "Yes, always. We design to WCAG 2.2 AA: readable contrast, clear focus states, large enough tap targets, proper labels and error messages. It makes the product better for everyone, not only people using assistive tech.",
      },
      {
        question: "Can your team also build what you design?",
        answer:
          "Yes. Designers and engineers work on the same team, so designs are made to be built and nothing gets lost in handoff. You can also take the Figma files and design system to your own developers.",
      },
      {
        question: "What will we receive?",
        answer:
          "User flows, wireframes, a clickable prototype, final screens for every state and breakpoint, and a design system with components and tokens in Figma. You own all of it.",
      },
    ],
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    heading: "AI Automation",
    icon: "sparkles",
    summary:
      "Put AI to work with custom assistants, agents and automations that save your team hours.",
    metaTitle: "AI Automation Agency for Small Businesses",
    metaDescription:
      "AI automation services for growing businesses: AI agents, chatbots, workflow automation and LLM integrations that cut manual work. Practical AI, clear return.",
    keywords: [
      "ai automation",
      "ai automation services",
      "ai agent development",
      "llm integration",
      "custom ai chatbot development",
    ],
    intro:
      "Arrowbin is an AI automation agency for small businesses, and we only build AI that solves a real problem: assistants, agents, document processing and LLM integrations that take repetitive work off your team's plate.",
    benefits: [
      {
        title: "Automate busywork",
        description:
          "Replace repetitive manual tasks with reliable AI workflows that run 24/7.",
      },
      {
        title: "Custom AI assistants",
        description:
          "Chatbots and agents trained on your data, integrated into your tools and website.",
      },
      {
        title: "Grounded & accurate",
        description:
          "Retrieval-augmented generation keeps answers grounded in your real content.",
      },
      {
        title: "Measurable ROI",
        description:
          "We target automations with clear payback in hours saved or revenue gained.",
      },
    ],
    deliverables: [
      "Custom AI chatbots & assistants",
      "AI agents & workflow automation",
      "RAG & knowledge-base search",
      "Document & data processing",
      "LLM API integration",
      "AI-powered features in your app",
    ],
    tech: [
      "OpenAI",
      "Anthropic Claude",
      "LangChain",
      "Vector DBs",
      "Python",
      "Node.js",
    ],
    process: [
      {
        title: "Identify",
        description:
          "We find the automation with the biggest payback and start there.",
      },
      {
        title: "Prototype",
        description:
          "We build a proof of concept to check the value is real before going further.",
      },
      {
        title: "Integrate",
        description:
          "We connect the AI to your tools and data, with security handled properly.",
      },
      {
        title: "Refine",
        description:
          "We watch the output quality and tighten accuracy as the system runs.",
      },
    ],
    faqs: [
      {
        question: "What can AI automation do for my business?",
        answer:
          "Some of the highest-value uses we see are customer support chatbots, automated document and data processing, content generation, lead qualification and internal knowledge assistants. We focus on the ones with a clear, measurable return rather than novelty.",
      },
      {
        question: "Is my data safe when using AI?",
        answer:
          "Yes. We use enterprise AI APIs that don't train on your data, keep sensitive information isolated, and can run private or on-prem models when a project calls for it.",
      },
      {
        question: "Will AI give accurate answers about my business?",
        answer:
          "We use retrieval-augmented generation (RAG), so the AI answers from your verified content and documents. That cuts down sharply on incorrect or made-up responses.",
      },
      {
        question: "How much does an AI automation project cost?",
        answer:
          "A focused first automation, such as invoice processing or support triage, typically starts around $10,000–$15,000 including a year of running costs. Larger agent systems cost more. We size it against the time it saves, so you can see the payback before you commit.",
      },
      {
        question: "How long does it take to build?",
        answer:
          "A working prototype on your real data usually takes 2–3 weeks. Taking it into production with integrations, security and monitoring adds another 3–6 weeks.",
      },
      {
        question: "Which AI models do you use?",
        answer:
          "We pick the model for the job: Anthropic Claude and OpenAI for most language tasks, and open-source or private models when data must stay in-house. We design it so you can switch models later without a rebuild.",
      },
      {
        question: "Will AI replace my team?",
        answer:
          "That isn't how we design it. AI takes the repetitive part of the work, and anything uncertain or high-stakes goes to a person with a summary ready. Teams usually spend the time they get back on customers and harder problems.",
      },
    ],
  },
  {
    slug: "cloud-devops-hosting",
    name: "Cloud, DevOps & Hosting",
    heading: "Cloud, DevOps & Hosting",
    icon: "cloud",
    summary:
      "Reliable, secure cloud infrastructure with automated deployments and uptime you can count on.",
    metaTitle: "DevOps Consulting Services & Cloud Hosting",
    metaDescription:
      "Cloud and DevOps services: scalable infrastructure on AWS, GCP and Vercel, CI/CD pipelines, monitoring and managed hosting. Secure, automated, always online.",
    keywords: [
      "devops services",
      "cloud infrastructure services",
      "managed hosting",
      "ci cd pipeline setup",
      "aws cloud consulting",
    ],
    intro:
      "Our DevOps consulting services fix the slow deploys and fragile servers that hold good products back. We build secure, automated cloud infrastructure that's ready to scale, with CI/CD, monitoring and managed hosting that keep your product online.",
    benefits: [
      {
        title: "Automated deployments",
        description:
          "CI/CD pipelines that ship code safely with tests, previews and rollbacks.",
      },
      {
        title: "Scalable & resilient",
        description:
          "Auto-scaling, load balancing and backups so your product handles any traffic.",
      },
      {
        title: "Secure & compliant",
        description:
          "Hardened infrastructure, secrets management and least-privilege access.",
      },
      {
        title: "Always monitored",
        description:
          "Logging, alerting and uptime monitoring so issues are caught before users notice.",
      },
    ],
    deliverables: [
      "Cloud architecture (AWS / GCP)",
      "CI/CD pipeline setup",
      "Managed hosting & deployment",
      "Containerization (Docker / K8s)",
      "Monitoring, logging & alerting",
      "Infrastructure as code",
    ],
    tech: [
      "AWS",
      "Google Cloud",
      "Vercel",
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
    ],
    process: [
      {
        title: "Assess",
        description: "We review your current setup and work out what it needs.",
      },
      {
        title: "Design",
        description:
          "We architect a cloud setup that's secure and ready to scale.",
      },
      {
        title: "Automate",
        description:
          "We put CI/CD, monitoring and infrastructure as code in place.",
      },
      {
        title: "Manage",
        description: "We keep it running, with monitoring and support on hand.",
      },
    ],
    faqs: [
      {
        question: "Which cloud provider should I use?",
        answer:
          "It depends on your stack and your team. AWS and Google Cloud suit complex systems that need to scale, while Vercel is excellent for fast, modern web apps. We'll recommend the right mix based on your product and budget.",
      },
      {
        question: "Can you reduce my cloud bill?",
        answer:
          "Often, yes. We audit usage, right-size resources, add auto-scaling and clear out waste. That frequently cuts cloud costs by 20–40% while improving reliability at the same time.",
      },
      {
        question: "Do you offer ongoing infrastructure management?",
        answer:
          "Yes. We offer managed DevOps with monitoring, security updates and on-call support, so your team can stay focused on the product.",
      },
      {
        question: "Can you migrate us without downtime?",
        answer:
          "In almost all cases, yes. We run the new setup alongside the old one, sync the data, test it with real traffic and switch over in a planned window, with a rollback plan ready. Most migrations finish with no visible downtime.",
      },
      {
        question: "What is CI/CD, and do we need it?",
        answer:
          "CI/CD automatically builds, tests and deploys every change. If you ship updates more than occasionally, yes: releases become routine instead of risky, bugs are caught before customers see them, and a bad release can be rolled back in seconds.",
      },
      {
        question: "Do you work with our existing hosting provider?",
        answer:
          "Yes. We work with AWS, Google Cloud, Vercel, Hostinger, DigitalOcean and others. We only suggest moving if it clearly saves money or solves a real problem.",
      },
      {
        question: "Will we own the infrastructure and accounts?",
        answer:
          "Yes. Everything runs in accounts you own, and it's defined as code (Terraform), so it's documented and reproducible. There's no lock-in to us.",
      },
    ],
  },
  {
    slug: "maintenance-support",
    name: "Maintenance & Support",
    heading: "Maintenance & Support",
    icon: "shield",
    summary:
      "Keep your software fast, secure and improving with proactive maintenance and support.",
    metaTitle: "Software Maintenance & Support Services",
    metaDescription:
      "Software maintenance and support services: bug fixes, security updates, performance tuning, monitoring and new features, so your product stays healthy.",
    keywords: [
      "software maintenance services",
      "website maintenance",
      "application support services",
      "software support company",
      "ongoing development support",
    ],
    intro:
      "Because software is never finished, our software maintenance and support services keep your applications secure, fast and reliable: applying updates, fixing issues, watching performance and shipping a steady stream of improvements so your product keeps getting better long after launch.",
    benefits: [
      {
        title: "Proactive, not reactive",
        description:
          "We monitor and update continuously so problems are prevented, not patched.",
      },
      {
        title: "Stay secure",
        description:
          "Regular dependency and security updates protect you from vulnerabilities.",
      },
      {
        title: "Fast response",
        description:
          "Clear SLAs and dedicated support so critical issues are resolved quickly.",
      },
      {
        title: "Keep improving",
        description:
          "A steady stream of enhancements and new features, not just bug fixes.",
      },
    ],
    deliverables: [
      "Bug fixes & issue resolution",
      "Security & dependency updates",
      "Performance optimization",
      "Uptime & error monitoring",
      "Feature enhancements",
      "Dedicated support with SLAs",
    ],
    tech: ["Monitoring", "Sentry", "GitHub", "Automated Testing", "CI/CD"],
    process: [
      {
        title: "Onboard",
        description:
          "We get to know your codebase, your stack and what matters most to you.",
      },
      {
        title: "Stabilize",
        description:
          "We clear the urgent issues and harden the system against the next ones.",
      },
      {
        title: "Maintain",
        description:
          "We monitor, update and support the product against an agreed SLA.",
      },
      {
        title: "Evolve",
        description:
          "We keep shipping improvements and new features as you need them.",
      },
    ],
    faqs: [
      {
        question: "Do you maintain software you didn't originally build?",
        answer:
          "Yes. We start with a code and infrastructure audit to understand the system, then take over maintenance with a clear plan to stabilize it and move it forward.",
      },
      {
        question: "How does your support pricing work?",
        answer:
          "We work on monthly retainers sized to what you need, from essential security and uptime cover through to dedicated ongoing development. You get a predictable cost and a defined response SLA.",
      },
      {
        question: "What's your response time for critical issues?",
        answer:
          "Critical, production-down issues get our attention immediately under the SLA, with response and resolution targets agreed in your plan.",
      },
      {
        question: "What's included in a maintenance plan?",
        answer:
          "Every plan covers monitoring, security and dependency updates, backups, bug fixes and a monthly health report. Higher plans add faster response targets, 24/7 cover for critical issues and more development hours for improvements and new features.",
      },
      {
        question: "Can we use the hours for new features?",
        answer:
          "Yes. Hours not needed for upkeep go into improvements and new features from a shared list we agree with you, so maintenance also moves the product forward.",
      },
      {
        question: "Is there a minimum contract length?",
        answer:
          "Plans run month to month after a short onboarding period. You can change plan as your needs change, and if you ever leave, we hand over documentation and access cleanly.",
      },
      {
        question: "What if our software is old or in bad shape?",
        answer:
          "That's common, and it's where we help most. We start with an audit, fix the urgent risks first, then modernise step by step, so there's no need for a risky big-bang rewrite.",
      },
    ],
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/**
 * Conversion + SEO/AEO content layered on top of each service (kept separate so the
 * core service objects stay readable). `answer` is the direct AEO answer; `outcomes`
 * feed the stats band; `idealFor` is "who it's for"; `relatedWork`/`relatedPosts`
 * build the proof + content-cluster links.
 */
export type ServiceExtras = {
  answer: string;
  outcomes: { value: string; label: string }[];
  idealFor: string[];
  /** Portfolio project names (see portfolio.ts) to feature as proof. */
  relatedWork?: string[];
  /** Blog slugs for the content cluster. */
  relatedPosts?: string[];
  /** This service's wording for the blocks every service page shares. */
  copy: ServicePageCopy;
};

/** One "Three ways to start" card, written for this service's buyer. */
export type EngagementModelCopy = {
  lead: string;
  fit: string;
  points: [string, string, string];
  /** Replaces the card's link (the care plan card on the maintenance page). */
  cta?: { label: string; href: string };
};

export type EngagementCopy = {
  /** Line beside the "Three ways to start" heading. */
  intro: string;
  project: EngagementModelCopy;
  team: EngagementModelCopy;
  care: EngagementModelCopy;
};

/**
 * Per-service text for the blocks all 8 service pages share (audit finding
 * M-8: before this, 31 to 43% of each page's lines repeated on 3+ pages).
 * Each component keeps its generic text as the fallback for other pages.
 * Keep each line close to the generic line's length so layouts do not move.
 */
export type ServicePageCopy = {
  /** Hero quote form: the line under "Get a free quote" and the textarea hint. */
  form: { intro: string; placeholder: string };
  /** Line under "Is this for you?". */
  fit: string;
  /** Line beside "How we deliver". */
  process: string;
  engagement: EngagementCopy;
  /**
   * Closing CTA paragraph. Not rendered yet: `home/Cta.tsx` needs an optional
   * `text` prop first (see agent-log A5).
   */
  cta: string;
};

export const serviceExtras: Record<string, ServiceExtras> = {
  "custom-software-development": {
    answer:
      "Custom software development means designing and building software around your exact business: your workflows, your data, your users. Arrowbin builds web platforms, internal tools and system integrations for startups and growing businesses, and a usable first version usually takes 6–12 weeks, with you owning all the code.",
    outcomes: [
      { value: "100%", label: "Source code ownership" },
      { value: "6–12", label: "Weeks to a usable first version" },
      { value: "0", label: "Per-seat license fees" },
    ],
    idealFor: [
      "Teams outgrowing spreadsheets, manual steps or disconnected tools",
      "Businesses with a workflow no off-the-shelf product fits",
      "Companies that need their systems to talk to each other",
      "Founders building a platform they want to own outright",
    ],
    relatedWork: ["North Bengal Agro Farms", "YT Shop India", "FlexOver BD"],
    relatedPosts: [
      "vibe-coded-app-production-ready",
      "how-much-does-custom-software-development-cost",
      "how-to-choose-a-software-development-company",
    ],
    copy: {
      form: {
        intro: "Tell us what your team does by hand today.",
        placeholder: "Which tools or manual steps should it replace?",
      },
      fit: "If your team works around its tools, we should talk.",
      process:
        "Two-week sprints, each ending with a working demo you can click through and comment on.",
      engagement: {
        intro:
          "Start with a scoped build of the tool you need most. Once your team relies on it, move to a team or a care plan.",
        project: {
          lead: "A scoped build of one system, with a fixed estimate.",
          fit: "Best for internal tools and client portals.",
          points: [
            "We map the workflow before quoting",
            "Fixed estimate for the first version",
            "A working demo every two weeks",
          ],
        },
        team: {
          lead: "A team on your platform's roadmap, planned month by month.",
          fit: "Best when the system keeps growing with the business.",
          points: [
            "New modules and integrations as needed",
            "The people who built version one",
            "Monthly plan, a release every sprint",
          ],
        },
        care: {
          lead: "We keep the system and its integrations working after launch.",
          fit: "Best for tools your team uses every day.",
          points: [
            "Fixes when a connected API changes",
            "Security and dependency updates",
            "A health report every month",
          ],
        },
      },
      cta: "Tell us which workflow costs your team the most time. We'll come back with a straight answer on scope and cost, usually within a day.",
    },
  },
  "ecommerce-development": {
    answer:
      "E-commerce development is building a fast, conversion-focused online store, from storefront and checkout through to payments, inventory and the integrations behind them. Arrowbin builds headless, Shopify and custom stores for brands and retailers: a Shopify store typically launches in 3–6 weeks, and a headless storefront in about 8–12.",
    outcomes: [
      { value: "Fast", label: "Conversion-tuned page loads" },
      { value: "Mobile", label: "First, where buyers shop" },
      { value: "Secure", label: "Payments & checkout" },
    ],
    idealFor: [
      "Brands launching a new online store",
      "Retailers replatforming from a slow or limited site",
      "Sellers who need custom checkout, pricing or subscriptions",
      "Businesses scaling catalog, traffic or fulfilment",
    ],
    relatedWork: ["Maneel Club", "গ তে গয়না", "YT Shop India"],
    relatedPosts: [
      "shopify-vs-custom-ecommerce",
      "payment-gateway-integration-bangladesh",
      "courier-api-integration-bangladesh",
    ],
    copy: {
      form: {
        intro: "Tell us what you sell. No obligation.",
        placeholder: "What do you sell, and where do you sell it now?",
      },
      fit: "If your store is slow or you're starting one, let's talk.",
      process:
        "Strategy takes a week. Design and build follow, and testing carries on after launch.",
      engagement: {
        intro:
          "Launch or move your store as a project. After that, a team keeps it growing, or a care plan keeps it running.",
        project: {
          lead: "A new store or a migration, with a fixed estimate.",
          fit: "Best for new brands and stores leaving a slow platform.",
          points: [
            "Payments and delivery scoped up front",
            "301 redirects so rankings hold",
            "Admin training before launch",
          ],
        },
        team: {
          lead: "A team that keeps improving the store, month to month.",
          fit: "Best for stores that test offers and checkout.",
          points: [
            "Checkout and product page tests",
            "New payment or courier options",
            "Sale and campaign pages when needed",
          ],
        },
        care: {
          lead: "Monitoring and fixes so the store keeps taking orders.",
          fit: "Best for stores where downtime loses sales.",
          points: [
            "Checkout and payment monitoring",
            "Fixes when a gateway changes its API",
            "Backups of orders and products",
          ],
        },
      },
      cta: "Tell us what you sell and where you sell it now. We'll tell you which platform fits and what it costs, usually within a day.",
    },
  },
  "mobile-app-development": {
    answer:
      "Mobile app development is designing and building native or cross-platform apps for iOS and Android that are fast, intuitive and ready to scale as your user base grows. Arrowbin builds them for startups and businesses taking a product to mobile, and a focused MVP usually reaches the stores in 10–16 weeks.",
    outcomes: [
      { value: "iOS + Android", label: "From one codebase" },
      { value: "Native", label: "Feel and performance" },
      { value: "Store-ready", label: "Launch and updates" },
    ],
    idealFor: [
      "Startups taking an idea to the app stores",
      "Businesses extending a product to mobile",
      "Teams that need offline, push or device features",
      "Founders validating a mobile-first MVP",
    ],
    relatedWork: ["Silent Lifestyle BD", "Maneel Club", "YT Shop India"],
    relatedPosts: [
      "mvp-development-cost",
      "how-long-does-it-take-to-build-an-mvp",
    ],
    copy: {
      form: {
        intro: "Tell us about your app idea. No obligation.",
        placeholder: "What should the app do, and who is it for?",
      },
      fit: "If your product belongs on a phone, we should talk.",
      process:
        "We prototype before we code, and test on real phones before anything goes to the stores.",
      engagement: {
        intro:
          "Start with a fixed-scope MVP. Once the app is live in the stores, choose a team for new releases or a care plan for upkeep.",
        project: {
          lead: "An MVP for iOS and Android, with a fixed estimate.",
          fit: "Best for a first app or taking a product to mobile.",
          points: [
            "Feature set agreed before design",
            "Clickable prototype before code",
            "Store submission handled",
          ],
        },
        team: {
          lead: "A team shipping app releases on your roadmap, month to month.",
          fit: "Best for apps that update often after launch.",
          points: [
            "App and backend built by one team",
            "Releases through both stores",
            "Changes based on how people use it",
          ],
        },
        care: {
          lead: "Updates and fixes so the app keeps passing store review.",
          fit: "Best for live apps with real users.",
          points: [
            "Updates for each new iOS and Android",
            "Crash and error monitoring",
            "Store listing and policy checks",
          ],
        },
      },
      cta: "Tell us what the app should do and who it's for. We'll say whether cross-platform fits and what the MVP costs, usually within a day.",
    },
  },
  "saas-product-engineering": {
    answer:
      "SaaS product engineering is building a multi-tenant software-as-a-service product end to end: accounts, subscription billing, dashboards and the reliability customers expect from something they pay for every month. Arrowbin builds SaaS MVPs for founders and for teams turning an internal tool into a product; a focused MVP usually launches in 8–14 weeks.",
    outcomes: [
      { value: "Multi-tenant", label: "Built to scale" },
      { value: "Billing", label: "Subscriptions ready" },
      { value: "MVP-first", label: "Launch, then grow" },
    ],
    idealFor: [
      "Founders launching a SaaS MVP",
      "Teams adding multi-tenancy, roles and billing",
      "Products scaling from their first users to many",
      "Companies turning an internal tool into a product",
    ],
    relatedWork: ["YT Shop India", "FlexOver BD", "North Bengal Agro Farms"],
    relatedPosts: [
      "saas-development-cost",
      "mvp-development-cost",
      "how-long-does-it-take-to-build-an-mvp",
    ],
    copy: {
      form: {
        intro: "Tell us what customers will pay for.",
        placeholder: "Who pays, and what's the core workflow?",
      },
      fit: "If customers will pay for it monthly, let's talk.",
      process:
        "We cut the MVP to what proves the idea, ship it, then scale what customers use most.",
      engagement: {
        intro:
          "Build the MVP as a fixed project. Once customers pay, a product team keeps shipping, or a care plan keeps it up.",
        project: {
          lead: "A SaaS MVP: your core workflow, with billing built in.",
          fit: "Best for founders who need something to sell, soon.",
          points: [
            "Scope cut to what customers pay for",
            "Stripe billing from day one",
            "A fixed estimate before we start",
          ],
        },
        team: {
          lead: "A product team on your roadmap after launch, month to month.",
          fit: "Best once paying customers start asking for more.",
          points: [
            "Features ranked by customer usage",
            "SSO and team roles when buyers ask",
            "Scale the team up or down",
          ],
        },
        care: {
          lead: "Uptime and backups for a product customers pay for.",
          fit: "Best for stable products with a small team.",
          points: [
            "Daily backups, checked monthly",
            "Error alerts and uptime monitoring",
            "Security and dependency patches",
          ],
        },
      },
      cta: "Tell us who will pay and for what. We'll come back with a first MVP scope and what it costs, usually within a day.",
    },
  },
  "ui-ux-design": {
    answer:
      "UI/UX design is shaping how a product looks and works, through research, user flows, wireframes and a polished interface, so it's intuitive, on-brand and built to convert. Arrowbin designs web and mobile apps for founders and product teams, and a focused product or website usually takes 4–8 weeks from research to dev-ready designs.",
    outcomes: [
      { value: "Research", label: "Grounded in real users" },
      { value: "Design system", label: "Consistent at scale" },
      { value: "Convert", label: "Usable, on-brand UI" },
    ],
    idealFor: [
      "Products that feel clunky or confusing to use",
      "Teams that need a design system for consistency",
      "Founders shaping a product before building it",
      "Brands that want a polished, conversion-ready interface",
    ],
    relatedWork: ["Brandingly", "OutNet", "Maneel Club"],
    relatedPosts: [
      "mvp-vs-prototype-vs-poc",
      "how-to-choose-a-software-development-company",
    ],
    copy: {
      form: {
        intro: "Tell us what needs designing. No obligation.",
        placeholder: "A new product, a redesign or a UX audit?",
      },
      fit: "If users get stuck or give up, let's look at why.",
      process:
        "Flows are settled in wireframes before visual design starts, so changes stay cheap.",
      engagement: {
        intro:
          "Design starts as a fixed project. If we build it too, the same team carries on, or a care plan keeps the UI in shape.",
        project: {
          lead: "Research to dev-ready Figma files, with a fixed estimate.",
          fit: "Best for a new product or a full redesign.",
          points: [
            "User research and flows first",
            "Clickable prototype to test",
            "Figma files and a design system",
          ],
        },
        team: {
          lead: "Designers and engineers on your roadmap, month to month.",
          fit: "Best when design and build should not be handed off.",
          points: [
            "Designs built by the same team",
            "Usability checks on new features",
            "Design system kept up to date",
          ],
        },
        care: {
          lead: "Small UI fixes and checks so the product stays easy to use.",
          fit: "Best for live products after a redesign.",
          points: [
            "Dev hours for UI fixes each month",
            "Broken layouts fixed as found",
            "Monitoring and security updates",
          ],
        },
      },
      cta: "Send us the product, or just the idea. We'll tell you what research it needs and what the design costs, usually within a day.",
    },
  },
  "ai-automation": {
    answer:
      "AI automation uses AI and workflow automation to take manual, repetitive work off your team, from data entry and document processing to chat and decision support. Arrowbin builds it for small and growing businesses: a working prototype on your real data usually takes 2–3 weeks, and taking it into production another 3–6.",
    outcomes: [
      { value: "Less", label: "Manual, repetitive work" },
      { value: "24/7", label: "Automated workflows" },
      { value: "Custom", label: "Fit to your process" },
    ],
    idealFor: [
      "Teams drowning in repetitive manual tasks",
      "Businesses with data or documents to process at scale",
      "Companies adding AI features to a product",
      "Operations leaders chasing efficiency gains",
    ],
    relatedWork: ["OutNet", "FlexOver BD", "YT Shop India"],
    relatedPosts: [
      "ai-automation-for-small-business",
      "ai-agent-cost-small-business",
    ],
    copy: {
      form: {
        intro: "Tell us which task eats your team's time.",
        placeholder: "Which repetitive task would you automate first?",
      },
      fit: "If someone copies data between tools all day, let's talk.",
      process:
        "We prove the value on your real data before building the full system around it.",
      engagement: {
        intro:
          "Start with one automation as a project. Add more with a team, or keep the first one tuned with a care plan.",
        project: {
          lead: "One automation, proven on your data first.",
          fit: "Best for a first task worth automating, like invoices.",
          points: [
            "Prototype on your real data",
            "Payback sized before you commit",
            "Hand-off rules for unsure cases",
          ],
        },
        team: {
          lead: "A team adding automations and AI features, month to month.",
          fit: "Best when several tasks are worth automating.",
          points: [
            "New workflows from a shared list",
            "AI features inside your product",
            "Models swapped without a rebuild",
          ],
        },
        care: {
          lead: "We watch answer quality and fix what drifts after launch.",
          fit: "Best for automations your team relies on.",
          points: [
            "Output checks on real cases",
            "Updates when model APIs change",
            "Source documents kept in sync",
          ],
        },
      },
      cta: "Tell us the task that eats your team's week. We'll tell you if AI can take it on and what it would pay back, usually within a day.",
    },
  },
  "cloud-devops-hosting": {
    answer:
      "Cloud, DevOps and hosting is setting up reliable, scalable infrastructure and automated deployment pipelines, so your software ships faster, stays online and scales without nasty surprises. Arrowbin does this for teams with slow or fragile deployments: a typical setup takes 4–7 weeks from first review to automated deploys, then we keep it running.",
    outcomes: [
      { value: "Reliable", label: "Uptime & monitoring" },
      { value: "Automated", label: "CI/CD pipelines" },
      { value: "Scalable", label: "Cloud-native infra" },
    ],
    idealFor: [
      "Teams with slow, manual or fragile deployments",
      "Products that need to scale reliably under load",
      "Companies migrating to the cloud",
      "Businesses that want monitoring and peace of mind",
    ],
    relatedWork: [
      "North Bengal Agro Farms",
      "Silent Lifestyle BD",
      "YT Shop India",
    ],
    relatedPosts: [
      "wordpress-to-nextjs-migration",
      "chatgpt-shopping-for-online-stores",
    ],
    copy: {
      form: {
        intro: "Tell us where your product runs today.",
        placeholder: "Where is it hosted, and what keeps breaking?",
      },
      fit: "If releases make your team nervous, we should talk.",
      process:
        "Changes roll out in stages with a rollback ready, so your product stays online throughout.",
      engagement: {
        intro:
          "Fix deploys and hosting as a project. Then run it yourself, add a team, or let us manage it on a care plan.",
        project: {
          lead: "A cloud and CI/CD setup with a fixed estimate.",
          fit: "Best for slow deploys or a move to the cloud.",
          points: [
            "Review of what runs today",
            "Infrastructure written as code",
            "Rollback plan for the switch-over",
          ],
        },
        team: {
          lead: "A team on your product and its infrastructure, month to month.",
          fit: "Best for products that release often and need to scale.",
          points: [
            "Pipelines that grow with the app",
            "Cost reviews as traffic grows",
            "Releases with previews and rollbacks",
          ],
        },
        care: {
          lead: "Managed hosting, with an engineer on call when it breaks.",
          fit: "Best for teams who'd rather not run servers.",
          points: [
            "Uptime alerts go to an engineer",
            "OS and security patching",
            "Backups checked every month",
          ],
        },
      },
      cta: "Tell us where you host and what keeps breaking. We'll come back with what to fix first and what it costs, usually within a day.",
    },
  },
  "maintenance-support": {
    answer:
      "Software maintenance and support is keeping your product fast, secure and reliable after launch, through bug fixes, security patches, monitoring and ongoing improvements. Arrowbin runs it as a monthly plan for teams without in-house engineers or with inherited software: onboarding takes about a week, then the plan runs month to month.",
    outcomes: [
      { value: "Secure", label: "Patched & monitored" },
      { value: "Reliable", label: "Issues fixed fast" },
      { value: "Evolving", label: "Continuous improvement" },
    ],
    idealFor: [
      "Teams whose product needs ongoing upkeep",
      "Businesses that inherited software to maintain",
      "Founders without an in-house engineering team",
      "Products that need security patches and monitoring",
    ],
    relatedWork: ["North Bengal Agro Farms", "OutNet", "Brandingly"],
    relatedPosts: [
      "software-maintenance-cost",
      "wordpress-to-nextjs-migration",
    ],
    copy: {
      form: {
        intro: "Tell us what needs looking after. No obligation.",
        placeholder: "What does it run on, and who built it?",
      },
      fit: "If nobody looks after your software today, let's talk.",
      process:
        "Urgent risks get fixed first. Then the plan settles into steady monthly upkeep.",
      engagement: {
        intro:
          "A care plan covers most upkeep. Use a project for a big fix-up, or a team when feature work is steady.",
        project: {
          lead: "A fixed-scope fix-up: audit, urgent risks, then upgrades.",
          fit: "Best for software you inherited or that has aged badly.",
          points: [
            "Code and infrastructure audit",
            "Urgent risks fixed first",
            "Upgrades in steps, no rewrite",
          ],
        },
        team: {
          lead: "A team for ongoing feature work beyond upkeep, month to month.",
          fit: "Best when the product still has a long roadmap.",
          points: [
            "Features from a shared, ranked list",
            "Upkeep handled by the same team",
            "Grow or shrink hours as needed",
          ],
        },
        care: {
          lead: "Upkeep and fixes, with response times agreed up front.",
          fit: "Best for products with no in-house engineer.",
          points: [
            "A monthly report in plain English",
            "Response targets set in your plan",
            "Spare hours go into improvements",
          ],
          // The page itself is the care plan, so ask instead of linking here.
          cta: { label: "Ask about a plan", href: "/contact" },
        },
      },
      cta: "Tell us what you need looked after. We'll suggest a plan and the response times that fit, usually within a day.",
    },
  },
};

export function getServiceExtras(slug: string): ServiceExtras | undefined {
  return serviceExtras[slug];
}
