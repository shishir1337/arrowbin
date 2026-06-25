import { Magnetic } from "@/components/motion/Magnetic";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

const highlights = [
  "Custom Software",
  "Web & Mobile Apps",
  "SaaS Products",
  "AI Automation",
];

/**
 * Above-the-fold cinematic hero. The staggered entrance is pure CSS (see the
 * `[data-hero]` rules in globals.css) so the hero paints with zero client JS; the
 * Magnetic CTAs and scramble badge hydrate progressively. The H1 is never
 * hidden/animated so it stays the LCP element from first paint.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
      {/* Cinematic background: aurora blobs + spotlight + grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="blob left-[6%] top-[-14%] h-80 w-80" />
        <div
          className="blob right-[2%] top-[2%] h-96 w-96"
          style={{ animationDelay: "-7s", animationDuration: "22s" }}
        />
        <div
          className="blob bottom-[-10%] left-[38%] h-72 w-72 opacity-10"
          style={{ animationDelay: "-3s", animationDuration: "26s" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(163,230,53,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
        {/* Bottom fade into the page */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <Container className="text-center">
        <div
          data-hero="badge"
          className="glass mx-auto inline-flex items-center gap-2.5 rounded-full border border-border/80 px-4 py-1.5 text-sm font-medium text-muted"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_1px_rgb(var(--brand-rgb)/0.8)]" />
          </span>
          Available for new projects
        </div>

        <h1
          data-hero="title"
          className="relative mx-auto mt-7 max-w-4xl text-balance text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
        >
          <span className="block">We build software that</span>
          <span className="text-gradient relative block">
            grows your business
            {/* Glow halo behind the gradient phrase */}
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 block bg-[radial-gradient(ellipse_at_center,rgba(163,230,53,0.25),transparent_70%)] blur-2xl"
            />
          </span>
        </h1>

        <p
          data-hero="sub"
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
        >
          Arrowbin is a software development company. We turn ideas into web
          apps, mobile apps, SaaS products and AI automation that hold up under
          real traffic, for startups and enterprises worldwide.
        </p>

        <div
          data-hero="cta"
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Magnetic>
            <ButtonLink href="/contact" size="lg" icon="arrow-right">
              Start your project
            </ButtonLink>
          </Magnetic>
          <Magnetic>
            <ButtonLink href="/work" size="lg" variant="secondary">
              See our work
            </ButtonLink>
          </Magnetic>
        </div>

        <ul className="mt-14 flex flex-wrap items-center justify-center gap-2.5">
          {highlights.map((h) => (
            <li
              key={h}
              data-hero="chip"
              className="card-surface inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm text-text"
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
