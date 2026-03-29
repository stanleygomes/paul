import { useTranslation } from "react-i18next";

interface FinishedHeaderProps {
  onClear: () => void;
}

export function FinishedHeader({ onClear }: FinishedHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between px-1">
      <h2 className="text-2xl font-black text-foreground">
        {t("task_board.finished_header.title")}
      </h2>
      <button
        onClick={onClear}
        className="text-sm font-bold text-foreground/40 hover:text-red-500 transition-colors cursor-pointer"
      >
        <span className="md:hidden">
          {t("task_board.finished_header.clear_all")}
        </span>
        <span className="hidden md:inline">
          {t("task_board.finished_header.delete_all")}
        </span>
      </button>
    </div>
  );
}
