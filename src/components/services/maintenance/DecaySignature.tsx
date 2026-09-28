"use client";

import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/lib/gsap";

const MONTHS = 12;

type Side = "alone" | "ours";

/** Illustrative drift over a year; rounded, not a benchmark. */
const MODEL = {
  health: (m: number, s: Side) =>
    s === "ours" ? 96 + Math.min(2, m * 0.25) : Math.max(22, 96 - m * 6.2),
  deps: (m: number, s: Side) =>
    s === "ours" ? (m % 3 === 1 ? 2 : 0) : Math.round(3 + m * 5.4),
  vulns: (m: number, s: Side) =>
    s === "ours" ? 0 : Math.floor(m * 0.7 + Math.max(0, m - 6) * 0.8),
  load: (m: number, s: Side) =>
    s === "ours" ? Math.max(1.0, 1.5 - m * 0.04) : 1.5 + m * 0.14,
};

const EVENTS: Record<Side, { m: number; text: string; bad?: boolean }[]> = {
  alone: [
    { m: 2, text: "Payment SDK deprecated. Warnings ignored.", bad: true },
    {
      m: 4,
      text: "SSL certificate expired. Site down for 6 hours.",
      bad: true,
    },
    { m: 6, text: "Critical vulnerability found in a dependency.", bad: true },
    { m: 8, text: "Checkout now takes 3s on mobile.", bad: true },
    { m: 10, text: "Server runtime reaches end-of-life.", bad: true },
    { m: 12, text: "Quote for a full rewrite: $60k.", bad: true },
  ],
  ours: [
    { m: 1, text: "27 updates applied, all tests green." },
    { m: 3, text: "SSL auto-renewed. Nobody noticed, as it should be." },
    { m: 6, text: "Critical vulnerability patched within 24 hours." },
    { m: 7, text: "Speed tuning: checkout 0.4s faster." },
    { m: 10, text: "Runtime upgraded ahead of end-of-life." },
    { m: 12, text: "11 improvements shipped this year." },
  ],
};

function Ring({ value, tone }: { value: number; tone: string }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <svg
      viewBox="0 0 128 128"
      className="h-28 w-28 shrink-0 -rotate-90 sm:h-32 sm:w-32"
      aria-hidden="true"
    >
      <circle
        cx="64"
        cy="64"
        r={r}
        fill="none"
        strokeWidth="12"
        className="stroke-ink/10"
      />
      <circle
        cx="64"
        cy="64"
        r={r}
        fill="none"
        strokeWidth="12"
        strokeLinecap="round"
        className={`${tone} transition-[stroke-dashoffset,stroke] duration-500`}
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value / 100)}
      />
    </svg>
  );
}

