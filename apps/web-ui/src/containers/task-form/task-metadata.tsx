import { useTranslation } from "react-i18next";
import { formatDateTime } from "@paul/utils";
import type { Task } from "@paul/entities";

interface TaskMetadataProps {
  task: Task;
}

export function TaskMetadata({ task }: TaskMetadataProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2 rounded-base border-2 border-border bg-secondary-background p-4 text-xs text-secondary-foreground opacity-70">
      <div className="flex justify-between items-center">
        <span className="font-medium">
          {t("task_form.metadata.created_at")}
        </span>
        <span>{formatDateTime(task.createdAt)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium">
          {t("task_form.metadata.updated_at")}
        </span>
        <span>{formatDateTime(task.updatedAt)}</span>
      </div>
      {task.isDeleted && task.deletedAt && (
        <div className="flex justify-between items-center text-red-500 font-bold mt-1">
          <span>{t("task_form.metadata.deleted_at")}</span>
          <span>{formatDateTime(task.deletedAt)}</span>
        </div>
      )}
    </div>
  );
}
