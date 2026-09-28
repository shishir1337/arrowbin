import type { Metadata } from "next";
import { ContactBrief } from "@/components/contact/ContactBrief";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactNext } from "@/components/contact/ContactNext";
import { Faq } from "@/components/home/Faq";
import { InnerMotion } from "@/components/motion/InnerMotion";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, faqSchema, localBusinessSchema } from "@/lib/schema";
import { defaultOgImage, pageAlternates } from "@/lib/site";

export const metadata: Metadata = {
  // Absolute (skips the "| Arrowbin" template): keyword-rich and avoids a
  // bare, one-word SERP title.
  title: { absolute: "Contact Arrowbin — Free Software Consultation" },
  description:
    "Tell Arrowbin about your custom software, web or mobile app, SaaS or AI automation project. Free consultation and a reply within one business day.",
  alternates: pageAlternates("/contact"),
  openGraph: {
    title: "Contact Arrowbin",
    description: "Start your project with a free, no-obligation consultation.",
    url: "/contact",
    images: [defaultOgImage],
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

const FAQS = [
  {
    question: "How quickly will you reply?",
    answer:
      "Within one business day, from someone who would actually work on your project. If your brief needs a few answers first, we'll ask them in that reply.",
  },
  {
    question: "Is the first call really free?",
    answer:
      "Yes. The first call and the written proposal cost nothing and don't commit you to anything. We'd rather tell you honestly if we're not the right fit.",
  },
  {
    question: "I only have a rough idea. Is that enough?",
    answer:
      "It's the most common starting point. Tell us the problem and who it's for; working out the scope together is part of what we do.",
  },
  {
    question: "Can you sign an NDA before we talk?",
    answer:
      "Yes. Mention it in your brief or email and we'll sign one before you share anything sensitive.",
  },
  {
    question: "Do you work with clients outside your time zone?",
    answer:
      "All the time. Our clients are around the world, and we agree overlap hours and a weekly update rhythm at kick-off.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          ...localBusinessSchema(),
          faqSchema(FAQS),
        ]}
      />
      <InnerMotion />
      <ContactHero crumbs={crumbs} />
      <ContactBrief label="01" />
      <ContactNext label="02" />
      <Faq items={FAQS} index="03" />
    </>
  );
}
