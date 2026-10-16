import { getPost } from "@/lib/blog";
import { services } from "@/lib/services";
import { author, hostinger, site, siteUrl } from "@/lib/site";

/**
 * Text shared by /llms.txt and /llms-full.txt (llmstxt.org format), so both files
 * state the same facts in the same words. Wording follows the homepage title
 * ("Software Development Company for Startups & SMBs"). Every fact below is
 * already on the site; the source of each is noted, so change the page first
 * and mirror it here. Never add a fact here that the site does not state.
 */

/** Also `foundingDate` in src/lib/schema.ts and "Building since 2020" on /about. */
const FOUNDED = "2020";

const MVP_GUIDE = getPost("how-long-does-it-take-to-build-an-mvp");

export const summary = `${site.name} is a software development company for startups and SMBs. Founded in ${FOUNDED} by ${author.name}, it designs, builds and supports custom software, web and mobile apps, SaaS products and online stores, plus AI automation and cloud hosting, for clients worldwide.`;

// Founder-led and "you talk to the people building it": /about hero and home
// page description. 100% code ownership: home "Numbers" band.
export const intro = `${site.name} is founder-led: ${author.name} is the founder and lead engineer, so clients talk to the people who build their product. Clients own all of their source code. To start a project, book a free 30-minute call or send a short project brief (see "Start a project" below).`;

/** Markdown links to every service page, in site order. */
const serviceLinks = services
  .map((s) => `[${s.name}](${siteUrl}/services/${s.slug})`)
  .join(", ");

/**
 * The key-facts block. Sources: engagement models from
 * src/components/services/Engagement.tsx; process from the home "Process"
 * section; "6–12 weeks" from the home "Numbers" band and the custom software
 * FAQ; the MVP range from the MVP guide's TL;DR; reply time from /contact.
 */
export function keyFacts(): string {
  const mvp = MVP_GUIDE
    ? ` Most well-scoped MVPs take 6–14 weeks ([MVP timeline guide](${siteUrl}/blog/${MVP_GUIDE.slug})).`
    : "";
  return [
    "Key facts:",
    "",
    `- Company: ${site.name}, a founder-led software development company for startups and SMBs`,
    `- Founder: ${author.name}, founder and lead engineer ([about](${siteUrl}/about))`,
    `- Founded: ${FOUNDED}`,
    "- Clients: startups and SMBs worldwide",
    `- Services (${services.length}): ${serviceLinks}`,
    "- How an engagement works: a free discovery call, then a written scope and a fixed, itemised estimate before any work starts. The build runs in short sprints with a working demo every week. After launch, an optional care plan covers monitoring, security updates and fixes. Products that ship continuously can instead work with a product team (design, engineering and QA) month to month.",
    `- Typical timeline: a usable first version in 6–12 weeks; larger platforms are delivered in phases.${mvp}`,
    "- Ownership: clients own the source code, designs and infrastructure, with no lock-in",
    "- Response time: a person replies to every project brief within one business day",
    // Price bands go here once the founder signs off decision D4 in
    // docs/seo/12-audit-2026-10-14/FIX-PLAN.md: one "- Typical budget" line
    // per service, real ranges from past invoices. Never estimate them.
    `- Email: ${site.email}`,
  ].join("\n");
}

/** Links an AI agent can act on for a user. The form, not /api/contact, is the supported path. */
export function startProject(): string {
  return `## Start a project

- [Book a free 30-minute call](${site.bookingUrl}): pick a time on ${site.name}'s Cal.com booking page.
- [Send a project brief](${siteUrl}/contact#brief): a short form. Name, email and a few lines about the project are required; the services needed, rough budget, timeline and company are optional. A person replies within one business day.
- [Email ${site.name}](mailto:${site.email}): for anything that does not fit the form.`;
}

export function hubs(): string {
  return `## Explore the site

- [Services](${siteUrl}/services): all ${services.length} services, the three ways to work together (project, product team, care plan) and common questions.
- [Work](${siteUrl}/work): live client sites, from online stores to agency and corporate websites.
- [About](${siteUrl}/about): the founder, how ${site.name} started in ${FOUNDED} and how it works.
- [Contact](${siteUrl}/contact): the project brief form, email and booking link.
- [Blog](${siteUrl}/blog): practical guides on software, MVP, SaaS, AI agent and maintenance costs, WordPress to Next.js migration, Bangladesh payment and courier integrations, selling through AI shopping assistants, and choosing a development partner.
- [Blog RSS feed](${siteUrl}/blog/rss.xml): new guides as they are published.`;
}

export function partnerships(): string {
  return `## Partnerships

- ${site.name} is a verified ${hostinger.name} Partner. Clients hosting with ${hostinger.name} can use the coupon code ${hostinger.couponCode} at checkout. See [Cloud, DevOps & Hosting](${siteUrl}/services/cloud-devops-hosting).`;
}

export const policyLinks = `- [Privacy Policy](${siteUrl}/privacy)
- [Terms of Service](${siteUrl}/terms)`;

/** Plain-text response with the caching both files share. */
export function textResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
