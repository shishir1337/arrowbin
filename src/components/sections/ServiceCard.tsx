"use client";

import Link from "next/link";
import { useTilt } from "@/components/motion/useTilt";
import { Icon } from "@/components/ui/Icon";
import type { Service } from "@/lib/services";

/** Card linking to a service detail page. Used in grids on home and /services. */
export function ServiceCard({ service }: { service: Service }) {
  const tilt = useTilt<HTMLAnchorElement>();

  return (
    <Link
      ref={tilt.ref}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      href={`/services/${service.slug}`}
      data-reveal
      className="group card-surface tilt spotlight flex h-full flex-col rounded-2xl p-6"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-surface-2 text-accent shadow-[0_0_0_1px_rgb(var(--brand-rgb)/0.12)] transition-colors group-hover:bg-brand group-hover:text-brand-fg">
        <Icon name={service.icon} size={24} />
      </span>
      <h3 className="mt-5 font-display text-xl font-semibold text-text">
        {service.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {service.summary}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
        Learn more
        <Icon
          name="arrow-right"
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
