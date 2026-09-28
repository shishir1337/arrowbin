"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/lib/gsap";

type Scenario = "clean" | "test" | "canary";

const SCENARIOS: { id: Scenario; label: string; commit: string }[] = [
  { id: "clean", label: "Clean release", commit: "feat: faster checkout page" },
  {
    id: "test",
    label: "A test fails",
    commit: "fix: tax rounding on invoices",
  },
  { id: "canary", label: "Bad release", commit: "perf: new search index" },
];

const STEPS = [
  { id: "build", label: "Build", ms: 1100 },
  { id: "test", label: "Tests", ms: 1800 },
  { id: "scan", label: "Security scan", ms: 900 },
  { id: "preview", label: "Preview", ms: 900 },
  { id: "canary", label: "Canary rollout", ms: 2600 },
  { id: "live", label: "Live", ms: 400 },
] as const;

const TESTS = 248;

/** When each step starts (ms into the run). */
const STARTS = STEPS.reduce<number[]>((a, _, i) => {
  a.push(i === 0 ? 0 : a[i - 1] + STEPS[i - 1].ms);
  return a;
}, []);

type Status = "wait" | "run" | "ok" | "fail" | "skip" | "rollback";

/** Seconds shown on the fake clock per real millisecond. */
const CLOCK = 0.03;

/**
 * Cloud signature: watch a release go out through a CI/CD pipeline. Three
 * scenarios show what automation buys you: a clean deploy, a failing test that
 * never reaches production, and a bad release caught by the canary and rolled
 * back automatically.
 */
