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
      "Bespoke software built around your exact workflows — from internal tools to mission-critical platforms.",
    metaTitle: "Custom Software Development Company",
    metaDescription:
      "Arrowbin builds custom software tailored to your business — web platforms, internal tools and enterprise systems. Scalable, secure and built to last.",
    keywords: [
      "custom software development",
      "bespoke software",
      "enterprise software development",
      "software development company",
      "custom web application development",
    ],
    intro:
      "Off-the-shelf tools force your business to bend around their limits. We build custom software that fits the way you actually work — eliminating manual steps, connecting your systems, and giving you a platform that scales as you grow.",
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
          "We map your workflows, goals and constraints into a clear scope.",
      },
      {
        title: "Architecture",
        description: "We design the data model, stack and system architecture.",
      },
      {
        title: "Agile build",
        description:
          "We ship in iterative sprints with regular demos and feedback.",
      },
      {
        title: "Launch & support",
        description: "We deploy, monitor, and keep improving after go-live.",
      },
    ],
    faqs: [
      {
        question: "How much does custom software development cost?",
        answer:
          "Most custom software projects range from $8,000 for a focused tool to $75,000+ for a full platform. The price depends on scope, integrations and complexity. We provide a fixed estimate after a short discovery call so there are no surprises.",
      },
      {
        question: "How long does it take to build custom software?",
        answer:
          "A minimum viable version typically takes 6–12 weeks. Larger platforms are delivered in phases so you get usable value early and we refine from real feedback.",
      },
      {
        question: "Do I own the source code?",
        answer:
          "Yes. You receive full ownership of the source code, documentation and infrastructure. There is no vendor lock-in.",
      },
    ],
  },
  {
    slug: "ecommerce-development",
    name: "E-commerce Development",
    heading: "E-commerce Development",
    icon: "cart",
    summary:
      "High-converting online stores and headless commerce that load fast and sell more.",
    metaTitle: "E-commerce Development Services",
    metaDescription:
      "Custom and headless e-commerce development that loads fast and converts — Shopify, headless storefronts and bespoke commerce platforms that scale.",
    keywords: [
      "ecommerce development",
      "ecommerce website development",
      "headless commerce",
      "shopify development agency",
      "online store development",
    ],
    intro:
      "Your storefront is your hardest-working salesperson. We build fast, conversion-focused e-commerce experiences — from Shopify and headless storefronts to fully custom commerce platforms — engineered to turn visitors into customers.",
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
        description: "We define your catalog, funnel and conversion goals.",
      },
      {
        title: "Design",
        description: "We craft a storefront experience built to sell.",
      },
      {
        title: "Build & integrate",
        description: "We connect payments, shipping and inventory.",
      },
      {
        title: "Optimize",
        description: "We measure, test and improve conversion after launch.",
      },
    ],
    faqs: [
      {
        question: "Which e-commerce platform is best for my business?",
        answer:
          "For most stores Shopify offers the fastest path to launch. If you need full design control, complex catalogs or high performance, a headless storefront on Next.js is the better fit. We recommend the right platform after understanding your catalog and goals.",
      },
      {
        question: "Can you migrate my existing store without losing SEO?",
        answer:
          "Yes. We migrate products, content and customers with 301 redirects and URL mapping so your search rankings are preserved.",
      },
      {
        question: "Will my store be fast and mobile-friendly?",
        answer:
          "Absolutely. We build mobile-first, performance-optimized storefronts that pass Core Web Vitals — which directly improves both conversions and Google rankings.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    heading: "Mobile App Development",
    icon: "mobile",
    summary:
      "Native-quality iOS and Android apps from a single codebase, built for performance.",
    metaTitle: "Mobile App Development Company",
    metaDescription:
      "iOS and Android app development that feels native and ships fast — cross-platform and native apps with React Native, Flutter and Swift.",
    keywords: [
      "mobile app development",
      "ios app development",
      "android app development",
      "react native development",
      "cross platform app development",
    ],
    intro:
      "We design and build mobile apps people love to use — fast, intuitive and reliable on every device. With cross-platform technology we deliver native-quality iOS and Android apps from one codebase, cutting cost and time to market.",
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
        description: "We scope features, platforms and the MVP.",
      },
      { title: "Design", description: "We prototype the flows and interface." },
      {
        title: "Develop",
        description: "We build, integrate and test on real devices.",
      },
      {
        title: "Ship & iterate",
        description: "We launch to the stores and improve from usage data.",
      },
    ],
    faqs: [
      {
        question: "Should I build a native or cross-platform app?",
        answer:
          "For most products, cross-platform (React Native or Flutter) delivers native-quality results from a single codebase — saving 30–40% versus building separately. We recommend fully native only when an app is extremely performance- or hardware-intensive.",
      },
      {
        question: "How much does it cost to build a mobile app?",
        answer:
          "A polished MVP usually ranges from $12,000 to $40,000 depending on features and integrations. We scope a fixed estimate after defining your core feature set.",
      },
      {
        question: "Do you handle App Store and Google Play submission?",
        answer:
          "Yes. We manage the full release — store listings, review compliance, builds and updates — so your app goes live smoothly.",
      },
    ],
  },
  {
    slug: "saas-product-engineering",
    name: "SaaS / Product Engineering",
    heading: "SaaS & Product Engineering",
    icon: "rocket",
    summary:
      "From MVP to scale — we engineer SaaS products with multi-tenancy, billing and analytics built in.",
    metaTitle: "SaaS Development & Product Engineering",
    metaDescription:
      "Arrowbin engineers SaaS products from MVP to scale — multi-tenant architecture, subscriptions, billing and analytics. Your product team, on demand.",
    keywords: [
      "saas development",
      "saas product engineering",
      "mvp development",
      "saas development company",
      "build a saas product",
    ],
    intro:
      "Building a SaaS product is a marathon of engineering decisions. We act as your product engineering team — validating an MVP quickly, then scaling it with the multi-tenancy, billing, security and observability a real SaaS business needs.",
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
        description: "We define the smallest product that proves value.",
      },
      {
        title: "Build MVP",
        description: "We ship a focused, sellable first version.",
      },
      {
        title: "Scale",
        description: "We harden architecture, billing and security.",
      },
      {
        title: "Grow",
        description: "We iterate on features driven by real usage.",
      },
    ],
    faqs: [
      {
        question: "How long does it take to build a SaaS MVP?",
        answer:
          "A focused SaaS MVP typically takes 8–14 weeks to launch. We prioritize the core workflow that proves value, then expand once you have paying users and feedback.",
      },
      {
        question: "Can you take over an existing SaaS codebase?",
        answer:
          "Yes. We regularly audit, refactor and scale existing products — improving performance, reliability and developer velocity without a full rewrite.",
      },
      {
        question: "Do you help with subscriptions and billing?",
        answer:
          "Yes. We implement plans, trials, metered usage and the full Stripe billing lifecycle, including invoicing and dunning.",
      },
    ],
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    heading: "UI/UX Design",
    icon: "palette",
    summary:
      "Research-driven product design that's beautiful, accessible and built to convert.",
    metaTitle: "UI/UX Design Services",
    metaDescription:
      "User-centered UI/UX design for web and mobile — research, wireframes, design systems and high-fidelity interfaces that are beautiful and convert.",
    keywords: [
      "ui ux design services",
      "product design agency",
      "ui design",
      "ux design",
      "web app design",
    ],
    intro:
      "Great design is invisible — it just works. We combine user research, clean visual design and proven UX patterns to create interfaces that feel effortless, build trust, and turn visitors into customers.",
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
        description: "We learn your users, goals and competitors.",
      },
      {
        title: "Wireframe",
        description: "We structure flows and layouts before visuals.",
      },
      {
        title: "Design",
        description: "We craft polished, on-brand interfaces.",
      },
      {
        title: "Handoff",
        description: "We deliver dev-ready files and a design system.",
      },
    ],
    faqs: [
      {
        question: "What's the difference between UI and UX design?",
        answer:
          "UX (user experience) design shapes how a product works — the flows, structure and usability. UI (user interface) design shapes how it looks — the visual style, typography and components. We deliver both as one cohesive process.",
      },
      {
        question: "Do you provide developer-ready design files?",
        answer:
          "Yes. We deliver organized Figma files with components, tokens and specs, plus a design system your developers can build from directly.",
      },
      {
        question: "Can you redesign my existing product?",
        answer:
          "Absolutely. We run a UX audit, identify friction and opportunities, and redesign with measurable goals like higher conversion and retention.",
      },
    ],
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    heading: "AI Automation",
    icon: "sparkles",
    summary:
      "Put AI to work — custom assistants, agents and automations that save your team hours.",
    metaTitle: "AI Automation Services",
    metaDescription:
      "Arrowbin builds AI automation, chatbots, agents and LLM integrations that cut manual work and unlock new capabilities. Practical AI that delivers ROI.",
    keywords: [
      "ai automation",
      "ai automation services",
      "ai agent development",
      "llm integration",
      "custom ai chatbot development",
    ],
    intro:
      "AI is only useful when it solves a real problem. We build practical AI automations — assistants, agents, document processing and LLM integrations — that remove repetitive work, surface insights, and give your team superpowers.",
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
        description: "We find the highest-ROI automation opportunity.",
      },
      {
        title: "Prototype",
        description: "We build a proof of concept to validate value.",
      },
      {
        title: "Integrate",
        description: "We connect AI into your tools and data securely.",
      },
      {
        title: "Refine",
        description: "We monitor quality and improve accuracy over time.",
      },
    ],
    faqs: [
      {
        question: "What can AI automation actually do for my business?",
        answer:
          "Common high-value uses include customer support chatbots, automated document and data processing, content generation, lead qualification, and internal knowledge assistants. We focus on automations with a clear, measurable return.",
      },
      {
        question: "Is my data safe when using AI?",
        answer:
          "Yes. We use enterprise AI APIs with no-training data policies, keep sensitive data isolated, and can deploy private or on-prem models when required.",
      },
      {
        question: "Will AI give accurate answers about my business?",
        answer:
          "We use retrieval-augmented generation (RAG) so the AI answers from your verified content and documents — dramatically reducing incorrect or made-up responses.",
      },
    ],
  },
  {
    slug: "cloud-devops-hosting",
    name: "Cloud, DevOps & Hosting",
    heading: "Cloud, DevOps & Hosting",
    icon: "cloud",
    summary:
      "Reliable, secure cloud infrastructure with automated deployments and 24/7 uptime.",
    metaTitle: "Cloud, DevOps & Hosting Services",
    metaDescription:
      "Arrowbin sets up scalable cloud infrastructure, CI/CD pipelines and managed hosting on AWS, GCP and Vercel — secure, automated and built for uptime.",
    keywords: [
      "devops services",
      "cloud infrastructure services",
      "managed hosting",
      "ci cd pipeline setup",
      "aws cloud consulting",
    ],
    intro:
      "Slow deploys and fragile servers hold great products back. We build cloud infrastructure that's secure, automated and scalable — with CI/CD pipelines, monitoring and managed hosting that keep your product fast and online.",
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
        description: "We review your current infrastructure and needs.",
      },
      {
        title: "Design",
        description: "We architect a secure, scalable cloud setup.",
      },
      {
        title: "Automate",
        description: "We implement CI/CD, monitoring and IaC.",
      },
      {
        title: "Manage",
        description: "We keep it running with monitoring and support.",
      },
    ],
    faqs: [
      {
        question: "Which cloud provider should I use?",
        answer:
          "It depends on your stack and team. AWS and Google Cloud are ideal for complex, scalable systems; Vercel is excellent for fast, modern web apps. We recommend the right mix based on your product and budget.",
      },
      {
        question: "Can you reduce my cloud bill?",
        answer:
          "Often, yes. We audit usage, right-size resources, add auto-scaling and remove waste — frequently cutting cloud costs by 20–40% while improving reliability.",
      },
      {
        question: "Do you offer ongoing infrastructure management?",
        answer:
          "Yes. We offer managed DevOps with monitoring, security updates and on-call support so your team can focus on the product.",
      },
    ],
  },
  {
    slug: "maintenance-support",
    name: "Maintenance & Support",
    heading: "Maintenance & Support",
    icon: "shield",
    summary:
      "Keep your software fast, secure and evolving with proactive maintenance and support.",
    metaTitle: "Software Maintenance & Support Services",
    metaDescription:
      "Ongoing software maintenance and support — bug fixes, security updates, performance tuning and new features. Keep your product healthy and growing.",
    keywords: [
      "software maintenance services",
      "website maintenance",
      "application support services",
      "software support company",
      "ongoing development support",
    ],
    intro:
      "Software is never truly finished. We keep your applications secure, fast and reliable with proactive maintenance — applying updates, fixing issues, monitoring performance and continuously shipping improvements so your product keeps getting better.",
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
        description: "We learn your codebase, stack and priorities.",
      },
      {
        title: "Stabilize",
        description: "We fix urgent issues and harden the system.",
      },
      {
        title: "Maintain",
        description: "We monitor, update and support on an SLA.",
      },
      {
        title: "Evolve",
        description: "We ship ongoing improvements and new features.",
      },
    ],
    faqs: [
      {
        question: "Do you maintain software you didn't originally build?",
        answer:
          "Yes. We start with a code and infrastructure audit to understand your system, then take over maintenance with a clear plan to stabilize and improve it.",
      },
      {
        question: "How does your support pricing work?",
        answer:
          "We offer monthly retainers sized to your needs — from essential security and uptime cover to dedicated ongoing development. You get a predictable cost and a defined response SLA.",
      },
      {
        question: "What's your response time for critical issues?",
        answer:
          "Critical, production-down issues are prioritized immediately under our SLA, with defined response and resolution targets agreed in your plan.",
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
      "Custom software development is the process of designing and building software tailored to your exact business — your workflows, data and users — instead of forcing your team to adapt to generic, off-the-shelf tools.",
    outcomes: [
      { value: "100%", label: "Source code ownership" },
      { value: "6–12 wk", label: "To a usable first version" },
      { value: "0", label: "Per-seat license fees" },
    ],
    idealFor: [
      "Teams outgrowing spreadsheets, manual steps or disconnected tools",
      "Businesses with a workflow no off-the-shelf product fits",
      "Companies that need systems to talk to each other via integrations",
      "Founders building a platform they need to own outright",
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
      "E-commerce development is building a fast, conversion-focused online store — from storefront and checkout to payments, inventory and integrations — designed to turn visitors into paying customers.",
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
      "Mobile app development is designing and building native or cross-platform apps for iOS and Android that are fast, intuitive and built to scale with your users.",
    outcomes: [
      { value: "iOS + Android", label: "From one codebase" },
      { value: "Native", label: "Feel and performance" },
      { value: "Store-ready", label: "Launch and updates" },
    ],
    idealFor: [
      "Startups taking an idea to the app stores",
      "Businesses extending a product to mobile",
      "Teams needing offline, push or device features",
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
      "SaaS product engineering is building a multi-tenant software-as-a-service product end to end — accounts, subscription billing, dashboards and the reliability customers expect from something they pay for monthly.",
    outcomes: [
      { value: "Multi-tenant", label: "Built to scale" },
      { value: "Billing", label: "Subscriptions ready" },
      { value: "MVP-first", label: "Launch, then grow" },
    ],
    idealFor: [
      "Founders launching a SaaS MVP",
      "Teams adding multi-tenancy, roles and billing",
      "Products scaling from first users to many",
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
      "UI/UX design is shaping how a product looks and works — research, user flows, wireframes and a polished interface — so it's intuitive, on-brand and built to convert.",
    outcomes: [
      { value: "Research", label: "Grounded in real users" },
      { value: "Design system", label: "Consistent at scale" },
      { value: "Convert", label: "Usable, on-brand UI" },
    ],
    idealFor: [
      "Products that feel clunky or confusing to use",
      "Teams needing a design system for consistency",
      "Founders shaping a product before building it",
      "Brands wanting a polished, conversion-ready interface",
    ],
    relatedWork: ["Brandingly", "OutNet", "Maneel Club"],
    relatedPosts: [
      "how-to-choose-a-software-development-company",
      "how-long-does-it-take-to-build-an-mvp",
    ],
  },
  "ai-automation": {
    answer:
      "AI automation is using AI and workflow automation to remove manual, repetitive work — from data entry and document processing to chat and decision support — so your team focuses on higher-value tasks.",
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
      "Cloud, DevOps and hosting is setting up reliable, scalable infrastructure and automated deployment pipelines — so your software ships faster, stays online, and scales without surprises.",
    outcomes: [
      { value: "Reliable", label: "Uptime & monitoring" },
      { value: "Automated", label: "CI/CD pipelines" },
      { value: "Scalable", label: "Cloud-native infra" },
    ],
    idealFor: [
      "Teams with slow, manual or fragile deployments",
      "Products needing to scale reliably under load",
      "Companies migrating to the cloud",
      "Businesses that need monitoring and peace of mind",
    ],
    relatedWork: ["Madexa", "North Bengal Agro Farms", "Muxoro"],
    relatedPosts: [
      "how-to-choose-a-software-development-company",
      "how-much-does-custom-software-development-cost",
    ],
  },
  "maintenance-support": {
    answer:
      "Software maintenance and support is keeping your product fast, secure and reliable after launch — bug fixes, security patches, monitoring and ongoing improvements — so it keeps delivering value.",
    outcomes: [
      { value: "Secure", label: "Patched & monitored" },
      { value: "Reliable", label: "Issues fixed fast" },
      { value: "Evolving", label: "Continuous improvement" },
    ],
    idealFor: [
      "Teams whose product needs ongoing upkeep",
      "Businesses that inherited software to maintain",
      "Founders without an in-house engineering team",
      "Products needing security patches and monitoring",
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
