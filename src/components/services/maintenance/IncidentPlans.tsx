"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/home/SectionLabel";

type Plan = {
  id: string;
  name: string;
  fit: string;
  /** Minutes to first response on a critical issue. */
  respond: number;
  hours: string;
  includes: string[];
  tone: string;
};

const PLANS: Plan[] = [
  {
    id: "essential",
    name: "Essential",
    fit: "Internal tools & smaller sites",
    respond: 240,
    hours: "5 dev hours / month",
    includes: [
      "Uptime & error monitoring",
      "Monthly security updates",
      "Backups checked monthly",
      "Monthly health report",
    ],
    tone: "bg-lilac",
  },
  {
    id: "growth",
    name: "Growth",
    fit: "Products customers pay for",
    respond: 60,
    hours: "20 dev hours / month",
    includes: [
      "Everything in Essential",
      "Weekly updates & patching",
      "24/7 critical-issue cover",
      "Performance tuning",
      "Small features every month",
    ],
    tone: "bg-sun",
  },
  {
    id: "dedicated",
    name: "Dedicated",
    fit: "Business-critical platforms",
    respond: 15,
    hours: "80+ dev hours / month",
    includes: [
      "Everything in Growth",
      "Named engineer on call",
      "Roadmap planning together",
      "Quarterly architecture review",
      "Priority feature delivery",
    ],
    tone: "bg-plasma",
  },
];

const START = 2 * 60 + 13; // 02:13
const clock = (min: number) => {
  const m = ((min % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};
const dur = (min: number) =>
  min < 60
    ? `${min} min`
    : `${Math.floor(min / 60)}h ${min % 60 ? `${min % 60}m` : ""}`.trim();

/**
 * Maintenance: "what happens at 2am". Pick a support plan and the same
 * production incident replays against that plan's response target.
 */
export function IncidentPlans({ label }: { label: string }) {
  const [pi, setPi] = useState(1);
  const plan = PLANS[pi];
  const steps = [
    {
      at: 0,
      title: "Alert fires",
      text: "Monitoring spots checkout errors before any customer reports it.",
    },
    {
      at: plan.respond,
      title: "Engineer on it",
      text: `Acknowledged and investigating, within the ${dur(plan.respond)} target.`,
    },
    {
      at: plan.respond + 18,
      title: "Cause found",
      text: "A payment provider changed an API response overnight.",
    },
    {
      at: plan.respond + 41,
      title: "Fix deployed",
      text: "Patched, tested and shipped through the pipeline. Checkout is back.",
    },
    {
      at: 60 * 8,
      title: "Post-mortem sent",
      text: "What happened, what we fixed, and the guard added so it can't recur.",
    },
  ];
  const downtime = plan.respond + 41;

  return (
    <section className="relative bg-lilac py-20 text-ink sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="Support plans" />
            <h2
              className="display mt-5 max-w-[14ch] text-[clamp(2.2rem,4.6vw,4.6rem)]"
              style={{ ["--wdth" as string]: 100 }}
            >
              What happens at 2am?
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink/85 sm:text-lg">
            Something will break eventually. What matters is how fast someone is
            on it. Pick a plan and replay the same incident.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Plans */}
          <fieldset className="m-0 grid min-w-0 gap-3 border-0 p-0 lg:col-span-5">
            <legend className="sr-only">Support plan</legend>
            {PLANS.map((p, i) => {
              const on = i === pi;
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setPi(i)}
                  className={`group cursor-pointer rounded-[1.6rem] p-5 text-left transition-[background-color,box-shadow,translate] duration-500 ease-[var(--ease-out-expo)] sm:p-6 ${
                    on
                      ? "bg-white shadow-[0_30px_60px_-36px_rgba(14,11,36,0.7)] lg:translate-x-2"
                      : "bg-white/55 hover:bg-white/80"
                  }`}
                >
                  <span className="flex items-start justify-between gap-4">
                    <span>
                      <span className="flex items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          className={`h-3 w-3 rounded-full ${p.tone}`}
                        />
                        <span className="font-display text-2xl font-black uppercase leading-none tracking-[-0.02em]">
                          {p.name}
                        </span>
                      </span>
                      <span className="mt-1.5 block text-sm text-ink-2">
                        {p.fit}
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block font-mono text-xs text-ink-2">
                        critical response
                      </span>
                      <span
                        className="block font-display text-2xl font-black leading-none tabular-nums"
                        style={{ fontVariationSettings: '"wdth" 108' }}
                      >
                        {dur(p.respond)}
                      </span>
                    </span>
                  </span>
                  <span
                    className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] ${
                      on
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <span className="min-h-0">
                      <span className="mt-4 flex flex-wrap gap-1.5 border-t border-ink/10 pt-4">
                        <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
                          {p.hours}
                        </span>
                        {p.includes.map((x) => (
                          <span
                            key={x}
                            className="rounded-full bg-frost px-3 py-1 text-xs font-medium"
                          >
                            {x}
                          </span>
                        ))}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
            <p className="px-1 text-sm leading-relaxed text-ink/80">
              Typical targets; the exact SLA, hours and price are agreed in your
              plan after a free audit.
            </p>
          </fieldset>

          {/* Incident replay */}
          <div className="rounded-[2rem] bg-white p-5 sm:p-8 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="label text-ink-2">Incident · checkout failing</p>
              <p className="rounded-full bg-frost px-3 py-1.5 font-mono text-xs">
                Plan: <strong>{plan.name}</strong>
              </p>
            </div>

            <ol key={plan.id} className="relative mt-6 grid gap-1">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className="ip-step relative grid grid-cols-[3.6rem_1.5rem_1fr] items-start gap-2 py-2.5 sm:grid-cols-[4rem_1.75rem_1fr] sm:gap-3"
                  style={{ animationDelay: `${i * 260}ms` }}
                >
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute top-8 -bottom-3 left-[calc(3.6rem+0.5rem+0.625rem-1px)] w-0.5 bg-ink/10 sm:left-[calc(4rem+0.75rem+0.625rem-1px)]"
                    />
                  )}
                  <span className="pt-0.5 text-right font-mono text-sm font-bold tabular-nums">
                    {clock(START + s.at)}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`relative mt-1 grid h-5 w-5 place-items-center rounded-full ring-4 ring-white ${
                      i === 0 ? "bg-plasma" : i === 3 ? "bg-ultra" : "bg-ink"
                    }`}
                  />
                  <span>
                    <span className="block font-semibold">{s.title}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-ink-2">
                      {s.text}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            <div
              key={`${plan.id}-sum`}
              className="ip-step mt-5 grid grid-cols-2 gap-3"
              style={{ animationDelay: "1.4s" }}
            >
              <div className="rounded-2xl bg-frost p-4">
                <p className="text-xs font-semibold text-ink-2">
                  Customer-facing downtime
                </p>
                <p
                  className="mt-1 font-display text-2xl font-black leading-none tabular-nums sm:text-3xl"
                  style={{ fontVariationSettings: '"wdth" 108' }}
                >
                  {dur(downtime)}
                </p>
              </div>
              <div className={`rounded-2xl p-4 ${plan.tone}`}>
                <p className="text-xs font-semibold">You found out</p>
                <p className="mt-1 font-display text-xl sm:text-3xl font-black uppercase leading-none tracking-[-0.02em]">
                  At breakfast
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
