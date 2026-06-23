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
    <div className="mx-auto max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
      {items.map((item) => (
        <Reveal key={item.question} from="fade">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left font-display text-lg font-medium text-text transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
              {item.question}
              <Icon
                name="chevron-down"
                size={20}
                className="shrink-0 text-muted transition-transform duration-300 group-open:rotate-180"
              />
            </summary>
            <div className="px-5 pb-5 text-muted leading-relaxed">
              {item.answer}
            </div>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
