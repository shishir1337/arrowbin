import type { Metadata } from "next";
import { AboutDisciplines } from "@/components/about/AboutDisciplines";
import { AboutFounder } from "@/components/about/AboutFounder";
import { AboutHero } from "@/components/about/AboutHero";
import { Cta } from "@/components/home/Cta";
// Below-the-fold client islands, fetched during hydration (see islands.tsx).
import { AboutValues, IslandPreload } from "@/components/home/islands";
import { InnerMotion } from "@/components/motion/InnerMotion";
import { ServiceHosting } from "@/components/services/ServiceHosting";
import { JsonLd } from "@/components/ui/JsonLd";
import { getBlurDataURL } from "@/lib/blur";
import { pageShare } from "@/lib/metadata";
import { aboutPageSchema, breadcrumbSchema, founderSchema } from "@/lib/schema";
import { author } from "@/lib/site";

export const metadata: Metadata = {
  // Absolute: avoids the duplicated "About Arrowbin | Arrowbin" the template
  // would otherwise produce.
  title: { absolute: "About Arrowbin | Software Development Company" },
  description:
    "Arrowbin is a founder-led software development company building for clients around the world since 2020. Learn how we work and what we stand for.",
  ...pageShare({
    path: "/about",
    title: "About Arrowbin",
    description:
      "A founder-led software development company building reliable, scalable software with senior engineering and honest communication.",
  }),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default async function AboutPage() {
  const blur = await getBlurDataURL(author.image);

  return (
    <>
      <JsonLd
        data={[breadcrumbSchema(crumbs), aboutPageSchema(), founderSchema()]}
      />
      <IslandPreload keys={["aboutValues"]} />
      <InnerMotion />
      <AboutHero crumbs={crumbs} blur={blur} />
      <AboutValues label="01" />
      <AboutDisciplines label="02" />
      <AboutFounder label="03" blur={blur} />
      <ServiceHosting label="04" />
      {/* No <Suspense>: it streamed the CTA as a hidden block after </main>. */}
      <Cta index="05" />
    </>
  );
}
