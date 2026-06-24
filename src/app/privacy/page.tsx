import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { pageAlternates, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Arrowbin collects, uses and protects your personal information when you use our website and services.",
  alternates: pageAlternates("/privacy"),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy" },
];

const sections = [
  {
    h: "Information we collect",
    p: "When you contact us through our website, we collect the details you provide — such as your name, email address, and any information in your message. We may also collect basic, anonymized analytics about how visitors use our site.",
  },
  {
    h: "How we use your information",
    p: "We use the information you provide solely to respond to your enquiry, deliver our services, and communicate with you about your project. We do not sell your personal information to third parties.",
  },
  {
    h: "How we protect your data",
    p: "We apply reasonable technical and organizational measures to protect your information against unauthorized access, loss or misuse. Data is transmitted over encrypted connections.",
  },
  {
    h: "Third-party services",
    p: "We may use trusted third-party providers (for example, email delivery and analytics) that process data on our behalf under their own privacy terms. We only share what is necessary to provide our services.",
  },
  {
    h: "Your rights",
    p: "You may request access to, correction of, or deletion of the personal information we hold about you at any time. To make a request, contact us using the details below.",
  },
  {
    h: "Contact us",
    p: `If you have any questions about this Privacy Policy or how we handle your data, email us at ${site.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-8 text-4xl font-bold sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-muted">
            This policy explains how {site.legalName} collects, uses and
            protects your information.
          </p>

          <div className="mt-10 space-y-8">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="font-display text-xl font-semibold text-text">
                  {s.h}
                </h2>
                <p className="mt-2 leading-relaxed text-muted">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
