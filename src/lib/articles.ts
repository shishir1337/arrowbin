import "server-only";
import { cache } from "react";
import {
  type OwnImages,
  ownImages,
  ownImageUrl,
  rankYakImageUrls,
  withOwnImages,
} from "./article-images";
import { type Post, sortedPosts } from "./blog";
import { db, hasDatabase } from "./db";
import { site } from "./site";

/**
 * Articles written in RankYak (an SEO content tool) and received by
 * /api/rankyak-webhook into the `articles` table (db/migrations). They are
 * listed on /blog next to the posts in src/lib/posts and rendered at
 * /blog/<slug> from their HTML.
 */

export type ArticleStatus = "published" | "draft";

/** The `article` object of a RankYak webhook payload. */
export type RankYakArticle = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  html: string | null;
  markdown: string | null;
  header_image_url: string | null;
  publish_at: string | null;
  published_at: string | null;
  updated_at: string | null;
  archived_at: string | null;
};

/** A published article as the blog lists it (no body). */
export type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  /** On this site (/blog/images/...) once copied, else RankYak's URL. */
  headerImageUrl: string | null;
  /** `published_at`, or the publish date or arrival time when RankYak sent none. */
  publishedAt: Date;
  updatedAt: Date | null;
  words: number;
};

/** A published article with its body. */
export type Article = ArticleSummary & { html: string };

/** Lower-case words joined by single hyphens: safe in a URL path as is. */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const SUMMARY_COLUMNS = `
  slug, title, excerpt, meta_title, meta_description, header_image_url,
  coalesce(published_at, publish_at, received_at) AS published_at,
  updated_at,
  coalesce(array_length(regexp_split_to_array(btrim(coalesce(markdown, '')), '\\s+'), 1), 0) AS words`;

const LISTED = "status = 'published' AND archived_at IS NULL";

type SummaryRow = {
  slug: string;
  title: string;
  excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  header_image_url: string | null;
  published_at: Date;
  updated_at: Date | null;
  words: number;
};

function toSummary(row: SummaryRow, images: OwnImages): ArticleSummary {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    headerImageUrl: ownImageUrl(row.header_image_url, images),
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    words: Number(row.words),
  };
}

/**
 * A failed read during `next build` is logged and treated as "no articles",
 * so an unreachable database never blocks a deploy (the pages fill in on the
 * next webhook or hourly revalidation). At runtime it throws instead: Next then
 * keeps serving the last good page rather than caching one without articles.
 */
function readFailed<T>(error: unknown, fallback: T): T {
  if (process.env.NEXT_PHASE === "phase-production-build") {
    console.warn(
      "[articles] database unreachable during build:",
      error instanceof Error ? error.message : error,
    );
    return fallback;
  }
  throw error;
}

/** Published articles, newest first by `published_at`. */
export async function listArticles(): Promise<ArticleSummary[]> {
  if (!hasDatabase()) return [];
  try {
    const { rows } = await db().query<SummaryRow>(
      `SELECT ${SUMMARY_COLUMNS} FROM articles WHERE ${LISTED}
       ORDER BY published_at DESC NULLS LAST, received_at DESC`,
    );
    const images = await ownImages(
      rankYakImageUrls(...rows.map((r) => r.header_image_url)),
    );
    return rows.map((row) => toSummary(row, images));
  } catch (error) {
    return readFailed(error, []);
  }
}

/**
 * One published article, or undefined for a missing, draft or archived one.
 * Cached per request: the page and its metadata share one query.
 */
export const getArticle = cache(async function getArticle(
  slug: string,
): Promise<Article | undefined> {
  if (!hasDatabase() || !SLUG_PATTERN.test(slug)) return undefined;
  try {
    const { rows } = await db().query<SummaryRow & { html: string | null }>(
      `SELECT ${SUMMARY_COLUMNS}, html FROM articles
       WHERE slug = $1 AND ${LISTED}`,
      [slug],
    );
    const row = rows[0];
    if (!row) return undefined;
    const images = await ownImages(
      rankYakImageUrls(row.header_image_url, row.html),
    );
    return {
      ...toSummary(row, images),
      html: withOwnImages(row.html ?? "", images),
    };
  } catch (error) {
    return readFailed(error, undefined);
  }
});

/**
 * Slugs of live articles the proxy has seen recently, with the time each
 * check expires. On globalThis so the webhook (same server process) can drop
 * an entry the moment an article changes.
 */
const globalForSlugs = globalThis as typeof globalThis & {
  arrowbinLiveSlugs?: Map<string, number>;
};
globalForSlugs.arrowbinLiveSlugs ??= new Map();
const liveSlugs = globalForSlugs.arrowbinLiveSlugs;
const LIVE_SLUG_TTL_MS = 60_000;

