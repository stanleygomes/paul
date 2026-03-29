interface FinishedHeaderProps {
  onClear: () => void;
}

export function FinishedHeader({ onClear }: FinishedHeaderProps) {
  return (
    <div className="flex items-center justify-between px-1">
      <h2 className="text-2xl font-black text-foreground">Finished</h2>
      <button
        onClick={onClear}
        className="text-sm font-bold text-foreground/40 hover:text-red-500 transition-colors cursor-pointer"
      >
        <span className="md:hidden">Clear All</span>
        <span className="hidden md:inline">Delete all finished tasks</span>
      </button>
    </div>
  );
}
