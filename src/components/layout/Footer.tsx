import Link from "next/link";
import { LogoMark } from "@/components/brand/LogoMark";
import { HostingerBadge } from "@/components/ui/HostingerBadge";
import { Icon, type IconName } from "@/components/ui/Icon";
import { services } from "@/lib/services";
import { mainNav, site } from "@/lib/site";
import { FooterWordmark } from "./FooterWordmark";

const year = new Date().getFullYear();

const linkCls =
  "group inline-flex items-center gap-1.5 text-[0.95rem] text-ink-2 transition-colors hover:text-ultra";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-frost pt-20 text-ink">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="grid gap-12 border-b-2 border-ink/10 pb-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <LogoMark className="h-12 w-12 text-ultra" />
            <p
              className="mt-6 max-w-xs font-display text-2xl font-extrabold uppercase leading-[0.95] tracking-[-0.03em]"
              style={{ fontVariationSettings: '"wdth" 110' }}
            >
              Software that moves. Built for companies worldwide.
            </p>
            <div className="mt-6 flex gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${s.label}`}
                  className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ultra hover:bg-ultra hover:text-white"
                >
                  <Icon name={s.icon as IconName} size={18} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="label text-ink-2">Services</h2>
            <ul className="mt-5 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={linkCls}>
                    <span className="h-1.5 w-1.5 scale-0 rounded-full bg-plasma transition-transform group-hover:scale-100" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <h2 className="label text-ink-2">Company</h2>
            <ul className="mt-5 space-y-2.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkCls}>
                    <span className="h-1.5 w-1.5 scale-0 rounded-full bg-plasma transition-transform group-hover:scale-100" />
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy" className={linkCls}>
                  <span className="h-1.5 w-1.5 scale-0 rounded-full bg-plasma transition-transform group-hover:scale-100" />
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={linkCls}>
                  <span className="h-1.5 w-1.5 scale-0 rounded-full bg-plasma transition-transform group-hover:scale-100" />
                  Terms
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="label text-ink-2">Say hello</h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 block font-display text-2xl font-bold text-ink underline decoration-ultra decoration-2 underline-offset-8 hover:text-ultra"
            >
              {site.email}
            </a>
            <ul className="mt-5 space-y-2">
              {site.phones.map((p) => (
                <li key={p.value}>
                  <a href={p.href} className={linkCls}>
                    {p.value}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <HostingerBadge width={164} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6 text-sm text-ink-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="label">Designed &amp; engineered in-house</p>
        </div>
      </div>
      <FooterWordmark />
    </footer>
  );
}
