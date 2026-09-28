import type { ReactNode } from "react";
import { SectionLabel } from "@/components/home/SectionLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";

/* Mini interface mockups: pure CSS/SVG, animated on card hover (.bg-card). */

function Dashboard() {
  const bars = [38, 62, 45, 80, 58, 92, 70];
  return (
    <div className="grid h-full grid-cols-[1fr_auto] gap-3">
      <div className="flex items-end gap-1.5 rounded-xl bg-white/15 p-3">
        {bars.map((h, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: static bars.
            key={i}
            className="bg-bar flex-1 origin-bottom rounded-t-md bg-sun"
            style={{ height: `${h}%`, transitionDelay: `${i * 40}ms` }}
          />
        ))}
      </div>
      <div className="grid w-20 gap-2">
        {["+24%", "1.2k", "98%"].map((v) => (
          <span
            key={v}
            className="grid place-items-center rounded-xl bg-white/15 font-display text-sm font-black text-white"
          >
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}

function AdminTable() {
  const rows = [
    ["#1042", "Approved", "bg-ultra"],
    ["#1043", "Pending", "bg-sun"],
    ["#1044", "Approved", "bg-ultra"],
    ["#1045", "Review", "bg-plasma"],
  ];
  return (
    <div className="grid h-full content-center gap-1.5 rounded-xl bg-white p-3 ring-1 ring-ink/10">
      {rows.map(([id, st, c], i) => (
        <div
          key={id}
          className="bg-row flex items-center justify-between rounded-lg bg-frost px-3 py-1.5 font-mono text-[11px] text-ink"
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          <span>{id}</span>
          <span className="h-1.5 w-16 rounded-full bg-ink/15" />
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] ${c} ${c === "bg-ultra" ? "text-white" : "text-ink"}`}
          >
            {st}
          </span>
        </div>
      ))}
    </div>
  );
}

function Automation() {
  return (
    <svg viewBox="0 0 240 110" className="h-full w-full" aria-hidden="true">
      <path
        className="bg-dash"
        d="M40 55 H100 M140 55 H200 M120 35 V14"
        stroke="#0E0B24"
        strokeWidth="3"
        fill="none"
        strokeDasharray="6 6"
      />
      {[
        [20, 40, "#FFFFFF", "Form"],
        [100, 40, "#0E0B24", "Rule"],
        [180, 40, "#FFFFFF", "Email"],
      ].map(([x, y, f, t]) => (
        <g key={t as string}>
          <rect
            x={x as number}
            y={y as number}
            width="44"
            height="30"
            rx="9"
            fill={f as string}
          />
          <text
            x={(x as number) + 22}
            y={(y as number) + 19}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill={f === "#0E0B24" ? "#FFD23F" : "#0E0B24"}
            fontFamily="ui-monospace, monospace"
          >
            {t}
          </text>
        </g>
      ))}
      <circle className="bg-ping" cx="120" cy="10" r="7" fill="#FFFFFF" />
    </svg>
  );
}

function Integrations() {
  return (
    <svg viewBox="0 0 240 110" className="h-full w-full" aria-hidden="true">
      <rect x="90" y="30" width="60" height="50" rx="14" fill="#0E0B24" />
      <text
        x="120"
        y="60"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill="#FFD23F"
        fontFamily="ui-monospace, monospace"
      >
        API
      </text>
      {[
        [30, 20, "CRM"],
        [30, 90, "ERP"],
        [210, 20, "Pay"],
        [210, 90, "Ship"],
      ].map(([x, y, t], i) => (
        <g key={t as string}>
          <path
            className="bg-dash"
            d={`M${x} ${y} L${(x as number) < 120 ? 90 : 150} ${55}`}
            stroke="#0E0B24"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
          <circle cx={x as number} cy={y as number} r="16" fill="#FFFFFF" />
          <text
            x={x as number}
            y={(y as number) + 4}
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill="#0E0B24"
            fontFamily="ui-monospace, monospace"
          >
            {t}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Modernize() {
  return (
    <div className="grid h-full grid-cols-2 items-center gap-3">
      <div className="bg-old rounded-lg border-2 border-ink/40 bg-[#c9c9c9] p-2 font-mono text-[10px] text-ink/70">
        <div className="mb-1 h-2.5 rounded-sm bg-ink/40" />
        C:\LEGACY&gt;_
        <div className="mt-1 h-1.5 w-2/3 bg-ink/25" />
        <div className="mt-1 h-1.5 w-1/2 bg-ink/25" />
      </div>
      <div className="bg-new rounded-2xl bg-white p-2.5 shadow-[0_10px_20px_-12px_rgba(14,11,36,0.5)]">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-plasma" />
          <span className="h-2 w-2 rounded-full bg-sun" />
          <span className="h-2 w-2 rounded-full bg-ultra" />
        </div>
        <div className="mt-2 h-2.5 w-3/4 rounded-full bg-ultra" />
        <div className="mt-1.5 h-1.5 w-full rounded-full bg-ink/10" />
        <div className="mt-1.5 h-5 w-1/2 rounded-lg bg-sun" />
      </div>
    </div>
  );
}

function Portal() {
  const roles = [
    ["AD", "Admin", "bg-sun"],
    ["OP", "Ops", "bg-plasma"],
    ["CL", "Client", "bg-white"],
    ["PT", "Partner", "bg-lilac"],
  ];
  return (
    <div className="grid h-full grid-cols-4 items-center gap-3 rounded-2xl bg-white/15 p-4">
      {roles.map(([ini, role, c], i) => (
        <div
          key={role}
          className="bg-avatar grid justify-items-center gap-2 rounded-xl bg-white/10 px-2 py-3"
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          <span
            className={`grid h-12 w-12 place-items-center rounded-full font-display text-sm font-black text-ink ${c}`}
          >
            {ini}
          </span>
          <span className="font-mono text-[11px] font-semibold text-white">
            {role}
          </span>
          <span className="h-1.5 w-10 rounded-full bg-white/40" />
        </div>
      ))}
    </div>
  );
}

type Item = {
  title: string;
  text: string;
  tone: string;
  span: string;
  mock: ReactNode;
};

const ITEMS: Item[] = [
  {
    title: "Web platforms & dashboards",
    text: "The live view of your business: numbers, trends and alerts in one place instead of five spreadsheets.",
    tone: "bg-ultra text-white",
    span: "md:col-span-2 lg:col-span-7",
    mock: <Dashboard />,
  },
  {
    title: "Internal & admin tools",
    text: "Back-office apps your team actually enjoys: approvals, records, search and bulk actions.",
    tone: "bg-white text-ink ring-1 ring-ink/10",
    span: "lg:col-span-5",
    mock: <AdminTable />,
  },
  {
    title: "Workflow automation",
    text: "Rules that move work forward on their own: routing, reminders, documents and hand-offs.",
    tone: "bg-sun text-ink",
    span: "lg:col-span-4",
    mock: <Automation />,
  },
  {
    title: "API & system integrations",
    text: "Your CRM, ERP, payments and shipping talking to each other, reliably, with no re-typing.",
    tone: "bg-plasma text-ink",
    span: "lg:col-span-4",
    mock: <Integrations />,
  },
  {
    title: "Legacy modernization",
    text: "Old systems rebuilt on a modern stack, migrated in stages so the business never stops.",
    tone: "bg-lilac text-ink",
    span: "lg:col-span-4",
    mock: <Modernize />,
  },
  {
    title: "Enterprise & B2B portals",
    text: "Secure portals for clients, partners and staff, with role-based access and audit trails.",
    tone: "bg-ultra text-white",
    span: "md:col-span-2 lg:col-span-12",
    mock: <Portal />,
  },
];

/**
 * Custom Software: "What we build". A bento of the six deliverables, each with
 * a small interface mockup that comes alive on hover.
 */
export function BuildGallery({ label }: { label: string }) {
  return (
    <section className="relative py-20 sm:py-28">
      <SectionReveal />
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="Deliverables" />
            <h2
              className="display mt-5 max-w-[14ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              What we build for you
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-2 sm:text-lg">
            Six kinds of software we build most often. Many products combine two
            or three of them.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-12">
          {ITEMS.map((it, i) => (
            <li
              key={it.title}
              data-rv={i % 3}
              data-inview
              className={`bg-card group grid gap-6 overflow-hidden rounded-[1.75rem] p-6 transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1 sm:p-8 ${it.tone} ${it.span} ${
                it.span.includes("col-span-12")
                  ? "lg:grid-cols-2 lg:items-center"
                  : ""
              }`}
            >
              <div className="h-36 sm:h-40">{it.mock}</div>
              <div>
                <p className="label opacity-80">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="mt-3 font-display text-[clamp(1.4rem,2vw,1.9rem)] font-black uppercase leading-[0.95] tracking-[-0.03em]"
                  style={{ fontVariationSettings: '"wdth" 104' }}
                >
                  {it.title}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed opacity-85">
                  {it.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
