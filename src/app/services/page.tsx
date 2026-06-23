import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { CTASection } from "@/components/sections/CTASection";
import { FAQ } from "@/components/sections/FAQ";
import { Process } from "@/components/sections/Process";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Stats } from "@/components/sections/Stats";
import { WhyArrowbin } from "@/components/sections/WhyArrowbin";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, faqSchema, serviceListSchema } from "@/lib/schema";
import { services } from "@/lib/services";
import { defaultOgImage, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Software Development Services",
  description:
    "Arrowbin's software development services — custom software, e-commerce, mobile & SaaS apps, UI/UX, AI automation, cloud/DevOps and support.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Software Development Services | Arrowbin",
    description:
      "Custom software, web & mobile apps, SaaS, UI/UX, AI automation, cloud and support — end to end.",
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
      "We offer custom software development, e-commerce, mobile apps, SaaS product engineering, UI/UX design, AI automation, cloud/DevOps & hosting, and ongoing maintenance & support — end to end, under one roof.",
  },
  {
    question: "How much does it cost to work with Arrowbin?",
    answer:
      "It depends on scope, but most projects range from around $8,000 for a focused tool to $75,000+ for a full platform. We give you a fixed, transparent estimate after a free discovery call.",
  },
  {
    question: "Where is Arrowbin based?",
    answer:
      "We have offices in Dhaka, Bangladesh and Florida, USA, and we work with clients worldwide across time zones.",
  },
  {
    question: "Do I own the code and IP?",
    answer:
      "Yes — you own 100% of the source code, accounts and infrastructure. There is no vendor lock-in.",
  },
  {
    question: "How do we get started?",
    answer:
      "Book a free 30-minute discovery call. We'll talk through your goals, then send a clear scope and a fixed estimate before any work begins.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceListSchema(services),
          faqSchema(overviewFaqs),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_-10%,rgba(101,163,13,0.13),transparent_55%)] dark:bg-[radial-gradient(circle_at_25%_-10%,rgba(163,230,53,0.12),transparent_55%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        />
        <Container>
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 max-w-3xl">
            <Reveal className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-accent">
              Services
            </Reveal>
            <Reveal as="h1" className="mt-5 text-4xl font-bold sm:text-5xl">
              Software development services that scale with you
            </Reveal>
            <Reveal as="p" className="mt-5 text-lg leading-relaxed text-muted">
              Whatever stage you're at, we have a team to help — from a first
              MVP to enterprise platforms and everything in between. One partner
              for design, engineering, AI and support.
            </Reveal>
            <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" size="lg" icon="arrow-right">
                Start your project
              </ButtonLink>
              <ButtonLink
                href={site.bookingUrl}
                external
                size="lg"
                variant="secondary"
              >
                Book a call
              </ButtonLink>
            </Reveal>
            <Reveal className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {[
                "You own your code",
                "Senior engineers",
                "Offices in BD & USA",
                "Fixed-price option",
              ].map((t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <Icon name="check" size={16} className="text-accent" />
                  {t}
                </span>
              ))}
            </Reveal>
          </div>

          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <Stats />
      <Process />
      <WhyArrowbin className="border-y border-border bg-surface py-16 sm:py-20" />

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="text-center text-3xl font-bold">
            Frequently asked questions
          </h2>
          <div className="mt-10">
            <FAQ items={overviewFaqs} />
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
