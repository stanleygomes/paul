"use client";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@done/ui";
import type { Task } from "@models/task";
import { TaskDrawerContent } from "./task-drawer-content";

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
      <DrawerContent className="bg-[#fef6d9] flex flex-col">
        <DrawerHeader className="border-b-2 border-black px-6 py-4 text-left shrink-0">
          <DrawerTitle className="text-xl font-black">Task Details</DrawerTitle>
        </DrawerHeader>

        {task && (
          <div className="p-6 flex-1 overflow-y-auto h-full">
            <TaskDrawerContent
              task={task}
              isEditing={isEditing}
              editingContent={editingContent}
              onEditingContentChange={onEditingContentChange}
              onToggle={onToggle}
              onStartEdit={onStartEdit}
              onUpdateEdit={onUpdateEdit}
              onCloseEdit={onCloseEdit}
              onDelete={handleDelete}
              onEnterZenMode={(id) => {
                onEnterZenMode?.(id);
                onClose();
              }}
              onUpdateDetails={onUpdateDetails}
            />
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
