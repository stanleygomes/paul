import { useTranslation } from "react-i18next";
import { FormField } from "./form-field";

interface TaskUrlProps {
  url?: string;
  onUpdateUrl: (url: string) => void;
}

export function TaskUrl({ url, onUpdateUrl }: TaskUrlProps) {
  const { t } = useTranslation();

  return (
    <FormField label={t("task_form.labels.url")}>
      <input
        type="url"
        value={url || ""}
        onChange={(e) => onUpdateUrl(e.target.value)}
        className="w-full rounded-base border-2 border-border bg-secondary-background px-3 py-2 text-sm outline-none"
        placeholder="https://..."
      />
    </FormField>
  );
}
