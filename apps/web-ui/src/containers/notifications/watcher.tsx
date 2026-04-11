"use client";

import { useEffect, useMemo, useRef } from "react";
import { useLocalStorage } from "usehooks-ts";
import { NotificationManager } from "@modules/notifications/manager";
import { parseISO, isAfter } from "date-fns";
import type { Task } from "@paul/entities";

export function NotificationWatcher() {
  const [tasks] = useLocalStorage<Task[]>("todo-tasks", []);

  const todoTasks = useMemo(
    () => tasks.filter((t) => !t.isDeleted && !t.done),
    [tasks],
  );

  const prevTasksRef = useRef<string>("");

  useEffect(() => {
    if (
      typeof Notification === "undefined" ||
      Notification.permission !== "granted"
    )
      return;

    const currentTasksHash = JSON.stringify(
      todoTasks.map((t) => ({ id: t.id, date: t.dueDate, time: t.dueTime })),
    );

    if (currentTasksHash === prevTasksRef.current) return;
    prevTasksRef.current = currentTasksHash;

    todoTasks.forEach((task) => {
      if (!task.dueDate) {
        NotificationManager.cancel(task.id);
        return;
      }

      const dateStr = task.dueTime
        ? `${task.dueDate}T${task.dueTime}`
        : `${task.dueDate}T09:00:00`;

      try {
        const scheduledDate = parseISO(dateStr);
        if (isAfter(scheduledDate, new Date())) {
          NotificationManager.schedule(task.id, task.content, scheduledDate);
        } else {
          NotificationManager.cancel(task.id);
        }
      } catch (e) {
        console.error("Erro ao agendar notificação:", e);
      }
    });
  }, [todoTasks]);

  return null;
}
