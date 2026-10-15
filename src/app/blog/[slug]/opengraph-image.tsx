import { getPost, postSlugs } from "@/lib/blog";
import { brandOg, ogSize } from "@/lib/og";

export const alt = "Arrowbin blog post";
export const size = ogSize;
export const contentType = "image/png";

/** Like the page: unknown slugs 404 instead of rendering a generic card. */
export const dynamicParams = false;

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  return brandOg({
    eyebrow: post?.category ?? "Article",
    title: post?.title ?? "Arrowbin Blog",
    footer: "arrowbin.com/blog",
  });
}
