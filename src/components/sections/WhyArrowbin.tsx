import { Reveal } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";

const points: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "shield",
    title: "You own everything",
    description:
      "Your source code, accounts and infrastructure stay yours. No lock-in.",
  },
  {
    icon: "users",
    title: "Senior team",
    description:
      "Experienced engineers and designers who write reliable software and get it right early.",
  },
  {
    icon: "bolt",
    title: "Transparent pricing",
    description:
      "After a free discovery call, you get a fixed estimate. No surprises later, no scope games.",
  },
  {
    icon: "rocket",
    title: "Support after launch",
    description:
      "We don't disappear at go-live. We monitor, maintain and keep improving the product.",
  },
];

/** Shared "why choose us" trust band — used on the services and detail pages. */
export function WhyArrowbin({
  className = "py-16 sm:py-20",
}: {
  className?: string;
}) {
  return (
    <section className={className}>
      <Container>
        <Reveal as="h2" className="text-2xl font-bold sm:text-3xl">
          Why teams choose Arrowbin
        </Reveal>
        <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((w) => (
            <SpotlightCard
              key={w.title}
              data-reveal
              className="rounded-2xl p-6"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface-2 text-accent">
                <Icon name={w.icon} size={22} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-text">
                {w.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {w.description}
              </p>
            </SpotlightCard>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
