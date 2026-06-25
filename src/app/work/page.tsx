import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { Stats } from "@/components/sections/Stats";
import { WhyArrowbin } from "@/components/sections/WhyArrowbin";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JsonLd } from "@/components/ui/JsonLd";
import { clients, projects } from "@/lib/portfolio";
import { breadcrumbSchema, workListSchema } from "@/lib/schema";
import { defaultOgImage, pageAlternates, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work & Portfolio",
  description:
    "See software, websites and e-commerce stores Arrowbin has designed and built, including Muxoro, Madexa, Maneel Club, Brandingly and more.",
  alternates: pageAlternates("/work"),
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
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="blob left-[4%] top-[-18%] h-72 w-72" />
          <div
            className="blob right-[6%] top-[6%] h-80 w-80 opacity-10"
            style={{ animationDelay: "-7s", animationDuration: "24s" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_-8%,rgba(163,230,53,0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        </div>
        <Container>
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 max-w-3xl">
            <Reveal>
              <Eyebrow>Portfolio</Eyebrow>
            </Reveal>
            <Reveal as="h1" className="mt-5 text-4xl font-bold sm:text-5xl">
              Work we're proud of
            </Reveal>
            <Reveal as="p" className="mt-5 text-lg leading-relaxed text-muted">
              From fast marketing sites to e-commerce stores and full platforms,
              here's what we've shipped for clients around the world. Every one
              is a live product you can open and use right now.
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
        </Container>
        <div className="marquee-mask mt-8 overflow-hidden">
          <ul className="marquee-track items-center gap-x-12">
            {[...clients, ...clients].map((name, i) => (
              <li
                // biome-ignore lint/suspicious/noArrayIndexKey: duplicated marquee row needs stable positional keys.
                key={`${name}-${i}`}
                className="shrink-0 font-display text-lg font-semibold text-muted/70 transition-colors hover:text-text"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title="Want to be our next success story?"
        intro="Let's build something your customers will love. Book a free project consultation today."
      />
    </>
  );
}
