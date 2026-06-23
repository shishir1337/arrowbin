import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { Stats } from "@/components/sections/Stats";
import { WhyArrowbin } from "@/components/sections/WhyArrowbin";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { clients, projects } from "@/lib/portfolio";
import { breadcrumbSchema, workListSchema } from "@/lib/schema";
import { defaultOgImage, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work & Portfolio",
  description:
    "See software, websites and e-commerce stores Arrowbin has designed and built — including Muxoro, Madexa, Maneel Club, Brandingly and more.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Our Work & Portfolio | Arrowbin",
    description:
      "A selection of products, websites and platforms built by Arrowbin.",
    url: "/work",
    images: [defaultOgImage],
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
];

export default function WorkPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), workListSchema(projects)]} />

      {/* Hero + portfolio */}
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
              Portfolio
            </Reveal>
            <Reveal as="h1" className="mt-5 text-4xl font-bold sm:text-5xl">
              Work we're proud of
            </Reveal>
            <Reveal as="p" className="mt-5 text-lg leading-relaxed text-muted">
              From fast marketing sites to e-commerce stores and platforms —
              here's a look at what we've shipped for clients around the world.
              Every one is a live, working product you can open and use.
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
          </div>

          <div className="mt-14">
            <PortfolioGrid items={projects} />
          </div>
        </Container>
      </section>

      <Stats />

      <WhyArrowbin />

      {/* Clients */}
      <section className="border-t border-border bg-surface py-16">
        <Container>
          <Reveal
            as="p"
            className="text-center text-sm font-medium uppercase tracking-widest text-muted"
          >
            And many more companies we've partnered with
          </Reveal>
          <Reveal>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {clients.map((name) => (
                <li
                  key={name}
                  className="font-display text-lg font-semibold text-muted"
                >
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <CTASection
        title="Want to be our next success story?"
        intro="Let's build something your customers will love. Get a free project consultation today."
      />
    </>
  );
}
