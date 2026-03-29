import { ReactNode, HTMLAttributes } from "react";

interface TaskDetailBadgeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function TaskDetailBadge({
  children,
  className = "",
  title,
  ...props
}: TaskDetailBadgeProps) {
  return (
    <div
      className={`rounded-base border-2 border-border px-3 py-1 shadow-sm ${className}`}
      title={title}
      {...props}
    >
      {children}
    </div>
  );
}
