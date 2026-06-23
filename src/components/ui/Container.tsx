import type { ElementType, ReactNode } from "react";

/** Consistent max-width + responsive horizontal padding wrapper used site-wide. */
export function Container({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={`mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </Tag>
  );
}
