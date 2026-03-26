"use client";

import type { ReactNode } from "react";
import { useTheme } from "@modules/theme/use-theme";

export function Providers({ children }: { children: ReactNode }) {
  useTheme();
  return <>{children}</>;
}
