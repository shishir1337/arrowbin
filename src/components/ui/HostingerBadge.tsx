import { hostinger, hostingerLinkRel } from "@/lib/site";

/**
 * The official Hostinger Partner badge, linking to Hostinger's partner referral page.
 *
 * Rendered as a plain <img> rather than next/image on purpose: the asset is an SVG,
 * and next/image refuses to optimise SVG unless `dangerouslyAllowSVG` is enabled in
 * next.config — a config-wide loosening this one image does not justify. The SVG is
 * ~12 KB and already resolution-independent, so there is nothing to optimise.
 *
 * Hostinger's terms forbid modifying the badge, so `width` only scales it; the height
 * is always derived from the native 8:3 ratio, and both are set explicitly so the
 * image reserves its space and contributes no layout shift.
 */
export function HostingerBadge({
  width = 168,
  className = "",
}: {
  width?: number;
  className?: string;
}) {
  const height = Math.round(
    (width * hostinger.badge.height) / hostinger.badge.width,
  );

  return (
    <a
      href={hostinger.referralUrl}
      target="_blank"
      rel={hostingerLinkRel}
      title={`${hostinger.name} Partner — Arrowbin`}
      // `width` on the anchor (not `w-full` on the image, which would have no
      // containing width to resolve against inside an inline-block); `max-w-full`
      // keeps it from overflowing a narrow column.
      style={{ width }}
      className={`inline-block max-w-full rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${className}`}
    >
      {/* biome-ignore lint/performance/noImgElement: next/image refuses SVG without
          `dangerouslyAllowSVG`, and there is nothing for it to optimise here — the
          badge is a ~12 KB resolution-independent vector, lazy-loaded, with explicit
          dimensions so it costs no layout shift. */}
      <img
        src={hostinger.badge.src}
        alt={hostinger.badge.alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
    </a>
  );
}
