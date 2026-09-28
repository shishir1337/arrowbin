"use client";

import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/home/SectionLabel";
import { reducedMotion } from "@/lib/gsap";

const DOCS = [
  {
    id: 1,
    title: "Returns policy.pdf",
    text: "Unused items can be returned within 30 days for a full refund. Sale items: 14 days, store credit only.",
  },
  {
    id: 2,
    title: "Shipping FAQ.docx",
    text: "Standard delivery takes 2–4 working days. Express orders placed before 2pm arrive next day.",
  },
  {
    id: 3,
    title: "Warranty terms.pdf",
    text: "All electronics carry a 2-year warranty covering manufacturing faults, not accidental damage.",
  },
  {
    id: 4,
    title: "Pricing sheet.xlsx",
    text: "Business accounts get 10% off orders over $1,000 and 60-day payment terms.",
  },
];

type Q = {
  q: string;
  /** Answer segments; numbers are citation markers. */
  a: (string | number)[];
  sources: number[];
};

const QUESTIONS: Q[] = [
  {
    q: "Can I return a sale item?",
    a: [
      "Yes, within 14 days, but sale items are refunded as store credit rather than money back",
      1,
      ". Full-price items have 30 days and a full refund",
      1,
      ".",
    ],
    sources: [1],
  },
  {
    q: "If I order now, when does it arrive?",
    a: [
      "Standard delivery is 2–4 working days",
      2,
      ". Choose Express before 2pm and it arrives tomorrow",
      2,
      ".",
    ],
    sources: [2],
  },
  {
    q: "My headphones broke after a year. Covered?",
    a: [
      "If it's a manufacturing fault, yes: electronics have a 2-year warranty",
      3,
      ". Accidental damage isn't covered",
      3,
      ", so tell us what happened and we'll check.",
    ],
    sources: [3],
  },
  {
    q: "Do you price-match competitors?",
    a: [
      "I can't find a price-match policy in your documents, so I won't guess. I've passed this to the team, and they'll reply within the hour.",
    ],
    sources: [],
  },
];

/** Characters per frame while "typing". */
const SPEED = 2;

/**
 * AI: grounded answers (retrieval-augmented generation). Pick a question: the
 * sources it retrieves light up, then the answer streams in with citations.
 * With no source, it says so and hands off instead of inventing an answer.
 */
