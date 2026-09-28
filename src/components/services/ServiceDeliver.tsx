import { ServiceArt } from "@/components/brand/ServiceArt";
import { SectionLabel } from "@/components/home/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import type { Service } from "@/lib/services";
import { serviceTheme } from "@/lib/serviceThemes";

/**
 * Deliverables as an editorial numbered list, beside a sticky dark card with
 * the stack we use for this service.
 */
export function ServiceDeliver({
  service,
  index,
  label,
}: {
  service: Service;
  index: number;
  label: string;
}) {
  const t = serviceTheme(index);
  const accent = t.bg === "bg-white" ? serviceTheme(0) : t;

  return (
    <section className="relative py-20 sm:py-28">
      <SectionReveal />
      <div className="mx-auto grid w-full max-w-[1600px] gap-14 px-[var(--gutter)] lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionLabel index={label} title="Deliverables" />
          <h2
            className="display mt-5 text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
            style={{ ["--wdth" as string]: 100 }}
          >
            What we deliver
          </h2>
          <ol className="mt-10 border-t-2 border-ink">
            {service.deliverables.map((d, i) => (
              <li
                key={d}
                data-rv={i}
                className="group flex items-center gap-6 border-b-2 border-ink/10 py-5 transition-colors duration-500 hover:border-ink sm:py-6"
              >
                <span className="label w-8 shrink-0 text-ink-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-display text-[clamp(1.3rem,2.4vw,2.2rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] text-ink transition-transform duration-[650ms] ease-[var(--ease-out-expo)] group-hover:translate-x-2"
                  style={{ fontVariationSettings: '"wdth" 104' }}
                >
                  {d}
                </span>
                <span
                  aria-hidden="true"
                  className={`ml-auto h-3 w-3 shrink-0 scale-0 rounded-full transition-transform duration-500 group-hover:scale-100 ${accent.bg}`}
                />
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div
              data-rv
              className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-white sm:p-10"
            >
              <ServiceArt
                slug={service.slug}
                fg="rgba(255,255,255,0.14)"
                accent="rgba(255,255,255,0.22)"
                className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56"
              />
              <p className="label relative text-sun">Stack we reach for</p>
              <h3
                className="relative mt-4 font-display text-[clamp(1.8rem,2.6vw,2.6rem)] font-black uppercase leading-[0.92] tracking-[-0.03em]"
                style={{ fontVariationSettings: '"wdth" 106' }}
              >
                Proven tools, picked for the job
              </h3>
              <p className="relative mt-4 max-w-sm text-white/75">
                We choose the stack for your product, not our habits, and keep
                it boring where it should be.
              </p>
              <ul className="relative mt-8 flex flex-wrap gap-2">
                {service.tech.map((x) => (
                  <li
                    key={x}
                    className="rounded-full bg-white/10 px-4 py-2 font-mono text-sm font-semibold text-white ring-1 ring-white/15 transition-colors duration-300 hover:bg-white hover:text-ink"
                  >
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
