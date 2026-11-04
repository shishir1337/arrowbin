import type { MetadataRoute } from "next";
import { allPosts } from "@/lib/articles";
import { postModified } from "@/lib/blog";
import { caseStudies } from "@/lib/case-studies";
import { services } from "@/lib/services";
import { siteUrl } from "@/lib/site";

// `changeFrequency` and `priority` are intentionally omitted: Google and Bing both
// confirm they ignore them. We only emit `lastModified`, and only with honest dates:
// content pages derive from real content dates; static/legal/service pages share a
// single content-baseline date so they don't falsely "change" every time a post does.
// Bump it when those pages' content really changes (last: the 15 Oct SEO sprint,
// which rewrote service intros, titles and shared copy).
const STATIC_BASELINE = "2026-10-15";

// Includes the RankYak articles: the webhook refreshes it when one arrives;
// the hourly revalidation is only a safety net.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUpdated = new Date(STATIC_BASELINE);
  const posts = await allPosts();

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

  // Only case studies the client has approved; drafts never reach the sitemap.
  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies
    .filter((c) => c.approved)
    .map((c) => ({
      url: `${siteUrl}/work/${c.slug}`,
      lastModified: new Date(c.date),
    }));

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...blogRoutes];
}
