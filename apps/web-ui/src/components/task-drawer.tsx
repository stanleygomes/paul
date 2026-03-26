"use client";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@done/ui";
import type { Task } from "@models/task";
import { TaskItemContent } from "./task-item-content";

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
      <DrawerContent className="bg-[#fef6d9]">
        <DrawerHeader className="border-b-2 border-black px-6 py-4 text-left">
          <DrawerTitle className="text-xl font-black">Task Details</DrawerTitle>
        </DrawerHeader>

        {task && (
          <div className="p-6">
            <div className="rounded-base border-2 border-black bg-white p-4 shadow-shadow">
              <TaskItemContent
                task={task}
                isEditing={isEditing}
                editingContent={editingContent}
                onEditingContentChange={onEditingContentChange}
                onToggle={onToggle}
                onStartEdit={onStartEdit}
                onUpdateEdit={onUpdateEdit}
                onCloseEdit={onCloseEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
