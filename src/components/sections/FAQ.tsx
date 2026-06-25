import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";

/**
 * Accessible FAQ accordion built on native <details>/<summary> — works without JS,
 * keyboard-friendly, and renders question/answer text crawlers can read for AEO.
 * JSON-LD (FAQPage) is emitted separately by the page via faqSchema().
 */
export function FAQ({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="card-surface mx-auto max-w-3xl divide-y divide-border overflow-hidden rounded-2xl">
      {items.map((item) => (
        <Reveal key={item.question} from="fade">
          <details className="group transition-colors duration-300 open:bg-surface-2/40">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left font-display text-lg font-medium text-text transition-colors hover:text-accent group-open:text-accent [&::-webkit-details-marker]:hidden">
              {item.question}
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-muted transition-all duration-300 group-open:rotate-180 group-open:border-brand group-open:text-accent">
                <Icon name="chevron-down" size={16} />
              </span>
            </summary>
            <div className="px-5 pb-5 leading-relaxed text-muted">
              {item.answer}
            </div>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
