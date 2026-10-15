import { type Post, sortedPosts } from "@/lib/blog";
import { projects } from "@/lib/portfolio";
import { getServiceExtras, type Service, services } from "@/lib/services";
import { author, site, siteUrl } from "@/lib/site";
import {
  hubs,
  intro,
  keyFacts,
  partnerships,
  policyLinks,
  startProject,
  summary,
  textResponse,
} from "../llms.txt/content";

// llms-full.txt: the long companion to /llms.txt, one Markdown file with the
// full text an AI assistant needs to answer questions about Arrowbin. Built
// from the same data modules as the pages (services, portfolio, blog), so it
// stays current with every content change.
export const dynamic = "force-static";

/** Site-relative Markdown links, as used inside post and FAQ text, made absolute. */
const abs = (text: string) => text.replace(/\]\(\//g, `](${siteUrl}/`);

// Claims the founder has not verified (docs/seo/13-sprint-2026-10-15/SPRINT-RULES.md).
// Dropped clause by clause even while they are still in portfolio.ts, so this
// file never repeats them.
const UNVERIFIED = /64 districts|in 8 weeks|15\+ brands/i;

function plainBlurb(text: string): string {
  return text
    .split(/(?<=\.)\s+/)
    .map((sentence) => {
      const clauses = sentence
        .replace(/\.$/, "")
        .split(", ")
        .filter((clause) => !UNVERIFIED.test(clause));
      return clauses.length ? `${clauses.join(", ")}.` : "";
    })
    .filter(Boolean)
    .join(" ");
}

function faqBlock(faqs: { question: string; answer: string }[]): string {
  return faqs.map((f) => `**${f.question}**\n${abs(f.answer)}`).join("\n\n");
}

function serviceSection(s: Service): string {
  const extras = getServiceExtras(s.slug);
  const parts = [
    `### ${s.name}`,
    `Page: ${siteUrl}/services/${s.slug}`,
    s.summary,
    extras ? abs(extras.answer) : "",
    abs(s.intro),
    `What we build:\n${s.deliverables.map((d) => `- ${d}`).join("\n")}`,
    `Technologies: ${s.tech.join(", ")}`,
    `Process:\n${s.process
      .map((step, i) => `${i + 1}. ${step.title}: ${abs(step.description)}`)
      .join("\n")}`,
    `Questions and answers:\n\n${faqBlock(s.faqs)}`,
  ];
  return parts.filter(Boolean).join("\n\n");
}

function postSection(p: Post): string {
  const dates = p.updatedLabel
    ? `Published ${p.dateLabel}, updated ${p.updatedLabel}`
    : `Published ${p.dateLabel}`;
  const parts = [
    `### ${p.title}`,
    `Page: ${siteUrl}/blog/${p.slug}`,
    `${dates}, by ${p.author}. ${p.readingTime}.`,
    p.tldr ? `TL;DR: ${abs(p.tldr)}` : abs(p.description),
    p.takeaways?.length
      ? `Key takeaways:\n${p.takeaways.map((t) => `- ${abs(t)}`).join("\n")}`
      : "",
    p.faqs?.length ? `Questions and answers:\n\n${faqBlock(p.faqs)}` : "",
  ];
  return parts.filter(Boolean).join("\n\n");
}

export function GET() {
  const workLines = projects
    .map((p) => {
      const blurb = plainBlurb(p.blurb);
      return `- [${p.name}](${p.url}): ${blurb ? `${blurb} ` : ""}Tags: ${p.tags.join(", ")}.`;
    })
    .join("\n");

  const body = `# ${site.name}: full site digest

> ${summary}

${intro}

This is the long version of [llms.txt](${siteUrl}/llms.txt), generated from the same content as the website, so every service, project and guide below matches its page.

${keyFacts()}

${startProject()}

## Services

${services.map(serviceSection).join("\n\n")}

## Work

Live client sites ${site.name} has built. Each was rebuilt from WordPress on Next.js. See [Work](${siteUrl}/work).

${workLines}

## Guides

Practical guides by ${author.name}, newest first. Full articles are at each page link.

${sortedPosts.map(postSection).join("\n\n")}

${hubs()}

${partnerships()}

## Policies

${policyLinks}
`;

  return textResponse(body);
}
