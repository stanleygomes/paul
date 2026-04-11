"use client";

import { useSidebar } from "@modules/menu-layout/use-sidebar";
import { usePathname } from "next/navigation";
import { SIDEBAR_PATHS } from "@constants/sidebar";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const { isOpen, mounted } = useSidebar();
  const pathname = usePathname();

  const isSidebarPage = SIDEBAR_PATHS.includes(pathname);

  if (!mounted) {
    return (
      <main className="min-h-screen pt-safe-top transition-all duration-300">
        {children}
      </main>
    );
  }

  return (
    <main
      className={`min-h-screen pt-safe-top transition-all duration-300 ${
        isOpen && isSidebarPage ? "pl-0 lg:pl-72" : "pl-0"
      }`}
    >
      {children}
    </main>
  );
}
