import { Search } from "lucide-react";

interface SearchToggleProps {
  isVisible: boolean;
  onToggle: () => void;
  show: boolean;
}

export function SearchToggle({ isVisible, onToggle, show }: SearchToggleProps) {
  if (!show) return null;

  return (
    <button
      onClick={onToggle}
      className={`cursor-pointer rounded-full p-2 transition-colors ${
        isVisible
          ? "bg-main shadow-[2px_2px_0px_0px_var(--border)] text-main-foreground border-2 border-border"
          : "text-foreground/60 hover:bg-black/5 dark:hover:bg-white/5"
      }`}
    >
      <Search className="w-5 h-5" />
    </button>
  );
}
