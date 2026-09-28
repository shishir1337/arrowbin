import { SectionLabel } from "@/components/home/SectionLabel";
import type { Service, ServiceExtras } from "@/lib/services";
import { serviceTheme } from "@/lib/serviceThemes";

/**
 * "What you get": the answer-first definition (AEO), the three outcome stats,
 * who it's for, and the four benefits, all tinted with the service's colour.
 * Target of the hero's "See what you get" link (#what-you-get).
 */
export function ServiceValue({
  service,
  extras,
  index,
}: {
  service: Service;
  extras?: ServiceExtras;
  index: number;
}) {
  const t = serviceTheme(index);
  // White services use ultraviolet as their accent so tiles never vanish.
  const accent = t.bg === "bg-white" ? serviceTheme(0) : t;
  const TILES = [
    `${accent.bg} ${accent.text}`,
    "bg-ink text-white",
    "bg-white text-ink ring-1 ring-ink/10",
  ];

  return (
    <section id="what-you-get" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        {/* Definition + outcomes */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <SectionLabel index="01" title="Overview" />
            <h2
              className="display mt-5 text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              {/* Non-breaking hyphens so "E-commerce" never splits across lines. */}
              What is {service.name.replaceAll("-", "‑")}?
            </h2>
            {extras?.answer ? (
              <p
                id="service-answer"
                className="mt-7 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl"
              >
                {extras.answer}
              </p>
            ) : null}
          </div>
          {extras?.outcomes.length ? (
            <ul className="grid gap-3 self-end sm:grid-cols-3 lg:col-span-6 lg:grid-cols-1 xl:grid-cols-3">
              {extras.outcomes.map((o, i) => (
                <li
                  key={o.label}
                  className={`flex min-h-44 flex-col justify-between gap-8 rounded-[1.75rem] p-6 sm:p-7 xl:min-h-60 ${TILES[i % TILES.length]}`}
                >
                  <span className="label opacity-80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span
                      data-count
                      className={`block font-display font-black uppercase leading-[0.92] tracking-[-0.03em] [hyphens:none] ${
                        /\d/.test(o.value)
                          ? "text-[clamp(2rem,3vw,3rem)]"
                          : "text-[clamp(1.5rem,2.4vw,2rem)] xl:text-[clamp(1.2rem,1.55vw,1.7rem)]"
                      }`}
                      style={{ fontVariationSettings: '"wdth" 104' }}
                    >
                      {/* The display face's "+" is tiny; "&" reads better. */}
                      {o.value.replace(" + ", " & ")}
                    </span>
                    <span className="mt-2 block text-sm font-medium opacity-85">
                      {o.label}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Who it's for */}
        {extras?.idealFor.length ? (
          <div className="mt-24 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h3
                className="display text-[clamp(2rem,3.6vw,3.6rem)] text-ink"
                style={{ ["--wdth" as string]: 100 }}
              >
                Is this for you?
              </h3>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-ink-2">
                If one of these sounds like you, we should talk.
              </p>
            </div>
            <ul data-inview className="border-t-2 border-ink lg:col-span-8">
              {extras.idealFor.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-5 border-b-2 border-ink/10 py-5"
                >
                  <span
                    aria-hidden="true"
                    className={`iv-pop grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg font-bold ${accent.bg} ${accent.text}`}
                  >
                    ✓
                  </span>
                  <span className="font-display text-[clamp(1.1rem,1.6vw,1.45rem)] font-bold leading-snug tracking-[-0.01em] text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Benefits */}
        <div className="mt-24">
          <h3
            className="display text-[clamp(2rem,3.6vw,3.6rem)] text-ink"
            style={{ ["--wdth" as string]: 100 }}
          >
            What you get
          </h3>
          <ul
            data-inview="deal"
            className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5"
          >
            {service.benefits.map((b, i) => (
              <li
                key={b.title}
                className="group relative overflow-hidden rounded-[1.75rem] bg-white p-7 ring-1 ring-ink/10 transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1 sm:p-9"
              >
                {/* Decorative outlined numeral, clear of the text column */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-5 right-5 select-none font-display text-[5.5rem] font-black leading-none opacity-30 transition-[opacity,translate] duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:opacity-80 hidden xl:block xl:text-[8rem]"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: `2px var(--${accent.bg === "bg-sun" ? "ink" : accent.bg.replace("bg-", "")})`,
                    fontVariationSettings: '"wdth" 120',
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 ${accent.bg}`}
                />
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl font-display text-lg font-black ${accent.bg} ${accent.text}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4
                  className="mt-6 font-display text-[clamp(1.4rem,2vw,1.9rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] text-ink"
                  style={{ fontVariationSettings: '"wdth" 104' }}
                >
                  {b.title}
                </h4>
                <p className="relative mt-3 max-w-[20rem] text-base leading-relaxed text-ink-2 lg:max-w-[22rem]">
                  {b.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
