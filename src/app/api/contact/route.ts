import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Lead-capture endpoint. Validates input, rejects bots via honeypot, and emails the
 * lead to hello@arrowbin.com via Resend. When RESEND_API_KEY is unset (e.g. local
 * dev), it logs the lead and returns success so the form is fully testable.
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const service = String(body.service ?? "Not specified").trim();

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
    message.length > 5000
  ) {
    return NextResponse.json(
      { error: "One of your fields is too long. Please shorten it." },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const subject = `New lead from ${name} — ${service}`;
  const html = `
    <h2>New website enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Service:</strong> ${escapeHtml(service)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  `;

  if (!apiKey) {
    // Dev / not-yet-configured fallback: log instead of failing.
    console.info(
      "[contact] RESEND_API_KEY not set — lead logged but not emailed:",
      {
        name,
        email,
        service,
        message,
      },
    );
    return NextResponse.json({ ok: true, stubbed: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const from =
      process.env.CONTACT_FROM_EMAIL ??
      "Arrowbin Website <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to: site.email,
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Could not send right now. Please email us directly." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
