"use client";

import { useEffect, useId, useRef, useState } from "react";
import { SectionLabel } from "@/components/home/SectionLabel";
import { reducedMotion } from "@/lib/gsap";

const VALUES = [
  {
    id: "quality",
    title: "Quality first",
    line: "Clean, tested code. Built to last, not just to ship.",
    proof: "Every change runs through automated checks before it reaches you.",
  },
  {
    id: "partner",
    title: "Real partnership",
    line: "We listen, talk plainly and own your product like it's ours.",
    proof:
      "You get a written update every Friday: done, next, and anything in the way.",
  },
  {
    id: "purpose",
    title: "Move with purpose",
    line: "Fast, never reckless. Every task answers to a goal.",
    proof:
      "Work is planned around the number you care about, not a feature list.",
  },
  {
    id: "improve",
    title: "Always improving",
    line: "We stay curious and keep raising our own bar.",
    proof: "After each release we write down what to keep and what to change.",
  },
] as const;

type Id = (typeof VALUES)[number]["id"];

const STEP_MS = 7000;

/* ── Mockups (illustrative, one per value) ─────────────────────────────── */

function QualityMock({ on }: { on: boolean }) {
  const checks = [
    ["Type check", "0 errors"],
    ["Unit tests", "214 passed"],
    ["End-to-end tests", "38 passed"],
    ["Accessibility", "0 issues"],
    ["Performance", "98 / 100"],
  ];
  return (
    <div className="overflow-hidden rounded-[1.4rem] bg-ink text-white">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-plasma" />
        <span className="h-2.5 w-2.5 rounded-full bg-sun" />
        <span className="h-2.5 w-2.5 rounded-full bg-ultra" />
        <span className="ml-3 font-mono text-xs text-white/85">
          checks · pull request #182
        </span>
      </div>
      <ul className="grid gap-1 p-4 font-mono text-[13px] sm:p-5">
        {checks.map(([k, v], i) => (
          <li
            key={k}
            className="flex items-center gap-3 rounded-lg px-2 py-2 transition-[opacity,translate] duration-500 ease-[var(--ease-out-expo)]"
            style={{
              opacity: on ? 1 : 0,
              translate: on ? "0 0" : "0 8px",
              transitionDelay: on ? `${150 + i * 220}ms` : "0ms",
            }}
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-sun text-[10px] font-bold text-ink">
              ✓
            </span>
            <span className="flex-1">{k}</span>
            <span className="text-sun">{v}</span>
          </li>
        ))}
      </ul>
      <div
        className="m-4 mt-0 flex items-center justify-between rounded-xl bg-ultra px-4 py-3 text-sm font-semibold transition-opacity duration-500 sm:m-5 sm:mt-0"
        style={{ opacity: on ? 1 : 0, transitionDelay: on ? "1350ms" : "0ms" }}
      >
        All checks passed
        <span className="rounded-full bg-white px-3 py-1 text-xs text-ink">
          Ready to ship
        </span>
      </div>
    </div>
  );
}

