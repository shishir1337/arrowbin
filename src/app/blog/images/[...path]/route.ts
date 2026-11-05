import { readOwnImage } from "@/lib/article-images";

/**
 * The copies of the images in RankYak articles, at
 * /blog/images/<number>/<name>.webp (see src/lib/article-images.ts). The
 * image at a path never changes, so browsers and Cloudflare keep it a year.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  try {
    const image = await readOwnImage(path.join("/"));
    if (!image) {
      return new Response("Not found", {
        status: 404,
        headers: { "Cache-Control": "public, max-age=300" },
      });
    }
    return new Response(new Uint8Array(image.bytes), {
      headers: {
        "Content-Type": image.contentType,
        "Content-Length": String(image.bytes.length),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error(
      "[blog/images]",
      error instanceof Error ? error.message : error,
    );
    return new Response("Unavailable", {
      status: 503,
      headers: { "Cache-Control": "no-store", "Retry-After": "60" },
    });
  }
}
