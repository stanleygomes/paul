import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import type { Task } from "@done/entities";

interface ZenSubtasksProps {
  subtasks: Task[];
}

export function ZenSubtasks({ subtasks }: ZenSubtasksProps) {
  const { t } = useTranslation();

  if (subtasks.length === 0) return null;

  return (
    <div className="w-full rounded-base border-4 border-border bg-secondary-background p-6 shadow-shadow">
      <h3 className="font-black text-xl mb-4 border-b-2 border-border pb-2 text-foreground">
        {t("zen_mode.sections.subtasks")}
      </h3>
      <div className="flex flex-col gap-3">
        {subtasks.map((subtask) => (
          <div key={subtask.id} className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-base border-2 border-border shrink-0 ${
                subtask.done
                  ? "bg-[#a7f3d0] dark:bg-[#a7f3d0]/30"
                  : "bg-zinc-100 dark:bg-zinc-800"
              }`}
            >
              {subtask.done && <Check className="w-4 h-4" strokeWidth={3} />}
            </div>
            <span
              className={`font-bold text-lg ${
                subtask.done
                  ? "text-foreground/40 line-through"
                  : "text-foreground"
              }`}
            >
              {subtask.content}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
