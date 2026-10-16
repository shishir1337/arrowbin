"use client";

import Image from "next/image";
import { type KeyboardEvent, type PointerEvent, useRef, useState } from "react";

type Img = {
  src: string;
  alt: string;
  width: number;
  height: number;
  blur?: string;
};

const clamp = (n: number) => Math.min(100, Math.max(0, n));

const blurProps = (blur?: string) =>
  blur ? { placeholder: "blur" as const, blurDataURL: blur } : {};

/**
 * Drag-to-compare: the old site underneath, the new one on top, clipped at the
 * handle (before on the left, after on the right). Drag anywhere on the image
 * with a mouse or pen, or swipe sideways on touch (vertical swipes still
 * scroll the page). The handle is a keyboard slider: arrow keys, Shift for
 * bigger steps, Home and End.
 */
export function BeforeAfterSlider({
  before,
  after,
  sizes,
}: {
  before: Img;
  after: Img;
  sizes: string;
}) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (r) setPos(clamp(((clientX - r.left) / r.width) * 100));
  };

  const down = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    // A touch may turn out to be a page scroll, so it only moves the handle
    // once it drags sideways; a mouse or pen click jumps straight there.
    if (e.pointerType !== "touch") moveTo(e.clientX);
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) moveTo(e.clientX);
  };
  const up = () => {
    dragging.current = false;
  };

  const key = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    const next: Record<string, number> = {
      ArrowLeft: pos - step,
      ArrowDown: pos - step,
      ArrowRight: pos + step,
      ArrowUp: pos + step,
      Home: 0,
      End: 100,
    };
    if (!(e.key in next)) return;
    e.preventDefault();
    setPos(clamp(next[e.key]));
  };

  const shown = Math.round(pos);

  return (
    <div
      ref={box}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      onLostPointerCapture={up}
      className="relative cursor-ew-resize touch-pan-y select-none overflow-hidden bg-frost"
    >
      <Image
        src={before.src}
        alt={before.alt}
        width={before.width}
        height={before.height}
        sizes={sizes}
        draggable={false}
        className="block h-auto w-full"
        {...blurProps(before.blur)}
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <Image
          src={after.src}
          alt={after.alt}
          width={after.width}
          height={after.height}
          sizes={sizes}
          draggable={false}
          className="block h-full w-full object-cover"
          {...blurProps(after.blur)}
        />
      </div>

      {/* Labels fade out once their side is almost hidden. */}
      <span
        aria-hidden="true"
        className="label pointer-events-none absolute top-3 left-3 rounded-full bg-ink px-3 py-1.5 text-white transition-opacity duration-300 sm:top-4 sm:left-4"
        style={{ opacity: pos > 14 ? 1 : 0 }}
      >
        Before
      </span>
      <span
        aria-hidden="true"
        className="label pointer-events-none absolute top-3 right-3 rounded-full bg-plasma px-3 py-1.5 text-ink transition-opacity duration-300 sm:top-4 sm:right-4"
        style={{ opacity: pos < 86 ? 1 : 0 }}
      >
        After
      </span>

      {/* Divider line and handle */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(14,11,36,0.15)]"
        style={{ left: `${pos}%` }}
      />
      <div
        role="slider"
        tabIndex={0}
        aria-label="Compare the old store with the new one"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={shown}
        aria-valuetext={`${shown}% old store, ${100 - shown}% new store`}
        onKeyDown={key}
        className="absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-sun text-ink shadow-[0_12px_30px_-8px_rgba(14,11,36,0.6)] ring-4 ring-white outline-none transition-transform duration-300 hover:scale-110 focus-visible:ring-ultra sm:h-14 sm:w-14"
        style={{ left: `${pos}%` }}
      >
        <svg
          width="22"
          height="14"
          viewBox="0 0 22 14"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2 1 7l5 5M16 2l5 5-5 5" />
        </svg>
      </div>
    </div>
  );
}
