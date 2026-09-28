import Image from "next/image";
import { SectionLabel } from "@/components/home/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { author } from "@/lib/site";

/** /about: the founder's note, as a big quote on a plasma band. */
export function AboutFounder({
  label,
  blur,
}: {
  label: string;
  blur?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-plasma py-20 text-ink sm:py-28">
      <SectionReveal />
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <SectionLabel index={label} title="A note from the founder" />
        <figure className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <blockquote className="lg:col-span-9">
            <p
              className="font-display text-[clamp(1.9rem,4.2vw,4rem)] font-black uppercase leading-[0.98] tracking-[-0.03em]"
              style={{ fontVariationSettings: '"wdth" 100' }}
            >
              <span aria-hidden="true" className="text-white">
                &ldquo;
              </span>
              We built Arrowbin to be the partner we always wished we had:
              senior, honest, and as invested in your product as you are.{" "}
              <span className="text-white">
                We treat every build as if it were our own.
              </span>
              <span aria-hidden="true" className="text-white">
                &rdquo;
              </span>
            </p>
          </blockquote>
          <figcaption data-rv className="flex items-center gap-4 lg:col-span-3">
            <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-white">
              <Image
                src={author.image}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
                {...(blur
                  ? { placeholder: "blur" as const, blurDataURL: blur }
                  : {})}
              />
            </span>
            <span>
              <span className="block font-display text-xl font-black uppercase leading-none tracking-[-0.02em]">
                {author.name}
              </span>
              <span className="mt-1.5 block text-sm font-medium">
                {author.jobTitle}, Arrowbin
              </span>
              {author.sameAs[0] && (
                <a
                  href={author.sameAs[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-2 underline-offset-4 transition-colors duration-500 hover:text-white"
                >
                  LinkedIn
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
