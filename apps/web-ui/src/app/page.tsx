"use client";

import { useTasks } from "@modules/todo/use-tasks";
import { TaskList } from "./components/task-list";
import { TaskInputBar } from "./components/task-input-bar";

export default function Home() {
  const {
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
    saveEdit,
    cancelEdit,
  } = useTasks();

  return (
    <main className="min-h-screen bg-[#fef6d9] px-4 pb-32 pt-8">
      <section className="mx-auto flex max-w-2xl flex-col gap-4">
        <h1 className="text-center text-3xl font-black">Todo Tasks</h1>

        <TaskList
          tasks={tasks}
          editingTaskId={editingTaskId}
          editingContent={editingContent}
          onEditingContentChange={setEditingContent}
          onToggle={toggleTask}
          onStartEdit={startEdit}
          onSaveEdit={saveEdit}
          onCancelEdit={cancelEdit}
          onDelete={deleteTask}
        />
      </section>

      <TaskInputBar
        value={newTask}
        onChange={setNewTask}
        onSubmit={createTask}
      />
    </main>
  );
}
