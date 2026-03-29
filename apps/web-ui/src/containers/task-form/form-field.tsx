import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
  noBox?: boolean;
}

export function FormField({
  label,
  children,
  className = "",
  action,
  noBox = false,
}: FormFieldProps) {
  const boxStyles = noBox
    ? ""
    : "rounded-base border-2 border-border bg-secondary-background p-4";

  return (
    <div className={`${boxStyles} ${className}`}>
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-sm font-black">{label}</label>
        {action}
      </div>
      {children}
    </div>
  );
}
