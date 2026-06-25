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

/** E.164 phone (digits + leading +) for schema — derived from the tel: href. */
const e164 = (href: string) => href.replace(/^tel:/, "");

const AREA_SERVED = [
  { "@type": "Place", name: "Worldwide" },
  { "@type": "Country", name: "United States" },
  { "@type": "Country", name: "Bangladesh" },
];

const KNOWS_ABOUT = [
  "Custom software development",
  "Web application development",
  "Mobile app development",
  "SaaS product engineering",
  "UI/UX design",
  "AI automation",
  "Cloud and DevOps",
  "Software maintenance and support",
];

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
    email: site.email,
    // Single canonical telephone (E.164) — per-number detail lives in contactPoint.
    telephone: site.phones[0] ? e164(site.phones[0].href) : undefined,
    areaServed: "Worldwide",
    knowsAbout: KNOWS_ABOUT,
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
    // data is a trust/policy risk — restore these only with genuine testimonials.
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteUrl,
    name: site.name,
    description: site.description,
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
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
    areaServed: AREA_SERVED,
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

/** ItemList of services for the /services overview page (helps AI enumerate offerings). */
export function serviceListSchema(
  items: { name: string; slug: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        url: `${siteUrl}/services/${s.slug}`,
        provider: { "@id": ORG_ID },
      },
    })),
  };
}

/**
 * CollectionPage for the blog index — gives AI/LLM crawlers a machine-readable
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
    publisher: { "@id": ORG_ID },
    hasPart: opts.items.map((p) => ({
      "@type": "BlogPosting",
      url: `${siteUrl}/blog/${p.slug}`,
    })),
  };
}

export function aboutPageSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${site.name}`,
    url: `${siteUrl}/about`,
    about: { "@id": ORG_ID },
    primaryImageOfPage: LOGO_OBJECT,
  };
}

/** The founder, as a Person node (E-E-A-T). */
export function founderSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: author.name,
    jobTitle: author.jobTitle,
    email: author.email,
    image: `${siteUrl}${author.image}`,
    url: author.url,
    sameAs: author.sameAs,
    worksFor: { "@id": ORG_ID },
  };
}

/** ItemList of portfolio projects (CreativeWork) for the /work page. */
export function workListSchema(
  items: { name: string; url: string; blurb: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.name,
        url: p.url,
        description: p.blurb,
        creator: { "@id": ORG_ID },
      },
    })),
  };
}

export function localBusinessSchema() {
  const usaPhone = site.phones.find((p) => p.label === "USA")?.href;
  const bdPhone = site.phones.find((p) => p.label === "Bangladesh")?.href;

  return site.offices.map((o) => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#localbusiness-${o.city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name: `${site.name} — ${o.label}`,
    image: LOGO_URL,
    logo: LOGO_URL,
    url: siteUrl,
    email: site.email,
    telephone: e164((o.country === "US" ? usaPhone : bdPhone) ?? ""),
    priceRange: "$$",
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
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
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
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    url: `${siteUrl}/blog/${opts.slug}`,
    mainEntityOfPage: `${siteUrl}/blog/${opts.slug}`,
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
    dateModified: opts.dateModified ?? opts.datePublished,
    // Author resolves to the global founder Person node via @id; full details
    // (jobTitle/email) live there to avoid exposing the email on every post.
    author: {
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: opts.author,
      image: `${siteUrl}${author.image}`,
      url: author.url,
      sameAs: author.sameAs,
    },
    publisher: { "@id": ORG_ID },
    copyrightYear: Number(opts.datePublished.slice(0, 4)),
    copyrightHolder: { "@id": ORG_ID },
  };
}
