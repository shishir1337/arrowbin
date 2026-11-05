import "server-only";
import sharp from "sharp";
import { db, hasDatabase } from "./db";

/**
 * The images in RankYak articles, served from arrowbin.com instead of
 * RankYak's hosts. RankYak sends its articles with the header image and the
 * body images on media.rankyak.com / cdn.rankyak.com (the same files on both),
 * as lossless 1536 px WebP files of 0.5 to 0.75 MB each. Each one is copied
 * once into the `article_images` table, re-encoded at WebP quality 82 (about a
 * tenth of the size, no visible difference), and served at
 * /blog/images/<number>/<name>.webp by src/app/blog/images.
 *
 * The copy happens when the webhook receives an article and, for anything not
 * copied yet (articles from before this, or a download that failed), when a
 * page that shows the image renders. Until an image is copied, the page keeps
 * RankYak's URL, so an image is never broken by a failed copy.
 */

/** RankYak's image URLs; group 1 + 2 make the path the copy is stored under. */
const RANKYAK_IMAGE =
  /https:\/\/(?:media|cdn)\.rankyak\.com\/(\d+)\/([A-Za-z0-9][A-Za-z0-9_-]*)\.(?:webp|png|jpe?g|gif|avif)/g;

/** Where the copies are served. */
export const OWN_IMAGE_PREFIX = "/blog/images/";

/** A stored copy's path, `<number>/<name>.webp`. */
export const OWN_IMAGE_PATH = /^\d+\/[A-Za-z0-9][A-Za-z0-9_-]*\.webp$/;

/** Wide enough for the header image on a large screen; RankYak sends 1536. */
const MAX_WIDTH = 1600;
const QUALITY = 82;
const MAX_DOWNLOAD_BYTES = 20 * 1024 * 1024;
const DOWNLOAD_TIMEOUT_MS = 10_000;

/** A copied image: its URL on this site and its size. */
export type OwnImage = { src: string; width: number; height: number };

/** RankYak URL -> its copy on this site, for the images already copied. */
export type OwnImages = Map<string, OwnImage>;

/** Every RankYak image URL in the given header URLs and HTML bodies. */
export function rankYakImageUrls(...texts: (string | null)[]): string[] {
  const urls = new Set<string>();
  for (const text of texts) {
    for (const match of text?.matchAll(RANKYAK_IMAGE) ?? []) urls.add(match[0]);
  }
  return [...urls];
}

/** The path a RankYak image is stored under: `<number>/<name>.webp`. */
function storedPath(url: string): string | undefined {
  RANKYAK_IMAGE.lastIndex = 0;
  const match = RANKYAK_IMAGE.exec(url);
  RANKYAK_IMAGE.lastIndex = 0;
  return match && match[0] === url ? `${match[1]}/${match[2]}.webp` : undefined;
}

type Size = { width: number; height: number };

/** Downloads in progress in this server process, so two renders share one. */
const copying = new Map<string, Promise<Size | undefined>>();

/** Downloads one image, re-encodes it and stores it. Throws on any failure. */
async function copy(path: string, url: string): Promise<Size> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const type = response.headers.get("content-type") ?? "";
  // Raster images only: an SVG served from this site could run script.
  if (!type.startsWith("image/") || type.includes("svg")) {
    throw new Error(`not a raster image (${type || "no content type"})`);
  }
  const input = Buffer.from(await response.arrayBuffer());
  if (input.length > MAX_DOWNLOAD_BYTES) {
    throw new Error(`too large (${input.length} bytes)`);
  }
  const { data, info } = await sharp(input, { animated: true })
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toBuffer({ resolveWithObject: true });
  // An animated image is a strip of frames: one frame's height is pageHeight.
  const size = { width: info.width, height: info.pageHeight ?? info.height };
  await db().query(
    `INSERT INTO article_images (path, source_url, content_type, width, height, bytes)
     VALUES ($1, $2, 'image/webp', $3, $4, $5)
     ON CONFLICT (path) DO NOTHING`,
    [path, url, size.width, size.height, data],
  );
  return size;
}

