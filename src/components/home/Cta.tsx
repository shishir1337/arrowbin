import { site } from "@/lib/site";
import { ArrowField } from "./ArrowField";
import { Magnetic } from "./Magnetic";

/**
 * Closing CTA (ultraviolet band): hundreds of arrowheads all point at the visitor's
 * cursor while a giant magnetic sun orb asks for the call.
 */
export function Cta({ index = "09" }: { index?: string } = {}) {
  return (
    <section className="relative isolate overflow-hidden bg-ultra text-white">
      <ArrowField className="absolute inset-0 -z-10 h-full w-full" />
      <div className="pointer-events-none mx-auto flex min-h-[92svh] w-full max-w-[1600px] flex-col items-center justify-center px-[var(--gutter)] py-28 text-center">
        <p className="label text-sun">({index}) — Your move</p>
        <h2
          className="display mt-6 text-[clamp(3.2rem,11vw,12rem)]"
          style={{ ["--wdth" as string]: 112 }}
        >
          Let&apos;s build
          <br />
          something <span className="text-sun">loud</span>
        </h2>
        <p className="mt-8 max-w-xl rounded-2xl bg-ultra/80 px-4 py-2 text-lg leading-relaxed text-white/90 backdrop-blur-[3px]">
          Tell us what you&apos;re making. You&apos;ll get a straight answer on
          scope, timeline and cost from a senior engineer, usually within a day.
        </p>
        <div className="pointer-events-auto mt-12 flex flex-col items-center gap-8 sm:flex-row sm:gap-12">
          <Magnetic strength={0.45}>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative grid h-44 w-44 place-items-center rounded-full bg-sun text-ink shadow-[0_30px_80px_-20px_rgba(255,210,63,0.8)] transition-transform duration-500 ease-[var(--ease-out-expo)] hover:scale-110 sm:h-52 sm:w-52"
            >
              <span className="absolute inset-0 rounded-full border-2 border-sun [animation:sa-ring_2.4s_ease-out_infinite]" />
              <span className="font-display text-xl font-black uppercase leading-none tracking-tight sm:text-2xl">
                Book a
                <br />
                call ↗
              </span>
            </a>
          </Magnetic>
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <a
              href={`mailto:${site.email}`}
              className="font-display text-2xl font-bold underline decoration-sun decoration-2 underline-offset-8 transition-colors hover:text-sun sm:text-3xl"
            >
              {site.email}
            </a>
            <span className="label text-white/85">or write to us directly</span>
          </div>
        </div>
      </div>
    </section>
  );
}
