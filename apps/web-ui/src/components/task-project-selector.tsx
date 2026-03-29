import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const { projects } = useProjects();
  if (!isVisible) return null;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={`flex cursor-pointer items-center gap-2 rounded-base border-2 border-border px-2 py-1 h-8 text-xs font-bold shadow-sm outline-none hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:ring-0 whitespace-nowrap ${className}`}
      >
        {value === "none" && (
          <Folder className="h-4 w-4 shrink-0 text-foreground/60" />
        )}
        <div className="truncate">
          <SelectValue
            placeholder={t("common.components.project_selector.placeholder")}
          />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-secondary-background border-2 border-border shadow-shadow">
        <SelectItem
          value="none"
          className="font-bold cursor-pointer hover:bg-black/5"
        >
          <span className="text-foreground/60">
            {t("common.components.project_selector.no_project")}
          </span>
        </SelectItem>
        {projects.map((p) => (
          <SelectItem
            key={p.id}
            value={p.id}
            className="font-bold cursor-pointer hover:bg-black/5"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 shrink-0 rounded-full border border-border"
                style={{ backgroundColor: p.color }}
              ></div>
              <span className="truncate text-foreground/60">{p.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
