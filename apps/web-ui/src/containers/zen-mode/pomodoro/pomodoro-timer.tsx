"use client";

import { useTranslation } from "react-i18next";
import {
  usePomodoro,
  PomodoroPhase,
} from "../../../modules/pomodoro/pomodoro-context";
import { Play, Pause, FastForward, Timer } from "lucide-react";
import Link from "next/link";
import { PomodoroInstructions } from "./pomodoro-instructions";
import { motion, AnimatePresence } from "framer-motion";

export function PomodoroTimer() {
  const { t } = useTranslation();
  const {
    phase,
    timeLeft,
    isRunning,
    cycles,
    toggleTimer,
    skipPhase,
    progress,
  } = usePomodoro();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const phaseColors: Record<PomodoroPhase, string> = {
    focus: "from-main to-[#f472b6]",
    shortBreak: "from-[#cbf0f8] to-[#93c5fd]",
    longBreak: "from-[#f8cbdf] to-[#c084fc]",
  };

  const ringColors: Record<PomodoroPhase, string> = {
    focus: "stroke-main",
    shortBreak: "stroke-[#cbf0f8]",
    longBreak: "stroke-[#f8cbdf]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-8 bg-secondary-background/80 backdrop-blur-xl border-2 border-border p-12 rounded-[2.5rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.05)] w-full max-w-md mx-auto my-12"
    >
      <div className="flex w-full items-center justify-between gap-4">
        <div
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-border font-black text-xs uppercase tracking-[0.2em] bg-gradient-to-r ${phaseColors[phase]} text-black`}
        >
          <Timer className="w-4 h-4" />
          {t(`zen_mode.pomodoro.timer.${phase}`)}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-black bg-background/50 px-4 py-1.5 rounded-full border-2 border-border">
            {t("zen_mode.pomodoro.timer.cycle", { current: (cycles % 4) + 1 })}
          </span>
          <PomodoroInstructions />
        </div>
      </div>

      <div className="relative w-72 h-72 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
          <circle
            cx="144"
            cy="144"
            r="130"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-border/30"
          />
          <motion.circle
            cx="144"
            cy="144"
            r="130"
            fill="none"
            strokeWidth="12"
            strokeLinecap="round"
            className={ringColors[phase]}
            initial={{ strokeDasharray: "816.8", strokeDashoffset: "816.8" }}
            animate={{ strokeDashoffset: 816.8 - (816.8 * progress) / 100 }}
            transition={{ type: "spring", bounce: 0, duration: 1 }}
          />
        </svg>

        <AnimatePresence mode="wait">
          <motion.div
            key={timeString}
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -5, opacity: 0 }}
            className="text-8xl md:text-9xl font-black tabular-nums tracking-[-0.05em] text-foreground drop-shadow-sm"
          >
            {timeString}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-6 w-full">
        <div className="flex items-center gap-4 w-full">
          <button
            onClick={toggleTimer}
            className="flex-1 group relative flex items-center justify-center gap-3 h-20 bg-main text-main-foreground font-black text-xl rounded-2xl border-b-4 border-black/20 active:translate-y-1 active:border-b-0 hover:brightness-105 transition-all shadow-lg"
          >
            {isRunning ? (
              <>
                <Pause className="w-8 h-8" fill="currentColor" />
                {t("zen_mode.pomodoro.timer.pause")}
              </>
            ) : (
              <>
                <Play className="w-8 h-8 translate-x-0.5" fill="currentColor" />
                {t("zen_mode.pomodoro.timer.start")}
              </>
            )}
          </button>

          <button
            onClick={skipPhase}
            className="flex-none flex items-center justify-center w-20 h-20 bg-background text-foreground rounded-2xl border-2 border-border shadow-md hover:translate-y-[-2px] hover:shadow-lg active:translate-y-1 transition-all"
            title={t("zen_mode.pomodoro.timer.skip")}
          >
            <FastForward className="w-8 h-8" fill="currentColor" />
          </button>
        </div>

        <Link
          href="/settings/pomodoro"
          className="text-sm text-foreground/40 hover:text-foreground/80 transition-all font-bold tracking-tight hover:scale-105 active:scale-95"
        >
          {t("zen_mode.pomodoro.timer.settings_link")}
        </Link>
      </div>
    </motion.div>
  );
}
