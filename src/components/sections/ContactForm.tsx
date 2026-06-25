"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/lib/services";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full rounded-xl border border-border bg-bg px-4 py-3 text-text placeholder:text-muted transition-colors focus:border-accent focus-visible:outline-none aria-[invalid=true]:border-red-500";

const errorClass = "mt-1.5 text-sm text-red-600 dark:text-red-400";

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

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const selectRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Prefill the service dropdown from a `?service=<slug|name>` query param, so the
  // "Discuss your project" CTA on a service page lands here with that service chosen.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("service");
    if (!param || !selectRef.current) return;
    const match = services.find((s) => s.slug === param || s.name === param);
    if (match) selectRef.current.value = match.name;
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    // Accessible client-side validation: mark invalid fields and focus the first one.
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
        body: JSON.stringify(data),
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
      // Fire a GA4 conversion event so leads are measurable (no-op if GA isn't set up).
      window.gtag?.("event", "generate_lead", {
        event_category: "contact",
        event_label: "contact_form",
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
      <div className="card-surface rounded-2xl p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent">
          <Icon name="check" size={28} />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold text-text">
          Thanks — message sent!
        </h2>
        <p className="mt-2 text-muted">
          We've received your message and will get back to you within one
          business day.
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="card-surface rounded-2xl p-6 shadow-[var(--shadow-glow)] sm:p-8"
      noValidate
    >
      {/* Honeypot — hidden from users, catches bots. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input
          id="company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-text"
          >
            Name <span className="text-accent">*</span>
          </label>
          <input
            ref={nameRef}
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            onInput={() => clearFieldError("name")}
          />
          {fieldErrors.name ? (
            <p id="name-error" role="alert" className={errorClass}>
              {fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-text"
          >
            Email <span className="text-accent">*</span>
          </label>
          <input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClass}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            onInput={() => clearFieldError("email")}
          />
          {fieldErrors.email ? (
            <p id="email-error" role="alert" className={errorClass}>
              {fieldErrors.email}
            </p>
          ) : null}
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="service"
            className="mb-1.5 block text-sm font-medium text-text"
          >
            What can we help with?
          </label>
          <select
            ref={selectRef}
            id="service"
            name="service"
            className={inputClass}
            defaultValue=""
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Other / Not sure">Other / Not sure</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-medium text-text"
          >
            Project details <span className="text-accent">*</span>
          </label>
          <textarea
            ref={messageRef}
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us about your project, goals and timeline…"
            className={`${inputClass} resize-y`}
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
            onInput={() => clearFieldError("message")}
          />
          {fieldErrors.message ? (
            <p id="message-error" role="alert" className={errorClass}>
              {fieldErrors.message}
            </p>
          ) : null}
        </div>
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-4 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="mt-6 w-full"
        disabled={status === "submitting"}
        aria-busy={status === "submitting"}
        icon={status === "submitting" ? undefined : "arrow-right"}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
      <p className="mt-3 text-center text-xs text-muted">
        We'll never share your details. Expect a reply within one business day.
      </p>
    </form>
  );
}
