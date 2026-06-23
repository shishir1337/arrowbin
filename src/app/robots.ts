import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// AI / answer-engine crawlers we explicitly welcome (training + live retrieval).
const aiBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-Web",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      // Explicitly allow AI crawlers full access (a deliberate AI-visibility posture).
      ...aiBots.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
