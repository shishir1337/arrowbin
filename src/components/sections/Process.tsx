import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    n: "01",
    title: "Discover",
    description:
      "We dig into your goals, users and constraints, then agree on a prioritized scope.",
  },
  {
    n: "02",
    title: "Design",
    description:
      "We map the architecture and design the UX/UI, so the plan is sound before anyone writes code.",
  },
  {
    n: "03",
    title: "Build",
    description:
      "We build in agile sprints with regular demos, so you see working progress every week.",
  },
  {
    n: "04",
    title: "Launch & grow",
    description:
      "We deploy, monitor and keep improving the product well after launch day.",
  },
];

export function Process() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="A clear process from first call to launch"
          intro="You always know what's happening on your project, why it's happening, and what comes next."
        />
        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <SpotlightCard
              key={step.n}
              data-reveal
              className="relative rounded-2xl p-6"
            >
              <span className="font-display text-5xl font-bold text-accent/25">
                {step.n}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-text">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </SpotlightCard>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
