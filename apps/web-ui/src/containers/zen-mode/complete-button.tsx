import { Check } from "lucide-react";

interface ZenCompleteButtonProps {
  done: boolean;
  onClick: () => void;
}

export function ZenCompleteButton({ done, onClick }: ZenCompleteButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer w-full md:w-auto justify-center items-center gap-4 rounded-base border-4 border-border px-10 py-5 text-3xl font-black shadow-shadow transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-shadow active:translate-x-[8px] active:translate-y-[8px] active:shadow-none ${
        done
          ? "bg-[#a7f3d0] dark:bg-[#a7f3d0]/20 text-foreground"
          : "bg-main text-main-foreground"
      }`}
    >
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-border ${
          done ? "bg-foreground text-background" : "bg-background"
        }`}
      >
        {done && <Check className="w-6 h-6" strokeWidth={4} />}
      </div>
      {done ? "COMPLETED" : "COMPLETE TASK"}
    </button>
  );
}
