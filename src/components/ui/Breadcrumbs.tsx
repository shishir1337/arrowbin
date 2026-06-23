import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

/** Visible breadcrumb trail. Pair with breadcrumbSchema() JSON-LD on the page. */
export function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-text">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="transition-colors hover:text-accent"
                >
                  {item.name}
                </Link>
              )}
              {!last ? (
                <Icon
                  name="chevron-down"
                  size={14}
                  className="-rotate-90 text-muted/60"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
