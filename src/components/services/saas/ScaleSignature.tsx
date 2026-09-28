"use client";

import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/lib/gsap";

type Build = "shortcut" | "arrowbin";

/** Slider runs on a log scale: 0 → 10 customers, 300 → 10,000. */
const STEPS = 300;
const toCustomers = (s: number) => Math.round(10 ** (1 + (s / STEPS) * 3));

/** Illustrative models. Round numbers, not a benchmark. */
const MODEL = {
  latency: (c: number, b: Build) =>
    b === "arrowbin" ? 120 + 28 * Math.log10(c) : 140 + c ** 1.08 * 0.22,
  errors: (c: number, b: Build) =>
    b === "arrowbin" ? 0.02 : Math.min(4.8, 0.05 + (c / 1000) ** 1.3 * 0.55),
  /** Infra cost per month. */
  cost: (c: number, b: Build) =>
    b === "arrowbin" ? 40 + 14 * c ** 0.62 : 40 + c * 1.35,
};

const ARPA = 49;

const MILESTONES = [
  {
    at: 10,
    ours: "One codebase, one database, tenant ID on every row. Cheap to run, ready to grow.",
    theirs: "One database per customer, copied by hand for each sign-up.",
  },
  {
    at: 100,
    ours: "Stripe subscriptions: trials, upgrades, proration and failed-payment retries.",
    theirs:
      "Invoices from a spreadsheet. Someone chases late payments by email.",
  },
  {
    at: 1000,
    ours: "Redis caching and background queues keep every page fast under load.",
    theirs: "Reports run on the live database. Pages slow to a crawl at 9am.",
  },
  {
    at: 4000,
    ours: "Read replicas, autoscaling and a CDN. Traffic spikes are a non-event.",
    theirs: "Peak-time outages. The team firefights instead of shipping.",
  },
  {
    at: 9000,
    ours: "SSO, audit logs and monitoring with alerts: what enterprise buyers ask for.",
    theirs: "The rewrite conversation starts, right when growth should.",
  },
];

/* Chart geometry (SVG units). */
const W = 600;
const H = 280;
const PAD = { l: 8, r: 8, t: 16, b: 8 };
const LAT_MAX = 2400;
const xOf = (c: number) =>
  PAD.l + ((Math.log10(c) - 1) / 3) * (W - PAD.l - PAD.r);
const yOf = (ms: number) =>
  H - PAD.b - (Math.min(ms, LAT_MAX) / LAT_MAX) * (H - PAD.t - PAD.b);

function curve(b: Build) {
  const pts: string[] = [];
  for (let s = 0; s <= STEPS; s += 6) {
    const c = 10 ** (1 + (s / STEPS) * 3);
    pts.push(`${xOf(c).toFixed(1)},${yOf(MODEL.latency(c, b)).toFixed(1)}`);
  }
  return `M${pts.join("L")}`;
}
const PATHS = { shortcut: curve("shortcut"), arrowbin: curve("arrowbin") };

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
const money = (n: number) =>
  n >= 10000 ? `$${(n / 1000).toFixed(n >= 100000 ? 0 : 1)}k` : `$${fmt(n)}`;

/**
 * SaaS signature: "from 10 customers to 10,000". Drag customer count up and
 * compare a shortcut build with ours: latency, errors and infra cost, a live
 * latency chart, and what gets built at each stage. Scrubs itself once when
 * first seen.
 */
