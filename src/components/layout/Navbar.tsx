"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { mainNav, site } from "@/lib/site";

/**
 * Hyperchrome header. Transparent over the hero; once scrolled it settles into a
 * solid frost bar. It never hides or moves, so it stays calm while scrolling. On small
 * screens "Menu" opens a full-screen ultraviolet overlay with oversized links.
 * The header is fixed, so non-home routes get a spacer to keep their layout.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the intended trigger.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY;
        // Hysteresis: turn on past 40px, off below 10px, so it never flickers.
        setScrolled((was) => (was ? y > 10 : y > 40));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const drawer = drawerRef.current;
      const toggle = menuButtonRef.current;
      if (!drawer || !toggle) return;
      const focusables = [
        toggle,
        ...Array.from(drawer.querySelectorAll<HTMLElement>("a[href], button")),
      ];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    drawerRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled && !open
            ? "border-ink/10 bg-frost/95 shadow-[0_10px_30px_-24px_rgba(14,11,36,0.5)]"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[4.75rem] w-full max-w-[1600px] items-center justify-between gap-4 px-[var(--gutter)]"
        >
          <div
            className={`relative z-10 [&_a]:transition-colors [&_a]:delay-200 [&_a]:duration-300 [&_svg]:transition-colors [&_svg]:delay-200 [&_svg]:duration-300 ${open ? "[&_a]:text-white [&_svg]:text-sun" : ""}`}
          >
            <Logo />
          </div>

          <ul className="hidden items-center gap-1 rounded-full bg-white p-1.5 shadow-[0_6px_20px_-12px_rgba(14,11,36,0.35)] ring-1 ring-ink/5 lg:flex">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`group relative block rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-500 ease-[var(--ease-smooth)] ${
                    isActive(item.href)
                      ? "bg-ink text-white"
                      : "text-ink hover:bg-ultra hover:text-white"
                  }`}
                >
                  <span className="relative block h-5 overflow-hidden leading-5">
                    <span className="block transition-transform duration-[600ms] ease-[var(--ease-smooth)] group-hover:-translate-y-full">
                      {item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-full block transition-transform duration-[600ms] ease-[var(--ease-smooth)] group-hover:-translate-y-full"
                    >
                      {item.label}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex items-center gap-2">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 items-center gap-2.5 rounded-full bg-ink pl-5 pr-1.5 text-sm font-medium text-white transition-colors duration-500 ease-[var(--ease-smooth)] hover:bg-ultra max-sm:hidden"
            >
              Book a call
              <span className="grid h-8 w-8 place-items-center rounded-full bg-sun text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45">
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
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className={`inline-flex h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors lg:hidden ${
                open ? "bg-sun text-ink" : "bg-ultra text-white"
              }`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-2.5 w-4" aria-hidden="true">
                <span
                  className={`absolute left-0 h-[1.5px] w-4 bg-current transition-transform duration-300 ${open ? "top-1 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-4 bg-current transition-transform duration-300 ${open ? "top-1 -rotate-45" : "top-2"}`}
                />
              </span>
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </header>
      {/* Mobile / tablet overlay */}
      <div
        ref={drawerRef}
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        aria-hidden={!open}
        // Circular reveal that grows out of the Menu button (and closes back
        // into it); `inert` keeps the closed menu out of focus and the a11y tree.
        // Opening: visible at once (so focus can move in); closing: stays visible
        // until the circle has shrunk away, then hides.
        className={`fixed inset-0 z-40 overflow-y-auto bg-ultra text-white duration-700 ease-[var(--ease-in-out-quart)] lg:hidden ${
          open
            ? "visible transition-[clip-path] [clip-path:circle(150%_at_calc(100%_-_3.5rem)_2.4rem)]"
            : "invisible transition-[clip-path,visibility] [clip-path:circle(0%_at_calc(100%_-_3.5rem)_2.4rem)]"
        }`}
      >
        <div className="flex min-h-full flex-col justify-between px-[var(--gutter)] pb-8 pt-28">
          <ul className="flex flex-col">
            {mainNav.map((item, i) => (
              <li
                key={item.href}
                className="border-b border-white/20"
                style={{
                  animation: open
                    ? `menu-in 0.8s ${0.2 + i * 0.06}s var(--ease-out-expo) both`
                    : undefined,
                }}
              >
                <Link
                  href={item.href}
                  className="flex items-baseline justify-between py-3 font-display text-[clamp(2.6rem,11vw,5rem)] font-extrabold uppercase leading-none tracking-[-0.04em]"
                  style={{ fontVariationSettings: '"wdth" 120' }}
                >
                  {item.label}
                  <span className="label text-sun">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-5">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center rounded-full bg-sun text-base font-semibold text-ink"
            >
              Book a free call
            </a>
            <a href={`mailto:${site.email}`} className="label text-white/80">
              {site.email}
            </a>
          </div>
        </div>
      </div>
      {pathname !== "/" ? (
        <div aria-hidden="true" className="h-[4.75rem]" />
      ) : null}
    </>
  );
}
