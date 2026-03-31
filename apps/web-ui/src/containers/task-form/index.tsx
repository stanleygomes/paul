import { useEffect, useRef } from "react";
import type { Task } from "@done/entities";
import { generateUUID } from "@done/utils";
import { useDebouncedSave } from "../../hooks/use-debounced-save";
import { TaskTitle } from "./task-title";
import { TaskStatusToggle } from "./task-status-toggle";
import { TaskProject } from "./task-project";
import { TaskNotes } from "./task-notes";
import { TaskTags } from "./task-tags";
import { TaskSubtasks } from "./task-subtasks";
import { TaskDueDate } from "./task-due-date";
import { TaskImportant } from "./task-important";
import { TaskUrl } from "./task-url";
import { TaskDelete } from "./task-delete";
import { TaskMetadata } from "./task-metadata";

interface TaskFormProps {
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
}

export function TaskForm({
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
  onUpdateDetails,
  isRecentlyDeleted,
}: TaskFormProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { save, flush } = useDebouncedSave(600);

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

  function patchDetails(
    details: Partial<
      Pick<
        Task,
        | "notes"
        | "important"
        | "dueDate"
        | "dueTime"
        | "url"
        | "subtasks"
        | "tags"
        | "projectId"
      >
    >,
  ) {
    onUpdateDetails(task.id, {
      notes: task.notes,
      important: task.important,
      dueDate: task.dueDate,
      dueTime: task.dueTime,
      url: task.url,
      subtasks: task.subtasks,
      tags: task.tags,
      projectId: task.projectId,
      ...details,
    });
  }

  function generateSubtaskId() {
    return generateUUID();
  }

  function updateSubtaskContent(subtaskId: string, content: string) {
    patchDetails({
      subtasks: task.subtasks.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, content } : subtask,
      ),
    });
  }

  function toggleSubtask(subtaskId: string) {
    patchDetails({
      subtasks: task.subtasks.map((subtask) =>
        subtask.id === subtaskId
          ? { ...subtask, done: !subtask.done }
          : subtask,
      ),
    });
  }

  function addSubtask() {
    patchDetails({
      subtasks: [
        ...task.subtasks,
        {
          id: generateSubtaskId(),
          content: "",
          done: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          notes: "",
          important: false,
          dueDate: "",
          dueTime: "",
          url: "",
          subtasks: [],
          tags: [],
          parentId: task.id,
        },
      ],
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full">
        <TaskTitle
          ref={inputRef}
          task={task}
          isEditing={isEditing}
          editingContent={editingContent}
          onChange={handleChange}
          onBlur={handleBlur}
          onStartEdit={onStartEdit}
        />
      </div>

      <div className="flex items-center justify-between rounded-base border-2 border-border bg-secondary-background p-4">
        <div className="flex items-center gap-3">
          <TaskStatusToggle task={task} onToggle={onToggle} />
        </div>
        <div className="flex items-center">
          <TaskImportant
            isImportant={task.important}
            onToggle={() => patchDetails({ important: !task.important })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TaskProject
          projectId={task.projectId}
          onUpdateProject={(id) => patchDetails({ projectId: id })}
        />

        <TaskDueDate
          dueDate={task.dueDate || ""}
          dueTime={task.dueTime || ""}
          onUpdateDate={(date) => patchDetails({ dueDate: date })}
          onUpdateTime={(time) => patchDetails({ dueTime: time })}
        />
      </div>

      <TaskSubtasks
        subtasks={task.subtasks}
        onAddSubtask={addSubtask}
        onToggleSubtask={toggleSubtask}
        onUpdateSubtaskContent={updateSubtaskContent}
      />

      <TaskNotes
        notes={task.notes}
        onUpdateNotes={(notes) => patchDetails({ notes })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TaskTags
          tags={task.tags}
          onTagsChange={(tags) => patchDetails({ tags })}
        />

        <TaskUrl url={task.url} onUpdateUrl={(url) => patchDetails({ url })} />
      </div>

      <TaskMetadata task={task} />

      <TaskDelete
        onDelete={() => onDelete(task.id)}
        onRestore={onRestore ? () => onRestore(task.id) : undefined}
        isRecentlyDeleted={isRecentlyDeleted}
      />
    </div>
  );
}
