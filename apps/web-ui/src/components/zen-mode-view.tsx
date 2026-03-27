import React, { useEffect, useState } from "react";
import { Task } from "@models/task";
import { Minimize2, Check } from "lucide-react";
import { AutoResizeTextarea } from "./auto-resize-textarea";
import { useProjects } from "@modules/todo/use-projects";

interface ZenModeViewProps {
  task: Task;
  onExit: () => void;
  onToggle: (id: string) => void;
  onUpdateContent?: (id: string, content: string) => void;
}

export function ZenModeView({
  task,
  onExit,
  onToggle,
  onUpdateContent,
}: ZenModeViewProps) {
  const [editingContent, setEditingContent] = useState(task.content);
  const { projects } = useProjects();
  const project = task.projectId
    ? projects.find((p) => p.id === task.projectId)
    : null;

  useEffect(() => {
    setEditingContent(task.content);
  }, [task.content]);

  // Prevent scrolling on the body while in Zen mode
  useEffect(() => {
    // Only hidden on body if we want everything inside to scroll smoothly?
    // Actually, letting body scroll is fine or we can put overflow-y-auto in the fixed div.
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const hasDueDate = Boolean(task.dueDate);
  const dueDateLabel = hasDueDate
    ? `${task.dueDate}${task.dueTime ? ` ${task.dueTime}` : ""}`
    : "";

  return (
    <div className="fixed inset-0 z-[9999] bg-[#fef6d9] overflow-y-auto animate-in fade-in duration-300">
      <div className="min-h-full flex flex-col items-center py-20">
        <button
          onClick={onExit}
          className="fixed top-8 right-8 flex items-center gap-2 rounded-base border-2 border-black bg-[#ff8fab] px-4 py-2 font-black shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all z-10"
        >
          <Minimize2 className="w-5 h-5" />
          Exit Zen Mode
        </button>

        <div className="w-full max-w-3xl px-6 flex flex-col items-center gap-10">
          <div className="w-full flex flex-col items-center justify-center gap-6">
            <AutoResizeTextarea
              value={editingContent}
              onChange={(e) => {
                setEditingContent(e.target.value);
                onUpdateContent?.(task.id, e.target.value);
              }}
              rows={1}
              className="w-full resize-none overflow-hidden bg-transparent text-center text-5xl md:text-6xl font-black leading-tight outline-none placeholder:text-gray-300 transition-all text-black"
            />

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-bold mt-2">
              {project && (
                <div className="flex items-center gap-2 rounded-base border-2 border-black bg-white px-3 py-1 shadow-sm">
                  <div
                    className="w-3 h-3 rounded-full border border-black"
                    style={{ backgroundColor: project.color }}
                  />
                  {project.name}
                </div>
              )}
              {task.important && (
                <div className="rounded-base border-2 border-black bg-[#ffe066] px-3 py-1 shadow-sm">
                  ⭐ Important
                </div>
              )}
              {hasDueDate && (
                <div className="rounded-base border-2 border-black bg-white px-3 py-1 shadow-sm">
                  ⏰ {dueDateLabel}
                </div>
              )}
              {task.tags &&
                task.tags.map((tag) => (
                  <div
                    key={tag}
                    className="rounded-base border-2 border-black bg-[#cbf0f8] px-3 py-1 shadow-sm"
                  >
                    🏷️ {tag}
                  </div>
                ))}
            </div>
          </div>

          {(task.notes || task.subtasks.length > 0) && (
            <div className="w-full mt-8 flex flex-col gap-6">
              {task.notes && (
                <div className="w-full rounded-base border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="font-black text-xl mb-3 border-b-2 border-black pb-2">
                    Notes
                  </h3>
                  <p className="whitespace-pre-wrap font-bold text-gray-700 text-lg">
                    {task.notes}
                  </p>
                </div>
              )}

              {task.subtasks.length > 0 && (
                <div className="w-full rounded-base border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="font-black text-xl mb-4 border-b-2 border-black pb-2">
                    Subtasks
                  </h3>
                  <div className="flex flex-col gap-3">
                    {task.subtasks.map((subtask) => (
                      <div key={subtask.id} className="flex items-center gap-3">
                        <div
                          className={`flex items-center justify-center w-6 h-6 rounded-base border-2 border-black shrink-0 ${subtask.done ? "bg-[#a7f3d0]" : "bg-gray-100"}`}
                        >
                          {subtask.done && (
                            <Check className="w-4 h-4" strokeWidth={3} />
                          )}
                        </div>
                        <span
                          className={`font-bold text-lg ${subtask.done ? "text-gray-400 line-through" : "text-black"}`}
                        >
                          {subtask.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center mt-12 mb-10 w-full">
            <button
              onClick={() => onToggle(task.id)}
              className={`flex w-full md:w-auto justify-center items-center gap-4 rounded-base border-4 border-black px-10 py-5 text-3xl font-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none ${
                task.done
                  ? "bg-[#a7f3d0] text-black"
                  : "bg-[#cbf0f8] text-black"
              }`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-black ${task.done ? "bg-black text-white" : "bg-white"}`}
              >
                {task.done && <Check className="w-6 h-6" strokeWidth={4} />}
              </div>
              {task.done ? "COMPLETED" : "COMPLETE TASK"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
