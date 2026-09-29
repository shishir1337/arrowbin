"use client";

import { type FormEvent, useRef, useState } from "react";

/**
 * Hyperchrome quote form for service-page heroes. Posts to the same
 * `/api/contact` endpoint as the full contact form, with the service pre-filled
 * (and sent as a hidden field) so the enquiry is attributed to this page.
 * Logic is unchanged from the previous HeroLeadForm; only the look is new.
 */

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full rounded-2xl border-2 border-transparent bg-frost px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-2/70 transition-[border-color,background-color] duration-300 hover:bg-[#e9ebf3] focus:border-ultra focus:bg-white focus-visible:outline-none aria-[invalid=true]:border-[#c0144f]";

const labelClass = "label mb-2 block text-ink-2";

const errorClass = "mt-1.5 text-sm font-medium text-[#c0144f]";

function validate(data: Record<string, string>): FieldErrors {
  const errs: FieldErrors = {};
  if (!data.name?.trim()) errs.name = "Please enter your name.";
  const email = data.email?.trim() ?? "";
  if (!email) errs.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email))
    errs.email = "Please enter a valid email address.";
  if (!data.message?.trim())
    errs.message = "Please tell us a little about your project.";
  return errs;
}

export function ServiceQuoteForm({ serviceName }: { serviceName: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    const errs = validate(data);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      setStatus("idle");
      setError("");
      if (errs.name) nameRef.current?.focus();
      else if (errs.email) emailRef.current?.focus();
      else if (errs.message) messageRef.current?.focus();
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, page: window.location.pathname }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body.error ?? "Something went wrong. Please try again.",
        );
      }
      setStatus("success");
      setFieldErrors({});
      form.reset();
      // GA4 conversion event so hero leads are measurable (no-op if GA isn't set up).
      window.gtag?.("event", "generate_lead", {
        event_category: "contact",
        event_label: "service_hero_form",
      });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  function clearFieldError(field: keyof FieldErrors) {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  if (status === "success") {
    return (
      <div className="rounded-[1.75rem] bg-white p-8 text-center shadow-[0_30px_60px_-30px_rgba(14,11,36,0.45)] ring-1 ring-ink/5">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sun text-2xl text-ink">
          ✓
        </span>
        <h2
          className="mt-5 font-display text-2xl font-black uppercase tracking-[-0.03em] text-ink"
          style={{ fontVariationSettings: '"wdth" 110' }}
        >
          Thanks, we&apos;re on it
        </h2>
        <p className="mt-2 text-ink-2">
          We&apos;ve received your enquiry and will reply within one business
          day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex h-12 cursor-pointer items-center rounded-full border-2 border-ink/15 px-6 text-sm font-semibold text-ink transition-colors duration-500 hover:border-ink"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-[1.75rem] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(14,11,36,0.45)] ring-1 ring-ink/5 sm:p-8"
      noValidate
    >
      {/* Service this enquiry is about — pre-filled from the page. */}
      <input type="hidden" name="service" value={serviceName} />

      {/* Honeypot — hidden from users, catches bots. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="hero_company_website">Leave this field empty</label>
        <input
          id="hero_company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <h2
        className="pr-20 font-display text-[1.7rem] font-black uppercase leading-none tracking-[-0.03em] text-ink sm:pr-24"
        style={{ fontVariationSettings: '"wdth" 110' }}
      >
        Get a free quote
      </h2>
      <p className="mt-2 text-ink-2">
        Tell us about your project. No obligation.
      </p>

      <div className="mt-5 grid gap-4">
        <div>
          <label htmlFor="hero-name" className={labelClass}>
            Name <span className="text-plasma">*</span>
          </label>
          <input
            ref={nameRef}
            id="hero-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "hero-name-error" : undefined}
            onInput={() => clearFieldError("name")}
          />
          {fieldErrors.name ? (
            <p id="hero-name-error" role="alert" className={errorClass}>
              {fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="hero-email" className={labelClass}>
            Email <span className="text-plasma">*</span>
          </label>
          <input
            ref={emailRef}
            id="hero-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClass}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={
              fieldErrors.email ? "hero-email-error" : undefined
            }
            onInput={() => clearFieldError("email")}
          />
          {fieldErrors.email ? (
            <p id="hero-email-error" role="alert" className={errorClass}>
              {fieldErrors.email}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="hero-message" className={labelClass}>
            Project details <span className="text-plasma">*</span>
          </label>
          <textarea
            ref={messageRef}
            id="hero-message"
            name="message"
            required
            rows={3}
            placeholder="What are you looking to build?"
            className={`${inputClass} resize-y`}
            aria-invalid={!!fieldErrors.message}
            aria-describedby={
              fieldErrors.message ? "hero-message-error" : undefined
            }
            onInput={() => clearFieldError("message")}
          />
          {fieldErrors.message ? (
            <p id="hero-message-error" role="alert" className={errorClass}>
              {fieldErrors.message}
            </p>
          ) : null}
        </div>
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-4 text-sm font-medium text-[#c0144f]">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        aria-busy={status === "submitting"}
        className="group mt-6 flex h-14 w-full cursor-pointer items-center justify-between rounded-full bg-ink pl-6 pr-2 text-base font-semibold text-white transition-colors duration-500 hover:bg-ultra disabled:cursor-wait disabled:opacity-70"
      >
        {status === "submitting" ? "Sending…" : "Get my free quote"}
        <span className="grid h-10 w-10 place-items-center rounded-full bg-sun text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45">
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path
              d="M3 11 11 3M5 3h6v6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
        </span>
      </button>
      <p className="mt-3 text-center text-sm text-ink-2">
        Reply within one business day. We never share your details.
      </p>
    </form>
  );
}
