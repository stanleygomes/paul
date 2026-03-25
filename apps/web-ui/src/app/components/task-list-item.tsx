import type { Task } from "@models/task";

interface TaskListItemProps {
  task: Task;
  isEditing: boolean;
  editingContent: string;
  onEditingContentChange: (value: string) => void;
  onToggle: (id: string) => void;
  onStartEdit: (task: Task) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
}

export function TaskListItem({
  task,
  isEditing,
  editingContent,
  onEditingContentChange,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}: TaskListItemProps) {
  return (
    <li className="rounded-base border-2 border-black bg-white p-4 shadow-shadow">
      <div className="flex items-start gap-3">
        <button
          type="button"
          className={`mt-1 h-6 w-6 shrink-0 rounded-base border-2 border-black text-sm font-black ${
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
              value={editingContent}
              onChange={(event) => onEditingContentChange(event.target.value)}
              className="w-full rounded-base border-2 border-black bg-[#fffaf0] px-3 py-2 text-sm font-medium outline-none"
            />
          ) : (
            <p
              className={`text-base font-semibold ${
                task.done ? "text-gray-500 line-through" : "text-black"
              }`}
            >
              {task.content}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                type="button"
                className="rounded-base border-2 border-black bg-[#bde0fe] px-2 py-1 text-xs font-bold shadow-shadow"
                onClick={() => onSaveEdit(task.id)}
              >
                Save
              </button>
              <button
                type="button"
                className="rounded-base border-2 border-black bg-[#f1f5f9] px-2 py-1 text-xs font-bold shadow-shadow"
                onClick={onCancelEdit}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              className="rounded-base border-2 border-black bg-[#cdb4db] px-2 py-1 text-xs font-bold shadow-shadow"
              onClick={() => onStartEdit(task)}
            >
              Edit
            </button>
          )}

          <button
            type="button"
            className="rounded-base border-2 border-black bg-[#ff8fab] px-2 py-1 text-xs font-bold shadow-shadow"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
