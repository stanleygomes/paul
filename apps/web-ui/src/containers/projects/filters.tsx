import Link from "next/link";
import { PROJECT_FILTERS } from "src/constants/task-filters";

export default function TaskFilters() {
  return (
    <div className="grid grid-cols-2 gap-4 mb-10">
      {PROJECT_FILTERS.map((filter) => (
        <Link
          key={filter.id}
          href={filter.href}
          className="group bg-white border-2 border-black rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 text-black hover:text-black transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shadow-sm cursor-pointer"
        >
          <filter.icon
            className={`w-8 h-8 transition-colors group-hover:text-black text-black`}
          />
          <span className="font-bold text-lg">{filter.name}</span>
        </Link>
      ))}
    </div>
  );
}
