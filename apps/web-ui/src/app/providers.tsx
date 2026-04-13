"use client";

import "../modules/i18n/config";

import type { ReactNode } from "react";
import { useTheme } from "@modules/theme/use-theme";
import { TooltipProvider } from "@paul/ui/components/ui/tooltip";
import { Toaster } from "@paul/ui";
import { NotificationWatcher } from "@containers/notifications/watcher";

import { SidebarProvider } from "../modules/menu-layout/use-sidebar";
import { SyncProvider } from "../modules/sync/sync-provider";
import { setupHttpClient } from "@modules/http/http-client-setup";
import { TopMenuProvider } from "../modules/menu-layout/use-top-menu";

setupHttpClient();

export function Providers({ children }: { children: ReactNode }) {
  useTheme();
  return (
    <SyncProvider>
      <SidebarProvider>
        <TopMenuProvider>
          <TooltipProvider>
            <NotificationWatcher />
            {children}
            <Toaster />
          </TooltipProvider>
        </TopMenuProvider>
      </SidebarProvider>
    </SyncProvider>
  );
}
