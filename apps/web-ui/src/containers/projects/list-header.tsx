import { Plus } from "lucide-react";

interface ProjectListHeaderProps {
  onAdd: () => void;
}

export default function ProjectListHeader({ onAdd }: ProjectListHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-black">My Projects</h2>
      <button
        onClick={onAdd}
        className="bg-black text-[#fef6d9] p-2 sm:px-4 sm:py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-zinc-800 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:scale-95 transition-all cursor-pointer"
      >
        <Plus className="w-5 h-5" />
        <span className="hidden sm:inline">New Project</span>
      </button>
    </div>
  );
}
