import { useTranslation } from "react-i18next";
import type { Task } from "@paul/entities";
import { TaskToggle } from "../../components/task-toggle";

interface TaskStatusToggleProps {
  task: Task;
  onToggle: (id: string) => void;
}

export function TaskStatusToggle({ task, onToggle }: TaskStatusToggleProps) {
  const { t } = useTranslation();

  return (
    <>
      <TaskToggle task={task} onToggle={onToggle} className="mt-0" />
      <span className="text-lg font-bold">
        {task.done
          ? t("task_form.status.completed")
          : t("task_form.status.mark_completed")}
      </span>
    </>
  );
}
