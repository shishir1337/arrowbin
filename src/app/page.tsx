import type { Metadata } from "next";
import { Suspense } from "react";
import { Bento } from "@/components/home/Bento";
import { Cta } from "@/components/home/Cta";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { Numbers } from "@/components/home/Numbers";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { Tapes } from "@/components/home/Tapes";
import { Testimonials } from "@/components/home/Testimonials";
import { Work } from "@/components/home/Work";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { defaultOgImage, site } from "@/lib/site";

const homeTitle = "Custom Software Development Company | Arrowbin";
const homeDescription =
  "Arrowbin is a software development company. We build custom software, web and mobile apps, SaaS products, AI automation and cloud solutions for clients worldwide.";

export const metadata: Metadata = {
  // Absolute title leads with the primary keyword (bypasses the "%s | Arrowbin" template).
  title: { absolute: homeTitle },
  description: homeDescription,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: homeTitle,
    description: homeDescription,
    url: "/",
    locale: "en_US",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [defaultOgImage],
  },
};

const homeFaqs = [
  {
    question: "What does Arrowbin do?",
    answer:
      "Arrowbin is a software development company. We design and build custom software, web applications, e-commerce stores, mobile apps, SaaS products, AI automation and cloud infrastructure, then maintain and support them long term.",
  },
  {
    question: "How much does it cost to work with Arrowbin?",
    answer:
      "Every project is scoped individually. Smaller builds typically start around $5,000–$10,000, while full platforms and SaaS products range higher. We provide a clear, fixed estimate after a free consultation so you know the cost upfront.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects launch a first usable version in 6–12 weeks, depending on scope. We work in agile sprints, so you see progress every week and can launch early, then keep improving.",
  },
  {
    question: "Do you work with clients worldwide?",
    answer:
      "Yes. We work with clients around the world, across time zones, with overlapping hours, weekly demos and async updates in English or Bengali.",
  },
  {
    question: "Do I own the code you build?",
    answer:
      "Yes. You receive full ownership of all source code, designs and infrastructure we create for you. There is no vendor lock-in.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          faqSchema(homeFaqs),
        ]}
      />
      <Hero />
      {/* Each boundary hydrates as its own unit, so React yields to the
          browser between sections instead of one long hydration task. */}
      <Suspense fallback={null}>
        <Tapes />
      </Suspense>
      <Suspense fallback={null}>
        <Manifesto />
      </Suspense>
      <Suspense fallback={null}>
        <Services />
      </Suspense>
      <Suspense fallback={null}>
        <Numbers />
      </Suspense>
      <Suspense fallback={null}>
        <Work />
      </Suspense>
      <Suspense fallback={null}>
        <Process />
      </Suspense>
      <Suspense fallback={null}>
        <Bento />
      </Suspense>
      <Suspense fallback={null}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={null}>
        <Faq items={homeFaqs} />
      </Suspense>
      <Suspense fallback={null}>
        <Cta />
      </Suspense>
    </>
  );
}
