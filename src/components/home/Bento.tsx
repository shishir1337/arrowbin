import type { ReactNode } from "react";
import { LiveClock, TypingCode } from "./BentoLive";
import { BentoMotion } from "./motion/BentoMotion";
import { SectionLabel } from "./SectionLabel";

/** Bento tile shell (server-rendered; hover tilt comes from <BentoMotion/>). */
function Tile({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`bento-tile relative overflow-hidden rounded-[1.75rem] p-6 [transform-style:preserve-3d] sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

const DAYS = ["M", "T", "W", "T", "F"];
const STACK_ROWS = [
  ["Next.js", "React", "TypeScript", "Node.js", "Tailwind"],
  ["React Native", "Flutter", "Python", "Postgres", "Redis"],
  ["AWS", "Docker", "OpenAI", "Stripe", "Vercel"],
];

/**
 * Why Arrowbin: a bento of live tiles (weekly-demo calendar, typing code, the
 * visitor's own clock, an orbiting tech stack, a printing estimate), each with
 * a hover tilt.
 */
export function Bento() {
  return (
    <section className="relative py-24 sm:py-32 [perspective:1400px]">
      <BentoMotion />
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="06" title="Why Arrowbin" />
            <h2
              className="display mt-5 max-w-[14ch] text-[clamp(2.8rem,7.5vw,7.5rem)] text-ink"
              style={{ ["--wdth" as string]: 105 }}
            >
              Built different, on purpose
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-ink-2 sm:text-lg">
            Senior people, honest estimates and a rhythm you can set your watch
            by. Here&apos;s what working with us actually feels like.
          </p>
        </div>

        <div className="bento-grid mt-14 grid auto-rows-[minmax(15rem,auto)] gap-4 sm:gap-5 md:grid-cols-6 lg:grid-cols-12">
          {/* Weekly demos */}
          <Tile className="bg-ultra text-white md:col-span-6 lg:col-span-5 lg:row-span-2">
            <p className="label text-sun">Rhythm</p>
            <h3 className="mt-4 font-display text-[clamp(2rem,3.4vw,3.4rem)] font-black uppercase leading-[0.9] tracking-[-0.04em]">
              Weekly demos. Zero mystery.
            </h3>
            <p className="mt-4 max-w-sm text-white/75">
              Every Friday you see working software, not a status report. You
              steer, we ship, repeat.
            </p>
            <div className="mt-8 grid grid-cols-5 gap-2">
              {Array.from({ length: 20 }).map((_, i) => (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: static calendar grid.
                  key={i}
                  className={`cal-cell grid aspect-square place-items-center rounded-xl bg-white/10 font-mono text-xs text-white/85 ${i % 5 === 4 ? "is-demo" : ""}`}
                >
                  {i < 5 ? DAYS[i] : i % 5 === 4 ? "DEMO" : ""}
                </span>
              ))}
            </div>
          </Tile>

          {/* Code ownership */}
          <Tile className="bg-white text-ink ring-1 ring-ink/10 md:col-span-6 lg:col-span-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="label text-ultra">Ownership</p>
                <h3 className="mt-4 font-display text-[clamp(1.8rem,2.8vw,2.8rem)] font-black uppercase leading-[0.9] tracking-[-0.04em]">
                  100% your code
                </h3>
              </div>
              <span className="rounded-full bg-sun px-3 py-1 font-mono text-xs font-semibold">
                no lock-in
              </span>
            </div>
            <TypingCode />
          </Tile>

          {/* Your time */}
          <Tile className="bg-plasma text-ink md:col-span-3 lg:col-span-4">
            <p className="label">Your time, right now</p>
            <LiveClock />
            <p className="mt-3 max-w-[16rem] text-sm text-ink/85">
              We plan our day around yours, with overlapping hours wherever you
              are.
            </p>
          </Tile>

          {/* Stack orbit */}
          <Tile className="bg-lilac text-ink md:col-span-3 lg:col-span-3">
            <p className="label">Stack</p>
            <h3 className="mt-4 font-display text-[clamp(1.5rem,2vw,2rem)] font-black uppercase leading-[0.9] tracking-[-0.04em]">
              Proven tools only
            </h3>
            <div className="marquee-mask -mx-6 mt-6 grid gap-2.5 sm:-mx-8">
              {STACK_ROWS.map((row, r) => (
                <div
                  key={row[0]}
                  className="marquee-track gap-2"
                  style={{
                    animationDuration: `${22 + r * 6}s`,
                    animationDirection: r % 2 ? "reverse" : "normal",
                  }}
                >
                  {[...row, ...row].map((t, i) => (
                    <span
                      // biome-ignore lint/suspicious/noArrayIndexKey: duplicated marquee row.
                      key={i}
                      className={`shrink-0 rounded-full px-3 py-1.5 font-mono text-xs font-semibold ${
                        (i + r) % 3 === 0
                          ? "bg-ultra text-white"
                          : "bg-white text-ink"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </Tile>

          {/* Estimate receipt */}
          <Tile className="receipt bg-sun text-ink md:col-span-6 lg:col-span-12 xl:col-span-12">
            <div className="grid items-center gap-6 md:grid-cols-2">
              <div>
                <p className="label">Pricing</p>
                <h3 className="mt-4 font-display text-[clamp(1.8rem,3vw,3rem)] font-black uppercase leading-[0.9] tracking-[-0.04em]">
                  Fixed estimates. No surprise invoices.
                </h3>
                <p className="mt-4 max-w-md text-ink/85">
                  After a free consultation you get a clear, itemised estimate,
                  so you know the number before we start.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 font-mono text-sm shadow-[0_20px_40px_-20px_rgba(14,11,36,0.4)]">
                {[
                  ["Discovery & scope", "fixed"],
                  ["Design system + UI", "fixed"],
                  ["Build, 6 sprints", "fixed"],
                  ["Launch & handover", "fixed"],
                ].map(([k, v]) => (
                  <p
                    key={k}
                    className="receipt-line flex justify-between border-b border-dashed border-ink/15 py-2"
                  >
                    <span>{k}</span>
                    <span className="text-ultra">{v}</span>
                  </p>
                ))}
                <p className="receipt-line flex justify-between pt-3 font-semibold">
                  <span>Surprises</span>
                  <span className="rounded-md bg-plasma px-1.5 text-ink">
                    $0.00
                  </span>
                </p>
              </div>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}
