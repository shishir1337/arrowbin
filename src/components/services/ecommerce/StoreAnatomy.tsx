"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/home/SectionLabel";

type Spot = {
  title: string;
  text: string;
  /** Pin position on the mock storefront, in %. */
  x: number;
  y: number;
};

const SPOTS: Spot[] = [
  {
    title: "Storefront (Shopify or headless)",
    text: "A fast, on-brand storefront: custom Shopify themes, or a headless Next.js front end when you need full control and top speed.",
    x: 30,
    y: 8,
  },
  {
    title: "Product pages that convert",
    text: "Image galleries, variants, reviews, size guides and delivery estimates, laid out to answer every question before it's asked.",
    x: 30,
    y: 52,
  },
  {
    title: "Subscriptions & memberships",
    text: "Recurring orders, subscribe-and-save, member pricing and gated collections, with self-service account management.",
    x: 74,
    y: 40,
  },
  {
    title: "Payments & checkout",
    text: "Cards, wallets, local gateways and cash on delivery, in a one-page mobile checkout with fraud checks built in.",
    x: 78,
    y: 72,
  },
  {
    title: "Inventory & ERP sync",
    text: "Stock, orders and customers kept in sync with your warehouse, ERP, accounting and courier systems, automatically.",
    x: 52,
    y: 92,
  },
  {
    title: "Conversion optimization",
    text: "Analytics, heatmaps and A/B tests after launch, so every change is measured and the store keeps getting better.",
    x: 72,
    y: 8,
  },
];

/**
 * E-commerce: "anatomy of a store we build". A mock storefront with numbered
 * pins; picking a pin (or a list item) explains that part. The list is the
 * accessible control; the pins mirror it.
 */
export function StoreAnatomy({ label }: { label: string }) {
  const [active, setActive] = useState(0);
  const cur = SPOTS[active];

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="Deliverables" />
            <h2
              className="display mt-5 max-w-[14ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              Anatomy of a store we build
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-2 sm:text-lg">
            Pick a part of the store to see what goes into it. Most of the work
            customers never see is what makes the sale.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Mock storefront */}
          <div className="relative lg:col-span-7">
            <div
              aria-hidden="true"
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sun p-4 sm:aspect-[4/3] sm:p-6"
            >
              <div className="flex h-full flex-col overflow-hidden rounded-[1.3rem] bg-white shadow-[0_24px_50px_-28px_rgba(14,11,36,0.6)]">
                {/* nav */}
                <div className="flex items-center justify-between border-b border-ink/10 px-4 py-2.5">
                  <span className="font-display text-sm font-black uppercase tracking-tight text-ink">
                    Your Store
                  </span>
                  <span className="hidden gap-3 font-mono text-[10px] text-ink-2 sm:flex">
                    <span>New</span>
                    <span>Women</span>
                    <span>Men</span>
                    <span>Sale</span>
                  </span>
                  <span className="grid h-6 min-w-6 place-items-center rounded-full bg-ink px-1.5 font-mono text-[10px] text-white">
                    2
                  </span>
                </div>
                {/* body */}
                <div className="grid flex-1 grid-cols-1 gap-4 p-4 sm:grid-cols-[1.1fr_1fr]">
                  <div className="grid grid-rows-[1fr_auto] gap-2">
                    <div className="rounded-xl bg-gradient-to-br from-lilac to-plasma/60" />
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        "bg-lilac",
                        "bg-plasma/50",
                        "bg-sun/70",
                        "bg-ultra/40",
                      ].map((c) => (
                        <span
                          key={c}
                          className={`aspect-square rounded-md ${c}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="h-3 w-4/5 rounded-full bg-ink" />
                    <span className="h-2 w-2/5 rounded-full bg-ink/30" />
                    <span className="font-display text-lg font-black text-ultra">
                      ৳2,450
                    </span>
                    <div className="flex gap-1.5">
                      {["S", "M", "L", "XL"].map((z) => (
                        <span
                          key={z}
                          className={`grid h-6 w-7 place-items-center rounded-md font-mono text-[10px] ${z === "M" ? "bg-ink text-white" : "bg-frost text-ink"}`}
                        >
                          {z}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-[10px] text-ink-2">
                      <span className="text-sun">★★★★★</span> 128 reviews
                    </span>
                    <span className="rounded-lg bg-lilac/60 px-2 py-1.5 font-mono text-[10px] text-ink">
                      Subscribe &amp; save 10%
                    </span>
                    <span className="grid gap-1 rounded-lg bg-frost px-2 py-1.5 font-mono text-[10px] text-ink-2">
                      <span>Delivery in 2–3 days</span>
                      <span>Free returns within 7 days</span>
                    </span>
                    <span className="mt-auto rounded-full bg-ink py-2 text-center text-xs font-semibold text-white">
                      Add to cart
                    </span>
                    <span className="flex justify-between gap-1 font-mono text-[9px] text-ink-2">
                      <span>bKash</span>
                      <span>Card</span>
                      <span>COD</span>
                    </span>
                  </div>
                </div>
                {/* footer strip */}
                <div className="flex items-center gap-2 border-t border-ink/10 bg-frost px-4 py-2 font-mono text-[10px] text-ink-2">
                  <span className="h-2 w-2 rounded-full bg-ultra" />
                  In stock · synced with warehouse
                </div>
              </div>

              {/* Pins */}
              {SPOTS.map((s, i) => (
                <span
                  key={s.title}
                  className={`absolute hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center sm:grid rounded-full font-display text-sm font-black shadow-lg transition-[background-color,color,scale] duration-500 ${
                    i === active
                      ? "scale-110 bg-ultra text-white"
                      : "bg-ink text-white"
                  }`}
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}
                >
                  {i === active ? (
                    <span className="absolute inset-0 animate-ping rounded-full bg-ultra/50" />
                  ) : null}
                  <span className="relative">{i + 1}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Controls + detail */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <ul className="grid gap-2">
              {SPOTS.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    aria-pressed={i === active}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={`flex w-full cursor-pointer items-center gap-4 rounded-[1.2rem] px-4 py-3.5 text-left transition-colors duration-500 ease-[var(--ease-smooth)] ${
                      i === active
                        ? "bg-ink text-white"
                        : "bg-white text-ink ring-1 ring-ink/10 hover:ring-ink/30"
                    }`}
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-sm font-black ${
                        i === active ? "bg-sun text-ink" : "bg-frost text-ink"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="font-semibold">{s.title}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div
              key={active}
              aria-live="polite"
              className="cap-in rounded-[1.4rem] bg-ultra p-6 text-white"
            >
              <p className="label text-sun">
                {String(active + 1).padStart(2, "0")} — {cur.title}
              </p>
              <p className="mt-3 text-lg leading-relaxed">{cur.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
