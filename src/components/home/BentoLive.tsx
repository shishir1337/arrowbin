"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/lib/gsap";

/* Small client islands for the (server-rendered) Bento section. */

const CODE = [
  "const product = await arrowbin.build({",
  "  owner: 'you',",
  "  lockIn: false,",
  "  source: 'github.com/you',",
  "});",
];

/** Runs `onVisible(true/false)` as the element enters/leaves the viewport. */
function useVisibility(
  ref: React.RefObject<HTMLElement | null>,
  onVisible: (v: boolean) => void,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => onVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [ref, onVisible]);
}

const CODE_TEXT = CODE.join("\n");

/**
 * Types the snippet out on a loop, writing straight to the DOM (no React
 * re-render per keystroke) and only while the tile is on screen.
 */
export function TypingCode() {
  const pre = useRef<HTMLPreElement>(null);
  const out = useRef<HTMLSpanElement>(null);
  const timer = useRef(0);
  const n = useRef(0);
  const onVisible = useCallback((v: boolean) => {
    window.clearInterval(timer.current);
    if (!v || reducedMotion() || !out.current) return;
    timer.current = window.setInterval(() => {
      n.current = n.current >= CODE_TEXT.length + 40 ? 0 : n.current + 1;
      if (out.current) out.current.textContent = CODE_TEXT.slice(0, n.current);
    }, 45);
  }, []);
  useVisibility(pre, onVisible);
  useEffect(() => () => window.clearInterval(timer.current), []);
  return (
    <pre
      ref={pre}
      className="mt-6 min-h-[9.5rem] overflow-hidden rounded-2xl bg-ink p-4 font-mono text-[12px] leading-relaxed text-white/90 sm:text-[13px]"
    >
      <code>
        <span ref={out}>{CODE_TEXT}</span>
        <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-sun" />
      </code>
    </pre>
  );
}

export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);
  const ref = useRef<HTMLParagraphElement>(null);
  const timer = useRef(0);
  const onVisible = useCallback((v: boolean) => {
    window.clearInterval(timer.current);
    if (!v) return;
    setNow(new Date());
    timer.current = window.setInterval(() => setNow(new Date()), 1000);
  }, []);
  useVisibility(ref, onVisible);
  useEffect(() => {
    setNow(new Date());
    return () => window.clearInterval(timer.current);
  }, []);
  const hh = now ? String(now.getHours()).padStart(2, "0") : "--";
  const mm = now ? String(now.getMinutes()).padStart(2, "0") : "--";
  const ss = now ? String(now.getSeconds()).padStart(2, "0") : "--";
  return (
    <p
      ref={ref}
      className="mt-4 font-display text-[clamp(3.4rem,6vw,5.6rem)] font-black leading-none tabular-nums tracking-[-0.04em]"
      style={{ fontVariationSettings: '"wdth" 125' }}
      suppressHydrationWarning
    >
      {hh}
      <span className="animate-pulse">:</span>
      {mm}
      <span className="ml-2 align-top text-[0.35em] opacity-70">{ss}</span>
    </p>
  );
}
