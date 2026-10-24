import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import {
  type ContentBlock,
  headingId,
  type PostImage,
  postSlugs,
} from "@/lib/blog";
import { getBlurDataURL } from "@/lib/blur";
import { CopyCode } from "./CopyCode";

const INLINE_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
const LINK_CLASS =
  "font-semibold text-ultra underline decoration-2 underline-offset-4 transition-colors hover:text-ink";

/**
 * Renders lightweight `[label](href)` inline links inside body prose. Internal
 * hrefs (starting with "/") use next/link; external ones open in a new tab.
 * Plain text passes through untouched. Used for paragraph and list copy only:
 * headings, the TL;DR, takeaways and FAQ answers stay plain so JSON-LD never
 * ingests link markup.
 */
/** Published post slugs. A link to a post that is scheduled but not yet
 * published (see `posts` in lib/blog.ts) renders as plain text until its date,
 * so a published post never points readers at a 404. */
const PUBLISHED = new Set(postSlugs);

function isUnpublishedPostLink(href: string): boolean {
  const m = /^\/blog\/([a-z0-9-]+)\/?(?:[#?].*)?$/.exec(href);
  return m !== null && !PUBLISHED.has(m[1]);
}

function renderLinks(text: string): ReactNode {
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
      isUnpublishedPostLink(href) ? (
        <Fragment key={key}>{label}</Fragment>
      ) : href.startsWith("/") ? (
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

const INLINE_CODE = /`([^`]+)`/g;

/** Renders `code` spans (a command, a setting) in body prose, then the links in
 * the text around them. Long settings break anywhere so phones never scroll
 * sideways. */
function renderInline(text: string): ReactNode {
  if (!text.includes("`")) return renderLinks(text);
  const parts: ReactNode[] = [];
  let last = 0;
  let i = 0;
  INLINE_CODE.lastIndex = 0;
  let match = INLINE_CODE.exec(text);
  while (match !== null) {
    if (match.index > last) {
      parts.push(
        <Fragment key={`t-${i}`}>
          {renderLinks(text.slice(last, match.index))}
        </Fragment>,
      );
    }
    parts.push(
      <code
        key={`c-${i}`}
        className="rounded-md bg-ink/[0.06] px-1.5 py-0.5 font-mono text-[0.88em] text-ink [overflow-wrap:anywhere]"
      >
        {match[1]}
      </code>,
    );
    i += 1;
    last = match.index + match[0].length;
    match = INLINE_CODE.exec(text);
  }
  if (last < text.length) {
    parts.push(
      <Fragment key="t-end">{renderLinks(text.slice(last))}</Fragment>,
    );
  }
  return parts;
}

/** Renders a single image block: the real image, or (in development only) a
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
  // Charts are drawn at 1280 wide, so their labels get small on a phone. Each
  // one links to the full-size vector, which phones open in a new tab where it
  // can be zoomed (or read in landscape) without losing sharpness.
  const isChart = image.src.endsWith(".svg");

  const img = (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width ?? 1280}
      height={image.height ?? 720}
      unoptimized={isChart}
      sizes="(max-width: 768px) 100vw, 768px"
      {...(blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {})}
      className="h-auto w-full rounded-[1.5rem] bg-white ring-1 ring-ink/10"
    />
  );

  return (
    <figure className="my-8">
      {isChart ? (
        <a
          href={image.src}
          target="_blank"
          rel="noopener"
          className="block cursor-zoom-in rounded-[1.5rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ultra"
        >
          {img}
          <span className="sr-only">
            (opens the full-size chart in a new tab)
          </span>
        </a>
      ) : (
        img
      )}
      {image.caption || isChart ? (
        <figcaption className="mt-3 text-center text-sm text-ink-2">
          {image.caption}
          {isChart ? (
            <span className="mt-1 block text-xs text-ink-2 sm:hidden">
              Tap the chart to open it full size.
            </span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * In-article call to action, in the same card language as the author card (lilac,
 * 1.75rem radius) with the site's primary pill button. Internal links use
 * next/link; the booking page opens in a new tab.
 */
function PostCta({ block }: { block: Extract<ContentBlock, { type: "cta" }> }) {
  const external = !block.href.startsWith("/");
  const content = (
    <>
      {block.label}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sun text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45">
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path
            d="M3 11 11 3M5 3h6v6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      </span>
    </>
  );
  const buttonClass =
    "group mt-6 inline-flex min-h-13 items-center gap-3 rounded-full bg-ultra py-1.5 pl-6 pr-1.5 text-[0.95rem] font-semibold leading-snug text-white transition-colors duration-500 hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ultra";
  return (
    <aside
      aria-label={block.title}
      className="my-10 rounded-[1.75rem] bg-lilac p-6 sm:p-8"
    >
      <p className="label text-ink-2">Next step</p>
      <p className="mt-2 font-display text-xl font-black uppercase leading-none tracking-[-0.02em] text-ink sm:text-2xl">
        {block.title}
      </p>
      <p className="mt-3 leading-relaxed text-ink">{block.text}</p>
      {external ? (
        <a
          href={block.href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
        >
          {content}
        </a>
      ) : (
        <Link href={block.href} className={buttonClass}>
          {content}
        </Link>
      )}
    </aside>
  );
}

/** Renders a post's structured body blocks. */
export function PostBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6 text-[1.0625rem] leading-[1.8] text-ink sm:text-[1.125rem]">
      {blocks.map((block) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={block.text}
                id={headingId(block.text)}
                className="scroll-mt-28 pt-10 font-display text-[clamp(1.6rem,2.6vw,2.3rem)] font-black uppercase leading-[1] tracking-[-0.025em] text-ink"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={block.text}
                className="scroll-mt-28 pt-3 font-display text-xl font-bold tracking-[-0.01em] text-ink"
              >
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={block.items.join("|")} className="space-y-2.5 pl-1">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.7em] h-2 w-2 shrink-0 rotate-45 rounded-[2px] bg-plasma"
                    />
                    <span className="text-ink-2">{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol
                key={block.items.join("|")}
                className="ml-1 list-inside list-decimal space-y-2.5 text-ink-2 marker:font-bold marker:text-ultra"
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
              <Fragment key={block.headers.join("|")}>
                {/* Phones: one card per row, so no column starts off-screen. */}
                <ul className="my-8 grid gap-3 sm:hidden">
                  {block.rows.map((row) => (
                    <li
                      key={row.join("|")}
                      className="rounded-[1.25rem] bg-white p-4 ring-1 ring-ink/10"
                    >
                      <p className="font-display font-bold text-ink">
                        {row[0]}
                      </p>
                      <dl className="mt-2 grid gap-1.5 text-sm">
                        {row.slice(1).map((cell, ci) => (
                          <div
                            key={`${row[0]}-${block.headers[ci + 1]}`}
                            className="grid grid-cols-[7.5rem_1fr] gap-3"
                          >
                            <dt className="text-ink-2">
                              {block.headers[ci + 1]}
                            </dt>
                            <dd className="min-w-0 font-medium text-ink [overflow-wrap:anywhere]">
                              {cell}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </li>
                  ))}
                </ul>
                {/* Larger screens: the table. Scrollable, so keyboard-reachable. */}
                <section
                  aria-label={
                    block.headers.filter(Boolean).join(", ") || "Table"
                  }
                  // biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable region.
                  tabIndex={0}
                  className="my-8 hidden overflow-x-auto rounded-[1.5rem] bg-white ring-1 ring-ink/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ultra sm:block"
                >
                  <table className="w-full text-left text-sm">
                    <thead className="bg-ink text-white">
                      <tr>
                        {block.headers.map((h) => (
                          <th
                            key={h || "row"}
                            scope="col"
                            className="min-w-[6.5rem] px-4 py-3.5 align-bottom font-semibold"
                          >
                            {h || <span className="sr-only">Item</span>}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/10 text-ink-2">
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
                </section>
              </Fragment>
            );
          case "quote":
            return (
              <blockquote
                key={block.text}
                className="my-8 rounded-[1.5rem] bg-plasma px-6 py-5 font-display text-xl font-bold leading-snug text-ink sm:px-8 sm:py-7"
              >
                "{block.text}"
                {block.cite ? (
                  <cite className="mt-3 block font-sans text-sm font-semibold not-italic">
                    {block.cite}
                  </cite>
                ) : null}
              </blockquote>
            );
          case "image":
            return <BlogFigure key={block.image.src} image={block.image} />;
          case "code":
            return (
              <figure
                key={block.code}
                className="my-8 overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-ink/10"
              >
                <figcaption className="flex items-center justify-between gap-3 border-b border-ink/10 py-1.5 pl-5 pr-2">
                  <span className="label min-w-0 text-ink-2 [overflow-wrap:anywhere]">
                    {block.label ?? "Code"}
                  </span>
                  <CopyCode code={block.code} />
                </figcaption>
                <pre
                  // biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable region.
                  tabIndex={0}
                  className={`px-5 py-4 font-mono text-[0.85rem] leading-relaxed text-ink focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ultra ${block.wrap ? "whitespace-pre-wrap [overflow-wrap:anywhere]" : "overflow-x-auto"}`}
                >
                  <code>{block.code}</code>
                </pre>
              </figure>
            );
          case "cta":
            return (
              <PostCta key={`${block.href}-${block.title}`} block={block} />
            );
          default:
            return (
              <p key={block.text} className="text-ink-2">
                {renderInline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
