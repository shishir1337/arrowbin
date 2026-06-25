import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { CTASection } from "@/components/sections/CTASection";
import { Stats } from "@/components/sections/Stats";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getBlurDataURL } from "@/lib/blur";
import { aboutPageSchema, breadcrumbSchema, founderSchema } from "@/lib/schema";
import { author, defaultOgImage, pageAlternates, site } from "@/lib/site";

export const metadata: Metadata = {
  // Absolute — avoids the duplicated "About Arrowbin | Arrowbin" the template
  // would otherwise produce.
  title: { absolute: "About Arrowbin — Software Development Company" },
  description:
    "Arrowbin is a software development company with offices in Dhaka, Bangladesh and Florida, USA. Learn about our mission, our values and how we work.",
  alternates: pageAlternates("/about"),
  openGraph: {
    title: "About Arrowbin",
    description:
      "A software development company building reliable, scalable software with senior engineering and honest communication.",
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
    text: "We write clean, tested, maintainable code. Software built to last, not just to ship.",
  },
  {
    icon: "users",
    title: "Real partnership",
    text: "We listen, communicate clearly, and take ownership of your product as if it were ours.",
  },
  {
    icon: "bolt",
    title: "Move with purpose",
    text: "We work fast but never recklessly. Every decision answers to your goals and your users.",
  },
  {
    icon: "sparkles",
    title: "Always improving",
    text: "We stay curious, adopt the tools that actually help, and keep raising our own bar.",
  },
];

export default async function AboutPage() {
  const headshotBlur = await getBlurDataURL(author.image);

  return (
    <>
      <JsonLd
        data={[breadcrumbSchema(crumbs), aboutPageSchema(), founderSchema()]}
      />

      {/* Hero + story */}
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="blob left-[4%] top-[-18%] h-72 w-72" />
          <div
            className="blob right-[8%] top-[6%] h-80 w-80 opacity-10"
            style={{ animationDelay: "-5s", animationDuration: "24s" }}
          />
        </div>
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
            <Reveal>
              <Eyebrow>About us</Eyebrow>
            </Reveal>
            <Reveal as="h1" className="mt-5 text-4xl font-bold sm:text-5xl">
              Software partners for ambitious teams
            </Reveal>
            <Reveal as="p" className="mt-5 text-lg leading-relaxed text-muted">
              Arrowbin is a software development company. We help startups and
              enterprises design, build and scale the products that run their
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
                We started Arrowbin in 2020 on a simple belief: good software
                shouldn't be reserved for the giants. Since then we've delivered
                web platforms, e-commerce stores, mobile apps and custom systems
                for clients around the world.
              </p>
              <p>
                With teams in Dhaka and Florida, we pair strong engineering with
                collaboration that fits your time zone. Whether you need a first
                MVP or a platform serving millions of users, you get the same
                care and the same attention to detail.
              </p>
            </Reveal>
            <Reveal className="grid gap-4 sm:grid-cols-2">
              {site.offices.map((office) => (
                <SpotlightCard key={office.label} className="rounded-2xl p-6">
                  <Icon name="map-pin" size={22} className="text-accent" />
                  <h2 className="mt-3 font-display text-lg font-semibold text-text">
                    {office.label}
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    {office.countryName}
                  </p>
                </SpotlightCard>
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
            intro="The principles behind how we build, and how we treat the people we work with."
          />
          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <SpotlightCard
                key={v.title}
                data-reveal
                className="rounded-2xl p-6"
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
              </SpotlightCard>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* Founder note */}
      <section className="border-y border-border bg-surface py-16 sm:py-20">
        <Container>
          <figure className="mx-auto max-w-3xl text-center">
            <Image
              src={author.image}
              alt={`${author.name}, ${author.jobTitle} of ${site.name}`}
              width={64}
              height={64}
              {...(headshotBlur
                ? { placeholder: "blur" as const, blurDataURL: headshotBlur }
                : {})}
              className="glow-ring mx-auto h-16 w-16 rounded-full object-cover"
            />
            <blockquote className="mt-6 font-display text-xl font-medium leading-snug text-text sm:text-2xl">
              "We built Arrowbin to be the partner we always wished we had:
              senior, honest, and as invested in your product as you are. We
              treat every build as if it were our own."
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
