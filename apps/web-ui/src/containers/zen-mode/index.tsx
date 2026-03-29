import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Task } from "@models/task";
import { Star, Clock, Tag } from "lucide-react";
import { AutoResizeTextarea } from "../../components/auto-resize-textarea";
import { useProjects } from "@modules/todo/use-projects";
import { TaskDetailBadge } from "../../components/task-detail-badge";
import { ZenSubtasks } from "./zen-subtasks";
import { ZenNotes } from "./zen-notes";
import { ZenExitButton } from "./exit-button";
import { ZenCompleteButton } from "./complete-button";

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
  const { t } = useTranslation();
  const [editingContent, setEditingContent] = useState(task.content);
  const { projects } = useProjects();
  const project = task.projectId
    ? projects.find((p) => p.id === task.projectId)
    : null;

  useEffect(() => {
    setEditingContent(task.content);
  }, [task.content]);

  useEffect(() => {
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
    <div className="fixed inset-0 z-[9999] bg-background overflow-y-auto animate-in fade-in duration-300">
      <div className="min-h-full flex flex-col items-center py-20">
        <ZenExitButton onClick={onExit} />

        <div className="w-full max-w-3xl px-6 flex flex-col items-center gap-10">
          <div className="w-full flex flex-col items-center justify-center gap-6">
            <AutoResizeTextarea
              value={editingContent}
              onChange={(e) => {
                setEditingContent(e.target.value);
                onUpdateContent?.(task.id, e.target.value);
              }}
              rows={1}
              className="w-full resize-none overflow-hidden bg-transparent text-center text-5xl md:text-6xl font-black leading-tight outline-none placeholder:text-foreground/30 transition-all text-foreground"
            />

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-bold mt-2">
              {project && (
                <TaskDetailBadge className="flex items-center gap-2 bg-secondary-background">
                  <div
                    className="w-3 h-3 rounded-full border border-border"
                    style={{ backgroundColor: project.color }}
                  />
                  {project.name}
                </TaskDetailBadge>
              )}
              {task.important && (
                <TaskDetailBadge className="flex items-center gap-2 bg-main text-main-foreground">
                  <Star className="w-4 h-4" fill="currentColor" />
                  {t("zen_mode.badges.important")}
                </TaskDetailBadge>
              )}
              {hasDueDate && (
                <TaskDetailBadge className="flex items-center gap-2 bg-secondary-background">
                  <Clock className="w-4 h-4" />
                  {dueDateLabel}
                </TaskDetailBadge>
              )}
              {task.tags &&
                task.tags.map((tag) => (
                  <TaskDetailBadge
                    key={tag}
                    className="flex items-center gap-2 bg-[#cbf0f8] dark:bg-[#cbf0f8]/20"
                  >
                    <Tag className="w-4 h-4" />
                    {tag}
                  </TaskDetailBadge>
                ))}
            </div>
          </div>

          {(task.notes || task.subtasks.length > 0) && (
            <div className="w-full mt-8 flex flex-col gap-6">
              <ZenNotes notes={task.notes} />
              <ZenSubtasks subtasks={task.subtasks} />
            </div>
          )}

          <div className="flex justify-center mt-12 mb-10 w-full">
            <ZenCompleteButton
              done={task.done}
              onClick={() => {
                onToggle(task.id);
                if (!task.done) {
                  onExit();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
