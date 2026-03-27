import { AlertCircle } from "lucide-react";

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
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center gap-1 rounded-base border-2 border-black px-2 py-1 font-bold shadow-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${
        isImportant ? "bg-[#ffe066]" : "bg-white text-gray-400 hover:text-black"
      } ${className}`}
      title="Mark as important"
    >
      <AlertCircle
        className="h-4 w-4"
        fill={isImportant ? "currentColor" : "none"}
      />
    </button>
  );
}
