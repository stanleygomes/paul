import { useTranslation } from "react-i18next";
import { Trash2, Maximize2, ChevronRight } from "lucide-react";
import type { Task } from "@models/task";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@done/ui/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@done/ui/components/ui/alert-dialog";

interface TaskItemActionsProps {
  task: Task;
  onDelete: (id: string) => void;
  onEnterZenMode?: (id: string) => void;
  onOpenDrawer: (task: Task) => void;
}

export function TaskItemActions({
  task,
  onDelete,
  onEnterZenMode,
  onOpenDrawer,
}: TaskItemActionsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-start gap-2">
      <AlertDialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className="rounded-base border-2 border-border bg-[#ff8fab] dark:bg-[#ff8fab]/20 p-1.5 shadow-shadow transition-all hover:bg-[#ff6b8e] dark:hover:bg-[#ff6b8e]/30 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shrink-0 cursor-pointer"
                aria-label={t("task_item.actions.delete")}
              >
                <Trash2 size={16} />
              </button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent>{t("task_item.actions.delete")}</TooltipContent>
        </Tooltip>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("task_item.delete_confirm.title")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("task_item.delete_confirm.description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t("task_item.delete_confirm.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(task.id)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {t("task_item.delete_confirm.confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {onEnterZenMode && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="shrink-0 rounded-base border-2 border-border bg-[#a7f3d0] dark:bg-[#a7f3d0]/20 p-1.5 text-foreground shadow-shadow transition-all hover:bg-[#86efac] dark:hover:bg-[#86efac]/30 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
              onClick={() => onEnterZenMode(task.id)}
              aria-label={t("task_item.actions.zen_mode")}
            >
              <Maximize2 size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>{t("task_item.actions.zen_mode")}</TooltipContent>
        </Tooltip>
      )}

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="shrink-0 rounded-base border-2 border-border bg-secondary-background p-1.5 text-foreground/40 shadow-shadow transition-all hover:bg-main hover:text-main-foreground active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
            onClick={() => onOpenDrawer(task)}
            aria-label={t("task_item.actions.details")}
          >
            <ChevronRight size={16} />
          </button>
        </TooltipTrigger>
        <TooltipContent>{t("task_item.actions.details")}</TooltipContent>
      </Tooltip>
    </div>
  );
}
