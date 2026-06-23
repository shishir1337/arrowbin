"use client";

import { useEffect, useState } from "react";

/** Thin reading-progress bar under the navbar that fills as you scroll the article. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = window.scrollY - el.offsetTop;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetId]);

  return (
    <div
      className="fixed inset-x-0 top-16 z-30 h-0.5 bg-transparent"
      aria-hidden="true"
    >
      <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
    </div>
  );
}
