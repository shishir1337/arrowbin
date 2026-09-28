import Image from "next/image";
import type { Project } from "@/lib/portfolio";
import { WorkMotion } from "./motion/WorkMotion";

const TONES = [
  {
    card: "bg-white",
    text: "text-ink",
    sub: "text-ink-2",
    chip: "border-ink/15",
    dot: "bg-ultra",
  },
  {
    card: "bg-ultra",
    text: "text-white",
    sub: "text-white/75",
    chip: "border-white/25",
    dot: "bg-sun",
  },
  {
    card: "bg-plasma",
    text: "text-ink",
    sub: "text-ink/85",
    chip: "border-ink/20",
    dot: "bg-white",
  },
  {
    card: "bg-lilac",
    text: "text-ink",
    sub: "text-ink/85",
    chip: "border-ink/20",
    dot: "bg-plasma",
  },
  {
    card: "bg-sun",
    text: "text-ink",
    sub: "text-ink/85",
    chip: "border-ink/20",
    dot: "bg-ultra",
  },
  {
    card: "bg-flare",
    text: "text-ink",
    sub: "text-ink/85",
    chip: "border-ink/20",
    dot: "bg-white",
  },
];

type Item = Project & { blur?: string };

/**
 * Sticky stacking project cards: each card pins near the top and, as the next
 * one slides over it, scales back and tilts away like a dealt deck.
 */
export function WorkStack({ items }: { items: Item[] }) {
  return (
    <div className="mx-auto mt-14 w-full max-w-[1600px] px-[var(--gutter)]">
      <WorkMotion />
      {items.map((p, i) => {
        const t = TONES[i % TONES.length];
        return (
          <article
            key={p.url}
            className="work-card sticky top-[9vh] mb-[6vh] last:mb-0"
            style={{ zIndex: i + 1 }}
          >
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="VISIT"
              className={`work-inner group relative grid origin-top overflow-hidden rounded-[2rem] p-4 shadow-[0_40px_80px_-40px_rgba(14,11,36,0.45)] will-change-transform sm:p-6 lg:min-h-[78vh] lg:grid-cols-12 lg:gap-8 lg:p-8 ${t.card} ${t.text} ${t.card === "bg-white" ? "ring-1 ring-ink/10" : ""}`}
            >
              <span
                aria-hidden="true"
                className="work-shade pointer-events-none absolute inset-0 z-20 bg-ink opacity-0"
              />
              <div className="order-2 flex flex-col justify-between gap-6 p-2 pt-6 lg:order-1 lg:col-span-5 lg:p-2">
                <div>
                  <p className="label flex items-center gap-2 opacity-80">
                    <span className={`h-2 w-2 rounded-full ${t.dot}`} />(
                    {String(i + 1).padStart(2, "0")}) — {p.tags[0]}
                  </p>
                  <h3
                    className="mt-4 font-display text-[clamp(2.2rem,4.6vw,4.8rem)] font-black uppercase leading-[0.88] tracking-[-0.04em]"
                    style={{ fontVariationSettings: '"wdth" 112' }}
                  >
                    {p.name}
                  </h3>
                  <p
                    className={`mt-5 max-w-md text-base leading-relaxed ${t.sub}`}
                  >
                    {p.blurb}
                  </p>
                </div>
                <div>
                  <ul className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <li
                        key={tag}
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${t.chip}`}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`mt-6 flex items-center justify-between gap-4 border-t pt-5 ${t.chip}`}
                  >
                    <p className="font-display text-lg font-bold leading-tight">
                      {p.result}
                    </p>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-current/30 text-lg transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-[-45deg]">
                      →
                    </span>
                  </div>
                </div>
              </div>
              <div className="order-1 flex items-center lg:order-2 lg:col-span-7">
                <div className="w-full overflow-hidden rounded-[1.25rem] bg-white shadow-[0_24px_50px_-28px_rgba(14,11,36,0.55)] ring-1 ring-ink/10">
                  <div className="flex h-8 items-center gap-1.5 border-b border-ink/10 px-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-plasma" />
                    <span className="h-2.5 w-2.5 rounded-full bg-sun" />
                    <span className="h-2.5 w-2.5 rounded-full bg-ultra" />
                    <span className="ml-3 truncate font-mono text-[11px] text-ink-2">
                      {p.url
                        .replace(/^https?:\/\/(www\.)?/, "")
                        .replace(/\/$/, "")}
                    </span>
                  </div>
                  {/* Screenshots are 1280×800, so a 16:10 frame shows them whole. */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt={`${p.name} website, built by Arrowbin`}
                      fill
                      sizes="(min-width: 1024px) 55vw, 92vw"
                      className="work-img object-cover object-top"
                      {...(p.blur
                        ? { placeholder: "blur" as const, blurDataURL: p.blur }
                        : {})}
                    />
                  </div>
                </div>
              </div>
            </a>
          </article>
        );
      })}
    </div>
  );
}