export function PipelineSignature() {
  const [sc, setSc] = useState<Scenario>("clean");
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);
  const raf = useRef(0);
  const box = useRef<HTMLDivElement>(null);

  const starts = STARTS;
  const failAt =
    sc === "test"
      ? starts[1] + STEPS[1].ms * 0.7
      : sc === "canary"
        ? starts[4] + STEPS[4].ms * 0.55
        : Number.POSITIVE_INFINITY;
  const end = Math.min(
    starts[STEPS.length - 1] + STEPS[STEPS.length - 1].ms,
    failAt + (sc === "canary" ? 900 : 0),
  );

  const play = useCallback((s: Scenario) => {
    cancelAnimationFrame(raf.current);
    setSc(s);
    const stopAt =
      s === "clean"
        ? STARTS[5] + STEPS[5].ms
        : s === "test"
          ? STARTS[1] + STEPS[1].ms * 0.7
          : STARTS[4] + STEPS[4].ms * 0.55 + 900;
    if (reducedMotion()) {
      setT(stopAt);
      return;
    }
    setT(0);
    setRunning(true);
    const t0 = performance.now();
    const tick = (now: number) => {
      const el = Math.min(stopAt, now - t0);
      setT(el);
      if (el < stopAt) raf.current = requestAnimationFrame(tick);
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
        play("clean");
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [play]);

  const status = (i: number): Status => {
    const s0 = starts[i];
    const s1 = s0 + STEPS[i].ms;
    const failed = t >= failAt;
    if (sc === "test" && failed) {
      if (i < 1) return "ok";
      if (i === 1) return "fail";
      return "skip";
    }
    if (sc === "canary" && failed) {
      if (i < 4) return "ok";
      if (i === 4) return "rollback";
      return "skip";
    }
    if (t >= s1) return "ok";
    if (t >= s0) return "run";
    return "wait";
  };

  const prog = (i: number) =>
    Math.max(0, Math.min(1, (t - starts[i]) / STEPS[i].ms));
  const testsPassed =
    sc === "test" && t >= failAt
      ? Math.round(TESTS * 0.7)
      : Math.round(TESTS * prog(1));
  // Canary traffic: 10 → 50 → 100%; in a bad release, errors spike then it rolls back.
  const cp = prog(4);
  const traffic =
    (sc === "canary" && t >= failAt) || cp <= 0
      ? 0
      : cp < 0.33
        ? 10
        : cp < 0.66
          ? 50
          : cp > 0
            ? 100
            : 0;
  const errRate =
    sc === "canary" && cp > 0.2 ? Math.min(9.4, (cp - 0.2) * 30) : 0.1;

  const done = !running && t > 0;
  const outcome =
    sc === "clean"
      ? {
          tone: "bg-ultra text-white",
          title: "Live for everyone",
          text: "Tested, scanned, previewed and rolled out gradually. Nobody had to stay up for it.",
        }
      : sc === "test"
        ? {
            tone: "bg-sun text-ink",
            title: "Stopped before production",
            text: "A failing test blocked the release. Customers never saw the bug; the developer got a message with the exact test.",
          }
        : {
            tone: "bg-plasma text-ink",
            title: "Rolled back automatically",
            text: "Errors rose for the 10% of users on the new version. The pipeline switched them back in seconds and paged the team.",
          };

  const clock = Math.round(Math.min(t, end) * CLOCK);
  const mm = Math.floor(clock / 60);
  const ss = String(clock % 60).padStart(2, "0");

  return (
    <div ref={box} className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      {/* Controls */}
      <div className="flex flex-col gap-4 lg:col-span-4">
        <p className="label px-1 text-ink-2">Pick a release</p>
        <ul className="grid gap-3 max-lg:grid-cols-3 max-lg:gap-2">
          {SCENARIOS.map((s) => {
            const on = s.id === sc;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => play(s.id)}
                  className={`flex h-full w-full cursor-pointer flex-col gap-1 rounded-[1.3rem] p-3 text-left transition-[background-color,box-shadow,translate] duration-500 ease-[var(--ease-out-expo)] sm:p-4 ${
                    on
                      ? "bg-ink text-white shadow-[0_20px_40px_-26px_rgba(14,11,36,0.8)] lg:translate-x-1"
                      : "bg-white text-ink ring-1 ring-ink/10 hover:ring-ink/30"
                  }`}
                >
                  <span className="text-sm font-semibold sm:text-base">
                    {s.label}
                  </span>
                  <span
                    className={`font-mono text-[11px] max-sm:hidden ${on ? "text-white/80" : "text-ink-2"}`}
                  >
                    {s.commit}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          onClick={() => play(sc)}
          disabled={running}
          className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-ultra px-6 font-semibold text-white transition-[background-color,opacity] duration-500 hover:bg-ink disabled:cursor-default disabled:opacity-60"
        >
          <span aria-hidden="true">↻</span>{" "}
          {running ? "Deploying…" : "Run it again"}
        </button>

        <div
          className={`mt-auto rounded-[1.5rem] p-5 transition-[opacity,translate,background-color] duration-700 ease-[var(--ease-out-expo)] sm:p-6 ${outcome.tone} ${
            done ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
          aria-live="polite"
        >
          <p className="font-display text-xl font-black uppercase leading-none tracking-[-0.02em]">
            {done ? outcome.title : ""}
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            {done ? outcome.text : ""}
          </p>
        </div>
      </div>

      {/* Pipeline */}
      <div className="relative overflow-hidden rounded-[2rem] bg-white p-5 ring-1 ring-ink/10 sm:p-8 lg:col-span-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden="true"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lilac font-mono text-xs font-bold text-ink"
            >
              SK
            </span>
            <div className="min-w-0">
              <p className="truncate font-mono text-sm font-semibold text-ink">
                {SCENARIOS.find((s) => s.id === sc)?.commit}
              </p>
              <p className="text-xs text-ink-2">pushed to main · #a41f9c2</p>
            </div>
          </div>
          <p className="rounded-full bg-frost px-3 py-1.5 font-mono text-sm tabular-nums text-ink">
            ⏱ {mm}m {ss}s
          </p>
        </div>

        <ol className="mt-6 grid gap-2.5">
          {STEPS.map((s, i) => {
            const st = status(i);
            const p = st === "run" ? prog(i) : st === "ok" ? 1 : 0;
            return (
              <li
                key={s.id}
                className={`relative overflow-hidden rounded-2xl transition-colors duration-500 ${
                  st === "fail"
                    ? "bg-sun"
                    : st === "rollback"
                      ? "bg-plasma"
                      : st === "skip"
                        ? "bg-frost/60"
                        : "bg-frost"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 bg-ultra/10"
                  style={{ width: `${p * 100}%` }}
                />
                <div className="relative flex items-center gap-3 px-4 py-3">
                  <span
                    aria-hidden="true"
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors duration-500 ${
                      st === "ok"
                        ? "bg-ultra text-white"
                        : st === "run"
                          ? "bg-sun text-ink"
                          : st === "fail" || st === "rollback"
                            ? "bg-ink text-white"
                            : "bg-white text-ink-2"
                    }`}
                  >
                    {st === "ok" ? (
                      "✓"
                    ) : st === "fail" ? (
                      "✕"
                    ) : st === "rollback" ? (
                      "↺"
                    ) : st === "run" ? (
                      <span className="ai-dot" />
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span
                    className={`font-semibold ${st === "skip" || st === "wait" ? "text-ink-2" : "text-ink"}`}
                  >
                    {s.label}
                  </span>
                  <span className="ml-auto text-right font-mono text-xs text-ink tabular-nums">
                    {s.id === "test" && st !== "wait" && st !== "skip"
                      ? st === "fail"
                        ? `1 failed · ${testsPassed} passed`
                        : `${testsPassed}/${TESTS} passed`
                      : s.id === "scan" && st === "ok"
                        ? "0 vulnerabilities"
                        : s.id === "preview" && st === "ok"
                          ? "pr-512.preview.app"
                          : s.id === "canary" && (st === "run" || st === "ok")
                            ? `${traffic}% of traffic`
                            : s.id === "canary" && st === "rollback"
                              ? "rolled back"
                              : s.id === "live" && st === "ok"
                                ? "100% · healthy"
                                : st === "skip"
                                  ? "skipped"
                                  : ""}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Canary health */}
        <div className="mt-5 grid gap-3 rounded-2xl bg-frost p-4 sm:grid-cols-2 sm:p-5">
          <div>
            <p className="label text-ink-2">New version traffic</p>
            <div className="mt-2 flex h-3 overflow-hidden rounded-full bg-white">
              <span
                className="h-full bg-ultra transition-[width] duration-700 ease-[var(--ease-out-expo)]"
                style={{ width: `${traffic}%` }}
              />
            </div>
            <p className="mt-1.5 font-mono text-xs tabular-nums text-ink">
              {traffic}% new · {100 - traffic}% current
            </p>
          </div>
          <div>
            <p className="label text-ink-2">Error rate</p>
            <div className="mt-2 flex h-3 overflow-hidden rounded-full bg-white">
              <span
                className={`h-full transition-[width,background-color] duration-300 ${errRate > 2 ? "bg-plasma" : "bg-ultra"}`}
                style={{ width: `${Math.max(2, (errRate / 10) * 100)}%` }}
              />
            </div>
            <p className="mt-1.5 font-mono text-xs tabular-nums text-ink">
              {errRate.toFixed(1)}% · limit 2.0%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
