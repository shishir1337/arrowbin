"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  type Consent,
  needsConsent,
  OPEN_CONSENT_EVENT,
  readConsent,
  setConsent,
} from "./consent";

const button =
  "flex h-11 cursor-pointer items-center justify-center rounded-full text-[0.95rem] font-semibold text-white transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ultra";

/**
 * The analytics cookie banner: a small card in the bottom corner, shown only to
 * visitors in the EEA, the UK and Switzerland who haven't chosen yet (see
 * consent.ts). The check runs after the window load event, and the card is
 * fixed, so it never affects LCP or layout shift. Reject and Accept carry equal
 * weight. "Cookie settings" in the footer reopens it for anyone.
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const card = useRef<HTMLElement>(null);
  /** Opened from the footer: move focus to the card so keyboard users land on it. */
  const focusOnOpen = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      if (readConsent() || !(await needsConsent()) || cancelled) return;
      setOpen(true);
    };
    const reopen = () => {
      focusOnOpen.current = true;
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    if (document.readyState === "complete") check();
    else window.addEventListener("load", check, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
      window.removeEventListener("load", check);
    };
  }, []);

  useEffect(() => {
    if (open && focusOnOpen.current) {
      focusOnOpen.current = false;
      card.current?.focus();
    }
  }, [open]);

  const choose = (choice: Consent) => {
    setConsent(choice);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <section
      ref={card}
      tabIndex={-1}
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-4 bottom-4 z-40 rounded-3xl border border-ink/10 bg-paper p-5 text-ink shadow-[0_24px_60px_-20px_rgba(14,11,36,0.45)] outline-none transition-[opacity,translate] duration-500 ease-out starting:translate-y-4 starting:opacity-0 motion-reduce:transition-none sm:right-6 sm:bottom-6 sm:left-auto sm:w-[380px] sm:p-6"
    >
      <h2
        id="cookie-consent-title"
        className="font-display text-lg font-extrabold leading-tight"
      >
        Can we use analytics cookies?
      </h2>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">
        They show us how people use this site, through Google Analytics and
        Microsoft Clarity. The site works the same either way.{" "}
        <Link
          href="/privacy#cookies"
          className="font-semibold text-ultra underline decoration-2 underline-offset-4"
        >
          Privacy policy
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => choose("denied")}
          className={`${button} bg-ink hover:bg-ink-2`}
        >
          Reject
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className={`${button} bg-ultra hover:bg-ultra-deep`}
        >
          Accept
        </button>
      </div>
    </section>
  );
}
