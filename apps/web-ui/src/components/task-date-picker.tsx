import { useTranslation } from "react-i18next";
import { format, parseISO, isValid } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Calendar, Popover, PopoverTrigger, PopoverContent } from "@paul/ui";

const locales = {
  en: enUS,
  pt: ptBR,
};

interface DatePickerProps {
  dueDateStr: string;
  onDateChange: (dateStr: string) => void;
  className?: string;
}

export function TaskDatePicker({
  dueDateStr,
  onDateChange,
  className,
}: DatePickerProps) {
  const { t, i18n } = useTranslation();
  const dueDate = dueDateStr ? parseISO(dueDateStr) : undefined;
  const currentLocale = locales[i18n.language as keyof typeof locales] || enUS;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`flex h-8 cursor-pointer items-center gap-1 rounded-base border-2 border-border px-2 py-1 font-bold shadow-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none whitespace-nowrap ${
            dueDateStr
              ? "bg-main text-main-foreground"
              : "bg-secondary-background text-foreground/60 hover:text-foreground"
          } ${className}`}
          title={t("common.components.date_picker.title")}
        >
          <CalendarIcon className="h-4 w-4 shrink-0" />
          <span className="text-xs font-bold">
            {dueDate && isValid(dueDate)
              ? format(dueDate, "dd/MM/yy")
              : t("common.components.date_picker.default_label")}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-2 border-border shadow-shadow bg-secondary-background">
        <Calendar
          mode="single"
          selected={dueDate}
          onSelect={(date) =>
            onDateChange(date ? format(date, "yyyy-MM-dd") : "")
          }
          initialFocus
          locale={currentLocale}
        />
      </PopoverContent>
    </Popover>
  );
}
