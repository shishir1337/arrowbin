import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { CTASection } from "@/components/sections/CTASection";
import { Stats } from "@/components/sections/Stats";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutPageSchema, breadcrumbSchema, founderSchema } from "@/lib/schema";
import { author, defaultOgImage, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Arrowbin",
  description:
    "Arrowbin is a global software development company with offices in Dhaka, Bangladesh and Florida, USA. Learn about our mission, values and how we work.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Arrowbin",
    description:
      "A global software development company building reliable, scalable software with senior engineering and honest communication.",
    url: "/about",
    images: [defaultOgImage],
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const values: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "shield",
    title: "Quality first",
    text: "We write clean, tested, maintainable code — software built to last, not just to ship.",
  },
  {
    icon: "users",
    title: "Real partnership",
    text: "We listen, communicate clearly and take ownership of your outcome as if it were ours.",
  },
  {
    icon: "bolt",
    title: "Move with purpose",
    text: "We work fast, but never recklessly — every decision serves your goals and your users.",
  },
  {
    icon: "sparkles",
    title: "Always improving",
    text: "We stay curious, adopt the best tools, and keep raising the bar on what we deliver.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[breadcrumbSchema(crumbs), aboutPageSchema(), founderSchema()]}
      />

      {/* Hero + story */}
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
              About us
            </Reveal>
            <Reveal as="h1" className="mt-5 text-4xl font-bold sm:text-5xl">
              Software partners for ambitious teams
            </Reveal>
            <Reveal as="p" className="mt-5 text-lg leading-relaxed text-muted">
              Arrowbin is a software development company helping startups and
              enterprises design, build and scale the products that power their
              business.
            </Reveal>
            <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" size="lg" icon="arrow-right">
                Work with us
              </ButtonLink>
              <ButtonLink href="/work" size="lg" variant="secondary">
                See our work
              </ButtonLink>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <Reveal className="space-y-4 leading-relaxed text-muted">
              <p>
                We started Arrowbin with a simple belief: great software should
                be accessible to every business, not just the giants. Since then
                we've delivered web platforms, e-commerce stores, mobile apps
                and custom systems for clients across the globe.
              </p>
              <p>
                With teams in Dhaka and Florida, we combine world-class
                engineering talent with close, time-zone-friendly collaboration.
                Whether you need a first MVP or a platform serving millions, we
                bring the same care, clarity and craftsmanship to every project.
              </p>
            </Reveal>
            <Reveal className="grid gap-4 sm:grid-cols-2">
              {site.offices.map((office) => (
                <div
                  key={office.label}
                  className="rounded-2xl border border-border bg-surface p-6"
                >
                  <Icon name="map-pin" size={22} className="text-accent" />
                  <h2 className="mt-3 font-display text-lg font-semibold text-text">
                    {office.label}
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    {office.countryName}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      <Stats />

      {/* Values */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our values"
            title="What we stand for"
            intro="The principles that guide how we build and how we treat the people we work with."
          />
          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                data-reveal
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface-2 text-accent">
                  <Icon name={v.icon} size={22} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-text">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {v.text}
                </p>
              </div>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* Founder note */}
      <section className="border-y border-border bg-surface py-16 sm:py-20">
        <Container>
          <figure className="mx-auto max-w-3xl text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent font-display text-lg font-bold text-accent-fg">
              SA
            </span>
            <blockquote className="mt-6 font-display text-xl font-medium leading-snug text-text sm:text-2xl">
              "We built Arrowbin to be the partner we always wished we had —
              senior, honest, and as invested in your outcome as you are. We
              treat every product as if it were our own."
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted">
              <span className="font-semibold text-text">{author.name}</span> ·{" "}
              {author.jobTitle}, {site.name}
            </figcaption>
          </figure>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
