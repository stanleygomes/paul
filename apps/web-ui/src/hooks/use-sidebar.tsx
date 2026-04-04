"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  mounted: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useLocalStorage("app-left-menu-open", false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, mounted }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
