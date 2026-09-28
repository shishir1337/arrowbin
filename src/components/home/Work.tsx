import Link from "next/link";
import { getBlurDataURL } from "@/lib/blur";
import { projects } from "@/lib/portfolio";
import { SectionLabel } from "./SectionLabel";
import { WorkStack } from "./WorkStack";

/** Selected work: server wrapper that resolves blur placeholders for the stack. */
export async function Work() {
  const items = await Promise.all(
    projects.slice(0, 6).map(async (p) => ({
      ...p,
      blur: await getBlurDataURL(p.image),
    })),
  );

  return (
    <section id="work" className="relative scroll-mt-10 pt-28 pb-16 sm:pt-36">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-[var(--gutter)] md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel index="04" title="Selected work" />
          <h2
            className="display mt-5 text-[clamp(3rem,10vw,10.5rem)] text-ink"
            style={{ ["--wdth" as string]: 118 }}
          >
            Proof<span className="text-plasma">,</span> not pitch
          </h2>
        </div>
        <Link
          href="/work"
          className="label inline-flex items-center gap-2 self-start whitespace-nowrap rounded-full border border-ink/20 px-4 py-2.5 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white md:self-auto"
        >
          All {projects.length} projects →
        </Link>
      </div>
      <WorkStack items={items} />
    </section>
  );
}
