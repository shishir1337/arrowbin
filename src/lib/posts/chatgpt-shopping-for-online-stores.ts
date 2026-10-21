import type { Post } from "@/lib/blog";

const DIR = "/blog/chatgpt-shopping-for-online-stores";

export const post: Post = {
  slug: "chatgpt-shopping-for-online-stores",
  title: "How to Get Your Products on ChatGPT Shopping (Any Platform)",
  description:
    "How to get your products into ChatGPT, Gemini or Copilot shopping answers on any platform: what changed in 2026, plus the crawler and data fixes.",
  keywords: [
    "how to get products on chatgpt shopping",
    "chatgpt shopping product feed",
    "agentic commerce for small business",
    "ai shopping agents ecommerce",
    "agentic commerce protocol",
    "universal commerce protocol",
    "oai-searchbot robots.txt",
    "product schema for ai search",
  ],
  date: "2026-10-15",
  dateLabel: "October 15, 2026",
  author: "Md. Shishir Ahmed",
  readingTime: "15 min read",
  category: "E-commerce",
  excerpt:
    "AI assistants now recommend products and send shoppers to the store's own checkout. Here is what changed in 2026 and the checklist we use to make any store readable to them.",
  image: {
    src: `${DIR}/cover.webp`,
    alt: "Mockup of an AI shopping assistant showing linen shirt product cards with prices and stock, beside the store's own product page with an Add to cart button and Product structured data",
    width: 1280,
    height: 720,
  },
  tldr: "To get your products into ChatGPT shopping answers, make your product pages readable to OpenAI's search crawler, OAI-SearchBot, and get your catalog into a feed ChatGPT uses: directly through OpenAI's merchant program (approved partners only as of October 15, 2026) or through a platform such as Shopify Catalog. You don't need Shopify. Server-rendered product pages with complete Product and Offer markup work for WooCommerce and custom stores too, as do a clean Google Merchant Center feed and sensible crawler rules. Since OpenAI's March 2026 change, merchants can use their own checkout, so the job is to be found and to be right about price and stock.",
  body: [
    {
      type: "p",
      text: "Shoppers now ask ChatGPT, Gemini or Copilot what to buy, and the assistant answers with product cards that show prices and link to a store. Most advice on getting into those answers assumes you sell on Shopify. This one covers Shopify too, but it's written for stores on WooCommerce, a custom build or a headless setup.",
    },
    {
      type: "p",
      text: "We build and rebuild online stores, mostly moving WordPress and WooCommerce sites to server-rendered Next.js. So we spend our days on the plumbing behind this topic, like what a crawler actually receives and what your CDN quietly blocks. We checked every program detail below against official pages on October 15, 2026, and dated it, because this area changes monthly.",
    },

    {
      type: "h2",
      text: "What is agentic commerce, and what changed in 2026?",
    },
    {
      type: "p",
      text: "Agentic commerce is when an AI assistant finds, compares and sometimes buys products for a shopper. The big change in 2026 came in March, when OpenAI stepped back from checkout inside ChatGPT to focus on product discovery. For most stores, the practical goal is now to be found by the assistant and to receive the buyer on their own checkout.",
    },
    {
      type: "p",
      text: "ChatGPT's Instant Checkout launched in September 2025. On March 24, 2026, OpenAI [told TechCrunch](https://techcrunch.com/2026/03/24/openais-plans-to-make-chatgpt-more-like-amazon-arent-going-so-well) it was \"allowing merchants to use their own checkout experiences\" while it focused on product discovery, and that it was deprioritizing Instant Checkout as a stand-alone feature. Merchants can still offer checkout through apps inside ChatGPT for now. So in-chat buying hasn't vanished. It just stopped being the main road.",
    },
    {
      type: "p",
      text: "The same day, Shopify [announced Agentic Storefronts](https://www.shopify.com/news/agentic-commerce-momentum), which put Shopify merchants' products into ChatGPT, Microsoft Copilot, AI Mode in Google Search and the Gemini app. Back on January 11, Google [launched the Universal Commerce Protocol](https://blog.google/products/ads-commerce/agentic-commerce-ai-tools-protocol-retailers-platforms), an open standard for checkout run by an agent.",
    },
    {
      type: "p",
      text: "Then came a quieter shift. Profound, a company that tracks AI answers for its clients, found that the share of ChatGPT Shopping recommendations coming from product feeds jumped from 8.26% to 61.54% on July 10 and sat around 65% by September 3, as [Search Engine Journal reported](https://www.searchenginejournal.com/chatgpt-shopping-results-lean-hard-on-product-feeds/589000/). That's one vendor's observational data, and OpenAI hasn't explained the change. If it holds, though, stores that rely only on being crawled are losing ground in ChatGPT.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/ai-shopping-timeline.svg`,
        alt: "Timeline of AI shopping changes from September 2025 to October 2026: ChatGPT Instant Checkout launches, PayPal store sync reaches Perplexity, Google launches UCP, OpenAI moves to merchant checkout as Shopify launches Agentic Storefronts, feed-sourced ChatGPT picks jump, and Cloudflare sets new AI bot defaults",
        caption:
          "Dated changes behind this guide. Sources: TechCrunch, PayPal, Google, Shopify, Search Engine Journal (Profound data), Cloudflare docs.",
        width: 1280,
        height: 720,
      },
    },

    {
      type: "h2",
      text: "How do products get into ChatGPT and other AI shopping answers?",
    },
    {
      type: "p",
      text: "Products get in three ways: an AI search crawler reads your product pages, you send the assistant a structured product feed, or a platform you already use passes your catalog along. Each assistant mixes the three differently, and none of them publishes how it ranks products.",
    },
    {
      type: "p",
      text: "For ChatGPT, the crawler is OAI-SearchBot. OpenAI's [crawler documentation](https://developers.openai.com/api/docs/bots) says it's used \"to surface websites in search results in ChatGPT's search features.\" The feed route is narrower. OpenAI's [commerce guide](https://developers.openai.com/commerce/guides/get-started) takes a feed by SFTP file upload or by API, recommends a full file once a day plus API updates during the day, and says feed onboarding is \"currently available to approved partners.\" You apply at chatgpt.com/merchants.",
    },
    {
      type: "p",
      text: "Search Engine Journal's September report says OpenAI's merchant page puts applicants on a waitlist. It also says Shopify and Etsy catalogs are already connected, and that OpenAI plans a self-serve way to connect feeds later this year. OpenAI's merchant page wouldn't load for us when we checked on October 15, so treat the waitlist as reported rather than confirmed.",
    },
    {
      type: "p",
      text: "Other assistants use the same three routes, each with its own limits:",
    },
    {
      type: "table",
      headers: [
        "Assistant",
        "How products get in",
        "Checkout today",
        "Limits as of Oct 15, 2026",
      ],
      rows: [
        [
          "ChatGPT",
          "OAI-SearchBot crawling; a direct feed for approved merchants; Shopify Catalog",
          "The merchant's own site, or an app inside ChatGPT",
          "Direct feed onboarding is approval-only",
        ],
        [
          "Google AI Mode and Gemini",
          "Normal Search crawling by Googlebot; Merchant Center product data",
          "Your site, or Google Pay checkout through UCP for select merchants",
          "UCP checkout covers products eligible in the US, Canada or Australia",
        ],
        [
          "Microsoft Copilot",
          "Microsoft Merchant Center with a UCP-ready feed; Shopify stores enrolled automatically",
          "Copilot Checkout inside Copilot, or your site",
          "Checkout only for English-language merchants selling to US buyers",
        ],
        [
          "Perplexity",
          "PerplexityBot crawling; the Merchant Program; PayPal store sync",
          "Instant Buy with PayPal for US users, or your site",
          "Its Merchant Program was pitched at large retailers",
        ],
      ],
    },
    {
      type: "p",
      text: "Google says there are [no additional requirements](https://developers.google.com/search/docs/appearance/ai-features) to appear in AI Mode beyond being indexed and eligible for a snippet in Search, and it asks merchants to keep Merchant Center details current. Checkout through UCP is a separate opt-in, which Google's [Merchant Center help](https://support.google.com/merchants/answer/16837055) limits to select merchants for now.",
    },
    {
      type: "p",
      text: "Microsoft's [agentic commerce page](https://about.ads.microsoft.com/en/solutions/technology/agentic-commerce) says Copilot Checkout runs off Microsoft Merchant Center, that you stay the merchant of record, and that Microsoft takes no commission today.",
    },
    {
      type: "p",
      text: "Perplexity's merchant route is older. Its [Merchant Program](https://www.perplexity.ai/hub/blog/shop-like-a-pro) launched in November 2024 as a free program aimed at large retailers. In November 2025, [PayPal's store sync](https://newsroom.paypal-corp.com/2025-11-PayPal-and-Perplexity-Launch-Instant-Buy) made PayPal merchants' catalogs discoverable inside Perplexity, with checkout for US users.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/product-to-ai-answer.svg`,
        alt: "Flow diagram of how a product reaches an AI shopping answer: the store catalog reaches the assistant through crawled pages, product feeds or platform catalogs, and the buyer clicks through to the store's own checkout or an agent checkout via ACP or UCP",
        caption:
          "Three routes in, one click out. Sources: OpenAI developer docs, Google Search Central, Microsoft Advertising, Shopify, PayPal.",
        width: 1280,
        height: 720,
      },
    },

    { type: "h2", text: "Do you need Shopify to sell through AI assistants?" },
    {
      type: "p",
      text: "No. Shopify makes it easiest, because Agentic Storefronts already wire Shopify stores into ChatGPT and Copilot as well as Google's AI Mode and Gemini. A WooCommerce or custom store can reach the same assistants through crawlable pages, Merchant Center feeds for Google and Microsoft, and OpenAI's feed program once it's accepted.",
    },
    {
      type: "p",
      text: "Shopify also offers a way in for brands that don't use it. The Agentic plan lets brands that run their store elsewhere add products to Shopify Catalog, and Shopify says it has rolled out globally. It's a sensible bridge if you want ChatGPT coverage this quarter without first settling [whether to move to Shopify or build custom](/blog/shopify-vs-custom-ecommerce). You are, however, handing a copy of your catalog to another company and adding one more thing to keep in sync, and the announcement doesn't state a price. Read the terms first.",
    },
    {
      type: "p",
      text: 'For most stores off Shopify, the cheapest first move is a clean Google feed. OpenAI\'s [product feed spec](https://developers.openai.com/commerce/specs/file-upload/products) accepts a Google-compatible file, tab or comma delimited, and says "accepted Google-compatible products have search enabled and checkout disabled." On WooCommerce, [Google for WooCommerce](https://woocommerce.com/products/google-listings-and-ads/) syncs your catalog to Google Merchant Center for free. Build that feed properly once and it does double duty.',
    },
    {
      type: "table",
      headers: [
        "Route",
        "Who it suits",
        "What you maintain",
        "Where checkout happens",
        "Cost notes",
      ],
      rows: [
        [
          "Crawlable product pages",
          "Every store",
          "Server-rendered pages, structured data, crawler access",
          "Your site",
          "No platform fee; developer time",
        ],
        [
          "Direct OpenAI product feed",
          "Stores OpenAI accepts",
          "A daily feed plus updates during the day",
          "Your site, or an app inside ChatGPT",
          "No fee listed in the docs we read",
        ],
        [
          "Shopify Agentic Storefronts",
          "Stores already on Shopify",
          "Product data in Shopify Admin",
          "ChatGPT's in-app browser (a new tab on desktop)",
          "No extra transaction fees on ChatGPT sales, per Shopify",
        ],
        [
          "Shopify Agentic plan",
          "Brands on other platforms",
          "A copy of your catalog in Shopify Catalog",
          "Not stated in Shopify's announcement",
          "Price not stated in the announcement",
        ],
        [
          "Google Merchant Center, plus UCP",
          "Any store with a Merchant Center account",
          "A Merchant Center feed",
          "Your site, or Google Pay checkout for select UCP merchants",
          "Free Merchant Center sync with Google for WooCommerce",
        ],
        [
          "Microsoft Merchant Center",
          "Stores selling to US buyers",
          "A UCP-ready feed",
          "Copilot Checkout, or your site",
          "Microsoft says it takes no commission today",
        ],
      ],
    },
    {
      type: "cta",
      title: "Want to know what an AI crawler sees on your store?",
      text: "Send us a product URL. We'll check what crawlers receive without JavaScript, what your markup says and whether your CDN lets them in, then tell you what to fix first.",
      href: "/contact",
      label: "Ask for a readiness check",
    },

    {
      type: "h2",
      text: "What does an AI assistant need to read on your product pages?",
    },
    {
      type: "p",
      text: "An assistant needs a product page that arrives complete in the first HTML response. That means the name, the price and its currency, stock status, images, brand, identifiers, shipping cost and the return policy. The Product and Offer structured data on that page has to say the same thing as the visible text.",
    },
    {
      type: "p",
      text: "Google's [merchant listing documentation](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing), last updated September 8, 2026, is the most detailed public spec for this. A Product needs a name and an image, plus an Offer. The Offer needs a price above zero and a priceCurrency, and it has to be an Offer rather than an AggregateOffer, because the merchant must be the seller. Availability, shipping details, a return policy, GTIN, brand and ratings are recommended.",
    },
    {
      type: "p",
      text: "Google's rules are worth following even if ChatGPT is the target. OpenAI's feed asks for the same facts, so one clean product model can feed both. OpenAI is stricter in one place: its feed requires brand, which Google only recommends.",
    },
    {
      type: "table",
      headers: [
        "What the shopper sees",
        "Schema.org property",
        "Google's status",
        "Where it must appear",
      ],
      rows: [
        ["Product name", "name", "Required", "Page, markup and feed"],
        ["Main photo", "image", "Required", "Page, markup, feed"],
        [
          "Price",
          "offers.price, above zero",
          "Required",
          "Page, markup and feed, identical",
        ],
        [
          "Currency",
          "offers.priceCurrency",
          "Required",
          "Markup and feed, next to the price",
        ],
        [
          "Stock status",
          "offers.availability",
          "Recommended",
          "Page, markup and feed, kept current",
        ],
        [
          "Brand",
          "brand.name",
          "Recommended (required in OpenAI's feed)",
          "Page, markup, feed (same spelling)",
        ],
        [
          "Barcode",
          "gtin (8, 12, 13 or 14 digits)",
          "Recommended",
          "Markup and feed",
        ],
        [
          "Shipping cost and time",
          "shippingDetails, or a site-wide policy under Organization",
          "Recommended",
          "Page or policy page, markup, feed",
        ],
        [
          "Return window",
          "hasMerchantReturnPolicy, or under Organization",
          "Recommended",
          "Policy page, markup, feed",
        ],
        [
          "Star rating",
          "aggregateRating and review",
          "Recommended",
          "Page and markup, only if reviews are shown",
        ],
      ],
    },
    {
      type: "p",
      text: "Site-wide shipping and return policies can sit in your Organization markup instead of on every product. That's tidier for most small stores, as long as your policy page states the same numbers.",
    },
    {
      type: "p",
      text: "WooCommerce owners should check one thing in particular. WooCommerce's [built-in structured data](https://github.com/woocommerce/woocommerce/blob/trunk/plugins/woocommerce/includes/class-wc-structured-data.php) describes a variable product whose variations have different prices as an AggregateOffer, a price range. In current code the exception is a URL that names one exact variation. Google's merchant listing docs ask for an Offer instead. If most of your catalog is variable products, have a developer look at it.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/product-page-schema-map.svg`,
        alt: "Annotated product page mockup mapping visible fields to Product and Offer schema properties: name, image and price with priceCurrency marked required by Google, and six more, including availability and shippingDetails, marked recommended",
        caption:
          "Nine fields an AI shopping crawler looks for. Source: Google Search Central merchant listing docs (updated September 8, 2026). Product shown is illustrative.",
        width: 1280,
        height: 720,
      },
    },

    {
      type: "h2",
      text: "Is your robots.txt blocking AI shopping assistants?",
    },
    {
      type: "p",
      text: "Check that OAI-SearchBot is allowed, because it's the crawler ChatGPT search uses to surface sites. GPTBot is a separate crawler for model training, and you can block it without dropping out of ChatGPT search. Then check your CDN and security plugins, because robots.txt is only half the gate.",
    },
    {
      type: "table",
      headers: ["User agent", "Owner", "What it does", "Block it?"],
      rows: [
        [
          "OAI-SearchBot",
          "OpenAI",
          "Surfaces sites in ChatGPT search",
          "No, if you want ChatGPT shoppers",
        ],
        [
          "GPTBot",
          "OpenAI",
          "Collects content for model training",
          "Your call; ChatGPT search doesn't depend on it",
        ],
        [
          "ChatGPT-User",
          "OpenAI",
          "Fetches a page when a user asks; not automatic crawling",
          "OpenAI says robots.txt rules may not apply to it",
        ],
        [
          "Googlebot",
          "Google",
          "Crawls for Search, including AI Mode and AI Overviews",
          "No, unless you want out of Google entirely",
        ],
        [
          "Google-Extended",
          "Google",
          "A control token for Gemini training and grounding",
          "Your call; Google says Search inclusion isn't affected",
        ],
        [
          "PerplexityBot",
          "Perplexity",
          "Surfaces and links sites in Perplexity; not used for training",
          "No, if you want Perplexity shoppers",
        ],
      ],
    },
    {
      type: "p",
      text: "OpenAI says robots.txt changes take about 24 hours to reach its systems. Google's [crawler documentation](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) says Google-Extended \"does not impact a site's inclusion in Google Search.\" And Perplexity's [bot documentation](https://docs.perplexity.ai/guides/bots) notes that its user-triggered fetcher, Perplexity-User, generally ignores robots.txt, since a person asked for the page.",
    },
    {
      type: "p",
      text: "Most guides stop at robots.txt, which is a request that polite bots honor. Your CDN, firewall or WordPress security plugin decides what actually gets through, and it can say no while robots.txt says yes. Cloudflare's [AI bot settings](https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/) now sort bots into three groups (Search, Agent, Training), each with its own block rule. From September 15, 2026, new domains start with Training and Agent bots blocked on pages that show ads.",
    },
    {
      type: "p",
      text: "We check this on every store we take on, and we've caught it on our own site. Arrowbin's pages are server-rendered. When we tested our own site on October 14, 2026, our robots.txt explicitly welcomed eleven AI crawlers, GPTBot among them, yet requests sent with GPTBot's user agent got a 403 from Cloudflare. Robots.txt said yes. The edge said no.",
    },
    {
      type: "p",
      text: "To test your own store, request a product page with curl and the crawler's user agent string, then look at the status code. A 403 or a challenge page means something in front of your site is blocking it. A user-agent test isn't proof, because real crawlers come from published IP ranges, so confirm in your CDN's security event log. It's a quick job for whoever runs your [hosting and CDN setup](/services/cloud-devops-hosting).",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/crawler-two-gates.svg`,
        alt: "Diagram of the two gates an AI crawler must pass: robots.txt allows both OAI-SearchBot and GPTBot, but a CDN AI bot rule blocks GPTBot with a 403, so the product page is never read",
        caption:
          "robots.txt and your CDN both have to say yes. Sources: OpenAI crawler docs, Cloudflare AI bot policy docs. The blocked row is what we found when we tested our own site on October 14, 2026.",
        width: 1280,
        height: 720,
      },
    },

    {
      type: "h2",
      text: "What are ACP and UCP, and does a small store need them?",
    },
    {
      type: "p",
      text: "ACP and UCP are open protocols that let an AI agent run a checkout with a merchant. ACP comes from Stripe and OpenAI; Google launched UCP with Shopify and other retailers. Most small stores will get them through their platform or payment provider rather than by building them.",
    },
    {
      type: "p",
      text: "The [Agentic Commerce Protocol](https://www.agenticcommerce.dev/) is open source under Apache 2.0, was developed by Stripe and OpenAI, and names Stripe as the first compatible payment provider. ChatGPT was the first platform to use it. OpenAI's [key concepts page](https://developers.openai.com/commerce/guides/key-concepts) is clear that OpenAI isn't the merchant of record: you bring your own payment provider, calculate tax and decide whether to accept each order.",
    },
    {
      type: "p",
      text: "The [Universal Commerce Protocol](https://ucp.dev/) is also Apache 2.0. Google built it with retailers including Shopify and Walmart, and the UCP site now lists Amazon and Microsoft among its co-developers too. It covers the whole order, from catalog search through checkout to order management, and it already powers Google's checkout in AI Mode and Gemini for select merchants.",
    },
    {
      type: "p",
      text: "In our view, a store doing a few hundred orders a month shouldn't build either protocol by hand this year. Your platform or payment provider is adding support (Microsoft already lists PayPal and Stripe routes into Copilot Checkout), and the specs keep moving. Wait for the button in your dashboard.",
    },
    {
      type: "p",
      text: "A custom build starts to make sense with a large catalog, B2B prices that differ per customer, or checkout rules no plugin handles, such as made-to-order goods or split shipments. Then it's a normal integration project. You map your catalog and order system to the spec, keep your own database as the source of truth, and put one protocol layer in front that you can swap later. We'd treat it as a [custom checkout and feed integration](/services/custom-software-development) and start with your payment provider's docs.",
    },
    {
      type: "p",
      text: "Model Context Protocol (MCP) comes up here too. UCP treats MCP as one of several ways an agent can talk to a store, next to plain REST, so an MCP server on its own won't get you into AI shopping results. An assistant that answers questions about your own catalog or a customer's orders is a different project, closer to [AI integrations for your store](/services/ai-automation). Our guide to [what an AI agent costs a small business](/blog/ai-agent-cost-small-business) prices that kind of build.",
    },
    {
      type: "p",
      text: "If you are deciding which store jobs to hand to AI first, such as order-status replies or product questions, start with [where to start with AI automation](/blog/ai-automation-for-small-business).",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/acp-vs-ucp.svg`,
        alt: "Side-by-side comparison of the Agentic Commerce Protocol and the Universal Commerce Protocol: who built each, Apache 2.0 license, where each is used, payments, merchant of record and the usual route for a small store",
        caption:
          "Both are open, and in both you stay the merchant of record. Sources: agenticcommerce.dev, OpenAI commerce docs, ucp.dev, Google, Google Merchant Center Help, Microsoft Advertising.",
        width: 1280,
        height: 720,
      },
    },

    {
      type: "h2",
      text: "What should a WooCommerce or custom store do this quarter?",
    },
    {
      type: "p",
      text: "Make product pages server-rendered, complete your Product and Offer markup and let the right crawlers in at robots.txt and the CDN. Then get a clean feed into Google Merchant Center, apply to OpenAI's merchant program, and keep price and stock right everywhere.",
    },
    {
      type: "p",
      text: "Start with a two-minute test. Open a product page, view the raw source (not the inspector, which shows the page after JavaScript runs) and search for the price. If it isn't there, AI crawlers that don't run JavaScript won't see it either.",
    },
    {
      type: "p",
      text: "That's not a guess. Vercel's [December 2024 crawler study](https://vercel.com/blog/the-rise-of-the-ai-crawler) found that none of the major AI crawlers rendered JavaScript: ChatGPT's and Claude's crawlers fetched script files without running them, while Gemini rides on Googlebot, which does render. Google's own merchant listing docs warn that dynamically generated markup can make Shopping crawls \"less frequent and less reliable.\"",
    },
    {
      type: "p",
      text: "Plain WooCommerce builds product pages in PHP on the server, so the price is usually in the source already. The trouble spots we look for are elsewhere: a caching layer serving yesterday's price, two plugins each printing their own Product markup with different numbers, and the variable-product price range covered above. If you're weighing a move off WooCommerce anyway, our guide to [moving WooCommerce to a server-rendered store](/blog/wordpress-to-nextjs-migration) covers the trade-offs.",
    },
    {
      type: "p",
      text: "Headless and custom React storefronts are the opposite case. If the price arrives from an API call in the browser, most AI crawlers never see it, and the fix is server rendering. Arrowbin's own site is served that way, and it's how we build stores. If you're still deciding, [weigh the costs of going headless](/blog/headless-commerce) first.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/client-vs-server-render.svg`,
        alt: "Before and after HTML comparison: a client-rendered product page sends crawlers an empty root div and a script tag with no price, while a server-rendered page sends the product name and the $48.00 price with stock status and Product JSON-LD in the first response",
        caption:
          "If the price isn't in the first HTML response, most AI crawlers miss it. Sources: Vercel (December 17, 2024); Google Search Central. Example markup is illustrative.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "This is the checklist we work through, roughly in order. Effort is our estimate for a typical small store: S is a day or less, M a few days, L a week or more.",
    },
    {
      type: "table",
      headers: [
        "Task",
        "Why it matters",
        "Effort (our estimate)",
        "Who does it",
      ],
      rows: [
        [
          "Find price and stock in the raw source of five product pages",
          "Crawlers that don't run JavaScript only see the raw HTML",
          "S",
          "Owner",
        ],
        [
          "Server-render product pages, or prerender them",
          "Puts the price and stock in the first response",
          "M to L on a client-rendered build",
          "Developer",
        ],
        [
          "Keep one Product block per page, with a complete Offer",
          "Google requires the Offer; duplicate blocks send mixed signals",
          "S to M",
          "Developer",
        ],
        [
          "Fill in GTIN and brand in the markup and the feed",
          "Google recommends both; OpenAI's feed requires brand",
          "M",
          "Owner and developer",
        ],
        [
          "Publish shipping and returns pages and mark them up",
          "Your markup and feeds should point at the same numbers",
          "S",
          "Owner",
        ],
        [
          "Allow the search crawlers (OAI-SearchBot, Googlebot, PerplexityBot); decide on GPTBot and Google-Extended",
          "Search crawlers decide whether you appear at all",
          "S",
          "Owner",
        ],
        [
          "Check bot rules in your CDN, firewall or security plugin",
          "They can block what robots.txt allows",
          "S",
          "Owner or developer",
        ],
        [
          "Set up a Google Merchant Center feed",
          "Covers AI Mode and Gemini, and OpenAI accepts the same format",
          "S to M",
          "Owner",
        ],
        [
          "Add Microsoft Merchant Center if you sell to US buyers",
          "Your route into Copilot and Copilot Checkout",
          "S to M",
          "Owner",
        ],
        [
          "Apply at chatgpt.com/merchants",
          "Direct feed access is approval-only",
          "S",
          "Owner",
        ],
        [
          "Refresh feeds daily and push price and stock changes as they happen",
          "Stale data shows shoppers the wrong price",
          "M",
          "Developer",
        ],
      ],
    },

    { type: "h2", text: "How do you measure sales from AI assistants?" },
    {
      type: "p",
      text: "Use the AI Assistant channel in Google Analytics 4, which groups visits from assistants such as ChatGPT or Gemini, and compare its conversion rate with your other channels. Expect it to undercount.",
    },
    {
      type: "p",
      text: "Google's [channel definitions](https://support.google.com/analytics/answer/9756891) describe AI Assistant as traffic from sources like ChatGPT, Gemini, Deepseek, Copilot or Grok. It excludes Google's AI Overviews and AI Mode, so shoppers who arrive from AI Mode still show up under organic search. You can also tag your own links with the medium ai-assistant, and GA4 will file them in that channel.",
    },
    {
      type: "p",
      text: "The undercount comes from how people shop. Someone reads a recommendation in ChatGPT on their phone, searches your brand name on a laptop that evening, and buys. Last-click reporting hands that sale to organic search or direct.",
    },
    {
      type: "p",
      text: 'Two cheap habits help. Keep the tracking parameters on your feed URLs consistent, so feed clicks are easy to spot. And add "an AI assistant" as an answer to a post-purchase "How did you hear about us?" question.',
    },
    {
      type: "p",
      text: "Keep expectations modest. We haven't found an independently checked figure for how much revenue AI assistants send small stores, so we won't quote one. Your own GA4 data, watched over a few months, is the number that matters.",
    },

    {
      type: "h2",
      text: "What are the risks of selling through AI assistants?",
    },
    {
      type: "p",
      text: "The main risks are wrong prices or stock reaching shoppers through stale data, fraud on orders an agent starts, and rules that change under you, as OpenAI's March 2026 reversal showed.",
    },
    {
      type: "p",
      text: "Stale data is the one you'll meet first. OpenAI's feed spec says sale and availability dates don't schedule anything, so you have to send the new price when a sale starts or ends and update stock when an item sells out. If your feed refreshes nightly and you sell out at noon, an assistant can keep recommending that item for hours. For anything that sells fast, push changes as they happen.",
    },
    {
      type: "p",
      text: "With agent checkout, you stay the merchant of record under ACP and UCP alike. Chargebacks and fraud checks stay with you too. Run agent-started orders through your normal fraud rules, and don't wave them through because a big-name assistant sent them.",
    },
    {
      type: "p",
      text: "Then there's change. Instant Checkout went from launch to deprioritized in about six months, and the newest official page on Perplexity's merchant program we could find dates from 2024. Programs open and close quickly, and terms shift, so keep your own product database as the single source of truth and generate every feed from it. If a channel shuts down, you switch off one feed and carry on.",
    },

    { type: "h2", text: "Which of these fixes pays off first?" },
    {
      type: "p",
      text: "Start with what you control. View the source of a few product pages, run the user-agent test against your CDN, and fill the gaps in your Product and Offer markup. That work pays off in Google whatever happens to ChatGPT's merchant program.",
    },
    {
      type: "p",
      text: "Next, get a clean feed into Google Merchant Center, apply to OpenAI's program, and add Microsoft Merchant Center if you sell to US buyers. Agent checkout can wait until your platform or payment provider offers it.",
    },
    {
      type: "p",
      text: "If your store renders prices in the browser, or you're on WooCommerce and thinking about a server-rendered rebuild, we can help you [build a store AI assistants can read](/services/ecommerce-development). Send a product URL through our [contact page](/contact) and we'll tell you what an AI crawler sees on it.",
    },
  ],
  takeaways: [
    "Since March 2026, OpenAI lets merchants use their own checkout and focuses ChatGPT on product discovery, so being found and being accurate matter more than in-chat buying.",
    "Products reach AI assistants through crawled product pages, through product feeds, or through platform catalogs such as Shopify Catalog.",
    "You don't need Shopify, but you do need server-rendered product pages: in Vercel's 2024 crawler study, ChatGPT's and Claude's crawlers didn't run JavaScript.",
    "Complete Product and Offer markup (a price above zero with its currency, stock status, shipping, returns) helps in Google and mirrors what OpenAI's feed asks for.",
    "Allow OAI-SearchBot in robots.txt, then check your CDN, because the edge can block crawlers that robots.txt invites.",
    "OpenAI's direct feed is approval-only as of October 2026, so a clean Google Merchant Center feed is the best first step for most stores.",
    "Track the GA4 AI Assistant channel and expect it to undercount sales that started in an AI chat.",
  ],
  faqs: [
    {
      question: "Can I sell in ChatGPT without a Shopify store?",
      answer:
        "Yes. Products from any platform can appear in ChatGPT shopping answers if OAI-SearchBot can read accurate, server-rendered product pages. A direct product feed needs approval through OpenAI's merchant program, and Shopify's Agentic plan is another route that lets you keep your current platform.",
    },
    {
      question: "Does ChatGPT charge merchants to list products?",
      answer:
        "OpenAI's commerce docs, as we read them, list no listing fee, and they treat ads as a separate program with its own requirements. Shopify says ChatGPT sales through Agentic Storefronts carry no transaction fees beyond standard processing rates. If OpenAI accepts you into its feed program, read the terms you're offered.",
    },
    {
      question: "Should I block GPTBot to protect my product content?",
      answer:
        "Blocking GPTBot is a content-licensing decision. It tells OpenAI not to use your content for model training, while ChatGPT search relies on a different crawler, OAI-SearchBot. You can block GPTBot and still appear in ChatGPT search, as long as OAI-SearchBot stays allowed.",
    },
    {
      question:
        "If my product pages have structured data, do I still need a feed?",
      answer:
        "You don't need a feed to be crawled, but a feed gives assistants fresher price and stock data. Third-party tracking published in September 2026 suggests feeds now supply most of the ChatGPT Shopping picks it follows. Keep the feed and the page saying exactly the same thing.",
    },
    {
      question: "Why don't my products show up in AI shopping results?",
      answer:
        "Usually it's prices that only render in the browser, crawlers blocked by robots.txt or a CDN rule, missing or conflicting Product markup, and missing shipping or return details. For ChatGPT, not having a connected feed is increasingly a cause too. Check them in that order.",
    },
    {
      question: "What's the difference between ACP and UCP?",
      answer:
        "Both are open protocols under Apache 2.0 for checkouts run by AI agents. ACP was developed by Stripe and OpenAI and is used in ChatGPT. UCP was launched by Google with retailers including Shopify and Walmart, powers checkout in AI Mode and Gemini, and Microsoft asks for UCP-ready feeds for Copilot Checkout.",
    },
    {
      question: "Does any of this matter for stores in Bangladesh?",
      answer:
        "The crawlability and product data steps apply in any market, because readable pages and open crawler access help everywhere. Checkout programs, though, are limited to certain markets, such as US buyers for Copilot Checkout and products eligible in the US, Canada or Australia for Google's UCP checkout. Check availability for your country before planning around them.",
    },
    {
      question: "How long do robots.txt changes take to reach ChatGPT?",
      answer:
        "OpenAI says it can take about 24 hours from a robots.txt update for its systems to adjust. If you also changed CDN or firewall rules, those apply straight away, so test with the crawler's user agent after both changes.",
    },
  ],
};
