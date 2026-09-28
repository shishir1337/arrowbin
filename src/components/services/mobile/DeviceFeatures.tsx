import type { ReactNode } from "react";
import { SectionLabel } from "@/components/home/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";

/* Small line icons (24px box), animated on tile hover via .df-* classes. */
const I = {
  push: (
    <>
      <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
      <circle
        className="df-ping"
        cx="18"
        cy="6"
        r="2.5"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),
  offline: (
    <>
      <path d="M3 9a13 13 0 0 1 18 0M6.5 12.5a8 8 0 0 1 11 0M10 16a3 3 0 0 1 4 0" />
      <path className="df-draw" d="M4 4l16 16" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3l2-2h6l2 2h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
      <path className="df-scan" d="M6 13h12" />
    </>
  ),
  gps: (
    <>
      <path d="M12 21s-6-5.5-6-10a6 6 0 0 1 12 0c0 4.5-6 10-6 10z" />
      <circle
        className="df-ping"
        cx="12"
        cy="11"
        r="2"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),
  bio: (
    <>
      <path d="M8 4.5A8 8 0 0 1 20 11M4 11a8 8 0 0 1 2-5.3" />
      <path d="M8 20c1.5-2 2-4.5 2-7a2 2 0 0 1 4 0c0 3-.6 5.5-2 8" />
      <path d="M16.5 19c.8-2 1.5-4 1.5-6" />
    </>
  ),
  pay: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2.5" />
      <path d="M3 10h18" />
      <path className="df-draw" d="M7 14.5h4" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5h16v10H9l-5 4z" />
      <circle
        className="df-dot"
        cx="9"
        cy="10"
        r="1"
        fill="currentColor"
        stroke="none"
      />
      <circle
        className="df-dot"
        cx="12"
        cy="10"
        r="1"
        fill="currentColor"
        stroke="none"
        style={{ animationDelay: ".15s" }}
      />
      <circle
        className="df-dot"
        cx="15"
        cy="10"
        r="1"
        fill="currentColor"
        stroke="none"
        style={{ animationDelay: ".3s" }}
      />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1-1" />
    </>
  ),
} satisfies Record<string, ReactNode>;

const FEATURES: { icon: keyof typeof I; title: string; text: string }[] = [
  {
    icon: "push",
    title: "Push notifications",
    text: "Timely, segmented nudges that bring people back, not spam.",
  },
  {
    icon: "offline",
    title: "Offline mode",
    text: "Works on a bad connection and syncs when it's back.",
  },
  {
    icon: "camera",
    title: "Camera & scanning",
    text: "Photos, documents, QR and barcode scanning built in.",
  },
  {
    icon: "gps",
    title: "Maps & location",
    text: "Live tracking, geofencing and nearby search.",
  },
  {
    icon: "bio",
    title: "Biometric login",
    text: "Face ID and fingerprint sign-in, secure and instant.",
  },
  {
    icon: "pay",
    title: "In-app payments",
    text: "Apple Pay, Google Pay, cards, wallets and subscriptions.",
  },
  {
    icon: "chat",
    title: "Real-time chat",
    text: "Messaging, support chat and live updates.",
  },
  {
    icon: "link",
    title: "Deep links",
    text: "Links that open the right screen, from email, ads or SMS.",
  },
];

const TONES = [
  "bg-ultra text-white",
  "bg-white text-ink ring-1 ring-ink/10",
  "bg-sun text-ink",
  "bg-white text-ink ring-1 ring-ink/10",
  "bg-white text-ink ring-1 ring-ink/10",
  "bg-plasma text-ink",
  "bg-white text-ink ring-1 ring-ink/10",
  "bg-lilac text-ink",
];

/** Mobile App: the device features we build in, as a grid of live icons. */
export function DeviceFeatures({ label }: { label: string }) {
  return (
    <section className="relative py-20 sm:py-28">
      <SectionReveal />
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="Device features" />
            <h2
              className="display mt-5 max-w-[14ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              Everything the phone can do
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-2 sm:text-lg">
            The features that make an app worth installing instead of a
            bookmarked website. We build them natively, on both platforms.
          </p>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {FEATURES.map((f, i) => (
            <li
              key={f.title}
              data-rv={i % 4}
              data-inview
              className={`df-tile group flex flex-col sm:min-h-56 justify-between rounded-[1.75rem] p-6 transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1 sm:p-7 ${TONES[i]}`}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-12 w-12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {I[f.icon]}
              </svg>
              <div className="mt-5 sm:mt-8">
                <h3
                  className="font-display text-xl font-black uppercase leading-none tracking-[-0.02em]"
                  style={{ fontVariationSettings: '"wdth" 104' }}
                >
                  {f.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed opacity-85">
                  {f.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
