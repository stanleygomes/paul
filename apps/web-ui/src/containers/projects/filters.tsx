import Link from "next/link";
import { PROJECT_FILTERS } from "src/constants/task-filters";

import { useTranslation } from "react-i18next";

export default function TaskFilters() {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-4 mb-10">
      {PROJECT_FILTERS.map((filter) => (
        <Link
          key={filter.id}
          href={filter.href}
          className="group bg-secondary-background border-2 border-border rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:shadow-[4px_4px_0px_0px_var(--border)] transition-all cursor-pointer"
        >
          <filter.icon
            className={`w-8 h-8 transition-colors group-hover:text-foreground/60 text-foreground/60`}
          />
          <span className="font-bold text-lg">
            {t(`projects.filters.${filter.id}`)}
          </span>
        </Link>
      ))}
    </div>
  );
}
