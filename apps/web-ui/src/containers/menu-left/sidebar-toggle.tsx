import { Menu as MenuIcon } from "lucide-react";
import { useSidebar } from "src/hooks/use-sidebar";

export function SidebarToggle() {
  const { isOpen, setIsOpen } = useSidebar();

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center justify-center p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-black dark:text-white cursor-pointer"
    >
      <MenuIcon className="w-6 h-6" />
    </button>
  );
}
