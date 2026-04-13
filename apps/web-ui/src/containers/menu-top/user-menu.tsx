"use client";

import { UserAvatar } from "@components/user-avatar";
import { SyncStatusBadge } from "../sync/sync-status-badge";

interface UserMenuProps {
  className?: string;
}

export function UserMenu({ className }: UserMenuProps) {
  return (
    <div className="relative">
      <UserAvatar className={className} />
      <SyncStatusBadge />
    </div>
  );
}
