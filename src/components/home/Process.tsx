import { LogoMark } from "@/components/brand/LogoMark";
import { ProcessMotion } from "./motion/ProcessMotion";
import { SectionLabel } from "./SectionLabel";

const STEPS = [
  {
    title: "Discover",
    text: "We dig into your goals, users and constraints, then agree on a prioritised scope and a fixed estimate.",
    chips: ["Workshops", "Scope", "Estimate"],
    color: "bg-ultra text-white",
  },
  {
    title: "Design",
    text: "Architecture and UX/UI mapped out and clickable, so the plan is proven before anyone writes code.",
    chips: ["UX flows", "UI system", "Prototype"],
    color: "bg-plasma text-ink",
  },
  {
    title: "Build",
    text: "Agile sprints with a demo every week. You see working software early and steer as we go.",
    chips: ["Sprints", "Weekly demos", "QA"],
    color: "bg-sun text-ink",
  },
  {
    title: "Launch & grow",
    text: "We deploy, monitor and keep improving long after launch day: performance, features, scale.",
    chips: ["Deploy", "Monitor", "Iterate"],
    color: "bg-flare text-ink",
  },
];

// viewBox 0 0 100 1000, stretched to the container (preserveAspectRatio="none").
const D_DESKTOP =
  "M50 0 C 92 60, 92 190, 50 250 S 8 440, 50 500 S 92 690, 50 750 S 8 940, 50 1000";
const D_MOBILE =
  "M10 0 C 20 60, 20 190, 10 250 S 0 440, 10 500 S 20 690, 10 750 S 0 940, 10 1000";

/**
 * Process: a thick path snakes down the page and draws itself with scroll; the
 * Arrowbin mark rides its tip, and each step card pops as the line reaches it.
 */
export function Process() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <ProcessMotion />
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="max-w-3xl">
          <SectionLabel index="05" title="Process" />
          <h2
            className="display mt-5 text-[clamp(2.8rem,8vw,8rem)] text-ink"
            style={{ ["--wdth" as string]: 100 }}
          >
            From first call to <span className="text-ultra">launch</span>
          </h2>
        </div>

        <div className="proc-box relative mt-16 sm:mt-24">
          <svg
            className="proc-svg pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={D_DESKTOP}
              fill="none"
              stroke="rgba(14,11,36,.1)"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="2 8"
            />
            <path
              className="proc-line"
              d={D_DESKTOP}
              fill="none"
              stroke="var(--ultra)"
              strokeWidth="6"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <svg
            className="proc-svg pointer-events-none absolute inset-0 h-full w-full md:hidden"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={D_MOBILE}
              fill="none"
              stroke="rgba(14,11,36,.1)"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="2 8"
            />
            <path
              className="proc-line"
              d={D_MOBILE}
              fill="none"
              stroke="var(--ultra)"
              strokeWidth="5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div
            aria-hidden="true"
            className="proc-rider pointer-events-none absolute left-0 top-0 z-10 -ml-5 -mt-5 grid h-10 w-10 place-items-center rounded-full bg-ink shadow-lg max-md:hidden md:-ml-7 md:-mt-7 md:h-14 md:w-14"
          >
            <LogoMark className="h-5 w-5 text-sun md:h-7 md:w-7" />
          </div>

          <ol className="relative">
            {STEPS.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={s.title}
                  className={`flex min-h-[26rem] items-center py-6 pl-[16%] md:min-h-[30rem] md:pl-0 ${left ? "md:justify-start" : "md:justify-end"}`}
                >
                  <div
                    data-side={left ? "l" : "r"}
                    className="proc-card w-full max-w-md rounded-[1.75rem] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(14,11,36,0.35)] ring-1 ring-ink/5 sm:p-8 md:w-[40%]"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`grid h-14 w-14 place-items-center rounded-2xl font-display text-2xl font-black ${s.color}`}
                      >
                        {i + 1}
                      </span>
                      <span className="label text-ink-2">Step 0{i + 1}</span>
                    </div>
                    <h3
                      className="mt-6 font-display text-[clamp(2rem,3.4vw,3.2rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-ink"
                      style={{ fontVariationSettings: '"wdth" 115' }}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-ink-2">
                      {s.text}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {s.chips.map((c) => (
                        <li
                          key={c}
                          className="rounded-full bg-frost px-3 py-1 text-xs font-medium text-ink"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
