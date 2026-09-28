import { TapesMotion } from "./motion/TapesMotion";

const A = [
  "Custom software",
  "E-commerce",
  "Mobile apps",
  "SaaS products",
  "UI/UX design",
  "AI automation",
  "Cloud & DevOps",
  "Support",
];
const B = [
  "Ship weekly",
  "Own your code",
  "Senior engineers",
  "Fixed estimates",
  "Built to scale",
  "No lock-in",
];

function Row({ items, star }: { items: string[]; star: string }) {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span
            className="whitespace-nowrap px-[0.45em] font-display text-[clamp(1.6rem,4.4vw,4.2rem)] font-extrabold uppercase leading-none tracking-[-0.03em]"
            style={{ fontVariationSettings: '"wdth" 125' }}
          >
            {t}
          </span>
          <span className={`text-[clamp(1.2rem,3vw,2.8rem)] ${star}`}>✦</span>
        </span>
      ))}
    </div>
  );
}

/**
 * Two marquee tapes crossing in an X. Both drift constantly; scroll velocity
 * kicks them faster and scroll direction flips which way they run.
 */
export function Tapes() {
  return (
    <section
      aria-label="What we do, in brief"
      className="relative z-10 flex h-[34vh] min-h-[16rem] items-center overflow-hidden sm:h-[46vh]"
    >
      <TapesMotion />
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[5deg] bg-plasma py-[0.9em] text-ink shadow-[0_20px_50px_-20px_rgba(255,77,166,0.7)]">
        <div data-tape="b" className="flex w-max">
          <Row items={B} star="text-ultra" />
          <Row items={B} star="text-ultra" />
          <Row items={B} star="text-ultra" />
        </div>
      </div>
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 -rotate-[4deg] bg-ultra py-[0.9em] text-white shadow-[0_24px_60px_-20px_rgba(59,43,255,0.8)]">
        <div data-tape="a" className="flex w-max">
          <Row items={A} star="text-sun" />
          <Row items={A} star="text-sun" />
        </div>
      </div>
    </section>
  );
}
