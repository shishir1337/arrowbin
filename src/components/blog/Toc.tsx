"use client";

import { useEffect, useRef } from "react";

type TocItem = { id: string; text: string };

const ACTIVE_CLASSES = ["border-ultra", "font-semibold", "text-ultra"];
const IDLE_CLASSES = [
  "border-transparent",
  "text-ink-2",
  "hover:border-ink/30",
  "hover:text-ink",
];

/**
 * Table of contents with scroll-spy: highlights the section currently in view.
 * The active link is toggled by mutating class lists directly inside a
 * frame-throttled scroll check — no React state — so rapid scrolling never
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

    // The current section is the last heading above the reading line.
    // Checked at most once per frame on scroll, so link jumps and fast
    // scrolls that skip several headings still land on the right item.
    let raf = 0;
    const check = () => {
      raf = 0;
      let id = headings[0].id;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= 140) id = h.id;
        else break;
      }
      setActive(id);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items]);

  // Scroll to a fixed spot below the header ourselves: the smooth scroller's
  // anchor offset stacks with the headings' scroll margin and lands them
  // too low, below the scroll-spy's reading line.
  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    // Lenis also handles #anchor clicks (on the document); keep it out.
    e.nativeEvent.stopImmediatePropagation();
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    if (window.__lenis) window.__lenis.scrollTo(y);
    else
      window.scrollTo({
        top: y,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <ol ref={listRef} className="mt-3 space-y-1 text-sm">
      {items.map((item, i) => {
        const isFirst = i === 0;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              data-toc-id={item.id}
              onClick={(e) => go(e, item.id)}
              aria-current={isFirst ? "location" : undefined}
              className={`flex gap-3 border-l-2 py-1.5 pl-3 leading-snug transition-colors ${
                isFirst
                  ? "border-ultra font-semibold text-ultra"
                  : "border-transparent text-ink-2 hover:border-ink/30 hover:text-ink"
              }`}
            >
              <span className="font-mono text-xs leading-6">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item.text}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}
