"use client";

import { useState } from "react";
import { useProjects } from "@modules/todo/use-projects";
import { useTasks } from "@modules/todo/use-tasks";
import { AppHeader } from "../../components/app-header";
import { TaskList } from "../../components/task-list";
import { TaskInputBar } from "../../components/task-input-bar";
import { TaskDrawer } from "../../components/task-drawer";
import { ZenModeView } from "../../components/zen-mode-view";
import { Search } from "lucide-react";

interface TaskBoardProps {
  projectId?: string | null;
  filter?: string | null;
}

export default function TaskBoard({ projectId, filter }: TaskBoardProps) {
  const { projects } = useProjects();
  const currentProject = projectId
    ? projects.find((p) => p.id === projectId)
    : null;

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
    zenModeTask,
    enterZenMode,
    exitZenMode,
  } = useTasks(projectId, filter);

  if (zenModeTask) {
    return (
      <main className="min-h-screen bg-[#fef6d9]">
        <ZenModeView
          task={zenModeTask}
          onExit={exitZenMode}
          onToggle={toggleTask}
          onUpdateContent={updateEdit}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fef6d9] pb-32">
      <div className="mx-auto max-w-2xl px-4">
        <AppHeader
          onToggleSearch={() => {
            setIsSearchVisible(!isSearchVisible);
            if (isSearchVisible) {
              setSearchQuery("");
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

        {currentProject && (
          <div className="mb-6 px-1 flex flex-col gap-2">
            <a
              href="/projects"
              className="text-sm font-bold text-gray-500 hover:text-black transition-colors w-fit"
            >
              ← Back to Projects
            </a>
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-full border-2 border-black"
                style={{ backgroundColor: currentProject.color }}
              ></div>
              <h2 className="text-2xl font-black">{currentProject.name}</h2>
            </div>
          </div>
        )}
        {filter && !currentProject && (
          <div className="mb-6 px-1 flex flex-col gap-2">
            <a
              href="/projects"
              className="text-sm font-bold text-gray-500 hover:text-black transition-colors w-fit"
            >
              ← Back to Projects
            </a>
            <h2 className="text-2xl font-black capitalize">{filter} Tasks</h2>
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
            onEnterZenMode={enterZenMode}
            showProject={!projectId}
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
              onEnterZenMode={enterZenMode}
              showProject={!projectId}
            />
          </section>
        )}
      </div>

      <TaskInputBar
        value={newTask}
        onChange={setNewTask}
        onSubmit={(fields) =>
          createTask({
            ...fields,
            projectId: fields?.projectId || projectId || undefined,
          })
        }
        currentProjectId={projectId}
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
        onEnterZenMode={enterZenMode}
        onUpdateDetails={updateTaskDetails}
      />
    </main>
  );
}