function copyOnce(path: string, url: string): Promise<Size | undefined> {
  let pending = copying.get(path);
  if (!pending) {
    pending = copy(path, url)
      .catch((error: unknown) => {
        console.error(
          `[article-images] could not copy ${url}:`,
          error instanceof Error ? error.message : error,
        );
        return undefined;
      })
      .finally(() => copying.delete(path));
    copying.set(path, pending);
  }
  return pending;
}

/**
 * The copies of the given RankYak images, copying any not stored yet. Never
 * throws: an image that can't be copied (or a database error) is simply left
 * out, and its page keeps RankYak's URL for it.
 */
export async function ownImages(urls: string[]): Promise<OwnImages> {
  const images: OwnImages = new Map();
  if (urls.length === 0 || !hasDatabase()) return images;
  const paths = new Map<string, string>();
  for (const url of urls) {
    const path = storedPath(url);
    if (path) paths.set(url, path);
  }
  if (paths.size === 0) return images;

  let stored: Map<string, Size>;
  try {
    const { rows } = await db().query<{
      path: string;
      width: number;
      height: number;
    }>("SELECT path, width, height FROM article_images WHERE path = ANY($1)", [
      [...new Set(paths.values())],
    ]);
    stored = new Map(rows.map((r) => [r.path, r]));
  } catch (error) {
    console.error(
      "[article-images] lookup failed:",
      error instanceof Error ? error.message : error,
    );
    return images;
  }

  await Promise.all(
    [...paths].map(async ([url, path]) => {
      const size = stored.get(path) ?? (await copyOnce(path, url));
      if (size) {
        images.set(url, {
          src: `${OWN_IMAGE_PREFIX}${path}`,
          width: size.width,
          height: size.height,
        });
      }
    }),
  );
  return images;
}

/** A header image's URL on this site, or the URL as sent when not copied. */
export function ownImageUrl(
  url: string | null,
  images: OwnImages,
): string | null {
  return url ? (images.get(url)?.src ?? url) : null;
}

/**
 * An article body with its RankYak image URLs pointing at the copies. Each
 * copied <img> also gets its width and height (so the page doesn't shift as
 * it loads) and lazy, async loading, unless it already sets them.
 */
export function withOwnImages(html: string, images: OwnImages): string {
  if (images.size === 0) return html;
  const sizes = new Map<string, OwnImage>();
  for (const image of images.values()) sizes.set(image.src, image);
  return html
    .replace(RANKYAK_IMAGE, (url) => images.get(url)?.src ?? url)
    .replace(/<img\b([^>]*?)(\s*\/?)>/gi, (tag, attrs: string, end: string) => {
      const src = /\ssrc\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1];
      const image = src ? sizes.get(src) : undefined;
      if (!image) return tag;
      let a = attrs;
      if (!/\swidth\s*=/i.test(a) && !/\sheight\s*=/i.test(a)) {
        a += ` width="${image.width}" height="${image.height}"`;
      }
      if (!/\sloading\s*=/i.test(a)) a += ' loading="lazy"';
      if (!/\sdecoding\s*=/i.test(a)) a += ' decoding="async"';
      return `<img${a}${end}>`;
    });
}

/** A stored copy, for the /blog/images route. */
export async function readOwnImage(
  path: string,
): Promise<{ contentType: string; bytes: Buffer } | undefined> {
  if (!OWN_IMAGE_PATH.test(path) || !hasDatabase()) return undefined;
  const { rows } = await db().query<{ content_type: string; bytes: Buffer }>(
    "SELECT content_type, bytes FROM article_images WHERE path = $1",
    [path],
  );
  const row = rows[0];
  return row ? { contentType: row.content_type, bytes: row.bytes } : undefined;
}
