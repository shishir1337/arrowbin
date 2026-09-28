"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/home/SectionLabel";

type Id = "contrast" | "fields" | "labels" | "tap" | "errors";

const ISSUES: { id: Id; title: string; before: string; after: string }[] = [
  {
    id: "contrast",
    title: "Low-contrast text",
    before: "Light grey on white fails WCAG. Many people can't read it.",
    after: "Text at 4.5:1 contrast or better, readable in sunlight.",
  },
  {
    id: "fields",
    title: "Too many fields",
    before: "Seven fields before anyone has seen the product.",
    after: "Three fields. The rest can wait until after sign-up.",
  },
  {
    id: "labels",
    title: "Vague labels",
    before: "“Submit” and placeholder-only fields that vanish on typing.",
    after: "Visible labels and a button that says what happens.",
  },
  {
    id: "tap",
    title: "Tiny tap targets",
    before: "Checkbox and link are too small to hit on a phone.",
    after: "44px+ targets with room between them.",
  },
  {
    id: "errors",
    title: "Unhelpful errors",
    before: "“Invalid input” in red, with no idea what to fix.",
    after: "Inline help that says exactly what to change.",
  },
];

/**
 * Text inside the illustrated form. Drawn as generated content: the form is a
 * picture (hidden from assistive tech) whose "before" state is deliberately
 * low contrast, which is the point being made.
 */
function T({ t, className = "" }: { t: string; className?: string }) {
  return <span data-t={t} className={`ux-t ${className}`} />;
}

/**
 * UI/UX: a live UX audit. A deliberately flawed sign-up form; fixing each
 * issue updates the form itself and the UX score.
 */
