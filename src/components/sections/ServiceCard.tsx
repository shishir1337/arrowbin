import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Service } from "@/lib/services";

/** Card linking to a service detail page. Used in grids on home and /services. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      data-reveal
      className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors duration-200 hover:border-accent"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-surface-2 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-fg">
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
