import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import { defaultOgImage, pageAlternates, site } from "@/lib/site";

export const metadata: Metadata = {
  // Absolute (skips the "| Arrowbin" template) — keyword-rich and avoids a bare,
  // one-word SERP title.
  title: { absolute: "Contact Arrowbin — Free Software Consultation" },
  description:
    "Get in touch with Arrowbin for custom software, web and mobile apps, SaaS or AI automation. Free consultation. Offices in Dhaka, Bangladesh and Florida, USA.",
  alternates: pageAlternates("/contact"),
  openGraph: {
    title: "Contact Arrowbin",
    description: "Start your project with a free, no-obligation consultation.",
    url: "/contact",
    images: [defaultOgImage],
  },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), ...localBusinessSchema()]} />

      <section className="relative overflow-hidden py-14 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="blob left-[2%] top-[-18%] h-72 w-72" />
          <div
            className="blob right-[8%] top-[6%] h-80 w-80 opacity-10"
            style={{ animationDelay: "-5s", animationDuration: "24s" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-8%,rgba(163,230,53,0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_65%)]" />
        </div>
        <Container>
          <Breadcrumbs items={crumbs} />

          <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: info */}
            <div>
              <Reveal as="h1" className="text-4xl font-bold sm:text-5xl">
                Let's build something great
              </Reveal>
              <Reveal
                as="p"
                className="mt-5 text-lg leading-relaxed text-muted"
              >
                Tell us about your project and we'll reply within one business
                day with next steps. No pressure and no obligation, just a real
                conversation about how we can help.
              </Reveal>

              <div className="mt-10 space-y-4">
                <ContactItem
                  icon="mail"
                  label="Email us"
                  value={site.email}
                  href={`mailto:${site.email}`}
                />
                {site.phones.map((p) => (
                  <ContactItem
                    key={p.value}
                    icon="phone"
                    label={`Call us (${p.label})`}
                    value={p.value}
                    href={p.href}
                  />
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {site.offices.map((o) => (
                  <div key={o.label} className="card-surface rounded-2xl p-5">
                    <Icon name="map-pin" size={20} className="text-accent" />
                    <h2 className="mt-3 font-display text-base font-semibold text-text">
                      {o.label}
                    </h2>
                    <p className="mt-1 text-sm text-muted">{o.countryName}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-2">
                {site.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on ${s.label}`}
                    className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:text-accent hover:shadow-[0_0_18px_-2px_rgb(var(--brand-rgb)/0.5)]"
                  >
                    <Icon name={s.icon as IconName} size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <Reveal from="left">
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: IconName;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group card-surface spotlight flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-brand"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-2 text-accent">
        <Icon name={icon} size={20} />
      </span>
      <span>
        <span className="block text-sm text-muted">{label}</span>
        <span className="block font-medium text-text group-hover:text-accent">
          {value}
        </span>
      </span>
    </a>
  );
}
