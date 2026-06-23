import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    n: "01",
    title: "Discover",
    description:
      "We dig into your goals, users and constraints to define a clear, prioritized scope.",
  },
  {
    n: "02",
    title: "Design",
    description:
      "We map the architecture and craft the UX/UI so the build is right before a line of code.",
  },
  {
    n: "03",
    title: "Build",
    description:
      "We ship in agile sprints with regular demos, so you see real progress every week.",
  },
  {
    n: "04",
    title: "Launch & grow",
    description:
      "We deploy, monitor and keep improving — turning your launch into long-term momentum.",
  },
];

export function Process() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="A proven process, built for clarity"
          intro="No black boxes. You always know what's happening, why, and what's next."
        />
        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.n}
              data-reveal
              className="relative rounded-2xl border border-border bg-surface p-6"
            >
              <span className="font-display text-5xl font-bold text-accent/20">
                {step.n}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-text">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
