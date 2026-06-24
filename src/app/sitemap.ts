import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { services } from "@/lib/services";
import { siteUrl } from "@/lib/site";

// `changeFrequency` and `priority` are intentionally omitted — Google and Bing both
// confirm they ignore them. We only emit `lastModified`, and only with honest dates:
// content pages derive from real content dates; static/legal/service pages share a
// single content-baseline date so they don't falsely "change" every time a post does.
const STATIC_BASELINE = "2026-06-24";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUpdated = new Date(STATIC_BASELINE);

  const staticPaths = [
    "/",
    "/services",
    "/work",
    "/about",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified: staticUpdated,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    lastModified: staticUpdated,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: new Date(p.updated ?? p.date),
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
