import { ImageResponse } from "next/og";
import { getService, serviceSlugs } from "@/lib/services";
import { site } from "@/lib/site";

export const alt = "Arrowbin service";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  const title = service?.heading ?? service?.name ?? "Software Development";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background:
          "radial-gradient(circle at 22% 0%, #1c1c1c 0%, #0a0a0a 62%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "#a3e635",
          }}
        >
          <svg width="38" height="38" viewBox="0 0 64 64" aria-hidden="true">
            <path
              d="M32 13 53 51H11L32 13Z"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <path
              d="M21 41h22"
              stroke="#0a0a0a"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div style={{ fontSize: 36, fontWeight: 700 }}>{site.name}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 26, color: "#a3e635", letterSpacing: 2 }}>
          SERVICE
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
      </div>

      <div style={{ fontSize: 26, color: "#a1a1aa" }}>arrowbin.com</div>
    </div>,
    { ...size },
  );
}
