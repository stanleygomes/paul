"use client";

import { useTheme, type Theme } from "@modules/theme/use-theme";

const THEME_OPTIONS: { value: Theme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "auto", label: "Auto" },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      {THEME_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => setTheme(option.value)}
          className={`rounded-base border-2 border-black px-4 py-2 text-sm font-bold transition-all ${
            theme === option.value
              ? "bg-main text-main-foreground translate-x-[2px] translate-y-[2px] shadow-none"
              : "bg-secondary-background shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
