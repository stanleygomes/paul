import { Minimize2 } from "lucide-react";

interface ZenExitButtonProps {
  onClick: () => void;
}

export function ZenExitButton({ onClick }: ZenExitButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed cursor-pointer top-8 right-8 flex items-center gap-2 rounded-base border-2 border-border bg-[#ff8fab] dark:bg-[#ff8fab]/20 px-4 py-2 font-black shadow-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all z-10"
    >
      <Minimize2 className="w-5 h-5" />
      Exit Zen Mode
    </button>
  );
}
