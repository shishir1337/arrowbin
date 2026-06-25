import { ImageResponse } from "next/og";

// Raster brand logo (512×512) for schema.org logo/image — Google rich results don't
// accept SVG. Lime tile + black triangle "A" on white, matching the favicon/apple-icon.
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
        }}
      >
        <svg width="200" height="200" viewBox="0 0 64 64" aria-hidden="true">
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
    </div>,
    { width: 512, height: 512 },
  );
}
