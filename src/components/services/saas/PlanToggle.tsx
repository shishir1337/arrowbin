"use client";

import { useState } from "react";

const PLANS = [
  { name: "Starter", monthly: 29 },
  { name: "Growth", monthly: 79, pick: true },
  { name: "Scale", monthly: 199 },
];

/** A working pricing switch: the kind of billing UI we wire to Stripe. */
export function PlanToggle() {
  const [yearly, setYearly] = useState(false);
  return (
    <div>
      <div className="flex items-center gap-3 text-sm font-semibold">
        <span className={yearly ? "text-white/90 font-medium" : "text-white"}>
          Monthly
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={yearly}
          aria-label="Bill yearly"
          onClick={() => setYearly((y) => !y)}
          className="relative h-7 w-12 cursor-pointer rounded-full bg-white/20 transition-colors duration-500 aria-checked:bg-sun"
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-[left] duration-500 ease-[var(--ease-out-expo)] ${
              yearly ? "left-6" : "left-1"
            }`}
          />
        </button>
        <span className={yearly ? "text-white" : "text-white/90 font-medium"}>
          Yearly
        </span>
        <span
          className={`rounded-full bg-sun px-2 py-0.5 font-mono text-[11px] text-ink transition-[opacity,scale] duration-500 ${
            yearly ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          2 months free
        </span>
      </div>
      <ul className="mt-5 grid grid-cols-3 gap-2">
        {PLANS.map((p) => {
          const price = yearly ? Math.round((p.monthly * 10) / 12) : p.monthly;
          return (
            <li
              key={p.name}
              className={`rounded-2xl p-3 transition-transform duration-500 ease-[var(--ease-out-expo)] sm:p-4 ${
                p.pick
                  ? "-translate-y-1 bg-white text-ink"
                  : "bg-white/[0.08] text-white"
              }`}
            >
              <p className="text-xs font-semibold">{p.name}</p>
              <p
                className="mt-1 font-display text-2xl font-black leading-none tabular-nums sm:text-3xl"
                style={{ fontVariationSettings: '"wdth" 104' }}
              >
                <span key={price} className="sx-swap inline-block">
                  ${price}
                </span>
              </p>
              <p className="mt-1 text-[11px]">per month</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