/**
 * For src/proxy.ts: true when /blog/<slug> has no live article, so the proxy
 * can serve the site's 404 page directly. (A page that calls notFound() while
 * rendering on demand gets Next's bare error document instead, without the
 * site's layout or styles.) A live slug is remembered for a minute so most
 * page loads skip the query. Any database error answers false: the request
 * then goes on to the page, whose cached copy can still be served.
 */
export async function isMissingArticle(slug: string): Promise<boolean> {
  if (!SLUG_PATTERN.test(slug) || !hasDatabase()) return true;
  const until = liveSlugs.get(slug);
  if (until !== undefined && until > Date.now()) return false;
  try {
    const { rowCount } = await db().query(
      `SELECT 1 FROM articles WHERE slug = $1 AND ${LISTED}`,
      [slug],
    );
    if (!rowCount) return true;
    liveSlugs.set(slug, Date.now() + LIVE_SLUG_TTL_MS);
    return false;
  } catch (error) {
    console.error(
      "[articles] slug check failed:",
      error instanceof Error ? error.message : error,
    );
    return false;
  }
}

/** Drops remembered slugs after the webhook changes their article. */
export function forgetLiveSlugs(...slugs: string[]) {
  for (const slug of slugs) liveSlugs.delete(slug);
}

/**
 * Inserts an article or replaces the row with the same RankYak id, and
 * returns the slug it had before (undefined for a new article), so a renamed
 * article's old URL can be refreshed too.
 */
export async function upsertArticle(
  article: RankYakArticle,
  status: ArticleStatus,
): Promise<{ previousSlug: string | undefined }> {
  const { rows } = await db().query<{ previous_slug: string | null }>(
    `WITH previous AS (SELECT slug FROM articles WHERE id = $1)
     INSERT INTO articles (
       id, slug, title, excerpt, meta_title, meta_description, html, markdown,
       header_image_url, status, publish_at, published_at, updated_at,
       archived_at, received_at
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, now())
     ON CONFLICT (id) DO UPDATE SET
       slug = EXCLUDED.slug,
       title = EXCLUDED.title,
       excerpt = EXCLUDED.excerpt,
       meta_title = EXCLUDED.meta_title,
       meta_description = EXCLUDED.meta_description,
       html = EXCLUDED.html,
       markdown = EXCLUDED.markdown,
       header_image_url = EXCLUDED.header_image_url,
       status = EXCLUDED.status,
       publish_at = EXCLUDED.publish_at,
       published_at = EXCLUDED.published_at,
       updated_at = EXCLUDED.updated_at,
       archived_at = EXCLUDED.archived_at,
       received_at = now()
     RETURNING (SELECT slug FROM previous) AS previous_slug`,
    [
      article.id,
      article.slug,
      article.title,
      article.excerpt,
      article.meta_title,
      article.meta_description,
      article.html,
      article.markdown,
      article.header_image_url,
      status,
      article.publish_at,
      article.published_at,
      article.updated_at,
      article.archived_at,
    ],
  );
  return { previousSlug: rows[0]?.previous_slug ?? undefined };
}

const dateLabel = (d: Date) =>
  d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

/** Reading time at about 230 words a minute, like the other posts. */
export function articleReadingTime(words: number): string {
  return `${Math.max(1, Math.round(words / 230))} min read`;
}

/** The article's description: its meta description, else its excerpt. */
export function articleDescription(a: ArticleSummary): string {
  return a.metaDescription ?? a.excerpt ?? "";
}

/** An article in the shape the blog cards, sitemap, RSS and llms.txt use. */
export function articleAsPost(a: ArticleSummary): Post {
  const updated =
    a.updatedAt && a.updatedAt > a.publishedAt ? a.updatedAt : undefined;
  return {
    slug: a.slug,
    title: a.title,
    description: articleDescription(a),
    keywords: [],
    date: a.publishedAt.toISOString(),
    dateLabel: dateLabel(a.publishedAt),
    ...(updated
      ? { updated: updated.toISOString(), updatedLabel: dateLabel(updated) }
      : {}),
    author: site.name,
    readingTime: articleReadingTime(a.words),
    category: "Guides",
    excerpt: a.excerpt ?? articleDescription(a),
    ...(a.headerImageUrl
      ? { image: { src: a.headerImageUrl, alt: a.title } }
      : {}),
    body: [],
  };
}

/**
 * Every post on the blog, newest first: the posts in src/lib/posts plus the
 * published RankYak articles. A post in the code keeps its slug: the webhook
 * refuses an article that would take one, so this filter is only a safety net.
 */
export async function allPosts(): Promise<Post[]> {
  const own = new Set(sortedPosts.map((p) => p.slug));
  const articles = (await listArticles())
    .filter((a) => !own.has(a.slug))
    .map(articleAsPost);
  if (articles.length === 0) return sortedPosts;
  return [...sortedPosts, ...articles].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
}
