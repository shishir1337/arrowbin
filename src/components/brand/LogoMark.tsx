import { MARK_BIT, MARK_PATH } from "./mark";

/**
 * The Arrowbin mark. Colours come from CSS so it can sit on any band:
 * the arrowhead uses `currentColor`, the bit uses `--mark-bit` (plasma by default).
 */
export function LogoMark({
  className = "",
  title,
}: {
  className?: string;
  title?: string;
}) {
  const b = MARK_BIT;
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <path fill="currentColor" fillRule="evenodd" d={MARK_PATH} />
      <rect
        x={b.x}
        y={b.y}
        width={b.size}
        height={b.size}
        rx={b.r}
        style={{ fill: "var(--mark-bit, var(--plasma))" }}
      />
    </svg>
  );
}
