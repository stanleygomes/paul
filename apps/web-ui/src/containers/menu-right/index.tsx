"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { UserAvatar } from "../../components/user-avatar";
import { MobileToggle } from "./mobile-toggle";
import { MobileMenu } from "./mobile-menu";
import { MenuLinks } from "./menu-links";
import { SearchToggle } from "./search-toggle";

import { UserHints } from "../onboarding/user-hints";
import { SyncIndicator } from "../../components/sync-indicator";

export default function MenuRight() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSearchVisible = searchParams.get("search") === "true";

  const isLogin = pathname === "/login";
  const isLanding = pathname === "/landing";

  if (isLogin || isLanding) return null;

  const showSearch = pathname === "/";

  const toggleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (isSearchVisible) {
      params.delete("search");
    } else {
      params.set("search", "true");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="fixed right-4 top-4 z-50 flex items-center gap-2 md:gap-4 bg-white/80 dark:bg-black/80 backdrop-blur-md px-3 py-2 rounded-full border-2 border-black dark:border-white/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] transition-all">
        <SearchToggle
          isVisible={isSearchVisible}
          onToggle={toggleSearch}
          show={showSearch}
        />

        <SyncIndicator />

        <div className="hidden md:flex items-center gap-4 px-1">
          <MenuLinks pathname={pathname} variant="desktop" />
        </div>

        <UserHints />

        <UserAvatar className="h-10 w-10" />

        <MobileToggle isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      </div>

      <MobileMenu
        isOpen={isOpen}
        pathname={pathname}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
