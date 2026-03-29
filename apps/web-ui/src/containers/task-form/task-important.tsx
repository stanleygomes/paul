import { TaskImportantToggle } from "../../components/task-important-toggle";
import { FormField } from "./form-field";

interface TaskImportantProps {
  isImportant: boolean;
  onToggle: () => void;
}

export function TaskImportant({ isImportant, onToggle }: TaskImportantProps) {
  return (
    <FormField label="Is it an important task?" noBox={true}>
      <TaskImportantToggle isImportant={isImportant} onToggle={onToggle} />
    </FormField>
  );
}
