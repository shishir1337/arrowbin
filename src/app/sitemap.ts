import type { MetadataRoute } from "next";
import { postModified, posts } from "@/lib/blog";
import { services } from "@/lib/services";
import { siteUrl } from "@/lib/site";

// `changeFrequency` and `priority` are intentionally omitted: Google and Bing both
// confirm they ignore them. We only emit `lastModified`, and only with honest dates:
// content pages derive from real content dates; static/legal/service pages share a
// single content-baseline date so they don't falsely "change" every time a post does.
// Bump it when those pages' content really changes (last: the 15 Oct SEO sprint,
// which rewrote service intros, titles and shared copy).
const STATIC_BASELINE = "2026-10-15";

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

  // The blog index changes whenever a post is published or updated.
  const newestPost = posts.map(postModified).sort().at(-1);
  const blogIndexUpdated =
    newestPost && newestPost > STATIC_BASELINE
      ? new Date(newestPost)
      : staticUpdated;

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified: path === "/blog" ? blogIndexUpdated : staticUpdated,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    lastModified: staticUpdated,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: new Date(postModified(p)),
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
