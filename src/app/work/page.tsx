import type { Metadata } from "next";
import { Cta } from "@/components/home/Cta";
import { InnerMotion } from "@/components/motion/InnerMotion";
import { JsonLd } from "@/components/ui/JsonLd";
import { WorkExplorer } from "@/components/work/WorkExplorer";
import { WorkHero } from "@/components/work/WorkHero";
import { WorkPartners } from "@/components/work/WorkPartners";
import { getBlurDataURL } from "@/lib/blur";
import { pageShare } from "@/lib/metadata";
import { clients, projects } from "@/lib/portfolio";
import { breadcrumbSchema, workListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Portfolio: Websites, Apps & Stores We Built",
  description:
    "Arrowbin's software development portfolio: live websites, e-commerce stores and platforms including Silent Lifestyle BD, FlexOver BD, Maneel Club and more.",
  ...pageShare({
    path: "/work",
    title: "Portfolio: Websites, Apps & Stores We Built | Arrowbin",
    description:
      "A selection of products, websites and platforms built by Arrowbin. Every one is live.",
  }),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
];

export default async function WorkPage() {
  const items = await Promise.all(
    projects.map(async (p) => ({
      name: p.name,
      url: p.url,
      blurb: p.blurb,
      result: p.result,
      tags: p.tags,
      image: p.image,
      blur: await getBlurDataURL(p.image),
    })),
  );

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), workListSchema(projects)]} />
      <InnerMotion />
      <WorkHero crumbs={crumbs} shots={items.slice(0, 5)} />
      <WorkExplorer items={items} label="01" />
      <WorkPartners label="02" names={clients} />
      {/* No <Suspense>: it streamed the CTA as a hidden block after </main>. */}
      <Cta index="03" />
    </>
  );
}
