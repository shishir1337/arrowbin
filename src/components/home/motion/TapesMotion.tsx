"use client";

import { useRef } from "react";
import { reducedMotion } from "@/lib/gsap";
import { useGsapIdle } from "@/lib/useIdleEffect";

/** Motion controller for a server-rendered section: renders a hidden anchor
 * and drives the section's animations from it. */
export function TapesMotion() {
  const anchor = useRef<HTMLSpanElement>(null);

  useGsapIdle(({ gsap, ScrollTrigger }) => {
    const root = anchor.current?.closest("section");
    const tapeA = root?.querySelector<HTMLElement>("[data-tape='a']");
    const tapeB = root?.querySelector<HTMLElement>("[data-tape='b']");
    if (!root || !tapeA || !tapeB || reducedMotion()) return;
    const ta: HTMLElement = tapeA;
    const tb: HTMLElement = tapeB;
    let xa = 0;
    let xb = 0;
    let dir = 1;
    let boost = 0;
    let wa = ta.scrollWidth / 2;
    let wb = tb.scrollWidth / 3;
    const measure = () => {
      wa = ta.scrollWidth / 2;
      wb = tb.scrollWidth / 3;
    };
    const ro = new ResizeObserver(measure);
    ro.observe(ta);
    ro.observe(tb);
    let on = false;
    const st = ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      // Only tick while the tapes are on screen.
      onToggle: (self) => {
        if (self.isActive && !on) gsap.ticker.add(tick);
        if (!self.isActive && on) gsap.ticker.remove(tick);
        on = self.isActive;
      },
      onUpdate: (self) => {
        dir = self.direction;
        boost = Math.min(Math.abs(self.getVelocity()) / 180, 14);
      },
    });
    function tick(_t: number, dt: number) {
      boost *= 0.92;
      const v = (0.9 + boost) * dir * (dt / 16.67);
      xa = (xa - v) % wa;
      xb = (xb + v) % wb;
      if (xa > 0) xa -= wa;
      if (xb > 0) xb -= wb;
      ta.style.transform = `translate3d(${xa}px,0,0)`;
      tb.style.transform = `translate3d(${xb}px,0,0)`;
    }
    if (st.isActive && !on) {
      gsap.ticker.add(tick);
      on = true;
    }
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      ro.disconnect();
    };
  });

  return <span ref={anchor} hidden />;
}
