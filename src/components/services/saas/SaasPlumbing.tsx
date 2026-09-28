import { SectionLabel } from "@/components/home/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { PlanToggle } from "./PlanToggle";

const ROLES = [
  { who: "Maya R.", role: "Owner", c: "bg-plasma" },
  { who: "Tom K.", role: "Admin", c: "bg-sun" },
  { who: "Lina S.", role: "Editor", c: "bg-lilac" },
  { who: "Omar F.", role: "Viewer", c: "bg-ultra" },
];

const LOG = [
  ["09:41", "maya@", "changed plan to Growth"],
  ["09:42", "tom@", "invited lina@ as Editor"],
  ["09:44", "api", "webhook invoice.paid"],
  ["09:47", "lina@", "exported 3 reports"],
  ["09:51", "omar@", "signed in with SSO"],
  ["09:52", "system", "nightly backup done"],
];

/** Uptime bars: one per day for a month. The single amber one is honest. */
const UPTIME = Array.from({ length: 30 }, (_, i) => (i === 19 ? 1 : 0));

/**
 * SaaS: "plumbing included". The unglamorous parts every paying customer
 * expects, each shown as a small live piece of UI.
 */
export function SaasPlumbing({ label }: { label: string }) {
  return (
    <section className="relative bg-white py-20 sm:py-28">
      <SectionReveal />
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="Plumbing included" />
            <h2
              className="display mt-5 max-w-[15ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              The parts customers pay for without seeing
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-2 sm:text-lg">
            Your core feature wins the demo. Billing, teams, security and uptime
            keep the subscription. They come built in, not bolted on later.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-6 xl:grid-cols-12">
          {/* Billing */}
          <article
            data-rv
            className="sp-card flex flex-col justify-between gap-8 rounded-[2rem] bg-ultra p-6 text-white md:col-span-6 xl:col-span-5 sm:p-8"
          >
            <div>
              <p className="label text-white/80">Billing & plans</p>
              <h3 className="sp-title mt-3">Subscriptions that just work</h3>
              <p className="mt-3 max-w-sm text-white/85">
                Plans, trials, upgrades, proration, tax and failed-payment
                retries, all on Stripe. Try the switch.
              </p>
            </div>
            <PlanToggle />
          </article>

          {/* Teams & roles */}
          <article
            data-rv
            className="sp-card group rounded-[2rem] bg-frost p-6 md:col-span-3 xl:col-span-4 sm:p-7"
          >
            <p className="label text-ink-2">Teams & roles</p>
            <h3 className="sp-title mt-3 text-ink">Invite the whole team</h3>
            <ul className="mt-5 grid gap-2">
              {ROLES.map((r, i) => (
                <li
                  key={r.who}
                  className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 text-sm transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <span
                    aria-hidden="true"
                    className={`h-7 w-7 rounded-full ${r.c}`}
                  />
                  <span className="font-medium text-ink">{r.who}</span>
                  <span className="ml-auto rounded-full bg-frost px-2.5 py-0.5 font-mono text-[11px] text-ink-2">
                    {r.role}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          {/* Auth */}
          <article
            data-rv
            className="sp-card group rounded-[2rem] bg-sun p-6 text-ink md:col-span-3 xl:col-span-3 sm:p-7"
          >
            <p className="label">Sign-in & SSO</p>
            <h3 className="sp-title mt-3">Secure by default</h3>
            <div className="mt-5 grid gap-2 text-sm font-semibold">
              {[
                "Continue with Google",
                "Continue with Microsoft",
                "SAML SSO",
              ].map((s) => (
                <span
                  key={s}
                  className="flex h-10 items-center justify-center rounded-xl bg-white/80"
                >
                  {s}
                </span>
              ))}
              <span className="flex h-10 items-center justify-center gap-2 rounded-xl bg-ink text-white">
                <span aria-hidden="true" className="sp-lock" />
                2FA on
              </span>
            </div>
          </article>

          {/* Usage */}
          <article
            data-rv
            className="sp-card rounded-[2rem] bg-lilac p-6 text-ink md:col-span-3 xl:col-span-3 sm:p-7"
          >
            <p className="label">Usage metering</p>
            <h3 className="sp-title mt-3">Limits & overages</h3>
            <div data-inview className="mt-5 grid gap-3 text-sm">
              {[
                { k: "Seats", v: "8 / 10", w: "80%" },
                { k: "API calls", v: "41k / 50k", w: "82%" },
                { k: "Storage", v: "3.1 / 5 GB", w: "62%" },
              ].map((u) => (
                <div key={u.k}>
                  <div className="flex justify-between font-medium">
                    <span>{u.k}</span>
                    <span className="font-mono text-xs">{u.v}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/70">
                    <span
                      className="iv-bar block h-full rounded-full bg-ultra"
                      style={{ width: u.w }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Audit log */}
          <article
            data-rv
            className="sp-card overflow-hidden rounded-[2rem] bg-frost p-6 md:col-span-3 xl:col-span-4 sm:p-7"
          >
            <p className="label text-ink-2">Audit log & webhooks</p>
            <h3 className="sp-title mt-3 text-ink">Every action, on record</h3>
            <div className="sp-log-mask mt-5 h-36 overflow-hidden">
              <ul className="sp-log grid gap-1.5 font-mono text-xs">
                {[...LOG, ...LOG].map(([t, who, what], i) => (
                  <li
                    // biome-ignore lint/suspicious/noArrayIndexKey: duplicated loop list.
                    key={i}
                    aria-hidden={i >= LOG.length ? true : undefined}
                    className="flex gap-3 rounded-lg bg-white px-3 py-2"
                  >
                    <span className="text-ink-2">{t}</span>
                    <span className="font-semibold text-ultra">{who}</span>
                    <span className="truncate text-ink">{what}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Uptime */}
          <article
            data-rv
            className="sp-card rounded-[2rem] bg-plasma p-6 text-ink md:col-span-6 xl:col-span-5 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="label">Monitoring & backups</p>
                <h3 className="sp-title mt-3">Know before customers do</h3>
              </div>
              <p
                className="font-display text-4xl font-black leading-none tabular-nums"
                style={{ fontVariationSettings: '"wdth" 108' }}
              >
                99.9%
              </p>
            </div>
            <div
              data-inview
              aria-label="Uptime over the last 30 days"
              role="img"
              className="mt-6 flex h-12 items-end gap-[3px]"
            >
              {UPTIME.map((u, i) => (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: fixed bars.
                  key={i}
                  className={`sp-bar block flex-1 rounded-[3px] ${u ? "h-2/3 bg-sun" : "h-full bg-white/85"}`}
                  style={{ transitionDelay: `${i * 18}ms` }}
                />
              ))}
            </div>
            <p className="mt-3 flex justify-between font-mono text-[11px]">
              <span>30 days ago</span>
              <span className="max-sm:hidden">Alerts, logs, daily backups</span>
              <span>Today</span>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
