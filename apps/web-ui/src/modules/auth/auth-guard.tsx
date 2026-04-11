"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "./use-auth";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoaded } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isLoginPath = pathname.startsWith("/login");
  const isPublicPath =
    isLoginPath || pathname === "/privacy" || pathname === "/terms";

  useEffect(() => {
    if (isLoaded) {
      if (!isAuthenticated && !isPublicPath) {
        router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      } else if (isAuthenticated && isLoginPath) {
        const callbackUrl = searchParams.get("callbackUrl") || "/";
        router.push(callbackUrl);
      }
    }
  }, [
    isAuthenticated,
    isLoaded,
    isLoginPath,
    isPublicPath,
    router,
    pathname,
    searchParams,
  ]);

  if (!isLoaded) {
    return null;
  }

  if (!isAuthenticated && !isPublicPath) {
    return null;
  }

  return <>{children}</>;
}
