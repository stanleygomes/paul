import { useTranslation } from "react-i18next";
import { Minimize2 } from "lucide-react";

interface ZenExitButtonProps {
  onClick: () => void;
}

export function ZenExitButton({ onClick }: ZenExitButtonProps) {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="fixed cursor-pointer bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-base border-2 border-border bg-[#ff8fab] dark:bg-[#ff8fab]/20 px-6 py-3 font-black shadow-shadow hover:shadow-none transition-all z-50 whitespace-nowrap"
    >
      <Minimize2 className="w-5 h-5" />
      {t("zen_mode.exit")}
    </button>
  );
}
