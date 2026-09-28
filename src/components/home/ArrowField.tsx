"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas field of tiny Arrowbin arrowheads that all turn to face the pointer.
 * Near the pointer they swell and shift from white to sun/plasma. With no pointer
 * (touch, idle) an invisible attractor drifts in a lissajous loop. One static
 * frame for reduced motion; pauses offscreen.
 */
export function ArrowField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let pts: { x: number; y: number; a: number; s: number }[] = [];
    const target = { x: 0, y: 0, active: false };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    let visible = false;
    let lastMove = 0;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gap = w < 640 ? 38 : 44;
      pts = [];
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          pts.push({ x, y, a: -Math.PI / 2, s: 1 });
        }
      }
      cur.x = w / 2;
      cur.y = h / 2;
    };

    // Arrow vertices (the mark's silhouette, pointing "up"), unit-scaled.
    const SHAPE = [0, -1, 0.9, 0.75, 0, 0.35, -0.9, 0.75];
    const COLORS = ["rgba(255,255,255,0.55)", "#FF4DA6", "#FFD23F"];
    const buckets: number[][] = [[], [], []];
    const lowPower = window.matchMedia("(pointer: coarse)").matches;
    let odd = false;

    const draw = (now: number) => {
      odd = !odd;
      if (lowPower && odd && !reduced) {
        if (visible) raf = requestAnimationFrame(draw);
        return;
      }
      if (!target.active || now - lastMove > 2500) {
        const t = now / 1000;
        target.x = w / 2 + Math.sin(t * 0.7) * w * 0.32;
        target.y = h / 2 + Math.sin(t * 1.1) * h * 0.28;
      }
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      const R = Math.max(220, Math.min(w, h) * 0.45);
      for (const bk of buckets) bk.length = 0;
      // Compute every arrow's rotated vertices, grouped by colour, then fill each
      // group as a single path: 3 fills per frame instead of one per arrow.
      for (const p of pts) {
        const dx = cur.x - p.x;
        const dy = cur.y - p.y;
        const d = Math.hypot(dx, dy);
        const ang = Math.atan2(dy, dx) + Math.PI / 2;
        let diff = ang - p.a;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        p.a += diff * 0.18;
        const k = Math.max(0, 1 - d / R);
        p.s += (1 + k * k * 2.4 - p.s) * 0.15;
        const size = 5 * p.s;
        const c = Math.cos(p.a) * size;
        const sn = Math.sin(p.a) * size;
        const bk = buckets[k > 0.62 ? 2 : k > 0.3 ? 1 : 0];
        for (let i = 0; i < 8; i += 2) {
          const vx = SHAPE[i];
          const vy = SHAPE[i + 1];
          bk.push(p.x + vx * c - vy * sn, p.y + vx * sn + vy * c);
        }
      }
      ctx.clearRect(0, 0, w, h);
      buckets.forEach((bk, bi) => {
        if (!bk.length) return;
        ctx.beginPath();
        for (let i = 0; i < bk.length; i += 8) {
          ctx.moveTo(bk[i], bk[i + 1]);
          ctx.lineTo(bk[i + 2], bk[i + 3]);
          ctx.lineTo(bk[i + 4], bk[i + 5]);
          ctx.lineTo(bk[i + 6], bk[i + 7]);
          ctx.closePath();
        }
        ctx.fillStyle = COLORS[bi];
        ctx.fill();
      });
      if (!reduced && visible) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      target.active = true;
      lastMove = performance.now();
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });

    build();
    draw(performance.now());
    io.observe(canvas);
    const parent = canvas.parentElement ?? canvas;
    parent.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", build);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      parent.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", build);
    };
  }, []);

  return <canvas ref={ref} className={className} />;
}
