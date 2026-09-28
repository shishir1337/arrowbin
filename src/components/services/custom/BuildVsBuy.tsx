import { SectionLabel } from "@/components/home/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";

const ROWS: { k: string; buy: string; build: string }[] = [
  {
    k: "Fit to your workflow",
    buy: "You adapt your process to the tool",
    build: "The software follows how you already work",
  },
  {
    k: "Cost over time",
    buy: "Per-seat fees that grow with every hire",
    build: "One build cost, then modest upkeep",
  },
  {
    k: "Ownership",
    buy: "Rented; you leave with an export file",
    build: "You own the code, data and infrastructure",
  },
  {
    k: "Integrations",
    buy: "Only what the vendor chose to support",
    build: "Connects to any system that has an API",
  },
  {
    k: "Speed to start",
    buy: "Same day, if it fits",
    build: "A usable first version in 6–12 weeks",
  },
  {
    k: "Competitive edge",
    buy: "Your competitors use the same tool",
    build: "Your way of working becomes an advantage",
  },
];

/**
 * Custom Software: the honest build-vs-buy comparison every buyer is weighing,
 * including the one row where off-the-shelf wins (speed to start).
 */
export function BuildVsBuy({ label }: { label: string }) {
  return (
    <section className="relative py-20 sm:py-28">
      <SectionReveal />
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="Build vs buy" />
            <h2
              className="display mt-5 max-w-[15ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              Off-the-shelf or built for you?
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-2 sm:text-lg">
            Off-the-shelf is the right call more often than agencies admit. Here
            is how we help clients decide, honestly.
          </p>
        </div>

        {/* Phones: one comparison card per factor */}
        <ul className="mt-10 grid gap-3 md:hidden">
          {ROWS.map((r) => {
            const buyWins = r.k === "Speed to start";
            return (
              <li
                key={r.k}
                data-inview
                className="overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-ink/10"
              >
                <p className="px-5 pt-5 font-display text-base font-black uppercase tracking-[-0.01em] text-ink">
                  {r.k}
                </p>
                <div className="grid gap-2 p-3">
                  <div className="rounded-2xl bg-frost p-4">
                    <p className="label flex items-center gap-2 text-ink-2">
                      Off-the-shelf
                      {buyWins ? (
                        <span className="iv-pop rounded-full bg-sun px-2 py-0.5 text-ink">
                          Wins
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1.5 text-[0.95rem] text-ink-2">{r.buy}</p>
                  </div>
                  <div className="rounded-2xl bg-ultra p-4 text-white">
                    <p className="label flex items-center gap-2 text-white/85">
                      Custom-built
                      {!buyWins ? (
                        <span className="iv-pop rounded-full bg-sun px-2 py-0.5 text-ink">
                          Wins
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1.5 text-[0.95rem] font-medium">
                      {r.build}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 hidden overflow-hidden rounded-[2rem] bg-white ring-1 ring-ink/10 md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Off-the-shelf software compared with custom software
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-1/4 p-5 sm:p-7">
                  <span className="sr-only">Factor</span>
                </th>
                <th
                  scope="col"
                  className="p-5 font-display text-base font-black uppercase tracking-[-0.01em] text-ink-2 sm:p-7 sm:text-xl"
                >
                  Off-the-shelf
                </th>
                <th
                  scope="col"
                  className="bg-ultra p-5 font-display text-base font-black uppercase tracking-[-0.01em] text-white sm:p-7 sm:text-xl"
                >
                  Custom-built
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => {
                const buyWins = r.k === "Speed to start";
                return (
                  <tr
                    key={r.k}
                    data-rv={i % 3}
                    data-inview
                    className="border-t-2 border-ink/10 align-top"
                  >
                    <th
                      scope="row"
                      className="p-5 font-display text-sm font-bold uppercase leading-snug tracking-[-0.01em] text-ink sm:p-7 sm:text-lg"
                    >
                      {r.k}
                    </th>
                    <td className="p-5 text-sm leading-relaxed text-ink-2 sm:p-7 sm:text-base">
                      {buyWins ? (
                        <span className="iv-pop mb-1.5 mr-2 inline-block rounded-full bg-sun px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-ink">
                          Wins
                        </span>
                      ) : null}
                      {r.buy}
                    </td>
                    <td className="bg-ultra/[0.06] p-5 text-sm font-medium leading-relaxed text-ink sm:p-7 sm:text-base">
                      {!buyWins ? (
                        <span className="iv-pop mb-1.5 mr-2 inline-block rounded-full bg-ultra px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-white">
                          Wins
                        </span>
                      ) : null}
                      {r.build}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2">
          Not sure which side you are on? That is exactly what our free
          discovery call is for. If an off-the-shelf tool fits, we will tell
          you, and point you to it.
        </p>
      </div>
    </section>
  );
}
