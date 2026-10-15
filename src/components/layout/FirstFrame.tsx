/**
 * Keeps the very first rendered frame small on phones.
 *
 * Why: the first frame lays out the whole page at once (1,600 to 1,800 layout
 * objects, about 200 ms on a fast desktop CPU). Under Lighthouse's mobile
 * emulation, a first commit that late makes Chrome drop the compositor's early
 * frames and throttle frame production to 1 per second, so the first paint
 * lands at about 1.3 s (home) or 2.3 s (service pages) even though the HTML,
 * CSS and fonts were all ready by 0.3 s (traces, 15 Oct 2026).
 *
 * What: until the first frame has been produced, sections from the third one
 * after the hero onward, and the footer, use `content-visibility: auto`, so the
 * browser skips their layout and paint. They are always below the fold on a
 * phone at that point (they start at least one full screen down), so nothing
 * visible changes. Right after that first frame the class `cv-off` turns the
 * rule off and the page lays out exactly as before, long before any scroll
 * animation measures it.
 *
 * Guards: phones only (the desktop first frame is not affected); only with JS
 * on (the `js` class from the root layout); skipped on loads that restore a
 * scroll position or jump to a #hash, where below-fold content can be on screen.
 */
const CSS =
  "@media (max-width:767px){html.js:not(.cv-off) main>*:nth-child(n+4),html.js:not(.cv-off) body>footer{content-visibility:auto;contain-intrinsic-size:auto 1000px}}";

const SCRIPT =
  '(function(){var d=document.documentElement,n=performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];function off(){d.classList.add("cv-off")}if(location.hash||(n&&n.type!=="navigate"))off();else requestAnimationFrame(function(){setTimeout(off,0)})})();';

export function FirstFrame() {
  return (
    <>
      {/** biome-ignore lint/security/noDangerouslySetInnerHtml: static CSS, must apply before the first frame. */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {/** biome-ignore lint/security/noDangerouslySetInnerHtml: static inline script, must run during parse. */}
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
    </>
  );
}
