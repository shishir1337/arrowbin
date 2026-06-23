import { ImageResponse } from "next/og";

// Raster brand logo (512×512) for schema.org logo/image — Google rich results don't
// accept SVG. Lime tile + black arrow on white, matching the favicon/apple-icon.
export const dynamic = "force-static";

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
          width: 340,
          height: 340,
          borderRadius: 80,
          background: "#a3e635",
          color: "#0a0a0a",
          fontSize: 230,
          fontWeight: 700,
        }}
      >
        →
      </div>
    </div>,
    { width: 512, height: 512 },
  );
}
