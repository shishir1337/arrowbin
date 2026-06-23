"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; text: string };

/** Table of contents with scroll-spy: highlights the section currently in view. */
export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Trigger when a heading reaches the upper portion of the viewport.
      { rootMargin: "-96px 0px -68% 0px", threshold: 0 },
    );
    for (const h of headings) observer.observe(h);
    return () => observer.disconnect();
  }, [items]);

  return (
    <ol className="mt-3 space-y-1 text-sm">
      {items.map((item, i) => {
        const isActive = active === item.id;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              className={`flex gap-2 border-l-2 py-1.5 pl-3 transition-colors ${
                isActive
                  ? "border-accent font-medium text-accent"
                  : "border-transparent text-muted hover:border-border hover:text-text"
              }`}
            >
              <span className="text-accent/70">{i + 1}.</span>
              <span>{item.text}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}
