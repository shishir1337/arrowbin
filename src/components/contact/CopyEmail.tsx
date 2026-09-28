"use client";

import { useState } from "react";

/** Small "Copy" pill for the email address, with a spoken confirmation. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable: the address stays visible and selectable.
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${email}`}
        className={`inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors duration-500 ${
          copied ? "bg-sun text-ink" : "bg-frost text-ink hover:bg-lilac"
        }`}
      >
        <span aria-hidden="true">{copied ? "✓" : "⧉"}</span>
        {copied ? "Copied" : "Copy"}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </>
  );
}
