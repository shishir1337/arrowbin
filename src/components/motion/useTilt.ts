"use client";

import { type PointerEvent as ReactPointerEvent, useRef } from "react";

/**
 * 3D tilt + spotlight tracking for a card. Returns a ref plus pointer handlers.
 * On move it sets a perspective rotation toward the cursor and updates the
 * `--mx/--my` custom properties consumed by the `.spotlight` CSS. Pair the target
 * element with the `tilt spotlight` classes. No-ops on coarse pointers.
 */
export function useTilt<T extends HTMLElement>(max = 7) {
  const ref = useRef<T>(null);

  function onPointerMove(e: ReactPointerEvent<T>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg)`;
  }

  function onPointerLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  }

  return { ref, onPointerMove, onPointerLeave };
}
