import { Search } from "lucide-react";

interface TaskSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export function TaskSearch({ query, onQueryChange }: TaskSearchProps) {
  return (
    <div className="mb-8 relative animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-foreground/40" />
      </div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="w-full bg-secondary-background border-2 border-border rounded-xl pl-12 pr-4 py-3 text-lg font-bold placeholder:text-foreground/40 focus:outline-none focus:ring-0 focus:ring-border/50 transition-shadow outline-none"
        autoFocus
      />
    </div>
  );
}
