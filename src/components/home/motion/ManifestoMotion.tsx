"use client";

import { useRef } from "react";
import { reducedMotion } from "@/lib/gsap";
import { useGsapIdle } from "@/lib/useIdleEffect";

/** Scroll motion for the server-rendered Manifesto section (renders nothing). */
export function ManifestoMotion() {
  const anchor = useRef<HTMLSpanElement>(null);

  useGsapIdle(({ gsap }) => {
    const el = anchor.current?.closest("section");
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      const words = el.querySelectorAll(".mf-word");
      gsap.fromTo(
        words,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          // Short per-word tweens: only a handful of words repaint per frame.
          duration: 0.25,
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".mf-text",
            start: "top 80%",
            end: "bottom 45%",
            scrub: true,
          },
        },
      );
      gsap.from(".mf-pill", {
        scale: 0,
        rotate: -90,
        ease: "back.out(2)",
        duration: 0.9,
        stagger: 0.15,
        scrollTrigger: { trigger: ".mf-text", start: "top 70%" },
      });
      gsap.to(".mf-shape", {
        yPercent: -60,
        rotate: 40,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);
    return () => ctx.revert();
  });

  return <span ref={anchor} hidden />;
}
