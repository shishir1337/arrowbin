"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/lib/gsap";

type Item = {
  id: string;
  kind: string;
  from: string;
  subject: string;
  body: string;
  fields: [string, string][];
  decision: string;
  confidence: number;
  actions: { tool: string; text: string }[];
  /** Minutes a person would have spent. */
  minutes: number;
  tone: string;
};

const ITEMS: Item[] = [
  {
    id: "invoice",
    kind: "Invoice",
    from: "accounts@northwind.co",
    subject: "Invoice INV-2291 for September",
    body: "Hi, please find attached our invoice for September services. Payment due within 30 days. Thanks!",
    fields: [
      ["Supplier", "Northwind Ltd"],
      ["Invoice no.", "INV-2291"],
      ["Amount", "$4,860.00"],
      ["Due", "28 Oct"],
      ["PO match", "PO-1187 ✓"],
    ],
    decision: "Matches an open purchase order. Safe to book for payment.",
    confidence: 97,
    actions: [
      { tool: "Xero", text: "Bill created, scheduled for 28 Oct" },
      { tool: "Slack", text: "#finance: invoice booked" },
    ],
    minutes: 12,
    tone: "bg-sun",
  },
  {
    id: "support",
    kind: "Support",
    from: "maria@clinicplus.com",
    subject: "Can't export last month's report",
    body: "The export button spins forever on the monthly report. We need it for our board meeting tomorrow morning.",
    fields: [
      ["Customer", "ClinicPlus (Pro plan)"],
      ["Topic", "Reports › Export"],
      ["Urgency", "High, deadline tomorrow"],
      ["Known issue", "Yes, fix in v4.2"],
      ["Sentiment", "Stressed"],
    ],
    decision: "Known issue with a workaround. Reply now, flag as priority.",
    confidence: 91,
    actions: [
      { tool: "Helpdesk", text: "Reply sent with CSV workaround" },
      { tool: "Jira", text: "Linked to BUG-812, priority raised" },
    ],
    minutes: 15,
    tone: "bg-lilac",
  },
  {
    id: "lead",
    kind: "Lead",
    from: "Website form",
    subject: "Enterprise pricing for 400 seats?",
    body: "We're evaluating tools for our hospital group. Need SSO, on-prem data and a custom contract. Budget approved.",
    fields: [
      ["Company", "St. Anne Health Group"],
      ["Size", "400 seats"],
      ["Needs", "SSO, on-prem, contract"],
      ["Budget", "Approved"],
      ["Fit score", "High"],
    ],
    decision:
      "High-value and a custom contract. A person should own this, so hand it over with a summary.",
    confidence: 64,
    actions: [
      { tool: "CRM", text: "Deal created, owner: Sales lead" },
      { tool: "Human review", text: "Summary + draft reply ready" },
    ],
    minutes: 20,
    tone: "bg-plasma",
  },
];

/** Stages of one run; the number is when (ms) it starts. */
const STAGES = [
  { at: 0, label: "Reading" },
  { at: 900, label: "Extracting" },
  { at: 2700, label: "Deciding" },
  { at: 3700, label: "Acting" },
  { at: 5000, label: "Done" },
];
const THRESHOLD = 80;

/**
 * AI signature: watch an agent clear an inbox. Each item is read, fields are
 * extracted, a decision is made with a confidence score, and actions land in
 * your tools. Low confidence goes to a person. Auto-plays through the inbox
 * once in view; click any item to rerun it.
 */
