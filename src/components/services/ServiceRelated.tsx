import Link from "next/link";
import { ServiceArt } from "@/components/brand/ServiceArt";
import { SectionLabel } from "@/components/home/SectionLabel";
import { services } from "@/lib/services";
import { serviceTheme } from "@/lib/serviceThemes";

/**
 * Services that genuinely go together with each one (not just "the next 3"),
 * each with a line on why it pairs with this page's service. The line replaces
 * the generic summary on the card, so the same summary is not repeated on
 * several service pages (audit finding M-8).
 */
const PAIRS: Record<string, { slug: string; why: string }[]> = {
  "custom-software-development": [
    {
      slug: "ui-ux-design",
      why: "We design the screens and flows first, so the build matches how your team works day to day.",
    },
    {
      slug: "cloud-devops-hosting",
      why: "Automated deploys and monitoring for the system, in place before your team starts relying on it.",
    },
    {
      slug: "ai-automation",
      why: "Add AI to the workflows the system already runs, like reading documents or sorting requests.",
    },
  ],
  "ecommerce-development": [
    {
      slug: "ui-ux-design",
      why: "Product pages and checkout designed and tested with shoppers before they go into the build.",
    },
    {
      slug: "maintenance-support",
      why: "Monitoring and fixes after launch, so checkout keeps working on your busiest sale days.",
    },
    {
      slug: "cloud-devops-hosting",
      why: "Hosting that adds servers when a sale brings a traffic spike and scales back down after it.",
    },
  ],
  "mobile-app-development": [
    {
      slug: "ui-ux-design",
      why: "Flows and screens prototyped and tested with users before any app code gets written.",
    },
    {
      slug: "saas-product-engineering",
      why: "When the app is the front end of a subscription product, with accounts and billing behind it.",
    },
    {
      slug: "maintenance-support",
      why: "New OS versions and store policy changes handled for you after the app launches.",
    },
  ],
  "saas-product-engineering": [
    {
      slug: "cloud-devops-hosting",
      why: "Deploy pipelines and monitoring that keep up as your accounts and traffic grow.",
    },
    {
      slug: "ui-ux-design",
      why: "Onboarding and core screens designed so trial users reach the point where they'd pay.",
    },
    {
      slug: "ai-automation",
      why: "AI features inside your product, such as assistants that answer from each customer's own data.",
    },
  ],
  "ui-ux-design": [
    {
      slug: "custom-software-development",
      why: "We build what we design: internal tools and web platforms, made by the team that drew the screens.",
    },
    {
      slug: "mobile-app-development",
      why: "The designs become iOS and Android apps, built by the same team that drew them.",
    },
    {
      slug: "ecommerce-development",
      why: "Store designs built into a fast storefront, with payments and delivery wired in.",
    },
  ],
  "ai-automation": [
    {
      slug: "custom-software-development",
      why: "When the automation needs a proper app around it, with dashboards and links to your other systems.",
    },
    {
      slug: "saas-product-engineering",
      why: "Turn an AI workflow that works for your business into a product other businesses pay for.",
    },
    {
      slug: "cloud-devops-hosting",
      why: "Hosting and monitoring for AI workloads, including private setups when data must stay in-house.",
    },
  ],
  "cloud-devops-hosting": [
    {
      slug: "maintenance-support",
      why: "Once the setup is in place, a monthly plan keeps it patched and watched.",
    },
    {
      slug: "saas-product-engineering",
      why: "For SaaS teams: billing and new features built on the infrastructure we set up.",
    },
    {
      slug: "custom-software-development",
      why: "When the app on top needs work as well, from new features to a rebuild of an old system.",
    },
  ],
  "maintenance-support": [
    {
      slug: "cloud-devops-hosting",
      why: "Move fragile hosting to automated deploys and monitoring before it fails on a busy day.",
    },
    {
      slug: "ecommerce-development",
      why: "For stores: checkout and courier links looked after by the people who build them.",
    },
    {
      slug: "custom-software-development",
      why: "When upkeep is no longer enough and part of the system needs rebuilding or replacing.",
    },
  ],
};

/** "Pairs well with": three related services as colour cards with their art. */
export function ServiceRelated({
  slug,
  label,
}: {
  slug: string;
  label: string;
}) {
  const picks = (PAIRS[slug] ?? [])
    .map((p) => ({
      i: services.findIndex((x) => x.slug === p.slug),
      why: p.why,
    }))
    .filter((p) => p.i >= 0);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <SectionLabel index={label} title="Pairs well with" />
        <h2
          className="display mt-5 text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
          style={{ ["--wdth" as string]: 100 }}
        >
          Often combined with
        </h2>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {picks.map(({ i, why }) => {
            const s = services[i];
            const t = serviceTheme(i);
            return (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  data-cursor="OPEN"
                  data-tilt="5"
                  className={`group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-[1.75rem] p-7 transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 sm:p-8 ${t.bg} ${t.text} ${t.bg === "bg-white" ? "ring-1 ring-ink/10" : ""}`}
                >
                  <ServiceArt
                    slug={s.slug}
                    fg={t.fg}
                    accent={t.accent}
                    className="absolute right-6 top-6 h-20 w-20 transition-transform sm:h-24 sm:w-24 duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110"
                  />
                  <span className="label relative opacity-80">
                    Service {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative">
                    <span
                      className="block font-display text-[clamp(1.5rem,2.2vw,2.1rem)] font-black uppercase leading-[0.92] tracking-[-0.03em]"
                      style={{ fontVariationSettings: '"wdth" 104' }}
                    >
                      {s.name}
                    </span>
                    <span
                      className={`mt-3 block text-[0.95rem] leading-relaxed ${t.sub}`}
                    >
                      {why}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
