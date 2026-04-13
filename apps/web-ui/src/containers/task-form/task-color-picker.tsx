import { COLORS } from "../../constants/colors.constant";
import { X } from "lucide-react";
import { FormField } from "./form-field";

interface TaskColorPickerProps {
  color?: string;
  onUpdateColor: (color: string | undefined) => void;
}

export function TaskColorPicker({
  color,
  onUpdateColor,
}: TaskColorPickerProps) {
  return (
    <FormField label="Task Color">
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={() => onUpdateColor(undefined)}
          className={`h-8 w-8 rounded-full border-2 border-border flex items-center justify-center transition-all duration-200 hover:scale-110 ${
            !color
              ? "ring-2 ring-main ring-offset-2 ring-offset-background"
              : ""
          }`}
          title="Default theme color"
        >
          <X size={14} className="text-secondary-text" />
        </button>

        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => onUpdateColor(c)}
            style={{ backgroundColor: c }}
            className={`h-8 w-8 rounded-full border-2 border-border transition-all duration-200 hover:scale-110 ${
              color === c
                ? "ring-2 ring-main ring-offset-2 ring-offset-background scale-110"
                : ""
            }`}
          />
        ))}
      </div>
    </FormField>
  );
}
