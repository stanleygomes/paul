import {
  User,
  Palette,
  Languages,
  // Bell,
  Timer,
  ShieldCheck,
} from "lucide-react";
import { SettingsMenuItem } from "../types/settings-menu.type";

export const SETTINGS_MENU_ITEMS: SettingsMenuItem[] = [
  {
    href: "/settings/account",
    labelKey: "settings.account",
    icon: User,
    color: "bg-blue-500",
    showUserEmail: true,
  },
  {
    href: "/settings/theme",
    labelKey: "settings.theme",
    icon: Palette,
    color: "bg-purple-500",
  },
  {
    href: "/settings/language",
    labelKey: "settings.language.title",
    icon: Languages,
    color: "bg-green-500",
  },
  // {
  //   href: "/settings/notifications",
  //   labelKey: "settings.notifications",
  //   icon: Bell,
  //   color: "bg-red-500",
  // },
  {
    href: "/settings/pomodoro",
    labelKey: "settings.pomodoro.title",
    icon: Timer,
    color: "bg-orange-500",
  },
  {
    href: "/settings/legal",
    labelKey: "settings.legal.title",
    icon: ShieldCheck,
    color: "bg-gray-500",
  },
];

export const LEGAL_MENU_ITEMS = [
  {
    href: "/privacy",
    titleKey: "settings.legal.privacy",
    descKey: "settings.legal.privacy_desc",
  },
  {
    href: "/terms",
    titleKey: "settings.legal.terms",
    descKey: "settings.legal.terms_desc",
  },
];
