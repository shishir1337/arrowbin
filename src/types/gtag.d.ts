/** Minimal typing for the gtag.js and Clarity globals the analytics scripts inject. */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export {};
