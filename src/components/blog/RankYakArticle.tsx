import Image from "next/image";
import { PostCard } from "@/components/blog/BlogIndex";
import { PreferredSource } from "@/components/blog/PreferredSource";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { Toc } from "@/components/blog/Toc";
import { Cta } from "@/components/home/Cta";
import { SectionLabel } from "@/components/home/SectionLabel";
import { InnerMotion } from "@/components/motion/InnerMotion";
import { Crumbs } from "@/components/ui/Crumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { prepareArticleHtml } from "@/lib/article-html";
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
 * body as RankYak sent it (its HTML holds no title of its own), styled by
 * `.rk-body` in globals.css to match the other posts. Its H2s get anchor ids
 * for the "On this page" contents (sticky on the right on desktop, a
 * fold-out list on phones), laid out like the posts in src/lib/posts. Then
 * share links, more posts and the closing call to action.
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
  const body = prepareArticleHtml(article.html);
  const toc = body.toc;
  // Copied to this site (a /blog/images path) unless the copy failed; then
  // RankYak's own URL, shown as is.
  const headerImage = article.headerImageUrl;
  const remoteHeader = headerImage ? /^https?:\/\//.test(headerImage) : false;

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
            image: headerImage
              ? new URL(headerImage, site.url).toString()
              : undefined,
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
          {headerImage ? (
            // Shown whole (contained), never cropped: its size isn't known
            // ahead, and the fixed frame keeps the layout from shifting.
            <div className="svh-fade relative mt-12 aspect-[16/9] overflow-hidden rounded-[2rem] bg-frost">
              <Image
                src={headerImage}
                alt={article.title}
                fill
                priority
                unoptimized={remoteHeader}
                sizes="(min-width: 1600px) 1500px, 94vw"
                className="object-contain"
              />
            </div>
          ) : null}
        </div>
      </header>

      <article id="article-root" className="relative bg-white py-14 sm:py-20">
        <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-[var(--gutter)] lg:grid-cols-12 lg:gap-8">
          {/* Main column */}
          <div className="min-w-0 lg:col-span-8 xl:col-span-7 xl:col-start-2">
            {/* Table of contents: collapsible on phones and tablets */}
            {toc.length > 2 ? (
              <details className="group mb-10 rounded-[1.5rem] bg-frost p-5 lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  On this page
                  <span
                    aria-hidden="true"
                    className="grid h-8 w-8 place-items-center rounded-full bg-white transition-transform duration-500 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <nav aria-label="Table of contents" className="mt-3">
                  <ol className="grid gap-1 text-sm">
                    {toc.map((item, i) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="flex gap-3 rounded-lg py-1.5 text-ink-2 transition-colors hover:text-ultra"
                        >
                          <span className="font-mono text-xs leading-6">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{item.text}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </details>
            ) : null}

            <div
              className="rk-body"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: the article body from RankYak, rendered as sent; only the authenticated webhook writes it.
              dangerouslySetInnerHTML={{ __html: body.html }}
            />
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <p className="label text-ink-2">Share</p>
              <ShareLinks url={`${site.url}${path}`} title={article.title} />
            </div>
            <PreferredSource />
          </div>

          {/* Sidebar (desktop) */}
          <div className="hidden lg:col-span-4 lg:block xl:col-span-3">
            <div className="sticky top-28">
              {toc.length > 2 ? (
                <nav
                  aria-label="Table of contents"
                  className="rounded-[1.5rem] bg-frost p-5"
                >
                  <p className="label text-ink-2">On this page</p>
                  <Toc items={toc} />
                </nav>
              ) : null}
            </div>
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
