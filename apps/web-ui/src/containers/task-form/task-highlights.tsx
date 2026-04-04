import { useTranslation } from "react-i18next";
import { Maximize2, Star, CheckCircle2, CheckCircle, Pin } from "lucide-react";
import type { Task } from "@paul/entities";
import { cn } from "@paul/ui/lib/utils";

interface TaskHighlightsProps {
  task: Task;
  onToggle: (id: string) => void;
  onEnterZenMode?: (id: string) => void;
  onClose?: () => void;
  onUpdateDetails: (
    details: Partial<Pick<Task, "important" | "isPinned">>,
  ) => void;
}

export function TaskHighlights({
  task,
  onToggle,
  onEnterZenMode,
  onClose,
  onUpdateDetails,
}: TaskHighlightsProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => {
          if (onEnterZenMode && onClose) {
            onEnterZenMode(task.id);
            onClose();
          }
        }}
        disabled={!onEnterZenMode}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-base border-2 border-border p-4 transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:shadow-none shadow-shadow cursor-pointer",
          "bg-[#a7f3d0] dark:bg-[#00d696]/20 hover:bg-[#86efac] dark:hover:bg-[#00d696]/30",
          !onEnterZenMode && "opacity-50 cursor-not-allowed",
        )}
      >
        <Maximize2 className="h-6 w-6" />
        <span className="text-sm font-bold uppercase">
          {t("task_drawer.buttons.zen_mode")}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onUpdateDetails({ important: !task.important })}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-base border-2 border-border p-4 transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:shadow-none shadow-shadow cursor-pointer",
          task.important
            ? "bg-[#fef08a] dark:bg-[#facc15]/20 hover:bg-[#fde68a] dark:hover:bg-[#facc15]/30"
            : "bg-secondary-background hover:bg-main hover:text-white dark:hover:bg-main",
        )}
      >
        <Star className={cn("h-6 w-6", task.important && "fill-current")} />
        <span className="text-sm font-bold uppercase">
          {task.important
            ? t("task_form.buttons.unimportant")
            : t("task_form.buttons.important")}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onToggle(task.id)}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-base border-2 border-border p-4 transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:shadow-none shadow-shadow cursor-pointer",
          task.done
            ? "bg-[#bae6fd] dark:bg-[#38bdf8]/20 hover:bg-[#7dd3fc] dark:hover:bg-[#38bdf8]/30"
            : "bg-secondary-background hover:bg-main hover:text-white dark:hover:bg-main",
        )}
      >
        {task.done ? (
          <CheckCircle2 className="h-6 w-6" />
        ) : (
          <CheckCircle className="h-6 w-6" />
        )}
        <span className="text-sm font-bold uppercase">
          {task.done
            ? t("task_form.status.completed")
            : t("task_form.status.mark_completed")}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onUpdateDetails({ isPinned: !task.isPinned })}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-base border-2 border-border p-4 transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:shadow-none shadow-shadow cursor-pointer",
          task.isPinned
            ? "bg-[#e9d5ff] dark:bg-[#a78bfa]/20 hover:bg-[#ddd6fe] dark:hover:bg-[#a78bfa]/30"
            : "bg-secondary-background hover:bg-main hover:text-white dark:hover:bg-main",
        )}
      >
        <Pin
          className={cn(
            "h-6 w-6 transition-transform",
            task.isPinned && "fill-current rotate-45",
          )}
        />
        <span className="text-sm font-bold uppercase">
          {task.isPinned
            ? t("task_form.buttons.unpin")
            : t("task_form.buttons.pin")}
        </span>
      </button>
    </div>
  );
}
