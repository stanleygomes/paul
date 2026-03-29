import type { Task } from "@models/task";
import type { Project } from "@models/project";
import { Clock, Globe, FileText, CheckCircle2, Tag, X } from "lucide-react";
import { TaskDetailBadge } from "../../components/task-detail-badge";
import { TaskProjectSelector as ProjectSelector } from "../../components/task-project-selector";
import { TaskImportantToggle as ImportantToggle } from "../../components/task-important-toggle";
import { formatDate, formatTime } from "@done/utils/src/date-utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@done/ui/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@done/ui/components/ui/popover";
import { useState } from "react";

interface TaskMetadataProps {
  task: Task;
  project?: Project | null;
  showProject?: boolean;
  onUpdateDetails?: (id: string, details: any) => void;
}

export function TaskMetadata({
  task,
  showProject = true,
  onUpdateDetails,
}: TaskMetadataProps) {
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
      aria-label="Task metadata"
    >
      {showProject && (
        <div className="relative group">
          <ProjectSelector
            value={task.projectId || "none"}
            onChange={(projectId) =>
              handleUpdate({
                projectId: projectId === "none" ? undefined : projectId,
              })
            }
            isVisible={true}
            className="bg-secondary-background px-2 h-7 border-2 border-border"
          />
        </div>
      )}

      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center">
            <ImportantToggle
              isImportant={task.important}
              onToggle={() => handleUpdate({ important: !task.important })}
              className="h-7 px-1.5"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {task.important ? "Unmark as important" : "Mark as important"}
        </TooltipContent>
      </Tooltip>

      {hasDueDate && (
        <Tooltip>
          <TooltipTrigger asChild>
            <TaskDetailBadge
              className="bg-secondary-background flex items-center gap-1.5 px-2 h-7 border border-border/50"
              aria-label={`Due date: ${dueDateLabel}`}
            >
              <Clock className="w-3.5 h-3.5" />
              {dueDateLabel}
            </TaskDetailBadge>
          </TooltipTrigger>
          <TooltipContent>Due date</TooltipContent>
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
              <TaskDetailBadge className="bg-secondary-background flex items-center px-1.5 h-7 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-border/50">
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
                  <TaskDetailBadge className="bg-secondary-background flex items-center px-1.5 h-7 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-border/50">
                    <FileText className="w-3.5 h-3.5" />
                  </TaskDetailBadge>
                </button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>View notes</TooltipContent>
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
              className="bg-secondary-background flex items-center gap-1.5 px-2 h-7 border border-border/50"
              aria-label={`Subtasks completed: ${completedSubtasks} of ${task.subtasks.length}`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              {completedSubtasks} / {task.subtasks.length}
            </TaskDetailBadge>
          </TooltipTrigger>
          <TooltipContent>
            {completedSubtasks} tasks completed of total {task.subtasks.length}
          </TooltipContent>
        </Tooltip>
      )}

      {task.tags?.map((tag) => (
        <TaskDetailBadge
          key={tag}
          className="bg-[#cbf0f8] dark:bg-[#cbf0f8]/20 flex items-center gap-1.5 px-2 h-7 relative group border border-border/50"
          onMouseEnter={() => setIsHoveredTag(tag)}
          onMouseLeave={() => setIsHoveredTag(null)}
        >
          <Tag className="w-3.5 h-3.5" />
          {tag}
          {isHoveredTag === tag && (
            <button
              onClick={() => removeTag(tag)}
              className="ml-1 p-0.5 rounded-full hover:bg-black/10 transition-colors"
              title="Remove tag"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </TaskDetailBadge>
      ))}
    </aside>
  );
}
