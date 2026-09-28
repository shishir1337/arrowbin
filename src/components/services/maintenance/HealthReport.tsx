import { SectionLabel } from "@/components/home/SectionLabel";

const STATS = [
  { k: "Uptime", v: "99.98%", note: "1 planned window" },
  { k: "Updates applied", v: "27", note: "all tests green" },
  { k: "Vulnerabilities open", v: "0", note: "3 patched" },
  { k: "Avg. page load", v: "1.1s", note: "▼ 0.2s" },
];

const SHIPPED = [
  "Bulk export for the orders table",
  "Faster search on mobile",
  "New email receipts template",
];

const NEXT = [
  "Upgrade to the new payments API",
  "Image compression on uploads",
];

const POINTS = [
  {
    title: "Plain language",
    text: "What changed, what it means for your business, and nothing you need a developer to translate.",
  },
  {
    title: "Proof, not promises",
    text: "Uptime, speed and security numbers straight from monitoring, month over month.",
  },
  {
    title: "A plan for next month",
    text: "What we'll improve next, agreed with you, so upkeep turns into progress.",
  },
];

/**
 * Maintenance: the monthly health report every client gets, as a tilting
 * paper mock with counting figures, beside what makes it useful.
 */
export function HealthReport({ label }: { label: string }) {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-[var(--gutter)] lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionLabel index={label} title="Every month" />
          <h2
            className="display mt-5 max-w-[14ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
            style={{ ["--wdth" as string]: 100 }}
          >
            A health report you&apos;ll actually read
          </h2>
          <ul data-inview="slide" className="mt-10 grid gap-3">
            {POINTS.map((p, i) => (
              <li
                key={p.title}
                className="flex gap-4 rounded-[1.4rem] bg-frost p-5"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ultra font-mono text-xs font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-semibold text-ink">
                    {p.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-2">
                    {p.text}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative self-center lg:col-span-7">
          {/* stacked "previous months" behind */}
          <div
            aria-hidden="true"
            className="absolute inset-x-8 top-8 -bottom-6 rotate-3 rounded-[2rem] bg-sun"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-4 top-4 -bottom-3 -rotate-2 rounded-[2rem] bg-plasma"
          />
          <article
            data-tilt="4"
            className="relative rounded-[2rem] bg-white p-6 shadow-[0_40px_80px_-40px_rgba(14,11,36,0.6)] ring-1 ring-ink/10 sm:p-9"
          >
            <header className="flex flex-wrap items-start justify-between gap-4 border-b border-ink/10 pb-5">
              <div>
                <p className="label text-ink-2">Monthly health report</p>
                <p className="mt-2 font-display text-2xl font-black uppercase leading-none tracking-[-0.02em] text-ink sm:text-3xl">
                  September · Your product
                </p>
              </div>
              <span className="rounded-full bg-ultra px-3 py-1.5 font-mono text-xs font-bold text-white">
                Status: healthy
              </span>
            </header>

            <dl className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.k} className="rounded-2xl bg-frost p-4">
                  <dt className="text-xs font-semibold text-ink-2">{s.k}</dt>
                  <dd
                    data-count
                    className="mt-1.5 font-display text-3xl font-black leading-none tabular-nums text-ink"
                    style={{ fontVariationSettings: '"wdth" 108' }}
                  >
                    {s.v}
                  </dd>
                  <dd className="mt-1.5 font-mono text-[11px] text-ink-2">
                    {s.note}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <p className="label text-ink-2">Shipped this month</p>
                <ul data-inview className="mt-3 grid gap-2">
                  {SHIPPED.map((x) => (
                    <li
                      key={x}
                      className="flex items-center gap-3 text-sm font-medium text-ink"
                    >
                      <span
                        aria-hidden="true"
                        className="iv-pop grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sun text-xs text-ink"
                      >
                        ✓
                      </span>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="label text-ink-2">Planned for October</p>
                <ul className="mt-3 grid gap-2">
                  {NEXT.map((x) => (
                    <li
                      key={x}
                      className="flex items-center gap-3 text-sm font-medium text-ink"
                    >
                      <span
                        aria-hidden="true"
                        className="h-6 w-6 shrink-0 rounded-full border-2 border-dashed border-ink/30"
                      />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-lilac/60 p-4">
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-semibold text-ink">
                  Support hours used
                </span>
                <span className="font-mono text-xs text-ink">18 of 20</span>
              </div>
              <div
                data-inview
                className="mt-2 h-2.5 overflow-hidden rounded-full bg-white"
              >
                <span className="iv-bar block h-full w-[90%] rounded-full bg-ultra" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
