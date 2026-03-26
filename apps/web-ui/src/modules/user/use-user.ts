"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import type { User } from "@models/user";

export function useUser() {
  const [user] = useLocalStorage<User | null>("done-user", null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return { user: mounted ? user : null };
}
