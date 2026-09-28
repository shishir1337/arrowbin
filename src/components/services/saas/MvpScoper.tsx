"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/home/SectionLabel";

type Feature = {
  id: string;
  name: string;
  /** Build effort in weeks (rough, for a senior team). */
  weeks: number;
  color: string;
  core?: boolean;
};

const FEATURES: Feature[] = [
  {
    id: "core",
    name: "Your core workflow",
    weeks: 4,
    color: "bg-ultra",
    core: true,
  },
  {
    id: "auth",
    name: "Sign-up & login",
    weeks: 1,
    color: "bg-lilac",
    core: true,
  },
  {
    id: "billing",
    name: "Stripe subscriptions",
    weeks: 1.5,
    color: "bg-plasma",
    core: true,
  },
  { id: "onboard", name: "Onboarding flow", weeks: 1, color: "bg-ink/20" },
  { id: "admin", name: "Admin dashboard", weeks: 1.5, color: "bg-flare" },
  { id: "email", name: "Email notifications", weeks: 0.5, color: "bg-lilac" },
  { id: "teams", name: "Teams & roles", weeks: 1.5, color: "bg-plasma" },
  { id: "analytics", name: "Usage analytics", weeks: 1.5, color: "bg-ultra" },
  { id: "integrations", name: "Slack & Zapier", weeks: 2, color: "bg-ink/20" },
  { id: "api", name: "Public API", weeks: 2, color: "bg-flare" },
  { id: "ai", name: "AI features", weeks: 3, color: "bg-lilac" },
  { id: "sso", name: "SAML SSO", weeks: 2, color: "bg-plasma" },
  { id: "white", name: "White-labelling", weeks: 2.5, color: "bg-ultra" },
  { id: "i18n", name: "Multi-language", weeks: 1.5, color: "bg-ink/20" },
  { id: "mobile", name: "Native mobile app", weeks: 6, color: "bg-flare" },
];

/** Discovery + QA/launch time that every build carries. */
const FIXED = 2;
const MAX = 36;
const DEFAULT = new Set([
  "core",
  "auth",
  "billing",
  "onboard",
  "admin",
  "email",
]);

function verdict(w: number) {
  if (w <= 10)
    return {
      tag: "Lean MVP",
      text: "Small enough to launch fast and learn from real customers. This is the sweet spot.",
    };
  if (w <= 14)
    return {
      tag: "Solid first version",
      text: "Still a sensible MVP. Anything more and it's worth asking what can wait.",
    };
  return {
    tag: "That's a v2",
    text: "Launch the core first; these features land better once customers ask for them.",
  };
}

/**
 * SaaS: "what goes in your MVP". Toggle features in or out of the launch;
 * a timeline fills with their build time and says when scope is creeping.
 */
