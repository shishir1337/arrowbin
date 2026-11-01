"use client";

import { getImageProps } from "next/image";

/**
 * Preloads a `fill` image on wide screens only, for an image that is the LCP
 * element on desktop but sits below the headline on phones (/work deck, /about
 * portrait, the /blog lead cover). A plain `priority`/`preload` would fetch it on
 * phones too, from the top of <head>, where it queued ahead of the page's CSS
 * and scripts.
 *
 * A client component rendering a `<link>` element (React hoists it into
 * <head>), not react-dom's `preload()` in a server component: from a server
 * component both travel in the page's RSC payload as a preload hint, and Next
 * prefetches the payload of every page linked from the header, so every page
 * on the site downloaded the /about portrait (and the /blog cover) on desktop.
 * A client component only runs when its page renders, on the server for the
 * HTML and in the browser after a navigation.
 *
 * Pair it with `loading="eager" fetchPriority="low"` on the <Image>: without
 * `fetchPriority="low"` React adds its own, unconditional preload for every
 * eager image. `sizes` must match the <Image>'s so both pick the same file.
 */
export function WideImagePreload({
  src,
  sizes,
}: {
  src: string;
  sizes: string;
}) {
  const { props } = getImageProps({ src, alt: "", fill: true, sizes });
  return (
    <link
      rel="preload"
      as="image"
      href={props.src}
      imageSrcSet={props.srcSet}
      imageSizes={props.sizes}
      fetchPriority="high"
      media="(min-width: 1024px)"
    />
  );
}
