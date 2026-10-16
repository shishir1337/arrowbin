import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cta } from "@/components/home/Cta";
import { InnerMotion } from "@/components/motion/InnerMotion";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  CaseBeforeAfter,
  CaseBrief,
  CaseBuilt,
  CaseDraftNotice,
  CaseFindings,
  CaseHero,
  CaseNext,
  CaseQuote,
  CaseStats,
} from "@/components/work/CaseStudy";
import { getCaseStudy, visibleCaseStudies } from "@/lib/case-studies";
import { pageShare } from "@/lib/metadata";
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema";

type Params = { slug: string };

/**
 * Only approved case studies are built for production (drafts too in dev);
 * any other slug returns a real 404.
 */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return visibleCaseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.description,
    // Drafts are only ever seen in dev, but never let one be indexed.
    ...(cs.approved ? {} : { robots: { index: false, follow: false } }),
    ...pageShare({
      path: `/work/${cs.slug}`,
      title: `${cs.title} | Arrowbin`,
      description: cs.description,
      image: {
        url: cs.og,
        width: 1200,
        height: 630,
        alt: `${cs.client} website, built by Arrowbin`,
      },
    }),
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: cs.client, path: `/work/${cs.slug}` },
  ];
  const showDraft = !cs.approved;
  const hasQuote = Boolean(cs.quote && (cs.quote.approved || showDraft));
  const others = visibleCaseStudies.filter((c) => c.slug !== cs.slug);

  // Number the sections in the order they render.
  const order = [
    "stats",
    ...(cs.shots.beforeAfter ? ["beforeAfter"] : []),
    "brief",
    "built",
    "findings",
    ...(hasQuote ? ["quote"] : []),
    "cta",
  ];
  const n = (key: string) => String(order.indexOf(key) + 1).padStart(2, "0");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          caseStudySchema({
            slug: cs.slug,
            title: cs.title,
            description: cs.description,
            datePublished: cs.date,
            image: cs.og,
            client: cs.client,
            clientUrl: cs.url,
          }),
        ]}
      />
      <InnerMotion />
      {showDraft ? <CaseDraftNotice client={cs.client} /> : null}
      <CaseHero cs={cs} crumbs={crumbs} />
      <CaseStats cs={cs} label={n("stats")} />
      <CaseBeforeAfter cs={cs} label={n("beforeAfter")} />
      <CaseBrief cs={cs} label={n("brief")} />
      <CaseBuilt cs={cs} label={n("built")} />
      <CaseFindings cs={cs} label={n("findings")} />
      <CaseQuote cs={cs} label={n("quote")} showDraft={showDraft} />
      <CaseNext next={others[0]} />
      {/* No <Suspense>: it streamed the CTA as a hidden block after </main>. */}
      <Cta index={n("cta")} />
    </>
  );
}
