import { useEffect, useRef } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { GripVertical } from "lucide-react";
import type { Task } from "@models/task";
import { useDebouncedSave } from "../hooks/use-debounced-save";
import { AutoResizeTextarea } from "./auto-resize-textarea";

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
  const controls = useDragControls();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { save, flush } = useDebouncedSave(600);

  // Auto-focus when edit mode opens
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  function handleChange(value: string) {
    onEditingContentChange(value);
    save(() => {
      onUpdateEdit(task.id, value);
    });
  }

  function handleBlur() {
    flush(() => {
      onUpdateEdit(task.id, editingContent);
    });
    onCloseEdit();
  }

  return (
    <Reorder.Item
      value={task}
      dragListener={false}
      dragControls={controls}
      className="rounded-base border-2 border-black bg-white p-4 shadow-shadow"
    >
      <div className="flex items-start gap-3">
        <div
          className="mt-1.5 shrink-0 touch-none cursor-grab text-gray-400 active:cursor-grabbing hover:text-black"
          onPointerDown={(e) => controls.start(e)}
          tabIndex={0}
          role="button"
          aria-label="Drag to reorder task"
        >
          <GripVertical size={16} />
        </div>

        <button
          type="button"
          className={`mt-0.5 h-8 w-8 shrink-0 rounded-base border-2 border-black text-sm font-black transition-all active:scale-90 ${
            task.done ? "bg-[#a7f3d0]" : ""
          }`}
          onClick={() => onToggle(task.id)}
          aria-label={task.done ? "Mark as not done" : "Mark as done"}
        >
          {task.done ? "✓" : ""}
        </button>

        <div className="flex-1 overflow-hidden">
          {isEditing ? (
            <AutoResizeTextarea
              ref={inputRef}
              value={editingContent}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              rows={1}
              className="w-full resize-none overflow-hidden rounded-base border-2 border-black bg-[#fffaf0] px-3 py-1 text-lg font-semibold leading-[1.75rem] outline-none"
            />
          ) : (
            <p
              className={`cursor-text whitespace-pre-wrap break-words py-1 text-lg font-semibold leading-[1.75rem] ${
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
          className="mt-1 rounded-base border-2 border-black bg-[#ff8fab] px-2 py-1 text-xs font-bold shadow-shadow transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </Reorder.Item>
  );
}
