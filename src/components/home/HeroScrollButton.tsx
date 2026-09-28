"use client";

import type { ReactNode } from "react";

/** The hero's round "Scroll · Explore" button: glides to the next section. */
export function HeroScrollButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label="Scroll to the next section"
      onClick={(e) => {
        const next = e.currentTarget.closest("section")
          ?.nextElementSibling as HTMLElement | null;
        const y = next
          ? next.getBoundingClientRect().top + window.scrollY
          : window.innerHeight;
        if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.4 });
        else window.scrollTo({ top: y, behavior: "smooth" });
      }}
      className={className}
    >
      {children}
    </button>
  );
}
