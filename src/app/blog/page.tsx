import type { Metadata } from "next";
import { BlogAnswers, BlogHero, BlogList } from "@/components/blog/BlogIndex";
import { Cta } from "@/components/home/Cta";
import { InnerMotion } from "@/components/motion/InnerMotion";
import { JsonLd } from "@/components/ui/JsonLd";
import { sortedPosts } from "@/lib/blog";
import { pageShare } from "@/lib/metadata";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";

const title = "Software Development Blog: Costs, MVPs & Hiring";
const description =
  "Practical software development guides from the Arrowbin team: what software costs, how long an MVP takes, and how to choose a development partner.";

export const metadata: Metadata = {
  title,
  description,
  ...pageShare({
    path: "/blog",
    title: `${title} | Arrowbin`,
    description: "Guides on software development, cost, MVPs, SaaS and AI.",
  }),
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
            name: "Arrowbin Blog",
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
      {/* Rendered directly, not inside <Suspense>: a boundary here made the
          prerendered HTML stream the closing CTA as a hidden block after </main>. */}
      <Cta index="03" />
    </>
  );
}
