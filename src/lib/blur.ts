import "server-only";
import manifest from "./blur-manifest.json";

// Base64 blur placeholders, generated at build time by scripts/generate-blur.mjs
// (the `prebuild` step) so no native image decoding runs inside the Next build.
const map = manifest as Record<string, string>;

/**
 * Look up the precomputed blur placeholder for a `public/` image, for use with
 * next/image `placeholder="blur"` + `blurDataURL`. Returns `undefined` for SVGs
 * or images without a generated placeholder, so callers can omit the blur.
 *
 * Async so call sites can `await` it uniformly; the lookup itself is synchronous.
 *
 * @param src - A public-relative path, with or without a leading slash.
 */
export async function getBlurDataURL(src: string): Promise<string | undefined> {
  if (!src) return undefined;
  return map[src.startsWith("/") ? src : `/${src}`];
}
