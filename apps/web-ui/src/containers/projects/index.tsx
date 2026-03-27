"use client";

import Link from "next/link";
import { useState } from "react";
import { useProjects } from "@modules/todo/use-projects";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@done/ui";
import {
  Calendar,
  ListTodo,
  Layers,
  AlertCircle,
  Plus,
  Trash2,
  Edit2,
} from "lucide-react";
import { Project } from "@models/project";

const COLORS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#84cc16",
  "#22c55e",
  "#0ea5e9",
  "#3b82f6",
  "#6366f1",
  "#a855f7",
  "#ec4899",
  "#14b8a6",
  "#64748b",
];

export default function Projects() {
  const { projects, createProject, updateProject, deleteProject } =
    useProjects();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState("");
  const [projectColor, setProjectColor] = useState(COLORS[0]);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const openCreateDrawer = () => {
    setEditingProject(null);
    setProjectName("");
    setProjectColor(COLORS[0]);
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
        <div className="py-10">
          <Link href="/" className="font-bold text-gray-700 hover:text-black">
            ← Back to Tasks
          </Link>
          <h1 className="text-4xl font-black mt-4">Projects & Filters</h1>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <Link
            href="/?filter=today"
            className="bg-white border-2 border-black rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
          >
            <Calendar className="w-8 h-8 text-blue-500" />
            <span className="font-bold text-lg">Today</span>
          </Link>
          <Link
            href="/?filter=scheduled"
            className="bg-white border-2 border-black rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
          >
            <ListTodo className="w-8 h-8 text-orange-500" />
            <span className="font-bold text-lg">Scheduled</span>
          </Link>
          <Link
            href="/?filter=all"
            className="bg-white border-2 border-black rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
          >
            <Layers className="w-8 h-8 text-green-500" />
            <span className="font-bold text-lg">All Tasks</span>
          </Link>
          <Link
            href="/?filter=important"
            className="bg-white border-2 border-black rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
          >
            <AlertCircle className="w-8 h-8 text-red-500" />
            <span className="font-bold text-lg">Important</span>
          </Link>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black">My Projects</h2>
          <button
            onClick={openCreateDrawer}
            className="bg-black text-[#fef6d9] px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Plus className="w-5 h-5" /> New Project
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {projects.length === 0 ? (
            <div className="text-gray-500 text-center py-10 font-bold border-2 border-dashed border-gray-300 rounded-xl">
              No projects yet.
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between bg-white border-2 border-black rounded-xl p-4 shadow-sm"
              >
                <Link
                  href={`/?projectId=${project.id}`}
                  className="flex items-center gap-3 flex-1 cursor-pointer"
                >
                  <div
                    className="w-5 h-5 rounded-full border-2 border-black"
                    style={{ backgroundColor: project.color }}
                  ></div>
                  <span className="font-bold text-xl">{project.name}</span>
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditDrawer(project)}
                    className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors text-gray-500 hover:text-black"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => confirmDelete(project)}
                    className="p-2 hover:bg-red-100 text-red-500 rounded-lg cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Drawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        direction="bottom"
      >
        <DrawerContent className="bg-[#fef6d9] flex flex-col pt-4">
          <DrawerHeader className="px-6 pb-4 pt-2 text-left shrink-0">
            <DrawerTitle className="text-2xl font-black">
              {editingProject ? "Edit Project" : "New Project"}
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-6">
            <div className="mb-6">
              <label className="block font-bold mb-3 text-lg">Name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full bg-white border-2 border-black rounded-xl px-4 py-4 text-lg font-bold focus:outline-none focus:ring-4 focus:ring-black/20"
                placeholder="Project name..."
              />
            </div>
            <div className="mb-10">
              <label className="block font-bold mb-3 text-lg">Color</label>
              <div className="flex flex-wrap gap-4">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setProjectColor(c)}
                    className={`w-12 h-12 rounded-full border-4 cursor-pointer transition-all ${projectColor === c ? "border-black scale-110 shadow-md" : "border-transparent hover:scale-105"}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={handleSave}
              className="w-full bg-black text-[#fef6d9] py-5 rounded-xl font-bold text-xl hover:opacity-90 transition-opacity cursor-pointer"
            >
              Save Project
            </button>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        direction="bottom"
      >
        <DrawerContent className="bg-[#fef6d9] flex flex-col pt-4">
          <DrawerHeader className="px-6 pb-4 pt-2 text-left shrink-0">
            <DrawerTitle className="text-2xl font-black">
              Delete Project
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-6 text-center">
            <p className="text-xl font-bold mb-3">
              Are you sure you want to delete <br />
              &quot;{projectToDelete?.name}&quot;?
            </p>
            <div className="bg-red-100 border-2 border-red-500 text-red-600 p-4 rounded-xl font-bold mb-10 flex items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>Tasks linked to this project will NOT be deleted.</span>
            </div>

            <div className="flex gap-4 pb-4">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="flex-1 bg-white border-2 border-black text-black py-4 rounded-xl font-bold text-xl hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 border-2 border-black text-white py-4 rounded-xl font-bold text-xl hover:bg-red-600 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </main>
  );
}
