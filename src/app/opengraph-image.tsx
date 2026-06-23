import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Arrowbin — Software Development Company";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
            color: "#0a0a0a",
            fontSize: 40,
          }}
        >
          →
        </div>
        <div style={{ fontSize: 40, fontWeight: 700 }}>{site.name}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          We build software that grows your business
        </div>
        <div style={{ fontSize: 30, color: "#a1a1aa", maxWidth: 880 }}>
          Custom software · Web & mobile apps · SaaS · AI automation
        </div>
      </div>

      <div style={{ fontSize: 26, color: "#a3e635" }}>arrowbin.com</div>
    </div>,
    { ...size },
  );
}
