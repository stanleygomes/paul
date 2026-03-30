import { useEffect, useRef } from "react";
import type { Task } from "@models/task";
import { FormField } from "./form-field";

interface TaskSubtasksProps {
  subtasks: Task["subtasks"];
  onAddSubtask: () => void;
  onToggleSubtask: (id: string) => void;
  onUpdateSubtaskTitle: (id: string, title: string) => void;
}

import { useTranslation } from "react-i18next";

export function TaskSubtasks({
  subtasks,
  onAddSubtask,
  onToggleSubtask,
  onUpdateSubtaskTitle,
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
        <button
          type="button"
          className="rounded-base cursor-pointer border-2 border-border bg-main text-main-foreground px-2 py-1 text-xs font-bold shadow-shadow transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
          onClick={onAddSubtask}
        >
          {t("task_form.buttons.add_subtask")}
        </button>
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
              value={subtask.title}
              onChange={(e) => onUpdateSubtaskTitle(subtask.id, e.target.value)}
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
