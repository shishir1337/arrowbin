import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Cta } from "@/components/home/Cta";
import { Faq } from "@/components/home/Faq";
import { InnerMotion } from "@/components/motion/InnerMotion";
import { GroundedChat } from "@/components/services/ai/GroundedChat";
import { RoiCalculator } from "@/components/services/ai/RoiCalculator";
import { AutoscaleLive } from "@/components/services/cloud/AutoscaleLive";
import { ArchitectureStack } from "@/components/services/custom/ArchitectureStack";
import { BuildGallery } from "@/components/services/custom/BuildGallery";
import { BuildVsBuy } from "@/components/services/custom/BuildVsBuy";
import { Engagement } from "@/components/services/Engagement";
import { PaymentsDelivery } from "@/components/services/ecommerce/PaymentsDelivery";
import { PlatformPicker } from "@/components/services/ecommerce/PlatformPicker";
import { StoreAnatomy } from "@/components/services/ecommerce/StoreAnatomy";
import { HealthReport } from "@/components/services/maintenance/HealthReport";
import { IncidentPlans } from "@/components/services/maintenance/IncidentPlans";
import { DeviceFeatures } from "@/components/services/mobile/DeviceFeatures";
import { LaunchKit } from "@/components/services/mobile/LaunchKit";
import { ServiceDeliver } from "@/components/services/ServiceDeliver";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceHosting } from "@/components/services/ServiceHosting";
import { ServiceProcess } from "@/components/services/ServiceProcess";
import { ServiceGuides, ServiceWork } from "@/components/services/ServiceProof";
import { ServiceRelated } from "@/components/services/ServiceRelated";
import { ServiceValue } from "@/components/services/ServiceValue";
import { MvpScoper } from "@/components/services/saas/MvpScoper";
import { SaasPlumbing } from "@/components/services/saas/SaasPlumbing";
import { ServiceSignature } from "@/components/services/signature/ServiceSignature";
import { TokenPlayground } from "@/components/services/uiux/TokenPlayground";
import { UxAudit } from "@/components/services/uiux/UxAudit";
import { JsonLd } from "@/components/ui/JsonLd";
import { getPost } from "@/lib/blog";
import { getBlurDataURL } from "@/lib/blur";
import { projects } from "@/lib/portfolio";
import {
  breadcrumbSchema,
  faqSchema,
  processSchema,
  serviceSchema,
} from "@/lib/schema";
import { getService, getServiceExtras, services } from "@/lib/services";
import { pageAlternates } from "@/lib/site";

type Params = { slug: string };

/**
 * The one service where the Hostinger partnership is on-topic. Asserted against the
 * real slug list below, so renaming the service fails the build instead of silently
 * dropping the partner block.
 */
const HOSTING_SLUG = "cloud-devops-hosting";

