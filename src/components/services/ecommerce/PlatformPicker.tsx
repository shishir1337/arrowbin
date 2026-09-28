import { SectionLabel } from "@/components/home/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";

type Meter = { label: string; value: number; text: string };

const PLATFORMS: {
  name: string;
  tag?: string;
  bestFor: string;
  tone: string;
  bar: string;
  meters: Meter[];
  points: string[];
}[] = [
  {
    name: "Shopify",
    tag: "Most stores start here",
    bestFor: "New brands and growing stores that want to sell fast.",
    tone: "bg-white text-ink ring-1 ring-ink/10",
    bar: "bg-ultra",
    meters: [
      { label: "Launch speed", value: 5, text: "3–6 weeks" },
      { label: "Design freedom", value: 3, text: "Themes + custom sections" },
      { label: "Affordability", value: 4, text: "Low; monthly plan + apps" },
    ],
    points: [
      "Hosting, security and checkout handled",
      "Huge app ecosystem",
      "Your team edits everything",
    ],
  },
  {
    name: "Headless Next.js",
    tag: "Best performance",
    bestFor: "Brands where speed, SEO and a unique experience drive sales.",
    tone: "bg-ultra text-white",
    bar: "bg-sun",
    meters: [
      { label: "Launch speed", value: 3, text: "8–12 weeks" },
      { label: "Design freedom", value: 5, text: "Anything you can imagine" },
      { label: "Affordability", value: 3, text: "Moderate hosting + upkeep" },
    ],
    points: [
      "Fastest page loads and best SEO",
      "Shopify or Medusa behind the scenes",
      "Content from a headless CMS",
    ],
  },
  {
    name: "Custom platform",
    tag: "For unique models",
    bestFor: "Marketplaces, B2B pricing or anything off-the-shelf can't do.",
    tone: "bg-plasma text-ink",
    bar: "bg-ink",
    meters: [
      { label: "Launch speed", value: 2, text: "12+ weeks" },
      { label: "Design freedom", value: 5, text: "Total control" },
      { label: "Affordability", value: 2, text: "Higher; you own it all" },
    ],
    points: [
      "Multi-vendor and custom pricing rules",
      "No platform fees or limits",
      "Built around your operations",
    ],
  },
];

/** E-commerce: which platform fits, compared honestly on three meters. */
export function PlatformPicker({ label }: { label: string }) {
  return (
    <section className="relative bg-lilac py-20 sm:py-28">
      <SectionReveal />
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="Platforms" />
            <h2
              className="display mt-5 max-w-[14ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              Which platform fits your store?
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink/85 sm:text-lg">
            We build on all three, so we have no reason to push one. Here is how
            they compare.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 lg:grid-cols-3 lg:grid-rows-[repeat(5,auto)] lg:gap-y-0">
          {PLATFORMS.map((p, i) => (
            <li
              key={p.name}
              data-rv={i}
              className={`flex flex-col rounded-[2rem] p-7 sm:p-8 lg:row-span-5 lg:grid lg:grid-rows-subgrid ${p.tone}`}
            >
              {p.tag ? (
                <span className="label self-start justify-self-start rounded-full bg-sun px-3 py-1.5 text-ink">
                  {p.tag}
                </span>
              ) : null}
              <h3
                className="mt-6 font-display text-[clamp(1.8rem,2.8vw,2.6rem)] font-black uppercase leading-[0.92] tracking-[-0.03em]"
                style={{ fontVariationSettings: '"wdth" 106' }}
              >
                {p.name}
              </h3>
              <p className="mt-3 text-base font-medium leading-relaxed opacity-90">
                {p.bestFor}
              </p>
              <ul data-inview className="mt-8 grid gap-5">
                {p.meters.map((m) => (
                  <li key={m.label}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="label opacity-85">{m.label}</span>
                      <span className="text-sm font-semibold">{m.text}</span>
                    </div>
                    <div
                      aria-hidden="true"
                      className="mt-2 grid grid-cols-5 gap-1"
                    >
                      {[1, 2, 3, 4, 5].map((k) => (
                        <span
                          key={k}
                          className={`h-2 rounded-full ${k <= m.value ? `iv-bar ${p.bar}` : "bg-current opacity-15"}`}
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
              <ul className="mt-8 grid gap-2 border-t border-current/15 pt-6">
                {p.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-center gap-3 text-[0.95rem]"
                  >
                    <span aria-hidden="true">✦</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink/85">
          Meters are relative: more bars is better. Timelines are typical for a
          full launch; smaller scopes go faster.
        </p>
      </div>
    </section>
  );
}
