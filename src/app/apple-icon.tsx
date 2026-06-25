import { ImageResponse } from "next/og";

// iOS home-screen icon. Solid lime tile with the black Arrowbin triangle "A"
// mark (iOS rounds the corners itself, so we fill the full square).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#a3e635",
      }}
    >
      <svg width="104" height="104" viewBox="0 0 64 64" aria-hidden="true">
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
    </div>,
    { ...size },
  );
}
