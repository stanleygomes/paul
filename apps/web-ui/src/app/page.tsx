"use client";

import { useState } from "react";

import { useTasks } from "@modules/todo/use-tasks";
import { AppHeader } from "../components/app-header";
import { TaskList } from "../components/task-list";
import { TaskInputBar } from "../components/task-input-bar";
import { TaskDrawer } from "../components/task-drawer";
import { Search } from "lucide-react";

export default function Home() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const {
    todoTasks,
    finishedTasks,
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
    startEdit,
    updateEdit,
    updateTaskDetails,
    closeEdit,
    openDrawer,
    closeDrawer,
    reorderTodoTasks,
    reorderFinishedTasks,
    clearFinishedTasks,
  } = useTasks();

  return (
    <main className="min-h-screen bg-[#fef6d9] pb-32">
      <div className="mx-auto max-w-2xl px-4">
        <AppHeader
          onToggleSearch={() => {
            setIsSearchVisible(!isSearchVisible);
            if (isSearchVisible) {
              setSearchQuery(""); // Clear search when hiding
            }
          }}
          isSearchVisible={isSearchVisible}
        />

        {isSearchVisible && (
          <div className="mb-8 relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-black rounded-xl pl-12 pr-4 py-3 text-lg font-bold placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/90 transition-shadow outline-none"
              autoFocus
            />
          </div>
        )}

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
            onOpenDrawer={openDrawer}
          />
        </section>

        {finishedTasks.length > 0 && (
          <section className="flex flex-col gap-4 mt-10">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-2xl font-black text-black">Finished</h2>
              <button
                onClick={clearFinishedTasks}
                className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
              >
                Delete all finished tasks
              </button>
            </div>
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
              onOpenDrawer={openDrawer}
            />
          </section>
        )}
      </div>

      <TaskInputBar
        value={newTask}
        onChange={setNewTask}
        onSubmit={createTask}
      />

      <TaskDrawer
        task={selectedTask}
        isOpen={selectedTask !== null}
        isEditing={editingTaskId === selectedTask?.id}
        editingContent={editingContent}
        onEditingContentChange={setEditingContent}
        onClose={closeDrawer}
        onToggle={toggleTask}
        onStartEdit={startEdit}
        onUpdateEdit={updateEdit}
        onCloseEdit={closeEdit}
        onDelete={deleteTask}
        onUpdateDetails={updateTaskDetails}
      />
    </main>
  );
}
