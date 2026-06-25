import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { type ContentBlock, headingId, type PostImage } from "@/lib/blog";
import { getBlurDataURL } from "@/lib/blur";

const INLINE_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
const LINK_CLASS =
  "font-medium text-accent underline underline-offset-2 transition-colors hover:text-accent/80";

/**
 * Renders lightweight `[label](href)` inline links inside body prose. Internal
 * hrefs (starting with "/") use next/link; external ones open in a new tab.
 * Plain text passes through untouched. Used for paragraph and list copy only —
 * headings, the TL;DR, takeaways and FAQ answers stay plain so JSON-LD never
 * ingests link markup.
 */
function renderInline(text: string): ReactNode {
  if (!text.includes("](")) return text;
  const parts: ReactNode[] = [];
  let last = 0;
  let i = 0;
  INLINE_LINK.lastIndex = 0;
  let match = INLINE_LINK.exec(text);
  while (match !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const [, label, href] = match;
    const key = `${href}-${i}`;
    i += 1;
    parts.push(
      href.startsWith("/") ? (
        <Link key={key} href={href} className={LINK_CLASS}>
          {label}
        </Link>
      ) : (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          {label}
        </a>
      ),
    );
    last = match.index + match[0].length;
    match = INLINE_LINK.exec(text);
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/** Renders a single image block: the real image, or — in development only — a
 * placeholder card with the generation prompt + target path while `pending`.
 * In production a pending image renders nothing, so unfinished assets (and their
 * internal prompts) are never exposed to readers or crawlers. */
async function BlogFigure({ image }: { image: PostImage }) {
  if (image.pending) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <figure className="my-8 rounded-2xl border border-dashed border-border bg-surface-2 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          Image to add
        </p>
        <p className="mt-2 font-medium text-text">{image.alt}</p>
        {image.caption ? (
          <p className="mt-1 text-sm text-muted">{image.caption}</p>
        ) : null}
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-medium text-accent">
            Generation prompt
          </summary>
          <p className="mt-2 whitespace-pre-wrap rounded-lg bg-bg p-3 font-mono text-xs leading-relaxed text-muted">
            {image.prompt}
          </p>
          <p className="mt-2 font-mono text-xs text-muted">
            Save as: <span className="text-text">{image.src}</span>
          </p>
        </details>
      </figure>
    );
  }

  const blurDataURL = await getBlurDataURL(image.src);

  return (
    <figure className="my-8">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width ?? 1280}
        height={image.height ?? 720}
        unoptimized={image.src.endsWith(".svg")}
        sizes="(max-width: 768px) 100vw, 768px"
        {...(blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {})}
        className="h-auto w-full rounded-2xl border border-border"
      />
      {image.caption ? (
        <figcaption className="mt-3 text-center text-sm text-muted">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Renders a post's structured body blocks. */
export function PostBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6 text-[1.0625rem] leading-[1.8] text-text/90">
      {blocks.map((block) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={block.text}
                id={headingId(block.text)}
                className="scroll-mt-28 pt-8 font-display text-2xl font-bold text-text sm:text-[1.7rem]"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={block.text}
                className="scroll-mt-28 pt-3 font-display text-xl font-semibold text-text"
              >
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={block.items.join("|")} className="space-y-2.5 pl-1">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Icon
                      name="check"
                      size={20}
                      className="mt-0.5 shrink-0 text-accent"
                    />
                    <span className="text-muted">{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol
                key={block.items.join("|")}
                className="ml-1 list-inside list-decimal space-y-2.5 text-muted marker:font-semibold marker:text-accent"
              >
                {block.items.map((item) => (
                  <li key={item} className="pl-1">
                    {renderInline(item)}
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div
                key={block.headers.join("|")}
                className="my-6 overflow-x-auto rounded-2xl border border-border"
              >
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface-2 text-text">
                    <tr>
                      {block.headers.map((h) => (
                        <th key={h} className="px-4 py-3 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-muted">
                    {block.rows.map((row) => (
                      <tr key={row.join("|")}>
                        {row.map((cell, ci) => (
                          <td
                            key={`${row[0]}-${block.headers[ci]}`}
                            className="px-4 py-3 align-top"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "quote":
            return (
              <blockquote
                key={block.text}
                className="my-6 border-l-4 border-accent bg-surface-2 px-5 py-4 text-lg italic text-text"
              >
                "{block.text}"
                {block.cite ? (
                  <cite className="mt-2 block text-sm not-italic text-muted">
                    — {block.cite}
                  </cite>
                ) : null}
              </blockquote>
            );
          case "image":
            return <BlogFigure key={block.image.src} image={block.image} />;
          default:
            return (
              <p key={block.text} className="text-muted">
                {renderInline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
