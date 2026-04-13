import { Monitor, Moon, Sun, Snowflake } from "lucide-react";
import { ThemeOption } from "../types/theme-option.type";

export const THEME_OPTIONS: ThemeOption[] = [
  {
    value: "classic",
    labelKey: "settings.themes.classic",
    icon: Sun,
    descriptionKey: "settings.themes.classic_description",
  },
  {
    value: "ice",
    labelKey: "settings.themes.ice",
    icon: Snowflake,
    descriptionKey: "settings.themes.ice_description",
  },
  {
    value: "dark",
    labelKey: "settings.themes.dark",
    icon: Moon,
    descriptionKey: "settings.themes.dark_description",
  },
  {
    value: "auto",
    labelKey: "settings.themes.auto",
    icon: Monitor,
    descriptionKey: "settings.themes.auto_description",
  },
];
