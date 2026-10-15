/**
 * schema.org structured-data builders for SEO/AEO. Keep all JSON-LD shapes here so
 * pages stay declarative and the graph stays consistent.
 */

import { author, sameAs, site, siteUrl } from "@/lib/site";

const ORG_ID = `${siteUrl}/#organization`;
const WEBSITE_ID = `${siteUrl}/#website`;
const FOUNDER_ID = `${siteUrl}/#founder`;
const LOGO_URL = `${siteUrl}/logo.png`;
// Google's Article/Organization rich results expect logo as an ImageObject, not a
// bare string. The /logo.png route renders a 512×512 raster.
const LOGO_OBJECT = {
  "@type": "ImageObject",
  url: LOGO_URL,
  width: 512,
  height: 512,
};

/** E.164 phone (digits + leading +) for schema, derived from the tel: href. */
const e164 = (href: string) => href.replace(/^tel:/, "");

// One entry per service in src/lib/services.ts.
const KNOWS_ABOUT = [
  "Custom software development",
  "E-commerce development",
  "Mobile app development",
  "SaaS product engineering",
  "UI/UX design",
  "AI automation",
  "Cloud, DevOps and hosting",
  "Software maintenance and support",
];

/**
 * The founder as one Person node. The layout emits Organization on every page,
 * and Organization.founder embeds this node, so the #founder reference always
 * resolves. /about (founderSchema) and blog posts (BlogPosting.author) build
 * from the same function, so every copy of #founder on a page carries the same
 * values and merges into one entity instead of conflicting.
 */
function founderNode(): Record<string, unknown> {
  return {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: author.name,
    jobTitle: author.jobTitle,
    image: `${siteUrl}${author.image}`,
    url: author.url,
    sameAs: author.sameAs,
    worksFor: { "@id": ORG_ID },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    foundingDate: "2020",
    url: siteUrl,
    logo: LOGO_OBJECT,
    image: LOGO_URL,
    description: site.description,
    slogan: site.slogan,
    email: site.email,
    // Single canonical telephone (E.164); per-number detail lives in contactPoint.
    telephone: site.phones[0] ? e164(site.phones[0].href) : undefined,
    areaServed: "Worldwide",
    knowsAbout: KNOWS_ABOUT,
    // Embedded (not just an @id reference): the standalone Person node is only
    // emitted on /about and blog posts, so a bare reference dangled elsewhere.
    founder: founderNode(),
    sameAs,
    address: site.offices.map((o) => ({
      "@type": "PostalAddress",
      ...(o.streetAddress ? { streetAddress: o.streetAddress } : {}),
      addressLocality: o.city,
      addressRegion: o.region,
      postalCode: o.postalCode,
      addressCountry: o.country,
    })),
    contactPoint: site.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: e164(p.href),
      contactType: "sales",
      areaServed: p.label === "USA" ? "US" : "BD",
      availableLanguage: ["English", "Bengali"],
    })),
    // NOTE: aggregateRating/review intentionally omitted until real, named,
    // verifiable client reviews exist. Emitting placeholder ratings as structured
    // data is a trust/policy risk: restore these only with genuine testimonials.
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteUrl,
    name: site.name,
    // Google's site-name guidance: other names the site is known by.
    alternateName: site.legalName,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

/**
 * BreadcrumbList for a trail of two or more items. A one-item trail (the
 * homepage) is not a breadcrumb, so it returns an empty graph instead: valid
 * JSON-LD that yields no nodes, which keeps every caller's array typed and
 * renderable without a BreadcrumbList on `/`.
 */
export function breadcrumbSchema(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  if (items.length < 2) {
    return { "@context": "https://schema.org", "@graph": [] };
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  deliverables?: string[];
  audience?: string[];
  hasAnswer?: boolean;
}) {
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}${opts.path}#service`,
    name: opts.name,
    description: opts.description,
    url: `${siteUrl}${opts.path}`,
    provider: { "@id": ORG_ID },
    // No areaServed: the Service inherits reach from its provider, whose
    // Organization node says "Worldwide" (a Place named "Worldwide" is not valid).
    serviceType: opts.name,
    // Point answer engines (Google AIO read-aloud) at the H1 + the direct
    // "What is …" answer paragraph when the page renders one.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: opts.hasAnswer ? ["h1", "#service-answer"] : ["h1"],
    },
  };
  if (opts.deliverables?.length) {
    node.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: opts.name,
      itemListElement: opts.deliverables.map((d) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: d },
      })),
    };
  }
  if (opts.audience?.length) {
    node.audience = opts.audience.map((a) => ({
      "@type": "Audience",
      audienceType: a,
    }));
  }
  return node;
}

/**
 * ItemList of a service's delivery process (step-by-step). Replaces HowTo, whose
 * rich result Google retired in Sept 2023; ItemList stays valid and reads cleanly
 * as a service workflow for answer engines.
 */
export function processSchema(opts: {
  name: string;
  description?: string;
  steps: { title: string; description: string }[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    itemListElement: opts.steps.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      description: s.description,
    })),
  };
}

