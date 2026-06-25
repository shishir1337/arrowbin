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
  /** What you get — benefit bullets. */
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
    metaTitle: "Custom Software Development Company",
    metaDescription:
      "Arrowbin builds custom software for your business: web platforms, internal tools and enterprise systems. You own the code, and it's built to grow with you.",
    keywords: [
      "custom software development",
      "bespoke software",
      "enterprise software development",
      "software development company",
      "custom web application development",
    ],
    intro:
      "Off-the-shelf tools force your business to bend around their limits. We build custom software that fits the way you actually work. That means cutting out manual steps, connecting the systems you already use, and giving you a platform that grows as you do.",
    benefits: [
      {
        title: "Built for your workflow",
        description:
          "Software designed around your processes, not a generic template — so adoption is fast and friction is low.",
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
    ],
  },
  {
    slug: "ecommerce-development",
    name: "E-commerce Development",
    heading: "E-commerce Development",
    icon: "cart",
    summary:
      "Online stores and headless commerce that load fast and turn more browsers into buyers.",
    metaTitle: "E-commerce Development Services",
    metaDescription:
      "Custom and headless e-commerce development that loads fast and converts. We build Shopify stores, headless storefronts and commerce platforms that scale with your sales.",
    keywords: [
      "ecommerce development",
      "ecommerce website development",
      "headless commerce",
      "shopify development agency",
      "online store development",
    ],
    intro:
      "Your storefront is your hardest-working salesperson. We build fast, conversion-focused e-commerce, whether that's a Shopify store, a headless storefront or a fully custom commerce platform. Every decision comes back to one thing: turning visitors into customers.",
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
    ],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    heading: "Mobile App Development",
    icon: "mobile",
    summary:
      "Native-quality iOS and Android apps from a single codebase, built to feel fast.",
    metaTitle: "Mobile App Development Company",
    metaDescription:
      "iOS and Android app development that feels native and ships fast. We build cross-platform and native apps with React Native, Flutter and Swift.",
    keywords: [
      "mobile app development",
      "ios app development",
      "android app development",
      "react native development",
      "cross platform app development",
    ],
    intro:
      "We design and build mobile apps people actually want to open: fast, intuitive and reliable across devices. With cross-platform tools we ship native-quality iOS and Android apps from one codebase, which keeps both your cost and your time to market down.",
    benefits: [
      {
        title: "One codebase, both stores",
        description:
          "Ship to iOS and Android together with React Native or Flutter — without compromising on quality.",
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
          "We build, integrate and test on real devices, where bugs actually show up.",
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
    ],
  },
  {
    slug: "saas-product-engineering",
    name: "SaaS / Product Engineering",
    heading: "SaaS & Product Engineering",
    icon: "rocket",
    summary:
      "From MVP to scale, we engineer SaaS products with multi-tenancy, billing and analytics built in.",
    metaTitle: "SaaS Development & Product Engineering",
    metaDescription:
      "Arrowbin handles SaaS product engineering from MVP to scale: multi-tenant architecture, subscriptions, billing and analytics. Think of us as your product team, on demand.",
    keywords: [
      "saas development",
      "saas product engineering",
      "mvp development",
      "saas development company",
      "build a saas product",
    ],
    intro:
      "Building a SaaS product is a long run of engineering decisions, most of them easy to get wrong. We act as your product engineering team: we validate an MVP quickly, then scale it with the multi-tenancy, billing, security and observability a real SaaS business depends on.",
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
        description: "We ship a focused first version you can actually sell.",
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
    ],
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    heading: "UI/UX Design",
    icon: "palette",
    summary:
      "Research-driven product design that looks sharp, stays accessible and is built to convert.",
    metaTitle: "UI/UX Design Services",
    metaDescription:
      "User-centered UI/UX design for web and mobile: research, wireframes, design systems and high-fidelity interfaces that look good and convert.",
    keywords: [
      "ui ux design services",
      "product design agency",
      "ui design",
      "ux design",
      "web app design",
    ],
    intro:
      "Great design is invisible. It just works, and users rarely notice the thought behind it. We combine user research, clean visual design and UX patterns that have earned their keep to create interfaces that feel effortless, build trust and turn visitors into customers.",
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
          "UX (user experience) design is about how a product works: the flows, the structure, whether people can actually get things done. UI (user interface) design is about how it looks, from visual style to typography and components. We do both as one process rather than handing them off between teams.",
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
    ],
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    heading: "AI Automation",
    icon: "sparkles",
    summary:
      "Put AI to work with custom assistants, agents and automations that save your team hours.",
    metaTitle: "AI Automation Services",
    metaDescription:
      "Arrowbin builds AI automation, chatbots, agents and LLM integrations that cut manual work and add new capabilities. Practical AI with a clear return.",
    keywords: [
      "ai automation",
      "ai automation services",
      "ai agent development",
      "llm integration",
      "custom ai chatbot development",
    ],
    intro:
      "AI is only useful when it solves a real problem. We build practical AI automation: assistants, agents, document processing and LLM integrations that take repetitive work off your team's plate and surface the insights buried in your data.",
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
        question: "What can AI automation actually do for my business?",
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
    ],
  },
  {
    slug: "cloud-devops-hosting",
    name: "Cloud, DevOps & Hosting",
    heading: "Cloud, DevOps & Hosting",
    icon: "cloud",
    summary:
      "Reliable, secure cloud infrastructure with automated deployments and uptime you can count on.",
    metaTitle: "Cloud, DevOps & Hosting Services",
    metaDescription:
      "Arrowbin sets up scalable cloud infrastructure, CI/CD pipelines and managed hosting on AWS, GCP and Vercel. Secure, automated and built to stay online.",
    keywords: [
      "devops services",
      "cloud infrastructure services",
      "managed hosting",
      "ci cd pipeline setup",
      "aws cloud consulting",
    ],
    intro:
      "Slow deploys and fragile servers hold good products back. We build cloud infrastructure that's secure, automated and ready to scale, with CI/CD pipelines, monitoring and managed hosting that keep your product fast and online.",
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
        description:
          "We review your current setup and figure out what it actually needs.",
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
      "Ongoing software maintenance and support: bug fixes, security updates, performance tuning and new features. Keep your product healthy and growing.",
    keywords: [
      "software maintenance services",
      "website maintenance",
      "application support services",
      "software support company",
      "ongoing development support",
    ],
    intro:
      "Software is never really finished. We keep your applications secure, fast and reliable with proactive maintenance: applying updates, fixing issues, watching performance and shipping a steady stream of improvements so your product keeps getting better long after launch.",
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
};

