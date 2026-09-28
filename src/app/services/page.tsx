import type { Metadata } from "next";
import { Suspense } from "react";
import { Cta } from "@/components/home/Cta";
import { Faq } from "@/components/home/Faq";
import { InnerMotion } from "@/components/motion/InnerMotion";
import { Capabilities } from "@/components/services/Capabilities";
import { Engagement } from "@/components/services/Engagement";
import { ServiceIndex } from "@/components/services/ServiceIndex";
import { ServicesHero } from "@/components/services/ServicesHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, faqSchema, serviceListSchema } from "@/lib/schema";
import { services } from "@/lib/services";
import { defaultOgImage, pageAlternates } from "@/lib/site";

export const metadata: Metadata = {
  title: "Software Development Services",
  description:
    "Arrowbin's software development services: custom software, e-commerce, mobile and SaaS apps, UI/UX, AI automation, cloud/DevOps and support.",
  alternates: pageAlternates("/services"),
  openGraph: {
    title: "Software Development Services | Arrowbin",
    description:
      "Custom software, web and mobile apps, SaaS, UI/UX, AI automation, cloud and support, end to end.",
    url: "/services",
    images: [defaultOgImage],
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

const overviewFaqs = [
  {
    question: "What software development services does Arrowbin offer?",
    answer:
      "We offer custom software development, e-commerce, mobile apps, SaaS product engineering, UI/UX design, AI automation, cloud/DevOps and hosting, plus ongoing maintenance and support. End to end, under one roof.",
  },
  {
    question: "How much does it cost to work with Arrowbin?",
    answer:
      "It depends on scope. Most projects run from around $8,000 for a focused tool to $75,000+ for a full platform. We give you a fixed, transparent estimate after a free discovery call.",
  },
  {
    question: "Do you work with clients outside your region?",
    answer:
      "Yes. We work with clients around the world, across time zones, with overlapping hours, weekly demos and async updates.",
  },
  {
    question: "Do I own the code and IP?",
    answer:
      "Yes. You own 100% of the source code, accounts and infrastructure. There is no vendor lock-in.",
  },
  {
    question: "How do we get started?",
    answer:
      "Book a free 30-minute discovery call. We'll talk through your goals, then send a clear scope and a fixed estimate before any work begins.",
  },
];

export default function ServicesPage() {
  const caps = services.map(({ slug, name, summary, deliverables, tech }) => ({
    slug,
    name,
    summary,
    deliverables,
    tech,
  }));
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceListSchema(services),
          faqSchema(overviewFaqs),
        ]}
      />
      <InnerMotion />
      <ServicesHero crumbs={crumbs} />
      <Suspense fallback={null}>
        <ServiceIndex />
      </Suspense>
      <Suspense fallback={null}>
        <Capabilities items={caps} />
      </Suspense>
      <Suspense fallback={null}>
        <Engagement />
      </Suspense>
      <Suspense fallback={null}>
        <Faq items={overviewFaqs} index="04" />
      </Suspense>
      <Suspense fallback={null}>
        <Cta index="05" />
      </Suspense>
    </>
  );
}
