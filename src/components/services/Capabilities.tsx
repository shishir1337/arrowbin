"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ServiceArt } from "@/components/brand/ServiceArt";
import { SectionLabel } from "@/components/home/SectionLabel";
import { reducedMotion } from "@/lib/gsap";
import type { Service } from "@/lib/services";
import { serviceTheme } from "@/lib/serviceThemes";

type Cap = Pick<Service, "slug" | "name" | "summary" | "deliverables" | "tech">;

/**
 * Capabilities explorer: pick a service on the left, see exactly what we
 * deliver and the stack we use on the right. A proper ARIA tablist with
 * arrow-key navigation; the panel re-enters with a short rise on each switch.
 */
export function Capabilities({ items }: { items: Cap[] }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const cur = items[active];
  const box = useRef<HTMLElement>(null);
  const [auto, setAuto] = useState(false);
  const stopped = useRef(false);

  // Auto-advance every few seconds while in view, until the visitor interacts.
  useEffect(() => {
    const el = box.current;
    if (!el || reducedMotion()) return;
    const io = new IntersectionObserver(([e]) => setAuto(e.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!auto || stopped.current) return;
    const id = window.setTimeout(
      () => setActive((a) => (a + 1) % items.length),
      4500,
    );
    return () => window.clearTimeout(id);
  }, [auto, items.length]);
  const stop = () => {
    stopped.current = true;
    setAuto(false);
  };
  const t = serviceTheme(active);

  const onKey = (e: React.KeyboardEvent) => {
    stop();
    const last = items.length - 1;
    let next = active;
    if (e.key === "ArrowDown" || e.key === "ArrowRight")
      next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
      next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section
      ref={box}
      onPointerDown={stop}
      className="relative overflow-hidden bg-lilac py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="02" title="Capabilities" />
            <h2
              className="display mt-5 max-w-[14ch] text-[clamp(2.4rem,6vw,6rem)] text-ink"
              style={{ ["--wdth" as string]: 104 }}
            >
              What we actually build
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-ink/85 sm:text-lg">
            Choose a service to see the deliverables and the stack behind it.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-10">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Services"
            aria-orientation="vertical"
            onKeyDown={onKey}
            className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-2 max-lg:[mask-image:linear-gradient(to_right,#000_82%,transparent)] lg:col-span-5 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 xl:col-span-4"
          >
            {items.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.slug}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  id={`${base}-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls={`${base}-panel`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => {
                    stop();
                    setActive(i);
                  }}
                  className={`group relative flex shrink-0 cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-2xl px-5 py-4 text-left font-display text-base font-bold uppercase tracking-[-0.01em] transition-[background-color,color,transform] duration-500 ease-[var(--ease-smooth)] lg:text-lg ${
                    on
                      ? "bg-ink text-white xl:translate-x-2"
                      : "bg-white/60 text-ink hover:bg-white"
                  }`}
                >
                  {on && auto && !stopped.current ? (
                    <span
                      aria-hidden="true"
                      key={active}
                      className="cap-progress absolute inset-x-0 bottom-0 h-1 origin-left bg-sun"
                    />
                  ) : null}
                  <span className="whitespace-nowrap lg:whitespace-normal">
                    {s.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`label transition-opacity duration-300 max-lg:hidden ${on ? "text-sun opacity-100" : "opacity-75"}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div
            id={`${base}-panel`}
            role="tabpanel"
            data-tilt="3"
            aria-labelledby={`${base}-tab-${active}`}
            className="lg:col-span-7 xl:col-span-8"
          >
            <div
              key={cur.slug}
              className={`cap-in relative overflow-hidden rounded-[2rem] p-7 sm:p-10 ${t.bg} ${t.text} ${t.bg === "bg-white" ? "ring-1 ring-ink/10" : ""}`}
            >
              <ServiceArt
                slug={cur.slug}
                fg={t.fg}
                accent={t.accent}
                className="pointer-events-none absolute right-4 top-4 h-20 w-20 opacity-90 sm:-right-4 sm:-top-4 sm:h-40 sm:w-40 xl:h-52 xl:w-52"
              />
              <h3
                className="relative pr-24 font-display sm:pr-36 xl:pr-44 text-[clamp(1.8rem,3.2vw,3rem)] font-black uppercase leading-[0.92] tracking-[-0.04em]"
                style={{ fontVariationSettings: '"wdth" 108' }}
              >
                {cur.name}
              </h3>
              <p
                className={`relative mt-4 max-w-lg text-base leading-relaxed sm:text-lg ${t.sub}`}
              >
                {cur.summary}
              </p>

              <p className="label relative mt-10 opacity-80">What we deliver</p>
              <ul className="relative mt-4 grid gap-x-8 sm:grid-cols-2">
                {cur.deliverables.map((d, i) => (
                  <li
                    key={d}
                    className="flex items-baseline gap-3 border-b border-current/20 py-3 text-base font-medium sm:text-[1.05rem]"
                  >
                    <span className="label opacity-90">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {d}
                  </li>
                ))}
              </ul>

              <p className="label relative mt-10 opacity-80">
                Stack we reach for
              </p>
              <ul className="relative mt-4 flex flex-wrap gap-2">
                {cur.tech.map((x) => (
                  <li
                    key={x}
                    className={`rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold ${
                      t.text === "text-white"
                        ? "bg-white/15 text-white"
                        : "bg-white text-ink"
                    }`}
                  >
                    {x}
                  </li>
                ))}
              </ul>

              <Link
                href={`/services/${cur.slug}`}
                className={`group relative mt-10 inline-flex min-h-12 max-w-full items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-sm font-semibold transition-colors duration-500 ${
                  t.text === "text-white"
                    ? "bg-white text-ink hover:bg-sun"
                    : "bg-ink text-white hover:bg-ultra"
                }`}
              >
                Explore {cur.name}
                <span className="grid h-9 w-9 place-items-center rounded-full bg-sun text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 14 14"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 11 11 3M5 3h6v6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
