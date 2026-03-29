import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";

interface ImportantToggleProps {
  isImportant: boolean;
  onToggle: () => void;
  className?: string;
}

export function TaskImportantToggle({
  isImportant,
  onToggle,
  className,
}: ImportantToggleProps) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex h-8 items-center cursor-pointer gap-1 rounded-base border-2 border-border px-2 py-1 font-bold shadow-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${
        isImportant
          ? "bg-main text-main-foreground"
          : "bg-zinc-100 dark:bg-zinc-800 text-foreground/60 hover:text-foreground"
      } ${className}`}
      title={
        isImportant
          ? t("common.components.important_toggle.unmark")
          : t("common.components.important_toggle.mark")
      }
    >
      <Star className="h-4 w-4" fill={isImportant ? "currentColor" : "none"} />
    </button>
  );
}
