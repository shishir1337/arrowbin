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
    "Arrowbin is a software development company. We build custom software, web & mobile apps, SaaS, AI automation and cloud solutions for clients worldwide.",
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
      // No house/road line for this office; Mohammadpur (the area) is the most
      // specific street-level value available.
      streetAddress: "Mohammadpur",
      city: "Dhaka",
      region: "Dhaka",
      postalCode: "1207",
      country: "BD",
      countryName: "Bangladesh",
      geo: { lat: 23.766, lng: 90.359 },
    },
    {
      label: "St. Petersburg, Florida",
      streetAddress: "7901 4th St N",
      city: "St. Petersburg",
      region: "FL",
      postalCode: "33702",
      country: "US",
      countryName: "United States",
      geo: { lat: 27.8206, lng: -82.6389 },
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
 * Build the `alternates` metadata for a page: just the self-referencing canonical.
 * The site is single-language (English) with one URL per page, so we intentionally
 * omit hreflang — self-referencing `en`/`x-default` tags add no signal on a
 * monolingual site (the canonical already handles self-reference). Add a real
 * `languages` map here only if/when localized URLs exist. Pass a root-relative
 * path; Next.js resolves it against `metadataBase`.
 */
export function pageAlternates(path: string) {
  return {
    canonical: path,
  };
}

/** Default content author — used for blog bylines and BlogPosting Person schema. */
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
  alt: `${site.name} — ${site.tagline}`,
};
