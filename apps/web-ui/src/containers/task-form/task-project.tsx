import { useTranslation } from "react-i18next";
import { TaskProjectSelector } from "@components/task-project-selector";
import { FormField } from "./form-field";

interface TaskProjectProps {
  projectId?: string;
  onUpdateProject: (projectId: string | undefined) => void;
}

export function TaskProject({ projectId, onUpdateProject }: TaskProjectProps) {
  const { t } = useTranslation();

  return (
    <FormField label={t("task_form.labels.project")}>
      <TaskProjectSelector
        value={projectId || "none"}
        onChange={(value) =>
          onUpdateProject(value === "none" ? undefined : value)
        }
        isVisible={true}
        className="w-full rounded-base border-2 border-border bg-secondary-background px-3 py-2 text-sm outline-none"
      />
    </FormField>
  );
}
