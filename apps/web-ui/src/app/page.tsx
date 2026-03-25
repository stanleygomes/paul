"use client";

import { FormEvent, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { TaskManager } from "@modules/todo/task-manager";
import type { Task } from "@models/task";

export default function Home() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("todo-tasks", []);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const manager = useMemo(() => new TaskManager(tasks), [tasks]);

  const handleCreateTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTasks(manager.create(newTask));
    setNewTask("");
  };

  const handleToggleTask = (id: string) => {
    setTasks(manager.toggle(id));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(manager.remove(id));
    if (editingTaskId === id) {
      setEditingTaskId(null);
      setEditingContent("");
    }
  };

  const handleStartEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingContent(task.content);
  };

  const handleSaveEdit = (id: string) => {
    setTasks(manager.update(id, editingContent));
    setEditingTaskId(null);
    setEditingContent("");
  };

  return (
    <main className="min-h-screen bg-[#fef6d9] px-4 pb-32 pt-8">
      <section className="mx-auto flex max-w-2xl flex-col gap-4">
        <h1 className="text-center text-3xl font-black">Todo Tasks</h1>

        {tasks.length === 0 ? (
          <div className="rounded-base border-2 border-black bg-[#ffe066] p-8 text-center shadow-shadow">
            <p className="text-xl font-bold">No tasks yet.</p>
            <p className="mt-2 text-sm font-medium">
              Create your first task below and start getting things done.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {tasks.map((task) => {
              const isEditing = editingTaskId === task.id;
              return (
                <li
                  key={task.id}
                  className="rounded-base border-2 border-black bg-white p-4 shadow-shadow"
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      className={`mt-1 h-6 w-6 shrink-0 rounded-base border-2 border-black text-sm font-black ${
                        task.done ? "bg-[#a7f3d0]" : "bg-[#ffb3c6]"
                      }`}
                      onClick={() => handleToggleTask(task.id)}
                      aria-label={
                        task.done ? "Mark as not done" : "Mark as done"
                      }
                    >
                      {task.done ? "✓" : ""}
                    </button>

                    <div className="flex-1">
                      {isEditing ? (
                        <input
                          value={editingContent}
                          onChange={(event) =>
                            setEditingContent(event.target.value)
                          }
                          className="w-full rounded-base border-2 border-black bg-[#fffaf0] px-3 py-2 text-sm font-medium outline-none"
                        />
                      ) : (
                        <p
                          className={`text-base font-semibold ${
                            task.done
                              ? "text-gray-500 line-through"
                              : "text-black"
                          }`}
                        >
                          {task.content}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <button
                            type="button"
                            className="rounded-base border-2 border-black bg-[#bde0fe] px-2 py-1 text-xs font-bold shadow-shadow"
                            onClick={() => handleSaveEdit(task.id)}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="rounded-base border-2 border-black bg-[#f1f5f9] px-2 py-1 text-xs font-bold shadow-shadow"
                            onClick={() => {
                              setEditingTaskId(null);
                              setEditingContent("");
                            }}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="rounded-base border-2 border-black bg-[#cdb4db] px-2 py-1 text-xs font-bold shadow-shadow"
                          onClick={() => handleStartEdit(task)}
                        >
                          Edit
                        </button>
                      )}

                      <button
                        type="button"
                        className="rounded-base border-2 border-black bg-[#ff8fab] px-2 py-1 text-xs font-bold shadow-shadow"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <form
        onSubmit={handleCreateTask}
        className="fixed bottom-0 left-0 right-0 border-t-2 border-black bg-[#ffd670] p-4"
      >
        <div className="mx-auto flex w-full max-w-2xl gap-2">
          <input
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="Create a new task..."
            className="flex-1 rounded-base border-2 border-black bg-white px-4 py-3 text-sm font-medium outline-none"
          />
          <button
            type="submit"
            className="rounded-base border-2 border-black bg-[#00f5d4] px-5 py-3 text-sm font-bold shadow-shadow"
          >
            Add
          </button>
        </div>
      </form>
    </main>
  );
}
