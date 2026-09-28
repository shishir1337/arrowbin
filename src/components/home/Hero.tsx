import { LogoMark } from "@/components/brand/LogoMark";
import { site } from "@/lib/site";
import { HeroScrollButton } from "./HeroScrollButton";
import { LiquidCanvas } from "./LiquidCanvas";
import { Magnetic } from "./Magnetic";
import { HeroMotion } from "./motion/HeroMotion";

const LINE_1 = "Software";
const LINE_2A = "That";
const LINE_2B = "Moves";

function Chars({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((c, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static decorative glyphs.
        <span key={i} className="hero-char inline-block will-change-transform">
          {c}
        </span>
      ))}
    </>
  );
}

/**
 * Hero: liquid-chrome WebGL blob + a giant headline whose letters stretch along
 * Anybody's width axis as the pointer passes (a wave burst on touch screens).
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden pb-6 pt-24 sm:pb-8 sm:pt-28">
      <HeroMotion />
      {/* Colour fallback under the canvas */}
      <div
        aria-hidden="true"
        className="hero-canvas absolute inset-0 -z-10 bg-[radial-gradient(38%_42%_at_72%_42%,var(--plasma),transparent_70%),radial-gradient(34%_40%_at_62%_32%,var(--ultra),transparent_72%),var(--frost)] max-md:bg-[radial-gradient(60%_30%_at_50%_30%,var(--plasma),transparent_70%),radial-gradient(55%_28%_at_45%_24%,var(--ultra),transparent_72%),var(--frost)]"
      >
        <LiquidCanvas className="h-full w-full" />
      </div>

      {/* Top row */}
      <div className="mx-auto grid w-full max-w-[1600px] gap-8 px-[var(--gutter)] md:grid-cols-12">
        <div className="md:col-span-5 lg:col-span-4" data-hero-fade>
          <p className="label flex items-center gap-2 text-ink">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-plasma opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-plasma" />
            </span>
            Now booking new projects
          </p>
          <p className="mt-5 max-w-[22rem] text-[1.05rem] leading-relaxed text-ink-2 sm:text-lg">
            Arrowbin is a software studio that designs and engineers web
            platforms, mobile apps, AI systems and cloud infrastructure for
            ambitious companies, worldwide.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-13 items-center gap-3 rounded-full bg-ultra py-1.5 pl-6 pr-1.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_40px_-14px_rgba(59,43,255,0.7)] transition-colors hover:bg-ink"
              >
                Start a project
                <span className="grid h-10 w-10 place-items-center rounded-full bg-sun text-ink transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45">
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
              </a>
            </Magnetic>
            <a
              href="#work"
              className="inline-flex h-13 items-center rounded-full border border-ink/15 bg-white/60 px-6 text-[0.95rem] font-semibold text-ink backdrop-blur transition-colors hover:border-ink hover:bg-white"
            >
              See the work
            </a>
          </div>
        </div>
      </div>

      <div>
        {/* Headline */}
        <div className="hero-title mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
          <h1 className="display text-[clamp(1.9rem,10.6vw,11.5rem)] text-ink [contain:layout_paint] sm:text-[clamp(2.9rem,11.4vw,11.5rem)]">
            <span className="sr-only">
              Arrowbin, a custom software development company: software that
              moves.
            </span>
            <span
              aria-hidden="true"
              data-line="1"
              className="block overflow-x-visible overflow-y-clip whitespace-nowrap pb-[0.04em]"
            >
              <Chars text={LINE_1} />
            </span>
            <span
              aria-hidden="true"
              data-line="2"
              className="flex items-center gap-[0.12em] overflow-x-visible overflow-y-clip whitespace-nowrap pb-[0.04em] md:justify-end"
            >
              <span>
                <Chars text={LINE_2A} />
              </span>
              <span className="hero-char hero-pill relative inline-flex h-[0.7em] w-[1.35em] shrink-0 items-center overflow-hidden rounded-full bg-sun">
                <LogoMark className="hero-arrow absolute h-[0.5em] w-[0.5em] rotate-90 text-ultra" />
              </span>
              <span className="text-ultra">
                <Chars text={LINE_2B} />
              </span>
            </span>
          </h1>
        </div>

        {/* Bottom meta row */}
        <div
          data-hero-fade
          className="mx-auto mt-4 flex w-full max-w-[1600px] items-center justify-between gap-4 px-[var(--gutter)] text-ink-2"
        >
          <span className="label">Web · Mobile · SaaS · AI · Cloud</span>
          <HeroScrollButton className="group relative grid h-20 w-20 shrink-0 cursor-pointer place-items-center rounded-full bg-ink text-white transition-transform duration-500 ease-[var(--ease-out-expo)] hover:scale-105 max-sm:hidden">
            <svg
              viewBox="0 0 100 100"
              aria-hidden="true"
              className="spin-slow absolute inset-0 h-full w-full"
            >
              <defs>
                <path
                  id="hero-circle"
                  d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0"
                />
              </defs>
              <text className="fill-white font-mono text-[8.5px] uppercase">
                {/* textLength = circle circumference (2π·37), so the ring closes evenly */}
                <textPath
                  href="#hero-circle"
                  textLength="230"
                  lengthAdjust="spacing"
                >
                  Scroll · Explore · Scroll · Explore ·
                </textPath>
              </text>
            </svg>
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="h-4 w-4 text-sun transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0.5"
            >
              <path
                d="M8 2v11M3 8.5 8 13.5 13 8.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>
          </HeroScrollButton>
          <span className="label max-sm:hidden">
            © Arrowbin LLC · Worldwide
          </span>
        </div>
      </div>
    </section>
  );
}
