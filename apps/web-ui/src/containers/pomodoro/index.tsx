"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useTasks } from "@modules/task/use-tasks";
import {
  usePomodoroSettings,
  type PomodoroSettingsType,
} from "@modules/pomodoro/use-pomodoro-settings";
import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Play,
  Pause,
  SkipForward,
  X,
  Star,
  Clock,
  Tag,
  Check,
} from "lucide-react";
import { toast } from "@paul/ui";
import { Button } from "src/components/button";
import { SimpleCard } from "src/components/simple-card";
import { Badge } from "src/components/badge";
import { Typography } from "src/components/typography";
import { useProjects } from "@modules/project/use-projects";
import Link from "next/link";

type PomodoroPhase = "focus" | "shortBreak" | "longBreak";

function getInitialTime(phase: PomodoroPhase, settings: PomodoroSettingsType) {
  if (phase === "focus") return settings.focusTime * 60;
  if (phase === "shortBreak") return settings.shortBreakTime * 60;
  return settings.longBreakTime * 60;
}

function usePomodoroLocal() {
  const [settings] = usePomodoroSettings();
  const [phase, setPhase] = useState<PomodoroPhase>("focus");
  const [isRunning, setIsRunning] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [timeLeft, setTimeLeft] = useState(() => settings.focusTime * 60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const notify = useCallback((title: string, body: string) => {
    if (
      typeof window !== "undefined" &&
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      new Notification(title, { body, icon: "/icon-192x192.png" });
    }
    toast.success(`${title}: ${body}`);
  }, []);

  const handleFinish = useCallback(
    (currentPhase: PomodoroPhase, currentCycles: number) => {
      setIsRunning(false);

      if (typeof window !== "undefined" && navigator.vibrate) {
        navigator.vibrate([400, 100, 400, 100, 600]);
      }

      if (currentPhase === "focus") {
        const nextCycles = currentCycles + 1;
        setCycles(nextCycles);
        const isLongBreak = nextCycles % 4 === 0;
        const nextPhase = isLongBreak ? "longBreak" : "shortBreak";
        setPhase(nextPhase);
        setTimeLeft(getInitialTime(nextPhase, settings));
        notify(
          "Pomodoro Finished",
          isLongBreak ? "Time for a long break!" : "Time for a short break!",
        );
      } else {
        setPhase("focus");
        setTimeLeft(getInitialTime("focus", settings));
        notify("Break Finished", "Ready to focus again?");
      }
    },
    [settings, notify],
  );

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      handleFinish(phase, cycles);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft, phase, cycles, handleFinish]);

  const toggleTimer = useCallback(() => {
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }
    setIsRunning((prev) => !prev);
  }, []);

  const skipPhase = useCallback(() => {
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }
    handleFinish(phase, cycles);
  }, [handleFinish, phase, cycles]);

  return { phase, timeLeft, isRunning, cycles, toggleTimer, skipPhase };
}

export default function Pomodoro() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const taskId = searchParams.get("taskId");

  const { todoTasks, finishedTasks } = useTasks();
  const { projects } = useProjects();

  const allTasks = [...todoTasks, ...finishedTasks];
  const task = taskId ? allTasks.find((task) => task.id === taskId) : null;
  const project = task?.projectId
    ? projects.find((p) => p.id === task.projectId)
    : null;

  const { phase, timeLeft, isRunning, cycles, toggleTimer, skipPhase } =
    usePomodoroLocal();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const phaseLabels: Record<PomodoroPhase, string> = {
    focus: t("pomodoro.phase.focus"),
    shortBreak: t("pomodoro.phase.short_break"),
    longBreak: t("pomodoro.phase.long_break"),
  };

  const hasDueDate = Boolean(task?.dueDate);
  const dueDateLabel = hasDueDate
    ? `${task?.dueDate}${task?.dueTime ? ` ${task?.dueTime}` : ""}`
    : "";

  return (
    <div className="min-h-screen bg-background px-4 pb-32 pt-28">
      <div className="mx-auto max-w-lg flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Typography variant="h2" className="uppercase tracking-tight">
            {t("pomodoro.title")}
          </Typography>
          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center w-10 h-10 rounded-base border-2 border-border bg-secondary-background shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <SimpleCard>
          <div className="flex flex-col items-center gap-6">
            <div className="flex w-full items-center justify-between">
              <Badge variant={phase === "focus" ? "yellow" : "default"}>
                {phaseLabels[phase]}
              </Badge>
              <Typography variant="small">
                {t("pomodoro.cycle", { current: (cycles % 4) + 1 })}
              </Typography>
            </div>

            <div className="text-8xl font-black tabular-nums tracking-[-0.05em] text-foreground py-2">
              {timeString}
            </div>

            <div className="flex gap-3 w-full">
              <Button
                onClick={toggleTimer}
                variant="primary"
                className="flex-1"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5" fill="currentColor" />
                    {t("pomodoro.pause")}
                  </>
                ) : (
                  <>
                    <Play
                      className="w-5 h-5 translate-x-0.5"
                      fill="currentColor"
                    />
                    {t("pomodoro.start")}
                  </>
                )}
              </Button>
              <button
                onClick={skipPhase}
                title={t("pomodoro.skip")}
                className="flex items-center justify-center w-14 rounded-xl border-2 border-border bg-secondary-background shadow-[4px_4px_0px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-95 transition-all cursor-pointer"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            <Link
              href="/settings/pomodoro"
              className="text-sm font-bold text-foreground/40 hover:text-foreground/80 transition-colors"
            >
              {t("pomodoro.settings_link")}
            </Link>
          </div>
        </SimpleCard>

        {task && (
          <SimpleCard>
            <div className="flex flex-col gap-4">
              <Typography variant="h3">{task.content}</Typography>

              <div className="flex flex-wrap gap-2">
                {project && (
                  <Badge>
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: project.color }}
                    />
                    {project.name}
                  </Badge>
                )}
                {task.important && (
                  <Badge variant="yellow">
                    <Star className="w-3 h-3" fill="currentColor" />
                    {t("pomodoro.badges.important")}
                  </Badge>
                )}
                {hasDueDate && (
                  <Badge>
                    <Clock className="w-3 h-3" />
                    {dueDateLabel}
                  </Badge>
                )}
                {task.tags?.map((tag) => (
                  <Badge key={tag} variant="blue">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {task.notes && (
                <div>
                  <Typography variant="small" className="mb-1">
                    {t("pomodoro.sections.notes")}
                  </Typography>
                  <Typography variant="p" className="whitespace-pre-wrap">
                    {task.notes}
                  </Typography>
                </div>
              )}

              {task.subtasks?.length > 0 && (
                <div>
                  <Typography variant="small" className="mb-2">
                    {t("pomodoro.sections.subtasks")}
                  </Typography>
                  <div className="flex flex-col gap-2">
                    {task.subtasks.map((subtask) => (
                      <div key={subtask.id} className="flex items-center gap-3">
                        <div
                          className={`flex items-center justify-center w-5 h-5 rounded-base border-2 border-border shrink-0 ${
                            subtask.done
                              ? "bg-[#a7f3d0] dark:bg-[#a7f3d0]/30"
                              : "bg-secondary-background"
                          }`}
                        >
                          {subtask.done && (
                            <Check className="w-3 h-3" strokeWidth={3} />
                          )}
                        </div>
                        <Typography
                          variant="p"
                          className={
                            subtask.done
                              ? "line-through text-foreground/40"
                              : ""
                          }
                        >
                          {subtask.content}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </SimpleCard>
        )}
      </div>
    </div>
  );
}
