"use client";

import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/lib/gsap";

type Mode = "wire" | "final";

const TXNS = [
  { who: "Northwind Ltd", what: "Invoice #1042", amt: "+$4,200", c: "bg-sun" },
  { who: "Figma", what: "Subscription", amt: "−$45", c: "bg-plasma" },
  { who: "Payroll", what: "12 people", amt: "−$18,600", c: "bg-lilac" },
];

/** Pinned design notes (percent positions on the screen). */
const NOTES = [
  { left: 44, top: 11, n: 1, t: "Greeting sets context in one line" },
  { left: 36, top: 52, n: 2, t: "One primary action, highest contrast" },
  { left: 62, top: 80, n: 3, t: "Amounts right-aligned, tabular figures" },
];

/**
 * One app screen, drawn twice with the same markup: as a wireframe and as the
 * finished UI. Only colours change between the two, so they line up exactly
 * under the divider.
 */
function Screen({ mode }: { mode: Mode }) {
  const w = mode === "wire";
  const box = w
    ? "bg-white outline-2 -outline-offset-2 outline-dashed outline-ink/25"
    : "";
  const txt = w ? "text-ink/65" : "text-ink";
  const sub = w ? "text-ink/60" : "text-ink-2";
  const ph = (fill: string) =>
    w
      ? "bg-[linear-gradient(to_top_right,transparent_calc(50%-1px),rgba(14,11,36,.18)_50%,transparent_calc(50%+1px)),linear-gradient(to_top_left,transparent_calc(50%-1px),rgba(14,11,36,.18)_50%,transparent_calc(50%+1px))] bg-frost"
      : fill;
  return (
    <div className="flex h-full bg-frost">
      {/* sidebar */}
      <aside
        className={`hidden w-[22%] shrink-0 flex-col gap-2 p-4 md:flex ${w ? "bg-white outline-2 -outline-offset-2 outline-dashed outline-ink/20" : "bg-ink text-white"}`}
      >
        <span className="flex items-center gap-2 pb-3 font-bold">
          <span
            className={`h-6 w-6 rounded-lg ${w ? "bg-ink/15" : "bg-ultra"}`}
          />
          <span className={w ? "text-ink/65" : ""}>Ledger</span>
        </span>
        {["Overview", "Payments", "Cards", "Reports", "Team"].map((l, i) => (
          <span
            key={l}
            className={`rounded-xl px-3 py-2 text-sm ${
              i === 0
                ? w
                  ? "bg-ink/10 text-ink/60"
                  : "bg-white/12 font-semibold"
                : w
                  ? "text-ink/60"
                  : "text-white/70"
            }`}
          >
            {l}
          </span>
        ))}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:gap-4 sm:p-5">
        {/* header */}
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className={`truncate text-lg font-bold sm:text-xl ${txt}`}>
              Good morning, Sam
            </p>
            <p className={`text-xs sm:text-sm ${sub}`}>
              Here&apos;s your business today
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span
              className={`hidden h-9 w-44 items-center rounded-full px-4 text-xs lg:flex ${
                w
                  ? "bg-white text-ink/60 outline-1 outline-dashed outline-ink/30"
                  : "bg-white text-ink-2 shadow-sm"
              }`}
            >
              Search payments
            </span>
            <span
              className={`grid h-9 w-9 place-items-center rounded-full text-xs font-bold ${
                w
                  ? "bg-white text-ink/60 outline-1 outline-dashed outline-ink/30"
                  : "bg-sun text-ink"
              }`}
            >
              3
            </span>
            <span
              className={`h-9 w-9 shrink-0 rounded-full ${ph("bg-plasma")}`}
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-5 sm:gap-4">
          {/* balance */}
          <div
            className={`flex flex-col justify-between gap-4 rounded-2xl p-4 sm:col-span-3 sm:p-5 ${
              w ? box : "bg-ultra text-white"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className={`text-xs ${w ? "text-ink/60" : "text-white/80"}`}>
                Available balance
              </p>
              <span
                className={`rounded-full px-2.5 py-1 font-mono text-[11px] ${
                  w
                    ? "text-ink/60 outline-1 outline-dashed outline-ink/30"
                    : "bg-white/15 text-white"
                }`}
              >
                USD · Business
              </span>
            </div>
            <div className="flex items-end justify-between gap-3">
              <p
                className={`font-display text-3xl font-black tabular-nums leading-none sm:text-4xl ${w ? "text-ink/65" : ""}`}
              >
                $82,410
              </p>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                  w ? "bg-ink/10 text-ink/60" : "bg-sun text-ink"
                }`}
              >
                ▲ 12%
              </span>
            </div>
            <div className="flex justify-end gap-2">
              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  w
                    ? "bg-ink/15 text-ink/60"
                    : "bg-sun text-ink shadow-[0_8px_20px_-8px_rgba(255,210,63,0.9)]"
                }`}
              >
                Send money
              </span>
              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  w
                    ? "text-ink/60 outline-1 outline-dashed outline-ink/30"
                    : "bg-white/15"
                }`}
              >
                Request
              </span>
            </div>
          </div>
          {/* chart */}
          <div
            className={`flex flex-col gap-3 rounded-2xl p-4 sm:col-span-2 ${w ? box : "bg-white"}`}
          >
            <p className={`text-xs ${sub}`}>Cash flow, 6 months</p>
            <div className="flex h-20 items-end gap-1.5 sm:h-full sm:min-h-20">
              {[40, 62, 48, 78, 66, 92].map((h, i) => (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: fixed bars.
                  key={i}
                  className={`flex-1 rounded-md ${
                    w ? "bg-ink/12" : i === 5 ? "bg-plasma" : "bg-lilac"
                  }`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* transactions */}
        <div className={`rounded-2xl p-3 sm:p-4 ${w ? box : "bg-white"}`}>
          <div className="flex items-center justify-between px-1 pb-2">
            <p className={`text-xs ${sub}`}>Recent activity</p>
            <p
              className={`text-xs font-semibold ${w ? "text-ink/60" : "text-ultra"}`}
            >
              View all
            </p>
          </div>
          <ul className="grid gap-1">
            {TXNS.map((t) => (
              <li
                key={t.who}
                className="flex items-center gap-3 rounded-xl px-1 py-1.5"
              >
                <span className={`h-8 w-8 shrink-0 rounded-full ${ph(t.c)}`} />
                <span className="min-w-0">
                  <span
                    className={`block truncate text-sm font-semibold ${txt}`}
                  >
                    {t.who}
                  </span>
                  <span className={`block text-xs ${sub}`}>{t.what}</span>
                </span>
                <span
                  className={`ml-auto hidden rounded-full px-2.5 py-1 text-[11px] font-semibold sm:inline ${
                    w
                      ? "text-ink/60 outline-1 outline-dashed outline-ink/30"
                      : t.amt.startsWith("+")
                        ? "bg-ultra/10 text-ultra"
                        : "bg-frost text-ink-2"
                  }`}
                >
                  {t.amt.startsWith("+") ? "Received" : "Paid"}
                </span>
                <span
                  className={`w-24 text-right font-mono text-sm font-semibold tabular-nums ${
                    w
                      ? "text-ink/65"
                      : t.amt.startsWith("+")
                        ? "text-ultra"
                        : "text-ink"
                  }`}
                >
                  {t.amt}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * UI/UX signature: wireframe → finished screen. Drag anywhere on the screen
 * (or use the arrow keys) to move the divider; toggle the layout grid and
 * the design notes. Sweeps once on first view.
 */
export function FidelitySignature() {
  const [pos, setPos] = useState(40);
  const [grid, setGrid] = useState(false);
  const [notes, setNotes] = useState(true);
  const touched = useRef(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (reducedMotion()) return;
        // 40 → 88 → 14 → 40, eased.
        const keys = [40, 88, 14, 40];
        const seg = 1100;
        const t0 = performance.now() + 400;
        const tick = (now: number) => {
          if (touched.current) return;
          const t = Math.max(0, now - t0);
          const i = Math.min(keys.length - 2, Math.floor(t / seg));
          const p = Math.min(1, (t - i * seg) / seg);
          const k = p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2;
          setPos(keys[i] + (keys[i + 1] - keys[i]) * k);
          if (t < seg * (keys.length - 1)) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const stop = () => {
    touched.current = true;
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-ink-2">
          <span
            className={`transition-opacity duration-300 ${pos > 8 ? "opacity-100" : "opacity-40"}`}
          >
            ◧ Wireframe
          </span>
          <span className="h-px w-8 bg-ink/25" />
          <span
            className={`transition-opacity duration-300 ${pos < 92 ? "opacity-100" : "opacity-40"}`}
          >
            Final UI ◨
          </span>
        </p>
        <div className="flex gap-2">
          {[
            { on: grid, set: setGrid, label: "Layout grid" },
            { on: notes, set: setNotes, label: "Design notes" },
          ].map((t) => (
            <button
              key={t.label}
              type="button"
              aria-pressed={t.on}
              onClick={() => t.set(!t.on)}
              className={`inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors duration-500 ${
                t.on
                  ? "bg-ink text-white"
                  : "bg-white text-ink ring-1 ring-ink/15 hover:ring-ink/40"
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-2 w-2 rounded-full transition-colors duration-500 ${t.on ? "bg-sun" : "bg-ink/25"}`}
              />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={box}
        className="relative overflow-hidden rounded-[1.75rem] has-[.fs-range:focus-visible]:outline-3 has-[.fs-range:focus-visible]:outline-offset-4 has-[.fs-range:focus-visible]:outline-ultra bg-white p-2 shadow-[0_40px_80px_-50px_rgba(14,11,36,0.7)] ring-1 ring-ink/10 sm:p-3"
      >
        {/* browser chrome */}
        <div className="flex items-center gap-2 px-2 pb-2 sm:pb-3">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          </span>
          <span className="mx-auto rounded-full bg-frost px-4 py-1 font-mono text-[11px] text-ink-2">
            app.ledger.io
          </span>
        </div>

        <div
          className="relative overflow-hidden rounded-[1.25rem]"
          aria-hidden="true"
        >
          <Screen mode="final" />
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <Screen mode="wire" />
          </div>

          {/* grid overlay */}
          <div
            className={`pointer-events-none absolute inset-0 grid grid-cols-6 gap-3 px-4 transition-opacity duration-500 sm:grid-cols-12 sm:px-5 ${grid ? "opacity-100" : "opacity-0"}`}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed columns.
                key={i}
                className={`bg-plasma/[0.09] ${i >= 6 ? "max-sm:hidden" : ""}`}
              />
            ))}
          </div>

          {/* notes: only on the finished side */}
          {NOTES.map((n) => (
            <span
              key={n.n}
              style={{ left: `${n.left}%`, top: `${n.top}%` }}
              className={`pointer-events-none absolute z-10 hidden items-center gap-2 transition-[opacity,scale] duration-500 ease-[var(--ease-out-expo)] md:flex ${
                notes && n.left > pos
                  ? "scale-100 opacity-100"
                  : "scale-75 opacity-0"
              }`}
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-plasma font-mono text-xs font-bold text-ink ring-4 ring-white">
                {n.n}
              </span>
              <span className="whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                {n.t}
              </span>
            </span>
          ))}

          {/* divider */}
          <div
            className="pointer-events-none absolute inset-y-0 z-20 w-0"
            style={{ left: `${pos}%` }}
          >
            <span className="absolute inset-y-0 -left-px w-0.5 bg-ink" />
            <span className="absolute top-1/2 left-0 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-sun text-ink shadow-[0_10px_30px_-8px_rgba(14,11,36,0.6)] ring-4 ring-white">
              <svg
                width="22"
                height="14"
                viewBox="0 0 22 14"
                aria-hidden="true"
              >
                <path
                  d="M7 2 2 7l5 5M15 2l5 5-5 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* invisible range covering the screen: drag anywhere, arrow keys work */}
        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={pos}
          aria-label="Compare wireframe and final design"
          aria-valuetext={`${Math.round(pos)}% wireframe`}
          onPointerDown={stop}
          onKeyDown={stop}
          onChange={(e) => {
            stop();
            setPos(Number(e.target.value));
          }}
          className="fs-range absolute inset-0 z-30 h-full w-full cursor-ew-resize touch-pan-y opacity-0"
        />
      </div>
      <p className="sr-only">
        A finance dashboard shown half as a grey wireframe and half as the
        finished, coloured interface.
      </p>
    </div>
  );
}
