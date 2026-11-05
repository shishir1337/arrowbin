import { createHash, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { ownImages, rankYakImageUrls } from "@/lib/article-images";
import {
  type ArticleStatus,
  forgetLiveSlugs,
  type RankYakArticle,
  SLUG_PATTERN,
  upsertArticle,
} from "@/lib/articles";
import { getPost } from "@/lib/blog";
import { hasDatabase } from "@/lib/db";

/**
 * Receives finished articles from RankYak (an SEO content tool) and stores
 * them in the `articles` table, which the blog reads. Paste this endpoint's
 * production URL, https://arrowbin.com/api/rankyak-webhook, into RankYak.
 *
 * RankYak POSTs JSON with an `X-RankYak-Secret` header that must equal
 * RANKYAK_WEBHOOK_SECRET. Events: "ping" (connection test, nothing is stored),
 * "article.published" and "article.updated" (the article is inserted or, with
 * the same RankYak id, replaced). Only POST is exported, so Next answers every
 * other method with 405.
 */

/**
 * The public address of the live site: article URLs in the response are
 * built from it, never from the request (RankYak calls whatever address was
 * pasted into it, and that host may not be public).
 */
const SITE_URL = "https://arrowbin.com";

export const dynamic = "force-dynamic";

const EVENTS = new Set(["ping", "article.published", "article.updated"]);
const STATUSES = new Set<ArticleStatus>(["published", "draft"]);

function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

/** Constant-time comparison (hashing first makes both sides the same length). */
function sameSecret(given: string, expected: string): boolean {
  const a = createHash("sha256").update(given).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/** A string field that may be null or absent. */
function optionalText(
  article: Record<string, unknown>,
  key: string,
): string | null {
  const value = article[key];
  if (value === undefined || value === null) return null;
  if (typeof value !== "string")
    throw new Error(`article.${key} must be a string`);
  return value;
}

/** A date-time field that may be null or absent; must parse as a date. */
function optionalTime(
  article: Record<string, unknown>,
  key: string,
): string | null {
  const value = optionalText(article, key);
  if (value === null || value === "") return null;
  if (Number.isNaN(Date.parse(value))) {
    throw new Error(`article.${key} is not a valid date: ${value}`);
  }
  return value;
}

/** Checks the payload's `article` and returns it typed, or throws why not. */
function readArticle(value: unknown): RankYakArticle {
  if (!isObject(value)) throw new Error("article is missing");
  const { id, slug, title } = value;
  if (typeof id !== "number" || !Number.isSafeInteger(id) || id < 0) {
    throw new Error("article.id must be a whole number");
  }
  if (typeof slug !== "string" || !SLUG_PATTERN.test(slug)) {
    throw new Error(
      `article.slug must be lower-case words joined by hyphens, got ${JSON.stringify(slug)}`,
    );
  }
  if (typeof title !== "string" || title.trim() === "") {
    throw new Error("article.title is missing");
  }
  return {
    id,
    slug,
    title,
    excerpt: optionalText(value, "excerpt"),
    meta_title: optionalText(value, "meta_title"),
    meta_description: optionalText(value, "meta_description"),
    html: optionalText(value, "html"),
    markdown: optionalText(value, "markdown"),
    header_image_url: optionalText(value, "header_image_url"),
    publish_at: optionalTime(value, "publish_at"),
    published_at: optionalTime(value, "published_at"),
    updated_at: optionalTime(value, "updated_at"),
    archived_at: optionalTime(value, "archived_at"),
  };
}

/**
 * Optional: drops the changed URLs from Cloudflare's edge cache, which keeps
 * pages for up to 2 hours whatever the origin says (the "Cache pages at the
 * edge" rule). Runs only when CLOUDFLARE_ZONE_ID and CLOUDFLARE_API_TOKEN (a
 * token with Zone > Cache Purge for arrowbin.com) are set. A failure is
 * logged and never fails the webhook: the edge copy then expires on its own.
 */
async function purgeEdgeCache(paths: string[]) {
  const zone = process.env.CLOUDFLARE_ZONE_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!zone || !token) return;
  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${zone}/purge_cache`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ files: paths.map((p) => `${SITE_URL}${p}`) }),
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!res.ok) {
      console.error(
        `[rankyak-webhook] Cloudflare purge failed: ${res.status} ${await res.text()}`,
      );
    }
  } catch (error) {
    console.error("[rankyak-webhook] Cloudflare purge failed:", error);
  }
}

export async function POST(request: Request) {
  try {
    const expected = process.env.RANKYAK_WEBHOOK_SECRET;
    if (!expected) throw new Error("RANKYAK_WEBHOOK_SECRET is not set");
    const given = request.headers.get("x-rankyak-secret");
    if (!given || !sameSecret(given, expected)) {
      return json({ error: "Invalid secret" }, 401);
    }

    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      throw new Error("The body is not valid JSON");
    }
    if (!isObject(payload)) throw new Error("The body must be a JSON object");

    const { event, status } = payload;
    if (typeof event !== "string" || !EVENTS.has(event)) {
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
    }
    // The connection test. Article id 0 is RankYak's sample article ("your
    // site answers it without saving it"), so it is never stored either.
    if (
      event === "ping" ||
      (isObject(payload.article) && payload.article.id === 0)
    ) {
      return json({ ok: true });
    }

    if (typeof status !== "string" || !STATUSES.has(status as ArticleStatus)) {
      throw new Error(`status must be "published" or "draft"`);
    }
    const article = readArticle(payload.article);
    // The posts written in the code own their URLs.
    if (getPost(article.slug)) {
      throw new Error(
        `The slug "${article.slug}" is already used by a post on ${SITE_URL}; give the article another slug`,
      );
    }
    if (!hasDatabase()) throw new Error("DATABASE_URL is not set");

    const { previousSlug } = await upsertArticle(
      article,
      status as ArticleStatus,
    );

    // Only a live article has a public URL. For a draft or an archived one,
    // RankYak falls back to the blog URL set on its side.
    const live = status === "published" && article.archived_at === null;

    // Copy its images to this site now, so its pages show them from
    // arrowbin.com from their first render. (A failed copy is logged and
    // retried when a page that shows the image renders.)
    if (live) {
      await ownImages(rankYakImageUrls(article.header_image_url, article.html));
    }

    // Pages are prerendered and cached: mark every page that shows the
    // article as stale, so the next visit renders it fresh.
    const paths = ["/blog", `/blog/${article.slug}`];
    if (previousSlug && previousSlug !== article.slug) {
      paths.push(`/blog/${previousSlug}`);
    }
    paths.push("/sitemap.xml", "/blog/rss.xml", "/llms.txt");
    forgetLiveSlugs(article.slug, ...(previousSlug ? [previousSlug] : []));
    for (const path of paths) revalidatePath(path);
    await purgeEdgeCache(paths);

    return json(live ? { url: `${SITE_URL}/blog/${article.slug}` } : {});
  } catch (error) {
    console.error("[rankyak-webhook]", error);
    const message = error instanceof Error ? error.message : String(error);
    return json({ error: message }, 500);
  }
}
