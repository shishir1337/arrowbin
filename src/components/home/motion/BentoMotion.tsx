"use client";

import { useRef } from "react";
import { finePointer, reducedMotion } from "@/lib/gsap";
import { useGsapIdle } from "@/lib/useIdleEffect";

/** Motion controller for a server-rendered section: renders a hidden anchor
 * and drives the section's animations from it. */
export function BentoMotion() {
  const anchor = useRef<HTMLSpanElement>(null);

  useGsapIdle(({ gsap }) => {
    const el = anchor.current?.closest("section");
    if (!el || reducedMotion()) return;
    // Hover tilt for every tile (fine pointers only).
    const offs: (() => void)[] = [];
    if (finePointer()) {
      for (const tile of el.querySelectorAll<HTMLElement>(".bento-tile")) {
        const rx = gsap.quickTo(tile, "rotateX", {
          duration: 0.6,
          ease: "power3",
        });
        const ry = gsap.quickTo(tile, "rotateY", {
          duration: 0.6,
          ease: "power3",
        });
        const move = (e: PointerEvent) => {
          const r = tile.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 8);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        tile.addEventListener("pointermove", move);
        tile.addEventListener("pointerleave", leave);
        offs.push(() => {
          tile.removeEventListener("pointermove", move);
          tile.removeEventListener("pointerleave", leave);
        });
      }
    }
    const ctx = gsap.context(() => {
      gsap.from(".bento-tile", {
        y: 90,
        opacity: 0,
        rotate: (i) => (i % 2 ? 3 : -3),
        duration: 1.2,
        stagger: 0.08,
        scrollTrigger: { trigger: ".bento-grid", start: "top 78%" },
      });
      gsap.fromTo(
        ".cal-cell.is-demo",
        {
          backgroundColor: "rgba(255,255,255,0.12)",
          color: "rgba(255,255,255,0.6)",
        },
        {
          backgroundColor: "#FFD23F",
          color: "#0E0B24",
          stagger: 0.18,
          duration: 0.4,
          repeat: -1,
          repeatDelay: 1.2,
          yoyo: true,
          scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 70%",
            end: "bottom top",
            toggleActions: "play pause resume pause",
          },
        },
      );
      gsap.from(".receipt-line", {
        clipPath: "inset(0 100% 0 0)",
        stagger: 0.25,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ".receipt", start: "top 80%" },
      });
    }, el);
    return () => {
      ctx.revert();
      for (const off of offs) off();
    };
  });

  return <span ref={anchor} hidden />;
}
