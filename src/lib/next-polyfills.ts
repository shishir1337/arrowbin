/**
 * Stands in for Next.js's built-in browser polyfills
 * (next/dist/build/polyfills/polyfill-module.js), through `turbopack.resolveAlias`
 * in next.config.ts.
 *
 * Next ships that file to every browser. It patches String trimStart/trimEnd,
 * Array flat/flatMap/at, Object.fromEntries/hasOwn, Symbol description,
 * Promise finally and URL.canParse. Next 16 supports Chrome/Edge/Firefox 111+
 * and Safari 16.4+, which have all of them except URL.canParse (Chrome 120,
 * Safari 17, Firefox 115). PageSpeed flags the rest as "Legacy JavaScript".
 * So only URL.canParse is kept here, the same function as Next's.
 *
 * If a Next.js upgrade moves or renames that file, the alias simply stops
 * matching and Next's own polyfills come back: nothing breaks.
 */
if (!("canParse" in URL)) {
  (
    URL as unknown as { canParse: (url: string, base?: string) => boolean }
  ).canParse = (url: string, base?: string) => {
    try {
      return !!new URL(url, base);
    } catch {
      return false;
    }
  };
}

export {};
