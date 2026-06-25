import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { clients } from "@/lib/portfolio";

/** Trust strip of client names as a seamless auto-scrolling marquee. */
export function LogoCloud() {
  // Duplicate the list so the -50% marquee loop is seamless.
  const row = [...clients, ...clients];

  return (
    <section className="py-12">
      <Container>
        <Reveal
          as="p"
          className="text-center text-sm font-medium uppercase tracking-widest text-muted"
        >
          Teams we've built for
        </Reveal>
      </Container>
      <div className="marquee-mask mt-8 overflow-hidden">
        <ul className="marquee-track items-center gap-x-12">
          {row.map((name, i) => (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: duplicated marquee row needs stable positional keys.
              key={`${name}-${i}`}
              className="shrink-0 font-display text-lg font-semibold text-muted transition-colors hover:text-text"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
