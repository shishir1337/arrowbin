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
      <span className="label text-ink/80">{label}</span>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy coupon code ${code}`}
        className="group/code inline-flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed border-ink/40 bg-white px-5 py-3.5 transition-colors duration-500 hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <span className="font-display text-xl font-black tracking-[0.2em] text-ink">
          {code}
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-2 transition-colors group-hover/code:text-ultra">
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
