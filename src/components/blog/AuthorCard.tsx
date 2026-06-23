import Link from "next/link";
import { author } from "@/lib/site";

function initials(name: string) {
  return name
    .replace(/[^a-zA-Z\s]/g, "")
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** Author bio card shown at the end of an article (E-E-A-T signal). */
export function AuthorCard() {
  return (
    <aside className="mt-14 flex flex-col gap-4 rounded-2xl border border-border bg-surface-2 p-6 sm:flex-row sm:items-start sm:p-7">
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-accent font-display text-lg font-bold text-accent-fg">
        {initials(author.name)}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Written by
        </p>
        <p className="mt-1 font-display text-lg font-semibold text-text">
          {author.name}
        </p>
        <p className="text-sm font-medium text-accent">
          {author.jobTitle}, Arrowbin
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{author.bio}</p>
        <Link
          href="/about"
          className="mt-3 inline-flex text-sm font-medium text-accent hover:underline"
        >
          More about Arrowbin
        </Link>
      </div>
    </aside>
  );
}