function PartnerMock({ on }: { on: boolean }) {
  const blocks = [
    {
      h: "Shipped this week",
      items: ["Checkout with saved addresses", "Faster product pages (−1.1s)"],
    },
    { h: "Next week", items: ["Order tracking page", "Admin export to Excel"] },
    { h: "Needs you", items: ["Approve the new delivery fee rules"] },
  ];
  return (
    <div className="rounded-[1.4rem] bg-white p-4 ring-1 ring-ink/10 sm:p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ultra font-display text-sm font-black text-white">
          A
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-ink">Arrowbin team</p>
          <p className="text-xs text-ink-2">Friday update · Week 14</p>
        </div>
        <span className="ml-auto rounded-full bg-frost px-2.5 py-1 font-mono text-[11px] text-ink">
          22 / 40 h
        </span>
      </div>
      <div className="mt-4 grid gap-3">
        {blocks.map((b, i) => (
          <div
            key={b.h}
            className={`rounded-xl p-3.5 transition-[opacity,translate] duration-500 ease-[var(--ease-out-expo)] ${
              i === 2 ? "bg-sun" : "bg-frost"
            }`}
            style={{
              opacity: on ? 1 : 0,
              translate: on ? "0 0" : "0 10px",
              transitionDelay: on ? `${200 + i * 300}ms` : "0ms",
            }}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-ink">
              {b.h}
            </p>
            <ul className="mt-1.5 grid gap-1 text-sm text-ink">
              {b.items.map((t) => (
                <li key={t} className="flex gap-2">
                  <span aria-hidden="true">{i === 2 ? "→" : "•"}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function PurposeMock({ on }: { on: boolean }) {
  const cols = [
    { h: "Next", cards: ["One-page checkout", "Guest checkout"] },
    { h: "Doing", cards: ["Save cart for later"] },
    { h: "Done", cards: ["Address autofill", "Faster payment step"] },
  ];
  return (
    <div className="rounded-[1.4rem] bg-white p-4 ring-1 ring-ink/10 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-ultra px-4 py-3 text-white">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-white/85">
            Sprint goal
          </p>
          <p className="font-semibold">Checkout conversion 2.1% → 3%</p>
        </div>
        <div className="w-full sm:w-40">
          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-sun transition-[width] duration-[1600ms] ease-[var(--ease-out-expo)]"
              style={{ width: on ? "68%" : "8%", transitionDelay: "300ms" }}
            />
          </div>
          <p className="mt-1 text-right font-mono text-[11px]">now 2.7%</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {cols.map((c, ci) => (
          <div key={c.h} className="rounded-xl bg-frost p-2">
            <p className="px-1 pb-2 pt-1 text-[11px] font-bold uppercase tracking-wider text-ink">
              {c.h}
            </p>
            <ul className="grid gap-1.5">
              {c.cards.map((t, k) => (
                <li
                  key={t}
                  className={`rounded-lg p-2 text-[12px] font-medium leading-snug text-ink shadow-[0_6px_14px_-10px_rgba(14,11,36,0.5)] transition-[opacity,translate] duration-500 ease-[var(--ease-out-expo)] sm:text-[13px] ${
                    ci === 2 ? "bg-lilac" : "bg-white"
                  }`}
                  style={{
                    opacity: on ? 1 : 0,
                    translate: on ? "0 0" : "0 10px",
                    transitionDelay: on
                      ? `${250 + (ci * 2 + k) * 140}ms`
                      : "0ms",
                  }}
                >
                  {t}
                  <span className="mt-1.5 block font-mono text-[10px] text-ink-2">
                    ↳ checkout goal
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImproveMock({ on }: { on: boolean }) {
  const keep = [
    "Daily preview links for the client",
    "Small releases, twice a week",
  ];
  const change = [
    "Test on older Android phones earlier",
    "Write the release notes as we go",
  ];
  return (
    <div className="rounded-[1.4rem] bg-white p-4 ring-1 ring-ink/10 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-semibold text-ink">Release retro · v2.4</p>
        <span className="rounded-full bg-frost px-2.5 py-1 font-mono text-[11px] text-ink">
          30 min
        </span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {[
          { h: "Keep doing", items: keep, tone: "bg-lilac" },
          { h: "Change next time", items: change, tone: "bg-sun" },
        ].map((col, ci) => (
          <div key={col.h} className={`rounded-xl p-3.5 ${col.tone}`}>
            <p className="text-xs font-bold uppercase tracking-wider text-ink">
              {col.h}
            </p>
            <ul className="mt-2 grid gap-2">
              {col.items.map((t, k) => (
                <li
                  key={t}
                  className="rounded-lg bg-white p-2.5 text-[13px] font-medium leading-snug text-ink transition-[opacity,rotate] duration-500 ease-[var(--ease-out-expo)]"
                  style={{
                    opacity: on ? 1 : 0,
                    rotate: on ? "0deg" : k % 2 ? "3deg" : "-3deg",
                    transitionDelay: on
                      ? `${200 + (ci * 2 + k) * 200}ms`
                      : "0ms",
                  }}
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-sm text-white transition-opacity duration-500"
        style={{ opacity: on ? 1 : 0, transitionDelay: on ? "1100ms" : "0ms" }}
      >
        <span>Load time since launch</span>
        <span className="font-mono font-bold text-sun">3.4s → 1.2s</span>
      </div>
    </div>
  );
}

const MOCKS: Record<Id, (p: { on: boolean }) => React.ReactNode> = {
  quality: QualityMock,
  partner: PartnerMock,
  purpose: PurposeMock,
  improve: ImproveMock,
};

/**
 * /about: our values, each shown as the thing you'd actually see from us.
 * Tabs cycle on their own while the section is on screen, until a tab is
 * picked.
 */
export function AboutValues({ label }: { label: string }) {
  const uid = useId();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [seen, setSeen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // `active` restarts the timer after every step (manual or automatic).
  // biome-ignore lint/correctness/useExhaustiveDependencies: see above.
  useEffect(() => {
    if (!auto || !seen || reducedMotion()) return;
    const id = window.setTimeout(
      () => setActive((a) => (a + 1) % VALUES.length),
      STEP_MS,
    );
    return () => window.clearTimeout(id);
  }, [auto, seen, active]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? -1
          : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + VALUES.length) % VALUES.length;
    pick(n);
    tabs.current[n]?.focus();
  };

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="How we work" />
            <h2
              className="display mt-5 max-w-[14ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              Values, shown not told
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-2 sm:text-lg">
            Anyone can list values. Here is what each of ours looks like from
            your side of the project.
          </p>
        </div>

        <div ref={box} className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div
            role="tablist"
            aria-label="Our values"
            aria-orientation="vertical"
            className="grid grid-cols-2 gap-2 lg:col-span-5 lg:grid-cols-1"
          >
            {VALUES.map((v, i) => {
              const on = i === active;
              return (
                <button
                  key={v.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${v.id}`}
                  aria-selected={on}
                  aria-controls={`${uid}-panel`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => pick(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`group relative cursor-pointer overflow-hidden rounded-[1.25rem] p-4 text-left transition-colors duration-500 sm:p-6 lg:rounded-[1.5rem] ${
                    on
                      ? "bg-ultra text-white"
                      : "bg-white text-ink ring-1 ring-ink/10 hover:bg-lilac"
                  }`}
                >
                  <span className="flex flex-col gap-2 lg:flex-row lg:items-baseline lg:gap-4">
                    <span
                      className={`font-mono text-xs ${on ? "text-sun" : "text-ink-2"}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-display text-base font-black uppercase leading-none tracking-[-0.02em] sm:text-xl lg:text-2xl">
                        {v.title}
                      </span>
                      <span
                        className={`mt-2 hidden text-[0.95rem] leading-relaxed lg:block ${on ? "text-white/90" : "text-ink-2"}`}
                      >
                        {v.line}
                      </span>
                    </span>
                  </span>
                  {on && auto && seen && (
                    <span
                      aria-hidden="true"
                      key={`p-${active}`}
                      className="av-progress absolute inset-x-0 bottom-0 h-1 origin-left bg-sun"
                      style={{ animationDuration: `${STEP_MS}ms` }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`${uid}-panel`}
            aria-labelledby={`${uid}-tab-${VALUES[active].id}`}
            className="relative rounded-[2rem] bg-lilac p-4 sm:p-8 lg:col-span-7"
          >
            <p className="mb-2 text-sm text-ink-2 lg:hidden">
              {VALUES[active].line}
            </p>
            <p className="mb-4 text-base font-semibold leading-snug text-ink sm:mb-6 sm:text-lg">
              {VALUES[active].proof}
            </p>
            <div className="grid">
              {VALUES.map((v, i) => {
                const Mock = MOCKS[v.id];
                const on = i === active;
                return (
                  <div
                    key={v.id}
                    aria-hidden={!on}
                    className={`[grid-area:1/1] transition-[opacity,translate] duration-500 ease-[var(--ease-out-expo)] ${
                      on
                        ? "opacity-100"
                        : "pointer-events-none translate-y-3 opacity-0"
                    }`}
                  >
                    <Mock on={on} />
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-ink-2">
              Illustrative example of our process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
