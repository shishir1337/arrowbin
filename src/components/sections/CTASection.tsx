import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** Recurring conversion block. Placed near the foot of most pages. */
export function CTASection({
  title = "Ready to build something great?",
  intro = "Tell us about your project and get a free, no-obligation consultation with our team.",
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
        <Reveal className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center sm:px-12">
          {/* Decorative gradient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent/30 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold text-primary-fg sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg text-primary-fg/80">{intro}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={primary.href} size="lg" icon="arrow-right">
                {primary.label}
              </ButtonLink>
              <ButtonLink
                href={secondary.href}
                size="lg"
                variant="secondary"
                className="border-primary-fg/20 bg-primary-fg/10 text-primary-fg hover:bg-primary-fg/20 hover:text-primary-fg"
              >
                {secondary.label}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
