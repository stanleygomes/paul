import { Trash2, Maximize2, ChevronRight } from "lucide-react";
import type { Task } from "@models/task";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@done/ui/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@done/ui/components/ui/alert-dialog";

interface TaskItemActionsProps {
  task: Task;
  onDelete: (id: string) => void;
  onEnterZenMode?: (id: string) => void;
  onOpenDrawer: (task: Task) => void;
}

export function TaskItemActions({
  task,
  onDelete,
  onEnterZenMode,
  onOpenDrawer,
}: TaskItemActionsProps) {
  return (
    <div className="flex items-start gap-2">
      <AlertDialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className="rounded-base border-2 border-border bg-[#ff8fab] dark:bg-[#ff8fab]/20 p-1.5 shadow-shadow transition-all hover:bg-[#ff6b8e] dark:hover:bg-[#ff6b8e]/30 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shrink-0 cursor-pointer"
                aria-label="Delete task"
              >
                <Trash2 size={16} />
              </button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Delete task</TooltipContent>
        </Tooltip>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(task.id)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {onEnterZenMode && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="shrink-0 rounded-base border-2 border-border bg-[#a7f3d0] dark:bg-[#a7f3d0]/20 p-1.5 text-foreground shadow-shadow transition-all hover:bg-[#86efac] dark:hover:bg-[#86efac]/30 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
              onClick={() => onEnterZenMode(task.id)}
              aria-label="Enter Zen Mode"
            >
              <Maximize2 size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>Enter Zen Mode</TooltipContent>
        </Tooltip>
      )}

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="shrink-0 rounded-base border-2 border-border bg-secondary-background p-1.5 text-foreground/40 shadow-shadow transition-all hover:bg-main hover:text-main-foreground active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
            onClick={() => onOpenDrawer(task)}
            aria-label="Open task details"
          >
            <ChevronRight size={16} />
          </button>
        </TooltipTrigger>
        <TooltipContent>Open Task Details</TooltipContent>
      </Tooltip>
    </div>
  );
}
