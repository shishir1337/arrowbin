import { notFound } from "next/navigation";
import { getArticle, listArticles } from "@/lib/articles";
import { getPost, postSlugs } from "@/lib/blog";
import { brandOg, ogSize } from "@/lib/og";

export const alt = "Arrowbin blog post";
export const size = ogSize;
export const contentType = "image/png";

/**
 * Like the page: posts and the RankYak articles known at build time are
 * prerendered, later articles render on first request, and any other slug
 * 404s. A RankYak article with a header image shares that image instead
 * (its page sets openGraph.images), so this card is its fallback.
 */
export const dynamicParams = true;

export async function generateStaticParams() {
  const own = new Set(postSlugs);
  const articles = (await listArticles()).filter((a) => !own.has(a.slug));
  return [...postSlugs, ...articles.map((a) => a.slug)].map((slug) => ({
    slug,
  }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? (await getArticle(slug))?.title;
  if (!title) notFound();
  return brandOg({
    eyebrow: post?.category ?? "Guides",
    title,
    footer: "arrowbin.com/blog",
  });
}
