"use client";

import { Drawer, DrawerContent } from "@done/ui";
import type { Task } from "@models/task";
import { TaskForm } from "../task-form";
import { TaskDrawerZenButton } from "./zen-button";
import { TaskDrawerFullPageButton } from "./full-page-button";
import { TaskDrawerHeader } from "./header";

interface TaskDrawerProps {
  task: Task | null;
  isOpen: boolean;
  isEditing: boolean;
  editingContent: string;
  onEditingContentChange: (value: string) => void;
  onClose: () => void;
  onToggle: (id: string) => void;
  onStartEdit: (task: Task) => void;
  onUpdateEdit: (id: string, content: string) => void;
  onCloseEdit: () => void;
  onDelete: (id: string) => void;
  onEnterZenMode?: (id: string) => void;
  onUpdateDetails: (
    id: string,
    details: Pick<
      Task,
      | "notes"
      | "important"
      | "dueDate"
      | "dueTime"
      | "url"
      | "subtasks"
      | "tags"
      | "projectId"
    >,
  ) => void;
  onOpenFullPage?: (id: string) => void;
}

export function TaskDrawer({
  task,
  isOpen,
  isEditing,
  editingContent,
  onEditingContentChange,
  onClose,
  onToggle,
  onStartEdit,
  onUpdateEdit,
  onCloseEdit,
  onDelete,
  onEnterZenMode,
  onUpdateDetails,
  onOpenFullPage,
}: TaskDrawerProps) {
  function handleDelete(id: string) {
    onDelete(id);
    onClose();
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      direction="right"
    >
      <DrawerContent className="bg-background flex flex-col sm:!max-w-2xl w-full">
        <TaskDrawerHeader />

        {task && (
          <div className="p-6 flex-1 overflow-y-auto h-full">
            <TaskForm
              task={task}
              isEditing={isEditing}
              editingContent={editingContent}
              onEditingContentChange={onEditingContentChange}
              onToggle={onToggle}
              onStartEdit={onStartEdit}
              onUpdateEdit={onUpdateEdit}
              onCloseEdit={onCloseEdit}
              onDelete={handleDelete}
              onUpdateDetails={onUpdateDetails}
            />

            <div className="mt-4 flex flex-col gap-3">
              {onEnterZenMode && (
                <TaskDrawerZenButton
                  taskId={task.id}
                  onClick={onEnterZenMode}
                  onClose={onClose}
                />
              )}
              {onOpenFullPage && (
                <TaskDrawerFullPageButton
                  taskId={task.id}
                  onClick={onOpenFullPage}
                />
              )}
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
