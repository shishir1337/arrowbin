import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactNext } from "@/components/contact/ContactNext";
import { Faq } from "@/components/home/Faq";
// Below-the-fold client island, fetched during hydration (see islands.tsx).
import { ContactBrief, IslandPreload } from "@/components/home/islands";
import { InnerMotion } from "@/components/motion/InnerMotion";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageShare } from "@/lib/metadata";
import { breadcrumbSchema, contactPageSchema, faqSchema } from "@/lib/schema";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  // Absolute (skips the "| Arrowbin" template): keyword-rich and avoids a
  // bare, one-word SERP title.
  title: { absolute: "Contact Arrowbin | Free Software Consultation" },
  description:
    "Tell Arrowbin about your custom software, web or mobile app, SaaS or AI automation project. Free consultation and a reply within one business day.",
  ...pageShare({
    path: "/contact",
    title: "Contact Arrowbin",
    description: "Start your project with a free, no-obligation consultation.",
  }),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

/** Only what the brief's "need" chips use, not the whole services module. */
const NEEDS = services.map(({ slug, name }) => ({ slug, name }));

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
        data={[contactPageSchema(), breadcrumbSchema(crumbs), faqSchema(FAQS)]}
      />
      <IslandPreload keys={["contactBrief"]} />
      <InnerMotion />
      <ContactHero crumbs={crumbs} />
      <ContactBrief label="01" services={NEEDS} />
      <ContactNext label="02" />
      <Faq items={FAQS} index="03" />
    </>
  );
}
