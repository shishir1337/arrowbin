import { SectionLabel } from "@/components/home/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";

const GROUPS = [
  {
    title: "Local payments",
    note: "Bangladesh and South Asia",
    items: ["bKash", "Nagad", "Rocket", "SSLCommerz", "Cash on delivery"],
    tone: "bg-plasma text-ink",
    proof: "Several of our stores sell nationwide on cash on delivery.",
  },
  {
    title: "Global payments",
    note: "Cards and wallets worldwide",
    items: ["Stripe", "PayPal", "Apple Pay", "Google Pay", "Multi-currency"],
    tone: "bg-ultra text-white",
    proof: "Take orders from anywhere, priced in the buyer's currency.",
  },
  {
    title: "Delivery & fulfilment",
    note: "Couriers, stock and returns",
    items: [
      "Courier booking & tracking",
      "Delivery zones & rates",
      "Returns & exchanges",
      "Order status by SMS",
    ],
    tone: "bg-sun text-ink",
    proof: 'Automatic tracking updates mean fewer "where is my order?" calls.',
  },
];

/**
 * E-commerce: pay and deliver the way customers expect, locally and globally.
 * (Several of our stores sell nationwide on cash on delivery.)
 */
export function PaymentsDelivery({ label }: { label: string }) {
  return (
    <section className="relative py-20 sm:py-28">
      <SectionReveal />
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="Payments & delivery" />
            <h2
              className="display mt-5 max-w-[15ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              Checkout the way your customers pay
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-2 sm:text-lg">
            A missing payment option is a lost sale. We wire up what your
            customers already use, from mobile wallets to cash on delivery.
          </p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {GROUPS.map((g, i) => (
            <div
              key={g.title}
              data-rv={i}
              className={`flex flex-col rounded-[2rem] p-7 sm:p-8 ${g.tone}`}
            >
              <p className="label opacity-85">{g.note}</p>
              <h3
                className="mt-3 font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-black uppercase leading-[0.95] tracking-[-0.03em]"
                style={{ fontVariationSettings: '"wdth" 106' }}
              >
                {g.title}
              </h3>
              <ul data-inview className="mb-8 mt-6 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="iv-pop rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-ink"
                  >
                    {it}
                  </li>
                ))}
              </ul>
              <p className="mt-auto border-t border-current/20 pt-5 text-[0.95rem] font-medium leading-relaxed">
                {g.proof}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
