"use client";

import { useTopMenu } from "../../hooks/use-top-menu";
import { usePathname } from "next/navigation";

export default function MenuTop() {
  const { leftContent, rightContent } = useTopMenu();
  const pathname = usePathname();

  const isLogin = pathname === "/login";
  const isLanding = pathname === "/landing";

  if (isLogin || isLanding) return null;
  if (!leftContent && !rightContent) return null;

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-[100] px-2 pt-safe-top bg-gradient-to-b from-background/80 to-transparent backdrop-blur-[2px]">
      <div className="flex items-center justify-between h-20 pointer-events-none">
        <div className="pointer-events-auto transition-transform active:scale-95">
          {leftContent}
        </div>
        <div className="pointer-events-auto transition-transform active:scale-95">
          {rightContent}
        </div>
      </div>
    </div>
  );
}
