"use client";

import { UserProfileCard } from "@containers/settings/account";
import { useUser } from "@modules/user/use-user";

export default function AccountSettingsPage() {
  const { user } = useUser();

  return <UserProfileCard user={user} />;
}
