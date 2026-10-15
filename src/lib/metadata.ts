import type { Metadata } from "next";
import { defaultOgImage, pageAlternates, site } from "@/lib/site";

/** Open Graph locale for every page. The site is English only. */
export const ogLocale = "en_US";

/** The X (Twitter) account credited on every share card. */
export const xHandle = "@Arrowbinllc";

/** RSS auto-discovery link, so feed readers find the blog from any page. */
export const feedAlternate = { "application/rss+xml": "/blog/rss.xml" };

type ShareImage = { url: string; width: number; height: number; alt: string };

/**
 * Canonical, Open Graph and X card metadata for one indexable page.
 *
 * Next.js merges metadata shallowly: a page that sets `alternates`, `openGraph`
 * or `twitter` replaces the root layout's object instead of extending it. So
 * each object built here is complete on its own: the self-referencing canonical
 * (from `pageAlternates`) plus the feed link, and share tags whose url is the
 * page's own URL, with type, site name, locale and an image with alt text.
 *
 * `title` is the full share title, brand included: the "%s | Arrowbin" template
 * only applies to `<title>`, not to og:title or twitter:title.
 */
export function pageShare({
  path,
  title,
  description,
  image = defaultOgImage,
}: {
  path: string;
  title: string;
  description: string;
  image?: ShareImage;
}): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  return {
    alternates: { ...pageAlternates(path), types: feedAlternate },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocale,
      url: path,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      site: xHandle,
      creator: xHandle,
      title,
      description,
      images: [image],
    },
  };
}
