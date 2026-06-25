import { sortedPosts } from "@/lib/blog";
import { services } from "@/lib/services";
import { site, siteUrl } from "@/lib/site";

// llms.txt (llmstxt.org) — a curated, plain-text map of the site for LLM/AI crawlers.
// Generated from live content so it never drifts out of sync.
export const dynamic = "force-static";

export function GET() {
  const serviceLines = services
    .map((s) => `- [${s.name}](${siteUrl}/services/${s.slug}): ${s.summary}`)
    .join("\n");

  const postLines = sortedPosts
    .map((p) => `- [${p.title}](${siteUrl}/blog/${p.slug}): ${p.description}`)
    .join("\n");

  const body = `# ${site.name}

> ${site.description}

${site.name} (${site.legalName}) is a software development company with offices in Dhaka, Bangladesh and St. Petersburg, Florida (USA). Contact: ${site.email}.

## Services
${serviceLines}

## Guides
${postLines}

## Company
- [About ${site.name}](${siteUrl}/about): Mission, values and how we work.
- [Our Work](${siteUrl}/work): Portfolio of products, websites and platforms we've built.
- [Contact](${siteUrl}/contact): Start a project or request a free consultation.

## Policies
- [Privacy Policy](${siteUrl}/privacy)
- [Terms of Service](${siteUrl}/terms)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
