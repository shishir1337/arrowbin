import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { CTASection } from "@/components/sections/CTASection";
import { FAQ } from "@/components/sections/FAQ";
import { HeroLeadForm } from "@/components/sections/HeroLeadForm";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { WhyArrowbin } from "@/components/sections/WhyArrowbin";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { getPost, postThumbnail } from "@/lib/blog";
import { projects } from "@/lib/portfolio";
import {
  breadcrumbSchema,
  faqSchema,
  processSchema,
  serviceSchema,
} from "@/lib/schema";
import { getService, getServiceExtras, services } from "@/lib/services";
import { pageAlternates, site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const path = `/services/${service.slug}`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: pageAlternates(path),
    openGraph: {
      title: `${service.metaTitle} | Arrowbin`,
      description: service.metaDescription,
      url: path,
      images: [
        {
          url: `/services/${service.slug}/opengraph-image`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.metaTitle} | Arrowbin`,
      description: service.metaDescription,
      images: [`/services/${service.slug}/opengraph-image`],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const extras = getServiceExtras(service.slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path },
  ];
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const work = (extras?.relatedWork ?? [])
    .map((name) => projects.find((p) => p.name === name))
    .filter((p): p is (typeof projects)[number] => Boolean(p));
  const guides = (extras?.relatedPosts ?? [])
    .map((s) => getPost(s))
    .filter((p): p is NonNullable<ReturnType<typeof getPost>> => Boolean(p));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema({
            name: service.name,
            description: service.metaDescription,
            path,
            deliverables: service.deliverables,
            audience: extras?.idealFor,
            hasAnswer: Boolean(extras?.answer),
          }),
          processSchema({
            name: `How Arrowbin delivers ${service.name}`,
            steps: service.process,
          }),
          faqSchema(service.faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="blob left-[4%] top-[-18%] h-72 w-72" />
          <div
            className="blob right-[6%] top-[8%] h-80 w-80 opacity-10"
            style={{ animationDelay: "-6s", animationDuration: "22s" }}
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(101,163,13,0.13),transparent_55%)] dark:bg-[radial-gradient(circle_at_20%_0%,rgba(163,230,53,0.12),transparent_55%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
        />
        <Container>
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="max-w-2xl">
              <Reveal>
                <Eyebrow icon={service.icon}>Service</Eyebrow>
              </Reveal>
              <Reveal as="h1" className="mt-5 text-4xl font-bold sm:text-5xl">
                {service.heading}
              </Reveal>
              <Reveal
                as="p"
                className="mt-5 text-lg leading-relaxed text-muted"
              >
                {service.intro}
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
            <Reveal className="lg:pt-2">
              <HeroLeadForm serviceName={service.name} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Outcomes band */}
      {extras?.outcomes.length ? (
        <section className="border-y border-border bg-surface py-12">
          <Container>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {extras.outcomes.map((o) => (
                <div key={o.label} className="text-center sm:text-left">
                  <p className="font-display text-3xl font-bold text-accent sm:text-4xl">
                    {o.value}
                  </p>
                  <p className="mt-1 text-sm text-muted">{o.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Overview — answer-first (AEO/GEO) */}
      {extras?.answer ? (
        <section className="py-16 sm:py-20">
          <Container>
            <div className="max-w-3xl">
              <Reveal as="h2" className="text-2xl font-bold sm:text-3xl">
                What is {service.name}?
              </Reveal>
              <Reveal>
                <p
                  id="service-answer"
                  className="mt-5 text-lg leading-relaxed text-muted"
                >
                  {extras.answer}
                </p>
              </Reveal>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Who it's for */}
      {extras?.idealFor.length ? (
        <section className="border-t border-border bg-surface py-16 sm:py-20">
          <Container>
            <Reveal as="h2" className="text-2xl font-bold sm:text-3xl">
              Is this for you?
            </Reveal>
            <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2">
              {extras.idealFor.map((item) => (
                <div
                  key={item}
                  data-reveal
                  className="card-surface flex items-start gap-3 rounded-2xl p-5"
                >
                  <Icon
                    name="check"
                    size={20}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <span className="text-text">{item}</span>
                </div>
              ))}
            </StaggerGroup>
          </Container>
        </section>
      ) : null}

      {/* Benefits */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal as="h2" className="text-2xl font-bold sm:text-3xl">
            What you get
          </Reveal>
          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2">
            {service.benefits.map((b) => (
              <div
                key={b.title}
                data-reveal
                className="card-surface rounded-2xl p-6"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface-2 text-accent">
                  <Icon name="check" size={20} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-text">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {b.description}
                </p>
              </div>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* Deliverables + tech */}
      <section className="border-y border-border bg-surface py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Reveal as="h2" className="text-2xl font-bold sm:text-3xl">
                What we deliver
              </Reveal>
              <StaggerGroup
                as="ul"
                className="mt-8 grid gap-3 sm:grid-cols-2"
                stagger={0.06}
              >
                {service.deliverables.map((d) => (
                  <li
                    key={d}
                    data-reveal
                    className="flex items-center gap-3 text-text"
                  >
                    <Icon
                      name="check"
                      size={18}
                      className="shrink-0 text-accent"
                    />
                    {d}
                  </li>
                ))}
              </StaggerGroup>
            </div>
            <div>
              <Reveal as="h2" className="text-2xl font-bold sm:text-3xl">
                Technologies we use
              </Reveal>
              <Reveal>
                <ul className="mt-8 flex flex-wrap gap-2.5">
                  {service.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border bg-bg px-4 py-2 text-sm font-medium text-text"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal as="h2" className="text-2xl font-bold sm:text-3xl">
            How we deliver
          </Reveal>
          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <div
                key={step.title}
                data-reveal
                className="card-surface rounded-2xl p-6"
              >
                <span className="font-display text-4xl font-bold text-accent/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-text">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* Selected work */}
      {work.length ? (
        <section className="border-t border-border bg-surface py-16 sm:py-20">
          <Container>
            <Reveal as="h2" className="text-2xl font-bold sm:text-3xl">
              Selected work
            </Reveal>
            <Reveal as="p" className="mt-3 max-w-2xl text-muted">
              A few of the products we've designed and built. See the live
              sites.
            </Reveal>
            <div className="mt-10">
              <PortfolioGrid items={work} />
            </div>
            <div className="mt-8">
              <ButtonLink href="/work" variant="secondary" icon="arrow-right">
                See all work
              </ButtonLink>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Why Arrowbin */}
      <WhyArrowbin />

      {/* Related guides (content cluster) */}
      {guides.length ? (
        <section className="border-t border-border bg-surface py-16 sm:py-20">
          <Container>
            <Reveal as="h2" className="text-2xl font-bold sm:text-3xl">
              Related guides
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/blog/${g.slug}`}
                  className="group card-surface spotlight flex flex-col overflow-hidden rounded-2xl transition-colors hover:border-brand"
                >
                  <Image
                    src={postThumbnail(g)}
                    alt={`${g.title} — article thumbnail`}
                    width={1200}
                    height={630}
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="aspect-[1200/630] w-full border-b border-border object-cover"
                  />
                  <div className="p-5">
                    <span className="text-xs font-medium text-accent">
                      {g.category}
                    </span>
                    <h3 className="mt-2 font-display text-base font-semibold text-text group-hover:text-accent">
                      {g.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="border-t border-border py-16 sm:py-20">
        <Container>
          <h2 className="text-center text-3xl font-bold">
            Frequently asked questions
          </h2>
          <div className="mt-10">
            <FAQ items={service.faqs} />
          </div>
        </Container>
      </section>

      {/* Related services */}
      <section className="border-t border-border bg-surface py-16 sm:py-20">
        <Container>
          <h2 className="text-2xl font-bold sm:text-3xl">Related services</h2>
          <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-3">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                data-reveal
                className="group card-surface spotlight flex items-center gap-3 rounded-2xl p-5 transition-colors hover:border-brand"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-accent">
                  <Icon name={s.icon} size={20} />
                </span>
                <span className="font-medium text-text group-hover:text-accent">
                  {s.name}
                </span>
              </Link>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <CTASection
        title={`Need ${service.name}?`}
        intro="Let's talk about your goals and how we can help. Free consultation, no pressure."
      />
    </>
  );
}
