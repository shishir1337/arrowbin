/**
 * One geometric, gently animated illustration per service (200×200 box). Colours
 * come from props so each art piece sits on its panel's colour band. Motion is
 * pure CSS (`.sa-*` in globals.css) and switches off under reduced motion.
 */
type Props = { slug: string; fg: string; accent: string; className?: string };

function Svg({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      {children}
    </svg>
  );
}

export function ServiceArt({ slug, fg, accent, className = "" }: Props) {
  const common = { className };

  switch (slug) {
    case "custom-software-development":
      return (
        <Svg {...common}>
          <path
            d="M70 55 30 100l40 45"
            stroke={fg}
            strokeWidth="16"
            strokeLinejoin="round"
          />
          <path
            d="m130 55 40 45-40 45"
            stroke={fg}
            strokeWidth="16"
            strokeLinejoin="round"
          />
          <path
            d="m112 40-24 120"
            stroke={accent}
            strokeWidth="16"
            strokeLinecap="round"
          />
          <rect
            className="sa-blink"
            x="140"
            y="150"
            width="26"
            height="10"
            fill={accent}
          />
        </Svg>
      );
    case "ecommerce-development":
      return (
        <Svg {...common}>
          <path d="M55 80h90l-8 80H63z" fill={fg} />
          <path
            d="M78 80V68a22 22 0 0 1 44 0v12"
            stroke={fg}
            strokeWidth="10"
          />
          <g className="sa-spin" style={{ transformOrigin: "100px 118px" }}>
            <circle cx="100" cy="30" r="12" fill={accent} />
            <circle cx="186" cy="118" r="9" fill={accent} />
            <circle cx="30" cy="150" r="7" fill={accent} />
          </g>
        </Svg>
      );
    case "mobile-app-development":
      return (
        <Svg {...common}>
          <rect
            x="44"
            y="36"
            width="72"
            height="130"
            rx="16"
            stroke={fg}
            strokeWidth="8"
          />
          <rect x="88" y="24" width="72" height="130" rx="16" fill={fg} />
          <rect
            className="sa-slide"
            x="100"
            y="48"
            width="48"
            height="12"
            rx="6"
            fill={accent}
          />
          <rect
            x="100"
            y="70"
            width="32"
            height="8"
            rx="4"
            fill={accent}
            opacity=".6"
          />
          <rect
            x="100"
            y="86"
            width="40"
            height="8"
            rx="4"
            fill={accent}
            opacity=".6"
          />
          <circle cx="124" cy="138" r="7" fill={accent} />
        </Svg>
      );
    case "saas-product-engineering":
      return (
        <Svg {...common}>
          <path
            className="sa-float"
            d="m100 120 70-30-70-30-70 30z"
            fill={fg}
            opacity=".35"
            style={{ animationDelay: "-2s" }}
          />
          <path
            className="sa-float"
            d="m100 100 70-30-70-30-70 30z"
            fill={fg}
            opacity=".65"
            style={{ animationDelay: "-1s" }}
          />
          <path className="sa-float" d="m100 80 70-30-70-30-70 30z" fill={fg} />
          <path
            d="m100 170 70-30M100 170l-70-30"
            stroke={accent}
            strokeWidth="8"
            strokeLinecap="round"
          />
        </Svg>
      );
    case "ui-ux-design":
      return (
        <Svg {...common}>
          {[0, 1, 2].flatMap((r) =>
            [0, 1, 2].map((c) => (
              <rect
                key={`${r}${c}`}
                x={36 + c * 46}
                y={36 + r * 46}
                width="36"
                height="36"
                rx="10"
                fill={r === 1 && c === 1 ? accent : fg}
                opacity={r === 1 && c === 1 ? 1 : 0.25 + ((r + c) % 3) * 0.2}
              />
            )),
          )}
          <path
            className="sa-cursor"
            d="m120 118 0 44 12-12 10 20 8-4-10-20h17z"
            fill={fg}
            stroke={accent}
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "ai-automation":
      return (
        <Svg {...common}>
          <g stroke={fg} strokeWidth="4" opacity=".6">
            <path d="M40 60 100 100M40 140l60-40M100 100l60-40M100 100l60 40M40 60l60-40M160 140l-60 40" />
          </g>
          {[
            [40, 60],
            [40, 140],
            [100, 20],
            [100, 180],
            [160, 60],
            [160, 140],
          ].map(([x, y], i) => (
            <circle
              key={`${x}-${y}`}
              className="sa-pulse"
              cx={x}
              cy={y}
              r="10"
              fill={fg}
              style={{ animationDelay: `${i * 0.25}s` }}
            />
          ))}
          <circle cx="100" cy="100" r="24" fill={accent} />
          <circle
            className="sa-ring"
            cx="100"
            cy="100"
            r="24"
            stroke={accent}
            strokeWidth="4"
          />
        </Svg>
      );
    case "cloud-devops-hosting":
      return (
        <Svg {...common}>
          <path
            d="M60 140a30 30 0 0 1 4-60 40 40 0 0 1 76-8 34 34 0 0 1 2 68z"
            fill={fg}
          />
          <g className="sa-rise">
            <path
              d="M100 150V96"
              stroke={accent}
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="m78 116 22-22 22 22"
              stroke={accent}
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <rect
            x="50"
            y="160"
            width="100"
            height="10"
            rx="5"
            fill={fg}
            opacity=".4"
          />
        </Svg>
      );
    default:
      return (
        <Svg {...common}>
          <circle
            className="sa-spin"
            cx="100"
            cy="100"
            r="62"
            stroke={fg}
            strokeWidth="18"
            strokeDasharray="20 12"
            style={{ transformOrigin: "100px 100px" }}
          />
          <circle cx="100" cy="100" r="30" fill={accent} />
          <path
            className="sa-dash"
            d="M20 104h40l10-24 16 48 12-36 8 12h74"
            stroke={fg}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
  }
}
