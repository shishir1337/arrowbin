"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

/** Copy button for a code block in a blog article. */
export function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable: no-op.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-ink-2 transition-colors hover:bg-ink hover:text-white"
    >
      <Icon name={copied ? "check" : "copy"} size={13} />
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
