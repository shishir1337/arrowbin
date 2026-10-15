import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/home/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { Crumbs } from "@/components/ui/Crumbs";
import { isMockupCover, type Post } from "@/lib/blog";
import { getBlurDataURL } from "@/lib/blur";

const TONES = [
  {
    card: "bg-ultra text-white",
    sub: "text-white/85",
    chip: "bg-sun text-ink",
  },
  { card: "bg-plasma text-ink", sub: "text-ink/80", chip: "bg-white text-ink" },
  { card: "bg-sun text-ink", sub: "text-ink/80", chip: "bg-ink text-white" },
  {
    card: "bg-lilac text-ink",
    sub: "text-ink/80",
    chip: "bg-ultra text-white",
  },
];

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M3 11 11 3M5 3h6v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function Meta({ post, className = "" }: { post: Post; className?: string }) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-wider ${className}`}
    >
      <time dateTime={post.date}>{post.dateLabel}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readingTime}</span>
    </p>
  );
}

/** True when a post has a feature image ready to show. */
function hasCover(post: Post): boolean {
  return Boolean(post.image && !post.image.pending);
}

/**
 * A post's feature image, filling its (sized, positioned) parent. Raster covers
 * (including .webp exports of SVG charts) go through the image optimizer with a
 * blur placeholder; an .svg cover is served as-is with no blur.
 */
async function Cover({
  post,
  sizes,
  priority = false,
}: {
  post: Post;
  sizes: string;
  /** Above the fold: load eagerly with high priority. */
  priority?: boolean;
}) {
  if (!post.image || post.image.pending) return null;
  const svg = post.image.src.endsWith(".svg");
  const blur = svg ? undefined : await getBlurDataURL(post.image.src);
  return (
    <Image
      src={post.image.src}
      alt={post.image.alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={svg}
      className="object-cover"
      {...(blur ? { placeholder: "blur" as const, blurDataURL: blur } : {})}
    />
  );
}

/** /blog hero: kinetic headline, intro and topic counts. */
export function BlogHero({
  crumbs,
  posts,
}: {
  crumbs: { name: string; path: string }[];
  posts: Post[];
}) {
  const topics = [...new Set(posts.map((p) => p.category))].map((c) => ({
    name: c,
    n: posts.filter((p) => p.category === c).length,
  }));
  return (
    <section className="relative isolate overflow-hidden pb-12 pt-10 sm:pb-16 sm:pt-14">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <Crumbs items={crumbs} />
        <div className="mt-10 grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <h1
            data-kinetic
            className="display text-[clamp(3rem,8.6vw,8.6rem)] text-ink lg:col-span-8"
            style={{ ["--wdth" as string]: 104 }}
          >
            {["Read before", "you build."].map((line, i) => (
              <span key={line} className="block overflow-y-clip pb-[0.04em]">
                {" "}
                <span
                  className="svh-line block"
                  style={{ animationDelay: `${120 + i * 110}ms` }}
                >
                  {i === 1 ? <span className="text-ultra">{line}</span> : line}
                </span>
              </span>
            ))}
          </h1>
          <div className="svh-fade lg:col-span-4">
            <p className="text-lg leading-relaxed text-ink-2">
              Straight answers on what software costs, how long it takes and how
              to pick the people who build it. Written by the team that does the
              work.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {topics.map((t) => (
                <li
                  key={t.name}
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-white pl-4 pr-1.5 text-sm font-semibold text-ink ring-1 ring-ink/10"
                >
                  {t.name}
                  <span className="grid h-7 min-w-7 place-items-center rounded-full bg-frost px-1.5 font-mono text-xs">
                    {t.n}
                  </span>
                </li>
              ))}
              <li>
                <a
                  href="/blog/rss.xml"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-sun px-4 text-sm font-semibold text-ink transition-colors duration-500 hover:bg-ink hover:text-white"
                >
                  <span aria-hidden="true">◉</span> RSS feed
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A post as a colour card with its feature photo. */
export function PostCard({
  post,
  tone = 1,
  as: Heading = "h2",
}: {
  post: Post;
  tone?: number;
  as?: "h2" | "h3";
}) {
  const t = TONES[tone % TONES.length];
  return (
    <article className="group relative h-full">
      <div
        className={`flex h-full flex-col rounded-[2rem] p-7 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 sm:p-9 ${t.card}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span
            className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${t.chip}`}
          >
            {post.category}
          </span>
          <Meta post={post} className={t.sub} />
        </div>
        {hasCover(post) && (
          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-[1.25rem] bg-white/40">
            <Cover post={post} sizes="(min-width: 768px) 46vw, 82vw" />
          </div>
        )}
        <Heading
          className="mt-8 font-display text-[clamp(1.4rem,2.2vw,2.1rem)] font-black uppercase leading-[0.98] tracking-[-0.02em]"
          style={{ fontVariationSettings: '"wdth" 100' }}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 after:rounded-[2rem]"
          >
            {post.title}
          </Link>
        </Heading>
        <p className={`mt-4 flex-1 leading-relaxed ${t.sub}`}>{post.excerpt}</p>
        <span className="mt-8 inline-flex items-center gap-2 font-semibold">
          Read
          <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-current transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45">
            <Arrow />
          </span>
        </span>
      </div>
    </article>
  );
}

/**
 * Latest post as a big ultraviolet feature, then the rest as colour cards in a
 * two-column grid. A lead post with no feature image takes the full card width.
 */
export function BlogList({ posts, label }: { posts: Post[]; label: string }) {
  const [lead, ...rest] = posts;
  if (!lead) return null;
  const leadCover = hasCover(lead);
  return (
    <section className="relative pb-20 sm:pb-28">
      <SectionReveal />
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <SectionLabel index={label} title="Latest" />

        {/* Feature */}
        <article data-rv className="group relative mt-8">
          <div className="isolate grid overflow-hidden rounded-[2rem] bg-ultra text-white [transform:translateZ(0)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 lg:grid-cols-12">
            <div
              className={`flex flex-col justify-between gap-10 p-7 sm:p-10 lg:p-12 ${leadCover ? "lg:col-span-7" : "lg:col-span-12"}`}
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-sun px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-ink">
                    {lead.category}
                  </span>
                  <Meta post={lead} className="text-white/85" />
                </div>
                <h2
                  className="mt-6 font-display text-[clamp(1.9rem,3.6vw,3.6rem)] font-black uppercase leading-[0.95] tracking-[-0.03em]"
                  style={{ fontVariationSettings: '"wdth" 100' }}
                >
                  <Link
                    href={`/blog/${lead.slug}`}
                    className="after:absolute after:inset-0 after:rounded-[2rem]"
                  >
                    {lead.title}
                  </Link>
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">
                  {lead.excerpt}
                </p>
              </div>
              <span className="inline-flex items-center gap-3 self-start rounded-full bg-white py-1.5 pl-5 pr-1.5 font-semibold text-ink">
                Read the guide
                <span className="grid h-10 w-10 place-items-center rounded-full bg-sun transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45">
                  <Arrow />
                </span>
              </span>
            </div>
            {leadCover &&
              (lead.image && isMockupCover(lead.image) ? (
                // A UI mockup is shown whole, as a 16:9 screen inside the card.
                <div className="flex items-center px-5 pb-5 sm:px-8 sm:pb-8 lg:col-span-5 lg:p-10">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.25rem] bg-frost shadow-[0_30px_60px_-30px_rgba(14,11,36,0.55)]">
                    {/* Not preloaded: the featured title, not this image, is the
                        LCP on desktop, and on phones the card starts below the
                        fold, so a preload only queued ahead of the CSS and JS. */}
                    <Cover post={lead} sizes="(min-width: 1024px) 36vw, 85vw" />
                  </div>
                </div>
              ) : (
                <div className="relative min-h-64 overflow-hidden sm:min-h-80 lg:col-span-5 lg:min-h-0">
                  <Cover
                    post={lead}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    priority
                  />
                </div>
              ))}
          </div>
        </article>

        {/* The rest */}
        {rest.length > 0 && (
          <ul className="mt-6 grid gap-6 md:grid-cols-2">
            {rest.map((p, i) => {
              return (
                // Stagger by column only, so cards far down a long list don't
                // wait seconds to appear.
                <li key={p.slug} data-rv={i % 2}>
                  <PostCard post={p} tone={(i + 1) % TONES.length} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

/** Most questions the quick-answers list shows, however many posts exist. */
const MAX_ANSWERS = 12;

/**
 * Quick answers: FAQ questions across posts, each linking to its guide. Up to
 * three per post while the blog is small, fewer per post as it grows, so the
 * list stays at most MAX_ANSWERS long (newest posts first).
 */
export function BlogAnswers({
  posts,
  label,
}: {
  posts: Post[];
  label: string;
}) {
  const perPost = Math.max(
    1,
    Math.min(3, Math.floor(MAX_ANSWERS / Math.max(posts.length, 1))),
  );
  const qs = posts
    .flatMap((p) =>
      (p.faqs ?? []).slice(0, perPost).map((f) => ({ q: f.question, post: p })),
    )
    .slice(0, MAX_ANSWERS);
  if (!qs.length) return null;
  return (
    <section className="relative bg-white py-20 sm:py-28">
      <SectionReveal />
      <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-[var(--gutter)] lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionLabel index={label} title="Quick answers" />
            <h2
              className="display mt-5 max-w-[12ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              Asked often, answered properly
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink-2">
              The questions clients ask us most, each answered in full inside
              the guide it links to.
            </p>
          </div>
        </div>
        <ul className="border-t-2 border-ink lg:col-span-8">
          {qs.map(({ q, post }) => (
            <li key={`${post.slug}-${q}`} className="border-b border-ink/15">
              <Link
                href={`/blog/${post.slug}#faq`}
                className="group grid grid-cols-[1fr_auto] items-center gap-6 py-5 transition-[padding,background-color] duration-500 ease-[var(--ease-out-expo)] hover:bg-frost focus-visible:bg-frost sm:py-6 lg:hover:px-5"
              >
                <span>
                  <span className="block font-display text-lg font-bold leading-snug text-ink transition-colors duration-500 group-hover:text-ultra sm:text-xl">
                    {q}
                  </span>
                  <span className="mt-1.5 block text-sm text-ink-2">
                    From: {post.title}
                  </span>
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink/15 text-ink transition-[rotate,border-color,background-color,color] duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                  <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
