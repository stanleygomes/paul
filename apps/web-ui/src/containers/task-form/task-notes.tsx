import { FormField } from "./form-field";

interface TaskNotesProps {
  notes: string;
  onUpdateNotes: (notes: string) => void;
}

export function TaskNotes({ notes, onUpdateNotes }: TaskNotesProps) {
  return (
    <FormField label="Notes">
      <textarea
        value={notes}
        onChange={(e) => onUpdateNotes(e.target.value)}
        rows={4}
        className="w-full resize-y rounded-base border-2 border-border bg-secondary-background px-3 py-2 outline-none"
        placeholder="Write notes about this task"
      />
    </FormField>
  );
}
