import Link from "next/link";
import { LogoMark } from "@/components/brand/LogoMark";
import { site } from "@/lib/site";

/**
 * Arrowbin lockup: the arrowhead-"A" mark + the wide "Arrowbin" wordmark.
 * On hover the mark launches upward and the bit drops back, a small nod to
 * "arrow + bin".
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={`group inline-flex items-center gap-2 text-ink ${className}`}
    >
      <LogoMark className="h-7 w-7 text-ultra transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:rotate-[-8deg]" />
      <span
        className="font-display text-[1.35rem] font-extrabold leading-none tracking-[-0.035em]"
        style={{ fontVariationSettings: '"wdth" 115' }}
      >
        Arrowbin
      </span>
    </Link>
  );
}
