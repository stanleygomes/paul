"use client";

import { useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import type { Project } from "@models/project";
import { generateUUID, isUUID } from "@done/utils/src/uuid-utils";

function normalizeProject(project: Project): Project {
  return {
    ...project,
    id: project.id && isUUID(project.id) ? project.id : generateUUID(),
    color: project.color || "#8ecae6",
    createdAt:
      typeof project.createdAt === "number" ? project.createdAt : Date.now(),
  };
}

function hasLegacyFields(project: Project) {
  return (
    !project.id ||
    !isUUID(project.id) ||
    !project.color ||
    typeof project.createdAt !== "number"
  );
}

export function useProjects() {
  const [projects, setProjects] = useLocalStorage<Project[]>("todo-projects", []);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectColor, setNewProjectColor] = useState("#8ecae6");
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingProjectName, setEditingProjectName] = useState("");
  const [editingProjectColor, setEditingProjectColor] = useState("#8ecae6");

  const normalizedProjects = useMemo(
    () =>
      projects
        .map(normalizeProject)
        .sort((a, b) => a.name.localeCompare(b.name, "en")),
    [projects],
  );

  const hasLegacyProjects = useMemo(
    () => projects.some(hasLegacyFields),
    [projects],
  );

  if (hasLegacyProjects) {
    setProjects((prev) => prev.map(normalizeProject));
  }

  function createProject() {
    const name = newProjectName.trim();
    if (!name) {
      return;
    }

    setProjects((prev) => [
      ...prev,
      {
        id: generateUUID(),
        name,
        color: newProjectColor,
        createdAt: Date.now(),
      },
    ]);
    setNewProjectName("");
    setNewProjectColor("#8ecae6");
  }

  function startEditProject(project: Project) {
    setEditingProjectId(project.id);
    setEditingProjectName(project.name);
    setEditingProjectColor(project.color);
  }

  function cancelEditProject() {
    setEditingProjectId(null);
    setEditingProjectName("");
    setEditingProjectColor("#8ecae6");
  }

  function updateProject() {
    if (!editingProjectId) {
      return;
    }
    const name = editingProjectName.trim();
    if (!name) {
      return;
    }

    setProjects((prev) =>
      prev.map((project) =>
        project.id === editingProjectId
          ? {
              ...project,
              name,
              color: editingProjectColor,
            }
          : project,
      ),
    );
    cancelEditProject();
  }

  function deleteProject(id: string) {
    setProjects((prev) => prev.filter((project) => project.id !== id));
    if (editingProjectId === id) {
      cancelEditProject();
    }
  }

  return {
    projects: normalizedProjects,
    newProjectName,
    setNewProjectName,
    newProjectColor,
    setNewProjectColor,
    editingProjectId,
    editingProjectName,
    setEditingProjectName,
    editingProjectColor,
    setEditingProjectColor,
    createProject,
    startEditProject,
    cancelEditProject,
    updateProject,
    deleteProject,
  };
}
