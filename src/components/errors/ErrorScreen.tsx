import Link from "next/link";
import type { ReactNode } from "react";
import { LogoMark } from "@/components/brand/LogoMark";

const PLACES = [
  {
    href: "/services",
    label: "Services",
    sub: "What we build",
    tone: "bg-ultra text-white",
  },
  {
    href: "/work",
    label: "Work",
    sub: "Live client projects",
    tone: "bg-plasma text-ink",
  },
  {
    href: "/blog",
    label: "Blog",
    sub: "Guides before you build",
    tone: "bg-sun text-ink",
  },
  {
    href: "/contact",
    label: "Contact",
    sub: "Tell us what you need",
    tone: "bg-lilac text-ink",
  },
];

/**
 * Shared screen for the 404 and error pages: the status code in giant type
 * with the Arrowbin mark standing in for its middle digit, a short message,
 * actions, and four places to go next.
 */
export function ErrorScreen({
  code,
  label,
  title,
  children,
  actions,
  note,
}: {
  code: string;
  label: string;
  title: [string, string];
  children: ReactNode;
  actions: ReactNode;
  note?: ReactNode;
}) {
  const [first, , last] = code.split("");
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-12 sm:pb-28 sm:pt-16">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="svh-fade label flex items-center gap-3 text-ink-2">
              ({code})
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {label}
            </p>
            <h1
              className="display mt-6 text-[clamp(2.8rem,7.4vw,7.4rem)] text-ink"
              style={{ ["--wdth" as string]: 104 }}
            >
              {title.map((line, i) => (
                <span key={line} className="block overflow-y-clip pb-[0.04em]">
                  <span
                    className="svh-line block"
                    style={{ animationDelay: `${120 + i * 110}ms` }}
                  >
                    {i === 1 ? (
                      <span className="text-ultra">{line}</span>
                    ) : (
                      line
                    )}
                  </span>
                </span>
              ))}
            </h1>
            <div className="svh-fade mt-8 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl">
              {children}
            </div>
            <div className="svh-fade mt-8 flex flex-wrap items-center gap-3">
              {actions}
            </div>
            {note ? (
              <div className="svh-fade mt-6 text-sm text-ink-2">{note}</div>
            ) : null}
          </div>

          {/* The code, with the mark as its middle digit */}
          <div
            aria-hidden="true"
            className="svh-fade flex items-center justify-center gap-[0.04em] font-display text-[clamp(6.5rem,14vw,14rem)] font-black leading-none tracking-[-0.06em] text-ink lg:col-span-5"
            style={{ fontVariationSettings: '"wdth" 112' }}
          >
            <span>{first}</span>
            <span className="er-spin relative grid h-[0.78em] w-[0.78em] shrink-0 place-items-center rounded-full bg-sun">
              <LogoMark className="h-[0.46em] w-[0.46em] text-ultra" />
            </span>
            <span>{last}</span>
          </div>
        </div>

        <nav aria-label="Popular pages" className="mt-16 sm:mt-20">
          <p className="label text-ink-2">Or try one of these</p>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {PLACES.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className={`group flex h-full min-h-32 flex-col justify-between gap-6 rounded-[1.5rem] p-5 transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 sm:min-h-40 sm:p-6 ${p.tone}`}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-display text-xl font-black uppercase leading-none tracking-[-0.02em] sm:text-2xl">
                      {p.label}
                    </span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-current transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45">
                      <svg
                        width="14"
                        height="14"
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
                  </span>
                  <span className="text-sm font-medium">{p.sub}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

/** Primary pill action (link or button), matching the site's hero buttons. */
export const primaryAction =
  "group inline-flex h-13 cursor-pointer items-center gap-3 rounded-full bg-ultra py-1.5 pl-6 pr-1.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_40px_-14px_rgba(59,43,255,0.7)] transition-colors duration-500 hover:bg-ink";
export const secondaryAction =
  "inline-flex h-13 items-center rounded-full border border-ink/15 bg-white px-6 text-[0.95rem] font-semibold text-ink transition-colors duration-500 hover:border-ink";

export function ActionArrow() {
  return (
    <span className="grid h-10 w-10 place-items-center rounded-full bg-sun text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45">
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path
          d="M3 11 11 3M5 3h6v6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    </span>
  );
}
