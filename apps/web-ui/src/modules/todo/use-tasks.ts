"use client";

import { useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { TaskManager } from "@modules/todo/task-manager";
import type { Task } from "@models/task";

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("todo-tasks", []);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const manager = useMemo(() => new TaskManager(tasks), [tasks]);

  function createTask() {
    setTasks(manager.create(newTask));
    setNewTask("");
  }

  function toggleTask(id: string) {
    setTasks(manager.toggle(id));
  }

  function deleteTask(id: string) {
    setTasks(manager.remove(id));
    if (editingTaskId === id) {
      setEditingTaskId(null);
      setEditingContent("");
    }
  }

  function startEdit(task: Task) {
    setEditingTaskId(task.id);
    setEditingContent(task.content);
  }

  function updateEdit(id: string, content: string) {
    setTasks(manager.update(id, content));
  }

  function closeEdit() {
    setEditingTaskId(null);
    setEditingContent("");
  }

  return {
    tasks,
    newTask,
    setNewTask,
    editingTaskId,
    editingContent,
    setEditingContent,
    createTask,
    toggleTask,
    deleteTask,
    startEdit,
    updateEdit,
    closeEdit,
  };
}
