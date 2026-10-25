import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cta } from "@/components/home/Cta";
import { Faq } from "@/components/home/Faq";
import { InnerMotion } from "@/components/motion/InnerMotion";
import { ArchitectureStack } from "@/components/services/custom/ArchitectureStack";
import { BuildGallery } from "@/components/services/custom/BuildGallery";
import { BuildVsBuy } from "@/components/services/custom/BuildVsBuy";
import { Engagement } from "@/components/services/Engagement";
import { PaymentsDelivery } from "@/components/services/ecommerce/PaymentsDelivery";
import { PlatformPicker } from "@/components/services/ecommerce/PlatformPicker";
import { HealthReport } from "@/components/services/maintenance/HealthReport";
import { DeviceFeatures } from "@/components/services/mobile/DeviceFeatures";
import { LaunchKit } from "@/components/services/mobile/LaunchKit";
import { ServiceDeliver } from "@/components/services/ServiceDeliver";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceHosting } from "@/components/services/ServiceHosting";
import { ServiceProcess } from "@/components/services/ServiceProcess";
import { ServiceGuides, ServiceWork } from "@/components/services/ServiceProof";
import { ServiceRelated } from "@/components/services/ServiceRelated";
import { ServiceValue } from "@/components/services/ServiceValue";
import { SaasPlumbing } from "@/components/services/saas/SaasPlumbing";
// Per-slug client demos (next/dynamic): each page ships only the ones it renders.
import {
  AutoscaleLive,
  GroundedChat,
  IncidentPlans,
  MvpScoper,
  RoiCalculator,
  StoreAnatomy,
  TokenPlayground,
  UxAudit,
} from "@/components/services/signature/demos";
import { ServiceSignature } from "@/components/services/signature/ServiceSignature";
import { JsonLd } from "@/components/ui/JsonLd";
import { getPost } from "@/lib/blog";
import { getBlurDataURL } from "@/lib/blur";
import { pageShare } from "@/lib/metadata";
import { projects } from "@/lib/portfolio";
import {
  breadcrumbSchema,
  faqSchema,
  processSchema,
  serviceSchema,
} from "@/lib/schema";
import { getService, getServiceExtras, services } from "@/lib/services";

type Params = { slug: string };

/**
 * The one service where the Hostinger partnership is on-topic. Asserted against the
 * real slug list below, so renaming the service fails the build instead of silently
 * dropping the partner block.
 */
const HOSTING_SLUG = "cloud-devops-hosting";

if (!services.some((s) => s.slug === HOSTING_SLUG)) {
  throw new Error(
    `HOSTING_SLUG "${HOSTING_SLUG}" no longer matches a service. Update it in ${"services/[slug]/page.tsx"}.`,
  );
}

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

