/** Minimal typing for the gtag.js global injected by GoogleAnalytics. */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export {};
