import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg hover:bg-accent-hover",
  secondary:
    "border border-border bg-surface text-text hover:border-accent hover:text-accent",
  ghost: "text-text hover:bg-surface-2",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  className?: string;
  children: ReactNode;
};

function classes(variant: Variant, size: Size, className: string) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

/** Link-styled-as-button. Use for navigation/CTAs. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  children,
  external,
}: CommonProps & { href: string; external?: boolean }) {
  const content = (
    <>
      {children}
      {icon ? <Icon name={icon} size={18} /> : null}
    </>
  );
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes(variant, size, className)}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes(variant, size, className)}>
      {content}
    </Link>
  );
}

/** Native button. Use for actions (form submit, toggles). */
export function Button({
  variant = "primary",
  size = "md",
  icon,
  className = "",
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classes(variant, size, className)} {...props}>
      {children}
      {icon ? <Icon name={icon} size={18} /> : null}
    </button>
  );
}
