"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "./use-auth";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoaded } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const publicPaths = ["/login"];
  const isPublicPath = publicPaths.includes(pathname);

  useEffect(() => {
    if (isLoaded) {
      if (!isAuthenticated && !isPublicPath) {
        router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      } else if (isAuthenticated && isPublicPath) {
        const callbackUrl = searchParams.get("callbackUrl") || "/";
        router.push(callbackUrl);
      }
    }
  }, [isAuthenticated, isLoaded, isPublicPath, router, pathname, searchParams]);

  if (!isLoaded) {
    return null;
  }

  if (!isAuthenticated && !isPublicPath) {
    return null;
  }

  return <>{children}</>;
}
