"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export function useAuth() {
  const [token, setToken] = useLocalStorage<string | null>("app-token", null);
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "app-refresh-token",
    null,
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const login = (accessToken: string, refresh: string) => {
    setToken(accessToken);
    setRefreshToken(refresh);
  };

  const logout = () => {
    setToken(null);
    setRefreshToken(null);
  };

  return {
    token: mounted ? token : null,
    refreshToken: mounted ? refreshToken : null,
    login,
    logout,
    isAuthenticated: !!(mounted && token),
    isLoaded: mounted,
  };
}
