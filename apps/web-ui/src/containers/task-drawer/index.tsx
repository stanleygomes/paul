"use client";

import { useMediaQuery } from "usehooks-ts";
import { Drawer, DrawerContent } from "@paul/ui";
import type { Task } from "@paul/entities";
import { TaskForm } from "../task-form";
import { TaskDrawerZenButton } from "./zen-button";
import { TaskDrawerHeader } from "./header";
import { cn } from "@paul/ui/lib/utils";

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
  onRestore?: (id: string) => void;
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
  isRecentlyDeleted?: boolean;
  onSuggestSubtasks?: (id: string) => void;
  isSuggestingSubtasks?: boolean;
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
  onRestore,
  onEnterZenMode,
  onUpdateDetails,
  isRecentlyDeleted,
  onSuggestSubtasks,
  isSuggestingSubtasks,
}: TaskDrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  function handleDelete(id: string) {
    onDelete(id);
    onClose();
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      direction={isDesktop ? "right" : "bottom"}
    >
      <DrawerContent
        className={cn(
          "bg-background flex flex-col",
          isDesktop
            ? "sm:!max-w-2xl w-[calc(100%-1.5rem)] ml-auto"
            : "w-full max-h-[90vh]",
        )}
      >
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
              onRestore={onRestore}
              onUpdateDetails={onUpdateDetails}
              onSuggestSubtasks={onSuggestSubtasks}
              isSuggestingSubtasks={isSuggestingSubtasks}
              isRecentlyDeleted={isRecentlyDeleted}
            />

            <div className="mt-4 flex flex-col gap-3">
              {onEnterZenMode && (
                <TaskDrawerZenButton
                  taskId={task.id}
                  onClick={onEnterZenMode}
                  onClose={onClose}
                />
              )}
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
