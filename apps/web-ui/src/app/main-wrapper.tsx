"use client";

import { useSidebar } from "src/hooks/use-sidebar";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const { isOpen, mounted } = useSidebar();

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
        isOpen ? "pl-0 lg:pl-72" : "pl-0"
      }`}
    >
      {children}
    </main>
  );
}
