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
 * Pages whose long content sits inside an earlier child opt in by hand
 * (1 Nov 2026): `data-ff` on an element below the first phone screen, or
 * `data-ff-kids` on a container whose children are. On /privacy and /terms the
 * whole policy is in the third child of <main>, so the rule above never applied
 * there and they still stalled to 2.4 s on the live site; /contact's brief form,
 * /about's values and the /work list are marked the same way. Measured tops at
 * 360x780, 390x844 and 412x823: all start below 900 px.
 * `data-ff-hide` marks something never visible in the first frame (the closed
 * mobile menu, laid out though hidden): its contents skip layout there too.
 *
 * Check the LCP element before marking more: when the rule turns off, Chrome
 * reports content painted for the first time then (even below the fold) as an
 * LCP candidate. That's harmless for text, which has nothing to load, but
 * the /blog post list, marked too at first, made the lead post's cover image
 * the LCP on phones (Lighthouse LCP 1.2 s to 3.5 s), so it is not marked.
 *
 * Guards: phones only (the desktop first frame is not affected); only with JS
 * on (the `js` class from the root layout); skipped on loads that restore a
 * scroll position or jump to a #hash, where below-fold content can be on screen.
 */
const OFF = "html.js:not(.cv-off)";
const CSS = `@media (max-width:767px){${OFF} main>*:nth-child(n+4),${OFF} body>footer,${OFF} [data-ff],${OFF} [data-ff-kids]>*{content-visibility:auto;contain-intrinsic-size:auto 1000px}${OFF} [data-ff-hide]{content-visibility:hidden}}`;

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
