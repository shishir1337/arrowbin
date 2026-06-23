import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { CTASection } from "@/components/sections/CTASection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { postThumbnail, sortedPosts } from "@/lib/blog";
import { breadcrumbSchema } from "@/lib/schema";
import { defaultOgImage } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Practical guides and insights on software development, cost, MVPs, SaaS, AI and choosing the right development partner — from the Arrowbin team.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
  openGraph: {
    title: "Blog & Insights | Arrowbin",
    description: "Guides on software development, cost, MVPs, SaaS and AI.",
    url: "/blog",
    images: [defaultOgImage],
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

export default function BlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <section className="py-14 sm:py-20">
        <Container>
          <Breadcrumbs items={crumbs} />
          <div className="mt-8">
            <SectionHeading
              align="left"
              as="h1"
              eyebrow="Insights"
              title="Guides for building better software"
              intro="Honest, practical advice on software cost, MVPs, SaaS, AI and working with development teams."
            />
          </div>

          <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedPosts.map((post) => (
              <article
                key={post.slug}
                data-reveal
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent"
              >
                <Image
                  src={postThumbnail(post)}
                  alt={`${post.title} — article thumbnail`}
                  width={1200}
                  height={630}
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="aspect-[1200/630] w-full border-b border-border object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span className="rounded-full bg-surface-2 px-2.5 py-1 font-medium text-accent">
                      {post.category}
                    </span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="mt-4 font-display text-xl font-semibold text-text">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="after:absolute after:inset-0 group-hover:text-accent"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <div className="relative mt-5 flex items-center justify-between border-t border-border pt-4 text-sm">
                    <time dateTime={post.date} className="text-muted">
                      {post.dateLabel}
                    </time>
                    <span className="inline-flex items-center gap-1 font-medium text-accent">
                      Read
                      <Icon
                        name="arrow-right"
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
