import { brandOg, ogSize } from "@/lib/og";

export const alt = "Arrowbin — Software Development Company";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return brandOg({
    eyebrow: "Software development company",
    title: "Software that moves.",
  });
}
