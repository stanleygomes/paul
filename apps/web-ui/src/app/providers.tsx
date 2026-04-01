"use client";

import "../modules/i18n/config";

import type { ReactNode } from "react";
import { useTheme } from "@modules/theme/use-theme";
import { TooltipProvider } from "@paul/ui/components/ui/tooltip";
import { Toaster } from "@paul/ui";
import { NotificationWatcher } from "@containers/notifications/watcher";

import { SidebarProvider } from "../hooks/use-sidebar";
import { SyncProvider } from "../modules/sync/sync-provider";

export function Providers({ children }: { children: ReactNode }) {
  useTheme();
  return (
    <SyncProvider>
      <SidebarProvider>
        <TooltipProvider>
          <NotificationWatcher />
          {children}
          <Toaster />
        </TooltipProvider>
      </SidebarProvider>
    </SyncProvider>
  );
}
