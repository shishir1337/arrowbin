import Link from "next/link";
import { Magnetic } from "@/components/home/Magnetic";
import { Crumbs } from "@/components/ui/Crumbs";
import { site } from "@/lib/site";
import { WorkDeck } from "./WorkDeck";

/**
 * /work hero: three-word kinetic headline with a live-project sticker, and a
 * self-shuffling deck of real screenshots.
 */
export function WorkHero({
  crumbs,
  count,
  shots,
}: {
  crumbs: { name: string; path: string }[];
  count: number;
  shots: { name: string; image: string; blur?: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden pb-12 pt-10 sm:pb-16 sm:pt-14">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <Crumbs items={crumbs} />
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1
              data-kinetic
              className="display text-[clamp(3.2rem,10vw,10rem)] text-ink"
              style={{ ["--wdth" as string]: 104 }}
            >
              {["Built.", "Shipped.", "Live."].map((line, i) => (
                <span key={line} className="block overflow-y-clip pb-[0.04em]">
                  <span
                    className="svh-line block"
                    style={{ animationDelay: `${120 + i * 110}ms` }}
                  >
                    {i === 2 ? (
                      <>
                        <span className="text-ultra">{line}</span>{" "}
                        <span
                          aria-hidden="true"
                          className="svh-sticker"
                          data-label={`${count} live projects`}
                        />
                      </>
                    ) : (
                      line
                    )}
                  </span>
                </span>
              ))}
            </h1>
            <p className="svh-fade mt-8 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl">
              Stores, platforms and websites we&apos;ve designed and built for
              clients around the world. No mockups: every one is live, and you
              can open it right now.
            </p>
            <div className="svh-fade mt-8 flex flex-wrap items-center gap-3">
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
          <div className="svh-fade lg:col-span-5">
            <WorkDeck shots={shots} />
          </div>
        </div>
      </div>
    </section>
  );
}
