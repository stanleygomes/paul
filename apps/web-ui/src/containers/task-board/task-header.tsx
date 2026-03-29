import { Search } from "lucide-react";

interface AppHeaderProps {
  onToggleSearch?: () => void;
  isSearchVisible?: boolean;
}

export function AppHeader({ onToggleSearch, isSearchVisible }: AppHeaderProps) {
  return (
    <header className="flex flex-col items-start gap-2 py-20">
      <div className="flex h-20 w-20 select-none items-center justify-center rounded-full bg-foreground text-xl font-black text-background">
        D
      </div>
      <div className="mt-5 flex w-full items-center justify-between">
        <span className="text-5xl font-black leading-none tracking-tight text-foreground">
          Done.
        </span>
        {onToggleSearch && (
          <button
            onClick={onToggleSearch}
            className={`cursor-pointer rounded-full border-2 border-border p-3 transition-colors ${
              isSearchVisible
                ? "bg-main shadow-shadow text-main-foreground"
                : "bg-secondary-background text-foreground/60 hover:bg-main/20"
            }`}
          >
            <Search className="w-6 h-6" />
          </button>
        )}
      </div>
    </header>
  );
}
