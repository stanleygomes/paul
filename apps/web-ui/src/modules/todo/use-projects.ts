"use client";

import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Project } from "@done/entities";
import { generateUUID } from "@done/utils";
import { useSync } from "./use-sync";

export function useProjects() {
  const [projects, setProjects] = useLocalStorage<Project[]>(
    "todo-projects",
    [],
  );
  const { isSyncing, performSync } = useSync();

  useEffect(() => {
    performSync();
  }, [performSync]);

  function createProject(name: string, color: string) {
    const newProject: Project = {
      id: generateUUID(),
      name,
      color,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setProjects((prev: Project[]) => [...prev, newProject]);
    setTimeout(performSync, 1000);
  }

  function updateProject(id: string, name: string, color: string) {
    setProjects((prev: Project[]) =>
      prev.map((p: Project) =>
        p.id === id ? { ...p, name, color, updatedAt: Date.now() } : p,
      ),
    );
    setTimeout(performSync, 1000);
  }

  function deleteProject(id: string) {
    setProjects((prev: Project[]) =>
      prev.map((p: Project) =>
        p.id === id
          ? {
              ...p,
              isDeleted: true,
              deletedAt: Date.now(),
              updatedAt: Date.now(),
            }
          : p,
      ),
    );
    setTimeout(performSync, 1000);
  }

  return {
    projects: projects.filter((p: Project) => !p.isDeleted),
    isSyncing,
    createProject,
    updateProject,
    deleteProject,
    performSync,
  };
}
