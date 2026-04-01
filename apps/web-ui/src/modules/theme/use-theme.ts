"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export type Theme = "light" | "dark" | "auto";

const THEME_KEY = "app-theme";

function applyTheme(isDark: boolean) {
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>(THEME_KEY, "auto");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (theme === "dark") {
      applyTheme(true);
      return;
    }

    if (theme === "light") {
      applyTheme(false);
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    applyTheme(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => applyTheme(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, mounted]);

  return { theme: mounted ? theme : "auto", setTheme };
}
