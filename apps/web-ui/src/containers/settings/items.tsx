"use client";

import { SETTINGS_MENU_ITEMS } from "@constants/settings-menu.constant";
import { useUser } from "@modules/user/use-user";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ListItem } from "@components/list-item";

export function SettingsItems() {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <div className="grid gap-4">
      {SETTINGS_MENU_ITEMS.map((item) => (
        <Link
          href={item.href}
          className="block no-underline active:scale-95 transition-transform"
          key={item.href}
        >
          <ListItem
            icon={item.icon}
            isHoverable
            iconBackgroundColor={item.color}
            title={t(item.labelKey)}
            description={
              item.showUserEmail && user?.email ? user.email : undefined
            }
          />
        </Link>
      ))}
    </div>
  );
}
