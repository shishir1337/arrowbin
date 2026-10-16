import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/home/SectionLabel";
import { Crumbs } from "@/components/ui/Crumbs";
import { getBlurDataURL } from "@/lib/blur";
import type { CaseStudy, Shot } from "@/lib/case-studies";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

const host = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const blurProps = (blur?: string) =>
  blur ? { placeholder: "blur" as const, blurDataURL: blur } : {};

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 11 11 3M5 3h6v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

/** A screenshot in the same browser frame the /work cards use. */
async function BrowserFrame({
  shot,
  site,
  tone,
  sizes,
  priority = false,
}: {
  shot: Shot;
  site: string;
  tone: string;
  sizes: string;
  priority?: boolean;
}) {
  const blur = await getBlurDataURL(shot.src);
  return (
    <div className={`rounded-[1.75rem] p-3 sm:p-4 ${tone}`}>
      <div className="overflow-hidden rounded-[1.2rem] bg-white shadow-[0_20px_40px_-24px_rgba(14,11,36,0.6)]">
        <div className="flex h-7 items-center gap-1.5 border-b border-ink/10 px-3">
          <span className="h-2 w-2 rounded-full bg-plasma" />
          <span className="h-2 w-2 rounded-full bg-sun" />
          <span className="h-2 w-2 rounded-full bg-ultra" />
          <span className="ml-2 truncate font-mono text-[10px] text-ink-2">
            {site}
          </span>
        </div>
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes={sizes}
          priority={priority}
          className="block h-auto w-full"
          {...blurProps(blur)}
        />
      </div>
    </div>
  );
}

/** The phone view, shown whole in a simple device frame. */
async function PhoneFrame({ shot, sizes }: { shot: Shot; sizes: string }) {
  const blur = await getBlurDataURL(shot.src);
  return (
    <div className="rounded-[2.4rem] bg-ink p-2.5 shadow-[0_40px_80px_-30px_rgba(14,11,36,0.7)]">
      <div className="overflow-hidden rounded-[1.9rem] bg-white">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes={sizes}
          className="block h-auto w-full"
          {...blurProps(blur)}
        />
      </div>
    </div>
  );
}

/** Shown in `next dev` only, on case studies the client hasn't approved yet. */
export function CaseDraftNotice({ client }: { client: string }) {
  return (
    <div className="bg-ink text-white">
      <p className="mx-auto w-full max-w-[1600px] px-[var(--gutter)] py-3 text-sm">
        <span className="font-semibold text-sun">Draft preview.</span> This page
        only shows on your computer. It stays off the live site until {client}{" "}
        approves it in writing.
      </p>
    </div>
  );
}

