import Link from "next/link";
import { ServiceArt } from "@/components/brand/ServiceArt";
import { Magnetic } from "@/components/home/Magnetic";
import { Crumbs } from "@/components/ui/Crumbs";
import { services } from "@/lib/services";
import { serviceTheme } from "@/lib/serviceThemes";
import { site } from "@/lib/site";
import { ServicesHeroMotion } from "./ServicesHeroMotion";

/** Where each floating service tile sits (desktop) and how far it drifts. */
const SPOTS = [
  {
    pos: "right-[38%] top-[6%]",
    rot: "-rotate-6",
    size: "h-24 w-24",
    depth: 0.6,
  },
  { pos: "right-[20%] top-[2%]", rot: "rotate-3", size: "h-28 w-28", depth: 1 },
  {
    pos: "right-[3%] top-[12%]",
    rot: "rotate-12",
    size: "h-24 w-24",
    depth: 0.8,
  },
  {
    pos: "right-[30%] top-[34%]",
    rot: "rotate-6",
    size: "h-20 w-20",
    depth: 1.3,
  },
  {
    pos: "right-[12%] top-[38%]",
    rot: "-rotate-12",
    size: "h-32 w-32",
    depth: 0.5,
  },
  {
    pos: "right-[40%] top-[60%]",
    rot: "-rotate-3",
    size: "h-24 w-24",
    depth: 1.1,
  },
  {
    pos: "right-[22%] top-[66%]",
    rot: "rotate-6",
    size: "h-20 w-20",
    depth: 0.7,
  },
  {
    pos: "right-[2%] top-[62%]",
    rot: "-rotate-6",
    size: "h-28 w-28",
    depth: 0.9,
  },
];

/**
 * /services hero: giant three-line headline, and all eight service artworks
 * floating as colour tiles that drift with the pointer (desktop). On phones
 * the tiles line up as a strip under the headline.
 */
export function ServicesHero({
  crumbs,
}: {
  crumbs: { name: string; path: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden pb-6 pt-10 sm:pb-10 sm:pt-14">
      <ServicesHeroMotion />
      {/* Floating tiles (desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-[var(--gutter)] left-1/2 -z-10 max-xl:hidden"
      >
        {services.map((s, i) => {
          const t = serviceTheme(i);
          const spot = SPOTS[i];
          return (
            <div
              key={s.slug}
              data-depth={spot.depth}
              className={`svh-float absolute ${spot.pos}`}
            >
              <div
                className={`svh-bob grid place-items-center rounded-[1.6rem] p-4 shadow-[0_24px_40px_-24px_rgba(14,11,36,0.5)] ${spot.size} ${spot.rot} ${t.bg} ${t.bg === "bg-white" ? "ring-1 ring-ink/10" : ""}`}
                style={{ animationDelay: `${i * -0.7}s` }}
              >
                <ServiceArt
                  slug={s.slug}
                  fg={t.fg}
                  accent={t.accent}
                  className="h-full w-full"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <Crumbs items={crumbs} />

        <h1
          data-kinetic
          className="display mt-10 text-[clamp(2.6rem,8.6vw,9rem)] text-ink"
          style={{ ["--wdth" as string]: 104 }}
        >
          {["Software", "development", "services"].map((line, i) => (
            <span key={line} className="block overflow-y-clip pb-[0.04em]">
              <span
                className="svh-line block"
                style={{ animationDelay: `${120 + i * 110}ms` }}
              >
                {i === 2 ? <span className="text-ultra">{line}</span> : line}
              </span>
            </span>
          ))}
        </h1>

        {/* Tile strip (phones/tablets): a slow marquee of all eight */}
        <div
          aria-hidden="true"
          className="marquee-mask -mx-[var(--gutter)] mt-8 overflow-hidden xl:hidden"
        >
          <div
            className="marquee-track gap-3 py-2"
            style={{ animationDuration: "28s" }}
          >
            {[...services, ...services].map((s, k) => {
              const i = k % services.length;
              const t = serviceTheme(i);
              return (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: duplicated marquee strip.
                  key={k}
                  className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl p-2.5 sm:h-20 sm:w-20 ${t.bg} ${t.bg === "bg-white" ? "ring-1 ring-ink/10" : ""} ${i % 2 ? "rotate-3" : "-rotate-3"}`}
                >
                  <ServiceArt
                    slug={s.slug}
                    fg={t.fg}
                    accent={t.accent}
                    className="h-full w-full"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:max-w-[46%]">
          <p className="svh-fade text-lg leading-relaxed text-ink-2 sm:text-xl">
            From a first MVP to an enterprise platform, one senior team designs,
            builds, launches and looks after your software. Strategy, UX, web,
            mobile, AI and cloud, under one roof.
          </p>
          <div className="svh-fade flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link
                href="/contact"
                className="group inline-flex h-13 items-center gap-3 rounded-full bg-ultra py-1.5 pl-6 pr-1.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_40px_-14px_rgba(59,43,255,0.7)] transition-colors duration-500 hover:bg-ink"
              >
                Start your project
                <span className="grid h-10 w-10 place-items-center rounded-full bg-sun text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45">
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
              </Link>
            </Magnetic>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center rounded-full border border-ink/15 bg-white px-6 text-[0.95rem] font-semibold text-ink transition-colors duration-500 hover:border-ink"
            >
              Book a free call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
