import { SectionLabel } from "@/components/home/SectionLabel";

/**
 * /work: other teams we've worked with, as two giant rows of names drifting
 * in opposite directions (solid and outlined type, alternating).
 */
export function WorkPartners({
  label,
  names,
}: {
  label: string;
  names: string[];
}) {
  const half = Math.ceil(names.length / 2);
  const rows = [names, [...names.slice(half), ...names.slice(0, half)]];
  return (
    <section className="relative overflow-hidden bg-sun py-20 text-ink sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="Also worked with" />
            <h2
              className="display mt-5 max-w-[14ch] text-[clamp(2.2rem,4.6vw,4.6rem)]"
              style={{ ["--wdth" as string]: 100 }}
            >
              And the teams behind the scenes
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink/85 sm:text-lg">
            Not every project can be shown publicly. These are more of the
            companies we&apos;ve designed, built and supported software for.
          </p>
        </div>
      </div>

      <ul className="sr-only">
        {names.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="mt-14 grid gap-3 sm:gap-5">
        {rows.map((row, r) => (
          <div key={row[0]} className="flex overflow-hidden">
            <div
              className={`wk-row flex shrink-0 items-center gap-8 pr-8 sm:gap-14 sm:pr-14 ${r ? "wk-row-rev" : ""}`}
            >
              {[...row, ...row, ...row, ...row].map((n, i) => (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: repeated marquee row.
                  key={i}
                  className={`flex shrink-0 items-center gap-8 whitespace-nowrap font-display text-[clamp(2.6rem,7vw,6.5rem)] font-black uppercase leading-none tracking-[-0.03em] sm:gap-14 ${
                    (i + r) % 2
                      ? "text-transparent [-webkit-text-stroke:2px_var(--ink)]"
                      : "text-ink"
                  }`}
                  style={{ fontVariationSettings: '"wdth" 110' }}
                >
                  {n}
                  <span className="inline-block h-4 w-4 rotate-45 rounded-[3px] bg-plasma sm:h-6 sm:w-6" />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
