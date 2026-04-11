"use client";

import { usePathname } from "next/navigation";
import { MobileNavbar } from "./mobile-navbar";

export function MenuBottom() {
  const pathname = usePathname();

  const isLogin = pathname.startsWith("/login");
  const isSettings = pathname.startsWith("/settings");
  const isLanding = pathname === "/landing";

  if (isLogin || isLanding || isSettings) return null;

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-white/80 dark:bg-black/80 backdrop-blur-md px-1.5 py-1 rounded-full border-2 border-black dark:border-white/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] transition-all whitespace-nowrap">
      <MobileNavbar pathname={pathname} />
    </div>
  );
}
