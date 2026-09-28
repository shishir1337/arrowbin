import Link from "next/link";
import { ServiceArt } from "@/components/brand/ServiceArt";
import { SectionLabel } from "@/components/home/SectionLabel";
import { services } from "@/lib/services";
import { serviceTheme } from "@/lib/serviceThemes";
import { ServiceIndexMotion } from "./ServiceIndexMotion";

/**
 * The service index: an editorial list of huge rows. On hover (or keyboard
 * focus) a row floods upward with its service colour, the name slides right
 * and the service artwork glides in. Phones show the artwork and a colour
 * bar by default, since there is no hover.
 */
export function ServiceIndex() {
  return (
    <section
      id="all-services"
      className="relative scroll-mt-24 pb-20 pt-16 sm:pb-28 sm:pt-20"
    >
      <ServiceIndexMotion />
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="01" title="The services" />
            <h2
              className="display mt-5 max-w-[16ch] text-[clamp(2.4rem,6vw,6rem)] text-ink"
              style={{ ["--wdth" as string]: 104 }}
            >
              Pick your starting point
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-ink-2 sm:text-lg">
            Every engagement can mix and match. Most products use three or four
            of these together, and we run them as one team.
          </p>
        </div>

        <ol className="mt-14 border-t-2 border-ink">
          {services.map((s, i) => {
            const t = serviceTheme(i);
            return (
              <li key={s.slug} className="svi-row border-b-2 border-ink">
                <Link
                  href={`/services/${s.slug}`}
                  data-cursor="OPEN"
                  className="group relative block overflow-hidden focus-visible:outline-offset-[-4px]"
                >
                  {/* Colour flood */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[650ms] ease-[var(--ease-smooth)] group-hover:scale-y-100 group-focus-visible:scale-y-100 ${t.bg}`}
                  />
                  {/* Mobile colour bar */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-4 left-0 w-1.5 rounded-full lg:hidden ${t.bg === "bg-white" ? "bg-ultra" : t.bg}`}
                  />
                  <div
                    className={`relative grid items-center gap-x-6 gap-y-3 py-7 pl-5 pr-2 text-ink transition-colors duration-500 lg:grid-cols-12 lg:py-9 lg:pl-2 ${t.hoverText}`}
                  >
                    <span className="label opacity-70 lg:col-span-1">
                      ({String(i + 1).padStart(2, "0")})
                    </span>
                    <h3
                      className="font-display text-[clamp(1.9rem,4.4vw,4.4rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] transition-transform duration-[650ms] ease-[var(--ease-out-expo)] group-hover:translate-x-3 lg:col-span-6"
                      style={{ fontVariationSettings: '"wdth" 108' }}
                    >
                      {s.name}
                    </h3>
                    <p className="max-w-md text-[0.95rem] leading-relaxed opacity-85 lg:col-span-3">
                      {s.summary}
                    </p>
                    <div className="flex items-center justify-between gap-4 lg:col-span-2 lg:justify-end">
                      <ServiceArt
                        slug={s.slug}
                        fg={t.bg === "bg-white" ? t.fg : "currentColor"}
                        accent={t.accent}
                        className="h-14 w-14 shrink-0 lg:hidden xl:block xl:absolute xl:right-24 xl:top-1/2 xl:h-24 xl:w-24 xl:-translate-y-1/2 xl:translate-x-10 xl:opacity-0 xl:transition-[opacity,translate] xl:duration-[650ms] xl:ease-[var(--ease-out-expo)] xl:group-hover:translate-x-0 xl:group-hover:opacity-100 xl:group-focus-visible:translate-x-0 xl:group-focus-visible:opacity-100"
                      />
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-current text-xl transition-transform duration-[650ms] ease-[var(--ease-out-expo)] group-hover:-rotate-45">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
