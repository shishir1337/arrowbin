import { siteUrl } from "@/lib/site";

// robots.txt as a route handler instead of app/robots.ts, because Next's
// MetadataRoute.Robots only supports User-Agent, Allow, Disallow and
// Crawl-delay, and we want a header comment and full control of line order.
// The rules are the same as before: every group allows the whole site except /api.
export const dynamic = "force-static";

// AI / answer-engine crawlers we explicitly welcome (training + live retrieval).
const aiBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Applebot-Extended",
  "CCBot",
];

// Content Signals (contentsignals.org): a stated preference for how content may
// be used. Every value is "yes", which is also what no signal means, so it is
// written as a comment: as a real directive, Lighthouse and other validators
// report each line as an unknown directive and mark robots.txt invalid (it cost
// 8 points of Lighthouse SEO on every page). To RESTRICT a use (for example
// ai-train=no, founder decision D2), add it back as a directive line in group().
const CONTENT_SIGNAL = "search=yes, ai-input=yes, ai-train=yes";

function group(userAgent: string): string {
  return [
    `User-Agent: ${userAgent}`,
    // Disallow first: Google picks the longest match either way, but simpler
    // first-match parsers would otherwise read /api as allowed.
    "Disallow: /api",
    "Allow: /",
  ].join("\n");
}

export function GET() {
  const body = `# Content-Signal: ${CONTENT_SIGNAL}
# Search engines and AI assistants are welcome to index, quote and learn from
# these pages. Please link back to the page you use.

${["*", ...aiBots].map(group).join("\n\n")}

Sitemap: ${siteUrl}/sitemap.xml
`;

  // Same headers Next uses for a metadata robots.txt route.
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
