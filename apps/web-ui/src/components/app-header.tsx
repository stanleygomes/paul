import { Search } from "lucide-react";

interface AppHeaderProps {
  onToggleSearch?: () => void;
  isSearchVisible?: boolean;
}

export function AppHeader({ onToggleSearch, isSearchVisible }: AppHeaderProps) {
  return (
    <header className="flex flex-col items-start gap-2 py-20">
      <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center text-[#fef6d9] text-xl font-black select-none">
        D
      </div>
      <div className="flex items-center justify-between w-full mt-5">
        <span className="text-5xl font-black tracking-tight leading-none text-black">
          Done.
        </span>
        {onToggleSearch && (
          <button
            onClick={onToggleSearch}
            className={`p-3 rounded-full border-2 border-black transition-colors cursor-pointer ${
              isSearchVisible
                ? "bg-black text-[#fef6d9]"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            <Search className="w-6 h-6" />
          </button>
        )}
      </div>
    </header>
  );
}
