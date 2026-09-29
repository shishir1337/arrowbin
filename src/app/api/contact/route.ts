import { NextResponse } from "next/server";
import {
  type Lead,
  leadConfirmation,
  leadNotification,
} from "@/lib/email/templates";
import { site } from "@/lib/site";

/**
 * Lead-capture endpoint. Validates input, rejects bots via honeypot, then sends
 * two branded emails via Resend: the lead to hello@arrowbin.com (with internal
 * CCs), and a separate confirmation to the visitor. When RESEND_API_KEY is
 * unset (e.g. local dev), it logs the lead and returns success so the form is
 * fully testable.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort in-memory rate limit: 5 submissions per IP per 10 minutes. This guards a
// single server instance (cold starts / multi-instance serverless reset it); for
// hardened multi-instance protection add a shared store (e.g. Upstash) or a CAPTCHA.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  // Require a JSON body — also forces a CORS preflight, which a cross-origin
  // attacker cannot forge from a simple form (cheap CSRF mitigation).
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Unsupported content type." },
      { status: 415 },
    );
  }

  // Reject cross-origin browser submissions (Origin, when present, must be same-host).
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.get("host")) {
        return NextResponse.json({ error: "Forbidden." }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }
  }

  // Throttle abuse / email-bombing.
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this.
  if (
    typeof body.company_website === "string" &&
    body.company_website.trim() !== ""
  ) {
    return NextResponse.json({ ok: true });
  }

  const str = (v: unknown, max: number) =>
    String(v ?? "")
      .trim()
      .slice(0, max + 1);
  const name = str(body.name, 100);
  const email = str(body.email, 254);
  const message = str(body.message, 5000);
  const service = str(body.service, 100) || "Not specified";
  const company = str(body.company, 120);
  const budget = str(body.budget, 40);
  const timeline = str(body.timeline, 40);
  const page = str(body.page, 200);
  const needs = (Array.isArray(body.needs) ? body.needs : [])
    .map((n) => str(n, 60))
    .filter(Boolean)
    .slice(0, 12);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email and project details." },
      { status: 422 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 },
    );
  }
  // Reject oversized payloads (bots / abuse) before doing any work.
  if (
    name.length > 100 ||
    email.length > 254 ||
    service.length > 100 ||
    message.length > 5000 ||
    company.length > 120 ||
    budget.length > 40 ||
    timeline.length > 40 ||
    page.length > 200
  ) {
    return NextResponse.json(
      { error: "One of your fields is too long. Please shorten it." },
      { status: 422 },
    );
  }

  const lead: Lead = {
    name,
    email,
    message,
    service,
    company: company || undefined,
    needs: needs.length ? needs : undefined,
    budget: budget || undefined,
    timeline: timeline || undefined,
    // Only same-site paths, never an arbitrary URL.
    page: page.startsWith("/") && !page.startsWith("//") ? page : undefined,
  };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Dev / not-yet-configured fallback: log instead of failing.
    console.info(
      "[contact] RESEND_API_KEY not set, so the lead was logged but not emailed:",
      lead,
    );
    return NextResponse.json({ ok: true, stubbed: true });
  }

  const notification = leadNotification(lead, new Date());
  const confirmation = leadConfirmation(lead);
  const configured = process.env.CONTACT_FROM_EMAIL?.trim();
  const from = configured
    ? configured.includes("<")
      ? configured
      : `Arrowbin <${configured}>`
    : "Arrowbin Website <onboarding@resend.dev>";

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    // 1) To us (with internal CCs). Reply-To is the visitor, so hitting
    //    "reply" answers them directly. This one must succeed.
    const internal = await resend.emails.send({
      from,
      to: site.email,
      cc: [...site.leadCc],
      replyTo: email,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
    });
    if (internal.error) {
      console.error("[contact] Resend error (notification):", internal.error);
      return NextResponse.json(
        { error: "Could not send right now. Please email us directly." },
        { status: 502 },
      );
    }

    // 2) A separate confirmation to the visitor: only their address is on
    //    it, so our internal CCs are never exposed. If this one fails the
    //    lead is still safely with us, so we don't fail the request.
    const receipt = await resend.emails.send({
      from,
      to: email,
      replyTo: site.email,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });
    if (receipt.error)
      console.error("[contact] Resend error (confirmation):", receipt.error);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
