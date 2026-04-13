import { useTranslation } from "react-i18next";
import type { Task } from "@paul/entities";
import { Clock, Globe, FileText, CheckCircle2, Tag, X } from "lucide-react";
import { TaskDetailBadge } from "@components/task-detail-badge";
import { TaskProjectSelector as ProjectSelector } from "@components/task-project-selector";
import { TaskImportantToggle as ImportantToggle } from "@components/task-important-toggle";
import { formatDate, formatTime } from "@paul/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@paul/ui/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@paul/ui/components/ui/popover";
import { useState } from "react";

interface TaskMetadataProps {
  task: Task;
  showProject?: boolean;
  onUpdateDetails?: (id: string, details: any) => void;
}

export function TaskMetadata({
  task,
  showProject = true,
  onUpdateDetails,
}: TaskMetadataProps) {
  const { t } = useTranslation();
  const [isHoveredTag, setIsHoveredTag] = useState<string | null>(null);

  const hasDueDate = Boolean(task.dueDate);
  const formattedDate = task.dueDate ? formatDate(task.dueDate) : "";
  const formattedTime = task.dueTime ? formatTime(task.dueTime) : "";
  const dueDateLabel = `${formattedDate}${formattedTime ? ` ${formattedTime}` : ""}`;

  const completedSubtasks = task.subtasks.filter((s) => s.done).length;

  const handleUpdate = (details: Partial<Task>) => {
    if (onUpdateDetails) {
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
  };

  const removeTag = (tagToRemove: string) => {
    handleUpdate({
      tags: task.tags?.filter((t) => t !== tagToRemove),
    });
  };

  return (
    <aside
      className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold"
      aria-label={t("task_item.metadata.aria_label")}
    >
      {showProject && task.projectId && (
        <div className="relative group">
          <ProjectSelector
            value={task.projectId || "none"}
            onChange={(projectId) =>
              handleUpdate({
                projectId: projectId === "none" ? undefined : projectId,
              })
            }
            isVisible={true}
            className="bg-secondary-background px-2 h-8 border-2 border-border"
          />
        </div>
      )}

      {task.important && (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center">
              <ImportantToggle
                isImportant={task.important}
                onToggle={() => handleUpdate({ important: !task.important })}
                className="h-8 px-1.5"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {task.important
              ? t("common.components.important_toggle.unmark")
              : t("common.components.important_toggle.mark")}
          </TooltipContent>
        </Tooltip>
      )}

      {hasDueDate && (
        <Tooltip>
          <TooltipTrigger asChild>
            <TaskDetailBadge
              className="bg-secondary-background flex items-center gap-1.5 px-2 h-8 border-2 border-border"
              aria-label={t("task_item.metadata.due_date_aria", {
                date: dueDateLabel,
              })}
            >
              <Clock className="w-3.5 h-3.5" />
              {dueDateLabel}
            </TaskDetailBadge>
          </TooltipTrigger>
          <TooltipContent>
            {t("task_item.metadata.due_date_tooltip")}
          </TooltipContent>
        </Tooltip>
      )}

      {task.url && (
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={task.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <TaskDetailBadge className="bg-secondary-background flex items-center px-1.5 h-8 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border-2 border-border">
                <Globe className="w-3.5 h-3.5" />
              </TaskDetailBadge>
            </a>
          </TooltipTrigger>
          <TooltipContent>{task.url}</TooltipContent>
        </Tooltip>
      )}

      {task.notes.trim() && (
        <Popover>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <button className="inline-flex">
                  <TaskDetailBadge className="bg-secondary-background flex items-center px-1.5 h-8 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border-2 border-border">
                    <FileText className="w-3.5 h-3.5" />
                  </TaskDetailBadge>
                </button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              {t("task_item.metadata.view_notes")}
            </TooltipContent>
          </Tooltip>
          <PopoverContent className="w-80 p-4 bg-secondary-background border-2 border-border shadow-shadow text-xs font-semibold whitespace-pre-wrap">
            {task.notes}
          </PopoverContent>
        </Popover>
      )}

      {task.subtasks.length > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <TaskDetailBadge
              className="bg-secondary-background flex items-center gap-1.5 px-2 h-8 border-2 border-border"
              aria-label={t("task_item.metadata.subtasks_aria", {
                completed: completedSubtasks,
                total: task.subtasks.length,
              })}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              {completedSubtasks} / {task.subtasks.length}
            </TaskDetailBadge>
          </TooltipTrigger>
          <TooltipContent>
            {t("task_item.metadata.subtasks_tooltip", {
              completed: completedSubtasks,
              total: task.subtasks.length,
            })}
          </TooltipContent>
        </Tooltip>
      )}

      {task.tags?.map((tag) => (
        <TaskDetailBadge
          key={tag}
          className="bg-[#cbf0f8] dark:bg-[#cbf0f8]/20 flex items-center gap-1.5 px-2 h-8 relative group border-2 border-border"
          onMouseEnter={() => setIsHoveredTag(tag)}
          onMouseLeave={() => setIsHoveredTag(null)}
        >
          <Tag className="w-3.5 h-3.5" />
          {tag}
          {isHoveredTag === tag && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-1 p-0.5 rounded-full cursor-pointer hover:bg-black/10 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {t("task_item.metadata.remove_tag")}
              </TooltipContent>
            </Tooltip>
          )}
        </TaskDetailBadge>
      ))}
    </aside>
  );
}
