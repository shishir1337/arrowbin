import type { Metadata } from "next";
import Link from "next/link";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { CTASection } from "@/components/sections/CTASection";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { LogoCloud } from "@/components/sections/LogoCloud";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { Process } from "@/components/sections/Process";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/lib/portfolio";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { services } from "@/lib/services";
import { defaultOgImage, site } from "@/lib/site";

const homeTitle = "Software Development Company | Arrowbin";
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
    question: "Do you work with clients outside Bangladesh and the USA?",
    answer:
      "Yes. With offices in Dhaka, Bangladesh and Florida, USA, we work with clients worldwide across time zones, communicating in English and Bengali.",
  },
  {
    question: "Do I own the code you build?",
    answer:
      "Yes. You receive full ownership of all source code, designs and infrastructure we create for you. There is no vendor lock-in.",
  },
];

const reasons = [
  {
    icon: "bolt",
    title: "Fast delivery",
    text: "Agile sprints and a senior team get you to launch quickly, with quality intact.",
  },
  {
    icon: "shield",
    title: "Built to last",
    text: "Clean, tested, scalable code and documentation you can build on for years.",
  },
  {
    icon: "users",
    title: "Real partnership",
    text: "Clear communication and real ownership. We're invested in how your product does.",
  },
  {
    icon: "globe",
    title: "Global and flexible",
    text: "Two offices, clients worldwide, and collaboration that fits your time zone.",
  },
] as const;

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
      <LogoCloud />

      {/* Services */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="End-to-end software services"
            intro="From the first idea to ongoing growth, we cover what you need to build and scale your software."
          />
          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </StaggerGroup>
          <div className="mt-10 text-center">
            <ButtonLink href="/services" variant="secondary" icon="arrow-right">
              Explore all services
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Stats />

      {/* Why choose us */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <SectionHeading
              align="left"
              eyebrow="Why Arrowbin"
              title="A development partner you can rely on"
              intro="We pair senior engineering with thoughtful design and honest communication, and we ship software that earns its keep."
            />
            <StaggerGroup className="grid gap-6 sm:grid-cols-2">
              {reasons.map((r) => (
                <SpotlightCard
                  key={r.title}
                  data-reveal
                  className="rounded-2xl p-6"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface-2 text-accent">
                    <Icon name={r.icon} size={22} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-text">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {r.text}
                  </p>
                </SpotlightCard>
              ))}
            </StaggerGroup>
          </div>
        </Container>
      </section>

      <Process />

      {/* Portfolio preview */}
      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              align="left"
              eyebrow="Selected work"
              title="Products we've helped build"
              intro="A few of the brands and platforms we've shipped."
            />
            <Link
              href="/work"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              View all work
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>
          <div className="mt-12">
            <PortfolioGrid items={projects.slice(0, 6)} />
          </div>
        </Container>
      </section>

      <Testimonials />

      {/* FAQ */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered"
            intro="What you need to know before starting a project with Arrowbin."
          />
          <div className="mt-12">
            <FAQ items={homeFaqs} />
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
