/**
 * Tiny handshake between the preloader and the hero intro: the hero waits until
 * the curtain starts lifting (or runs at once when the preloader is skipped).
 */
declare global {
  interface Window {
    __abReady?: boolean;
  }
}

export function markReady() {
  window.__abReady = true;
  window.dispatchEvent(new Event("ab:ready"));
}

export function onReady(cb: () => void): () => void {
  if (
    window.__abReady ||
    document.documentElement.classList.contains("no-preload")
  ) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener("ab:ready", handler, { once: true });
  return () => window.removeEventListener("ab:ready", handler);
}
