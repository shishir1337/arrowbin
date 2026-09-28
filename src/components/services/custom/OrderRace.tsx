"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { reducedMotion } from "@/lib/gsap";

/** The manual way: minutes per step, as most small teams do it today. */
const MANUAL = [
  { t: "Read the WhatsApp message", min: 2, tool: "WhatsApp" },
  { t: "Retype it into the order sheet", min: 4, tool: "Sheets", typo: true },
  { t: "Check stock in another sheet", min: 3, tool: "Sheets" },
  { t: "Fix the typo: 100 → 10 units", min: 5, tool: "Rework", rework: true },
  { t: "Make the invoice in Word", min: 6, tool: "Word" },
  { t: "Email the invoice", min: 3, tool: "Email" },
  { t: "Add it to the courier list", min: 4, tool: "Sheets" },
  { t: "Tell accounts it's paid", min: 2, tool: "WhatsApp" },
];
const MANUAL_MIN = MANUAL.reduce((s, x) => s + x.min, 0);

/** The platform way: what happens automatically, with a timestamp (seconds). */
const AUTO = [
  { t: "Order received", s: 0.2 },
  { t: "Stock reserved", s: 0.6 },
  { t: "Invoice created & emailed", s: 1.3 },
  { t: "Courier booked, label printed", s: 1.9 },
  { t: "Accounts updated", s: 2.4 },
];

/** Race speed: simulated minutes per real second. */
const SPEED = 3.8;
const RACE_MS = (MANUAL_MIN / SPEED) * 1000;

/** Orders that keep arriving while the race runs. */
const FEED = [
  "2 × Toner cartridge",
  "5 × A4 paper box",
  "1 × Office chair",
  "12 × Notebook pack",
  "3 × Whiteboard marker set",
  "4 × Desk lamp",
];

const fmtMin = (m: number) => {
  const mm = Math.floor(m);
  const ss = Math.floor((m - mm) * 60);
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
};

/**
 * Custom Software signature: "one order, two ways". The same customer order
 * races through a typical manual process and through a custom platform. The
 * platform finishes in seconds and keeps clearing new orders while the manual
 * lane is still working. A slider turns it into hours for your business.
 */
