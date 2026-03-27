import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Project } from "@models/project";

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export default function ProjectList({
  projects,
  onEdit,
  onDelete,
}: ProjectListProps) {
  return (
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
                onClick={() => onEdit(project)}
                className="px-3 py-2 font-bold hover:bg-gray-300 rounded-lg cursor-pointer transition-colors text-gray-500 hover:text-black"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(project)}
                className="p-2 hover:bg-red-100 text-red-500 rounded-lg cursor-pointer transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
