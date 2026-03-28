"use client";

import { useEffect, useState } from "react";
import { useProjects } from "@modules/todo/use-projects";
import { useTasks } from "@modules/todo/use-tasks";
import { AppHeader } from "./task-header";
import { TaskList } from "./task-list";
import { CreateTaskInput } from "../create-task-input";
import { TaskDrawer } from "./task-drawer";
import { ZenModeView } from "../zen-mode";
import { useRouter } from "next/navigation";
import { TaskSearch } from "./task-search";
import { BoardHeader } from "./board-header";
import { FinishedHeader } from "./finished-header";

interface TaskBoardProps {
  projectId?: string | null;
  filter?: string | null;
}

export default function TaskBoard({ projectId, filter }: TaskBoardProps) {
  const router = useRouter();
  const { projects } = useProjects();
  const currentProject = projectId
    ? projects.find((p) => p.id === projectId)
    : null;

  const [mounted, setMounted] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

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

  if (!mounted) {
    return null;
  }

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
      <div className="mx-auto max-w-2xl">
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
          <TaskSearch query={searchQuery} onQueryChange={setSearchQuery} />
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
            onReorder={reorderTodoTasks}
            onOpenDrawer={openDrawer}
            onUpdateDetails={updateTaskDetails}
            onEnterZenMode={enterZenMode}
            showProject={!projectId}
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
              onReorder={reorderFinishedTasks}
              onOpenDrawer={openDrawer}
              onUpdateDetails={updateTaskDetails}
              onEnterZenMode={enterZenMode}
              showProject={!projectId}
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
        onEnterZenMode={enterZenMode}
        onUpdateDetails={updateTaskDetails}
        onOpenFullPage={(id) => router.push(`/task/${id}`)}
      />
    </main>
  );
}
