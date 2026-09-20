"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * A coupon/voucher code shown as a dashed chip that copies itself on click.
 *
 * The code is always readable as text, so the component still does its job if the
 * Clipboard API is unavailable (non-secure origin, or permission denied) — the copy
 * is a convenience, never the only way to get the value. The result is announced in
 * a polite live region so screen-reader users hear the confirmation too.
 */
export function CopyCode({
  code,
  label = "Coupon code",
}: {
  code: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the code stays visible and selectable.
    }
  }

  return (
    <div className="inline-flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-widest text-muted">
        {label}
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy coupon code ${code}`}
        className="group/code inline-flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border-strong bg-bg px-4 py-3 transition-colors duration-200 hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <span className="font-display text-lg font-bold tracking-[0.2em] text-text">
          {code}
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors group-hover/code:text-accent">
          <Icon name={copied ? "check" : "link"} size={16} />
          {copied ? "Copied" : "Copy"}
        </span>
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? `Coupon code ${code} copied to clipboard` : ""}
      </span>
    </div>
  );
}
