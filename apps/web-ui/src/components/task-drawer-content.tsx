import { useEffect, useRef } from "react";
import { Trash2, Maximize2 } from "lucide-react";
import type { Task } from "@models/task";
import { generateUUID } from "@done/utils/src/uuid-utils";
import { useDebouncedSave } from "../hooks/use-debounced-save";
import { AutoResizeTextarea } from "./auto-resize-textarea";
import { TaskToggle } from "./task-toggle";
import { useProjects } from "@modules/todo/use-projects";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@done/ui";

interface TaskDrawerContentProps {
  task: Task;
  isEditing: boolean;
  editingContent: string;
  onEditingContentChange: (value: string) => void;
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

export function TaskDrawerContent({
  task,
  isEditing,
  editingContent,
  onEditingContentChange,
  onToggle,
  onStartEdit,
  onUpdateEdit,
  onCloseEdit,
  onDelete,
  onEnterZenMode,
  onUpdateDetails,
}: TaskDrawerContentProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const { save, flush } = useDebouncedSave(600);
  const { projects } = useProjects();

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

  function updateSubtaskTitle(subtaskId: string, title: string) {
    patchDetails({
      subtasks: task.subtasks.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, title } : subtask,
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
        { id: generateSubtaskId(), title: "", done: false },
      ],
    });
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (newTag && !task.tags.includes(newTag)) {
        patchDetails({ tags: [...task.tags, newTag] });
      }
      e.currentTarget.value = "";
    }
  }

  function removeTag(tagToRemove: string) {
    patchDetails({ tags: task.tags.filter((tag) => tag !== tagToRemove) });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full">
        {isEditing ? (
          <AutoResizeTextarea
            ref={inputRef}
            value={editingContent}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            rows={1}
            className="w-full resize-none overflow-hidden rounded-base border-2 border-black bg-[#fffaf0] px-3 py-2 font-black leading-tight outline-none focus:bg-white transition-all shadow-shadow"
          />
        ) : (
          <h2
            className={`cursor-text whitespace-pre-wrap break-words py-2 font-black leading-tight border-2 border-transparent ${
              task.done ? "text-gray-500 line-through" : "text-black"
            }`}
            onClick={() => !task.done && onStartEdit(task)}
          >
            {task.content}
          </h2>
        )}
      </div>

      <div className="flex items-center gap-3 rounded-base border-2 border-black bg-white p-4 shadow-shadow">
        <TaskToggle task={task} onToggle={onToggle} className="mt-0" />
        <span className="text-lg font-bold">
          {task.done ? "Completed" : "Mark as completed"}
        </span>
      </div>

      <div className="rounded-base border-2 border-black bg-white p-4 shadow-shadow">
        <label className="mb-2 block text-sm font-black">Project</label>
        <Select
          value={task.projectId || "none"}
          onValueChange={(value) =>
            patchDetails({ projectId: value === "none" ? undefined : value })
          }
        >
          <SelectTrigger className="w-full bg-[#fffaf0] font-bold outline-none cursor-pointer text-sm py-2 px-3 h-auto">
            <SelectValue placeholder="No project" />
          </SelectTrigger>
          <SelectContent className="bg-[#fffaf0]">
            <SelectItem value="none" className="font-bold cursor-pointer">
              No project
            </SelectItem>
            {projects.map((p) => (
              <SelectItem
                key={p.id}
                value={p.id}
                className="font-bold cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full border border-black"
                    style={{ backgroundColor: p.color }}
                  ></div>
                  <span>{p.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-base border-2 border-black bg-white p-4 shadow-shadow">
        <label className="mb-2 block text-sm font-black">Notes</label>
        <textarea
          value={task.notes}
          onChange={(e) => patchDetails({ notes: e.target.value })}
          rows={4}
          className="w-full resize-y rounded-base border-2 border-black bg-[#fffaf0] px-3 py-2 outline-none"
          placeholder="Write notes about this task"
        />
      </div>

      <div className="rounded-base border-2 border-black bg-white p-4 shadow-shadow">
        <label className="mb-2 block text-sm font-black">Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {task.tags?.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-base border-2 border-black bg-[#cbf0f8] px-2 py-1 text-xs font-bold"
            >
              {tag}
              <button
                type="button"
                className="hover:text-red-500"
                onClick={() => removeTag(tag)}
                aria-label={`Remove tag ${tag}`}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <input
          ref={tagInputRef}
          type="text"
          placeholder="Add tag (press Enter or comma)"
          onKeyDown={handleTagKeyDown}
          className="w-full rounded-base border-2 border-black bg-[#fffaf0] px-3 py-2 text-sm outline-none"
        />
      </div>

      <div className="rounded-base border-2 border-black bg-white p-4 shadow-shadow">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-black">Subtasks</h3>
          <button
            type="button"
            className="rounded-base border-2 border-black bg-[#ffe066] px-2 py-1 text-xs font-bold shadow-shadow transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            onClick={addSubtask}
          >
            Add subtask
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {task.subtasks.map((subtask) => (
            <div key={subtask.id} className="flex items-center gap-2">
              <button
                type="button"
                className={`h-7 w-7 shrink-0 rounded-base border-2 border-black text-xs font-black ${
                  subtask.done ? "bg-[#a7f3d0]" : "bg-white"
                }`}
                onClick={() => toggleSubtask(subtask.id)}
                aria-label={
                  subtask.done
                    ? "Mark subtask as not done"
                    : "Mark subtask as done"
                }
              >
                {subtask.done ? "✓" : ""}
              </button>
              <input
                value={subtask.title}
                onChange={(e) => updateSubtaskTitle(subtask.id, e.target.value)}
                className="w-full rounded-base border-2 border-black bg-[#fffaf0] px-2 py-1 text-sm outline-none"
                placeholder="Subtask title"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-base border-2 border-black bg-white p-4 shadow-shadow">
        <h3 className="mb-2 text-sm font-black">Due date</h3>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            value={task.dueDate}
            onChange={(e) => patchDetails({ dueDate: e.target.value })}
            className="rounded-base border-2 border-black bg-[#fffaf0] px-2 py-1 text-sm outline-none"
          />
          <input
            type="time"
            value={task.dueTime}
            onChange={(e) => patchDetails({ dueTime: e.target.value })}
            className="rounded-base border-2 border-black bg-[#fffaf0] px-2 py-1 text-sm outline-none"
          />
        </div>
      </div>

      <div className="rounded-base border-2 border-black bg-white p-4 shadow-shadow">
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-black" htmlFor="important-task">
            Important task
          </label>
          <button
            id="important-task"
            type="button"
            className={`rounded-base border-2 border-black px-3 py-1 text-lg shadow-shadow transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none ${
              task.important ? "bg-[#ffe066]" : "bg-white"
            }`}
            onClick={() => patchDetails({ important: !task.important })}
            aria-label={
              task.important ? "Remove important flag" : "Mark as important"
            }
          >
            ⭐
          </button>
        </div>

        <label className="mb-2 block text-sm font-black" htmlFor="task-url">
          URL
        </label>
        <input
          id="task-url"
          type="url"
          value={task.url}
          onChange={(e) => patchDetails({ url: e.target.value })}
          className="w-full rounded-base border-2 border-black bg-[#fffaf0] px-3 py-2 text-sm outline-none"
          placeholder="https://example.com"
        />
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {onEnterZenMode && (
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 rounded-base border-2 border-black bg-[#a7f3d0] py-4 text-lg font-black shadow-shadow transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-[#86efac]"
            onClick={() => {
              onEnterZenMode(task.id);
            }}
          >
            <Maximize2 className="h-6 w-6" /> Enter Zen Mode
          </button>
        )}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 rounded-base border-2 border-black bg-[#ff8fab] py-3 text-base font-bold shadow-shadow transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-[#ff7597]"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="h-5 w-5" /> Delete Task
        </button>
      </div>
    </div>
  );
}
