import { Folder } from "lucide-react";
import { useProjects } from "@modules/todo/use-projects";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@done/ui";

interface ProjectSelectorProps {
  value: string;
  onChange: (value: string) => void;
  isVisible: boolean;
  className?: string;
}

export function TaskProjectSelector({
  value,
  onChange,
  isVisible,
  className,
}: ProjectSelectorProps) {
  const { projects } = useProjects();
  if (!isVisible) return null;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={`flex items-center gap-2 rounded-base border-2 border-black px-2 py-1 h-auto text-xs font-bold shadow-sm outline-none hover:bg-gray-50 focus:ring-0 ${className}`}
      >
        {value === "none" && (
          <Folder className="h-4 w-4 shrink-0 text-gray-400" />
        )}
        <SelectValue placeholder="Project..." className="truncate" />
      </SelectTrigger>
      <SelectContent className="bg-[#fffaf0] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <SelectItem
          value="none"
          className="font-bold cursor-pointer hover:bg-black/5"
        >
          No project
        </SelectItem>
        {projects.map((p) => (
          <SelectItem
            key={p.id}
            value={p.id}
            className="font-bold cursor-pointer hover:bg-black/5"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 shrink-0 rounded-full border border-black"
                style={{ backgroundColor: p.color }}
              ></div>
              <span className="truncate">{p.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
