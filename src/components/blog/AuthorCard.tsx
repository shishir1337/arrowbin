import Image from "next/image";
import Link from "next/link";
import { getBlurDataURL } from "@/lib/blur";
import { author } from "@/lib/site";

/** Author bio card shown at the end of an article (E-E-A-T signal). */
export async function AuthorCard() {
  const blurDataURL = await getBlurDataURL(author.image);

  return (
    <aside className="card-surface mt-14 flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-start sm:p-7">
      <Image
        src={author.image}
        alt={`${author.name}, ${author.jobTitle} of Arrowbin`}
        width={56}
        height={56}
        {...(blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {})}
        className="glow-ring h-14 w-14 shrink-0 rounded-full object-cover"
      />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Written by
        </p>
        <p className="mt-1 font-display text-lg font-semibold text-text">
          {author.name}
        </p>
        <p className="text-sm font-medium text-accent">
          {author.jobTitle}, Arrowbin
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{author.bio}</p>
        <Link
          href="/about"
          className="mt-3 inline-flex text-sm font-medium text-accent hover:underline"
        >
          More about Arrowbin
        </Link>
      </div>
    </aside>
  );
}
