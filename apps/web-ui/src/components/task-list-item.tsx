import { useEffect, useRef } from "react";
import type { Task } from "@models/task";

interface TaskListItemProps {
  task: Task;
  isEditing: boolean;
  editingContent: string;
  onEditingContentChange: (value: string) => void;
  onToggle: (id: string) => void;
  onStartEdit: (task: Task) => void;
  onUpdateEdit: (id: string, content: string) => void;
  onCloseEdit: () => void;
  onDelete: (id: string) => void;
}

export function TaskListItem({
  task,
  isEditing,
  editingContent,
  onEditingContentChange,
  onToggle,
  onStartEdit,
  onUpdateEdit,
  onCloseEdit,
  onDelete,
}: TaskListItemProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-focus when edit mode opens
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  function handleChange(value: string) {
    onEditingContentChange(value);

    // Debounce: wait 600ms after the user stops typing before saving
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onUpdateEdit(task.id, value);
    }, 600);
  }

  function handleBlur() {
    // Flush any pending debounced save immediately on blur
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
      onUpdateEdit(task.id, editingContent);
    }
    onCloseEdit();
  }

  return (
    <li className="rounded-base border-2 border-black bg-white p-4 shadow-shadow">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className={`h-6 w-6 shrink-0 rounded-base border-2 border-black text-sm font-black ${
            task.done ? "bg-[#a7f3d0]" : "bg-[#ffb3c6]"
          }`}
          onClick={() => onToggle(task.id)}
          aria-label={task.done ? "Mark as not done" : "Mark as done"}
        >
          {task.done ? "✓" : ""}
        </button>

        <div className="flex-1">
          {isEditing ? (
            <input
              ref={inputRef}
              value={editingContent}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              className="w-full rounded-base border-2 border-black bg-[#fffaf0] px-3 py-0 text-base font-semibold leading-[1.5rem] outline-none"
            />
          ) : (
            <p
              className={`cursor-text text-base font-semibold ${
                task.done ? "text-gray-500 line-through" : "text-black"
              }`}
              onClick={() => !task.done && onStartEdit(task)}
            >
              {task.content}
            </p>
          )}
        </div>

        <button
          type="button"
          className="rounded-base border-2 border-black bg-[#ff8fab] px-2 py-1 text-xs font-bold shadow-shadow"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
