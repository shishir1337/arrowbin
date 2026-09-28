import type { Metadata, Viewport } from "next";
import { Anybody, Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Cursor } from "@/components/motion/Cursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";
import { defaultOgImage, pageAlternates, site, siteUrl } from "@/lib/site";
import "./globals.css";

// Production GA4 id, with the property hard-coded as a fallback so prod analytics
// works without extra env config. Only loaded in production builds — never in local
// dev — so it doesn't fire during development or tests.
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
  // Not preloaded: the headline is hidden behind its intro reveal while this
  // loads, so preloading only competed with the main text for bandwidth.
  preload: false,
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
  // Small labels only; not worth a high-priority preload.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Software Development Company`,
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
  alternates: {
    ...pageAlternates("/"),
    // Site-wide RSS auto-discovery so feed readers find it from any page.
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Software Development Company`,
    description: site.description,
    url: siteUrl,
    locale: "en_US",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Arrowbinllc",
    creator: "@Arrowbinllc",
    title: `${site.name} — Software Development Company`,
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
 * Runs before paint: flags that JS is active, and skips the homepage preloader for
 * the rest of the session once it has played (so it never flashes on return visits).
 */
const themeScript = `(function(){try{var d=document.documentElement;d.classList.add('js');if(sessionStorage.getItem('ab-preloaded')||matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('no-preload');}catch(e){}})();`;

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
      <body className="flex min-h-dvh flex-col bg-bg text-text">
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
