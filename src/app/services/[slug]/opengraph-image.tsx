import { brandOg, ogSize } from "@/lib/og";
import { getService, serviceSlugs } from "@/lib/services";

export const alt = "Arrowbin service";
export const size = ogSize;
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
  return brandOg({
    eyebrow: "Service",
    title: service?.heading ?? service?.name ?? "Software Development",
  });
}
