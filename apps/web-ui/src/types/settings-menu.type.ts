import { LucideIcon } from "lucide-react";

export interface SettingsMenuItem {
  href: string;
  labelKey: string;
  icon: LucideIcon;
  color: string;
  showUserEmail?: boolean;
}
