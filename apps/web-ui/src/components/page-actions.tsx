"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

export interface ActionItem {
  icon: LucideIcon | React.FC<any>;
  onClick: () => void;
  isActive?: boolean;
  label?: string;
}

interface PageActionsProps {
  actions: ActionItem[];
}

function Separator() {
  return <div className="w-[2px] h-4 bg-border/50 mx-1 flex-shrink-0" />;
}

export function PageActions({ actions }: PageActionsProps) {
  return (
    <div className="flex items-center bg-secondary-background border-2 border-border rounded-full p-1 mr-2 shadow-[2px_2px_0px_0px_var(--border)] overflow-hidden">
      {actions.map((action, index) => (
        <React.Fragment key={index}>
          <button
            onClick={action.onClick}
            aria-label={action.label}
            className={`p-2 rounded-full transition-colors flex items-center justify-center ${
              action.isActive
                ? "bg-main text-main-foreground shadow-[2px_2px_0px_0px_var(--border)] border-2 border-border"
                : "hover:bg-main hover:text-main-foreground border-2 border-transparent"
            } hover:bg-main hover:text-main-foreground active:scale-90`}
          >
            <action.icon className="w-5 h-5" />
          </button>
          {index < actions.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
}
