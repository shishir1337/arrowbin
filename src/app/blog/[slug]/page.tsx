import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleHero } from "@/components/blog/ArticleHero";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { PostCard } from "@/components/blog/BlogIndex";
import { PostBody } from "@/components/blog/PostBody";
import { PreferredSource } from "@/components/blog/PreferredSource";
import { RankYakArticle } from "@/components/blog/RankYakArticle";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { Toc } from "@/components/blog/Toc";
import { Cta } from "@/components/home/Cta";
import { Faq } from "@/components/home/Faq";
import { SectionLabel } from "@/components/home/SectionLabel";
import { InnerMotion } from "@/components/motion/InnerMotion";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  type Article,
  allPosts,
  articleDescription,
  getArticle,
  listArticles,
} from "@/lib/articles";
import {
  getPost,
  type Post,
  postModified,
  posts,
  relatedPosts,
  tableOfContents,
} from "@/lib/blog";
import { feedAlternate, ogLocale, xHandle } from "@/lib/metadata";
import { blogPostingSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageAlternates, site } from "@/lib/site";

type Params = { slug: string };

/**
 * The posts in src/lib/posts and the RankYak articles present at build time
 * are prerendered. An article that arrives later renders on its first visit
 * and is cached from then on (the webhook marks its page stale on every
 * update). A slug that is neither answers a real 404.
 */
export const dynamicParams = true;

export async function generateStaticParams(): Promise<Params[]> {
  const own = new Set(posts.map((p) => p.slug));
  const articles = (await listArticles()).filter((a) => !own.has(a.slug));
  return [...posts, ...articles].map((p) => ({ slug: p.slug }));
}

/** Title, description, canonical URL and share image of a RankYak article. */
function articleMetadata(article: Article): Metadata {
  const path = `/blog/${article.slug}`;
  const title = article.metaTitle ?? article.title;
  const description = articleDescription(article);
  const images = [
    article.headerImageUrl
      ? { url: article.headerImageUrl, alt: article.title }
      : {
          url: `${path}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${article.title}: a guide from the Arrowbin blog`,
        },
  ];
  const publishedTime = article.publishedAt.toISOString();
  return {
    title: { absolute: title },
    description,
    alternates: { ...pageAlternates(path), types: feedAlternate },
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: ogLocale,
      url: path,
      title,
      description,
      publishedTime,
      modifiedTime: article.updatedAt?.toISOString() ?? publishedTime,
      images,
    },
    twitter: {
      card: "summary_large_image",
      site: xHandle,
      creator: xHandle,
      title,
      description,
      images,
    },
  };
}

/** Approximate article word count from the structured body, for BlogPosting schema. */
function bodyWordCount(blocks: Post["body"]): number {
  const text = blocks
    .map((b) => {
      // The in-article CTA is a sales prompt, not article copy.
      if (b.type === "cta") return "";
      if ("text" in b) return b.text;
      if ("items" in b) return b.items.join(" ");
      if (b.type === "table") return [...b.headers, ...b.rows.flat()].join(" ");
      return "";
    })
    .join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    const article = await getArticle(slug);
    return article ? articleMetadata(article) : {};
  }
  const path = `/blog/${post.slug}`;
  const image = {
    url: `${path}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: `${post.title}: a guide from the Arrowbin blog`,
  };
  // Each object is complete on its own: Next.js merges metadata shallowly, so a
  // page-level openGraph or twitter replaces the root layout's, not extends it.
  return {
    // Absolute (no "| Arrowbin" suffix): keeps long article titles under the SERP limit.
    title: { absolute: post.title },
    description: post.description,
    keywords: post.keywords,
    alternates: { ...pageAlternates(path), types: feedAlternate },
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: ogLocale,
      url: path,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: postModified(post),
      authors: [post.author],
      section: post.category,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      site: xHandle,
      creator: xHandle,
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    const article = await getArticle(slug);
    if (!article) notFound();
    const more = (await allPosts())
      .filter((p) => p.slug !== article.slug)
      .slice(0, 3);
    return <RankYakArticle article={article} more={more} />;
  }

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];
  // Related by category and topic, so posts link to each other as the blog grows.
  const more = relatedPosts(post, 3);
  const toc = tableOfContents(post);
  const shareUrl = `${site.url}/blog/${post.slug}`;
  const labels = {
    faq: "01",
    more: post.faqs ? "02" : "01",
    cta: String((post.faqs ? 1 : 0) + (more.length ? 1 : 0) + 1).padStart(
      2,
      "0",
    ),
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          blogPostingSchema({
            title: post.title,
            description: post.description,
            slug: post.slug,
            datePublished: post.date,
            dateModified: postModified(post),
            author: post.author,
            category: post.category,
            hasTldr: Boolean(post.tldr),
            keywords: post.keywords,
            wordCount: bodyWordCount(post.body),
          }),
          ...(post.faqs ? [faqSchema(post.faqs)] : []),
        ]}
      />
      <InnerMotion />
      <ReadingProgress targetId="article-root" />
      <ArticleHero post={post} />

      <article id="article-root" className="relative bg-white py-14 sm:py-20">
        <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-[var(--gutter)] lg:grid-cols-12 lg:gap-8">
          {/* Main column */}
          <div className="min-w-0 lg:col-span-8 xl:col-span-7 xl:col-start-2">
            {post.tldr ? (
              <section
                id="tldr"
                aria-label="The short answer"
                className="rounded-[1.75rem] bg-ultra p-6 text-white sm:p-8"
              >
                <p className="label text-sun">The short answer</p>
                <p className="mt-3 text-lg leading-relaxed sm:text-xl">
                  {post.tldr}
                </p>
              </section>
            ) : null}

            {/* Table of contents: collapsible on phones and tablets */}
            {toc.length > 2 ? (
              <details className="group mt-6 rounded-[1.5rem] bg-frost p-5 lg:hidden">
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

            <div className="mt-10">
              <PostBody
                blocks={post.body.filter(
                  // The feature photo already leads the page; don't repeat it.
                  (b) =>
                    !(b.type === "image" && b.image.src === post.image?.src),
                )}
              />
            </div>

            {post.takeaways?.length ? (
              <section className="mt-14 rounded-[1.75rem] bg-sun p-6 text-ink sm:p-9">
                <h2 className="font-display text-2xl font-black uppercase leading-none tracking-[-0.02em] sm:text-3xl">
                  Key takeaways
                </h2>
                <ol className="mt-6 grid gap-3">
                  {post.takeaways.map((t, i) => (
                    <li key={t} className="flex gap-4">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink font-mono text-xs font-bold text-sun">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="pt-1 leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <p className="label text-ink-2">Share</p>
              <ShareLinks url={shareUrl} title={post.title} />
            </div>

            <PreferredSource />

            <AuthorCard />
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

      {post.faqs ? (
        <div id="faq" className="scroll-mt-20">
          <Faq items={post.faqs} index={labels.faq} />
        </div>
      ) : null}

      {more.length ? (
        <section className="relative py-20 sm:py-28">
          <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
            <SectionLabel index={labels.more} title="Keep reading" />
            <h2
              className="display mt-5 text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              More before you build
            </h2>
            <ul
              // Three cards: on tablets the third spans both columns instead of
              // sitting alone in half a row; from lg up they sit in one row of three.
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

      {/* Rendered directly, not inside <Suspense>: a boundary here made the
          prerendered HTML stream the closing CTA as a hidden block after </main>. */}
      <Cta index={labels.cta} />
    </>
  );
}
