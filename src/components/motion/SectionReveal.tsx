"use client";

import { useRef } from "react";
import { reducedMotion } from "@/lib/gsap";
import { useGsapIdle } from "@/lib/useIdleEffect";

/**
 * Drop inside any server-rendered <section>: every descendant marked with
 * `data-rv` rises in once as it scrolls into view (GSAP loaded in idle time).
 * Content is fully visible without JS and for reduced motion.
 *
 * Sets up as the visitor nears the section (see useGsapIdle; no page using it
 * has a pinned section). `eager`: set up at idle right after load instead, for
 * a section that starts on the first screen. The /blog lead card is one: its
 * starting state must be in place before its cover image paints, or that
 * image counts as the page's largest paint on phones (LCP 1.2 s to 3.5 s in
 * Lighthouse), as it never did on the live site.
 */
export function SectionReveal({ eager = false }: { eager?: boolean }) {
  const anchor = useRef<HTMLSpanElement>(null);

  useGsapIdle(
    ({ gsap }) => {
      const el = anchor.current?.closest("section");
      if (!el || reducedMotion()) return;
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-rv]", el).forEach((node) => {
          gsap.from(node, {
            y: 40,
            opacity: 0,
            duration: 1,
            delay: Number(node.dataset.rv || 0) * 0.08,
            scrollTrigger: { trigger: node, start: "top 90%", once: true },
          });
        });
      }, el);
      return () => ctx.revert();
    },
    eager ? undefined : anchor,
  );

  return <span ref={anchor} hidden />;
}
