import Link from "next/link";
import { site } from "@/lib/site";

/** Arrowbin wordmark with an arrow glyph. Scales with font size. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={`group inline-flex items-center gap-2 ${className}`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-accent-fg">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 12h13M12 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-text">
        {site.name}
      </span>
    </Link>
  );
}
