import { useEffect, useRef } from "react";
import { Reorder, useDragControls } from "framer-motion";
import type { Task } from "@models/task";
import { useProjects } from "@modules/todo/use-projects";
import { useDebouncedSave } from "../../hooks/use-debounced-save";
import { TaskToggle } from "../../components/task-toggle";
import { DragHandle } from "./drag-handle";
import { TaskMetadata } from "./metadata";
import { TaskItemActions } from "./actions";
import { TaskItemDescription } from "./description";

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
  onUpdateTaskDetails: (id: string, details: any) => void;
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
  onUpdateTaskDetails,
  onEnterZenMode,
  showProject,
}: TaskListItemProps) {
  const controls = useDragControls();
  const { projects } = useProjects();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { save, flush } = useDebouncedSave(600);

  const project = task.projectId
    ? projects.find((p) => p.id === task.projectId)
    : null;

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
      className={`rounded-base border-2 border-black bg-white p-4 transition-opacity ${
        task.done ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <DragHandle controls={controls} />

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3">
            <TaskToggle task={task} onToggle={onToggle} className="mt-1" />

            <TaskItemDescription
              ref={inputRef}
              task={task}
              isEditing={isEditing}
              editingContent={editingContent}
              onChange={handleChange}
              onBlur={handleBlur}
              onStartEdit={onStartEdit}
            />

            <TaskItemActions
              task={task}
              onDelete={onDelete}
              onEnterZenMode={onEnterZenMode}
              onOpenDrawer={onOpenDrawer}
            />
          </div>

          <TaskMetadata
            task={task}
            project={project}
            showProject={showProject}
            onUpdateDetails={onUpdateTaskDetails}
          />
        </div>
      </div>
    </Reorder.Item>
  );
}
