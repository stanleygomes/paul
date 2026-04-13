"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { Theme } from "../../types/theme.type";

const THEME_KEY = "app-theme";
const AVAILABLE_THEMES: Exclude<Theme, "auto">[] = ["classic", "dark", "ice"];
const DEFAULT_LIGHT_THEME: Theme = "classic";
const DEFAULT_DARK_THEME: Theme = "dark";

/**
 * Removes all theme-related CSS classes from the document root element,
 * except for the default 'classic' theme which is the base.
 */
function clearRootThemeClasses() {
  const root = document.documentElement;
  AVAILABLE_THEMES.forEach((theme) => {
    if (theme !== "classic") {
      root.classList.remove(theme);
    }
  });
}

/**
 * Updates the document root element with the specified theme class.
 * It first clears existing theme classes before applying the new one.
 *
 * @param theme - The theme to be applied ('classic', 'dark', 'ice', or 'auto')
 */
function applyThemeToDocument(theme: Theme) {
  clearRootThemeClasses();

  const isSpecialTheme = theme !== "classic" && theme !== "auto";
  if (isSpecialTheme) {
    document.documentElement.classList.add(theme);
  }
}

/**
 * Handles changes to the system color scheme preference.
 *
 * @param e - The media query list event or object containing matches property.
 */
function handleSystemChange(e: MediaQueryListEvent | { matches: boolean }) {
  const newSystemTheme = e.matches ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
  applyThemeToDocument(newSystemTheme);
}

/**
 * Hook to manage and apply the application theme.
 * Handles persistence in localStorage and synchronization with system preferences.
 *
 * @returns An object containing the current theme and a function to update it.
 */
export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>(THEME_KEY, "auto");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (theme !== "auto") {
      applyThemeToDocument(theme);
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    handleSystemChange(mediaQuery);

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [theme, mounted]);

  return {
    theme: mounted ? theme : "auto",
    setTheme,
  };
}
