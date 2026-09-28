"use client";

import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/lib/gsap";

const VISITORS = 10000;

/** Baseline step-through rates (a typical small store), step i → i+1. */
const STAGES = [
  { name: "Visitors", rate: 1 },
  { name: "View a product", rate: 0.42 },
  { name: "Add to cart", rate: 0.2 },
  { name: "Start checkout", rate: 0.55 },
  { name: "Place an order", rate: 0.45 },
];

type Fix = {
  id: string;
  title: string;
  detail: string;
  /** Which stage (index) it lifts, and by how much. */
  stage: number;
  lift: number;
};

const FIXES: Fix[] = [
  {
    id: "speed",
    title: "Pages load in under 2s",
    detail: "Fewer people bounce before they see a product.",
    stage: 1,
    lift: 1.15,
  },
  {
    id: "pdp",
    title: "Product pages that sell",
    detail: "Real photos, reviews, clear delivery times and returns.",
    stage: 2,
    lift: 1.25,
  },
  {
    id: "checkout",
    title: "One-page mobile checkout",
    detail: "Fewer fields, autofill and guest checkout.",
    stage: 4,
    lift: 1.25,
  },
  {
    id: "pay",
    title: "Local payments + cash on delivery",
    detail: "Pay the way your customers already pay.",
    stage: 4,
    lift: 1.15,
  },
  {
    id: "recover",
    title: "Abandoned-cart recovery",
    detail: "Automatic email, SMS or WhatsApp nudges.",
    stage: 3,
    lift: 1.1,
  },
];

function funnel(on: Set<string>) {
  const out: number[] = [];
  let n = VISITORS;
  STAGES.forEach((s, i) => {
    let r = s.rate;
    for (const f of FIXES) if (on.has(f.id) && f.stage === i) r *= f.lift;
    n = i === 0 ? VISITORS : n * r;
    out.push(n);
  });
  return out;
}

const BASE = funnel(new Set());

/** Counts smoothly toward `value` whenever it changes. */
function useTween(value: number) {
  const [v, setV] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (reducedMotion()) {
      setV(value);
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 700);
      const e = 1 - (1 - p) ** 3;
      const cur = a + (value - a) * e;
      setV(cur);
      from.current = cur;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return v;
}

function Num({ value }: { value: number }) {
  const v = useTween(value);
  return <>{Math.round(v).toLocaleString("en-US")}</>;
}

/**
 * E-commerce signature: "where your sales leak". A funnel from 10,000 visitors
 * to orders; toggling fixes widens the stage it helps and the order count
 * climbs. Switches itself on one by one when first scrolled into view.
 */
export function FunnelSignature() {
  const [on, setOn] = useState<Set<string>>(new Set());
  const touched = useRef(false);
  const box = useRef<HTMLDivElement>(null);
  const counts = funnel(on);
  const orders = counts[counts.length - 1];
  const baseOrders = BASE[BASE.length - 1];

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const timers: number[] = [];
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (reducedMotion()) return;
        FIXES.forEach((f, i) => {
          timers.push(
            window.setTimeout(
              () => {
                if (touched.current) return;
                setOn((prev) => new Set(prev).add(f.id));
              },
              1200 + i * 900,
            ),
          );
        });
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      for (const t of timers) window.clearTimeout(t);
    };
  }, []);

  const toggle = (id: string) => {
    touched.current = true;
    setOn((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div ref={box} className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      {/* Funnel */}
      <div className="rounded-[2rem] bg-white p-6 ring-1 ring-ink/10 sm:p-8 lg:col-span-7">
        <div className="flex items-baseline justify-between gap-4">
          <p className="label text-ink-2">Per 10,000 visitors</p>
          <p className="label text-ink-2">Illustrative model</p>
        </div>
        <ol className="mt-6 grid gap-3">
          {STAGES.map((s, i) => {
            const w = Math.max(6, (counts[i] / VISITORS) * 100);
            const baseW = Math.max(6, (BASE[i] / VISITORS) * 100);
            const lifted = counts[i] > BASE[i] + 0.5;
            return (
              <li key={s.name} className="grid gap-1.5">
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-semibold text-ink">{s.name}</span>
                  <span className="font-mono text-ink-2">
                    <Num value={counts[i]} />
                  </span>
                </div>
                <div className="relative h-9 overflow-hidden rounded-xl bg-frost sm:h-11">
                  {/* baseline ghost */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 rounded-xl bg-ink/10"
                    style={{ width: `${baseW}%` }}
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 rounded-xl transition-[width,background-color] duration-700 ease-[var(--ease-out-expo)] ${
                      i === STAGES.length - 1
                        ? "bg-plasma"
                        : lifted
                          ? "bg-ultra"
                          : "bg-sun"
                    }`}
                    style={{ width: `${w}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ol>
        <div className="mt-8 grid grid-cols-2 gap-3 border-t-2 border-ink/10 pt-6">
          <div>
            <p className="label text-ink-2">Orders</p>
            <p
              className="mt-1 font-display text-[clamp(2.4rem,5vw,4rem)] font-black leading-none tabular-nums text-ink"
              style={{ fontVariationSettings: '"wdth" 112' }}
              aria-live="polite"
            >
              <Num value={orders} />
            </p>
            <p className="mt-1 text-sm text-ink-2">
              from {Math.round(baseOrders)} before
            </p>
          </div>
          <div>
            <p className="label text-ink-2">Conversion rate</p>
            <p
              className="mt-1 font-display text-[clamp(2.4rem,5vw,4rem)] font-black leading-none tabular-nums text-ultra"
              style={{ fontVariationSettings: '"wdth" 112' }}
            >
              {((orders / VISITORS) * 100).toFixed(1)}%
            </p>
            <p className="mt-1 text-sm text-ink-2">
              from {((baseOrders / VISITORS) * 100).toFixed(1)}% before
            </p>
          </div>
        </div>
      </div>

      {/* Fixes */}
      <div className="lg:col-span-5">
        <p className="label text-ink-2">Switch on what we fix</p>
        <ul className="mt-4 grid gap-3">
          {FIXES.map((f) => {
            const active = on.has(f.id);
            return (
              <li key={f.id}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggle(f.id)}
                  className={`flex w-full cursor-pointer items-center gap-4 rounded-[1.4rem] p-4 text-left transition-colors duration-500 ease-[var(--ease-smooth)] sm:p-5 ${
                    active
                      ? "bg-ultra text-white"
                      : "bg-white text-ink ring-1 ring-ink/10 hover:ring-ink/30"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-500 ${
                      active ? "bg-sun" : "bg-ink/15"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-[left] duration-500 ease-[var(--ease-out-expo)] ${
                        active ? "left-6" : "left-1"
                      }`}
                    />
                  </span>
                  <span>
                    <span className="block font-semibold">{f.title}</span>
                    <span
                      className={`mt-0.5 block text-sm ${active ? "text-white/85" : "text-ink-2"}`}
                    >
                      {f.detail}
                    </span>
                  </span>
                  <span
                    className={`ml-auto shrink-0 rounded-full px-2.5 py-1 font-mono text-xs font-semibold ${
                      active ? "bg-sun text-ink" : "bg-frost text-ink-2"
                    }`}
                  >
                    +{Math.round((f.lift - 1) * 100)}%
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-ink-2">
          Lifts are conservative, typical ranges we plan around. Your real
          numbers come from your analytics in the strategy phase.
        </p>
      </div>
    </div>
  );
}
