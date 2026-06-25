import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/testimonials";

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
              className="card-surface card-interactive flex h-full flex-col rounded-2xl p-6"
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
