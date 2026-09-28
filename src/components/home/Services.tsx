import Link from "next/link";
import { ServiceArt } from "@/components/brand/ServiceArt";
import { services } from "@/lib/services";
import { SERVICE_THEMES } from "@/lib/serviceThemes";
import { ServicesMotion } from "./motion/ServicesMotion";
import { SectionLabel } from "./SectionLabel";

const THEMES = SERVICE_THEMES;

/**
 * Services: the section pins and eight colour panels travel sideways, each
 * settling upright as it arrives (its artwork is always fully in view).
 * Reduced motion gets a native swipe row instead.
 */
export function Services() {
  return (
    <div>
      <section
        id="services"
        className="relative flex min-h-[100svh] flex-col justify-center gap-8 overflow-clip py-20 sm:gap-10"
      >
        <ServicesMotion />
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-[var(--gutter)] md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="02" title="Services" />
            <h2
              className="display mt-5 text-[clamp(3rem,9vw,9.5rem)] text-ink"
              style={{ ["--wdth" as string]: 112 }}
            >
              What we <span className="text-ultra">build</span>
            </h2>
          </div>
          <div className="flex items-end gap-6 md:flex-col md:items-end">
            <p className="font-display text-5xl font-extrabold tabular-nums text-ink sm:text-6xl">
              <span className="svc-counter">01</span>
              <span className="text-ink/50">
                /{String(services.length).padStart(2, "0")}
              </span>
            </p>
            <Link
              href="/services"
              className="label inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-ink/20 px-4 py-2.5 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
            >
              All services →
            </Link>
          </div>
        </div>

        <div className="svc-track flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-2 sm:gap-6">
          {services.map((s, i) => {
            const t = THEMES[i % THEMES.length];
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                data-cursor="OPEN"
                className={`svc-panel group relative flex h-[62svh] max-h-[40rem] min-h-[26rem] w-[84vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[2rem] p-6 sm:w-[56vw] sm:p-8 lg:w-[34vw] ${t.bg} ${t.text} ${t.bg === "bg-white" ? "ring-1 ring-ink/10" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className="font-display text-[clamp(3rem,6vw,5.5rem)] font-black leading-none outline-text"
                    style={{ fontVariationSettings: '"wdth" 140' }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-current/30 text-xl transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-45">
                    →
                  </span>
                </div>
                <ServiceArt
                  slug={s.slug}
                  fg={t.fg}
                  accent={t.accent}
                  className="svc-art pointer-events-none absolute right-6 top-[22%] h-[40%] w-auto transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110 sm:right-8"
                />
                <div className="relative">
                  <h3
                    className="font-display text-[clamp(1.7rem,2.6vw,2.6rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em]"
                    style={{ fontVariationSettings: '"wdth" 108' }}
                  >
                    {s.name}
                  </h3>
                  <p
                    className={`mt-3 max-w-sm text-[0.95rem] leading-relaxed ${t.sub}`}
                  >
                    {s.summary}
                  </p>
                </div>
              </Link>
            );
          })}
          <div className="flex w-[70vw] shrink-0 flex-col items-start justify-center gap-6 pr-[var(--gutter)] sm:w-[40vw] lg:w-[26vw]">
            <p className="font-display text-[clamp(2rem,3.4vw,3.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-ink">
              Not sure where you fit?
            </p>
            <Link
              href="/contact"
              className="inline-flex h-13 items-center rounded-full bg-ink px-6 font-semibold text-white transition-colors hover:bg-ultra"
            >
              Tell us the problem
            </Link>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-ink/10">
            <span className="svc-bar block h-full origin-left scale-x-0 bg-ultra" />
          </div>
        </div>
      </section>
    </div>
  );
}
