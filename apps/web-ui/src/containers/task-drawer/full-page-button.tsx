import { useTranslation } from "react-i18next";
import { Maximize2 } from "lucide-react";

interface TaskDrawerFullPageProps {
  taskId: string;
  onClick: (id: string) => void;
}

export function TaskDrawerFullPageButton({
  taskId,
  onClick,
}: TaskDrawerFullPageProps) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-2 rounded-base border-2 border-border bg-secondary-background py-3 text-base font-bold shadow-shadow transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
      onClick={() => {
        onClick(taskId);
      }}
    >
      <Maximize2 className="h-5 w-5" /> {t("task_drawer.buttons.full_page")}
    </button>
  );
}
