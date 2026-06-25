"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

/** Social share buttons + copy-link, for a blog article. */
export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links: { label: string; href: string; icon: IconName }[] = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      icon: "x",
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      icon: "linkedin",
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      icon: "facebook",
    },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable — no-op.
    }
  }

  const btn =
    "grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-border text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:text-accent hover:shadow-[0_0_18px_-2px_rgb(var(--brand-rgb)/0.5)]";

  return (
    <div className="flex items-center gap-2">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
          className={btn}
        >
          <Icon name={l.icon} size={16} />
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Link copied" : "Copy link"}
        className={btn}
      >
        <Icon name={copied ? "check" : "link"} size={16} />
      </button>
    </div>
  );
}
