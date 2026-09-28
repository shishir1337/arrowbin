import { SectionLabel } from "@/components/home/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import type { Service } from "@/lib/services";
import { serviceTheme } from "@/lib/serviceThemes";

/**
 * Delivery process as a connected timeline: a rail with a dot per step, and a
 * card under each. Horizontal on desktop, vertical on phones.
 */
export function ServiceProcess({
  service,
  index,
  label,
  durations,
}: {
  service: Service;
  index: number;
  label: string;
  /** Optional typical duration per step, shown as a chip. */
  durations?: string[];
}) {
  const t = serviceTheme(index);
  const accent = t.bg === "bg-white" ? serviceTheme(0) : t;

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <SectionReveal />
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="Process" />
            <h2
              className="display mt-5 text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              How we deliver
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-ink-2 sm:text-lg">
            Short sprints, a demo at the end of each one, and no surprises on
            scope or cost.
          </p>
        </div>

        <ol className="relative mt-14 grid gap-6 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
          {/* Rail */}
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[1.35rem] top-6 w-[3px] overflow-hidden rounded-full bg-ink/10 md:hidden xl:bottom-auto xl:left-6 xl:right-6 xl:top-[1.35rem] xl:block xl:h-[3px] xl:w-auto"
          >
            <span
              data-rail
              className={`absolute inset-0 rounded-full ${accent.bg}`}
            />
          </span>
          {service.process.map((step, i) => (
            <li
              key={step.title}
              data-rv={i}
              data-inview
              className="relative grid grid-cols-[auto_1fr] gap-5 md:grid-cols-1 md:gap-5 xl:gap-6"
            >
              <span
                className={`relative z-10 grid h-11 w-11 place-items-center rounded-full font-display text-base font-black ring-8 ring-white ${
                  i === 0
                    ? `${accent.bg} ${accent.text}`
                    : "iv-step bg-ink text-white"
                }`}
              >
                {i + 1}
              </span>
              <div className="rounded-[1.5rem] bg-frost p-6 transition-colors duration-500 hover:bg-lilac/60 sm:p-7">
                <p className="label flex flex-wrap items-center justify-between gap-2 text-ink-2">
                  Step {String(i + 1).padStart(2, "0")}
                  {durations?.[i] ? (
                    <span className="whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-ink">
                      {durations[i]}
                    </span>
                  ) : null}
                </p>
                <h3
                  className="mt-3 font-display text-[clamp(1.4rem,2vw,1.9rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] text-ink"
                  style={{ fontVariationSettings: '"wdth" 104' }}
                >
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-2">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
