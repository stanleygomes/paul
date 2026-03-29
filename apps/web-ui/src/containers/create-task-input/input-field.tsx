import { forwardRef, KeyboardEvent } from "react";
import { Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AutoResizeTextarea } from "../../components/auto-resize-textarea";

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const InputField = forwardRef<HTMLTextAreaElement, InputFieldProps>(
  ({ value, onChange, onKeyDown }, ref) => {
    const { t } = useTranslation();

    return (
      <div className="flex bg-secondary-background z-10">
        <AutoResizeTextarea
          ref={ref}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder={t("create_task.placeholder")}
          rows={1}
          className="flex-1 resize-none bg-transparent px-5 py-4 text-sm font-medium outline-none placeholder:text-foreground/30 max-h-[160px] overflow-y-auto"
        />
        <button
          type="submit"
          className="m-1.5 h-fit rounded-lg bg-main border-2 border-border px-4 py-2.5 text-sm font-bold text-main-foreground transition-all hover:shadow-shadow active:scale-95 flex items-center gap-1 cursor-pointer"
        >
          {t("create_task.add_button")}{" "}
          <Rocket className="hidden sm:block h-4 w-4 ml-2" />
        </button>
      </div>
    );
  },
);

InputField.displayName = "InputField";
