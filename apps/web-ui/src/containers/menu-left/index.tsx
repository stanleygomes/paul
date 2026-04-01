"use client";

import { useProjects } from "@modules/project/use-projects";
import { useSidebar } from "src/hooks/use-sidebar";
import { SidebarToggle } from "./sidebar-toggle";
import { AppLogo } from "./app-logo";
import { SidebarContent } from "./sidebar-content";
import { usePathname } from "next/navigation";

export default function MenuLeft() {
  const { isOpen, mounted } = useSidebar();
  const { projects } = useProjects();
  const pathname = usePathname();

  const SIDEBAR_PATHS = ["/", "/memories", "/plan", "/settings"];
  const isSidebarPage = SIDEBAR_PATHS.includes(pathname);

  if (!mounted || !isSidebarPage) return null;

  return (
    <>
      <SidebarContent projects={projects} />

      {!isOpen && (
        <div
          className={`fixed left-4 top-4 z-50 flex items-center gap-2 md:gap-4 bg-white/80 dark:bg-black/80 backdrop-blur-md px-3 py-2 rounded-full border-2 border-black dark:border-white/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] transition-all duration-300`}
        >
          <SidebarToggle />
          <AppLogo />
        </div>
      )}
    </>
  );
}
