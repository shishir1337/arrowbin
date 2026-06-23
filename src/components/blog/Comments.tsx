import { Icon } from "@/components/ui/Icon";

type SampleComment = {
  name: string;
  initials: string;
  time: string;
  text: string;
  likes: number;
};

const comments: SampleComment[] = [
  {
    name: "Jordan Reyes",
    initials: "JR",
    time: "2 days ago",
    text: "This is the clearest breakdown of software cost I've read. The budget-composition chart finally made it click for my co-founder — we were about to accept a quote that put 90% into development with almost nothing for QA.",
    likes: 12,
  },
  {
    name: "Aisha Karim",
    initials: "AK",
    time: "5 days ago",
    text: "The regional rate comparison is spot on. We hired a senior team in a lower-cost region and got far better code than the cheapest bid we almost took. Wish I'd read this a year ago.",
    likes: 8,
  },
  {
    name: "Daniel O.",
    initials: "DO",
    time: "1 week ago",
    text: "Great point on hidden costs — the 15–20% per year for maintenance is exactly what caught us off guard on our first product. Bookmarking this for the next round of planning.",
    likes: 5,
  },
];

/** Presentational comments section (UI showcase — not wired to a backend). */
export function Comments() {
  return (
    <section className="mt-14 border-t border-border pt-10">
      <h2 className="font-display text-2xl font-bold text-text">
        Comments <span className="text-muted">({comments.length})</span>
      </h2>

      {/* Comment form (presentational) */}
      <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
        <label htmlFor="comment" className="sr-only">
          Add a comment
        </label>
        <textarea
          id="comment"
          rows={3}
          placeholder="Share your thoughts…"
          className="w-full resize-y rounded-xl border border-border bg-bg px-4 py-3 text-text placeholder:text-muted focus:border-accent focus-visible:outline-none"
        />
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label htmlFor="comment-name" className="sr-only">
            Your name
          </label>
          <input
            id="comment-name"
            type="text"
            placeholder="Your name"
            className="rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-text placeholder:text-muted focus:border-accent focus-visible:outline-none sm:max-w-xs"
          />
          <button
            type="button"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          >
            Post comment
            <Icon name="arrow-right" size={16} />
          </button>
        </div>
      </div>

      {/* Comments list */}
      <ul className="mt-8 space-y-7">
        {comments.map((c) => (
          <li key={c.name} className="flex gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface-2 font-display text-sm font-bold text-accent">
              {c.initials}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 text-sm">
                <span className="font-semibold text-text">{c.name}</span>
                <span className="text-muted">· {c.time}</span>
              </div>
              <p className="mt-1.5 leading-relaxed text-muted">{c.text}</p>
              <div className="mt-2 flex items-center gap-4 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="check" size={15} className="text-accent" />
                  {c.likes}
                </span>
                <button
                  type="button"
                  className="cursor-pointer font-medium transition-colors hover:text-accent"
                >
                  Reply
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
