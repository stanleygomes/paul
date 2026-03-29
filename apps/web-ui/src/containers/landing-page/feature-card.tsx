import React from "react";

export function FeatureCard({
  title,
  description,
  icon: Icon,
  color,
}: {
  title: string;
  description: string;
  icon: any;
  color: string;
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-base border-4 border-border ${color} p-8 shadow-[8px_8px_0px_0px_var(--border)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-base border-4 border-border bg-background shadow-[4px_4px_0px_0px_var(--border)]">
        <Icon className="h-8 w-8 text-foreground" />
      </div>
      <h3 className="text-2xl font-black uppercase tracking-tight text-foreground">
        {title}
      </h3>
      <p className="text-sm font-bold leading-relaxed text-foreground/70">
        {description}
      </p>
    </div>
  );
}
