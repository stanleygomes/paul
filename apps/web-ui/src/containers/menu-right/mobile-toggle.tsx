import { Menu as MenuIcon, X } from "lucide-react";

interface MobileToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileToggle({ isOpen, onToggle }: MobileToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="md:hidden flex items-center justify-center p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-black dark:text-white cursor-pointer"
    >
      {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
    </button>
  );
}
