/**
 * Cookie consent for analytics. Only visitors in the EEA, the UK and Switzerland
 * are asked, because only there does the law require consent before analytics
 * cookies are set. Everyone else gets GA and Clarity as before, with no banner.
 * Until a visitor in those regions accepts, GA (consent mode, region-scoped by
 * Google from the IP) and Clarity (by its own rules) run without cookies.
 *
 * The choice is kept in localStorage under CONSENT_KEY. The GA and Clarity init
 * scripts read it on every page load, before they send anything, so a choice
 * made before they load still applies.
 */

/**
 * EEA (the EU plus Iceland, Liechtenstein and Norway), the EU's outermost
 * regions that have their own country codes, the UK and Switzerland.
 */
export const CONSENT_REGIONS = (
  "AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE " +
  "IS LI NO GF GP MQ RE YT MF GB CH"
).split(" ");

export const CONSENT_KEY = "ab-consent";
const REGION_KEY = "ab-consent-region";

/** Fired by the footer's "Cookie settings" button to reopen the banner. */
export const OPEN_CONSENT_EVENT = "ab:cookie-settings";

export type Consent = "granted" | "denied";

export function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

/** GA keeps its existing cookies when consent is withdrawn, so remove them. */
function clearGaCookies() {
  const host = location.hostname.replace(/^www\./, "");
  for (const pair of document.cookie.split(";")) {
    const name = pair.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const domain of ["", `; domain=.${host}`, `; domain=${host}`]) {
      // biome-ignore lint/suspicious/noDocumentCookie: the Cookie Store API isn't in every browser yet.
      document.cookie = `${name}=; max-age=0; path=/${domain}`;
    }
  }
}

export function setConsent(choice: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Storage blocked: the choice still applies to this page.
  }
  window.gtag?.("consent", "update", { analytics_storage: choice });
  // Clarity deletes its own cookies when analytics storage is denied.
  window.clarity?.("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: choice,
  });
  if (choice === "denied") clearGaCookies();
}

const EUROPEAN_ATLANTIC = [
  "Atlantic/Azores",
  "Atlantic/Canary",
  "Atlantic/Madeira",
  "Atlantic/Reykjavik",
];

/** Fallback when Cloudflare's trace isn't available (local builds). */
function europeanTimeZone() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  return tz.startsWith("Europe/") || EUROPEAN_ATLANTIC.includes(tz);
}

/**
 * Whether this visitor should be asked. The country comes from Cloudflare's
 * /cdn-cgi/trace (answered at the edge, a few hundred bytes), checked once per
 * browser session.
 */
export async function needsConsent(): Promise<boolean> {
  try {
    const cached = sessionStorage.getItem(REGION_KEY);
    if (cached) return cached === "1";
  } catch {
    // No session storage: check every time.
  }
  let ask: boolean;
  try {
    const res = await fetch("/cdn-cgi/trace", { cache: "no-store" });
    const country = res.ok
      ? (await res.text()).match(/^loc=([A-Z]{2})$/m)?.[1]
      : undefined;
    ask = country ? CONSENT_REGIONS.includes(country) : europeanTimeZone();
  } catch {
    ask = europeanTimeZone();
  }
  try {
    sessionStorage.setItem(REGION_KEY, ask ? "1" : "0");
  } catch {
    // Not cached; fine.
  }
  return ask;
}
