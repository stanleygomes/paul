"use client";

import { useTasks } from "@modules/todo/use-tasks";
import { AppHeader } from "../components/app-header";
import { TaskList } from "../components/task-list";
import { TaskInputBar } from "../components/task-input-bar";

export default function Home() {
  const {
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
  } = useTasks();

  return (
    <main className="min-h-screen bg-[#fef6d9] pb-32">
      <div className="mx-auto max-w-2xl px-4">
        <AppHeader />

        <section className="flex flex-col gap-4">
          <TaskList
            tasks={todoTasks}
            editingTaskId={editingTaskId}
            editingContent={editingContent}
            onEditingContentChange={setEditingContent}
            onToggle={toggleTask}
            onStartEdit={startEdit}
            onUpdateEdit={updateEdit}
            onCloseEdit={closeEdit}
            onDelete={deleteTask}
            onReorder={reorderTodoTasks}
          />
        </section>

        {finishedTasks.length > 0 && (
          <section className="flex flex-col gap-4 mt-10">
            <h2 className="text-2xl font-black text-black px-1">Finished</h2>
            <TaskList
              tasks={finishedTasks}
              editingTaskId={editingTaskId}
              editingContent={editingContent}
              onEditingContentChange={setEditingContent}
              onToggle={toggleTask}
              onStartEdit={startEdit}
              onUpdateEdit={updateEdit}
              onCloseEdit={closeEdit}
              onDelete={deleteTask}
              onReorder={reorderFinishedTasks}
            />
          </section>
        )}
      </div>

      <TaskInputBar
        value={newTask}
        onChange={setNewTask}
        onSubmit={createTask}
      />
    </main>
  );
}
