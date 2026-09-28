import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { LogoMark } from "@/components/brand/LogoMark";
import { ManifestoMotion } from "./motion/ManifestoMotion";
import { SectionLabel } from "./SectionLabel";

type Token = string | { pill: ReactNode };

const pillBase =
  "mx-[0.12em] inline-flex h-[0.78em] w-[1.5em] translate-y-[0.06em] items-center justify-center rounded-full align-baseline";

const TOKENS: Token[] = [
  "We",
  "are",
  "a",
  "software",
  "studio",
  "for",
  "companies",
  "that",
  "refuse",
  "to",
  "be",
  "boring.",
  {
    pill: (
      <span className={`${pillBase} bg-ultra`}>
        <LogoMark className="h-[0.5em] w-[0.5em] text-white [--mark-bit:var(--sun)]" />
      </span>
    ),
  },
  "We",
  "design,",
  "engineer",
  "and",
  "ship",
  "web",
  "platforms,",
  "apps,",
  "AI",
  "systems",
  {
    pill: (
      <span className={`${pillBase} bg-sun`}>
        <span className="spin-slow block h-[0.42em] w-[0.42em] rounded-[0.08em] bg-plasma" />
      </span>
    ),
  },
  "and",
  "cloud",
  "infrastructure,",
  "then",
  "stay",
  "to",
  "make",
  "them",
  "faster,",
  "smarter",
  {
    pill: (
      <span className={`${pillBase} bg-plasma`}>
        <span className="flex gap-[0.08em]">
          <span className="block h-[0.18em] w-[0.18em] animate-bounce rounded-full bg-white" />
          <span className="block h-[0.18em] w-[0.18em] animate-bounce rounded-full bg-white [animation-delay:.15s]" />
          <span className="block h-[0.18em] w-[0.18em] animate-bounce rounded-full bg-white [animation-delay:.3s]" />
        </span>
      </span>
    ),
  },
  "and",
  "louder.",
];

/**
 * Manifesto: a big paragraph whose words start as crisp outlines and fill with
 * solid ink as it scrolls through, punctuated by little animated shape "pills".
 * Server-rendered; the scroll motion lives in <ManifestoMotion/>.
 */
export function Manifesto() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-40">
      <ManifestoMotion />
      <div
        aria-hidden="true"
        className="mf-shape pointer-events-none absolute will-change-transform -right-24 top-24 h-72 w-72 rounded-[4rem] border-[1.5px] border-ultra/30 max-md:hidden"
      />
      <div
        aria-hidden="true"
        className="mf-shape pointer-events-none absolute -left-10 bottom-10 h-40 w-40 rounded-full bg-lilac/60 will-change-transform"
      />
      <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-[var(--gutter)] lg:grid-cols-12">
        <div className="lg:col-span-3">
          <SectionLabel index="01" title="Manifesto" />
        </div>
        <div className="lg:col-span-9">
          <p
            className="mf-text font-display text-[clamp(1.9rem,4.5vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink"
            style={{ fontVariationSettings: '"wdth" 92' }}
          >
            {TOKENS.map((t, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static copy.
              <Fragment key={i}>
                {typeof t === "string" ? (
                  <span className="relative inline-block">
                    {/* Outlined letters (always legible) with a solid ink copy
                        that fades in on scroll; the copy is aria-hidden. */}
                    <span className="mf-outline">{t}</span>
                    <span
                      aria-hidden="true"
                      className="mf-word absolute inset-0 text-ink will-change-[opacity]"
                    >
                      {t}
                    </span>
                  </span>
                ) : (
                  <span className="mf-pill inline-block" aria-hidden="true">
                    {t.pill}
                  </span>
                )}{" "}
              </Fragment>
            ))}
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
            <p className="max-w-md text-base leading-relaxed text-ink-2 sm:text-lg">
              Strategy, design and engineering in one senior team, so nothing
              gets lost between the idea and the launch.
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 font-display text-lg font-bold uppercase tracking-tight text-ink"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 transition-colors group-hover:border-ultra group-hover:bg-ultra group-hover:text-white">
                →
              </span>
              About the studio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
