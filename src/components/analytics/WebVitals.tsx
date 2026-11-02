"use client";

import { useReportWebVitals } from "next/web-vitals";
import { track } from "./track";

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

/** Sends Core Web Vitals to GA4. Loaded lazily by AnalyticsEvents. */
export function WebVitals() {
  useReportWebVitals(reportWebVital);
  return null;
}
