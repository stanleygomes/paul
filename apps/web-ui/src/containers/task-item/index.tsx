import { useEffect, useRef, useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import type { Task } from "@paul/entities";
import { useProjects } from "@modules/project/use-projects";
import { useMediaQuery } from "usehooks-ts";
import { useDebouncedSave } from "../../hooks/use-debounced-save";
import { TaskToggle } from "../../components/task-toggle";
import { DragHandle } from "./drag-handle";
import { TaskMetadata } from "./metadata";
import { TaskItemActions } from "./actions";
import { TaskItemDescription } from "./description";
import { TaskDeleteConfirmDialog } from "./delete-confirm-dialog";

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
  onRestore?: (id: string) => void;
  onOpenDrawer: (task: Task) => void;
  onUpdateTaskDetails: (id: string, details: any) => void;
  onEnterZenMode?: (id: string) => void;
  showProject?: boolean;
  isRecentlyDeleted?: boolean;
}

import { SwipeableActionItem } from "../../components/swipe-to-complete";

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
  onRestore,
  onOpenDrawer,
  onUpdateTaskDetails,
  onEnterZenMode,
  showProject,
  isRecentlyDeleted,
}: TaskListItemProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const controls = useDragControls();
  const { projects } = useProjects();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
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

  function handleSoftDelete() {
    if (isRecentlyDeleted) {
      setShowDeleteConfirm(true);
    } else {
      onDelete(task.id);
    }
  }

  return (
    <Reorder.Item
      value={task}
      dragListener={false}
      dragControls={controls}
      className={`relative overflow-hidden rounded-base border-2 transition-opacity ${
        task.done ? "opacity-60" : ""
      }`}
      style={{
        borderColor: task.color || "var(--border)",
      }}
    >
      <SwipeableActionItem
        onComplete={() => onToggle(task.id)}
        onDelete={handleSoftDelete}
        className="h-full w-full"
      >
        <div
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest("button, input, textarea")) return;

            // In desktop mode, clicking the title area triggers inline edit, not drawer.
            // But we allow drawer to open if clicking elsewhere.
            if (isDesktop && target.closest(".task-title-area")) {
              return;
            }

            onOpenDrawer(task);
          }}
          className="group p-4 flex items-start gap-3 cursor-pointer"
          style={{
            backgroundColor: task.color
              ? `${task.color}10`
              : "var(--secondary-background)",
          }}
        >
          <DragHandle controls={controls} />

          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3">
              <TaskToggle
                task={task}
                onToggle={onToggle}
                className="cursor-pointer hidden md:flex"
              />

              <div className="flex-1 min-w-0 task-title-area">
                <TaskItemDescription
                  ref={inputRef}
                  task={task}
                  isEditing={isEditing}
                  editingContent={editingContent}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onStartEdit={onStartEdit}
                  isDesktop={isDesktop}
                />
              </div>

              <TaskItemActions
                task={task}
                onDelete={handleSoftDelete}
                onRestore={onRestore}
                onEnterZenMode={onEnterZenMode}
                onOpenDrawer={onOpenDrawer}
                onPin={(id, isPinned) => onUpdateTaskDetails(id, { isPinned })}
                isRecentlyDeleted={isRecentlyDeleted}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto hidden md:flex"
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
      </SwipeableActionItem>

      <TaskDeleteConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={() => onDelete(task.id)}
      />
    </Reorder.Item>
  );
}
