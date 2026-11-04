import Image from "next/image";
import { PostCard } from "@/components/blog/BlogIndex";
import { PreferredSource } from "@/components/blog/PreferredSource";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { Cta } from "@/components/home/Cta";
import { SectionLabel } from "@/components/home/SectionLabel";
import { InnerMotion } from "@/components/motion/InnerMotion";
import { Crumbs } from "@/components/ui/Crumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  type Article,
  articleAsPost,
  articleDescription,
  articleReadingTime,
} from "@/lib/articles";
import type { Post } from "@/lib/blog";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

/**
 * A RankYak article: the title as the H1, the header image, then the article
 * body exactly as RankYak sent it (its HTML holds no title of its own), styled
 * by `.rk-body` in globals.css to match the other posts. Then share links,
 * more posts and the closing call to action.
 */
export function RankYakArticle({
  article,
  more,
}: {
  article: Article;
  /** Other posts for "Keep reading", newest first. */
  more: Post[];
}) {
  const post = articleAsPost(article);
  const path = `/blog/${article.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: article.title, path },
  ];
  const label = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          blogPostingSchema({
            title: article.title,
            description: articleDescription(article),
            slug: article.slug,
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            category: post.category,
            wordCount: article.words || undefined,
            image: article.headerImageUrl ?? undefined,
          }),
        ]}
      />
      <InnerMotion />
      <ReadingProgress targetId="article-root" />

      <header className="relative isolate overflow-hidden pb-12 pt-10 sm:pb-16 sm:pt-14">
        <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
          <Crumbs
            items={[crumbs[0], crumbs[1], { name: post.category, path }]}
          />
          <div className="mt-10 lg:w-10/12">
            <div className="svh-fade flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-ultra px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                {post.category}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-ink-2">
                {articleReadingTime(article.words)}
              </span>
            </div>
            <h1
              className="svh-fade mt-6 font-display text-[clamp(2.3rem,5.4vw,5.6rem)] font-black uppercase leading-[0.95] tracking-[-0.035em] text-ink"
              style={{ fontVariationSettings: '"wdth" 100' }}
            >
              {article.title}
            </h1>
            <p className="svh-fade mt-8 text-sm text-ink-2">
              Published <time dateTime={post.date}>{post.dateLabel}</time>
              {post.updated && post.updatedLabel ? (
                <>
                  {" · "}
                  <span className="font-semibold text-ink">
                    Updated{" "}
                    <time dateTime={post.updated}>{post.updatedLabel}</time>
                  </span>
                </>
              ) : null}
            </p>
          </div>
          {article.headerImageUrl ? (
            // Shown whole (contained), never cropped: its size isn't known
            // ahead, and the fixed frame keeps the layout from shifting.
            <div className="svh-fade relative mt-12 aspect-[16/9] overflow-hidden rounded-[2rem] bg-frost">
              <Image
                src={article.headerImageUrl}
                alt={article.title}
                fill
                priority
                unoptimized
                sizes="(min-width: 1600px) 1500px, 94vw"
                className="object-contain"
              />
            </div>
          ) : null}
        </div>
      </header>

      <article id="article-root" className="relative bg-white py-14 sm:py-20">
        <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
          <div className="mx-auto max-w-[52rem]">
            <div
              className="rk-body"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: the article body from RankYak, rendered as sent; only the authenticated webhook writes it.
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <p className="label text-ink-2">Share</p>
              <ShareLinks url={`${site.url}${path}`} title={article.title} />
            </div>
            <PreferredSource />
          </div>
        </div>
      </article>

      {more.length ? (
        <section className="relative py-20 sm:py-28">
          <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
            <SectionLabel index={label(1)} title="Keep reading" />
            <h2
              className="display mt-5 text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              More before you build
            </h2>
            <ul
              className={`mt-12 grid gap-6 md:grid-cols-2 ${more.length > 2 ? "md:[&>li:nth-child(3)]:col-span-2 lg:grid-cols-3 lg:[&>li:nth-child(3)]:col-span-1" : ""}`}
            >
              {more.map((p, i) => (
                <li key={p.slug}>
                  <PostCard post={p} tone={i + 1} as="h3" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <Cta index={label(more.length ? 2 : 1)} />
    </>
  );
}
