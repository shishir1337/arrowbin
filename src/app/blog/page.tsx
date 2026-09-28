import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogAnswers, BlogHero, BlogList } from "@/components/blog/BlogIndex";
import { Cta } from "@/components/home/Cta";
import { InnerMotion } from "@/components/motion/InnerMotion";
import { JsonLd } from "@/components/ui/JsonLd";
import { sortedPosts } from "@/lib/blog";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import { defaultOgImage, pageAlternates } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Practical guides and insights on software development, cost, MVPs, SaaS, AI and choosing the right development partner — from the Arrowbin team.",
  alternates: {
    ...pageAlternates("/blog"),
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
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          collectionPageSchema({
            name: "Blog & Insights — Arrowbin",
            description:
              "Practical guides and insights on software development, cost, MVPs, SaaS, AI and choosing the right development partner.",
            path: "/blog",
            items: sortedPosts,
          }),
        ]}
      />
      <InnerMotion />
      <BlogHero crumbs={crumbs} posts={sortedPosts} />
      <BlogList posts={sortedPosts} label="01" />
      <BlogAnswers posts={sortedPosts} label="02" />
      <Suspense fallback={null}>
        <Cta index="03" />
      </Suspense>
    </>
  );
}
