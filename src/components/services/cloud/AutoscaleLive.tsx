"use client";

import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/home/SectionLabel";
import { reducedMotion } from "@/lib/gsap";

const POINTS = 60;
const MAX_SERVERS = 12;
/** Requests/sec one server handles comfortably. */
const PER_SERVER = 500;
const CHART_MAX = 6400;
const W = 600;
const H = 200;

const baseLoad = (i: number) =>
  900 + 350 * Math.sin(i / 7) + 180 * Math.sin(i / 2.3);

/**
 * Cloud: autoscaling, live. Traffic streams across a chart; the server rack
 * scales out when load climbs and back in when it falls, so response time
 * stays flat and you only pay for what runs. "Traffic spike" injects a surge.
 */
export function AutoscaleLive({ label }: { label: string }) {
  const [series, setSeries] = useState<number[]>(() =>
    Array.from({ length: POINTS }, (_, i) => baseLoad(i)),
  );
  const [servers, setServers] = useState(3);
  const [spikeLeft, setSpikeLeft] = useState(0);
  const step = useRef(POINTS);
  const spike = useRef(0);
  const srv = useRef(3);
  const visible = useRef(false);
  const box = useRef<HTMLElement>(null);

  // Stream while on screen: ~6 updates per second.
  useEffect(() => {
    const el = box.current;
    if (!el || reducedMotion()) return;
    const io = new IntersectionObserver(([e]) => {
      visible.current = e.isIntersecting;
    });
    io.observe(el);
    const id = window.setInterval(() => {
      if (!visible.current || document.hidden) return;
      const i = step.current++;
      if (spike.current > 0) spike.current--;
      // Spike shape: fast rise, slower fall.
      const sp =
        spike.current > 0
          ? 2700 * Math.sin((Math.PI * (40 - spike.current)) / 40) ** 0.6
          : 0;
      const load = Math.max(
        250,
        baseLoad(i) + sp + (Math.random() - 0.5) * 160,
      );
      setSeries((s) => [...s.slice(1), load]);
      setSpikeLeft(spike.current);
      // Scale out quickly, scale in slowly (cooldown), like a real policy.
      const need = Math.min(
        MAX_SERVERS,
        Math.max(2, Math.ceil(load / (PER_SERVER * 0.7))),
      );
      if (need > srv.current) srv.current = Math.min(need, srv.current + 3);
      else if (need < srv.current && i % 4 === 0) srv.current -= 1;
      setServers(srv.current);
    }, 170);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, []);

  const load = series[series.length - 1];
  const capacity = servers * PER_SERVER;
  const util = Math.min(1, load / capacity);
  const latency = Math.round(90 + util ** 6 * 400);
  const cost = (servers * 0.19).toFixed(2);

  const x = (i: number) => (i / (POINTS - 1)) * W;
  const y = (v: number) => H - (Math.min(v, CHART_MAX) / CHART_MAX) * H;
  const line = series
    .map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`)
    .join("");
  const area = `${line}L${W},${H}L0,${H}Z`;

  return (
    <section ref={box} className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-[var(--gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={label} title="Autoscaling" />
            <h2
              className="display mt-5 max-w-[15ch] text-[clamp(2.2rem,4.6vw,4.6rem)] text-ink"
              style={{ ["--wdth" as string]: 100 }}
            >
              Ready for the spike, cheap at 3am
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-2 sm:text-lg">
            Servers are added the moment traffic climbs and removed when it
            drops. Hit the button and send a launch-day surge at it.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Chart */}
          <div className="flex flex-col rounded-[2rem] bg-frost p-5 sm:p-8 lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="flex items-center gap-2 label text-ink-2">
                <span aria-hidden="true" className="ai-dot text-plasma" />
                Live traffic
              </p>
              <button
                type="button"
                onClick={() => {
                  spike.current = 40;
                  setSpikeLeft(40);
                }}
                disabled={spikeLeft > 0}
                className="group inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-plasma px-5 text-sm font-bold text-ink shadow-[0_12px_30px_-12px_rgba(255,77,166,0.9)] transition-[translate,opacity] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 disabled:cursor-default disabled:opacity-60 disabled:hover:translate-y-0"
              >
                <span aria-hidden="true">⚡</span>
                {spikeLeft > 0 ? "Surge in progress…" : "Send a traffic spike"}
              </button>
            </div>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="none"
              className="mt-5 block h-48 w-full sm:h-64 lg:h-auto lg:min-h-64 lg:flex-1"
              role="img"
              aria-label={`Traffic chart, currently ${Math.round(load)} requests per second.`}
            >
              {[1, 2, 3].map((k) => (
                <line
                  key={k}
                  x1="0"
                  x2={W}
                  y1={(H / 4) * k}
                  y2={(H / 4) * k}
                  className="stroke-ink/10"
                  strokeDasharray="4 6"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              {/* capacity */}
              <path
                d={`M0,${y(capacity)}L${W},${y(capacity)}`}
                className="stroke-ultra transition-[d] duration-500"
                strokeWidth="2"
                strokeDasharray="8 6"
                vectorEffect="non-scaling-stroke"
              />
              <path d={area} className="fill-plasma/20" />
              <path
                d={line}
                fill="none"
                className="stroke-plasma"
                strokeWidth="3"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-2">
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-4 rounded-full bg-plasma" /> Requests /
                sec
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-0.5 w-4 border-t-2 border-dashed border-ultra" />{" "}
                Capacity
              </span>
            </div>
          </div>

          {/* Rack + stats */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <div className="rounded-[2rem] bg-ultra p-5 text-white sm:p-6">
              <div className="flex items-baseline justify-between">
                <p className="label text-white">Servers running</p>
                <p
                  className="font-display text-3xl font-black tabular-nums"
                  style={{ fontVariationSettings: '"wdth" 108' }}
                >
                  {servers}
                </p>
              </div>
              <ul className="mt-4 grid grid-cols-4 gap-2" aria-hidden="true">
                {Array.from({ length: MAX_SERVERS }, (_, i) => {
                  const on = i < servers;
                  return (
                    <li
                      // biome-ignore lint/suspicious/noArrayIndexKey: fixed rack slots.
                      key={i}
                      className={`relative flex h-10 items-center gap-1 rounded-lg px-2 transition-[background-color,opacity,scale] duration-500 ease-[var(--ease-out-expo)] ${
                        on
                          ? "scale-100 bg-white/12 opacity-100"
                          : "scale-90 bg-white/5 opacity-40"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                          on
                            ? util > 0.85
                              ? "bg-plasma"
                              : "bg-sun"
                            : "bg-white/30"
                        }`}
                      />
                      <span
                        className={`h-1 flex-1 rounded-full ${on ? "bg-white/40" : "bg-white/15"}`}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            <dl className="grid grid-cols-2 gap-3" aria-live="off">
              {[
                { k: "Response time", v: `${latency}ms`, hot: latency > 200 },
                {
                  k: "Load",
                  v: `${Math.round(util * 100)}%`,
                  hot: util > 0.85,
                },
                {
                  k: "Requests / sec",
                  v: Math.round(load).toLocaleString("en-US"),
                  hot: false,
                },
                { k: "Cost / hour", v: `$${cost}`, hot: false },
              ].map((m) => (
                <div key={m.k} className="rounded-2xl bg-frost px-4 py-3.5">
                  <dt className="text-xs font-semibold text-ink-2">{m.k}</dt>
                  <dd
                    className={`mt-1 font-display text-2xl font-black leading-none tabular-nums transition-colors duration-300 ${m.hot ? "text-[#C4380D]" : "text-ink"}`}
                    style={{ fontVariationSettings: '"wdth" 108' }}
                  >
                    {m.v}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="px-1 text-sm leading-relaxed text-ink-2">
              A simulation of a typical autoscaling policy: scale out fast,
              scale in slowly. With fixed servers you&apos;d either pay for 12
              all night or fall over at noon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
