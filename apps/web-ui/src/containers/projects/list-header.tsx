import { Plus } from "lucide-react";

interface ProjectListHeaderProps {
  onAdd: () => void;
}

export default function ProjectListHeader({ onAdd }: ProjectListHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl">My Projects</h2>
      <button
        onClick={onAdd}
        className="bg-main border-2 border-border text-main-foreground p-2 sm:px-4 sm:py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-main hover:shadow-shadow active:scale-95 transition-all cursor-pointer"
      >
        <Plus className="w-5 h-5" />
        <span className="hidden sm:inline">New Project</span>
      </button>
    </div>
  );
}
