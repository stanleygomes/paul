import {
  Calendar,
  ListTodo,
  Layers,
  AlertCircle,
  LucideIcon,
} from "lucide-react";

export interface FilterItem {
  id: string;
  name: string;
  href: string;
  icon: LucideIcon;
  color: string;
}

export const PROJECT_FILTERS: FilterItem[] = [
  {
    id: "today",
    name: "Today",
    href: "/?filter=today",
    icon: Calendar,
    color: "text-blue-500",
  },
  {
    id: "scheduled",
    name: "Scheduled",
    href: "/?filter=scheduled",
    icon: ListTodo,
    color: "text-orange-500",
  },
  {
    id: "all",
    name: "All Tasks",
    href: "/?filter=all",
    icon: Layers,
    color: "text-green-500",
  },
  {
    id: "important",
    name: "Important",
    href: "/?filter=important",
    icon: AlertCircle,
    color: "text-red-500",
  },
];
