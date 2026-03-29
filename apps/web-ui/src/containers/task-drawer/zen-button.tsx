import { Maximize2 } from "lucide-react";

interface TaskDrawerZenButtonProps {
  taskId: string;
  onClick: (id: string) => void;
  onClose: () => void;
}

export function TaskDrawerZenButton({
  taskId,
  onClick,
  onClose,
}: TaskDrawerZenButtonProps) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-2 rounded-base border-2 border-border bg-[#a7f3d0] dark:bg-[#00d696]/20 py-4 text-lg font-black shadow-shadow transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-[#86efac] dark:hover:bg-[#00d696]/30 cursor-pointer"
      onClick={() => {
        onClick(taskId);
        onClose();
      }}
    >
      <Maximize2 className="h-6 w-6" /> Enter Zen Mode
    </button>
  );
}