// Only the slugs above exist: any other /services/<slug> is a real 404 that
// renders the root not-found page (with <html lang="en">).
export const dynamicParams = false;

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
    ...pageShare({
      path,
      title: `${service.metaTitle} | Arrowbin`,
      description: service.metaDescription,
      // The card drawn by ./opengraph-image.tsx (wordmark, "Service", heading).
      image: {
        url: `/services/${service.slug}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `Arrowbin service: ${service.heading}`,
      },
    }),
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
  const index = services.findIndex((s) => s.slug === service.slug);
  const extras = getServiceExtras(service.slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path },
  ];
  // Every portfolio project is a website or store. Where that is not the
  // service's own kind of work, the ServiceWork title below says so (audit
  // H-5): no heading may promise app, SaaS, AI or hosting proof we can't show.
  const work = await Promise.all(
    (extras?.relatedWork ?? [])
      .map((name) => projects.find((p) => p.name === name))
      .filter((p): p is (typeof projects)[number] => Boolean(p))
      .map(async (p) => ({ ...p, blur: await getBlurDataURL(p.image) })),
  );
  // Section numbers run in page order; the signature is section 02.
  const n = (k: number) => String(k).padStart(2, "0");
  const guides = (extras?.relatedPosts ?? [])
    .map((s) => getPost(s))
    .filter((p): p is NonNullable<ReturnType<typeof getPost>> => Boolean(p));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          // Named after the H1 (`heading`), so markup and page use one label.
          // No `deliverables`: the bespoke page bodies no longer print that
          // list, and an OfferCatalog must match what the page shows.
          serviceSchema({
            name: service.heading,
            description: service.metaDescription,
            path,
            audience: extras?.idealFor,
            hasAnswer: Boolean(extras?.answer),
          }),
          processSchema({
            name: `How Arrowbin delivers ${service.heading}`,
            path,
            steps: service.process,
          }),
          faqSchema(service.faqs),
        ]}
      />

      <InnerMotion />
      <ServiceHero
        service={service}
        index={index}
        total={services.length}
        crumbs={crumbs}
        form={extras?.copy.form}
      />

      <ServiceValue service={service} extras={extras} index={index} />
      {/* No <Suspense> wrappers below: they only split hydration, and made the
          prerender stream sections as hidden blocks after </main>. */}
      {service.slug === "custom-software-development" ? (
        /* Bespoke page body for Custom Software */
        <>
          <ServiceSignature slug={service.slug} label={n(2)} />
          <BuildGallery label={n(3)} />
          <ArchitectureStack label={n(4)} />
          <ServiceProcess
            service={service}
            index={index}
            label={n(5)}
            durations={["1–2 weeks", "1–2 weeks", "2-week sprints", "Ongoing"]}
            note={extras?.copy.process}
          />
          <BuildVsBuy label={n(6)} />
          <ServiceWork work={work} label={n(7)} />
          <Engagement label={n(8)} copy={extras?.copy.engagement} />
          <ServiceGuides guides={guides} label={n(9)} />
          <Faq items={service.faqs} index={n(10)} />
          <ServiceRelated slug={service.slug} label={n(11)} />
          <Cta index={n(12)} text={extras?.copy.cta} />
        </>
      ) : service.slug === "ecommerce-development" ? (
        /* Bespoke page body for E-commerce */
        <>
          <ServiceSignature slug={service.slug} label={n(2)} />
          <StoreAnatomy label={n(3)} />
          <PlatformPicker label={n(4)} />
          <PaymentsDelivery label={n(5)} />
          <ServiceProcess
            service={service}
            index={index}
            label={n(6)}
            durations={["1 week", "2–3 weeks", "3–6 weeks", "Ongoing"]}
            note={extras?.copy.process}
          />
          <ServiceWork work={work} label={n(7)} />
          <Engagement label={n(8)} copy={extras?.copy.engagement} />
          <ServiceGuides guides={guides} label={n(9)} />
          <Faq items={service.faqs} index={n(10)} />
          <ServiceRelated slug={service.slug} label={n(11)} />
          <Cta index={n(12)} text={extras?.copy.cta} />
        </>
      ) : service.slug === "mobile-app-development" ? (
        /* Bespoke page body for Mobile Apps */
        <>
          <ServiceSignature slug={service.slug} label={n(2)} />
          <DeviceFeatures label={n(3)} />
          <LaunchKit label={n(4)} />
          <ServiceProcess
            service={service}
            index={index}
            label={n(5)}
            durations={["1–2 weeks", "2–3 weeks", "6–10 weeks", "Ongoing"]}
            note={extras?.copy.process}
          />
          <ServiceWork
            work={work}
            label={n(6)}
            title="Related web builds, live today"
          />
          <Engagement label={n(7)} copy={extras?.copy.engagement} />
          <ServiceGuides guides={guides} label={n(8)} />
          <Faq items={service.faqs} index={n(9)} />
          <ServiceRelated slug={service.slug} label={n(10)} />
          <Cta index={n(11)} text={extras?.copy.cta} />
        </>
      ) : service.slug === "saas-product-engineering" ? (
        /* Bespoke page body for SaaS */
        <>
          <ServiceSignature slug={service.slug} label={n(2)} />
          <SaasPlumbing label={n(3)} />
          <MvpScoper label={n(4)} />
          <ServiceProcess
            service={service}
            index={index}
            label={n(5)}
            durations={["1–2 weeks", "8–14 weeks", "4–8 weeks", "Ongoing"]}
            note={extras?.copy.process}
          />
          <ServiceWork
            work={work}
            label={n(6)}
            title="Web platforms we've shipped"
          />
          <Engagement label={n(7)} copy={extras?.copy.engagement} />
          <ServiceGuides guides={guides} label={n(8)} />
          <Faq items={service.faqs} index={n(9)} />
          <ServiceRelated slug={service.slug} label={n(10)} />
          <Cta index={n(11)} text={extras?.copy.cta} />
        </>
      ) : service.slug === "ui-ux-design" ? (
        /* Bespoke page body for UI/UX Design */
        <>
          <ServiceSignature slug={service.slug} label={n(2)} />
          <UxAudit label={n(3)} />
          <TokenPlayground label={n(4)} />
          <ServiceProcess
            service={service}
            index={index}
            label={n(5)}
            durations={["1–2 weeks", "1–2 weeks", "2–4 weeks", "1 week"]}
            note={extras?.copy.process}
          />
          <ServiceWork
            work={work}
            label={n(6)}
            title="Web interfaces we've built"
          />
          <Engagement label={n(7)} copy={extras?.copy.engagement} />
          <ServiceGuides guides={guides} label={n(8)} />
          <Faq items={service.faqs} index={n(9)} />
          <ServiceRelated slug={service.slug} label={n(10)} />
          <Cta index={n(11)} text={extras?.copy.cta} />
        </>
      ) : service.slug === "ai-automation" ? (
        /* Bespoke page body for AI Automation */
        <>
          <ServiceSignature slug={service.slug} label={n(2)} />
          <GroundedChat label={n(3)} />
          <RoiCalculator label={n(4)} />
          <ServiceProcess
            service={service}
            index={index}
            label={n(5)}
            durations={["1 week", "2–3 weeks", "3–6 weeks", "Ongoing"]}
            note={extras?.copy.process}
          />
          <ServiceWork
            work={work}
            label={n(6)}
            title="Websites and stores by the same team"
          />
          <Engagement label={n(7)} copy={extras?.copy.engagement} />
          <ServiceGuides guides={guides} label={n(8)} />
          <Faq items={service.faqs} index={n(9)} />
          <ServiceRelated slug={service.slug} label={n(10)} />
          <Cta index={n(11)} text={extras?.copy.cta} />
        </>
      ) : service.slug === HOSTING_SLUG ? (
        /* Bespoke page body for Cloud, DevOps & Hosting */
        <>
          <ServiceSignature slug={service.slug} label={n(2)} />
          <AutoscaleLive label={n(3)} />
          {/* Hostinger partnership: only here, where hosting is the topic. */}
          <ServiceHosting label={n(4)} />
          <ServiceProcess
            service={service}
            index={index}
            label={n(5)}
            durations={["1 week", "1–2 weeks", "2–4 weeks", "Ongoing"]}
            note={extras?.copy.process}
          />
          <ServiceWork
            work={work}
            label={n(6)}
            title="Web builds we've shipped"
          />
          <Engagement label={n(7)} copy={extras?.copy.engagement} />
          <ServiceGuides guides={guides} label={n(8)} />
          <Faq items={service.faqs} index={n(9)} />
          <ServiceRelated slug={service.slug} label={n(10)} />
          <Cta index={n(11)} text={extras?.copy.cta} />
        </>
      ) : service.slug === "maintenance-support" ? (
        /* Bespoke page body for Maintenance & Support */
        <>
          <ServiceSignature slug={service.slug} label={n(2)} />
          <IncidentPlans label={n(3)} />
          <HealthReport label={n(4)} />
          <ServiceProcess
            service={service}
            index={index}
            label={n(5)}
            durations={["1 week", "2–4 weeks", "Monthly", "Ongoing"]}
            note={extras?.copy.process}
          />
          <ServiceWork work={work} label={n(6)} title="Websites we've built" />
          <Engagement label={n(7)} copy={extras?.copy.engagement} />
          <ServiceGuides guides={guides} label={n(8)} />
          <Faq items={service.faqs} index={n(9)} />
          <ServiceRelated slug={service.slug} label={n(10)} />
          <Cta index={n(11)} text={extras?.copy.cta} />
        </>
      ) : (
        <>
          <ServiceSignature slug={service.slug} label={n(2)} />
          <ServiceDeliver service={service} index={index} label={n(3)} />
          {/* Hostinger partnership: only on the hosting service, where it is the topic. */}
          {service.slug === HOSTING_SLUG ? <ServiceHosting /> : null}
          <ServiceProcess
            service={service}
            index={index}
            label={n(4)}
            note={extras?.copy.process}
          />
          <ServiceWork work={work} label={n(5)} />
          <Engagement label={n(6)} copy={extras?.copy.engagement} />
          <ServiceGuides guides={guides} label={n(7)} />
          <Faq items={service.faqs} index={n(8)} />
          <ServiceRelated slug={service.slug} label={n(9)} />
          <Cta index={n(10)} text={extras?.copy.cta} />
        </>
      )}
    </>
  );
}
