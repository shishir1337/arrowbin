"use client";

import { useEffect, useRef, useState } from "react";
import { EXPO_OUT } from "@/lib/motion";

/** GSAP's power3.out, the ease the cursor has always followed the pointer with. */
const easeOut3 = (p: number) => 1 - (1 - p) ** 3;

/**
 * One coordinate of the dot or ring. Like gsap.quickTo (which this replaced),
 * every pointer move starts a fresh eased tween from wherever the value is
 * now to the new pointer position.
 */
type Axis = { from: number; to: number; t0: number; ms: number; v: number };

const axis = (ms: number): Axis => ({
  from: -100,
  to: -100,
  t0: 0,
  ms,
  v: -100,
});

/** Moves `a.v` to its value at `now`; true while the tween is still running. */
function advance(a: Axis, now: number): boolean {
  const p = Math.min(1, (now - a.t0) / a.ms);
  a.v = a.from + (a.to - a.from) * easeOut3(p);
  return p < 1;
}

function retarget(a: Axis, to: number, now: number) {
  advance(a, now);
  a.from = a.v;
  a.to = to;
  a.t0 = now;
}

/**
 * Two-part custom cursor (fine pointers only): a precise dot plus a trailing ring
 * that grows over interactive elements and shows a label over any element with
 * `data-cursor="LABEL"`.
 *
 * No animation library: the dot and ring follow the pointer through a small
 * frame loop with the same timing GSAP gave them (0.08 s and 0.45 s,
 * power3.out), so the cursor works on pages that never load GSAP.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Touch devices never enable the cursor.
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    // The cursor is parked off-screen until the pointer first moves, so the
    // setup waits for that move instead of running during the page load. The
    // first move is replayed, so the cursor glides in from the corner.
    let off: undefined | (() => void);
    const start = (first: PointerEvent) => {
      off = setup(first);
    };
    window.addEventListener("pointermove", start, {
      once: true,
      passive: true,
    });
    return () => {
      window.removeEventListener("pointermove", start);
      off?.();
    };
    function setup(first: PointerEvent) {
      if (!dot.current || !ring.current) return;
      const d = dot.current;
      const r = ring.current;
      document.documentElement.classList.add("has-cursor");
      const dx = axis(80);
      const dy = axis(80);
      const rx = axis(450);
      const ry = axis(450);
      let raf = 0;
      const frame = () => {
        const now = performance.now();
        const busy = [dx, dy, rx, ry].map((a) => advance(a, now)).some(Boolean);
        d.style.transform = `translate(${dx.v}px, ${dy.v}px)`;
        r.style.transform = `translate(${rx.v}px, ${ry.v}px)`;
        raf = busy ? requestAnimationFrame(frame) : 0;
      };

      const move = (e: PointerEvent) => {
        const now = performance.now();
        retarget(dx, e.clientX, now);
        retarget(dy, e.clientY, now);
        retarget(rx, e.clientX, now);
        retarget(ry, e.clientY, now);
        if (!raf) raf = requestAnimationFrame(frame);
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
      // Fade out when the pointer leaves the window and back in when it
      // returns (0.2 s, as before), starting from wherever a fade left off.
      const fades = new Map<HTMLElement, Animation>();
      const fade = (to: number) => {
        for (const el of [d, r]) {
          const from = getComputedStyle(el).opacity;
          fades.get(el)?.cancel();
          fades.set(
            el,
            el.animate([{ opacity: from }, { opacity: to }], {
              duration: 200,
              easing: EXPO_OUT,
              fill: "forwards",
            }),
          );
        }
      };
      const leave = () => fade(0);
      const enter = () => fade(1);

      window.addEventListener("pointermove", move, { passive: true });
      move(first);
      over(first);
      document.addEventListener("pointerover", over);
      document.documentElement.addEventListener("pointerleave", leave);
      document.documentElement.addEventListener("pointerenter", enter);
      return () => {
        cancelAnimationFrame(raf);
        for (const a of fades.values()) a.cancel();
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
