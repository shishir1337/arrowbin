import { sortedPosts } from "@/lib/blog";
import { services } from "@/lib/services";
import { site, siteUrl } from "@/lib/site";
import {
  hubs,
  intro,
  keyFacts,
  partnerships,
  policyLinks,
  startProject,
  summary,
  textResponse,
} from "./content";

// llms.txt (llmstxt.org): a curated, plain-text map of the site for LLMs and AI
// agents. Generated from live content (services, posts) so it never drifts out
// of sync; new blog posts appear automatically. The long version, with every
// service's process and FAQs, is /llms-full.txt.
export const dynamic = "force-static";

export function GET() {
  const serviceLines = services
    .map((s) => `- [${s.name}](${siteUrl}/services/${s.slug}): ${s.summary}`)
    .join("\n");

  const postLines = sortedPosts
    .map((p) => `- [${p.title}](${siteUrl}/blog/${p.slug}): ${p.description}`)
    .join("\n");

  const body = `# ${site.name}

> ${summary}

${intro}

${keyFacts()}

${startProject()}

## Services

${serviceLines}

${hubs()}

## Guides

${postLines}

${partnerships()}

## Optional

- [Full digest](${siteUrl}/llms-full.txt): every service with its process and FAQs, the portfolio, and each guide's summary, takeaways and FAQs in one Markdown file.
${policyLinks}
`;

  return textResponse(body);
}
