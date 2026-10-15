import { getImageProps } from "next/image";
import { preload } from "react-dom";

/**
 * Preloads a `fill` image on wide screens only, for an image that is the LCP
 * element on desktop but sits below the headline on phones (/work deck, /about
 * portrait). A plain `priority`/`preload` would fetch it on phones too, from
 * the top of <head>, where it queued ahead of the page's CSS and scripts.
 *
 * Pair it with `loading="eager" fetchPriority="low"` on the <Image>: without
 * `fetchPriority="low"` React adds its own, unconditional preload for every
 * eager image. `sizes` must match the <Image>'s so both pick the same file.
 */
export function preloadWideImage(src: string, sizes: string) {
  const { props } = getImageProps({ src, alt: "", fill: true, sizes });
  preload(props.src, {
    as: "image",
    imageSrcSet: props.srcSet,
    imageSizes: props.sizes,
    fetchPriority: "high",
    media: "(min-width: 1024px)",
  });
}
