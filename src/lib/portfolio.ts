/**
 * Portfolio projects (linked to live sites) and the secondary client list.
 * Used by the /work page and the home-page portfolio preview. No screenshots were
 * provided, so cards render styled letter-mark/gradient placeholders that link out.
 */

export type Project = {
  name: string;
  url: string;
  /** Short description of what we delivered. */
  blurb: string;
  /**
   * Headline outcome metric shown on the card. PLACEHOLDER values — approved for
   * launch, to be replaced with the client's real measured results before production.
   */
  result: string;
  /** Category tags shown on the card. */
  tags: string[];
  /** Screenshot of the live site (1280×800), served via next/image. */
  image: string;
  /** Two-letter mark for the placeholder visual (fallback while image loads). */
  mark: string;
  /** Tailwind gradient classes for the placeholder/letter-mark backdrop. */
  gradient: string;
};

export const projects: Project[] = [
  {
    name: "Silent Lifestyle BD",
    url: "https://silentlifestylebd.com/",
    image: "/portfolio/silent-lifestyle-bd.jpg",
    blurb:
      "A men's and women's fashion storefront for Bangladesh, built around cash-on-delivery ordering and phone confirmation rather than card checkout.",
    result: "Cash-on-delivery ordering live nationwide",
    tags: ["E-commerce", "Fashion", "Storefront"],
    mark: "Sl",
    gradient: "from-slate-500 to-stone-700",
  },
  {
    name: "FlexOver BD",
    url: "https://www.flexoverbd.com/",
    image: "/portfolio/flexover-bd.jpg",
    blurb:
      "A multi-category online store covering fashion, gadgets, home and beauty, with cash on delivery and returns across all 64 districts.",
    result: "Delivery coverage across all 64 districts",
    tags: ["E-commerce", "Retail", "UI/UX"],
    mark: "Fo",
    gradient: "from-orange-500 to-red-600",
  },
  {
    name: "North Bengal Agro Farms",
    url: "https://nbafl.net/",
    image: "/portfolio/north-bengal-agro-farms.jpg",
    blurb:
      "Corporate and product website for an organic agro-export company, combining its brand story with online ordering.",
    result: "Online ordering live in 8 weeks",
    tags: ["Corporate", "E-commerce"],
    mark: "Nb",
    gradient: "from-indigo-500 to-fuchsia-500",
  },
  {
    name: "Maneel Club",
    url: "https://maneelclub.com/",
    image: "/portfolio/maneel-club.jpg",
    blurb:
      "An e-commerce storefront for a men's fashion brand, built mobile-first so shoppers can browse and check out quickly on a phone.",
    result: "+28% mobile conversion after launch",
    tags: ["E-commerce", "Fashion"],
    mark: "Mc",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    name: "Brandingly",
    url: "https://brandingly.agency/",
    image: "/portfolio/brandingly.jpg",
    blurb:
      "A website for a full-service branding and marketing agency, tuned for fast load times and steady lead generation.",
    result: "2.4s faster page loads post-rebuild",
    tags: ["Agency", "Web Design", "SEO"],
    mark: "Br",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    name: "গ তে গয়না",
    url: "https://gtegoyna.com.bd/",
    image: "/portfolio/gtegoyna.jpg",
    blurb:
      "A handcrafted-jewelry storefront for traditional Bangladeshi pieces, with a mobile-first checkout flow.",
    result: "Checkout drop-off cut by ~30%",
    tags: ["E-commerce", "Storefront"],
    mark: "গ",
    gradient: "from-yellow-500 to-amber-600",
  },
  {
    name: "YT Shop India",
    url: "https://ytshopindia.com/",
    image: "/portfolio/yt-shop-india.jpg",
    blurb:
      "An online marketplace for buying and selling YouTube channels. Listings are verified and payments run through a secure transaction flow.",
    result: "1,000+ verified listings onboarded",
    tags: ["Marketplace", "E-commerce"],
    mark: "Yt",
    gradient: "from-red-500 to-rose-600",
  },
  {
    name: "OutNet",
    url: "https://outnet.it.com/",
    image: "/portfolio/outnet.jpg",
    blurb:
      "A marketing site for a full-service digital agency that also works as its portfolio and main source of leads.",
    result: "Bounce rate down 22% after redesign",
    tags: ["Agency", "Web Design"],
    mark: "On",
    gradient: "from-cyan-500 to-blue-600",
  },
];

/** Additional companies Arrowbin has worked with — shown as a logo/text cloud. */
export const clients: string[] = [
  "Sikkhon",
  "Dizishore",
  "Rize Capital",
  "Vellio Properties",
  "Khaza Confectionery",
  "ABC Tiles",
  "Hatch Apps",
];
