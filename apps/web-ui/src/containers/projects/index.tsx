"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useProjects } from "@modules/project/use-projects";
import ProjectFormDrawer from "./form-drawer";
import ProjectDeleteDrawer from "./delete-drawer";
import { Project } from "@paul/entities";
import { COLORS } from "../../constants/colors.constant";
import TaskFilters from "./filters";
import ProjectList from "./list";
import ProjectHeader from "./header";
import ProjectListHeader from "./list-header";
import { UserAvatar } from "src/components/user-avatar";
import { useTopMenu } from "@modules/menu-layout/use-top-menu";
import { PageActions } from "src/components/page-actions";
import { Plus } from "lucide-react";

export default function Projects() {
  const { t } = useTranslation();
  const { projects, createProject, updateProject, deleteProject } =
    useProjects();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState("");
  const [projectColor, setProjectColor] = useState<string>(
    COLORS[0] || "#ef4444",
  );

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const { setLeftContent, setRightContent } = useTopMenu();

  const openCreateDrawer = () => {
    setEditingProject(null);
    setProjectName("");
    setProjectColor(COLORS[0] || "#ef4444");
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

  useEffect(() => {
    setLeftContent(<UserAvatar className="h-12 w-12 ml-2" />);
    setRightContent(
      <PageActions
        actions={[
          {
            icon: Plus,
            onClick: openCreateDrawer,
            label: t("actions.create_project"),
          },
        ]}
      />,
    );

    return () => {
      setLeftContent(null);
      setRightContent(null);
    };
  }, [setLeftContent, setRightContent, t]);

  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="mx-auto max-w-2xl px-4 pt-16">
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
