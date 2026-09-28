"use client";

import { useRef } from "react";
import { reducedMotion } from "@/lib/gsap";
import { useGsapIdle } from "@/lib/useIdleEffect";

/** Motion controller for a server-rendered section: renders a hidden anchor
 * and drives the section's animations from it. */
export function ProcessMotion() {
  const anchor = useRef<HTMLSpanElement>(null);

  useGsapIdle(({ gsap, ScrollTrigger }) => {
    const el = anchor.current?.closest("section");
    const rider = {
      current: el?.querySelector<HTMLDivElement>(".proc-rider") ?? null,
    };
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      const svgs = gsap.utils.toArray<SVGSVGElement>(".proc-svg");
      const svg =
        svgs.find((s) => s.getBoundingClientRect().width > 0) ?? svgs[0];
      const path = svg.querySelector<SVGPathElement>(".proc-line");
      if (!path) return;
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

      // The SVG fills .proc-box (inset-0), so only its size matters. Cache it on
      // refresh instead of measuring layout on every scroll frame.
      let sx = svg.clientWidth / 100;
      let sy = svg.clientHeight / 1000;
      const place = (p: number) => {
        if (!rider.current) return;
        const a = path.getPointAtLength(Math.max(0, p * len - 1));
        const b = path.getPointAtLength(Math.min(len, p * len + 1));
        const ang =
          (Math.atan2((b.y - a.y) * sy, (b.x - a.x) * sx) * 180) / Math.PI + 90;
        gsap.set(rider.current, { x: b.x * sx, y: b.y * sy, rotate: ang });
      };

      ScrollTrigger.create({
        trigger: ".proc-box",
        start: "top 60%",
        end: "bottom 60%",
        scrub: 0.5,
        onUpdate: (self) => {
          gsap.set(path, { strokeDashoffset: len * (1 - self.progress) });
          place(self.progress);
        },
        onRefresh: (self) => {
          sx = svg.clientWidth / 100;
          sy = svg.clientHeight / 1000;
          place(self.progress);
        },
      });
      place(0);

      for (const card of gsap.utils.toArray<HTMLElement>(".proc-card")) {
        gsap.from(card, {
          y: 80,
          rotate: card.dataset.side === "l" ? -6 : 6,
          opacity: 0,
          duration: 1.2,
          scrollTrigger: { trigger: card, start: "top 72%" },
        });
      }
    }, el);
    return () => ctx.revert();
  });

  return <span ref={anchor} hidden />;
}
