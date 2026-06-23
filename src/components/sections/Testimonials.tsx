import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

const testimonials = [
  {
    quote:
      "Arrowbin delivered our platform faster than we thought possible — and the quality was outstanding. They felt like part of our team.",
    name: "Sarah Mitchell",
    role: "Product Lead, SaaS Startup",
  },
  {
    quote:
      "They rebuilt our store with a focus on speed and conversion. Page loads dropped dramatically and sales followed.",
    name: "David Chen",
    role: "Founder, E-commerce Brand",
  },
  {
    quote:
      "Clear communication, clean code and real ownership of the outcome. We've trusted them with every project since.",
    name: "Rafiul Islam",
    role: "Operations Director, Logistics",
  },
];

export function Testimonials() {
  return (
    <section className="border-y border-border bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Client stories"
          title="Teams trust Arrowbin to deliver"
          intro="We measure success by the results our clients ship — and the relationships we keep."
        />
        <StaggerGroup className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name + t.role}
              data-reveal
              className="flex h-full flex-col rounded-2xl border border-border bg-bg p-6"
            >
              <div
                className="flex gap-1 text-accent"
                role="img"
                aria-label="Rated 5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static, fixed-length decorative list.
                  <Icon key={i} name="star" size={16} />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-text leading-relaxed">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <span className="font-semibold text-text">{t.name}</span>
                <span className="block text-sm text-muted">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
