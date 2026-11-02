"use client";

import { lazy, Suspense, useEffect } from "react";
import { AfterIdle } from "./AfterIdle";
import { enableTracking, track } from "./track";

/**
 * Core Web Vitals reporting, in its own chunk: the web-vitals library (9 KB)
 * stays out of the code every page loads first. It starts at idle after the
 * load event (see AfterIdle) and still reports every metric of the visit: the
 * browser keeps the paint, layout-shift and input timings it needs until then.
 */
const WebVitals = lazy(() =>
  import("./WebVitals").then(
    (m) => ({ default: m.WebVitals }),
    // A failed download (say, a deploy replaced the chunk while the tab was
    // open) only loses this visit's metrics; it must never reach the page's
    // error boundary.
    () => ({ default: () => null }),
  ),
);

/** Which part of the page a link sits in, so CTAs can be compared. */
function placement(el: Element): string {
  if (el.closest("header")) return "header";
  // The mobile menu is a dialog rendered next to <header>, not inside it.
  if (el.closest('[role="dialog"]')) return "menu";
  if (el.closest("footer")) return "footer";
  return "main";
}

/**
 * One delegated listener for outbound lead actions, so no CTA component needs
 * its own tracking code:
 * - `book_call_click` for links to Cal.com (the booking page)
 * - `contact_click` with `method` email, phone or whatsapp for mailto:, tel:
 *   and WhatsApp links
 * Form submissions send `generate_lead` from the forms themselves.
 */
function onLinkClick(event: MouseEvent) {
  // auxclick covers middle-click "open in new tab"; ignore right-clicks.
  if (event.type === "auxclick" && event.button !== 1) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  const link = target.closest("a[href]");
  if (!(link instanceof HTMLAnchorElement)) return;

  let url: URL;
  try {
    url = new URL(link.href);
  } catch {
    return;
  }
  const link_location = placement(link);

  if (url.protocol === "mailto:") {
    track("contact_click", { method: "email", link_location });
    return;
  }
  if (url.protocol === "tel:") {
    track("contact_click", { method: "phone", link_location });
    return;
  }

  const host = url.hostname.replace(/^www\./, "");
  if (
    host === "wa.me" ||
    host === "whatsapp.com" ||
    host.endsWith(".whatsapp.com")
  ) {
    track("contact_click", { method: "whatsapp", link_location });
    return;
  }
  if (host === "cal.com" || host.endsWith(".cal.com")) {
    track("book_call_click", {
      link_url: `${url.origin}${url.pathname}`,
      link_text: (link.textContent ?? "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 100),
      link_location,
    });
  }
}

/**
 * Client-side GA4 instrumentation: lead-action clicks plus web vitals.
 * Rendered only by GoogleAnalytics, so it is active only when GA is configured.
 * Renders nothing and leaves gtag's loading strategy untouched.
 */
export function AnalyticsEvents() {
  // Runs before WebVitals mounts, so tracking is enabled before any metric
  // callback can run.
  useEffect(() => {
    enableTracking();
    document.addEventListener("click", onLinkClick, true);
    document.addEventListener("auxclick", onLinkClick, true);
    return () => {
      document.removeEventListener("click", onLinkClick, true);
      document.removeEventListener("auxclick", onLinkClick, true);
    };
  }, []);

  // Client-only (AfterIdle renders nothing on the server), so this boundary
  // never streams anything into the page HTML.
  return (
    <AfterIdle>
      <Suspense fallback={null}>
        <WebVitals />
      </Suspense>
    </AfterIdle>
  );
}
