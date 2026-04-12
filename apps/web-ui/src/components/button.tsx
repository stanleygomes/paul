"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "danger" | "secondary";
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-main text-white",
    danger: "bg-red-500 text-white",
    secondary: "bg-secondary-background text-foreground",
  };

  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-xl border-2 border-border p-4 font-black uppercase tracking-tighter transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-95 shadow-[4px_4px_0px_0px_var(--border)] ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