export function ScaleSignature() {
  const [step, setStep] = useState(0);
  const [build, setBuild] = useState<Build>("arrowbin");
  const touched = useRef(false);
  const box = useRef<HTMLDivElement>(null);

  const c = toCustomers(step);
  const lat = MODEL.latency(c, build);
  const err = MODEL.errors(c, build);
  const cost = MODEL.cost(c, build);
  const mrr = c * ARPA;
  const margin = Math.max(0, (1 - cost / mrr) * 100);
  const reached = MILESTONES.filter((m) => c >= m.at);
  const current = reached[reached.length - 1] ?? MILESTONES[0];
  const bad = build === "shortcut" && lat > 900;

  // Auto-scrub 10 → ~2,000 once on first view, unless the visitor got there first.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (reducedMotion()) return;
        const t0 = performance.now() + 500;
        const to = 230;
        const tick = (now: number) => {
          if (touched.current) return;
          const p = Math.max(0, Math.min(1, (now - t0) / 2600));
          const k = p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2;
          setStep(Math.round(to * k));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
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

  const other: Build = build === "arrowbin" ? "shortcut" : "arrowbin";
  const pct = (step / STEPS) * 100;

  return (
    <div ref={box} className="grid gap-6 xl:grid-cols-12 xl:gap-8">
      {/* Dashboard */}
      <div
        className={`relative overflow-hidden rounded-[2rem] bg-white p-5 ring-1 transition-[box-shadow] duration-700 sm:p-8 xl:col-span-8 ${
          bad
            ? "ring-flare/60 shadow-[0_30px_80px_-40px_rgba(255,107,61,0.8)]"
            : "ring-ink/10 shadow-[0_30px_80px_-50px_rgba(59,43,255,0.6)]"
        }`}
      >
        {/* window chrome */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-plasma" />
              <span className="h-2.5 w-2.5 rounded-full bg-sun" />
              <span className="h-2.5 w-2.5 rounded-full bg-ultra" />
            </span>
            <span className="label text-ink-2">yourproduct.app / admin</span>
          </div>
          <fieldset className="relative m-0 grid min-w-0 grid-cols-2 border-0 rounded-full bg-frost p-1 text-sm font-semibold">
            <legend className="sr-only">Which build</legend>
            <span
              aria-hidden="true"
              className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-full transition-[left,background-color] duration-500 ease-[var(--ease-out-expo)] ${
                build === "arrowbin"
                  ? "left-[calc(50%)] bg-ultra"
                  : "left-1 bg-flare"
              }`}
            />
            {(["shortcut", "arrowbin"] as Build[]).map((b) => (
              <button
                key={b}
                type="button"
                aria-pressed={build === b}
                onClick={() => {
                  stop();
                  setBuild(b);
                }}
                className={`relative cursor-pointer rounded-full px-3.5 py-1.5 transition-colors duration-500 sm:px-4 ${
                  build === b
                    ? b === "arrowbin"
                      ? "text-white"
                      : "text-ink"
                    : "text-ink-2 hover:text-ink"
                }`}
              >
                {b === "arrowbin" ? "Built to scale" : "Quick shortcut"}
              </button>
            ))}
          </fieldset>
        </div>

        {/* KPIs */}
        <dl className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { k: "Customers", v: fmt(c), tone: "text-ink" },
            { k: "MRR", v: money(mrr), tone: "text-ink" },
            {
              k: "Speed (p95)",
              v: lat >= 1000 ? `${(lat / 1000).toFixed(1)}s` : `${fmt(lat)}ms`,
              tone: lat > 900 ? "text-[#C4380D]" : "text-ultra",
            },
            {
              k: "Errors",
              v: `${err.toFixed(err < 0.1 ? 2 : 1)}%`,
              tone: err > 1 ? "text-[#C4380D]" : "text-ultra",
            },
          ].map((m) => (
            <div key={m.k} className="rounded-2xl bg-frost px-4 py-3.5">
              <dt className="label text-ink-2">{m.k}</dt>
              <dd
                className={`mt-1.5 font-display text-[clamp(1.5rem,2.6vw,2.2rem)] font-black leading-none tabular-nums transition-colors duration-500 ${m.tone}`}
                style={{ fontVariationSettings: '"wdth" 108' }}
              >
                {m.v}
              </dd>
            </div>
          ))}
        </dl>

        {/* Chart */}
        <div className="relative mt-5 rounded-2xl bg-frost p-3 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-1">
            <p className="label text-ink-2">Page speed as you grow</p>
            <p className="flex items-center gap-3 whitespace-nowrap text-xs text-ink-2">
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-4 rounded-full bg-ultra" /> Built to
                scale
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-4 rounded-full bg-flare" /> Shortcut
              </span>
            </p>
          </div>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-4 font-mono text-[10px] uppercase tracking-wider text-[#C4380D] sm:left-5 sm:top-6 sm:text-[11px]">
              Users notice: over 1s
            </span>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="mt-2 block h-auto w-full overflow-visible"
              role="img"
              aria-label={`Latency chart. At ${fmt(c)} customers the shortcut build takes ${fmt(MODEL.latency(c, "shortcut"))} milliseconds, the scalable build ${fmt(MODEL.latency(c, "arrowbin"))} milliseconds.`}
            >
              {/* slow zone */}
              <rect
                x={PAD.l}
                y={PAD.t}
                width={W - PAD.l - PAD.r}
                height={yOf(1000) - PAD.t}
                rx="10"
                className="fill-flare/10"
              />
              {[10, 100, 1000, 10000].map((t) => (
                <g key={t}>
                  <line
                    x1={xOf(t)}
                    x2={xOf(t)}
                    y1={PAD.t}
                    y2={H - PAD.b}
                    className="stroke-ink/10"
                    strokeDasharray="3 5"
                  />
                </g>
              ))}
              {(["shortcut", "arrowbin"] as Build[]).map((b) => (
                <path
                  key={b}
                  d={PATHS[b]}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-[opacity,stroke-width] duration-500 ${
                    b === "arrowbin" ? "stroke-ultra" : "stroke-flare"
                  }`}
                  strokeWidth={b === build ? 4 : 2}
                  opacity={b === build ? 1 : 0.35}
                  strokeDasharray={b === build ? undefined : "6 7"}
                />
              ))}
              {/* position marker */}
              <line
                x1={xOf(c)}
                x2={xOf(c)}
                y1={PAD.t}
                y2={H - PAD.b}
                className="stroke-ink/40"
                strokeWidth="1.5"
              />
              <circle
                cx={xOf(c)}
                cy={yOf(MODEL.latency(c, other))}
                r="5"
                className={`${other === "arrowbin" ? "fill-ultra" : "fill-flare"} opacity-40`}
              />
              <circle
                cx={xOf(c)}
                cy={yOf(lat)}
                r="9"
                className={`${build === "arrowbin" ? "fill-ultra" : "fill-flare"} stroke-white`}
                strokeWidth="3"
              />
            </svg>
          </div>
          <div className="flex justify-between px-1 font-mono text-[11px] text-ink-2">
            <span>10</span>
            <span>100</span>
            <span>1,000</span>
            <span>10,000</span>
          </div>
        </div>

        {/* Slider */}
        <div className="mt-6">
          <label
            htmlFor="saas-customers"
            className="flex items-baseline justify-between gap-3"
          >
            <span className="font-semibold text-ink">Drag to grow</span>
            <span className="font-mono text-sm text-ink-2">
              {fmt(c)} paying customers
            </span>
          </label>
          <input
            id="saas-customers"
            type="range"
            min={0}
            max={STEPS}
            value={step}
            onPointerDown={stop}
            onKeyDown={stop}
            onChange={(e) => {
              stop();
              setStep(Number(e.target.value));
            }}
            aria-valuetext={`${fmt(c)} customers`}
            className="sx-range mt-3 w-full"
            style={{ ["--p" as string]: `${pct}%` }}
          />
        </div>
      </div>

      {/* What changes at this size */}
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:items-start xl:flex xl:col-span-4">
        <div
          className={`relative overflow-hidden rounded-[2rem] p-6 transition-colors duration-700 sm:p-7 ${
            build === "arrowbin" ? "bg-ultra text-white" : "bg-flare text-ink"
          }`}
          aria-live="polite"
        >
          <p className="label opacity-80">
            {build === "arrowbin" ? "What we build" : "What usually happens"} at{" "}
            {fmt(current.at)}+
          </p>
          <p
            key={`${current.at}-${build}`}
            className="sx-swap mt-3 text-lg font-semibold leading-snug sm:text-xl"
          >
            {build === "arrowbin" ? current.ours : current.theirs}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-current/20 pt-5 ">
            <div>
              <p className="label opacity-80">Infra / month</p>
              <p
                className="mt-1 font-display text-3xl font-black leading-none tabular-nums"
                style={{ fontVariationSettings: '"wdth" 108' }}
              >
                {money(cost)}
              </p>
            </div>
            <div>
              <p className="label opacity-80">Gross margin</p>
              <p
                className="mt-1 font-display text-3xl font-black leading-none tabular-nums"
                style={{ fontVariationSettings: '"wdth" 108' }}
              >
                {margin.toFixed(0)}%
              </p>
            </div>
          </div>
        </div>

        <ol className="grid gap-2">
          {MILESTONES.map((m) => {
            const hit = c >= m.at;
            return (
              <li
                key={m.at}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-colors duration-500 ${
                  hit ? "bg-white text-ink ring-1 ring-ink/10" : "text-ink-2"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold transition-[background-color,transform] duration-500 ${
                    hit
                      ? `${build === "arrowbin" ? "bg-ultra text-white" : "bg-flare text-ink"} scale-100`
                      : "scale-90 bg-ink/10"
                  }`}
                >
                  {hit ? "✓" : ""}
                </span>
                <span className="font-mono text-xs">{fmt(m.at)}+</span>
                <span className="font-semibold">
                  {
                    [
                      "Multi-tenant core",
                      "Billing",
                      "Caching & queues",
                      "Autoscaling",
                      "Enterprise ready",
                    ][MILESTONES.indexOf(m)]
                  }
                </span>
              </li>
            );
          })}
        </ol>
        <p className="px-1 text-sm md:col-span-2 leading-relaxed text-ink-2">
          Illustrative figures at ${ARPA} per customer per month. The point is
          the shape: architecture decided early is what stays cheap later.
        </p>
      </div>
    </div>
  );
}
