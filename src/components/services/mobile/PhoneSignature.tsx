"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { reducedMotion } from "@/lib/gsap";

type OS = "ios" | "android";

const SCREENS = [
  {
    title: "Onboarding that converts",
    text: "Three short screens, then straight into the app. Sign-in with Apple, Google or phone number, never a long form.",
  },
  {
    title: "A home people come back to",
    text: "Personalised content, fast search and categories, cached so it opens instantly, even offline.",
  },
  {
    title: "Detail screens that sell",
    text: "Big imagery, clear options and one obvious action. Native gestures and haptics make it feel right.",
  },
  {
    title: "Native payments & push",
    text: "Apple Pay or Google Pay in one tap, then a push notification when the order is ready.",
  },
];

/* ── Screens ──────────────────────────────────────────────────────────── */

function PayButton({ os }: { os: OS }) {
  return (
    <span
      className={`flex h-10 items-center justify-center gap-1 bg-ink text-sm font-semibold text-white transition-[border-radius] duration-500 ${
        os === "ios" ? "rounded-xl" : "rounded-full"
      }`}
    >
      {os === "ios" ? "Apple Pay" : "Google Pay"}
    </span>
  );
}

function Btn({ os, children }: { os: OS; children: ReactNode }) {
  return (
    <span
      className={`flex h-10 items-center justify-center bg-ultra text-sm font-semibold text-white transition-[border-radius] duration-500 ${
        os === "ios" ? "rounded-xl" : "rounded-full"
      }`}
    >
      {children}
    </span>
  );
}

