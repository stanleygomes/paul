import Link from "next/link";
import { PROJECT_FILTERS } from "src/constants/task-filters";

export function SidebarFilters({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const currentFilter = searchParams.get("filter");

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
            <filter.icon className={"w-5 h-5 text-main-foreground"} />
            <span className="text-sm">{filter.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
