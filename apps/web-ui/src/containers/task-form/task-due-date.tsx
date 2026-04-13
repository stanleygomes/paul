import { useTranslation } from "react-i18next";
import { TaskDatePicker } from "@components/task-date-picker";
import { TaskTimeInput } from "@components/task-time-input";
import { FormField } from "./form-field";

interface TaskDueDateProps {
  dueDate: string;
  dueTime: string;
  onUpdateDate: (date: string) => void;
  onUpdateTime: (time: string) => void;
}

export function TaskDueDate({
  dueDate,
  dueTime,
  onUpdateDate,
  onUpdateTime,
}: TaskDueDateProps) {
  const { t } = useTranslation();

  return (
    <FormField label={t("task_form.labels.due_date")}>
      <div className="flex flex-col gap-2">
        <TaskDatePicker
          dueDateStr={dueDate}
          onDateChange={onUpdateDate}
          className="bg-secondary-background w-full justify-start py-2 px-3"
        />
        <TaskTimeInput
          value={dueTime}
          onChange={onUpdateTime}
          className="bg-secondary-background w-full px-3 py-2"
        />
      </div>
    </FormField>
  );
}
