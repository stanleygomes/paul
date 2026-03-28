interface BoardHeaderProps {
  title: string;
  color?: string;
  isFilter?: boolean;
}

export function BoardHeader({
  title,
  color,
  isFilter = false,
}: BoardHeaderProps) {
  return (
    <div className="mb-6 px-1 flex flex-col gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
      <a
        href="/projects"
        className="text-sm font-bold text-gray-500 hover:text-black transition-colors w-fit"
      >
        ← Back to Projects
      </a>
      <div className="flex items-center mt-2 gap-2">
        {color && (
          <div
            className="w-5 h-5 rounded-full border-2 border-black"
            style={{ backgroundColor: color }}
          ></div>
        )}
        <h2 className={`text-2xl font-black ${isFilter ? "capitalize" : ""}`}>
          {isFilter ? `${title} Tasks` : title}
        </h2>
      </div>
    </div>
  );
}
