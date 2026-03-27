import Link from "next/link";

interface MenuItemProps {
  href: string;
  label: string;
  onClick?: () => void;
  variant: "desktop" | "mobile";
  isActive?: boolean;
}

export function MenuItem({
  href,
  label,
  onClick,
  variant,
  isActive,
}: MenuItemProps) {
  if (variant === "desktop") {
    return (
      <Link
        href={href}
        className={`px-4 py-2 rounded-full font-bold transition-all no-underline ${
          isActive
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-black hover:bg-black dark:hover:bg-white"
        }`}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-4 py-3 font-black text-lg rounded-xl transition-all no-underline ${
        isActive
          ? "bg-[#fef6d9] dark:bg-white/10"
          : "hover:bg-[#fef6d9] dark:hover:bg-white/5"
      }`}
    >
      {label}
    </Link>
  );
}
