import { headingId } from "./blog";

/**
 * Prepares a RankYak article body for its page, leaving the content itself as
 * RankYak sent it:
 *
 * - Every <h2> gets an id (its own, if it already has one), and the list of
 *   them feeds the "On this page" contents, like the posts in src/lib/posts.
 * - YouTube embeds load from youtube-nocookie.com (YouTube's privacy-enhanced
 *   mode: no cookies until the visitor plays the video) and only once
 *   scrolled near (loading="lazy"), so the player's ~1 MB stays off the
 *   page load.
 */
export function prepareArticleHtml(html: string): {
  html: string;
  toc: { id: string; text: string }[];
} {
  const toc: { id: string; text: string }[] = [];
  const used = new Set<string>();

  const withIds = html.replace(
    /<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/gi,
    (whole, attrs: string | undefined, inner: string) => {
      const text = decodeEntities(inner.replace(/<[^>]+>/g, ""))
        .replace(/\s+/g, " ")
        .trim();
      if (!text) return whole;
      const own = attrs
        ? /\sid\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1]
        : undefined;
      let id = own ?? (headingId(text) || "section");
      if (!own) {
        // Two headings with the same words still get distinct anchors.
        const base = id;
        for (let n = 2; used.has(id); n += 1) id = `${base}-${n}`;
      }
      used.add(id);
      toc.push({ id, text });
      return own ? whole : `<h2 id="${id}"${attrs ?? ""}>${inner}</h2>`;
    },
  );

  const embeds = withIds.replace(
    /<iframe\b([^>]*)>/gi,
    (_tag, attrs: string) => {
      let a = attrs.replace(
        /(\ssrc\s*=\s*["'])https?:\/\/(?:www\.)?youtube\.com\/embed\//i,
        "$1https://www.youtube-nocookie.com/embed/",
      );
      if (!/\sloading\s*=/i.test(a)) a += ' loading="lazy"';
      return `<iframe${a}>`;
    },
  );

  return { html: embeds, toc };
}

const NAMED: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  hellip: "…",
};

/** The text of a heading as a reader sees it (entities decoded). */
function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (m, code: string) => {
    if (code[0] === "#") {
      const n =
        code[1] === "x" || code[1] === "X"
          ? Number.parseInt(code.slice(2), 16)
          : Number.parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : m;
    }
    return NAMED[code.toLowerCase()] ?? m;
  });
}
