"use client";

import { useEffect, useRef } from "react";

type TocItem = { id: string; text: string };

const ACTIVE_CLASSES = ["border-accent", "font-medium", "text-accent"];
const IDLE_CLASSES = [
  "border-transparent",
  "text-muted",
  "hover:border-border",
  "hover:text-text",
];

/**
 * Table of contents with scroll-spy: highlights the section currently in view.
 * The active link is toggled by mutating class lists directly inside the
 * IntersectionObserver callback — no React state — so rapid scrolling never
 * queues re-renders of the whole list (keeps INP low on long posts).
 */
export function Toc({ items }: { items: TocItem[] }) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;

    const links = new Map<string, HTMLAnchorElement>();
    for (const a of root.querySelectorAll<HTMLAnchorElement>(
      "a[data-toc-id]",
    )) {
      const id = a.dataset.tocId;
      if (id) links.set(id, a);
    }

    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    let current = "";
    const setActive = (id: string) => {
      if (id === current) return;
      const prev = links.get(current);
      if (prev) {
        prev.classList.remove(...ACTIVE_CLASSES);
        prev.classList.add(...IDLE_CLASSES);
        prev.removeAttribute("aria-current");
      }
      const next = links.get(id);
      if (next) {
        next.classList.remove(...IDLE_CLASSES);
        next.classList.add(...ACTIVE_CLASSES);
        next.setAttribute("aria-current", "location");
      }
      current = id;
    };

    setActive(items[0]?.id ?? "");

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
    <ol ref={listRef} className="mt-3 space-y-1 text-sm">
      {items.map((item, i) => {
        const isFirst = i === 0;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              data-toc-id={item.id}
              aria-current={isFirst ? "location" : undefined}
              className={`flex gap-2 border-l-2 py-1.5 pl-3 transition-colors ${
                isFirst
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
