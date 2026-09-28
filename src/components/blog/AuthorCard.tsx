import Image from "next/image";
import Link from "next/link";
import { getBlurDataURL } from "@/lib/blur";
import { author } from "@/lib/site";

/** Author bio card shown at the end of an article (E-E-A-T signal). */
export async function AuthorCard() {
  const blurDataURL = await getBlurDataURL(author.image);

  return (
    <section
      aria-label="About the author"
      className="mt-14 flex flex-col gap-5 rounded-[1.75rem] bg-lilac p-6 sm:flex-row sm:items-start sm:p-8"
    >
      <Image
        src={author.image}
        alt={`${author.name}, ${author.jobTitle} of Arrowbin`}
        width={72}
        height={72}
        {...(blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {})}
        className="h-18 w-18 shrink-0 rounded-full object-cover ring-4 ring-white"
      />
      <div>
        <p className="label text-ink-2">Written by</p>
        <p className="mt-2 font-display text-xl font-black uppercase leading-none tracking-[-0.02em] text-ink">
          {author.name}
        </p>
        <p className="mt-1.5 text-sm font-semibold text-ink">
          {author.jobTitle}, Arrowbin
        </p>
        <p className="mt-3 leading-relaxed text-ink">{author.bio}</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
          <Link
            href="/about"
            className="text-ink underline decoration-2 underline-offset-4 transition-colors hover:text-ultra"
          >
            More about Arrowbin
          </Link>
          {author.sameAs[0] && (
            <a
              href={author.sameAs[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-2 underline-offset-4 transition-colors hover:text-ultra"
            >
              LinkedIn ↗
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
