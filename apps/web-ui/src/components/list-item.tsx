import { LucideIcon } from "lucide-react";
import { SimpleCard } from "./simple-card";
import { Typography } from "./typography";

interface ListItemProps {
  icon?: LucideIcon;
  iconBackgroundColor?: string;
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
      className={`group !flex !flex-row items-center justify-between !p-4 w-full overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0 text-left">
        {Icon && (
          <div
            className={`flex-shrink-0 rounded-base border-2 border-border ${iconBackgroundColor} p-3 text-white shadow-[2px_2px_0px_0px_var(--border)]`}
          >
            <Icon size={24} strokeWidth={3} />
          </div>
        )}
        <div className="flex flex-col min-w-0 text-left items-start">
          <Typography
            variant="large"
            className="uppercase tracking-tight text-foreground font-black truncate w-full text-left"
          >
            {title}
          </Typography>
          {description && (
            <Typography
              variant="small"
              className="text-foreground/50 truncate w-full text-left"
            >
              {description}
            </Typography>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground shadow-[2px_2px_0px_0px_var(--border)] transition-all group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none ml-4">
        →
      </div>
    </SimpleCard>
  );
}
