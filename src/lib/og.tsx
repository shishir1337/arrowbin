import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { markSvg } from "@/components/brand/mark";

/**
 * Shared Hyperchrome Open Graph card (1200×630): frost canvas, oversized colour
 * shapes, the mark, and the headline in Anybody Expanded Black. Used by the home,
 * service and blog OG routes so every share preview carries the same identity.
 */
export const ogSize = { width: 1200, height: 630 };

const glyph = `data:image/svg+xml;base64,${Buffer.from(markSvg({ fill: "#FFFFFF" })).toString("base64")}`;

export async function brandOg({
  eyebrow,
  title,
  footer = "arrowbin.com",
}: {
  eyebrow: string;
  title: string;
  footer?: string;
}) {
  const font = await readFile(
    join(process.cwd(), "src/assets/fonts/anybody-wide-black.ttf"),
  );
  const size = title.length > 60 ? 48 : title.length > 28 ? 58 : 76;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "#F1F2F7",
        color: "#0E0B24",
        fontFamily: "Anybody",
        overflow: "hidden",
      }}
    >
      {/* colour shapes */}
      <div
        style={{
          position: "absolute",
          right: -220,
          top: -200,
          width: 560,
          height: 560,
          borderRadius: 9999,
          background: "#3B2BFF",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 90,
          top: 290,
          width: 210,
          height: 210,
          borderRadius: 9999,
          background: "#FF4DA6",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 60,
          bottom: -80,
          width: 280,
          height: 200,
          borderRadius: 40,
          background: "#FFD23F",
          transform: "rotate(-12deg)",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 68,
              height: 68,
              borderRadius: 18,
              background: "#3B2BFF",
            }}
          >
            {/* biome-ignore lint/performance/noImgElement: rendered by Satori. */}
            <img src={glyph} width={46} height={46} alt="" />
          </div>
          <div style={{ fontSize: 40, letterSpacing: -1.5 }}>Arrowbin</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 18px",
              borderRadius: 999,
              background: "#0E0B24",
              color: "#FFD23F",
              fontSize: 22,
              letterSpacing: 2,
            }}
          >
            {eyebrow.toUpperCase()}
          </div>
          <div
            style={{
              fontSize: size,
              lineHeight: 0.98,
              letterSpacing: -2.5,
              maxWidth: 740,
              textTransform: "uppercase",
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ fontSize: 24, color: "#4A4766" }}>{footer}</div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [{ name: "Anybody", data: font, weight: 900, style: "normal" }],
    },
  );
}
