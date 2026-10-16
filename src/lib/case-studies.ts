/**
 * Client case studies, shown at /work/[slug].
 *
 * A case study goes live only once the client has approved it in writing: the
 * numbers, the screenshots and the quote. Until `approved` is true it is left
 * out of the production build (404, no sitemap entry, no link from /work) and
 * shows only in `next dev`, with a draft banner. A quote shows only once its
 * own `approved` is true, in the client's exact words.
 *
 * Every number here comes from the client's own admin or Google Search Console
 * (read 16 Oct 2026). Never add revenue, order values or customer details.
 * Sources and the private research notes: docs/case-studies/raw/ (gitignored).
 */

export type Shot = {
  /** Public path of the screenshot. */
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type CaseStudy = {
  slug: string;
  /** Must match the project's `name` in src/lib/portfolio.ts. */
  client: string;
  url: string;
  approved: boolean;
  /** ISO date the case study was published (or drafted). */
  date: string;
  category: string;
  /** Full <title>, without the site suffix added by the layout. */
  title: string;
  description: string;
  headline: string;
  intro: string;
  facts: { label: string; value: string }[];
  stats: { value: string; label: string }[];
  statsTitle: string;
  brief: { lead: string; problems: string[]; goal: string };
  built: { title: string; text: string; points?: string[] }[];
  findings: string[];
  quote?: { text: string; name: string; role: string; approved: boolean };
  next?: string;
  shots: {
    /** Hero pair: a desktop page in a browser frame and the phone view. */
    desktop: Shot;
    mobile: Shot;
    /** The old site next to the same page on the new one. */
    beforeAfter?: { before: Shot; after: Shot };
    /** Evidence for the numbers, such as a Search Console chart. */
    proof?: Shot;
  };
  og: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "maneel-club",
    client: "Maneel Club",
    url: "https://maneelclub.com/",
    approved: true,
    date: "2026-10-16",
    category: "E-commerce",
    title: "Maneel Club case study: 10,000+ orders on a custom Next.js store",
    description:
      "How we replaced Maneel Club's plugin-heavy WordPress store with a custom Next.js store in 10 days. 10,000+ orders since February 2026.",
    headline: "A new store in 10 days. 10,000+ orders since.",
    intro:
      "Maneel Club sells men's T-shirts, polos and jeans online across Bangladesh. We replaced its WordPress store with a custom Next.js store and an admin built around cash on delivery.",
    facts: [
      { label: "Client", value: "Maneel Club, men's fashion, Bangladesh" },
      { label: "Live since", value: "February 2026" },
      { label: "Build time", value: "10 days to version 1" },
      { label: "Stack", value: "Next.js, custom admin" },
    ],
    statsTitle: "What the store has done since launch",
    stats: [
      { value: "10,000+", label: "Orders since February 2026" },
      { value: "17,000+", label: "Items sold" },
      { value: "70+", label: "Cities and towns ordering" },
      { value: "+84%", label: "Monthly sales, March to September 2026" },
    ],
    brief: {
      lead: "Most of Maneel Club's shoppers arrive from Facebook and Instagram, on their phones. The old WordPress store was holding the business back:",
      problems: [
        "It was slow.",
        "The dashboard was messy, with many plugins to manage.",
        "Plugin updates kept breaking the site.",
        "Custom features the business needed couldn't be added.",
        "It couldn't grow with the business.",
      ],
      goal: "They needed a fast store and an admin built around how they actually sell, and they needed it quickly.",
    },
    built: [
      {
        title: "Version 1 in 10 days",
        text: "The storefront, checkout and admin went live in February 2026. Since then we've added features as the team asked for them, such as tracking which channel each sale came from.",
      },
      {
        title: "A fast, mobile-first store",
        text: "Shoppers come from social media on their phones, so the store is built for that: quick product pages, size and colour options, and a short checkout.",
      },
      {
        title: "An admin built for cash on delivery",
        text: "Nearly 99% of orders are paid in cash at the door, which changes what the admin has to do.",
        points: [
          "Fake-order control: staff ban a phone number or IP address and repeat fake orders stop at checkout. 65 numbers are blocked so far.",
          "Delivery charges by city: 73 delivery cities, each tied to a zone, so the right charge applies at checkout automatically.",
          "Stock audits, sizes and colours, coupons, timed offers, reviews and a hero slider the team updates themselves.",
        ],
      },
      {
        title: "Analytics the owner actually uses",
        text: "Orders, units, cancellations and sales for any period, compared with the period before, plus sales by product, by city, by channel and by payment method, with CSV export.",
      },
    ],
    findings: [
      "Dhaka places just over half of all orders, but customers order from 70+ cities and towns, so delivery outside Dhaka matters.",
      "Payment is almost entirely cash on delivery (98.7% of orders); bKash and Nagad together are about 1%.",
    ],
    quote: {
      text: "Our old WordPress store kept breaking after plugin updates, and we couldn't add the features we needed. Arrowbin built our new store in 10 days, and it has taken more than 10,000 orders since. When we need something new, they build it.",
      name: "Md. Omar Faruk",
      role: "Founder and owner, Maneel Club",
      approved: true,
    },
    next: "We still work with Maneel Club, adding features as the business needs them.",
    shots: {
      desktop: {
        src: "/case-studies/maneel-club/shop-desktop.jpg",
        alt: "Maneel Club's new store: the shop page with filters on desktop",
        width: 1440,
        height: 900,
      },
      mobile: {
        src: "/case-studies/maneel-club/home-mobile.jpg",
        alt: "Maneel Club's new store home page on a phone",
        width: 780,
        height: 1688,
      },
      beforeAfter: {
        before: {
          src: "/case-studies/maneel-club/before-2025.jpg",
          alt: "Maneel Club's old WordPress store home page in March 2025",
          width: 1440,
          height: 900,
          caption: "Before: the WordPress store, March 2025 (Internet Archive)",
        },
        after: {
          src: "/case-studies/maneel-club/home-desktop.jpg",
          alt: "Maneel Club's new store home page in 2026",
          width: 1440,
          height: 900,
          caption: "After: the new store, live since February 2026",
        },
      },
    },
    og: "/case-studies/maneel-club/og.jpg",
  },
  {
    slug: "north-bengal-agro-farms",
    client: "North Bengal Agro Farms",
    url: "https://nbafl.net/",
    approved: true,
    date: "2026-10-16",
    category: "Corporate and e-commerce",
    title:
      "North Bengal Agro Farms case study: from 48 to 26,000+ Google impressions",
    description:
      'In about two weeks we rebuilt an organic farm\'s dated WordPress site on Next.js. Within weeks it ranked top 2 on Google for "amrapali mango".',
    headline: "From 48 to 26,353 Google impressions in one mango season",
    intro:
      "North Bengal Agro Farms has grown organic mangoes, fruit and vegetables in Rajshahi since 2010. In about two weeks we rebuilt its WordPress site on Next.js, with a shop, mobile-wallet payment checks and SEO built in from day one.",
    facts: [
      {
        label: "Client",
        value: "North Bengal Agro Farms Ltd., organic farm, Rajshahi",
      },
      { label: "Live since", value: "May 2026" },
      { label: "Build time", value: "About 2 weeks" },
      { label: "Stack", value: "Next.js, custom admin, Cloudflare" },
    ],
    statsTitle: "What Google shows since launch",
    stats: [
      {
        value: "48 → 26,353",
        label:
          "Google impressions, same mango-season weeks: old site in 2025, new site in 2026",
      },
      { value: "63,800", label: "Impressions in the first 20 weeks" },
      { value: "#2", label: 'Average position for "amrapali mango"' },
      { value: "7 of 7", label: "Products eligible for Google rich results" },
    ],
    brief: {
      lead: "The farm's old WordPress site didn't do its produce justice:",
      problems: [
        "It was a basic site and it was slow.",
        "The design was dated and didn't feel modern or premium.",
        'In December 2024 its homepage was an empty "Archives" page with a menu.',
      ],
      goal: "The goal was a fast, modern site that looks as premium as the farm, takes orders online and gets found on Google.",
    },
    built: [
      {
        title: "A brand site that sells",
        text: "The farm's story, produce and certifications, with a shop for seasonal mangoes (Amrapali, Banana mango, Miyazaki and more) and a quote request for wholesale buyers.",
      },
      {
        title: "Payments that work in Bangladesh",
        text: "Customers pay cash on delivery or by bKash, Nagad or Rocket. Wallet payments land in a verification queue, where staff match the transaction ID against the statement before confirming the order.",
      },
      {
        title: "An admin the farm runs itself",
        text: "Products with variants, orders, customers, shipping zones and district rates, a blog with authors and categories, team accounts and an audit log of who changed what.",
      },
      {
        title: "SEO built in from day one",
        text: "Not bolted on after launch.",
        points: [
          "Unique titles, descriptions and canonical tags on every page, with a sitemap and robots.txt.",
          "Structured data for products (price, shipping and returns), the shop, blog articles, breadcrumbs and the farm itself.",
          "Every old WordPress URL redirected to its new page or retired cleanly, so no links were lost.",
        ],
      },
    ],
    findings: [
      "The site reached the top 2 on Google for the farm's main mango varieties within weeks, in English, Bengali and Hindi.",
      "93% of impressions are on mobile, where the site's average position is 2.",
      "Search interest peaks in mango season (37,600 impressions in July) and falls after, as expected for a seasonal crop.",
    ],
    quote: {
      text: "Our old website was slow and looked dated. The new site finally looks as premium as our farm, customers can order and pay by bKash, and people find us on Google when they search for Amrapali mangoes.",
      name: "Shahin Alam",
      role: "Manager, North Bengal Agro Farms",
      approved: true,
    },
    shots: {
      desktop: {
        src: "/case-studies/north-bengal-agro-farms/home-desktop.jpg",
        alt: "North Bengal Agro Farms' new website home page on desktop",
        width: 1440,
        height: 900,
      },
      mobile: {
        src: "/case-studies/north-bengal-agro-farms/home-mobile.jpg",
        alt: "North Bengal Agro Farms' new website on a phone",
        width: 780,
        height: 1688,
      },
      proof: {
        src: "/case-studies/north-bengal-agro-farms/search-console-16-months.jpg",
        alt: "Google Search Console chart for nbafl.net over 16 months: almost nothing on the old site, then a sharp rise after the new site launched in May 2026",
        width: 1226,
        height: 365,
        caption:
          "Google Search Console, nbafl.net, last 16 months (16 Oct 2026). The flat start is the old WordPress site; the new site launched in late May 2026.",
      },
    },
    og: "/case-studies/north-bengal-agro-farms/og.jpg",
  },
];

/** `next dev` shows drafts so they can be reviewed before the client says yes. */
const showDrafts = process.env.NODE_ENV === "development";

/** Case studies that may render in this build. */
export const visibleCaseStudies = caseStudies.filter(
  (c) => c.approved || showDrafts,
);

export const getCaseStudy = (slug: string) =>
  visibleCaseStudies.find((c) => c.slug === slug);

/** The visible case study for a portfolio project, by client name. */
export const caseStudyFor = (client: string) =>
  visibleCaseStudies.find((c) => c.client === client);
