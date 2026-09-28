import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/home/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import type { Post } from "@/lib/blog";
import type { Project } from "@/lib/portfolio";

const TONES = ["bg-ultra text-white", "bg-plasma text-ink", "bg-sun text-ink"];
const GUIDE_TONES = [
  "bg-sun text-ink",
  "bg-plasma text-ink",
  "bg-ultra text-white",
];

/** Selected work for this service: three framed screenshots linking out. */
export function ServiceWork({
  work,
  label,
  title = "Built by us, live today",
}: {
  work: (Project & { blur?: string })[];
  label: string;
  title?: string;
}) {
  if (!work.length) return null;
  return (
    <section className="relative py-20 sm:py-28">
      <SectionReveal />
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="Selected work" />
            <h2
              className="display mt-5 text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              {title}
            </h2>
          </div>
          <Link
            href="/work"
            className="label inline-flex items-center gap-2 self-start whitespace-nowrap rounded-full border border-ink/20 px-4 py-2.5 text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-white md:self-auto"
          >
            See all work →
          </Link>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {work.map((p, i) => (
            <li key={p.url} data-rv={i}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="VISIT"
                className="group block"
              >
                <div
                  data-tilt="4"
                  className={`rounded-[1.75rem] p-3 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 sm:p-4 ${TONES[i % TONES.length]}`}
                >
                  <div className="overflow-hidden rounded-[1.2rem] bg-white shadow-[0_20px_40px_-24px_rgba(14,11,36,0.6)]">
                    <div className="flex h-7 items-center gap-1.5 border-b border-ink/10 px-3">
                      <span className="h-2 w-2 rounded-full bg-plasma" />
                      <span className="h-2 w-2 rounded-full bg-sun" />
                      <span className="h-2 w-2 rounded-full bg-ultra" />
                      <span className="ml-2 truncate font-mono text-[10px] text-ink-2">
                        {p.url
                          .replace(/^https?:\/\/(www\.)?/, "")
                          .replace(/\/$/, "")}
                      </span>
                    </div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={p.image}
                        alt={`${p.name} website, built by Arrowbin`}
                        fill
                        sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 92vw"
                        className="object-cover object-top"
                        {...(p.blur
                          ? {
                              placeholder: "blur" as const,
                              blurDataURL: p.blur,
                            }
                          : {})}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4 px-1">
                  <div>
                    <h3
                      className="font-display text-2xl font-black uppercase leading-none tracking-[-0.03em] text-ink"
                      style={{ fontVariationSettings: '"wdth" 106' }}
                    >
                      {p.name}
                    </h3>
                    <p className="mt-2 text-[0.95rem] text-ink-2">{p.result}</p>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-ink/15 text-lg text-ink transition-[transform,border-color] duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-45 group-hover:border-ink">
                    →
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Related guides from the blog (content cluster). */
export function ServiceGuides({
  guides,
  label,
}: {
  guides: Post[];
  label: string;
}) {
  if (!guides.length) return null;
  return (
    <section className="relative bg-lilac py-20 sm:py-28">
      <SectionReveal />
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <SectionLabel index={label} title="Guides" />
        <h2
          className="display mt-5 text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
          style={{ ["--wdth" as string]: 100 }}
        >
          Read before you build
        </h2>
        <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {guides.map((g, i) => (
            <li key={g.slug} data-rv={i}>
              <Link
                href={`/blog/${g.slug}`}
                className="group relative flex h-full min-h-80 flex-col overflow-hidden rounded-[1.75rem] bg-white p-7 transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-2 ${GUIDE_TONES[i % GUIDE_TONES.length]}`}
                />
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`label rounded-full px-3 py-1.5 ${GUIDE_TONES[i % GUIDE_TONES.length]}`}
                  >
                    {g.category}
                  </span>
                  <span className="label text-ink-2">{g.readingTime}</span>
                </div>
                <h3
                  className="mt-8 font-display text-[clamp(1.5rem,2.2vw,2rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] text-ink"
                  style={{ fontVariationSettings: '"wdth" 102' }}
                >
                  {g.title}
                </h3>
                <p className="mt-4 line-clamp-3 text-[0.95rem] leading-relaxed text-ink-2">
                  {g.description}
                </p>
                <span className="mt-auto flex items-center justify-between pt-8">
                  <span className="label text-ink">Read the guide</span>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-lg text-white transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-45">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
