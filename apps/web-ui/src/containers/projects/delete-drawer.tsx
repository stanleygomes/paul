import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@paul/ui";
import { AlertCircle } from "lucide-react";
import { Project } from "@paul/entities";
import { useTranslation } from "react-i18next";

interface ProjectDeleteDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
  onConfirm: () => void;
}

export default function ProjectDeleteDrawer({
  open,
  onOpenChange,
  project,
  onConfirm,
}: ProjectDeleteDrawerProps) {
  const { t } = useTranslation();

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="bottom">
      <DrawerContent className="bg-background flex flex-col pt-4 max-w-2xl mx-auto focus:outline-none">
        <DrawerHeader className="px-6 pb-4 pt-2 text-left shrink-0">
          <DrawerTitle className="text-2xl font-black">
            {t("projects.delete.title")}
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-6">
          <p className="text-xl font-bold mb-3">
            {t("projects.delete.confirm_question")}
            <strong className="bg-black text-white px-2 py-0.5 rounded-lg mx-1">
              &quot;{project?.name}&quot;
            </strong>
            ?
          </p>
          <div className="bg-red-100 dark:bg-red-500/20 border-2 border-red-500 text-red-600 dark:text-red-400 p-4 rounded-xl font-bold mb-10 flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{t("projects.delete.warning")}</span>
          </div>

          <div className="flex gap-4 pb-4">
            <button
              onClick={() => onOpenChange(false)}
              className="flex-1 bg-secondary-background border-2 border-border text-foreground py-4 rounded-xl font-bold text-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              {t("projects.delete.cancel")}
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-500 border-2 border-border text-white py-4 rounded-xl font-bold text-xl hover:bg-red-600 transition-colors cursor-pointer"
            >
              {t("projects.delete.confirm")}
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
