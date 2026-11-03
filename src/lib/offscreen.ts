/**
 * Marks an element `data-off` while it is off screen, through one shared
 * IntersectionObserver; CSS pauses its looping animations then (globals.css:
 * `svg[data-off] [class^="sa-"]`, `[data-loop][data-off]`). Returns a stop
 * function. Client only.
 *
 * Why: Chrome runs some loops on the main thread rather than the compositor
 * (shapes inside an SVG, and any loop on an element it decides has no visible
 * change, such as one below the fold). Each of those costs a full frame (style,
 * layout, paint, commit) 60 times a second, even when nobody can see it.
 * Paused loops resume where they stopped, so nothing looks different.
 */
let observer: IntersectionObserver | undefined;

export function pauseOffscreen(el: Element): () => void {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        entry.target.toggleAttribute("data-off", !entry.isIntersecting);
      }
    },
    // Resume a little before an element enters the screen.
    { rootMargin: "64px 0px" },
  );
  observer.observe(el);
  return () => observer?.unobserve(el);
}
