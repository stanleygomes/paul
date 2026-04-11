import React, { useEffect } from "react";
import { Task } from "@paul/entities";
import { ZenTitle } from "./zen-title";
import { useProjects } from "@modules/project/use-projects";
import { ZenSubtasks } from "./zen-subtasks";
import { ZenNotes } from "./zen-notes";
import { ZenExitButton } from "./exit-button";
import { PomodoroTimer } from "./pomodoro/pomodoro-timer";
import { ZenBadges } from "./zen-badges";

interface ZenModeViewProps {
  task: Task;
  onExit: () => void;
  onToggle: (id: string) => void;
  onUpdateContent?: (id: string, content: string) => void;
}

export function ZenModeView({ task, onExit }: ZenModeViewProps) {
  const { projects } = useProjects();
  const project = task.projectId
    ? projects.find((p) => p.id === task.projectId)
    : null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-background border-2 border-border overflow-y-auto animate-in fade-in duration-300">
      <div className="min-h-full flex flex-col items-center pb-32">
        <div className="w-full max-w-4xl px-6 flex flex-col items-center">
          <PomodoroTimer />
          <div className="w-full flex flex-col items-center justify-center gap-6">
            <ZenTitle content={task.content} />
            <ZenBadges task={task} project={project} />
          </div>

          {(task.notes || task.subtasks.length > 0) && (
            <div className="w-full mt-8 flex flex-col gap-6">
              <ZenNotes notes={task.notes} />
              <ZenSubtasks subtasks={task.subtasks} />
            </div>
          )}
        </div>
      </div>
      <ZenExitButton onClick={onExit} />
    </div>
  );
}
