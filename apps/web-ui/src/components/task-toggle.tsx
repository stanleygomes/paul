import type { Task } from "@models/task";

interface TaskToggleProps {
  task: Task;
  onToggle: (id: string) => void;
  className?: string;
}

export function TaskToggle({
  task,
  onToggle,
  className = "",
}: TaskToggleProps) {
  return (
    <button
      type="button"
      className={`mt-0.5 h-8 w-8 shrink-0 rounded-base border-2 border-border text-sm font-black transition-all active:scale-90 ${
        task.done
          ? "bg-[#a7f3d0] dark:bg-[#a7f3d0]/20"
          : "bg-secondary-background"
      } ${className}`}
      onClick={() => onToggle(task.id)}
      aria-label={task.done ? "Mark as not done" : "Mark as done"}
    >
      {task.done ? "✓" : ""}
    </button>
  );
}
