"use client";

import "../modules/i18n/config";

import type { ReactNode } from "react";
import { useTheme } from "@modules/theme/use-theme";
import { TooltipProvider } from "@done/ui/components/ui/tooltip";
import { Toaster } from "@done/ui";
import { NotificationWatcher } from "@containers/notifications/watcher";

import { SidebarProvider } from "../hooks/use-sidebar";

export function Providers({ children }: { children: ReactNode }) {
  useTheme();
  return (
    <SidebarProvider>
      <TooltipProvider>
        <NotificationWatcher />
        {children}
        <Toaster />
      </TooltipProvider>
    </SidebarProvider>
  );
}
