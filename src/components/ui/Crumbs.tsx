import Link from "next/link";

/**
 * Hyperchrome breadcrumb trail (mono label style). Pair with breadcrumbSchema()
 * JSON-LD on the page.
 */
export function Crumbs({
  items,
  className = "",
}: {
  items: { name: string; path: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="label flex flex-wrap items-center gap-2 text-ink-2">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="transition-colors hover:text-ultra"
                >
                  {item.name}
                </Link>
              )}
              {!last ? (
                <span aria-hidden="true" className="text-ink-3">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
