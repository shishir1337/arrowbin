"use client";

import { useEffect, useRef } from "react";

/**
 * Thin reading-progress bar under the navbar that fills as you scroll the article.
 *
 * Performance: the article's geometry (top offset + height) is measured ONCE and
 * again only when layout can actually change (resize / content reflow via
 * ResizeObserver) — never inside the scroll handler. The scroll path therefore does
 * no layout-reading work; it only reads the cheap `window.scrollY` inside a single
 * rAF and writes a compositor-only `transform: scaleX`. This avoids the forced
 * reflow caused by reading `offsetHeight`/`offsetTop` on every scroll event, and it
 * skips React re-renders entirely (the bar is mutated imperatively).
 */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    // Cached geometry — refreshed only when layout changes, not while scrolling.
    let articleTop = 0;
    let scrollable = 0;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      articleTop = rect.top + window.scrollY;
      scrollable = el.offsetHeight - window.innerHeight;
    };

    let ticking = false;
    const render = () => {
      ticking = false;
      const scrolled = window.scrollY - articleTop;
      const pct = scrollable > 0 ? scrolled / scrollable : 0;
      const clamped = Math.min(1, Math.max(0, pct));
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${clamped})`;
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(render);
    };
    const onResize = () => {
      measure();
      render();
    };

    measure();
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Article height shifts as images/fonts finish loading — keep geometry fresh.
    const ro = new ResizeObserver(onResize);
    ro.observe(el);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [targetId]);

  return (
    <div
      className="fixed inset-x-0 top-16 z-30 h-0.5 bg-transparent"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-accent [will-change:transform]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
