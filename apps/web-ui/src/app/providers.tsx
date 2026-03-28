"use client";

import type { ReactNode } from "react";
import { useTheme } from "@modules/theme/use-theme";
import { TooltipProvider } from "@done/ui/components/ui/tooltip";

export function Providers({ children }: { children: ReactNode }) {
  useTheme();
  return <TooltipProvider>{children}</TooltipProvider>;
}
