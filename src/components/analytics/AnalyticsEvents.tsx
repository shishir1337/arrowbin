"use client";

import { useReportWebVitals } from "next/web-vitals";
import { useEffect } from "react";
import { enableTracking, track } from "./track";

type ReportWebVitalsCallback = Parameters<typeof useReportWebVitals>[0];

const VITALS = new Set(["CLS", "INP", "LCP", "FCP", "TTFB"]);

/**
 * Core Web Vitals from real visits, sent to GA4 as one event per metric (the
 * GA4 pattern from the web-vitals README). `value` uses the delta so repeat
 * reports for the same page load sum correctly; CLS is scaled by 1000 to keep
 * it an integer. Defined at module level so the reference never changes
 * (Next's docs: a new callback re-reports metrics already sent).
 */
const reportWebVital: ReportWebVitalsCallback = (metric) => {
  if (!VITALS.has(metric.name)) return;
  track(metric.name, {
    value: Math.round(
      metric.name === "CLS" ? metric.delta * 1000 : metric.delta,
    ),
    metric_id: metric.id,
    metric_value: metric.value,
    metric_delta: metric.delta,
    metric_rating: metric.rating,
    non_interaction: true,
  });
};

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
 * Client-side GA4 instrumentation: web vitals plus lead-action clicks.
 * Rendered only by GoogleAnalytics, so it is active only when GA is configured.
 * Renders nothing and leaves gtag's loading strategy untouched.
 */
export function AnalyticsEvents() {
  // Declared before useReportWebVitals so tracking is enabled before any
  // metric callback can run (effects run in declaration order).
  useEffect(() => {
    enableTracking();
    document.addEventListener("click", onLinkClick, true);
    document.addEventListener("auxclick", onLinkClick, true);
    return () => {
      document.removeEventListener("click", onLinkClick, true);
      document.removeEventListener("auxclick", onLinkClick, true);
    };
  }, []);

  useReportWebVitals(reportWebVital);

  return null;
}
