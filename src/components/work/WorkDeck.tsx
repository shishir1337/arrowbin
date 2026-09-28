"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { reducedMotion } from "@/lib/gsap";

type Shot = { name: string; image: string; blur?: string };

/** Where each card in the fan sits, front (0) to back. */
const SLOTS = [
  { x: "0%", y: "0%", r: "-3deg", s: 1, z: 40 },
  { x: "9%", y: "-7%", r: "4deg", s: 0.94, z: 30 },
  { x: "-8%", y: "-12%", r: "-9deg", s: 0.88, z: 20 },
  { x: "4%", y: "-17%", r: "8deg", s: 0.82, z: 10 },
];

/**
 * /work hero: a fanned deck of real screenshots that shuffles itself, the
 * front card flying to the back every few seconds. Decorative; the full
 * project list follows below.
 */
export function WorkDeck({ shots }: { shots: Shot[] }) {
  const [front, setFront] = useState(0);
  const n = shots.length;

  useEffect(() => {
    if (reducedMotion() || n < 2) return;
    let id = 0;
    const start = () => {
      id = window.setInterval(() => {
        if (!document.hidden) setFront((f) => (f + 1) % n);
      }, 3200);
    };
    start();
    return () => window.clearInterval(id);
  }, [n]);

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-[16/11] w-[84%] max-w-[560px] sm:w-full"
    >
      {shots.map((s, i) => {
        const depth = (i - front + n) % n;
        const slot = SLOTS[Math.min(depth, SLOTS.length - 1)];
        const hidden = depth >= SLOTS.length;
        return (
          <div
            key={s.image}
            className="absolute inset-x-0 bottom-0 transition-[translate,rotate,scale,opacity] duration-[1100ms] ease-[var(--ease-out-expo)]"
            style={{
              translate: `${slot.x} ${slot.y}`,
              rotate: slot.r,
              scale: slot.s,
              zIndex: slot.z,
              opacity: hidden ? 0 : 1,
            }}
          >
            <div className="overflow-hidden rounded-[1.4rem] bg-white p-2 shadow-[0_40px_70px_-36px_rgba(14,11,36,0.65)] ring-1 ring-ink/10">
              <div className="flex h-6 items-center gap-1.5 px-2">
                <span className="h-2 w-2 rounded-full bg-plasma" />
                <span className="h-2 w-2 rounded-full bg-sun" />
                <span className="h-2 w-2 rounded-full bg-ultra" />
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[0.9rem] bg-frost">
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 560px, 90vw"
                  priority={i === 0}
                  className="object-cover object-top"
                  {...(s.blur
                    ? { placeholder: "blur" as const, blurDataURL: s.blur }
                    : {})}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
