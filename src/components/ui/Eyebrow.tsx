import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

/**
 * Small glowing glass "pill" label used above hero/section headings. A lime dot
 * (or an optional icon) with a bloom + frosted glass background — the consistent
 * cinematic eyebrow used site-wide (also mirrored inside SectionHeading).
 */
export function Eyebrow({
  children,
  icon,
}: {
  children: ReactNode;
  icon?: IconName;
}) {
  return (
    <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
      {icon ? (
        <Icon name={icon} size={13} className="text-accent" />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgb(var(--brand-rgb)/0.7)]" />
      )}
      {children}
    </span>
  );
}