if (!services.some((s) => s.slug === HOSTING_SLUG)) {
  throw new Error(
    `HOSTING_SLUG "${HOSTING_SLUG}" no longer matches a service — update it in ${"services/[slug]/page.tsx"}.`,
  );
}

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
  const index = services.findIndex((s) => s.slug === service.slug);
  const extras = getServiceExtras(service.slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path },
  ];
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

      <InnerMotion />
      <ServiceHero
        service={service}
        index={index}
        total={services.length}
        crumbs={crumbs}
      />

      <ServiceValue service={service} extras={extras} index={index} />
      {service.slug === "custom-software-development" ? (
        /* Bespoke page body for Custom Software */
        <>
          <Suspense fallback={null}>
            <ServiceSignature slug={service.slug} label={n(2)} />
          </Suspense>
          <BuildGallery label={n(3)} />
          <ArchitectureStack label={n(4)} />
          <ServiceProcess
            service={service}
            index={index}
            label={n(5)}
            durations={["1–2 weeks", "1–2 weeks", "2-week sprints", "Ongoing"]}
          />
          <BuildVsBuy label={n(6)} />
          <ServiceWork work={work} label={n(7)} />
          <Engagement label={n(8)} />
          <ServiceGuides guides={guides} label={n(9)} />
          <Suspense fallback={null}>
            <Faq items={service.faqs} index={n(10)} />
          </Suspense>
          <ServiceRelated slug={service.slug} label={n(11)} />
          <Suspense fallback={null}>
            <Cta index={n(12)} />
          </Suspense>
        </>
      ) : service.slug === "ecommerce-development" ? (
        /* Bespoke page body for E-commerce */
        <>
          <Suspense fallback={null}>
            <ServiceSignature slug={service.slug} label={n(2)} />
          </Suspense>
          <Suspense fallback={null}>
            <StoreAnatomy label={n(3)} />
          </Suspense>
          <PlatformPicker label={n(4)} />
          <PaymentsDelivery label={n(5)} />
          <ServiceProcess
            service={service}
            index={index}
            label={n(6)}
            durations={["1 week", "2–3 weeks", "3–6 weeks", "Ongoing"]}
          />
          <ServiceWork work={work} label={n(7)} />
          <Engagement label={n(8)} />
          <ServiceGuides guides={guides} label={n(9)} />
          <Suspense fallback={null}>
            <Faq items={service.faqs} index={n(10)} />
          </Suspense>
          <ServiceRelated slug={service.slug} label={n(11)} />
          <Suspense fallback={null}>
            <Cta index={n(12)} />
          </Suspense>
        </>
      ) : service.slug === "mobile-app-development" ? (
        /* Bespoke page body for Mobile Apps */
        <>
          <Suspense fallback={null}>
            <ServiceSignature slug={service.slug} label={n(2)} />
          </Suspense>
          <DeviceFeatures label={n(3)} />
          <LaunchKit label={n(4)} />
          <ServiceProcess
            service={service}
            index={index}
            label={n(5)}
            durations={["1–2 weeks", "2–3 weeks", "6–10 weeks", "Ongoing"]}
          />
          <ServiceWork
            work={work}
            label={n(6)}
            title="Mobile-first products we've built"
          />
          <Engagement label={n(7)} />
          <ServiceGuides guides={guides} label={n(8)} />
          <Suspense fallback={null}>
            <Faq items={service.faqs} index={n(9)} />
          </Suspense>
          <ServiceRelated slug={service.slug} label={n(10)} />
          <Suspense fallback={null}>
            <Cta index={n(11)} />
          </Suspense>
        </>
      ) : service.slug === "saas-product-engineering" ? (
        /* Bespoke page body for SaaS */
        <>
          <Suspense fallback={null}>
            <ServiceSignature slug={service.slug} label={n(2)} />
          </Suspense>
          <SaasPlumbing label={n(3)} />
          <MvpScoper label={n(4)} />
          <ServiceProcess
            service={service}
            index={index}
            label={n(5)}
            durations={["1–2 weeks", "8–14 weeks", "4–8 weeks", "Ongoing"]}
          />
          <ServiceWork
            work={work}
            label={n(6)}
            title="Products we've taken to market"
          />
          <Engagement label={n(7)} />
          <ServiceGuides guides={guides} label={n(8)} />
          <Suspense fallback={null}>
            <Faq items={service.faqs} index={n(9)} />
          </Suspense>
          <ServiceRelated slug={service.slug} label={n(10)} />
          <Suspense fallback={null}>
            <Cta index={n(11)} />
          </Suspense>
        </>
      ) : service.slug === "ui-ux-design" ? (
        /* Bespoke page body for UI/UX Design */
        <>
          <Suspense fallback={null}>
            <ServiceSignature slug={service.slug} label={n(2)} />
          </Suspense>
          <UxAudit label={n(3)} />
          <TokenPlayground label={n(4)} />
          <ServiceProcess
            service={service}
            index={index}
            label={n(5)}
            durations={["1–2 weeks", "1–2 weeks", "2–4 weeks", "1 week"]}
          />
          <ServiceWork
            work={work}
            label={n(6)}
            title="Interfaces we've designed"
          />
          <Engagement label={n(7)} />
          <ServiceGuides guides={guides} label={n(8)} />
          <Suspense fallback={null}>
            <Faq items={service.faqs} index={n(9)} />
          </Suspense>
          <ServiceRelated slug={service.slug} label={n(10)} />
          <Suspense fallback={null}>
            <Cta index={n(11)} />
          </Suspense>
        </>
      ) : service.slug === "ai-automation" ? (
        /* Bespoke page body for AI Automation */
        <>
          <Suspense fallback={null}>
            <ServiceSignature slug={service.slug} label={n(2)} />
          </Suspense>
          <GroundedChat label={n(3)} />
          <RoiCalculator label={n(4)} />
          <ServiceProcess
            service={service}
            index={index}
            label={n(5)}
            durations={["1 week", "2–3 weeks", "3–6 weeks", "Ongoing"]}
          />
          <ServiceWork
            work={work}
            label={n(6)}
            title="Products we've built and automated"
          />
          <Engagement label={n(7)} />
          <ServiceGuides guides={guides} label={n(8)} />
          <Suspense fallback={null}>
            <Faq items={service.faqs} index={n(9)} />
          </Suspense>
          <ServiceRelated slug={service.slug} label={n(10)} />
          <Suspense fallback={null}>
            <Cta index={n(11)} />
          </Suspense>
        </>
      ) : service.slug === HOSTING_SLUG ? (
        /* Bespoke page body for Cloud, DevOps & Hosting */
        <>
          <Suspense fallback={null}>
            <ServiceSignature slug={service.slug} label={n(2)} />
          </Suspense>
          <AutoscaleLive label={n(3)} />
          {/* Hostinger partnership: only here, where hosting is the topic. */}
          <ServiceHosting label={n(4)} />
          <ServiceProcess
            service={service}
            index={index}
            label={n(5)}
            durations={["1 week", "1–2 weeks", "2–4 weeks", "Ongoing"]}
          />
          <ServiceWork
            work={work}
            label={n(6)}
            title="Products we keep online"
          />
          <Engagement label={n(7)} />
          <ServiceGuides guides={guides} label={n(8)} />
          <Suspense fallback={null}>
            <Faq items={service.faqs} index={n(9)} />
          </Suspense>
          <ServiceRelated slug={service.slug} label={n(10)} />
          <Suspense fallback={null}>
            <Cta index={n(11)} />
          </Suspense>
        </>
      ) : service.slug === "maintenance-support" ? (
        /* Bespoke page body for Maintenance & Support */
        <>
          <Suspense fallback={null}>
            <ServiceSignature slug={service.slug} label={n(2)} />
          </Suspense>
          <IncidentPlans label={n(3)} />
          <HealthReport label={n(4)} />
          <ServiceProcess
            service={service}
            index={index}
            label={n(5)}
            durations={["1 week", "2–4 weeks", "Monthly", "Ongoing"]}
          />
          <ServiceWork
            work={work}
            label={n(6)}
            title="Products we look after"
          />
          <Engagement label={n(7)} />
          <ServiceGuides guides={guides} label={n(8)} />
          <Suspense fallback={null}>
            <Faq items={service.faqs} index={n(9)} />
          </Suspense>
          <ServiceRelated slug={service.slug} label={n(10)} />
          <Suspense fallback={null}>
            <Cta index={n(11)} />
          </Suspense>
        </>
      ) : (
        <>
          <Suspense fallback={null}>
            <ServiceSignature slug={service.slug} label={n(2)} />
          </Suspense>
          <ServiceDeliver service={service} index={index} label={n(3)} />
          {/* Hostinger partnership: only on the hosting service, where it is the topic. */}
          {service.slug === HOSTING_SLUG ? <ServiceHosting /> : null}
          <ServiceProcess service={service} index={index} label={n(4)} />
          <ServiceWork work={work} label={n(5)} />
          <Engagement label={n(6)} />
          <ServiceGuides guides={guides} label={n(7)} />
          <Suspense fallback={null}>
            <Faq items={service.faqs} index={n(8)} />
          </Suspense>
          <ServiceRelated slug={service.slug} label={n(9)} />
          <Suspense fallback={null}>
            <Cta index={n(10)} />
          </Suspense>
        </>
      )}
    </>
  );
}
