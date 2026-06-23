"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * Toggles light/dark by adding/removing `.dark` on <html> and persisting to
 * localStorage. The initial class is set pre-paint by the inline script in layout.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // ignore storage errors (private mode)
    }
    setIsDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
          : "Toggle theme"
      }
      className={`inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border text-text transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      {/* Render both icons; CSS shows the right one to avoid hydration mismatch. */}
      <Icon name="sun" size={18} className="hidden dark:block" />
      <Icon name="moon" size={18} className="block dark:hidden" />
    </button>
  );
}
