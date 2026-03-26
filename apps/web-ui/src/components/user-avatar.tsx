"use client";

import Link from "next/link";
import { useUser } from "@modules/user/use-user";

export function UserAvatar() {
  const { user } = useUser();
  const initial = user?.name?.[0]?.toUpperCase() ?? "G";
  const label = user?.name ?? "Guest";

  return (
    <Link
      href="/settings"
      className="flex items-center gap-2 rounded-base border-2 border-black bg-white px-3 py-1.5 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-black text-[#fef6d9]">
        {initial}
      </div>
      <span>{label}</span>
    </Link>
  );
}