export function GroundedChat({ label }: { label: string }) {
  const [qi, setQi] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "search" | "type" | "done">(
    "idle",
  );
  const [chars, setChars] = useState(0);
  const raf = useRef(0);
  const timer = useRef(0);
  const box = useRef<HTMLDivElement>(null);

  const cur = qi === null ? null : QUESTIONS[qi];
  const full = cur
    ? cur.a.map((p) => (typeof p === "number" ? `[${p}]` : p)).join("")
    : "";

  const ask = (i: number) => {
    cancelAnimationFrame(raf.current);
    window.clearTimeout(timer.current);
    setQi(i);
    const total = QUESTIONS[i].a
      .map((p) => (typeof p === "number" ? `[${p}]` : p))
      .join("").length;
    if (reducedMotion()) {
      setChars(total);
      setPhase("done");
      return;
    }
    setChars(0);
    setPhase("search");
    timer.current = window.setTimeout(() => {
      setPhase("type");
      let n = 0;
      const tick = () => {
        n += SPEED;
        setChars(Math.min(n, total));
        if (n < total) raf.current = requestAnimationFrame(tick);
        else setPhase("done");
      };
      raf.current = requestAnimationFrame(tick);
    }, 1100);
  };

  // Ask the first question on first view.
  // biome-ignore lint/correctness/useExhaustiveDependencies: run once on mount.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        ask(0);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
      window.clearTimeout(timer.current);
    };
  }, []);

  // Render the typed part, turning [n] into citation chips.
  const typed = full.slice(0, chars);
  const parts = typed.split(/(\[\d\])/);
  const lit = (id: number) =>
    phase !== "idle" && cur ? cur.sources.includes(id) : false;
  const refused = cur ? cur.sources.length === 0 : false;

  return (
    <section className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="Grounded AI" />
            <h2
              className="display mt-5 max-w-[15ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              Answers from your documents, not guesses
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-2 sm:text-lg">
            Our assistants look things up in your own files before they answer,
            show where each fact came from, and say &ldquo;I don&apos;t
            know&rdquo; when the answer isn&apos;t there.
          </p>
        </div>

        <div ref={box} className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Chat */}
          <div className="flex flex-col rounded-[2rem] bg-frost p-4 sm:p-6 lg:col-span-7">
            <div className="flex items-center gap-3 px-2 pb-4">
              <span
                aria-hidden="true"
                className="grid h-9 w-9 place-items-center rounded-full bg-ultra font-display text-sm font-black text-white"
              >
                AI
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Help assistant</p>
                <p className="text-xs text-ink-2">
                  Answers from 4 company documents
                </p>
              </div>
            </div>

            <div className="flex min-h-72 flex-1 flex-col gap-3 rounded-[1.5rem] bg-white p-4 sm:p-5">
              <p className="sr-only" aria-live="polite">
                {phase === "done" && cur
                  ? `Answer: ${full.replace(/\[\d\]/g, "")}`
                  : ""}
              </p>
              {cur ? (
                <>
                  <p
                    key={`q${qi}`}
                    className="sx-swap max-w-[85%] self-end rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-sm text-white"
                  >
                    {cur.q}
                  </p>
                  {phase === "search" ? (
                    <p className="flex items-center gap-2 self-start rounded-2xl bg-frost px-4 py-3 text-sm text-ink-2">
                      <span aria-hidden="true" className="ai-dot" />
                      Searching your documents…
                    </p>
                  ) : (
                    <p
                      className={`max-w-[92%] self-start rounded-2xl rounded-bl-md px-4 py-3 text-sm leading-relaxed ${
                        refused ? "bg-plasma/15 text-ink" : "bg-frost text-ink"
                      }`}
                    >
                      {parts.map((p, i) =>
                        /^\[\d\]$/.test(p) ? (
                          <sup
                            // biome-ignore lint/suspicious/noArrayIndexKey: static split.
                            key={i}
                            className="ai-pop mx-0.5 inline-grid h-5 min-w-5 place-items-center rounded-full bg-ultra px-1 align-[0.1em] font-mono text-[10px] font-bold text-white"
                          >
                            {p.slice(1, -1)}
                          </sup>
                        ) : (
                          // biome-ignore lint/suspicious/noArrayIndexKey: static split.
                          <span key={i}>{p}</span>
                        ),
                      )}
                      {phase === "type" && (
                        <span aria-hidden="true" className="ai-caret" />
                      )}
                    </p>
                  )}
                  {phase === "done" && refused && (
                    <p className="sx-swap self-start rounded-full bg-plasma px-3 py-1.5 text-xs font-bold text-ink">
                      Handed to a person
                    </p>
                  )}
                </>
              ) : (
                <p className="m-auto text-sm text-ink-2">
                  Pick a question below.
                </p>
              )}
            </div>

            <div className="mt-4">
              <p className="label px-2 text-ink-2">Try a question</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {QUESTIONS.map((q, i) => (
                  <button
                    key={q.q}
                    type="button"
                    aria-pressed={qi === i}
                    onClick={() => ask(i)}
                    className={`cursor-pointer rounded-full px-4 py-2.5 text-left text-sm font-semibold transition-[background-color,color,translate] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 ${
                      qi === i
                        ? "bg-ultra text-white"
                        : "bg-white text-ink ring-1 ring-ink/15 hover:ring-ink/40"
                    }`}
                  >
                    {q.q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Knowledge base */}
          <div className="lg:col-span-5">
            <div className="flex items-baseline justify-between px-1">
              <p className="label text-ink-2">Your knowledge base</p>
              <p className="font-mono text-xs text-ink-2">
                {phase === "search"
                  ? "retrieving…"
                  : cur
                    ? `${cur.sources.length} source${cur.sources.length === 1 ? "" : "s"} used`
                    : ""}
              </p>
            </div>
            <ul className="mt-3 grid gap-3">
              {DOCS.map((d) => {
                const on = lit(d.id);
                return (
                  <li
                    key={d.id}
                    className={`relative overflow-hidden rounded-[1.4rem] p-4 transition-[background-color,box-shadow,translate,opacity] duration-700 ease-[var(--ease-out-expo)] sm:p-5 ${
                      on
                        ? "-translate-x-1 bg-sun shadow-[0_20px_40px_-26px_rgba(14,11,36,0.6)]"
                        : cur && phase !== "idle"
                          ? "bg-frost opacity-60"
                          : "bg-frost"
                    }`}
                  >
                    {on && phase === "search" && (
                      <span
                        aria-hidden="true"
                        className="ai-scan absolute inset-y-0 left-0 w-1/2"
                      />
                    )}
                    <div className="relative flex items-center gap-3">
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-mono text-xs font-bold ${on ? "bg-ultra text-white" : "bg-white text-ink"}`}
                      >
                        {d.id}
                      </span>
                      <span className="font-semibold text-ink">{d.title}</span>
                    </div>
                    <p className="relative mt-2 text-sm leading-relaxed text-ink">
                      {d.text}
                    </p>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 px-1 text-sm leading-relaxed text-ink-2">
              In a real build this is your help centre, contracts, product data
              or wiki, kept in sync automatically.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
