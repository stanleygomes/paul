"use client";

import { useSidebar } from "src/hooks/use-sidebar";
import { usePathname } from "next/navigation";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const { isOpen, mounted } = useSidebar();
  const pathname = usePathname();

  const isTasksPage = pathname === "/";

  if (!mounted) {
    return (
      <main className="min-h-screen transition-all duration-300">
        {children}
      </main>
    );
  }

  return (
    <main
      className={`min-h-screen transition-all duration-300 ${
        isOpen && isTasksPage ? "pl-0 lg:pl-72" : "pl-0"
      }`}
    >
      {children}
    </main>
  );
}