export function UxAudit({ label }: { label: string }) {
  const [fixed, setFixed] = useState<Set<Id>>(new Set());
  const f = (id: Id) => fixed.has(id);
  const score = 38 + fixed.size * 12;
  const toggle = (id: Id) =>
    setFixed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const all = fixed.size === ISSUES.length;

  const fields = f("fields")
    ? [
        { l: "Work email", v: "sam@ledger.io" },
        { l: "Password", v: "••••••••••" },
      ]
    : [
        { l: "First name", v: "" },
        { l: "Last name", v: "" },
        { l: "Email", v: "sam@ledger" },
        { l: "Phone", v: "" },
        { l: "Company", v: "" },
        { l: "Password", v: "" },
      ];

  return (
    <section className="relative bg-lilac py-20 text-ink sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="UX audit" />
            <h2
              className="display mt-5 max-w-[14ch] text-[clamp(2.2rem,4.6vw,4.6rem)]"
              style={{ ["--wdth" as string]: 100 }}
            >
              Small fixes, big difference
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink/85 sm:text-lg">
            Here&apos;s a sign-up form like many we audit. Fix the problems one
            by one and watch it change. None of them is dramatic; together they
            decide whether people finish.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* The form under audit */}
          <div className="relative lg:col-span-5">
            <div
              className={`relative rounded-[2rem] bg-white p-6 transition-shadow duration-700 sm:p-9 ${
                all
                  ? "shadow-[0_40px_80px_-40px_rgba(59,43,255,0.7)]"
                  : "shadow-[0_30px_60px_-40px_rgba(14,11,36,0.6)]"
              }`}
              aria-hidden="true"
            >
              <p
                className={`font-display text-2xl font-black uppercase leading-none tracking-[-0.02em] transition-colors duration-500 sm:text-3xl ${
                  f("contrast") ? "text-ink" : "text-ink/30"
                }`}
              >
                <T t={f("labels") ? "Start your free trial" : "Register"} />
              </p>
              <p
                className={`mt-2 text-sm transition-colors duration-500 ${f("contrast") ? "text-ink-2" : "text-ink/25"}`}
              >
                <T
                  t={
                    f("labels")
                      ? "14 days free. No card needed."
                      : "Please fill in all fields."
                  }
                />
              </p>

              <div className="mt-6 grid gap-3">
                {fields.map((x) => (
                  <div key={x.l} className="ux-in">
                    {f("labels") && (
                      <span
                        className={`mb-1 block text-xs font-semibold ${f("contrast") ? "text-ink" : "text-ink/35"}`}
                      >
                        <T t={x.l} />
                      </span>
                    )}
                    <span
                      className={`flex items-center rounded-xl px-4 text-sm transition-[height,box-shadow,background-color] duration-500 ${
                        f("tap") ? "h-12" : "h-9"
                      } ${
                        x.l === "Email" && !f("errors")
                          ? "bg-flare/10 ring-1 ring-flare"
                          : "bg-frost"
                      } ${f("contrast") ? "text-ink" : "text-ink/30"}`}
                    >
                      <T t={x.v || (f("labels") ? "" : x.l)} />
                    </span>
                    {x.l === "Email" && !f("errors") && (
                      <span className="mt-1 block text-[11px] font-semibold text-flare">
                        <T t="Invalid input" />
                      </span>
                    )}
                    {x.l === "Work email" && f("errors") && (
                      <span className="mt-1 block text-xs text-ultra">
                        <T t="✓ Looks good" />
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div
                className={`mt-5 flex items-center gap-2 text-xs ${f("contrast") ? "text-ink-2" : "text-ink/30"}`}
              >
                <span
                  className={`shrink-0 rounded border-2 border-ink/30 transition-[width,height] duration-500 ${f("tap") ? "h-6 w-6" : "h-3 w-3"}`}
                />
                <T t="I agree to the" /> <T t="terms" className="underline" />
              </div>

              <span
                className={`mt-5 flex items-center justify-center rounded-full font-semibold transition-[height,background-color,color] duration-500 ${
                  f("tap") ? "h-13" : "h-9 text-sm"
                } ${f("contrast") ? "bg-ultra text-white" : "bg-ultra/25 text-white"}`}
              >
                <T t={f("labels") ? "Create my account" : "Submit"} />
              </span>
            </div>
          </div>

          {/* Issues */}
          <div className="lg:col-span-7">
            <div className="flex items-end justify-between gap-4 rounded-[1.75rem] bg-white p-5 sm:p-6">
              <div aria-live="polite">
                <p className="label text-ink-2">UX score</p>
                <p
                  className="mt-1 font-display text-[clamp(2.6rem,5vw,4rem)] font-black leading-none tabular-nums"
                  style={{ fontVariationSettings: '"wdth" 110' }}
                >
                  {score}
                  <span className="text-[0.45em] text-ink-2">/100</span>
                </p>
              </div>
              <div className="w-1/2 max-w-xs">
                <div className="h-3 overflow-hidden rounded-full bg-frost">
                  <span
                    className={`block h-full rounded-full transition-[width,background-color] duration-700 ease-[var(--ease-out-expo)] ${
                      score >= 90
                        ? "bg-ultra"
                        : score >= 60
                          ? "bg-sun"
                          : "bg-flare"
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
                <p className="mt-2 text-right text-sm font-semibold">
                  {all
                    ? "Ready to ship"
                    : `${ISSUES.length - fixed.size} issue${ISSUES.length - fixed.size === 1 ? "" : "s"} left`}
                </p>
              </div>
            </div>

            <ul className="mt-4 grid gap-3">
              {ISSUES.map((it, i) => {
                const on = f(it.id);
                return (
                  <li key={it.id}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(it.id)}
                      className={`group flex w-full cursor-pointer items-start gap-4 rounded-[1.4rem] p-4 text-left transition-colors duration-500 sm:p-5 ${
                        on
                          ? "bg-ultra text-white"
                          : "bg-white/70 hover:bg-white"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-mono text-sm font-bold transition-[background-color,rotate] duration-500 ease-[var(--ease-out-expo)] ${
                          on
                            ? "rotate-[360deg] bg-sun text-ink"
                            : "bg-flare text-ink"
                        }`}
                      >
                        {on ? "✓" : i + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{it.title}</span>
                        <span
                          className={`mt-0.5 block text-sm ${on ? "text-white/90" : "text-ink-2"}`}
                        >
                          {on ? it.after : it.before}
                        </span>
                      </span>
                      <span
                        className={`hidden shrink-0 self-center rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-500 sm:inline ${
                          on
                            ? "bg-white/15"
                            : "bg-ink text-white group-hover:bg-ultra"
                        }`}
                      >
                        {on ? "Fixed" : "Fix it"}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              onClick={() =>
                setFixed(all ? new Set() : new Set(ISSUES.map((x) => x.id)))
              }
              className="mt-4 cursor-pointer text-sm font-semibold underline decoration-2 underline-offset-4 hover:text-ultra"
            >
              {all ? "Reset the form" : "Fix everything"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
