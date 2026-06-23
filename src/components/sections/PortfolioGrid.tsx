import Image from "next/image";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { Icon } from "@/components/ui/Icon";
import type { Project } from "@/lib/portfolio";

/** Grid of portfolio project cards linking out to the live sites. */
export function PortfolioGrid({ items }: { items: Project[] }) {
  return (
    <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((project) => (
        <a
          key={project.url}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
          className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-200 hover:border-accent"
        >
          {/* Live-site screenshot; the gradient letter-mark shows behind it as a fallback. */}
          <div
            className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${project.gradient}`}
          >
            <span className="absolute inset-0 flex items-center justify-center font-display text-5xl font-bold text-white/90">
              {project.mark}
            </span>
            <Image
              src={project.image}
              alt={`Screenshot of the ${project.name} website built by Arrowbin`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
              <Icon name="arrow-up-right" size={18} />
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="font-display text-lg font-semibold text-text group-hover:text-accent">
              {project.name}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {project.blurb}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-surface-2 px-2.5 py-1 text-xs text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </a>
      ))}
    </StaggerGroup>
  );
}
