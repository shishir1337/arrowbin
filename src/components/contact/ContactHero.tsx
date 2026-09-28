import { Crumbs } from "@/components/ui/Crumbs";
import { site } from "@/lib/site";
import { CopyEmail } from "./CopyEmail";

/**
 * /contact hero: kinetic headline and the three direct ways to reach us
 * (email with copy, a booked call, phone).
 */
export function ContactHero({
  crumbs,
}: {
  crumbs: { name: string; path: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden pb-12 pt-10 sm:pb-16 sm:pt-14">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <Crumbs items={crumbs} />
        <div className="mt-10 grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1
              data-kinetic
              className="display text-[clamp(3rem,7vw,7.4rem)] text-ink"
              style={{ ["--wdth" as string]: 104 }}
            >
              {["Tell us", "what you're", "building."].map((line, i) => (
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
              A rough idea is plenty. Send a short brief below, email us, or
              book a call. A real person replies within one business day, with
              no pressure and no obligation.
            </p>
          </div>

          <ul className="svh-fade grid gap-3 lg:col-span-5">
            <li className="rounded-[1.5rem] bg-white p-5 ring-1 ring-ink/10 sm:p-6">
              <p className="label text-ink-2">Email</p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="font-display text-xl font-black tracking-[-0.02em] text-ink underline decoration-ink/20 decoration-2 underline-offset-4 transition-colors duration-500 hover:text-ultra hover:decoration-ultra sm:text-2xl"
                >
                  {site.email}
                </a>
                <CopyEmail email={site.email} />
              </div>
            </li>
            <li>
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-[1.5rem] bg-ultra p-5 text-white transition-colors duration-500 hover:bg-ink sm:p-6"
              >
                <span>
                  <span className="label block text-sun">Prefer to talk?</span>
                  <span className="mt-2 block font-display text-xl font-black uppercase leading-none tracking-[-0.02em] sm:text-2xl">
                    Book a free 30-min call
                  </span>
                </span>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sun text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45">
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
            </li>
            <li className="rounded-[1.5rem] bg-white p-5 ring-1 ring-ink/10 sm:p-6">
              <p className="label text-ink-2">Phone</p>
              <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
                {site.phones.map((p) => (
                  <li key={p.value}>
                    <a
                      href={p.href}
                      className="font-semibold text-ink transition-colors duration-500 hover:text-ultra"
                    >
                      {p.value}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