export function AgentSignature() {
  const [active, setActive] = useState(0);
  const [t, setT] = useState(0);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [playing, setPlaying] = useState(false);
  const auto = useRef(true);
  const box = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const item = ITEMS[active];
  const stage = STAGES.filter((s) => t >= s.at).length - 1;
  const human = item.confidence < THRESHOLD;

  const run = useCallback((i: number) => {
    cancelAnimationFrame(raf.current);
    setActive(i);
    if (reducedMotion()) {
      setT(99999);
      setDone((d) => new Set(d).add(ITEMS[i].id));
      return;
    }
    setT(0);
    setPlaying(true);
    const t0 = performance.now();
    const tick = (now: number) => {
      const el = now - t0;
      setT(el);
      if (el < STAGES[STAGES.length - 1].at) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setPlaying(false);
        setDone((d) => new Set(d).add(ITEMS[i].id));
      }
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  // Start when seen.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        run(0);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [run]);

  // Auto-advance through the inbox once, unless the visitor takes over.
  useEffect(() => {
    if (playing || !auto.current || t === 0) return;
    const next = active + 1;
    if (next >= ITEMS.length) {
      auto.current = false;
      return;
    }
    const id = window.setTimeout(() => {
      if (auto.current) run(next);
    }, 1400);
    return () => window.clearTimeout(id);
  }, [playing, active, t, run]);

  const pick = (i: number) => {
    auto.current = false;
    run(i);
  };

  const automated = ITEMS.filter(
    (x) => done.has(x.id) && x.confidence >= THRESHOLD,
  );
  const reviewed = ITEMS.filter(
    (x) => done.has(x.id) && x.confidence < THRESHOLD,
  );
  const saved = ITEMS.filter((x) => done.has(x.id)).reduce(
    (s, x) => s + x.minutes,
    0,
  );

  // Streaming helpers.
  const fieldsShown = Math.max(
    0,
    Math.min(item.fields.length, Math.floor((t - 900) / 330) + 1),
  );
  const conf = Math.round(
    item.confidence * Math.min(1, Math.max(0, (t - 2700) / 800)),
  );

  return (
    <div ref={box} className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      {/* Inbox */}
      <div className="flex flex-col gap-3 lg:col-span-4">
        <div className="flex items-center justify-between px-1">
          <p className="label text-ink-2">Inbox</p>
          <p className="font-mono text-xs text-ink-2">
            {ITEMS.length - done.size} waiting
          </p>
        </div>
        <ul className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-3">
          {ITEMS.map((x, i) => {
            const on = i === active;
            const fin = done.has(x.id);
            return (
              <li key={x.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => pick(i)}
                  className={`group relative flex h-full w-full cursor-pointer flex-col items-center gap-2 overflow-hidden rounded-[1.2rem] p-3 text-center lg:flex-row lg:items-start lg:gap-3 lg:rounded-[1.4rem] lg:p-4 lg:text-left transition-[background-color,box-shadow,translate] duration-500 ease-[var(--ease-out-expo)] ${
                    on
                      ? "bg-white lg:translate-x-1 shadow-[0_24px_50px_-30px_rgba(14,11,36,0.6)] ring-2 ring-ultra"
                      : "bg-white/70 ring-1 ring-ink/10 hover:bg-white"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-mono text-[11px] font-bold text-ink ${x.tone}`}
                  >
                    {x.kind.slice(0, 3).toUpperCase()}
                  </span>
                  <span className="text-xs font-semibold text-ink lg:hidden">
                    {x.kind}
                    {fin && (
                      <span
                        aria-hidden="true"
                        className={`ai-pop ml-1.5 inline-block h-2 w-2 rounded-full ${x.confidence >= THRESHOLD ? "bg-ultra" : "bg-plasma"}`}
                      />
                    )}
                  </span>
                  <span className="min-w-0 flex-1 max-lg:sr-only">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-xs text-ink-2">
                        {x.from}
                      </span>
                      {fin && (
                        <span
                          className={`ai-pop shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            x.confidence >= THRESHOLD
                              ? "bg-ultra text-white"
                              : "bg-plasma text-ink"
                          }`}
                        >
                          {x.confidence >= THRESHOLD
                            ? "Automated"
                            : "To a person"}
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block truncate font-semibold text-ink">
                      {x.subject}
                    </span>
                  </span>
                  {on && playing && (
                    <span
                      aria-hidden="true"
                      className="ai-scan absolute inset-y-0 left-0 w-1/3"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <dl className="mt-2 grid grid-cols-3 gap-2">
          {[
            { k: "Automated", v: automated.length },
            { k: "To a person", v: reviewed.length },
            { k: "Minutes saved", v: saved },
          ].map((m) => (
            <div
              key={m.k}
              className="rounded-2xl bg-white px-3 py-3 ring-1 ring-ink/10"
            >
              <dt className="text-[11px] font-semibold text-ink-2">{m.k}</dt>
              <dd
                className="mt-1 font-display text-2xl font-black leading-none tabular-nums text-ink"
                style={{ fontVariationSettings: '"wdth" 108' }}
              >
                {m.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Agent run */}
      <div className="relative overflow-hidden rounded-[2rem] bg-white p-5 ring-1 ring-ink/10 sm:p-8 lg:col-span-8">
        {/* stage rail */}
        <ol
          className="flex flex-wrap items-center gap-x-2 gap-y-2"
          aria-label="Agent progress"
        >
          {STAGES.map((s, i) => (
            <li key={s.label} className="flex items-center gap-2">
              <span
                aria-current={i === stage ? "step" : undefined}
                className={`inline-flex h-8 items-center gap-2 rounded-full px-3 text-xs font-semibold transition-colors duration-500 ${
                  i < stage
                    ? "bg-ultra text-white"
                    : i === stage
                      ? i === STAGES.length - 1
                        ? "bg-ultra text-white"
                        : "bg-sun text-ink"
                      : "bg-frost text-ink-2"
                }`}
              >
                {i === stage && i < STAGES.length - 1 && (
                  <span aria-hidden="true" className="ai-dot" />
                )}
                {s.label}
              </span>
              {i < STAGES.length - 1 && (
                <span
                  aria-hidden="true"
                  className="h-px w-3 bg-ink/20 sm:w-5"
                />
              )}
            </li>
          ))}
        </ol>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* The message */}
          <div className="rounded-2xl bg-frost p-4 sm:p-5">
            <p className="label text-ink-2">
              {item.kind} · {item.from}
            </p>
            <p className="mt-2 font-semibold text-ink">{item.subject}</p>
            <p className="relative mt-2 text-sm leading-relaxed text-ink-2">
              {item.body}
              {stage === 0 && playing && (
                <span aria-hidden="true" className="ai-read absolute inset-0" />
              )}
            </p>
          </div>

          {/* Extracted fields */}
          <div>
            <p className="label text-ink-2">Extracted</p>
            <dl className="mt-3 grid gap-1.5">
              {item.fields.map(([k, v], i) => (
                <div
                  key={k}
                  className={`flex items-baseline justify-between gap-3 rounded-xl px-3 py-2 text-sm transition-[opacity,translate,background-color] duration-500 ease-[var(--ease-out-expo)] ${
                    i < fieldsShown
                      ? "bg-frost"
                      : "outline-1 -outline-offset-1 outline-dashed outline-ink/20"
                  }`}
                >
                  <dt className="text-ink-2">{k}</dt>
                  <dd
                    className={`font-mono text-[13px] font-semibold text-ink transition-[opacity,translate] duration-500 ease-[var(--ease-out-expo)] ${
                      i < fieldsShown
                        ? "translate-x-0 opacity-100"
                        : "translate-x-2 opacity-0"
                    }`}
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Decision */}
        <div className="relative mt-5">
          <p
            aria-hidden="true"
            className={`absolute inset-0 grid place-items-center rounded-2xl text-sm font-semibold text-ink-2 outline-1 -outline-offset-1 outline-dashed outline-ink/20 transition-opacity duration-500 ${stage >= 2 ? "opacity-0" : "opacity-100"}`}
          >
            Decision pending…
          </p>
          <div
            className={`relative grid gap-4 rounded-2xl p-4 transition-[opacity,translate] duration-700 ease-[var(--ease-out-expo)] sm:grid-cols-[1fr_auto] sm:items-center sm:p-5 ${
              stage >= 2
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            } ${human ? "bg-plasma/15" : "bg-ultra/[0.07]"}`}
          >
            <div>
              <p className="label text-ink-2">Decision</p>
              <p className="mt-1.5 font-semibold leading-snug text-ink">
                {item.decision}
              </p>
            </div>
            <div className="min-w-44">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs font-semibold text-ink-2">
                  Confidence
                </span>
                <span className="font-mono text-sm font-bold tabular-nums text-ink">
                  {conf}%
                </span>
              </div>
              <div className="relative mt-1.5 h-2.5 rounded-full bg-ink/10">
                <span
                  className={`absolute inset-y-0 left-0 rounded-full ${human ? "bg-plasma" : "bg-ultra"}`}
                  style={{ width: `${conf}%` }}
                />
                <span
                  aria-hidden="true"
                  className="absolute -inset-y-1 w-0.5 bg-ink"
                  style={{ left: `${THRESHOLD}%` }}
                />
              </div>
              <p className="mt-1 text-right font-mono text-[10px] text-ink-2">
                auto above {THRESHOLD}%
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {item.actions.map((a, i) => {
            const shown = stage >= 3 && t >= STAGES[3].at + i * 500;
            const person = a.tool === "Human review";
            return (
              <li key={a.tool} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 flex items-center px-4 text-sm font-semibold text-ink-2 rounded-2xl outline-1 -outline-offset-1 outline-dashed outline-ink/20 transition-opacity duration-500 ${shown ? "opacity-0" : "opacity-100"}`}
                >
                  {a.tool} · waiting
                </span>
                <div
                  className={`relative flex items-center gap-3 rounded-2xl px-4 py-3 transition-[opacity,scale] duration-500 ease-[var(--ease-out-expo)] ${
                    shown ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  } ${person ? "bg-plasma text-ink" : "bg-ink text-white"}`}
                >
                  <span
                    aria-hidden="true"
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${person ? "bg-white text-ink" : "bg-sun text-ink"}`}
                  >
                    {person ? "!" : "✓"}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-semibold opacity-80">
                      {a.tool}
                    </span>
                    <span className="block truncate text-sm font-semibold">
                      {a.text}
                    </span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="sr-only" aria-live="polite">
          {stage === STAGES.length - 1
            ? `${item.kind} ${human ? "handed to a person" : "handled automatically"}: ${item.decision}`
            : ""}
        </p>
      </div>
    </div>
  );
}
