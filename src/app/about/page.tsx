import type { Metadata } from "next";
import { Suspense } from "react";
import { AboutDisciplines } from "@/components/about/AboutDisciplines";
import { AboutFounder } from "@/components/about/AboutFounder";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutValues } from "@/components/about/AboutValues";
import { Cta } from "@/components/home/Cta";
import { InnerMotion } from "@/components/motion/InnerMotion";
import { ServiceHosting } from "@/components/services/ServiceHosting";
import { JsonLd } from "@/components/ui/JsonLd";
import { getBlurDataURL } from "@/lib/blur";
import { aboutPageSchema, breadcrumbSchema, founderSchema } from "@/lib/schema";
import { author, defaultOgImage, pageAlternates } from "@/lib/site";

export const metadata: Metadata = {
  // Absolute: avoids the duplicated "About Arrowbin | Arrowbin" the template
  // would otherwise produce.
  title: { absolute: "About Arrowbin — Software Development Company" },
  description:
    "Arrowbin is a founder-led software development company building for clients around the world since 2020. Learn how we work and what we stand for.",
  alternates: pageAlternates("/about"),
  openGraph: {
    title: "About Arrowbin",
    description:
      "A founder-led software company building reliable, scalable software with senior engineering and honest communication.",
    url: "/about",
    images: [defaultOgImage],
  },
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
      <InnerMotion />
      <AboutHero crumbs={crumbs} blur={blur} />
      <AboutValues label="01" />
      <AboutDisciplines label="02" />
      <AboutFounder label="03" blur={blur} />
      <ServiceHosting label="04" />
      <Suspense fallback={null}>
        <Cta index="05" />
      </Suspense>
    </>
  );
}
