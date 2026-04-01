import { useEffect, useRef } from "react";
import type { Task } from "@paul/entities";
import { FormField } from "./form-field";

interface TaskSubtasksProps {
  subtasks: Task[];
  onAddSubtask: () => void;
  onToggleSubtask: (id: string) => void;
  onUpdateSubtaskContent: (id: string, content: string) => void;
  onSuggestSubtasks?: () => void;
  isSuggesting?: boolean;
}

import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";

export function TaskSubtasks({
  subtasks,
  onAddSubtask,
  onToggleSubtask,
  onUpdateSubtaskContent,
  onSuggestSubtasks,
  isSuggesting,
}: TaskSubtasksProps) {
  const { t } = useTranslation();
  const lastSubtaskCount = useRef(subtasks.length);
  const listContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (subtasks.length > lastSubtaskCount.current) {
      const inputs = listContainerRef.current?.querySelectorAll("input");
      if (inputs && inputs.length > 0) {
        const lastInput = inputs[inputs.length - 1] as HTMLInputElement;
        lastInput.focus();
      }
    }
    lastSubtaskCount.current = subtasks.length;
  }, [subtasks.length]);

  return (
    <FormField
      label={t("task_form.labels.subtasks")}
      action={
        <div className="flex items-center gap-2">
          {onSuggestSubtasks && (
            <button
              type="button"
              className={`rounded-base cursor-pointer border-2 border-border bg-violet-500 dark:bg-violet-600/60 text-white flex items-center justify-center gap-1.5 px-3 h-7 shadow-shadow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold ring-violet-500/30 focus:ring-2`}
              onClick={onSuggestSubtasks}
              disabled={isSuggesting}
              title={t("task_form.buttons.breakdown_tooltip")}
            >
              <Sparkles
                className={`h-3.5 w-3.5 ${isSuggesting ? "animate-pulse" : ""}`}
              />
              <span>{t("task_form.buttons.breakdown")}</span>
            </button>
          )}
          <button
            type="button"
            className="rounded-base cursor-pointer border-2 border-border bg-main text-main-foreground px-2 py-1 text-xs font-bold shadow-shadow transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            onClick={onAddSubtask}
          >
            {t("task_form.buttons.add_subtask")}
          </button>
        </div>
      }
    >
      <div ref={listContainerRef} className="flex flex-col gap-2">
        {subtasks.map((subtask) => (
          <div key={subtask.id} className="flex items-center gap-2">
            <button
              type="button"
              className={`h-7 w-7 shrink-0 rounded-base border-2 border-border text-xs font-black ${
                subtask.done
                  ? "bg-[#a7f3d0] dark:bg-[#a7f3d0]/30"
                  : "bg-zinc-100 dark:bg-zinc-800"
              }`}
              onClick={() => onToggleSubtask(subtask.id)}
              aria-label={
                subtask.done
                  ? t("task_form.aria.mark_subtask_undone")
                  : t("task_form.aria.mark_subtask_done")
              }
            >
              {subtask.done ? "✓" : ""}
            </button>
            <input
              value={subtask.content}
              onChange={(e) =>
                onUpdateSubtaskContent(subtask.id, e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAddSubtask();
                }
              }}
              className="w-full rounded-base border-2 border-border bg-secondary-background px-2 py-1 text-sm outline-none"
              placeholder={t("task_form.placeholders.subtask_title")}
            />
          </div>
        ))}
      </div>
    </FormField>
  );
}
