import { SectionLabel } from "@/components/home/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";

const STEPS = [
  {
    when: "Within 1 business day",
    title: "We reply",
    text: "A real reply to your brief, with any questions we need answered first. Never an auto-responder.",
  },
  {
    when: "Day 2–5",
    title: "A 30-minute call",
    text: "We talk through goals, users and constraints, and tell you honestly if we're not the right fit.",
  },
  {
    when: "Within a week",
    title: "A written proposal",
    text: "Scope, timeline, price and who works on it, in plain language. No obligation to go ahead.",
  },
  {
    when: "When you're ready",
    title: "Kick-off",
    text: "Discovery starts, you meet the team, and you get your first progress update that same week.",
  },
];

/** /contact: what happens after you send the brief, as four numbered steps. */
export function ContactNext({ label }: { label: string }) {
  return (
    <section className="relative bg-sun py-20 text-ink sm:py-28">
      <SectionReveal />
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <SectionLabel index={label} title="What happens next" />
        <h2
          className="display mt-5 max-w-[16ch] text-[clamp(2.2rem,4.6vw,4.6rem)]"
          style={{ ["--wdth" as string]: 100 }}
        >
          From hello to kick-off
        </h2>
        <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              data-rv={i}
              className="relative flex flex-col rounded-[1.75rem] bg-white p-6 sm:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-ink font-display text-base font-black text-sun">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full bg-frost px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">
                  {s.when}
                </span>
              </div>
              <h3 className="mt-8 font-display text-2xl font-black uppercase leading-none tracking-[-0.02em]">
                {s.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-2">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
