import {
  Calendar,
  ListTodo,
  Layers,
  AlertCircle,
  Trash2,
  CheckCircle,
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
    color: "text-gray-500",
  },
  {
    id: "scheduled",
    name: "Scheduled",
    href: "/?filter=scheduled",
    icon: ListTodo,
    color: "text-gray-500",
  },
  {
    id: "all",
    name: "All Tasks",
    href: "/?filter=all",
    icon: Layers,
    color: "text-gray-500",
  },
  {
    id: "important",
    name: "Important",
    href: "/?filter=important",
    icon: AlertCircle,
    color: "text-gray-500",
  },
  {
    id: "completed",
    name: "Completed",
    href: "/?filter=completed",
    icon: CheckCircle,
    color: "text-gray-500",
  },
  {
    id: "recently-deleted",
    name: "Recently Deleted",
    href: "/?filter=recently-deleted",
    icon: Trash2,
    color: "text-gray-500",
  },
];
