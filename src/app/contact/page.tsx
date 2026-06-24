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
  title: "Contact",
  description:
    "Get in touch with Arrowbin for software, web & mobile apps, SaaS or AI automation. Free consultation. Offices in Dhaka, Bangladesh and Florida, USA.",
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

      <section className="py-14 sm:py-20">
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
                Tell us about your project and we'll get back to you within one
                business day with next steps. No pressure, no obligation — just
                a real conversation about how we can help.
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
                  <div
                    key={o.label}
                    className="rounded-2xl border border-border bg-surface p-5"
                  >
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
                    className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
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
      className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent"
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
