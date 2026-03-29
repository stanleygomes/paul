import { MenuItem } from "./items";
import { MENU_LINKS } from "../../constants/menu-links";

interface MenuLinksProps {
  pathname: string;
  variant: "mobile" | "desktop";
  onItemClick?: () => void;
}

export function MenuLinks({ pathname, variant, onItemClick }: MenuLinksProps) {
  return (
    <>
      {MENU_LINKS.map((link) => (
        <MenuItem
          key={link.href}
          href={link.href}
          label={link.label}
          variant={variant}
          isActive={pathname === link.href}
          onClick={onItemClick}
        />
      ))}
    </>
  );
}
