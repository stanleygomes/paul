"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { UserAvatar } from "../../components/user-avatar";
import { Menu as MenuIcon, X } from "lucide-react";
import { MenuItem } from "./items";
import { MENU_LINKS } from "../../constants/menu-links";

function renderMenuLinks(
  pathname: string,
  deviceAspect: "mobile" | "desktop",
  onClick?: () => void,
) {
  return MENU_LINKS.map((link) => (
    <MenuItem
      key={link.href}
      href={link.href}
      label={link.label}
      variant={deviceAspect}
      isActive={pathname === link.href}
      onClick={onClick}
    />
  ));
}

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="fixed right-4 top-4 z-50 flex items-center gap-2 md:gap-4 bg-white/80 dark:bg-black/80 backdrop-blur-md px-3 py-2 rounded-full border-2 border-black dark:border-white/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] transition-all">
        <div className="hidden md:flex items-center gap-4 px-1">
          {renderMenuLinks(pathname, "desktop")}
        </div>

        <UserAvatar className="h-10 w-10" />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-black dark:text-white cursor-pointer"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/20 backdrop-blur-sm transition-all animate-in fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute right-4 top-20 w-48 bg-white dark:bg-[#1a1a1a] border-2 border-black dark:border-white/20 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] overflow-hidden animate-in slide-in-from-top-2 focus-within:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col p-2">
              {renderMenuLinks(pathname, "mobile", () => setIsOpen(false))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
