/**
 * Branded HTML emails for website enquiries. Email clients ignore most modern
 * CSS, so these use tables and inline styles only, web-safe fonts, and the
 * site's colours (frost background, ultraviolet, plasma and sun accents).
 * Every value that comes from a visitor is escaped before it is inserted.
 * Each template also returns a plain-text version.
 */
import { site } from "@/lib/site";

export type Lead = {
  name: string;
  email: string;
  message: string;
  service: string;
  company?: string;
  needs?: string[];
  budget?: string;
  timeline?: string;
  /** Path of the page the form was sent from, e.g. "/contact". */
  page?: string;
};

const C = {
  frost: "#F1F2F7",
  ink: "#0E0B24",
  ink2: "#4A4766",
  ultra: "#3B2BFF",
  plasma: "#FF4DA6",
  sun: "#FFD23F",
  lilac: "#CFC4FF",
  white: "#FFFFFF",
  line: "#E3E2EC",
};
const SANS = "'Helvetica Neue',Helvetica,Arial,'Segoe UI',Roboto,sans-serif";
const MONO = "'SFMono-Regular',Menlo,Consolas,'Liberation Mono',monospace";

export function esc(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
const multiline = (v: string) => esc(v).replace(/\r?\n/g, "<br>");
const firstName = (n: string) => n.trim().split(/\s+/)[0] || n.trim();

function label(text: string, color = C.ink2) {
  return `<p style="margin:0;font-family:${MONO};font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:${color};">${esc(text)}</p>`;
}

function chips(items: string[], bg: string, fg: string) {
  return items
    .map(
      (i) =>
        `<span style="display:inline-block;margin:0 6px 6px 0;padding:6px 12px;border-radius:999px;background:${bg};color:${fg};font-family:${SANS};font-size:13px;font-weight:700;">${esc(i)}</span>`,
    )
    .join("");
}

function button(href: string, text: string, bg = C.ultra, fg = C.white) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-radius:999px;background:${bg};">
<a href="${esc(href)}" style="display:inline-block;padding:14px 26px;border-radius:999px;font-family:${SANS};font-size:15px;font-weight:700;color:${fg};text-decoration:none;">${esc(text)} &rarr;</a>
</td></tr></table>`;
}

/** Page shell: frost background, header band, white card, footer. */
function shell({
  preheader,
  eyebrow,
  title,
  body,
  footer,
}: {
  preheader: string;
  eyebrow: string;
  title: string;
  body: string;
  footer: string;
}) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:${C.frost};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.frost};">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
  <tr><td style="padding:0 4px 20px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="vertical-align:middle;">
        <a href="${site.url}" style="text-decoration:none;">
          <img src="${site.url}/logo.png" width="36" height="36" alt="" style="display:inline-block;vertical-align:middle;border:0;border-radius:10px;">
          <span style="display:inline-block;vertical-align:middle;margin-left:10px;font-family:${SANS};font-size:22px;font-weight:800;letter-spacing:-0.5px;color:${C.ink};">Arrowbin</span>
        </a>
      </td>
      <td align="right" style="vertical-align:middle;">${label(eyebrow)}</td>
    </tr></table>
  </td></tr>
  <tr><td style="background:${C.white};border-radius:24px;overflow:hidden;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td style="height:8px;background:${C.ultra};font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr><td style="padding:32px 32px 8px;">
        <h1 style="margin:0;font-family:${SANS};font-size:30px;line-height:1.05;font-weight:900;letter-spacing:-0.8px;text-transform:uppercase;color:${C.ink};">${title}</h1>
      </td></tr>
      <tr><td style="padding:16px 32px 32px;font-family:${SANS};font-size:16px;line-height:1.6;color:${C.ink2};">${body}</td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:24px 8px 0;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.ink2};text-align:center;">${footer}</td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function rows(pairs: [string, string][]) {
  return pairs
    .map(
      ([k, v]) => `<tr>
<td style="padding:12px 0;border-top:1px solid ${C.line};width:120px;vertical-align:top;font-family:${MONO};font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${C.ink2};">${esc(k)}</td>
<td style="padding:12px 0;border-top:1px solid ${C.line};vertical-align:top;font-family:${SANS};font-size:15px;color:${C.ink};">${v}</td>
</tr>`,
    )
    .join("");
}

/** Internal notification: the full lead, laid out for a quick read and reply. */
export function leadNotification(lead: Lead, submittedAt: Date) {
  const needs = lead.needs?.length ? lead.needs : [lead.service];
  const when = submittedAt.toUTCString();
  const pairs: [string, string][] = [
    ["Name", esc(lead.name)],
    [
      "Email",
      `<a href="mailto:${esc(lead.email)}" style="color:${C.ultra};font-weight:700;">${esc(lead.email)}</a>`,
    ],
  ];
  if (lead.company) pairs.push(["Company", esc(lead.company)]);
  if (lead.budget) pairs.push(["Budget", esc(lead.budget)]);
  if (lead.timeline) pairs.push(["Timeline", esc(lead.timeline)]);
  if (lead.page)
    pairs.push([
      "Sent from",
      `<a href="${esc(site.url + lead.page)}" style="color:${C.ultra};">${esc(lead.page)}</a>`,
    ]);
  pairs.push(["Received", esc(when)]);

  const subject = `New project brief from ${lead.name}: ${lead.service}`;
  const body = `
<p style="margin:0 0 18px;">${esc(lead.name)} sent a brief through the website. Reply to this email to answer them directly.</p>
<div style="margin:0 0 18px;">${chips(needs, C.ultra, C.white)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;">${rows(pairs)}</table>
${label("About the project")}
<div style="margin:10px 0 26px;padding:18px 20px;border-radius:16px;background:${C.frost};font-family:${SANS};font-size:15px;line-height:1.65;color:${C.ink};">${multiline(lead.message)}</div>
${button(`mailto:${lead.email}?subject=${encodeURIComponent(`Re: your project brief`)}`, `Reply to ${firstName(lead.name)}`)}`;

  const html = shell({
    preheader: `${lead.name} · ${needs.join(", ")}${lead.budget ? ` · ${lead.budget}` : ""}`,
    eyebrow: "New lead",
    title: `New brief from <span style="color:${C.ultra};">${esc(firstName(lead.name))}</span>`,
    body,
    footer: `Sent automatically by the contact form on <a href="${site.url}" style="color:${C.ink2};">arrowbin.com</a>.`,
  });

  const text = [
    `New project brief from ${lead.name}`,
    "",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.company ? `Company: ${lead.company}` : "",
    `Needs: ${needs.join(", ")}`,
    lead.budget ? `Budget: ${lead.budget}` : "",
    lead.timeline ? `Timeline: ${lead.timeline}` : "",
    lead.page ? `Sent from: ${site.url}${lead.page}` : "",
    `Received: ${when}`,
    "",
    "About the project:",
    lead.message,
  ]
    .filter((l, i, a) => l !== "" || a[i - 1] !== "")
    .join("\n");

  return { subject, html, text };
}

/** Confirmation to the person who sent the form. */
export function leadConfirmation(lead: Lead) {
  const first = firstName(lead.name);
  const needs = lead.needs?.length ? lead.needs : [lead.service];
  const excerpt =
    lead.message.length > 600 ? `${lead.message.slice(0, 600)}…` : lead.message;
  const steps: [string, string, string][] = [
    [
      "01",
      "We reply",
      "Within one business day, from someone who would work on your project.",
    ],
    [
      "02",
      "A 30-minute call",
      "Goals, users and constraints, and an honest view on fit.",
    ],
    [
      "03",
      "A written proposal",
      "Scope, timeline and price in plain language. No obligation.",
    ],
  ];

  const subject = `We've got your brief, ${first}`;
  const body = `
<p style="margin:0 0 22px;">Thanks for getting in touch. Your brief is with our team, and a real person will reply to <strong style="color:${C.ink};">${esc(lead.email)}</strong> within one business day.</p>
${label("What you sent")}
<div style="margin:10px 0 26px;padding:20px;border-radius:16px;background:${C.frost};">
  <div style="margin:0 0 8px;">${chips(needs, C.ultra, C.white)}${lead.budget ? chips([lead.budget], C.sun, C.ink) : ""}${lead.timeline ? chips([lead.timeline], C.lilac, C.ink) : ""}</div>
  <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.ink};">${multiline(excerpt)}</p>
</div>
${label("What happens next")}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:10px 0 28px;">
${steps
  .map(
    ([n, h, t]) => `<tr>
<td style="width:44px;padding:10px 0;vertical-align:top;"><span style="display:inline-block;width:34px;height:34px;line-height:34px;border-radius:999px;background:${C.ink};color:${C.sun};text-align:center;font-family:${MONO};font-size:12px;font-weight:700;">${n}</span></td>
<td style="padding:10px 0;vertical-align:top;font-family:${SANS};"><p style="margin:0;font-size:16px;font-weight:800;color:${C.ink};">${esc(h)}</p><p style="margin:2px 0 0;font-size:14px;line-height:1.55;color:${C.ink2};">${esc(t)}</p></td>
</tr>`,
  )
  .join("")}
</table>
<p style="margin:0 0 16px;">Rather talk sooner? Pick a time that suits you.</p>
${button(site.bookingUrl, "Book a free 30-min call")}
<p style="margin:26px 0 0;">Speak soon,<br><strong style="color:${C.ink};">The Arrowbin team</strong></p>`;

  const html = shell({
    preheader:
      "Your brief is with our team. We'll reply within one business day.",
    eyebrow: "Brief received",
    title: `Thanks, <span style="color:${C.ultra};">${esc(first)}.</span>`,
    body,
    footer: `You're getting this because you sent a brief on <a href="${site.url}" style="color:${C.ink2};">arrowbin.com</a>. Just reply to this email if you want to add anything.<br>${esc(site.legalName)} · <a href="${site.url}/privacy" style="color:${C.ink2};">Privacy policy</a>`,
  });

  const text = [
    `Thanks, ${first}.`,
    "",
    `Your brief is with our team, and a real person will reply to ${lead.email} within one business day.`,
    "",
    "What you sent:",
    `Needs: ${needs.join(", ")}`,
    lead.budget ? `Budget: ${lead.budget}` : "",
    lead.timeline ? `Timeline: ${lead.timeline}` : "",
    excerpt,
    "",
    "What happens next:",
    ...steps.map(([n, h, t]) => `${n}. ${h}: ${t}`),
    "",
    `Rather talk sooner? Book a free 30-min call: ${site.bookingUrl}`,
    "",
    "Speak soon,",
    "The Arrowbin team",
    "",
    `You're getting this because you sent a brief on arrowbin.com. Privacy policy: ${site.url}/privacy`,
  ]
    .filter((l, i, a) => l !== "" || a[i - 1] !== "")
    .join("\n");

  return { subject, html, text };
}