export function CaseHero({
  cs,
  crumbs,
}: {
  cs: CaseStudy;
  crumbs: { name: string; path: string }[];
}) {
  return (
    <header className="relative isolate overflow-hidden pb-14 pt-10 sm:pb-20 sm:pt-14">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <Crumbs items={crumbs} />
        <div className="mt-10 max-w-[68rem]">
          <div className="svh-fade flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-ultra px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
              Case study
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-ink-2">
              {cs.client} · {cs.category}
            </span>
          </div>
          <h1
            className="svh-fade mt-6 font-display text-[clamp(2.3rem,5.4vw,5.6rem)] font-black uppercase leading-[0.95] tracking-[-0.035em] text-ink"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            {cs.headline}
          </h1>
          <p className="svh-fade mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">
            {cs.intro}
          </p>
        </div>

        <dl className="svh-fade mt-12 grid gap-x-8 gap-y-6 border-t-2 border-ink pt-6 sm:grid-cols-2 lg:grid-cols-5">
          {cs.facts.map((f) => (
            <div key={f.label}>
              <dt className="label text-ink-2">{f.label}</dt>
              <dd className="mt-2 font-semibold leading-snug text-ink">
                {f.value}
              </dd>
            </div>
          ))}
          <div>
            <dt className="label text-ink-2">Live site</dt>
            <dd className="mt-2">
              <a
                href={cs.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-ultra underline decoration-ultra/30 decoration-2 underline-offset-4 transition-colors hover:decoration-ultra"
              >
                {host(cs.url)}
                <Arrow />
              </a>
            </dd>
          </div>
        </dl>

        <div className="svh-fade mt-12 grid items-end gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-9">
            <BrowserFrame
              shot={cs.shots.desktop}
              site={host(cs.url)}
              tone="bg-ultra"
              sizes="(min-width: 1600px) 1100px, (min-width: 1024px) 72vw, 94vw"
              priority
            />
          </div>
          <div className="mx-auto w-[min(60vw,260px)] lg:col-span-3 lg:w-full lg:max-w-[300px]">
            <PhoneFrame
              shot={cs.shots.mobile}
              sizes="(min-width: 1024px) 300px, 60vw"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export function CaseStats({ cs, label }: { cs: CaseStudy; label: string }) {
  return (
    <section className="relative bg-sun py-20 text-ink sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <SectionLabel index={label} title="The numbers" />
        <h2
          className="display mt-5 max-w-[18ch] text-[clamp(2.2rem,4.6vw,4.6rem)]"
          style={{ ["--wdth" as string]: 100 }}
        >
          {cs.statsTitle}
        </h2>
        {/* Two columns at most, so "10,000+" and "48 → 26,353" stay on one line. */}
        <dl className="mt-12 grid border-t-2 border-ink md:grid-cols-2">
          {cs.stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col-reverse justify-end gap-3 border-b-2 border-ink py-7 md:pr-8"
            >
              <dt className="max-w-sm text-base leading-snug text-ink/85">
                {s.label}
              </dt>
              <dd className="break-words font-display text-[clamp(2.8rem,6vw,5.6rem)] font-black leading-[0.9] tracking-[-0.04em]">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-ink/75">
          Source:{" "}
          {cs.shots.proof ? "Google Search Console" : "the store's own admin"},
          read 16 October 2026.
        </p>
      </div>
    </section>
  );
}

/** The old site and the new one in one browser frame, with a drag handle. */
export async function CaseBeforeAfter({
  cs,
  label,
}: {
  cs: CaseStudy;
  label: string;
}) {
  const pair = cs.shots.beforeAfter;
  if (!pair) return null;
  const [beforeBlur, afterBlur] = await Promise.all([
    getBlurDataURL(pair.before.src),
    getBlurDataURL(pair.after.src),
  ]);
  return (
    <section className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="Before and after" />
            <h2
              className="display mt-5 max-w-[18ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              Same brand, a new store
            </h2>
          </div>
          <p className="max-w-xs text-ink-2">
            Drag the handle to compare the old store with the new one.
          </p>
        </div>
        {/* Capped so the whole frame fits on a laptop screen while dragging. */}
        <figure className="mx-auto mt-12 max-w-[1180px]">
          <div className="rounded-[1.75rem] bg-plasma p-3 sm:p-4">
            <div className="overflow-hidden rounded-[1.2rem] bg-white shadow-[0_20px_40px_-24px_rgba(14,11,36,0.6)]">
              <div className="flex h-7 items-center gap-1.5 border-b border-ink/10 px-3">
                <span className="h-2 w-2 rounded-full bg-plasma" />
                <span className="h-2 w-2 rounded-full bg-sun" />
                <span className="h-2 w-2 rounded-full bg-ultra" />
                <span className="ml-2 truncate font-mono text-[10px] text-ink-2">
                  {host(cs.url)}
                </span>
              </div>
              <BeforeAfterSlider
                before={{ ...pair.before, blur: beforeBlur }}
                after={{ ...pair.after, blur: afterBlur }}
                sizes="(min-width: 1280px) 1150px, 94vw"
              />
            </div>
          </div>
          <figcaption className="label mt-4 grid gap-1 px-1 text-ink-2 md:flex md:justify-between md:gap-6">
            <span>{pair.before.caption}</span>
            <span>{pair.after.caption}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function CaseBrief({ cs, label }: { cs: CaseStudy; label: string }) {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-[var(--gutter)] lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionLabel index={label} title="The brief" />
          <h2
            className="display mt-5 max-w-[12ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
            style={{ ["--wdth" as string]: 100 }}
          >
            What wasn&apos;t working
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-lg leading-relaxed text-ink-2 sm:text-xl">
            {cs.brief.lead}
          </p>
          <ol className="mt-8 grid gap-3">
            {cs.brief.problems.map((p, i) => (
              <li
                key={p}
                className="flex gap-4 rounded-[1.25rem] bg-white p-4 sm:p-5"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink font-mono text-xs font-bold text-sun">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pt-1 leading-relaxed text-ink">{p}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-lg font-semibold leading-relaxed text-ink sm:text-xl">
            {cs.brief.goal}
          </p>
        </div>
      </div>
    </section>
  );
}

const BUILT_TONES = [
  "bg-ultra text-white",
  "bg-white text-ink",
  "bg-white text-ink",
  "bg-sun text-ink",
];

export function CaseBuilt({ cs, label }: { cs: CaseStudy; label: string }) {
  return (
    <section className="relative bg-lilac py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <SectionLabel index={label} title="What we built" />
        <h2
          className="display mt-5 max-w-[16ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
          style={{ ["--wdth" as string]: 100 }}
        >
          Built around how they sell
        </h2>
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {cs.built.map((b, i) => (
            <li
              key={b.title}
              className={`flex flex-col rounded-[1.75rem] p-7 sm:p-9 ${BUILT_TONES[i % BUILT_TONES.length]}`}
            >
              <span className="label opacity-80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="mt-6 font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-black uppercase leading-[0.95] tracking-[-0.03em]"
                style={{ fontVariationSettings: '"wdth" 102' }}
              >
                {b.title}
              </h3>
              <p className="mt-4 leading-relaxed opacity-90">{b.text}</p>
              {b.points ? (
                <ul className="mt-5 grid gap-3">
                  {b.points.map((pt) => (
                    <li key={pt} className="flex gap-3 leading-relaxed">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current"
                      />
                      <span className="opacity-90">{pt}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export async function CaseFindings({
  cs,
  label,
}: {
  cs: CaseStudy;
  label: string;
}) {
  const proof = cs.shots.proof;
  const blur = proof ? await getBlurDataURL(proof.src) : undefined;
  return (
    <section className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <SectionLabel index={label} title="What the data shows" />
        <h2
          className="display mt-5 max-w-[16ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
          style={{ ["--wdth" as string]: 100 }}
        >
          Read from the real data
        </h2>
        {proof ? (
          <figure className="mt-12">
            <div className="rounded-[1.75rem] bg-frost p-3 sm:p-4">
              <Image
                src={proof.src}
                alt={proof.alt}
                width={proof.width}
                height={proof.height}
                sizes="(min-width: 1600px) 1500px, 94vw"
                className="block h-auto w-full rounded-[1.2rem]"
                {...blurProps(blur)}
              />
            </div>
            {proof.caption ? (
              <figcaption className="label mt-4 max-w-4xl px-1 leading-relaxed text-ink-2">
                {proof.caption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
        <ul
          className={`mt-12 grid gap-5 md:grid-cols-2 ${cs.findings.length > 2 ? "xl:grid-cols-3" : ""}`}
        >
          {cs.findings.map((f, i) => (
            <li
              key={f}
              className="rounded-[1.5rem] border-2 border-ink/10 p-6 sm:p-7"
            >
              <span className="label text-ultra">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-lg leading-relaxed text-ink">{f}</p>
            </li>
          ))}
        </ul>
        {cs.next ? (
          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-ink-2">
            <span className="font-semibold text-ink">What&apos;s next: </span>
            {cs.next}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function CaseQuote({
  cs,
  label,
  showDraft,
}: {
  cs: CaseStudy;
  label: string;
  showDraft: boolean;
}) {
  const q = cs.quote;
  if (!q || (!q.approved && !showDraft)) return null;
  return (
    <section className="relative bg-frost py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <SectionLabel index={label} title="In their words" />
        {!q.approved ? (
          <p className="mt-6 inline-block rounded-xl bg-ink px-4 py-2 text-sm text-white">
            Suggested quote, waiting for the client to approve or rewrite it.
          </p>
        ) : null}
        <figure className="mt-8 max-w-5xl">
          <blockquote>
            <p className="font-display text-[clamp(1.6rem,3.2vw,3rem)] font-bold leading-[1.15] tracking-[-0.02em] text-ink">
              &ldquo;{q.text}&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10 bg-ink/40" />
            <span>
              <span className="block font-semibold text-ink">{q.name}</span>
              <span className="block text-sm text-ink-2">{q.role}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function CaseNext({ next }: { next?: CaseStudy }) {
  if (!next) return null;
  return (
    <section className="relative bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col gap-6 rounded-[1.75rem] bg-ink p-7 text-white transition-colors duration-500 hover:bg-ultra sm:p-10 md:flex-row md:items-end md:justify-between"
        >
          <span>
            <span className="label text-sun">Next case study</span>
            <span
              className="mt-4 block max-w-[24ch] font-display text-[clamp(1.8rem,3.4vw,3.4rem)] font-black uppercase leading-[0.95] tracking-[-0.03em]"
              style={{ fontVariationSettings: '"wdth" 102' }}
            >
              {next.client}: {next.headline}
            </span>
          </span>
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-sun text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45">
            <Arrow />
          </span>
        </Link>
      </div>
    </section>
  );
}
