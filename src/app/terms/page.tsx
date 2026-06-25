import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageAlternates, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions that govern your use of the Arrowbin website and the engagement of our software development services.",
  alternates: pageAlternates("/terms"),
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Terms of Service", path: "/terms" },
];

const sections = [
  {
    h: "Acceptance of terms",
    p: "By accessing this website or engaging Arrowbin for services, you agree to be bound by these Terms of Service. If you do not agree, please do not use the site or our services.",
  },
  {
    h: "Use of our website",
    p: "You may use this website for lawful purposes only. You agree not to misuse the site, attempt to disrupt its operation, access it through automated means without permission, or use it to transmit harmful or unlawful content.",
  },
  {
    h: "Services and engagements",
    p: "Any software development, design, or consulting work is governed by a separate written agreement or statement of work between you and Arrowbin. That agreement defines the scope, deliverables, timelines, fees, and payment terms for your project. Nothing on this website constitutes a binding offer to provide services.",
  },
  {
    h: "Intellectual property",
    p: "All content on this website, including text, graphics, logos, and code, is owned by Arrowbin or its licensors and is protected by applicable intellectual-property laws. Ownership of work produced for clients transfers according to the terms of the relevant project agreement.",
  },
  {
    h: "Quotes and communications",
    p: "Information you submit through our contact form is used to respond to your enquiry and prepare proposals. Estimates or quotes provided are indicative until confirmed in a signed agreement.",
  },
  {
    h: "Disclaimers and limitation of liability",
    p: 'This website is provided on an "as is" basis without warranties of any kind. To the fullest extent permitted by law, Arrowbin is not liable for any indirect or consequential damages arising from your use of the site. Liability for paid engagements is governed by the applicable project agreement.',
  },
  {
    h: "Third-party links",
    p: "Our website and portfolio may link to third-party sites we do not control. We are not responsible for the content, policies, or practices of those sites.",
  },
  {
    h: "Changes to these terms",
    p: "We may update these Terms of Service from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised terms.",
  },
  {
    h: "Contact us",
    p: `If you have any questions about these Terms of Service, email us at ${site.email}.`,
  },
];

export default function TermsPage() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_-8%,rgba(163,230,53,0.1),transparent_55%)]"
      />
      <Container>
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8">
            <Eyebrow>Legal</Eyebrow>
          </div>
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-muted">
            These terms govern your use of the {site.legalName} website and
            services.
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
