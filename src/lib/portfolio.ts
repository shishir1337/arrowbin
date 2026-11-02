/**
 * Portfolio projects (linked to live sites) and the secondary client list.
 * Used by the /work page and the home-page portfolio preview. Each card shows a
 * 1280×800 screenshot of the live site (retake it when the site changes, then
 * run `node scripts/generate-blur.mjs`); its blurred placeholder shows while
 * it loads. Facts per project: docs/seo/00-brief/portfolio-facts.md.
 */

export type Project = {
  name: string;
  url: string;
  /** Short description of what we delivered. */
  blurb: string;
  /**
   * Headline outcome shown on the card: a factual description of what was
   * delivered. Only add a number (conversion, speed, revenue) once the client
   * has confirmed it in writing; unconfirmed figures are a trust and legal risk.
   */
  result: string;
  /** Category tags shown on the card. */
  tags: string[];
  /** Screenshot of the live site (1280×800), served via next/image. */
  image: string;
};

export const projects: Project[] = [
  {
    name: "Silent Lifestyle BD",
    url: "https://silentlifestylebd.com/",
    image: "/portfolio/silent-lifestyle-bd.jpg",
    blurb:
      "A Dhaka fashion brand with physical showrooms and no website. We built its first online store from scratch on Next.js, with a custom admin and phone-confirmed cash on delivery.",
    result: "First online store, built from scratch with its own admin",
    tags: ["E-commerce", "Fashion", "Storefront"],
  },
  {
    name: "FlexOver BD",
    url: "https://www.flexoverbd.com/",
    image: "/portfolio/flexover-bd.jpg",
    blurb:
      "A brand-new business with no website. We built its multi-category store from scratch on Next.js, with a custom admin for orders, stock alerts, coupons and flash sales.",
    result: "Built from scratch: storefront plus custom admin",
    tags: ["E-commerce", "Retail", "UI/UX"],
  },
  {
    name: "North Bengal Agro Farms",
    url: "https://nbafl.net/",
    image: "/portfolio/north-bengal-agro-farms.jpg",
    blurb:
      "An organic farm in Rajshahi that had a basic WordPress site. We rebuilt it on Next.js with a shop, bKash, Nagad and Rocket payment checks, a blog and a custom admin.",
    result: "Rebuilt from WordPress with online ordering and payment checks",
    tags: ["Corporate", "E-commerce"],
  },
  {
    name: "Maneel Club",
    url: "https://maneelclub.com/",
    image: "/portfolio/maneel-club.jpg",
    blurb:
      "An online men's fashion brand that had a basic WordPress store. We rebuilt it on Next.js with a custom admin: stock audits, coupons, delivery cities and fake-order blocking.",
    result: "10,000+ orders through the new store since February 2026",
    tags: ["E-commerce", "Fashion"],
  },
  {
    name: "Brandingly",
    url: "https://brandingly.agency/",
    image: "/portfolio/brandingly.jpg",
    blurb:
      "A full-service branding and marketing agency in Dhaka. We redesigned its basic WordPress site with a new UI/UX, and kept it on WordPress.",
    result: "Redesigned with a new UI/UX on WordPress",
    tags: ["Agency", "Web Design", "WordPress"],
  },
  {
    name: "গ তে গয়না",
    url: "https://gtegoyna.com.bd/",
    image: "/portfolio/gtegoyna.jpg",
    blurb:
      "A well-known Bangladeshi jewellery brand with no website. We built its first online store on Shopify, and we're now rebuilding it on Next.js with Android and iOS apps.",
    result: "First online store, launched on Shopify",
    tags: ["E-commerce", "Storefront", "Shopify"],
  },
  {
    name: "OutNet",
    url: "https://outnet.it.com/",
    image: "/portfolio/outnet.jpg",
    blurb:
      "A marketing site for a full-service digital agency that also works as its portfolio and main source of leads.",
    result: "Rebuilt from WordPress on Next.js as its lead engine",
    tags: ["Agency", "Web Design"],
  },
];

/** Additional companies Arrowbin has worked with: shown as a logo/text cloud. */
export const clients: string[] = [
  "Sikkhon",
  "Dizishore",
  "Rize Capital",
  "Vellio Properties",
  "Khaza Confectionery",
  "ABC Tiles",
  "Hatch Apps",
];
