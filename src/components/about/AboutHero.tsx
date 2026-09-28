import Image from "next/image";
import Link from "next/link";
import { Magnetic } from "@/components/home/Magnetic";
import { Crumbs } from "@/components/ui/Crumbs";
import { author } from "@/lib/site";

const FACTS = [
  { value: "2020", label: "Building since" },
  { value: "15+", label: "Brands shipped for" },
  { value: "08", label: "Disciplines, one team" },
];

/**
 * /about hero: kinetic three-line headline, and
 * a framed founder portrait with a pinned note.
 */
export function AboutHero({
  crumbs,
  blur,
}: {
  crumbs: { name: string; path: string }[];
  blur?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <Crumbs items={crumbs} />
        <div className="mt-10 grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1
              data-kinetic
              className="display text-[clamp(3rem,8.6vw,8.6rem)] text-ink"
              style={{ ["--wdth" as string]: 104 }}
            >
              {["We build it", "like it's", "ours."].map((line, i) => (
                <span key={line} className="block overflow-y-clip pb-[0.04em]">
                  <span
                    className="svh-line block"
                    style={{ animationDelay: `${120 + i * 110}ms` }}
                  >
                    {i === 2 ? (
                      <span className="text-ultra">{line}</span>
                    ) : (
                      line
                    )}
                  </span>
                </span>
              ))}
            </h1>
            <p className="svh-fade mt-8 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl">
              Arrowbin is a software company for startups and growing
              businesses. We design, build and look after the products that run
              them, for clients around the world, with the care we&apos;d give
              our own.
            </p>
            <dl className="svh-fade mt-10 grid max-w-xl grid-cols-3 gap-3">
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  className="rounded-[1.25rem] bg-white p-4 ring-1 ring-ink/10 sm:p-5"
                >
                  <dt className="text-xs font-semibold text-ink-2 sm:text-sm">
                    {f.label}
                  </dt>
                  <dd
                    className="mt-1.5 font-display text-2xl font-black leading-none tabular-nums text-ink sm:text-4xl"
                    style={{ fontVariationSettings: '"wdth" 110' }}
                  >
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="svh-fade mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link
                  href="/contact"
                  className="group inline-flex h-13 items-center gap-3 rounded-full bg-ultra py-1.5 pl-6 pr-1.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_40px_-14px_rgba(59,43,255,0.7)] transition-colors duration-500 hover:bg-ink"
                >
                  Work with us
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
              <Link
                href="/work"
                className="inline-flex h-13 items-center rounded-full border border-ink/15 bg-white px-6 text-[0.95rem] font-semibold text-ink transition-colors duration-500 hover:border-ink"
              >
                See our work
              </Link>
            </div>
          </div>

          {/* Founder portrait */}
          <figure className="svh-fade relative mx-auto w-[82%] max-w-[420px] lg:col-span-5">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 rotate-3 rounded-[2rem] bg-plasma"
            />
            <div
              data-tilt="4"
              className="relative -rotate-2 rounded-[2rem] bg-white p-3 shadow-[0_40px_70px_-36px_rgba(14,11,36,0.6)] ring-1 ring-ink/10"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-lilac">
                <Image
                  src={author.image}
                  alt={`${author.name}, ${author.jobTitle} of Arrowbin`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 82vw"
                  className="object-cover"
                  {...(blur
                    ? { placeholder: "blur" as const, blurDataURL: blur }
                    : {})}
                />
              </div>
              <figcaption className="flex items-center justify-between gap-3 px-2 pb-1 pt-4">
                <span>
                  <span className="block font-display text-lg font-black uppercase leading-none tracking-[-0.02em] text-ink">
                    {author.name}
                  </span>
                  <span className="mt-1 block text-sm text-ink-2">
                    {author.jobTitle}, Arrowbin
                  </span>
                </span>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ultra font-display text-sm font-black text-white">
                  A
                </span>
              </figcaption>
            </div>
            <p className="absolute -top-6 -left-3 max-w-[15rem] rotate-[-4deg] rounded-2xl bg-sun px-4 py-3 text-sm font-semibold leading-snug text-ink shadow-[0_18px_36px_-18px_rgba(14,11,36,0.6)] sm:-left-8">
              Founder-led since 2020. You talk to the people building your
              product.
            </p>
          </figure>
        </div>
      </div>
    </section>
  );
}
