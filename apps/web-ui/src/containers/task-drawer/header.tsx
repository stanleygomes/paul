import { useTranslation } from "react-i18next";
import { DrawerHeader, DrawerTitle, DrawerDescription } from "@done/ui";

export function TaskDrawerHeader() {
  const { t } = useTranslation();

  return (
    <DrawerHeader className="border-b-2 border-border px-6 py-4 text-left shrink-0">
      <DrawerTitle className="text-xl font-black">
        {t("task_drawer.title")}
      </DrawerTitle>
      <DrawerDescription className="sr-only">
        {t("task_drawer.description")}
      </DrawerDescription>
    </DrawerHeader>
  );
}
