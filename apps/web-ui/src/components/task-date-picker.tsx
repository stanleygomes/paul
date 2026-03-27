import { CalendarIcon } from "lucide-react";
import { format, parseISO, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Popover, PopoverTrigger, PopoverContent } from "@done/ui";

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
  const dueDate = dueDateStr ? parseISO(dueDateStr) : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`flex items-center gap-1 rounded-base border-2 border-black px-2 py-1 shadow-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${
            dueDateStr ? "text-black" : "text-gray-400"
          } ${className}`}
          title="Set due date"
        >
          <CalendarIcon className="h-4 w-4 shrink-0" />
          <span className="text-xs font-bold truncate max-w-[100px]">
            {dueDate && isValid(dueDate) ? format(dueDate, "dd/MM/yy") : "Date"}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
        <Calendar
          mode="single"
          selected={dueDate}
          onSelect={(date) =>
            onDateChange(date ? format(date, "yyyy-MM-dd") : "")
          }
          initialFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}
