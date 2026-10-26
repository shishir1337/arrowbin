import { PreferredSourceButton } from "@/components/preferred-source/PreferredSourceButton";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

/** End-of-article prompt to add Arrowbin as a Google preferred source. */
export function PreferredSource() {
  return (
    <aside
      aria-label="Add Arrowbin as a preferred source on Google"
      className="mt-10 flex flex-col gap-6 rounded-[1.75rem] bg-frost p-6 sm:p-8 md:flex-row md:items-center md:justify-between"
    >
      <div className="flex gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sun text-ink">
          <Icon name="star" size={20} />
        </span>
        <div>
          <p className="font-display text-xl font-black uppercase leading-none tracking-[-0.02em] text-ink">
            See our guides first on Google
          </p>
          <p className="mt-2 max-w-md leading-relaxed text-ink-2">
            Add {site.name} as a preferred source and Google shows you our new
            posts more often in Top Stories and its AI answers.
          </p>
        </div>
      </div>
      <PreferredSourceButton className="shrink-0" />
    </aside>
  );
}
