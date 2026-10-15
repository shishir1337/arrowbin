import type { Metadata, Viewport } from "next";
import { Anybody, Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Cursor } from "@/components/motion/Cursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { JsonLd } from "@/components/ui/JsonLd";
import { feedAlternate, ogLocale, xHandle } from "@/lib/metadata";
import {
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";
import { defaultOgImage, site, siteUrl } from "@/lib/site";
import "./globals.css";

// Production GA4 id, with the property hard-coded as a fallback so prod analytics
// works without extra env config. Only loaded in production builds (never in local
// dev), so it doesn't fire during development or tests.
const gaId =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_GA_ID || "G-ZZ3NJCZVMZ"
    : "";
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

// Display: Anybody's variable width axis (50–150) powers the kinetic type.
const anybody = Anybody({
  variable: "--font-anybody",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
  // Preloaded (15 Oct 2026). Every page sets above-the-fold text in this face,
  // so the browser fetches it before first paint either way. Discovered from
  // the stylesheet, a font request gets "VeryHigh" priority, which Lighthouse's
  // simulation counts as render-blocking for FCP (58 KB here); a preloaded
  // font gets "High" and does not. Preloading also lets it land before first
  // paint more often, which removes the headline swap shift (desktop CLS on
  // /about and /blog).
  preload: true,
});

// Bengali fallback for the display face, for the "গ তে গয়না" project name.
// A 3 KB file subset to exactly that name's glyphs (Anek Bangla 800, 112% wide)
// instead of the 400+ KB full script; the unicode-range means it is only ever
// fetched when Bengali characters appear, and anything else falls back to the
// system Bengali font.
const anekBangla = localFont({
  src: "../assets/fonts/anek-bangla-goyna.woff2",
  variable: "--font-bangla",
  weight: "800",
  display: "swap",
  preload: false,
  declarations: [
    { prop: "unicode-range", value: "U+0980-09FF" },
    { prop: "font-stretch", value: "112%" },
  ],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  // Preloaded: the mono labels sit above the fold (breadcrumbs, hero meta), and
  // a preloaded font is not counted as render-blocking by Lighthouse's FCP
  // simulation (see Anybody above). Dropping the preload was measured to add
  // 0.15 to 0.3 s of simulated mobile FCP with no LCP gain.
  preload: true,
  // With next/font's default fallback (Arial scaled to Geist Mono's average
  // lower-case width, far too wide for the capitals in labels) the
  // service-page breadcrumb wrapped to two lines, then snapped to one when
  // Geist Mono arrived (CLS 0.139). These fallbacks are system monospace faces
  // scaled to Geist Mono's exact 0.6em advance (@font-face rules in
  // globals.css), so a late swap moves nothing.
  adjustFontFallback: false,
  fallback: ["ab-mono-a", "ab-mono-b", "ab-mono-c", "ab-mono-arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Software Development Company`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "software development company",
    "custom software development",
    "web development agency",
    "mobile app development",
    "saas development",
    "ai automation",
    "Arrowbin",
  ],
  authors: [{ name: site.legalName, url: siteUrl }],
  creator: site.legalName,
  publisher: site.legalName,
  // RSS auto-discovery only. No canonical here: a page without its own
  // `alternates` (the 404) would inherit the homepage canonical. Every
  // indexable page sets its canonical itself (see `pageShare` in lib/metadata).
  alternates: { types: feedAlternate },
  // Site-wide fallback, used as is only by pages that set no `openGraph` of
  // their own (the 404). No `url`, so it never claims the homepage URL.
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Software Development Company`,
    description: site.description,
    locale: ogLocale,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    site: xHandle,
    creator: xHandle,
    title: `${site.name} | Software Development Company`,
    description: site.description,
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: googleSiteVerification
    ? { google: googleSiteVerification }
    : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F1F2F7",
};

/**
 * Runs before paint: flags that JS is active, so CSS can pre-position
 * elements that JS will animate in.
 */
const themeScript = `document.documentElement.classList.add('js');`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anybody.variable} ${anekBangla.variable} ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/** biome-ignore lint/security/noDangerouslySetInnerHtml: tiny inline theme script must run before paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* suppressHydrationWarning: browser extensions (ColorZilla's
          cz-shortcut-listen, Grammarly, etc.) add attributes to <body> before
          React loads. It only covers this tag's own attributes. */}
      <body
        className="flex min-h-dvh flex-col bg-bg text-text"
        suppressHydrationWarning
      >
        <SmoothScroll />
        <Cursor />
        <JsonLd
          data={[
            organizationSchema(),
            websiteSchema(),
            ...localBusinessSchema(),
          ]}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-ultra focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="relative flex-1">
          {children}
        </main>
        <Footer />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
