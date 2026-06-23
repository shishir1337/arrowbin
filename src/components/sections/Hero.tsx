"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

const highlights = [
  "Custom Software",
  "Web & Mobile Apps",
  "SaaS Products",
  "AI Automation",
];

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Reduced motion: CSS pre-hid these; just reveal them in place. (The H1 is never
      // hidden — it stays painted for the best LCP — so it's not in this list.)
      if (prefersReducedMotion()) {
        gsap.set(
          [
            "[data-hero='badge']",
            "[data-hero='sub']",
            "[data-hero='cta'] > *",
            "[data-hero='chip']",
          ],
          { opacity: 1, y: 0 },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 },
      });
      // The H1 headline is deliberately NOT animated: it's the LCP element, so it paints
      // at first paint instead of waiting for hydration. fromTo for the rest (CSS pre-hides them).
      tl.fromTo(
        "[data-hero='badge']",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0 },
      )
        .fromTo(
          "[data-hero='sub']",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0 },
          "-=0.4",
        )
        .fromTo(
          "[data-hero='cta'] > *",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, stagger: 0.1 },
          "-=0.5",
        )
        .fromTo(
          "[data-hero='chip']",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, stagger: 0.06 },
          "-=0.4",
        );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28"
    >
      {/* Background: grid + glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-10%,rgba(101,163,13,0.16),transparent_55%)] dark:bg-[radial-gradient(circle_at_30%_-10%,rgba(163,230,53,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <Container className="text-center">
        <div
          data-hero="badge"
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for new projects
        </div>

        <h1
          data-hero="title"
          className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl"
        >
          <span className="block">We build software that</span>
          <span className="block bg-gradient-to-r from-accent to-lime-400 bg-clip-text text-transparent">
            grows your business
          </span>
        </h1>

        <p
          data-hero="sub"
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
        >
          Arrowbin is a software development company turning ideas into fast,
          scalable web apps, mobile apps, SaaS products and AI automation — for
          startups and enterprises across the globe.
        </p>

        <div
          data-hero="cta"
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <ButtonLink href="/contact" size="lg" icon="arrow-right">
            Start your project
          </ButtonLink>
          <ButtonLink href="/work" size="lg" variant="secondary">
            See our work
          </ButtonLink>
        </div>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {highlights.map((h) => (
            <li
              key={h}
              data-hero="chip"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-text"
            >
              <Icon name="check" size={14} className="text-accent" />
              {h}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
