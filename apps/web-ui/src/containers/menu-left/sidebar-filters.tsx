import { useTranslation } from "react-i18next";
import Link from "next/link";
import { PROJECT_FILTERS } from "@constants/task-filters.constant";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function SidebarFilters({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const currentFilter = searchParams.get("filter");
  const isSearchVisible = searchParams.get("search") === "true";
  const showSearch = pathname === "/";

  const toggleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (isSearchVisible) {
      params.delete("search");
    } else {
      params.set("search", "true");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-1">
      {PROJECT_FILTERS.map((filter) => {
        const isActive = currentFilter === filter.id;
        return (
          <Link
            key={filter.id}
            href={filter.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-bold transition-all ${
              isActive
                ? "bg-main text-main-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-border"
                : "text-foreground/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
            }`}
          >
            <filter.icon
              className={`w-5 h-5 ${
                isActive ? "text-main-foreground" : filter.color
              }`}
            />
            <span className="text-sm">{t(`sidebar.filters.${filter.id}`)}</span>
          </Link>
        );
      })}

      {showSearch && (
        <button
          onClick={toggleSearch}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg font-bold transition-all mt-1 ${
            isSearchVisible
              ? "bg-main text-main-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-border"
              : "text-foreground/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
          }`}
        >
          <Search
            className={`w-5 h-5 ${
              isSearchVisible ? "text-main-foreground" : "text-gray-500"
            }`}
          />
          <span className="text-sm">{t("menu.search_toggle")}</span>
        </button>
      )}
    </div>
  );
}
