import Link from "next/link";
import { ServiceArt } from "@/components/brand/ServiceArt";
import { SectionLabel } from "@/components/home/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { services } from "@/lib/services";
import { serviceTheme } from "@/lib/serviceThemes";

/** /about: everything one team covers, as eight colour tiles. */
export function AboutDisciplines({ label }: { label: string }) {
  return (
    <section className="relative bg-white py-20 sm:py-28">
      <SectionReveal />
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="What we do" />
            <h2
              className="display mt-5 max-w-[14ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              One team, eight disciplines
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-2 sm:text-lg">
            Design, engineering, infrastructure and support under one roof, so
            nothing gets lost between agencies and nobody hands your product
            off.
          </p>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {services.map((s, i) => {
            const t = serviceTheme(i);
            return (
              <li key={s.slug} data-rv={i}>
                <Link
                  href={`/services/${s.slug}`}
                  data-cursor="OPEN"
                  className={`group relative flex h-full min-h-44 flex-col justify-between gap-6 overflow-hidden rounded-[1.5rem] p-5 transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 sm:min-h-52 sm:p-6 ${t.bg} ${t.text} ${t.bg === "bg-white" ? "ring-1 ring-ink/10" : ""}`}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="label opacity-80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <ServiceArt
                      slug={s.slug}
                      fg={t.fg}
                      accent={t.accent}
                      className="h-12 w-12 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110 sm:h-16 sm:w-16"
                    />
                  </span>
                  <span
                    className="block font-display text-[clamp(1.05rem,1.7vw,1.6rem)] font-black uppercase leading-[0.95] tracking-[-0.02em]"
                    style={{ fontVariationSettings: '"wdth" 100' }}
                  >
                    {s.name}
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
