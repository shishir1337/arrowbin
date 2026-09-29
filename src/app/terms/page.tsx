import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { InnerMotion } from "@/components/motion/InnerMotion";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageAlternates, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the Arrowbin website and how engagements for our software development services work.",
  alternates: pageAlternates("/terms"),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Terms of Service", path: "/terms" },
];

const UPDATED = "29 September 2026";
const UPDATED_ISO = "2026-09-29";

const link =
  "font-semibold text-ultra underline decoration-2 underline-offset-4";

const sections: LegalSection[] = [
  {
    id: "about-these-terms",
    title: "About these terms",
    blocks: [
      {
        type: "p",
        text: `These terms apply to your use of arrowbin.com, run by ${site.legalName} ("Arrowbin", "we", "us"). By using the website or engaging us for services, you agree to them. If you don't agree, please don't use the website or our services.`,
      },
    ],
  },
  {
    id: "using-the-website",
    title: "Using the website",
    blocks: [
      {
        type: "p",
        text: "You may use this website for lawful purposes only. You agree not to:",
      },
      {
        type: "ul",
        items: [
          "Misuse the site or try to disrupt how it works.",
          "Access it through automated means, such as scrapers or bots, without our permission.",
          "Use it to send harmful, misleading or unlawful content, including through our forms.",
        ],
      },
    ],
  },
  {
    id: "our-services",
    title: "Our services",
    blocks: [
      {
        type: "p",
        text: "Any software development, design or consulting work we do is governed by a separate written agreement or statement of work between you and Arrowbin. That agreement sets the scope, deliverables, timeline, fees and payment terms for your project, and it takes priority over these terms if the two ever conflict.",
      },
      {
        type: "p",
        text: "Nothing on this website is a binding offer to provide services.",
      },
    ],
  },
  {
    id: "quotes-and-estimates",
    title: "Quotes and estimates",
    blocks: [
      {
        type: "p",
        text: "Estimates, quotes and timelines we give you are indicative until they are confirmed in a signed agreement. Figures shown on this website, including in our guides and interactive examples, are illustrations to help you plan, not quotes for your project.",
      },
    ],
  },
  {
    id: "your-information",
    title: "Information you send us",
    blocks: [
      {
        type: "p",
        text: (
          <>
            We use what you send through our forms to reply to your enquiry and
            prepare proposals. How we collect, use and protect it is explained
            in our{" "}
            <Link href="/privacy" className={link}>
              Privacy Policy
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    blocks: [
      {
        type: "p",
        text: "The content of this website, including its text, graphics, logos and code, belongs to Arrowbin or its licensors and is protected by intellectual property law. You may not copy or reuse it without our permission, apart from sharing links or short quotes with credit.",
      },
      {
        type: "p",
        text: "Ownership of work we create for clients passes as set out in the agreement for that project.",
      },
    ],
  },
  {
    id: "third-party-links",
    title: "Other websites",
    blocks: [
      {
        type: "p",
        text: "This website links to sites we don't control, including the live client projects in our portfolio and our booking page. We aren't responsible for their content, policies or practices.",
      },
    ],
  },
  {
    id: "liability",
    title: "Disclaimers and liability",
    blocks: [
      {
        type: "p",
        text: 'This website is provided "as is", without warranties of any kind. We work to keep it accurate and available, but we can\'t promise it will always be error-free or uninterrupted.',
      },
      {
        type: "p",
        text: "To the fullest extent the law allows, Arrowbin isn't liable for any indirect or consequential loss arising from your use of the website. Liability for paid work is governed by the agreement for that project. Nothing in these terms limits liability that can't be limited by law.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    blocks: [
      {
        type: "p",
        text: `We may update these terms from time to time and will show the new date at the top of this page. Using the website after an update means you accept the revised terms. This version was last updated on ${UPDATED}.`,
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <InnerMotion />
      <LegalPage
        crumbs={crumbs}
        title={["Terms of", "service."]}
        intro="The ground rules for using arrowbin.com, and how working with us is agreed. Short, and in plain English."
        updated={UPDATED}
        updatedIso={UPDATED_ISO}
        summary={[
          "Use the website lawfully and don't try to break it.",
          "Project work is set out in its own signed agreement.",
          "Quotes are indicative until that agreement is signed.",
          "Your code's ownership follows your project agreement.",
        ]}
        sections={sections}
        related={{ href: "/privacy", label: "Privacy Policy" }}
      />
    </>
  );
}
