import { SectionLabel } from "@/components/home/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";

const STORES = [
  {
    store: "App Store",
    items: [
      "Developer account setup",
      "TestFlight beta for your team",
      "Listing, screenshots & preview",
      "Privacy labels & review compliance",
    ],
    tone: "bg-white text-ink ring-1 ring-ink/10",
  },
  {
    store: "Google Play",
    items: [
      "Play Console setup",
      "Internal & closed testing tracks",
      "Store listing & feature graphic",
      "Data safety form & policy checks",
    ],
    tone: "bg-white text-ink ring-1 ring-ink/10",
  },
];

const ALWAYS = [
  "Crash reporting",
  "Product analytics",
  "Over-the-air updates",
  "Staged rollouts",
  "Release notes",
  "Version support policy",
];

/**
 * Mobile App: the launch kit. Everything we handle to get an app live in both
 * stores and keep it healthy, so founders never face store review alone.
 */
export function LaunchKit({ label }: { label: string }) {
  return (
    <section className="relative bg-ultra py-20 text-white sm:py-28">
      <SectionReveal />
      <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-[var(--gutter)] lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionLabel index={label} title="Launch kit" tone="text-white" />
          <h2
            className="display mt-5 text-[clamp(2.2rem,4.4vw,4.4rem)]"
            style={{ ["--wdth" as string]: 100 }}
          >
            From build to both stores
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-white/85">
            Store review is where many first apps stall. We handle all of it,
            then keep your app healthy after launch.
          </p>
        </div>
        <div className="grid gap-5 lg:col-span-8">
          <div className="grid gap-5 md:grid-cols-2">
            {STORES.map((s, i) => (
              <div
                key={s.store}
                data-rv={i}
                className={`rounded-[1.75rem] p-7 sm:p-8 ${s.tone}`}
              >
                <p className="label text-ink-2">Publish to</p>
                <h3
                  className="mt-2 font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-black uppercase leading-none tracking-[-0.03em]"
                  style={{ fontVariationSettings: '"wdth" 106' }}
                >
                  {s.store}
                </h3>
                <ul data-inview className="mt-6 grid gap-0">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-center gap-3 border-t border-ink/10 py-3 text-[0.95rem] font-medium"
                    >
                      <span
                        aria-hidden="true"
                        className="iv-pop grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ultra text-xs text-white"
                      >
                        ✓
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div data-rv className="rounded-[1.75rem] bg-sun p-7 text-ink sm:p-8">
            <p className="label">Included after launch</p>
            <ul data-inview className="mt-4 flex flex-wrap gap-2">
              {ALWAYS.map((a) => (
                <li
                  key={a}
                  className="iv-pop rounded-full bg-white px-4 py-2 text-sm font-semibold"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
