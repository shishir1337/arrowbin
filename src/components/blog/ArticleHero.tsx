import Image from "next/image";
import { Crumbs } from "@/components/ui/Crumbs";
import type { Post } from "@/lib/blog";
import { getBlurDataURL } from "@/lib/blur";
import { author } from "@/lib/site";

/**
 * Article header: category and meta, the title in big display type, the
 * description and byline, then the feature photo as a wide banner.
 */
export async function ArticleHero({ post }: { post: Post }) {
  const blur = await getBlurDataURL(author.image);
  const cover = post.image && !post.image.pending ? post.image : undefined;
  const coverBlur = cover ? await getBlurDataURL(cover.src) : undefined;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.category, path: `/blog/${post.slug}` },
  ];

  return (
    <header className="relative isolate overflow-hidden pb-12 pt-10 sm:pb-16 sm:pt-14">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <Crumbs items={crumbs} />
        <div className="mt-10 grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-10">
            <div className="svh-fade flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-ultra px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                {post.category}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-ink-2">
                {post.readingTime}
              </span>
            </div>
            <h1
              className="svh-fade mt-6 font-display text-[clamp(2.3rem,5.4vw,5.6rem)] font-black uppercase leading-[0.95] tracking-[-0.035em] text-ink"
              style={{ fontVariationSettings: '"wdth" 100' }}
            >
              {post.title}
            </h1>
            <p className="svh-fade mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">
              {post.description}
            </p>
            <div className="svh-fade mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="flex items-center gap-3">
                <Image
                  src={author.image}
                  alt=""
                  width={44}
                  height={44}
                  {...(blur
                    ? { placeholder: "blur" as const, blurDataURL: blur }
                    : {})}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-white"
                />
                <span>
                  <span className="block font-semibold text-ink">
                    {post.author}
                  </span>
                  <span className="block text-sm text-ink-2">
                    {author.jobTitle}, Arrowbin
                  </span>
                </span>
              </span>
              <span className="text-sm text-ink-2">
                Published <time dateTime={post.date}>{post.dateLabel}</time>
                {post.updated && post.updatedLabel ? (
                  <>
                    {" · "}
                    <span className="font-semibold text-ink">
                      Updated{" "}
                      <time dateTime={post.updated}>{post.updatedLabel}</time>
                    </span>
                  </>
                ) : null}
              </span>
            </div>
          </div>
        </div>
        {cover && (
          <div className="svh-fade relative mt-12 aspect-[16/10] overflow-hidden rounded-[2rem] bg-lilac sm:aspect-[21/9]">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              priority
              sizes="(min-width: 1600px) 1500px, 94vw"
              className="object-cover"
              {...(coverBlur
                ? { placeholder: "blur" as const, blurDataURL: coverBlur }
                : {})}
            />
          </div>
        )}
      </div>
    </header>
  );
}
