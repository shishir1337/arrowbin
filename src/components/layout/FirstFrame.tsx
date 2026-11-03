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
 * visible changes. After that first frame they are laid out in document order,
 * one per animation frame (an inline `content-visibility: visible` each), so
 * the rest of the page costs a dozen short tasks instead of one long layout
 * (about 100 ms on a fast desktop CPU for the homepage, which Lighthouse's
 * phone simulation counted as blocking time). Then the class `cv-off` turns
 * the rule off, the inline styles are removed, and the page is laid out
 * exactly as before. GSAP waits for `cv-off` before it measures anything
 * (lib/gsap.ts); desktops skip the stagger and get `cv-off` straight away.
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
const PHONE = "(max-width:767px)";
const SKIPPED = "main>*:nth-child(n+4),body>footer,[data-ff],[data-ff-kids]>*";
const CSS = `@media ${PHONE}{${SKIPPED.split(",")
  .map((s) => `${OFF} ${s}`)
  .join(
    ",",
  )}{content-visibility:auto;contain-intrinsic-size:auto 1000px}${OFF} [data-ff-hide]{content-visibility:hidden}}`;

// At most this many frames: long pages (the legal texts mark every paragraph)
// lay out a few elements per frame instead of one.
const MAX_FRAMES = 12;

const SCRIPT = `(function(){var d=document.documentElement,n=performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];function off(){d.classList.add("cv-off")}if(location.hash||(n&&n.type!=="navigate"))return off();requestAnimationFrame(function(){setTimeout(function(){if(!matchMedia("${PHONE}").matches)return off();var q=[].slice.call(document.querySelectorAll("${SKIPPED}")),per=Math.ceil(q.length/${MAX_FRAMES})||1,i=0;(function next(){if(i<q.length){for(var k=0;k<per&&i<q.length;k++)q[i++].style.contentVisibility="visible";requestAnimationFrame(next)}else{off();q.forEach(function(e){e.style.removeProperty("content-visibility")})}})()},0)})})();`;

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
