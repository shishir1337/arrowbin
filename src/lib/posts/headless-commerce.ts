import type { Post } from "@/lib/blog";
import { site } from "@/lib/site";

const DIR = "/blog/headless-commerce";

export const post: Post = {
  slug: "headless-commerce",
  title: "Headless Commerce: Is It Worth It for Your Store in 2026?",
  description:
    "Is headless commerce worth it for your store? What it changes, what it costs on Shopify and BigCommerce, the SEO risks, and a checklist to decide.",
  keywords: [
    "headless commerce",
    "is headless commerce worth it",
    "what is headless commerce",
    "headless commerce pros and cons",
    "headless shopify",
    "headless commerce cost",
    "headless woocommerce",
    "composable commerce",
  ],
  date: "2026-10-22",
  dateLabel: "October 22, 2026",
  author: "Md. Shishir Ahmed",
  readingTime: "14 min read",
  category: "E-commerce",
  excerpt:
    "Headless commerce buys you design freedom and more storefronts, at the price of a second system to build and run. When it pays off, what it costs from the vendors' own pricing pages, and why most stores should wait.",
  image: {
    src: `${DIR}/cover.webp`,
    alt: "Mockup of a headless commerce setup: a custom storefront in a browser window beside a separate commerce back office with an orders list, joined by an API line that also feeds a phone app and an AI shopping assistant showing the same product",
    width: 1280,
    height: 720,
  },
  tldr: "Headless commerce is worth it when your store needs something a theme can't give you: several storefronts or channels fed from one catalog, content-heavy pages, or a front end your own developers control. For a store that sells in one market from one website with no developer on call, it usually isn't worth it yet, because a well-built theme gets you most of the speed for far less. Expect about 8–12 weeks to build (our estimate) plus a second system to host and maintain; Shopify's own developer docs say a headless storefront costs more to build and run than a theme.",
  body: [
    {
      type: "p",
      text: "If you run an online store on Shopify, WooCommerce or BigCommerce, someone has probably told you to go headless. It might have been an agency pitch, or a competitor's new site that loads like an app. This guide is for the owner or e-commerce lead who has to decide whether it would pay off, without wading through developer docs.",
    },
    {
      type: "p",
      text: "Some context. At Arrowbin we build custom Next.js storefronts and the admin panels behind them, so the storefront half of a headless project is our everyday work. You'd expect us to say yes to everyone.",
    },
    {
      type: "p",
      text: "For a lot of stores, we'd say wait. This is how to tell which group you're in.",
    },

    { type: "h2", text: "What is headless commerce, in plain terms?" },
    {
      type: "p",
      text: "Headless commerce means your store's website (the 'head') is a separate application from the commerce engine that holds your products and orders. The two talk through APIs, so you can redesign or replace the website without touching the back office your team works in.",
    },
    {
      type: "p",
      text: "On a normal Shopify or WooCommerce store, one system does both jobs. The theme that draws your pages lives inside the same platform that runs checkout and stores orders. That's why theme changes are quick. It's also why you can only build what the theme system allows.",
    },
    {
      type: "p",
      text: "Go headless and the platform keeps the back office, from the catalog to checkout and customer accounts. Your storefront becomes its own app, usually built with a JavaScript framework such as Next.js and hosted wherever you choose. It asks the platform for data as pages load. Shopify's developer docs say its [Storefront API](https://shopify.dev/docs/storefronts/headless) 'serves products, collections, search, and the cart, and hands customers off to checkout.'",
    },
    {
      type: "p",
      text: "Two related terms come up in every pitch. Composable commerce goes further and splits the back end as well, so search, content or promotions can each come from a different vendor. MACH is the industry label for that style. commercetools, one of the main composable vendors, [describes MACH](https://commercetools.com/blog/the-differences-between-composable-headless-and-mach) as a mix of microservices, an API-first approach, cloud-native hosting and headless front ends.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/headless-vs-traditional.svg`,
        alt: "Diagram of headless commerce compared with a traditional store: in a traditional Shopify or WooCommerce store the theme and the commerce engine are one system, while in a headless setup the website is its own app, and a mobile app or an AI assistant can call the same commerce back end through an API",
        caption:
          "Traditional vs headless: what separates, and what stays on the platform. Arrowbin diagram.",
        width: 1280,
        height: 720,
      },
    },

    {
      type: "h2",
      text: "What does going headless actually change for your business?",
    },
    {
      type: "p",
      text: "Going headless changes who controls the storefront. You gain freedom over how the store looks and where you sell, and you take on a second system that needs its own hosting and its own developers. The back office your staff use every day mostly stays the same.",
    },
    {
      type: "ul",
      items: [
        "Design: no theme limits. Any layout your designers can draw, your developers can build, so product builders and story-led pages stop being workarounds.",
        "Speed: you decide every script that loads. That matters, but it isn't automatic. A heavy headless build can be slower than a lean theme.",
        "Content: product pages and editorial can share one experience, with a headless CMS for the writing. WordPress can do that job if your editors already live in it.",
        "Storefronts and channels: one catalog can feed a second country's site, a sister brand, a mobile app or a screen in a shop.",
        "Page editing: the theme editor your marketing team uses goes away. Edits happen in a CMS or visual editor that someone has to set up, or they go through a developer.",
        "Apps: most Shopify apps add their widgets through the theme. A headless storefront has no theme for them to plug into, so each one gets wired in through its own API, if it has one.",
        "Checkout: on headless Shopify, checkout stays Shopify's. That's a good thing, because it's the part you least want to own.",
      ],
    },
    {
      type: "p",
      text: "Speed is the benefit most pitches lead with, so read the research properly. A Google-commissioned study by 55 and Deloitte, written up on [web.dev](https://web.dev/case-studies/milliseconds-make-millions), tracked 37 brand sites in late 2019 and found that 'a 0.1 second improvement of mobile site speed increases conversion rates by 8.4% for retail sites'. The write-up also says every page across the journey had to improve for that effect to show.",
    },
    {
      type: "p",
      text: "Notice what that study does and doesn't say. It says speed pays. It doesn't say headless makes you fast. A theme store with fewer apps and smaller images can get a lot of the same gain for a fraction of the cost, and that's where I'd start.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/what-moves-to-you.svg`,
        alt: "Comparison chart of who handles each part of an online store on a theme versus headless: with headless the brand takes over the storefront code and its hosting, plus page editing and app integrations, while checkout and orders stay with the commerce platform",
        caption:
          "What moves to your side when you go headless. Simplified Arrowbin view, based on Shopify's headless docs.",
        width: 1280,
        height: 720,
      },
    },

    { type: "h2", text: "Is headless commerce worth it for a small store?" },
    {
      type: "p",
      text: "Usually not yet. If you sell in one market from one website and nobody on your team writes code, headless commerce adds a second system to pay for and look after, and it rarely fixes the problem you actually have.",
    },
    {
      type: "p",
      text: "Shopify says much the same in its own [headless developer docs](https://shopify.dev/docs/storefronts/headless): 'A headless storefront costs more to build and run than a theme.' The same page tells developers to make sure the merchant 'has developers to maintain the storefront after launch' before committing. When the company selling the headless tools puts that warning up front, take it seriously.",
    },
    {
      type: "p",
      text: "Most small stores don't have an architecture problem. A slow theme is usually slow because of a pile of apps and oversized images. Weak conversion tends to come from the product page or the offer, or from shipping costs that appear too late. None of those need a new architecture.",
    },
    {
      type: "p",
      text: "Then there's time. Our planning estimate is 8–12 weeks to build a headless storefront, against 3–6 weeks for a theme-based Shopify store. Those extra weeks, and the budget behind them, could have gone into stock or photography or ads.",
    },
    {
      type: "p",
      text: "My test is simple. If you can't name the specific thing your theme stops you from doing, and roughly what it costs you in sales, you don't need headless yet. Do these first, in this order:",
    },
    {
      type: "ol",
      items: [
        "Remove apps you don't use, and check which of the rest load scripts on every page.",
        "Compress and resize product images, and serve them in modern formats.",
        "Move to a current, well-supported theme if yours is several years old.",
        "Check Core Web Vitals for real visitors in Search Console before and after each change.",
      ],
    },
    {
      type: "cta",
      title: "Not sure which group your store is in?",
      text: "Send us your store URL and the one thing you can't do today. We'll tell you whether a theme fix, a headless front end or a custom build fits, and if the answer is your current theme, we'll say so.",
      href: "/contact",
      label: "Ask for a straight answer",
    },

    { type: "h2", text: "When does headless commerce pay off?" },
    {
      type: "p",
      text: "Headless commerce pays off when one catalog has to feed several front ends. It also earns its cost when content and products need to share one experience, or when your developers already spend more time fighting the theme than building features.",
    },
    {
      type: "p",
      text: "These are the situations where I'd take a headless proposal seriously:",
    },
    {
      type: "ul",
      items: [
        "Several storefronts from one inventory: other countries, languages or sister brands. Shopify's [pricing page](https://www.shopify.com/pricing) shows every plan from Basic to Advanced includes one headless storefront, while Plus includes 25.",
        "Content-led brands, where buying guides, lookbooks or recipes bring in much of the traffic and need to sit right next to the products.",
        "A mobile app and a website that share one cart and one set of customer accounts.",
        "Buying flows a theme handles badly: product builders, bundles, made-to-order options or a trade portal.",
        "A development team, in-house or on retainer, that will own the storefront after launch.",
      ],
    },
    {
      type: "p",
      text: "Picture a skincare brand selling in the US, the UK and Australia. It runs a content hub that brings in much of its search traffic, and it has an app planned for next year. One catalog, three storefronts, heavy content and a second channel: that's the profile headless was built for.",
    },
    {
      type: "p",
      text: "Now picture a candle maker with one US site and two people on staff. A faster theme and better photos will do more for that business than any change of architecture. Same question, opposite answer.",
    },

    {
      type: "h2",
      text: "What does headless commerce cost to build and run?",
    },
    {
      type: "p",
      text: "Headless commerce costs you three things: the build (8–12 weeks of work by our estimate), a monthly software bill (platform plan, front-end hosting, CMS, search), and the people who keep it running. The software is usually the smallest of the three.",
    },
    { type: "h3", text: "The build" },
    {
      type: "p",
      text: "We don't quote one headless build price, because the same 8–12 weeks can cover one storefront or three. The range moves with every app that has to be rebuilt as an integration, and with the number of languages, custom features or pages of content to migrate. Our [Shopify vs custom ecommerce comparison](/blog/shopify-vs-custom-ecommerce) runs the three-year numbers for staying on Shopify against building your own store; headless sits between the two.",
    },
    { type: "h3", text: "The platform" },
    {
      type: "p",
      text: "Every headless setup still pays for a commerce platform underneath. These are list prices in US dollars on monthly billing, taken from each vendor's own pricing page on October 22, 2026:",
    },
    {
      type: "table",
      headers: [
        "Platform and plan",
        "Price per month",
        "Headless detail",
        "Extra fee with an outside payment provider",
      ],
      rows: [
        [
          "Shopify Basic / Grow / Advanced",
          "$25 / $65 / $399",
          "1 headless storefront on each plan",
          "2% / 1% / 0.6%",
        ],
        [
          "Shopify Plus",
          "From $2,300 on a 3-year term; $2,500 on a 1-year term",
          "25 headless storefronts",
          "0.2%",
        ],
        [
          "BigCommerce Core / Growth / Scale",
          "$39 / $105 / $399",
          "Catalyst storefront for Next.js; extra storefronts are a paid add-on",
          "2.0% / 1.0% / 0.6% (Open Payment Providers)",
        ],
        [
          "BigCommerce Performance",
          "From $1,499, billed annually",
          "Contracted plan",
          "None (contracted terms)",
        ],
        [
          "WooCommerce",
          "No platform fee; you pay for hosting",
          "Store API for the cart and checkout",
          "None from WooCommerce",
        ],
        [
          "commercetools",
          "Quote only",
          "Composable by design, priced by orders",
          "Not published",
        ],
      ],
    },
    {
      type: "p",
      text: "Shopify's figures come from its [pricing page](https://www.shopify.com/pricing) and its [Plus pricing page](https://www.shopify.com/plus/pricing). Both show lower rates for yearly or longer terms, so check them before you budget.",
    },
    {
      type: "p",
      text: "BigCommerce's [pricing page](https://www.bigcommerce.com/essentials/pricing/) caps each smaller plan by yearly online sales and moves you up a plan when you pass the cap. Its outside-provider fee doesn't apply to its embedded payment providers. commercetools publishes [no prices](https://commercetools.com/pricing) and asks you to contact sales.",
    },
    {
      type: "p",
      text: "WooCommerce [promises](https://woocommerce.com/woocommerce/) selling without 'monthly platform fees', and that's true. You pay for hosting instead, and for someone to keep WordPress patched.",
    },
    { type: "h3", text: "Front-end hosting, content and search" },
    {
      type: "p",
      text: "Hosting the storefront can cost nothing on Shopify. Its docs say [Oxygen](https://shopify.dev/docs/storefronts/headless/hydrogen/fundamentals), Shopify's hosting for Hydrogen storefronts, 'is available at no extra charge on paid Shopify plans', though not on its Agentic plans. Put a Next.js front end on Vercel instead and its [Pro plan](https://vercel.com/pricing) is $20 a month per developer seat with a $20 usage credit, then pay as you go. The free Hobby plan is for non-commercial use only.",
    },
    {
      type: "p",
      text: "A CMS for your editors and a search service are the other usual lines. Sanity's [pricing](https://www.sanity.io/pricing) has a free plan for up to 20 seats and a Growth plan at $15 per seat a month. Algolia's [Grow plan](https://www.algolia.com/pricing) includes 10,000 searches a month, then charges $0.50 per extra 1,000.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/monthly-software-bill.svg`,
        alt: "Stacked bar chart of the monthly software bill for two example headless Shopify setups at list prices: a lean setup on Shopify Grow with free Oxygen hosting and Sanity's free plan comes to $65 a month, while a larger setup on Shopify Plus, with Vercel Pro hosting plus paid Sanity and Algolia plans, comes to $2,575 a month before usage charges",
        caption:
          "Illustrative setups at list prices from each vendor's pricing page, Oct 22, 2026. Excludes payment processing and apps, and the people who run it.",
        width: 1280,
        height: 720,
      },
    },
    { type: "h3", text: "The team after launch" },
    {
      type: "p",
      text: "The biggest cost doesn't appear on any pricing page. A theme store can run for months with nobody touching code. A headless storefront is software you own, so framework upgrades and API version changes land on your desk, along with bugs and every editing tool your marketing team asks for.",
    },
    {
      type: "p",
      text: "At minimum you need a developer who knows the front-end framework, on staff or on retainer, plus someone watching uptime and errors. Our planning rule for keeping custom software healthy is 15–20% of its build cost each year, and our guide to [software maintenance costs](/blog/software-maintenance-cost) explains what that money pays for.",
    },

    { type: "h2", text: "What are your options for going headless?" },
    {
      type: "p",
      text: "There are four common routes: headless Shopify (Hydrogen or a Next.js front end), headless BigCommerce with its Catalyst storefront, headless WooCommerce on its Store API, and composable commerce built from separate services. They differ mostly in how much of the back end you keep renting.",
    },
    { type: "h3", text: "Headless Shopify" },
    {
      type: "p",
      text: "This is the route most Shopify brands mean when they say headless. Shopify keeps the admin and the checkout (payments included), and you build the storefront. On October 14, 2026 Shopify [made its new Hydrogen generally available](https://shopify.dev/changelog/blog/hydrogen-2026-10-is-now-available): it now 'works with any JavaScript framework', ships starters for React Router and Next.js, and can still run on Oxygen, 'which is still free'.",
    },
    {
      type: "p",
      text: "The Next.js starter is Vercel Shop, which Shopify's [Hydrogen docs](https://shopify.dev/docs/storefronts/headless/hydrogen) list as Vercel's Next.js 16 template, deployed to Vercel. You can also skip Hydrogen and call the Storefront API from any stack. For a Shopify brand this is the lowest-risk way in, because the parts that handle money don't move.",
    },
    { type: "h3", text: "Headless BigCommerce" },
    {
      type: "p",
      text: "BigCommerce's answer is [Catalyst](https://www.catalyst.dev/), a storefront it describes as 'optimized for Next.js and React Server Components', with an optional visual editor called Makeswift. That editor matters more than it sounds. It gives your marketing team a way to change pages without a developer, which is the first thing most teams miss after going headless.",
    },
    { type: "h3", text: "Headless WooCommerce" },
    {
      type: "p",
      text: "WooCommerce's [Store API](https://developer.woocommerce.com/docs/apis/store-api/) offers public endpoints for the cart and checkout, so a Next.js storefront can sit on top of an existing WooCommerce store. Products and orders stay in WordPress. You still keep WordPress and every plugin patched, and plugins that add their own front-end features won't appear on the new site.",
    },
    {
      type: "p",
      text: "Our [WordPress to Next.js migration guide](/blog/wordpress-to-nextjs-migration) covers both halves of that decision: keeping WordPress as a headless CMS, and the three realistic routes for a WooCommerce store.",
    },
    { type: "h3", text: "Composable commerce (MACH)" },
    {
      type: "p",
      text: "Composable means choosing each piece separately: a commerce engine such as commercetools, plus separate services for search, content, promotions or payments, joined by APIs. It's built for large retailers with engineering teams and quote-only contracts. For a growing brand I'd call it overkill, because the integration work becomes a permanent job.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/headless-options.svg`,
        alt: "Matrix of headless commerce options showing which layers the platform provides and which you build or choose: headless Shopify and headless BigCommerce keep checkout and orders on the platform, headless WooCommerce keeps them in WordPress, and composable commerce has you choose every layer",
        caption:
          "Who provides each layer in the four headless routes. Simplified from each platform's developer docs.",
        width: 1280,
        height: 720,
      },
    },

    {
      type: "h2",
      text: "Does headless help you sell through AI shopping assistants?",
    },
    {
      type: "p",
      text: "Headless can help, as long as the storefront is rendered on the server. AI shopping assistants read product data from feeds and from page HTML, and a headless front end that fills in prices with JavaScript in the browser hides them from most of those readers.",
    },
    {
      type: "p",
      text: "Vercel's [study of AI crawlers](https://vercel.com/blog/the-rise-of-the-ai-crawler) (December 2024) found that 'none of the major AI crawlers currently render JavaScript'. Google's [JavaScript SEO guide](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) makes the broader point: 'not all bots can run JavaScript'.",
    },
    {
      type: "p",
      text: "There's an upside too. A headless store already has its whole catalog behind a clean API, which makes product feeds easier to build and keep in sync. Our guide to [getting products into ChatGPT shopping](/blog/chatgpt-shopping-for-online-stores) covers feeds and structured data for any platform, plus the crawler settings that block assistants by accident.",
    },

    {
      type: "h2",
      text: "What are the SEO and migration risks of going headless?",
    },
    {
      type: "p",
      text: "The main risks are pages search engines can't read because they render in the browser, old URLs that stop working, and tracking that breaks on launch day. All of them are preventable. All of them happen.",
    },
    {
      type: "p",
      text: "Rendering comes first. Google does run JavaScript, but through a queue: its [guide to JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) says a page 'may stay on this queue for a few seconds, but it can take longer than that', and calls server-side or pre-rendering 'still a great idea'. Insist that product and collection pages arrive as finished HTML.",
    },
    {
      type: "p",
      text: "URLs come next. A Shopify theme store has fixed paths such as /products/ and /collections/, and a headless build lets you change them. Don't, unless you have a reason. Every URL that changes needs a server-side permanent redirect (301 or 308), and even then Google's [site move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) says to 'expect temporary fluctuation in site ranking during the move'.",
    },
    {
      type: "p",
      text: "Then come the jobs a theme did without anyone noticing. On a headless storefront, each of these is code someone has to write and test:",
    },
    {
      type: "ul",
      items: [
        "Product structured data with price and availability, so rich results and shopping listings keep working.",
        "Canonical tags and the XML sitemap, plus hreflang if you run storefronts for several countries.",
        "Review stars and their markup, which usually came from a theme app.",
        "Analytics and ad pixels, including the purchase event. Test a real order end to end before launch, not after.",
      ],
    },
    {
      type: "p",
      text: "When we plan a storefront move, we crawl the old site first and keep that list of URLs as the redirect checklist. After launch we watch Search Console for new 404s and dropped pages for several weeks, because problems show up there before they show up in sales.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/seo-safeguards.svg`,
        alt: "Headless commerce migration checklist in four stages from before the build to after launch, listing the SEO safeguards at each stage: crawl and map old URLs, server-render product pages, rebuild structured data and tracking, test redirects on staging, then watch Search Console",
        caption:
          "The safeguards that keep a headless launch from losing search traffic. Based on Google Search Central guidance; Arrowbin process.",
        width: 1280,
        height: 720,
      },
    },

    {
      type: "h2",
      text: "How do you decide whether your store should go headless?",
    },
    {
      type: "p",
      text: "Go headless when you can name a business problem a theme can't solve, you can fund a second system, and someone will own it after launch. If any of those is missing, improve the theme you have and ask again in a year.",
    },
    {
      type: "p",
      text: "Run through this checklist with your team. Each 'yes' should come with evidence, not a feeling:",
    },
    {
      type: "ol",
      items: [
        "You can name the specific thing your theme stops you doing, and roughly what it costs you in sales.",
        "You run, or will soon run, more than one storefront: other countries, sister brands or an app.",
        "Content brings in a large share of your customers, and your current setup makes it hard to publish.",
        "You've already done the cheap fixes: app clean-up, lighter images, a current theme.",
        "A developer, in-house or on retainer, will own the storefront after launch.",
        "You can fund the build plus about 15–20% of its cost every year to run it.",
        "Your launch plan includes server rendering, a full redirect map and rebuilt tracking.",
      ],
    },
    {
      type: "p",
      text: "Five or more yeses and a headless build deserves a proper scoping. With three or four, start smaller: Shopify's [headless overview](https://shopify.dev/docs/storefronts/headless) points to Storefront Web Components and Buy Button JS for adding products to an existing site, which is a far smaller project. Fewer than three, stay on your theme.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/headless-decision-tree.svg`,
        alt: "Decision tree for whether to go headless: if your theme doesn't stop you doing something that costs sales, stay on it; if no developer will own the storefront after launch, wait; otherwise go headless on the platform you already have, and consider composable commerce only when the platform itself is the limit and you have an engineering team",
        caption: "A quick way to sort your store. Arrowbin view, not a rule.",
        width: 1280,
        height: 720,
      },
    },

    { type: "h2", text: "So what should you do first?" },
    {
      type: "p",
      text: "Write down the one thing your store can't do today and what it costs you. If the answer is speed, start with apps and images this week. If it's a second storefront, a content hub or an app, you're in headless territory, and the next step is a scoping session rather than a build.",
    },
    {
      type: "p",
      text: "When we assess a store for headless, we start with its Search Console data, then list every app and what it actually does, then sketch what the new storefront would have to rebuild. Sometimes the answer is a better theme. If a custom front end is the right call, we build [custom e-commerce storefronts](/services/ecommerce-development) on Next.js.",
    },
    {
      type: "p",
      text: `Want a second opinion before anyone quotes you for a rebuild? [Book a 30-minute call](${site.bookingUrl}) and bring your store URL and the one thing you can't do today. If the honest answer is "keep your theme", that's what you'll hear.`,
    },
  ],
  takeaways: [
    "Headless commerce separates the storefront from the commerce engine; the back office and checkout usually stay on the platform.",
    "Most stores selling in one market with no developer on call shouldn't go headless yet; clean up apps and images first, then the theme.",
    "Headless pays off when one catalog feeds several storefronts or channels, when content drives sales, or when a team already fights the theme.",
    "The monthly software bill is modest (Oxygen hosting is free on paid Shopify plans); the build and the team after launch are the real costs.",
    "Every Shopify plan from Basic to Advanced includes one headless storefront, and Plus includes 25.",
    "Server rendering, a full redirect map and rebuilt tracking decide whether a headless launch keeps its search traffic.",
    "Since October 14, 2026, Shopify's Hydrogen works with any JavaScript framework, with a ready-made Next.js starter.",
  ],
  faqs: [
    {
      question: "Do I need Shopify Plus to build a headless store?",
      answer:
        "No. Shopify's pricing page lists one headless storefront on each plan from Basic to Advanced, and 25 on Plus. Oxygen hosting for Hydrogen storefronts comes at no extra charge on paid plans. Plus starts to matter when you need several storefronts or its fully customizable checkout.",
    },
    {
      question: "Can I use Next.js instead of Hydrogen for headless Shopify?",
      answer:
        "Yes. Since October 14, 2026, Shopify's Hydrogen works with any JavaScript framework and has a ready-made Next.js starter called Vercel Shop. You can also call the Storefront API from Next.js without Hydrogen. Checkout stays on Shopify either way.",
    },
    {
      question: "Will going headless improve my Google rankings?",
      answer:
        "Not by itself. A faster, cleaner site can help, but rankings depend on content and links too, and a careless launch can lose traffic. Google warns of temporary ranking swings when a site move changes URLs, so plan server rendering and redirects before the build starts.",
    },
    {
      question: "Can my marketing team still edit pages after going headless?",
      answer:
        "Only if you give them a way to. The theme editor doesn't come with you, so editing moves to a headless CMS such as Sanity or a visual editor such as Makeswift on BigCommerce's Catalyst. Budget time for that setup, or every small change becomes a developer ticket.",
    },
    {
      question: "Do Shopify apps still work on a headless storefront?",
      answer:
        "Apps that work inside the admin, such as inventory or shipping tools, keep working. Apps that add widgets to your pages through the theme don't, because there's no theme for them to plug into. Check each app's headless documentation and API before you commit.",
    },
    {
      question: "How long does it take to build a headless storefront?",
      answer:
        "Our planning estimate is 8–12 weeks for a headless storefront, against 3–6 weeks for a theme-based Shopify store. Each extra storefront, language or app integration pushes it toward the top of that range or past it.",
    },
    {
      question:
        "What's the difference between headless and composable commerce?",
      answer:
        "Headless separates the storefront from the commerce back end. Composable also splits the back end into services you choose one by one, such as search or content. Most growing brands need headless at most; composable suits large retailers with engineering teams.",
    },
    {
      question: "Is there a cheaper step before going fully headless?",
      answer:
        "Yes. Shopify's headless docs point to Storefront Web Components and Buy Button JS for adding products to an existing website, such as a content site or blog. That gives you shoppable pages without rebuilding the whole store.",
    },
  ],
};
