import { ReactNode } from "react";
import { cn } from "@paul/ui/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "yellow" | "blue" | "red";
  icon?: ReactNode;
}

export function Badge({
  children,
  className,
  variant = "default",
  icon,
}: BadgeProps) {
  const variants = {
    default: "bg-secondary-background text-foreground",
    yellow: "bg-main text-main-foreground",
    blue: "bg-[#88aaee] text-black",
    red: "bg-[#ff6b6b] text-white",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-base border-2 border-border px-2.5 py-1 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_var(--border)]",
        variants[variant],
        className,
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </div>
  );
}
