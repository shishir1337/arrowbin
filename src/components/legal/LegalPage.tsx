import Link from "next/link";
import type { ReactNode } from "react";
import { Crumbs } from "@/components/ui/Crumbs";
import { site } from "@/lib/site";

export type LegalBlock =
  | { type: "p"; text: ReactNode }
  | { type: "ul"; items: ReactNode[] }
  | { type: "table"; headers: string[]; rows: ReactNode[][] };

export type LegalSection = { id: string; title: string; blocks: LegalBlock[] };

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "p")
    return <p className="leading-[1.8] text-ink-2">{block.text}</p>;
  if (block.type === "ul")
    return (
      <ul className="grid gap-2.5">
        {block.items.map((item, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static legal copy.
          <li key={i} className="flex gap-3 leading-[1.7] text-ink-2">
            <span
              aria-hidden="true"
              className="mt-[0.7em] h-2 w-2 shrink-0 rotate-45 rounded-[2px] bg-plasma"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  return (
    <>
      {/* Phones: one card per row, so no column starts off-screen. */}
      <ul className="grid gap-3 sm:hidden">
        {block.rows.map((row, r) => (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: static legal copy.
            key={r}
            className="rounded-[1.25rem] bg-frost p-4"
          >
            <p className="font-display font-bold text-ink">{row[0]}</p>
            <dl className="mt-2 grid gap-2 text-sm">
              {row.slice(1).map((cell, c) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static legal copy.
                <div key={c}>
                  <dt className="font-semibold text-ink">
                    {block.headers[c + 1]}
                  </dt>
                  <dd className="mt-0.5 text-ink-2">{cell}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <div className="hidden overflow-hidden rounded-[1.5rem] ring-1 ring-ink/10 sm:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink text-white">
            <tr>
              {block.headers.map((h) => (
                <th key={h} scope="col" className="px-4 py-3.5 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10 bg-white text-ink-2">
            {block.rows.map((row, r) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static legal copy.
              <tr key={r}>
                {row.map((cell, c) => (
                  <td
                    // biome-ignore lint/suspicious/noArrayIndexKey: static legal copy.
                    key={c}
                    className={`px-4 py-3.5 align-top ${c === 0 ? "font-semibold text-ink" : ""}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/**
 * Shared layout for legal pages: kinetic title, an "in short" summary, then
 * numbered sections with a sticky contents list (collapsible on phones) and a
 * contact card at the end.
 */
export function LegalPage({
  crumbs,
  title,
  intro,
  updated,
  updatedIso,
  summary,
  sections,
  related,
}: {
  crumbs: { name: string; path: string }[];
  title: [string, string];
  intro: ReactNode;
  updated: string;
  updatedIso: string;
  summary: string[];
  sections: LegalSection[];
  related: { href: string; label: string };
}) {
  const contents = (
    <ol className="grid gap-1 text-sm">
      {sections.map((s, i) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            className="flex gap-3 rounded-lg py-1.5 text-ink-2 transition-colors hover:text-ultra"
          >
            <span className="font-mono text-xs leading-6">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{s.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <header className="relative isolate overflow-hidden pb-12 pt-10 sm:pb-16 sm:pt-14">
        <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
          <Crumbs items={crumbs} />
          <div className="mt-10 grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <p className="svh-fade font-mono text-xs uppercase tracking-wider text-ink-2">
                Legal · Last updated{" "}
                <time dateTime={updatedIso} className="font-semibold text-ink">
                  {updated}
                </time>
              </p>
              <h1
                data-kinetic
                className="display mt-6 text-[clamp(3rem,8vw,8rem)] text-ink"
                style={{ ["--wdth" as string]: 104 }}
              >
                {title.map((line, i) => (
                  <span
                    key={line}
                    className="block overflow-y-clip pb-[0.04em]"
                  >
                    <span
                      className="svh-line block"
                      style={{ animationDelay: `${120 + i * 110}ms` }}
                    >
                      {i === 1 ? (
                        <span className="text-ultra">{line}</span>
                      ) : (
                        line
                      )}
                    </span>
                  </span>
                ))}
              </h1>
              <p className="svh-fade mt-8 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl">
                {intro}
              </p>
            </div>
            <section
              aria-labelledby="legal-summary"
              className="svh-fade rounded-[2rem] bg-sun p-7 text-ink sm:p-9 lg:col-span-5"
            >
              <p id="legal-summary" className="label">
                In short
              </p>
              <ul className="mt-5 grid gap-3">
                {summary.map((s) => (
                  <li key={s} className="flex gap-3 font-semibold leading-snug">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink text-[10px] text-sun"
                    >
                      ✓
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </header>

      <div className="relative bg-white py-14 sm:py-20">
        <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-[var(--gutter)] lg:grid-cols-12 lg:gap-8">
          {/* Contents (desktop) */}
          <nav aria-label="Contents" className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28 rounded-[1.5rem] bg-frost p-5">
              <p className="label text-ink-2">Contents</p>
              <div className="mt-3">{contents}</div>
            </div>
          </nav>

          <div className="min-w-0 lg:col-span-8 lg:col-start-5 xl:col-span-7 xl:col-start-5">
            {/* Contents (phones and tablets) */}
            <details className="group mb-10 rounded-[1.5rem] bg-frost p-5 lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-ink [&::-webkit-details-marker]:hidden">
                Contents
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 place-items-center rounded-full bg-white transition-transform duration-500 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <nav aria-label="Contents" className="mt-3">
                {contents}
              </nav>
            </details>

            <div className="grid gap-14">
              {sections.map((s, i) => (
                <section
                  key={s.id}
                  id={s.id}
                  aria-labelledby={`${s.id}-h`}
                  className="scroll-mt-28"
                >
                  <h2
                    id={`${s.id}-h`}
                    className="flex items-baseline gap-4 font-display text-[clamp(1.5rem,2.4vw,2.1rem)] font-black uppercase leading-[1] tracking-[-0.025em] text-ink"
                  >
                    <span className="font-mono text-sm font-normal tracking-normal text-ultra">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </h2>
                  <div className="mt-5 grid gap-5 text-[1.0625rem]">
                    {s.blocks.map((b, k) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: static legal copy.
                      <Block key={k} block={b} />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <aside
              aria-label="Questions"
              className="mt-16 flex flex-col gap-6 rounded-[2rem] bg-ultra p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9"
            >
              <div>
                <p className="font-display text-2xl font-black uppercase leading-none tracking-[-0.02em]">
                  Questions about this?
                </p>
                <p className="mt-3 text-white/90">
                  Email us and a real person will reply within one business day.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex h-12 items-center rounded-full bg-sun px-6 font-semibold text-ink transition-colors duration-500 hover:bg-white"
                >
                  {site.email}
                </a>
                <Link
                  href={related.href}
                  className="inline-flex h-12 items-center rounded-full border-2 border-white/40 px-6 font-semibold text-white transition-colors duration-500 hover:border-white"
                >
                  {related.label}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
