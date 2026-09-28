/**
 * Colour theme per service (by index), shared by the homepage services track,
 * the /services index and the service detail pages. Class strings are written
 * out in full so Tailwind picks them up.
 */
export type ServiceTheme = {
  /** Panel/background fill. */
  bg: string;
  /** Text colour on that fill. */
  text: string;
  /** Secondary text on that fill. */
  sub: string;
  /** Hover text colour for rows that flood with `bg` (index list). */
  hoverText: string;
  /** Artwork colours (hex, for SVG). */
  fg: string;
  accent: string;
};

export const SERVICE_THEMES: ServiceTheme[] = [
  {
    bg: "bg-ultra",
    text: "text-white",
    sub: "text-white/75",
    hoverText: "group-hover:text-white group-focus-visible:text-white",
    fg: "#FFFFFF",
    accent: "#FFD23F",
  },
  {
    bg: "bg-sun",
    text: "text-ink",
    sub: "text-ink/85",
    hoverText: "",
    fg: "#0E0B24",
    accent: "#FF4DA6",
  },
  {
    bg: "bg-plasma",
    text: "text-ink",
    sub: "text-ink/85",
    hoverText: "",
    fg: "#0E0B24",
    accent: "#FFFFFF",
  },
  {
    bg: "bg-white",
    text: "text-ink",
    sub: "text-ink-2",
    hoverText: "",
    fg: "#3B2BFF",
    accent: "#FF4DA6",
  },
  {
    bg: "bg-lilac",
    text: "text-ink",
    sub: "text-ink/85",
    hoverText: "",
    fg: "#3B2BFF",
    accent: "#FF6B3D",
  },
  {
    bg: "bg-flare",
    text: "text-ink",
    sub: "text-ink/85",
    hoverText: "",
    fg: "#0E0B24",
    accent: "#FFD23F",
  },
  {
    bg: "bg-ultra",
    text: "text-white",
    sub: "text-white/75",
    hoverText: "group-hover:text-white group-focus-visible:text-white",
    fg: "#FFFFFF",
    accent: "#FF4DA6",
  },
  {
    bg: "bg-sun",
    text: "text-ink",
    sub: "text-ink/85",
    hoverText: "",
    fg: "#3B2BFF",
    accent: "#FF4DA6",
  },
];

export const serviceTheme = (i: number) =>
  SERVICE_THEMES[i % SERVICE_THEMES.length];
