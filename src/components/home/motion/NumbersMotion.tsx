"use client";

import { useRef } from "react";
import { reducedMotion } from "@/lib/gsap";
import { useGsapIdle } from "@/lib/useIdleEffect";

/** Motion controller for a server-rendered section: renders a hidden anchor
 * and drives the section's animations from it. */
export function NumbersMotion() {
  const anchor = useRef<HTMLSpanElement>(null);

  useGsapIdle(({ gsap }) => {
    const el = anchor.current?.closest("section");
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      for (const row of gsap.utils.toArray<HTMLElement>(".num-row")) {
        const fill = row.querySelector<HTMLElement>(".num-fill");
        const val = row.querySelector<HTMLElement>(".num-val");
        const valGhost = row.querySelector<HTMLElement>(".num-val-ghost");
        const to = Number(row.dataset.to);
        const from = Number(row.dataset.from ?? 0);
        const obj = { v: from };
        let shown = String(from);
        if (val) val.textContent = String(from);
        if (valGhost) valGhost.textContent = String(from);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            end: "top 35%",
            scrub: 0.6,
          },
        });
        const fillIn = row.querySelector<HTMLElement>(".num-fill-in");
        tl.fromTo(fill, { xPercent: -100 }, { xPercent: 0, ease: "none" }, 0)
          .fromTo(fillIn, { xPercent: 100 }, { xPercent: 0, ease: "none" }, 0)
          .to(
            obj,
            {
              v: to,
              ease: "none",
              onUpdate: () => {
                // Only touch the DOM when the displayed integer changes.
                const s = String(Math.round(obj.v));
                if (s === shown) return;
                shown = s;
                if (val) val.textContent = s;
                if (valGhost) valGhost.textContent = s;
              },
            },
            0,
          );
        gsap.from(row.querySelectorAll(".num-copy > *"), {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 1,
          scrollTrigger: { trigger: row, start: "top 75%" },
        });
      }
      gsap.to(".num-sticker", {
        rotate: 360,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);
    return () => ctx.revert();
  });

  return <span ref={anchor} hidden />;
}
