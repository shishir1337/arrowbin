"use client";

import { useCallback, useRef, useState } from "react";
import { type Gsap, loadGsap, reducedMotion } from "@/lib/gsap";
import { testimonials } from "@/lib/testimonials";
import { useIdleEffect } from "@/lib/useIdleEffect";
import { SectionLabel } from "./SectionLabel";

const CARD_TONES = ["bg-white", "bg-sun", "bg-lilac", "bg-white"];
const ROT = [-4, 3, -2, 5];
const N = testimonials.length;

// GSAP is fetched lazily (idle time, or on the first click if that comes
// sooner). Until then the server-rendered inline poses show the deck as-is.
let gsap = null as unknown as Gsap;
let gsapReady = false;
const ensureGsap = () =>
  loadGsap().then((k) => {
    gsap = k.gsap;
    gsapReady = true;
  });

type Pose = { x: number; y: number; scale: number; rotate: number };

/** Resting pose of card `idx` at stack `depth` (0 = top). */
const pose = (idx: number, depth: number): Pose => ({
  x: 0,
  y: depth * 16,
  scale: 1 - depth * 0.05,
  rotate: depth === 0 ? 0 : ROT[idx % ROT.length],
});

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Release the click lock shortly after a move starts (lets moves overlap). */
const unlockSoon = (lock: { current: boolean }) => {
  window.setTimeout(() => {
    lock.current = false;
  }, 320);
};

type DraggableInstance = { kill: () => void };
type DraggableStatic = {
  create: (
    target: Element,
    vars: Record<string, unknown>,
  ) => DraggableInstance[];
};

/**
 * Testimonials (plasma band): a physical deck of quote cards, fully driven by
 * GSAP so every move is one continuous motion.
 * - Next: the top card is thrown off while the next one rises in the same beat;
 *   the thrown card then slides in quietly at the back of the pile.
 * - Previous: the last card flies back in from the left onto the top.
 * - Drag: the card underneath rises as you pull; release past the threshold (or
 *   with a quick flick) and the throw continues from your finger, otherwise the
 *   card springs home.
 * DOM order never changes (depth is z-index), so nothing ever snaps.
 */
