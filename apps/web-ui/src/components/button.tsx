"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "danger" | "secondary";
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  isLoading = false,
  loadingText,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-main text-white",
    danger: "bg-red-500 text-white",
    secondary: "bg-secondary-background text-foreground",
  };

  const isButtonDisabled = disabled || isLoading;

  return (
    <button
      disabled={isButtonDisabled}
      className={`flex items-center justify-center gap-2 rounded-xl border-2 border-border p-4 font-black uppercase tracking-tighter transition-all shadow-[4px_4px_0px_0px_var(--border)] active:scale-95 disabled:opacity-70 disabled:grayscale disabled:cursor-not-allowed ${
        !isButtonDisabled &&
        "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
      } ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText && <span>{loadingText}</span>}
        </>
      ) : (
        children
      )}
    </button>
  );
}
