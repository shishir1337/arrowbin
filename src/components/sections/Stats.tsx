import { CountUp } from "@/components/motion/CountUp";
import { Container } from "@/components/ui/Container";

const stats = [
  { value: 50, suffix: "+", label: "Projects delivered" },
  { value: 15, suffix: "+", label: "Happy clients worldwide" },
  { value: 8, suffix: "", label: "Core service areas" },
  { value: 2, suffix: "", label: "Global offices" },
];

export function Stats() {
  return (
    <section className="border-y border-border bg-surface py-14">
      <Container>
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <CountUp
                  value={s.value}
                  suffix={s.suffix}
                  className="font-display text-4xl font-bold text-accent sm:text-5xl"
                />
                <span className="mt-2 block text-sm text-muted">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
