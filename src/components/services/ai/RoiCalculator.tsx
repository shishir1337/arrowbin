"use client";

import { useId, useState } from "react";
import { SectionLabel } from "@/components/home/SectionLabel";

type Slider = {
  key: "people" | "hours" | "rate" | "share";
  label: string;
  min: number;
  max: number;
  step: number;
  fmt: (v: number) => string;
};

const SLIDERS: Slider[] = [
  {
    key: "people",
    label: "People doing this task",
    min: 1,
    max: 50,
    step: 1,
    fmt: (v) => `${v}`,
  },
  {
    key: "hours",
    label: "Hours each spends per week",
    min: 1,
    max: 30,
    step: 1,
    fmt: (v) => `${v}h`,
  },
  {
    key: "rate",
    label: "Cost per hour (salary + overheads)",
    min: 10,
    max: 120,
    step: 5,
    fmt: (v) => `$${v}`,
  },
  {
    key: "share",
    label: "Share AI can realistically take on",
    min: 10,
    max: 90,
    step: 5,
    fmt: (v) => `${v}%`,
  },
];

const IDEAS = [
  "Invoice & receipt entry",
  "Support ticket triage",
  "Lead qualification",
  "Contract & document review",
  "Report writing",
  "Data clean-up",
];

/** Rough build + first-year running cost, scaled a little with team size. */
const buildCost = (people: number) => 12000 + people * 250;

const money = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : n >= 10_000
      ? `$${Math.round(n / 1000)}k`
      : `$${Math.round(n).toLocaleString("en-US")}`;

/**
 * AI: "is it worth automating?". Four sliders give hours and money saved a
 * year and a payback time against a typical build cost.
 */
export function RoiCalculator({ label }: { label: string }) {
  const id = useId();
  const [v, setV] = useState({ people: 6, hours: 10, rate: 35, share: 60 });

  const hoursYear = v.people * v.hours * 46 * (v.share / 100);
  const savings = hoursYear * v.rate;
  const cost = buildCost(v.people);
  const payback = savings > 0 ? (cost / savings) * 12 : 99;
  const fte = hoursYear / (46 * 40);

  return (
    <section className="relative bg-ultra py-20 text-white sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="Worth it?" tone="text-white" />
            <h2
              className="display mt-5 max-w-[14ch] text-[clamp(2.2rem,4.6vw,4.6rem)]"
              style={{ ["--wdth" as string]: 100 }}
            >
              Is it worth automating?
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-white/90 sm:text-lg">
            We only build automations that pay for themselves. Plug in one
            repetitive task your team does and see what it&apos;s costing you.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="grid gap-7 rounded-[2rem] bg-white p-6 text-ink sm:p-8 lg:col-span-6">
            {SLIDERS.map((s) => {
              const val = v[s.key];
              const pct = ((val - s.min) / (s.max - s.min)) * 100;
              return (
                <div key={s.key}>
                  <label
                    htmlFor={`${id}-${s.key}`}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <span className="font-semibold">{s.label}</span>
                    <span
                      className="font-display text-2xl font-black leading-none tabular-nums text-ultra"
                      style={{ fontVariationSettings: '"wdth" 108' }}
                    >
                      {s.fmt(val)}
                    </span>
                  </label>
                  <input
                    id={`${id}-${s.key}`}
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={val}
                    onChange={(e) =>
                      setV((p) => ({ ...p, [s.key]: Number(e.target.value) }))
                    }
                    aria-valuetext={s.fmt(val)}
                    className="sx-range mt-3 w-full"
                    style={{ ["--p" as string]: `${pct}%` }}
                  />
                </div>
              );
            })}
            <div>
              <p className="label text-ink-2">Good first candidates</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {IDEAS.map((i) => (
                  <li
                    key={i}
                    className="rounded-full bg-frost px-3 py-1.5 text-sm font-medium"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-6" aria-live="polite">
            <div className="rounded-[2rem] bg-sun p-6 text-ink sm:p-8">
              <p className="label">Saved every year</p>
              <p
                className="mt-3 font-display text-[clamp(3.4rem,8vw,7rem)] font-black leading-[0.85] tabular-nums"
                style={{ fontVariationSettings: '"wdth" 112' }}
              >
                {money(savings)}
              </p>
              <p className="mt-3 text-base font-medium">
                {Math.round(hoursYear).toLocaleString("en-US")} hours of
                repetitive work, about{" "}
                <strong>
                  {fte < 1 ? fte.toFixed(1) : Math.round(fte)} full-time
                  {fte >= 1.5 ? " people" : " person"}
                </strong>{" "}
                freed up for better work.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[1.75rem] bg-white p-5 text-ink sm:p-6">
                <p className="label text-ink-2">Pays for itself in</p>
                <p
                  className="mt-2 font-display text-4xl font-black leading-none tabular-nums sm:text-5xl"
                  style={{ fontVariationSettings: '"wdth" 108' }}
                >
                  {payback < 1
                    ? "<1"
                    : payback > 36
                      ? "36+"
                      : Math.ceil(payback)}
                  <span className="ml-1.5 text-base tracking-normal">
                    {payback < 1 ? "month" : "months"}
                  </span>
                </p>
              </div>
              <div className="rounded-[1.75rem] bg-white/10 p-5 ring-1 ring-white/25 sm:p-6">
                <p className="label text-white/90">Typical build</p>
                <p
                  className="mt-2 font-display text-4xl font-black leading-none tabular-nums sm:text-5xl"
                  style={{ fontVariationSettings: '"wdth" 108' }}
                >
                  {money(cost)}
                </p>
              </div>
            </div>
            <p className="px-1 text-sm leading-relaxed text-white/90">
              Rough, conservative maths: 46 working weeks and a typical first
              automation including a year of running costs. We confirm real
              numbers in a free discovery call before you commit to anything.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
