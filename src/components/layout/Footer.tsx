import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { services } from "@/lib/services";
import { mainNav, site } from "@/lib/site";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand + contact */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {site.tagline} building custom software, web & mobile apps, SaaS
              and AI automation for teams worldwide.
            </p>
            <div className="mt-5 flex gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${s.label}`}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon name={s.icon as IconName} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h2 className="text-sm font-semibold text-text">Services</h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h2 className="text-sm font-semibold text-text">Company</h2>
            <ul className="mt-4 space-y-2.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold text-text">Get in touch</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <Icon name="mail" size={16} />
                  {site.email}
                </a>
              </li>
              {site.phones.map((p) => (
                <li key={p.value}>
                  <a
                    href={p.href}
                    className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                  >
                    <Icon name="phone" size={16} />
                    {p.value}
                  </a>
                </li>
              ))}
              {site.offices.map((o) => (
                <li key={o.label} className="inline-flex items-center gap-2">
                  <Icon name="map-pin" size={16} />
                  {o.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>Built for performance, accessibility & growth.</p>
        </div>
      </Container>
    </footer>
  );
}