export function Testimonials() {
  const deck = useRef<HTMLDivElement>(null);
  const order = useRef(testimonials.map((_, i) => i)); // order[0] = top card
  const [top, setTop] = useState(0);
  const lock = useRef(false);
  const drag = useRef<DraggableInstance | null>(null);
  const DraggableRef = useRef<DraggableStatic | null>(null);

  const cards = useCallback(
    () =>
      Array.from(deck.current?.querySelectorAll<HTMLElement>("figure") ?? []),
    [],
  );

  /** Move every card (except `skip`) to its pose for the current order. */
  const layout = useCallback(
    (skip?: HTMLElement, duration = 0.85, delay = 0) => {
      const els = cards();
      order.current.forEach((idx, depth) => {
        const el = els[idx];
        if (!el || el === skip) return;
        gsap.set(el, { zIndex: N - depth });
        gsap.to(el, {
          ...pose(idx, depth),
          duration: reducedMotion() ? 0 : duration,
          delay,
          ease: "expo.out",
          overwrite: "auto",
        });
      });
    },
    [cards],
  );

  // `bindDrag` and `next` reference each other, so bindDrag reads next via ref.
  const nextRef = useRef<(dir?: number, fromDrag?: boolean) => void>(() => {});

  const bindDrag = useCallback(() => {
    drag.current?.kill();
    drag.current = null;
    const D = DraggableRef.current;
    if (!D || reducedMotion()) return;
    const els = cards();
    const topIdx = order.current[0];
    const nextIdx = order.current[1];
    const topEl = els[topIdx];
    const nextEl = els[nextIdx];
    if (!topEl) return;
    let lastX = 0;
    let lastT = 0;
    let vel = 0;
    [drag.current] = D.create(topEl, {
      type: "x",
      zIndexBoost: false,
      minimumMovement: 4,
      onPress() {
        lastX = 0;
        lastT = performance.now();
        vel = 0;
      },
      onDrag(this: { x: number }) {
        const now = performance.now();
        vel = (this.x - lastX) / Math.max(1, now - lastT); // px per ms
        lastX = this.x;
        lastT = now;
        gsap.set(topEl, { rotate: this.x / 16 });
        if (!nextEl) return;
        // The card underneath rises (up to 60%) as you pull the top one away.
        const p = Math.min(1, Math.abs(this.x) / 260) * 0.6;
        const a = pose(nextIdx, 1);
        const b = pose(nextIdx, 0);
        gsap.set(nextEl, {
          y: lerp(a.y, b.y, p),
          scale: lerp(a.scale, b.scale, p),
          rotate: lerp(a.rotate, b.rotate, p),
        });
      },
      onRelease(this: { x: number }) {
        const flick = Math.abs(vel) > 0.6;
        if (Math.abs(this.x) > 110 || flick) {
          const dir = (flick ? vel : this.x) > 0 ? 1 : -1;
          nextRef.current(dir, true);
        } else {
          gsap.to(topEl, {
            x: 0,
            rotate: 0,
            duration: 0.9,
            ease: "elastic.out(1, 0.55)",
          });
          layout(topEl, 0.6);
        }
      },
    });
  }, [cards, layout]);

  const next = useCallback(
    (dir = 1, fromDrag = false) => {
      if (!gsapReady) {
        ensureGsap().then(() => nextRef.current(dir, fromDrag));
        return;
      }
      if (lock.current && !fromDrag) return;
      lock.current = true;
      const els = cards();
      const idx = order.current[0];
      const el = els[idx];
      order.current = [...order.current.slice(1), idx];
      setTop(order.current[0]);
      const rm = reducedMotion();
      const w = deck.current?.offsetWidth ?? 400;
      if (el) {
        gsap.set(el, { zIndex: N + 1 });
        // Throw the top card off; from a drag it keeps its momentum (ease-out),
        // from a button it accelerates away (ease-in).
        gsap.to(el, {
          x: dir * (w + 180),
          y: -24,
          rotate: dir * 18,
          duration: rm ? 0 : fromDrag ? 0.5 : 0.6,
          ease: fromDrag ? "power2.out" : "power2.in",
          overwrite: "auto",
          onComplete: () => {
            // Tuck it in at the back: appear just below its slot, then settle.
            const back = pose(idx, N - 1);
            gsap.set(el, {
              zIndex: 1,
              x: 0,
              y: back.y + 36,
              rotate: back.rotate,
              scale: back.scale - 0.05,
              opacity: 0,
            });
            gsap.to(el, {
              y: back.y,
              scale: back.scale,
              opacity: 1,
              duration: rm ? 0 : 0.7,
              ease: "power3.out",
            });
          },
        });
      }
      // The rest of the deck moves up in the same beat.
      layout(el, 0.9, rm ? 0 : 0.06);
      bindDrag();
      unlockSoon(lock);
    },
    [bindDrag, cards, layout],
  );
  nextRef.current = next;
  const prevRef = useRef<() => void>(() => {});

  const prev = useCallback(() => {
    if (!gsapReady) {
      ensureGsap().then(() => prevRef.current());
      return;
    }
    if (lock.current) return;
    lock.current = true;
    const els = cards();
    const idx = order.current[N - 1];
    const el = els[idx];
    order.current = [idx, ...order.current.slice(0, -1)];
    setTop(idx);
    const rm = reducedMotion();
    const w = deck.current?.offsetWidth ?? 400;
    if (el) {
      // Pull the bottom card out from under the pile to the left, then swing
      // it over the top into place: one continuous path, no teleport.
      const tl = gsap.timeline();
      tl.to(el, {
        x: -(w * 0.85),
        y: -10,
        rotate: -12,
        duration: rm ? 0 : 0.32,
        ease: "power2.in",
        overwrite: "auto",
      })
        .set(el, { zIndex: N + 1 })
        .to(el, {
          ...pose(idx, 0),
          duration: rm ? 0 : 0.8,
          ease: "expo.out",
          onComplete: () => {
            gsap.set(el, { zIndex: N });
          },
        });
    }
    // The rest of the deck steps back as the card comes over the top.
    layout(el, 0.85, rm ? 0 : 0.3);
    bindDrag();
    unlockSoon(lock);
  }, [bindDrag, cards, layout]);
  prevRef.current = prev;

  // Idle: load GSAP, put it in charge of every card's pose, then lazy-load
  // Draggable (only this section needs it) and attach it to the top card.
  useIdleEffect(() => {
    let cancelled = false;
    const els = cards();
    ensureGsap().then(() => {
      if (cancelled) return;
      order.current.forEach((idx, depth) => {
        if (els[idx])
          gsap.set(els[idx], { ...pose(idx, depth), zIndex: N - depth });
      });
      if (reducedMotion()) return;
      import("gsap/Draggable").then(({ Draggable }) => {
        if (cancelled) return;
        gsap.registerPlugin(Draggable);
        DraggableRef.current = Draggable as unknown as DraggableStatic;
        bindDrag();
      });
    });
    return () => {
      cancelled = true;
      drag.current?.kill();
      if (gsapReady) gsap.killTweensOf(els);
    };
  });

  return (
    <section className="relative overflow-hidden bg-plasma py-24 text-ink sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.18em] left-0 select-none whitespace-nowrap font-display text-[26vw] font-black uppercase leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.45)]"
        style={{ fontVariationSettings: '"wdth" 150' }}
      >
        Kind words
      </div>
      <div className="relative mx-auto grid w-full max-w-[1600px] items-center gap-14 px-[var(--gutter)] lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel index="07" title="Testimonials" />
          <h2
            className="display mt-5 text-[clamp(2.8rem,7vw,7rem)]"
            style={{ ["--wdth" as string]: 105 }}
          >
            Clients say it best
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink/85">
            Drag the top card aside, or use the buttons, to read the next one.
          </p>
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="grid h-14 w-14 cursor-pointer place-items-center rounded-full border-2 border-ink text-xl transition-colors duration-500 hover:bg-ink hover:text-plasma"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => next(1)}
              aria-label="Next testimonial"
              className="grid h-14 w-14 cursor-pointer place-items-center rounded-full bg-ink text-xl text-plasma transition-transform duration-500 ease-[var(--ease-out-expo)] hover:scale-105"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={deck}
          className="relative mx-auto h-[30rem] w-full max-w-[34rem] sm:h-[27rem] lg:col-span-7"
          aria-live="polite"
        >
          {testimonials.map((t, idx) => {
            const p = pose(idx, idx);
            return (
              <figure
                key={t.name}
                data-top={top === idx}
                aria-hidden={top !== idx}
                data-cursor={top === idx ? "DRAG" : undefined}
                className={`absolute inset-0 flex cursor-grab touch-pan-y flex-col justify-between rounded-[2rem] p-7 shadow-[0_30px_60px_-25px_rgba(14,11,36,0.5)] will-change-transform active:cursor-grabbing sm:p-9 ${CARD_TONES[idx % CARD_TONES.length]}`}
                // Initial pose for server render / no-JS; GSAP owns it after mount.
                // (Constant per card, so React never rewrites it mid-animation.)
                style={{
                  zIndex: N - idx,
                  transform: `translate(0px, ${p.y}px) rotate(${p.rotate}deg) scale(${p.scale})`,
                }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-7xl font-black leading-[0.6] text-ultra">
                      &ldquo;
                    </span>
                    <span
                      className="text-lg tracking-[0.15em] text-ultra"
                      role="img"
                      aria-label={`${t.rating} out of 5 stars`}
                    >
                      {"★".repeat(t.rating)}
                    </span>
                  </div>
                  <blockquote className="mt-6 font-display text-[clamp(1.2rem,1.8vw,1.6rem)] font-bold leading-[1.15] tracking-[-0.02em]">
                    {t.quote}
                  </blockquote>
                </div>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white">
                    {t.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block text-sm text-ink-2">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
