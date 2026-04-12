import { ChevronRight, LucideIcon } from "lucide-react";
import { SimpleCard } from "./simple-card";
import { Typography } from "./typography";

interface ListItemProps {
  icon: LucideIcon;
  iconBackgroundColor: string;
  title: string;
  description?: string;
  className?: string;
  isHoverable?: boolean;
}

export function ListItem({
  icon: Icon,
  iconBackgroundColor,
  title,
  description,
  isHoverable = false,
  className = "",
}: ListItemProps) {
  return (
    <SimpleCard
      isHoverable={isHoverable}
      className={`group !flex-row items-center justify-between !p-4 ${className}`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`rounded-base border-2 border-border ${iconBackgroundColor} p-3 text-white shadow-[2px_2px_0px_0px_var(--border)]`}
        >
          <Icon size={24} strokeWidth={3} />
        </div>
        <div className="flex flex-col">
          <Typography
            variant="large"
            className="uppercase tracking-tight text-foreground font-black"
          >
            {title}
          </Typography>
          {description && (
            <Typography variant="small" className="text-foreground/50">
              {description}
            </Typography>
          )}
        </div>
      </div>
      <ChevronRight className="text-foreground/40 transition-colors group-hover:text-foreground" />
    </SimpleCard>
  );
}
