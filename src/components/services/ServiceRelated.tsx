import Link from "next/link";
import { ServiceArt } from "@/components/brand/ServiceArt";
import { SectionLabel } from "@/components/home/SectionLabel";
import { services } from "@/lib/services";
import { serviceTheme } from "@/lib/serviceThemes";

/** Services that genuinely go together with each one (not just "the next 3"). */
const PAIRS: Record<string, string[]> = {
  "custom-software-development": [
    "ui-ux-design",
    "cloud-devops-hosting",
    "ai-automation",
  ],
  "ecommerce-development": [
    "ui-ux-design",
    "maintenance-support",
    "cloud-devops-hosting",
  ],
  "mobile-app-development": [
    "ui-ux-design",
    "saas-product-engineering",
    "maintenance-support",
  ],
  "saas-product-engineering": [
    "cloud-devops-hosting",
    "ui-ux-design",
    "ai-automation",
  ],
  "ui-ux-design": [
    "custom-software-development",
    "mobile-app-development",
    "ecommerce-development",
  ],
  "ai-automation": [
    "custom-software-development",
    "saas-product-engineering",
    "cloud-devops-hosting",
  ],
  "cloud-devops-hosting": [
    "maintenance-support",
    "saas-product-engineering",
    "custom-software-development",
  ],
  "maintenance-support": [
    "cloud-devops-hosting",
    "ecommerce-development",
    "custom-software-development",
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
    .map((s) => services.findIndex((x) => x.slug === s))
    .filter((i) => i >= 0);

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
          {picks.map((i) => {
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
                      {s.summary}
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
