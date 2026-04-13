import { LucideIcon } from "lucide-react";
import { Theme } from "./theme.type";

export interface ThemeOption {
  value: Theme;
  labelKey: string;
  icon: LucideIcon;
  descriptionKey: string;
}
