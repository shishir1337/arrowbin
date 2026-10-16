"use client";

import type { ReactNode } from "react";
import { OPEN_CONSENT_EVENT } from "./consent";

/** Reopens the cookie banner (CookieConsent) so anyone can change their choice. */
export function CookieSettingsButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className={className}
    >
      {children}
    </button>
  );
}
