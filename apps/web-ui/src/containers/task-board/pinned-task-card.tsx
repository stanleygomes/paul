import { Task } from "@paul/entities";
import { PinOff, CheckCircle2, Circle } from "lucide-react";
import { TaskMetadata } from "../task-item/metadata";

interface PinnedTaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onUnpin: (id: string) => void;
  onOpenDrawer: (task: Task) => void;
  onUpdateDetails: (id: string, details: any) => void;
}

export function PinnedTaskCard({
  task,
  onToggle,
  onUnpin,
  onOpenDrawer,
  onUpdateDetails,
}: PinnedTaskCardProps) {
  return (
    <div
      onClick={() => onOpenDrawer(task)}
      className="border-2 border-border p-5 flex flex-col justify-between cursor-pointer group shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-shadow overflow-hidden"
      style={{
        backgroundColor: task.color
          ? `${task.color}15`
          : "var(--secondary-background)",
        borderColor: task.color || "var(--border)",
      }}
    >
      {task.color && (
        <div
          className="absolute -right-10 -top-10 w-32 h-32 blur-3xl opacity-20"
          style={{ backgroundColor: task.color }}
        />
      )}

      <div className="flex justify-between items-start z-10 mb-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(task.id);
          }}
          className={`transition-colors duration-200 ${
            task.done ? "text-main" : "text-secondary-text hover:text-main"
          }`}
        >
          {task.done ? <CheckCircle2 size={30} /> : <Circle size={30} />}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onUnpin(task.id);
          }}
          className="p-1.5 rounded-full bg-background/50 backdrop-blur-sm border border-border text-secondary-text hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all opacity-0 group-hover:opacity-100"
          title="Remover destaque"
        >
          <PinOff size={16} />
        </button>
      </div>

      <div className="z-10">
        <h3
          className={`text-xl font-bold line-clamp-2 leading-tight ${task.done ? "line-through opacity-50" : "text-foreground"}`}
        >
          {task.title || task.content || "Sem título"}
        </h3>
        {task.notes && (
          <p className="text-xs text-secondary-text mt-2 line-clamp-1 opacity-70">
            {task.notes}
          </p>
        )}
      </div>

      <div className="z-10 mt-auto">
        <TaskMetadata task={task} onUpdateDetails={onUpdateDetails} />
      </div>
    </div>
  );
}
