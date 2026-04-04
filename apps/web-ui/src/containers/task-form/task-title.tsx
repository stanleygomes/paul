import { forwardRef } from "react";
import type { Task } from "@paul/entities";
import { AutoResizeTextarea } from "../../components/auto-resize-textarea";

interface TaskTitleProps {
  task: Task;
  isEditing: boolean;
  editingContent: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  onStartEdit: (task: Task) => void;
}

export const TaskTitle = forwardRef<HTMLTextAreaElement, TaskTitleProps>(
  ({ task, isEditing, editingContent, onChange, onBlur, onStartEdit }, ref) => {
    return (
      <AutoResizeTextarea
        ref={ref}
        value={isEditing ? editingContent : task.content}
        onFocus={() => {
          if (!isEditing) {
            onStartEdit(task);
          }
        }}
        onChange={(e) => {
          if (!isEditing) onStartEdit(task);
          onChange(e.target.value);
        }}
        onBlur={onBlur}
        rows={1}
        className={`w-full resize-none overflow-hidden rounded-base border-2 border-border bg-secondary-background px-3 py-2 font-black text-2xl leading-tight outline-none transition-all ${
          task.done ? "text-foreground/50 line-through" : "text-foreground"
        }`}
      />
    );
  },
);

TaskTitle.displayName = "TaskTitle";
