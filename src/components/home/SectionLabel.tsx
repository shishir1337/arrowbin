/** Mono section tag: "(01) — Manifesto" with a short rule. */
export function SectionLabel({
  index,
  title,
  className = "",
  tone = "text-ink",
}: {
  index: string;
  title: string;
  className?: string;
  tone?: string;
}) {
  return (
    <p className={`label flex items-center gap-3 ${tone} ${className}`}>
      <span className="opacity-80">({index})</span>
      <span className="h-px w-8 bg-current opacity-40" />
      {title}
    </p>
  );
}
