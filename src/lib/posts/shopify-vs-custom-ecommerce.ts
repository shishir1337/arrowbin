import type { Post } from "@/lib/blog";
import { site } from "@/lib/site";

const DIR = "/blog/shopify-vs-custom-ecommerce";

export const post: Post = {
  slug: "shopify-vs-custom-ecommerce",
  title: "Shopify vs Custom Ecommerce Website: Which Wins in 2026?",
  description:
    "Shopify vs a custom ecommerce website in 2026: real monthly and per-order fees, a 3-year cost comparison, Bangladesh payment limits and when to switch.",
  keywords: [
    "shopify vs custom ecommerce website",
    "shopify vs custom website",
    "shopify vs woocommerce vs custom",
    "is shopify worth it for a small business",
    "shopify transaction fees third party payment",
    "shopify in bangladesh",
    "custom ecommerce website cost",
  ],
  date: "2026-10-15",
  dateLabel: "October 15, 2026",
  author: "Md. Shishir Ahmed",
  readingTime: "14 min read",
  category: "E-commerce",
  excerpt:
    "Shopify is the right start for many stores, and a custom build wins for others. This is how to decide, with fee math from Shopify's own pricing page and the cases where custom pays off.",
  image: {
    src: `${DIR}/cover.webp`,
    alt: "Mockup of two browser windows side by side: a template storefront with a standard product grid, and a custom storefront with its own layout and a checkout that offers card and mobile wallet payments or cash on delivery",
    width: 1280,
    height: 720,
  },
  tldr: "Choose Shopify if you want to launch fast with a standard catalog and checkout: for most stores it's the cheaper option, and where Shopify Payments is available its platform cost is just the subscription. Choose a custom store when your checkout, pricing, integrations or local payment flows don't fit Shopify. On fees alone, a custom build (our estimate: $30,000 to $90,000, plus 15–20% a year to run) only catches the best Shopify plan at about $142,000 a month in gateway-paid sales. In Bangladesh, where Shopify Payments isn't available, Shopify adds 2% on Basic or 1% on Grow to every gateway-paid order, on top of the gateway's own fee.",
  body: [
    {
      type: "p",
      text: "If you're about to launch an online store, or you're tired of the one you have, the choice usually comes down to two paths. Pay Shopify every month, or pay someone to build a store you own. This post is for founders who need to make that call with real numbers, in the US or the UK as much as in Bangladesh.",
    },
    {
      type: "p",
      text: "Some context on where I'm coming from. At Arrowbin we've built both. Most of our stores are custom Next.js builds, such as Maneel Club (moved off WordPress) and FlexOver BD (built from scratch), and we built গ তে গয়না's first store on Shopify. Custom is the bigger project for us, so you'd expect me to push it.",
    },
    { type: "p", text: "For most new stores, I won't." },

    {
      type: "h2",
      text: "Shopify or a custom ecommerce website: which should you choose?",
    },
    {
      type: "p",
      text: "Choose Shopify if you want to launch fast with standard products and a standard checkout. Choose a custom store when your checkout, pricing, integrations or local payment needs don't fit Shopify, or when Shopify's fees start to cost more than running your own platform would.",
    },
    {
      type: "p",
      text: "For a new brand selling physical products in one country, Shopify is the sensible default. Custom earns its cost when the store itself is part of what makes the business different, or when Shopify's rules start costing you sales or margin. WooCommerce sits between the two, and I'll come back to it.",
    },
    {
      type: "table",
      headers: ["Factor", "Shopify", "Custom (e.g. Next.js)", "WooCommerce"],
      rows: [
        [
          "Monthly platform cost",
          "$25 Basic, $65 Grow, $399 Advanced (billed monthly); Plus from $2,300",
          "No platform fee; you pay for hosting and upkeep",
          "Free plugin; you pay for hosting plus any paid plugins",
        ],
        [
          "Extra fee with a third-party gateway",
          "2% Basic, 1% Grow, 0.6% Advanced, 0.2% Plus",
          "None",
          "None from WooCommerce itself",
        ],
        [
          "Design freedom",
          "Wide inside Shopify themes (Liquid templates)",
          "Anything you can build",
          "Wide inside WordPress themes",
        ],
        [
          "Checkout control",
          "Shopify's hosted checkout; custom UI in the main checkout steps is Plus only",
          "Full: you design the flow",
          "Full, through plugins or code",
        ],
        [
          "Local payments (bKash, Nagad, COD)",
          "Third-party payment apps; COD as a manual method",
          "Direct integration with any gateway's API",
          "Gateway plugins, of mixed quality",
        ],
        [
          "Apps or plugins",
          "Large app store, mostly monthly subscriptions",
          "Built in, or wired to services you pick",
          "Huge plugin library, which is also the main security risk",
        ],
        [
          "Speed control",
          "Shopify runs hosting; theme and app scripts are on you",
          "You decide every script and render path",
          "Depends on your host and your plugin count",
        ],
        [
          "Maintenance burden",
          "Low: Shopify patches the platform",
          "Highest: you own the code and the servers",
          "High: constant core and plugin updates",
        ],
        [
          "Data ownership and export",
          "CSV exports; the platform stays Shopify's",
          "Your database, your schema",
          "Your database, on your host",
        ],
        [
          "AI shopping channels",
          "Built in: ChatGPT, Copilot, Google AI Mode, Gemini",
          "You build the feeds and structured data",
          "Plugins plus your own feed work",
        ],
        [
          "Time to launch",
          "3–6 weeks (Arrowbin estimate)",
          "8–12 weeks headless, 12+ fully custom (Arrowbin estimate)",
          "Close to Shopify with a stock theme (our view)",
        ],
        [
          "Who you need on the team",
          "A store manager; a Shopify developer for theme work",
          "A developer or partner on call",
          "A WordPress developer who keeps plugins patched",
        ],
      ],
    },
    {
      type: "p",
      text: "Three rows settle most cases. The gateway fee tells you what Shopify really costs. Checkout control and local payments tell you whether your customers can pay the way they want to, which matters more than any fee.",
    },

    {
      type: "h2",
      text: "What does Shopify really cost per month and per order?",
    },
    {
      type: "p",
      text: "Shopify costs a monthly subscription, plus an extra 2% (Basic), 1% (Grow), 0.6% (Advanced) or 0.2% (Plus) of each order if a third-party provider takes the payment instead of Shopify Payments. That fee sits on top of whatever your payment provider charges.",
    },
    {
      type: "p",
      text: "These are the prices [Shopify's pricing page](https://www.shopify.com/pricing) showed on October 15, 2026, in US dollars. The same page says pricing and payment options can differ by country, so check it from where your business is registered.",
    },
    {
      type: "table",
      headers: [
        "Plan",
        "Billed monthly",
        "Billed yearly (per month)",
        "Fee with a third-party gateway",
      ],
      rows: [
        ["Basic", "$25", "$22", "2%"],
        ["Grow", "$65", "$58", "1%"],
        ["Advanced", "$399", "$359", "0.6%"],
        ["Plus", "From $2,300", "Not shown", "0.2%"],
      ],
    },
    {
      type: "p",
      text: "Most of the bad Shopify math online comes from mixing up two different fees. Card processing is what Stripe, SSLCommerz or Shopify Payments charges to move the money, and you pay it on any platform. The third-party fee is Shopify's own cut, and you only pay it when Shopify Payments isn't processing the order.",
    },
    {
      type: "p",
      text: "A worked example. Say your store takes $10,000 a month through a third-party gateway. On Basic you pay Shopify $25 + $200 = $225 a month. On Grow it's $65 + $100 = $165. Grow costs more on paper and less in practice.",
    },
    {
      type: "p",
      text: "You can find your own crossover points with one formula: plan price + (fee rate × monthly sales through the gateway). Set two plans equal and solve. On monthly billing, Grow beats Basic once those sales pass $4,000 a month, and Advanced beats Grow above $83,500. On yearly billing the points drop to $3,600 and $75,250.",
    },
    {
      type: "p",
      text: "Then there are apps. Most stores add a few for reviews, subscriptions or search, and many bill monthly. There's no honest average to quote, so price the apps you'd actually need before comparing anything.",
    },

    { type: "h2", text: "What does a custom store cost to build and run?" },
    {
      type: "p",
      text: "A custom store has no platform fee and no cut of your sales, but you pay to build it and then pay to keep it running. Our published estimate for a store of this size is $30,000 to $90,000 to build, plus roughly 15–20% of that each year for hosting and maintenance.",
    },
    {
      type: "p",
      text: "That build range comes from our guide on [what a custom build costs](/blog/how-much-does-custom-software-development-cost), where an online store sits in the mid-size tier. The 15–20% yearly figure is an Arrowbin planning rule, not an industry statistic; our guide to [what keeping a store running costs each year](/blog/software-maintenance-cost) explains what it pays for. The running costs break down like this:",
    },
    {
      type: "ul",
      items: [
        "Hosting: a Next.js store runs on a managed platform or a VPS. For a small store it's usually the smallest line on the bill.",
        "Payment processing: you still pay your gateway. Stripe's [US pricing](https://stripe.com/pricing) is 2.9% + 30¢ per successful domestic card charge, with no platform fee on top.",
        "Maintenance: framework upgrades and security patches. Add monitoring, and backups you've actually restored at least once.",
        "Services you'd otherwise get as apps, such as transactional email or reviews. You swap Shopify app bills for SaaS bills, or for code you own.",
      ],
    },
    { type: "h3", text: "How do the two compare over three years?" },
    {
      type: "p",
      text: "Over three years, Shopify costs less unless your gateway-paid sales pass about $142,000 a month. These are the assumptions, so you can swap in your own:",
    },
    {
      type: "ul",
      items: [
        "Shopify on yearly billing at the October 15, 2026 prices above, for 36 months.",
        "Every online order is paid through a third-party gateway, so Shopify's extra fee applies. That's the Bangladesh case, or any store that can't use Shopify Payments.",
        "Card processing is left out of both columns, because you pay it either way.",
        "Apps and themes are left out too. They'd add to Shopify's side, though some of that cost comes back on the custom side as SaaS bills.",
        "Custom uses our published estimate: $30,000 to $90,000 to build, plus 15–20% of the build cost per year.",
      ],
    },
    {
      type: "table",
      headers: [
        "3-year cost",
        "$10k a month in sales",
        "$50k a month in sales",
        "$150k a month in sales",
      ],
      rows: [
        ["Shopify Basic, third-party gateway", "$7,992", "$36,792", "$108,792"],
        ["Shopify Grow, third-party gateway", "$5,688", "$20,088", "$56,088"],
        [
          "Shopify Advanced, third-party gateway",
          "$15,084",
          "$23,724",
          "$45,324",
        ],
        ["Shopify Grow, with Shopify Payments", "$2,088", "$2,088", "$2,088"],
        [
          "Custom store (Arrowbin estimate)",
          "$43,500–$144,000",
          "$43,500–$144,000",
          "$43,500–$144,000",
        ],
      ],
    },
    {
      type: "p",
      text: "Read that table honestly and Shopify wins most cells. With Shopify Payments, the platform costs you the subscription and nothing else, so a custom build never pays for itself on platform fees. Without Shopify Payments, the cheapest custom build only catches the best Shopify plan at about $142,000 a month in gateway-paid sales. That's roughly $1.7 million a year.",
    },
    {
      type: "p",
      text: "So fees are rarely a good reason to leave Shopify. Capability is.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/three-year-cost.svg`,
        alt: "Line chart of 3-year cost against monthly gateway-paid sales: the cost of each Shopify plan with the third-party fee rises with sales, and Advanced only reaches the $43,500 low end of a custom build at about $142,000 a month",
        caption:
          "Computed from Shopify's pricing page (yearly billing, Oct 15, 2026) and Arrowbin's published build estimate. Excludes card processing and apps.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "cta",
      title: "Which side of the line is your store on?",
      text: "With your monthly sales, your payment mix and the systems your store has to talk to, we can tell you which platform fits. If the answer is Shopify, we'll say so.",
      href: "/contact",
      label: "Get a straight answer",
    },

    { type: "h2", text: "Where does Shopify clearly win?" },
    {
      type: "p",
      text: "Shopify wins on speed to launch, on a hosted checkout you never have to secure yourself, on its app ecosystem, and on built-in sales channels that now include AI assistants. For a store with a normal catalog and a normal checkout, that's a lot of work you never do.",
    },
    {
      type: "p",
      text: "Launch time is the obvious one. Our own planning estimate is 3–6 weeks for a Shopify store, against 8–12 weeks for a headless storefront and 12 or more for a fully custom platform. When you don't yet know whether the product sells, those extra weeks are expensive.",
    },
    {
      type: "p",
      text: "The quieter win is everything you don't own. Shopify hosts the store and patches the platform, and its checkout is Shopify's code to secure. Nobody on your team gets paged about a server. On a custom store, every one of those jobs is yours or your developer's, and checkout bugs cost money by the hour.",
    },
    {
      type: "p",
      text: "Then there's the app store. Most things a growing store wants, from reviews to loyalty points, already exist as an app you can try this afternoon. Some are clunky and the bills add up, but trying a feature in an hour beats commissioning it while you're still finding out what sells.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/who-owns-what.svg`,
        alt: "Responsibility matrix for Shopify versus WooCommerce versus a custom store: Shopify handles hosting and security patches plus checkout code, while WooCommerce or custom store owners handle most of that running work themselves",
        caption:
          "Who does the day-to-day running work on each platform. Simplified Arrowbin view.",
        width: 1280,
        height: 720,
      },
    },

    { type: "h2", text: "Where does a custom store win?" },
    {
      type: "p",
      text: "A custom store wins when your business needs something Shopify can't express cleanly: unusual product logic, wholesale pricing beyond Shopify's plans, deep integration with your own systems, or full control of checkout and page speed. It also wins where Shopify's payment options are limited.",
    },
    {
      type: "p",
      text: "Checkout is the big one. Shopify's developer docs say [checkout UI extensions](https://shopify.dev/docs/api/checkout-ui-extensions/2026-04) for the information, shipping and payment steps 'are available only to stores on a Shopify Plus plan'. Below Plus, you're configuring Shopify's checkout rather than designing your own. If your conversion problem lives inside checkout, that matters.",
    },
    {
      type: "p",
      text: "Wholesale pricing is closer than it used to be. Shopify's [changelog](https://changelog.shopify.com/posts/key-b2b-features-now-available-on-non-plus-plans) says that since April 2, 2026, plans from Basic to Advanced get native B2B features, including up to 3 active B2B catalogs plus company profiles and payment terms. Plus keeps unlimited customer-specific catalogs, along with partial payments and deposits. If your price lists need more than that, custom starts to make sense.",
    },
    {
      type: "p",
      text: "Integrations are where I see stores outgrow apps. When we take over a WordPress store to rebuild it, the first thing we map is every place where money or stock changes hands: checkout, refunds, stock sync with an ERP, courier booking. When those rules are yours rather than an app's settings, owning the code beats stacking apps that each half-solve it. The homepage is the easy bit.",
    },
    {
      type: "p",
      text: "Speed is real but often oversold. On a custom Next.js store you decide every script that loads; on Shopify, speed mostly comes down to your theme and the apps you install. I won't promise a percentage uplift from going custom, and I'd be wary of anyone who does.",
    },
    {
      type: "p",
      text: "There's also a middle route people forget: headless Shopify. You keep Shopify's back office and checkout and build your own front end on its [Storefront API](https://shopify.dev/docs/storefronts/headless), which Shopify says serves your catalog and the cart, then hands customers off to checkout. You get design freedom without owning payments.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/control-vs-upkeep.svg`,
        alt: "Positioning chart of control against upkeep: Shopify sits at low control and low upkeep, headless Shopify in the middle, WooCommerce at high upkeep, and a custom store at the highest control and high upkeep",
        caption:
          "More control means more running work you own. Arrowbin view, not a measurement.",
        width: 1280,
        height: 720,
      },
    },

    { type: "h2", text: "What about WooCommerce?" },
    {
      type: "p",
      text: "WooCommerce sits in between. It's open source and flexible with no monthly platform fee, but you own the hosting and the updates, plus plugin security. It suits teams already on WordPress who have someone to keep it patched.",
    },
    {
      type: "p",
      text: "WordPress runs 40.0% of all websites, according to [W3Techs](https://w3techs.com/technologies/details/cm-wordpress) data from October 14, 2026, so WooCommerce developers are easy to find. WooCommerce [pitches itself](https://woocommerce.com/woocommerce/) as open source with no 'monthly platform fees', and that part is true.",
    },
    {
      type: "p",
      text: "The catch is plugins. Patchstack's [State of WordPress Security in 2026](https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/) counted 11,334 new vulnerabilities in the WordPress ecosystem in 2025, and 91% of them were in plugins. A typical store runs plugins for payments and shipping, plus more for SEO and caching. Each one is code you're trusting with customer data.",
    },
    {
      type: "p",
      text: "Most of our e-commerce work is moving stores off exactly this setup. If that's where you are, our guide to [moving off WooCommerce safely](/blog/wordpress-to-nextjs-migration) covers the redirect plan.",
    },
    {
      type: "p",
      text: "My view: WooCommerce is a fine choice if WordPress is already your home and you budget for maintenance. As a fresh start for a non-technical founder in 2026, I'd pick Shopify over it.",
    },

    { type: "h2", text: "Does the answer change for stores in Bangladesh?" },
    {
      type: "p",
      text: "Yes. Shopify Payments isn't available in Bangladesh, so every order paid through a gateway carries Shopify's third-party fee on top of the gateway's own fee, and local wallets and cash on delivery need extra setup.",
    },
    {
      type: "p",
      text: "Shopify's [list of supported countries](https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries) for Shopify Payments has 41 entries. The US is on it, as are the UK and Australia. Bangladesh isn't, so a Bangladeshi store has to use a third-party payment provider.",
    },
    {
      type: "p",
      text: "Take one common gateway. SSLCommerz [lists](https://sslcommerz.com/pricing/) 2.5% per successful transaction (3.5% for AMEX), and says that rate also applies to bKash and Nagad payments. On Shopify Basic, a gateway-paid order costs 2% + 2.5% = 4.5% in fees. On Grow it's 1% + 2.5% = 3.5%, and on Advanced 0.6% + 2.5% = 3.1%. On a custom store with the same gateway, it's the 2.5% alone.",
    },
    {
      type: "p",
      text: "On a ৳2,000 order, that's ৳90 on Basic, ৳70 on Grow and ৳50 on a custom store. SSLCommerz also lists a ৳25,500 non-refundable charge on its Basic plan, which you pay whichever platform you choose.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/fee-per-order-bangladesh.svg`,
        alt: "Stacked bar chart of fees on a gateway-paid order in Bangladesh: Shopify Basic plus SSLCommerz 4.5%, Grow plus SSLCommerz 3.5%, Advanced plus SSLCommerz 3.1%, a custom store with SSLCommerz 2.5%, and no Shopify fee on cash on delivery",
        caption:
          "Sources: Shopify pricing page, SSLCommerz pricing page and Shopify's manual payments help page, checked Oct 15, 2026.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Cash on delivery changes the picture. Shopify's help center says 'You aren't charged third-party transaction fees for [manual payments](https://help.shopify.com/en/manual/payments/manual-payments)', and cash on delivery is one of those manual methods. If most of your orders are COD, the extra fee only touches the slice paid online.",
    },
    {
      type: "p",
      text: "Where custom earns its keep in Bangladesh is the work around COD: phone or SMS confirmation before dispatch, [courier booking from the order screen](/blog/courier-api-integration-bangladesh), a small advance payment to filter out orders nobody plans to collect, and bKash or Nagad as real options instead of a redirect. Silent Lifestyle BD, one of our builds, is set up around cash on delivery with phone confirmation.",
    },
    {
      type: "p",
      text: "If you go with Shopify, check before you commit that your gateway's Shopify app supports the wallets you need. SSLCommerz has a free one, and our guide to [payment gateways in Bangladesh](/blog/payment-gateway-integration-bangladesh) compares it with the other options.",
    },

    {
      type: "h2",
      text: "Which works better with AI shopping assistants in 2026?",
    },
    {
      type: "p",
      text: "Shopify does, out of the box. Shopify connects products to ChatGPT, Microsoft Copilot, AI Mode in Google Search and the Gemini app from its admin; a custom store can be found by the same assistants, but you do the product data and crawler work yourself.",
    },
    {
      type: "p",
      text: "Shopify announced [Agentic Storefronts](https://shopify.com/news/agentic-commerce-momentum) on March 24, 2026. It says sales in ChatGPT carry 'no transaction fees beyond standard processing rates', and its [help page](https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts) says the feature is active by default for eligible stores. For a small team, that's a real head start.",
    },
    {
      type: "p",
      text: "One detail people miss: the same help page describes an Agentic plan that lets you keep your existing online store. So a custom store isn't locked out of Shopify's catalog.",
    },
    {
      type: "p",
      text: "On your own custom store, the work looks like this:",
    },
    {
      type: "ul",
      items: [
        "Render product pages on the server so price and stock are in the HTML. Vercel's [crawler study](https://vercel.com/blog/the-rise-of-the-ai-crawler) found that 'none of the major AI crawlers currently render JavaScript' (December 2024).",
        "Add product structured data with price and availability for every variant, matching what the page shows.",
        "Publish a product feed. OpenAI's [merchant docs](https://developers.openai.com/commerce) accept one by SFTP file upload or by API.",
        "Keep feed prices and stock in sync with the store, because a stale feed is worse than none.",
      ],
    },
    {
      type: "p",
      text: "None of that is hard on a well-built Next.js store, but it's work Shopify merchants skip. Our guide to [getting a custom store into ChatGPT shopping](/blog/chatgpt-shopping-for-online-stores) walks through it step by step.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/ai-channels.svg`,
        alt: "Diagram of how products reach AI shopping assistants: on Shopify, products flow from the admin through Shopify Catalog to ChatGPT, Copilot, Google AI Mode and Gemini; on a custom store, server-rendered pages plus structured data and a product feed do that job, with Shopify's Agentic plan as an option",
        caption:
          "Sources: Shopify news (Mar 24, 2026) and help center, OpenAI commerce docs, Vercel's AI crawler study (Dec 2024).",
        width: 1280,
        height: 720,
      },
    },

    { type: "h2", text: "How hard is it to switch later?" },
    {
      type: "p",
      text: "Moderately hard, and very manageable with a plan. Products and customers export reasonably well in either direction. URLs and app data take planning, as does order history, and permanent (301 or 308) redirects are what protect your search rankings.",
    },
    {
      type: "p",
      text: "URLs come first. Shopify puts every product under /products/ and every collection under /collections/. Moving off Shopify means mapping each old URL to its new home, and moving onto it means bending your old URLs into Shopify's shape. Miss a few hundred and you'll see it in Search Console within weeks.",
    },
    {
      type: "p",
      text: "Apps are the sticky part. Each one holds a slice of your data, such as reviews or subscription schedules, and each needs its own export or a rebuild. Expect customers to set new passwords after any platform move, and write that email before launch day.",
    },
    {
      type: "p",
      text: "The order we follow: freeze catalog changes, export, map every URL, build the redirects, test on staging, switch DNS, then watch for 404s for a few weeks. It's dull work. It's also the difference between a migration and a traffic drop.",
    },
    {
      type: "p",
      text: "This is also why starting on Shopify isn't a trap. A clean Shopify store with sensible URLs is one of the easier things to move later.",
    },

    {
      type: "h2",
      text: "What do we recommend for most startups and small brands?",
    },
    {
      type: "p",
      text: "Start on Shopify unless a specific requirement rules it out. Plan a custom build when fees, checkout limits or integrations cost you more than running your own store would.",
    },
    {
      type: "p",
      text: "This is the checklist I'd use. If two or more of these are true, a custom or headless build deserves a proper look:",
    },
    {
      type: "ol",
      items: [
        "You can't use Shopify Payments, and your gateway-paid sales are heading towards $142,000 a month.",
        "You need changes inside checkout that Shopify only allows on Plus.",
        "Your pricing logic has outgrown Shopify's B2B tools and the apps you've tried.",
        "The store has to sync in real time with your own ERP, warehouse or courier systems.",
        "Most customers pay in ways Shopify only handles through workarounds, like COD with confirmation or local wallets.",
        "You can fund the build and about 15–20% of its cost every year to keep it healthy.",
      ],
    },
    {
      type: "p",
      text: "If none of those apply, launch on Shopify, keep your URLs tidy and ask the question again in a year. You'll be deciding with real sales data instead of guesses.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/decision-tree.svg`,
        alt: "Decision tree for choosing Shopify, WooCommerce, headless Shopify or a custom store, based on whether your products and checkout fit Shopify, whether you already run WordPress, and whether checkout can stay Shopify's",
        caption:
          "Three questions that settle most platform decisions. The custom budget is Arrowbin's published estimate.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "If you're on the custom side of that list, we build [custom e-commerce stores](/services/ecommerce-development) on Next.js, mostly for brands leaving WordPress and WooCommerce.",
    },
    {
      type: "p",
      text: `Want a second opinion on your numbers first? [Book a 30-minute call](${site.bookingUrl}) and bring your monthly sales and payment mix. If Shopify is the right answer for you, you'll hear it from us.`,
    },
  ],
  takeaways: [
    "Shopify is the right start for most new stores: it launches fast, runs a hosted checkout and leaves you no servers to patch.",
    "Shopify's third-party fee (2% Basic, 1% Grow, 0.6% Advanced, 0.2% Plus) only applies when Shopify Payments doesn't process the order.",
    "Card processing is paid on every platform, so don't count it as a Shopify cost when you compare.",
    "On fees alone, the cheapest custom build in our estimate only catches the best Shopify plan at about $142,000 a month in gateway-paid sales.",
    "Go custom for capability: checkout changes, complex pricing, deep integrations or local payment flows Shopify handles poorly.",
    "In Bangladesh, gateway-paid orders on Shopify carry its fee plus the gateway's, while cash on delivery orders carry no Shopify fee.",
    "Shopify leads on AI shopping channels today; a custom store needs server-rendered pages and a product feed, plus structured data, to match it.",
  ],
  faqs: [
    {
      question: "Is Shopify cheaper than a custom website?",
      answer:
        "Usually yes, and by a wide margin in the first few years. With Shopify Payments, Shopify's platform cost is just the subscription. Without it, the third-party fee grows with your sales, but by our estimate a custom build only catches up at around $142,000 a month in gateway-paid sales.",
    },
    {
      question: "Does Shopify charge a fee if I use my own payment gateway?",
      answer:
        "Yes. Shopify's pricing page on October 15, 2026 listed a third-party transaction fee of 2% on Basic, 1% on Grow, 0.6% on Advanced and 0.2% on Plus. It's charged on top of your gateway's own processing fee.",
    },
    {
      question: "Can I use bKash or Nagad on Shopify?",
      answer:
        "Only through a third-party payment provider with a Shopify payments app, because Shopify Payments isn't available in Bangladesh. SSLCommerz's pricing page covers bKash and Nagad at its 2.5% standard rate, but confirm that the provider's Shopify app offers the wallets you need before you build around it.",
    },
    {
      question: "Does Shopify take its extra fee on cash on delivery orders?",
      answer:
        "No. Shopify's help center says you aren't charged third-party transaction fees for manual payments, and cash on delivery is a manual payment method. The extra fee applies to orders paid through a third-party gateway.",
    },
    {
      question: "Will a custom store load faster than a Shopify one?",
      answer:
        "It can be, because you control every script and how each page renders. It's only faster if it's built and maintained well. A heavy custom build can easily be slower than a lean Shopify theme.",
    },
    {
      question: "Can I move from Shopify to a custom store later?",
      answer:
        "Yes. Products and customers export as CSV files, and the real work is in URL redirects and customer accounts, then app data and order history. Plan the redirects first, because they protect your search rankings.",
    },
    {
      question: "Should I pick WooCommerce instead of Shopify or custom?",
      answer:
        "Pick it if you already run WordPress and someone on your team will keep plugins patched. It has no monthly platform fee, but plugins account for most new WordPress security issues, so budget for maintenance.",
    },
    {
      question: "Which platform is better for selling through ChatGPT?",
      answer:
        "Shopify, if you want it working this week, because Agentic Storefronts connect your catalog from the admin. A custom store gets there with server-rendered product pages and a product feed backed by structured data, or by using Shopify's Agentic plan next to your own site.",
    },
  ],
};
