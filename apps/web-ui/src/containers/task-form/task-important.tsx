import { useTranslation } from "react-i18next";
import { TaskImportantToggle } from "@components/task-important-toggle";
import { FormField } from "./form-field";

interface TaskImportantProps {
  isImportant: boolean;
  onToggle: () => void;
}

export function TaskImportant({ isImportant, onToggle }: TaskImportantProps) {
  const { t } = useTranslation();

  return (
    <FormField label={t("task_form.labels.is_important")} noBox={true}>
      <TaskImportantToggle isImportant={isImportant} onToggle={onToggle} />
    </FormField>
  );
}
