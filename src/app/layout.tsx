import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
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

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

/**
 * Runs before paint to (1) flag that JS is active and (2) apply the saved/system
 * theme, preventing a flash of the wrong color scheme.
 */
const themeScript = `(function(){try{document.documentElement.classList.add('js');var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/** biome-ignore lint/security/noDangerouslySetInnerHtml: tiny inline theme script must run before paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col bg-bg text-text">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
