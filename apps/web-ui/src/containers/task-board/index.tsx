"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
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
import { PageActions } from "src/components/page-actions";
import { Plus, Search } from "lucide-react";
import { PinnedTasks } from "./pinned-tasks";
import { useTopMenu } from "@modules/menu-layout/use-top-menu";
import { UserAvatar } from "src/components/user-avatar";
import { useRouter, usePathname } from "next/navigation";
import { Drawer, DrawerContent } from "@paul/ui";

interface TaskBoardProps {
  projectId?: string | null;
  filter?: string | null;
}

export default function TaskBoard({ projectId, filter }: TaskBoardProps) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isSearchVisible = searchParams.get("search") === "true";
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);

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

  const pinnedTasks = [...todoTasks, ...finishedTasks].filter(
    (t) => t.isPinned,
  );

  const { setLeftContent, setRightContent } = useTopMenu();
  const router = useRouter();

  const toggleSearch = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (isSearchVisible) {
      params.delete("search");
    } else {
      params.set("search", "true");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [isSearchVisible, pathname, router, searchParams]);

  useEffect(() => {
    setLeftContent(<UserAvatar className="h-12 w-12 ml-2" />);
    setRightContent(
      <PageActions
        actions={[
          {
            icon: Plus,
            onClick: () => setIsCreateDrawerOpen(true),
            label: t("actions.create_task"),
          },
          {
            icon: Search,
            onClick: toggleSearch,
            isActive: isSearchVisible,
            label: t("actions.search"),
          },
        ]}
      />,
    );

    return () => {
      setLeftContent(null);
      setRightContent(null);
    };
  }, [setLeftContent, setRightContent, isSearchVisible, toggleSearch, t]);

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
    <main className="min-h-screen bg-background pb-32 sm:pb-40 px-4">
      <div className="mx-auto max-w-2xl pt-28">
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

        {/* '{filter && !currentProject && (
          <BoardHeader title={filter} isFilter={true} />
        )} */}

        <PinnedTasks
          tasks={pinnedTasks}
          onToggle={toggleTask}
          onUnpin={(id) => updateTaskDetails(id, { isPinned: false })}
          onOpenDrawer={handleOpenDrawer}
          onUpdateDetails={updateTaskDetails}
        />

        <section className="flex flex-col gap-4">
          <TaskList
            tasks={todoTasks}
            editingTaskId={selectedTask === null ? editingTaskId : null}
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
              editingTaskId={selectedTask === null ? editingTaskId : null}
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

      <Drawer
        open={isCreateDrawerOpen}
        onOpenChange={(open) => setIsCreateDrawerOpen(open)}
      >
        <DrawerContent className="bg-background pb-safe-bottom">
          <CreateTaskInput
            mode="drawer"
            value={newTask}
            onChange={setNewTask}
            onSubmit={(fields) =>
              createTask({
                ...fields,
                projectId: fields?.projectId || projectId || undefined,
              })
            }
            onClose={() => setIsCreateDrawerOpen(false)}
            currentProjectId={projectId}
          />
        </DrawerContent>
      </Drawer>
    </main>
  );
}
