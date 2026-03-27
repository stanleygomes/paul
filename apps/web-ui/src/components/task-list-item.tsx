import { Reorder, useDragControls } from "framer-motion";
import { ChevronRight, GripVertical, Maximize2 } from "lucide-react";
import type { Task } from "@models/task";
import { TaskItemContent } from "./task-item-content";
import { useProjects } from "@modules/todo/use-projects";

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
  onOpenDrawer: (task: Task) => void;
  onEnterZenMode?: (id: string) => void;
  showProject?: boolean;
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
  onOpenDrawer,
  onEnterZenMode,
  showProject,
}: TaskListItemProps) {
  const controls = useDragControls();
  const { projects } = useProjects();
  const project = task.projectId
    ? projects.find((p) => p.id === task.projectId)
    : null;
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.done,
  ).length;
  const hasDueDate = Boolean(task.dueDate);
  const dueDateLabel = hasDueDate
    ? `${task.dueDate}${task.dueTime ? ` ${task.dueTime}` : ""}`
    : "";

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

        <div className="flex-1 min-w-0">
          <TaskItemContent
            task={task}
            isEditing={isEditing}
            editingContent={editingContent}
            onEditingContentChange={onEditingContentChange}
            onToggle={onToggle}
            onStartEdit={onStartEdit}
            onUpdateEdit={onUpdateEdit}
            onCloseEdit={onCloseEdit}
            onDelete={onDelete}
          />

          <aside
            className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold"
            aria-label="Task metadata"
          >
            {showProject && project && (
              <span
                className="rounded-base border-2 border-black px-2 py-1 flex items-center gap-1 bg-[#fef6d9]"
                aria-label={`Project: ${project.name}`}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full border border-black"
                  style={{ backgroundColor: project.color }}
                />
                {project.name}
              </span>
            )}
            {task.important && (
              <span
                title="Important task"
                className="rounded-base border-2 border-black bg-[#ffe066] px-2 py-1"
              >
                ⭐
              </span>
            )}
            {hasDueDate && (
              <span
                className="rounded-base border-2 border-black bg-white px-2 py-1"
                aria-label={`Due date: ${dueDateLabel}`}
              >
                ⏰ {dueDateLabel}
              </span>
            )}
            {task.url && (
              <span
                title={task.url}
                className="rounded-base border-2 border-black bg-white px-2 py-1"
              >
                🌐
              </span>
            )}
            {task.notes.trim() && (
              <span
                title={task.notes}
                className="rounded-base border-2 border-black bg-white px-2 py-1"
              >
                📝
              </span>
            )}
            {task.subtasks.length > 0 && (
              <span
                className="rounded-base border-2 border-black bg-white px-2 py-1"
                aria-label={`Subtasks completed: ${completedSubtasks} of ${task.subtasks.length}`}
              >
                ✅ {completedSubtasks} / {task.subtasks.length}
              </span>
            )}
            {task.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-base border-2 border-black bg-[#cbf0f8] px-2 py-1 flex items-center gap-1"
                aria-label={`Tag: ${tag}`}
              >
                🏷️ {tag}
              </span>
            ))}
          </aside>
        </div>

        <div className="flex flex-col gap-2 shrink-0 self-start mt-1">
          {onEnterZenMode && (
            <button
              type="button"
              className="shrink-0 rounded-base border-2 border-black bg-[#a7f3d0] p-1 text-black shadow-shadow transition-all hover:bg-[#86efac] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              onClick={() => onEnterZenMode(task.id)}
              aria-label="Enter Zen Mode"
              title="Enter Zen Mode"
            >
              <Maximize2 size={16} />
            </button>
          )}
          <button
            type="button"
            className="shrink-0 rounded-base border-2 border-black bg-white p-1 text-gray-400 shadow-shadow transition-all hover:bg-[#ffe066] hover:text-black active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            onClick={() => onOpenDrawer(task)}
            aria-label="Open task details"
            title="Open Task Details"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </Reorder.Item>
  );
}
