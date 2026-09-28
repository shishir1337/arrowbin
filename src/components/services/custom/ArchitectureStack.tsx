import { SectionLabel } from "@/components/home/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";

const LAYERS = [
  {
    name: "Interface",
    what: "What your users touch: fast, accessible web apps and dashboards.",
    tech: ["React", "Next.js", "TypeScript"],
    tone: "bg-sun text-ink",
  },
  {
    name: "Logic & APIs",
    what: "Your business rules, workflows and integrations with other systems.",
    tech: ["Node.js", "Python", "REST & GraphQL"],
    tone: "bg-plasma text-ink",
  },
  {
    name: "Data",
    what: "A clean data model you own, with backups and reporting built in.",
    tech: ["PostgreSQL", "Redis"],
    tone: "bg-lilac text-ink",
  },
  {
    name: "Infrastructure",
    what: "Cloud hosting that scales, with automated deploys and monitoring.",
    tech: ["AWS", "Docker", "CI/CD"],
    tone: "bg-white text-ink ring-1 ring-ink/10",
  },
];

/**
 * Custom Software: how the system is built, as a layered stack diagram with
 * security running through every layer. Replaces a flat list of tech chips.
 */
export function ArchitectureStack({ label }: { label: string }) {
  return (
    <section className="relative overflow-hidden bg-ultra py-20 text-white sm:py-28">
      <SectionReveal />
      <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-[var(--gutter)] lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionLabel index={label} title="Architecture" tone="text-white" />
          <h2
            className="display mt-5 text-[clamp(2.2rem,4.4vw,4.4rem)]"
            style={{ ["--wdth" as string]: 100 }}
          >
            Built in layers, built to last
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-white/85">
            Every system we ship follows the same sturdy shape, so it is easy to
            change, easy to scale and easy for any good engineer to pick up.
          </p>
          <ul className="mt-8 grid gap-3 text-white/85">
            {[
              "Documented, so you are never dependent on us",
              "Tested at every layer before it ships",
              "Deployed on infrastructure you own",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-sun" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div data-inview className="relative lg:col-span-8">
          {/* Security runs through every layer */}
          <div className="iv-grow absolute bottom-[-0.75rem] right-0 top-[-0.75rem] z-0 hidden w-16 place-items-center rounded-[1.5rem] bg-ink sm:grid">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-sun [writing-mode:vertical-rl]">
              Security · auth · roles · encryption · audit logs
            </span>
          </div>
          <ol data-inview="slide" className="relative z-10 grid gap-3 sm:mr-20">
            {LAYERS.map((l, i) => (
              <li
                key={l.name}
                className={`arch-layer group grid gap-4 rounded-[1.5rem] p-6 transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-x-2 sm:grid-cols-[13.5rem_1fr] sm:items-center sm:p-7 ${l.tone}`}
                style={{ marginLeft: `${i * 3}%` }}
              >
                <div>
                  <p className="label opacity-80">
                    Layer {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className="mt-2 font-display text-xl font-black uppercase leading-none tracking-[-0.03em]"
                    style={{ fontVariationSettings: '"wdth" 106' }}
                  >
                    {l.name}
                  </h3>
                </div>
                <div>
                  <p className="text-[0.95rem] leading-relaxed opacity-85">
                    {l.what}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {l.tech.map((x) => (
                      <li
                        key={x}
                        className="rounded-full bg-ink px-3 py-1 font-mono text-xs font-semibold text-white"
                      >
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 rounded-2xl bg-ink px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-white sm:hidden">
            Security in every layer: auth · roles · encryption · audit logs
          </p>
        </div>
      </div>
    </section>
  );
}
