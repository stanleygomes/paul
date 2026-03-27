"use client";

import { useState } from "react";
import { useProjects } from "@modules/todo/use-projects";
import ProjectFormDrawer from "./form-drawer";
import ProjectDeleteDrawer from "./delete-drawer";
import { Project } from "@models/project";
import { PROJECT_COLORS } from "../../constants/project-colors";
import TaskFilters from "./filters";
import ProjectList from "./list";
import ProjectHeader from "./header";
import ProjectListHeader from "./list-header";

export default function Projects() {
  const { projects, createProject, updateProject, deleteProject } =
    useProjects();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState("");
  const [projectColor, setProjectColor] = useState<string>(
    PROJECT_COLORS[0] || "#ef4444",
  );

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const openCreateDrawer = () => {
    setEditingProject(null);
    setProjectName("");
    setProjectColor(PROJECT_COLORS[0] || "#ef4444");
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (project: Project) => {
    setEditingProject(project);
    setProjectName(project.name);
    setProjectColor(project.color);
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    if (!projectName.trim()) return;
    if (editingProject && editingProject.id) {
      updateProject(editingProject.id, projectName.trim(), projectColor!);
    } else {
      createProject(projectName.trim(), projectColor!);
    }
    setIsDrawerOpen(false);
  };

  const confirmDelete = (project: Project) => {
    setProjectToDelete(project);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    if (projectToDelete && projectToDelete.id) {
      deleteProject(projectToDelete.id);
    }
    setDeleteConfirmOpen(false);
    setProjectToDelete(null);
  };

  return (
    <main className="min-h-screen bg-[#fef6d9] pb-32">
      <div className="mx-auto max-w-2xl px-4">
        <ProjectHeader />

        <TaskFilters />

        <ProjectListHeader onAdd={openCreateDrawer} />

        <ProjectList
          projects={projects}
          onEdit={openEditDrawer}
          onDelete={confirmDelete}
        />
      </div>

      <ProjectFormDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        editingProject={editingProject}
        projectName={projectName}
        onProjectNameChange={setProjectName}
        projectColor={projectColor}
        onProjectColorChange={setProjectColor}
        onSave={handleSave}
      />

      <ProjectDeleteDrawer
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        project={projectToDelete}
        onConfirm={handleDelete}
      />
    </main>
  );
}
