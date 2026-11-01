import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// The web app manifest (name, icon and colours for "Add to Home screen"), at
// the same URL and with the same content as when it was app/manifest.ts.
// A route handler since 1 Nov 2026 because the file convention also puts
// <link rel="manifest"> in every page's <head>, where Chrome fetched it at
// Medium priority right after the HTML, and PageSpeed listed it in "Network
// dependency tree". The link is now added once the page has loaded, by
// src/components/layout/ManifestLink.tsx; nothing needs the manifest before then.
export const dynamic = "force-static";

const manifest: MetadataRoute.Manifest = {
  name: `${site.name} | Software Development Company`,
  short_name: site.name,
  description: site.description,
  start_url: "/",
  display: "standalone",
  background_color: "#F1F2F7",
  theme_color: "#3B2BFF",
  icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
};

export function GET() {
  return new Response(JSON.stringify(manifest), {
    headers: { "Content-Type": "application/manifest+json" },
  });
}
