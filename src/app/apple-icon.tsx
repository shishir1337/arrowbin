import { ImageResponse } from "next/og";
import { markSvg } from "@/components/brand/mark";

// iOS home-screen icon: ultraviolet tile, white arrowhead "A", plasma bit.
// iOS rounds the corners itself, so the tile fills the full square.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const glyph = `data:image/svg+xml;base64,${Buffer.from(markSvg({ fill: "#FFFFFF" })).toString("base64")}`;

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#3B2BFF",
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: rendered by Satori, not the browser. */}
      <img src={glyph} width={116} height={116} alt="" />
    </div>,
    { ...size },
  );
}
