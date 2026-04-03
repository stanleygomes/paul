"use client";

import { useEffect, useState } from "react";
import { useProjects } from "@modules/project/use-projects";
import { useTasks } from "@modules/task/use-tasks";
import { TaskList } from "./task-list";
import { CreateTaskInput } from "../create-task-input";
import { TaskDrawer } from "../task-drawer";
import { ZenModeView } from "../zen-mode";
import { useSearchParams } from "next/navigation";
import { TaskSearch } from "./task-search";
import { BoardHeader } from "./project-header";
import { FinishedHeader } from "./finished-header";

interface TaskBoardProps {
  projectId?: string | null;
  filter?: string | null;
}

export default function TaskBoard({ projectId, filter }: TaskBoardProps) {
  const searchParams = useSearchParams();
  const isSearchVisible = searchParams.get("search") === "true";

  const { projects } = useProjects();
  const currentProject = projectId
    ? projects.find((p) => p.id === projectId)
    : null;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
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
    restoreTask,
    startEdit,
    updateEdit,
    updateTaskDetails,
    suggestSubtasks,
    isSuggestingSubtasks,
    closeEdit,
    openDrawer,
    closeDrawer,
    reorderTodoTasks,
    reorderFinishedTasks,
    clearFinishedTasks,
    zenModeTask,
    enterZenMode,
    exitZenMode,
    isLoading,
  } = useTasks(projectId, filter);

  const handleOpenDrawer = (task: any) => {
    openDrawer(task);
  };

  const isRecentlyDeleted = filter === "recently-deleted";

  useEffect(() => {
    if (!isSearchVisible && searchQuery !== "") {
      setSearchQuery("");
    }
  }, [isSearchVisible, searchQuery, setSearchQuery]);

  if (!mounted) {
    return null;
  }

  if (zenModeTask) {
    return (
      <main className="min-h-screen bg-background">
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
    <main className="min-h-screen bg-background pb-20 sm:pb-40 px-4">
      <div className="mx-auto max-w-2xl pt-28 sm:pt-32">
        {isSearchVisible && (
          <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-300">
            <TaskSearch query={searchQuery} onQueryChange={setSearchQuery} />
          </div>
        )}

        {currentProject && (
          <BoardHeader
            title={currentProject.name}
            color={currentProject.color}
          />
        )}

        {filter && !currentProject && (
          <BoardHeader title={filter} isFilter={true} />
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
            onRestore={restoreTask}
            onReorder={reorderTodoTasks}
            onOpenDrawer={handleOpenDrawer}
            onUpdateDetails={updateTaskDetails}
            onEnterZenMode={enterZenMode}
            showProject={!projectId}
            isLoading={isLoading}
            isRecentlyDeleted={isRecentlyDeleted}
          />
        </section>

        {finishedTasks.length > 0 && (
          <section className="flex flex-col gap-4 mt-10">
            <FinishedHeader onClear={clearFinishedTasks} />
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
              onRestore={restoreTask}
              onReorder={reorderFinishedTasks}
              onOpenDrawer={handleOpenDrawer}
              onUpdateDetails={updateTaskDetails}
              onEnterZenMode={enterZenMode}
              showProject={!projectId}
              isLoading={isLoading}
              isRecentlyDeleted={isRecentlyDeleted}
            />
          </section>
        )}
      </div>

      <CreateTaskInput
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
        onRestore={restoreTask}
        onEnterZenMode={enterZenMode}
        onUpdateDetails={updateTaskDetails}
        onSuggestSubtasks={suggestSubtasks}
        isSuggestingSubtasks={isSuggestingSubtasks}
        isRecentlyDeleted={isRecentlyDeleted}
      />
    </main>
  );
}
