"use client";

import { useRef } from "react";
import { services } from "@/lib/services";
import { useGsapIdle } from "@/lib/useIdleEffect";

/** Motion controller for a server-rendered section: renders a hidden anchor
 * and drives the section's animations from it. */
export function ServicesMotion() {
  const anchor = useRef<HTMLSpanElement>(null);

  useGsapIdle(({ gsap, ScrollTrigger }) => {
    const el = anchor.current?.closest("section");
    const tr = el?.querySelector<HTMLDivElement>(".svc-track");
    const counter = el?.querySelector<HTMLSpanElement>(".svc-counter");
    const bar = el?.querySelector<HTMLSpanElement>(".svc-bar");
    if (!el || !tr) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const distance = () => tr.scrollWidth - window.innerWidth;
      const tween = gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(
              services.length,
              Math.floor(self.progress * services.length) + 1,
            );
            if (counter) counter.textContent = String(i).padStart(2, "0");
            if (bar) bar.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
      for (const panel of gsap.utils.toArray<HTMLElement>(".svc-panel", tr)) {
        gsap.fromTo(
          panel,
          { rotate: 3, yPercent: 4 },
          {
            rotate: 0,
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left right",
              end: "left 45%",
              scrub: true,
            },
          },
        );
        // Only the panel in focus runs its artwork's micro-animations (SVG
        // animations repaint, so 8 at once made the pinned scroll heavy).
        ScrollTrigger.create({
          trigger: panel,
          containerAnimation: tween,
          start: "left 80%",
          end: "right 20%",
          toggleClass: { targets: panel, className: "is-live" },
        });
      }
      // Keyboard users: tabbing to an off-screen panel scrolls the page to the
      // point in the pinned track where that panel is in view.
      const onFocus = (e: FocusEvent) => {
        const panel = (e.target as HTMLElement).closest<HTMLElement>(
          ".svc-panel",
        );
        const st = tween.scrollTrigger;
        if (!panel || !st) return;
        const p = Math.min(
          1,
          Math.max(
            0,
            (panel.offsetLeft - window.innerWidth * 0.1) / distance(),
          ),
        );
        const y = st.start + (st.end - st.start) * p;
        if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true });
        else window.scrollTo(0, y);
      };
      tr.addEventListener("focusin", onFocus);
      tr.classList.remove("overflow-x-auto", "snap-x", "snap-mandatory");
      return () => {
        tr.removeEventListener("focusin", onFocus);
        tr.classList.add("overflow-x-auto", "snap-x", "snap-mandatory");
      };
    });
    return () => mm.revert();
  });

  return <span ref={anchor} hidden />;
}
