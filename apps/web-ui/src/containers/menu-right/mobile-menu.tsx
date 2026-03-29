import { MenuLinks } from "./menu-links";

interface MobileMenuProps {
  isOpen: boolean;
  pathname: string;
  onClose: () => void;
}

export function MobileMenu({ isOpen, pathname, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 md:hidden bg-black/20 backdrop-blur-sm transition-all animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="absolute right-4 top-20 w-48 bg-white dark:bg-[#1a1a1a] border-2 border-border rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] overflow-hidden animate-in slide-in-from-top-2 focus-within:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col p-2">
          <MenuLinks
            pathname={pathname}
            variant="mobile"
            onItemClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}
