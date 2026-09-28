import type { ReactNode } from "react";
import { SectionLabel } from "@/components/home/SectionLabel";

/**
 * Shared header + shell for each service's bespoke "signature" section, so the
 * one-off interactive pieces still sit in a consistent rhythm on the page.
 */
export function SignatureFrame({
  label,
  kicker,
  title,
  intro,
  tone = "bg-frost",
  children,
}: {
  label: string;
  kicker: string;
  title: ReactNode;
  intro: ReactNode;
  tone?: string;
  children: ReactNode;
}) {
  return (
    <section className={`relative overflow-hidden py-20 sm:py-28 ${tone}`}>
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title={kicker} />
            <h2
              className="display mt-5 max-w-[16ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              {title}
            </h2>
          </div>
          <div className="max-w-md text-base leading-relaxed text-ink-2 sm:text-lg">
            {intro}
          </div>
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
