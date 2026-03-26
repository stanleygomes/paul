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

  const { todoTasks, finishedTasks } = useMemo(
    () =>
      tasks.reduce<{ todoTasks: Task[]; finishedTasks: Task[] }>(
        (acc, task) => {
          if (task.done) acc.finishedTasks.push(task);
          else acc.todoTasks.push(task);
          return acc;
        },
        { todoTasks: [], finishedTasks: [] },
      ),
    [tasks],
  );

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

  function reorderTodoTasks(newTodo: Task[]) {
    setTasks((prev) => [...newTodo, ...prev.filter((t) => t.done)]);
  }

  function reorderFinishedTasks(newFinished: Task[]) {
    setTasks((prev) => [...prev.filter((t) => !t.done), ...newFinished]);
  }

  return {
    todoTasks,
    finishedTasks,
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
    reorderTodoTasks,
    reorderFinishedTasks,
  };
}
