import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Project } from "@paul/entities";

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
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3">
      {projects.length === 0 ? (
        <div className="text-foreground/40 text-center py-10 font-bold border-2 border-dashed border-border rounded-xl">
          {t("projects.list.empty")}
        </div>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            className="group flex items-center justify-between bg-secondary-background border-2 border-border rounded-xl p-4 shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:shadow-[4px_4px_0px_0px_var(--border)] transition-all cursor-pointer"
          >
            <Link
              href={`/?projectId=${project.id}`}
              className="flex items-center gap-3 flex-1 cursor-pointer"
            >
              <div
                className="w-5 h-5 rounded-full border-2 border-border"
                style={{ backgroundColor: project.color }}
              ></div>
              <span className="font-bold text-xl">{project.name}</span>
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(project)}
                className="px-3 py-2 font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg cursor-pointer transition-colors text-foreground/60 hover:text-foreground"
              >
                {t("projects.list.edit")}
              </button>
              <button
                onClick={() => onDelete(project)}
                className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg cursor-pointer transition-colors"
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