export function MvpScoper({ label }: { label: string }) {
  const [on, setOn] = useState<Set<string>>(DEFAULT);
  const picked = FEATURES.filter((f) => on.has(f.id));
  const weeks = FIXED + picked.reduce((s, f) => s + f.weeks, 0);
  const lo = Math.round(weeks);
  const hi = Math.round(weeks * 1.25);
  const v = verdict(weeks);
  const toggle = (f: Feature) => {
    if (f.core) return;
    setOn((prev) => {
      const next = new Set(prev);
      if (next.has(f.id)) next.delete(f.id);
      else next.add(f.id);
      return next;
    });
  };

  return (
    <section className="relative bg-sun py-20 text-ink sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="Scope it right" />
            <h2
              className="display mt-5 max-w-[14ch] text-[clamp(2.2rem,4.6vw,4.6rem)]"
              style={{ ["--wdth" as string]: 100 }}
            >
              What goes in your MVP?
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink/85 sm:text-lg">
            Most SaaS MVPs are built too big. Tap features in or out and watch
            the timeline. This is the same conversation we have in week one.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-12 rounded-[2rem] bg-white p-5 shadow-[0_30px_60px_-40px_rgba(14,11,36,0.6)] sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div aria-live="polite">
              <p className="label text-ink-2">Estimated time to launch</p>
              <p
                className="mt-2 font-display text-[clamp(2.6rem,6vw,5rem)] font-black leading-none tabular-nums"
                style={{ fontVariationSettings: '"wdth" 110' }}
              >
                {lo}–{hi}
                <span className="ml-2 text-[0.4em] tracking-normal">weeks</span>
              </p>
            </div>
            <div className="max-w-sm">
              <span
                key={v.tag}
                className={`sx-swap inline-block rounded-full px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider ${
                  weeks > 14 ? "bg-flare text-ink" : "bg-ultra text-white"
                }`}
              >
                {v.tag}
              </span>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                {v.text}
              </p>
            </div>
          </div>

          <div className="relative mt-8">
            <div className="relative flex h-12 overflow-hidden rounded-2xl bg-frost sm:h-14">
              <span
                className="flex h-full shrink-0 items-center justify-center border-r-2 border-white bg-ink/15 font-mono text-[10px] text-ink-2 transition-[width] duration-700 ease-[var(--ease-out-expo)]"
                style={{ width: `${(FIXED / MAX) * 100}%` }}
                title="Discovery, QA & launch"
              />
              {FEATURES.map((f) => (
                <span
                  key={f.id}
                  title={f.name}
                  className={`h-full shrink-0 border-r-2 border-white transition-[width,opacity] duration-700 ease-[var(--ease-out-expo)] ${f.color}`}
                  style={{
                    width: on.has(f.id) ? `${(f.weeks / MAX) * 100}%` : "0%",
                    opacity: on.has(f.id) ? 1 : 0,
                    borderRightWidth: on.has(f.id) ? 2 : 0,
                  }}
                />
              ))}
            </div>
            {/* sweet-spot zone, outlined over the bar */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-2 h-16 rounded-2xl border-2 border-dashed border-ultra sm:h-[4.5rem]"
              style={{
                left: `${(8 / MAX) * 100}%`,
                width: `${(6 / MAX) * 100}%`,
              }}
            />
            <div className="relative mt-3 h-5 font-mono sm:h-10 text-[11px] text-ink-2">
              {[0, 8, 14, 24, 36].map((t) => (
                <span
                  key={t}
                  className="absolute -translate-x-1/2 whitespace-nowrap first:translate-x-0 last:-translate-x-full"
                  style={{ left: `${(t / MAX) * 100}%` }}
                >
                  {t === MAX ? `${t} wks` : t}
                </span>
              ))}
              <span
                className="absolute hidden -translate-x-1/2 font-semibold text-ultra sm:block"
                style={{ left: `${(11 / MAX) * 100}%`, top: "1.4em" }}
              >
                MVP sweet spot
              </span>
            </div>
          </div>
        </div>

        {/* Feature chips */}
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <p className="label lg:col-span-2 lg:pt-3">Tap to add or remove</p>
          <ul className="flex flex-wrap gap-2.5 lg:col-span-10">
            {FEATURES.map((f) => {
              const active = on.has(f.id);
              return (
                <li key={f.id}>
                  <button
                    type="button"
                    aria-pressed={active}
                    aria-disabled={f.core || undefined}
                    onClick={() => toggle(f)}
                    className={`group inline-flex h-12 items-center gap-2.5 rounded-full pl-2 pr-4 text-[0.95rem] font-semibold transition-[background-color,color,box-shadow,translate] duration-500 ease-[var(--ease-out-expo)] ${
                      f.core
                        ? "cursor-default bg-ink text-white"
                        : active
                          ? "cursor-pointer bg-white text-ink shadow-[0_10px_24px_-14px_rgba(14,11,36,0.7)] hover:-translate-y-0.5"
                          : "cursor-pointer bg-transparent text-ink ring-2 ring-ink/25 ring-inset hover:-translate-y-0.5 hover:ring-ink/60"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`grid h-8 w-8 place-items-center rounded-full text-sm transition-[background-color,rotate] duration-500 ease-[var(--ease-out-expo)] ${
                        f.core
                          ? "bg-sun text-ink"
                          : active
                            ? `${f.color} rotate-0 text-ink`
                            : "rotate-45 bg-ink/10 text-ink"
                      }`}
                    >
                      {f.core ? "★" : active ? "✓" : "×"}
                    </span>
                    {f.name}
                    <span className="font-mono text-xs font-normal opacity-70">
                      {f.weeks}w
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink/80">
          ★ Always in: the workflow customers pay for, sign-in and billing.
          Estimates are rough ranges for one senior team; your real plan comes
          after a free discovery call.
        </p>
      </div>
    </section>
  );
}
