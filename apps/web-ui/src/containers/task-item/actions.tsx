import { useTranslation } from "react-i18next";
import { Trash2, Maximize2, ChevronRight, RotateCcw } from "lucide-react";
import type { Task } from "@done/entities";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@done/ui/components/ui/tooltip";

interface TaskItemActionsProps {
  task: Task;
  onDelete: (id: string) => void;
  onRestore?: (id: string) => void;
  onEnterZenMode?: (id: string) => void;
  onOpenDrawer: (task: Task) => void;
  isRecentlyDeleted?: boolean;
  className?: string;
}

export function TaskItemActions({
  task,
  onDelete,
  onRestore,
  onEnterZenMode,
  onOpenDrawer,
  isRecentlyDeleted,
  className = "",
}: TaskItemActionsProps) {
  const { t } = useTranslation();

  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="rounded-base border-2 border-border bg-[#ff8fab] dark:bg-[#ff8fab]/20 p-1.5 shadow-shadow transition-all hover:bg-[#ff6b8e] dark:hover:bg-[#ff6b8e]/30 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shrink-0 cursor-pointer"
            onClick={() => onDelete(task.id)}
            aria-label={t("task_item.actions.delete")}
          >
            <Trash2 size={16} />
          </button>
        </TooltipTrigger>
        <TooltipContent>{t("task_item.actions.delete")}</TooltipContent>
      </Tooltip>

      {isRecentlyDeleted && onRestore && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="shrink-0 rounded-base border-2 border-border bg-main text-main-foreground p-1.5 shadow-shadow transition-all hover:bg-main/80 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
              onClick={() => onRestore(task.id)}
              aria-label={t("task_item.actions.restore")}
            >
              <RotateCcw size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>{t("task_item.actions.restore")}</TooltipContent>
        </Tooltip>
      )}

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
