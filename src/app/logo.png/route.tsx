import { ImageResponse } from "next/og";
import { markSvg } from "@/components/brand/mark";

// Raster brand logo (512×512) for schema.org logo/image — Google rich results don't
// accept SVG. Ultraviolet tile + white arrowhead "A" + plasma bit on white.
export const dynamic = "force-static";

const glyph = `data:image/svg+xml;base64,${Buffer.from(markSvg({ fill: "#FFFFFF" })).toString("base64")}`;

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 360,
          height: 360,
          borderRadius: 86,
          background: "#3B2BFF",
        }}
      >
        {/* biome-ignore lint/performance/noImgElement: rendered by Satori, not the browser. */}
        <img src={glyph} width={236} height={236} alt="" />
      </div>
    </div>,
    { width: 512, height: 512 },
  );
}