export const serviceExtras: Record<string, ServiceExtras> = {
  "custom-software-development": {
    answer:
      "Custom software development means designing and building software around your exact business: your workflows, your data, your users. Instead of bending your team to fit a generic, off-the-shelf tool, the software fits the business.",
    outcomes: [
      { value: "100%", label: "Source code ownership" },
      { value: "6–12 wk", label: "To a usable first version" },
      { value: "0", label: "Per-seat license fees" },
    ],
    idealFor: [
      "Teams outgrowing spreadsheets, manual steps or disconnected tools",
      "Businesses with a workflow no off-the-shelf product fits",
      "Companies that need their systems to talk to each other",
      "Founders building a platform they want to own outright",
    ],
    relatedWork: ["Madexa", "North Bengal Agro Farms", "Muxoro"],
    relatedPosts: [
      "how-much-does-custom-software-development-cost",
      "how-to-choose-a-software-development-company",
      "how-long-does-it-take-to-build-an-mvp",
    ],
  },
  "ecommerce-development": {
    answer:
      "E-commerce development is building a fast, conversion-focused online store, from storefront and checkout through to payments, inventory and the integrations behind them. The whole point is turning visitors into paying customers.",
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
      "how-much-does-custom-software-development-cost",
      "how-to-choose-a-software-development-company",
    ],
  },
  "mobile-app-development": {
    answer:
      "Mobile app development is designing and building native or cross-platform apps for iOS and Android that are fast, intuitive and ready to scale as your user base grows.",
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
    relatedWork: ["Muxoro", "Maneel Club", "YT Shop India"],
    relatedPosts: [
      "how-long-does-it-take-to-build-an-mvp",
      "how-much-does-custom-software-development-cost",
    ],
  },
  "saas-product-engineering": {
    answer:
      "SaaS product engineering is building a multi-tenant software-as-a-service product end to end: accounts, subscription billing, dashboards and the reliability customers expect from something they pay for every month.",
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
    relatedWork: ["Madexa", "Muxoro", "YT Shop India"],
    relatedPosts: [
      "how-long-does-it-take-to-build-an-mvp",
      "how-much-does-custom-software-development-cost",
      "how-to-choose-a-software-development-company",
    ],
  },
  "ui-ux-design": {
    answer:
      "UI/UX design is shaping how a product looks and works, through research, user flows, wireframes and a polished interface, so it's intuitive, on-brand and built to convert.",
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
      "how-to-choose-a-software-development-company",
      "how-long-does-it-take-to-build-an-mvp",
    ],
  },
  "ai-automation": {
    answer:
      "AI automation uses AI and workflow automation to take manual, repetitive work off your team, from data entry and document processing to chat and decision support, so they can spend their time on higher-value work.",
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
    relatedWork: ["Madexa", "Muxoro", "OutNet"],
    relatedPosts: [
      "how-much-does-custom-software-development-cost",
      "how-to-choose-a-software-development-company",
    ],
  },
  "cloud-devops-hosting": {
    answer:
      "Cloud, DevOps and hosting is setting up reliable, scalable infrastructure and automated deployment pipelines, so your software ships faster, stays online and scales without nasty surprises.",
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
    relatedWork: ["Madexa", "North Bengal Agro Farms", "Muxoro"],
    relatedPosts: [
      "how-to-choose-a-software-development-company",
      "how-much-does-custom-software-development-cost",
    ],
  },
  "maintenance-support": {
    answer:
      "Software maintenance and support is keeping your product fast, secure and reliable after launch, through bug fixes, security patches, monitoring and ongoing improvements, so it keeps earning its keep.",
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
      "how-to-choose-a-software-development-company",
      "how-much-does-custom-software-development-cost",
    ],
  },
};

export function getServiceExtras(slug: string): ServiceExtras | undefined {
  return serviceExtras[slug];
}
