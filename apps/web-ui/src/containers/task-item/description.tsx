import { forwardRef } from "react";
import { AutoResizeTextarea } from "../../components/auto-resize-textarea";
import type { Task } from "@paul/entities";

interface TaskItemDescriptionProps {
  task: Task;
  isEditing: boolean;
  editingContent: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  onStartEdit: (task: Task) => void;
}

export const TaskItemDescription = forwardRef<
  HTMLTextAreaElement,
  TaskItemDescriptionProps
>(({ task, isEditing, editingContent, onChange, onBlur, onStartEdit }, ref) => {
  return (
    <div className="flex-1 overflow-hidden">
      {isEditing ? (
        <AutoResizeTextarea
          ref={ref}
          value={editingContent}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          rows={1}
          className="w-full resize-none overflow-hidden rounded-base border-2 border-border bg-secondary-background px-3 py-1 text-lg font-semibold leading-[1.75rem] outline-none"
        />
      ) : (
        <p
          className={`cursor-text whitespace-pre-wrap break-words py-1 text-lg font-semibold leading-[1.75rem] ${
            task.done ? "text-foreground/50 line-through" : "text-foreground"
          }`}
          onClick={() => !task.done && onStartEdit(task)}
        >
          {task.content}
        </p>
      )}
    </div>
  );
});

TaskItemDescription.displayName = "TaskItemContent";
