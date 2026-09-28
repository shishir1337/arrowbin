import { SectionLabel } from "@/components/home/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { CopyCode } from "@/components/ui/CopyCode";
import { HostingerBadge } from "@/components/ui/HostingerBadge";
import { hostinger, hostingerLinkRel } from "@/lib/site";

/** What the partnership buys the client, not what it buys Arrowbin. */
const BENEFITS = [
  {
    title: "A direct line when hosting breaks",
    text: "Partner support escalates past the general queue, so a server problem gets a real engineer instead of a ticket number.",
  },
  {
    title: "We handle provisioning",
    text: "Domains, SSL, email and deployment are set up as part of the build. You never get handed a control panel and wished luck.",
  },
  {
    title: "A discount you apply yourself",
    text: "The coupon goes on your own Hostinger account at checkout. You keep ownership and billing; we just keep the keys we need.",
  },
] as const;

/**
 * Hostinger partnership (Cloud, DevOps & Hosting page only). The badge sits
 * alone on a plain white card with clear space, per Hostinger's terms (no
 * cluttered backgrounds, never paired with other logos).
 */
export function ServiceHosting({ label }: { label?: string }) {
  return (
    <section className="relative bg-sun py-20 text-ink sm:py-28">
      <SectionReveal />
      <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-[var(--gutter)] lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          {label ? (
            <SectionLabel index={label} title="Official partner" />
          ) : (
            <p className="label">Official partner</p>
          )}
          <h2
            className="display mt-5 text-[clamp(2.2rem,4.4vw,4.4rem)]"
            style={{ ["--wdth" as string]: 100 }}
          >
            Verified {hostinger.name} Partner
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/85">
            We build on hosting we trust and can vouch for. Being a verified
            partner means faster escalation when something goes wrong, and a
            discount we pass straight to you.
          </p>
          <div
            data-rv
            className="mt-10 inline-flex rounded-[1.75rem] bg-white p-8 shadow-[0_24px_50px_-30px_rgba(14,11,36,0.5)]"
          >
            <HostingerBadge width={220} />
          </div>
        </div>
        <div className="lg:col-span-7">
          <ul className="grid gap-4">
            {BENEFITS.map((b, i) => (
              <li
                key={b.title}
                data-rv={i}
                className="flex gap-5 rounded-[1.5rem] bg-white/70 p-6 sm:p-7"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-black text-sun">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-[-0.01em]">
                    {b.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink/80">{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-6 rounded-[1.5rem] bg-white p-6 sm:flex-row sm:items-end sm:justify-between sm:p-7">
            <CopyCode code={hostinger.couponCode} label="Use at checkout" />
            <a
              href={hostinger.referralUrl}
              target="_blank"
              rel={hostingerLinkRel}
              className="group inline-flex h-13 items-center gap-3 self-start rounded-full bg-ink py-1.5 pl-6 pr-1.5 font-semibold text-white transition-colors duration-500 hover:bg-ultra sm:self-auto"
            >
              Get hosting
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sun text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45">
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
          </div>
          <p className="mt-5 text-sm leading-relaxed text-ink/80">
            Arrowbin earns a commission when you host with {hostinger.name}{" "}
            through our link. It costs you nothing extra, and the discount is a
            real one.
          </p>
        </div>
      </div>
    </section>
  );
}
