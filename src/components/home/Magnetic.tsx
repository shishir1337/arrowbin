"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { onFirstInteraction } from "@/lib/firstInteraction";
import { finePointer, loadGsap } from "@/lib/gsap";
import { whenIdle } from "@/lib/useIdleEffect";

/**
 * Pulls its child toward the pointer while hovered (fine pointers only).
 *
 * The pull uses GSAP's elastic ease, so it needs GSAP, but only on a device
 * with a mouse and only once the visitor is using the page: GSAP loads in idle
 * time after the first pointer move or key press, well before the pointer
 * reaches a button. Phones and tablets never load it for this.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className = "inline-block",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer()) return;
    let dead = false;
    let cleanup: undefined | (() => void);
    let cancelIdle: undefined | (() => void);
    const cancelWait = onFirstInteraction(() => {
      cancelIdle = whenIdle(() => {
        loadGsap().then(({ gsap }) => {
          if (dead) return;
          const x = gsap.quickTo(el, "x", {
            duration: 0.6,
            ease: "elastic.out(1,0.4)",
          });
          const y = gsap.quickTo(el, "y", {
            duration: 0.6,
            ease: "elastic.out(1,0.4)",
          });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            x((e.clientX - (r.left + r.width / 2)) * strength);
            y((e.clientY - (r.top + r.height / 2)) * strength);
          };
          const leave = () => {
            x(0);
            y(0);
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanup = () => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          };
        });
      }, 1200);
    });
    return () => {
      dead = true;
      cancelWait();
      cancelIdle?.();
      cleanup?.();
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
