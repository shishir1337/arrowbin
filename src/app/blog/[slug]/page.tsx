import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleHero } from "@/components/blog/ArticleHero";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { PostBody } from "@/components/blog/PostBody";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { Toc } from "@/components/blog/Toc";
import { CTASection } from "@/components/sections/CTASection";
import { FAQ } from "@/components/sections/FAQ";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  getPost,
  posts,
  postThumbnail,
  sortedPosts,
  tableOfContents,
} from "@/lib/blog";
import { blogPostingSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageAlternates, site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  return {
    // Absolute (no "| Arrowbin" suffix) — keeps long article titles under the SERP limit.
    title: { absolute: post.title },
    description: post.description,
    keywords: post.keywords,
    alternates: pageAlternates(path),
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: path,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      images: [
        { url: `/blog/${post.slug}/opengraph-image`, width: 1200, height: 630 },
      ],
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
  if (!post) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];
  const more = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const toc = tableOfContents(post);
  const shareUrl = `${site.url}/blog/${post.slug}`;

  // Static TOC for the mobile/tablet inline panel (the sidebar uses scroll-spy).
  const tocList = (
    <ol className="mt-3 space-y-2 text-sm">
      {toc.map((item, i) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="flex gap-2 text-muted transition-colors hover:text-accent"
          >
            <span className="text-accent">{i + 1}.</span>
            <span>{item.text}</span>
          </a>
        </li>
      ))}
    </ol>
  );

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
            dateModified: post.updated ?? post.date,
            author: post.author,
          }),
          ...(post.faqs ? [faqSchema(post.faqs)] : []),
        ]}
      />

      <ReadingProgress targetId="article-root" />

      <ArticleHero post={post} />

      <article id="article-root" className="py-12 sm:py-16">
        <Container>
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14">
            {/* Main column */}
            <div className="min-w-0">
              {/* TL;DR direct-answer block (AEO/GEO) */}
              {post.tldr ? (
                <div
                  id="tldr"
                  className="rounded-2xl border border-border bg-surface-2 p-5 sm:p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                    TL;DR
                  </p>
                  <p className="mt-2 leading-relaxed text-text">{post.tldr}</p>
                </div>
              ) : null}

              {/* Inline table of contents — mobile/tablet only */}
              {toc.length > 2 ? (
                <nav
                  aria-label="Table of contents"
                  className="mt-8 rounded-2xl border border-border bg-surface p-5 lg:hidden"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    On this page
                  </p>
                  {tocList}
                </nav>
              ) : null}

              <div className="mt-10">
                <PostBody blocks={post.body} />
              </div>

              {/* Key takeaways */}
              {post.takeaways?.length ? (
                <section className="mt-12 rounded-2xl border border-border bg-surface-2 p-6 sm:p-8">
                  <h2 className="font-display text-xl font-bold text-text">
                    Key takeaways
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {post.takeaways.map((t) => (
                      <li key={t} className="flex gap-3">
                        <Icon
                          name="check"
                          size={20}
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        <span className="text-muted">{t}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {/* FAQ */}
              {post.faqs ? (
                <section className="mt-14">
                  <h2 className="font-display text-2xl font-bold text-text">
                    Frequently asked questions
                  </h2>
                  <div className="mt-6">
                    <FAQ items={post.faqs} />
                  </div>
                </section>
              ) : null}

              <AuthorCard />
            </div>

            {/* Sticky sidebar — desktop only */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-5">
                {toc.length > 2 ? (
                  <nav
                    aria-label="Table of contents"
                    className="rounded-2xl border border-border bg-surface p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                      On this page
                    </p>
                    <Toc items={toc} />
                  </nav>
                ) : null}

                <div className="rounded-2xl border border-border bg-surface p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Share
                  </p>
                  <div className="mt-3">
                    <ShareLinks url={shareUrl} title={post.title} />
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-surface-2 p-5">
                  <p className="font-display text-base font-semibold text-text">
                    Have a project in mind?
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Get a fixed estimate after a free 30-minute call.
                  </p>
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                  >
                    Book a call
                    <Icon name="arrow-right" size={14} />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </article>

      {/* More posts */}
      {more.length ? (
        <section className="border-t border-border bg-surface py-16">
          <Container>
            <h2 className="text-2xl font-bold">Keep reading</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {more.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg transition-colors hover:border-accent"
                >
                  <Image
                    src={postThumbnail(p)}
                    alt={`${p.title} — article thumbnail`}
                    width={1200}
                    height={630}
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="aspect-[1200/630] w-full border-b border-border object-cover"
                  />
                  <div className="p-6">
                    <span className="text-xs font-medium text-accent">
                      {p.category}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-semibold text-text group-hover:text-accent">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CTASection />
    </>
  );
}
