"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { taskApiService } from "./task-api.service";
import { useAuth } from "@modules/auth/use-auth";
import { TaskManager } from "@modules/task/task-manager";
import type { Task } from "@paul/entities";
import { isUUID, generateUUID } from "@paul/utils";
import { SearchRanker } from "@paul/search-ranker";
import { toast } from "@paul/ui";

function normalizeTask(task: any): Task {
  const content = task.content ?? task.title ?? "";
  const title = task.title ?? task.content ?? "";
  return {
    ...task,
    id: task.id && isUUID(task.id) ? task.id : generateUUID(),
    content,
    title,
    done: Boolean(task.done),
    createdAt: task.createdAt ?? Date.now(),
    updatedAt: task.updatedAt ?? task.createdAt ?? Date.now(),
    deletedAt: task.deletedAt ?? (task.isDeleted ? Date.now() : null),
    notes: task.notes ?? "",
    important: task.important ?? false,
    dueDate: task.dueDate ?? "",
    dueTime: task.dueTime ?? "",
    url: task.url ?? "",
    subtasks: (task.subtasks ?? []).map(normalizeTask),
    tags: task.tags ?? [],
    projectId: task.projectId,
    isDeleted: task.isDeleted ?? false,
    isPinned: task.isPinned ?? false,
    color: task.color,
  };
}

function hasLegacyFields(task: any): boolean {
  if (
    !task.id ||
    !isUUID(task.id) ||
    task.content === undefined ||
    task.title === undefined ||
    task.done === undefined ||
    task.createdAt === undefined ||
    task.updatedAt === undefined ||
    (task.isDeleted && task.deletedAt === undefined) ||
    task.notes === undefined ||
    task.important === undefined ||
    task.dueDate === undefined ||
    task.dueTime === undefined ||
    task.url === undefined ||
    !Array.isArray(task.subtasks) ||
    !Array.isArray(task.tags) ||
    task.isPinned === undefined
  ) {
    return true;
  }

  return task.subtasks.some(hasLegacyFields);
}

function deriveParentTaskDoneState(
  currentDone: boolean,
  previousSubtasks: Task["subtasks"],
  nextSubtasks: Task["subtasks"],
) {
  if (nextSubtasks.length > 0) {
    return nextSubtasks.every((subtask) => subtask.done);
  }

  const hadAllDoneSubtasks =
    previousSubtasks.length > 0 &&
    previousSubtasks.every((subtask) => subtask.done);
  if (hadAllDoneSubtasks && currentDone) {
    return false;
  }

  return currentDone;
}

import { useSync } from "../sync/use-sync";

