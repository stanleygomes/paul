import { useTranslation } from "react-i18next";
import { Task } from "@paul/entities";
import { PinnedTaskCard } from "./pinned-task-card";

interface PinnedTasksProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onUnpin: (id: string) => void;
  onOpenDrawer: (task: Task) => void;
  onUpdateDetails: (id: string, details: any) => void;
}

export function PinnedTasks({
  tasks,
  onToggle,
  onUnpin,
  onOpenDrawer,
  onUpdateDetails,
}: PinnedTasksProps) {
  const { t } = useTranslation();

  if (tasks.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">
          {t("task_board.pinned_tasks.title")}
        </h2>
      </div>

      {tasks.map((task) => {
        return (
          <PinnedTaskCard
            key={task.id}
            task={task}
            onToggle={onToggle}
            onUnpin={onUnpin}
            onOpenDrawer={onOpenDrawer}
            onUpdateDetails={onUpdateDetails}
          />
        );
      })}
    </div>
  );
}
