import { useTranslation } from "react-i18next";
import { Clock } from "lucide-react";

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TaskTimeInput({ value, onChange, className }: TimeInputProps) {
  const { t } = useTranslation();

  function handleTimeChange(newValue: string) {
    let formattedValue = newValue.replace(/\D/g, "");
    if (formattedValue.length > 4) formattedValue = formattedValue.slice(0, 4);

    if (formattedValue.length >= 3) {
      formattedValue =
        formattedValue.slice(0, 2) + ":" + formattedValue.slice(2);
    }

    // Validate HH range (00-23)
    if (formattedValue.length >= 2) {
      const hh = parseInt(formattedValue.slice(0, 2));
      if (hh > 23) formattedValue = "23" + formattedValue.slice(2);
    }
    // Validate mm range (00-59)
    if (formattedValue.length >= 5) {
      const mm = parseInt(formattedValue.slice(3, 5));
      if (mm > 59) formattedValue = formattedValue.slice(0, 3) + "59";
    }

    onChange(formattedValue);
  }

  return (
    <div
      className={`flex h-8 cursor-pointer items-center gap-1 rounded-base border-2 border-border px-2 py-1 shadow-sm transition-colors focus-within:text-foreground whitespace-nowrap ${
        value ? "text-foreground" : "text-foreground/40"
      } ${className}`}
    >
      <Clock className="h-4 w-4 shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => handleTimeChange(e.target.value)}
        placeholder={t("common.components.time_input.placeholder")}
        className="bg-transparent outline-none text-xs font-bold w-[45px] cursor-pointer placeholder:text-foreground/40"
        maxLength={5}
      />
    </div>
  );
}
