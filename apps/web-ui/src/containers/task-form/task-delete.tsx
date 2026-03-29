import { Trash2 } from "lucide-react";

interface TaskDeleteProps {
  onDelete: () => void;
}

export function TaskDelete({ onDelete }: TaskDeleteProps) {
  return (
    <div className="mt-4 flex flex-col gap-3">
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 rounded-base border-2 border-border bg-[#ff8fab] dark:bg-[#ff8fab]/20 py-3 text-base font-bold transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-[#ff7597] dark:hover:bg-[#ff7597]/30 shadow-shadow cursor-pointer"
        onClick={onDelete}
      >
        <Trash2 className="h-5 w-5" /> Delete Task
      </button>
    </div>
  );
}
