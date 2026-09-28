import Link from "next/link";
import { SectionLabel } from "@/components/home/SectionLabel";

const MODELS = [
  {
    tag: "Most popular",
    name: "Project",
    lead: "A defined build with a fixed, itemised estimate.",
    fit: "Best for MVPs, launches, redesigns and new platforms.",
    points: [
      "Discovery call, then a written scope",
      "Fixed estimate before any work starts",
      "Weekly demos until launch",
    ],
    cta: { label: "Scope a project", href: "/contact" },
    tone: "bg-ultra text-white",
    chip: "bg-sun text-ink",
    rot: "xl:-rotate-2",
  },
  {
    tag: "For growing products",
    name: "Product team",
    lead: "A senior squad working on your roadmap, month to month.",
    fit: "Best for SaaS and products that ship continuously.",
    points: [
      "Design, engineering and QA in one team",
      "Monthly plan, weekly releases",
      "Scale the team up or down as you need",
    ],
    cta: { label: "Talk about a team", href: "/contact" },
    tone: "bg-plasma text-ink",
    chip: "bg-ink text-white",
    rot: "xl:translate-y-8",
  },
  {
    tag: "After launch",
    name: "Care plan",
    lead: "Monitoring, updates and fixes so it keeps running well.",
    fit: "Best for live sites, stores and apps.",
    points: [
      "Security updates and backups",
      "Uptime monitoring and fast fixes",
      "Small improvements every month",
    ],
    cta: {
      label: "See maintenance & support",
      href: "/services/maintenance-support",
    },
    tone: "bg-sun text-ink",
    chip: "bg-ultra text-white",
    rot: "xl:rotate-2",
  },
];

/** Three ways to engage, as tilted colour cards that straighten on hover. */
export function Engagement({ label = "03" }: { label?: string } = {}) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="How we work together" />
            <h2
              className="display mt-5 max-w-[14ch] text-[clamp(2.4rem,6vw,6rem)] text-ink"
              style={{ ["--wdth" as string]: 104 }}
            >
              Three ways to start
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-ink-2 sm:text-lg">
            Same senior team either way. Pick the shape that fits where your
            product is today; you can switch later.
          </p>
        </div>

        <ul
          data-inview="deal"
          className="mt-14 grid gap-5 xl:grid-cols-3 xl:grid-rows-[repeat(6,auto)] xl:gap-x-6 xl:gap-y-0"
        >
          {MODELS.map((m) => (
            <li
              key={m.name}
              className={`group flex flex-col rounded-[2rem] p-7 xl:row-span-6 xl:grid xl:grid-rows-subgrid shadow-[0_30px_60px_-34px_rgba(14,11,36,0.55)] transition-[rotate,translate,box-shadow] duration-700 ease-[var(--ease-out-expo)] hover:rotate-0 hover:-translate-y-2 hover:shadow-[0_40px_70px_-34px_rgba(14,11,36,0.6)] sm:p-9 ${m.tone} ${m.rot}`}
            >
              <span
                className={`label self-start justify-self-start rounded-full px-3 py-1.5 ${m.chip}`}
              >
                {m.tag}
              </span>
              <h3
                className="mt-8 font-display text-[clamp(2.2rem,3.6vw,3.4rem)] font-black uppercase leading-[0.9] tracking-[-0.04em]"
                style={{ fontVariationSettings: '"wdth" 110' }}
              >
                {m.name}
              </h3>
              <p className="mt-4 text-lg font-semibold leading-snug">
                {m.lead}
              </p>
              <p className="mt-2 text-base leading-relaxed opacity-85">
                {m.fit}
              </p>
              <ul className="mt-8 grid gap-0">
                {m.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 border-t border-current/20 py-3 text-[0.95rem] font-medium"
                  >
                    <span aria-hidden="true">✦</span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href={m.cta.href}
                className="mt-auto inline-flex items-center gap-2 self-start justify-self-start pt-8 xl:self-end font-display text-base font-bold uppercase tracking-tight underline decoration-2 underline-offset-8 transition-[text-underline-offset] duration-500 hover:underline-offset-4"
              >
                {m.cta.label} →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
