import type { Task } from "@models/task";
import { EmptyState } from "./empty-state";
import { TaskListItem } from "./task-list-item";

interface TaskListProps {
  tasks: Task[];
  editingTaskId: string | null;
  editingContent: string;
  onEditingContentChange: (value: string) => void;
  onToggle: (id: string) => void;
  onStartEdit: (task: Task) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
}

export function TaskList({
  tasks,
  editingTaskId,
  editingContent,
  onEditingContentChange,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          isEditing={editingTaskId === task.id}
          editingContent={editingContent}
          onEditingContentChange={onEditingContentChange}
          onToggle={onToggle}
          onStartEdit={onStartEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
