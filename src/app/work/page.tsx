import type { Metadata } from "next";
import { Suspense } from "react";
import { Cta } from "@/components/home/Cta";
import { InnerMotion } from "@/components/motion/InnerMotion";
import { JsonLd } from "@/components/ui/JsonLd";
import { WorkExplorer } from "@/components/work/WorkExplorer";
import { WorkHero } from "@/components/work/WorkHero";
import { WorkPartners } from "@/components/work/WorkPartners";
import { getBlurDataURL } from "@/lib/blur";
import { clients, projects } from "@/lib/portfolio";
import { breadcrumbSchema, workListSchema } from "@/lib/schema";
import { defaultOgImage, pageAlternates } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work & Portfolio",
  description:
    "See software, websites and e-commerce stores Arrowbin has designed and built, including Silent Lifestyle BD, FlexOver BD, Maneel Club, Brandingly and more.",
  alternates: pageAlternates("/work"),
  openGraph: {
    title: "Our Work & Portfolio | Arrowbin",
    description:
      "A selection of products, websites and platforms built by Arrowbin. Every one is live.",
    url: "/work",
    images: [defaultOgImage],
  },
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
      <WorkHero
        crumbs={crumbs}
        count={items.length}
        shots={items.slice(0, 5)}
      />
      <WorkExplorer items={items} label="01" />
      <WorkPartners label="02" names={clients} />
      <Suspense fallback={null}>
        <Cta index="03" />
      </Suspense>
    </>
  );
}
