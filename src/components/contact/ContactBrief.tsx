"use client";

import { type FormEvent, useEffect, useId, useRef, useState } from "react";
import { SectionLabel } from "@/components/home/SectionLabel";
import { reducedMotion } from "@/lib/gsap";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NEEDS = [...services.map((s) => s.name), "Not sure yet"];
const BUDGETS = ["Under $5k", "$5k–$15k", "$15k–$50k", "$50k+", "Not sure"];
const TIMELINES = [
  "As soon as possible",
  "1–3 months",
  "3–6 months",
  "Flexible",
];

const field =
  "w-full rounded-2xl border-2 border-transparent bg-frost px-4 py-3.5 text-ink placeholder:text-ink-2 transition-colors duration-300 focus:border-ultra focus:bg-white focus-visible:outline-none aria-[invalid=true]:border-[#c0144f]";

function Chips({
  legend,
  options,
  value,
  multi,
  onChange,
}: {
  legend: string;
  options: string[];
  value: string[];
  multi?: boolean;
  onChange: (v: string[]) => void;
}) {
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="mb-3 text-sm font-semibold text-ink">
        {legend}
        {multi && <span className="ml-2 font-normal text-ink-2">pick any</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value.includes(o);
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              onClick={() =>
                onChange(
                  multi
                    ? on
                      ? value.filter((x) => x !== o)
                      : [...value, o]
                    : on
                      ? []
                      : [o],
                )
              }
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-left text-sm font-semibold transition-[background-color,color,translate] duration-300 ease-[var(--ease-out-expo)] active:translate-y-px ${
                on ? "bg-ultra text-white" : "bg-frost text-ink hover:bg-lilac"
              }`}
            >
              <span
                aria-hidden="true"
                className={`grid h-4 w-4 shrink-0 place-items-center rounded-full text-[9px] transition-colors duration-300 ${
                  on ? "bg-sun text-ink" : "bg-white ring-1 ring-ink/20"
                }`}
              >
                {on ? "✓" : ""}
              </span>
              {o}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * /contact: a quick project brief. Chips for what, budget and timeline, then
 * the basics. Beside it, the email we'll receive writes itself as you type.
 * Posts to /api/contact (same contract as before: name, email, service,
 * message), folding the chip answers into the message.
 */
export function ContactBrief({ label }: { label: string }) {
  const uid = useId();
  const [needs, setNeeds] = useState<string[]>([]);
  const [budget, setBudget] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const trap = useRef<HTMLInputElement>(null);
  const done = useRef<HTMLOutputElement>(null);

  // `?service=<slug|name>` (from service pages) preselects that need.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("service");
    const m = services.find((s) => s.slug === q || s.name === q);
    if (m) setNeeds([m.name]);
  }, []);

  // The success card is much shorter than the form: bring it into view and
  // move focus to it so nobody is left looking at empty space.
  useEffect(() => {
    if (status !== "success") return;
    const el = done.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    el.scrollIntoView({
      block: "center",
      behavior: reducedMotion() ? "auto" : "smooth",
    });
  }, [status]);

  const clear = (k: keyof Errors) =>
    setErrors((e) => {
      if (!e[k]) return e;
      const n = { ...e };
      delete n[k];
      return n;
    });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    const errs: Errors = {};
    if (!name.trim()) errs.name = "Please enter your name.";
    if (!email.trim()) errs.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(email.trim()))
      errs.email = "Please enter a valid email address.";
    if (!message.trim())
      errs.message = "Please tell us a little about your project.";
    setErrors(errs);
    if (errs.name) return nameRef.current?.focus();
    if (errs.email) return emailRef.current?.focus();
    if (errs.message) return msgRef.current?.focus();

    const service = needs.length
      ? needs.length === 1
        ? needs[0]
        : `${needs[0]} +${needs.length - 1} more`
      : "Not specified";
    const full = [
      needs.length ? `Needs: ${needs.join(", ")}` : "",
      budget[0] ? `Budget: ${budget[0]}` : "",
      timeline[0] ? `Timeline: ${timeline[0]}` : "",
      company.trim() ? `Company: ${company.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          service: service.slice(0, 100),
          message: `${full ? `${full}\n\n` : ""}${message.trim()}`,
          company_website: trap.current?.value ?? "",
        }),
      });
      if (!res.ok) {
        const b = await res.json().catch(() => ({}));
        throw new Error(b.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      window.gtag?.("event", "generate_lead", {
        event_category: "contact",
        event_label: "contact_brief",
      });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const reset = () => {
    setNeeds([]);
    setBudget([]);
    setTimeline([]);
    setName("");
    setEmail("");
    setCompany("");
    setMessage("");
    setStatus("idle");
  };

  const sent = status === "success";
  const subject = needs.length
    ? `New project: ${needs[0]}${needs.length > 1 ? ` +${needs.length - 1}` : ""}`
    : "New project enquiry";

  return (
    <section
      id="brief"
      className="relative scroll-mt-24 bg-white py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="Project brief" />
            <h2
              className="display mt-5 max-w-[14ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              Two minutes, then it&apos;s on us
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-2 sm:text-lg">
            Tap what fits, add a few lines, and send. Only your name, email and
            a short description are required.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Form */}
          <div className="lg:col-span-7">
            {sent ? (
              <output
                ref={done}
                tabIndex={-1}
                className="block rounded-[2rem] outline-none bg-ultra p-8 text-white sm:p-10"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-sun text-2xl text-ink">
                  ✓
                </span>
                <h3 className="mt-6 font-display text-3xl font-black uppercase leading-none tracking-[-0.02em] sm:text-4xl">
                  Brief received
                </h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-white/90">
                  Thanks{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}.
                  We&apos;ll read it properly and reply to {email.trim()} within
                  one business day.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center rounded-full bg-sun px-6 font-semibold text-ink transition-colors duration-500 hover:bg-white"
                  >
                    Book a call now
                  </a>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex h-12 cursor-pointer items-center rounded-full border-2 border-white/40 px-6 font-semibold text-white transition-colors duration-500 hover:border-white"
                  >
                    Send another brief
                  </button>
                </div>
              </output>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-8">
                {/* Honeypot: hidden from people, filled by bots. */}
                <div className="absolute left-[-9999px]" aria-hidden="true">
                  <label htmlFor={`${uid}-hp`}>Leave this field empty</label>
                  <input
                    ref={trap}
                    id={`${uid}-hp`}
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <Chips
                  legend="What do you need?"
                  options={NEEDS}
                  value={needs}
                  multi
                  onChange={setNeeds}
                />
                <div className="grid gap-8 md:grid-cols-2">
                  <Chips
                    legend="Rough budget"
                    options={BUDGETS}
                    value={budget}
                    onChange={setBudget}
                  />
                  <Chips
                    legend="Timeline"
                    options={TIMELINES}
                    value={timeline}
                    onChange={setTimeline}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`${uid}-name`}
                      className="mb-2 block text-sm font-semibold text-ink"
                    >
                      Name <span className="text-[#c0144f]">*</span>
                    </label>
                    <input
                      ref={nameRef}
                      id={`${uid}-name`}
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                      value={name}
                      maxLength={100}
                      onChange={(e) => {
                        setName(e.target.value);
                        clear("name");
                      }}
                      aria-invalid={!!errors.name}
                      aria-describedby={
                        errors.name ? `${uid}-name-e` : undefined
                      }
                      className={field}
                    />
                    {errors.name && (
                      <p
                        id={`${uid}-name-e`}
                        className="mt-1.5 text-sm font-medium text-[#c0144f]"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor={`${uid}-email`}
                      className="mb-2 block text-sm font-semibold text-ink"
                    >
                      Email <span className="text-[#c0144f]">*</span>
                    </label>
                    <input
                      ref={emailRef}
                      id={`${uid}-email`}
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={email}
                      maxLength={254}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clear("email");
                      }}
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? `${uid}-email-e` : undefined
                      }
                      className={field}
                    />
                    {errors.email && (
                      <p
                        id={`${uid}-email-e`}
                        className="mt-1.5 text-sm font-medium text-[#c0144f]"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor={`${uid}-company`}
                      className="mb-2 block text-sm font-semibold text-ink"
                    >
                      Company or website{" "}
                      <span className="font-normal text-ink-2">optional</span>
                    </label>
                    <input
                      id={`${uid}-company`}
                      name="company"
                      autoComplete="organization"
                      placeholder="Acme Ltd, acme.com"
                      value={company}
                      maxLength={120}
                      onChange={(e) => setCompany(e.target.value)}
                      className={field}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor={`${uid}-msg`}
                      className="mb-2 block text-sm font-semibold text-ink"
                    >
                      About the project{" "}
                      <span className="text-[#c0144f]">*</span>
                    </label>
                    <textarea
                      ref={msgRef}
                      id={`${uid}-msg`}
                      name="message"
                      rows={5}
                      maxLength={4500}
                      placeholder="What are you building, who is it for, and what does success look like?"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        clear("message");
                      }}
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? `${uid}-msg-e` : undefined
                      }
                      className={`${field} resize-y`}
                    />
                    {errors.message && (
                      <p
                        id={`${uid}-msg-e`}
                        className="mt-1.5 text-sm font-medium text-[#c0144f]"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                {status === "error" && (
                  <p
                    role="alert"
                    className="rounded-2xl bg-plasma/15 p-4 text-sm font-semibold text-ink"
                  >
                    {error} You can also email{" "}
                    <a href={`mailto:${site.email}`} className="underline">
                      {site.email}
                    </a>
                    .
                  </p>
                )}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    aria-busy={status === "submitting"}
                    className="group inline-flex h-14 cursor-pointer items-center justify-center gap-3 rounded-full bg-ultra py-1.5 pl-7 pr-1.5 text-base font-semibold text-white shadow-[0_18px_40px_-14px_rgba(59,43,255,0.7)] transition-colors duration-500 hover:bg-ink disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === "submitting" ? "Sending…" : "Send brief"}
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-sun text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 11 11 3M5 3h6v6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                      </svg>
                    </span>
                  </button>
                  <p className="text-sm text-ink-2">
                    We never share your details.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Live email preview */}
          <div aria-hidden="true" className="max-lg:hidden lg:col-span-5">
            <div className="sticky top-28">
              <p className="label mb-3 text-ink-2">What lands in our inbox</p>
              <div className="relative overflow-hidden rounded-[1.75rem] bg-frost p-2 ring-1 ring-ink/10">
                <div className="rounded-[1.4rem] bg-white">
                  <div className="flex items-center gap-1.5 border-b border-ink/10 px-5 py-3.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-plasma" />
                    <span className="h-2.5 w-2.5 rounded-full bg-sun" />
                    <span className="h-2.5 w-2.5 rounded-full bg-ultra" />
                    <span className="ml-3 text-xs font-semibold text-ink-2">
                      Inbox · {site.email}
                    </span>
                  </div>
                  <dl className="grid gap-2 border-b border-ink/10 px-5 py-4 text-sm">
                    <div className="flex gap-3">
                      <dt className="w-16 shrink-0 text-ink-2">From</dt>
                      <dd className="min-w-0 truncate font-semibold text-ink">
                        {name.trim() || "Your name"}{" "}
                        <span className="font-normal text-ink-2">
                          &lt;{email.trim() || "you@company.com"}&gt;
                        </span>
                      </dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-16 shrink-0 text-ink-2">Subject</dt>
                      <dd className="min-w-0 font-semibold text-ink">
                        {subject}
                      </dd>
                    </div>
                  </dl>
                  <div className="grid gap-3 px-5 py-5 text-sm">
                    <div className="flex flex-wrap gap-1.5">
                      {needs.length ? (
                        needs.map((n) => (
                          <span
                            key={n}
                            className="cb-pop rounded-full bg-ultra px-2.5 py-1 text-xs font-semibold text-white"
                          >
                            {n}
                          </span>
                        ))
                      ) : (
                        <span className="rounded-full border-2 border-dashed border-ink/20 px-2.5 py-1 text-xs text-ink-2">
                          What you need
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        ["Budget", budget[0]],
                        ["Timeline", timeline[0]],
                      ].map(([k, v]) => (
                        <div key={k} className="rounded-xl bg-frost p-3">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-2">
                            {k}
                          </p>
                          <p
                            key={v ?? "none"}
                            className={`cb-pop mt-1 font-semibold ${v ? "text-ink" : "text-ink-2"}`}
                          >
                            {v ?? "—"}
                          </p>
                        </div>
                      ))}
                    </div>
                    {company.trim() && (
                      <p className="text-ink-2">
                        Company:{" "}
                        <span className="font-semibold text-ink">
                          {company.trim()}
                        </span>
                      </p>
                    )}
                    <p className="min-h-24 whitespace-pre-wrap break-words leading-relaxed text-ink">
                      {message.trim() ? (
                        message.length > 420 ? (
                          `${message.slice(0, 420)}…`
                        ) : (
                          message
                        )
                      ) : (
                        <span className="text-ink-2">
                          Your project details appear here as you type.
                        </span>
                      )}
                      {!sent && (
                        <span className="cb-caret ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 bg-ultra" />
                      )}
                    </p>
                  </div>
                </div>
                {sent && (
                  <span className="cb-stamp absolute bottom-10 right-10 rotate-[-10deg] rounded-xl border-4 border-ultra px-4 py-2 font-display text-2xl font-black uppercase tracking-[0.05em] text-ultra">
                    Sent ✓
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm text-ink-2">
                Replies within one business day, from the people who&apos;d
                build it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
