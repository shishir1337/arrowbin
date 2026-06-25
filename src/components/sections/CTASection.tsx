import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** Recurring conversion block. Placed near the foot of most pages. */
export function CTASection({
  title = "Have a project in mind?",
  intro = "Tell us what you're building and we'll set up a free consultation, no strings attached.",
  primary = { label: "Start your project", href: "/contact" },
  secondary = { label: "View our work", href: "/work" },
}: {
  title?: string;
  intro?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-b from-surface to-surface-2 px-6 py-16 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] sm:px-12">
          {/* Refined ambient background: soft top glow + faint grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_-5%,rgba(163,230,53,0.12),transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:52px_52px] opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-bold sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{intro}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic>
                <ButtonLink href={primary.href} size="lg" icon="arrow-right">
                  {primary.label}
                </ButtonLink>
              </Magnetic>
              <Magnetic>
                <ButtonLink href={secondary.href} size="lg" variant="secondary">
                  {secondary.label}
                </ButtonLink>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
