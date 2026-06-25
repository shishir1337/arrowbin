import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { Post } from "@/lib/blog";
import { getBlurDataURL } from "@/lib/blur";
import { author } from "@/lib/site";

/** Dark, full-bleed featured cover for an article. Shows the brand gradient by
 * default and layers the real cover photo behind it once one is provided. */
export async function ArticleHero({ post }: { post: Post }) {
  const hasPhoto = post.image && !post.image.pending;
  const coverBlur =
    hasPhoto && post.image ? await getBlurDataURL(post.image.src) : undefined;
  const headshotBlur = await getBlurDataURL(author.image);

  return (
    <header className="relative isolate overflow-hidden bg-[#0a0a0a] text-white">
      {hasPhoto && post.image ? (
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          priority
          sizes="100vw"
          {...(coverBlur
            ? { placeholder: "blur" as const, blurDataURL: coverBlur }
            : {})}
          className="object-cover opacity-35"
        />
      ) : null}
      {/* Lime glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[1] bg-[radial-gradient(circle_at_28%_-10%,rgba(163,230,53,0.22),transparent_58%)]"
      />
      {/* Grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[1] bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />
      {/* Drifting glow */}
      <div
        aria-hidden="true"
        className="blob -z-[1] left-[8%] top-[-30%] h-72 w-72 opacity-20"
      />

      <Container className="relative">
        <div className="max-w-3xl py-14 sm:py-20 lg:py-24">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/55">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/25">
                /
              </li>
              <li>
                <Link
                  href="/blog"
                  className="transition-colors hover:text-white"
                >
                  Blog
                </Link>
              </li>
            </ol>
          </nav>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgb(var(--brand-rgb)/0.7)]" />
            {post.category}
          </span>
          <h1 className="mt-5 font-display text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
            {post.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Image
                src={author.image}
                alt={`${post.author}, ${author.jobTitle} of Arrowbin`}
                width={40}
                height={40}
                {...(headshotBlur
                  ? { placeholder: "blur" as const, blurDataURL: headshotBlur }
                  : {})}
                className="glow-ring h-10 w-10 rounded-full object-cover"
              />
              <span className="font-medium text-white">{post.author}</span>
            </div>
            <span className="text-white/30">|</span>
            <span className="text-white/60">
              <time dateTime={post.date}>{post.dateLabel}</time>
              {post.updated ? ` · Updated ${post.updatedLabel}` : ""}
              {` · ${post.readingTime}`}
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
}
