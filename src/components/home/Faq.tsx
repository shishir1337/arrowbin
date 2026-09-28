"use client";

import { useId, useRef, useState } from "react";
import { SectionLabel } from "./SectionLabel";

type Item = { question: string; answer: string };

/**
 * FAQ: sticky oversized heading beside a big-type accordion. Each item is one
 * rounded card that fades to ultraviolet as a whole when open; height animates
 * with the grid-rows 0fr→1fr technique. When switching items, the page scroll
 * compensates for the item collapsing above, so the question you clicked stays
 * put under your cursor while its answer unfolds.
 */
export function Faq({
  items,
  index = "08",
}: {
  items: Item[];
  /** Section number shown in the label, e.g. "08". */
  index?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  const list = useRef<HTMLUListElement>(null);

  const toggle = (i: number) => {
    const prev = open;
    const next = open === i ? null : i;
    setOpen(next);
    // Only an item collapsing *above* the clicked one shifts it; hold the
    // clicked question in place for the length of the transition.
    if (next === null || prev === null || prev > i) return;
    const btn = list.current?.querySelectorAll("button")[i];
    if (!btn) return;
    const anchor = btn.getBoundingClientRect().top;
    const t0 = performance.now();
    const hold = () => {
      const drift = btn.getBoundingClientRect().top - anchor;
      if (Math.abs(drift) > 0.5) {
        const y = window.scrollY + drift;
        if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true });
        else window.scrollTo(0, y);
      }
      if (performance.now() - t0 < 700) requestAnimationFrame(hold);
    };
    requestAnimationFrame(hold);
  };

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-[var(--gutter)] lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionLabel index={index} title="FAQ" />
            <h2
              className="display mt-5 text-[clamp(2.8rem,5.4vw,6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              <span className="whitespace-nowrap">
                Questions
                <span className="text-sun [-webkit-text-stroke:2px_var(--ink)]">
                  ?
                </span>
              </span>
              <br />
              Answered.
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink-2">
              Still curious? Email{" "}
              <a
                href="mailto:hello@arrowbin.com"
                className="font-semibold text-ultra underline decoration-2 underline-offset-4"
              >
                hello@arrowbin.com
              </a>{" "}
              and a human replies within a day.
            </p>
          </div>
        </div>
        <ul ref={list} className="lg:col-span-7">
          {items.map((it, i) => {
            const isOpen = open === i;
            const id = `${base}-${i}`;
            return (
              <li
                key={it.question}
                className={`relative rounded-[1.5rem] transition-[background-color,color] duration-[550ms] ease-[var(--ease-smooth)] after:pointer-events-none after:absolute after:inset-x-4 after:bottom-0 after:h-[2px] after:bg-ink/10 after:transition-opacity after:duration-300 sm:after:inset-x-6 ${
                  isOpen
                    ? "bg-ultra text-white after:opacity-0"
                    : "text-ink hover:bg-white"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => toggle(i)}
                    className="group flex w-full cursor-pointer items-center justify-between gap-6 px-4 py-6 text-left sm:px-6 sm:py-7"
                  >
                    <span className="font-display text-[clamp(1.25rem,2.1vw,1.9rem)] font-bold leading-tight tracking-[-0.02em]">
                      {it.question}
                    </span>
                    <span
                      className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-[550ms] ease-[var(--ease-smooth)] ${
                        isOpen
                          ? "rotate-[135deg] bg-sun text-ink"
                          : "bg-ink text-white group-hover:rotate-90"
                      }`}
                      aria-hidden="true"
                    >
                      <span className="absolute h-[2px] w-4 bg-current" />
                      <span className="absolute h-4 w-[2px] bg-current" />
                    </span>
                  </button>
                </h3>
                <section
                  id={id}
                  aria-label={it.question}
                  className={`grid transition-[grid-template-rows] duration-[550ms] ease-[var(--ease-smooth)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    {/* Fades in after the card turns blue; out before it closes. */}
                    <p
                      className={`px-4 pb-7 text-base leading-relaxed text-white/85 transition-opacity sm:px-6 sm:text-lg ${
                        isOpen
                          ? "opacity-100 delay-150 duration-500"
                          : "opacity-0 duration-200"
                      }`}
                    >
                      {it.answer}
                    </p>
                  </div>
                </section>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
