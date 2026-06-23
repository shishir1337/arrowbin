import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";

const points: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "shield",
    title: "You own everything",
    description:
      "Full ownership of your source code, accounts and infrastructure — no lock-in, ever.",
  },
  {
    icon: "users",
    title: "Senior team",
    description:
      "Experienced engineers and designers who ship clean, reliable software the first time.",
  },
  {
    icon: "bolt",
    title: "Transparent pricing",
    description:
      "A fixed, clear estimate after a free discovery call — no surprises, no scope games.",
  },
  {
    icon: "rocket",
    title: "Support after launch",
    description:
      "We don't disappear at go-live — we monitor, maintain and keep improving the product.",
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
            <div
              key={w.title}
              data-reveal
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface-2 text-accent">
                <Icon name={w.icon} size={20} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-text">
                {w.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {w.description}
              </p>
            </div>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
