import { ServiceArt } from "@/components/brand/ServiceArt";
import { Crumbs } from "@/components/ui/Crumbs";
import type { Service } from "@/lib/services";
import { serviceTheme } from "@/lib/serviceThemes";
import { site } from "@/lib/site";
import { ServiceQuoteForm } from "./ServiceQuoteForm";

const TRUST = [
  "You own your code",
  "Senior engineers only",
  "Fixed, itemised estimates",
  "Clients worldwide",
];

/**
 * Service detail hero, themed in the service's own colour. Left: number,
 * giant name, intro and actions. Right: the quote form as a white card lying
 * on a tilted colour panel with the service artwork peeking out above it.
 */
export function ServiceHero({
  service,
  index,
  total,
  crumbs,
}: {
  service: Service;
  index: number;
  total: number;
  crumbs: { name: string; path: string }[];
}) {
  const t = serviceTheme(index);
  const panel = t.bg === "bg-white" ? "bg-ultra" : t.bg;
  const art = t.bg === "bg-white" ? serviceTheme(0) : t;

  return (
    <section className="relative isolate overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <Crumbs items={crumbs} />

        <div className="mt-10 grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="label svh-fade flex items-center gap-3 text-ink">
              <span className={`h-2.5 w-2.5 rounded-full ${panel}`} />
              Service {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </p>
            <h1
              data-kinetic
              className="display mt-6 text-[clamp(2.4rem,6.4vw,7rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              {service.heading.split(" ").map((word, i) => (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: static words.
                  key={i}
                  className="inline-block overflow-y-clip pb-[0.04em] pr-[0.22em] align-top"
                >
                  <span
                    className="svh-line block"
                    style={{ animationDelay: `${100 + i * 90}ms` }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>
            <p className="svh-fade mt-8 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">
              {service.intro}
            </p>
            <div className="svh-fade mt-8 flex flex-wrap items-center gap-3">
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-13 items-center gap-3 rounded-full bg-ultra py-1.5 pl-6 pr-1.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_40px_-14px_rgba(59,43,255,0.7)] transition-colors duration-500 hover:bg-ink"
              >
                Book a free call
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
              </a>
              <a
                href="#what-you-get"
                className="inline-flex h-13 items-center rounded-full border border-ink/15 bg-white px-6 text-[0.95rem] font-semibold text-ink transition-colors duration-500 hover:border-ink"
              >
                See what you get
              </a>
            </div>
            <ul className="svh-fade mt-8 flex flex-wrap gap-2">
              {TRUST.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-ink ring-1 ring-ink/10"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-plasma" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="svh-fade relative lg:col-span-5 lg:mt-4">
            {/* Tilted colour panel behind the form, artwork peeking out */}
            <div
              aria-hidden="true"
              className={`absolute -bottom-4 top-10 left-1 right-1 rotate-[-3deg] rounded-[2rem] sm:-left-4 sm:-right-4 ${panel}`}
            />
            <div
              aria-hidden="true"
              className={`svh-bob absolute -top-12 right-6 z-10 grid h-24 w-24 place-items-center rounded-[1.4rem] p-4 shadow-[0_24px_40px_-24px_rgba(14,11,36,0.6)] rotate-6 sm:h-28 sm:w-28 ${panel}`}
            >
              <ServiceArt
                slug={service.slug}
                fg={art.fg}
                accent={art.accent}
                className="h-full w-full"
              />
            </div>
            <div className="relative pt-6" data-tilt="4">
              <ServiceQuoteForm serviceName={service.name} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
