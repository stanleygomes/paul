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
  onUpdateEdit: (id: string, content: string) => void;
  onCloseEdit: () => void;
  onDelete: (id: string) => void;
}

export function TaskList({
  tasks,
  editingTaskId,
  editingContent,
  onEditingContentChange,
  onToggle,
  onStartEdit,
  onUpdateEdit,
  onCloseEdit,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul className="flex flex-col gap-3 pb-10">
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          isEditing={editingTaskId === task.id}
          editingContent={editingContent}
          onEditingContentChange={onEditingContentChange}
          onToggle={onToggle}
          onStartEdit={onStartEdit}
          onUpdateEdit={onUpdateEdit}
          onCloseEdit={onCloseEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
