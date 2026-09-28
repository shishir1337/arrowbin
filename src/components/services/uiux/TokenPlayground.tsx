"use client";

import { type CSSProperties, useState } from "react";
import { SectionLabel } from "@/components/home/SectionLabel";

const BRANDS = [
  { name: "Ultra", c: "#3B2BFF", on: "#FFFFFF" },
  { name: "Plasma", c: "#FF4DA6", on: "#0E0B24" },
  { name: "Sun", c: "#FFD23F", on: "#0E0B24" },
  { name: "Flare", c: "#FF6B3D", on: "#0E0B24" },
  { name: "Ink", c: "#0E0B24", on: "#FFFFFF" },
];
const RADII = [
  { name: "Sharp", r: 2 },
  { name: "Soft", r: 12 },
  { name: "Round", r: 28 },
];
const DENSITY = [
  { name: "Compact", s: 0.8 },
  { name: "Comfy", s: 1 },
  { name: "Airy", s: 1.25 },
];

function Choice<T extends { name: string }>({
  legend,
  items,
  value,
  onChange,
  swatch,
}: {
  legend: string;
  items: T[];
  value: T;
  onChange: (v: T) => void;
  swatch?: (v: T) => string;
}) {
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="label mb-3 text-ink-2">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {items.map((it) => {
          const on = it.name === value.name;
          return (
            <button
              key={it.name}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(it)}
              className={`inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-3.5 text-sm font-semibold transition-[background-color,color,box-shadow] duration-500 ${
                on
                  ? "bg-ink text-white"
                  : "bg-white text-ink ring-1 ring-ink/15 hover:ring-ink/40"
              }`}
            >
              {swatch && (
                <span
                  aria-hidden="true"
                  className="h-4 w-4 rounded-full ring-2 ring-white"
                  style={{ background: swatch(it) }}
                />
              )}
              {it.name}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * UI/UX: design-system playground. Three tokens (brand, radius, density)
 * drive a whole set of components through CSS variables: change one, every
 * component updates at once.
 */
export function TokenPlayground({ label }: { label: string }) {
  const [brand, setBrand] = useState(BRANDS[0]);
  const [radius, setRadius] = useState(RADII[1]);
  const [density, setDensity] = useState(DENSITY[1]);
  const [toggle, setToggle] = useState(true);

  const vars = {
    "--b": brand.c,
    "--on": brand.on,
    "--r": `${radius.r}px`,
    "--s": density.s,
  } as CSSProperties;

  return (
    <section className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="Design systems" />
            <h2
              className="display mt-5 max-w-[15ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              Change one token, update every screen
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-2 sm:text-lg">
            A design system turns your brand into rules that code can follow.
            Try it: every component below reads from the same three tokens.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-7 rounded-[2rem] bg-frost p-6 sm:p-8 lg:col-span-4">
            <Choice
              legend="Brand colour"
              items={BRANDS}
              value={brand}
              onChange={setBrand}
              swatch={(b) => b.c}
            />
            <Choice
              legend="Corner radius"
              items={RADII}
              value={radius}
              onChange={setRadius}
            />
            <Choice
              legend="Density"
              items={DENSITY}
              value={density}
              onChange={setDensity}
            />
            {/* Phones: a live strip so changes show right where you tap */}
            <div
              className="tp flex flex-wrap items-center gap-2 rounded-2xl bg-white p-3 lg:hidden"
              style={vars}
              aria-hidden="true"
            >
              <span className="tp-btn">Button</span>
              <span className="tp-chip tp-chip-on">Chip</span>
              <span className="tp-badge">Badge</span>
            </div>
            <div className="mt-auto rounded-2xl bg-white p-4 font-mono text-xs leading-relaxed text-ink-2">
              <span className="text-ink">--brand</span>: {brand.c}
              {";"}
              <br />
              <span className="text-ink">--radius</span>: {radius.r}px{";"}
              <br />
              <span className="text-ink">--space</span>: {density.s}rem{";"}
            </div>
          </div>

          {/* Component sheet */}
          <div
            className="tp grid gap-4 rounded-[2rem] bg-frost p-4 sm:grid-cols-2 sm:p-6 lg:col-span-8"
            style={vars}
          >
            {/* Card */}
            <div className="tp-card flex flex-col gap-[calc(var(--s)*0.9rem)] sm:row-span-2">
              <div className="tp-img relative min-h-40 flex-1 overflow-hidden sm:min-h-44">
                <span className="absolute -right-6 -bottom-8 h-28 w-28 rounded-full bg-white/25" />
                <span className="absolute left-5 top-5 h-10 w-10 rounded-[calc(var(--r)*0.6)] bg-white/85" />
              </div>
              <div className="flex items-center gap-2">
                <span className="tp-badge">New</span>
                <span className="text-xs text-ink-2">Updated today</span>
              </div>
              <p className="font-display text-xl font-black uppercase leading-none tracking-[-0.02em] text-ink">
                Quarterly report
              </p>
              <p className="text-sm leading-relaxed text-ink-2">
                Revenue is up 18% on last quarter. Three accounts need a
                follow-up this week.
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                <span className="tp-btn">Open report</span>
                <span className="tp-btn tp-btn-ghost">Share</span>
              </div>
            </div>

            {/* Form bits */}
            <div className="tp-card flex flex-col gap-[calc(var(--s)*0.75rem)]">
              <span className="text-xs font-semibold text-ink">Email</span>
              <span className="tp-input">sam@ledger.io</span>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-ink">Weekly digest</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={toggle}
                  aria-label="Weekly digest"
                  onClick={() => setToggle((t) => !t)}
                  className="tp-switch cursor-pointer"
                />
              </div>
              <div className="flex gap-2">
                {["Daily", "Weekly", "Monthly"].map((t, i) => (
                  <span
                    key={t}
                    className={`tp-chip ${i === 1 ? "tp-chip-on" : ""}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Stat + progress */}
            <div className="tp-card flex flex-col gap-[calc(var(--s)*0.6rem)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ink-2">
                  Onboarding
                </span>
                <span className="tp-badge">3 of 4</span>
              </div>
              <p className="font-display text-4xl font-black leading-none tabular-nums text-ink">
                75%
              </p>
              <span className="tp-track">
                <span className="tp-fill" style={{ width: "75%" }} />
              </span>
              <div className="flex -space-x-2 pt-1">
                {["bg-plasma", "bg-sun", "bg-lilac", "bg-ultra"].map((c) => (
                  <span
                    key={c}
                    className={`h-8 w-8 rounded-full ring-2 ring-white ${c}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