function Card({ side, m }: { side: Side; m: number }) {
  const ours = side === "ours";
  const health = Math.round(MODEL.health(m, side));
  const low = health < 60;
  const events = EVENTS[side]
    .filter((e) => e.m <= m)
    .slice(-3)
    .reverse();
  const stats = [
    { k: "Outdated packages", v: MODEL.deps(m, side), bad: !ours && m > 2 },
    {
      k: "Known vulnerabilities",
      v: MODEL.vulns(m, side),
      bad: !ours && m > 3,
    },
    {
      k: "Load time",
      v: `${MODEL.load(m, side).toFixed(1)}s`,
      bad: !ours && m > 5,
    },
  ];
  return (
    <div
      className={`flex flex-col rounded-[2rem] p-5 transition-[box-shadow] duration-700 sm:p-7 ${
        ours
          ? "bg-white ring-2 ring-ultra shadow-[0_30px_70px_-40px_rgba(59,43,255,0.7)]"
          : "bg-white ring-1 ring-ink/10"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-xl font-black uppercase leading-none tracking-[-0.02em] text-ink sm:text-2xl">
          {ours ? "Maintained by us" : "Left alone"}
        </p>
        <span
          className={`rounded-full px-3 py-1 font-mono text-[11px] font-bold ${
            ours
              ? "bg-ultra text-white"
              : low
                ? "bg-plasma text-ink"
                : "bg-frost text-ink"
          }`}
        >
          {ours
            ? "Healthy"
            : low
              ? "At risk"
              : health < 85
                ? "Slipping"
                : "Fine, for now"}
        </span>
      </div>

      <div className="mt-6 flex items-center gap-5">
        <div className="relative">
          <Ring
            value={health}
            tone={ours ? "stroke-ultra" : low ? "stroke-plasma" : "stroke-sun"}
          />
          <p
            className="absolute inset-0 grid place-items-center font-display text-3xl font-black tabular-nums text-ink"
            style={{ fontVariationSettings: '"wdth" 108' }}
          >
            {health}
          </p>
        </div>
        <dl className="grid flex-1 gap-2">
          {stats.map((s) => (
            <div
              key={s.k}
              className="flex items-baseline justify-between gap-3 border-b border-ink/10 pb-2 text-sm"
            >
              <dt className="text-ink-2">{s.k}</dt>
              <dd
                className={`font-mono font-bold tabular-nums transition-colors duration-500 ${s.bad ? "text-[#C4380D]" : "text-ink"}`}
              >
                {s.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="label mt-6 text-ink-2">What happened</p>
      <ul className="mt-3 grid min-h-[9.5rem] content-start gap-2">
        {events.length === 0 && (
          <li className="text-sm text-ink-2">Launch day. Everything works.</li>
        )}
        {events.map((e) => (
          <li
            key={`${side}-${e.m}`}
            className={`sx-swap flex gap-3 rounded-xl px-3 py-2.5 text-sm ${
              e.bad ? "bg-plasma/15 text-ink" : "bg-ultra/[0.07] text-ink"
            }`}
          >
            <span className="shrink-0 font-mono text-xs font-bold text-ink-2">
              M{e.m}
            </span>
            <span>{e.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Maintenance signature: the same product over twelve months, left alone vs
 * maintained. Plays through the year once in view; scrub or replay any time.
 */
export function DecaySignature() {
  const [m, setM] = useState(0);
  const [playing, setPlaying] = useState(false);
  const raf = useRef(0);
  const box = useRef<HTMLDivElement>(null);
  const mRef = useRef(0);
  useEffect(() => {
    mRef.current = m;
  }, [m]);

  const play = () => {
    cancelAnimationFrame(raf.current);
    if (reducedMotion()) {
      setM(MONTHS);
      return;
    }
    const from = mRef.current >= MONTHS ? 0 : mRef.current;
    const t0 = performance.now();
    setPlaying(true);
    const tick = (now: number) => {
      const next = Math.min(MONTHS, from + (now - t0) / 650);
      setM(Math.floor(next));
      if (next < MONTHS) raf.current = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    raf.current = requestAnimationFrame(tick);
  };
  const pause = () => {
    cancelAnimationFrame(raf.current);
    setPlaying(false);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: start once on first view.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        play();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div ref={box}>
      {/* Timeline */}
      <div className="flex flex-wrap items-center gap-4 rounded-[1.75rem] bg-white p-4 ring-1 ring-ink/10 sm:p-5">
        <button
          type="button"
          onClick={() => (playing ? pause() : play())}
          aria-label={
            playing
              ? "Pause"
              : m >= MONTHS
                ? "Replay the year"
                : "Play the year"
          }
          className="grid h-12 w-12 shrink-0 cursor-pointer place-items-center rounded-full bg-ultra text-white transition-colors duration-500 hover:bg-ink"
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M3 2h3v10H3zM8 2h3v10H8z" fill="currentColor" />
            </svg>
          ) : m >= MONTHS ? (
            <span aria-hidden="true" className="text-lg">
              ↻
            </span>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M3 1.5v11l9-5.5z" fill="currentColor" />
            </svg>
          )}
        </button>
        <div className="min-w-0 flex-1">
          <label
            htmlFor="decay-month"
            className="flex items-baseline justify-between gap-3"
          >
            <span className="font-semibold text-ink">
              {m === 0 ? "Launch day" : `Month ${m}`}
            </span>
            <span className="font-mono text-xs text-ink-2">drag to scrub</span>
          </label>
          <input
            id="decay-month"
            type="range"
            min={0}
            max={MONTHS}
            step={1}
            value={m}
            onChange={(e) => {
              pause();
              setM(Number(e.target.value));
            }}
            aria-valuetext={m === 0 ? "Launch day" : `Month ${m}`}
            className="sx-range mt-2.5 w-full"
            style={{ ["--p" as string]: `${(m / MONTHS) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:gap-8">
        <Card side="alone" m={m} />
        <Card side="ours" m={m} />
      </div>
      <p className="mt-4 px-1 text-sm leading-relaxed text-ink-2">
        Illustrative. These are the kinds of problems unmaintained software runs
        into, usually at the worst moment.
      </p>
      <p className="sr-only" aria-live="polite">
        {m === MONTHS
          ? `After a year: left alone, health ${Math.round(MODEL.health(m, "alone"))} out of 100; maintained, ${Math.round(MODEL.health(m, "ours"))}.`
          : ""}
      </p>
    </div>
  );
}
