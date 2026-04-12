import { ReactNode } from "react";
import { cn } from "@paul/ui/lib/utils";

interface LabelProps {
  children: ReactNode;
  className?: string;
}

export function Label({ children, className }: LabelProps) {
  return (
    <label
      className={cn(
        "flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground/60 select-none",
        "before:content-[''] before:block before:h-3 before:w-1 before:bg-main before:rounded-full",
        className,
      )}
    >
      {children}
    </label>
  );
}
