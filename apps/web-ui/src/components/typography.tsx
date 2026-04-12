"use client";

import { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  variant?: "h1" | "h2" | "h3" | "p" | "small" | "large";
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export function Typography({
  children,
  variant = "p",
  className = "",
  as,
}: TypographyProps) {
  const variants = {
    h1: "text-4xl font-black tracking-tight text-foreground",
    h2: "text-2xl font-black tracking-tight text-foreground",
    h3: "text-xl font-bold tracking-tight text-foreground",
    p: "text-base text-foreground/70",
    small: "text-sm text-foreground/50 font-medium",
    large: "text-lg font-bold text-foreground",
  };

  const Component = as || (variant.startsWith("h") ? (variant as any) : "p");

  return (
    <Component className={`${variants[variant]} ${className}`}>
      {children}
    </Component>
  );
}