export function OrderRace() {
  const id = useId();
  const [t, setT] = useState(0); // real ms into the race
  const [running, setRunning] = useState(false);
  const [perDay, setPerDay] = useState(30);
  const raf = useRef(0);
  const box = useRef<HTMLDivElement>(null);

  const race = useCallback(() => {
    cancelAnimationFrame(raf.current);
    if (reducedMotion()) {
      setT(RACE_MS);
      return;
    }
    setT(0);
    setRunning(true);
    const t0 = performance.now();
    const tick = (now: number) => {
      const el = Math.min(RACE_MS, now - t0);
      setT(el);
      if (el < RACE_MS) raf.current = requestAnimationFrame(tick);
      else setRunning(false);
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        race();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [race]);

  // Manual lane progress (simulated minutes).
  const simMin = (t / 1000) * SPEED;
  let acc = 0;
  const manual = MANUAL.map((s) => {
    const start = acc;
    acc += s.min;
    const state = simMin >= acc ? "done" : simMin >= start ? "doing" : "todo";
    const p = Math.max(0, Math.min(1, (simMin - start) / s.min));
    return { ...s, state, p };
  });
  const manualDone = simMin >= MANUAL_MIN;

  // Platform lane: the first order finishes in 2.4s of real time; after that
  // a new order arrives about every simulated minute and clears instantly.
  const autoSec = t / 1000;
  const firstDone = autoSec >= AUTO[AUTO.length - 1].s;
  const firstAtMin = AUTO[AUTO.length - 1].s * SPEED;
  const cleared = firstDone
    ? 1 + Math.min(23, Math.floor(Math.max(0, simMin - firstAtMin) / 1.1))
    : 0;

  // Your numbers.
  const manualHours = (perDay * MANUAL_MIN * 5) / 60;
  const afterHours = (perDay * 0.5 * 5) / 60; // ~30s each for exceptions
  const saved = manualHours - afterHours;
  const people = saved / 40;

  return (
    <div ref={box} className="grid gap-6 xl:grid-cols-12 xl:gap-8">
      <div className="grid gap-4 md:grid-cols-2 xl:col-span-8">
        {/* Manual lane */}
        <div className="flex flex-col rounded-[2rem] bg-white p-5 ring-1 ring-ink/10 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="label text-ink-2">Today</p>
              <p className="mt-1.5 font-display text-xl font-black uppercase leading-none tracking-[-0.02em] text-ink">
                By hand
              </p>
            </div>
            <p
              className={`rounded-full px-3 py-1.5 font-mono text-sm font-bold tabular-nums transition-colors duration-500 ${
                manualDone ? "bg-plasma text-ink" : "bg-frost text-ink"
              }`}
            >
              {fmtMin(Math.min(simMin, MANUAL_MIN))}
            </p>
          </div>

          <div className="mt-4 rounded-2xl bg-frost p-3 font-mono text-xs leading-relaxed text-ink">
            <span className="font-bold">New customer · WhatsApp</span>
            <br />
            Hi! 10 boxes of A4 paper please, delivered to our main office.
            Thanks
          </div>

          <ol className="mt-4 grid gap-1.5">
            {manual.map((s) =>
              s.rework && s.state === "todo" ? null : (
                <li
                  key={s.t}
                  className={`relative overflow-hidden rounded-xl px-3 py-2 text-[13px] transition-colors duration-300 ${
                    s.state === "todo"
                      ? "text-ink-2"
                      : s.rework && s.state !== "todo"
                        ? "bg-plasma/15 text-ink"
                        : "bg-frost text-ink"
                  }`}
                >
                  {s.state === "doing" && (
                    <span
                      aria-hidden="true"
                      className={`absolute inset-y-0 left-0 ${s.rework ? "bg-plasma/25" : "bg-sun/50"}`}
                      style={{ width: `${s.p * 100}%` }}
                    />
                  )}
                  <span className="relative flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                        s.state === "done"
                          ? s.rework
                            ? "bg-plasma text-ink"
                            : "bg-ink text-white"
                          : s.state === "doing"
                            ? "bg-sun text-ink"
                            : "bg-white text-ink-2 ring-1 ring-ink/15"
                      }`}
                    >
                      {s.state === "done" ? (s.rework ? "!" : "✓") : ""}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-medium">
                      {s.t}
                    </span>
                    <span className="shrink-0 font-mono text-[11px] text-ink-2">
                      {s.min}m
                    </span>
                  </span>
                </li>
              ),
            )}
          </ol>
          <p
            className={`mt-auto pt-4 text-sm font-semibold transition-opacity duration-500 ${manualDone ? "opacity-100" : "opacity-0"}`}
          >
            One order done in {MANUAL_MIN} minutes, one typo caught late.
          </p>
        </div>

        {/* Platform lane */}
        <div className="relative flex flex-col overflow-hidden rounded-[2rem] bg-ultra p-5 text-white sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="label text-white/85">With your platform</p>
              <p className="mt-1.5 font-display text-xl font-black uppercase leading-none tracking-[-0.02em]">
                Built for you
              </p>
            </div>
            <p
              className={`rounded-full px-3 py-1.5 font-mono text-sm font-bold tabular-nums ${
                firstDone ? "bg-sun text-ink" : "bg-white/15 text-white"
              }`}
            >
              {firstDone ? "2.4s" : `${Math.min(autoSec, 2.4).toFixed(1)}s`}
            </p>
          </div>

          {/* App card */}
          <div className="mt-4 rounded-2xl bg-white p-4 text-ink shadow-[0_20px_40px_-24px_rgba(14,11,36,0.7)]">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold">Order #1042</p>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold transition-colors duration-500 ${
                  firstDone ? "bg-ultra text-white" : "bg-sun text-ink"
                }`}
              >
                {firstDone ? "Complete" : "Processing"}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-ink-2">
              10 × A4 paper box · Main office · via WhatsApp
            </p>
            <ul className="mt-3 grid gap-1.5">
              {AUTO.map((a) => {
                const on = autoSec >= a.s;
                return (
                  <li
                    key={a.t}
                    className={`flex items-center gap-2.5 text-[13px] transition-[color,translate] duration-300 ${
                      on
                        ? "translate-x-0 text-ink"
                        : "-translate-x-1 text-ink-2"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold transition-colors duration-300 ${
                        on ? "bg-ultra text-white" : "bg-frost text-ink-2"
                      }`}
                    >
                      {on ? "✓" : ""}
                    </span>
                    <span className="flex-1 font-medium">{a.t}</span>
                    <span className="font-mono text-[11px] text-ink-2">
                      {a.s.toFixed(1)}s
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Orders cleared meanwhile */}
          <div className="mt-4">
            <div className="flex items-baseline justify-between">
              <p className="label text-white/85">Orders cleared</p>
              <p
                className="font-display text-4xl font-black leading-none tabular-nums"
                style={{ fontVariationSettings: '"wdth" 110' }}
              >
                {cleared}
              </p>
            </div>
            <ul
              className="mt-3 grid grid-cols-6 gap-1.5 sm:grid-cols-8"
              aria-hidden="true"
            >
              {Array.from({ length: 24 }, (_, i) => (
                <li
                  // biome-ignore lint/suspicious/noArrayIndexKey: fixed slots.
                  key={i}
                  className={`h-5 rounded-md transition-[background-color,scale] duration-300 ${
                    i < cleared ? "scale-100 bg-sun" : "scale-90 bg-white/12"
                  }`}
                />
              ))}
            </ul>
          </div>
          {cleared > 1 && (
            <ul className="mt-4 grid gap-1.5" aria-hidden="true">
              {Array.from({ length: Math.min(3, cleared - 1) }, (_, k) => {
                const n = cleared - k;
                return (
                  <li
                    key={n}
                    className="sx-swap flex items-center gap-2.5 rounded-xl bg-white/10 px-3 py-2 text-[13px]"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sun" />
                    <span className="font-mono text-xs font-bold">
                      #{1041 + n}
                    </span>
                    <span className="min-w-0 flex-1 truncate">
                      {FEED[n % FEED.length]}
                    </span>
                    <span className="font-mono text-[11px] text-white/85">
                      done
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
          <p
            className={`mt-auto pt-4 text-sm font-semibold transition-opacity duration-500 ${manualDone ? "opacity-100" : "opacity-0"}`}
          >
            {cleared} orders done while the first was still being typed up.
          </p>
        </div>
      </div>

      {/* Your numbers */}
      <div className="grid gap-4 md:grid-cols-2 md:items-start xl:col-span-4 xl:flex xl:flex-col xl:items-stretch">
        <button
          type="button"
          onClick={race}
          disabled={running}
          className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-ink md:col-span-2 xl:col-span-1 px-6 font-semibold text-white transition-[background-color,opacity] duration-500 hover:bg-ultra disabled:cursor-default disabled:opacity-60"
        >
          <span aria-hidden="true">↻</span>
          {running ? "Racing…" : "Race again"}
        </button>

        <div className="rounded-[1.75rem] bg-white p-5 ring-1 ring-ink/10 sm:p-6">
          <label
            htmlFor={`${id}-orders`}
            className="flex items-baseline justify-between gap-3"
          >
            <span className="font-semibold text-ink">Your orders per day</span>
            <span
              className="font-display text-2xl font-black tabular-nums text-ultra"
              style={{ fontVariationSettings: '"wdth" 108' }}
            >
              {perDay}
            </span>
          </label>
          <input
            id={`${id}-orders`}
            type="range"
            min={5}
            max={200}
            step={5}
            value={perDay}
            onChange={(e) => setPerDay(Number(e.target.value))}
            aria-valuetext={`${perDay} orders per day`}
            className="sx-range mt-3 w-full"
            style={{ ["--p" as string]: `${((perDay - 5) / 195) * 100}%` }}
          />
          <dl className="mt-5 grid grid-cols-2 gap-3" aria-live="polite">
            <div className="rounded-2xl bg-frost p-4">
              <dt className="text-xs font-semibold text-ink-2">By hand</dt>
              <dd
                className="mt-1 font-display text-2xl font-black leading-none tabular-nums text-[#c0144f]"
                style={{ fontVariationSettings: '"wdth" 108' }}
              >
                {Math.round(manualHours)}h
              </dd>
              <dd className="mt-1 text-[11px] text-ink-2">per week</dd>
            </div>
            <div className="rounded-2xl bg-frost p-4">
              <dt className="text-xs font-semibold text-ink-2">
                With a platform
              </dt>
              <dd
                className="mt-1 font-display text-2xl font-black leading-none tabular-nums text-ultra"
                style={{ fontVariationSettings: '"wdth" 108' }}
              >
                {Math.max(1, Math.round(afterHours))}h
              </dd>
              <dd className="mt-1 text-[11px] text-ink-2">exceptions only</dd>
            </div>
          </dl>
          <p className="mt-4 rounded-2xl bg-sun p-4 text-sm font-semibold leading-snug text-ink">
            {people >= 1
              ? `That's about ${people >= 1.5 ? Math.round(people) : 1} full-time ${people >= 1.5 ? "people" : "person"} back on work that grows the business.`
              : `That's ${Math.round(saved)} hours a week back for work that grows the business.`}
          </p>
        </div>
        <p className="px-1 text-sm leading-relaxed text-ink-2">
          Step timings are typical for a small team handling orders by hand. In
          discovery we time your real process, then build around it.
        </p>
      </div>
    </div>
  );
}
