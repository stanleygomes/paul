"use client";

import { useTasks } from "@modules/todo/use-tasks";
import { AppHeader } from "../components/app-header";
import { TaskList } from "../components/task-list";
import { TaskInputBar } from "../components/task-input-bar";

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
    updateEdit,
    closeEdit,
  } = useTasks();

  return (
    <main className="min-h-screen bg-[#fef6d9] pb-32">
      <div className="mx-auto max-w-2xl px-4">
        <AppHeader />

        <section className="flex flex-col gap-4">
          <TaskList
            tasks={tasks}
            editingTaskId={editingTaskId}
            editingContent={editingContent}
            onEditingContentChange={setEditingContent}
            onToggle={toggleTask}
            onStartEdit={startEdit}
            onUpdateEdit={updateEdit}
            onCloseEdit={closeEdit}
            onDelete={deleteTask}
          />
        </section>
      </div>

      <TaskInputBar
        value={newTask}
        onChange={setNewTask}
        onSubmit={createTask}
      />
    </main>
  );
}
