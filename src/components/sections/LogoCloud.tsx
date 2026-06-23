import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { clients } from "@/lib/portfolio";

/** Trust strip of client names (text marks — no logo assets provided). */
export function LogoCloud() {
  return (
    <section className="py-12">
      <Container>
        <Reveal
          as="p"
          className="text-center text-sm font-medium uppercase tracking-widest text-muted"
        >
          Trusted by teams we've worked with
        </Reveal>
        <Reveal>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {clients.map((name) => (
              <li
                key={name}
                className="font-display text-lg font-semibold text-muted transition-colors hover:text-text"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