export function useTasks(projectId?: string | null, filter?: string | null) {
  const [tasks, setTasks] = useLocalStorage<Task[]>("todo-tasks", []);
  const { isSyncing, performSync } = useSync();
  const [newTask, setNewTask] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [zenModeTaskId, setZenModeTaskId] = useLocalStorage<string | null>(
    "todo-zen-mode",
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const hasLegacyTasks = useMemo(() => tasks.some(hasLegacyFields), [tasks]);
  const normalizedTasks = useMemo(
    () => (hasLegacyTasks ? tasks.map(normalizeTask) : tasks),
    [hasLegacyTasks, tasks],
  );

  useEffect(() => {
    if (!hasLegacyTasks) {
      return;
    }
    setTasks((prev) => prev.map(normalizeTask));
  }, [hasLegacyTasks, setTasks]);

  const manager = useMemo(
    () => new TaskManager(normalizedTasks),
    [normalizedTasks],
  );

  const filteredTasks = useMemo(() => {
    let result = SearchRanker.search(normalizedTasks, searchQuery);
    if (projectId) {
      result = result.filter((t) => t.projectId === projectId);
    }
    if (filter === "today") {
      const today = new Date().toISOString().split("T")[0];
      result = result.filter((t) => t.dueDate === today);
    } else if (filter === "scheduled") {
      result = result.filter((t) => !!t.dueDate);
    } else if (filter === "important") {
      result = result.filter((t) => t.important);
    }

    if (filter === "recently-deleted") {
      result = result.filter((t) => t.isDeleted);
    } else {
      result = result.filter((t) => !t.isDeleted);
    }

    return result;
  }, [normalizedTasks, searchQuery, projectId, filter]);

  const { todoTasks, finishedTasks } = useMemo(
    () =>
      filteredTasks.reduce<{ todoTasks: Task[]; finishedTasks: Task[] }>(
        (acc, task) => {
          if (task.done) acc.finishedTasks.push(task);
          else acc.todoTasks.push(task);
          return acc;
        },
        { todoTasks: [], finishedTasks: [] },
      ),
    [filteredTasks],
  );

  const selectedTask = useMemo(
    () => normalizedTasks.find((t) => t.id === selectedTaskId) ?? null,
    [normalizedTasks, selectedTaskId],
  );

  function createTask(additionalFields?: Partial<Task>) {
    setTasks(manager.create(newTask, additionalFields));
    setNewTask("");
    setTimeout(performSync, 1000);
  }

  function toggleTask(id: string) {
    const task = normalizedTasks.find((t) => t.id === id);
    if (task) {
      if (!task.done) {
        toast.success(`Task "${task.content}" resolved`);
      } else {
        toast(`Task "${task.content}" unresolved`);
      }
    }
    setTasks(manager.toggle(id));
    setTimeout(performSync, 1000);
  }

  function deleteTask(id: string) {
    const task = normalizedTasks.find((t) => t.id === id);
    if (task) {
      if (filter === "recently-deleted") {
        setTasks(manager.remove(id));
        toast.success(`Task "${task.content}" permanently deleted`);
      } else {
        setTasks(manager.softRemove(id));
        toast(`Task "${task.content}" deleted`, {
          action: {
            label: "Undo",
            onClick: () => restoreTask(id),
          },
        });
      }
    }

    if (editingTaskId === id) {
      setEditingTaskId(null);
      setEditingContent("");
    }
    if (selectedTaskId === id) {
      setSelectedTaskId(null);
    }
    setTimeout(performSync, 1000);
  }

  function restoreTask(id: string) {
    setTasks(manager.restore(id));
    toast.success("Task restored");
    setTimeout(performSync, 1000);
  }

  function startEdit(task: Task) {
    setEditingTaskId(task.id);
    setEditingContent(task.content);
  }

  function updateEdit(id: string, content: string) {
    setTasks(manager.update(id, content));
    setTimeout(performSync, 2000);
  }

  function updateTaskDetails(
    id: string,
    details: Partial<
      Pick<
        Task,
        | "notes"
        | "important"
        | "dueDate"
        | "dueTime"
        | "url"
        | "subtasks"
        | "tags"
        | "projectId"
        | "isPinned"
        | "color"
      >
    >,
  ) {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) {
          return task;
        }

        const normalizedTask = normalizeTask(task);
        const nextSubtasks = details.subtasks ?? normalizedTask.subtasks;

        const done = deriveParentTaskDoneState(
          normalizedTask.done,
          normalizedTask.subtasks,
          nextSubtasks,
        );

        return {
          ...normalizedTask,
          ...details,
          done,
          updatedAt: Date.now(),
        };
      }),
    );
    setTimeout(performSync, 1000);
  }

  function closeEdit() {
    setEditingTaskId(null);
    setEditingContent("");
  }

  function reorderTodoTasks(newTodo: Task[]) {
    setTasks((prev) => [...newTodo, ...prev.filter((t) => t.done)]);
    setTimeout(performSync, 5000);
  }

  function reorderFinishedTasks(newFinished: Task[]) {
    setTasks((prev) => [...prev.filter((t) => !t.done), ...newFinished]);
    setTimeout(performSync, 5000);
  }

  function openDrawer(task: Task) {
    setSelectedTaskId(task.id);
  }

  function closeDrawer() {
    setSelectedTaskId(null);
  }

  function clearFinishedTasks() {
    setTasks((prev) => prev.filter((t) => !t.done));
    setTimeout(performSync, 1000);
  }

  const { token } = useAuth();
  const [isSuggestingSubtasks, setIsSuggestingSubtasks] = useState(false);

  async function suggestSubtasks(taskId: string) {
    if (!token) return;

    setIsSuggestingSubtasks(true);
    try {
      const suggestions = await taskApiService.suggestSubtasks(token, taskId);

      const newSubtasks: Task[] = suggestions.map((content) => ({
        id: generateUUID(),
        content,
        title: content,
        done: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        notes: "",
        important: false,
        dueDate: "",
        dueTime: "",
        url: "",
        subtasks: [],
        tags: [],
        parentId: taskId,
      }));

      setTasks((prev) =>
        prev.map((task) => {
          if (task.id !== taskId) return task;
          return {
            ...task,
            subtasks: [...task.subtasks, ...newSubtasks],
            updatedAt: Date.now(),
          };
        }),
      );

      toast.success(`${suggestions.length} subtasks suggested by AI`);
      setTimeout(performSync, 1000);
    } catch (error) {
      toast.error("Failed to suggest subtasks");
      console.error(error);
    } finally {
      setIsSuggestingSubtasks(false);
    }
  }

  return {
    todoTasks,
    finishedTasks,
    isLoading,
    isSyncing,
    isSuggestingSubtasks,
    searchQuery,
    setSearchQuery,
    newTask,
    setNewTask,
    editingTaskId,
    editingContent,
    setEditingContent,
    selectedTask,
    createTask,
    toggleTask,
    deleteTask,
    restoreTask,
    startEdit,
    updateEdit,
    updateTaskDetails,
    suggestSubtasks,
    closeEdit,
    openDrawer,
    closeDrawer,
    clearFinishedTasks,
    reorderTodoTasks,
    reorderFinishedTasks,
    zenModeTaskId,
    zenModeTask: normalizedTasks.find((t) => t.id === zenModeTaskId) ?? null,
    enterZenMode: (id: string) => setZenModeTaskId(id),
    exitZenMode: () => setZenModeTaskId(null),
    performSync,
  };
}
