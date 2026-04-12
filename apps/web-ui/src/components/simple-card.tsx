import { ReactNode } from "react";

interface SimpleCardProps {
  children: ReactNode;
  isActive?: boolean;
  isHoverable?: boolean;
  className?: string;
}

function getCardStyles({
  isActive,
  isHoverable,
  className,
}: {
  isActive: boolean;
  isHoverable: boolean;
  className: string;
}) {
  const base =
    "flex flex-col p-6 rounded-xl border-2 border-border transition-all";

  if (isActive) {
    return `${base} bg-main/5 translate-x-[4px] translate-y-[4px] shadow-none ${className}`;
  }

  const stateClasses = [
    "bg-secondary-background",
    "shadow-[4px_4px_0px_0px_var(--border)]",
    "active:translate-x-[2px]",
    "active:translate-y-[2px]",
    "active:shadow-none",
  ];

  if (isHoverable) {
    stateClasses.push(
      "hover:translate-x-[4px]",
      "hover:translate-y-[4px]",
      "hover:shadow-none",
      "cursor-pointer",
    );
  }

  return `${base} ${stateClasses.join(" ")} ${className}`;
}

export function SimpleCard({
  children,
  isActive = false,
  isHoverable = false,
  className = "",
}: SimpleCardProps) {
  const styles = getCardStyles({ isActive, isHoverable, className });

  return <div className={styles}>{children}</div>;
}
