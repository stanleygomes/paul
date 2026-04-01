import Link from "next/link";
import { Project } from "@paul/entities";

export function SidebarProjectList({
  projects,
  searchParams,
}: {
  projects: Project[];
  searchParams: URLSearchParams;
}) {
  const currentProjectId = searchParams.get("projectId");

  return (
    <div className="flex flex-col gap-1">
      {projects.length === 0 ? (
        <p className="text-xs text-foreground/40 font-bold px-3 py-2 italic">
          No projects yet.
        </p>
      ) : (
        projects.map((project) => {
          const isActive = currentProjectId === project.id;
          return (
            <Link
              key={project.id}
              href={`/?projectId=${project.id}`}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-bold transition-all ${
                isActive
                  ? "bg-main text-main-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-border"
                  : "text-foreground/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
              }`}
            >
              <div
                className="w-3 h-3 rounded-full border-2 border-border shrink-0"
                style={{ backgroundColor: project.color }}
              ></div>
              <span className="text-sm truncate">{project.name}</span>
            </Link>
          );
        })
      )}
    </div>
  );
}
