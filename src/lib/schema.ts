/**
 * schema.org structured-data builders for SEO/AEO. Keep all JSON-LD shapes here so
 * pages stay declarative and the graph stays consistent.
 */

import { author, sameAs, site, siteUrl } from "@/lib/site";

const ORG_ID = `${siteUrl}/#organization`;
const WEBSITE_ID = `${siteUrl}/#website`;
const LOGO_URL = `${siteUrl}/logo.png`;

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
    url: siteUrl,
    logo: LOGO_URL,
    image: LOGO_URL,
    description: site.description,
    email: site.email,
    telephone: site.phones.map((p) => p.value),
    areaServed: "Worldwide",
    knowsAbout: KNOWS_ABOUT,
    sameAs,
    address: site.offices.map((o) => ({
      "@type": "PostalAddress",
      addressLocality: o.city,
      addressRegion: o.region,
      addressCountry: o.country,
    })),
    contactPoint: site.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.value,
      contactType: "sales",
      areaServed: p.label === "USA" ? "US" : "BD",
      availableLanguage: ["English", "Bengali"],
    })),
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
}) {
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: `${siteUrl}${opts.path}`,
    provider: { "@id": ORG_ID },
    areaServed: AREA_SERVED,
    serviceType: opts.name,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "#service-answer"],
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

/** One ProfessionalService node per office, with geo + hours + areaServed for local/GEO. */
/** HowTo node for a service's delivery process (step-by-step, AEO/answer-engine friendly). */
export function howToSchema(opts: {
  name: string;
  description?: string;
  steps: { title: string; description: string }[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
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
      name: s.name,
      url: `${siteUrl}/services/${s.slug}`,
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
    primaryImageOfPage: LOGO_URL,
  };
}

/** The founder, as a Person node (E-E-A-T). */
export function founderSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.jobTitle,
    email: author.email,
    url: author.url,
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
      },
    })),
  };
}

export function localBusinessSchema() {
  const usaPhone = site.phones.find((p) => p.label === "USA")?.value;
  const bdPhone = site.phones.find((p) => p.label === "Bangladesh")?.value;

  return site.offices.map((o) => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#localbusiness-${o.city.toLowerCase()}`,
    name: `${site.name} — ${o.label}`,
    image: LOGO_URL,
    logo: LOGO_URL,
    url: siteUrl,
    email: site.email,
    telephone: o.country === "US" ? usaPhone : bdPhone,
    priceRange: "$$",
    sameAs,
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: o.city,
      addressRegion: o.region,
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    url: `${siteUrl}/blog/${opts.slug}`,
    mainEntityOfPage: `${siteUrl}/blog/${opts.slug}`,
    image: `${siteUrl}/blog/${opts.slug}/opengraph-image`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "#tldr"],
    },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: {
      "@type": "Person",
      name: opts.author,
      jobTitle: author.jobTitle,
      email: author.email,
      url: author.url,
    },
    publisher: { "@id": ORG_ID },
  };
}
