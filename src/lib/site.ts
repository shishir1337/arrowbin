/**
 * Central site configuration: single source of truth for NAP (name/address/phone),
 * social profiles, navigation, and the canonical site URL. Imported by metadata,
 * JSON-LD, the navbar, the footer, and the sitemap.
 */

export const siteUrl = "https://arrowbin.com";

export const site = {
  /** The public name, everywhere: titles, footer, schema `name`, profiles. */
  name: "Arrowbin",
  /** The legal entity. Only where the law needs it (Terms, Privacy, schema
   * `legalName`); never as a display name. Change it here if the entity changes. */
  legalName: "Arrowbin LLC",
  tagline: "Software Development Company",
  /** The brand line used on the homepage hero and in the footer. */
  slogan: "Software that moves.",
  // Matches the homepage title ("Software Development Company for Startups &
  // SMBs"). Also the default meta description, so keep it near 160 characters.
  description:
    "Arrowbin is a software development company for startups and SMBs worldwide. We build custom software, web & mobile apps, SaaS, AI automation and cloud services.",
  url: siteUrl,
  bookingUrl: "https://cal.com/arrowbin/30min",
  email: "hello@arrowbin.com",
  /** CC'd on every website lead (internal only; the sender never sees these). */
  leadCc: ["mdshishirahmed811@gmail.com", "shishir@arrowbin.com"],
  phones: [
    {
      label: "Bangladesh",
      value: "+8801843596038",
      href: "tel:+8801843596038",
    },
    { label: "USA", value: "+1 813-421-5874", href: "tel:+18134215874" },
  ],
  offices: [
    {
      label: "Dhaka, Bangladesh",
      // No confirmed house/road line for this office yet, so no street address is
      // published: a neighbourhood (Mohammadpur) is not a street address. Add the
      // full street line here once the founder confirms it (FIX-PLAN D8).
      streetAddress: undefined,
      city: "Dhaka",
      region: "Dhaka",
      postalCode: "1207",
      country: "BD",
      countryName: "Bangladesh",
      geo: { lat: 23.766, lng: 90.359 },
      /** Staffed office: emitted as a ProfessionalService location. */
      mailingOnly: false,
    },
    {
      label: "St. Petersburg, Florida",
      streetAddress: "7901 4th St N, Ste 300",
      city: "St. Petersburg",
      region: "FL",
      postalCode: "33702",
      country: "US",
      countryName: "United States",
      geo: { lat: 27.8206, lng: -82.6389 },
      /** Registered/mailing address (shared virtual office), not a place
       * clients visit: kept as a postal address only, never as a
       * LocalBusiness location (Google treats virtual offices as ineligible). */
      mailingOnly: true,
    },
  ],
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/arrowbinhq",
      icon: "linkedin",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/arrowbinhq",
      icon: "facebook",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/arrowbinllc",
      icon: "instagram",
    },
    { label: "X", href: "https://x.com/Arrowbinllc", icon: "x" },
  ],
} as const;

/**
 * Hostinger partnership. Arrowbin is a verified Hostinger Partner; the badge is
 * displayed under Hostinger's partner terms, which forbid altering its colours,
 * proportions or text, so it is always rendered from the untouched asset pack in
 * `public/hostinger-partner-badge/` at its native 8:3 ratio.
 *
 * `referralUrl` earns Arrowbin a commission, so every link to it must carry
 * rel="sponsored" (Google's required attribute for affiliate links) alongside
 * noopener/noreferrer. Use the `hostingerLinkRel` constant rather than retyping it.
 *
 * Deliberately excluded from the public site: the 20% agency-plan discount (that is
 * Arrowbin's own purchase, not a client offer) and the commission rate.
 */
export const hostinger = {
  name: "Hostinger",
  /** Lands on Hostinger's page confirming the partnership. */
  referralUrl: "https://www.hostinger.com?REFERRALCODE=arrowbin",
  /** Clients apply this at checkout themselves. */
  couponCode: "ARROWBIN",
  badge: {
    // SVG, so it needs no next/image optimisation (which would require
    // `dangerouslyAllowSVG`) and carries no filename-encoding risk (several files
    // in the supplied pack use a U+00D7 "×" in their names).
    src: "/hostinger-partner-badge/svg/Badge_brand_light.svg",
    /** Native aspect ratio of the supplied badge; keep 8:3 when scaling. */
    width: 320,
    height: 120,
    alt: "Arrowbin is a verified Hostinger Partner",
  },
} as const;

/** rel for any outbound link to Hostinger's referral URL. */
export const hostingerLinkRel = "sponsored noopener noreferrer";

export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * schema.org `sameAs`: only verified profiles of this company. Kept separate
 * from the footer socials so a placeholder link never becomes an entity claim.
 * Add the Clutch profile (clutch.co/profile/arrowbin-0) once it has been claimed
 * and corrected (FIX-PLAN P1.3).
 */
export const sameAs = [
  "https://www.linkedin.com/company/arrowbinhq",
  "https://github.com/arrowbinhq",
  "https://www.facebook.com/arrowbinhq",
  "https://www.instagram.com/arrowbinllc",
  "https://x.com/Arrowbinllc",
];

/**
 * Build the `alternates` metadata for a page: just the self-referencing canonical.
 * The site is single-language (English) with one URL per page, so we intentionally
 * omit hreflang: self-referencing `en`/`x-default` tags add no signal on a
 * monolingual site (the canonical already handles self-reference). Add a real
 * `languages` map here only if/when localized URLs exist. Pass a root-relative
 * path; Next.js resolves it against `metadataBase`.
 */
export function pageAlternates(path: string) {
  return {
    canonical: path,
  };
}

/** Default content author, used for blog bylines and BlogPosting Person schema. */
export const author = {
  name: "Md. Shishir Ahmed",
  jobTitle: "Founder",
  email: "shishir@arrowbin.com",
  url: `${siteUrl}/about`,
  image: "/team/shishir-ahmed.webp",
  bio: "Founder of Arrowbin. Writes about shipping software, what it costs, and the decisions that decide whether a product works.",
  /** External profiles that anchor the author entity (schema.org sameAs). */
  sameAs: ["https://www.linkedin.com/in/md-shishir-ahmed"],
};

/**
 * Site-wide fallback Open Graph image (the generated /opengraph-image route). Pages
 * that set their own `openGraph` drop the inherited file-based image, so index pages
 * reference this explicitly to keep social/AI previews from going blank.
 */
export const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name}, ${site.tagline}`,
};