function Screen({ i, os }: { i: number; os: OS }) {
  if (i === 0)
    return (
      <div className="flex h-full flex-col justify-between bg-sun px-5 pb-6 pt-4">
        <span className="label text-ink/70">Welcome</span>
        <div className="grid place-items-center">
          <div className="grid h-36 w-36 place-items-center rounded-full bg-white/60">
            <div className="h-20 w-16 rotate-6 rounded-2xl bg-plasma shadow-lg" />
          </div>
        </div>
        <div>
          <p className="font-display text-2xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-ink">
            Order ahead, skip the line
          </p>
          <div className="mt-3 flex gap-1.5">
            <span className="h-1.5 w-6 rounded-full bg-ink" />
            <span className="h-1.5 w-1.5 rounded-full bg-ink/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-ink/30" />
          </div>
          <div className="mt-5">
            <Btn os={os}>Get started</Btn>
          </div>
        </div>
      </div>
    );
  if (i === 1)
    return (
      <div className="flex h-full flex-col gap-3 bg-white px-4 pt-3">
        <p
          className={`font-display font-black text-ink transition-all duration-500 ${
            os === "ios" ? "text-2xl" : "text-xl"
          }`}
        >
          Good morning
        </p>
        <span
          className={`flex h-9 items-center bg-frost px-3 text-xs text-ink-2 transition-[border-radius] duration-500 ${
            os === "ios" ? "rounded-xl" : "rounded-full"
          }`}
        >
          Search menu
        </span>
        <div className="flex gap-1.5">
          {["All", "Coffee", "Bakery", "Deals"].map((c, k) => (
            <span
              key={c}
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${k === 0 ? "bg-ink text-white" : "bg-frost text-ink"}`}
            >
              {c}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {["bg-lilac", "bg-plasma/70", "bg-sun", "bg-ultra/70"].map((c, k) => (
            <div key={c} className="rounded-2xl bg-frost p-2">
              <div className={`aspect-square rounded-xl ${c}`} />
              <span className="mt-1.5 block h-1.5 w-4/5 rounded-full bg-ink/70" />
              <span className="mt-1 block h-1.5 w-1/2 rounded-full bg-ink/25" />
              <span className="sr-only">Item {k + 1}</span>
            </div>
          ))}
        </div>
      </div>
    );
  if (i === 2)
    return (
      <div className="flex h-full flex-col bg-white">
        <div className="relative h-44 bg-gradient-to-br from-plasma to-ultra">
          <span className="absolute left-3 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/80 text-sm text-ink">
            {os === "ios" ? "‹" : "←"}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 px-4 pt-3">
          <p className="font-display text-lg font-black uppercase leading-none text-ink">
            Iced latte
          </p>
          <p className="text-[11px] text-ink-2">Double shot, oat milk</p>
          <div className="flex gap-1.5">
            {["S", "M", "L"].map((z) => (
              <span
                key={z}
                className={`grid h-7 w-9 place-items-center rounded-lg text-[11px] font-semibold ${z === "M" ? "bg-ink text-white" : "bg-frost text-ink"}`}
              >
                {z}
              </span>
            ))}
          </div>
          <div className="mt-auto pb-4">
            <Btn os={os}>Add to order · $4.50</Btn>
          </div>
        </div>
      </div>
    );
  return (
    <div className="relative flex h-full flex-col bg-frost px-4 pt-3">
      {/* push notification drops in */}
      <div className="ph-push absolute inset-x-3 top-2 z-10 flex items-center gap-2.5 rounded-2xl bg-white/95 p-2.5 shadow-lg ring-1 ring-ink/5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ultra text-xs font-black text-white">
          A
        </span>
        <span className="min-w-0">
          <span className="block text-[11px] font-bold text-ink">
            Your order is ready
          </span>
          <span className="block truncate text-[10px] text-ink-2">
            Pick it up at the counter
          </span>
        </span>
      </div>
      <p className="mt-16 font-display text-lg font-black uppercase text-ink">
        Checkout
      </p>
      <div className="mt-3 grid gap-2 rounded-2xl bg-white p-3 text-[11px] text-ink">
        <span className="flex justify-between">
          <span>Iced latte (M)</span>
          <span>$4.50</span>
        </span>
        <span className="flex justify-between">
          <span>Croissant</span>
          <span>$3.20</span>
        </span>
        <span className="flex justify-between border-t border-ink/10 pt-2 font-bold">
          <span>Total</span>
          <span>$7.70</span>
        </span>
      </div>
      <div className="mt-auto pb-4">
        <PayButton os={os} />
      </div>
    </div>
  );
}

/* ── Phone chrome ─────────────────────────────────────────────────────── */

function StatusBar({ os }: { os: OS }) {
  return (
    <div className="relative flex h-9 shrink-0 items-center justify-between px-6 text-[11px] font-semibold text-ink">
      <span>9:41</span>
      {/* notch / punch-hole */}
      <span
        className={`absolute left-1/2 top-2 -translate-x-1/2 bg-ink transition-all duration-500 ease-[var(--ease-out-expo)] ${
          os === "ios" ? "h-6 w-24 rounded-full" : "h-3.5 w-3.5 rounded-full"
        }`}
      />
      <span className="flex items-center gap-1">
        <span className="h-2 w-3 rounded-sm bg-ink" />
        <span className="h-2 w-4 rounded-sm border border-ink" />
      </span>
    </div>
  );
}

function NavBar({ os, screen }: { os: OS; screen: number }) {
  const items = ["Home", "Search", "Orders", "Profile"];
  const active = screen === 3 ? 2 : screen === 0 ? -1 : 0;
  return (
    <div className="shrink-0 border-t border-ink/10 bg-white">
      <div className="flex h-12 items-center justify-around">
        {items.map((it, k) => (
          <span key={it} className="grid justify-items-center gap-0.5">
            <span
              className={`grid h-6 place-items-center transition-all duration-500 ${
                os === "android"
                  ? `w-12 rounded-full ${k === active ? "bg-lilac" : ""}`
                  : "w-6"
              }`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-sm ${k === active ? "bg-ultra" : "bg-ink/35"}`}
              />
            </span>
            <span
              className={`text-[8px] font-semibold ${k === active ? "text-ultra" : "text-ink-2"}`}
            >
              {it}
            </span>
          </span>
        ))}
      </div>
      <div className="flex h-5 items-center justify-center">
        {os === "ios" ? (
          <span className="h-1 w-24 rounded-full bg-ink" />
        ) : (
          <span className="flex gap-10 text-[10px] text-ink-2">
            <span>◁</span>
            <span>○</span>
            <span>□</span>
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Mobile App signature: one app, two platforms. A phone you can swipe through
 * four screens; the iOS/Android switch morphs platform details (notch, tab bar,
 * pay button, gestures) to show one codebase adapting natively.
 */
export function PhoneSignature() {
  const [os, setOs] = useState<OS>("ios");
  const [i, setI] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const box = useRef<HTMLDivElement>(null);

  const go = useCallback((n: number, user = true) => {
    if (user) touched.current = true;
    const el = track.current;
    const k = (n + SCREENS.length) % SCREENS.length;
    if (el)
      el.scrollTo({
        left: k * el.clientWidth,
        behavior: reducedMotion() ? "auto" : "smooth",
      });
    setI(k);
  }, []);

  // Keep the dot in sync with manual swipes.
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const k = Math.round(el.scrollLeft / el.clientWidth);
    if (k !== i) setI(k);
  };

  // Gentle auto-advance while in view, until the visitor takes over.
  useEffect(() => {
    const el = box.current;
    if (!el || reducedMotion()) return;
    let timer = 0;
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(el);
    timer = window.setInterval(() => {
      if (!visible || touched.current) return;
      setI((cur) => {
        const k = (cur + 1) % SCREENS.length;
        const t = track.current;
        if (t) t.scrollTo({ left: k * t.clientWidth, behavior: "smooth" });
        return k;
      });
    }, 3200);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div
      ref={box}
      className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8"
    >
      {/* Phone */}
      <div className="relative flex justify-center lg:col-span-5">
        <div
          aria-hidden="true"
          className="absolute inset-x-6 bottom-6 top-16 rounded-[3rem] bg-plasma sm:inset-x-16 lg:inset-x-4"
        />
        <div
          className={`relative w-[272px] bg-ink p-2.5 shadow-[0_40px_80px_-30px_rgba(14,11,36,0.7)] transition-[border-radius] duration-500 ease-[var(--ease-out-expo)] ${
            os === "ios" ? "rounded-[3rem]" : "rounded-[2.2rem]"
          }`}
        >
          <div
            className={`flex h-[540px] flex-col overflow-hidden bg-white transition-[border-radius] duration-500 ease-[var(--ease-out-expo)] ${
              os === "ios" ? "rounded-[2.5rem]" : "rounded-[1.7rem]"
            }`}
          >
            <StatusBar os={os} />
            <section
              ref={track}
              onScroll={onScroll}
              onPointerDown={() => {
                touched.current = true;
              }}
              // biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable region must be keyboard-reachable.
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") go(i + 1);
                else if (e.key === "ArrowLeft") go(i - 1);
                else return;
                e.preventDefault();
              }}
              aria-roledescription="carousel"
              aria-label="App screens"
              className="flex flex-1 snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {SCREENS.map((s, k) => (
                <div
                  key={s.title}
                  aria-hidden={k !== i}
                  className="h-full w-full shrink-0 snap-start"
                >
                  <Screen i={k} os={os} />
                </div>
              ))}
            </section>
            {i === 0 ? (
              <div className="flex h-5 shrink-0 items-center justify-center">
                {os === "ios" ? (
                  <span className="h-1 w-24 rounded-full bg-ink" />
                ) : (
                  <span className="flex gap-10 text-[10px] text-ink-2">
                    <span>◁</span>
                    <span>○</span>
                    <span>□</span>
                  </span>
                )}
              </div>
            ) : (
              <NavBar os={os} screen={i} />
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="lg:col-span-7">
        <fieldset className="inline-flex rounded-full bg-white p-1.5 ring-1 ring-ink/10">
          <legend className="sr-only">Platform</legend>
          {(["ios", "android"] as const).map((o) => (
            <label
              key={o}
              className={`relative cursor-pointer rounded-full px-6 py-3 font-display text-sm font-bold transition-colors duration-500 ${
                os === o ? "bg-ink text-white" : "text-ink hover:bg-frost"
              }`}
            >
              <input
                type="radio"
                name="phone-os"
                className="sr-only"
                checked={os === o}
                onChange={() => {
                  touched.current = true;
                  setOs(o);
                }}
              />
              {o === "ios" ? "iOS" : "Android"}
            </label>
          ))}
        </fieldset>
        <p className="mt-3 text-sm text-ink-2">
          Same codebase. Notch, navigation, gestures and payment button adapt to
          each platform automatically.
        </p>

        <ol className="mt-8 grid gap-2">
          {SCREENS.map((s, k) => (
            <li key={s.title}>
              <button
                type="button"
                aria-current={k === i ? "step" : undefined}
                onClick={() => go(k)}
                className={`w-full cursor-pointer rounded-[1.4rem] p-5 text-left transition-colors duration-500 ease-[var(--ease-smooth)] ${
                  k === i
                    ? "bg-ultra text-white"
                    : "bg-white text-ink ring-1 ring-ink/10 hover:ring-ink/30"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-sm font-black ${
                      k === i ? "bg-sun text-ink" : "bg-frost text-ink"
                    }`}
                  >
                    {k + 1}
                  </span>
                  <span className="font-display text-lg font-bold">
                    {s.title}
                  </span>
                </span>
                <span
                  className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-smooth)] ${
                    k === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <span className="overflow-hidden">
                    <span className="block pl-11 pt-2 text-[0.95rem] leading-relaxed text-white/85">
                      {s.text}
                    </span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
