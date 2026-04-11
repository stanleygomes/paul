import { Reorder } from "framer-motion";
import { useMediaQuery } from "usehooks-ts";
import type { Task } from "@paul/entities";
import { EmptyState } from "./empty-state";
import { TaskListItem } from "../task-item";
import { Skeleton } from "@paul/ui";

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
  onRestore?: (id: string) => void;
  onReorder: (tasks: Task[]) => void;
  onOpenDrawer: (task: Task) => void;
  onUpdateDetails: (id: string, details: any) => void;
  onEnterZenMode?: (id: string) => void;
  showProject?: boolean;
  isLoading?: boolean;
  isRecentlyDeleted?: boolean;
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
  onRestore,
  onReorder,
  onOpenDrawer,
  onUpdateDetails,
  onEnterZenMode,
  showProject,
  isLoading,
  isRecentlyDeleted,
}: TaskListProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 pb-10">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[52px] w-full" />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <Reorder.Group
      axis="y"
      values={tasks}
      onReorder={onReorder}
      className="flex flex-col gap-3 pb-10"
    >
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
          onRestore={onRestore}
          onOpenDrawer={onOpenDrawer}
          onUpdateTaskDetails={onUpdateDetails}
          onEnterZenMode={onEnterZenMode}
          showProject={showProject}
          isRecentlyDeleted={isRecentlyDeleted}
          isDesktop={isDesktop}
        />
      ))}
    </Reorder.Group>
  );
}
