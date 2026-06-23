import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

/** Eyebrow + heading + optional intro, used to open most sections. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  as = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
}) {
  const Tag = as;
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow ? (
        <Reveal
          as="p"
          className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent"
        >
          {eyebrow}
        </Reveal>
      ) : null}
      <Reveal
        as={Tag}
        className="text-3xl font-bold sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </Reveal>
      {intro ? (
        <Reveal as="p" className="mt-4 text-lg leading-relaxed text-muted">
          {intro}
        </Reveal>
      ) : null}
    </div>
  );
}
