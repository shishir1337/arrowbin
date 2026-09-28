/**
 * The Arrowbin mark, as raw geometry so the React component, favicon, app icons
 * and OG images all draw the exact same shape (100×100 box).
 *
 * A notched arrowhead whose triangular counter makes it read as a capital "A",
 * with a single square "bit" trailing in the notch: arrow + bin(ary).
 */
export const MARK_PATH = "M50 6 94 90 50 70 6 90Z M50 36 60.5 57H39.5Z";
export const MARK_BIT = { x: 43.5, y: 77, size: 13, r: 1.5 } as const;

/** Standalone SVG string (used by generated icons). */
export function markSvg({
  fill = "#3B2BFF",
  bit = "#FF4DA6",
  tile,
}: {
  fill?: string;
  bit?: string;
  /** Optional rounded background tile colour. */
  tile?: string;
} = {}) {
  const b = MARK_BIT;
  const glyph = `<path fill="${fill}" fill-rule="evenodd" d="${MARK_PATH}"/><rect x="${b.x}" y="${b.y}" width="${b.size}" height="${b.size}" rx="${b.r}" fill="${bit}"/>`;
  return tile
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="24" fill="${tile}"/><g transform="translate(16 14) scale(.68)">${glyph}</g></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${glyph}</svg>`;
}
