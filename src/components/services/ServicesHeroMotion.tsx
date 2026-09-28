"use client";

import { useRef } from "react";
import { finePointer, reducedMotion } from "@/lib/gsap";
import { useIdleEffect } from "@/lib/useIdleEffect";

/**
 * Pointer parallax for the /services hero tiles: each tile drifts by its
 * `data-depth` toward/away from the cursor. Plain rAF lerp (no GSAP needed),
 * fine pointers only, and the loop parks itself once the tiles settle.
 */
export function ServicesHeroMotion() {
  const anchor = useRef<HTMLSpanElement>(null);

  useIdleEffect(() => {
    const el = anchor.current?.closest("section");
    if (!el || !finePointer() || reducedMotion()) return;
    const tiles = Array.from(el.querySelectorAll<HTMLElement>(".svh-float"));
    const depth = tiles.map((t) => Number(t.dataset.depth ?? 1));
    const cur = tiles.map(() => ({ x: 0, y: 0 }));
    let tx = 0;
    let ty = 0;
    let raf = 0;
    let running = false;
    const tick = () => {
      let moving = false;
      tiles.forEach((t, i) => {
        const gx = tx * 28 * depth[i];
        const gy = ty * 22 * depth[i];
        const c = cur[i];
        c.x += (gx - c.x) * 0.08;
        c.y += (gy - c.y) * 0.08;
        if (Math.abs(gx - c.x) > 0.1 || Math.abs(gy - c.y) > 0.1) moving = true;
        t.style.transform = `translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0)`;
      });
      if (moving) raf = requestAnimationFrame(tick);
      else running = false;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
    };
  });

  return <span ref={anchor} hidden />;
}