/**
 * ItemList of services for the /services overview page (helps AI enumerate
 * offerings). Each item reuses the detail page's Service @id, so the list and
 * the service pages resolve to the same entities. The name prefers the page H1
 * (`heading`), matching the detail page's Service node.
 */
export function serviceListSchema(
  items: { name: string; heading?: string; slug: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/services#list`,
    name: `${site.name} software development services`,
    numberOfItems: items.length,
    itemListElement: items.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        "@id": `${siteUrl}/services/${s.slug}#service`,
        name: s.heading ?? s.name,
        url: `${siteUrl}/services/${s.slug}`,
        provider: { "@id": ORG_ID },
      },
    })),
  };
}

/**
 * CollectionPage for the blog index: gives AI/LLM crawlers a machine-readable
 * enumeration of the blog catalogue (improves citation completeness).
 */
export function collectionPageSchema(opts: {
  name: string;
  description: string;
  path: string;
  items: { slug: string }[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}${opts.path}#collection`,
    name: opts.name,
    description: opts.description,
    url: `${siteUrl}${opts.path}`,
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
    // Same @id as each post's BlogPosting node, so the two resolve together.
    hasPart: opts.items.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${siteUrl}/blog/${p.slug}#article`,
      url: `${siteUrl}/blog/${p.slug}`,
    })),
  };
}

export function aboutPageSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteUrl}/about#page`,
    name: `About ${site.name}`,
    url: `${siteUrl}/about`,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    mainEntity: { "@id": ORG_ID },
    primaryImageOfPage: LOGO_OBJECT,
  };
}

export function contactPageSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteUrl}/contact#page`,
    name: `Contact ${site.name}`,
    url: `${siteUrl}/contact`,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
  };
}

/**
 * The founder, as a standalone Person node for /about (E-E-A-T). Same values as
 * the node embedded in Organization.founder, plus the contact email, which is
 * published on /about only.
 */
export function founderSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    ...founderNode(),
    email: author.email,
  };
}

/**
 * ItemList of portfolio projects (CreativeWork) for the /work page. Each item's
 * @id is the live project URL, and `image` is the screenshot shown on /work.
 */
export function workListSchema(
  items: { name: string; url: string; blurb: string; image?: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/work#list`,
    name: `${site.name} client work`,
    numberOfItems: items.length,
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        "@id": p.url,
        name: p.name,
        url: p.url,
        ...(p.image ? { image: `${siteUrl}${p.image}` } : {}),
        description: p.blurb,
        creator: { "@id": ORG_ID },
      },
    })),
  };
}

export function localBusinessSchema() {
  // Each location's phone is the one labelled with its country.
  const phoneFor = (countryName: string) =>
    site.phones.find((p) => countryName.includes(p.label))?.href ?? "";

  // Only staffed offices are business locations; mailing-only addresses stay
  // on the Organization as a PostalAddress.
  return site.offices
    .filter((o) => !o.mailingOnly)
    .map((o) => ({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#localbusiness-${o.city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      name: `${site.name} (${o.label})`,
      image: LOGO_URL,
      logo: LOGO_URL,
      url: `${siteUrl}/contact`,
      email: site.email,
      telephone: e164(phoneFor(o.countryName)),
      sameAs,
      parentOrganization: { "@id": ORG_ID },
      address: {
        "@type": "PostalAddress",
        ...(o.streetAddress ? { streetAddress: o.streetAddress } : {}),
        addressLocality: o.city,
        addressRegion: o.region,
        postalCode: o.postalCode,
        addressCountry: o.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: o.geo.lat,
        longitude: o.geo.lng,
      },
      areaServed: [o.countryName, "Worldwide"],
      // No openingHoursSpecification: office hours are not confirmed or
      // published on the site. Add them back only once they are (FIX-PLAN D8).
    }));
}

export function blogPostingSchema(opts: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  category?: string;
  hasTldr?: boolean;
  keywords?: string[];
  wordCount?: number;
}) {
  const url = `${siteUrl}/blog/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: opts.title,
    description: opts.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": `${siteUrl}/blog#collection` },
    image: {
      "@type": "ImageObject",
      url: `${siteUrl}/blog/${opts.slug}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    inLanguage: "en",
    ...(opts.keywords?.length ? { keywords: opts.keywords.join(", ") } : {}),
    ...(opts.wordCount ? { wordCount: opts.wordCount } : {}),
    ...(opts.category ? { articleSection: opts.category } : {}),
    // Only reference #tldr when the post actually renders a TL;DR block.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: opts.hasTldr ? ["h1", "#tldr"] : ["h1"],
    },
    datePublished: opts.datePublished,
    // Callers pass the post's `updated` date (falling back to `date`).
    dateModified: opts.dateModified ?? opts.datePublished,
    // Self-contained author (name, jobTitle, worksFor, url, sameAs) from the
    // shared founder node, so it carries the same values as Organization.founder.
    // No email here: that is published on /about only. Any other byline gets a
    // plain Person so it never merges into the founder's @id.
    author:
      opts.author === author.name
        ? founderNode()
        : { "@type": "Person", name: opts.author },
    publisher: { "@id": ORG_ID },
    copyrightYear: Number(opts.datePublished.slice(0, 4)),
    copyrightHolder: { "@id": ORG_ID },
  };
}
