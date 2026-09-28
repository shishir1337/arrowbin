"use client";

import { useEffect, useRef, useState } from "react";
import { loadGsap } from "@/lib/gsap";

/**
 * Two-part custom cursor (fine pointers only): a precise dot plus a trailing ring
 * that grows over interactive elements and shows a label over any element with
 * `data-cursor="LABEL"`.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    // Touch devices never enable the cursor, so they never fetch GSAP for it.
    if (!enabled) return;
    let dead = false;
    let off: undefined | (() => void);
    loadGsap().then(({ gsap }) => {
      if (dead) return;
      off = setup(gsap);
    });
    return () => {
      dead = true;
      off?.();
    };
    function setup(gsap: Awaited<ReturnType<typeof loadGsap>>["gsap"]) {
      if (!enabled || !dot.current || !ring.current) return;
      const d = dot.current;
      const r = ring.current;
      document.documentElement.classList.add("has-cursor");
      gsap.set([d, r], { x: -100, y: -100 });
      const dx = gsap.quickTo(d, "x", { duration: 0.08, ease: "power3" });
      const dy = gsap.quickTo(d, "y", { duration: 0.08, ease: "power3" });
      const rx = gsap.quickTo(r, "x", { duration: 0.45, ease: "power3" });
      const ry = gsap.quickTo(r, "y", { duration: 0.45, ease: "power3" });

      const move = (e: PointerEvent) => {
        dx(e.clientX);
        dy(e.clientY);
        rx(e.clientX);
        ry(e.clientY);
      };
      const over = (e: PointerEvent) => {
        const t = e.target as HTMLElement | null;
        const labelled = t?.closest<HTMLElement>("[data-cursor]");
        if (labelled) {
          setLabel(labelled.dataset.cursor ?? "");
          r.dataset.state = "label";
          d.dataset.hidden = "1";
          return;
        }
        d.dataset.hidden = "";
        setLabel("");
        r.dataset.state = t?.closest(
          "a, button, [role='button'], input, textarea, select, label",
        )
          ? "hover"
          : "";
      };
      const leave = () => gsap.to([d, r], { opacity: 0, duration: 0.2 });
      const enter = () => gsap.to([d, r], { opacity: 1, duration: 0.2 });

      window.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerover", over);
      document.documentElement.addEventListener("pointerleave", leave);
      document.documentElement.addEventListener("pointerenter", enter);
      return () => {
        document.documentElement.classList.remove("has-cursor");
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerover", over);
        document.documentElement.removeEventListener("pointerleave", leave);
        document.documentElement.removeEventListener("pointerenter", enter);
      };
    }
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span>{label}</span>
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
