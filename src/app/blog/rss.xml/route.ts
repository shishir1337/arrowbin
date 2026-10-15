import { postModified, sortedPosts } from "@/lib/blog";
import { site, siteUrl } from "@/lib/site";

// Statically generated at build time; regenerated on each deploy.
export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  // RSS 2.0 has no per-item "updated" field, so each item's last change goes in
  // the Dublin Core terms extension (dcterms:modified, a W3C date).
  const items = sortedPosts
    .map(
      (p) => `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${siteUrl}/blog/${p.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <dcterms:modified>${postModified(p)}</dcterms:modified>
      <category>${escapeXml(p.category)}</category>
      <description>${escapeXml(p.description)}</description>
    </item>`,
    )
    .join("");

  // The feed last changed when its most recently published or updated post did.
  const newest = sortedPosts.map(postModified).sort().at(-1);
  const lastBuildDate = (newest ? new Date(newest) : new Date()).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dcterms="http://purl.org/dc/terms/">
  <channel>
    <title>${escapeXml(site.name)} Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Guides on software development, web &amp; mobile apps, SaaS and AI automation from ${escapeXml(site.name)}.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <image>
      <url>${siteUrl}/opengraph-image</url>
      <title>${escapeXml(site.name)} Blog</title>
      <link>${siteUrl}/blog</link>
    </image>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
