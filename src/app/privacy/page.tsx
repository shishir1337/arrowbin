import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { InnerMotion } from "@/components/motion/InnerMotion";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageAlternates, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Arrowbin collects, uses and protects your personal information when you use our website and services: what we collect, who we share it with, and your rights.",
  alternates: pageAlternates("/privacy"),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy" },
];

const UPDATED = "29 September 2026";
const UPDATED_ISO = "2026-09-29";

const link =
  "font-semibold text-ultra underline decoration-2 underline-offset-4";

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    blocks: [
      {
        type: "p",
        text: `${site.legalName} ("Arrowbin", "we", "us") runs arrowbin.com and is responsible for the personal information collected through it. This policy covers the website and the enquiries you send us through it. Work we do for clients is also covered by the agreement for that project.`,
      },
    ],
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    blocks: [
      {
        type: "p",
        text: "Information you give us when you fill in a form or contact us:",
      },
      {
        type: "ul",
        items: [
          "Project brief (contact page): your name, email address, and, if you add them, your company or website, the services you need, a rough budget, a timeline and your project details.",
          "Quote form (service pages): your name, email address, your project details and the service you were viewing.",
          "Anything you send us by email or phone, or share when you book a call.",
        ],
      },
      {
        type: "p",
        text: "Information collected automatically when you visit:",
      },
      {
        type: "ul",
        items: [
          "Usage data through Google Analytics: pages viewed, how you arrived, approximate location (city or country), and device, browser and screen type.",
          "Technical data handled by Cloudflare, which delivers and protects the site: your IP address, browser details and the pages requested, used for security, performance and anonymous visit counts.",
          "Your IP address, kept briefly in memory to limit repeated form submissions and stop spam. It is not stored with your enquiry.",
        ],
      },
      {
        type: "p",
        text: "We don't take payments on this website, and we don't ask for sensitive information such as health or financial details. Please don't include it in a form.",
      },
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use it",
    blocks: [
      {
        type: "ul",
        items: [
          "To reply to your enquiry, answer your questions and prepare a proposal.",
          "To deliver and support the work you engage us for.",
          "To understand how the website is used, so we can improve it.",
          "To keep the website secure and protect it from spam and abuse.",
          "To meet our legal, tax and accounting obligations.",
        ],
      },
      {
        type: "p",
        text: "We never sell or rent your personal information, and we don't use it for automated decisions about you.",
      },
    ],
  },
  {
    id: "legal-bases",
    title: "Legal bases",
    blocks: [
      {
        type: "p",
        text: "Where laws such as the GDPR or UK GDPR apply, we rely on:",
      },
      {
        type: "ul",
        items: [
          "Taking steps you ask for before a contract, and performing that contract, when you send an enquiry or become a client.",
          "Our legitimate interests in running, securing and improving the website and our business, balanced against your rights.",
          "Your consent where the law requires it, for example for analytics cookies in some countries. You can withdraw consent at any time.",
          "Legal obligations, for example keeping business records.",
        ],
      },
    ],
  },
  {
    id: "who-we-share-it-with",
    title: "Services we use",
    blocks: [
      {
        type: "p",
        text: "We share information only with the providers that help us run the website and reply to you, and only what they need:",
      },
      {
        type: "table",
        headers: ["Provider", "What it does for us", "Data involved"],
        rows: [
          [
            "Resend",
            "Delivers form submissions to our inbox",
            "Everything you enter in a form",
          ],
          [
            "Google Analytics (Google)",
            "Measures how the website is used",
            "Usage and device data, via cookies",
          ],
          [
            "Cloudflare",
            "Delivers and secures the website, and counts visits",
            "IP address and request data",
          ],
          [
            "Cal.com",
            "Books calls, if you use our booking link",
            "What you enter when booking, under Cal.com's own policy",
          ],
        ],
      },
      {
        type: "p",
        text: "We also use a business email provider to receive and reply to messages. We may disclose information if the law requires it, or to protect our rights, and to a successor if our business is ever sold or merged.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    blocks: [
      {
        type: "p",
        text: "The website itself doesn't set cookies or store anything in your browser. Google Analytics sets cookies (named _ga and _ga_*) to tell visits apart; they last up to two years. Cloudflare may set a short-lived security cookie to filter out bots, and its visit counting doesn't use cookies.",
      },
      {
        type: "p",
        text: (
          <>
            You can block or delete cookies in your browser settings, or opt out
            of Google Analytics with Google&apos;s{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              opt-out browser add-on
            </a>
            . The website works fully without them.
          </>
        ),
      },
    ],
  },
  {
    id: "how-long-we-keep-it",
    title: "How long we keep it",
    blocks: [
      {
        type: "ul",
        items: [
          "Enquiries: for as long as we need them to reply and follow up, then deleted, unless they turn into a project.",
          "Client information: for the length of the engagement, then as long as our agreement and legal obligations require.",
          "Analytics data: for a limited period set in Google Analytics, no longer than 14 months.",
        ],
      },
    ],
  },
  {
    id: "international-transfers",
    title: "International transfers",
    blocks: [
      {
        type: "p",
        text: "We work with clients around the world, and our providers may process data in the United States and other countries. Where the law requires it, these transfers are covered by safeguards such as the European Commission's standard contractual clauses.",
      },
    ],
  },
  {
    id: "security",
    title: "How we protect it",
    blocks: [
      {
        type: "p",
        text: "The website is served only over encrypted HTTPS connections with strict security headers, and access to enquiries is limited to the people who need it to reply. No system is completely secure, but we take reasonable technical and organisational steps to protect your information.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    blocks: [
      {
        type: "p",
        text: "Depending on where you live, you can ask us to:",
      },
      {
        type: "ul",
        items: [
          "Give you a copy of the personal information we hold about you.",
          "Correct it if it's wrong, or delete it.",
          "Limit how we use it, or object to our use of it.",
          "Send it to you, or to another organisation, in a portable format.",
          "Withdraw any consent you've given.",
        ],
      },
      {
        type: "p",
        text: (
          <>
            Email{" "}
            <a href={`mailto:${site.email}`} className={link}>
              {site.email}
            </a>{" "}
            and we&apos;ll respond within one month. You also have the right to
            complain to your local data protection authority.
          </>
        ),
      },
    ],
  },
  {
    id: "children",
    title: "Children",
    blocks: [
      {
        type: "p",
        text: "This website is for businesses and isn't aimed at children under 16. We don't knowingly collect their information; if you think we have, contact us and we'll delete it.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    blocks: [
      {
        type: "p",
        text: `We'll update this page when our practices change and show the new date at the top. This version was last updated on ${UPDATED}.`,
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <InnerMotion />
      <LegalPage
        crumbs={crumbs}
        title={["Privacy", "policy."]}
        intro={`What we collect when you use arrowbin.com or send us an enquiry, why we collect it, who we share it with, and the choices you have.`}
        updated={UPDATED}
        updatedIso={UPDATED_ISO}
        summary={[
          "We collect what you send us, plus basic analytics.",
          "We use it to reply to you and to improve the site.",
          "We never sell or rent your data.",
          "Ask us any time to see or delete what we hold.",
        ]}
        sections={sections}
        related={{ href: "/terms", label: "Terms of Service" }}
      />
    </>
  );
}
