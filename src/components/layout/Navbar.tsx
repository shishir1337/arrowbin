"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/lib/services";
import { mainNav, site } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuId = useId();
  const servicesPanelId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close the mobile menu whenever the route changes.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the intended trigger.
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer / services menu on Escape (and restore focus to the toggle).
  useEffect(() => {
    if (!open && !servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (open) {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
      setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, servicesOpen]);

  // Move focus into the drawer when it opens, so keyboard users land in the menu.
  useEffect(() => {
    if (!open) return;
    drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus();
  }, [open]);

  // Trap Tab focus within the open drawer + its toggle (the close control), so it
  // behaves as a modal dialog. The toggle sits in the header, before the drawer in
  // DOM, so it is the cycle's first stop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const drawer = drawerRef.current;
      const toggle = menuButtonRef.current;
      if (!drawer || !toggle) return;
      const focusables = [
        toggle,
        ...Array.from(
          drawer.querySelectorAll<HTMLElement>(
            "a[href], button:not([disabled])",
          ),
        ),
      ];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-bg/80 backdrop-blur-lg"
          : "border-transparent bg-bg/0"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8"
      >
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            item.href === "/services" ? (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                onFocus={() => setServicesOpen(true)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setServicesOpen(false);
                  }
                }}
              >
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-accent ${
                    isActive(item.href) ? "text-accent" : "text-text"
                  }`}
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  aria-controls={servicesPanelId}
                >
                  {item.label}
                  <Icon name="chevron-down" size={14} />
                </Link>
                <div
                  id={servicesPanelId}
                  hidden={!servicesOpen}
                  className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-2"
                >
                  <ul className="grid gap-1 rounded-2xl border border-border bg-surface p-2 shadow-xl shadow-black/5">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-text transition-colors hover:bg-surface-2 hover:text-accent"
                        >
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface-2 text-accent">
                            <Icon name={s.icon} size={16} />
                          </span>
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-accent ${
                    isActive(item.href) ? "text-accent" : "text-text"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink
            href={site.bookingUrl}
            external
            className="hidden sm:inline-flex"
          >
            Book a call
          </ButtonLink>
          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border text-text lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open ? (
        <div
          ref={drawerRef}
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-border bg-bg lg:hidden"
        >
          <ul className="flex flex-col gap-1 px-5 py-6">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-xl px-4 py-3 text-lg font-medium transition-colors hover:bg-surface-2 ${
                    isActive(item.href) ? "text-accent" : "text-text"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-4">
              <ButtonLink
                href={site.bookingUrl}
                external
                size="lg"
                className="w-full"
              >
                Book a call
              </ButtonLink>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
