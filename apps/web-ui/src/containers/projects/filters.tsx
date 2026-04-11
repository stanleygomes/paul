import Link from "next/link";
import { PROJECT_FILTERS } from "src/constants/task-filters";

import { useTranslation } from "react-i18next";

export default function TaskFilters() {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8 md:mb-10">
      {PROJECT_FILTERS.map((filter) => (
        <Link
          key={filter.id}
          href={filter.href}
          className="group bg-secondary-background active:bg-main active:text-main-foreground border-2 border-border rounded-xl p-2.5 md:p-4 flex flex-col items-center justify-center gap-1 md:gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:shadow-[4px_4px_0px_0px_var(--border)] transition-all cursor-pointer text-center active:scale-95 active:translate-y-0.5 shadow-sm"
        >
          <filter.icon
            className={`w-6 h-6 md:w-8 md:h-8 transition-colors ${filter.color}`}
          />
          <span className="font-bold text-xs md:text-lg line-clamp-1">
            {t(`projects.filters.${filter.id}`)}
          </span>
        </Link>
      ))}
    </div>
  );
}
