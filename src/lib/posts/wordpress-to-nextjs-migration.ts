import type { Post } from "@/lib/blog";
import { site } from "@/lib/site";

const DIR = "/blog/wordpress-to-nextjs-migration";

export const post: Post = {
  slug: "wordpress-to-nextjs-migration",
  title: "WordPress to Next.js Migration: Steps, SEO and Cost Drivers",
  description:
    "WordPress to Next.js migration, step by step: how to keep Google rankings with 308 redirects and 410s, what drives cost, and when WordPress still wins.",
  keywords: [
    "wordpress to next.js migration",
    "migrate wordpress to next.js",
    "headless wordpress next.js",
    "wordpress to next.js seo",
    "wordpress to next.js redirects",
    "woocommerce to next.js",
    "next.js vs wordpress",
  ],
  date: "2026-10-15",
  dateLabel: "October 15, 2026",
  author: "Md. Shishir Ahmed",
  readingTime: "15 min read",
  category: "Guides",
  excerpt:
    "Every live site in our portfolio started on WordPress and now runs on Next.js, and so does arrowbin.com. This is the process we follow, the SEO details that protect rankings, and when a move isn't worth it.",
  image: {
    src: `${DIR}/cover.webp`,
    alt: "Mockup of a rebuilt Next.js storefront in a browser, beside a redirect map of old WordPress URLs and a terminal showing 308 and 410 responses",
    width: 1280,
    height: 720,
  },
  tldr: "A WordPress to Next.js migration pays off when slow pages, plugin upkeep or custom features are costing you money, and it's rarely worth it when editors publish daily on a site that already works. Most of the risk sits in the URLs: map every old address, give each one a permanent 308 redirect to its closest new page or a 410 Gone if you removed it on purpose, and keep those redirects for at least a year. Google says to expect temporary ranking movement during any site move, so settle the redirect map and the plan for plugins and store data before anyone writes code.",
  body: [
    {
      type: "p",
      text: "If your WordPress site is slow, breaks after plugin updates or got hacked last year, someone has probably told you to move it to Next.js. Sometimes that's the right call. It's also how a business ends up with a fast new site that Google can't connect to the old one, because nobody mapped the old URLs.",
    },
    {
      type: "p",
      text: "We've made this move for every live site in our portfolio (you can browse the [sites we have moved from WordPress to Next.js](/work)), and for arrowbin.com itself, which replaced an older WordPress site. Below is the process we follow, including the cases where I'd tell you to stay put.",
    },
    {
      type: "p",
      text: "It's written for owners, with a deeper redirect section for whoever does the build.",
    },

    { type: "h2", text: "Should you move from WordPress to Next.js?" },
    {
      type: "p",
      text: "Move when speed, security upkeep or custom features are costing you money. Stay on WordPress when non-technical editors publish every day, the site works and the budget is tight.",
    },
    {
      type: "p",
      text: "WordPress isn't a bad tool. W3Techs counts it on [40.0% of all websites](https://w3techs.com/technologies/details/cm-wordpress), and on 58.5% of the sites whose CMS it can identify. When one platform runs that much of the web, it gets blamed for problems that really come from how a particular site was built.",
    },
    {
      type: "p",
      text: "Speed is where the gap shows. In the HTTP Archive's [2025 Web Almanac CMS chapter](https://almanac.httparchive.org/en/2025/cms), 45% of WordPress sites passed Core Web Vitals on mobile, among the lowest-ranked platforms, against 85% for Duda and 74% for Wix. That chapter also estimates that around 60% of WordPress sites use a page builder. When we audit a slow WordPress site, a page builder plus a stack of plugins that each load their own scripts is the pattern we usually find.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/cwv-pass-rate-by-cms.svg`,
        alt: "Bar chart of 2025 mobile Core Web Vitals pass rates by CMS: Duda 85%, TYPO3 CMS 79%, Wix 74%, Weebly 47% and WordPress 45%, among the lowest-ranked",
        caption:
          "Mobile Core Web Vitals pass rate by CMS. Source: HTTP Archive Web Almanac 2025, CMS chapter.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Those figures describe WordPress sites as a group. They don't prove your rebuild will pass, and a careless Next.js build can be slow too.",
    },
    {
      type: "p",
      text: "There are three realistic setups, and the middle one is the one people forget.",
    },
    {
      type: "table",
      headers: [
        "Option",
        "Editing experience",
        "Plugin dependency",
        "Security upkeep",
        "Speed work needed",
        "Who can maintain it",
        "Best for",
      ],
      rows: [
        [
          "WordPress as is",
          "The admin your team already knows",
          "High: most features are plugins",
          "Frequent updates across core and plugins",
          "Caching plugins plus a lighter theme",
          "Any WordPress developer",
          "Content-heavy sites with daily publishing and a small budget",
        ],
        [
          "Headless WordPress + Next.js",
          "Same WordPress admin; preview needs extra setup",
          "Low: content plugins only",
          "Still patched, but the admin can sit off the main domain",
          "Mostly handled by pre-rendering and a CDN",
          "A Next.js developer plus WordPress know-how",
          "Teams who like the WordPress editor but need a faster front end",
        ],
        [
          "Next.js + another CMS or Markdown",
          "A hosted CMS, or files in Git for developer-run sites",
          "None from WordPress",
          "Dependency updates and the CMS vendor's security",
          "Mostly handled by pre-rendering and a CDN, as with headless",
          "A Next.js developer",
          "Mostly static marketing sites, or sites where plugins are the problem",
        ],
      ],
    },
    {
      type: "p",
      text: "I'd tell you not to migrate if your editors publish several times a day, lean on plugins for their workflow, and the site already loads quickly on a phone. A rebuild there buys you a developer dependency and not much else. Spend the money on a lighter theme and fewer plugins instead.",
    },

    {
      type: "h2",
      text: "What are the steps in a WordPress to Next.js migration?",
    },
    {
      type: "p",
      text: "Inventory every URL and plugin, decide where content will live, map old URLs to new ones, rebuild the templates as components, port the SEO metadata, test on staging, then switch DNS and watch Search Console. People tend to skip the inventory and the redirect map. Those two steps are what protect your rankings.",
    },
    {
      type: "ol",
      items: [
        "Crawl the live site and export every URL, archive pages included, plus anything listed in the sitemap. Pull top landing pages from Search Console too, because old URLs with backlinks often aren't in the sitemap anymore. Your developer runs the crawl; you say which pages still matter.",
        "List every active plugin and write down what it actually does on your site, not what its name says.",
        "Decide where content will live: WordPress as a headless CMS, a hosted CMS, or Markdown files in the code repository. You decide, with your developer's advice.",
        "Build the redirect map, one row per old URL, ending in a new URL, a 308 or a 410. Your developer drafts it and you sign it off.",
        "Rebuild each template as a Next.js component: home, page, post, archive, product. Count templates, not pages.",
        "Port the SEO layer: titles, descriptions, canonical tags, Open Graph images, structured data, the XML sitemap and robots rules.",
        "Move the content and media, then spot-check formatting. Shortcodes and page-builder markup rarely survive an export cleanly.",
        "Test on a staging URL that search engines can't index, including checkout emails and every row of the redirect map.",
        "Switch DNS, submit the new sitemap, and watch Search Console daily for two weeks while you watch leads and sales.",
      ],
    },
    {
      type: "image",
      image: {
        src: `${DIR}/migration-phases.svg`,
        alt: "Gantt-style diagram of the seven overlapping phases of a WordPress to Next.js migration, from the URL inventory to a 30-day watch in Search Console after the DNS cutover",
        caption:
          "The order of a migration. Illustrative: bars show sequence and overlap, not week counts.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Counting templates instead of pages matters more than it sounds. Say you have a blog with 400 posts that all share one post template, and a 30-page site where every page was hand-built in Elementor. Of the two, the blog is the smaller job. Each of those hand-built pages is its own template in disguise.",
    },
    {
      type: "cta",
      title: "Planning a move off WordPress?",
      text: "A URL is enough to start. We'll look at what the templates and redirects involve and give you a fixed estimate before anything gets built.",
      href: "/contact",
      label: "Get a migration estimate",
    },

    {
      type: "h2",
      text: "Should you keep WordPress as a headless CMS or move the content out?",
    },
    {
      type: "p",
      text: "Keep WordPress headless if your editors rely on its admin and revision history every week. Move the content out when the site is mostly static, or when the plugins are the very thing you're trying to escape.",
    },
    {
      type: "p",
      text: "Headless means WordPress stops rendering pages. Editors still log in to the same admin, and Next.js fetches the content and builds the public site. You can fetch it two ways:",
    },
    {
      type: "ul",
      items: [
        "WordPress's built-in REST API returns posts and pages as JSON, with no extra plugin to install.",
        "[WPGraphQL](https://www.wpgraphql.com/), a free, open-source plugin, adds a GraphQL API, so a page can ask for exactly the fields it needs in one request.",
      ],
    },
    {
      type: "p",
      text: "We default to REST on small sites, since it's one fewer plugin to keep updated. WPGraphQL earns its place when a page pulls from many related content types at once.",
    },
    {
      type: "p",
      text: "Headless breaks a few things editors are used to. Budget for fixing them:",
    },
    {
      type: "ul",
      items: [
        "Preview. The Preview button points at the old theme, so it has to be wired to Next.js draft mode before editors can see unpublished posts.",
        "Publishing delay. Pre-rendered pages need a webhook that tells Next.js to revalidate when a post changes, or editors will wonder why their fix isn't live.",
        "Front-end plugins. Anything that injects HTML into the theme, like a slider or a page-builder layout, never reaches the Next.js site.",
        "Roles and revisions keep working as before, because they live in the admin.",
      ],
    },
    {
      type: "p",
      text: "The real cost is running two systems: a WordPress install that still needs updates, and a Next.js app that needs deploys. Headless shrinks what the public can reach. It doesn't remove WordPress maintenance. If nobody on your team actually likes the WordPress editor, move the content out and stop paying for both.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/three-architectures.svg`,
        alt: "Architecture diagram comparing classic WordPress, headless WordPress feeding Next.js through the REST API or WPGraphQL, and Next.js with a hosted CMS or Markdown, showing what each exposes to the public",
        caption:
          "Three setups after the move, and what a visitor's request reaches in each.",
        width: 1280,
        height: 720,
      },
    },

    {
      type: "h2",
      text: "How do you keep your Google rankings during the move?",
    },
    {
      type: "p",
      text: "Give every old URL a server-side permanent redirect to its closest new page, return 410 Gone for pages you're deleting on purpose, and keep the redirects for at least a year. Even when you do all of that, expect some ranking movement for a few weeks.",
    },
    {
      type: "p",
      text: "That's Google's own advice. Its [site-move guide](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) says to keep redirects for at least a year as a general rule and to expect temporary fluctuation in rankings. It also warns against sending lots of old URLs to one irrelevant page such as the homepage, and against chains of redirects.",
    },
    { type: "h3", text: "301 or 308?" },
    {
      type: "p",
      text: "In Next.js, a rule in the redirects list of next.config.ts with permanent set to true returns a 308, per the [Next.js redirecting guide](https://nextjs.org/docs/app/guides/redirecting). Google's [HTTP status code documentation](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes) treats 308 as equivalent to 301. So don't let anyone sell you a '301 fix' for a Next.js site. It's the same signal.",
    },
    { type: "h3", text: "What if you have thousands of old URLs?" },
    {
      type: "p",
      text: "The same Next.js guide notes that Vercel caps config redirects at 1,024 and points you to Proxy for anything past about a thousand. A WordPress site with years of posts and date archives can pass that easily.",
    },
    {
      type: "p",
      text: "Two habits keep the list short. Use patterns first: if old posts lived at /2021/04/post-name, one rule that matches /:year/:month/:slug (with year and month limited to digits) and sends it to /blog/:slug covers all of them. Then put the long tail in a lookup that runs in [Proxy](https://nextjs.org/docs/app/api-reference/file-conventions/proxy), the file Next.js 16 calls proxy.ts now that middleware has been renamed.",
    },
    { type: "h3", text: "How Arrowbin handles its own old URLs" },
    {
      type: "p",
      text: "Our own domain had two earlier lives: a WordPress site and, later, a marketplace. Our cleanup splits their leftover URLs into two groups. Pages with a real equivalent, like /contact-us, /about-us and /portfolio, get a permanent redirect in next.config.ts to /contact, /about and /work. Pages with nothing to replace them, such as the old /become-seller page, are matched in src/proxy.ts and answer 410 Gone with an x-robots-tag: noindex header.",
    },
    {
      type: "p",
      text: "Spam links that tacked a ?channel= parameter onto the homepage get their own rule in the same proxy file: a 308 to the clean homepage, so the junk variant drops out of the index. One ordering detail matters. Next.js runs config redirects before Proxy, so if a URL sits in both lists, the redirect wins.",
    },
    { type: "h3", text: "Is a 410 better than a 404?" },
    {
      type: "p",
      text: "Not for Google, going by its documentation. Google says all 4xx errors except 429 are treated the same, and indexed URLs that return one are removed from the index. We still use 410 for deliberate removals because it records a decision.",
    },
    {
      type: "p",
      text: "[RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html#name-410-gone), the HTTP standard, describes 410 as a resource that's no longer available and likely gone for good. A 404 could just as easily be a typo or a broken deploy. When someone audits the site next year, a 410 says the page was removed on purpose; a 404 sends them off to investigate.",
    },
    {
      type: "p",
      text: "Redirects are half the job. Porting what your SEO plugin did, pointed at the new URLs, is the other half. On a store, the Product schema in the table below is also what AI shopping assistants read, and our guide to [getting products into ChatGPT shopping](/blog/chatgpt-shopping-for-online-stores) covers it.",
    },
    {
      type: "table",
      headers: ["What WordPress handled", "Where it lives in Next.js 16"],
      rows: [
        [
          "SEO title and meta description (Yoast, Rank Math)",
          "The metadata export or generateMetadata in each route",
        ],
        [
          "Canonical URL",
          "alternates.canonical in the same metadata, using the new URL",
        ],
        [
          "XML sitemap",
          "app/sitemap.ts, generated from your content, new URLs only",
        ],
        ["robots.txt", "app/robots.ts or a static file"],
        [
          "Open Graph image",
          "An opengraph-image file per route, or openGraph.images",
        ],
        [
          "Schema (Article, Product, BreadcrumbList)",
          "A JSON-LD script rendered in the page",
        ],
        [
          "Redirects (Redirection plugin)",
          "redirects in next.config.ts, or Proxy for large maps",
        ],
        [
          "Internal links inside old content",
          "Rewritten to point straight at new URLs, not through redirects",
        ],
      ],
    },
    {
      type: "image",
      image: {
        src: `${DIR}/redirect-decision-flow.svg`,
        alt: "Flowchart for each old WordPress URL: keep the URL if it is unchanged, 308 redirect to the new or closest page, 308 to the clean URL for spam parameters, or return 410 Gone with noindex when the page was removed on purpose",
        caption:
          "One decision per row of the redirect map. Based on Google's site-move guide and arrowbin.com's own setup.",
        width: 1280,
        height: 720,
      },
    },

    { type: "h2", text: "What happens to plugins, forms and WooCommerce?" },
    {
      type: "p",
      text: "Each plugin's job gets rebuilt as code, replaced with a service, or dropped. Write down what every plugin actually does before you start, because some do more than their name suggests.",
    },
    {
      type: "p",
      text: "A classic surprise is an SEO plugin that was also running your redirects, or a forms plugin that stored every lead in the database your sales team checks each morning. Neither looks critical in a plugin list. Both break quietly.",
    },
    {
      type: "table",
      headers: [
        "Plugin type",
        "What it did",
        "Next.js replacement",
        "Watch-out",
      ],
      rows: [
        [
          "SEO (Yoast, Rank Math)",
          "Titles, meta, sitemap, schema",
          "Metadata API, sitemap.ts, JSON-LD",
          "It may also have run your redirects",
        ],
        [
          "Forms (Contact Form 7, Gravity Forms)",
          "Fields, email, stored entries",
          "A route handler plus an email service",
          "Export old entries before WordPress goes away",
        ],
        [
          "Caching (WP Rocket, W3 Total Cache)",
          "Page cache, minified files",
          "Static rendering and a CDN",
          "Pages rendered per request need a cache plan",
        ],
        [
          "Security (Wordfence)",
          "Firewall, login protection",
          "Host or CDN firewall; no public admin",
          "A headless admin still needs it",
        ],
        [
          "Page builder (Elementor, Divi)",
          "Layout for every page",
          "React components",
          "Layouts get rebuilt by hand, not exported",
        ],
        [
          "WooCommerce",
          "Catalog, cart, orders, accounts",
          "Headless WooCommerce, custom checkout or Shopify",
          "Order history and customer logins",
        ],
        [
          "Payments (Stripe, SSLCommerz, bKash)",
          "Checkout and payment callbacks",
          "Server-side gateway integration",
          "Callback URLs must point at new routes",
        ],
        [
          "Multilingual (WPML, Polylang)",
          "Translations, hreflang",
          "Locale routes and hreflang in metadata",
          "Each language needs its own redirect rows",
        ],
      ],
    },
    { type: "h3", text: "WooCommerce stores" },
    {
      type: "p",
      text: "A store has three realistic routes, and the right one depends on how much of WordPress you want to keep.",
    },
    {
      type: "ul",
      items: [
        "Keep WooCommerce as the back end and build a Next.js storefront on top. WooCommerce's [Store API](https://developer.woocommerce.com/docs/apis/store-api/) offers public endpoints for cart and checkout. Products and orders stay where they are. You still patch WordPress and WooCommerce, and checkout extensions that inject their own front-end UI won't show up.",
        "Move to a custom storefront and checkout. Products and orders move to your own database or a commerce back end, and you own the checkout flow end to end, including local gateways like bKash and Nagad. It's the most work, and it gives you the most control.",
        "Move to Shopify. If you'd rather not run commerce infrastructure at all, a hosted platform is a sensible answer, and it doesn't have to involve Next.js. Our [Shopify vs custom store comparison](/blog/shopify-vs-custom-ecommerce) runs the fee maths for that choice.",
      ],
    },
    {
      type: "p",
      text: "Whichever route you take, plan order history and customer accounts first. Customers expect to log in and see past orders. WordPress stores passwords as hashes that can't be turned back into passwords, so you either keep WordPress handling logins, import the hashes into an auth system that can verify them, or send every customer a reset link. Decide before launch, not when the first complaint arrives.",
    },
    {
      type: "p",
      text: "Payment gateways need the same care. Each one has callback or webhook URLs pointing at the old WooCommerce endpoints, and those have to move with the checkout. It's the part we test hardest when we [move a WooCommerce store to a custom storefront](/services/ecommerce-development). For bKash and SSLCommerz, our [Bangladesh payment gateway guide](/blog/payment-gateway-integration-bangladesh) walks through the callback and validation flow.",
    },

    {
      type: "h2",
      text: "How long does a WordPress to Next.js migration take?",
    },
    {
      type: "p",
      text: "It depends mostly on how many distinct page templates you have, how many plugins need replacing, and whether there's a store. A brochure site with a handful of templates is a small project. A WooCommerce store with local payment gateways and years of order history is a big one.",
    },
    {
      type: "p",
      text: "We don't publish a standard week count, because two sites with the same number of pages can be completely different jobs. What we can tell you is which way each driver pushes.",
    },
    {
      type: "table",
      headers: ["Driver", "Keeps it small", "Makes it bigger"],
      rows: [
        [
          "Page templates",
          "A handful, mostly text and images",
          "Dozens, each built in a page builder",
        ],
        [
          "Content",
          "Clean posts and pages",
          "Thousands of posts full of shortcodes and embeds",
        ],
        ["Store", "No store", "WooCommerce with variants and order history"],
        [
          "Integrations",
          "One contact form",
          "Payment gateways, courier APIs, a CRM",
        ],
        ["Languages", "One", "Several, each with its own URLs"],
        [
          "Redirect map",
          "Same URL structure kept",
          "New structure and thousands of old URLs",
        ],
      ],
    },
    {
      type: "image",
      image: {
        src: `${DIR}/migration-drivers.svg`,
        alt: "Illustrative chart placing a brochure site and a WooCommerce store on six migration drivers, with the store further toward more work on nearly every one",
        caption:
          "Same platform move, very different jobs. Illustrative profiles (Arrowbin estimate), not client data.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "There's also a clock you don't control. After launch, Google has to recrawl and reprocess your old URLs, and its site-move guide puts that at a few weeks for most pages on a small to medium site. Bigger sites take longer. Don't launch the week before your biggest sale.",
    },

    {
      type: "h2",
      text: "What does a WordPress to Next.js migration cost, and what drives it?",
    },
    {
      type: "p",
      text: "Cost follows the same drivers as the timeline: templates, plugin replacements, e-commerce and the redirect work. After launch, hosting can cost less or more than your WordPress hosting did, depending on traffic and how many pages are rendered for each visitor instead of served from a cache.",
    },
    {
      type: "p",
      text: "I won't put a typical price on it here, because it would be a guess about your site. Rates are the other half of the number, and our guide to [what custom development costs](/blog/how-much-does-custom-software-development-cost) breaks those down by region and project type.",
    },
    {
      type: "table",
      headers: ["Cost item", "One-off or ongoing", "What makes it bigger"],
      rows: [
        [
          "Inventory and redirect map",
          "One-off",
          "Many old URLs, a changed structure",
        ],
        [
          "Content and media migration",
          "One-off",
          "Shortcodes, builder markup, embeds",
        ],
        ["Plugin replacements", "One-off", "Forms, search, memberships"],
        ["Store and checkout", "One-off", "Gateways, order history, accounts"],
        ["Hosting", "Ongoing", "Server rendering, high traffic"],
        [
          "Hosted CMS, if you use one",
          "Ongoing",
          "Editor seats, content volume",
        ],
        ["Maintenance", "Ongoing", "Dependency updates, a headless WordPress"],
      ],
    },
    {
      type: "p",
      text: "Hosting surprises people in both directions. Pages that are pre-rendered and served from a CDN are cheap to host. Pages rendered on the server for every visitor use compute, and a headless setup means paying for WordPress hosting and Next.js hosting at the same time.",
    },
    {
      type: "p",
      text: "You don't need Vercel, either. The [Next.js deployment docs](https://nextjs.org/docs/app/getting-started/deploying) list a Node.js server and a Docker container as options that support every feature, so a VPS you already pay for can run it. If you'd rather hand that side off, it's what our [hosting and deploys for Next.js](/services/cloud-devops-hosting) work covers.",
    },
    {
      type: "p",
      text: "The most expensive way to migrate, in my view, is copying every page-builder layout pixel for pixel. Rebuilding into a small set of well-made templates costs less now, and less every time you change the site later.",
    },

    { type: "h2", text: "Is Next.js more secure than WordPress?" },
    {
      type: "p",
      text: "A Next.js site has a smaller public attack surface, because by default there's no public admin login and no plugin code running on every request. It still needs patched dependencies, careful handling of secrets and secure hosting.",
    },
    {
      type: "p",
      text: "Owners ask this for good reason. Patchstack's [State of WordPress Security in 2026](https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/) counted 11,334 new vulnerabilities in the WordPress ecosystem in 2025, 42% more than in 2024. 91% were in plugins and 9% in themes. WordPress core had only 6, all low priority.",
    },
    {
      type: "p",
      text: "Two other figures from that report matter more to a small business. 46% of those vulnerabilities had no fix from the developer by the time they were publicly disclosed, and Patchstack puts the weighted median time to first exploit at 5 hours. If you run 30 plugins and check for updates once a month, that math isn't on your side.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/wordpress-vulnerabilities-2025.svg`,
        alt: "Chart of 2025 WordPress vulnerabilities: 11,334 new, 91% in plugins and 9% in themes, 46% unpatched at disclosure, a 5-hour weighted median time to first exploit, and only 6 in WordPress core",
        caption:
          "Where WordPress vulnerabilities came from in 2025. Source: Patchstack, State of WordPress Security in 2026.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "So WordPress core is in decent shape. The risk is the plugins you add, and a Next.js site removes most of that layer. It doesn't make the site hack-proof. These still need care on a Next.js site:",
    },
    {
      type: "ul",
      items: [
        "npm dependencies, Next.js included. A security release only protects you once it's deployed.",
        "Secrets. Only environment variables prefixed with NEXT_PUBLIC_ reach the browser, so an API key must never carry that prefix.",
        "Route handlers and server functions. They're public endpoints, and the Next.js Proxy docs advise checking authentication inside each server function rather than relying on Proxy alone.",
        "Forms. A contact form without spam protection and rate limits is an open invitation to bots.",
        "A headless WordPress admin. It still needs updates and login protection, and it's safer on a separate, restricted subdomain.",
      ],
    },
    {
      type: "p",
      text: "On either platform, security comes down to someone owning the updates. If that won't be you, arrange for someone to [keep the new site patched](/services/maintenance-support) from day one. Our maintenance cost guide shows how to size [the yearly upkeep budget after the move](/blog/software-maintenance-cost).",
    },

    {
      type: "h2",
      text: "What should you check in the first 30 days after launch?",
    },
    {
      type: "p",
      text: "Watch Search Console's Page indexing report daily for the first two weeks, especially its 'Not found (404)' list, re-crawl your full list of old URLs against the live site, and fix any redirect that lands on the wrong page. Then test the money paths again, from forms to checkout to analytics tags.",
    },
    {
      type: "ol",
      items: [
        "Launch day: run your inventory of old URLs through a crawler and confirm each one returns its planned 308 or 410 in a single hop.",
        "Launch day: submit the new sitemap in Search Console and request indexing for your most important pages.",
        "Days 1–14: check the Page indexing report every morning. Old URLs listed as 'Page with redirect' are expected; a jump in 'Not found (404)' means a gap in the map.",
        "Days 1–14: place a real order and send a real form, then confirm the emails and payment callbacks arrive.",
        "Week 2: compare conversions and analytics events with the old site's numbers, so a missing tag shows up before the monthly report does.",
        "Weeks 3–4: open the Core Web Vitals report. It's built from real-user data gathered over several weeks, so lean on lab tests until it fills in.",
        "Day 30: confirm backups of the new content store, and keep a full export of the old WordPress database somewhere safe.",
      ],
    },
    {
      type: "p",
      text: "Then leave the redirects alone. Google asks for at least a year. We keep them indefinitely, since a line in a config file costs nothing and old backlinks don't expire.",
    },

    { type: "h2", text: "What can you do now if the move is a year away?" },
    {
      type: "p",
      text: "Start with the inventory, even if you don't move for a year. Export every URL, list every plugin with what it does, and mark the pages that bring in leads or sales. That one spreadsheet tells you if this is a small rebuild or a store migration, and it's what any honest quote should be built on.",
    },
    {
      type: "p",
      text: `If it says you should move, we [rebuild WordPress sites on Next.js](/services/custom-software-development) the way this guide describes, redirect map first. Have that spreadsheet open and we can go through it with you on a [30-minute call](${site.bookingUrl}).`,
    },
  ],
  takeaways: [
    "Move to Next.js when speed, plugin upkeep or custom features cost you money; stay on WordPress when editors publish daily and the site works.",
    "The redirect map is the migration: every old URL gets a 308 to its closest new page, or a 410 if it was removed on purpose.",
    "Next.js returns 308 for permanent redirects, and Google treats 308 the same as 301.",
    "Keep redirects for at least a year, and expect rankings to move for a few weeks even when the move is done right.",
    "List what every plugin actually does before you start; SEO and form plugins often carry hidden jobs like redirects and stored leads.",
    "For a WooCommerce store, decide how order history and customer logins will move before choosing a storefront.",
    "Next.js removes the public admin and plugin layer, but its dependencies and API routes still need patching and care.",
  ],
  faqs: [
    {
      question: "Will I lose my Google rankings if I move to Next.js?",
      answer:
        "Some movement is normal, and Google's own site-move guide says to expect temporary fluctuation. What protects rankings over time is a complete set of permanent redirects to the closest matching pages, kept for at least a year, plus canonical tags and internal links that point at the new URLs.",
    },
    {
      question: "Can my team keep editing in WordPress after the move?",
      answer:
        "Yes, with a headless setup. Editors keep the WordPress admin and its revision history, and Next.js renders the public site. Preview and instant publishing need extra wiring through draft mode and on-demand revalidation, so budget time for them.",
    },
    {
      question: "Should I use 301 or 308 redirects?",
      answer:
        "Either is fine for Google, which treats a 308 as equivalent to a 301. Next.js sends a 308 when a redirect is marked permanent in next.config, and there's no reason to change it.",
    },
    {
      question: "What should happen to old pages I'm deleting?",
      answer:
        "If a close equivalent exists, redirect to it. If the page is gone on purpose and nothing replaces it, return 410 Gone. Don't point hundreds of dead URLs at the homepage, which Google's site-move guide specifically warns against.",
    },
    {
      question: "Is Next.js faster than WordPress?",
      answer:
        "It can be, because pages can be pre-rendered and served from a CDN with little JavaScript. A badly built Next.js site can still be slow, so measure Core Web Vitals before and after the move instead of assuming.",
    },
    {
      question: "Can a WooCommerce store move to Next.js?",
      answer:
        "Yes. You can keep WooCommerce as the back end and build a Next.js storefront on its Store API, or move products and checkout to another system entirely. Plan order history and customer accounts before you pick a route.",
    },
    {
      question: "Do I need Vercel to host a Next.js site?",
      answer:
        "No. Next.js runs on any Node.js server or in a Docker container with full feature support. Check your platform's limits, though: Vercel, for example, caps redirects defined in next.config at 1,024.",
    },
    {
      question: "How many redirects can Next.js handle?",
      answer:
        "The redirects list in next.config works well for a map known in advance, and one pattern rule can cover thousands of WordPress date-based post URLs. For more than about a thousand individual rows, the Next.js docs suggest a lookup in Proxy instead.",
    },
  ],
};
