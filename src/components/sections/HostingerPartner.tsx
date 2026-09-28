import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CopyCode } from "@/components/ui/CopyCode";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HostingerBadge } from "@/components/ui/HostingerBadge";
import { Icon } from "@/components/ui/Icon";
import { hostinger, hostingerLinkRel } from "@/lib/site";

/** What the partnership actually buys the client — not what it buys Arrowbin. */
const benefits = [
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
 * The Hostinger partnership block, used on the Cloud/DevOps/Hosting service page.
 *
 * The badge sits alone on a plain surface with clear space around it — Hostinger's
 * terms rule out cluttered backgrounds and pairing it with other logos, so it is
 * deliberately kept out of the client logo marquee and away from the Arrowbin mark.
 */
export function HostingerPartner() {
  return (
    <section className="border-t border-border py-16 sm:py-20">
      <Container>
        <div className="card-surface overflow-hidden rounded-3xl">
          <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-12">
            {/* Badge + offer */}
            <div>
              <Reveal>
                <Eyebrow icon="shield">Official partner</Eyebrow>
              </Reveal>
              <Reveal as="h2" className="mt-5 text-2xl font-bold sm:text-3xl">
                Arrowbin is a verified {hostinger.name} Partner
              </Reveal>
              <Reveal as="p" className="mt-4 leading-relaxed text-muted">
                We build on hosting we trust and can vouch for. Being a verified
                partner means faster escalation when something goes wrong, and a
                discount we can pass straight to you.
              </Reveal>
              <Reveal className="mt-8">
                <HostingerBadge width={200} />
              </Reveal>
            </div>

            {/* What it means for the client */}
            <div>
              <ul className="space-y-6">
                {benefits.map((b) => (
                  <li key={b.title} className="flex gap-4">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface-2 text-accent">
                      <Icon name="check" size={18} />
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-text">
                        {b.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {b.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-9 border-t border-border pt-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <CopyCode
                    code={hostinger.couponCode}
                    label="Use at checkout"
                  />
                  <ButtonLink
                    href={hostinger.referralUrl}
                    external
                    icon="arrow-up-right"
                    variant="secondary"
                  >
                    Get hosting
                  </ButtonLink>
                </div>
                <p className="mt-6 text-xs leading-relaxed text-muted/80">
                  Arrowbin earns a commission when you host with{" "}
                  <a
                    href={hostinger.referralUrl}
                    target="_blank"
                    rel={hostingerLinkRel}
                    className="underline underline-offset-2 transition-colors hover:text-accent"
                  >
                    {hostinger.name}
                  </a>{" "}
                  through our link. It costs you nothing extra, and the discount
                  is a real one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
