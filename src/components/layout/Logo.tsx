import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Arrowbin wordmark: a triangle mark followed by the full word, reading as
 * "△Arrowbin". The triangle scales with the surrounding font size so it always
 * matches the cap height of the text.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={`group inline-flex items-baseline font-display text-xl font-bold tracking-tight text-text ${className}`}
    >
      <svg
        viewBox="0 0 24 22"
        aria-hidden="true"
        focusable="false"
        className="mr-[0.16em] h-[0.78em] w-[0.78em] translate-y-[0.04em] text-accent"
      >
        {/* Geometric "A": a triangle outline with a crossbar. Proportions match
            the favicon/app-icon mark (M32 13 53 51… / M21 41h22 in a 64 box):
            crossbar low (~74% down) and wide (~52% of base), same stroke ratio. */}
        <path
          d="M12 2 22.5 20.5H1.5L12 2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 15.6h11"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </svg>
      <span>Arrowbin</span>
    </Link>
  );
}
