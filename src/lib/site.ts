/**
 * Central site configuration — single source of truth for NAP (name/address/phone),
 * social profiles, navigation, and the canonical site URL. Imported by metadata,
 * JSON-LD, the navbar, the footer, and the sitemap.
 */

export const siteUrl = "https://arrowbin.com";

export const site = {
  name: "Arrowbin",
  legalName: "Arrowbin LLC",
  tagline: "Software Development Company",
  description:
    "Arrowbin is a software development company building custom software, web & mobile apps, SaaS, AI automation and cloud solutions worldwide.",
  url: siteUrl,
  bookingUrl: "https://cal.com/arrowbin/30min",
  email: "hello@arrowbin.com",
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
      city: "Dhaka",
      region: "Dhaka",
      country: "BD",
      countryName: "Bangladesh",
      geo: { lat: 23.8103, lng: 90.4125 },
    },
    {
      label: "Florida, USA",
      city: "Tampa",
      region: "FL",
      country: "US",
      countryName: "United States",
      geo: { lat: 27.9506, lng: -82.4572 },
    },
  ],
  socials: [
    {
      label: "LinkedIn",
      // TODO: replace with the real Arrowbin company page once created.
      href: "https://www.linkedin.com/in/arrowbinllc",
      icon: "linkedin",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/arrowbinllc/",
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

export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

/** Aggregate social URLs for schema.org `sameAs`. */
export const sameAs = site.socials.map((s) => s.href);

/**
 * Build the `alternates` metadata for a page: the canonical URL plus a
 * self-referencing hreflang set. The site is single-language (English) with one
 * URL per page, so we declare `en` and `x-default` pointing at the same path —
 * signalling to search/answer engines that this content is the global default
 * for all English (and unmatched) audiences. Pass a root-relative path; Next.js
 * resolves it against `metadataBase`.
 */
export function pageAlternates(path: string) {
  return {
    canonical: path,
    languages: {
      en: path,
      "x-default": path,
    },
  };
}

/** Default content author — used for blog bylines and BlogPosting Person schema. */
export const author = {
  name: "Md. Shishir Ahmed",
  jobTitle: "Founder",
  email: "shishir@arrowbin.com",
  url: `${siteUrl}/about`,
  bio: "Founder of Arrowbin. Writes about building software that ships — the cost, the process, and the decisions that make products succeed.",
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
  alt: `${site.name} — ${site.tagline}`,
};
