"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/home/SectionLabel";
import { finePointer, reducedMotion } from "@/lib/gsap";

export type WorkItem = {
  name: string;
  url: string;
  blurb: string;
  result: string;
  tags: string[];
  image: string;
  blur?: string;
};

type View = "grid" | "index";

const FILTERS: {
  id: string;
  label: string;
  match: (t: string[]) => boolean;
}[] = [
  { id: "all", label: "All work", match: () => true },
  { id: "ecom", label: "E-commerce", match: (t) => t.includes("E-commerce") },
  { id: "corp", label: "Corporate", match: (t) => t.includes("Corporate") },
  { id: "agency", label: "Agencies", match: (t) => t.includes("Agency") },
  {
    id: "market",
    label: "Marketplaces",
    match: (t) => t.includes("Marketplace"),
  },
];

const TONES = [
  "bg-ultra text-white",
  "bg-plasma text-ink",
  "bg-sun text-ink",
  "bg-lilac text-ink",
];

const host = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 11 11 3M5 3h6v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

/**
 * /work: filterable project explorer with two views. Grid shows framed
 * screenshots; Index is a big-type list where, on desktop, a screenshot
 * follows the cursor (eased, tilting with speed).
 */
export function WorkExplorer({
  items,
  label,
}: {
  items: WorkItem[];
  label: string;
}) {
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<View>("grid");
  const [hover, setHover] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  const f = FILTERS.find((x) => x.id === filter) ?? FILTERS[0];
  const shown = items
    .map((p, i) => ({ ...p, i }))
    .filter((p) => f.match(p.tags));

  // Cursor-following preview for the Index view (fine pointers only).
  useEffect(() => {
    if (view !== "index" || !finePointer() || reducedMotion()) return;
    const el = preview.current;
    const list = listRef.current;
    if (!el || !list) return;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    let running = false;
    const tick = () => {
      const dy = ty - y;
      x += (tx - x) * 0.14;
      y += dy * 0.14;
      const rot = Math.max(-8, Math.min(8, dy * -0.05));
      el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg)`;
      if (Math.abs(tx - x) > 0.2 || Math.abs(dy) > 0.2)
        raf = requestAnimationFrame(tick);
      else running = false;
    };
    // The preview sits in the empty space right of the names (clear of the
    // tag and arrow) and follows the pointer vertically, so it never covers
    // the name being pointed at.
    const move = (e: PointerEvent) => {
      tx = list.getBoundingClientRect().right - 300 - 200;
      ty = e.clientY;
      if (!running) {
        if (x === 0 && y === 0) {
          x = tx;
          y = ty;
        }
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    list.addEventListener("pointermove", move);
    return () => {
      list.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [view]);

  return (
    <section className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index={label} title="All projects" />
            <h2
              className="display mt-5 max-w-[14ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              Open any of them, they&apos;re live
            </h2>
          </div>
          {/* View switch */}
          <fieldset className="m-0 inline-grid shrink-0 grid-cols-2 self-start rounded-full bg-frost p-1 lg:self-auto">
            <legend className="sr-only">View</legend>
            {(["grid", "index"] as View[]).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => setView(v)}
                className={`inline-flex h-11 cursor-pointer items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors duration-500 ${
                  view === v ? "bg-ink text-white" : "text-ink hover:bg-white"
                }`}
              >
                <span aria-hidden="true" className="text-xs">
                  {v === "grid" ? "▦" : "☰"}
                </span>
                {v === "grid" ? "Grid" : "Index"}
              </button>
            ))}
          </fieldset>
        </div>

        {/* Filters */}
        <fieldset className="m-0 mt-10 flex min-w-0 flex-wrap gap-2 border-0 p-0">
          <legend className="sr-only">Filter projects</legend>
          {FILTERS.map((x) => {
            const n = items.filter((p) => x.match(p.tags)).length;
            if (!n) return null;
            const on = x.id === filter;
            return (
              <button
                key={x.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(x.id)}
                className={`inline-flex h-11 cursor-pointer items-center gap-2 rounded-full pl-4 pr-2 text-sm font-semibold transition-[background-color,color,translate] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 ${
                  on
                    ? "bg-ultra text-white"
                    : "bg-frost text-ink hover:bg-lilac"
                }`}
              >
                {x.label}
                <span
                  className={`grid h-7 min-w-7 place-items-center rounded-full px-1.5 font-mono text-xs ${
                    on ? "bg-sun text-ink" : "bg-white text-ink"
                  }`}
                >
                  {n}
                </span>
              </button>
            );
          })}
        </fieldset>
        <p className="sr-only" aria-live="polite">
          Showing {shown.length} project{shown.length === 1 ? "" : "s"}
        </p>

        {view === "grid" ? (
          <ul
            key={`g-${filter}`}
            className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3"
          >
            {shown.map((p, k) => (
              <li
                key={p.url}
                className="wk-in"
                style={{ animationDelay: `${k * 70}ms` }}
              >
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="VISIT"
                  className="group block"
                >
                  <div
                    className={`rounded-[1.75rem] p-3 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 sm:p-4 ${TONES[p.i % TONES.length]}`}
                  >
                    <div className="overflow-hidden rounded-[1.2rem] bg-white shadow-[0_20px_40px_-24px_rgba(14,11,36,0.6)]">
                      <div className="flex h-7 items-center gap-1.5 border-b border-ink/10 px-3">
                        <span className="h-2 w-2 rounded-full bg-plasma" />
                        <span className="h-2 w-2 rounded-full bg-sun" />
                        <span className="h-2 w-2 rounded-full bg-ultra" />
                        <span className="ml-2 truncate font-mono text-[10px] text-ink-2">
                          {host(p.url)}
                        </span>
                      </div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-frost">
                        <Image
                          src={p.image}
                          alt={`${p.name} website, built by Arrowbin`}
                          fill
                          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 92vw"
                          className="object-cover object-top"
                          {...(p.blur
                            ? {
                                placeholder: "blur" as const,
                                blurDataURL: p.blur,
                              }
                            : {})}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 px-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3
                        className="font-display text-2xl font-black uppercase leading-none tracking-[-0.03em] text-ink"
                        style={{ fontVariationSettings: '"wdth" 106' }}
                      >
                        {p.name}
                      </h3>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-ink/15 text-ink transition-[rotate,border-color,background-color,color] duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                        <Arrow />
                      </span>
                    </div>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
                      {p.blurb}
                    </p>
                    <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-frost px-3 py-1.5 text-sm font-semibold text-ink">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-plasma"
                      />
                      {p.result}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <li
                          key={t}
                          className="font-mono text-[11px] uppercase tracking-wider text-ink-2"
                        >
                          #{t.replace(/\s|\//g, "")}
                        </li>
                      ))}
                    </ul>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="relative mt-10">
            <ol
              key={`i-${filter}`}
              ref={listRef}
              className="border-t-2 border-ink"
              onPointerLeave={() => setHover(null)}
            >
              {shown.map((p, k) => (
                <li
                  key={p.url}
                  className="wk-in border-b border-ink/15"
                  style={{ animationDelay: `${k * 50}ms` }}
                >
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="VISIT"
                    onPointerEnter={() => setHover(p.i)}
                    onFocus={() => setHover(p.i)}
                    onBlur={() => setHover(null)}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 transition-[padding,background-color] duration-500 ease-[var(--ease-out-expo)] hover:bg-frost focus-visible:bg-frost sm:gap-8 sm:py-7 lg:hover:px-6"
                  >
                    <span className="font-mono text-xs text-ink-2 sm:text-sm">
                      {String(p.i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex min-w-0 items-center gap-4">
                      {/* touch screens: small thumbnail instead of the cursor preview */}
                      <span className="relative hidden h-12 w-18 shrink-0 overflow-hidden rounded-lg bg-frost max-lg:block">
                        <Image
                          src={p.image}
                          alt=""
                          fill
                          sizes="72px"
                          className="object-cover object-top"
                        />
                      </span>
                      <span className="min-w-0 lg:pr-[320px]">
                        <span
                          className="block break-words font-display text-[clamp(1.4rem,5vw,4rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-ultra"
                          style={{ fontVariationSettings: '"wdth" 104' }}
                        >
                          {p.name}
                        </span>
                        <span className="mt-1.5 block text-sm text-ink-2">
                          {p.result}
                        </span>
                      </span>
                    </span>
                    <span className="flex items-center gap-4">
                      <span className="hidden font-mono text-xs uppercase tracking-wider text-ink-2 md:block">
                        {p.tags[0]}
                      </span>
                      <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink/15 text-ink transition-[rotate,border-color,background-color,color] duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                        <Arrow />
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>

            {/* Floating preview (desktop, fine pointer) */}
            <div
              ref={preview}
              aria-hidden="true"
              className="pointer-events-none fixed top-0 left-0 z-40 max-lg:hidden"
            >
              <div
                className={`-translate-y-1/2 transition-[opacity,scale] duration-500 ease-[var(--ease-out-expo)] ${
                  hover === null
                    ? "scale-75 opacity-0"
                    : "scale-100 opacity-100"
                }`}
              >
                <div className="relative aspect-[16/10] w-[300px] overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-30px_rgba(14,11,36,0.7)] ring-4 ring-white">
                  {items.map((p, i) => (
                    <Image
                      key={p.url}
                      src={p.image}
                      alt=""
                      fill
                      sizes="300px"
                      loading="lazy"
                      className={`object-cover object-top transition-opacity duration-300 ${hover === i ? "opacity-100" : "opacity-0"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
