import { LogoMark } from "@/components/brand/LogoMark";
import { NumbersMotion } from "./motion/NumbersMotion";
import { SectionLabel } from "./SectionLabel";

const STATS = [
  {
    to: 15,
    prefix: "",
    suffix: "+",
    title: "Brands shipped for",
    text: "Retail, agro-export, fashion, fintech and media, across several countries.",
  },
  {
    to: 8,
    prefix: "0",
    suffix: "",
    title: "Disciplines, one team",
    text: "Strategy, design, web, mobile, SaaS, AI, cloud and support under one roof.",
  },
  {
    to: 12,
    from: 7,
    prefix: "6–",
    suffix: "",
    title: "Weeks to first launch",
    text: "A usable first version in weeks, not quarters, then weekly releases after.",
  },
  {
    to: 100,
    prefix: "",
    suffix: "%",
    title: "Code you own",
    text: "Source, designs and infrastructure are yours. No lock-in, ever.",
  },
];

/**
 * Numbers (sun band): oversized hollow numerals that flood with ink from left to
 * right and count up as each row crosses the viewport.
 */
export function Numbers() {
  return (
    <section className="relative overflow-hidden bg-sun py-24 text-ink sm:py-32">
      <NumbersMotion />
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="03" title="By the numbers" />
            <h2
              className="display mt-5 max-w-[12ch] text-[clamp(2.6rem,7vw,7.5rem)]"
              style={{ ["--wdth" as string]: 105 }}
            >
              Numbers that don&apos;t whisper
            </h2>
          </div>
          <div className="num-sticker relative grid h-32 w-32 shrink-0 place-items-center rounded-full bg-ink text-sun sm:h-40 sm:w-40">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="num-circle"
                  d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0"
                />
              </defs>
              <text className="fill-sun font-mono text-[8.4px] uppercase tracking-[0.25em]">
                <textPath href="#num-circle">
                  Real work · Real launches · Real work ·
                </textPath>
              </text>
            </svg>
            <LogoMark className="h-10 w-10 text-white [--mark-bit:var(--plasma)]" />
          </div>
        </div>

        <div className="mt-14 border-t-2 border-ink">
          {STATS.map((s) => (
            <div
              key={s.title}
              data-to={s.to}
              data-from={"from" in s ? s.from : 0}
              className="num-row group grid items-center gap-4 border-b-2 border-ink py-6 sm:py-8 md:grid-cols-12"
            >
              <div className="relative font-display text-[clamp(4.2rem,13vw,12rem)] font-black leading-[0.8] tracking-[-0.05em] transition-[font-variation-settings] duration-700 [font-variation-settings:'wdth'_105] group-hover:[font-variation-settings:'wdth'_122] md:col-span-7">
                <span className="outline-text block" aria-hidden="true">
                  {s.prefix}
                  <span className="num-val-ghost">{s.to}</span>
                  {s.suffix}
                </span>
                {/* Reveal mask: the wrapper slides in while its content slides the
                    opposite way, so the ink "floods" left→right using transforms only. */}
                <span className="num-fill absolute inset-0 block overflow-hidden will-change-transform">
                  <span className="num-fill-in block text-ink will-change-transform">
                    {s.prefix}
                    <span className="num-val">{s.to}</span>
                    {s.suffix}
                  </span>
                </span>
              </div>
              <div className="num-copy md:col-span-5 md:pl-6">
                <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-md text-base leading-relaxed text-ink/85">
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
