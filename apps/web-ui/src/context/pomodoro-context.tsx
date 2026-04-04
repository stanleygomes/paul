"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
  useCallback,
} from "react";
import { toast } from "@paul/ui";

export type PomodoroPhase = "focus" | "shortBreak" | "longBreak";

interface PomodoroSettings {
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
}

const DEFAULT_SETTINGS: PomodoroSettings = {
  focusTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
};

interface PomodoroContextType {
  phase: PomodoroPhase;
  timeLeft: number;
  isRunning: boolean;
  cycles: number;
  settings: PomodoroSettings;
  progress: number;
  toggleTimer: () => void;
  skipPhase: () => void;
  updateSettings: (settings: Partial<PomodoroSettings>) => void;
}

const PomodoroContext = createContext<PomodoroContextType | null>(null);

const STORAGE_KEY = "app-pomodoro-settings";

export function PomodoroProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<PomodoroSettings>(() => {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
      : DEFAULT_SETTINGS;
  });

  const [phase, setPhase] = useState<PomodoroPhase>("focus");
  const [timeLeft, setTimeLeft] = useState(settings.focusTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [cycles, setCycles] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getInitialTime = useCallback(
    (p: PomodoroPhase, s: PomodoroSettings) => {
      if (p === "focus") return s.focusTime * 60;
      if (p === "shortBreak") return s.shortBreakTime * 60;
      return s.longBreakTime * 60;
    },
    [],
  );

  const totalTime = getInitialTime(phase, settings);
  const progress =
    totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(getInitialTime(phase, settings));
    }
  }, [settings, phase, isRunning, getInitialTime]);

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

  const handleFinish = useCallback(() => {
    setIsRunning(false);

    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate([400, 100, 400, 100, 600]);
    }

    if (phase === "focus") {
      const nextCycles = cycles + 1;
      setCycles(nextCycles);
      const isLongBreak = nextCycles % 4 === 0;
      setPhase(isLongBreak ? "longBreak" : "shortBreak");
      notify(
        "Pomodoro Finished",
        isLongBreak ? "Time for a long break!" : "Time for a short break!",
      );
    } else {
      setPhase("focus");
      notify("Break Finished", "Ready to focus again?");
    }
  }, [phase, cycles, notify]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      handleFinish();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft, handleFinish]);

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
    handleFinish();
  }, [handleFinish]);

  const updateSettings = useCallback(
    (newSettings: Partial<PomodoroSettings>) => {
      setSettings((prev) => {
        const updated = { ...prev, ...newSettings };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    [],
  );

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "Notification" in window &&
      Notification.permission === "default"
    ) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <PomodoroContext.Provider
      value={{
        phase,
        timeLeft,
        isRunning,
        cycles,
        settings,
        progress,
        toggleTimer,
        skipPhase,
        updateSettings,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoro() {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error("usePomodoro must be used within a PomodoroProvider");
  }
  return context;
}
